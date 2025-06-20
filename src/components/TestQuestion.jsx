// // Enhanced TestQuestion Component
// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   setAnswer,
//   nextQuestion,
//   prevQuestion,
// } from '../store/slices/testSlice';
// import { useDarkMode } from '../features/darkMode/useDarkMode';
// import {
//   Clock,
//   ChevronLeft,
//   ChevronRight,
//   Send,
//   AlertTriangle,
//   CheckCircle2,
// } from 'lucide-react';

// const TestQuestion = ({
//   question,
//   questionNumber,
//   totalQuestions,
//   timeLeft,
//   onSubmit,
// }) => {
//   const dispatch = useDispatch();
//   const { isDarkMode } = useDarkMode();
//   const currentAnswer = useSelector(
//     (state) => state.test.answers[question.questionIndex]?.selectedOptionIndex
//   );
//   const [selectedOption, setSelectedOption] = useState(currentAnswer ?? null);
//   const [showTimeWarning, setShowTimeWarning] = useState(false);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   const getTimeColor = () => {
//     if (timeLeft <= 60) return 'text-red-500';
//     if (timeLeft <= 300) return 'text-yellow-500';
//     return isDarkMode ? 'text-gray-300' : 'text-gray-700';
//   };

//   const getTimeBgColor = () => {
//     if (timeLeft <= 60)
//       return isDarkMode
//         ? 'bg-red-900/30 border-red-500/50'
//         : 'bg-red-50 border-red-300';
//     if (timeLeft <= 300)
//       return isDarkMode
//         ? 'bg-yellow-900/30 border-yellow-500/50'
//         : 'bg-yellow-50 border-yellow-300';
//     return isDarkMode
//       ? 'bg-gray-700 border-gray-600'
//       : 'bg-gray-100 border-gray-200';
//   };

//   // Show warning animation when time is low
//   useEffect(() => {
//     if (timeLeft <= 60 && timeLeft > 0) {
//       setShowTimeWarning(true);
//       const timer = setTimeout(() => setShowTimeWarning(false), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [timeLeft]);

//   const handleOptionChange = (index) => {
//     setSelectedOption(index);
//     dispatch(
//       setAnswer({
//         questionIndex: question.questionIndex,
//         selectedOptionIndex: index,
//       })
//     );
//   };

//   const handleNext = () => {
//     dispatch(nextQuestion());
//     setSelectedOption(null);
//   };

//   const handlePrev = () => {
//     dispatch(prevQuestion());
//     setSelectedOption(null);
//   };

//   const progressPercentage = (questionNumber / totalQuestions) * 100;

//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, staggerChildren: 0.1 },
//     },
//     exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
//   };

//   const optionVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: { opacity: 1, x: 0 },
//     hover: { scale: 1.02, x: 5 },
//   };

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       exit="exit"
//       className={`max-w-4xl mx-auto rounded-2xl p-6 md:p-8 ${
//         isDarkMode
//           ? 'bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-sm border border-gray-700'
//           : 'bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm border border-gray-200'
//       } shadow-2xl`}
//     >
//       {/* Progress Bar */}
//       <div className="mb-6">
//         <div
//           className={`w-full h-2 rounded-full overflow-hidden ${
//             isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
//           }`}
//         >
//           <motion.div
//             className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
//             initial={{ width: 0 }}
//             animate={{ width: `${progressPercentage}%` }}
//             transition={{ duration: 0.5, ease: 'easeOut' }}
//           />
//         </div>
//         <p
//           className={`text-sm mt-2 text-center ${
//             isDarkMode ? 'text-gray-400' : 'text-gray-600'
//           }`}
//         >
//           Progress: {questionNumber} of {totalQuestions} questions
//         </p>
//       </div>

//       {/* Header with Timer and Question Counter */}
//       <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
//         <motion.div
//           animate={showTimeWarning ? { scale: [1, 1.05, 1] } : {}}
//           transition={{ duration: 0.5 }}
//           className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${getTimeBgColor()}`}
//         >
//           <Clock className={`w-5 h-5 ${getTimeColor()}`} />
//           <span className={`font-semibold ${getTimeColor()}`}>
//             {formatTime(timeLeft)}
//           </span>
//           {timeLeft <= 60 && (
//             <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
//           )}
//         </motion.div>

