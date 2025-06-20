// // import { useParams, useNavigate, Link } from 'react-router-dom';
// // import { useLoaderData } from 'react-router-dom';
// // import {
// //   PlayCircle,
// //   ChevronLeft,
// //   ChevronRight,
// //   CheckCircle,
// // } from 'lucide-react';
// // import { useDarkMode } from '../features/darkMode/useDarkMode';
// // import VideoPlayer from './VideoPlayer';

// // const CourseVideoPage = () => {
// //   const { videos } = useLoaderData();
// //   const { isDarkMode } = useDarkMode();
// //   const navigate = useNavigate();
// //   const { courseId, videoId } = useParams();

// //   // Find current video and its index
// //   const currentVideo =
// //     videos.find((video) => video._id === videoId) || videos[0];
// //   const currentIndex = videos.findIndex((video) => video._id === videoId);
// //   const hasNext = currentIndex < videos.length - 1;
// //   const hasPrev = currentIndex > 0;

// //   const handleNext = () => {
// //     if (hasNext) {
// //       navigate(`/courses/${courseId}/videos/${videos[currentIndex + 1]._id}`);
// //     }
// //   };

// //   const handlePrev = () => {
// //     if (hasPrev) {
// //       navigate(`/courses/${courseId}/videos/${videos[currentIndex - 1]._id}`);
// //     }
// //   };

// //   // Format duration in MM:SS
// //   const formatDuration = (seconds) => {
// //     const minutes = Math.floor(seconds / 60);
// //     const secs = seconds % 60;
// //     return `${minutes}:${secs.toString().padStart(2, '0')}`;
// //   };

// //   return (
// //     <div
// //       dir="rtl"
// //       className={`min-h-screen ${isDarkMode ? 'dark bg-gray-950' : 'bg-gray-50'}`}
// //     >
// //       {/* Header */}
// //       <header
// //         className={`sticky top-0 z-10 p-4 border-b ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}
// //       >
// //         <div className="max-w-7xl mx-auto flex items-center justify-between">
// //           <Link
// //             to={`/courses/${courseId}`}
// //             className="flex items-center text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
// //           >
// //             <ChevronLeft className="w-5 h-5 mr-1" />
// //             العودة إلى الدورة
// //           </Link>
// //           <h1 className="text-xl font-bold truncate max-w-md">
// //             {currentVideo.title}
// //           </h1>
// //           <div className="w-24"></div> {/* Spacer for balance */}
// //         </div>
// //       </header>

// //       {/* Main Content */}
// //       <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
// //         {/* Video Player Section (70% width) */}
// //         <div className="lg:w-3/4 p-4">
// //           <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
// //             <VideoPlayer url={currentVideo.url} className="w-full h-full" />
// //           </div>

// //           {/* Video Info */}
// //           <div
// //             className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow`}
// //           >
// //             <h2 className="text-xl font-bold mb-2">{currentVideo.title}</h2>
// //             <div className="flex items-center justify-between mb-4">
// //               <span
// //                 className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
// //               >
// //                 الدرس {currentIndex + 1} من {videos.length}
// //               </span>
// //               <span
// //                 className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
// //               >
// //                 المدة: {formatDuration(currentVideo.duration)}
// //               </span>
// //             </div>

// //             {/* Navigation Buttons */}
// //             <div className="flex justify-between gap-4 mb-6">
// //               <button
// //                 onClick={handlePrev}
// //                 disabled={!hasPrev}
// //                 className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
// //                   isDarkMode
// //                     ? 'bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800/50'
// //                     : 'bg-gray-200 hover:bg-gray-300 disabled:bg-gray-200/50'
// //                 }`}
// //               >
// //                 <ChevronRight className="w-5 h-5" />
// //                 السابق
// //               </button>
// //               <button
// //                 onClick={handleNext}
// //                 disabled={!hasNext}
// //                 className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
// //                   isDarkMode
// //                     ? 'bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800/50'
// //                     : 'bg-gray-200 hover:bg-gray-300 disabled:bg-gray-200/50'
// //                 }`}
// //               >
// //                 التالي
// //                 <ChevronLeft className="w-5 h-5" />
// //               </button>
// //             </div>

// //             {/* Video Description - Removed since not in your data structure */}
// //           </div>
// //         </div>

// //         {/* Videos List Sidebar (30% width) */}
// //         <div
// //           className={`lg:w-1/4 p-4 border-l ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
// //         >
// //           <div className="sticky top-20">
// //             <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
// //               <span>فهرس الدروس</span>
// //               <span className="text-sm font-normal">{videos.length} دروس</span>
// //             </h3>

// //             <div className="space-y-1 max-h-[calc(100vh-180px)] overflow-y-auto">
// //               {videos.map((video, index) => (
// //                 <Link
// //                   key={video._id}
// //                   to={`/courses/${courseId}/videos/${video._id}`}
// //                   className={`block p-3 rounded-lg transition-colors ${
// //                     video._id === currentVideo._id
// //                       ? isDarkMode
// //                         ? 'bg-blue-900/50 border border-blue-700'
// //                         : 'bg-blue-100 border border-blue-200'
// //                       : isDarkMode
// //                         ? 'hover:bg-gray-800'
// //                         : 'hover:bg-gray-100'
// //                   }`}
// //                 >
// //                   <div className="flex items-start gap-3">
// //                     <div className="relative">
// //                       {video._id === currentVideo._id ? (
// //                         <PlayCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
// //                       ) : (
// //                         <span
// //                           className={`w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0 ${
// //                             isDarkMode ? 'text-gray-400' : 'text-gray-500'
// //                           }`}
// //                         >
// //                           {index + 1}
// //                         </span>
// //                       )}
// //                     </div>
// //                     <div className="flex-1 min-w-0">
// //                       <h4
// //                         className={`text-sm font-medium truncate ${
// //                           video._id === currentVideo._id
// //                             ? 'text-blue-500'
// //                             : isDarkMode
// //                               ? 'text-gray-300'
// //                               : 'text-gray-800'
// //                         }`}
// //                       >
// //                         {video.title}
// //                       </h4>
// //                       <div className="flex items-center justify-between mt-1">
// //                         <span
// //                           className={`text-xs ${
// //                             isDarkMode ? 'text-gray-500' : 'text-gray-500'
// //                           }`}
// //                         >
// //                           {formatDuration(video.duration)}
// //                         </span>
// //                         {video.isPreview && (
// //                           <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
// //                             معاينة
// //                           </span>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </Link>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CourseVideoPage;

