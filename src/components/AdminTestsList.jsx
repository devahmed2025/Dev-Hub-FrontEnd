import { useDarkMode } from '../features/darkMode/useDarkMode';

const AdminTestsList = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`p-6 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">All Tests</h2>
      <p>Placeholder: Implement test list functionality here.</p>
    </div>
  );
};

export default AdminTestsList;