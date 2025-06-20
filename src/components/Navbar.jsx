// // import { useState, useRef, useEffect } from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
// // import { logout } from '../store/slices/authSlice';
// // import { toggleDarkMode } from '../store/slices/darkModeSlice';
// // import { useDarkMode } from '../features/darkMode/useDarkMode';
// // import { toast } from 'react-toastify';
// // import {
// //   Menu,
// //   X,
// //   Sun,
// //   Moon,
// //   User,
// //   LogOut,
// //   ShoppingCart,
// //   ChevronDown,
// //   Settings,
// //   BookOpen,
// //   Users,
// //   Shield,
// //   GraduationCap,
// //   BrainCircuit,
// // } from 'lucide-react';

// // // Enhanced UserInfo component
// // const UserInfo = () => {
// //   const { user } = useSelector((state) => state.auth);

// //   if (!user) return null;

// //   return (
// //     <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200 dark:border-blue-700">
// //       <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
// //         {user.name?.charAt(0).toUpperCase() || 'U'}
// //       </div>
// //       <div className="hidden md:block">
// //         <div className="text-sm font-semibold text-gray-900 dark:text-white">
// //           {user.name}
// //         </div>
// //         <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
// //           {user.role || 'Student'}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Dropdown Menu Component
// // const DropdownMenu = ({ isOpen, onClose, children, className = '' }) => {
// //   const dropdownRef = useRef(null);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         onClose();
// //       }
// //     };

// //     if (isOpen) {
// //       document.addEventListener('mousedown', handleClickOutside);
// //     }

// //     return () => {
// //       document.removeEventListener('mousedown', handleClickOutside);
// //     };
// //   }, [isOpen, onClose]);

// //   if (!isOpen) return null;

// //   return (
// //     <div
// //       ref={dropdownRef}
// //       className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 ${className}`}
// //     >
// //       {children}
// //     </div>
// //   );
// // };

// // const NavBar = () => {
// //   const { isDarkMode } = useDarkMode();
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { user, isAuthenticated } = useSelector((state) => state.auth);
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

// //   const handleLogout = () => {
// //     dispatch(logout());
// //     toast.success('Logged out successfully');
// //     navigate('/login');
// //     setIsUserMenuOpen(false);
// //   };

// //   const toggleMenu = () => {
// //     setIsMenuOpen(!isMenuOpen);
// //   };

// //   const toggleUserMenu = () => {
// //     setIsUserMenuOpen(!isUserMenuOpen);
// //   };

// //   // Navigation items configuration
// //   const publicNavItems = [
// //     { to: '/courses', label: 'Courses', icon: BookOpen },
// //     { to: '/categories', label: 'Quiz', icon: GraduationCap },
// //     { to: '/tests', label: 'Quizzes', icon: BrainCircuit },
// //     { to: '/community', label: 'Community', icon: Users },
// //     { to: '/cart', label: 'cart', icon: ShoppingCart },
// //   ];

// //   const authenticatedNavItems = [
// //     { to: '/courses', label: 'Courses', icon: BookOpen },
// //     { to: '/categories', label: 'Quiz', icon: GraduationCap },
// //     { to: '/tests', label: 'Quizzes', icon: BrainCircuit },
// //     { to: '/community', label: 'Community', icon: Users },
// //     { to: '/cart', label: 'cart', icon: ShoppingCart },
// //     { to: `/tests/grades/${user?._id}`, label: 'student grades', icon: Users },
// //   ];

// //   const userMenuItems = [
// //     { to: '/profile', label: 'Profile', icon: User },
// //     { to: '/settings', label: 'Settings', icon: Settings },
// //     { to: '/cart', label: 'Cart', icon: ShoppingCart },
// //   ];

// //   // Common nav link classes
// //   const getNavLinkClass = (isActive) => `
// //     px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2
// //     ${
// //       isActive
// //         ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
// //         : isDarkMode
// //           ? 'text-gray-300 hover:text-white hover:bg-gray-700'
// //           : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
// //     }
// //   `;

// //   const getMobileNavLinkClass = (isActive) => `
// //     block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 flex items-center space-x-3
// //     ${
// //       isActive
// //         ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
// //         : isDarkMode
// //           ? 'text-gray-300 hover:text-white hover:bg-gray-700'
// //           : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
// //     }
// //   `;

// //   return (
// //     <nav
// //       className={`sticky top-0 z-50 backdrop-blur-md border-b ${
// //         isDarkMode
// //           ? 'bg-gray-900/95 border-gray-700'
// //           : 'bg-white/95 border-gray-200'
// //       } shadow-lg`}
// //     >
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex justify-between h-16 items-center">
// //           {/* Logo */}
// //           <div className="flex items-center">
// //             <Link
// //               to="/"
// //               className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
// //             >
// //               <GraduationCap className="w-8 h-8 text-blue-500" />
// //               <span>EduVerse</span>
// //             </Link>
// //           </div>

// //           {/* Desktop Navigation */}
// //           <div className="hidden lg:flex items-center space-x-1">
// //             {(isAuthenticated ? authenticatedNavItems : publicNavItems).map(
// //               (item) => {
// //                 const Icon = item.icon;
// //                 return (
// //                   <NavLink
// //                     key={item.to}
// //                     to={item.to}
// //                     className={({ isActive }) => getNavLinkClass(isActive)}
// //                   >
// //                     <Icon size={16} />
// //                     <span>{item.label}</span>
// //                   </NavLink>
// //                 );
// //               }
// //             )}

