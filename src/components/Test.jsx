// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';

// function Test({ test }) {
//   const [isTookTest, setIsTookTest] = useState(false);
//   const { user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (
//       user?.completedTests?.some((completed) => completed.test === test._id)
//     ) {
//       setIsTookTest(true);
//     }
//   }, [user, test._id]);
//   const isAdmin = user.role === 'admin';

//   return (
//     <div
//       className={`p-4 rounded-xl shadow-md border transition duration-300 ${
//         isTookTest
//           ? 'bg-green-100 border-green-300'
//           : 'bg-white border-gray-300 hover:shadow-lg'
//       }`}
//     >
//       <h3 className="text-xl font-semibold text-gray-800 mb-1">{test.title}</h3>
//       <p className="text-gray-600 mb-3">{test.description}</p>

//       <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-4">
//         <span>📝 Questions: {test.questions.length}</span>
//         <span>🎯 Points: {test.totalPoints}</span>
//         <span>⏱ Duration: {test.duration} min</span>
//         {isTookTest && (
//           <span className="text-green-700 font-semibold">✅ Already taken</span>
//         )}
//       </div>

//       <div className="flex gap-3">
//         <Link
//           to={`/tests/${test._id}`}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Take Test
//         </Link>

//         {isAdmin && (
//           <Link
//             to={`/admin/tests/${test._id}/grades`}
//             className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
//           >
//             View Grades
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Test;

import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  FileText,
  Target,
  CheckCircle,
  Play,
  BarChart3,
  Crown,
} from 'lucide-react';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import Button from './ui/Button';

function Test({ test }) {
  const [isTookTest, setIsTookTest] = useState(false);
  const [isonGoingTest, setIsonGoingTest] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { isDarkMode } = useDarkMode();
  const ismatched = test.category._id === user?.studentCategory;

  // useEffect(() => {
  //   if (test?.users?.some((userID) => userID === user?._id) && user?) {
  //     setIsTookTest(true);
  //   }
  // }, [test?.users, user]);
  useEffect(() => {
    if (!user || !test) return;

    const hasCompleted = user.completedTests?.some(
      (entry) => entry.test === test._id
    );

    const isInTestUsers = test.users?.includes(user._id);

    if (hasCompleted || isInTestUsers) {
      setIsTookTest(true);
    }
  }, [test, user]);

  useEffect(() => {
    if (test?.onGoingstudents?.some((userID) => userID === user?._id)) {
      setIsonGoingTest(true);
    }
  }, [test?.onGoingstudents, user]);

  const isAdmin = user?.role === 'admin';

  const cardVariants = {
    idle: {
      scale: 1,
      rotateY: 0,
      boxShadow: isDarkMode
        ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
        : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    hover: {
      scale: 1.02,
      rotateY: 2,
      boxShadow: isDarkMode
        ? '0 20px 25px -5px rgba(0, 0, 0, 0.4)'
        : '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="idle"
      whileHover="hover"
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        isTookTest
          ? isDarkMode
            ? 'bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-700/50'
            : 'bg-gradient-to-br from-green-50 to-green-100/50 border-green-300'
          : isonGoingTest
            ? isDarkMode
              ? 'bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border-yellow-700/50'
              : 'bg-gradient-to-br from-yellow-50 to-yellow-100/50 border-yellow-300'
            : isDarkMode
              ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/50 border-gray-700 hover:border-blue-600/50'
              : 'bg-gradient-to-br from-white to-gray-50/50 border-gray-200 hover:border-blue-400/50'
      }`}
    >
      {/* Status Badge */}
      {isTookTest && (
        <div className="absolute top-4 right-4 z-10">
          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
              isDarkMode
                ? 'bg-green-800/80 text-green-200 border border-green-700'
                : 'bg-green-500 text-white'
            }`}
          >
            <CheckCircle className="w-3 h-3" />
            Completed
          </div>
        </div>
      )}

      {/* Admin Badge */}
      {isAdmin && (
        <div className="absolute top-4 left-4 z-10">
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              isDarkMode
                ? 'bg-yellow-800/80 text-yellow-200 border border-yellow-700'
                : 'bg-yellow-500 text-white'
            }`}
          >
            <Crown className="w-3 h-3" />
            Admin
          </div>
        </div>
      )}

      {isonGoingTest && !isTookTest && (
        <div className="absolute top-4 right-4 z-10">
          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
              isDarkMode
                ? 'bg-yellow-800/80 text-yellow-200 border border-yellow-700'
                : 'bg-yellow-500 text-white'
            }`}
          >
            <Clock className="w-3 h-3" />
            Ongoing
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="mb-6">
          <h3
            className={`text-xl font-bold mb-2 line-clamp-2 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            {test.title}
          </h3>
            <p
            className={`text-xl font-bold mb-2 line-clamp-2 ${
              isDarkMode ? 'text-green-400' : 'text-gray-800'
            }`}
          >
            {test.category.name}
          </p>
          <p
            className={`text-sm line-clamp-3 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {test.description}
          </p>
        </div>

        {/* Test Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div
            className={`text-center p-3 rounded-lg ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
            }`}
          >
            <FileText
              className={`w-5 h-5 mx-auto mb-1 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}
            />
            <p
              className={`text-sm font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}
            >
              {test?.questions?.length || []}
            </p>

            <p
              className={`text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Questions
            </p>
          </div>

     
          <div
            className={`text-center p-3 rounded-lg ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
            }`}
          >
            <Target
              className={`w-5 h-5 mx-auto mb-1 ${
                isDarkMode ? 'text-green-400' : 'text-green-600'
              }`}
            />
            <p
              className={`text-sm font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}
            >
              {test.totalPoints}
            </p>
            <p
              className={`text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Points
            </p>
          </div>

          <div
            className={`text-center p-3 rounded-lg ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
            }`}
          >
            <Clock
              className={`w-5 h-5 mx-auto mb-1 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`}
            />
            <p
              className={`text-sm font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}
            >
              {test.duration}
            </p>
            <p
              className={`text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Minutes
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {user ? (
            ismatched ? (
              isTookTest ? (
                <button
                  disabled
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold cursor-not-allowed transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-green-800 text-white/70'
                      : 'bg-green-100 text-green-600'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  Already Taken
                </button>
              ) : (
                <Link to={`/tests/${test?._id}`} className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      isonGoingTest
                        ? isDarkMode
                          ? 'bg-yellow-600 hover:bg-yellow-500 text-white'
                          : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                        : isDarkMode
                          ? 'bg-blue-600 hover:bg-blue-500 text-white'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    <Play className="w-4 h-4" />
                    {isonGoingTest ? 'Resume Test' : 'Take Test'}
                  </motion.button>
                </Link>
              )
            ) : (
              <div className="flex-1 flex items-center justify-center px-4 py-3 rounded-lg font-semibold bg-red-100 text-red-700 border border-red-300 dark:bg-red-900 dark:text-red-300 dark:border-red-600">
                Doesn’t match your current category
              </div>
            )
          ) : (
            <NavLink
              as={Link}
              to="/signup"
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300'
              }`}
            >
              REGISTER To Take Test
            </NavLink>
          )}

          {isAdmin && (
            <Link to={`/admin/tests/${test?._id}/grades`}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Grades
              </motion.button>
            </Link>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div
        className={`absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10 ${
          isTookTest ? 'bg-green-500' : 'bg-blue-500'
        }`}
      />
      <div
        className={`absolute -bottom-10 -left-10 w-20 h-20 rounded-full opacity-5 ${
          isTookTest ? 'bg-green-400' : 'bg-purple-400'
        }`}
      />
    </motion.div>
  );
}

export default Test;
