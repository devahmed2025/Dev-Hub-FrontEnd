import { useLoaderData, Link, useParams } from 'react-router-dom';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import {
  Star,
  Clock,
  Video,
  FileText,
  Download,
  Users,
  Award,
  PlayCircle,
  CheckCircle,
  Globe,
  Calendar,
  TrendingUp,
  ThumbsUp,
  Share2,
  Gift,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Target,
  Shield,
  Monitor,
} from 'lucide-react';
import Button from './ui/Button';
import VideoPlayer from './VideoPlayer';
import Certificate from './Certificate';
import { useState } from 'react';

// Convert minutes to hours and minutes format
const formatVideoLength = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours} ساعة ${mins} دقيقة` : `${mins} دقيقة`;
};

// Format duration for individual videos
const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

const CourseDetails = () => {
  const { course } = useLoaderData();
  const { courseId } = useParams();
  const { isDarkMode } = useDarkMode();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Check enrollment by seeing if user ID is in course.students
  const isEnrolled = course.students?.includes(user?._id) || false;
  const totalVideoLength = course.videoLength || 0;
  const previewVideos = course.videos?.filter((video) => video.isPreview) || [];
  const firstPreviewVideo = previewVideos[0]?.url;
  const [showcertificate, setshowcertificate] = useState(false);

  const handleshowCertificate = () => {
    setshowcertificate(!showcertificate);
    toast.info('تم اضافه الشهاده بنجاح');
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('يرجى تسجيل الدخول لإضافة الدورات إلى السلة');
      navigate('/login');
      return;
    }
    if (isEnrolled) {
      toast.info('أنت مسجل بالفعل في هذه الدورة');
      return;
    }
    dispatch(addToCart({ courseId: course._id, isFree: course.price === 0 }));
  };

  return (
    <div
      dir="rtl"
      className={`min-h-screen transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Top Navigation Bar */}
      <div
        className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-colors duration-200 ${
          isDarkMode
            ? 'bg-gray-900/90 border-gray-800'
            : 'bg-white/90 border-gray-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-reverse space-x-4">
              <Link
                to="/courses"
                className={`text-sm hover:text-blue-500 transition-colors ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                جميع الدورات
              </Link>
              <span className="text-gray-400">›</span>
              <span className="text-sm text-blue-500 font-medium">
                {course.category?.name}
              </span>
            </div>
            <div className="flex items-center space-x-reverse space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-reverse space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span>مشاركة</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-reverse space-x-2"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>إعجاب</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Video Player */}
            <div
              className={`rounded-2xl overflow-hidden shadow-2xl ${
                isDarkMode ? 'bg-gray-900' : 'bg-white'
              }`}
            >
              <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 relative">
                {firstPreviewVideo ? (
                  <VideoPlayer
                    url={firstPreviewVideo}
                    className="w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <PlayCircle className="w-20 h-20 text-white/60 mx-auto mb-4" />
                      <p className="text-white/80 text-lg">
                        معاينة الدورة غير متوفرة
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h1 className="text-2xl lg:text-3xl font-bold mb-3 leading-tight">
                  {course.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center space-x-reverse space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(course.ratingsAverage || 0)
                              ? 'text-yellow-400 fill-current'
                              : isDarkMode
                                ? 'text-gray-600'
                                : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-yellow-400">
                      {course.ratingsAverage?.toFixed(1)}
                    </span>
                    <span
                      className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                    >
                      ({course.ratingsQuantity} تقييم)
                    </span>
                  </div>

                  <div
                    className={`flex items-center space-x-reverse space-x-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>{course.students?.length} طالب</span>
                  </div>

                  <div
                    className={`flex items-center space-x-reverse space-x-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>
                      آخر تحديث{' '}
                      {new Date(course.updatedAt).toLocaleDateString('ar-SA', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-reverse space-x-6 mb-6">
                  <div className="flex items-center space-x-reverse space-x-2">
                    <img
                      src={course.instructor?.profilePhoto}
                      alt={course.instructor?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{course.instructor?.name}</p>
                      <p
                        className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                      >
                        مدرب معتمد
                      </p>
                    </div>
                  </div>
                </div>

                <p
                  className={`text-lg leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {course.description}
                </p>
              </div>
            </div>

            {/* Course Content Sections */}
            {course.videos?.length > 0 && (
              <div
                className={`rounded-2xl p-6 ${
                  isDarkMode ? 'bg-gray-900' : 'bg-white'
                } shadow-lg`}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">محتوى الدورة</h2>
                  <div
                    className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    {course.numberOfVideos} درس •{' '}
                    {formatVideoLength(totalVideoLength)}
                  </div>
                </div>

                <div className="space-y-3">
                  <div
                    className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                      isDarkMode
                        ? 'border-gray-800 bg-gray-800/50'
                        : 'border-gray-200 bg-gray-50/50'
                    }`}
                  >
                    <div
                      className={`p-4 ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-reverse space-x-3">
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                          <h3 className="font-semibold">محتوى الدورة</h3>
                        </div>
                        <div
                          className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                        >
                          {course.videos.length} درس
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      {course.videos.map((video, videoIndex) => (
                        <div
                          key={video._id}
                          className={`p-4 pr-12 flex items-center justify-between ${
                            isDarkMode
                              ? 'hover:bg-gray-700/50 border-t border-gray-800'
                              : 'hover:bg-gray-100/50 border-t border-gray-200'
                          }`}
                        >
                          <div className="flex items-center space-x-reverse space-x-3">
                            <PlayCircle
                              className={`w-5 h-5 ${
                                video.isPreview
                                  ? 'text-green-500'
                                  : isDarkMode
                                    ? 'text-gray-500'
                                    : 'text-gray-400'
                              }`}
                            />
                            <span className="flex-1">
                              {videoIndex + 1}. {video.title}
                            </span>
                            {video.isPreview && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                                معاينة مجانية
                              </span>
                            )}
                          </div>
                          <span
                            className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                          >
                            {formatDuration(video.duration)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preview Videos Section */}
            {!isEnrolled && previewVideos.length > 0 && (
              <div
                className={`rounded-2xl p-6 ${
                  isDarkMode ? 'bg-gray-900' : 'bg-white'
                } shadow-lg`}
              >
                <h2 className="text-2xl font-bold mb-6">فيديوهات معاينة</h2>
                <div className="space-y-6">
                  {previewVideos.map((video) => (
                    <div key={video._id} className="space-y-3">
                      <h3 className="text-xl font-semibold">{video.title}</h3>
                      <VideoPlayer
                        url={video.url}
                        className="w-full h-[500px] mb-6"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Long Description */}
            {course.longDescription && (
              <div
                className={`rounded-2xl p-6 ${
                  isDarkMode ? 'bg-gray-900' : 'bg-white'
                } shadow-lg`}
              >
                <h2 className="text-2xl font-bold mb-6">وصف الدورة</h2>
                <p
                  className={`text-lg leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {course.longDescription}
                </p>
              </div>
            )}

            {/* Attachments */}
            {course.attachments?.length > 0 && (
              <div
                className={`rounded-2xl p-6 ${
                  isDarkMode ? 'bg-gray-900' : 'bg-white'
                } shadow-lg`}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center space-x-reverse space-x-2">
                  <Download className="w-6 h-6 text-blue-500" />
                  <span>الموارد</span>
                </h2>
                <ul className="space-y-3">
                  {course.attachments.map((attachment, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-reverse space-x-3"
                    >
                      <a
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <FileText className="w-5 h-5 mr-2" />
                        <span>الملف {index + 1}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {!showcertificate && (
              <Button onClick={handleshowCertificate}>
                {' '}
                Generate Certificate
              </Button>
            )}

            {isEnrolled && showcertificate && (
              <Certificate
                courseName={course.title}
                studentName={user.name}
                instructor={course.instructor.name}
                completionDate={new Date().toLocaleDateString()}
                onDownload={() => {
                  // Implement download functionality
                  console.log('Download certificate');
                }}
                darkMode={isDarkMode}
              />
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div
              className={`sticky top-24 rounded-2xl overflow-hidden shadow-2xl ${
                isDarkMode ? 'bg-gray-900' : 'bg-white'
              }`}
            >
              {/* Course Image */}
              <div className="relative">
                <img
                  src={course.coverPhoto}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              <div className="p-6">
                {/* Pricing */}
                <div className="mb-6">
                  <div className="text-3xl font-bold text-green-500 mb-2">
                    {course.price === 0
                      ? 'مجاني'
                      : `${course.price.toFixed(0)}` + ' جنيه مصري'}
                  </div>
                </div>

                {/* CTA Button */}
                {!isEnrolled ? (
                  <Button
                    onClick={handleAddToCart}
                    className={`w-full mb-4 py-4 text-lg font-bold rounded-xl transition-all duration-200 transform hover:scale-105 ${
                      course.price === 0
                        ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-green-500/25'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/25'
                    } shadow-lg`}
                  >
                    {course.price === 0 ? 'التسجيل مجاناً' : 'إضافة إلى السلة'}
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      if (course.videos?.length > 0) {
                        navigate(
                          `/courses/${course._id}/videos/${course.videos[0]._id}`
                        );
                      } else {
                        navigate(`/courses/${course._id}/videos`);
                      }
                    }}
                    className="w-full mb-4 py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/25 transition-all duration-200 transform hover:scale-105"
                  >
                    انتقل إلى الدورة
                  </Button>
                )}

                {/* Course Features */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-reverse space-x-3">
                    <Video className="w-5 h-5 text-blue-500" />
                    <span>{course.numberOfVideos} درس فيديو</span>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-3">
                    <Clock className="w-5 h-5 text-green-500" />
                    <span>
                      {formatVideoLength(totalVideoLength)} مدة إجمالية
                    </span>
                  </div>
                  {course.attachments?.length > 0 && (
                    <div className="flex items-center space-x-reverse space-x-3">
                      <FileText className="w-5 h-5 text-purple-500" />
                      <span>{course.attachments.length} مورد قابل للتحميل</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-reverse space-x-3">
                    <TrendingUp className="w-5 h-5 text-yellow-500" />
                    <span>{course.category.description}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className={`flex items-center justify-center space-x-reverse space-x-2 py-3 rounded-xl transition-all duration-200 ${
                      isDarkMode
                        ? 'border-gray-700 hover:bg-gray-800'
                        : 'border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    <Share2 className="w-4 h-4" />
                    <span>مشاركة</span>
                  </Button>
                  <Button
                    variant="outline"
                    className={`flex items-center justify-center space-x-reverse space-x-2 py-3 rounded-xl transition-all duration-200 ${
                      isDarkMode
                        ? 'border-gray-700 hover:bg-gray-800'
                        : 'border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    <Gift className="w-4 h-4" />
                    <span>إهداء</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Instructor Card */}
            <div
              className={`mt-6 rounded-2xl p-6 shadow-lg ${
                isDarkMode ? 'bg-gray-900' : 'bg-white'
              }`}
            >
              <h3 className="text-xl font-bold mb-4">المدرب</h3>
              <div className="flex items-start space-x-reverse space-x-4 mb-4">
                <img
                  src={course.instructor.profilePhoto}
                  alt={course.instructor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-1">
                    {course.instructor.name}
                  </h4>
                  <p
                    className={`text-sm mb-2 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    مدرب معتمد
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full rounded-xl">
                عرض الملف الشخصي
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
