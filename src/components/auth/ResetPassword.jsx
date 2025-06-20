import { Form, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { toast } from 'react-toastify';
import { submitNewPassword } from '../../store/slices/passwordResetThunks';
import { resetPassword } from '../../api/api';

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // try {
  //   await resetPassword({
  //     email: data.email,
  //     newPassword: data.newPassword
  //   });
  //   return { success: 'Password reset successfully' };
  // } catch (error) {
  //   return {
  //     error: error.response?.data?.message || 'Failed to reset password',
  //   };
  // }
}

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, isLoading, error } = useSelector(
    (state) => state.passwordReset
  );
  const { register, handleSubmit, watch } = useForm();

  const onSubmit = async (data) => {
    const success = await dispatch(
      submitNewPassword(data.newPassword) // Just send the password string
    );
    if (success) {
      navigate('/login');
    }
  };
  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Reset Password
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Form method="post" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="newPassword"
            label="New Password"
            type="password"
            {...register('newPassword', {
              required: 'New password is required',
            })}
            className="mb-4"
          />
          <Button type="primary" className="w-full" disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default ResetPassword;