//         <div
//           className={`px-4 py-3 rounded-xl border ${
//             isDarkMode
//               ? 'bg-blue-900/30 border-blue-700/50 text-blue-300'
//               : 'bg-blue-50 border-blue-200 text-blue-700'
//           }`}
//         >
//           <span className="font-semibold">
//             Question {questionNumber} of {totalQuestions}
//           </span>
//         </div>
//       </div>

//       {/* Question */}
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="mb-8"
//       >
//         <h2
//           className={`text-2xl md:text-3xl font-bold leading-relaxed ${
//             isDarkMode ? 'text-white' : 'text-gray-800'
//           }`}
//         >
//           {question.question}
//         </h2>
//       </motion.div>

//       {/* Options */}
//       <div className="space-y-4 mb-10">
//         <AnimatePresence>
//           {question.options.map((option, index) => (
//             <motion.div
//               key={index}
//               variants={optionVariants}
//               initial="hidden"
//               animate="visible"
//               whileHover="hover"
//               transition={{ delay: index * 0.1 }}
//               className={`group p-5 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
//                 selectedOption === index
//                   ? isDarkMode
//                     ? 'bg-gradient-to-r from-blue-900/60 to-blue-800/40 border-blue-500 shadow-lg shadow-blue-900/20'
//                     : 'bg-gradient-to-r from-blue-100 to-blue-50 border-blue-400 shadow-lg shadow-blue-200/30'
//                   : isDarkMode
//                     ? 'bg-gray-700/30 border-gray-600 hover:border-blue-500/50 hover:bg-gray-700/50'
//                     : 'bg-gray-50/50 border-gray-300 hover:border-blue-400/50 hover:bg-gray-100/50'
//               }`}
//               onClick={() => handleOptionChange(index)}
//             >
//               <div className="flex items-center">
//                 <div
//                   className={`relative w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200 ${
//                     selectedOption === index
//                       ? 'border-blue-500 bg-blue-500'
//                       : isDarkMode
//                         ? 'border-gray-500 group-hover:border-blue-400'
//                         : 'border-gray-400 group-hover:border-blue-500'
//                   }`}
//                 >
//                   <AnimatePresence>
//                     {selectedOption === index && (
//                       <motion.div
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         exit={{ scale: 0 }}
//                         className="w-3 h-3 rounded-full bg-white"
//                       />
//                     )}
//                   </AnimatePresence>
//                 </div>

//                 <span
//                   className={`text-lg font-medium transition-colors duration-200 ${
//                     selectedOption === index
//                       ? isDarkMode
//                         ? 'text-blue-200'
//                         : 'text-blue-800'
//                       : isDarkMode
//                         ? 'text-gray-200 group-hover:text-white'
//                         : 'text-gray-700 group-hover:text-gray-900'
//                   }`}
//                 >
//                   {option}
//                 </span>

//                 {selectedOption === index && (
//                   <motion.div
//                     initial={{ scale: 0, rotate: -90 }}
//                     animate={{ scale: 1, rotate: 0 }}
//                     className="ml-auto"
//                   >
//                     <CheckCircle2
//                       className={`w-6 h-6 ${
//                         isDarkMode ? 'text-blue-400' : 'text-blue-600'
//                       }`}
//                     />
//                   </motion.div>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>

//       {/* Navigation Buttons */}
//       <div className="flex justify-between items-center">
//         <div>
//           {questionNumber > 1 && (
//             <motion.button
//               whileHover={{ scale: 1.05, x: -2 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handlePrev}
//               className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
//                 isDarkMode
//                   ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
//                   : 'bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300'
//               }`}
//             >
//               <ChevronLeft className="w-5 h-5" />
//               Previous
//             </motion.button>
//           )}
//         </div>