// import { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { useLoaderData } from 'react-router-dom';
// import {
//   PlayCircle,
//   ChevronLeft,
//   ChevronRight,
//   CheckCircle,
//   Clock,
//   Download,
//   BookOpen,
//   Users,
//   Star,
//   Volume2,
//   VolumeX,
//   Maximize,
//   Settings,
//   RotateCcw,
//   Share2,
//   Heart,
//   MessageSquare,
//   Eye,
//   Award,
//   Target,
//   Bookmark,
//   BookmarkCheck,
//   SkipForward,
//   Play,
//   Pause,
//   RefreshCw,
// } from 'lucide-react';
// import { useDarkMode } from '../features/darkMode/useDarkMode';
// import VideoPlayer from './VideoPlayer';

// const CourseVideoPage = () => {
//   const { videos } = useLoaderData();
//   const { isDarkMode } = useDarkMode();
//   const navigate = useNavigate();
//   const { courseId, videoId } = useParams();

//   // Enhanced state management
//   const [watchedVideos, setWatchedVideos] = useState(new Set());
//   const [bookmarkedVideos, setBookmarkedVideos] = useState(new Set());
//   const [videoProgress, setVideoProgress] = useState({});
//   const [showNotes, setShowNotes] = useState(false);
//   const [notes, setNotes] = useState('');
//   const [isAutoPlay, setIsAutoPlay] = useState(true);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1);
//   const [showStats, setShowStats] = useState(false);
//   const [liked, setLiked] = useState(false);
//   const [rating, setRating] = useState(0);

//   // Find current video and its index
//   const currentVideo = videos.find((video) => video._id === videoId) || videos[0];
//   const currentIndex = videos.findIndex((video) => video._id === videoId);
//   const hasNext = currentIndex < videos.length - 1;
//   const hasPrev = currentIndex > 0;

//   // Calculate course progress
//   const totalVideos = videos.length;
//   const watchedCount = watchedVideos.size;
//   const progressPercentage = Math.round((watchedCount / totalVideos) * 100);

//   const handleNext = () => {
//     if (hasNext) {
//       navigate(`/courses/${courseId}/videos/${videos[currentIndex + 1]._id}`);
//     }
//   };

//   const handlePrev = () => {
//     if (hasPrev) {
//       navigate(`/courses/${courseId}/videos/${videos[currentIndex - 1]._id}`);
//     }
//   };

//   const handleVideoProgress = (currentTime, duration) => {
//     const progress = (currentTime / duration) * 100;
//     setVideoProgress((prev) => ({
//       ...prev,
//       [currentVideo._id]: progress,
//     }));

//     // Mark as watched when 80% completed
//     if (progress >= 80) {
//       setWatchedVideos((prev) => new Set([...prev, currentVideo._id]));
//     }
//   };

//   const handleVideoEnded = () => {
//     setWatchedVideos((prev) => new Set([...prev, currentVideo._id]));

//     // Auto-play next video if enabled
//     if (isAutoPlay && hasNext) {
//       setTimeout(() => handleNext(), 2000);
//     }
//   };

//   const toggleBookmark = (videoId) => {
//     setBookmarkedVideos((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(videoId)) {
//         newSet.delete(videoId);
//       } else {
//         newSet.add(videoId);
//       }
//       return newSet;
//     });
//   };

//   const formatDuration = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}:${secs.toString().padStart(2, '0')}`;
//   };

//   const calculateTotalDuration = () => {
//     const total = videos.reduce((sum, video) => sum + video.duration, 0);
//     const hours = Math.floor(total / 3600);
//     const minutes = Math.floor((total % 3600) / 60);
//     return `${hours}س ${minutes}د`;
//   };

//   return (
//     <div dir="rtl" className={`min-h-screen ${isDarkMode ? 'dark bg-gray-950' : 'bg-gray-50'}`}>
//       {/* Enhanced Header */}
//       <header
//         className={`sticky top-0 z-20 p-4 border-b backdrop-blur-sm ${
//           isDarkMode
//             ? 'bg-gray-900/95 border-gray-800'
//             : 'bg-white/95 border-gray-200'
//         }`}
//       >
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center justify-between mb-2">
//             <Link
//               to={`/courses/${courseId}`}
//               className="flex items-center text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//             >
//               <ChevronLeft className="w-5 h-5 mr-1" />
//               العودة إلى الدورة
//             </Link>

//             <div className="flex items-center space-x-2 space-x-reverse">
//               <button
//                 onClick={() => setLiked(!liked)}
//                 className={`p-2 rounded-lg transition-colors ${
//                   liked
//                     ? 'text-red-500 bg-red-50'
//                     : 'text-gray-500 hover:bg-gray-100'
//                 }`}
//               >
//                 <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
//               </button>
//               <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
//                 <Share2 className="w-5 h-5" />
//               </button>
//               <button
//                 onClick={() => setShowStats(!showStats)}
//                 className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
//               >
//                 <Settings className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <h1 className="text-xl font-bold truncate max-w-md">
//               {currentVideo.title}
//             </h1>

