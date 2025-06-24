// // import React, { useEffect } from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { useDarkMode } from '../features/darkMode/useDarkMode';
// // import { getPosts, clearError } from '../store/slices/communitySlice';
// // import { useNavigate } from 'react-router-dom';
// // import {
// //   BookOpen,
// //   Trophy,
// //   Users,
// //   Clock,
// //   Award,
// //   BarChart2,
// //   MessageCircle,
// //   Sparkles,
// //   ArrowLeft,
// //   Star,
// //   TrendingUp,
// // } from 'lucide-react';
// // import { getCourses } from '../store/slices/courseSlice';
// // import { fetchAllTests } from '../store/slices/testSlice';
// // import { selectTopPosts } from '../store/slices/communitySlice';
// // import {
// //   selectTests,
// //   selectFetchTestsStatus,
// // } from '../store/slices/testSelectors';
// // import LoadingSpinner from './ui/LoadingSpinner';

// // function Home() {
// //   const dispatch = useDispatch();
// //   const { user } = useSelector((state) => state.auth);
// //   const { isDarkMode } = useDarkMode();
// //   const navigate = useNavigate();
// //   const courses = useSelector((state) => state.courses?.courses || []);
// //   const tests = useSelector(selectTests);
// //   const testsStatus = useSelector(selectFetchTestsStatus);
// //   const topPosts = useSelector(selectTopPosts);

// //   useEffect(() => {
// //     dispatch(getCourses());
// //     dispatch(fetchAllTests());
// //     dispatch(getPosts()).unwrap();
// //   }, [dispatch]);

// //   return (
// //     <div
// //       className={`relative min-h-screen overflow-hidden ${isDarkMode ? 'dark' : ''}`}
// //     >
// //       {/* Animated Background */}
// //       <div className="absolute inset-0">
// //         <div
// //           className={`absolute inset-0 ${
// //             isDarkMode
// //               ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
// //               : 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800'
// //           }`}
// //         />
// //         <div
// //           className={`absolute inset-0 ${
// //             isDarkMode
// //               ? 'bg-gradient-to-tr from-blue-900/30 via-transparent to-purple-800/40'
// //               : 'bg-gradient-to-tr from-cyan-400/20 via-transparent to-pink-400/30'
// //           }`}
// //         />
// //         <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full animate-pulse"></div>
// //         <div className="absolute top-40 right-20 w-24 h-24 bg-purple-400/15 rounded-full animate-bounce delay-1000"></div>
// //         <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-pink-400/20 rounded-full animate-ping delay-2000"></div>
// //         <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-indigo-400/10 rounded-full animate-pulse delay-500"></div>
// //         <div className="absolute left-10 top-10 animate-float text-6xl opacity-20 delay-0 filter drop-shadow-lg">
// //           📚
// //         </div>
// //         <div className="absolute right-20 top-32 animate-float text-4xl opacity-30 delay-1000 filter drop-shadow-lg">
// //           🎓
// //         </div>
// //         <div className="absolute bottom-20 left-20 animate-float text-5xl opacity-25 delay-500 filter drop-shadow-lg">
// //           ✍️
// //         </div>
// //         <div className="absolute bottom-40 right-10 animate-float text-3xl opacity-20 delay-1500 filter drop-shadow-lg">
// //           🏆
// //         </div>
// //         <div
// //           className={`absolute inset-0 opacity-${isDarkMode ? '10' : '5'}`}
// //           style={{
// //             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
// //           }}
// //         />
// //       </div>

// //       {/* Main Content */}
// //       <div className="relative z-10">
// //         {/* Hero Section */}
// //         <div className="relative w-full min-h-[500px] flex items-center justify-center">
// //           <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
// //           <div className="relative text-center px-4 py-16">
// //             {user ? (
// //               <div className="mx-auto mb-8 inline-flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-8 py-3 text-sm font-medium shadow-xl">
// //                 <div className="flex items-center gap-3">
// //                   <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
// //                   <Sparkles className="w-4 h-4 text-yellow-300" />
// //                   <span
// //                     className="text-white font-semibold"
// //                     style={{ fontFamily: 'Amiri, serif' }}
// //                   >
// //                     مرحبًا مجددًا، {user.name}! 🌟
// //                   </span>
// //                 </div>
// //               </div>
// //             ) : (
// //               <div className="mx-auto mb-8 inline-flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-8 py-3 text-sm font-medium shadow-xl">
// //                 <div className="flex items-center gap-3">
// //                   <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
// //                   <Star className="w-4 h-4 text-yellow-300" />
// //                   <span
// //                     className="text-white font-semibold"
// //                     style={{ fontFamily: 'Amiri, serif' }}
// //                   >
// //                     ابدأ رحلتك التعليمية اليوم 🚀
// //                   </span>
// //                 </div>
// //               </div>
// //             )}
// //             <div className="space-y-8">
// //               <h1
// //                 className="text-white drop-shadow-2xl leading-tight"
// //                 style={{ fontFamily: 'Amiri, serif' }}
// //               >
// //                 <div className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-4">
// //                   إتقان مهاراتك
// //                 </div>
// //                 <div
// //                   className={`text-3xl sm:text-4xl lg:text-6xl font-extrabold bg-gradient-to-r ${
// //                     isDarkMode
// //                       ? 'from-cyan-300 via-blue-300 to-purple-300'
// //                       : 'from-yellow-200 via-amber-300 to-orange-300'
// //                   } bg-clip-text text-transparent filter drop-shadow-lg`}
// //                 >
// //                   مع اختبارات تفاعلية
// //                 </div>
// //               </h1>
// //               <div className="space-y-4">
// //                 <p
// //                   className="mx-auto max-w-3xl text-xl sm:text-2xl lg:text-3xl font-bold text-white/95 drop-shadow-lg leading-relaxed"
// //                   style={{ fontFamily: 'Amiri, serif' }}
// //                 >
// //                   🚀 تعلم، اختبر، وتتبع تقدمك
// //                 </p>
// //                 <div className="flex justify-center items-center gap-4 text-white/80 text-lg">
// //                   <span
// //                     className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"
// //                     style={{ fontFamily: 'Amiri, serif' }}
// //                   >
// //                     جذاب
// //                   </span>
// //                   <span
// //                     className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"
// //                     style={{ fontFamily: 'Amiri, serif' }}
// //                   >
// //                     فعال
// //                   </span>
// //                   <span
// //                     className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"
// //                     style={{ fontFamily: 'Amiri, serif' }}
// //                   >
// //                     مخصص
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
// //           {/* Stats */}
// //           <div className="mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //             <div className="group relative">
// //               <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
// //               <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
// //                 <div className="mb-4 flex justify-center">
// //                   <div className="p-3 bg-blue-500/20 rounded-full">
// //                     <BookOpen className="h-10 w-10 text-blue-300" />
// //                   </div>
// //                 </div>
// //                 <div
// //                   className="text-sm font-medium text-white/80 mb-2"
// //                   style={{ fontFamily: 'Amiri, serif' }}
// //                 >
// //                   الدورات المتاحة
// //                 </div>
// //                 <div className="text-4xl font-bold text-blue-300 mb-2">50+</div>
// //                 <div className="w-full bg-white/10 rounded-full h-2">
// //                   <div className="bg-blue-400 h-2 rounded-full w-4/5" />
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="group relative">
// //               <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
// //               <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
// //                 <div className="mb-4 flex justify-center">
// //                   <div className="p-3 bg-green-500/20 rounded-full">
// //                     <Users className="h-10 w-10 text-green-300" />
// //                   </div>
// //                 </div>
// //                 <div
// //                   className="text-sm font-medium text-white/80 mb-2"
// //                   style={{ fontFamily: 'Amiri, serif' }}
// //                 >
// //                   المتعلمون النشطون
// //                 </div>
// //                 <div className="text-4xl font-bold text-green-300 mb-2">
// //                   10K+
// //                 </div>
// //                 <div className="flex items-center justify-center gap-1 text-green-300">
// //                   <TrendingUp className="w-4 h-4" />
// //                   <span
// //                     className="text-xs"
// //                     style={{ fontFamily: 'Amiri, serif' }}
// //                   >
// //                     نمو متزايد
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="group relative">
// //               <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
// //               <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
// //                 <div className="mb-4 flex justify-center">
// //                   <div className="p-3 bg-yellow-500/20 rounded-full">
// //                     <Trophy className="h-10 w-10 text-yellow-300" />
// //                   </div>
// //                 </div>
// //                 <div
// //                   className="text-sm font-medium text-white/80 mb-2"
// //                   style={{ fontFamily: 'Amiri, serif' }}
// //                 >
// //                   نسبة النجاح
// //                 </div>
// //                 <div className="text-4xl font-bold text-yellow-300 mb-2">
// //                   95%
// //                 </div>
// //                 <div className="flex justify-center">
// //                   {[...Array(5)].map((_, i) => (
// //                     <Star
// //                       key={i}
// //                       className="w-4 h-4 text-yellow-300 fill-current"
// //                     />
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Action Buttons */}
// //           <div className="flex flex-col justify-center gap-6 mb-20 sm:flex-row">
// //             <button
// //               onClick={() => navigate('/categories')}
// //               className="group relative overflow-hidden rounded-2xl px-12 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 shadow-xl"
// //               style={{ fontFamily: 'Amiri, serif' }}
// //             >
// //               <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
// //               <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
// //               <div className="relative flex items-center justify-center gap-3">
// //                 <BookOpen className="w-5 h-5" />
// //                 تصفح الدورات
// //                 <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
// //               </div>
// //             </button>
// //             {!user && (
// //               <button
// //                 onClick={() => navigate('/signup')}
// //                 className="group relative overflow-hidden rounded-2xl px-12 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 shadow-xl"
// //                 style={{ fontFamily: 'Amiri, serif' }}
// //               >
// //                 <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
// //                 <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
// //                 <div className="relative flex items-center justify-center gap-3">
// //                   <Sparkles className="w-5 h-5" />
// //                   انضم الآن
// //                 </div>
// //               </button>
// //             )}
// //           </div>

