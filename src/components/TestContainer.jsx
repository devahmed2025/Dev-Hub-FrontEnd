// // // import { useEffect } from 'react';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { useNavigate, useLoaderData } from 'react-router-dom';
// // // import { toast } from 'react-toastify';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import {
// // //   loadTest,
// // //   beginTest,
// // //   updateTimer,
// // //   resetTest,
// // //   finalizeTest,
// // //   setTest,
// // // } from '../store/slices/testSlice';
// // // import TestStart from './TestStart';
// // // import TestQuestion from './TestQuestion';
// // // import TestResults from './TestResults';
// // // import { useDarkMode } from '../features/darkMode/useDarkMode';

// // // const TestContainer = () => {
// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();
// // //   const { isDarkMode } = useDarkMode();
// // //   const loadedTest = useLoaderData();
// // //   console.log(loadTest?.data);

// // //   const { test, status, currentQuestionIndex, timer, results, answers, error } =
// // //     useSelector((state) => state.test);

// // //   useEffect(() => {
// // //     if (loadedTest?.data?.test) {
// // //       dispatch(setTest(loadedTest.data.test));
// // //       // Check if test is ongoing
// // //       if (
// // //         loadedTest.data.test.onGoingstudents?.some(
// // //           (userId) => userId === JSON.parse(localStorage.getItem('user'))._id
// // //         )
// // //       ) {
// // //         dispatch(beginTest(loadedTest.data.test._id));
// // //       }
// // //     }
// // //     return () => {
// // //       if (status !== 'started') {
// // //         dispatch(resetTest());
// // //       }
// // //     };
// // //   }, [dispatch, loadedTest]);

// // //   useEffect(() => {
// // //     if (error) {
// // //       toast.error(error);
// // //     }
// // //   }, [error]);

// // //   useEffect(() => {
// // //     if (status !== 'started' || timer <= 0) return;
// // //     const interval = setInterval(() => dispatch(updateTimer()), 1000);
// // //     return () => clearInterval(interval);
// // //   }, [status, timer, dispatch]);

// // //   useEffect(() => {
// // //     if (status === 'started' && timer <= 0 && answers?.length > 0) {
// // //       handleSubmit();
// // //     }
// // //   }, [timer, status, answers,handleSubmit]);

// // //   const handleStartTest = () => {
// // //     dispatch(beginTest(loadedTest?.data?.test._id));
// // //   };

// // //   const handleSubmit = () => {
// // //     if (answers?.length > 0) {
// // //       dispatch(finalizeTest({ testId: test._id, answers }));
// // //     } else {
// // //       toast.error('Please answer at least one question before submitting');
// // //     }
// // //   };

// // //   if (status === 'loading')
// // //     return (
// // //       <div className="flex items-center justify-center h-screen">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
// // //       </div>
// // //     );

// // //   if (status === 'error')
// // //     return (
// // //       <div className="flex items-center justify-center h-screen">
// // //         <div
// // //           className={`p-6 rounded-xl ${
// // //             isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
// // //           } shadow-lg`}
// // //         >
// // //           <h2 className="text-xl font-bold mb-4">Error loading test</h2>
// // //           <p>{error}</p>
// // //           <button
// // //             onClick={() => navigate('/')}
// // //             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
// // //           >
// // //             Back to Tests
// // //           </button>
// // //         </div>
// // //       </div>
// // //     );

// // //   if (!test) return null;

// // //   return (
// // //     <div
// // //       className={`min-h-screen ${
// // //         isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
// // //       } transition-colors duration-300`}
// // //     >
// // //       <AnimatePresence mode="wait">
// // //         <motion.div
// // //           key={status}
// // //           initial={{ opacity: 0 }}
// // //           animate={{ opacity: 1 }}
// // //           exit={{ opacity: 0 }}
// // //           transition={{ duration: 0.3 }}
// // //           className="max-w-4xl mx-auto p-4 md:p-6"
// // //         >
// // //           {status === 'idle' && (
// // //             <TestStart test={test} onStart={handleStartTest} />
// // //           )}

// // //           {status === 'started' && (
// // //             <TestQuestion
// // //               question={{
// // //                 ...test.questions[currentQuestionIndex],
// // //                 questionIndex: currentQuestionIndex,
// // //               }}
// // //               questionNumber={currentQuestionIndex + 1}
// // //               totalQuestions={test.questions.length}
// // //               timeLeft={timer}
// // //               onSubmit={handleSubmit}
// // //             />
// // //           )}

