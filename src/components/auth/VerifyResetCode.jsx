import { Form, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { toast } from 'react-toastify';
import { verifyCode } from '../../store/slices/passwordResetThunks';
import { verifyResetCode } from '../../api/api';

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // try {
  //   const payload = {
  //     resetCode: data.resetCode,
  //   };
  //   await verifyResetCode(payload);
  //   return { success: 'Code verified' };
  // } catch (error) {
  //   return { error: error.response?.data?.message || 'Failed to verify code' };
  // }
}

function VerifyResetCode() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, isLoading, error } = useSelector(
    (state) => state.passwordReset
  );
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      // Dispatch the verifyCode action and unwrap the promise
      await dispatch(
        verifyCode({
          resetCode: data.resetCode,
        })
      ).unwrap();

      // Navigate to reset password page on success
      // navigate('/reset-password');
    } catch (error) {
      // Handle different error formats
      const errorMessage =
        error.payload || error.message || 'Failed to verify code';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Verify Reset Code
        </h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Enter the code sent to {email}
        </p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Form method="post" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="resetCode"
            label="Reset Code"
            {...register('resetCode', {
              required: 'Reset code is required',
              minLength: {
                value: 6,
                message: 'Reset code must be 6 characters',
              },
            })}
            className="mb-4"
          />
          <Button type="primary" className="w-full" disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default VerifyResetCode;
