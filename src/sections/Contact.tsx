import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiArrowUpRight, FiCopy, FiCheck } from 'react-icons/fi';
import { SiHashnode } from 'react-icons/si';
import { personalInfo } from '../data/personal';
import { featuredQuote } from '../data/quotes';
// Rotating quotes are still available via getRandomQuote() in ../data/quotes

const ease = [0.16, 1, 0.3, 1] as const;

const Contact = () => {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${personalInfo.email}`;
    }
  };

  const links = [
    { icon: FiLinkedin, label: 'LinkedIn', value: `@${personalInfo.social.linkedin.split('/').pop()}`, href: personalInfo.social.linkedin },
    { icon: FiGithub, label: 'GitHub', value: `@${personalInfo.social.github.split('/').pop()}`, href: personalInfo.social.github },
    { icon: SiHashnode, label: 'Hashnode', value: personalInfo.social.hashnodeUsername, href: personalInfo.social.hashnode },
    { icon: FiPhone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
  ];

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section id="contact" className="section-container">
      {/* Quote as the section headline: first line muted, second line lands */}
      <figure className="max-w-6xl mx-auto">
        {/* Observe the blockquote, not the lines: the lines start clipped by overflow-hidden, so they'd never intersect */}
        <motion.blockquote
          className="font-display font-bold tracking-tight leading-[1.05] text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-8xl"
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {featuredQuote.lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-2">
              <motion.span
                className={`block ${i === 0 ? 'text-dark-400 dark:text-dark-500' : 'text-dark-900 dark:text-white'}`}
                variants={{ hidden: { y: '110%' }, show: { y: 0 } }}
                transition={{ duration: 0.9, delay: i * 0.25, ease }}
              >
                {i === featuredQuote.lines.length - 1 ? (
                  <>
                    {line.replace(/pilot\.$/, '')}
                    <span className="text-primary-600 dark:text-primary-400">pilot.</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </motion.blockquote>
        <motion.figcaption {...reveal(0.6)} className="mt-4 sm:mt-6 text-sm sm:text-base text-dark-500 dark:text-dark-400">
          {featuredQuote.author}
        </motion.figcaption>
      </figure>

      {/* Contact: CTA left, links right */}
      <div className="max-w-6xl mx-auto mt-16 sm:mt-24 pt-10 sm:pt-12 border-t border-dark-200 dark:border-dark-700 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <motion.div {...reveal(0.1)} className="lg:col-span-7">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-dark-900 dark:text-white">
            Need a pilot for your next project?
          </h2>
          <p className="mt-4 max-w-[48ch] text-base sm:text-lg leading-relaxed text-dark-600 dark:text-dark-400">
            Tell me what you're building. I'll tell you how I'd fly it.
          </p>

          <div className="mt-6 inline-flex items-center gap-2.5 text-sm text-dark-600 dark:text-dark-400">
            <span className="relative flex h-2 w-2">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="font-medium text-dark-900 dark:text-white">{personalInfo.availability.label}</span>
            <span aria-hidden="true">/</span>
            <span>{personalInfo.availability.responseTime}</span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${personalInfo.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3.5 font-semibold text-on-primary transition-transform hover:bg-primary-700 active:scale-[0.98]"
            >
              <FiMail size={18} />
              Get in touch
              <FiArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-dark-300 dark:border-dark-600 px-5 py-3.5 text-sm font-medium text-dark-700 dark:text-dark-300 transition-colors hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 active:scale-[0.98]"
              aria-live="polite"
            >
              {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
              {copied ? 'Copied' : personalInfo.email}
            </button>
          </div>

          <p className="mt-8 inline-flex items-center gap-2 text-sm text-dark-500 dark:text-dark-400">
            <FiMapPin size={14} />
            {personalInfo.location}
          </p>
        </motion.div>

        <ul className="lg:col-span-5 divide-y divide-dark-200 dark:divide-dark-700">
          {links.map((link, i) => (
            <motion.li key={link.label} {...reveal(0.15 + i * 0.06)}>
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-4 py-5"
              >
                <link.icon size={20} className="shrink-0 text-dark-500 dark:text-dark-400 transition-colors group-hover:text-primary-600 dark:group-hover:text-primary-400" />
                <span className="font-semibold text-dark-900 dark:text-white">{link.label}</span>
                <span className="ml-auto truncate text-sm text-dark-500 dark:text-dark-400">{link.value}</span>
                <FiArrowUpRight size={18} className="shrink-0 text-dark-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-600 dark:group-hover:text-primary-400" />
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Contact;
