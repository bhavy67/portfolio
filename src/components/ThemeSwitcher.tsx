import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HiCheck } from 'react-icons/hi';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

// ─── Splash Overlay ────────────────────────────────────────────────────────────
// Full-screen reveal expanding from top-center via clip-path: circle().
// Geometric clip-paths (circle, ellipse, inset) ARE GPU-composited in
// Chrome 88+ and Safari 13.1+; only complex polygon paths hit the software
// rasteriser. Fixed origin at (50%, 0px) creates the "wand-from-above" feel —
// the magic always descends from the top, never from a random click point.
//
// Easing: cubic-bezier(0.16, 1, 0.3, 1) — easeOutExpo
//   Ultra-fast burst at t=0 (the snap), long graceful deceleration to the end.
//   Maps to a magician's wrist motion: forceful initiation, elegant landing.
//
// Timing:
//   Phase 1 — circle(0→maxR)   easeOutExpo, covers viewport        (compositor)
//   onCovered                   setTheme() + CSS injection          (main thread, hidden)
//   Double rAF + settle         browser finishes style recalc
//   Phase 2 — opacity(1→0)     curtain dissolve reveals new theme  (compositor)

type SplashProps = {
  gradient: string;
  maxRadius: number;
  duration: number;
  onCovered: () => void;
  onDone: () => void;
};

const SplashOverlay = ({ gradient, maxRadius, duration, onCovered, onDone }: SplashProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onCovered();
      onDone();
      return;
    }

    (async () => {
      // Phase 1 — clip-path circle expands from top-center
      await el.animate(
        [
          { clipPath: 'circle(0px at 50% 0px)' },
          { clipPath: `circle(${maxRadius}px at 50% 0px)` },
        ],
        { duration, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }
      ).finished;

      onCovered(); // ← setTheme() fires here while page is fully covered

      // Two rAFs: lets browser finish style recalc before the fade begins
      await new Promise<void>(resolve =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      );

      // Phase 2 — dissolve out, revealing the newly-themed page
      await el.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 240, easing: 'cubic-bezier(0.4, 0, 1, 1)', fill: 'forwards' }
      ).finished;

      onDone();
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: gradient,
        clipPath: 'circle(0px at 50% 0px)',
        willChange: 'clip-path, opacity',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />,
    document.body
  );
};

// ─── ThemeSwitcher ─────────────────────────────────────────────────────────────

type SplashState = Omit<SplashProps, 'onCovered' | 'onDone'>;

const ThemeSwitcher = () => {
  const { currentTheme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [splash, setSplash] = useState<SplashState | null>(null);
  const pendingId = useRef<string | null>(null);

  const lightThemes = themes.filter(t => !t.isDark);
  const darkThemes = themes.filter(t => t.isDark);

  const handleThemeSelect = (themeId: string) => {
    if (splash) return;

    const next = themes.find(t => t.id === themeId)!;
    // Distance from top-center (50%, 0%) to the farthest viewport corner
    const maxRadius = Math.ceil(Math.hypot(window.innerWidth / 2, window.innerHeight)) + 20;

    pendingId.current = themeId;
    setIsOpen(false);
    setSplash({
      // Gradient radiates from the reveal origin: bright accent at top, deep primary toward edges
      // Creates the sensation of light pouring down as the new theme descends
      gradient: `radial-gradient(circle at 50% 0%, ${next.accent} 0%, ${next.primary} 60%)`,
      maxRadius,
      // ~2px/ms base velocity — scaled so large displays don't feel sluggish
      duration: Math.round(Math.min(680, Math.max(480, maxRadius / 2))),
    });
  };

  const handleCovered = () => {
    if (pendingId.current) {
      setTheme(pendingId.current);
      pendingId.current = null;
    }
  };

  return (
    <div className="relative">
      {splash && (
        <SplashOverlay
          {...splash}
          onCovered={handleCovered}
          onDone={() => setSplash(null)}
        />
      )}

      {/* Trigger button — gradient circle previews current theme at a glance */}
      <motion.button
        onClick={() => { if (!splash) setIsOpen(!isOpen); }}
        className="p-2.5 rounded-lg bg-dark-100 dark:bg-dark-800 hover:bg-dark-200 dark:hover:bg-dark-700 transition-colors shadow-lg relative"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Change theme"
        style={{ touchAction: 'manipulation' }}
      >
        <div
          className="w-5 h-5 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.accent} 100%)`,
          }}
        />

        {/* Ripple ring — expands from button while transition is in flight */}
        <AnimatePresence>
          {splash && (
            <motion.span
              className="absolute inset-0 rounded-lg border-2 pointer-events-none"
              style={{ borderColor: currentTheme.primary }}
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ opacity: 0, scale: 1.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop — closes dropdown on outside click/tap */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

            <motion.div
              className="absolute right-0 top-14 w-64 max-w-[calc(100vw-2rem)] glass rounded-2xl shadow-2xl z-50 overflow-hidden"
              initial={{ opacity: 0, y: -12, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28, mass: 0.8 }}
            >
              <div className="p-4 space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-dark-400 dark:text-dark-500 text-center">
                  Theme
                </p>

                {[
                  { label: 'Light', icon: <FiSun size={11} />, items: lightThemes },
                  { label: 'Dark', icon: <FiMoon size={11} />, items: darkThemes },
                ].map(({ label, icon, items }) => (
                  <div key={label}>
                    {/* Section header with separator line */}
                    <div className="flex items-center gap-2 mb-2.5 px-0.5">
                      <span className="text-dark-400 dark:text-dark-500">{icon}</span>
                      <p className="text-xs font-medium text-dark-400 dark:text-dark-500">{label}</p>
                      <div className="flex-1 h-px bg-dark-200 dark:bg-dark-700" />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {items.map((theme) => {
                        const isActive = currentTheme.id === theme.id;
                        return (
                          <motion.button
                            key={theme.id}
                            onClick={() => handleThemeSelect(theme.id)}
                            className={`relative rounded-xl overflow-hidden outline-none ${
                              isActive
                                ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-dark-900'
                                : ''
                            }`}
                            style={{
                              touchAction: 'manipulation',
                              ...(isActive
                                ? ({ '--tw-ring-color': theme.primary } as React.CSSProperties)
                                : {}),
                            }}
                            whileHover={!isActive ? { scale: 1.07, y: -1 } : {}}
                            whileTap={{ scale: 0.93 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                            title={theme.name}
                          >
                            {/* Gradient swatch — taller for easier touch targeting */}
                            <div
                              className="h-10 w-full"
                              style={{
                                background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
                              }}
                            >
                              {isActive && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                                  className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
                                >
                                  <HiCheck className="w-2.5 h-2.5" style={{ color: theme.primary }} />
                                </motion.div>
                              )}
                            </div>

                            {/* Name label */}
                            <div className="bg-dark-50 dark:bg-dark-800 px-1 py-1.5">
                              <span className="text-[10px] font-medium text-dark-600 dark:text-dark-300 truncate w-full block text-center leading-tight">
                                {theme.name}
                              </span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
