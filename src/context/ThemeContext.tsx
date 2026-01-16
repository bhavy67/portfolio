import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type Theme = {
  id: string;
  name: string;
  isDark: boolean;
  primary: string;
  accent: string;
  background: string;
  text: string;
  icon: string;
};

export const themes: Theme[] = [
  // Light Themes
  {
    id: 'purple-light',
    name: 'Purple Dream',
    isDark: false,
    primary: '#7C3AED',
    accent: '#A855F7',
    background: '#FFFFFF',
    text: '#1E293B',
    icon: '🌸',
  },
  {
    id: 'blue-light',
    name: 'Ocean Blue',
    isDark: false,
    primary: '#0EA5E9',
    accent: '#06B6D4',
    background: '#FFFFFF',
    text: '#1E293B',
    icon: '🌊',
  },
  {
    id: 'green-light',
    name: 'Forest Green',
    isDark: false,
    primary: '#10B981',
    accent: '#34D399',
    background: '#FFFFFF',
    text: '#1E293B',
    icon: '🌿',
  },
  // Dark Themes
  {
    id: 'purple-dark',
    name: 'Purple Night',
    isDark: true,
    primary: '#A855F7',
    accent: '#C084FC',
    background: '#0F172A',
    text: '#F1F5F9',
    icon: '🌙',
  },
  {
    id: 'blue-dark',
    name: 'Deep Ocean',
    isDark: true,
    primary: '#3B82F6',
    accent: '#60A5FA',
    background: '#0F172A',
    text: '#F1F5F9',
    icon: '🌌',
  },
  {
    id: 'orange-dark',
    name: 'Sunset Glow',
    isDark: true,
    primary: '#F97316',
    accent: '#FB923C',
    background: '#0F172A',
    text: '#F1F5F9',
    icon: '🌅',
  },
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return themes.find(t => t.id === savedTheme) || themes[0];
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply dark mode class
    if (currentTheme.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply CSS variables for dynamic colors
    root.style.setProperty('--color-primary', currentTheme.primary);
    root.style.setProperty('--color-accent', currentTheme.accent);
    root.style.setProperty('--color-background', currentTheme.background);
    root.style.setProperty('--color-text', currentTheme.text);
    
    // Update Tailwind CSS color classes dynamically
    // We'll inject a style tag to override Tailwind's primary and accent colors
    let styleTag = document.getElementById('dynamic-theme-colors');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'dynamic-theme-colors';
      document.head.appendChild(styleTag);
    }
    
    // Generate color shades from base colors
    const generateShades = (baseColor: string) => {
      // Convert hex to RGB
      const r = parseInt(baseColor.slice(1, 3), 16);
      const g = parseInt(baseColor.slice(3, 5), 16);
      const b = parseInt(baseColor.slice(5, 7), 16);
      
      return {
        50: `rgb(${Math.min(255, r + 100)}, ${Math.min(255, g + 100)}, ${Math.min(255, b + 100)})`,
        100: `rgb(${Math.min(255, r + 80)}, ${Math.min(255, g + 80)}, ${Math.min(255, b + 80)})`,
        200: `rgb(${Math.min(255, r + 60)}, ${Math.min(255, g + 60)}, ${Math.min(255, b + 60)})`,
        300: `rgb(${Math.min(255, r + 40)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 40)})`,
        400: `rgb(${Math.min(255, r + 20)}, ${Math.min(255, g + 20)}, ${Math.min(255, b + 20)})`,
        500: `rgb(${r}, ${g}, ${b})`,
        600: `rgb(${Math.max(0, r - 20)}, ${Math.max(0, g - 20)}, ${Math.max(0, b - 20)})`,
        700: `rgb(${Math.max(0, r - 40)}, ${Math.max(0, g - 40)}, ${Math.max(0, b - 40)})`,
        800: `rgb(${Math.max(0, r - 60)}, ${Math.max(0, g - 60)}, ${Math.max(0, b - 60)})`,
        900: `rgb(${Math.max(0, r - 80)}, ${Math.max(0, g - 80)}, ${Math.max(0, b - 80)})`,
      };
    };
    
    const primaryShades = generateShades(currentTheme.primary);
    const accentShades = generateShades(currentTheme.accent);
    
    styleTag.textContent = `
      :root {
        --color-primary: ${currentTheme.primary};
        --color-accent: ${currentTheme.accent};
        --tw-primary-50: ${primaryShades[50]};
        --tw-primary-100: ${primaryShades[100]};
        --tw-primary-200: ${primaryShades[200]};
        --tw-primary-300: ${primaryShades[300]};
        --tw-primary-400: ${primaryShades[400]};
        --tw-primary-500: ${primaryShades[500]};
        --tw-primary-600: ${primaryShades[600]};
        --tw-primary-700: ${primaryShades[700]};
        --tw-primary-800: ${primaryShades[800]};
        --tw-primary-900: ${primaryShades[900]};
        
        --tw-accent-50: ${accentShades[50]};
        --tw-accent-100: ${accentShades[100]};
        --tw-accent-200: ${accentShades[200]};
        --tw-accent-300: ${accentShades[300]};
        --tw-accent-400: ${accentShades[400]};
        --tw-accent-500: ${accentShades[500]};
        --tw-accent-600: ${accentShades[600]};
        --tw-accent-700: ${accentShades[700]};
        --tw-accent-800: ${accentShades[800]};
        --tw-accent-900: ${accentShades[900]};
      }
      
      /* ========== TEXT COLORS ========== */
      .text-primary-50 { color: ${primaryShades[50]} !important; }
      .text-primary-100 { color: ${primaryShades[100]} !important; }
      .text-primary-200 { color: ${primaryShades[200]} !important; }
      .text-primary-300 { color: ${primaryShades[300]} !important; }
      .text-primary-400 { color: ${primaryShades[400]} !important; }
      .text-primary-500 { color: ${primaryShades[500]} !important; }
      .text-primary-600 { color: ${primaryShades[600]} !important; }
      .text-primary-700 { color: ${primaryShades[700]} !important; }
      .text-primary-800 { color: ${primaryShades[800]} !important; }
      .text-primary-900 { color: ${primaryShades[900]} !important; }
      
      .text-accent-50 { color: ${accentShades[50]} !important; }
      .text-accent-100 { color: ${accentShades[100]} !important; }
      .text-accent-200 { color: ${accentShades[200]} !important; }
      .text-accent-300 { color: ${accentShades[300]} !important; }
      .text-accent-400 { color: ${accentShades[400]} !important; }
      .text-accent-500 { color: ${accentShades[500]} !important; }
      .text-accent-600 { color: ${accentShades[600]} !important; }
      .text-accent-700 { color: ${accentShades[700]} !important; }
      
      /* Replace hardcoded purple/pink colors with theme colors */
      .text-purple-500 { color: ${primaryShades[500]} !important; }
      .text-purple-600 { color: ${primaryShades[600]} !important; }
      .text-pink-500 { color: ${accentShades[500]} !important; }
      .text-pink-600 { color: ${accentShades[600]} !important; }
      
      /* Hover states */
      .hover\\:text-primary-400:hover { color: ${primaryShades[400]} !important; }
      .hover\\:text-primary-600:hover { color: ${primaryShades[600]} !important; }
      .dark .dark\\:text-primary-400 { color: ${primaryShades[400]} !important; }
      
      /* ========== BACKGROUND COLORS ========== */
      .bg-primary-50 { background-color: ${primaryShades[50]} !important; }
      .bg-primary-100 { background-color: ${primaryShades[100]} !important; }
      .bg-primary-200 { background-color: ${primaryShades[200]} !important; }
      .bg-primary-300 { background-color: ${primaryShades[300]} !important; }
      .bg-primary-400 { background-color: ${primaryShades[400]} !important; }
      .bg-primary-500 { background-color: ${primaryShades[500]} !important; }
      .bg-primary-600 { background-color: ${primaryShades[600]} !important; }
      .bg-primary-700 { background-color: ${primaryShades[700]} !important; }
      .bg-primary-800 { background-color: ${primaryShades[800]} !important; }
      .bg-primary-900 { background-color: ${primaryShades[900]} !important; }
      
      .bg-accent-50 { background-color: ${accentShades[50]} !important; }
      .bg-accent-100 { background-color: ${accentShades[100]} !important; }
      .bg-accent-500 { background-color: ${accentShades[500]} !important; }
      .bg-accent-600 { background-color: ${accentShades[600]} !important; }
      
      /* Replace hardcoded purple/pink colors */
      .bg-purple-500 { background-color: ${primaryShades[500]} !important; }
      .bg-purple-600 { background-color: ${primaryShades[600]} !important; }
      .bg-pink-500 { background-color: ${accentShades[500]} !important; }
      .bg-pink-600 { background-color: ${accentShades[600]} !important; }
      
      /* Opacity variations */
      .bg-primary-400\\/20 { background-color: ${primaryShades[400]}33 !important; }
      .bg-primary-600\\/20 { background-color: ${primaryShades[600]}33 !important; }
      .dark .dark\\:bg-primary-600\\/20 { background-color: ${primaryShades[600]}33 !important; }
      .dark .dark\\:bg-primary-900\\/30 { background-color: ${primaryShades[900]}4D !important; }
      
      /* Hover states */
      .hover\\:bg-primary-600:hover { background-color: ${primaryShades[600]} !important; }
      
      /* ========== BORDER COLORS ========== */
      .border-primary-500 { border-color: ${primaryShades[500]} !important; }
      .border-primary-600 { border-color: ${primaryShades[600]} !important; }
      .ring-primary-500 { --tw-ring-color: ${primaryShades[500]} !important; }
      .ring-2 { --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000); }
      
      /* ========== GRADIENT FROM ========== */
      .from-primary-50 { --tw-gradient-from: ${primaryShades[50]} var(--tw-gradient-from-position) !important; --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
      .from-primary-100 { --tw-gradient-from: ${primaryShades[100]} var(--tw-gradient-from-position) !important; --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
      .from-primary-400 { --tw-gradient-from: ${primaryShades[400]} var(--tw-gradient-from-position) !important; --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
      .from-primary-500 { --tw-gradient-from: ${primaryShades[500]} var(--tw-gradient-from-position) !important; --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
      .from-primary-600 { --tw-gradient-from: ${primaryShades[600]} var(--tw-gradient-from-position) !important; --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
      .from-primary-700 { --tw-gradient-from: ${primaryShades[700]} var(--tw-gradient-from-position) !important; --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
      .from-primary-800 { --tw-gradient-from: ${primaryShades[800]} var(--tw-gradient-from-position) !important; --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
      
      .from-accent-50 { --tw-gradient-from: ${accentShades[50]} var(--tw-gradient-from-position) !important; --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
      .from-accent-500 { --tw-gradient-from: ${accentShades[500]} var(--tw-gradient-from-position) !important; --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
      .from-accent-600 { --tw-gradient-from: ${accentShades[600]} var(--tw-gradient-from-position) !important; --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
      .from-accent-700 { --tw-gradient-from: ${accentShades[700]} var(--tw-gradient-from-position) !important; --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
      
      /* Replace hardcoded purple/pink gradients */
      .from-purple-500 { --tw-gradient-from: ${primaryShades[500]} var(--tw-gradient-from-position) !important; --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
      .from-purple-600 { --tw-gradient-from: ${primaryShades[600]} var(--tw-gradient-from-position) !important; --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
      .from-pink-500 { --tw-gradient-from: ${accentShades[500]} var(--tw-gradient-from-position) !important; --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
      
      /* ========== GRADIENT VIA ========== */
      .via-primary-500 { --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), ${primaryShades[500]} var(--tw-gradient-via-position), var(--tw-gradient-to) !important; }
      .via-primary-600 { --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), ${primaryShades[600]} var(--tw-gradient-via-position), var(--tw-gradient-to) !important; }
      .via-primary-700 { --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), ${primaryShades[700]} var(--tw-gradient-via-position), var(--tw-gradient-to) !important; }
      
      .via-accent-50 { --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), ${accentShades[50]} var(--tw-gradient-via-position), var(--tw-gradient-to) !important; }
      .via-accent-500 { --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), ${accentShades[500]} var(--tw-gradient-via-position), var(--tw-gradient-to) !important; }
      .via-accent-600 { --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), ${accentShades[600]} var(--tw-gradient-via-position), var(--tw-gradient-to) !important; }
      .via-accent-700 { --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), ${accentShades[700]} var(--tw-gradient-via-position), var(--tw-gradient-to) !important; }
      
      /* Replace hardcoded purple/pink via gradients */
      .via-purple-500 { --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), ${primaryShades[500]} var(--tw-gradient-via-position), var(--tw-gradient-to) !important; }
      .via-purple-600 { --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), ${primaryShades[600]} var(--tw-gradient-via-position), var(--tw-gradient-to) !important; }
      
      /* ========== GRADIENT TO ========== */
      .to-primary-100 { --tw-gradient-to: ${primaryShades[100]} var(--tw-gradient-to-position) !important; }
      .to-primary-500 { --tw-gradient-to: ${primaryShades[500]} var(--tw-gradient-to-position) !important; }
      .to-primary-600 { --tw-gradient-to: ${primaryShades[600]} var(--tw-gradient-to-position) !important; }
      .to-primary-700 { --tw-gradient-to: ${primaryShades[700]} var(--tw-gradient-to-position) !important; }
      .to-primary-800 { --tw-gradient-to: ${primaryShades[800]} var(--tw-gradient-to-position) !important; }
      
      .to-accent-500 { --tw-gradient-to: ${accentShades[500]} var(--tw-gradient-to-position) !important; }
      .to-accent-600 { --tw-gradient-to: ${accentShades[600]} var(--tw-gradient-to-position) !important; }
      .to-accent-700 { --tw-gradient-to: ${accentShades[700]} var(--tw-gradient-to-position) !important; }
      
      /* Replace hardcoded purple/pink to gradients */
      .to-purple-500 { --tw-gradient-to: ${primaryShades[500]} var(--tw-gradient-to-position) !important; }
      .to-purple-600 { --tw-gradient-to: ${primaryShades[600]} var(--tw-gradient-to-position) !important; }
      .to-pink-500 { --tw-gradient-to: ${accentShades[500]} var(--tw-gradient-to-position) !important; }
      
      /* ========== GRADIENT TEXT ========== */
      .gradient-text {
        background: linear-gradient(to right, ${primaryShades[600]}, ${accentShades[600]}, ${primaryShades[700]}) !important;
        -webkit-background-clip: text !important;
        background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
      }
      
      /* ========== BUTTON OVERRIDES ========== */
      .btn-primary {
        background-color: ${primaryShades[600]} !important;
      }
      .btn-primary:hover {
        background-color: ${primaryShades[700]} !important;
      }
      .btn-primary:active {
        background-color: ${primaryShades[800]} !important;
      }
      
      .btn-secondary {
        border-color: ${primaryShades[600]} !important;
        color: ${primaryShades[600]} !important;
      }
      .btn-secondary:hover {
        background-color: ${primaryShades[600]} !important;
        color: white !important;
      }
      
      /* Opacity backgrounds */
      .bg-primary-400\\/10 { background-color: ${primaryShades[400]}1A !important; }
      .bg-primary-600\\/10 { background-color: ${primaryShades[600]}1A !important; }
      .bg-accent-400\\/10 { background-color: ${accentShades[400]}1A !important; }
      .bg-accent-600\\/10 { background-color: ${accentShades[600]}1A !important; }
      .dark .dark\\:bg-primary-600\\/10 { background-color: ${primaryShades[600]}1A !important; }
      .dark .dark\\:bg-accent-600\\/10 { background-color: ${accentShades[600]}1A !important; }
      
      /* Scrollbar colors */
      ::-webkit-scrollbar-thumb {
        background-color: ${currentTheme.primary} !important;
      }
      ::-webkit-scrollbar-thumb:hover {
        background-color: ${currentTheme.accent} !important;
      }
    `;

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
