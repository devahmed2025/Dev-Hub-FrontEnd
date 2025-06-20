// Enhanced TestList Component
import { useLoaderData } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, BookOpen, AlertCircle } from 'lucide-react';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import Test from './Test';

const TestList = ({ adminView = false }) => {
  const { tests, status, error } = useLoaderData();
  // console.log('tests ahom ya ahmed', tests.data);
  const { isDarkMode } = useDarkMode();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2
          className={`w-12 h-12 animate-spin mb-4 ${
            isDarkMode ? 'text-blue-400' : 'text-blue-600'
          }`}
        />
        <p
          className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Loading tests...
        </p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`max-w-md mx-auto p-6 rounded-xl text-center ${
          isDarkMode
            ? 'bg-red-900/20 border border-red-800/50'
            : 'bg-red-50 border border-red-200'
        }`}
      >
        <AlertCircle
          className={`w-16 h-16 mx-auto mb-4 ${
            isDarkMode ? 'text-red-400' : 'text-red-500'
          }`}
        />
        <h3
          className={`text-xl font-semibold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          Failed to Load Tests
        </h3>
        <p className={`${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>
          {error || 'An error occurred'}
        </p>
      </motion.div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <BookOpen
            className={`w-16 h-16 mx-auto mb-4 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}
          />
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            {adminView ? 'Manage Tests' : 'Available Tests'}
          </h1>
          <p
            className={`text-xl ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {adminView
              ? 'Administer and review your tests'
              : 'Choose a test to challenge your knowledge'}
          </p>
        </motion.div>

        <AnimatePresence>
          {!Array.isArray(tests?.data) || tests.data.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center py-16 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <p className="text-xl">
                {adminView
                  ? 'No tests created yet.'
                  : 'No tests available at the moment.'}
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {Array.isArray(tests?.data) &&
                tests.data.map((test) => (
                  <motion.div key={test._id} variants={itemVariants}>
                    <Test test={test} adminView={adminView} />
                  </motion.div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TestList;
