import { useRouteError, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import LinkButton from './LinkButton';
import { toast } from 'react-toastify';

function ErrorFallback() {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Error - DevsHub';
    if (error?.message) {
      toast.error(`An error occurred: ${error.message}`);
    }
  }, [error]);

  const handleRetry = () => {
    navigate(0); // Refresh the current route
  };

  return (
    <div className="max-w-3xl mx-auto p-4 flex items-center justify-center min-h-screen">
      <Card className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Something Went Wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error?.message ||
            'An unexpected error occurred. Please try again or return to the home page.'}
        </p>
        <div className="flex justify-center gap-4">
          <Button type="primary" onClick={handleRetry}>
            Retry
          </Button>
          <LinkButton to="/" type="secondary">
            Go Home
          </LinkButton>
        </div>
      </Card>
    </div>
  );
}

export default ErrorFallback;
