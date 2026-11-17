import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';
import { SiHashnode } from 'react-icons/si';
import { personalInfo } from '../data/personal';
import profileCutout from '../assets/profile-cutout.webp';

const Hero = () => {
  const socialLinks = [
    { icon: FiLinkedin, url: personalInfo.social.linkedin, label: 'LinkedIn' },
    { icon: FiGithub, url: personalInfo.social.github, label: 'GitHub' },
    { icon: SiHashnode, url: personalInfo.social.hashnode, label: 'Hashnode' },
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
          className="hidden sm:block mono:hidden absolute top-20 left-10 w-72 h-72 bg-primary-400/10 dark:bg-primary-600/10 rounded-full blur-3xl"
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
          className="hidden sm:block mono:hidden absolute bottom-20 right-10 w-72 h-72 bg-accent-400/10 dark:bg-accent-600/10 rounded-full blur-3xl"
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
          className="hidden sm:block mono:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-300/20 dark:bg-primary-700/20 rounded-full blur-3xl"
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
            className="relative order-first lg:order-last"
            variants={itemVariants}
          >
            <figure className="w-44 sm:w-60 lg:w-72 mx-auto">
              <div className="aspect-square rounded-full overflow-hidden bg-dark-100 dark:bg-dark-800 ring-1 ring-black/10 dark:ring-white/10 ring-offset-4 sm:ring-offset-8 ring-offset-transparent">
                <img
                  src={profileCutout}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover scale-[1.15] translate-y-[6%] origin-top"
                />
              </div>
              <figcaption className="mt-4 flex flex-col items-center gap-1 text-[11px] sm:text-xs text-dark-500 dark:text-dark-400">
                <span>{personalInfo.location}</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {personalInfo.availability.label}
                </span>
              </figcaption>
            </figure>
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