// // //           {status === 'submitted' && results && (
// // //             <TestResults
// // //               results={results}
// // //               questions={test.questions}
// // //               onClose={() => navigate('/tests')}
// // //             />
// // //           )}
// // //         </motion.div>
// // //       </AnimatePresence>
// // //     </div>
// // //   );
// // // };

// // // export default TestContainer;

// // import { useEffect, useCallback } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useNavigate, useLoaderData } from 'react-router-dom';
// // import { toast } from 'react-toastify';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import {
// //   loadTest,
// //   beginTest,
// //   updateTimer,
// //   resetTest,
// //   finalizeTest,
// //   setTest,
// // } from '../store/slices/testSlice';
// // import TestStart from './TestStart';
// // import TestQuestion from './TestQuestion';
// // import TestResults from './TestResults';
// // import { useDarkMode } from '../features/darkMode/useDarkMode';

// // const TestContainer = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { isDarkMode } = useDarkMode();
// //   const loadedTest = useLoaderData();
// //   const { user } = useSelector((state) => state.auth);
// //   const { test, status, currentQuestionIndex, timer, results, answers, error } =
// //     useSelector((state) => state.test);

// //   // Load test data and reset if test ID changes
// //   useEffect(() => {
// //     // console.log('Loaded Test:', loadedTest);
// //     // console.log('Redux User:', user);
// //     if (!user) {
// //       toast.error('Please log in to access the test');
// //       navigate('/login');
// //       return;
// //     }
// //     if (loadedTest?.test) {
// //       if (test?._id !== loadedTest.test._id) {
// //         // console.log(
// //         //   'Test ID changed, resetting state for test ID:',
// //         //   loadedTest.test._id
// //         // );
// //         dispatch(resetTest());
// //         dispatch(setTest(loadedTest.test));
// //       }
// //     }
// //   }, [dispatch, loadedTest, user, navigate, test?._id]);

// //   // Handle test start/resumption
// //   useEffect(() => {
// //     if (status !== 'idle' || !loadedTest?.test || !user) return;
// //     if (loadedTest.hasStarted) {
// //       // console.log(
// //       //   'Test is ongoing, dispatching beginTest for test ID:',
// //       //   loadedTest.test._id
// //       // );
// //       dispatch(beginTest(loadedTest.test._id));
// //     }
// //   }, [dispatch, loadedTest, status, user]);

// //   // Handle errors
// //   useEffect(() => {
// //     if (error) {
// //       toast.error(error);
// //     }
// //   }, [error]);

// //   // Timer update
// //   useEffect(() => {
// //     if (status !== 'started' || timer <= 0) return;
// //     const interval = setInterval(() => dispatch(updateTimer()), 1000);
// //     return () => clearInterval(interval);
// //   }, [status, timer, dispatch]);

// //   const handleSubmit = useCallback(() => {
// //     if (answers?.length > 0) {
// //       // console.log('Submitting test ID:', test._id, 'with answers:', answers);
// //       dispatch(finalizeTest({ testId: test._id, answers }));
// //     } else {
// //       toast.error('Please answer at least one question before submitting');
// //     }
// //   }, [dispatch, test, answers]);

// //   // Auto-submit when timer expires
// //   useEffect(() => {
// //     if (status === 'started' && timer <= 0 && answers?.length > 0) {
// //       // console.log('Timer expired, auto-submitting test ID:', test._id);
// //       handleSubmit();
// //     }
// //   }, [timer, status, answers, handleSubmit]);

// //   const handleStartTest = useCallback(() => {
// //     if (loadedTest?.test?._id) {
// //       // console.log('Starting test with ID:', loadedTest.test._id);
// //       dispatch(beginTest(loadedTest.test._id));
// //     } else {
// //       toast.error('Test ID not found');
// //     }
// //   }, [dispatch, loadedTest]);

// //   if (status === 'loading') {
// //     return (
// //       <div className="flex items-center justify-center h-screen">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
// //       </div>
// //     );
// //   }

// //   if (status === 'error') {
// //     return (
// //       <div className="flex items-center justify-center h-screen">
// //         <div
// //           className={`p-6 rounded-xl ${
// //             isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
// //           } shadow-lg`}
// //         >
// //           <h2 className="text-xl font-bold mb-4">Error loading test</h2>
// //           <p>{error}</p>
// //           <button
// //             onClick={() => navigate('/')}
// //             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
// //           >
// //             Back to Tests
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!test) return null;

