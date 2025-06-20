import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCourses, clearError } from '../store/slices/courseSlice';
import {
  fetchCart,
  addToCart,
  removeFromCart,
} from '../store/slices/cartSlice';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import {
  Star,
  Clock,
  Filter,
  Search,
  X,
  Users,
  PlayCircle,
  ChevronDown,
  CheckCircle,
  Loader2,
  Trash2,
} from 'lucide-react';
import { toast } from 'react-toastify';
import Button from './ui/Button';

// Professional skeleton loader with smaller cards
const CourseSkeleton = ({ isDarkMode }) => (
  <div
    className={`group overflow-hidden rounded-2xl shadow-md border transition-all duration-300 hover:shadow-xl ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
    }`}
  >
    <div
      className={`w-full h-32 animate-pulse ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
      }`}
    ></div>
    <div className="p-3 space-y-2">
      <div
        className={`h-3 w-3/4 rounded animate-pulse ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`}
      ></div>
      <div
        className={`h-2 w-full rounded animate-pulse ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`}
      ></div>
      <div
        className={`h-2 w-2/3 rounded animate-pulse ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`}
      ></div>
      <div className="flex items-center justify-between pt-2">
        <div
          className={`h-3 w-12 rounded animate-pulse ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}
        ></div>
        <div
          className={`h-5 w-16 rounded animate-pulse ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}
        ></div>
      </div>
    </div>
  </div>
);

