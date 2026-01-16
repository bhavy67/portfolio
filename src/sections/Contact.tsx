import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';
import { FiLinkedin } from 'react-icons/fi';
import { personalInfo } from '../data/personal';
import { getRandomQuote } from '../data/quotes';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { currentTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quote, setQuote] = useState(getRandomQuote());

  // Change quote when theme changes
  useEffect(() => {
    setQuote(getRandomQuote());
  }, [currentTheme]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    { icon: FiMail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: FiPhone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: FiMapPin, label: 'Location', value: personalInfo.location, href: '#' },
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
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Get In <span className="gradient-text">Touch</span>
          </motion.h2>
          <motion.p
            className="text-dark-600 dark:text-dark-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Have a project in mind? Let's work together to create something amazing
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* LinkedIn Card */}
            <motion.a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 flex items-center gap-4 group"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              whileHover={{ x: 10 }}
            >
              <div 
                className="p-3 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-dark-300 transition-all duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = currentTheme.isDark ? `${currentTheme.primary}20` : `${currentTheme.primary}10`;
                  e.currentTarget.style.color = currentTheme.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '';
                  e.currentTarget.style.color = '';
                }}
              >
                <FiLinkedin size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-dark-900 dark:text-white">
                  LinkedIn
                </h4>
                <p className="text-dark-600 dark:text-dark-400">@{personalInfo.social.linkedin.split('/').pop()}</p>
              </div>
            </motion.a>

            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  className="card p-6 flex items-center gap-4 group"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index + 1) * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <div 
                    className="p-3 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-dark-300 transition-all duration-300"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = currentTheme.isDark ? `${currentTheme.primary}20` : `${currentTheme.primary}10`;
                      e.currentTarget.style.color = currentTheme.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '';
                      e.currentTarget.style.color = '';
                    }}
                  >
                    <info.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-900 dark:text-white">
                      {info.label}
                    </h4>
                    <p className="text-dark-600 dark:text-dark-400">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Quote */}
            <motion.div
              className="p-6 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-600 text-white"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              key={quote.text} // Re-animate when quote changes
            >
              <p className="text-lg italic mb-2">
                "{quote.text}"
              </p>
              <p className="text-sm opacity-90">- {quote.author}</p>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="card p-8">
              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FiCheckCircle className="text-green-600 dark:text-green-400" size={40} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-dark-600 dark:text-dark-400">
                    Thank you for reaching out. I'll get back to you soon!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
