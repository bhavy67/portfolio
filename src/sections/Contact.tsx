import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
// import { useEffect } from 'react'; // used by rotating quotes (commented out below)
import { FiMail, FiPhone, FiMapPin, FiGithub } from 'react-icons/fi';
import { FiLinkedin } from 'react-icons/fi';
import { SiHashnode } from 'react-icons/si';
import { personalInfo } from '../data/personal';
// import { getRandomQuote } from '../data/quotes';
import { featuredHindiQuote } from '../data/quotes';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { currentTheme } = useTheme();
  const [showMeaning, setShowMeaning] = useState(false);

  // Rotating English quotes — disabled in favour of the featured Hindi quote.
  // const [quote, setQuote] = useState(getRandomQuote());
  //
  // // Change quote when theme changes
  // useEffect(() => {
  //   setQuote(getRandomQuote());
  // }, [currentTheme]);

  const contactInfo = [
    { icon: FiMail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: FiPhone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: FiMapPin, label: 'Location', value: personalInfo.location, href: '#' },
  ];

  const socialLinks = [
    { icon: FiLinkedin, label: 'LinkedIn', url: personalInfo.social.linkedin, username: `@${personalInfo.social.linkedin.split('/').pop()}` },
    { icon: FiGithub, label: 'GitHub', url: personalInfo.social.github, username: `@${personalInfo.social.github.split('/').pop()}` },
    { icon: SiHashnode, label: 'Hashnode', url: personalInfo.social.hashnode, username: personalInfo.social.hashnodeUsername },
  ];

  return (
    <section id="contact" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Get In <span className="gradient-text">Touch</span>
          </motion.h2>
          <motion.p
            className="text-dark-600 dark:text-dark-400 text-base sm:text-lg max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Have a project in mind? Let's work together to create something amazing
          </motion.p>
        </div>

        {/* Availability Signal */}
        <motion.div
          className="max-w-4xl mx-auto mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-dark-200 dark:border-dark-700 bg-dark-50/50 dark:bg-dark-800/50">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-sm font-semibold text-dark-900 dark:text-white">
                {personalInfo.availability.label}
              </span>
            </div>
            <span className="text-xs sm:text-sm text-dark-500 dark:text-dark-400">
              {personalInfo.availability.responseTime}
            </span>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Social Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-4 sm:p-6 flex flex-col items-center gap-3 group text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div 
                  className="p-3 sm:p-4 rounded-xl bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-dark-300 transition-all duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = currentTheme.isDark ? `${currentTheme.primary}20` : `${currentTheme.primary}10`;
                    e.currentTarget.style.color = currentTheme.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '';
                    e.currentTarget.style.color = '';
                  }}
                >
                  <social.icon size={24} className="sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h4 className="font-semibold text-dark-900 dark:text-white mb-1 text-sm sm:text-base">
                    {social.label}
                  </h4>
                  <p className="text-xs sm:text-sm text-dark-600 dark:text-dark-400">{social.username}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                className="card p-4 sm:p-6 flex flex-col items-center gap-3 group text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index + 3) * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div 
                  className="p-3 sm:p-4 rounded-xl bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-dark-300 transition-all duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = currentTheme.isDark ? `${currentTheme.primary}20` : `${currentTheme.primary}10`;
                    e.currentTarget.style.color = currentTheme.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '';
                    e.currentTarget.style.color = '';
                  }}
                >
                  <info.icon size={24} className="sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h4 className="font-semibold text-dark-900 dark:text-white mb-1 text-sm sm:text-base">
                    {info.label}
                  </h4>
                  <p className="text-xs sm:text-sm text-dark-600 dark:text-dark-400 break-all">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Quote (rotating English quotes — kept for future use) */}
          {/* <motion.div
            className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-600 text-white text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            key={quote.text} // Re-animate when quote changes
          >
            <p className="text-lg sm:text-xl md:text-2xl italic mb-2 sm:mb-3">
              "{quote.text}"
            </p>
            <p className="text-sm sm:text-base md:text-lg opacity-90">- {quote.author}</p>
          </motion.div> */}

          {/* Featured Hindi Quote */}
          <figure
            className="relative max-w-2xl mx-auto pt-6 sm:pt-10 cursor-pointer select-none"
            // Hover on mouse, tap-to-toggle on touch
            onPointerEnter={(e) => e.pointerType === 'mouse' && setShowMeaning(true)}
            onPointerLeave={(e) => e.pointerType === 'mouse' && setShowMeaning(false)}
            onPointerUp={(e) => e.pointerType !== 'mouse' && setShowMeaning((prev) => !prev)}
          >
            {/* Ornamental divider (top) */}
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8" aria-hidden="true">
              <span className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${currentTheme.primary}80)` }} />
              <span className="text-lg" style={{ color: currentTheme.primary }}>❁</span>
              <span className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${currentTheme.primary}80)` }} />
            </div>

            {/* Faint oversized quote mark */}
            <span
              className="absolute -top-2 sm:-top-4 left-0 sm:-left-4 text-[6rem] sm:text-[9rem] leading-none font-serif opacity-10 pointer-events-none"
              style={{ color: currentTheme.primary }}
              aria-hidden="true"
            >
              ❝
            </span>

            {/* Couplet — offset lines, ink reveal */}
            <blockquote lang="hi" className="relative font-hindi text-xl sm:text-2xl md:text-3xl leading-relaxed text-dark-900 dark:text-white flex flex-col gap-2 sm:gap-3">
              {featuredHindiQuote.lines.map((line, index) => (
                <motion.span
                  key={line}
                  className={index % 2 === 0 ? 'self-start text-left pr-6 sm:pr-16' : 'self-end text-right pl-6 sm:pl-16'}
                  initial={{ opacity: 0, filter: 'blur(8px)', clipPath: 'inset(0 100% 0 0)' }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)', clipPath: 'inset(0 0% 0 0)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15 + index * 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {line}
                </motion.span>
              ))}
            </blockquote>

            {/* Author — fades in after the couplet */}
            <motion.figcaption
              lang="hi"
              className="mt-5 sm:mt-6 text-right font-hindi text-base sm:text-lg text-dark-600 dark:text-dark-400"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + featuredHindiQuote.lines.length * 0.5 + 0.2 }}
            >
              — {featuredHindiQuote.author}
            </motion.figcaption>

            {/* Translation on hover / tap */}
            <div className="min-h-[5.5rem] sm:min-h-[4.5rem] mt-4 text-center">
              <AnimatePresence mode="wait">
                {showMeaning ? (
                  <motion.div
                    key="meaning"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm italic text-dark-500 dark:text-dark-400">
                      {featuredHindiQuote.transliteration.join(' ')}
                    </p>
                    <p className="mt-1 text-sm sm:text-base text-dark-700 dark:text-dark-300">
                      {featuredHindiQuote.meaning}
                    </p>
                  </motion.div>
                ) : (
                  <motion.p
                    key="hint"
                    className="text-xs uppercase tracking-widest text-dark-400 dark:text-dark-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Hover or tap for meaning
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Ornamental divider (bottom) */}
            <div className="flex items-center gap-3 sm:gap-4 mt-4" aria-hidden="true">
              <span className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${currentTheme.primary}80)` }} />
              <span className="text-lg" style={{ color: currentTheme.primary }}>❁</span>
              <span className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${currentTheme.primary}80)` }} />
            </div>
          </figure>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
