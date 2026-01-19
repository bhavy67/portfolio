import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiExternalLink } from 'react-icons/fi';
import { SiMedium, SiDevdotto } from 'react-icons/si';
import { blogPosts } from '../data/blogs';

const Blogs = () => {
  const getPlatformIcon = (platform: string) => {
    return platform === 'Medium' ? SiMedium : SiDevdotto;
  };

  return (
    <section id="blogs" className="section-container bg-dark-50 dark:bg-dark-900">
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
            Latest <span className="gradient-text">Blogs</span>
          </motion.h2>
          <motion.p
            className="text-dark-600 dark:text-dark-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Sharing knowledge and insights about web development
          </motion.p>
        </div>

        {/* Featured Blogs */}
        <div className={`grid gap-8 mb-12 ${
          blogPosts.filter((post) => post.featured).length === 1 
            ? 'lg:grid-cols-1 max-w-3xl mx-auto' 
            : 'lg:grid-cols-2'
        }`}>
          {blogPosts
            .filter((post) => post.featured)
            .map((post, index) => {
              const PlatformIcon = getPlatformIcon(post.platform);
              return (
                <motion.a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card overflow-hidden group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -8 }}
                >
                  {/* Featured Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary-600 to-purple-600 text-white text-xs font-bold shadow-lg">
                      Featured
                    </span>
                  </div>

                  {/* Blog Image */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Platform Badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full glass">
                      <PlatformIcon className="text-white" size={16} />
                      <span className="text-white text-sm font-medium">{post.platform}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-dark-600 dark:text-dark-400 mb-4 line-clamp-3">
                      {post.summary}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-dark-600 dark:text-dark-400 mb-4">
                      <div className="flex items-center gap-1">
                        <FiCalendar size={14} />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiClock size={14} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-300 text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More Link */}
                    <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium group-hover:gap-3 transition-all">
                      <span>Read Article</span>
                      <FiExternalLink size={16} />
                    </div>
                  </div>
                </motion.a>
              );
            })}
        </div>

        {/* Other Blogs */}
        <div className={`grid gap-6 ${
          blogPosts.filter((post) => !post.featured).length === 1 
            ? 'md:grid-cols-1 max-w-2xl mx-auto' 
            : blogPosts.filter((post) => !post.featured).length === 2 
            ? 'md:grid-cols-2 max-w-4xl mx-auto' 
            : 'md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {blogPosts
            .filter((post) => !post.featured)
            .map((post, index) => {
              const PlatformIcon = getPlatformIcon(post.platform);
              return (
                <motion.a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card overflow-hidden group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Blog Image */}
                  <div className="relative h-40 overflow-hidden">
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Platform Icon */}
                    <div className="absolute top-3 right-3 p-2 rounded-full glass">
                      <PlatformIcon className="text-white" size={14} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-dark-600 dark:text-dark-400 text-sm mb-3 line-clamp-2">
                      {post.summary}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-dark-600 dark:text-dark-400 mb-3">
                      <div className="flex items-center gap-1">
                        <FiCalendar size={12} />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiClock size={12} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-300 text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.a>
              );
            })}
        </div>

        {/* View All Blogs Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="https://medium.com/@yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SiMedium />
            View All Blogs
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Blogs;
