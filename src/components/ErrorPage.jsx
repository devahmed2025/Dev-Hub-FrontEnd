// pages/ErrorPage.jsx
import { useNavigate, useRouteError } from 'react-router-dom';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import Button from '../components/ui/Button';

const ErrorPage = () => {
  const error = useRouteError();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">
          {error.status === 404 ? 'Course Not Found' : 'Error'}
        </h1>
        <p className="text-lg mb-6">
          {error.status === 404
            ? "The course you're looking for doesn't exist."
            : 'An unexpected error occurred.'}
        </p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    </div>
  );
};

export default ErrorPage;