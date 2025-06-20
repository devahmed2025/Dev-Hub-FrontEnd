import { motion } from 'framer-motion';
import { useDarkMode } from '../features/darkMode/useDarkMode';

const TestResults = ({ results, questions, onClose }) => {
  const { isDarkMode } = useDarkMode();
  const percentage = Math.round((results.score / results.totalPoints) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800/80 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'} shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
    >
      <h2
        className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
      >
        Test Results
      </h2>

      <div
        className={`p-6 rounded-lg mb-8 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3
              className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Your Score
            </h3>
            <p
              className={`text-3xl font-bold ${percentage >= 70 ? 'text-green-500' : percentage >= 50 ? 'text-yellow-500' : 'text-red-500'}`}
            >
              {results.score}/{results.totalPoints}
            </p>
          </div>
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={isDarkMode ? '#374151' : '#E5E7EB'}
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={
                  percentage >= 70
                    ? '#10B981'
                    : percentage >= 50
                      ? '#F59E0B'
                      : '#EF4444'
                }
                strokeWidth="3"
                strokeDasharray={`${percentage}, 100`}
              />
              <text
                x="18"
                y="20.5"
                textAnchor="middle"
                fill={isDarkMode ? '#F3F4F6' : '#1F2937'}
                fontSize="8"
                fontWeight="bold"
              >
                {percentage}%
              </text>
            </svg>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3
          className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
        >
          Question Breakdown
        </h3>
        <div className="space-y-4">
          {questions.map((q, index) => {
            const userAnswer =
              results.correctQuestions.find(
                (aq) => aq.questionIndex === index
              ) ||
              results.wrongQuestions.find((aq) => aq.questionIndex === index);

            const isCorrect =
              userAnswer.correctOptionIndex === userAnswer.selectedOptionIndex;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-lg border ${
                  isCorrect
                    ? isDarkMode
                      ? 'border-green-500/30 bg-green-500/10'
                      : 'border-green-400/30 bg-green-400/10'
                    : isDarkMode
                      ? 'border-red-500/30 bg-red-500/10'
                      : 'border-red-400/30 bg-red-400/10'
                }`}
              >
                <p
                  className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                >
                  Q{index + 1}: {q.question}
                </p>
                <p
                  className={`mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Your answer:{' '}
                  <span
                    className={
                      isCorrect
                        ? isDarkMode
                          ? 'text-green-400'
                          : 'text-green-600'
                        : isDarkMode
                          ? 'text-red-400'
                          : 'text-red-600'
                    }
                  >
                    {q.options[userAnswer.selectedOptionIndex]}
                  </span>
                </p>
                {!isCorrect && (
                  <p
                    className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                  >
                    Correct answer:{' '}
                    <span
                      className={
                        isDarkMode ? 'text-green-400' : 'text-green-600'
                      }
                    >
                      {q.options[userAnswer.correctOptionIndex]}
                    </span>
                  </p>
                )}
                <p
                  className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  Points: {userAnswer.points}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClose}
        className={`w-full py-3 rounded-lg ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition`}
      >
        Back to Tests
      </motion.button>
    </motion.div>
  );
};

export default TestResults;