//         <div className="flex items-center gap-4">
//           {/* Answer Status Indicator */}
//           {selectedOption !== null && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
//                 isDarkMode
//                   ? 'bg-green-900/30 text-green-400 border border-green-700/50'
//                   : 'bg-green-50 text-green-600 border border-green-200'
//               }`}
//             >
//               <CheckCircle2 className="w-4 h-4" />
//               <span className="text-sm font-medium">Answered</span>
//             </motion.div>
//           )}

//           {questionNumber < totalQuestions ? (
//             <motion.button
//               whileHover={{ scale: 1.05, x: 2 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleNext}
//               disabled={selectedOption === null}
//               className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
//                 selectedOption === null
//                   ? isDarkMode
//                     ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
//                     : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-300'
//                   : isDarkMode
//                     ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-900/30'
//                     : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-lg shadow-blue-500/30'
//               }`}
//             >
//               Next
//               <ChevronRight className="w-5 h-5" />
//             </motion.button>
//           ) : (
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={onSubmit}
//               className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-lg transition-all duration-200 ${
//                 isDarkMode
//                   ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white shadow-lg shadow-green-900/30'
//                   : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white shadow-lg shadow-green-500/30'
//               }`}
//             >
//               <Send className="w-5 h-5" />
//               Submit Test
//             </motion.button>
//           )}
//         </div>
//       </div>

//       {/* Low Time Warning */}
//       <AnimatePresence>
//         {timeLeft <= 60 && timeLeft > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className={`mt-6 p-4 rounded-xl border-2 ${
//               isDarkMode
//                 ? 'bg-red-900/20 border-red-500/50 text-red-300'
//                 : 'bg-red-50 border-red-300 text-red-700'
//             }`}
//           >
//             <div className="flex items-center gap-2">
//               <AlertTriangle className="w-5 h-5 animate-pulse" />
//               <span className="font-semibold">
//                 Warning: Less than 1 minute remaining!
//               </span>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };

// export default TestQuestion;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  setAnswer,
  nextQuestion,
  prevQuestion,
} from '../store/slices/testSlice';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Send,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

