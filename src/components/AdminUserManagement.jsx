import { useDarkMode } from '../features/darkMode/useDarkMode';

const AdminUserManagement = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`p-6 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
      <p>Placeholder: Implement user management functionality here.</p>
    </div>
  );
};

export default AdminUserManagement;