// //           {/* Courses Carousel */}
// //           <div className="mb-20">
// //             <div className="flex items-center justify-between mb-8">
// //               <h3
// //                 className="text-3xl font-bold text-white flex items-center gap-3"
// //                 style={{ fontFamily: 'Amiri, serif' }}
// //               >
// //                 <BookOpen className="w-8 h-8 text-blue-300" />
// //                 الدورات المتاحة
// //               </h3>
// //               <button
// //                 onClick={() => navigate('/categories')}
// //                 className="text-blue-300 hover:text-blue-200 transition-colors duration-300 flex items-center gap-2"
// //                 style={{ fontFamily: 'Amiri, serif' }}
// //               >
// //                 عرض الكل
// //                 <ArrowLeft className="w-4 h-4" />
// //               </button>
// //             </div>
// //             {courses.length > 0 ? (
// //               <div className="relative">
// //                 <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
// //                   {courses.map((course) => (
// //                     <div
// //                       key={course._id}
// //                       className="group relative flex-shrink-0 w-80 h-64 snap-center"
// //                     >
// //                       <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
// //                       <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col h-full">
// //                         <div className="flex items-center justify-between mb-4">
// //                           <span
// //                             className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
// //                             style={{ fontFamily: 'Amiri, serif' }}
// //                           >
// //                             دورة
// //                           </span>
// //                           <Star className="w-5 h-5 text-yellow-300" />
// //                         </div>
// //                         <h4
// //                           className="text-xl font-semibold text-white mb-2 truncate"
// //                           style={{ fontFamily: 'Amiri, serif' }}
// //                         >
// //                           {course.title}
// //                         </h4>
// //                         <p
// //                           className="text-white/70 text-sm line-clamp-3 flex-grow"
// //                           style={{ fontFamily: 'Amiri, serif' }}
// //                         >
// //                           {course.description || 'لا يوجد وصف متاح'}
// //                         </p>
// //                         <button
// //                           onClick={() => navigate(`/courses/${course._id}`)}
// //                           className="mt-auto w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl transition-all duration-300 font-medium"
// //                           style={{ fontFamily: 'Amiri, serif' }}
// //                         >
// //                           اكتشف الدورة
// //                         </button>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             ) : (
// //               <div className="text-center py-12">
// //                 <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-4" />
// //                 <p
// //                   className="text-white/60"
// //                   style={{ fontFamily: 'Amiri, serif' }}
// //                 >
// //                   لا توجد دورات متاحة حاليًا
// //                 </p>
// //               </div>
// //             )}
// //           </div>

// //           {/* Tests Carousel */}
// //           <div className="mb-20">
// //             <div className="flex items-center justify-between mb-8">
// //               <h3
// //                 className="text-3xl font-bold text-white flex items-center gap-3"
// //                 style={{ fontFamily: 'Amiri, serif' }}
// //               >
// //                 <Award className="w-8 h-8 text-yellow-300" />
// //                 الاختبارات المتاحة
// //               </h3>
// //               <button
// //                 onClick={() => navigate('/tests')}
// //                 className="text-yellow-300 hover:text-yellow-200 transition-colors duration-300 flex items-center gap-2"
// //                 style={{ fontFamily: 'Amiri, serif' }}
// //               >
// //                 عرض الكل
// //                 <ArrowLeft className="w-4 h-4" />
// //               </button>
// //             </div>
// //             {testsStatus === 'loading' ? (
// //               <div className="flex justify-center py-12">
// //                 <LoadingSpinner size="sm" />
// //               </div>
// //             ) : tests.length > 0 ? (
// //               <div className="relative">
// //                 <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
// //                   {tests.map((test) => (
// //                     <div
// //                       key={test._id}
// //                       className="group relative flex-shrink-0 w-80 h-64 snap-center"
// //                     >
// //                       <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
// //                       <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col h-full">
// //                         <div className="flex items-center justify-between mb-4">
// //                           <span
// //                             className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm"
// //                             style={{ fontFamily: 'Amiri, serif' }}
// //                           >
// //                             اختبار
// //                           </span>
// //                           <Trophy className="w-5 h-5 text-yellow-300" />
// //                         </div>
// //                         <h4
// //                           className="text-xl font-semibold text-white mb-2 truncate"
// //                           style={{ fontFamily: 'Amiri, serif' }}
// //                         >
// //                           {test.title}
// //                         </h4>
// //                         <p
// //                           className="text-white/70 text-sm line-clamp-3 flex-grow"
// //                           style={{ fontFamily: 'Amiri, serif' }}
// //                         >
// //                           اختبار تقييمي لدورة{' '}
// //                           {test.courseId?.title || 'غير محدد'}
// //                         </p>
// //                         <button
// //                           onClick={() => navigate(`/tests/${test._id}`)}
// //                           className="mt-auto w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white py-3 rounded-xl transition-all duration-300 font-medium"
// //                           style={{ fontFamily: 'Amiri, serif' }}
// //                         >
// //                           ابدأ الاختبار
// //                         </button>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             ) : (
// //               <div className="text-center py-12">
// //                 <Award className="w-16 h-16 text-white/30 mx-auto mb-4" />
// //                 <p
// //                   className="text-white/60"
// //                   style={{ fontFamily: 'Amiri, serif' }}
// //                 >
// //                   لا توجد اختبارات متاحة حاليًا
// //                 </p>
// //               </div>
// //             )}
// //           </div>

