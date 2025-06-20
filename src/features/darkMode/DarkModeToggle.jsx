// import { useDispatch } from 'react-redux';
// import { toggleDarkMode } from '../../store/store/slices/darkModeSlice';
// import { Sun, Moon } from 'lucide-react';

// function DarkModeToggle() {
//   const dispatch = useDispatch();
//   const isDarkMode = localStorage.getItem('darkMode') === 'true';

//   return (
//     <button
//       onClick={() => dispatch(toggleDarkMode())}
//       className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
//     >
//       {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
//     </button>
//   );
// }

// export default DarkModeToggle;
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../store/slices/darkModeSlice';
import { Sun, Moon } from 'lucide-react';
import { useEffect } from 'react';

function DarkModeToggle() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

export default DarkModeToggle;
