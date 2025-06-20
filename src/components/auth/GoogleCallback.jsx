// pages/GoogleCallback.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, setLoggingIn } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { login as loginApi, getCurrentUser } from '../../api/api';

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser(); // hits /auth/me
        dispatch(login(res.data.data));
        navigate('/');
      } catch (err) {
        navigate('/login');
      }
    };

    fetchUser();
  }, [dispatch, navigate]);

  return <div>Logging you in via Google...</div>;
};

export default GoogleCallback;
