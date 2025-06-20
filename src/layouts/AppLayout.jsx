import { NavLink, Outlet, useNavigation } from 'react-router-dom';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import LoadingSpinner from '../components/ui/LoadingSpinner';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  const { user } = useSelector((state) => state.auth);
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`grid h-screen grid-rows-[auto_1fr_auto] ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}
    >
      <Navbar />
      {isLoading && <LoadingSpinner />}

      <div className="overflow-scroll">
        <main
          className={`mx-auto max-w-7xl ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
        >
          {/* // main has the outlet to render the children of the parent route
 components that are defined in the routes
         */}
          <Outlet />
          {/* <h1>Content</h1> */}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
