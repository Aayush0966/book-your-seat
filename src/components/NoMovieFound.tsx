'use client'
import { motion } from 'motion/react';

const NoMovieFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 sm:mb-6"
        >
          <span className="text-4xl sm:text-5xl md:text-6xl">🎬</span>
        </motion.div>
        
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200"
        >
          Movie Not Found
        </motion.h2>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 px-2 leading-relaxed"
        >
          Oops! The movie you're looking for seems to have disappeared into the cutting room floor.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <a
            href="/"
            className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg hover:shadow-xl touch-manipulation"
          >
            Back to Movies
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NoMovieFound;
