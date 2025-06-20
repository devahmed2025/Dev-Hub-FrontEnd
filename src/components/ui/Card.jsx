function Card({ className = '', children }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
}

export default Card;