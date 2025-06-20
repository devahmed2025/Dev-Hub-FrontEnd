// import { useLoaderData } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { useDarkMode } from '../features/darkMode/useDarkMode';
// import LoadingSpinner from './ui/LoadingSpinner';
// import { toast } from 'react-toastify';

// const CourseCategoryList = () => {
//   const { isDarkMode } = useDarkMode();
//   const { categories, status, error } = useLoaderData();

//   // Handle errors from loader
//   if (status === 'error') {
//     toast.error(error);
//     return (
//       <div
//         className={`p-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
//       >
//         <p>Error loading categories: {error}</p>
//       </div>
//     );
//   }

//   if (!categories.length) {
//     return (
//       <div
//         className={`p-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
//       >
//         <p>No categories available.</p>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
//     >
//       <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {categories.map((category) => (
//           <div
//             key={category._id}
//             className={`p-4 rounded-lg shadow-md transition-transform hover:scale-105 ${
//               isDarkMode ? 'bg-gray-800' : 'bg-white'
//             }`}
//           >
//             <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
//             <p className="text-sm mb-4 line-clamp-2">{category.description}</p>
//             <Link
//               to={`/courses`}
//               className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//             >
//               Explore
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CourseCategoryList;

// // import { useEffect, useState, useCallback } from 'react';
// // import { useParams, useNavigate, Link } from 'react-router-dom';
// // import { fetchCategory } from '../api/api';
// // import { useDarkMode } from '../features/darkMode/useDarkMode';
// // import LoadingSpinner from './ui/LoadingSpinner';
// // import { toast } from 'react-toastify';

// // const CourseCategoryDetails = () => {
// //   const { isDarkMode } = useDarkMode();
// //   const { categoryId } = useParams();
// //   const navigate = useNavigate();
// //   const [category, setCategory] = useState(null);
// //   const [status, setStatus] = useState('idle');
// //   const [error, setError] = useState(null);
// //   const [retryCount, setRetryCount] = useState(0);

// //   const loadCategory = useCallback(async () => {
// //     if (!categoryId) return;

// //     setStatus('loading');
// //     setError(null);

// //     try {
// //       const data = await fetchCategory(categoryId);
// //       setCategory(data);
// //       setStatus('succeeded');
// //       setRetryCount(0);
// //     } catch (err) {
// //       console.error('Failed to fetch category:', err);
// //       setError(err.message || 'Failed to load category');
// //       setStatus('failed');
// //     }
// //   }, [categoryId]);

// //   useEffect(() => {
// //     loadCategory();
// //   }, [loadCategory]);

// //   const handleRetry = useCallback(() => {
// //     setRetryCount((prev) => prev + 1);
// //     loadCategory();
// //   }, [loadCategory]);

// //   // Show error toast only once per error
// //   useEffect(() => {
// //     if (error && status === 'failed') {
// //       toast.error(error);
// //     }
// //   }, [error, status]);

