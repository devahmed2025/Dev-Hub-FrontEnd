// import { useLoaderData, Navigate, Link } from 'react-router-dom';
// import { useEffect, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUser } from '../api/api';
// import Avatar from './ui/Avatar';
// import { useDarkMode } from '../features/darkMode/useDarkMode';
// import Card from './ui/Card';
// import {
//   getPosts,
//   resetPosts,
//   clearError,
// } from '../store/slices/communitySlice';
// import LoadingSpinner from './ui/LoadingSpinner';
// import PostCard from './PostCard';
// import { getMyCourses } from '../store/slices/courseSlice';

// function Profile() {
//   const { user } = useSelector((state) => state.auth);
//   const { isDarkMode } = useDarkMode();

//   useEffect(() => {
//     document.title = user ? `${user.name} - DevsHub` : 'Profile - DevsHub';
//   }, [user]);

//   const dispatch = useDispatch();
//   const { myCourses } = useSelector((state) => state.courses);
//   const { posts, status, pagination, error } = useSelector(
//     (state) => state.community
//   );

//   useEffect(() => {
//     dispatch(getMyCourses());
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(getPosts());
//   }, [dispatch]);

//   // Filter posts to only show those created by the current user
//   const userPosts = useMemo(() => {
//     if (!user || !posts) return [];
//     return posts.filter((post) => post.user._id === user._id);
//   }, [posts, user]);

//   if (!user) return <Navigate to="/login" replace />;
//   if (status === 'loading') return <LoadingSpinner />;

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Profile Header */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-32 sm:h-40"></div>
//           <div className="relative px-6 pb-6">
//             <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 -mt-16 sm:-mt-20">
//               <div className="relative">
//                 <Avatar
//                   src={user.profilePhoto}
//                   alt={user.name}
//                   size="xl"
//                   className="ring-4 ring-white dark:ring-gray-800"
//                 />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h1 className="text-3xl font-bold text-gray-900 dark:text-white truncate">
//                   {user.name}
//                 </h1>
//                 <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
//                   {user.email}
//                 </p>
//                 {user.slug && (
//                   <p className="text-gray-700 dark:text-gray-400 mt-3 leading-relaxed">
//                     {user.slug}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
//                 <svg
//                   className="w-6 h-6 text-blue-600 dark:text-blue-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                   />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">
//                   {myCourses?.length || 0}
//                 </p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Enrolled Courses
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
//                 <svg
//                   className="w-6 h-6 text-green-600 dark:text-green-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
//                   />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">
//                   {userPosts?.length || 0}
//                 </p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Posts Created
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
//                 <svg
//                   className="w-6 h-6 text-purple-600 dark:text-purple-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13 10V3L4 14h7v7l9-11h-7z"
//                   />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">
//                   {user.joinedAt
//                     ? new Date(user.joinedAt).getFullYear()
//                     : new Date().getFullYear()}
//                 </p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Member Since
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
//           {/* Courses Section */}
//           <div className="xl:col-span-2">
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
//               <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
//                   <svg
//                     className="w-5 h-5 mr-2 text-blue-500"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                     />
//                   </svg>
//                   My Courses
//                 </h2>
//               </div>
//               <div className="p-6">
//                 {myCourses?.length === 0 ? (
//                   <div className="text-center py-12">
//                     <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
//                       <svg
//                         className="w-8 h-8 text-gray-400"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                         />
//                       </svg>
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//                       No courses yet
//                     </h3>
//                     <p className="text-gray-500 dark:text-gray-400 mb-4">
//                       Start your learning journey by enrolling in courses
//                     </p>
//                     <Link
//                       to="/courses"
//                       className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
//                     >
//                       Browse Courses
//                     </Link>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {myCourses.map((course) => (
//                       <div
//                         key={course._id}
//                         className="group bg-gray-50 dark:bg-gray-700/50 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300"
//                       >
//                         <div className="aspect-video relative overflow-hidden">
//                           <img
//                             src={course.coverPhoto || '/placeholder.png'}
//                             alt={course.title}
//                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                             onError={(e) => {
//                               e.target.src = '/placeholder.png';
//                             }}
//                           />
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
//                         </div>
//                         <div className="p-4">
//                           <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
//                             {course.title}
//                           </h4>
//                           <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
//                             {course.description ||
//                               'Continue your learning journey'}
//                           </p>
//                           <Link
//                             to={`/courses/${course._id}`}
//                             className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200"
//                           >
//                             Continue Learning
//                             <svg
//                               className="w-4 h-4 ml-1"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M9 5l7 7-7 7"
//                               />
//                             </svg>
//                           </Link>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Posts Section */}
//           <div className="xl:col-span-1">
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
//               <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
//                   <svg
//                     className="w-5 h-5 mr-2 text-green-500"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
//                     />
//                   </svg>
//                   My Posts
//                 </h2>
//               </div>
//               <div className="p-6">
//                 {userPosts?.length === 0 ? (
//                   <div className="text-center py-8">
//                     <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
//                       <svg
//                         className="w-6 h-6 text-gray-400"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
//                         />
//                       </svg>
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//                       No posts yet
//                     </h3>
//                     <p className="text-gray-500 dark:text-gray-400 text-sm">
//                       Share your thoughts with the community
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="space-y-4 max-h-96 overflow-y-auto">
//                     {userPosts.map((post) => (
//                       <PostCard
//                         key={post._id}
//                         post={post}
//                         showActions={true}
//                         compact={true}
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;