// //   return (
// //     <div
// //       className={`min-h-screen ${
// //         isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
// //       } transition-colors duration-300`}
// //     >
// //       <AnimatePresence mode="wait">
// //         <motion.div
// //           key={status}
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           exit={{ opacity: 0 }}
// //           transition={{ duration: 0.3 }}
// //           className="max-w-4xl mx-auto p-4 md:p-6"
// //         >
// //           {status === 'idle' && (
// //             <TestStart test={test} onStart={handleStartTest} />
// //           )}

// //           {status === 'started' && (
// //             <TestQuestion
// //               question={{
// //                 ...test.questions[currentQuestionIndex],
// //                 questionIndex: currentQuestionIndex,
// //               }}
// //               questionNumber={currentQuestionIndex + 1}
// //               totalQuestions={test.questions.length}
// //               timeLeft={timer}
// //               onSubmit={handleSubmit}
// //             />
// //           )}

// //           {status === 'submitted' && results && (
// //             <TestResults
// //               results={results}
// //               questions={test.questions}
// //               onClose={() => navigate('/tests')}
// //             />
// //           )}
// //         </motion.div>
// //       </AnimatePresence>
// //     </div>
// //   );
// // };

// // export default TestContainer;
// import { useEffect, useCallback, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useLoaderData } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { motion, AnimatePresence } from 'framer-motion';
// import { debounce } from 'lodash';
// import {
//   beginTest,
//   finalizeTest,
//   resetTest,
//   setTest,
//   updateTimer,
// } from '../store/slices/testSlice';
// import TestStart from './TestStart';
// import TestQuestion from './TestQuestion';
// import TestResults from './TestResults';
// import { useDarkMode } from '../features/darkMode/useDarkMode';

// const TEST_STATE_KEY = 'testState';

// const TestContainer = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isDarkMode } = useDarkMode();
//   const loadedTest = useLoaderData();
//   const { user } = useSelector((state) => state.auth);
//   const { test, status, currentQuestionIndex, timer, results, answers, error } =
//     useSelector((state) => state.test);
//   const isMounted = useRef(true);
//   const syncTimerRef = useRef(null);

//   const saveState = useCallback(() => {
//     if (!test || !isMounted.current) return;
//     try {
//       const stateToPersist = {
//         test: {
//           _id: test._id,
//           title: test.title,
//           description: test.description,
//           category: test.category,
//           createdBy: test.createdBy,
//           questions: test.questions,
//           startTime: test.startTime,
//           endTime: test.endTime,
//           duration: test.duration,
//           status: test.status,
//           totalPoints: test.totalPoints,
//           createdAt: test.createdAt,
//           updatedAt: test.updatedAt,
//           onGoingstudents: test.onGoingstudents,
//         },
//         currentQuestionIndex,
//         answers,
//         timer,
//         startTime: test.startTime,
//         status,
//       };
//       console.log('[TestContainer] Saving state:', stateToPersist);
//       localStorage.setItem(TEST_STATE_KEY, JSON.stringify(stateToPersist));
//     } catch (err) {
//       console.error('[TestContainer] saveState Error:', err);
//     }
//   }, [test, currentQuestionIndex, answers, timer, status]);

//   const syncTimerWithServer = useCallback(
//     debounce(() => {
//       if (
//         isMounted.current &&
//         test?._id &&
//         loadedTest?.hasStarted &&
//         status === 'started'
//       ) {
//         console.log('[TestContainer] Syncing timer for test ID:', test._id);
//         dispatch(beginTest(test._id));
//       }
//     }, 10000),
//     [dispatch, test?._id, status, loadedTest?.hasStarted]
//   );

//   useEffect(() => {
//     syncTimerRef.current = syncTimerWithServer;
//     return () => {
//       isMounted.current = false;
//       saveState(); // Save state on unmount
//       toast.dismiss();
//       syncTimerRef.current?.cancel();
//     };
//   }, [syncTimerWithServer, saveState]);

