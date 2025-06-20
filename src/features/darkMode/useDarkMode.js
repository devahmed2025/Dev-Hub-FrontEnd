import { useSelector } from 'react-redux';

export function useDarkMode() {
  const { isDarkMode } = useSelector((state) => state.darkMode);
  return { isDarkMode };
}