//             {/* Progress Bar */}
//             <div className="flex items-center space-x-3 space-x-reverse">
//               <div className="text-sm text-gray-600">
//                 <span className="font-medium">{watchedCount}</span> من{' '}
//                 {totalVideos} دروس
//               </div>
//               <div className="w-32 bg-gray-200 rounded-full h-2 overflow-hidden">
//                 <div
//                   className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
//                   style={{ width: `${progressPercentage}%` }}
//                 ></div>
//               </div>
//               <span className="text-sm font-medium text-green-600">
//                 {progressPercentage}%
//               </span>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Stats Panel */}
//       {showStats && (
//         <div
//           className={`p-4 border-b ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-blue-50 border-gray-200'}`}
//         >
//           <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="text-center">
//               <div className="text-2xl font-bold text-blue-600">
//                 {watchedCount}
//               </div>
//               <div className="text-sm text-gray-600">دروس مكتملة</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-green-600">
//                 {calculateTotalDuration()}
//               </div>
//               <div className="text-sm text-gray-600">إجمالي المدة</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-purple-600">
//                 {bookmarkedVideos.size}
//               </div>
//               <div className="text-sm text-gray-600">دروس محفوظة</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-orange-600">
//                 {progressPercentage}%
//               </div>
//               <div className="text-sm text-gray-600">نسبة الإنجاز</div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
//         {/* Video Player Section */}
//         <div className="lg:w-3/4 p-4">
//           <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4 relative group">
//             <VideoPlayer
//               url={currentVideo.url}
//               className="w-full h-full"
//               onProgress={handleVideoProgress}
//               onEnded={handleVideoEnded}
//             />

//             {/* Auto-play notification */}
//             {isAutoPlay && hasNext && (
//               <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center">
//                 <SkipForward className="w-4 h-4 mr-1" />
//                 التشغيل التلقائي مفعل
//               </div>
//             )}
//           </div>

//           {/* Enhanced Video Info */}
//           <div
//             className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg mb-4`}
//           >
//             <div className="flex items-start justify-between mb-4">
//               <div>
//                 <h2 className="text-2xl font-bold mb-2 flex items-center">
//                   {currentVideo.title}
//                   {watchedVideos.has(currentVideo._id) && (
//                     <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
//                   )}
//                 </h2>
//                 <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
//                   <span className="flex items-center">
//                     <BookOpen className="w-4 h-4 ml-1" />
//                     الدرس {currentIndex + 1} من {videos.length}
//                   </span>
//                   <span className="flex items-center">
//                     <Clock className="w-4 h-4 ml-1" />
//                     {formatDuration(currentVideo.duration)}
//                   </span>
//                 </div>
//               </div>

//               <button
//                 onClick={() => toggleBookmark(currentVideo._id)}
//                 className={`p-3 rounded-lg transition-all ${
//                   bookmarkedVideos.has(currentVideo._id)
//                     ? 'bg-yellow-100 text-yellow-600'
//                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                 }`}
//               >
//                 {bookmarkedVideos.has(currentVideo._id) ? (
//                   <BookmarkCheck className="w-6 h-6" />
//                 ) : (
//                   <Bookmark className="w-6 h-6" />
//                 )}
//               </button>
//             </div>

//             {/* Video Progress */}
//             {videoProgress[currentVideo._id] && (
//               <div className="mb-4">
//                 <div className="flex justify-between items-center mb-1">
//                   <span className="text-sm text-gray-600">التقدم في الدرس</span>
//                   <span className="text-sm font-medium">
//                     {Math.round(videoProgress[currentVideo._id])}%
//                   </span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div
//                     className="bg-blue-500 h-2 rounded-full transition-all duration-300"
//                     style={{ width: `${videoProgress[currentVideo._id]}%` }}
//                   ></div>
//                 </div>
//               </div>
//             )}

//             {/* Enhanced Navigation */}
//             <div className="flex justify-between gap-4 mb-4">
//               <button
//                 onClick={handlePrev}
//                 disabled={!hasPrev}
//                 className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-all ${
//                   isDarkMode
//                     ? 'bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800/50'
//                     : 'bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100/50'
//                 } ${!hasPrev ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
//               >
//                 <ChevronRight className="w-5 h-5" />
//                 الدرس السابق
//               </button>

//               <button
//                 onClick={() => setIsAutoPlay(!isAutoPlay)}
//                 className={`px-4 py-3 rounded-lg transition-all ${
//                   isAutoPlay
//                     ? 'bg-blue-600 text-white hover:bg-blue-700'
//                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                 }`}
//               >
//                 <SkipForward className="w-5 h-5" />
//               </button>

//               <button
//                 onClick={handleNext}
//                 disabled={!hasNext}
//                 className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-all ${
//                   isDarkMode
//                     ? 'bg-blue-800 hover:bg-blue-700 disabled:bg-gray-800/50 text-white'
//                     : 'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100/50 text-white'
//                 } ${!hasNext ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
//               >
//                 الدرس التالي
//                 <ChevronLeft className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Quick Actions */}
//             <div className="flex items-center justify-between pt-4 border-t border-gray-200">
//               <div className="flex space-x-2 space-x-reverse">
//                 <button className="flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
//                   <Download className="w-4 h-4 ml-1" />
//                   تحميل
//                 </button>
//                 <button
//                   onClick={() => setShowNotes(!showNotes)}
//                   className="flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
//                 >
//                   <MessageSquare className="w-4 h-4 ml-1" />
//                   ملاحظات
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Notes Section */}
//           {showNotes && (
//             <div
//               className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}
//             >
//               <h3 className="text-lg font-semibold mb-3 flex items-center">
//                 <MessageSquare className="w-5 h-5 ml-2" />
//                 ملاحظاتي
//               </h3>
//               <textarea
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//                 placeholder="اكتب ملاحظاتك هنا..."
//                 className={`w-full p-3 border rounded-lg resize-none ${
//                   isDarkMode
//                     ? 'bg-gray-800 border-gray-700 text-white'
//                     : 'bg-gray-50 border-gray-300'
//                 }`}
//                 rows="4"
//               />
//               <div className="flex justify-end mt-2">
//                 <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                   حفظ الملاحظات
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Enhanced Videos List Sidebar */}
//         <div
//           className={`lg:w-1/4 p-4 border-l ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
//         >
//           <div className="sticky top-20">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-bold flex items-center">
//                 <BookOpen className="w-5 h-5 ml-2" />
//                 فهرس الدروس
//               </h3>
//               <div className="text-sm text-gray-500">{videos.length} دروس</div>
//             </div>

