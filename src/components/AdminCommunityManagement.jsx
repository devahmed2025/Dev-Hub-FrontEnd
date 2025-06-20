import { useDarkMode } from '../features/darkMode/useDarkMode';

const AdminCommunityManagement = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`p-6 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">Manage Community</h2>
      <p>Placeholder: Implement community management functionality here.</p>
    </div>
  );
};

export default AdminCommunityManagement;