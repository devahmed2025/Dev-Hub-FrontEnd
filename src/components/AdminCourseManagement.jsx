import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, clearError } from '../store/slices/courseSlice';
import {
  createCourse,
  updateCourse,
  deleteCourse,
  fetchCategories,
} from '../api/api';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import LoadingSpinner from './ui/LoadingSpinner';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdminCourseManagement = () => {
  const { isDarkMode } = useDarkMode();
  const dispatch = useDispatch();
  const { courses, status, error } = useSelector((state) => state.courses);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: [],
    whoIsThisFor: '',
    price: '',
    goals: [],
    longDescription: '',
    category: '',
    coverPhoto: null,
    videos: [],
    videoTitles: [],
    isPreviews: [],
  });
  const [editCourseId, setEditCourseId] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(getCourses());
    fetchCategories().then(setCategories);
    return () => dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleArrayInput = (e, field) => {
    const value = e.target.value.split(',').map((item) => item.trim());
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item, index) =>
          data.append(`${key}[${index}]`, item)
        );
      } else if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      if (editCourseId) {
        await updateCourse(editCourseId, data);
        toast.success('Course updated successfully');
        setEditCourseId(null);
      } else {
        await createCourse(data);
        toast.success('Course created successfully');
      }
      dispatch(getCourses());
      setFormData({
        title: '',
        description: '',
        requirements: [],
        whoIsThisFor: '',
        price: '',
        goals: [],
        longDescription: '',
        category: '',
        coverPhoto: null,
        videos: [],
        videoTitles: [],
        isPreviews: [],
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (course) => {
    setEditCourseId(course._id);
    setFormData({
      title: course.title,
      description: course.description,
      requirements: course.requirements,
      whoIsThisFor: course.whoIsThisFor,
      price: course.price,
      goals: course.goals,
      longDescription: course.longDescription,
      category: course.category?._id || '',
      coverPhoto: null,
      videos: [],
      videoTitles: course.videos.map((v) => v.title),
      isPreviews: course.videos.map((v) => v.isPreview.toString()),
    });
  };

  const handleDelete = async (courseId) => {
    try {
      await deleteCourse(courseId);
      dispatch(getCourses());
      toast.success('Course deleted successfully');
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (status === 'loading') return <LoadingSpinner />;

  return (
    <div
      className={`p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
    >
      <h2 className="text-2xl font-bold mb-6">Manage Courses</h2>
      <form onSubmit={handleSubmit} className="mb-8 max-w-lg">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Course Title"
          className={`w-full p-2 mb-4 rounded-md ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          } border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          className={`w-full p-2 mb-4 rounded-md ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          } border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
        />
        <input
          type="text"
          name="requirements"
          onChange={(e) => handleArrayInput(e, 'requirements')}
          placeholder="Requirements (comma-separated)"
          className={`w-full p-2 mb-4 rounded-md ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          } border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
        />
        <input
          type="text"
          name="whoIsThisFor"
          value={formData.whoIsThisFor}
          onChange={handleInputChange}
          placeholder="Who is this for?"
          className={`w-full p-2 mb-4 rounded-md ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          } border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Price"
          className={`w-full p-2 mb-4 rounded-md ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          } border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
        />
        <input
          type="text"
          name="goals"
          onChange={(e) => handleArrayInput(e, 'goals')}
          placeholder="Goals (comma-separated)"
          className={`w-full p-2 mb-4 rounded-md ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          } border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
        />
        <textarea
          name="longDescription"
          value={formData.longDescription}
          onChange={handleInputChange}
          placeholder="Long Description"
          className={`w-full p-2 mb-4 rounded-md ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          } border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className={`w-full p-2 mb-4 rounded-md ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          } border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          name="coverPhoto"
          onChange={handleFileChange}
          className="mb-4"
        />
        <input
          type="file"
          name="videos"
          multiple
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              videos: Array.from(e.target.files),
            }))
          }
          className="mb-4"
        />
        <input
          type="text"
          name="videoTitles"
          onChange={(e) => handleArrayInput(e, 'videoTitles')}
          placeholder="Video Titles (comma-separated)"
          className={`w-full p-2 mb-4 rounded-md ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          } border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
        />
        <input
          type="text"
          name="isPreviews"
          onChange={(e) => handleArrayInput(e, 'isPreviews')}
          placeholder="Is Preview? (true/false, comma-separated)"
          className={`w-full p-2 mb-4 rounded-md ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          } border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editCourseId ? 'Update Course' : 'Create Course'}
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className={`p-4 rounded-lg shadow-md ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <img
              src={course.coverPhoto}
              alt={course.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p className="text-sm mb-2">{course.description}</p>
            <div className="space-x-4">
              <button
                onClick={() => handleEdit(course)}
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(course._id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
              <Link
                to={`/courses/${course._id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCourseManagement;