// //             {/* Course Categories - only for authenticated users */}
// //             {isAuthenticated && (
// //               <NavLink
// //                 to="/course-categories"
// //                 className={({ isActive }) => getNavLinkClass(isActive)}
// //               >
// //                 <BookOpen size={16} />
// //                 <span>Course Categories</span>
// //               </NavLink>
// //             )}
// //           </div>

// //           {/* Right side items */}
// //           <div className="flex items-center space-x-3">
// //             {/* Dark mode toggle */}
// //             <button
// //               onClick={() => dispatch(toggleDarkMode())}
// //               className={`p-2 rounded-lg transition-all duration-200 ${
// //                 isDarkMode
// //                   ? 'hover:bg-gray-700 text-yellow-400'
// //                   : 'hover:bg-gray-100 text-gray-600'
// //               }`}
// //             >
// //               {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
// //             </button>

// //             {!isAuthenticated ? (
// //               /* Authentication buttons */
// //               <div className="hidden md:flex items-center space-x-2">
// //                 <NavLink
// //                   to="/login"
// //                   className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
// //                 >
// //                   Login
// //                 </NavLink>
// //                 <NavLink
// //                   to="/signup"
// //                   className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200"
// //                 >
// //                   Sign Up
// //                 </NavLink>
// //               </div>
// //             ) : (
// //               /* User menu */
// //               <div className="hidden md:flex items-center space-x-3">
// //                 <UserInfo />

// //                 {/* Admin badge */}
// //                 {user?.role === 'admin' && (
// //                   <NavLink
// //                     to="/admin"
// //                     className="flex items-center space-x-1 px-3 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200"
// //                   >
// //                     <Shield size={16} />
// //                     <span>Admin</span>
// //                   </NavLink>
// //                 )}

// //                 {/* User dropdown */}
// //                 <div className="relative">
// //                   <button
// //                     onClick={toggleUserMenu}
// //                     className={`p-2 rounded-lg transition-all duration-200 ${
// //                       isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
// //                     }`}
// //                   >
// //                     <ChevronDown
// //                       size={20}
// //                       className={`transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}
// //                     />
// //                   </button>

// //                   <DropdownMenu
// //                     isOpen={isUserMenuOpen}
// //                     onClose={() => setIsUserMenuOpen(false)}
// //                   >
// //                     {userMenuItems.map((item) => {
// //                       const Icon = item.icon;
// //                       return (
// //                         <NavLink
// //                           key={item.to}
// //                           to={item.to}
// //                           onClick={() => setIsUserMenuOpen(false)}
// //                           className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
// //                         >
// //                           <Icon size={16} />
// //                           <span>{item.label}</span>
// //                         </NavLink>
// //                       );
// //                     })}
// //                     <hr className="my-1 border-gray-200 dark:border-gray-600" />
// //                     <button
// //                       onClick={handleLogout}
// //                       className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 w-full"
// //                     >
// //                       <LogOut size={16} />
// //                       <span>Logout</span>
// //                     </button>
// //                   </DropdownMenu>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Mobile menu button */}
// //             <button
// //               onClick={toggleMenu}
// //               className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
// //             >
// //               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Mobile Navigation Menu */}
// //       {isMenuOpen && (
// //         <div className="lg:hidden">
// //           <div
// //             className={`px-4 pt-2 pb-4 space-y-2 ${
// //               isDarkMode
// //                 ? 'bg-gray-900 border-t border-gray-700'
// //                 : 'bg-white border-t border-gray-200'
// //             }`}
// //           >
// //             {/* Mobile nav items */}
// //             {(isAuthenticated ? authenticatedNavItems : publicNavItems).map(
// //               (item) => {
// //                 const Icon = item.icon;
// //                 return (
// //                   <NavLink
// //                     key={item.to}
// //                     to={item.to}
// //                     className={({ isActive }) =>
// //                       getMobileNavLinkClass(isActive)
// //                     }
// //                     onClick={toggleMenu}
// //                   >
// //                     <Icon size={20} />
// //                     <span>{item.label}</span>
// //                   </NavLink>
// //                 );
// //               }
// //             )}

// //             {isAuthenticated ? (
// //               <>
// //                 {/* Course Categories */}
// //                 <NavLink
// //                   to="/course-categories"
// //                   className={({ isActive }) => getMobileNavLinkClass(isActive)}
// //                   onClick={toggleMenu}
// //                 >
// //                   <BookOpen size={20} />
// //                   <span>Course Categories</span>
// //                 </NavLink>

// //                 {/* User menu items */}
// //                 {userMenuItems.map((item) => {
// //                   const Icon = item.icon;
// //                   return (
// //                     <NavLink
// //                       key={item.to}
// //                       to={item.to}
// //                       className={({ isActive }) =>
// //                         getMobileNavLinkClass(isActive)
// //                       }
// //                       onClick={toggleMenu}
// //                     >
// //                       <Icon size={20} />
// //                       <span>{item.label}</span>
// //                     </NavLink>
// //                   );
// //                 })}