//   useEffect(() => {
//     console.log('[TestContainer] Loaded Test:', loadedTest);
//     console.log('[TestContainer] Redux User:', user);
//     if (!user) {
//       if (isMounted.current) {
//         toast.error('Please log in to access the test');
//         navigate('/login');
//       }
//       return;
//     }
//     if (loadedTest?.test) {
//       const localState = JSON.parse(
//         localStorage.getItem(TEST_STATE_KEY) || '{}'
//       );
//       const isOngoing = loadedTest.test.onGoingstudents?.includes(user._id);
//       let isStale = false;
//       if (localState.test?._id === loadedTest.test._id && isOngoing) {
//         const localStartTime = new Date(localState.startTime).getTime();
//         const serverStartTime = new Date(loadedTest.startTime).getTime();
//         const timeDiff = Math.abs(localStartTime - serverStartTime) / 1000;
//         if (
//           timeDiff > 10 ||
//           localState.timer > loadedTest.remainingTime * 60 + 5 ||
//           localState.answers?.length !== loadedTest.test.questions.length
//         ) {
//           isStale = true;
//           console.log('[TestContainer] Stale localStorage detected:', {
//             timeDiff,
//             localTimer: localState.timer,
//             serverTimer: loadedTest.remainingTime * 60,
//             answersLength: localState.answers?.length,
//             questionsLength: loadedTest.test.questions.length,
//           });
//         }
//       } else {
//         isStale = true;
//         console.log('[TestContainer] Invalid localStorage:', {
//           localTestId: localState.test?._id,
//           serverTestId: loadedTest.test._id,
//           isOngoing,
//         });
//       }
//       if (isStale || test?._id !== loadedTest.test._id) {
//         console.log(
//           '[TestContainer] Resetting state for test ID:',
//           loadedTest.test._id
//         );
//         dispatch(resetTest());
//         dispatch(
//           setTest({
//             test: loadedTest.test,
//             startTime: loadedTest.startTime,
//             remainingTime: loadedTest.remainingTime,
//           })
//         );
//       }
//     }
//   }, [dispatch, loadedTest, user, navigate, test?._id]);

//   useEffect(() => {
//     if (loadedTest?.hasStarted && status === 'idle' && isMounted.current) {
//       console.log(
//         '[TestContainer] Test is ongoing, dispatching beginTest for test ID:',
//         loadedTest.test._id
//       );
//       dispatch(beginTest(loadedTest.test._id));
//     }
//   }, [dispatch, loadedTest, status]);

//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (
//         document.visibilityState === 'visible' &&
//         loadedTest?.hasStarted &&
//         status === 'started' &&
//         isMounted.current
//       ) {
//         console.log('[TestContainer] Tab became visible, syncing timer');
//         syncTimerRef.current();
//       }
//     };
//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//     };
//   }, [status, loadedTest?.hasStarted]);

//   useEffect(() => {
//     if (error && isMounted.current) {
//       console.log('[TestContainer] Error:', error);
//       toast.error(error);
//       if (
//         error.includes('not found') ||
//         error.includes('expired') ||
//         error.includes('not started') ||
//         error.includes('already completed') ||
//         error.includes('duration exceeded')
//       ) {
//         dispatch(resetTest());
//         navigate('/tests');
//       }
//     }
//   }, [error, dispatch, navigate]);

//   useEffect(() => {
//     if (status !== 'started' || timer <= 0) return;
//     const timerInterval = setInterval(() => {
//       dispatch(updateTimer());
//     }, 1000);
//     const saveInterval = setInterval(() => {
//       saveState();
//     }, 10000);
//     return () => {
//       clearInterval(timerInterval);
//       clearInterval(saveInterval);
//     };
//   }, [status, timer, dispatch, saveState]);

//   const handleSubmit = useCallback(() => {
//     if (
//       answers?.length > 0 &&
//       answers.some((answer) => answer?.selectedOptionIndex != null)
//     ) {
//       console.log(
//         '[TestContainer] Submitting test ID:',
//         test._id,
//         'with answers:',
//         answers
//       );
//       dispatch(finalizeTest({ testId: test._id, answers }));
//     } else {
//       console.log('[TestContainer] No valid answers, preventing submission');
//       if (isMounted.current) {
//         toast.error('Please answer at least one question before submitting');
//       }
//     }
//   }, [dispatch, test, answers]);

//   useEffect(() => {
//     if (
//       status === 'started' &&
//       timer <= 0 &&
//       answers?.length > 0 &&
//       answers.some((answer) => answer?.selectedOptionIndex != null)
//     ) {
//       console.log(
//         '[TestContainer] Timer expired, auto-submitting test ID:',
//         test._id
//       );
//       handleSubmit();
//     } else if (status === 'started' && timer <= 0) {
//       console.log(
//         '[TestContainer] Timer expired, no valid answers, resetting test'
//       );
//       dispatch(resetTest());
//       if (isMounted.current) {
//         toast.info('Test time expired without answers. Test reset.');
//         navigate('/tests');
//       }
//     }
//   }, [timer, status, answers, handleSubmit, dispatch, navigate]);

