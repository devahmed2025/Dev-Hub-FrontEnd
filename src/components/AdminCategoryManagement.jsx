import { useEffect, useState } from 'react';
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../api/api';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import LoadingSpinner from './ui/LoadingSpinner';
import { toast } from 'react-toastify';

const AdminCategoryManagement = () => {
  const { isDarkMode } = useDarkMode();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus('loading');
    fetchCategories()
      .then(setCategories)
      .catch((err) => setError(err.message))
      .finally(() => setStatus('succeeded'));
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editCategoryId) {
        await updateCategory(editCategoryId, formData);
        toast.success('Category updated successfully');
        setEditCategoryId(null);
      } else {
        await createCategory(formData);
        toast.success('Category created successfully');
      }
      setFormData({ name: '', description: '' });
      fetchCategories().then(setCategories);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (category) => {
    setEditCategoryId(category._id);
    setFormData({ name: category.name, description: category.description });
  };

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      fetchCategories().then(setCategories);
      toast.success('Category deleted successfully');
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (status === 'loading') return <LoadingSpinner />;

  return (
    <div
      className={`p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
    >
      <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>
      <form onSubmit={handleSubmit} className="mb-8 max-w-lg">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Category Name"
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
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editCategoryId ? 'Update Category' : 'Create Category'}
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div
            key={category._id}
            className={`p-4 rounded-lg shadow-md ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h3 className="text-xl font-semibold">{category.name}</h3>
            <p className="text-sm mb-4">{category.description}</p>
            <div className="space-x-4">
              <button
                onClick={() => handleEdit(category)}
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(category._id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminCategoryManagement;
