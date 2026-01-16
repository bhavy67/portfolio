import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { projects } from '../data/projects';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Removed category filtering - showing all projects
  // const [selectedCategory, setSelectedCategory] = useState('All');
  // const filteredProjects = selectedCategory === 'All' ? projects : projects.filter(...);

  return (
    <section id="projects" className="section-container">
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
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            className="text-dark-600 dark:text-dark-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Showcase of my best work and side projects
          </motion.p>
        </div>

        {/* Removed Filter Buttons Section */}
        {/* 
        <motion.div className="flex flex-wrap justify-center gap-3 mb-12">
          <FiFilter className="text-dark-600 dark:text-dark-400 mt-2" size={20} />
          {projectCategories.map((category) => (
            <motion.button key={category} onClick={() => setSelectedCategory(category)}>
              {category}
            </motion.button>
          ))}
        </motion.div>
        */}

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="card overflow-hidden group cursor-pointer"
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              whileHover={{ y: -10 }}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-primary-600 text-white text-xs font-bold shadow-lg">
                    Featured
                  </span>
                </div>
              )}

              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredProject === project.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Overlay Links */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredProject === project.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white text-dark-900 shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiExternalLink size={20} />
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white text-dark-900 shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiGithub size={20} />
                  </motion.a>
                </motion.div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Category */}
                <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium mb-3">
                  {project.category}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-dark-600 dark:text-dark-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-300 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 rounded bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-300 text-xs">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Date */}
                <p className="text-xs text-dark-500 dark:text-dark-500">
                  {project.date}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiGithub />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