const CourseList = () => {
  const { isDarkMode } = useDarkMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    courses,
    status: courseStatus,
    error: courseError,
  } = useSelector((state) => state.courses);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const {
    cartItems,
    status: cartStatus,
    error: cartError,
  } = useSelector((state) => state.cart);

  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  // State for tracking add/remove loading per course
  const [isAddingToCart, setIsAddingToCart] = useState({});

  // Create inCartMap
  const inCartMap = useMemo(() => {
    const map = {};
    cartItems.forEach((item) => {
      if (item?.course?._id) {
        map[item.course._id] = true;
      }
    });
    return map;
  }, [cartItems]);

  const isCourseInCart = (courseId) => !!inCartMap[courseId];

  // Get unique categories for filter
  const categories = [
    ...new Set(courses.map((course) => course.category?.name).filter(Boolean)),
  ];

  // Fetch cart and courses on mount
  useEffect(() => {
    dispatch(getCourses());
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
    return () => dispatch(clearError());
  }, [dispatch, isAuthenticated]);

  // Handle errors
  useEffect(() => {
    if (courseError) {
      toast.error(courseError);
      dispatch(clearError());
    }
    if (cartError) {
      toast.error(cartError);
      // Optionally dispatch clearCartError if defined in cartSlice
    }
  }, [courseError, cartError, dispatch]);

  // Handle adding to cart
  const handleAddToCart = async (courseId, isFree) => {
    if (!isAuthenticated) {
      toast.error('يرجى تسجيل الدخول لإضافة الدورات إلى السلة');
      navigate('/login');
      return;
    }

    setIsAddingToCart((prev) => ({ ...prev, [courseId]: true }));
    try {
      const actionResult = await dispatch(
        addToCart({ courseId, isFree: isFree || false })
      );
      if (addToCart.fulfilled.match(actionResult)) {
        await dispatch(fetchCart());
        toast.success('تمت إضافة الدورة إلى السلة');
      } else {
        throw new Error(actionResult.payload || 'فشل إضافة الدورة إلى السلة');
      }
    } catch (error) {
      toast.error(error.message || 'حدث خطأ أثناء إضافة الدورة إلى السلة');
    } finally {
      setIsAddingToCart((prev) => ({ ...prev, [courseId]: false }));
    }
  };

  // Handle removing from cart
  const handleRemoveFromCart = async (courseId) => {
    if (!isAuthenticated) {
      toast.error('يرجى تسجيل الدخول لإزالة الدورات من السلة');
      navigate('/login');
      return;
    }

    setIsAddingToCart((prev) => ({ ...prev, [courseId]: true }));
    try {
      const actionResult = await dispatch(removeFromCart({ courseId }));
      if (removeFromCart.fulfilled.match(actionResult)) {
        await dispatch(fetchCart());
        toast.success('تمت إزالة الدورة من السلة');
      } else {
        throw new Error(actionResult.payload || 'فشل إزالة الدورة من السلة');
      }
    } catch (error) {
      toast.error(error.message || 'حدث خطأ أثناء إزالة الدورة من السلة');
    } finally {
      setIsAddingToCart((prev) => ({ ...prev, [courseId]: false }));
    }
  };

  // Filter and sort courses
  const filteredAndSortedCourses = courses
    .filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice =
        priceFilter === 'all' ||
        (priceFilter === 'free' && course.price === 0) ||
        (priceFilter === 'paid' && course.price > 0);

      const matchesCategory =
        categoryFilter === 'all' || course.category?.name === categoryFilter;

      return matchesSearch && matchesPrice && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.ratingsAverage || 0) - (a.ratingsAverage || 0);
        case 'popular':
          return (b.students?.length || 0) - (a.students?.length || 0);
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  // Combine loading states
  const isLoading = courseStatus === 'loading' || cartStatus === 'loading';

  if (isLoading) {
    return (
      <div
        className={`min-h-screen ${
          isDarkMode
            ? 'bg-gray-900'
            : 'bg-gradient-to-br from-blue-50 to-indigo-100'
        }`}
        dir="rtl"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <CourseSkeleton key={i} isDarkMode={isDarkMode} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (courseError) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode
            ? 'bg-gray-900'
            : 'bg-gradient-to-br from-blue-50 to-indigo-100'
        }`}
        dir="rtl"
      >
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-red-500 text-6xl mb-6">⚠️</div>
          <h3
            className={`text-2xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            فشل في تحميل الدورات
          </h3>
          <p
            className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            {courseError}
          </p>
          <Button
            onClick={() => dispatch(getCourses())}
            className="bg-blue-600 hover:bg-blue-700"
          >
            حاول مرة أخرى
          </Button>
        </div>
      </div>
    );
  }

  if (!courses.length) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode
            ? 'bg-gray-900'
            : 'bg-gradient-to-br from-blue-50 to-indigo-100'
        }`}
        dir="rtl"
      >
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-gray-400 text-6xl mb-6">📚</div>
          <h3
            className={`text-2xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            لا توجد دورات متاحة
          </h3>
          <p
            className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            تحقق لاحقاً للحصول على دورات جديدة
          </p>
          <Button
            onClick={() => dispatch(getCourses())}
            className="bg-blue-600 hover:bg-blue-700"
          >
            تحديث
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? 'bg-gray-900'
          : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      }`}
      dir="rtl"
    >
      <div className="container mx-auto px-4 py-6">
        {/* Header with modern gradient */}
        <div className="mb-8 text-center">
          <div className="relative inline-block">
            <h1
              className={`text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r ${
                isDarkMode
                  ? 'from-blue-400 to-purple-400'
                  : 'from-blue-600 to-purple-600'
              } bg-clip-text text-transparent`}
            >
              جميع الدورات
            </h1>
            <div className="absolute -bottom-2 right-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20"></div>
          </div>
          <p
            className={`text-lg mt-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            اختر من بين {courses.length} دورة تعليمية مع إضافات جديدة كل شهر
          </p>
        </div>

        {/* Enhanced Search and Filter Bar */}
        <div
          className={` top-4 z-20 mb-8 p-4 rounded-2xl shadow-lg border backdrop-blur-md ${
            isDarkMode
              ? 'bg-gray-800/90 border-gray-700'
              : 'bg-white/90 border-white/50'
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search with enhanced styling */}
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن أي شيء..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pr-12 pl-10 py-3 rounded-xl border-2 font-medium transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Sort with enhanced styling */}
            <div className="relative min-w-[160px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`appearance-none w-full pr-4 pl-10 py-3 rounded-xl border-2 font-medium cursor-pointer transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                }`}
              >
                <option value="newest">الأحدث</option>
                <option value="popular">الأكثر شعبية</option>
                <option value="rating">الأعلى تقييماً</option>
                <option value="price-low">السعر: من الأقل للأعلى</option>
                <option value="price-high">السعر: من الأعلى للأقل</option>
              </select>
              <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Filter Toggle with modern styling */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-medium transition-all duration-200 ${
                showFilters
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white shadow-lg'
                  : isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                    : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span>الفلاتر</span>
            </button>
          </div>

          {/* Expanded Filters with modern design */}
          {showFilters && (
            <div
              className={`mt-4 p-4 rounded-xl border-2 border-dashed ${
                isDarkMode
                  ? 'bg-gray-700/50 border-gray-600'
                  : 'bg-gray-50/50 border-gray-200'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-sm font-bold mb-2 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    السعر
                  </label>
                  <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className={`w-full p-3 rounded-xl border-2 font-medium transition-colors ${
                      isDarkMode
                        ? 'bg-gray-600 border-gray-500 text-white'
                        : 'bg-white border-gray-200 text-gray-900'
                    }`}
                  >
                    <option value="all">جميع الأسعار</option>
                    <option value="free">مجاني</option>
                    <option value="paid">مدفوع</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-bold mb-2 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    الفئة
                  </label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className={`w-full p-3 rounded-xl border-2 font-medium transition-colors ${
                      isDarkMode
                        ? 'bg-gray-600 border-gray-500 text-white'
                        : 'bg-white border-gray-200 text-gray-900'
                    }`}
                  >
                    <option value="all">جميع الفئات</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count with modern styling */}
        <div className="mb-6 flex items-center justify-between">
          <p
            className={`text-lg font-semibold flex items-center gap-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            {filteredAndSortedCourses.length}{' '}
            {filteredAndSortedCourses.length === 1 ? 'دورة' : 'دورة'}
          </p>
        </div>

        {/* Course Grid with smaller cards */}
        {filteredAndSortedCourses.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-6">🔍</div>
            <h3
              className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              لم يتم العثور على دورات
            </h3>
            <p
              className={`text-lg mb-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              حاول تعديل معايير البحث أو الفلاتر
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setPriceFilter('all');
                setCategoryFilter('all');
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              مسح جميع الفلاتر
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {filteredAndSortedCourses.map((course) => {
              const alreadyInCart = isCourseInCart(course._id);
              const isCourseAdding = isAddingToCart[course._id] || false;

              return (
                <div
                  key={course._id}
                  className={`group overflow-hidden rounded-2xl shadow-md border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                      : 'bg-white border-gray-100 hover:border-gray-200'
                  }`}
                >
                  {/* Course Image - smaller */}
                  <div className="relative overflow-hidden">
                    <img
                      src={course.coverPhoto || '/placeholder.png'}
                      alt={course.title}
                      className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => (e.target.src = '/placeholder.png')}
                    />

                    {/* Floating badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {course.priceAfterDiscount > 0 && (
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                          {Math.round(
                            ((course.price - course.priceAfterDiscount) /
                              course.price) *
                              100
                          )}
                          % خصم
                        </div>
                      )}
                      {course.videos?.some((v) => v.isPreview) && (
                        <div className="bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                          <PlayCircle className="w-3 h-3" />
                          معاينة
                        </div>
                      )}
                    </div>

                    {/* In Cart Badge */}
                    {alreadyInCart && (
                      <div className="absolute top-2 right-2">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                          <CheckCircle className="w-3 h-3" />
                          في السلة
                        </div>
                      </div>
                    )}

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Course Content - compact */}
                  <div className="p-3">
                    {/* Category */}
                    <div className="mb-2">
                      <span
                        className={`inline-block text-xs font-bold px-2 py-1 rounded-lg ${
                          isDarkMode
                            ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border border-blue-500/30'
                            : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {course.category?.name || 'غير مصنف'}
                      </span>
                    </div>

                    {/* Title - smaller */}
                    <h3
                      className={`text-sm font-bold mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {course.title}
                    </h3>

                    {/* Instructor - smaller */}
                    <p
                      className={`text-xs mb-2 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      بواسطة {course.instructor?.name || 'مدرب غير معروف'}
                    </p>

                    {/* Rating and Stats - compact */}
                    <div className="flex items-center justify-between mb-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span
                          className={`font-bold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {course.ratingsAverage?.toFixed(1) || '0.0'}
                        </span>
                        <span className="text-gray-500">
                          ({course.ratingsQuantity || 0})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{course.students?.length || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>
                            {Math.floor((course.videoLength || 0) / 60)}س{' '}
                            {(course.videoLength || 0) % 60}د
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price - compact */}
                    <div className="mb-3">
                      {course.price === 0 ? (
                        <span className="text-lg font-black text-green-600">
                          مجاني
                        </span>
                      ) : course.priceAfterDiscount < course.price &&
                        course.priceAfterDiscount >= 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-black text-green-600">
                            ${course.priceAfterDiscount.toFixed(2)}
                          </span>
                          <span
                            className={`text-sm line-through ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            ${course.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span
                          className={`text-lg font-black ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          ${course.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons - compact */}
                    <div className="flex flex-col gap-2">
                      <Link
                        to={`/courses/${course._id}`}
                        className={`text-center py-2 px-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                          isDarkMode
                            ? 'bg-gray-700 hover:bg-gray-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                        }`}
                      >
                        عرض التفاصيل
                      </Link>

                      {alreadyInCart ? (
                        <button
                          onClick={() => handleRemoveFromCart(course._id)}
                          disabled={isCourseAdding}
                          className={`py-2 px-3 rounded-xl text-sm font-bold text-white transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 ${
                            isCourseAdding
                              ? 'bg-gray-500 cursor-not-allowed'
                              : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg shadow-red-500/25'
                          }`}
                        >
                          {isCourseAdding ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              جارٍ الإزالة...
                            </>
                          ) : (
                            <>
                              <Trash2 className="w-4 h-4" />
                              إزالة من السلة
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleAddToCart(course._id, course.price === 0)
                          }
                          disabled={isCourseAdding}
                          className={`py-2 px-3 rounded-xl text-sm font-bold text-white transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 ${
                            isCourseAdding
                              ? 'bg-gray-500 cursor-not-allowed'
                              : course.price === 0
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/25'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25'
                          }`}
                        >
                          {isCourseAdding ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              جارٍ الإضافة...
                            </>
                          ) : course.price === 0 ? (
                            'التحق الآن'
                          ) : (
                            'أضف للسلة'
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
