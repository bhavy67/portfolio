import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { currentTheme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Theme Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-xl bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700 transition-colors shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Change theme"
      >
        <span className="text-2xl">{currentTheme.icon}</span>
      </motion.button>

      {/* Theme Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Compact Dropdown Menu */}
            <motion.div
              className="absolute right-0 top-14 w-80 glass rounded-2xl shadow-2xl z-50 overflow-hidden"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4">
                {/* Header */}
                <h3 className="text-base font-bold text-dark-900 dark:text-white mb-3 text-center">
                  Choose Theme
                </h3>

                {/* Theme Grid - 3 per row */}
                <div className="grid grid-cols-3 gap-3">
                  {themes.map((theme) => (
                    <motion.button
                      key={theme.id}
                      onClick={() => {
                        setTheme(theme.id);
                        setIsOpen(false);
                      }}
                      className={`relative p-3 rounded-xl transition-all ${
                        currentTheme.id === theme.id
                          ? 'bg-primary-100 dark:bg-primary-900/30 ring-2 ring-primary-500'
                          : 'bg-dark-50 dark:bg-dark-800 hover:bg-dark-100 dark:hover:bg-dark-700'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={theme.name}
                    >
                      {/* Theme Icon */}
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl shadow-md"
                          style={{ backgroundColor: theme.primary }}
                        >
                          {theme.icon}
                        </div>
                        
                        {/* Color Dots */}
                        <div className="flex gap-1">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: theme.primary }}
                          />
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: theme.accent }}
                          />
                        </div>
                      </div>

                      {/* Selected Indicator */}
                      {currentTheme.id === theme.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 bg-primary-500 rounded-full p-1"
                        >
                          <HiCheckCircle size={16} className="text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
