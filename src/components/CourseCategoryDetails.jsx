

import { useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCourses,
  clearError as clearCourseError,
} from '../store/slices/courseSlice';
import { fetchAllTests, resetCreateStatus } from '../store/slices/testSlice';
import { toast } from 'react-toastify';
import {
  Book,
  Tag,
  Star,
  TrendingUp,
  Users,
  Clock,
  Award,
  Eye,
} from 'lucide-react';
import TopTests from './TopTests';
import LoadingSpinner from './ui/LoadingSpinner';
import {
  selectTests,
  selectTestError,
  selectFetchTestsStatus,
} from '../store/slices/testSelectors';
import {
  selectTopPosts,
  selectTopTags,
  selectActiveUsers,
} from '../store/slices/communitySlice';

const CommunitySidebar = ({ isDarkMode, onTagSelect, selectedTag }) => {
  const dispatch = useDispatch();
  const {
    courses,
    status: courseStatus,
    error: courseError,
  } = useSelector((state) => state.courses);
  const { lastUpdated } = useSelector((state) => state.community);
  const tests = useSelector(selectTests);
  const testError = useSelector(selectTestError);
  const fetchTestsStatus = useSelector(selectFetchTestsStatus);
  const topPosts = useSelector(selectTopPosts);
  const topTags = useSelector(selectTopTags);
  const activeUsers = useSelector(selectActiveUsers);

  // Memoize community insights
  const communityInsights = useMemo(() => {
    const posts = topPosts;
    if (!Array.isArray(posts)) return null;

    const today = new Date();
    const todayPosts = posts.filter((post) => {
      const postDate = new Date(post.createdAt);
      return postDate.toDateString() === today.toDateString();
    });

    const thisWeekPosts = posts.filter((post) => {
      const postDate = new Date(post.createdAt);
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      return postDate >= weekAgo;
    });

    return {
      todayPosts: todayPosts.length,
      thisWeekPosts: thisWeekPosts.length,
      totalEngagement: posts.reduce(
        (sum, post) =>
          sum + (post.likes?.length || 0) + (post.commentCount || 0),
        0
      ),
      averageEngagement:
        posts.length > 0
          ? Math.round(
              posts.reduce(
                (sum, post) =>
                  sum + (post.likes?.length || 0) + (post.commentCount || 0),
                0
              ) / posts.length
            )
          : 0,
    };
  }, [topPosts]);

  // Initial data fetch
  useEffect(() => {
    dispatch(getCourses());
    dispatch(fetchAllTests());
  }, [dispatch]);

  // Handle errors
  useEffect(() => {
    if (courseError) {
      toast.error(courseError);
      dispatch(clearCourseError());
    }
    if (testError && fetchTestsStatus === 'failed') {
      dispatch(resetCreateStatus());
    }
  }, [courseError, testError, fetchTestsStatus, dispatch]);

  // Handle tag selection
  const handleTagClick = useCallback(
    (tag) => {
      if (onTagSelect) {
        onTagSelect(selectedTag === tag ? '' : tag);
      }
    },
    [onTagSelect, selectedTag]
  );

  const memoizedCourses = useMemo(() => {
    return courses
      .slice()
      .sort((a, b) => (b.ratingsAverage || 0) - (a.ratingsAverage || 0))
      .slice(0, 3);
  }, [courses]);

  return (
    <div className="space-y-6">
      {/* Community Insights */}
      {communityInsights && (
        <div
          className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
        >
          <h3
            className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            <TrendingUp className="w-5 h-5 text-blue-500" />
            إحصائيات المجتمع
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {/* ... community insights grid ... */}
          </div>
        </div>
      )}

      {/* Top Posts */}
      <div
        className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
      >
        <h3
          className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          <Star className="w-5 h-5 text-red-500" />
          المنشورات الأكثر تفاعلاً
        </h3>
        {topPosts.length > 0 ? (
          <div className="space-y-3">
            {topPosts.map((post, index) => (
              <Link
                key={post._id || post.tempId}
                to={`/community/posts/${post._id || post.tempId}`}
                className={`block p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0
                        ? 'bg-yellow-500 text-white'
                        : index === 1
                          ? 'bg-gray-400 text-white'
                          : index === 2
                            ? 'bg-orange-500 text-white'
                            : isDarkMode
                              ? 'bg-gray-600 text-gray-300'
                              : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium line-clamp-2 mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
                    >
                      {post.content}
                    </p>
                    <div className="flex items-center gap-3 text-xs">
                      <span
                        className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                      >
                        <Star className="w-3 h-3 text-red-500" />
                        {post.likes?.length || 0}
                      </span>
                      <span
                        className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                      >
                        <Eye className="w-3 h-3 text-blue-500" />
                        {post.commentCount || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p
            className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
          >
            لا توجد منشورات بعد
          </p>
        )}
      </div>

      {/* Popular Tags */}
      <div
        className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
      >
        <h3
          className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          <Tag className="w-5 h-5 text-blue-500" />
          التصنيفات الشائعة
        </h3>
        {topTags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {topTags.map(({ tag, count }) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                  selectedTag === tag
                    ? 'bg-blue-500 text-white'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>#{tag}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-xs ${
                    selectedTag === tag
                      ? 'bg-blue-400 text-white'
                      : isDarkMode
                        ? 'bg-gray-600 text-gray-400'
                        : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p
            className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
          >
            لا توجد تصنيفات بعد
          </p>
        )}
      </div>

      {/* Active Community Members */}
      <div
        className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
      >
        <h3
          className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          <Users className="w-5 h-5 text-green-500" />
          الأعضاء النشطون
        </h3>
        {activeUsers.length > 0 ? (
          <div className="space-y-3">
            {activeUsers.map((userStats, index) => (
              <div key={userStats.user._id} className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={userStats.user.avatar || '/default-avatar.png'}
                    alt={userStats.user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {index < 3 && (
                    <div
                      className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                        index === 0
                          ? 'bg-yellow-500'
                          : index === 1
                            ? 'bg-gray-400'
                            : 'bg-orange-500'
                      }`}
                    >
                      <Award className="w-2 h-2 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
                  >
                    {userStats.user.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    >
                      {userStats.posts} منشور
                    </span>
                    <span
                      className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    >
                      •
                    </span>
                    <span
                      className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    >
                      {userStats.engagement} تفاعل
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p
            className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
          >
            لا يوجد أعضاء نشطون بعد
          </p>
        )}
      </div>

      {/* Top Courses */}
      <div
        className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
      >
        <h3
          className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          <Book className="w-5 h-5 text-green-500" />
          أفضل الدورات
        </h3>
        {courseStatus === 'loading' ? (
          <LoadingSpinner size="sm" />
        ) : memoizedCourses.length > 0 ? (
          <div className="space-y-3">
            {memoizedCourses.map((course) => (
              <Link
                key={course._id}
                to={`/courses/${course._id}`}
                className={`block p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
              >
                <p
                  className={`text-sm font-medium line-clamp-2 mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
                >
                  {course.title}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span
                      className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    >
                      {course.ratingsAverage?.toFixed(1) || '0.0'}
                    </span>
                  </div>
                  <span
                    className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    ({course.ratingsQuantity || 0} تقييم)
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p
            className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
          >
            لا توجد دورات بعد
          </p>
        )}
      </div>

      {/* Top Tests */}
      <TopTests isDarkMode={isDarkMode} />

      {/* Quick Actions */}
      <div
        className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
      >
        <h3
          className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          <Clock className="w-5 h-5 text-purple-500" />
          إجراءات سريعة
        </h3>
        <div className="space-y-2">
          <Link
            to="/courses"
            className={`block w-full text-center py-2 px-4 rounded-lg text-sm font-medium transition-colors ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          >
            تصفح الدورات
          </Link>
          <Link
            to="/tests"
            className={`block w-full text-center py-2 px-4 rounded-lg text-sm font-medium transition-colors ${isDarkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
          >
            اختبر معلوماتك
          </Link>
          <Link
            to="/leaderboard"
            className={`block w-full text-center py-2 px-4 rounded-lg text-sm font-medium transition-colors ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-500 hover:bg-purple-600 text-white'}`}
          >
            لوحة المتصدرين
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommunitySidebar;
