import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { initiateGoogleAuth } from '../../api/api';
import { startOAuth } from '../../store/slices/authSlice';
import Button from '../ui/Button';

const OAuthButton = () => {
  const dispatch = useDispatch();
  
  const handleGoogleLogin = () => {
    dispatch(startOAuth());
    initiateGoogleAuth();
  };

  return (
    <Button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2 text-white"
    >
      <FcGoogle className="text-xl " />
      Sign in with Google
    </Button>
  );
};

export default OAuthButton;