// //           {/* Community Posts Carousel */}
// //           <div className="mb-20">
// //             <div className="flex items-center justify-between mb-8">
// //               <h3
// //                 className="text-3xl font-bold text-white flex items-center gap-3"
// //                 style={{ fontFamily: 'Amiri, serif' }}
// //               >
// //                 <MessageCircle className="w-8 h-8 text-green-300" />
// //                 أبرز المنشورات
// //               </h3>
// //               <button
// //                 onClick={() => navigate('/community')}
// //                 className="text-green-300 hover:text-green-200 transition-colors duration-300 flex items-center gap-2"
// //                 style={{ fontFamily: 'Amiri, serif' }}
// //               >
// //                 عرض الكل
// //                 <ArrowLeft className="w-4 h-4" />
// //               </button>
// //             </div>
// //             {topPosts.length > 0 ? (
// //               <div className="relative">
// //                 <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
// //                   {topPosts.map((post) => (
// //                     <div
// //                       key={post._id}
// //                       className="group relative flex-shrink-0 w-80 h-64 snap-center"
// //                     >
// //                       <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
// //                       <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col h-full">
// //                         <div className="flex items-center gap-3 mb-4">
// //                           <img
// //                             src={
// //                               post.user?.profilePhoto ||
// //                               'https://via.placeholder.com/40?text=User'
// //                             }
// //                             alt={post.user?.name}
// //                             className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
// //                             loading="lazy"
// //                           />
// //                           <div className="flex flex-col">
// //                             <p
// //                               className="text-white font-semibold text-sm truncate"
// //                               style={{ fontFamily: 'Amiri, serif' }}
// //                             >
// //                               {post.user?.name || 'مجهول'}
// //                             </p>
// //                             <div className="flex items-center gap-2 text-white/60 text-xs">
// //                               <MessageCircle className="w-3 h-3" />
// //                               <span style={{ fontFamily: 'Amiri, serif' }}>
// //                                 {post.comments?.length || 0} تعليق
// //                               </span>
// //                             </div>
// //                           </div>
// //                         </div>
// //                         <p
// //                           className="text-white/80 text-sm line-clamp-3 flex-grow"
// //                           style={{ fontFamily: 'Amiri, serif' }}
// //                         >
// //                           {post.content || 'لا يوجد محتوى متاح'}
// //                         </p>
// //                         <button
// //                           onClick={() =>
// //                             navigate(`community/posts/${post._id}`)
// //                           }
// //                           className="mt-auto w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-3 rounded-xl transition-all duration-300 font-medium"
// //                           style={{ fontFamily: 'Amiri, serif' }}
// //                         >
// //                           اقرأ المزيد
// //                         </button>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             ) : (
// //               <div className="text-center py-12">
// //                 <MessageCircle className="w-16 h-16 text-white/30 mx-auto mb-4" />
// //                 <p
// //                   className="text-white/60"
// //                   style={{ fontFamily: 'Amiri, serif' }}
// //                 >
// //                   لا توجد منشورات بعد
// //                 </p>
// //               </div>
// //             )}
// //           </div>

// //           {/* Features */}
// //           <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-3">
// //             <div className="group relative">
// //               <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
// //               <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
// //                 <div className="mb-6 flex justify-center">
// //                   <div className="p-4 bg-blue-500/20 rounded-full">
// //                     <Clock className="h-10 w-10 text-blue-300" />
// //                   </div>
// //                 </div>
// //                 <h3
// //                   className="text-xl font-bold text-white mb-3"
// //                   style={{ fontFamily: 'Amiri, serif' }}
// //                 >
// //                   التعلم حسب وتيرتك
// //                 </h3>
// //                 <p
// //                   className="text-white/70 leading-relaxed line-clamp-3"
// //                   style={{ fontFamily: 'Amiri, serif' }}
// //                 >
// //                   تعلم بسهولة ومرونة في أي وقت يناسبك، مع محتوى مصمم خصيصًا
// //                   لاحتياجاتك
// //                 </p>
// //               </div>
// //             </div>
// //             <div className="group relative">
// //               <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
// //               <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
// //                 <div className="mb-6 flex justify-center">
// //                   <div className="p-4 bg-yellow-500/20 rounded-full">
// //                     <Award className="h-10 w-10 text-yellow-300" />
// //                   </div>
// //                 </div>
// //                 <h3
// //                   className="text-xl font-bold text-white mb-3"
// //                   style={{ fontFamily: 'Amiri, serif' }}
// //                 >
// //                   شهادات معتمدة
// //                 </h3>
// //                 <p
// //                   className="text-white/70 leading-relaxed line-clamp-3"
// //                   style={{ fontFamily: 'Amiri, serif' }}
// //                 >
// //                   احصل على شهادات معتمدة ومعترف بها عند إتمام دوراتك بنجاح
// //                 </p>
// //               </div>
// //             </div>
// //             <div className="group relative">
// //               <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
// //               <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
// //                 <div className="mb-6 flex justify-center">
// //                   <div className="p-4 bg-green-500/20 rounded-full">
// //                     <BarChart2 className="h-10 w-10 text-green-300" />
// //                   </div>
// //                 </div>
// //                 <h3
// //                   className="text-xl font-bold text-white mb-3"
// //                   style={{ fontFamily: 'Amiri, serif' }}
// //                 >
// //                   تتبع التقدم
// //                 </h3>
// //                 <p
// //                   className="text-white/70 leading-relaxed line-clamp-3"
// //                   style={{ fontFamily: 'Amiri, serif' }}
// //                 >
// //                   راقب رحلتك التعليمية وتقدمك بشكل مفصل مع تقارير شاملة
// //                   وإحصائيات دقيقة
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Custom Styles */}
// //       <style jsx>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');

// //         .scrollbar-hide {
// //           -ms-overflow-style: none;
// //           scrollbar-width: none;
// //         }
// //         .scrollbar-hide::-webkit-scrollbar {
// //           display: none;
// //         }

