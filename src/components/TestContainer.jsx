// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useLoaderData } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   loadTest,
//   beginTest,
//   updateTimer,
//   resetTest,
//   finalizeTest,
//   setTest,
// } from '../store/slices/testSlice';
// import TestStart from './TestStart';
// import TestQuestion from './TestQuestion';
// import TestResults from './TestResults';
// import { useDarkMode } from '../features/darkMode/useDarkMode';

// const TestContainer = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isDarkMode } = useDarkMode();
//   const loadedTest = useLoaderData();
//   console.log(loadTest?.data);

//   const { test, status, currentQuestionIndex, timer, results, answers, error } =
//     useSelector((state) => state.test);

//   useEffect(() => {
//     if (loadedTest?.data?.test) {
//       dispatch(setTest(loadedTest.data.test));
//       // Check if test is ongoing
//       if (
//         loadedTest.data.test.onGoingstudents?.some(
//           (userId) => userId === JSON.parse(localStorage.getItem('user'))._id
//         )
//       ) {
//         dispatch(beginTest(loadedTest.data.test._id));
//       }
//     }
//     return () => {
//       if (status !== 'started') {
//         dispatch(resetTest());
//       }
//     };
//   }, [dispatch, loadedTest]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//     }
//   }, [error]);

//   useEffect(() => {
//     if (status !== 'started' || timer <= 0) return;
//     const interval = setInterval(() => dispatch(updateTimer()), 1000);
//     return () => clearInterval(interval);
//   }, [status, timer, dispatch]);

//   useEffect(() => {
//     if (status === 'started' && timer <= 0 && answers?.length > 0) {
//       handleSubmit();
//     }
//   }, [timer, status, answers,handleSubmit]);

//   const handleStartTest = () => {
//     dispatch(beginTest(loadedTest?.data?.test._id));
//   };

//   const handleSubmit = () => {
//     if (answers?.length > 0) {
//       dispatch(finalizeTest({ testId: test._id, answers }));
//     } else {
//       toast.error('Please answer at least one question before submitting');
//     }
//   };

//   if (status === 'loading')
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );

//   if (status === 'error')
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div
//           className={`p-6 rounded-xl ${
//             isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
//           } shadow-lg`}
//         >
//           <h2 className="text-xl font-bold mb-4">Error loading test</h2>
//           <p>{error}</p>
//           <button
//             onClick={() => navigate('/')}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             Back to Tests
//           </button>
//         </div>
//       </div>
//     );

//   if (!test) return null;

//   return (
//     <div
//       className={`min-h-screen ${
//         isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
//       } transition-colors duration-300`}
//     >
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={status}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           className="max-w-4xl mx-auto p-4 md:p-6"
//         >
//           {status === 'idle' && (
//             <TestStart test={test} onStart={handleStartTest} />
//           )}

//           {status === 'started' && (
//             <TestQuestion
//               question={{
//                 ...test.questions[currentQuestionIndex],
//                 questionIndex: currentQuestionIndex,
//               }}
//               questionNumber={currentQuestionIndex + 1}
//               totalQuestions={test.questions.length}
//               timeLeft={timer}
//               onSubmit={handleSubmit}
//             />
//           )}

//           {status === 'submitted' && results && (
//             <TestResults
//               results={results}
//               questions={test.questions}
//               onClose={() => navigate('/tests')}
//             />
//           )}
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

// export default TestContainer;
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import {
  loadTest,
  beginTest,
  updateTimer,
  resetTest,
  finalizeTest,
  setTest,
} from '../store/slices/testSlice';
import TestStart from './TestStart';
import TestQuestion from './TestQuestion';
import TestResults from './TestResults';
import { useDarkMode } from '../features/darkMode/useDarkMode';

const TestContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const loadedTest = useLoaderData();
  const { user } = useSelector((state) => state.auth);
  const { test, status, currentQuestionIndex, timer, results, answers, error } =
    useSelector((state) => state.test);

  // Load test data and reset if test ID changes
  useEffect(() => {
    // console.log('Loaded Test:', loadedTest);
    // console.log('Redux User:', user);
    if (!user) {
      toast.error('Please log in to access the test');
      navigate('/login');
      return;
    }
    if (loadedTest?.test) {
      if (test?._id !== loadedTest.test._id) {
        // console.log(
        //   'Test ID changed, resetting state for test ID:',
        //   loadedTest.test._id
        // );
        dispatch(resetTest());
        dispatch(setTest(loadedTest.test));
      }
    }
  }, [dispatch, loadedTest, user, navigate, test?._id]);

  // Handle test start/resumption
  useEffect(() => {
    if (status !== 'idle' || !loadedTest?.test || !user) return;
    if (loadedTest.hasStarted) {
      // console.log(
      //   'Test is ongoing, dispatching beginTest for test ID:',
      //   loadedTest.test._id
      // );
      dispatch(beginTest(loadedTest.test._id));
    }
  }, [dispatch, loadedTest, status, user]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Timer update
  useEffect(() => {
    if (status !== 'started' || timer <= 0) return;
    const interval = setInterval(() => dispatch(updateTimer()), 1000);
    return () => clearInterval(interval);
  }, [status, timer, dispatch]);

  const handleSubmit = useCallback(() => {
    if (answers?.length > 0) {
      // console.log('Submitting test ID:', test._id, 'with answers:', answers);
      dispatch(finalizeTest({ testId: test._id, answers }));
    } else {
      toast.error('Please answer at least one question before submitting');
    }
  }, [dispatch, test, answers]);

  // Auto-submit when timer expires
  useEffect(() => {
    if (status === 'started' && timer <= 0 && answers?.length > 0) {
      // console.log('Timer expired, auto-submitting test ID:', test._id);
      handleSubmit();
    }
  }, [timer, status, answers, handleSubmit]);

  const handleStartTest = useCallback(() => {
    if (loadedTest?.test?._id) {
      // console.log('Starting test with ID:', loadedTest.test._id);
      dispatch(beginTest(loadedTest.test._id));
    } else {
      toast.error('Test ID not found');
    }
  }, [dispatch, loadedTest]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className={`p-6 rounded-xl ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          } shadow-lg`}
        >
          <h2 className="text-xl font-bold mb-4">Error loading test</h2>
          <p>{error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  if (!test) return null;

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      } transition-colors duration-300`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto p-4 md:p-6"
        >
          {status === 'idle' && (
            <TestStart test={test} onStart={handleStartTest} />
          )}

          {status === 'started' && (
            <TestQuestion
              question={{
                ...test.questions[currentQuestionIndex],
                questionIndex: currentQuestionIndex,
              }}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={test.questions.length}
              timeLeft={timer}
              onSubmit={handleSubmit}
            />
          )}

          {status === 'submitted' && results && (
            <TestResults
              results={results}
              questions={test.questions}
              onClose={() => navigate('/tests')}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TestContainer;
