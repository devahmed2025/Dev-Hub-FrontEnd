import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, resetCreateStatus } from '../store/slices/testSlice';

const CreateCategory = () => {
  const dispatch = useDispatch();
  const { createCategoryStatus, error } = useSelector((state) => state.test);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCategory(formData));
  };

  if (createCategoryStatus === 'succeeded') {
    return (
      <div className="success-message">
        <p>Category created successfully!</p>
        <button onClick={() => dispatch(resetCreateStatus())}>
          Create Another
        </button>
      </div>
    );
  }

  return (
    <div className="create-category">
      <h2>Create New Category</h2>
      {createCategoryStatus === 'failed' && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
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
        <button type="submit" disabled={createCategoryStatus === 'loading'}>
          {createCategoryStatus === 'loading'
            ? 'Creating...'
            : 'Create Category'}
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
