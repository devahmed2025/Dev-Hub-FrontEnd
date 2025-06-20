// import React from 'react';
// import { useLoaderData } from 'react-router-dom';

// const CategoryDetails = () => {
//   const categoryData = useLoaderData();

//   const { topStudents, data } = categoryData.res;
//   console.log('cat', data);

//   if (!topStudents || !data) {
//     return <p>Loading...</p>; // or show a spinner
//   }

//   const { name, description, tests, members } = data;

//   return (
//     <div>
//       <h1>{name}</h1>
//       <p>{description}</p>

//       <h2>Tests</h2>
//       <ul>
//         {tests?.map((test) => (
//           <li key={test._id}>
//             {test.title} - {test.totalPoints} pts
//           </li>
//         ))}
//       </ul>

//       <h2>Memerts</h2>
//       <ul>
//         {members?.map((member) => (
//           <li key={member._id}>{member.name}</li>
//         ))}
//       </ul>
//       <h2>Top Students</h2>
//       <ul>
//         {topStudents?.map((top) => (
//           <li key={top._id}>
//             {top.student?.name} - {top.totalScore} pts
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CategoryDetails;

import React from 'react';
import { NavLink, useLoaderData } from 'react-router-dom';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import {
  BookOpen,
  Clock,
  Award,
  ChevronRight,
  Target,
  Users,
  Trophy,
  Star,
  User,
} from 'lucide-react';