//             {/* Course Progress Summary */}
//             <div
//               className={`p-3 rounded-lg mb-4 ${isDarkMode ? 'bg-gray-900' : 'bg-blue-50'}`}
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm font-medium">تقدم الدورة</span>
//                 <span className="text-sm text-blue-600 font-bold">
//                   {progressPercentage}%
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
//                 <div
//                   className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
//                   style={{ width: `${progressPercentage}%` }}
//                 ></div>
//               </div>
//               <div className="flex items-center justify-between text-xs text-gray-600">
//                 <span>{watchedCount} مكتمل</span>
//                 <span>{totalVideos - watchedCount} متبقي</span>
//               </div>
//             </div>

//             <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto">
//               {videos.map((video, index) => {
//                 const isWatched = watchedVideos.has(video._id);
//                 const isBookmarked = bookmarkedVideos.has(video._id);
//                 const isCurrent = video._id === currentVideo._id;
//                 const progress = videoProgress[video._id] || 0;

//                 return (
//                   <Link
//                     key={video._id}
//                     to={`/courses/${courseId}/videos/${video._id}`}
//                     className={`block p-3 rounded-lg transition-all hover:shadow-md ${
//                       isCurrent
//                         ? isDarkMode
//                           ? 'bg-blue-900/50 border border-blue-700 shadow-lg'
//                           : 'bg-blue-100 border border-blue-200 shadow-lg'
//                         : isDarkMode
//                           ? 'hover:bg-gray-800'
//                           : 'hover:bg-gray-50'
//                     }`}
//                   >
//                     <div className="flex items-start gap-3">
//                       <div className="relative flex-shrink-0">
//                         {isCurrent ? (
//                           <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
//                             <PlayCircle className="w-4 h-4 text-white" />
//                           </div>
//                         ) : isWatched ? (
//                           <CheckCircle className="w-6 h-6 text-green-500" />
//                         ) : (
//                           <div
//                             className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium ${
//                               isDarkMode
//                                 ? 'border-gray-600 text-gray-400'
//                                 : 'border-gray-300 text-gray-500'
//                             }`}
//                           >
//                             {index + 1}
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-start justify-between">
//                           <h4
//                             className={`text-sm font-medium leading-tight ${
//                               isCurrent
//                                 ? 'text-blue-600'
//                                 : isWatched
//                                   ? 'text-green-600'
//                                   : isDarkMode
//                                     ? 'text-gray-300'
//                                     : 'text-gray-800'
//                             }`}
//                           >
//                             {video.title}
//                           </h4>
//                           {isBookmarked && (
//                             <Bookmark className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
//                           )}
//                         </div>

//                         <div className="flex items-center justify-between mt-2">
//                           <span
//                             className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}
//                           >
//                             {formatDuration(video.duration)}
//                           </span>
//                           <div className="flex items-center space-x-1 space-x-reverse">
//                             {video.isPreview && (
//                               <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
//                                 معاينة
//                               </span>
//                             )}
//                             {isWatched && (
//                               <Award className="w-3 h-3 text-yellow-500" />
//                             )}
//                           </div>
//                         </div>

//                         {/* Progress bar for partially watched videos */}
//                         {progress > 0 && progress < 100 && (
//                           <div className="mt-2">
//                             <div className="w-full bg-gray-200 rounded-full h-1">
//                               <div
//                                 className="bg-blue-500 h-1 rounded-full transition-all duration-300"
//                                 style={{ width: `${progress}%` }}
//                               ></div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </Link>
//                 );
//               })}
//             </div>

//             {/* Course completion achievement */}
//             {progressPercentage === 100 && (
//               <div className="mt-4 p-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg text-white text-center">
//                 <Award className="w-8 h-8 mx-auto mb-2" />
//                 <div className="font-bold">تهانينا! 🎉</div>
//                 <div className="text-sm">لقد أكملت الدورة بنجاح</div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseVideoPage;

import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { useLoaderData } from 'react-router-dom';
import {
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  Download,
  BookOpen,
  Users,
  Star,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  RotateCcw,
  Share2,
  Heart,
  MessageSquare,
  Eye,
  Award,
  Target,
  Bookmark,
  BookmarkCheck,
  SkipForward,
  Play,
  Pause,
  RefreshCw,
  Send,
  ThumbsUp,
  ThumbsDown,
  Reply,
  MoreVertical,
  User,
  Edit3,
  Trash2,
  Flag,
} from 'lucide-react';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import VideoPlayer from './VideoPlayer';
import Certificate from './Certificate';

