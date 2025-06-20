import { Link } from 'react-router-dom';

function LinkButton({ to, type = 'primary', className = '', children }) {
  const baseStyles = 'font-semibold transition-colors';
  const typeStyles = {
    primary: 'text-blue-500 hover:text-blue-600',
    card: 'block p-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700',
  };

  return (
    <Link to={to} className={`${baseStyles} ${typeStyles[type]} ${className}`}>
      {children}
    </Link>
  );
}

export default LinkButton;