// //         .animate-float {
// //           animation: float 6s ease-in-out infinite;
// //         }

// //         @keyframes float {
// //           0%,
// //           100% {
// //             transform: translateY(0px);
// //           }
// //           50% {
// //             transform: translateY(-20px);
// //           }
// //         }

// //         .backdrop-blur-xl {
// //           backdrop-filter: blur(16px);
// //           -webkit-backdrop-filter: blur(16px);
// //         }

// //         .group:hover .group-hover\\:translate-x-1 {
// //           transform: translateX(0.25rem);
// //         }

// //         [dir='rtl'] .flex {
// //           flex-direction: row-reverse;
// //         }

// //         @media (max-width: 640px) {
// //           .w-80 {
// //             width: 20rem;
// //           }
// //           .h-64 {
// //             height: 16rem;
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

// // export default Home;

// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useQuery } from '@tanstack/react-query';
// import { useDarkMode } from '../features/darkMode/useDarkMode';
// import { fetchCourses, fetchTests, fetchPosts } from '../api/api';
// import { useNavigate } from 'react-router-dom';
// import {
//   BookOpen,
//   Trophy,
//   Users,
//   Clock,
//   Award,
//   BarChart2,
//   MessageCircle,
//   Sparkles,
//   ArrowLeft,
//   Star,
//   TrendingUp,
// } from 'lucide-react';
// import LoadingSpinner from './ui/LoadingSpinner';

// function Home() {
//   const { user } = useSelector((state) => state.auth);
//   const { isDarkMode } = useDarkMode();
//   const navigate = useNavigate();

//   const { data: courses, isLoading: coursesLoading } = useQuery({
//     queryKey: ['courses'],
//     queryFn: fetchCourses,
//   });

//   const { data: tests, isLoading: testsLoading } = useQuery({
//     queryKey: ['tests'],
//     queryFn: fetchTests,
//   });
//   // console.log(tests, 'here is the tests');

//   const { data: postsData, isLoading: postsLoading } = useQuery({
//     queryKey: ['posts'],
//     queryFn: fetchPosts,
//   });

//   const topPosts = postsData?.data?.slice(0, 5) || [];

//   return (
//     <div
//       className={`relative min-h-screen overflow-hidden ${isDarkMode ? 'dark' : ''}`}
//     >
//       <div className="absolute inset-0">
//         <div
//           className={`absolute inset-0 ${
//             isDarkMode
//               ? 'bg-gradient-to-br from-green-800 via-purple-900 to-black-900'
//               : 'bg-gradient-to-br from-green-600 via-purple-600 to-green-800'
//           }`}
//         />
//         <div
//           className={`absolute inset-0 ${
//             isDarkMode
//               ? 'bg-gradient-to-tr from-blue-900/30 via-transparent to-purple-800/40'
//               : 'bg-gradient-to-tr from-cyan-400/20 via-transparent to-pink-400/30'
//           }`}
//         />
//         <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full animate-pulse"></div>
//         <div className="absolute top-40 right-20 w-24 h-24 bg-purple-400/15 rounded-full animate-bounce delay-1000"></div>
//         <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-pink-400/20 rounded-full animate-ping delay-2000"></div>
//         <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-indigo-400/10 rounded-full animate-pulse delay-500"></div>
//         <div className="absolute left-10 top-10 animate-float text-6xl opacity-20 delay-0 filter drop-shadow-lg">
//           📚
//         </div>
//         <div className="absolute right-20 top-32 animate-float text-4xl opacity-30 delay-1000 filter drop-shadow-lg">
//           🎓
//         </div>
//         <div className="absolute bottom-20 left-20 animate-float text-5xl opacity-25 delay-500 filter drop-shadow-lg">
//           ✍️
//         </div>
//         <div className="absolute bottom-40 right-10 animate-float text-3xl opacity-20 delay-1500 filter drop-shadow-lg">
//           🏆
//         </div>
//         <div
//           className={`absolute inset-0 opacity-${isDarkMode ? '10' : '5'}`}
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//           }}
//         />
//       </div>

//       <div className="relative z-10">
//         <div className="relative w-full min-h-[500px] flex items-center justify-center">
//           <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
//           <div className="relative text-center px-4 py-16">
//             {user ? (
//               <div className="mx-auto mb-8 inline-flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-8 py-3 text-sm font-medium shadow-xl">
//                 <div className="flex items-center gap-3">
//                   <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//                   <Sparkles className="w-4 h-4 text-yellow-300" />
//                   <span
//                     className="text-white font-semibold"
//                     style={{ fontFamily: 'Amiri, serif' }}
//                   >
//                     مرحبًا مجددًا، {user.name}! 🌟
//                   </span>
//                 </div>
//               </div>
//             ) : (
//               <div className="mx-auto mb-8 inline-flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-8 py-3 text-sm font-medium shadow-xl">
//                 <div className="flex items-center gap-3">
//                   <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
//                   <Star className="w-4 h-4 text-yellow-300" />
//                   <span
//                     className="text-white font-semibold"
//                     style={{ fontFamily: 'Amiri, serif' }}
//                   >
//                     ابدأ رحلتك التعليمية اليوم 🚀
//                   </span>
//                 </div>
//               </div>
//             )}
//             <div className="space-y-8">
//               <h1
//                 className="text-white drop-shadow-2xl leading-tight"
//                 style={{ fontFamily: 'Amiri, serif' }}
//               >
//                 <div className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-4">
//                   إتقان مهاراتك
//                 </div>
//                 <div
//                   className={`text-3xl sm:text-4xl lg:text-6xl font-extrabold bg-gradient-to-r ${
//                     isDarkMode
//                       ? 'from-cyan-300 via-blue-300 to-purple-300'
//                       : 'from-yellow-200 via-amber-300 to-orange-300'
//                   } bg-clip-text text-transparent filter drop-shadow-lg`}
//                 >
//                   مع اختبارات تفاعلية
//                 </div>
//               </h1>
//               <div className="space-y-4">
//                 <p
//                   className="mx-auto max-w-3xl text-xl sm:text-2xl lg:text-3xl font-bold text-white/95 drop-shadow-lg leading-relaxed"
//                   style={{ fontFamily: 'Amiri, serif' }}
//                 >
//                   🚀 تعلم، اختبر، وتتبع تقدمك
//                 </p>
//                 <div className="flex justify-center items-center gap-4 text-white/80 text-lg">
//                   <span
//                     className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"
//                     style={{ fontFamily: 'Amiri, serif' }}
//                   >
//                     جذاب
//                   </span>
//                   <span
//                     className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"
//                     style={{ fontFamily: 'Amiri, serif' }}
//                   >
//                     فعال
//                   </span>
//                   <span
//                     className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"
//                     style={{ fontFamily: 'Amiri, serif' }}
//                   >
//                     مخصص
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
//           <div className="mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="group relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
//               <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
//                 <div className="mb-4 flex justify-center">
//                   <div className="p-3 bg-blue-500/20 rounded-full">
//                     <BookOpen className="h-10 w-10 text-blue-300" />
//                   </div>
//                 </div>
//                 <div
//                   className="text-sm font-medium text-white/80 mb-2"
//                   style={{ fontFamily: 'Amiri, serif' }}
//                 >
//                   الدورات المتاحة
//                 </div>
//                 <div className="text-4xl font-bold text-blue-300 mb-2">50+</div>
//                 <div className="w-full bg-white/10 rounded-full h-2">
//                   <div className="bg-blue-400 h-2 rounded-full w-4/5" />
//                 </div>
//               </div>
//             </div>
//             <div className="group relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
//               <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
//                 <div className="mb-4 flex justify-center">
//                   <div className="p-3 bg-green-500/20 rounded-full">
//                     <Users className="h-10 w-10 text-green-300" />
//                   </div>
//                 </div>
//                 <div
//                   className="text-sm font-medium text-white/80 mb-2"
//                   style={{ fontFamily: 'Amiri, serif' }}
//                 >
//                   المتعلمون النشطون
//                 </div>
//                 <div className="text-4xl font-bold text-green-300 mb-2">
//                   10K+
//                 </div>
//                 <div className="flex items-center justify-center gap-1 text-green-300">
//                   <TrendingUp className="w-4 h-4" />
//                   <span
//                     className="text-xs"
//                     style={{ fontFamily: 'Amiri, serif' }}
//                   >
//                     نمو متزايد
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="group relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
//               <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
//                 <div className="mb-4 flex justify-center">
//                   <div className="p-3 bg-yellow-500/20 rounded-full">
//                     <Trophy className="h-10 w-10 text-yellow-300" />
//                   </div>
//                 </div>
//                 <div
//                   className="text-sm font-medium text-white/80 mb-2"
//                   style={{ fontFamily: 'Amiri, serif' }}
//                 >
//                   نسبة النجاح
//                 </div>
//                 <div className="text-4xl font-bold text-yellow-300 mb-2">
//                   95%
//                 </div>
//                 <div className="flex justify-center">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className="w-4 h-4 text-yellow-300 fill-current"
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col justify-center gap-6 mb-20 sm:flex-row">
//             <button
//               onClick={() => navigate('/categories')}
//               className="group relative overflow-hidden rounded-2xl px-12 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 shadow-xl"
//               style={{ fontFamily: 'Amiri, serif' }}
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               <div className="relative flex items-center justify-center gap-3">
//                 <BookOpen className="w-5 h-5" />
//                 تصفح الدورات
//                 <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
//               </div>
//             </button>
//             {!user && (
//               <button
//                 onClick={() => navigate('/signup')}
//                 className="group relative overflow-hidden rounded-2xl px-12 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 shadow-xl"
//                 style={{ fontFamily: 'Amiri, serif' }}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 <div className="relative flex items-center justify-center gap-3">
//                   <Sparkles className="w-5 h-5" />
//                   انضم الآن
//                 </div>
//               </button>
//             )}
//           </div>

