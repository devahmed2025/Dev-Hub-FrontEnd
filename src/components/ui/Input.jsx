
import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  { id, label, className = '', ...props },
  ref
) {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        className={`border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
