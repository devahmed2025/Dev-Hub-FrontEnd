import { useActionData, Form, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { register as registerApi } from '../../api/api';
import { login, setLoading } from '../../store/slices/authSlice';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { toast } from 'react-toastify';
import { fetchCategories } from '../../api/api'; // You need to create this API function

// export async function action({ request }) {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);
//   console.log(data, 'data is');
//   try {
//     const response = await registerApi(data);
//     return { user: response.data.user, token: response.data.token };
//   } catch (error) {
//     return { error: error.response?.data?.message || 'Signup failed' };
//   }
// }

import { useNavigate } from 'react-router-dom';
function Signup() {
  // const actionData = useActionData();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();
  const [categories, setCategories] = useState([]);
  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      dispatch(setLoading(true)); // start loading
      const response = await registerApi(formData);
      // console.log(response);
      dispatch(
        login({ user: response.data.data.user, token: response.data.token })
      );
      toast.success('Signed up successfully!');
      navigate('/'); // <--- redirect manually
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      dispatch(setLoading(false)); // end loading
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchCategories();
        // console.log(response);
        setCategories(response.data); // Adjust based on your API response structure
      } catch (error) {
        // console.error('Failed to fetch categories', error);
      }
    };

    getCategories();
  }, []);

  // useEffect(() => {
  //   if (actionData?.user && actionData?.token) {
  //     dispatch(login({ user: actionData.user, token: actionData.token }));
  //     toast.success('Signed up successfully!');
  //   } else if (actionData?.error) {
  //     toast.error(actionData.error);
  //   }
  // }, [actionData, dispatch]);

  useEffect(() => {
    document.title = 'Signup - Tech-Hub';
  }, []);

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Signup
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="name"
            label="Name"
            {...register('name', { required: true })}
            className="mb-4"
          />
          <Input
            id="email"
            label="Email"
            type="email"
            {...register('email', { required: true })}
            className="mb-4"
          />
          <Input
            id="mobile"
            label="Phone"
            type="Number"
            {...register('mobile', { required: true })}
            className="mb-4"
          />
          <Input
            id="password"
            label="Password"
            type="password"
            {...register('password', { required: true })}
            className="mb-4"
          />
          <Input
            id="passwordConfirm"
            label="Confirm Password"
            type="password"
            {...register('passwordConfirm', { required: true })}
            className="mb-4"
          />
          <select
            {...register('studentCategory', { required: true })}
            className="w-full p-2 mb-4 rounded border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <Button type="primary" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
                Signing up...
              </span>
            ) : (
              'Signup'
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Signup;