const CategoryDetails = () => {
  const categoryData = useLoaderData();
  const { isDarkMode } = useDarkMode();
  const { topStudents, data } = categoryData.res;

  if (!topStudents || !data) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode
            ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900'
            : 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'
        }`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">
            Loading amazing content...
          </p>
        </div>
      </div>
    );
  }

  const { name, description, tests, members } = data;

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900'
          : 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'
      } p-4 sm:p-6 lg:p-8`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-violet-500/20 backdrop-blur-3xl rounded-3xl"></div>
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/20 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                      {name}
                    </h1>
                    <div className="flex items-center gap-2 text-white/60">
                      <Users className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {members?.length || 0} Members
                      </span>
                      <Target className="h-4 w-4 ml-4" />
                      <span className="text-sm font-medium">
                        {tests?.length || 0} Tests
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-white/80 text-lg leading-relaxed max-w-3xl">
                  {description}
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="p-6 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl border border-yellow-400/30">
                  <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-2" />
                  <p className="text-yellow-300 text-sm font-medium text-center">
                    Top Performers
                  </p>
                  <p className="text-white text-2xl font-bold text-center">
                    {topStudents?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Tests Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Available Tests
                </h2>
              </div>

              {tests && tests.length > 0 ? (
                <div className="grid gap-4">
                  {tests.map((test, index) => (
                    <div
                      key={test._id}
                      className="group bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                            <Target className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                              <NavLink to={`/tests/${test._id}`}>
                                {test.title}
                              </NavLink>
                            </h3>
                            <p className="text-white/60 text-sm">
                              Click to view details
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-1 rounded-full border border-purple-400/30">
                            <span className="text-purple-300 font-bold">
                              {test.totalPoints}
                            </span>
                            <span className="text-white/60 text-sm ml-1">
                              pts
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-white/30 mx-auto mb-4" />
                  <p className="text-white/60 text-lg">
                    No tests available yet
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Students */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Top Students</h2>
              </div>

              {topStudents && topStudents.length > 0 ? (
                <div className="space-y-3">
                  {topStudents.slice(0, 5).map((student, index) => (
                    <div
                      key={student._id}
                      className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        {index < 3 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                            <Star className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate">
                          {student.student?.name || 'Unknown Student'}
                        </p>
                        <p className="text-white/60 text-sm">
                          Rank #{index + 1}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 px-2 py-1 rounded-full border border-emerald-400/30">
                          <span className="text-emerald-300 font-bold text-sm">
                            {student.totalScore}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="h-12 w-12 text-white/30 mx-auto mb-3" />
                  <p className="text-white/60">No rankings yet</p>
                </div>
              )}
            </div>

            {/* Members */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Members</h2>
              </div>

              {members && members.length > 0 ? (
                <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                  {members.map((member) => (
                    <div
                      key={member._id}
                      className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-all duration-200"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-white/80 text-sm truncate">
                        {member.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-white/30 mx-auto mb-3" />
                  <p className="text-white/60">No members yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style> */}
    </div>
  );
};

export default CategoryDetails;

// import { useLoaderData, Link, useParams } from 'react-router-dom';
// import { useDarkMode } from '../features/darkMode/useDarkMode';
// import { useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { addToCart } from '../store/slices/cartSlice';
// import { useDispatch } from 'react-redux';
// import {
//   Star,
//   Clock,
//   Video,
//   FileText,
//   Download,
//   Users,
//   Award,
//   PlayCircle,
//   CheckCircle,
//   Globe,
//   Calendar,
//   TrendingUp,
// } from 'lucide-react';
// import Button from './ui/Button';
// import YouTubeEmbed from './YouTubeEmbed';

// // Convert minutes to hours and minutes format
// const formatVideoLength = (minutes) => {
//   const hours = Math.floor(minutes / 60);
//   const mins = minutes % 60;
//   return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
// };

// // Format duration for individual videos
// const formatDuration = (seconds) => {
//   const minutes = Math.floor(seconds / 60);
//   const secs = seconds % 60;
//   return `${minutes}:${secs.toString().padStart(2, '0')}`;
// };

// const CourseDetails = () => {
//   const { course } = useLoaderData();
//   const { courseId } = useParams();
//   const { isDarkMode } = useDarkMode();
//   const { isAuthenticated, user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Check enrollment by seeing if user ID is in course.students
//   const isEnrolled = course.students?.includes(user?._id) || false;
//   const totalVideoLength = course.videoLength || 0;
//   const previewVideos = course.videos?.filter((video) => video.isPreview) || [];

//   const handleAddToCart = () => {
//     if (!isAuthenticated) {
//       toast.error('Please log in to add courses to cart');
//       navigate('/login');
//       return;
//     }
//     if (isEnrolled) {
//       toast.info('You are already enrolled in this course');
//       return;
//     }
//     dispatch(addToCart({ courseId: course._id, isFree: course.price === 0 }));
//   };

//   return (
//     <div
//       className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
//     >
//       {/* Hero Section */}
//       <div
//         className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-900'} text-white py-12 px-6`}
//       >
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Course Info */}
//             <div className="lg:w-2/3">
//               <div className="flex items-center text-sm text-gray-300 mb-4">
//                 <Link
//                   to="/courses"
//                   className="hover:text-white transition-colors"
//                 >
//                   All Courses
//                 </Link>
//                 <span className="mx-2">›</span>
//                 <span className="text-blue-400">
//                   {course.category?.name || 'Uncategorized'}
//                 </span>
//               </div>

//               <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
//                 {course.title}
//               </h1>
//               <p className="text-lg text-gray-300 mb-6 leading-relaxed">
//                 {course.description}
//               </p>

//               <div className="flex flex-wrap items-center gap-6 text-sm">
//                 <div className="flex items-center gap-2">
//                   <div className="flex items-center">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className={`w-4 h-4 ${i < Math.floor(course.ratingsAverage || 0) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
//                       />
//                     ))}
//                   </div>
//                   <span className="font-semibold text-yellow-400">
//                     {course.ratingsAverage?.toFixed(1) || 'N/A'}
//                   </span>
//                   <span className="text-gray-300">
//                     ({course.ratingsQuantity || 0} ratings)
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-1 text-gray-300">
//                   <Users className="w-4 h-4" />
//                   <span>{course.students?.length || 0} students</span>
//                 </div>

//                 <div className="flex items-center gap-1 text-gray-300">
//                   <Award className="w-4 h-4" />
//                   <span>Created by {course.instructor?.name || 'N/A'}</span>
//                 </div>
//               </div>

//               <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 mt-4">
//                 <div className="flex items-center gap-1">
//                   <Calendar className="w-4 h-4" />
//                   <span>
//                     Last updated{' '}
//                     {new Date(course.updatedAt).toLocaleDateString('en-US', {
//                       month: 'long',
//                       year: 'numeric',
//                     })}
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-1">
//                   <Globe className="w-4 h-4" />
//                   <span>English</span>
//                 </div>
//               </div>
//             </div>

//             {/* Course Preview Card - Mobile */}
//             <div className="lg:hidden">
//               <div
//                 className={`rounded-xl shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
//               >
//                 <img
//                   src={course.coverPhoto || '/placeholder.png'}
//                   alt={course.title}
//                   className="w-full h-48 object-cover"
//                   onError={(e) => (e.target.src = '/placeholder.png')}
//                 />
//                 <div
//                   className={`p-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
//                 >
//                   <div className="mb-3">
//                     {course.priceAfterDiscount > 0 ? (
//                       <div className="flex items-center space-x-2">
//                         <span className="text-2xl font-bold text-green-600">
//                           ${course.priceAfterDiscount.toFixed(2)}
//                         </span>
//                         <span
//                           className={`text-lg line-through ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
//                         >
//                           ${course.price.toFixed(2)}
//                         </span>
//                         <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                           {Math.round(
//                             ((course.price - course.priceAfterDiscount) /
//                               course.price) *
//                               100
//                           )}
//                           % OFF
//                         </span>
//                       </div>
//                     ) : (
//                       <span className="text-2xl font-bold">
//                         {course.price === 0
//                           ? 'Free'
//                           : `$${course.price.toFixed(2)}`}
//                       </span>
//                     )}
//                   </div>

//                   {!isEnrolled ? (
//                     <Button
//                       onClick={handleAddToCart}
//                       className={`w-full mb-3 py-2 text-base font-semibold ${course.price === 0 ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
//                     >
//                       {course.price === 0 ? 'Enroll Now' : 'Add to Cart'}
//                     </Button>
//                   ) : (
//                     <Button className="w-full mb-3 py-2 text-base font-semibold bg-green-600 hover:bg-green-700">
//                       Go to Course
//                     </Button>
//                   )}

//                   <div className="space-y-2 text-sm">
//                     <div className="flex items-center gap-2">
//                       <CheckCircle className="w-4 h-4 text-green-500" />
//                       <span>{course.videos?.length || 0} video lessons</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Clock className="w-4 h-4 text-blue-500" />
//                       <span>
//                         {formatVideoLength(totalVideoLength)} total length
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <FileText className="w-4 h-4 text-purple-500" />
//                       <span>
//                         {course.resources?.length || 0} downloadable resources
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <TrendingUp className="w-4 h-4 text-yellow-500" />
//                       <span>{course.level || 'All Levels'}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
//         {/* Left Column */}
//         <div className="lg:w-2/3 space-y-6">
//           {/* What You'll Learn */}
//           <section
//             className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}
//           >
//             <h2 className="text-2xl font-bold mb-4">What you Will learn</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {course.learningOutcomes?.map((outcome, index) => (
//                 <div key={index} className="flex items-start gap-3">
//                   <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-500" />
//                   <span>{outcome}</span>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Course Content */}
//           <section
//             className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}
//           >
//             <h2 className="text-2xl font-bold mb-6">Course content</h2>
//             <p className="mb-4">
//               {course.videos?.length || 0} sections •{' '}
//               {course.videos?.length || 0} lectures •{' '}
//               {formatVideoLength(totalVideoLength)} total length
//             </p>

//             <div className="space-y-4">
//               {course.sections?.map((section, sectionIndex) => (
//                 <div
//                   key={sectionIndex}
//                   className="border rounded-lg overflow-hidden"
//                 >
//                   <div
//                     className={`p-4 font-medium ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
//                   >
//                     <h3 className="flex items-center justify-between">
//                       <span>
//                         Section {sectionIndex + 1}: {section.title}
//                       </span>
//                       <span className="text-sm text-gray-500">
//                         {section.videos?.length || 0} lectures •{' '}
//                         {formatVideoLength(
//                           section.videos?.reduce(
//                             (acc, video) => acc + video.duration,
//                             0
//                           ) || 0
//                         )}
//                       </span>
//                     </h3>
//                   </div>
//                   <div className="divide-y">
//                     {section.videos?.map((video, videoIndex) => (
//                       <div
//                         key={videoIndex}
//                         className={`p-4 flex items-center justify-between ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'}`}
//                       >
//                         <div className="flex items-center gap-3">
//                           <PlayCircle className="w-5 h-5 text-gray-500" />
//                           <span>
//                             {videoIndex + 1}. {video.title}
//                           </span>
//                           {video.isPreview && !isEnrolled && (
//                             <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
//                               Preview
//                             </span>
//                           )}
//                         </div>
//                         <span className="text-sm text-gray-500">
//                           {formatDuration(video.duration)}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Requirements */}
//           {course.requirements?.length > 0 && (
//             <section
//               className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}
//             >
//               <h2 className="text-2xl font-bold mb-4">Requirements</h2>
//               <ul className="list-disc pl-6 space-y-2">
//                 {course.requirements.map((req, index) => (
//                   <li key={index}>{req}</li>
//                 ))}
//               </ul>
//             </section>
//           )}

//           {/* Description */}
//           <section
//             className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}
//           >
//             <h2 className="text-2xl font-bold mb-4">Description</h2>
//             <div className="prose max-w-none">
//               {course.fullDescription ||
//                 course.description ||
//                 'No description available.'}
//             </div>
//           </section>

//           {/* Instructor */}
//           <section
//             className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}
//           >
//             <h2 className="text-2xl font-bold mb-6">Instructor</h2>
//             <div className="flex flex-col md:flex-row gap-6">
//               <div className="flex-shrink-0">
//                 <img
//                   src={course.instructor?.photo || '/placeholder-user.png'}
//                   alt={course.instructor?.name}
//                   className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
//                   onError={(e) => (e.target.src = '/placeholder-user.png')}
//                 />
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold mb-1">
//                   {course.instructor?.name}
//                 </h3>
//                 <p className="text-gray-500 mb-4">{course.instructor?.title}</p>
//                 <div className="flex flex-wrap items-center gap-4 mb-4">
//                   <div className="flex items-center gap-1">
//                     <Star className="w-5 h-5 text-yellow-500" />
//                     <span>
//                       {course.instructor?.ratingsAverage?.toFixed(1) || 'N/A'}{' '}
//                       Instructor Rating
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Users className="w-5 h-5 text-blue-500" />
//                     <span>{course.instructor?.students || 0} Students</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <PlayCircle className="w-5 h-5 text-purple-500" />
//                     <span>{course.instructor?.courses || 0} Courses</span>
//                   </div>
//                 </div>
//                 <p className="mb-4">{course.instructor?.bio}</p>
//                 <Button
//                   variant="outline"
//                   className="border-blue-500 text-blue-500 hover:bg-blue-500/10"
//                 >
//                   View Profile
//                 </Button>
//               </div>
//             </div>
//           </section>
//         </div>

//         {/* Right Column - Desktop */}
//         <div className="lg:w-1/3">
//           <div
//             className={`sticky top-4 rounded-xl shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
//           >
//             <img
//               src={course.coverPhoto || '/placeholder.png'}
//               alt={course.title}
//               className="w-full h-48 object-cover"
//               onError={(e) => (e.target.src = '/placeholder.png')}
//             />
//             <div
//               className={`p-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
//             >
//               <div className="mb-4">
//                 {course.priceAfterDiscount > 0 ? (
//                   <div className="flex items-center space-x-2">
//                     <span className="text-2xl font-bold text-green-600">
//                       ${course.priceAfterDiscount.toFixed(2)}
//                     </span>
//                     <span
//                       className={`text-lg line-through ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
//                     >
//                       ${course.price.toFixed(2)}
//                     </span>
//                     <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                       {Math.round(
//                         ((course.price - course.priceAfterDiscount) /
//                           course.price) *
//                           100
//                       )}
//                       % OFF
//                     </span>
//                   </div>
//                 ) : (
//                   <span className="text-2xl font-bold">
//                     {course.price === 0
//                       ? 'Free'
//                       : `$${course.price.toFixed(2)}`}
//                   </span>
//                 )}
//               </div>

//               {!isEnrolled ? (
//                 <Button
//                   onClick={handleAddToCart}
//                   className={`w-full mb-4 py-3 text-lg font-semibold ${course.price === 0 ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
//                 >
//                   {course.price === 0 ? 'Enroll Now' : 'Add to Cart'}
//                 </Button>
//               ) : (
//                 <Button className="w-full mb-4 py-3 text-lg font-semibold bg-green-600 hover:bg-green-700">
//                   Go to Course
//                 </Button>
//               )}

//               <div className="space-y-3 mb-6">
//                 <div className="flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-green-500" />
//                   <span>{course.videos?.length || 0} video lessons</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Clock className="w-5 h-5 text-blue-500" />
//                   <span>
//                     {formatVideoLength(totalVideoLength)} total length
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <FileText className="w-5 h-5 text-purple-500" />
//                   <span>
//                     {course.resources?.length || 0} downloadable resources
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <TrendingUp className="w-5 h-5 text-yellow-500" />
//                   <span>{course.level || 'All Levels'}</span>
//                 </div>
//               </div>

//               {/* Share and Gift buttons */}
//               <div className="flex gap-2">
//                 <Button
//                   variant="outline"
//                   className={`flex-1 ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'}`}
//                 >
//                   Share
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className={`flex-1 ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'}`}
//                 >
//                   Gift this course
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Preview Videos */}
//           {previewVideos.length > 0 && (
//             <div
//               className={`mt-6 rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}
//             >
//               <h3 className="font-bold mb-4">Free preview</h3>
//               <div className="space-y-4">
//                 {previewVideos.map((video) => (
//                   <div key={video._id} className="space-y-2">
//                     <YouTubeEmbed
//                       videoId={video.youtubeId}
//                       title={video.title}
//                     />
//                     <p className="font-medium">{video.title}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetails;
