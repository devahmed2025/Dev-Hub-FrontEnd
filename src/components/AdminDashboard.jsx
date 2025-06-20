// import { Outlet, NavLink } from 'react-router-dom';

// const AdminDashboard = () => {
//   return (
//     <div className="admin-dashboard">
//       <div className="flex">
//         <aside className="w-64 bg-white dark:bg-gray-800 shadow-md p-4">
//           <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Admin Panel</h2>
//           <nav className="space-y-2">
//             <NavLink
//               to="/admin"
//               end
//               className={({ isActive }) => 
//                 `block px-4 py-2 rounded-md ${isActive ? 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`
//               }
//             >
//               All Tests
//             </NavLink>
//             <NavLink
//               to="/admin/tests/create"
//               className={({ isActive }) => 
//                 `block px-4 py-2 rounded-md ${isActive ? 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`
//               }
//             >
//               Create Test
//             </NavLink>
//             <NavLink
//               to="/admin/categories/create"
//               className={({ isActive }) => 
//                 `block px-4 py-2 rounded-md ${isActive ? 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`
//               }
//             >
//               Create Category
//             </NavLink>
//           </nav>
//         </aside>
        
//         <main className="flex-1 p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import { Outlet, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import { Users, BookOpen, Grid, MessageCircle, FileText } from 'lucide-react';

const AdminDashboard = () => {
  const { isDarkMode } = useDarkMode();
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className={`admin-dashboard min-h-screen ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div className="flex">
        <aside
          className={`w-64 ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          } shadow-md p-4 h-screen sticky top-0`}
        >
          <h2 className="text-lg font-semibold mb-6">Admin Panel</h2>
          <nav className="space-y-2">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-md ${
                  isActive
                    ? 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <FileText size={18} />
              <span>All Tests</span>
            </NavLink>
            <NavLink
              to="/admin/tests/create"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-md ${
                  isActive
                    ? 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <FileText size={18} />
              <span>Create Test</span>
            </NavLink>
            <NavLink
              to="/admin/courses"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-md ${
                  isActive
                    ? 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <BookOpen size={18} />
              <span>Manage Courses</span>
            </NavLink>
            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-md ${
                  isActive
                    ? 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <Grid size={18} />
              <span>Manage Categories</span>
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-md ${
                  isActive
                    ? 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <Users size={18} />
              <span>Manage Users</span>
            </NavLink>
            <NavLink
              to="/admin/community"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-md ${
                  isActive
                    ? 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <MessageCircle size={18} />
              <span>Manage Community</span>
            </NavLink>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Welcome, {user?.name || 'Admin'}!</h1>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;