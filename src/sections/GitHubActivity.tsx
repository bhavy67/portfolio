import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data/personal';

const GitHubActivity = () => {
  const { currentTheme } = useTheme();

  const calendarTheme = useMemo(() => {
    const hex = currentTheme.primary;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const bg = currentTheme.isDark ? 22 : 255;

    const blend = (amount: number): string => {
      const nr = Math.round(bg + (r - bg) * amount);
      const ng = Math.round(bg + (g - bg) * amount);
      const nb = Math.round(bg + (b - bg) * amount);
      return `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;
    };

    const scale: [string, string, string, string, string] = [
      blend(0.08),
      blend(0.25),
      blend(0.45),
      blend(0.70),
      hex,
    ];

    return { light: scale, dark: scale };
  }, [currentTheme]);

  return (
    <section id="activity" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            GitHub <span className="gradient-text">Activity</span>
          </motion.h2>
          <motion.p
            className="text-dark-600 dark:text-dark-400 text-base sm:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            A year of commits, side projects, and building in public.
          </motion.p>
        </div>

        {/* Calendar */}
        <motion.div
          className="card p-4 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Scrollable on mobile */}
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[600px]">
              <GitHubCalendar
                username={personalInfo.social.githubUsername}
                colorScheme={currentTheme.isDark ? 'dark' : 'light'}
                theme={calendarTheme}
                blockSize={13}
                blockMargin={4}
                fontSize={12}
                hideColorLegend={false}
                hideTotalCount={false}
              />
            </div>
          </div>

          {/* GitHub link */}
          <div className="mt-6 pt-5 border-t border-dark-200 dark:border-dark-700 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 text-dark-500 dark:text-dark-400 text-sm">
              <FiGithub className="shrink-0" />
              <span>@{personalInfo.social.githubUsername}</span>
            </div>
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
            >
              View full profile
              <FiExternalLink size={13} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GitHubActivity;
