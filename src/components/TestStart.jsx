// const TestStart = ({ test, onStart }) => {
//   return (
//     <div className="test-start">
//       <h2>{test.title}</h2>
//       <p>{test.description}</p>

//       <div className="test-meta">
//         <p>Total Questions: {test.questions.length}</p>
//         <p>Total Points: {test.totalPoints}</p>
//         <p>Duration: {test.duration} minutes</p>
//       </div>

//       <button onClick={onStart} className="start-test-btn">
//         Start Test
//       </button>
//     </div>
//   );
// };

// export default TestStart;

import { motion } from 'framer-motion';
import { Clock, FileText, Target, Play } from 'lucide-react';
import { useDarkMode } from '../features/darkMode/useDarkMode';

const TestStart = ({ test, onStart }) => {
  const { isDarkMode } = useDarkMode();

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`max-w-2xl mx-auto rounded-2xl p-8 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700'
          : 'bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border border-gray-200'
      } shadow-2xl`}
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h1
          className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          {test.title}
        </h1>
        <p
          className={`text-lg leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          {test.description}
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <div
          className={`p-6 rounded-xl text-center ${
            isDarkMode
              ? 'bg-blue-900/30 border border-blue-800/50'
              : 'bg-blue-50 border border-blue-200'
          }`}
        >
          <FileText
            className={`w-8 h-8 mx-auto mb-3 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}
          />
          <p
            className={`text-2xl font-bold mb-1 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            {test.questions.length}
          </p>
          <p
            className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Questions
          </p>
        </div>

        <div
          className={`p-6 rounded-xl text-center ${
            isDarkMode
              ? 'bg-green-900/30 border border-green-800/50'
              : 'bg-green-50 border border-green-200'
          }`}
        >
          <Target
            className={`w-8 h-8 mx-auto mb-3 ${
              isDarkMode ? 'text-green-400' : 'text-green-600'
            }`}
          />
          <p
            className={`text-2xl font-bold mb-1 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            {test.totalPoints}
          </p>
          <p
            className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Total Points
          </p>
        </div>

        <div
          className={`p-6 rounded-xl text-center ${
            isDarkMode
              ? 'bg-purple-900/30 border border-purple-800/50'
              : 'bg-purple-50 border border-purple-200'
          }`}
        >
          <Clock
            className={`w-8 h-8 mx-auto mb-3 ${
              isDarkMode ? 'text-purple-400' : 'text-purple-600'
            }`}
          />
          <p
            className={`text-2xl font-bold mb-1 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            {test.duration}
          </p>
          <p
            className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Minutes
          </p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="text-center">
        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
            isDarkMode
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-900/50'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-lg shadow-blue-500/30'
          }`}
        >
          <Play className="w-6 h-6" />
          Start Test
        </motion.button>

        <p
          className={`mt-4 text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          Once started, the timer cannot be paused
        </p>
      </motion.div>
    </motion.div>
  );
};

export default TestStart;
