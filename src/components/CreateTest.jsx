import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  addTest,
  loadCategories,
  resetCreateStatus,
} from '../store/slices/testSlice';
import { useDarkMode } from '../features/darkMode/useDarkMode';

const CreateTest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const { createTestStatus, categories, error } = useSelector(
    (state) => state.test
  );

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    questions: [
      {
        question: '',
        options: ['', '', '', ''],
        correctOptionIndex: 0,
        points: 1,
      },
    ],
    startTime: '',
    endTime: '',
    duration: 60,
    status: 'Available',
  });

  useEffect(() => {
    dispatch(loadCategories());
    return () => dispatch(resetCreateStatus());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index][field] = value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          question: '',
          options: ['', '', '', ''],
          correctOptionIndex: 0,
          points: 1,
        },
      ],
    });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.title ||
      !formData.category ||
      !formData.startTime ||
      !formData.endTime
    ) {
      alert('Please fill all required fields');
      return;
    }

    // Validate questions
    for (const q of formData.questions) {
      if (!q.question || q.options.some((opt) => !opt)) {
        alert('Please fill all question fields and options');
        return;
      }
    }

    // Format dates to ISO string
    const testData = {
      ...formData,
      startTime: new Date(formData.startTime).toISOString(),
      endTime: new Date(formData.endTime).toISOString(),
    };

    dispatch(addTest(testData));
  };

  if (createTestStatus === 'succeeded') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}
      >
        <h2
          className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
        >
          Test Created Successfully!
        </h2>
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              dispatch(resetCreateStatus());
              setFormData({
                title: '',
                description: '',
                category: '',
                questions: [
                  {
                    question: '',
                    options: ['', '', '', ''],
                    correctOptionIndex: 0,
                    points: 1,
                  },
                ],
                startTime: '',
                endTime: '',
                duration: 60,
                status: 'Available',
              });
            }}
            className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition`}
          >
            Create Another
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/admin')}
            className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}
          >
            Back to Admin
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}
    >
      <h2
        className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
      >
        Create New Test
      </h2>

      {createTestStatus === 'failed' && (
        <div
          className={`p-4 mb-6 rounded-lg ${isDarkMode ? 'bg-red-900/50 text-red-200' : 'bg-red-100 text-red-800'}`}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}
        >
          <h3
            className={`font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          >
            Test Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                required
              />
            </div>

            <div>
              <label
                className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Category *
              </label>
              <select
                name="category"
                value={formData?.category}
                onChange={handleChange}
                className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                required
              >
                <option value="">Select a category</option>
                {categories?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Start Time *
              </label>
              <input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                required
              />
            </div>

            <div>
              <label
                className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                End Time *
              </label>
              <input
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                required
              />
            </div>

            <div>
              <label
                className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Duration (minutes) *
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="1"
                className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                required
              />
            </div>

            <div>
              <label
                className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                rows="3"
              />
            </div>
          </div>
        </div>

        <div
          className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3
              className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
            >
              Questions
            </h3>
            <motion.button
              type="button"
              onClick={addQuestion}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1 rounded ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white text-sm`}
            >
              Add Question
            </motion.button>
          </div>

          {formData.questions.map((question, qIndex) => (
            <motion.div
              key={qIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 mb-4 rounded-lg ${isDarkMode ? 'bg-gray-700/30' : 'bg-white'} shadow`}
            >
              <div className="flex justify-between items-center mb-3">
                <h4
                  className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                >
                  Question {qIndex + 1}
                </h4>
                {formData.questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className={`text-sm ${isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="mb-4">
                <label
                  className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Question Text *
                </label>
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, 'question', e.target.value)
                  }
                  className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Options *
                </label>
                <div className="space-y-2">
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`correct-${qIndex}`}
                        checked={question.correctOptionIndex === oIndex}
                        onChange={() =>
                          handleQuestionChange(
                            qIndex,
                            'correctOptionIndex',
                            oIndex
                          )
                        }
                        className="h-4 w-4"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(qIndex, oIndex, e.target.value)
                        }
                        className={`flex-1 p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label
                  className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Points *
                </label>
                <input
                  type="number"
                  min="1"
                  value={question.points}
                  onChange={(e) =>
                    handleQuestionChange(
                      qIndex,
                      'points',
                      parseInt(e.target.value)
                    )
                  }
                  className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                  required
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <motion.button
            type="button"
            onClick={() => navigate('/admin')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            disabled={createTestStatus === 'loading'}
            whileHover={{ scale: createTestStatus === 'loading' ? 1 : 1.05 }}
            whileTap={{ scale: createTestStatus === 'loading' ? 1 : 0.95 }}
            className={`px-6 py-2 rounded-lg ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition ${
              createTestStatus === 'loading'
                ? 'opacity-70 cursor-not-allowed'
                : ''
            }`}
          >
            {createTestStatus === 'loading' ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating...
              </span>
            ) : (
              'Create Test'
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateTest;
