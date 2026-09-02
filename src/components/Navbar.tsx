import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { useScrollPosition } from '../hooks/useCustomHooks';
import ThemeSwitcher from './ThemeSwitcher';

const SCRAMBLE_CHARS = 'abcdefghijklmnopqrstuvwxyz';

const Logo = ({ onNavigate }: { onNavigate: () => void }) => {
  const [typed, setTyped] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [hideCursor, setHideCursor] = useState(false);
  const [showDot, setShowDot] = useState(false);
  const [display, setDisplay] = useState('');
  const scrambleInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const isTypingDone = useRef(false);
  const full = 'bhavy';
  // Humanized — b is slow (thinking), h-a-v quick burst, y slightly hesitant
  const charDelays = [220, 340, 415, 478, 560];

  // Boot sequence: type → cursor blinks → cursor fades → status dot appears
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    charDelays.forEach((delay, i) => {
      const t = setTimeout(() => {
        setTyped(full.slice(0, i + 1));
        setDisplay(full.slice(0, i + 1));
        if (i === full.length - 1) {
          isTypingDone.current = true;
          setShowCursor(true);
          const t2 = setTimeout(() => {
            setHideCursor(true);
            const t3 = setTimeout(() => setShowDot(true), 200);
            timeouts.push(t3);
          }, 2000);
          timeouts.push(t2);
        }
      }, delay);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Scramble: letters cycle through random chars, resolve left-to-right
  const startScramble = () => {
    if (!isTypingDone.current) return;

    let iteration = 0;
    scrambleInterval.current = setInterval(() => {
      const result = full
        .split('')
        .map((char, i) => {
          if (i < Math.floor(iteration)) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join('');

      setDisplay(result);
      iteration += 0.38;

      if (iteration > full.length) {
        clearInterval(scrambleInterval.current!);
        setDisplay(full);
      }
    }, 32);
  };

  const stopScramble = () => {
    if (scrambleInterval.current) clearInterval(scrambleInterval.current);
    setDisplay(full);
  };

  return (
    <div className="flex items-center gap-2.5">
      <motion.a
        href="#home"
        onClick={(e) => { e.preventDefault(); onNavigate(); }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={startScramble}
        onHoverEnd={stopScramble}
        className="flex items-baseline select-none cursor-pointer"
      >
        {/* The slash — slides in first, anchors the mark */}
        <motion.span
          className="font-mono text-xl font-bold gradient-text leading-none pr-[1px]"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          /
        </motion.span>

        {/* Name — shows scrambled chars on hover, typed text otherwise */}
        <span className="font-mono text-xl font-semibold text-dark-900 dark:text-white tracking-tight leading-none">
          {display}
        </span>

        {/* Cursor while typing in progress */}
        {!showCursor && typed.length > 0 && (
          <motion.span
            className="inline-block w-[2px] h-[18px] bg-primary-400 ml-[2px] translate-y-[1px]"
            animate={{ opacity: [1, 0.15] }}
            transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse' }}
          />
        )}

        {/* Cursor after typing — blinks then disappears */}
        {showCursor && !hideCursor && (
          <motion.span
            className="inline-block w-[2px] h-[18px] bg-primary-500 ml-[2px] translate-y-[1px]"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.55, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          />
        )}
      </motion.a>

      {/* Status dot — appears after boot sequence, stays ambient */}
      <AnimatePresence>
        {showDot && (
          <motion.div
            className="group relative flex items-center cursor-default"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5, duration: 0.4 }}
          >
            {/* Outer pulse ring */}
            <motion.span
              className="absolute w-3 h-3 rounded-full bg-emerald-400/30"
              animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
            />
            {/* Inner solid dot */}
            <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400 block" />

            {/* Tooltip */}
            <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="px-2.5 py-1.5 bg-dark-950 dark:bg-dark-700 text-white text-[11px] font-medium rounded-lg whitespace-nowrap shadow-xl">
                Open to good problems
                <div className="absolute -top-[4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-dark-950 dark:bg-dark-700 rotate-45" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 50;

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blogs', href: '#blogs' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass shadow-lg py-3 md:py-4'
            : 'bg-transparent py-4 md:py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo onNavigate={() => scrollToSection('#home')} />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-dark-700 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                >
                  {link.name}
                </motion.a>
              ))}

              {/* Theme Switcher */}
              <ThemeSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
              <ThemeSwitcher />

              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700 transition-colors"
                whileTap={{ scale: 0.9 }}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed inset-0 z-30 md:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Content */}
        <motion.div
          className="absolute top-20 right-4 left-4 max-w-md mx-auto max-h-[calc(100vh-7rem)] overflow-y-auto glass rounded-2xl p-6 shadow-2xl"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : -20,
            scale: isOpen ? 1 : 0.95,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-base font-medium text-dark-700 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 py-3 px-4 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  x: isOpen ? 0 : -20,
                }}
                transition={{ delay: index * 0.05 }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Navbar;