const CourseVideoPage = () => {
  const { videos } = useLoaderData();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { courseId, videoId } = useParams();

  // Enhanced state management
  const [watchedVideos, setWatchedVideos] = useState(new Set());
  const [bookmarkedVideos, setBookmarkedVideos] = useState(new Set());
  const [videoProgress, setVideoProgress] = useState({});
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showStats, setShowStats] = useState(false);
  const [liked, setLiked] = useState(false);
  const [rating, setRating] = useState(0);

  // Comment system state
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showComments, setShowComments] = useState(true);
  const [commentLikes, setCommentLikes] = useState({});

  // Find current video and its index
  //   const currentVideo =
  //     videos.find((video) => video._id === videoId) || videos[0];
  const currentVideo =
    videos.find((video) => video._id === videoId) || videos[0];
  const currentIndex = videos.findIndex((video) => video._id === videoId);
  const hasNext = currentIndex < videos.length - 1;
  const hasPrev = currentIndex > 0;

  // Calculate course progress
  const totalVideos = videos.length;
  const watchedCount = watchedVideos.size;
  //   const progressPercentage = Math.round((watchedCount / totalVideos) * 100);
  const progressPercentage = Math.round(
    ((currentIndex + 1) / totalVideos) * 100
  );

  // Load comments for current video
  useEffect(() => {
    // Load comments from your API/database for current video
    // This is where you'd fetch real comments data
    setComments([]);
    setNewComment('');
    setReplyingTo(null);
  }, [videoId]);

  const handleNext = () => {
    if (hasNext) {
      navigate(`/courses/${courseId}/videos/${videos[currentIndex + 1]._id}`);
    }
  };

  const handlePrev = () => {
    if (hasPrev) {
      navigate(`/courses/${courseId}/videos/${videos[currentIndex - 1]._id}`);
    }
  };

  const handleVideoProgress = (currentTime, duration) => {
    const progress = (currentTime / duration) * 100;
    setVideoProgress((prev) => ({
      ...prev,
      [currentVideo._id]: progress,
    }));

    // Mark as watched when 80% completed
    if (progress >= 80) {
      setWatchedVideos((prev) => new Set([...prev, currentVideo._id]));
    }
  };

  const handleVideoEnded = () => {
    setWatchedVideos((prev) => new Set([...prev, currentVideo._id]));

    // Auto-play next video if enabled
    if (isAutoPlay && hasNext) {
      setTimeout(() => handleNext(), 2000);
    }
  };

  const toggleBookmark = (videoId) => {
    setBookmarkedVideos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      text: newComment,
      author: 'المستخدم الحالي', // Replace with actual user data
      avatar: null,
      timestamp: new Date(),
      likes: 0,
      replies: [],
    };

    setComments((prev) => [comment, ...prev]);
    setNewComment('');
  };

  const handleAddReply = (commentId) => {
    if (!replyText.trim()) return;

    const reply = {
      id: Date.now(),
      text: replyText,
      author: 'المستخدم الحالي', // Replace with actual user data
      avatar: null,
      timestamp: new Date(),
      likes: 0,
    };

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      )
    );

    setReplyText('');
    setReplyingTo(null);
  };

  const toggleCommentLike = (commentId, isReply = false, parentId = null) => {
    const key = isReply ? `${parentId}-${commentId}` : commentId;
    setCommentLikes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    if (isReply) {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === parentId
            ? {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply.id === commentId
                    ? {
                        ...reply,
                        likes: reply.likes + (commentLikes[key] ? -1 : 1),
                      }
                    : reply
                ),
              }
            : comment
        )
      );
    } else {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                likes: comment.likes + (commentLikes[key] ? -1 : 1),
              }
            : comment
        )
      );
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateTotalDuration = () => {
    const total = videos.reduce((sum, video) => sum + video.duration, 0);
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    return `${hours}س ${minutes}د`;
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (hours < 24) return `منذ ${hours} ساعة`;
    return `منذ ${days} يوم`;
  };

  return (
    <div
      dir="rtl"
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Enhanced Header */}
      <header
        className={`sticky top-0 z-20 border-b backdrop-blur-md transition-colors duration-300 ${
          isDarkMode
            ? 'bg-gray-900/95 border-gray-800 shadow-lg shadow-gray-900/20'
            : 'bg-white/95 border-gray-200 shadow-lg shadow-gray-200/20'
        }`}
      >
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between mb-3">
            <Link
              to={`/courses/${courseId}`}
              className={`flex items-center transition-all duration-200 hover:scale-105 ${
                isDarkMode
                  ? 'text-blue-400 hover:text-blue-300'
                  : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              العودة إلى الدورة
            </Link>

            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => setLiked(!liked)}
                className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 ${
                  liked
                    ? 'text-red-500 bg-red-500/10 shadow-lg shadow-red-500/20'
                    : isDarkMode
                      ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-300'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              </button>
              <button
                className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 ${
                  isDarkMode
                    ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-300'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-600'
                }`}
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowStats(!showStats)}
                className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 ${
                  showStats
                    ? isDarkMode
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-blue-100 text-blue-600'
                    : isDarkMode
                      ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-300'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-600'
                }`}
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h5
              className={`text-md font-bold    max-w-lg ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}
            >
              {currentVideo.title}
            </h5>

            {/* Enhanced Progress Bar */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <div
                className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                {/* <span className="font-medium text-blue-500">
                  {watchedCount}
                </span>{' '} */}
                {/* من {totalVideos} دروس */}
                <span className="font-medium text-blue-500">
                  {currentIndex + 1}
                </span>{' '}
                من {totalVideos} دروس
              </div>

              <div
                className={`w-40 h-3 rounded-full overflow-hidden shadow-inner ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                }`}
              >
                <div
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-full rounded-full transition-all duration-700 ease-out shadow-lg"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <span className="text-sm font-bold text-green-500 min-w-[40px]">
                {progressPercentage}%
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Stats Panel */}
      {showStats && (
        <div
          className={`border-b transition-all duration-300 ${
            isDarkMode
              ? 'bg-gray-900/50 border-gray-800 backdrop-blur-sm'
              : 'bg-blue-50/80 border-gray-200 backdrop-blur-sm'
          }`}
        >
          <div className="max-w-7xl mx-auto p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center group">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 group-hover:scale-110 transition-transform duration-200">
                  {/* {watchedCount} */}
                  <span className="font-medium text-blue-500">
                    {currentIndex + 1}
                  </span>{' '}
                  من {totalVideos} دروس
                </div>
                <div
                  className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  دروس مكتملة
                </div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 group-hover:scale-110 transition-transform duration-200">
                  {calculateTotalDuration()}
                </div>
                <div
                  className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  إجمالي المدة
                </div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 group-hover:scale-110 transition-transform duration-200">
                  {bookmarkedVideos.size}
                </div>
                <div
                  className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  دروس محفوظة
                </div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 group-hover:scale-110 transition-transform duration-200">
                  {progressPercentage}%
                </div>
                <div
                  className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  نسبة الإنجاز
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        {/* Video Player Section */}
        <div className="lg:w-3/4 p-4 space-y-6">
          {/* Video Player */}
          <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative group">
            <VideoPlayer
              url={currentVideo.url}
              className="w-full h-full"
              onProgress={handleVideoProgress}
              onEnded={handleVideoEnded}
            />

            {/* Auto-play notification */}
            {isAutoPlay && hasNext && (
              <div className="absolute top-4 right-4 bg-black/80 text-white px-4 py-2 rounded-full text-sm flex items-center backdrop-blur-sm">
                <SkipForward className="w-4 h-4 mr-2" />
                التشغيل التلقائي مفعل
              </div>
            )}
          </div>

          {/* Enhanced Video Info */}
          <div
            className={`rounded-2xl shadow-xl transition-all duration-300 ${
              isDarkMode
                ? 'bg-gray-900/70 backdrop-blur-sm border border-gray-800'
                : 'bg-white/70 backdrop-blur-sm border border-gray-100'
            }`}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2
                    className={`text-2xl font-bold mb-3 flex items-center ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}
                  >
                    {currentVideo.title}
                    {watchedVideos.has(currentVideo._id) && (
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 animate-pulse" />
                    )}
                  </h2>
                  <div
                    className={`flex items-center space-x-6 space-x-reverse text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    <span className="flex items-center bg-blue-500/10 px-3 py-1 rounded-full">
                      <BookOpen className="w-4 h-4 ml-1" />
                      الدرس {currentIndex + 1} من {videos.length}
                    </span>
                    <span className="flex items-center bg-green-500/10 px-3 py-1 rounded-full">
                      <Clock className="w-4 h-4 ml-1" />
                      {formatDuration(currentVideo.duration)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleBookmark(currentVideo._id)}
                  className={`p-4 rounded-2xl transition-all duration-200 hover:scale-105 ${
                    bookmarkedVideos.has(currentVideo._id)
                      ? 'bg-yellow-500/20 text-yellow-500 shadow-lg shadow-yellow-500/20'
                      : isDarkMode
                        ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {bookmarkedVideos.has(currentVideo._id) ? (
                    <BookmarkCheck className="w-6 h-6" />
                  ) : (
                    <Bookmark className="w-6 h-6" />
                  )}
                </button>
              </div>

              {/* Enhanced Video Progress */}
              {videoProgress[currentVideo._id] && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      التقدم في الدرس
                    </span>
                    <span className="text-sm font-bold text-blue-500">
                      {Math.round(videoProgress[currentVideo._id])}%
                    </span>
                  </div>
                  <div
                    className={`w-full h-3 rounded-full overflow-hidden shadow-inner ${
                      isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                    }`}
                  >
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500 shadow-lg"
                      style={{ width: `${videoProgress[currentVideo._id]}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Enhanced Navigation */}
              <div className="flex justify-between gap-4 mb-6">
                <button
                  onClick={handlePrev}
                  disabled={!hasPrev}
                  className={`flex-1 py-4 px-6 rounded-xl flex items-center justify-center gap-3 font-medium transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800/50 text-gray-300'
                      : 'bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100/50 text-gray-700'
                  } ${!hasPrev ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 shadow-lg'}`}
                >
                  <ChevronRight className="w-5 h-5" />
                  الدرس السابق
                </button>

                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className={`px-6 py-4 rounded-xl transition-all duration-200 hover:scale-105 ${
                    isAutoPlay
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                      : isDarkMode
                        ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <SkipForward className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNext}
                  disabled={!hasNext}
                  className={`flex-1 py-4 px-6 rounded-xl flex items-center justify-center gap-3 font-medium transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-600 disabled:from-gray-800 disabled:to-gray-800 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-100 disabled:to-gray-100 text-white'
                  } ${!hasNext ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 shadow-lg shadow-blue-500/30'}`}
                >
                  الدرس التالي
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Actions */}
              <div
                className={`flex items-center justify-between pt-6 border-t ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div className="flex space-x-3 space-x-reverse">
                  <button
                    className={`flex items-center px-4 py-2 text-sm rounded-lg transition-all duration-200 hover:scale-105 ${
                      isDarkMode
                        ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <Download className="w-4 h-4 ml-2" />
                    تحميل
                  </button>
                  <button
                    onClick={() => setShowNotes(!showNotes)}
                    className={`flex items-center px-4 py-2 text-sm rounded-lg transition-all duration-200 hover:scale-105 ${
                      showNotes
                        ? 'bg-blue-500/20 text-blue-500'
                        : isDarkMode
                          ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 ml-2" />
                    ملاحظات
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          {showNotes && (
            <div
              className={`rounded-2xl shadow-xl transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gray-900/70 backdrop-blur-sm border border-gray-800'
                  : 'bg-white/70 backdrop-blur-sm border border-gray-100'
              }`}
            >
              <div className="p-6">
                <h3
                  className={`text-lg font-semibold mb-4 flex items-center ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}
                >
                  <MessageSquare className="w-5 h-5 ml-2 text-blue-500" />
                  ملاحظاتي
                </h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="اكتب ملاحظاتك هنا..."
                  className={`w-full p-4 border rounded-xl resize-none transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    isDarkMode
                      ? 'bg-gray-800/50 border-gray-700 text-gray-100 placeholder-gray-400'
                      : 'bg-gray-50/50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  rows="4"
                />
                <div className="flex justify-end mt-4">
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg">
                    حفظ الملاحظات
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Comments Section */}
          <div
            className={`rounded-2xl shadow-xl transition-all duration-300 ${
              isDarkMode
                ? 'bg-gray-900/70 backdrop-blur-sm border border-gray-800'
                : 'bg-white/70 backdrop-blur-sm border border-gray-100'
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3
                  className={`text-xl font-bold flex items-center ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}
                >
                  <MessageSquare className="w-6 h-6 ml-2 text-blue-500" />
                  التعليقات ({comments.length})
                </h3>
                <button
                  onClick={() => setShowComments(!showComments)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {showComments ? 'إخفاء' : 'عرض'}
                </button>
              </div>

              {showComments && (
                <>
                  {/* Add Comment */}
                  <div
                    className={`p-4 rounded-xl mb-6 border ${
                      isDarkMode
                        ? 'bg-gray-800/50 border-gray-700'
                        : 'bg-gray-50/50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                        }`}
                      >
                        <User className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="اكتب تعليقك هنا..."
                          className={`w-full p-3 border rounded-lg resize-none transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                          rows="3"
                        />
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={handleAddComment}
                            disabled={!newComment.trim()}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                          >
                            <Send className="w-4 h-4" />
                            إرسال
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {comments.length === 0 ? (
                      <div
                        className={`text-center py-8 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>لا توجد تعليقات بعد. كن أول من يعلق!</p>
                      </div>
                    ) : (
                      comments.map((comment) => (
                        <div
                          key={comment.id}
                          className={`p-4 rounded-xl border transition-all duration-200 ${
                            isDarkMode
                              ? 'bg-gray-800/30 border-gray-700 hover:bg-gray-800/50'
                              : 'bg-gray-50/30 border-gray-200 hover:bg-gray-50/50'
                          }`}
                        >
                          <div className="flex items-start space-x-3 space-x-reverse">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                              }`}
                            >
                              <User className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2 space-x-reverse">
                                  <span
                                    className={`font-medium ${
                                      isDarkMode
                                        ? 'text-gray-200'
                                        : 'text-gray-800'
                                    }`}
                                  >
                                    {comment.author}
                                  </span>
                                  <span
                                    className={`text-sm ${
                                      isDarkMode
                                        ? 'text-gray-400'
                                        : 'text-gray-500'
                                    }`}
                                  >
                                    {formatTimeAgo(comment.timestamp)}
                                  </span>
                                </div>
                                <button
                                  className={`p-1 rounded-full transition-colors ${
                                    isDarkMode
                                      ? 'hover:bg-gray-700 text-gray-400'
                                      : 'hover:bg-gray-200 text-gray-500'
                                  }`}
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </div>

                              <p
                                className={`mb-3 leading-relaxed ${
                                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}
                              >
                                {comment.text}
                              </p>

                              <div className="flex items-center space-x-4 space-x-reverse">
                                <button
                                  onClick={() => toggleCommentLike(comment.id)}
                                  className={`flex items-center space-x-1 space-x-reverse px-2 py-1 rounded-full transition-all duration-200 ${
                                    commentLikes[comment.id]
                                      ? 'text-blue-500 bg-blue-500/10'
                                      : isDarkMode
                                        ? 'text-gray-400 hover:text-blue-400 hover:bg-blue-500/10'
                                        : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
                                  }`}
                                >
                                  <ThumbsUp className="w-4 h-4" />
                                  <span className="text-sm">
                                    {comment.likes}
                                  </span>
                                </button>

                                <button
                                  onClick={() =>
                                    setReplyingTo(
                                      replyingTo === comment.id
                                        ? null
                                        : comment.id
                                    )
                                  }
                                  className={`flex items-center space-x-1 space-x-reverse px-2 py-1 rounded-full transition-all duration-200 ${
                                    replyingTo === comment.id
                                      ? 'text-blue-500 bg-blue-500/10'
                                      : isDarkMode
                                        ? 'text-gray-400 hover:text-blue-400 hover:bg-blue-500/10'
                                        : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
                                  }`}
                                >
                                  <Reply className="w-4 h-4" />
                                  <span className="text-sm">رد</span>
                                </button>
                              </div>

                              {/* Reply Form */}
                              {replyingTo === comment.id && (
                                <div
                                  className={`mt-4 p-3 rounded-lg border ${
                                    isDarkMode
                                      ? 'bg-gray-700/50 border-gray-600'
                                      : 'bg-white/50 border-gray-300'
                                  }`}
                                >
                                  <textarea
                                    value={replyText}
                                    onChange={(e) =>
                                      setReplyText(e.target.value)
                                    }
                                    placeholder="اكتب ردك هنا..."
                                    className={`w-full p-2 border rounded-lg resize-none transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                      isDarkMode
                                        ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400'
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    }`}
                                    rows="2"
                                  />
                                  <div className="flex justify-end space-x-2 space-x-reverse mt-2">
                                    <button
                                      onClick={() => {
                                        setReplyingTo(null);
                                        setReplyText('');
                                      }}
                                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                                        isDarkMode
                                          ? 'text-gray-400 hover:bg-gray-700'
                                          : 'text-gray-500 hover:bg-gray-100'
                                      }`}
                                    >
                                      إلغاء
                                    </button>
                                    <button
                                      onClick={() => handleAddReply(comment.id)}
                                      disabled={!replyText.trim()}
                                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                      رد
                                    </button>
                                  </div>
                                </div>
                              )}

                              {/* Replies */}
                              {comment.replies &&
                                comment.replies.length > 0 && (
                                  <div className="mt-4 space-y-3">
                                    {comment.replies.map((reply) => (
                                      <div
                                        key={reply.id}
                                        className={`p-3 rounded-lg border-r-2 ${
                                          isDarkMode
                                            ? 'bg-gray-700/30 border-blue-500'
                                            : 'bg-blue-50/30 border-blue-500'
                                        }`}
                                      >
                                        <div className="flex items-start space-x-2 space-x-reverse">
                                          <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                              isDarkMode
                                                ? 'bg-gray-600'
                                                : 'bg-gray-400'
                                            }`}
                                          >
                                            <User className="w-4 h-4" />
                                          </div>
                                          <div className="flex-1">
                                            <div className="flex items-center space-x-2 space-x-reverse mb-1">
                                              <span
                                                className={`text-sm font-medium ${
                                                  isDarkMode
                                                    ? 'text-gray-200'
                                                    : 'text-gray-800'
                                                }`}
                                              >
                                                {reply.author}
                                              </span>
                                              <span
                                                className={`text-xs ${
                                                  isDarkMode
                                                    ? 'text-gray-400'
                                                    : 'text-gray-500'
                                                }`}
                                              >
                                                {formatTimeAgo(reply.timestamp)}
                                              </span>
                                            </div>
                                            <p
                                              className={`text-sm mb-2 ${
                                                isDarkMode
                                                  ? 'text-gray-300'
                                                  : 'text-gray-700'
                                              }`}
                                            >
                                              {reply.text}
                                            </p>
                                            <button
                                              onClick={() =>
                                                toggleCommentLike(
                                                  reply.id,
                                                  true,
                                                  comment.id
                                                )
                                              }
                                              className={`flex items-center space-x-1 space-x-reverse text-xs px-2 py-1 rounded-full transition-all duration-200 ${
                                                commentLikes[
                                                  `${comment.id}-${reply.id}`
                                                ]
                                                  ? 'text-blue-500 bg-blue-500/10'
                                                  : isDarkMode
                                                    ? 'text-gray-400 hover:text-blue-400 hover:bg-blue-500/10'
                                                    : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
                                              }`}
                                            >
                                              <ThumbsUp className="w-3 h-3" />
                                              <span>{reply.likes}</span>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Videos List Sidebar */}
        <div
          className={`lg:w-1/4 p-4 border-l transition-colors duration-300 ${
            isDarkMode ? 'border-gray-800' : 'border-gray-200'
          }`}
        >
          <div className="sticky top-20">
            <div className="flex items-center justify-between mb-6">
              <h3
                className={`text-lg font-bold flex items-center ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                <BookOpen className="w-5 h-5 ml-2 text-blue-500" />
                فهرس الدروس
              </h3>
              <div
                className={`text-sm px-3 py-1 rounded-full ${
                  isDarkMode
                    ? 'bg-gray-800 text-gray-400'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {videos.length} دروس
              </div>
            </div>

            {/* Enhanced Course Progress Summary */}
            <div
              className={`p-4 rounded-2xl mb-6 shadow-lg transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700'
                  : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  تقدم الدورة
                </span>
                <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                  {progressPercentage}%
                </span>
              </div>
              <div
                className={`w-full h-3 rounded-full overflow-hidden shadow-inner mb-3 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white/50'
                }`}
              >
                <div
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div
                className={`flex items-center justify-between text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <span className="flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                  <span className="font-medium text-blue-500">
                    {currentIndex + 1}
                  </span>{' '}
                  من {totalVideos} دروس
                </span>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1 text-orange-500" />
                  {totalVideos - watchedCount} متبقي
                </span>
              </div>
            </div>

            <div className="space-y-2 max-h-[calc(100vh-350px)] overflow-y-auto custom-scrollbar">
              {videos.map((video, index) => {
                const isWatched = watchedVideos.has(video._id);
                const isBookmarked = bookmarkedVideos.has(video._id);
                const isCurrent = video._id === currentVideo._id;
                const progress = videoProgress[video._id] || 0;

                return (
                  <Link
                    key={video._id}
                    to={`/courses/${courseId}/videos/${video._id}`}
                    className={`block p-4 rounded-xl transition-all duration-200 hover:shadow-md group ${
                      isCurrent
                        ? isDarkMode
                          ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700 shadow-lg shadow-blue-900/20'
                          : 'bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 shadow-lg shadow-blue-200/20'
                        : isDarkMode
                          ? 'hover:bg-gray-800/50 border border-transparent hover:border-gray-700'
                          : 'hover:bg-gray-50/50 border border-transparent hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        {isCurrent ? (
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                            <PlayCircle className="w-5 h-5 text-white" />
                          </div>
                        ) : isWatched ? (
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        ) : (
                          <div
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-200 group-hover:scale-110 ${
                              isDarkMode
                                ? 'border-gray-600 text-gray-400 group-hover:border-blue-500 group-hover:text-blue-400'
                                : 'border-gray-300 text-gray-500 group-hover:border-blue-500 group-hover:text-blue-500'
                            }`}
                          >
                            {index + 1}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4
                            className={`text-sm font-medium leading-tight transition-colors duration-200 ${
                              isCurrent
                                ? 'text-blue-500'
                                : isWatched
                                  ? 'text-green-500'
                                  : isDarkMode
                                    ? 'text-gray-300 group-hover:text-gray-200'
                                    : 'text-gray-800 group-hover:text-gray-900'
                            }`}
                          >
                            {video.title}
                          </h4>
                          {isBookmarked && (
                            <Bookmark className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0 animate-pulse" />
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <span
                            className={`text-xs flex items-center ${
                              isDarkMode ? 'text-gray-500' : 'text-gray-500'
                            }`}
                          >
                            <Clock className="w-3 h-3 mr-1" />
                            {formatDuration(video.duration)}
                          </span>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            {video.isPreview && (
                              <span className="text-xs bg-gradient-to-r from-green-400 to-emerald-500 text-white px-2 py-0.5 rounded-full shadow-sm">
                                معاينة
                              </span>
                            )}
                            {isWatched && (
                              <Award className="w-3 h-3 text-yellow-500 animate-pulse" />
                            )}
                          </div>
                        </div>

                        {/* Enhanced Progress bar for partially watched videos */}
                        {progress > 0 && progress < 100 && (
                          <div className="mt-3">
                            <div
                              className={`w-full h-1.5 rounded-full overflow-hidden ${
                                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                              }`}
                            >
                              <div
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500 shadow-sm"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                            <div
                              className={`text-xs mt-1 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}
                            >
                              {Math.round(progress)}% مكتمل
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Enhanced Course completion achievement */}
            {progressPercentage === 100 && (
              <div className="mt-6 p-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-2xl text-white text-center shadow-2xl animate-pulse">
                <Award className="w-12 h-12 mx-auto mb-3 animate-bounce" />
                <div className="font-bold text-lg mb-1">تهانينا! 🎉</div>
                <div className="text-sm opacity-90">لقد أكملت الدورة بنجاح</div>
                <div className="mt-3 text-xs opacity-75">
                  يمكنك الآن الحصول على شهادة الإنجاز
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${isDarkMode ? '#1f2937' : '#f1f5f9'};
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? '#4b5563' : '#cbd5e1'};
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? '#6b7280' : '#94a3b8'};
        }
      `}</style>
    </div>
  );
};

export default CourseVideoPage;