// //   if (status === 'loading') {
// //     return (
// //       <div
// //         className={`min-h-screen flex items-center justify-center ${
// //           isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
// //         }`}
// //       >
// //         <div className="text-center">
// //           <LoadingSpinner />
// //           <p
// //             className={`mt-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
// //           >
// //             Loading category details...
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (status === 'failed') {
// //     return (
// //       <div
// //         className={`min-h-screen flex items-center justify-center p-6 ${
// //           isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
// //         }`}
// //       >
// //         <div className="text-center max-w-md mx-auto">
// //           <div
// //             className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
// //               isDarkMode
// //                 ? 'bg-red-900/20 text-red-400'
// //                 : 'bg-red-100 text-red-600'
// //             }`}
// //           >
// //             <svg
// //               className="w-10 h-10"
// //               fill="none"
// //               stroke="currentColor"
// //               viewBox="0 0 24 24"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={2}
// //                 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
// //               />
// //             </svg>
// //           </div>
// //           <h2 className="text-2xl font-bold mb-4">Failed to Load Category</h2>
// //           <p
// //             className={`text-sm mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
// //           >
// //             {error}
// //           </p>
// //           <div className="flex flex-col sm:flex-row gap-3 justify-center">
// //             <button
// //               onClick={handleRetry}
// //               disabled={status === 'loading'}
// //               className={`px-6 py-3 rounded-lg font-medium transition-colors ${
// //                 isDarkMode
// //                   ? 'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white'
// //                   : 'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white'
// //               }`}
// //             >
// //               {status === 'loading'
// //                 ? 'Retrying...'
// //                 : `Try Again ${retryCount > 0 ? `(${retryCount})` : ''}`}
// //             </button>
// //             <button
// //               onClick={() => navigate('/course-categories')}
// //               className={`px-6 py-3 rounded-lg font-medium border transition-colors ${
// //                 isDarkMode
// //                   ? 'border-gray-600 hover:bg-gray-800 text-gray-300'
// //                   : 'border-gray-300 hover:bg-gray-50 text-gray-700'
// //               }`}
// //             >
// //               Back to Categories
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!category) {
// //     return (
// //       <div
// //         className={`min-h-screen flex items-center justify-center p-6 ${
// //           isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
// //         }`}
// //       >
// //         <div className="text-center">
// //           <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
// //           <p
// //             className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
// //           >
// //             The requested category could not be found.
// //           </p>
// //           <Link
// //             to="/course-categories"
// //             className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
// //               isDarkMode
// //                 ? 'bg-blue-600 hover:bg-blue-700 text-white'
// //                 : 'bg-blue-600 hover:bg-blue-700 text-white'
// //             }`}
// //           >
// //             <svg
// //               className="w-4 h-4"
// //               fill="none"
// //               stroke="currentColor"
// //               viewBox="0 0 24 24"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={2}
// //                 d="M15 19l-7-7 7-7"
// //               />
// //             </svg>
// //             Back to Categories
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div
// //       className={`min-h-screen transition-colors duration-200 ${
// //         isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
// //       }`}
// //     >
// //       <div className="max-w-4xl mx-auto p-6">
// //         {/* Breadcrumb Navigation */}
// //         <nav className="mb-8" aria-label="Breadcrumb">
// //           <ol className="flex items-center space-x-2 text-sm">
// //             <li>
// //               <Link
// //                 to="/course-categories"
// //                 className={`hover:underline transition-colors ${
// //                   isDarkMode
// //                     ? 'text-blue-400 hover:text-blue-300'
// //                     : 'text-blue-600 hover:text-blue-800'
// //                 }`}
// //               >
// //                 Categories
// //               </Link>
// //             </li>
// //             <li className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
// //               <svg
// //                 className="w-4 h-4"
// //                 fill="none"
// //                 stroke="currentColor"
// //                 viewBox="0 0 24 24"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M9 5l7 7-7 7"
// //                 />
// //               </svg>
// //             </li>
// //             <li
// //               className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}
// //             >
// //               {category.name}
// //             </li>
// //           </ol>
// //         </nav>

// //         {/* Category Header */}
// //         <header className="mb-8">
// //           <div
// //             className={`inline-flex items-center gap-3 px-4 py-2 rounded-full mb-4 ${
// //               isDarkMode
// //                 ? 'bg-blue-900/30 text-blue-400'
// //                 : 'bg-blue-100 text-blue-700'
// //             }`}
// //           >
// //             <svg
// //               className="w-5 h-5"
// //               fill="none"
// //               stroke="currentColor"
// //               viewBox="0 0 24 24"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={2}
// //                 d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
// //               />
// //             </svg>
// //             <span className="text-sm font-medium">Category</span>
// //           </div>

// //           <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
// //             {category.name}
// //           </h1>

// //           {category.description && (
// //             <p
// //               className={`text-xl leading-relaxed ${
// //                 isDarkMode ? 'text-gray-300' : 'text-gray-600'
// //               }`}
// //             >
// //               {category.description}
// //             </p>
// //           )}
// //         </header>

// //         {/* Category Details Card */}
// //         <div
// //           className={`rounded-xl p-8 border shadow-sm ${
// //             isDarkMode
// //               ? 'bg-gray-800 border-gray-700'
// //               : 'bg-white border-gray-200'
// //           }`}
// //         >
// //           <h2 className="text-2xl font-semibold mb-6">Category Information</h2>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             {/* Creation Date */}
// //             {category.createdAt && (
// //               <div>
// //                 <h3
// //                   className={`text-sm font-medium mb-2 ${
// //                     isDarkMode ? 'text-gray-400' : 'text-gray-500'
// //                   }`}
// //                 >
// //                   Created
// //                 </h3>
// //                 <p className="text-lg">
// //                   {new Date(category.createdAt).toLocaleDateString('en-US', {
// //                     year: 'numeric',
// //                     month: 'long',
// //                     day: 'numeric',
// //                   })}
// //                 </p>
// //               </div>
// //             )}

// //             {/* Last Updated */}
// //             {category.updatedAt &&
// //               category.updatedAt !== category.createdAt && (
// //                 <div>
// //                   <h3
// //                     className={`text-sm font-medium mb-2 ${
// //                       isDarkMode ? 'text-gray-400' : 'text-gray-500'
// //                     }`}
// //                   >
// //                     Last Updated
// //                   </h3>
// //                   <p className="text-lg">
// //                     {new Date(category.updatedAt).toLocaleDateString('en-US', {
// //                       year: 'numeric',
// //                       month: 'long',
// //                       day: 'numeric',
// //                     })}
// //                   </p>
// //                 </div>
// //               )}

// //             {/* Category ID */}
// //             <div>
// //               <h3
// //                 className={`text-sm font-medium mb-2 ${
// //                   isDarkMode ? 'text-gray-400' : 'text-gray-500'
// //                 }`}
// //               >
// //                 Category ID
// //               </h3>
// //               <p
// //                 className={`text-sm font-mono ${
// //                   isDarkMode ? 'text-gray-300' : 'text-gray-600'
// //                 }`}
// //               >
// //                 {category._id}
// //               </p>
// //             </div>

// //             {/* Slug */}
// //             {category.slug && (
// //               <div>
// //                 <h3
// //                   className={`text-sm font-medium mb-2 ${
// //                     isDarkMode ? 'text-gray-400' : 'text-gray-500'
// //                   }`}
// //                 >
// //                   URL Slug
// //                 </h3>
// //                 <p
// //                   className={`text-sm font-mono ${
// //                     isDarkMode ? 'text-gray-300' : 'text-gray-600'
// //                   }`}
// //                 >
// //                   {category.slug}
// //                 </p>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Back Button */}
// //         <div className="mt-8">
// //           <Link
// //             to="/course-categories"
// //             className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
// //               isDarkMode
// //                 ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
// //                 : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300'
// //             } hover:gap-3`}
// //           >
// //             <svg
// //               className="w-4 h-4 transition-transform group-hover:-translate-x-1"
// //               fill="none"
// //               stroke="currentColor"
// //               viewBox="0 0 24 24"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={2}
// //                 d="M15 19l-7-7 7-7"
// //               />
// //             </svg>
// //             Back to Categories
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// // export default CourseCategoryDetails;

import { useLoaderData, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import LoadingSpinner from './ui/LoadingSpinner';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const CourseCategoryList = () => {
  const { isDarkMode } = useDarkMode();
  const { categories, status, error } = useLoaderData();
  // console.log('categories', categories);
  const navigate = useNavigate();

  // Handle errors from loader
  useEffect(() => {
    if (status === 'error') {
      toast.error(error);
    }
  }, [status, error]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div
        className={`p-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
      >
        <div className="max-w-md mx-auto p-6 rounded-lg bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
          <h3 className="text-xl font-bold mb-2">Error Loading Categories</h3>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!categories?.length) {
    return (
      <div
        className={`p-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
      >
        <div className="max-w-md mx-auto p-6 rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          <h3 className="text-xl font-bold mb-2">No Categories Available</h3>
          <p className="mb-4">
            Check back later or explore our courses directly.
          </p>
          <Link
            to="/courses"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section
      className={`p-6 min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Our Course Categories
          </h1>
          <p className="max-w-2xl mx-auto text-lg opacity-90">
            Find the perfect learning path organized by subject area
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <article
              key={category._id}
              className={`group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
              onClick={() => navigate(`/courses?category=${category._id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === 'Enter' &&
                navigate(`/courses?category=${category._id}`)
              }
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                    <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">
                      {category.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>
                <p className="text-sm mb-6 line-clamp-3 opacity-80">
                  {category.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {category?.length || 4} courses
                  </span>
                  <Link
                    to={`/courses?category=${category._id}`}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium flex items-center transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Explore
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCategoryList;
