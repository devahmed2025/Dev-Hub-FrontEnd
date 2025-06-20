import { useActionData, Form, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { forgotPassword } from '../../api/api';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { submitEmail } from '../../store/slices/passwordResetThunks';
import { toast } from 'react-toastify';

//action
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);
  // try {
  //   await forgotPassword(data);
  //   return { success: 'Password reset code sent' };
  // } catch (error) {
  //   return {
  //     error: error.response?.data?.message || 'Failed to send reset code',
  //   };
  // }
  // the api call is handled by the api
}

function ForgotPassword() {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.passwordReset);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(submitEmail(data.email));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Forgot Password
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Form method="post" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="email"
            label="Email"
            type="email"
            {...register('email', { required: true })}
            className="mb-4"
          />
          <Button type="primary" className="w-full" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Reset Code'}
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default ForgotPassword;
