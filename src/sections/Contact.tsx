import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiMail, FiPhone, FiMapPin, FiGithub } from 'react-icons/fi';
import { FiLinkedin } from 'react-icons/fi';
import { SiHashnode } from 'react-icons/si';
import { personalInfo } from '../data/personal';
import { getRandomQuote } from '../data/quotes';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { currentTheme } = useTheme();
  const [quote, setQuote] = useState(getRandomQuote());

  // Change quote when theme changes
  useEffect(() => {
    setQuote(getRandomQuote());
  }, [currentTheme]);

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

          {/* Quote */}
          <motion.div
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
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