//           <div className="mb-20">
//             <div className="flex items-center justify-between mb-8">
//               <h3
//                 className="text-3xl font-bold text-white flex items-center gap-3"
//                 style={{ fontFamily: 'Amiri, serif' }}
//               >
//                 <BookOpen className="w-8 h-8 text-blue-300" />
//                 الدورات المتاحة
//               </h3>
//               <button
//                 onClick={() => navigate('/categories')}
//                 className="text-blue-300 hover:text-blue-200 transition-colors duration-300 flex items-center gap-2"
//                 style={{ fontFamily: 'Amiri, serif' }}
//               >
//                 عرض الكل
//                 <ArrowLeft className="w-4 h-4" />
//               </button>
//             </div>
//             {coursesLoading ? (
//               <div className="flex justify-center py-12">
//                 <LoadingSpinner size="sm" />
//               </div>
//             ) : courses?.length > 0 ? (
//               <div className="relative">
//                 <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
//                   {courses.map((course) => (
//                     <div
//                       key={course._id}
//                       className="group relative flex-shrink-0 w-80 h-64 snap-center"
//                     >
//                       <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                       <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col h-full">
//                         <div className="flex items-center justify-between mb-4">
//                           <span
//                             className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
//                             style={{ fontFamily: 'Amiri, serif' }}
//                           >
//                             دورة
//                           </span>
//                           <Star className="w-5 h-5 text-yellow-300" />
//                         </div>
//                         <h4
//                           className="text-xl font-semibold text-white mb-2 truncate"
//                           style={{ fontFamily: 'Amiri, serif' }}
//                         >
//                           {course.title}
//                         </h4>
//                         <p
//                           className="text-white/70 text-sm line-clamp-3 flex-grow"
//                           style={{ fontFamily: 'Amiri, serif' }}
//                         >
//                           {course.description || 'لا يوجد وصف متاح'}
//                         </p>
//                         <button
//                           onClick={() => navigate(`/courses/${course._id}`)}
//                           className="mt-auto w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl transition-all duration-300 font-medium"
//                           style={{ fontFamily: 'Amiri, serif' }}
//                         >
//                           اكتشف الدورة
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-4" />
//                 <p
//                   className="text-white/60"
//                   style={{ fontFamily: 'Amiri, serif' }}
//                 >
//                   لا توجد دورات متاحة حاليًا
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="mb-20">
//             <div className="flex items-center justify-between mb-8">
//               <h3
//                 className="text-3xl font-bold text-white flex items-center gap-3"
//                 style={{ fontFamily: 'Amiri, serif' }}
//               >
//                 <Award className="w-8 h-8 text-yellow-300" />
//                 الاختبارات المتاحة
//               </h3>
//               <button
//                 onClick={() => navigate('/tests')}
//                 className="text-yellow-300 hover:text-yellow-200 transition-colors duration-300 flex items-center gap-2"
//                 style={{ fontFamily: 'Amiri, serif' }}
//               >
//                 عرض الكل
//                 <ArrowLeft className="w-4 h-4" />
//               </button>
//             </div>
//             {testsLoading ? (
//               <div className="flex justify-center py-12">
//                 <LoadingSpinner size="sm" />
//               </div>
//             ) : Array.isArray(tests?.data) && tests.data.length > 0 ? (
//               <div className="relative">
//                 <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
//                   {tests.data.map((test) => (
//                     <div
//                       key={test._id}
//                       className="group relative flex-shrink-0 w-80 h-64 snap-center"
//                     >
//                       <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                       <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col h-full">
//                         <div className="flex items-center justify-between mb-4">
//                           <span
//                             className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm"
//                             style={{ fontFamily: 'Amiri, serif' }}
//                           >
//                             اختبار
//                           </span>
//                           <Trophy className="w-5 h-5 text-yellow-300" />
//                         </div>
//                         <h4
//                           className="text-xl font-semibold text-white mb-2 truncate"
//                           style={{ fontFamily: 'Amiri, serif' }}
//                         >
//                           {test.title}
//                         </h4>
//                         <p
//                           className="text-white/70 text-sm line-clamp-3 flex-grow"
//                           style={{ fontFamily: 'Amiri, serif' }}
//                         >
//                           اختبار تقييمي لدورة{' '}
//                           {test?.courseId?.title || 'غير محدد'}
//                         </p>
//                         <button
//                           onClick={() => navigate(`/tests/${test._id}`)}
//                           className="mt-auto w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white py-3 rounded-xl transition-all duration-300 font-medium"
//                           style={{ fontFamily: 'Amiri, serif' }}
//                         >
//                           ابدأ الاختبار
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <Award className="w-16 h-16 text-white/30 mx-auto mb-4" />
//                 <p
//                   className="text-white/60"
//                   style={{ fontFamily: 'Amiri, serif' }}
//                 >
//                   لا توجد اختبارات متاحة حاليًا
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="mb-20">
//             <div className="flex items-center justify-between mb-8">
//               <h3
//                 className={`text-3xl font-bold text-white flex items-center gap-3`}
//                 style={{ fontFamily: 'Amiri, serif' }}
//               >
//                 <MessageCircle className="w-8 h-8 text-green-300" />
//                 أبرز المنشورات
//               </h3>
//               <button
//                 onClick={() => navigate('/community')}
//                 className="text-green-300 hover:text-green-200 transition-colors duration-300 flex items-center gap-2"
//                 style={{ fontFamily: 'Amiri, serif' }}
//               >
//                 عرض الكل
//                 <ArrowLeft className="w-4 h-4" />
//               </button>
//             </div>
//             {postsLoading ? (
//               <div className="flex justify-center py-12">
//                 <LoadingSpinner size="sm" />
//               </div>
//             ) : topPosts?.length > 0 ? (
//               <div className="relative">
//                 <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
//                   {topPosts?.map((post) => (
//                     <div
//                       key={post?._id}
//                       className="group relative flex-shrink-0 w-80 h-64 snap-center"
//                     >
//                       <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                       <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col h-full">
//                         <div className="flex items-center gap-3 mb-4">
//                           <img
//                             src={
//                               post.user?.profilePhoto ||
//                               'https://via.placeholder.com/40?text=User'
//                             }
//                             alt={post.user?.name}
//                             className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
//                             loading="lazy"
//                           />
//                           <div className="flex flex-col">
//                             <p
//                               className="text-white font-semibold text-sm truncate"
//                               style={{ fontFamily: 'Amiri, serif' }}
//                             >
//                               {post.user?.name || 'مجهول'}
//                             </p>
//                             <div className="flex items-center gap-2 text-white/60 text-xs">
//                               <MessageCircle className="w-3 h-3" />
//                               <span style={{ fontFamily: 'Amiri, serif' }}>
//                                 {post.comments?.length || 0} تعليق
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                         <p
//                           className="text-white/80 text-sm line-clamp-3 flex-grow"
//                           style={{ fontFamily: 'Amiri, serif' }}
//                         >
//                           {post.content || 'لا يوجد محتوى متاح'}
//                         </p>
//                         <button
//                           onClick={() =>
//                             navigate(`community/posts/${post._id}`)
//                           }
//                           className="mt-auto w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-3 rounded-xl transition-all duration-300 font-medium"
//                           style={{ fontFamily: 'Amiri, serif' }}
//                         >
//                           اقرأ المزيد
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <MessageCircle className="w-16 h-16 text-white/30 mx-auto mb-4" />
//                 <p
//                   className="text-white/60"
//                   style={{ fontFamily: 'Amiri, serif' }}
//                 >
//                   لا توجد منشورات بعد
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-3">
//             <div className="group relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
//                 <div className="mb-6 flex justify-center">
//                   <div className="p-4 bg-blue-500/20 rounded-full">
//                     <Clock className="h-10 w-10 text-blue-300" />
//                   </div>
//                 </div>
//                 <h3
//                   className="text-xl font-bold text-white mb-3"
//                   style={{ fontFamily: 'Amiri, serif' }}
//                 >
//                   التعلم حسب وتيرتك
//                 </h3>
//                 <p
//                   className="text-white/70 leading-relaxed line-clamp-3"
//                   style={{ fontFamily: 'Amiri, serif' }}
//                 >
//                   تعلم بسهولة ومرونة في أي وقت يناسبك، مع محتوى مصمم خصيصًا
//                   لاحتياجاتك
//                 </p>
//               </div>
//             </div>
//             <div className="group relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
//                 <div className="mb-6 flex justify-center">
//                   <div className="p-4 bg-yellow-500/20 rounded-full">
//                     <Award className="h-10 w-10 text-yellow-300" />
//                   </div>
//                 </div>
//                 <h3
//                   className="text-xl font-bold text-white mb-3"
//                   style={{ fontFamily: 'Amiri, serif' }}
//                 >
//                   شهادات معتمدة
//                 </h3>
//                 <p
//                   className="text-white/70 leading-relaxed line-clamp-3"
//                   style={{ fontFamily: 'Amiri, serif' }}
//                 >
//                   احصل على شهادات معتمدة ومعترف بها عند إتمام دوراتك بنجاح
//                 </p>
//               </div>
//             </div>
//             <div className="group relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
//                 <div className="mb-6 flex justify-center">
//                   <div className="p-4 bg-green-500/20 rounded-full">
//                     <BarChart2 className="h-10 w-10 text-green-300" />
//                   </div>
//                 </div>
//                 <h3
//                   className="text-xl font-bold text-white mb-3"
//                   style={{ fontFamily: 'Amiri, serif' }}
//                 >
//                   تتبع التقدم
//                 </h3>
//                 <p
//                   className="text-white/70 leading-relaxed line-clamp-3"
//                   style={{ fontFamily: 'Amiri, serif' }}
//                 >
//                   راقب رحلتك التعليمية وتقدمك بشكل مفصل مع تقارير شاملة
//                   وإحصائيات دقيقة
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{`

//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }

//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }

//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-20px);
//           }
//         }

//         .backdrop-blur-xl {
//           backdrop-filter: blur(16px);
//           -webkit-backdrop-filter: blur(16px);
//         }

//         .group:hover .group-hover\\:translate-x-1 {
//           transform: translateX(0.25rem);
//         }

//         [dir='rtl'] .flex {
//           flex-direction: row-reverse;
//         }

//         @media (max-width: 640px) {
//           .w-80 {
//             width: 20rem;
//           }
//           .h-64 {
//             height: 16rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Home;
import React from 'react';

import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import { fetchCourses, fetchTests, fetchPosts } from '../api/api';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Trophy,
  Users,
  Clock,
  Award,
  BarChart2,
  MessageCircle,
  Sparkles,
  ArrowLeft,
  Star,
  TrendingUp,
} from 'lucide-react';
import LoadingSpinner from './ui/LoadingSpinner';

function Home() {
  const { user } = useSelector((state) => state.auth);
  console.log(user,'user from home is')
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  });

  const { data: tests, isLoading: testsLoading } = useQuery({
    queryKey: ['tests'],
    queryFn: fetchTests,
  });

  const { data: postsData, isLoading: postsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const topPosts = postsData?.data?.slice(0, 5) || [];

  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Blurred Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://res.cloudinary.com/djzcvjwuv/image/upload/f_webp,q_auto,w_1600,h_900,c_fill/ChatGPT_Image_Jun_18_2025_02_20_18_PM_vyddao.png"
          alt="Background"
          className="w-full h-full object-cover filter blur-md scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-violet-500/20 backdrop-blur-xl" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 pt-28 pb-16">
        {/* Hero Section */}
        <div className="relative w-full min-h-[500px] flex items-center justify-center">
          <div className="absolute inset-0 bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-2xl shadow-gray-900/10 dark:shadow-black/20" />
          <div className="relative text-center px-4 py-16 max-w-7xl mx-auto">
            {user ? (
              <div className="mx-auto mb-8 inline-flex items-center rounded-2xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20 border border-emerald-200/40 dark:border-emerald-400/30 backdrop-blur-sm px-8 py-3 text-sm font-medium shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span
                    className="text-white font-semibold"
                    style={{ fontFamily: 'Amiri, serif' }}
                  >
                    مرحبًا مجددًا، {user.name}! 🌟
                  </span>
                </div>
              </div>
            ) : (
              <div className="mx-auto mb-8 inline-flex items-center rounded-2xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20 border border-emerald-200/40 dark:border-emerald-400/30 backdrop-blur-sm px-8 py-3 text-sm font-medium shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <Star className="w-4 h-4 text-violet-400" />
                  <span
                    className="text-white font-semibold"
                    style={{ fontFamily: 'Amiri, serif' }}
                  >
                    ابدأ رحلتك التعليمية اليوم 🚀
                  </span>
                </div>
              </div>
            )}
            <div className="space-y-8">
              <h1
                className="text-white drop-shadow-2xl leading-tight"
                style={{ fontFamily: 'Amiri, serif' }}
              >
                <div className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-4">
                  إتقان مهاراتك
                </div>
                <div className="text-3xl sm:text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent filter drop-shadow-lg">
                  مع اختبارات تفاعلية
                </div>
              </h1>
              <div className="space-y-4">
                <p
                  className="mx-auto max-w-3xl text-xl sm:text-2xl lg:text-3xl font-bold text-white/95 drop-shadow-lg leading-relaxed"
                  style={{ fontFamily: 'Amiri, serif' }}
                >
                  🚀 تعلم، اختبر، وتتبع تقدمك
                </p>
                <div className="flex justify-center items-center gap-4 text-white/80 text-lg">
                  <span
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl border border-emerald-200/40 backdrop-blur-sm"
                    style={{ fontFamily: 'Amiri, serif' }}
                  >
                    جذاب
                  </span>
                  <span
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-2xl border border-cyan-200/40 backdrop-blur-sm"
                    style={{ fontFamily: 'Amiri, serif' }}
                  >
                    فعال
                  </span>
                  <span
                    className="px-4 py-2 bg-gradient-to-r from-violet-500/20 to-emerald-500/20 rounded-2xl border border-violet-200/40 backdrop-blur-sm"
                    style={{ fontFamily: 'Amiri, serif' }}
                  >
                    مخصص
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Stats Section */}
          <div className="mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border border-emerald-200/40 dark:border-emerald-400/30 rounded-2xl p-8 text-center shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-emerald-500/20 rounded-full">
                    <BookOpen className="h-10 w-10 text-emerald-400" />
                  </div>
                </div>
                <div
                  className="text-sm font-medium text-white/80 mb-2"
                  style={{ fontFamily: 'Amiri, serif' }}
                >
                  الدورات المتاحة
                </div>
                <div className="text-4xl font-bold text-emerald-400 mb-2">
                  50+
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-emerald-400 h-2 rounded-full w-4/5" />
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl bedrag border-cyan-200/40 dark:border-cyan-400/30 rounded-2xl p-8 text-center shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-cyan-500/20 rounded-full">
                    <Users className="h-10 w-10 text-cyan-400" />
                  </div>
                </div>
                <div
                  className="text-sm font-medium text-white/80 mb-2"
                  style={{ fontFamily: 'Amiri, serif' }}
                >
                  المتعلمون النشطون
                </div>
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  10K+
                </div>
                <div className="flex items-center justify-center gap-1 text-cyan-400">
                  <TrendingUp className="w-4 h-4" />
                  <span
                    className="text-xs"
                    style={{ fontFamily: 'Amiri, serif' }}
                  >
                    نمو متزايد
                  </span>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-emerald-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border border-violet-200/40 dark:border-violet-400/30 rounded-2xl p-8 text-center shadow-lg hover:shadow-violet-500/20 transition-all duration-300 hover:scale-105">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-violet-500/20 rounded-full">
                    <Trophy className="h-10 w-10 text-violet-400" />
                  </div>
                </div>
                <div
                  className="text-sm font-medium text-white/80 mb-2"
                  style={{ fontFamily: 'Amiri, serif' }}
                >
                  نسبة النجاح
                </div>
                <div className="text-4xl font-bold text-violet-400 mb-2">
                  95%
                </div>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-violet-400 fill-current"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col justify-center gap-6 mb-20 sm:flex-row">
            <button
              onClick={() => navigate('/categories')}
              className="group relative overflow-hidden rounded-2xl px-12 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
              style={{ fontFamily: 'Amiri, serif' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-3">
                <BookOpen className="w-5 h-5" />
                تصفح الدورات
                <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
            {!user && (
              <button
                onClick={() => navigate('/signup')}
                className="group relative overflow-hidden rounded-2xl px-12 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-violet-500/25"
                style={{ fontFamily: 'Amiri, serif' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  انضم الآن
                </div>
              </button>
            )}
          </div>

          {/* Courses Section */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h3
                className="text-3xl font-bold text-white flex items-center gap-3"
                style={{ fontFamily: 'Amiri, serif' }}
              >
                <BookOpen className="w-8 h-8 text-emerald-400" />
                الدورات المتاحة
              </h3>
              <button
                onClick={() => navigate('/courses')}
                className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300 flex items-center gap-2"
                style={{ fontFamily: 'Amiri, serif' }}
              >
                عرض الكل
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
            {coursesLoading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="sm" />
              </div>
            ) : courses?.length > 0 ? (
              <div className="relative">
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                  {courses.map((course) => (
                    <div
                      key={course._id}
                      className="group relative flex-shrink-0 w-80 h-64 snap-center"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border border-emerald-200/40 dark:border-emerald-400/30 rounded-2xl p-6 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm"
                            style={{ fontFamily: 'Amiri, serif' }}
                          >
                            دورة
                          </span>
                          <Star className="w-5 h-5 text-violet-400" />
                        </div>
                        <h4
                          className="text-xl font-semibold text-white mb-2 truncate"
                          style={{ fontFamily: 'Amiri, serif' }}
                        >
                          {course.title}
                        </h4>
                        <p
                          className="text-white/70 text-sm line-clamp-3 flex-grow"
                          style={{ fontFamily: 'Amiri, serif' }}
                        >
                          {course.description || 'لا يوجد وصف متاح'}
                        </p>
                        <button
                          onClick={() => navigate(`/courses/${course._id}`)}
                          className="mt-auto w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white py-3 rounded-xl transition-all duration-300 font-medium"
                          style={{ fontFamily: 'Amiri, serif' }}
                        >
                          اكتشف الدورة
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p
                  className="text-white/60"
                  style={{ fontFamily: 'Amiri, serif' }}
                >
                  لا توجد دورات متاحة حاليًا
                </p>
              </div>
            )}
          </div>

          {/* Tests Section */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h3
                className="text-3xl font-bold text-white flex items-center gap-3"
                style={{ fontFamily: 'Amiri, serif' }}
              >
                <Award className="w-8 h-8 text-cyan-400" />
                الاختبارات المتاحة
              </h3>
              <button
                onClick={() => navigate('/tests')}
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 flex items-center gap-2"
                style={{ fontFamily: 'Amiri, serif' }}
              >
                عرض الكل
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
            {testsLoading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="sm" />
              </div>
            ) : Array.isArray(tests?.data) && tests.data.length > 0 ? (
              <div className="relative">
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                  {tests.data.map((test) => (
                    <div
                      key={test._id}
                      className="group relative flex-shrink-0 w-80 h-64 snap-center"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border border-cyan-200/40 dark:border-cyan-400/30 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm"
                            style={{ fontFamily: 'Amiri, serif' }}
                          >
                            اختبار
                          </span>
                          <Trophy className="w-5 h-5 text-violet-400" />
                        </div>
                        <h4
                          className="text-xl font-semibold text-white mb-2 truncate"
                          style={{ fontFamily: 'Amiri, serif' }}
                        >
                          {test.title}
                        </h4>
                        <p
                          className="text-white/70 text-sm line-clamp-3 flex-grow"
                          style={{ fontFamily: 'Amiri, serif' }}
                        >
                          اختبار تقييمي لدورة{' '}
                          {test?.courseId?.title || 'غير محدد'}
                        </p>
                        <button
                          onClick={() => navigate(`/tests/${test._id}`)}
                          className="mt-auto w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white py-3 rounded-xl transition-all duration-300 font-medium"
                          style={{ fontFamily: 'Amiri, serif' }}
                        >
                          ابدأ الاختبار
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Award className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p
                  className="text-white/60"
                  style={{ fontFamily: 'Amiri, serif' }}
                >
                  لا توجد اختبارات متاحة حاليًا
                </p>
              </div>
            )}
          </div>

          {/* Posts Section */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h3
                className="text-3xl font-bold text-white flex items-center gap-3"
                style={{ fontFamily: 'Amiri, serif' }}
              >
                <MessageCircle className="w-8 h-8 text-violet-400" />
                أبرز المنشورات
              </h3>
              <button
                onClick={() => navigate('/community')}
                className="text-violet-400 hover:text-violet-300 transition-colors duration-300 flex items-center gap-2"
                style={{ fontFamily: 'Amiri, serif' }}
              >
                عرض الكل
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
            {postsLoading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="sm" />
              </div>
            ) : topPosts?.length > 0 ? (
              <div className="relative">
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                  {topPosts?.map((post) => (
                    <div
                      key={post?._id}
                      className="group relative flex-shrink-0 w-80 h-64 snap-center"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-emerald-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border border-violet-200/40 dark:border-violet-400/30 rounded-2xl p-6 shadow-lg hover:shadow-violet-500/20 transition-all duration-300 hover:scale-105 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-4">
                          <img
                            src={
                              post.user?.profilePhoto ||
                              'https://res.cloudinary.com/djzcvjwuv/image/upload/v1746960965/ecommerce-products/psdehcfezymfo6kuqdea.jpg'
                            }
                            alt={post.user?.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-emerald-200/40"
                            loading="lazy"
                          />
                          <div className="flex flex-col">
                            <p
                              className="text-white font-semibold text-sm truncate"
                              style={{ fontFamily: 'Amiri, serif' }}
                            >
                              {post.user?.name || 'مجهول'}
                            </p>
                            <div className="flex items-center gap-2 text-white/60 text-xs">
                              <MessageCircle className="w-3 h-3" />
                              <span style={{ fontFamily: 'Amiri, serif' }}>
                                {post.comments?.length || 0} تعليق
                              </span>
                            </div>
                          </div>
                        </div>
                        <p
                          className="text-white/80 text-sm line-clamp-3 flex-grow"
                          style={{ fontFamily: 'Amiri, serif' }}
                        >
                          {post.content || 'لا يوجد محتوى متاح'}
                        </p>
                        <button
                          onClick={() =>
                            navigate(`community/posts/${post._id}`)
                          }
                          className="mt-auto w-full bg-gradient-to-r from-violet-500 to-emerald-500 hover:from-violet-600 hover:to-emerald-600 text-white py-3 rounded-xl transition-all duration-300 font-medium"
                          style={{ fontFamily: 'Amiri, serif' }}
                        >
                          اقرأ المزيد
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p
                  className="text-white/60"
                  style={{ fontFamily: 'Amiri, serif' }}
                >
                  لا توجد منشورات بعد
                </p>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border border-emerald-200/40 dark:border-emerald-400/30 rounded-2xl p-8 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-emerald-500/20 rounded-full">
                    <Clock className="h-10 w-10 text-emerald-400" />
                  </div>
                </div>
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: 'Amiri, serif' }}
                >
                  التعلم حسب وتيرتك
                </h3>
                <p
                  className="text-white/70 leading-relaxed line-clamp-3"
                  style={{ fontFamily: 'Amiri, serif' }}
                >
                  تعلم بسهولة ومرونة في أي وقت يناسبك، مع محتوى مصمم خصيصًا
                  لاحتياجاتك
                </p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border border-cyan-200/40 dark:border-cyan-400/30 rounded-2xl p-8 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-cyan-500/20 rounded-full">
                    <Award className="h-10 w-10 text-cyan-400" />
                  </div>
                </div>
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: 'Amiri, serif' }}
                >
                  شهادات معتمدة
                </h3>
                <p
                  className="text-white/70 leading-relaxed line-clamp-3"
                  style={{ fontFamily: 'Amiri, serif' }}
                >
                  احصل على شهادات معتمدة ومعترف بها عند إتمام دوراتك بنجاح
                </p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-emerald-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border border-violet-200/40 dark:border-violet-400/30 rounded-2xl p-8 shadow-lg hover:shadow-violet-500/20 transition-all duration-300 hover:scale-105">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-violet-500/20 rounded-full">
                    <BarChart2 className="h-10 w-10 text-violet-400" />
                  </div>
                </div>
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: 'Amiri, serif' }}
                >
                  تتبع التقدم
                </h3>
                <p
                  className="text-white/70 leading-relaxed line-clamp-3"
                  style={{ fontFamily: 'Amiri, serif' }}
                >
                  راقب رحلتك التعليمية وتقدمك بشكل مفصل مع تقارير شاملة
                  وإحصائيات دقيقة
                </p>
              </div>
            </div>
          </div>
        </div>

        <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .backdrop-blur-xl {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .group:hover .group-hover\\:translate-x-1 {
          transform: translateX(0.25rem);
        }

        [dir='rtl'] .flex {
          flex-direction: row-reverse;
        }

        @media (max-width: 640px) {
          .w-80 {
            width: 20rem;
          }
          .h-64 {
            height: 16rem;
          }
        }
      `}</style>
      </div>
    </div>
  );
}
export default Home;
