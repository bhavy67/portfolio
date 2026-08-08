import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { SiHashnode } from 'react-icons/si';
import { personalInfo } from '../data/personal';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FiGithub, url: personalInfo.social.github, label: 'GitHub' },
    { icon: FiLinkedin, url: personalInfo.social.linkedin, label: 'LinkedIn' },
    { icon: SiHashnode, url: personalInfo.social.hashnode, label: 'Hashnode' },
    { icon: FiMail, url: `mailto:${personalInfo.email}`, label: 'Email' },
  ];

  const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blogs', href: '#blogs' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-100 dark:bg-dark-900 text-gray-900 dark:text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold gradient-text mb-4">
              {personalInfo.name}
            </h3>
            <p className="dark:text-dark-400 text-gray-600 mb-4">
              {personalInfo.title}
            </p>
            <p className="dark:text-dark-400 text-gray-600 text-sm">
              {personalInfo.tagline}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="dark:text-dark-400 text-gray-600 dark:hover:text-primary-400 hover:text-primary-600 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Connect With Me</h4>
            <div className="flex gap-3 mb-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-gray-200 dark:bg-dark-800 hover:bg-gray-300 dark:hover:bg-dark-700 dark:text-dark-400 text-gray-700 hover:text-gray-900 dark:hover:text-white transition-all"
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
            <p className="dark:text-dark-400 text-gray-600 text-sm">
              Feel free to reach out for collaborations or just a friendly chat!
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 dark:border-dark-800 my-8" />

        {/* Bottom Footer */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="dark:text-dark-400 text-gray-600 text-sm text-center md:text-left">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          
          <motion.p
            className="dark:text-dark-400 text-gray-600 text-sm flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            Crafted with <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FiHeart className="text-red-500" />
            </motion.span> and lots of ☕
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