// //                 {/* Admin link */}
// //                 {user?.role === 'admin' && (
// //                   <NavLink
// //                     to="/admin"
// //                     className={({ isActive }) =>
// //                       getMobileNavLinkClass(isActive)
// //                     }
// //                     onClick={toggleMenu}
// //                   >
// //                     <Shield size={20} />
// //                     <span>Admin</span>
// //                   </NavLink>
// //                 )}

// //                 {/* Mobile user info */}
// //                 <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 mt-2">
// //                   <UserInfo />
// //                 </div>

// //                 {/* Logout button */}
// //                 <button
// //                   onClick={() => {
// //                     handleLogout();
// //                     toggleMenu();
// //                   }}
// //                   className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
// //                 >
// //                   <LogOut size={20} />
// //                   <span>Logout</span>
// //                 </button>
// //               </>
// //             ) : (
// //               /* Mobile auth buttons */
// //               <>
// //                 <NavLink
// //                   to="/login"
// //                   className={({ isActive }) => getMobileNavLinkClass(isActive)}
// //                   onClick={toggleMenu}
// //                 >
// //                   <User size={20} />
// //                   <span>Login</span>
// //                 </NavLink>
// //                 <NavLink
// //                   to="/signup"
// //                   className="block px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-base font-medium rounded-lg text-center"
// //                   onClick={toggleMenu}
// //                 >
// //                   Sign Up
// //                 </NavLink>
// //               </>
// //             )}

// //             {/* Mobile dark mode toggle */}
// //             <button
// //               onClick={() => {
// //                 dispatch(toggleDarkMode());
// //                 toggleMenu();
// //               }}
// //               className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
// //             >
// //               {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
// //               <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </nav>
// //   );
// // };

// // export default NavBar;

// import { useState, useRef, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { logout } from '../store/slices/authSlice';
// import { toggleDarkMode } from '../store/slices/darkModeSlice';
// import { useDarkMode } from '../features/darkMode/useDarkMode';
// import { toast } from 'react-toastify';
// import {
//   Menu,
//   X,
//   Sun,
//   Moon,
//   User,
//   LogOut,
//   ShoppingCart,
//   ChevronDown,
//   Settings,
//   BookOpen,
//   Users,
//   Shield,
//   GraduationCap,
//   BrainCircuit,
//   Sparkles,
// } from 'lucide-react';

// // Enhanced UserInfo component with clear dark mode styling
// const UserInfo = () => {
//   const { user } = useSelector((state) => state.auth);

//   if (!user) return null;

//   return (
//     <div className="flex items-center space-x-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20 border border-emerald-200/40 dark:border-emerald-400/30 backdrop-blur-sm hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
//       <div className="relative">
//         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 via-cyan-400 to-violet-500 flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white/30">
//           {user.name?.charAt(0).toUpperCase() || 'U'}
//         </div>
//         <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
//       </div>
//       <div className="hidden md:block">
//         <div className="text-sm font-semibold text-gray-900 dark:text-white">
//           {user.name}
//         </div>
//         <div className="text-xs text-emerald-600 dark:text-emerald-400 capitalize font-medium">
//           {user.role || 'Student'}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Enhanced Dropdown Menu with proper positioning and styling
// const DropdownMenu = ({ isOpen, onClose, children, className = '' }) => {
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <div
//       ref={dropdownRef}
//       className={`absolute right-0 mt-3 w-56 bg-white dark:bg-gray-900 backdrop-blur-xl rounded-2xl shadow-2xl shadow-gray-900/20 dark:shadow-black/40 border border-gray-200 dark:border-gray-700 py-2 z-50 transform transition-all duration-300 ease-out animate-slideIn ${className}`}
//     >
//       <style>{`
//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translateY(-10px) scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }
//         .animate-slideIn {
//           animation: slideIn 0.3s ease-out;
//         }
//       `}</style>
//       {children}
//     </div>
//   );
// };

// const NavBar = () => {
//   const { isDarkMode } = useDarkMode();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   // Handle scroll to hide/show navbar
//   useEffect(() => {
//     let lastScrollY = window.scrollY;

//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY > lastScrollY && currentScrollY > 100) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }

