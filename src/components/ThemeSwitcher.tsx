import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HiCheck } from 'react-icons/hi';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { currentTheme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const lightThemes = themes.filter(t => !t.isDark);
  const darkThemes = themes.filter(t => t.isDark);

  return (
    <div className="relative">
      {/* Trigger — gradient pill showing the active theme */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-lg bg-dark-100 dark:bg-dark-800 hover:bg-dark-200 dark:hover:bg-dark-700 transition-colors shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Change theme"
      >
        <div
          className="w-5 h-5 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.accent} 100%)`,
          }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

            <motion.div
              className="absolute right-0 top-14 w-64 glass rounded-2xl shadow-2xl z-50 overflow-hidden"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
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
                    <div className="flex items-center gap-1.5 mb-2 px-0.5">
                      <span className="text-dark-400 dark:text-dark-500">{icon}</span>
                      <p className="text-xs font-medium text-dark-400 dark:text-dark-500">{label}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {items.map((theme) => {
                        const isActive = currentTheme.id === theme.id;
                        return (
                          <motion.button
                            key={theme.id}
                            onClick={() => { setTheme(theme.id); setIsOpen(false); }}
                            className={`relative rounded-xl overflow-hidden outline-none transition-all ${
                              isActive ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-dark-900' : 'hover:scale-105'
                            }`}
                            style={isActive ? { '--tw-ring-color': theme.primary } as React.CSSProperties : {}}
                            whileTap={{ scale: 0.95 }}
                            title={theme.name}
                          >
                            {/* Gradient swatch */}
                            <div
                              className="h-9 w-full"
                              style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)` }}
                            >
                              {isActive && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-white/90 flex items-center justify-center"
                                >
                                  <HiCheck className="w-2.5 h-2.5" style={{ color: theme.primary }} />
                                </motion.div>
                              )}
                            </div>

                            {/* Name */}
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
