// features/passwordReset/passwordResetSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  resetCode: '',
  currentStep: 'forgot-password', // 'forgot-password', 'verify-code', 'reset-password'
  isLoading: false,
  error: null,
};

const passwordResetSlice = createSlice({
  name: 'passwordReset',
  initialState,
  reducers: {
    setEmail(state, action) {
      // here after we dispatched the mail we set the next step to be verify-code
      state.email = action.payload;
      state.currentStep = 'verify-code';
      state.error = null;
    },
    setResetCode(state, action) {
      state.resetCode = action.payload;
      state.currentStep = 'reset-password';
      state.error = null;
    },
    resetFlow(state) {
      Object.assign(state, initialState);
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setEmail, setResetCode, resetFlow, setLoading, setError } =
  passwordResetSlice.actions;

export default passwordResetSlice.reducer;