//       lastScrollY = currentScrollY;
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleLogout = () => {
//     dispatch(logout());
//     toast.success('Logged out successfully');
//     navigate('/login');
//     setIsUserMenuOpen(false);
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const toggleUserMenu = () => {
//     setIsUserMenuOpen(!isUserMenuOpen);
//   };

//   // Navigation items configuration
//   const publicNavItems = [
//     { to: '/courses', label: 'Courses', icon: BookOpen },
//     { to: '/categories', label: 'Quiz', icon: GraduationCap },
//     { to: '/tests', label: 'Quizzes', icon: BrainCircuit },
//     { to: '/community', label: 'Community', icon: Users },
//     { to: '/cart', label: 'Cart', icon: ShoppingCart },
//   ];

//   const authenticatedNavItems = [
//     { to: '/courses', label: 'Courses', icon: BookOpen },
//     { to: '/categories', label: 'Quiz', icon: GraduationCap },
//     { to: '/tests', label: 'Quizzes', icon: BrainCircuit },
//     { to: '/community', label: 'Community', icon: Users },
//     { to: '/cart', label: 'Cart', icon: ShoppingCart },
//     ...(user?._id
//       ? [{ to: `/tests/grades/${user._id}`, label: 'Grades', icon: Users }]
//       : []),
//   ];

//   const userMenuItems = [
//     { to: '/profile', label: 'Profile', icon: User },
//     { to: '/settings', label: 'Settings', icon: Settings },
//     { to: '/cart', label: 'Cart', icon: ShoppingCart },
//   ];

//   // Enhanced nav link classes with clear colors
//   const getNavLinkClass = ({ isActive }) => `
//     relative px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 group overflow-hidden cursor-pointer
//     ${
//       isActive
//         ? 'bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 text-white shadow-lg shadow-emerald-500/25 scale-105'
//         : 'text-gray-700 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-lg hover:scale-105'
//     }
//   `;

//   const getMobileNavLinkClass = ({ isActive }) => `
//     block px-6 py-4 rounded-2xl text-base font-medium transition-all duration-300 flex items-center space-x-4 group relative overflow-hidden cursor-pointer
//     ${
//       isActive
//         ? 'bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 text-white shadow-lg shadow-emerald-500/25'
//         : 'text-gray-700 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-lg'
//     }
//   `;

//   return (
//     <div className={isDarkMode ? 'dark' : ''}>
//       {/* Floating navbar with scroll behavior */}
//       <nav
//         className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-300 ${
//           isScrolled
//             ? '-translate-y-28 opacity-0 pointer-events-none'
//             : 'translate-y-0 opacity-100'
//         }`}
//       >
//         <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-2xl shadow-gray-900/10 dark:shadow-black/20">
//           <div className="px-6 lg:px-8">
//             <div className="flex justify-between h-20 items-center">
//               {/* Enhanced Logo */}
//               <div className="flex items-center">
//                 <Link
//                   to="/"
//                   className="flex items-center space-x-3 group hover:scale-105 transition-all duration-300 cursor-pointer"
//                 >
//                   <div className="relative">
//                     <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-violet-500 flex items-center justify-center shadow-lg ring-4 ring-white/20 dark:ring-gray-800/20 group-hover:shadow-xl group-hover:shadow-emerald-500/20 transition-all duration-300">
//                       <Sparkles className="w-6 h-6 text-white" />
//                     </div>
//                     <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-violet-400 to-pink-400 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center animate-pulse">
//                       <GraduationCap className="w-3 h-3 text-white" />
//                     </div>
//                   </div>
//                   <div className="hidden sm:block">
//                     <span className="text-2xl font-bold bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
//                       Dev-Hub
//                     </span>
//                     <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
//                       Learn • Grow • Excel
//                     </div>
//                   </div>
//                 </Link>
//               </div>

//               {/* Desktop Navigation */}
//               <div className="hidden lg:flex items-center space-x-2">
//                 {(isAuthenticated ? authenticatedNavItems : publicNavItems).map(
//                   (item) => {
//                     const Icon = item.icon;
//                     return (
//                       <NavLink
//                         key={item.to}
//                         to={item.to}
//                         className={getNavLinkClass}
//                       >
//                         <Icon
//                           size={18}
//                           className="group-hover:rotate-12 transition-transform duration-300"
//                         />
//                         <span>{item.label}</span>
//                       </NavLink>
//                     );
//                   }
//                 )}

//                 {/* Course Categories - only for authenticated users */}
//                 {isAuthenticated && (
//                   <NavLink to="/course-categories" className={getNavLinkClass}>
//                     <BookOpen
//                       size={18}
//                       className="group-hover:rotate-12 transition-transform duration-300"
//                     />
//                     <span>Categories</span>
//                   </NavLink>
//                 )}
//               </div>

//               {/* Right side actions */}
//               <div className="flex items-center space-x-4">
//                 {!isAuthenticated ? (
//                   /* Enhanced Authentication buttons */
//                   <div className="hidden md:flex items-center space-x-3">
//                     <NavLink
//                       to="/login"
//                       className="px-6 py-2.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:scale-105"
//                     >
//                       Login
//                     </NavLink>
//                     <NavLink
//                       to="/signup"
//                       className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 text-white text-sm font-medium rounded-2xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
//                     >
//                       <span className="relative z-10">Sign Up</span>
//                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
//                     </NavLink>
//                   </div>
//                 ) : (
//                   /* Enhanced User menu */
//                   <div className="hidden md:flex items-center space-x-4">
//                     <UserInfo />

//                     {/* Enhanced Admin badge */}
//                     {user?.role === 'admin' && (
//                       <NavLink
//                         to="/admin"
//                         className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 text-white text-sm font-medium rounded-2xl hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
//                       >
//                         <Shield
//                           size={16}
//                           className="group-hover:rotate-12 transition-transform duration-300"
//                         />
//                         <span>Admin</span>
//                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
//                       </NavLink>
//                     )}

//                     {/* Enhanced User dropdown */}
//                     <div className="relative">
//                       <button
//                         onClick={toggleUserMenu}
//                         className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-lg ${
//                           isUserMenuOpen ? 'bg-gray-100 dark:bg-gray-800' : ''
//                         }`}
//                       >
//                         <ChevronDown
//                           size={20}
//                           className={`transition-all duration-300 ${
//                             isUserMenuOpen
//                               ? 'rotate-180 text-emerald-500'
//                               : 'text-gray-700 dark:text-white'
//                           }`}
//                         />
//                       </button>

//                       <DropdownMenu
//                         isOpen={isUserMenuOpen}
//                         onClose={() => setIsUserMenuOpen(false)}
//                       >
//                         {userMenuItems.map((item) => {
//                           const Icon = item.icon;
//                           return (
//                             <NavLink
//                               key={item.to}
//                               to={item.to}
//                               onClick={() => setIsUserMenuOpen(false)}
//                               className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-white hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200 rounded-xl mx-2 group w-full text-left"
//                             >
//                               <Icon
//                                 size={16}
//                                 className="group-hover:scale-110 transition-transform duration-200"
//                               />
//                               <span>{item.label}</span>
//                             </NavLink>
//                           );
//                         })}
//                         <hr className="my-2 border-gray-200 dark:border-gray-600 mx-2" />
//                         <button
//                           onClick={handleLogout}
//                           className="flex items-center space-x-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200 w-full rounded-xl mx-2 group text-left"
//                         >
//                           <LogOut
//                             size={16}
//                             className="group-hover:scale-110 transition-transform duration-200"
//                           />
//                           <span>Logout</span>
//                         </button>
//                       </DropdownMenu>
//                     </div>
//                   </div>
//                 )}

//                 {/* Enhanced Mobile menu button */}
//                 <button
//                   onClick={toggleMenu}
//                   className="lg:hidden p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 hover:shadow-lg"
//                 >
//                   <div className="relative w-6 h-6">
//                     <span
//                       className={`absolute h-0.5 w-6 bg-gray-700 dark:bg-white transform transition-all duration-300 ${
//                         isMenuOpen ? 'rotate-45 top-3' : 'top-1'
//                       }`}
//                     ></span>
//                     <span
//                       className={`absolute h-0.5 w-6 bg-gray-700 dark:bg-white transform transition-all duration-300 top-3 ${
//                         isMenuOpen ? 'opacity-0' : 'opacity-100'
//                       }`}
//                     ></span>
//                     <span
//                       className={`absolute h-0.5 w-6 bg-gray-700 dark:bg-white transform transition-all duration-300 ${
//                         isMenuOpen ? '-rotate-45 top-3' : 'top-5'
//                       }`}
//                     ></span>
//                   </div>
//                 </button>

//                 {/* Enhanced Dark mode toggle */}
//                 <button
//                   onClick={() => dispatch(toggleDarkMode())}
//                   className={`relative p-3 rounded-2xl transition-all duration-300 overflow-hidden group hover:scale-110 ${
//                     isDarkMode
//                       ? 'bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-400 hover:shadow-lg hover:shadow-yellow-400/20'
//                       : 'bg-slate-600/20 hover:bg-slate-600/30 text-slate-600 hover:shadow-lg hover:shadow-slate-600/20'
//                   }`}
//                 >
//                   <div className="relative z-10">
//                     {isDarkMode ? (
//                       <Sun
//                         size={20}
//                         className="group-hover:rotate-180 transition-transform duration-500"
//                       />
//                     ) : (
//                       <Moon
//                         size={20}
//                         className="group-hover:-rotate-12 transition-transform duration-300"
//                       />
//                     )}
//                   </div>
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Enhanced Mobile Navigation Menu */}
//           {isMenuOpen && (
//             <div className="lg:hidden border-t border-gray-200 dark:border-gray-700">
//               <div className="px-6 pt-4 pb-6 space-y-3">
//                 {/* Mobile nav items */}
//                 {(isAuthenticated ? authenticatedNavItems : publicNavItems).map(
//                   (item) => {
//                     const Icon = item.icon;
//                     return (
//                       <NavLink
//                         key={item.to}
//                         to={item.to}
//                         className={getMobileNavLinkClass}
//                         onClick={toggleMenu}
//                       >
//                         <Icon
//                           size={22}
//                           className="group-hover:rotate-12 transition-transform duration-300"
//                         />
//                         <span>{item.label}</span>
//                       </NavLink>
//                     );
//                   }
//                 )}

//                 {isAuthenticated ? (
//                   <>
//                     {/* Course Categories */}
//                     <NavLink
//                       to="/course-categories"
//                       className={getMobileNavLinkClass}
//                       onClick={toggleMenu}
//                     >
//                       <BookOpen
//                         size={22}
//                         className="group-hover:rotate-12 transition-transform duration-300"
//                       />
//                       <span>Course Categories</span>
//                     </NavLink>

//                     {/* User menu items */}
//                     {userMenuItems.map((item) => {
//                       const Icon = item.icon;
//                       return (
//                         <NavLink
//                           key={item.to}
//                           to={item.to}
//                           className={getMobileNavLinkClass}
//                           onClick={toggleMenu}
//                         >
//                           <Icon
//                             size={22}
//                             className="group-hover:rotate-12 transition-transform duration-300"
//                           />
//                           <span>{item.label}</span>
//                         </NavLink>
//                       );
//                     })}

//                     {/* Admin link */}
//                     {user?.role === 'admin' && (
//                       <NavLink
//                         to="/admin"
//                         className={getMobileNavLinkClass}
//                         onClick={toggleMenu}
//                       >
//                         <Shield
//                           size={22}
//                           className="group-hover:rotate-12 transition-transform duration-300"
//                         />
//                         <span>Admin</span>
//                       </NavLink>
//                     )}

//                     {/* Mobile user info */}
//                     <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 mt-4">
//                       <UserInfo />
//                     </div>

//                     {/* Enhanced Logout button */}
//                     <button
//                       onClick={() => {
//                         handleLogout();
//                         toggleMenu();
//                       }}
//                       className="w-full flex items-center space-x-4 px-6 py-4 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-2xl transition-all duration-300 group hover:shadow-lg"
//                     >
//                       <LogOut
//                         size={22}
//                         className="group-hover:rotate-12 transition-transform duration-300"
//                       />
//                       <span>Logout</span>
//                     </button>
//                   </>
//                 ) : (
//                   /* Enhanced Mobile auth buttons */
//                   <>
//                     <NavLink
//                       to="/login"
//                       className={getMobileNavLinkClass}
//                       onClick={toggleMenu}
//                     >
//                       <User
//                         size={22}
//                         className="group-hover:rotate-12 transition-transform duration-300"
//                       />
//                       <span>Login</span>
//                     </NavLink>
//                     <NavLink
//                       to="/signup"
//                       className="block px-6 py-4 bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 text-white text-base font-medium rounded-2xl text-center hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 relative overflow-hidden group w-full"
//                       onClick={toggleMenu}
//                     >
//                       <span className="relative z-10">Sign Up</span>
//                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
//                     </NavLink>
//                   </>
//                 )}

//                 {/* Enhanced Mobile dark mode toggle */}
//                 <button
//                   onClick={() => {
//                     dispatch(toggleDarkMode());
//                     toggleMenu();
//                   }}
//                   className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group hover:shadow-lg ${
//                     isDarkMode
//                       ? 'text-yellow-400 hover:bg-yellow-400/20'
//                       : 'text-slate-600 hover:bg-slate-600/20'
//                   }`}
//                 >
//                   {isDarkMode ? (
//                     <Sun
//                       size={22}
//                       className="group-hover:rotate-180 transition-transform duration-500"
//                     />
//                   ) : (
//                     <Moon
//                       size={22}
//                       className="group-hover:-rotate-12 transition-transform duration-300"
//                     />
//                   )}
//                   <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Spacer to prevent content from going under the floating navbar */}
//       <div className="h-28"></div>
//     </div>
//   );
// };

// export default NavBar;

import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout, logoutUserThunk } from '../store/slices/authSlice';
import { toggleDarkMode } from '../store/slices/darkModeSlice';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import { toast } from 'react-toastify';
import {
  Menu,
  X,
  Sun,
  Moon,
  User,
  LogOut,
  ShoppingCart,
  ChevronDown,
  Settings,
  BookOpen,
  Users,
  Shield,
  GraduationCap,
  BrainCircuit,
  Sparkles,
} from 'lucide-react';
import { logoutUser } from '../api/api';

