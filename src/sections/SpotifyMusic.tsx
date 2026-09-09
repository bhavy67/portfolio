import { motion } from 'framer-motion';
import { SiSpotify } from 'react-icons/si';
import { FiMusic } from 'react-icons/fi';

const tracks = [
  { id: '7MXVkk9YMctZqd1Srtv4MB', title: 'Starboy', artist: 'The Weeknd' },
  { id: '3jtKSUiVDowKNBqVQbWaig', title: 'Iktara', artist: 'Kavita Seth' },
  { id: '7nPCAO0Q9AHbM7PWyj9O98', title: 'Kho Gaye Hum Kahan', artist: 'Jasleen Royal, Prateek Kuhad' },
  { id: '6K4t31amVTZDgR3sKmwUJJ', title: 'The Less I Know The Better', artist: 'Tame Impala' },
];

const SpotifyMusic = () => {
  return (
    <motion.div
      className="h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {/* Header */}
      <div className="text-center mb-10 sm:mb-14">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Currently <span className="gradient-text">Listening</span>
        </motion.h2>
        <motion.p
          className="text-dark-600 dark:text-dark-400 text-base sm:text-lg max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Songs that keep me in the zone while I code.
        </motion.p>
      </div>

      {/* Track list */}
      <motion.div
        className="card p-4 sm:p-6 flex-1"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col divide-y divide-dark-100 dark:divide-dark-700">
          {tracks.map((track, i) => (
            <motion.a
              key={track.id}
              href={`https://open.spotify.com/track/${track.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 py-4 px-2 rounded-lg hover:bg-dark-50 dark:hover:bg-dark-700/40 transition-colors group"
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + i * 0.07 }}
            >
              {/* Track number */}
              <span className="text-xs font-mono font-bold gradient-text w-5 text-center shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icon */}
              <div className="w-9 h-9 rounded-lg bg-dark-100 dark:bg-dark-700 flex items-center justify-center shrink-0 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                <FiMusic size={15} className="text-dark-400 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" />
              </div>

              {/* Title + artist */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-dark-900 dark:text-dark-100 truncate leading-tight">
                  {track.title}
                </p>
                <p className="text-xs text-dark-500 dark:text-dark-400 truncate mt-0.5">
                  {track.artist}
                </p>
              </div>

              {/* Spotify link icon */}
              <SiSpotify
                size={18}
                className="shrink-0 text-dark-300 dark:text-dark-600 group-hover:text-[#1DB954] transition-colors"
              />
            </motion.a>
          ))}
        </div>

        <div className="mt-3 pt-4 border-t border-dark-200 dark:border-dark-700 flex items-center gap-2 text-dark-500 dark:text-dark-400 text-sm">
          <SiSpotify className="text-[#1DB954] shrink-0" size={15} />
          <span>Open in Spotify</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SpotifyMusic;
