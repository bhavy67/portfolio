import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<string[]>([]);

  const terminalLines = [
    '> initializing portfolio...',
    '> loading assets...',
    '> compiling components...',
    '> fetching projects...',
    '> fetching blogs...',
    '> configuring theme...',
    '> preparing experience...',
    '> almost there...',
  ];

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = '';

    const typeInterval = setInterval(() => {
      if (lineIndex < terminalLines.length) {
        const currentText = terminalLines[lineIndex];
        if (charIndex <= currentText.length) {
          currentLine = currentText.slice(0, charIndex);
          setLines((prev) => {
            const newLines = [...prev];
            newLines[lineIndex] = currentLine;
            return newLines;
          });
          charIndex++;
        } else {
          lineIndex++;
          charIndex = 0;
        }
      } else {
        clearInterval(typeInterval);
      }
    }, 80);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 3) + 1;
      });
    }, 30);

    return () => {
      clearInterval(typeInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1117]"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      onAnimationComplete={() => {
        if (progress === 100) {
          document.body.style.overflow = 'unset';
        }
      }}
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56, 189, 248, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 189, 248, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Glowing Orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 w-[90%] max-w-lg">
        {/* Terminal Window */}
        <motion.div
          className="bg-[#161b22] rounded-xl overflow-hidden border border-gray-700 shadow-2xl shadow-cyan-500/20"
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#0d1117] border-b border-gray-700">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <div className="flex-1 text-center">
              <span className="text-gray-400 text-xs font-mono">portfolio.exe</span>
            </div>
            <div className="w-12" />
          </div>

          {/* Terminal Body */}
          <div className="p-4 min-h-[280px] font-mono text-sm">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <p className="text-gray-400 text-xs mb-2">
                <span className="text-purple-400">const</span>{' '}
                <span className="text-yellow-400">portfolio</span>{' '}
                <span className="text-gray-400">=</span>{' '}
                <span className="text-gray-400">{'{'} </span>
              </p>
              <p className="text-gray-400 text-xs ml-3">
                <span className="text-purple-400">developer</span>
                <span className="text-gray-400">:</span>{' '}
                <span className="text-green-400">"Bhavy"</span>
                <span className="text-gray-400">,</span>
              </p>
              <p className="text-gray-400 text-xs ml-3">
                <span className="text-purple-400">status</span>
                <span className="text-gray-400">:</span>{' '}
                <span className="text-green-400">"ready"</span>
                <span className="text-gray-400">{"}"};</span>
              </p>
            </motion.div>

            {/* Loading Lines */}
            <div className="space-y-1 mb-4">
              {lines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <span className="text-cyan-400">➜</span>{' '}
                  <span className="text-gray-300">{line}</span>
                  {index === lines.length - 1 && (
                    <motion.span
                      className="inline-block w-2 h-4 bg-cyan-400 ml-1"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-400 text-xs">progress:</span>
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-cyan-400 text-xs font-mono">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.p
          className="text-center mt-6 text-gray-400 text-sm font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-cyan-400">crafting</span> your experience
          <motion.span
            className="inline-flex ml-1"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ...
          </motion.span>
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;