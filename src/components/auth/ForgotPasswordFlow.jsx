
// components/auth/ForgotPasswordFlow.jsx
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import ForgotPassword from './ForgotPassword';
import VerifyResetCode from './VerifyResetCode';
import ResetPassword from './ResetPassword';
import LoadingSpinner from '../ui/LoadingSpinner';

function ForgotPasswordFlow() {
  const { currentStep } = useSelector((state) => state.passwordReset);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {currentStep === 'forgot-password' && <ForgotPassword />}
      {currentStep === 'verify-code' && <VerifyResetCode />}
      {currentStep === 'reset-password' && <ResetPassword />}
    </Suspense>
  );
}

export default ForgotPasswordFlow;
