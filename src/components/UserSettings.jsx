import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyCourses, clearError } from '../store/slices/courseSlice';
import {
  fetchCategories,
  getMyCategory,
  updateMyCategory,
  deleteMyCategory,
} from '../api/api';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import LoadingSpinner from './ui/LoadingSpinner';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { getPosts } from '../store/slices/communitySlice';

const UserSettings = () => {
  const { isDarkMode } = useDarkMode();
  const dispatch = useDispatch();
  const { myCourses, status, error } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth);
  const [categories, setCategories] = useState([]);
  const [myCategory, setMyCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);

  useEffect(() => {
    dispatch(getMyCourses());

    // Fetch categories with proper error handling
    setCategoriesLoading(true);
    fetchCategories()
      .then((response) => {
        // Access the data array from the response
        const categoriesData = response.data || [];
        setCategories(categoriesData);
      })
      .catch((err) => {
        console.error('Failed to fetch categories:', err);
        toast.error('Failed to load categories');
        setCategories([]);
      })
      .finally(() => setCategoriesLoading(false));

    // Fetch user's category
    setCategoryLoading(true);
    getMyCategory()
      .then((response) => {
        // Handle different possible response structures
        const categoryData = response.data || response;
        setMyCategory(categoryData);
        if (categoryData?._id) {
          setSelectedCategory(categoryData._id);
        }
      })
      .catch(() => {
        setMyCategory(null);
        setSelectedCategory('');
      })
      .finally(() => setCategoryLoading(false));

    return () => dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);


  const handleUpdateCategory = () => {
    if (!selectedCategory) return toast.error('Please select a category');
    updateMyCategory(selectedCategory)
      .then((response) => {
        const updatedCategory = categories.find(
          (cat) => cat._id === selectedCategory
        );
        setMyCategory(updatedCategory);
        toast.success('Category updated successfully');
      })
      .catch((err) =>
        toast.error(err.response?.data?.message || 'Failed to update category')
      );
  };

  const handleDeleteCategory = () => {
    deleteMyCategory()
      .then(() => {
        setMyCategory(null);
        setSelectedCategory('');
        toast.success('Category removed successfully');
      })
      .catch((err) =>
        toast.error(err.response?.data?.message || 'Failed to remove category')
      );
  };

  if (status === 'loading' || categoriesLoading || categoryLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className={`p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
    >
      <h2 className="text-2xl font-bold mb-6">User Settings</h2>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Profile</h3>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Change Category</h3>
          <p>Current Category: {myCategory?.name || 'None'}</p>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`w-full p-2 mt-2 rounded-md ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            } border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="mt-4 space-x-4">
            <button
              onClick={handleUpdateCategory}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={!selectedCategory}
            >
              Update Category
            </button>
            {myCategory && (
              <button
                onClick={handleDeleteCategory}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Remove Category
              </button>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Enrolled Courses</h3>
          {myCourses.length === 0 ? (
            <p>No courses enrolled.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myCourses.map((course) => (
                <div
                  key={course._id}
                  className={`p-4 rounded-lg shadow-md ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <img
                    src={course.coverPhoto || '/placeholder.png'}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                    onError={(e) => {
                      e.target.src = '/placeholder.png';
                    }}
                  />
                  <h4 className="text-lg font-semibold">{course.title}</h4>
                  <Link
                    to={`/courses/${course._id}`}
                    className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    View Course
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
