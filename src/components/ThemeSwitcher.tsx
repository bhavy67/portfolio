import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HiCheck } from 'react-icons/hi';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

// ─── Splash Overlay ────────────────────────────────────────────────────────────
// Synchronized wipe transition — the overlay covers the full screen at t=0,
// the theme switches while hidden, then the overlay retreats top→bottom.
//
// Two elements animate in lockstep (same duration + easing = exact pixel sync):
//   overlay  — full-screen div, clip-path inset grows from top (0%→100%)
//   blade    — 3px glowing strip, translateY(0→innerHeight) tracks the clip edge
//
// clip-path: inset(top right bottom left)
//   inset(0% 0 0 0)   → entire overlay visible (screen covered)
//   inset(100% 0 0 0) → overlay clipped entirely from top (nothing visible)
//
// As the clip top crosses each pixel row, that row is revealed in the new theme.
// The blade marks the live edge — a glow of the accent color that feels like
// light catching the page as it turns.
//
// Easing: cubic-bezier(0.55, 0, 1, 0.45) — easeIn-heavy
//   Starts almost still, builds momentum, slams through the bottom. No brake.
//   Reads as gravity doing the work — the page drops.

type SplashProps = {
  gradient: string;
  accentColor: string;
  duration: number;
  onCovered: () => void;
  onDone: () => void;
};

const SplashOverlay = ({ gradient, accentColor, duration, onCovered, onDone }: SplashProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const bladeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const blade = bladeRef.current;
    if (!overlay || !blade) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onCovered();
      onDone();
      return;
    }

    (async () => {
      // Theme switches immediately while the full overlay hides the recalc
      onCovered();

      // Let browser finish the style recalc before the wipe begins
      await new Promise<void>(resolve =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      );

      const easing = 'cubic-bezier(0.55, 0, 1, 0.45)';
      const opts = { duration, easing, fill: 'forwards' } as const;
      const h = window.innerHeight;

      // Both animations share identical timing — clip edge and blade stay pixel-perfect in sync
      await Promise.all([
        overlay.animate(
          [{ clipPath: 'inset(0% 0 0 0)' }, { clipPath: 'inset(100% 0 0 0)' }],
          opts
        ).finished,
        blade.animate(
          [{ transform: 'translateY(0px)' }, { transform: `translateY(${h}px)` }],
          opts
        ).finished,
      ]);

      onDone();
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <>
      {/* Main overlay — retreats downward, revealing new theme from top */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: gradient,
          clipPath: 'inset(0% 0 0 0)',
          willChange: 'clip-path',
          zIndex: 9998,
          pointerEvents: 'none',
        }}
      />
      {/* Blade — glowing sweep line at the live reveal edge */}
      <div
        ref={bladeRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: accentColor,
          boxShadow: [
            `0 -6px 20px 6px ${accentColor}55`,
            `0  4px 12px 3px ${accentColor}40`,
          ].join(', '),
          willChange: 'transform',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      />
    </>,
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

    pendingId.current = themeId;
    setIsOpen(false);
    setSplash({
      // Accent at top (wipe origin — most vibrant) deepening to primary at bottom
      gradient: `linear-gradient(to bottom, ${next.accent} 0%, ${next.primary} 100%)`,
      accentColor: next.accent,
      duration: Math.round(Math.min(640, Math.max(500, window.innerHeight * 0.7))),
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
              style={{ borderColor: currentTheme.accent }}
              initial={{ opacity: 0.9, scale: 1 }}
              animate={{ opacity: 0, scale: 1.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
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