import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import {
  Mail,
  ArrowRight,
  BookOpen,
  MessageSquare,
  Calendar,
} from 'lucide-react';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import { getMyCourses } from '../store/slices/courseSlice';
import {
  getPosts,
  resetPosts,
  clearError,
} from '../store/slices/communitySlice';
import Avatar from './ui/Avatar';
import LoadingSpinner from './ui/LoadingSpinner';
import PostCard from './PostCard';

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const { isDarkMode } = useDarkMode();
  const dispatch = useDispatch();
  const { myCourses } = useSelector((state) => state.courses);
  const { posts, status, pagination, error } = useSelector(
    (state) => state.community
  );
  const [email, setEmail] = useState('');

  useEffect(() => {
    document.title = user ? `${user.name} - EduVerse` : 'Profile - EduVerse';
    dispatch(getMyCourses());
    dispatch(getPosts());
  }, [dispatch, user]);

  const userPosts = useMemo(() => {
    if (!user || !posts) return [];
    return posts.filter((post) => post.user._id === user._id);
  }, [posts, user]);

  const handleNewsletterSubmit = () => {
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail('');
    }
  };

  if (!user) return <Navigate to="/login" replace />;
  if (status === 'loading') return <LoadingSpinner />;

  return (
    <div
      className={`min-h-screen bg-gray-100 dark:bg-gray-900 py-8 transition-all duration-300 ${isDarkMode ? 'dark' : ''}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl shadow-gray-900/10 dark:shadow-black/20 mb-8 p-6 overflow-hidden">
          <div className="relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <Avatar
                  src={user.profilePhoto}
                  alt={user.name}
                  size="xl"
                  className="ring-4 ring-white/20 dark:ring-gray-800/20 rounded-full shadow-lg group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent">
                  {user.name}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                  {user.email}
                </p>
                {user.slug && (
                  <p className="text-gray-700 dark:text-gray-400 mt-3 leading-relaxed">
                    {user.slug}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-emerald-200/30 dark:border-emerald-400/20 shadow-sm p-6 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-emerald-100/50 dark:bg-emerald-900/20">
                <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {myCourses?.length || 0}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Enrolled Courses
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-emerald-200/30 dark:border-emerald-400/20 shadow-sm p-6 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-cyan-100/50 dark:bg-cyan-900/20">
                <MessageSquare className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userPosts?.length || 0}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Posts Created
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-emerald-200/30 dark:border-emerald-400/20 shadow-sm p-6 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-violet-100/50 dark:bg-violet-900/20">
                <Calendar className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.joinedAt
                    ? new Date(user.joinedAt).getFullYear()
                    : new Date().getFullYear()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Member Since
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Courses Section */}
          <div className="xl:col-span-2">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-emerald-200/30 dark:border-emerald-400/20 shadow-sm">
              <div className="px-6 py-4 border-b border-white/10 dark:border-gray-700/30">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-emerald-500" />
                  My Courses
                </h2>
              </div>
              <div className="p-6">
                {myCourses?.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-violet-500/10 rounded-full flex items-center justify-center border border-emerald-200/30 dark:border-emerald-400/20 backdrop-blur-sm">
                      <BookOpen className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No courses yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Start your learning journey by enrolling in courses
                    </p>
                    <Link
                      to="/courses"
                      className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 text-white text-sm font-medium rounded-2xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                    >
                      <span className="relative z-10">Browse Courses</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myCourses.map((course) => (
                      <div
                        key={course._id}
                        className="group bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-emerald-200/30 dark:border-emerald-400/20 overflow-hidden hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
                      >
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={course.coverPhoto || '/placeholder.png'}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => (e.target.src = '/placeholder.png')}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                        <div className="p-4">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                            {course.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {course.description ||
                              'Continue your learning journey'}
                          </p>
                          <Link
                            to={`/courses/${course._id}`}
                            className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium text-sm transition-all duration-200"
                          >
                            Continue Learning
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Posts and Form Section */}
          <div className="xl:col-span-1 space-y-8">
            {/* Posts Section */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-emerald-200/30 dark:border-emerald-400/20 shadow-sm">
              <div className="px-6 py-4 border-b border-white/10 dark:border-gray-700/30">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-cyan-500" />
                  My Posts
                </h2>
              </div>
              <div className="p-6">
                {userPosts?.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-violet-500/10 rounded-full flex items-center justify-center border border-emerald-200/30 dark:border-emerald-400/20 backdrop-blur-sm">
                      <MessageSquare className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No posts yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Share your thoughts with the community
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {userPosts.map((post) => (
                      <PostCard
                        key={post._id}
                        post={post}
                        showActions={true}
                        compact={true}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Newsletter Form */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-emerald-200/30 dark:border-emerald-400/20 shadow-sm p-6">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-violet-500" />
                Stay Updated
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Subscribe to our newsletter for course updates.
              </p>
              <div className="flex flex-col space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 border border-emerald-200/30 dark:border-emerald-400/20 rounded-2xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                />
                <button
                  onClick={handleNewsletterSubmit}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 text-white text-sm font-medium rounded-2xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                >
                  <span className="relative z-10">Subscribe</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