//   const handleStartTest = useCallback(() => {
//     if (loadedTest?.test?._id) {
//       console.log(
//         '[TestContainer] Starting test with ID:',
//         loadedTest.test._id
//       );
//       dispatch(beginTest(loadedTest.test._id));
//     } else if (isMounted.current) {
//       toast.error('Test ID not found');
//     }
//   }, [dispatch, loadedTest]);

//   if (status === 'loading') {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (status === 'error') {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div
//           className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg`}
//         >
//           <h2 className="text-xl font-bold mb-4">Error loading test</h2>
//           <p>{error}</p>
//           <button
//             onClick={() => navigate('/tests')}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             Back to Tests
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!test) return null;

//   return (
//     <div
//       className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}
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
//v3
import { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { debounce } from 'lodash';
import {
  beginTest,
  finalizeTest,
  resetTest,
  setTest,
  updateTimer,
} from '../store/slices/testSlice';
import TestStart from './TestStart';
import TestQuestion from './TestQuestion';
import TestResults from './TestResults';
import { useDarkMode } from '../features/darkMode/useDarkMode';

const TEST_STATE_KEY = 'testState';

const TestContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const loadedTest = useLoaderData();
  const { user } = useSelector((state) => state.auth);
  const { test, status, currentQuestionIndex, timer, results, answers, error } =
    useSelector((state) => state.test);
  const isMounted = useRef(true);
  const syncTimerRef = useRef(null);

  const saveState = useCallback(() => {
    if (!test || !isMounted.current) return;
    try {
      const stateToPersist = {
        test: {
          _id: test._id,
          title: test.title,
          description: test.description,
          category: test.category,
          createdBy: test.createdBy,
          questions: test.questions,
          startTime: test.startTime,
          endTime: test.endTime,
          duration: test.duration,
          status: test.status,
          totalPoints: test.totalPoints,
          createdAt: test.createdAt,
          updatedAt: test.updatedAt,
          onGoingstudents: test.onGoingstudents,
        },
        currentQuestionIndex,
        answers,
        timer,
        startTime: test.startTime,
        status,
      };
      console.log('[TestContainer] Saving state:', stateToPersist);
      localStorage.setItem(TEST_STATE_KEY, JSON.stringify(stateToPersist));
    } catch (err) {
      console.error('[TestContainer] saveState Error:', err);
    }
  }, [test, currentQuestionIndex, answers, timer, status]);

  const syncTimerWithServer = useCallback(
    debounce(() => {
      if (isMounted.current && test?._id && status === 'started') {
        console.log('[TestContainer] Syncing timer for test ID:', test._id);
        dispatch(beginTest(test?._id));
      }
    }, 10000),
    [dispatch, test?._id, status]
  );

  useEffect(() => {
    syncTimerRef.current = syncTimerWithServer;
    return () => {
      isMounted.current = false;
      saveState();
      toast.dismiss();
      syncTimerRef.current?.cancel();
      // console.log('[TestContainer] Cleanup: Saving state and cancelling sync');
    };
  }, [syncTimerWithServer, saveState]);

  useEffect(() => {
    // console.log('[TestContainer] Loaded Test:', loadedTest);
    // console.log('[TestContainer] Redux User:', user);
    if (!user) {
      if (isMounted.current) {
        toast.error('Please log in access the test');
        navigate('/login');
      }
      return;
    }
    if (loadedTest?.test) {
      const localState = JSON.parse(
        localStorage.getItem(TEST_STATE_KEY) || '{}'
      );
      const isOngoing = loadedTest.test.onGoingstudents?.includes(user._id);
      let isStale = false;
      if (localState.test?._id === loadedTest.test?._id && isOngoing) {
        const localStartTime = new Date(localState.startTime).getTime();
        const serverStartTime = new Date(loadedTest.startTime).getTime();
        const timeDiff = Math.abs(localStartTime - serverStartTime) / 1000;
        if (
          timeDiff > 10 ||
          localState.timer > loadedTest.remainingTime * 60 + 5 ||
          localState.answers?.length !== loadedTest.test.questions.length
        ) {
          isStale = true;
          // console.log('[TestContainer] Stale localStorage detected:', {
          //   timeDiff,
          //   localTimer: localState.timer,
          //   serverTimer: loadedTest.remainingTime * 60,
          //   answersLength: localState.answers?.length,
          //   questionsLength: loadedTest.test.questions.length,
          // });
        }
      } else {
        isStale = true;
        // console.log('[TestContainer] Invalid localStorage:', {
        //   localTestId: localState.test?._id,
        //   serverTestId: loadedTest.test?._id,
        //   isOngoing,
        // });
      }
      if (isStale || test?._id !== loadedTest.test?._id) {
        // console.log(
        //   '[TestContainer] Resetting state for test ID:',
        //   loadedTest.test?._id
        // );
        dispatch(resetTest());
        dispatch(
          setTest({
            test: loadedTest.test,
            startTime: loadedTest.startTime,
            remainingTime: loadedTest.remainingTime,
          })
        );
      }
    }
  }, [dispatch, loadedTest, user, navigate, test?._id]);

  useEffect(() => {
    if (loadedTest?.hasStarted && status === 'idle' && isMounted.current) {
      // console.log(
      //   '[TestContainer] Test is ongoing, dispatching beginTest for test ID:',
      //   loadedTest.test?._id
      // );
      dispatch(beginTest(loadedTest?.test?._id));
    }
  }, [dispatch, loadedTest, status]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === 'visible' &&
        status === 'started' &&
        isMounted.current
      ) {
        // console.log('[TestContainer] Tab became visible, syncing timer');
        syncTimerRef.current();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [status]);

  useEffect(() => {
    if (error && isMounted.current) {
      // console.log('[TestContainer] Error:', error);
      toast.error(error);
      if (
        error.includes('not found') ||
        error.includes('expired') ||
        error.includes('not started') ||
        error.includes('already completed') ||
        error.includes('duration exceeded')
      ) {
        dispatch(resetTest());
        navigate('/tests');
      }
    }
  }, [error, dispatch, navigate]);

  useEffect(() => {
    if (status !== 'started' || timer <= 0) {
      // console.log(
      //   '[TestContainer] Stopping sync interval: status=',
      //   status,
      //   'timer=',
      //   timer
      // );
      return;
    }
    // console.log(
    //   '[TestContainer] Starting sync interval for test ID:',
    //   test._id
    // );
    const timerInterval = setInterval(() => {
      dispatch(updateTimer());
    }, 1000);
    const saveInterval = setInterval(() => {
      saveState();
    }, 10000);
    const syncInterval = setInterval(() => {
      // console.log(
      //   '[TestContainer] Periodic sync triggered for test ID:',
      //   test._id
      // );
      syncTimerRef.current();
    }, 10000);
    return () => {
      // console.log(
      //   '[TestContainer] Cleaning up intervals for test ID:',
      //   test._id
      // );
      clearInterval(timerInterval);
      clearInterval(saveInterval);
      clearInterval(syncInterval);
    };
  }, [status, timer, dispatch, saveState, test?._id]);

  const handleSubmit = useCallback(() => {
    if (
      answers?.length > 0 &&
      answers.some((answer) => answer?.selectedOptionIndex != null)
    ) {
      // console.log(
      //   '[TestContainer] Submitting test ID:',
      //   test._id,
      //   'with answers:',
      //   answers
      // );
      dispatch(finalizeTest({ testId: test?._id, answers }));
    } else {
      // console.log('[TestContainer] No valid answers, preventing submission');
      if (isMounted.current) {
        toast.error('Please answer at least one question before submitting');
      }
    }
  }, [dispatch, test, answers]);

  useEffect(() => {
    if (
      status === 'started' &&
      timer <= 0 &&
      answers?.length > 0 &&
      answers.some((answer) => answer?.selectedOptionIndex != null)
    ) {
      // console.log(
      //   '[TestContainer] Timer expired, auto-submitting test ID:',
      //   test._id
      // );
      handleSubmit();
    } else if (status === 'started' && timer <= 0) {
      // console.log(
      //   '[TestContainer] Timer expired, no valid answers, resetting test'
      // );
      dispatch(resetTest());
      if (isMounted.current) {
        toast.info('Test time expired without answers. Test reset.');
        navigate('/tests');
      }
    }
  }, [timer, status, answers, handleSubmit, dispatch, navigate, test?._id]);

  const handleStartTest = useCallback(() => {
    if (loadedTest?.test?._id) {
      // console.log(
      //   '[TestContainer] Starting test with ID:',
      //   loadedTest.test._id
      // );
      dispatch(beginTest(loadedTest.test?._id));
    } else if (isMounted.current) {
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
          className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg`}
        >
          <h2 className="text-xl font-bold mb-4">Error loading test</h2>
          <p>{error}</p>
          <button
            onClick={() => navigate('/tests')}
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
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}
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