const TestQuestion = ({
  question,
  questionNumber,
  totalQuestions,
  timeLeft,
  onSubmit,
}) => {
  const dispatch = useDispatch();
  const { isDarkMode } = useDarkMode();
  const currentAnswer = useSelector(
    (state) => state.test.answers[question.questionIndex]?.selectedOptionIndex
  );

  // Initialize selectedOption with the current answer from Redux
  const selectedOption = currentAnswer ?? null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getTimeColor = () => {
    if (timeLeft <= 60) return 'text-red-500';
    if (timeLeft <= 300) return 'text-yellow-500';
    return isDarkMode ? 'text-gray-300' : 'text-gray-700';
  };

  const getTimeBgColor = () => {
    if (timeLeft <= 60)
      return isDarkMode
        ? 'bg-red-900/30 border-red-500/50'
        : 'bg-red-50 border-red-300';
    if (timeLeft <= 300)
      return isDarkMode
        ? 'bg-yellow-900/30 border-yellow-500/50'
        : 'bg-yellow-50 border-yellow-300';
    return isDarkMode
      ? 'bg-gray-700 border-gray-600'
      : 'bg-gray-100 border-gray-200';
  };

  // Show warning animation when time is low
  const showTimeWarning = timeLeft <= 60 && timeLeft > 0;

  const handleOptionChange = (index) => {
    dispatch(
      setAnswer({
        questionIndex: question.questionIndex,
        selectedOptionIndex: index,
      })
    );
  };

  const handleNext = () => {
    dispatch(nextQuestion());
  };

  const handlePrev = () => {
    dispatch(prevQuestion());
  };

  const progressPercentage = (questionNumber / totalQuestions) * 100;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const optionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    hover: { scale: 1.02, x: 5 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`max-w-4xl mx-auto rounded-2xl p-6 md:p-8 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-sm border border-gray-700'
          : 'bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm border border-gray-200'
      } shadow-2xl`}
    >
      {/* Progress Bar */}
      <div className="mb-6">
        <div
          className={`w-full h-2 rounded-full overflow-hidden ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <p
          className={`text-sm mt-2 text-center ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Progress: {questionNumber} of {totalQuestions} questions
        </p>
      </div>

      {/* Header with Timer and Question Counter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <motion.div
          animate={showTimeWarning ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.5 }}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${getTimeBgColor()}`}
        >
          <Clock className={`w-5 h-5 ${getTimeColor()}`} />
          <span className={`font-semibold ${getTimeColor()}`}>
            {formatTime(timeLeft)}
          </span>
          {timeLeft <= 60 && (
            <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
          )}
        </motion.div>

        <div
          className={`px-4 py-3 rounded-xl border ${
            isDarkMode
              ? 'bg-blue-900/30 border-blue-700/50 text-blue-300'
              : 'bg-blue-50 border-blue-200 text-blue-700'
          }`}
        >
          <span className="font-semibold">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
      </div>

      {/* Question */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2
          className={`text-2xl md:text-3xl font-bold leading-relaxed ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          {question.question}
        </h2>
      </motion.div>

      {/* Options */}
      <div className="space-y-4 mb-10">
        <AnimatePresence>
          {question?.options?.map((option, index) => (
            <motion.div
              key={index}
              variants={optionVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: index * 0.1 }}
              className={`group p-5 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                selectedOption === index
                  ? isDarkMode
                    ? 'bg-gradient-to-r from-blue-900/60 to-blue-800/40 border-blue-500 shadow-lg shadow-blue-900/20'
                    : 'bg-gradient-to-r from-blue-100 to-blue-50 border-blue-400 shadow-lg shadow-blue-200/30'
                  : isDarkMode
                    ? 'bg-gray-700/30 border-gray-600 hover:border-blue-500/50 hover:bg-gray-700/50'
                    : 'bg-gray-50/50 border-gray-300 hover:border-blue-400/50 hover:bg-gray-100/50'
              }`}
              onClick={() => handleOptionChange(index)}
            >
              <div className="flex items-center">
                <div
                  className={`relative w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200 ${
                    selectedOption === index
                      ? 'border-blue-500 bg-blue-500'
                      : isDarkMode
                        ? 'border-gray-500 group-hover:border-blue-400'
                        : 'border-gray-400 group-hover:border-blue-500'
                  }`}
                >
                  <AnimatePresence>
                    {selectedOption === index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="w-3 h-3 rounded-full bg-white"
                      />
                    )}
                  </AnimatePresence>
                </div>

                <span
                  className={`text-lg font-medium transition-colors duration-200 ${
                    selectedOption === index
                      ? isDarkMode
                        ? 'text-blue-200'
                        : 'text-blue-800'
                      : isDarkMode
                        ? 'text-gray-200 group-hover:text-white'
                        : 'text-gray-700 group-hover:text-gray-900'
                  }`}
                >
                  {option}
                </span>

                {selectedOption === index && (
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="ml-auto"
                  >
                    <CheckCircle2
                      className={`w-6 h-6 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <div>
          {questionNumber > 1 && (
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </motion.button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Answer Status Indicator */}
          {selectedOption !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                isDarkMode
                  ? 'bg-green-900/30 text-green-400 border border-green-700/50'
                  : 'bg-green-50 text-green-600 border border-green-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium">Answered</span>
            </motion.div>
          )}

          {questionNumber < totalQuestions ? (
            <motion.button
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                selectedOption === null
                  ? isDarkMode
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-300'
                  : isDarkMode
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-900/30'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-lg shadow-blue-500/30'
              }`}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSubmit}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-lg transition-all duration-200 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white shadow-lg shadow-green-900/30'
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white shadow-lg shadow-green-500/30'
              }`}
            >
              <Send className="w-5 h-5" />
              Submit Test
            </motion.button>
          )}
        </div>
      </div>

      {/* Low Time Warning */}
      <AnimatePresence>
        {timeLeft <= 60 && timeLeft > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mt-6 p-4 rounded-xl border-2 ${
              isDarkMode
                ? 'bg-red-900/20 border-red-500/50 text-red-300'
                : 'bg-red-50 border-red-300 text-red-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
              <span className="font-semibold">
                Warning: Less than 1 minute remaining!
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TestQuestion;
