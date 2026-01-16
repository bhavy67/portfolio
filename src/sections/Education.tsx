import { motion } from 'framer-motion';
import { FiAward, FiCalendar, FiMapPin } from 'react-icons/fi';
import { education } from '../data/personal';

const Education = () => {
  return (
    <section id="education" className="section-container">
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
            <span className="gradient-text">Education</span>
          </motion.h2>
          <motion.p
            className="text-dark-600 dark:text-dark-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            My academic background and qualifications
          </motion.p>
        </div>

        {/* Education Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              className="card p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              {/* Icon */}
              <motion.div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center mb-6"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <FiAward size={32} className="text-white" />
              </motion.div>

              {/* Degree */}
              <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-3">
                {edu.degree}
              </h3>

              {/* Institution */}
              <p className="text-xl text-primary-600 dark:text-primary-400 font-semibold mb-4">
                {edu.institution}
              </p>

              {/* Details */}
              <div className="flex flex-wrap gap-4 text-sm text-dark-600 dark:text-dark-400 mb-4">
                <div className="flex items-center gap-2">
                  <FiCalendar size={14} />
                  <span>{edu.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiMapPin size={14} />
                  <span>{edu.location}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                  GPA: {edu.gpa}
                </span>
              </div>

              {/* Description */}
              <p className="text-dark-700 dark:text-dark-300 mb-4">
                {edu.description}
              </p>

              {/* Achievements */}
              <div>
                <h4 className="font-semibold text-dark-900 dark:text-white mb-2">
                  Achievements:
                </h4>
                <ul className="space-y-2">
                  {edu.achievements.map((achievement, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-dark-700 dark:text-dark-300 text-sm"
                    >
                      <span className="text-primary-500 mt-1">▹</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Education;
