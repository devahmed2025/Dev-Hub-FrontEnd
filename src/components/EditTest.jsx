import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  editTest,
  loadTest,
  resetCreateStatus,
  loadCategories,
} from '../store/slices/testSlice';

const EditTest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { testId } = useParams();
  const {
    test: currentTest,
    categories,
    updateTestStatus,
    error,
  } = useSelector((state) => state.test);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    questions: [],
    startTime: '',
    endTime: '',
    duration: 60,
    status: 'Available',
  });

  useEffect(() => {
    dispatch(loadTest(testId));
    dispatch(loadCategories());
  }, [dispatch, testId]);

  useEffect(() => {
    if (currentTest && currentTest._id === testId) {
      setFormData({
        title: currentTest.title,
        description: currentTest.description,
        category: currentTest.category,
        questions: currentTest.questions.map((q) => ({
          ...q,
          question: q.question,
          options: [...q.options],
          correctOptionIndex: q.correctOptionIndex,
          points: q.points,
        })),
        startTime: new Date(currentTest.startTime).toISOString().slice(0, 16),
        endTime: new Date(currentTest.endTime).toISOString().slice(0, 16),
        duration: currentTest.duration,
        status: currentTest.status,
      });
    }
  }, [currentTest, testId]);

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
    // Format dates to ISO string
    const testData = {
      ...formData,
      startTime: new Date(formData.startTime).toISOString(),
      endTime: new Date(formData.endTime).toISOString(),
    };
    dispatch(editTest({ testId, testData })).then(() => {
      if (updateTestStatus === 'succeeded') {
        navigate('/admin');
      }
    });
  };

  if (updateTestStatus === 'succeeded') {
    return (
      <div className="success-message">
        <p>Test updated successfully!</p>
        <button
          onClick={() => {
            dispatch(resetCreateStatus());
            navigate('/admin');
          }}
        >
          Back to Admin
        </button>
      </div>
    );
  }

  return (
    <div className="edit-test">
      <h2>Edit Test</h2>
      {updateTestStatus === 'failed' && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Start Time:</label>
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>End Time:</label>
          <input
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Duration (minutes):</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <h3>Questions</h3>
        {formData.questions.map((question, qIndex) => (
          <div key={qIndex} className="question-card">
            <div className="form-group">
              <label>Question {qIndex + 1}:</label>
              <input
                type="text"
                value={question.question}
                onChange={(e) =>
                  handleQuestionChange(qIndex, 'question', e.target.value)
                }
                required
              />
            </div>

            <div className="options-group">
              <label>Options:</label>
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="option">
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={question.correctOptionIndex === oIndex}
                    onChange={() =>
                      handleQuestionChange(qIndex, 'correctOptionIndex', oIndex)
                    }
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                    required
                  />
                </div>
              ))}
            </div>

            <div className="form-group">
              <label>Points:</label>
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
                required
              />
            </div>

            <button
              type="button"
              onClick={() => removeQuestion(qIndex)}
              disabled={formData.questions.length <= 1}
            >
              Remove Question
            </button>
          </div>
        ))}

        <button type="button" onClick={addQuestion}>
          Add Question
        </button>

        <button type="submit" disabled={updateTestStatus === 'loading'}>
          {updateTestStatus === 'loading' ? 'Updating...' : 'Update Test'}
        </button>
      </form>
    </div>
  );
};

export default EditTest;
