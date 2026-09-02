import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import * as SimpleIcons from 'react-icons/si';
import { skills } from '../data/personal';

const categories = [
  { title: 'Frontend', data: skills.frontend },
  { title: 'Backend', data: skills.backend },
  { title: 'Database', data: skills.database },
  { title: 'Tools & DevOps', data: skills.tools },
];

const getIcon = (iconName: string): IconType =>
  (SimpleIcons as any)[iconName] || SimpleIcons.SiJavascript;

const Skills = () => {
  return (
    <section id="skills" className="section-container bg-dark-50 dark:bg-dark-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Skills & <span className="gradient-text">Technologies</span>
          </motion.h2>
          <motion.p
            className="text-dark-600 dark:text-dark-400 text-base sm:text-lg max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Technologies and Tools I work with to build amazing products
          </motion.p>
        </div>

        {/* Skills Grid */}
        <div className="space-y-10 md:space-y-12">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.08 }}
            >
              <div className="flex items-center gap-4 mb-5">
                <span className="text-xs font-semibold uppercase tracking-widest text-dark-500 dark:text-dark-400">
                  {category.title}
                </span>
                <div className="flex-1 h-px bg-dark-200 dark:bg-dark-700" />
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {category.data.map((skill, index) => {
                  const Icon = getIcon(skill.icon);
                  return (
                    <motion.div
                      key={skill.name}
                      className="group flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-dark-200 dark:border-dark-700 bg-white dark:bg-dark-800 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950/40 transition-all duration-200 cursor-default"
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: index * 0.035 }}
                      whileHover={{ y: -2 }}
                    >
                      <Icon
                        size={14}
                        className="text-dark-400 dark:text-dark-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors shrink-0"
                      />
                      <span className="text-xs sm:text-sm font-medium text-dark-700 dark:text-dark-300 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors whitespace-nowrap">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
