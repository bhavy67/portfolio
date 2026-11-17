import { createContext, useContext, useState, useLayoutEffect } from 'react';
import type { ReactNode } from 'react';

export type Theme = {
  id: string;
  name: string;
  isDark: boolean;
  primary: string;
  accent: string;
  background: string;
  text: string;
  onPrimary?: string; // text on primary-filled surfaces; defaults to white
  mono?: boolean; // pure black & white — neutral grays instead of slate, no hero blobs (see index.css)
};

export const themes: Theme[] = [
  // Light Themes
  {
    id: 'arctic-light',
    name: 'Arctic',
    isDark: false,
    primary: '#0891B2',
    accent: '#22D3EE',
    background: '#FFFFFF',
    text: '#1E293B',
  },
  {
    id: 'solar-light',
    name: 'Solar',
    isDark: false,
    primary: '#D97706',
    accent: '#F97316',
    background: '#FFFFFF',
    text: '#1C1917',
  },
  {
    id: 'crimson-light',
    name: 'Crimson',
    isDark: false,
    primary: '#DC2626',
    accent: '#F43F5E',
    background: '#FFFFFF',
    text: '#111827',
  },
  {
    id: 'ink-light',
    name: 'Ink',
    isDark: false,
    mono: true,
    primary: '#171717',
    accent: '#171717',
    background: '#FFFFFF',
    text: '#0A0A0A',
  },
  // Dark Themes — muted, calm, easy on the eyes
  {
    id: 'midnight-dark',
    name: 'Midnight',
    isDark: true,
    primary: '#7AA2F7',
    accent: '#9ECEFF',
    background: '#0F172A',
    text: '#C0CAF5',
  },
  {
    id: 'haze-dark',
    name: 'Haze',
    isDark: true,
    primary: '#A385C0',
    accent: '#BDA3D8',
    background: '#0F172A',
    text: '#E4D9F4',
  },
  {
    id: 'jade-dark',
    name: 'Jade',
    isDark: true,
    primary: '#5FAD8B',
    accent: '#7EC4A4',
    background: '#0F172A',
    text: '#D4EDE3',
  },
  {
    id: 'chalk-dark',
    name: 'Chalk',
    isDark: true,
    mono: true,
    primary: '#FAFAFA',
    accent: '#FAFAFA',
    onPrimary: '#0A0A0A',
    background: '#0A0A0A',
    text: '#FAFAFA',
  },
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  themes: Theme[];
}

const toChannels = (hex: string) =>
  [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)).join(' ');

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return themes.find(t => t.id === savedTheme) || themes[0];
  });

  // Layout effect: vars land before first paint, so there's no frame without theme colours
  useLayoutEffect(() => {
    const root = document.documentElement;
    
    // Apply dark mode class
    if (currentTheme.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    root.classList.toggle('mono', !!currentTheme.mono);

    // Apply CSS variables for dynamic colors
    root.style.setProperty('--color-primary', currentTheme.primary);
    root.style.setProperty('--color-accent', currentTheme.accent);
    
    // Tailwind's primary/accent (and purple/pink) palettes read these vars as "r g b"
    // channels (tailwind.config.js), so every shade + opacity modifier follows the theme.
    const setShades = (name: string, hex: string) => {
      const rgb = toChannels(hex).split(' ').map(Number);
      // [shade, additive delta, mono white-mix]. Additive lightening turns near-black
      // into mid-grey, so mono themes blend their light shades toward white instead.
      const steps: [number, number, number][] = [
        [50, 100, 0.95], [100, 80, 0.9], [200, 60, 0.75], [300, 40, 0.6], [400, 20, 0.35],
        [500, 0, 0], [600, -20, 0], [700, -40, 0], [800, -60, 0], [900, -80, 0],
      ];
      for (const [shade, delta, mix] of steps) {
        const channels = rgb
          .map(c => (currentTheme.mono && mix ? c + (255 - c) * mix : c + delta))
          .map(c => Math.round(Math.max(0, Math.min(255, c))))
          .join(' ');
        root.style.setProperty(`--tw-${name}-${shade}`, channels);
      }
    };
    setShades('primary', currentTheme.primary);
    setShades('accent', currentTheme.accent);
    root.style.setProperty('--on-primary', toChannels(currentTheme.onPrimary ?? '#FFFFFF'));

    // Save to localStorage
    localStorage.setItem('theme', currentTheme.id);
  }, [currentTheme]);

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
