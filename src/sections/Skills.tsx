import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import * as SimpleIcons from 'react-icons/si';
import { skills } from '../data/personal';

const Skills = () => {
  const categories = [
    { title: 'Frontend', data: skills.frontend, gradient: 'from-primary-500 via-accent-500 to-primary-600' },
    { title: 'Backend', data: skills.backend, gradient: 'from-accent-500 via-primary-600 to-accent-600' },
    { title: 'Database', data: skills.database, gradient: 'from-primary-600 via-accent-600 to-primary-700' },
    { title: 'Tools & DevOps', data: skills.tools, gradient: 'from-accent-600 via-primary-700 to-accent-700' },
  ];

  const getIcon = (iconName: string): IconType => {
    return (SimpleIcons as any)[iconName] || SimpleIcons.SiJavascript;
  };

  return (
    <section id="skills" className="section-container bg-dark-50 dark:bg-dark-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Skills & <span className="gradient-text">Technologies</span>
          </motion.h2>
          <motion.p
            className="text-dark-600 dark:text-dark-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Technologies and tools I work with to build amazing products
          </motion.p>
        </div>

        {/* Skills Grid - Test Tube Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              className="card p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">
                  {category.title}
                </h3>
                <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${category.gradient}`} />
              </div>

              {/* Test Tube Skills */}
              <div className="space-y-4">
                {category.data.map((skill, index) => {
                  const Icon = getIcon(skill.icon);
                  return (
                    <motion.div
                      key={skill.name}
                      className="relative group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      {/* Test Tube Container */}
                      <div className="flex items-center gap-3">
                        {/* Icon Circle */}
                        <motion.div
                          className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white shadow-lg`}
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon size={20} />
                        </motion.div>

                        {/* Test Tube */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-dark-900 dark:text-white">
                              {skill.name}
                            </span>
                          </div>
                          
                          {/* Tube Container */}
                          <div className="relative h-6 bg-dark-200 dark:bg-dark-700 rounded-full overflow-hidden shadow-inner">
                            {/* Liquid Fill */}
                            <motion.div
                              className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${category.gradient} shadow-lg`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ 
                                duration: 1.5, 
                                delay: index * 0.1,
                                ease: "easeOut"
                              }}
                              style={{
                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                              }}
                            >
                              {/* Shine Effect */}
                              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent rounded-full" />
                              
                              {/* Bubbles */}
                              <motion.div
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/50 rounded-full"
                                animate={{
                                  y: [-5, -10, -5],
                                  opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              />
                            </motion.div>

                            {/* Glass Effect Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 rounded-full pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Tooltip on Hover */}
                      <motion.div
                        className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-dark-900 dark:bg-white text-white dark:text-dark-900 text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg"
                        initial={{ opacity: 0, y: 5 }}
                        whileHover={{ opacity: 1, y: 0 }}
                      >
                        {skill.level}% Proficiency
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-dark-900 dark:bg-white rotate-45" />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { label: 'Years Experience', value: '3+', icon: '💼' },
            { label: 'Projects Completed', value: '50+', icon: '🚀' },
            { label: 'Technologies', value: '30+', icon: '⚡' },
            { label: 'Happy Clients', value: '25+', icon: '😊' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="card p-6 text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="text-3xl mb-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {stat.icon}
              </motion.div>
              <motion.h4
                className="text-3xl md:text-4xl font-bold gradient-text mb-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {stat.value}
              </motion.h4>
              <p className="text-dark-600 dark:text-dark-400 text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
