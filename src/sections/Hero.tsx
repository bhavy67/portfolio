import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import { personalInfo } from '../data/personal';

const Hero = () => {
  const socialLinks = [
    { icon: FiGithub, url: personalInfo.social.github, label: 'GitHub' },
    { icon: FiLinkedin, url: personalInfo.social.linkedin, label: 'LinkedIn' },
    { icon: SiLeetcode, url: personalInfo.social.leetcode, label: 'LeetCode' },
    { icon: FiMail, url: `mailto:${personalInfo.email}`, label: 'Email' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-12 px-4 sm:px-6"
    >
      {/* Minimal Animated Background - Common for all themes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-dark-950 dark:via-dark-900 dark:to-dark-950" />
        
        {/* Minimal Animated Shapes with theme colors - Constrained to viewport */}
        <motion.div
          className="hidden sm:block absolute top-20 left-10 w-72 h-72 bg-primary-400/10 dark:bg-primary-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="hidden sm:block absolute bottom-20 right-10 w-72 h-72 bg-accent-400/10 dark:bg-accent-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-300/20 dark:bg-primary-700/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="section-container w-full">
        <motion.div
          className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <div className="space-y-3 sm:space-y-6 lg:space-y-8 text-center lg:text-left">
            <motion.h1
              className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              variants={itemVariants}
            >
              Hi, I'm{' '}
              <span className="gradient-text block sm:inline">{personalInfo.name}</span>
            </motion.h1>

            <motion.h2
              className="text-base sm:text-2xl md:text-3xl font-semibold text-dark-600 dark:text-dark-400"
              variants={itemVariants}
            >
              {personalInfo.title}
            </motion.h2>

            <motion.p
              className="text-xs sm:text-lg text-dark-600 dark:text-dark-400 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              variants={itemVariants}
            >
              {personalInfo.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <motion.a
                href="#projects"
                className="btn-primary text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Projects
              </motion.a>
              <motion.a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload />
                View Resume
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-2 sm:gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-dark-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="text-base sm:text-xl" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Profile Image */}
          <motion.div
            className="relative order-first lg:order-last overflow-hidden"
            variants={itemVariants}
          >
            <div className="relative w-48 sm:w-64 md:w-80 mx-auto">
              {/* Decorative Elements - Constrained */}
              <motion.div
                className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-700 rounded-full blur-2xl opacity-30"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 45, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              
              {/* Profile Image */}
              <motion.div
                className="relative rounded-full overflow-hidden aspect-square border-2 sm:border-4 md:border-8 border-white dark:border-dark-800 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                className="absolute -bottom-1 -right-1 sm:-bottom-4 sm:-right-4 glass rounded-lg sm:rounded-2xl p-2 sm:p-4 shadow-xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <p className="text-lg sm:text-3xl font-bold text-primary-600">3+</p>
                <p className="text-[10px] sm:text-sm text-dark-600 dark:text-dark-400">Years Exp</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-dark-400 dark:border-dark-600 flex justify-center p-1"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-dark-400 dark:bg-dark-600"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