// Enhanced UserInfo component with clear dark mode styling
const UserInfo = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return null;

  return (
    <div className="flex items-center space-x-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20 border border-emerald-200/40 dark:border-emerald-400/30 backdrop-blur-sm hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 via-green-500 to-violet-500 flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white/30">
          {user.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
      </div>
      <div className="hidden md:block">
        <div className="text-sm font-semibold text-gray-900 dark:text-white">
          {user.name}
        </div>
        <div className="text-xs text-emerald-600 dark:text-emerald-400 capitalize font-medium">
          {user.role || 'Student'}
        </div>
      </div>
    </div>
  );
};

// Enhanced Dropdown Menu with proper positioning and styling
const DropdownMenu = ({ isOpen, onClose, children, className = '' }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute right-0 mt-3 w-56 bg-white dark:bg-gray-900 backdrop-blur-xl rounded-2xl shadow-2xl shadow-gray-900/20 dark:shadow-black/40 border border-gray-200 dark:border-gray-700 py-2 z-50 transform transition-all duration-300 ease-out animate-slideIn ${className}`}
    >
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
      {children}
    </div>
  );
};

const NavBar = () => {
  const { isDarkMode } = useDarkMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);

  // Handle scroll to hide/show navbar
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle outside click to close off-canvas menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // const handleLogout = async () => {
  //   try {
  //     await logoutUser(); // Backend clears cookies
  //     dispatch(logout()); // Clear Redux state
  //     toast.success('Logged out successfully');
  //     navigate('/login');
  //   } catch (error) {
  //     console.error('Logout failed:', error);
  //     toast.error('Logout failed. Please try again.');
  //   } finally {
  //     // Always close menus
  //     setIsUserMenuOpen(false);
  //     setIsMenuOpen(false);
  //   }
  // };
  const handleLogout = async () => {
    try {
      await dispatch(logoutUserThunk()).unwrap(); // performs backend + redux cleanup
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsUserMenuOpen(false);
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Navigation items configuration
  const publicNavItems = [
    { to: '/courses', label: 'Courses', icon: BookOpen },
    { to: '/categories', label: 'Learn-Category', icon: GraduationCap },
    { to: '/tests', label: 'Quizzes', icon: BrainCircuit },
    { to: '/community', label: 'Community', icon: Users },
    { to: '/cart', label: 'Cart', icon: ShoppingCart },
  ];

  const authenticatedNavItems = [
    { to: '/courses', label: 'Courses', icon: BookOpen },
    { to: '/categories', label: 'Learn-Category', icon: GraduationCap },
    { to: '/tests', label: 'Quizzes', icon: BrainCircuit },
    { to: '/community', label: 'Community', icon: Users },
    { to: '/cart', label: 'Cart', icon: ShoppingCart },
    ...(user?._id
      ? [{ to: `/tests/grades/${user._id}`, label: 'Grades', icon: Users }]
      : []),
  ];

  const userMenuItems = [
    { to: '/profile', label: 'Profile', icon: User },
    { to: '/settings', label: 'Settings', icon: Settings },
    { to: '/cart', label: 'Cart', icon: ShoppingCart },
  ];

  // Enhanced nav link classes with clear colors
  const getNavLinkClass = ({ isActive }) => `
    relative px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 group overflow-hidden cursor-pointer
    ${
      isActive
        ? 'bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 text-white shadow-lg shadow-emerald-500/25 scale-105'
        : 'text-gray-700 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-lg hover:scale-105'
    }
  `;

  const getMobileNavLinkClass = ({ isActive }) => `
    w-full px-6 py-4 rounded-2xl text-base font-medium transition-all duration-300 flex items-center space-x-4 group relative overflow-hidden cursor-pointer
    ${
      isActive
        ? 'bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 text-white shadow-lg shadow-emerald-500/25'
        : 'text-gray-700 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white/10 dark:hover:bg-gray-800/50 hover:shadow-lg'
    }
  `;

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      {/* Floating navbar with scroll behavior */}
      <nav
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-300 ${
          isScrolled
            ? '-translate-y-28 opacity-0 pointer-events-none'
            : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-2xl shadow-gray-900/10 dark:shadow-black/20">
          <div className="px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              {/* Enhanced Logo */}
              <div className="flex items-center">
                <Link
                  to="/"
                  className="flex items-center space-x-3 group hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-violet-500 flex items-center justify-center shadow-lg ring-4 ring-white/20 dark:ring-gray-800/20 group-hover:shadow-xl group-hover:shadow-emerald-500/20 transition-all duration-300">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-violet-400 to-pink-400 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center animate-pulse">
                      <GraduationCap className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    {/* <span className="text-2xl hidden sm:block   font-bold bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
                      Dev-Hub
                    </span> */}
                    {/* <div className="text-xs hidden text-gray-500 lg-block dark:text-gray-400 font-medium">
                      Learn • Grow • Excel
                    </div> */}
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-2">
                {(isAuthenticated ? authenticatedNavItems : publicNavItems).map(
                  (item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={getNavLinkClass}
                      >
                        <Icon
                          size={18}
                          className="group-hover:rotate-12 transition-transform duration-300"
                        />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  }
                )}

                {/* Course Categories - only for authenticated users */}
                {isAuthenticated && (
                  <NavLink to="/course-categories" className={getNavLinkClass}>
                    <BookOpen
                      size={18}
                      className="group-hover:rotate-12 transition-transform duration-300"
                    />
                    <span>Categories</span>
                  </NavLink>
                )}
              </div>

              {/* Right side actions */}
              <div className="flex items-center space-x-4">
                {!isAuthenticated ? (
                  /* Enhanced Authentication buttons */
                  <div className="hidden md:flex items-center space-x-3">
                    <NavLink
                      to="/login"
                      className="px-6 py-2.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:scale-105"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/signup"
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 text-white text-sm font-medium rounded-2xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                    >
                      <span className="relative z-10">Sign Up</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </NavLink>
                  </div>
                ) : (
                  /* Enhanced User menu */
                  <div className="hidden md:flex items-center space-x-4">
                    <UserInfo />

                    {/* Enhanced Admin badge */}
                    {user?.role === 'admin' && (
                      <NavLink
                        to="/admin"
                        className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 text-white text-sm font-medium rounded-2xl hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                      >
                        <Shield
                          size={16}
                          className="group-hover:rotate-12 transition-transform duration-300"
                        />
                        <span>Admin</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      </NavLink>
                    )}

                    {/* Enhanced User dropdown */}
                    <div className="relative">
                      <button
                        onClick={toggleUserMenu}
                        className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-lg ${
                          isUserMenuOpen ? 'bg-gray-100 dark:bg-gray-800' : ''
                        }`}
                      >
                        <ChevronDown
                          size={20}
                          className={`transition-all duration-300 ${
                            isUserMenuOpen
                              ? 'rotate-180 text-emerald-500'
                              : 'text-gray-700 dark:text-white'
                          }`}
                        />
                      </button>

                      <DropdownMenu
                        isOpen={isUserMenuOpen}
                        onClose={() => setIsUserMenuOpen(false)}
                      >
                        {userMenuItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <NavLink
                              key={item.to}
                              to={item.to}
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-white hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200 rounded-xl mx-2 group w-full text-left"
                            >
                              <Icon
                                size={16}
                                className="group-hover:scale-110 transition-transform duration-200"
                              />
                              <span>{item.label}</span>
                            </NavLink>
                          );
                        })}
                        <hr className="my-2 border-gray-200 dark:border-gray-600 mx-2" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200 w-full rounded-xl mx-2 group text-left"
                        >
                          <LogOut
                            size={16}
                            className="group-hover:scale-110 transition-transform duration-200"
                          />
                          <span>Logout</span>
                        </button>
                      </DropdownMenu>
                    </div>
                  </div>
                )}

                {/* Enhanced Mobile menu button */}
                <button
                  onClick={toggleMenu}
                  className="lg:hidden p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <Menu
                    size={24}
                    className="text-gray-700 dark:text-white transition-all duration-300"
                  />
                </button>

                {/* Enhanced Dark mode toggle */}
                <button
                  onClick={() => dispatch(toggleDarkMode())}
                  className={`relative p-3 rounded-2xl transition-all duration-300 overflow-hidden group hover:scale-110 ${
                    isDarkMode
                      ? 'bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-400 hover:shadow-lg hover:shadow-yellow-400/20'
                      : 'bg-slate-600/20 hover:bg-slate-600/30 text-slate-600 hover:shadow-lg hover:shadow-slate-600/20'
                  }`}
                >
                  <div className="relative z-10">
                    {isDarkMode ? (
                      <Sun
                        size={20}
                        className="group-hover:rotate-180 transition-transform duration-500"
                      />
                    ) : (
                      <Moon
                        size={20}
                        className="group-hover:-rotate-12 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Off-Canvas Mobile Navigation Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
          isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={toggleMenu}
        />

        {/* Menu Panel */}
        <div
          ref={menuRef}
          className={`absolute top-0 right-0 h-full w-80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-l border-gray-200/50 dark:border-gray-700/50 shadow-2xl transform transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full p-6">
            {/* Close Button */}
            <div className="flex justify-end mb-6">
              <button
                onClick={toggleMenu}
                className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-violet-500/20 hover:bg-gradient-to-r hover:from-emerald-600/30 hover:to-violet-600/30 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <X size={24} className="text-gray-700 dark:text-white" />
              </button>
            </div>

            {/* Mobile Nav Items */}
            <div className="flex flex-col space-y-3 flex-grow">
              {(isAuthenticated ? authenticatedNavItems : publicNavItems).map(
                (item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={getMobileNavLinkClass}
                      onClick={toggleMenu}
                    >
                      <Icon
                        size={22}
                        className="group-hover:rotate-12 transition-transform duration-300"
                      />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                }
              )}

              {isAuthenticated && (
                <>
                  {/* Course Categories */}
                  <NavLink
                    to="/course-categories"
                    className={getMobileNavLinkClass}
                    onClick={toggleMenu}
                  >
                    <BookOpen
                      size={22}
                      className="group-hover:rotate-12 transition-transform duration-300"
                    />
                    <span>Course Categories</span>
                  </NavLink>

                  {/* User Menu Items */}
                  {userMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={getMobileNavLinkClass}
                        onClick={toggleMenu}
                      >
                        <Icon
                          size={22}
                          className="group-hover:rotate-12 transition-transform duration-300"
                        />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}

                  {/* Admin Link */}
                  {user?.role === 'admin' && (
                    <NavLink
                      to="/admin"
                      className={getMobileNavLinkClass}
                      onClick={toggleMenu}
                    >
                      <Shield
                        size={22}
                        className="group-hover:rotate-12 transition-transform duration-300"
                      />
                      <span>Admin</span>
                    </NavLink>
                  )}

                  {/* Mobile User Info */}
                  <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                    <UserInfo />
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="w-full flex items-center space-x-4 px-6 py-4 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-2xl transition-all duration-300 group hover:shadow-lg"
                  >
                    <LogOut
                      size={22}
                      className="group-hover:rotate-12 transition-transform duration-300"
                    />
                    <span>Logout</span>
                  </button>
                </>
              )}

              {!isAuthenticated && (
                <>
                  {/* Mobile Auth Buttons */}
                  <NavLink
                    to="/login"
                    className={getMobileNavLinkClass}
                    onClick={toggleMenu}
                  >
                    <User
                      size={22}
                      className="group-hover:rotate-12 transition-transform duration-300"
                    />
                    <span>Login</span>
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 text-white text-base font-medium rounded-2xl text-center hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 relative overflow-hidden group"
                    onClick={toggleMenu}
                  >
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </NavLink>
                </>
              )}

              {/* Mobile Dark Mode Toggle */}
              <button
                onClick={() => {
                  dispatch(toggleDarkMode());
                  toggleMenu();
                }}
                className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group hover:shadow-lg ${
                  isDarkMode
                    ? 'text-yellow-400 hover:bg-yellow-400/20'
                    : 'text-slate-600 hover:bg-slate-600/20'
                }`}
              >
                {isDarkMode ? (
                  <Sun
                    size={22}
                    className="group-hover:rotate-180 transition-transform duration-500"
                  />
                ) : (
                  <Moon
                    size={22}
                    className="group-hover:-rotate-12 transition-transform duration-300"
                  />
                )}
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under the floating navbar */}
      <div className="h-28"></div>
    </div>
  );
};

export default NavBar;
