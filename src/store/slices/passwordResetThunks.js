// features/passwordReset/passwordResetThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  forgotPassword,
  verifyResetCode,
  resetPassword,
} from '../../api/api.js';
import {
  setEmail,
  setResetCode,
  setLoading,
  setError,
  resetFlow,
} from './passwordResetSlice';
import { toast } from 'react-toastify';

export const submitEmail = (email) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await forgotPassword({ email });
    dispatch(setEmail(email));
    toast.success('Reset code sent to your email');
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || 'Failed to send reset code')
    );
    toast.error('Failed to send reset code');
  } finally {
    dispatch(setLoading(false));
  }
};

export const verifyCode = createAsyncThunk(
  'passwordReset/verifyCode',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const payload = {
        resetCode: data.resetCode,
      };
      const response = await verifyResetCode(payload);
      dispatch(setResetCode(data.resetCode));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Invalid reset code'
      );
    } finally {
      dispatch(setLoading(false));
    }
  }
);
export const submitNewPassword =
  (newPassword) => async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const { email } = getState().passwordReset;

      const payload = {
        email, // Get from Redux state
        newPassword, // From component
      };

      await resetPassword(payload);
      dispatch(resetFlow());
      toast.success('Password reset successfully');
      return true;
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || 'Failed to reset password')
      );
      toast.error('Failed to reset password');
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };
