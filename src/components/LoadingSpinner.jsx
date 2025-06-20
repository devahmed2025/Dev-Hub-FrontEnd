// LoadingSpinner.js
function LoadingSpinner({ size = 'md' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div
      className={`inline-block ${sizeClasses[size] || sizeClasses.md} animate-spin rounded-full border-2 border-solid border-current border-r-transparent`}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default LoadingSpinner;
