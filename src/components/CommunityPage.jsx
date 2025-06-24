import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPosts,
  resetPosts,
  clearError,
} from '../store/slices/communitySlice';
import PostCard from './PostCard';
import CommunitySidebar from './CommunitySidebar';
import PostCreationForm from './PostCreationForm';
import LoadingSpinner from './ui/LoadingSpinner';
import { Search, TrendingUp, Users, MessageSquare } from 'lucide-react';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import { Outlet, useMatch } from 'react-router-dom';
import { toast } from 'react-toastify';

const CommunityPage = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useDarkMode();
  const { posts, status, pagination, error } = useSelector(
    (state) => state.community
  );
  const { user } = useSelector((state) => state.auth);
  const lastRequestTime = useRef(0);
  const observer = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedTag, setSelectedTag] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const isPostDetail = useMatch('/community/posts/:postId');

  // // Debug state
  // useEffect(() => {
  //   // console.log('CommunityPage State:', {
  //   //   posts: posts?.length,
  //   //   status,
  //   //   pagination,
  //   //   error,
  //   //   page,
  //   //   hasMore,
  //   //   isFetching,
  //   // });
  // }, [posts, status, pagination, error, page, hasMore, isFetching]);

  const memoizedPosts = useMemo(() => posts || [], [posts]);

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = [...memoizedPosts];

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (post) =>
          post.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags?.includes(selectedTag));
    }

    switch (sortBy) {
      case 'popular':
        return filtered.sort(
          (a, b) => (b.likes?.length || 0) - (a.likes?.length || 0)
        );
      case 'trending':
        return filtered.sort((a, b) => {
          const aEngagement =
            (a.likes?.length || 0) + (a.comments?.length || 0);
          const bEngagement =
            (b.likes?.length || 0) + (b.comments?.length || 0);
          return bEngagement - aEngagement;
        });
      case 'recent':
      default:
        return filtered.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    }
  }, [memoizedPosts, searchQuery, selectedTag, sortBy]);

  const communityStats = useMemo(() => {
    const totalPosts = memoizedPosts.length;
    const totalLikes = memoizedPosts.reduce(
      (sum, post) => sum + (post.likes?.length || 0),
      0
    );
    const totalComments = memoizedPosts.reduce(
      (sum, post) => sum + (post.comments?.length || 0),
      0
    );
    const activeUsers = new Set(memoizedPosts.map((post) => post.user?._id))
      .size;

    return { totalPosts, totalLikes, totalComments, activeUsers };
  }, [memoizedPosts]);

  const fetchPosts = useCallback(
    async (pageNum = 1) => {
      if (pageNum < 1) {
        console.warn('Invalid page number:', pageNum);
        return;
      }
      const now = Date.now();
      if (now - lastRequestTime.current < 500 || isFetching || !hasMore) {
        // console.log('Fetch skipped:', {
        //   isFetching,
        //   hasMore,
        //   timeSinceLast: now - lastRequestTime.current,
        // });
        return;
      }

      lastRequestTime.current = now;
      setIsFetching(true);
      try {
        // console.log('Dispatching getPosts for page:', pageNum);
        await dispatch(getPosts({ page: pageNum })).unwrap();
        setPage(pageNum);
        if (pagination?.numberOfPages && pageNum >= pagination.numberOfPages) {
          // console.log('No more pages to fetch:', {
          //   pageNum,
          //   numberOfPages: pagination.numberOfPages,
          // });
          setHasMore(false);
        }
      } catch (err) {
        toast.error(err || 'فشل في جلب المنشورات');
        console.error('Failed to fetch posts:', err);
      } finally {
        setIsFetching(false);
      }
    },
    [dispatch, isFetching, hasMore, pagination?.numberOfPages]
  );

  const handleSearch = useCallback(
    (query) => {
      setSearchQuery(query);
      setPage(1);
      setHasMore(true);
      dispatch(resetPosts());
      fetchPosts(1);
    },
    [dispatch, fetchPosts]
  );

  const handleTagSelect = useCallback(
    (tag) => {
      setSelectedTag(tag);
      setPage(1);
      setHasMore(true);
      dispatch(resetPosts());
      fetchPosts(1);
    },
    [dispatch, fetchPosts]
  );

  const handleSharePost = useCallback((post) => {
    // console.log('Sharing post:', post);
  }, []);

  const handleReportPost = useCallback((post) => {
    // console.log('Reporting post:', post);
  }, []);

  const lastPostElementRef = useCallback(
    (node) => {
      if (isFetching || !hasMore) {
        // console.log('Observer skipped:', { isFetching, hasMore });
        return;
      }
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          // console.log('IntersectionObserver triggered:', {
          //   isIntersecting: entries[0].isIntersecting,
          //   hasMore,
          //   page,
          // });
          if (entries[0].isIntersecting && hasMore) {
            // console.log('Fetching next page:', page + 1);
            fetchPosts(page + 1);
          }
        },
        { threshold: 0.5, rootMargin: '200px' }
      );
      if (node) {
        // console.log('Observing node:', node);
        observer.current.observe(node);
      }
    },
    [isFetching, hasMore, fetchPosts, page]
  );

  useEffect(() => {
    if (!posts?.length && status.posts !== 'loading') {
      fetchPosts(1);
    }
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [fetchPosts, posts, status.posts]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <div
      className={`min-h-screen transition-colors ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* <img
          src="https://res.cloudinary.com/djzcvjwuv/image/upload/f_webp,q_auto,w_900,h_150,c_fill,g_auto/ChatGPT_Image_Jun_18_2025_02_20_18_PM_vyddao.png"
          alt="Community"
          className="mx-auto mb-4 rounded-full shadow-lg"
        /> */}
        <div
          className={`rounded-xl p-6 mb-8 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-sm`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* <div>
              <h1
                className={`text-3xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                مجتمع التعلم
              </h1>
              <p
                className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                شارك خبراتك وتعلم من الآخرين
              </p>
            </div> */}
            <div className="text-center">
              <h1
                className={`text-3xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                مجتمع التعلم
              </h1>
              <p
                className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                شارك خبراتك وتعلم من الآخرين
              </p>
            </div>

            <div className="flex gap-6">
              <div className="text-center">
                <div
                  className={`text-2xl font-bold ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}
                >
                  {communityStats.totalPosts}
                </div>
                <div
                  className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  منشور
                </div>
              </div>
              <div className="text-center">
                <div
                  className={`text-2xl font-bold ${
                    isDarkMode ? 'text-red-400' : 'text-red-600'
                  }`}
                >
                  {communityStats.totalLikes}
                </div>
                <div
                  className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  إعجاب
                </div>
              </div>
              <div className="text-center">
                <div
                  className={`text-2xl font-bold ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`}
                >
                  {communityStats.activeUsers}
                </div>
                <div
                  className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  عضو نشط
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <Outlet />
            {!isPostDetail && (
              <>
                {user && (
                  <div className="mb-6">
                    <PostCreationForm
                      onSuccess={() => {
                        dispatch(resetPosts());
                        fetchPosts(1);
                      }}
                    />
                  </div>
                )}
                <div
                  className={`p-4 rounded-xl mb-6 ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  } shadow-sm`}
                >
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="البحث في المنشورات..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSortBy('recent')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          sortBy === 'recent'
                            ? 'bg-blue-500 text-white'
                            : isDarkMode
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        الأحدث
                      </button>
                      <button
                        onClick={() => setSortBy('popular')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          sortBy === 'popular'
                            ? 'bg-blue-500 text-white'
                            : isDarkMode
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        الأكثر شعبية
                      </button>
                      <button
                        onClick={() => setSortBy('trending')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          sortBy === 'trending'
                            ? 'bg-blue-500 text-white'
                            : isDarkMode
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        الأكثر تفاعلاً
                      </button>
                    </div>
                  </div>
                  {(searchQuery || selectedTag) && (
                    <div
                      className={`mt-3 text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      تم العثور على {filteredAndSortedPosts.length} منشور
                      {searchQuery && ` للبحث "${searchQuery}"`}
                      {selectedTag && ` في تصنيف "${selectedTag}"`}
                    </div>
                  )}
                </div>
                <div>
                  {filteredAndSortedPosts.length > 0 ? (
                    filteredAndSortedPosts.map((post, index) => (
                      <div
                        key={post._id || post.tempId}
                        ref={
                          index === filteredAndSortedPosts.length - 1
                            ? lastPostElementRef
                            : null
                        }
                        style={
                          index === filteredAndSortedPosts.length - 1
                            ? { minHeight: '200px' }
                            : {}
                        }
                      >
                        <PostCard
                          post={post}
                          onShare={handleSharePost}
                          onReport={handleReportPost}
                        />
                      </div>
                    ))
                  ) : status.posts === 'loading' ? (
                    <div className="flex justify-center my-4">
                      <LoadingSpinner size="md" />
                    </div>
                  ) : (
                    <div
                      className={`text-center py-12 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">
                        لا توجد منشورات بعد
                      </p>
                      <p className="text-sm">كن أول من يشارك في المجتمع!</p>
                    </div>
                  )}
                  {hasMore && (
                    <div className="flex justify-center my-4">
                      <button
                        onClick={() => fetchPosts(page + 1)}
                        disabled={isFetching}
                        className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                          isDarkMode
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        } ${isFetching ? 'opacity-75 cursor-not-allowed' : ''}`}
                      >
                        {isFetching ? (
                          <>
                            <LoadingSpinner size="sm" />
                            جاري التحميل...
                          </>
                        ) : (
                          'تحميل المزيد'
                        )}
                      </button>
                    </div>
                  )}
                  {!hasMore && filteredAndSortedPosts.length > 0 && (
                    <div
                      className={`text-center py-4 text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      لا توجد منشورات إضافية
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="w-full lg:w-1/3">
            <CommunitySidebar
              posts={memoizedPosts}
              isDarkMode={isDarkMode}
              onTagSelect={handleTagSelect}
              selectedTag={selectedTag}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;

// import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   getPosts,
//   resetPosts,
//   clearError,
// } from '../store/slices/communitySlice';
// import PostCard from './PostCard';
// import CommunitySidebar from './CommunitySidebar';
// import PostCreationForm from './PostCreationForm';
// import LoadingSpinner from './ui/LoadingSpinner';
// import {
//   Search,
//   TrendingUp,
//   Users,
//   MessageSquare,
//   Sparkles,
//   Heart,
//   Activity,
// } from 'lucide-react';
// import { useDarkMode } from '../features/darkMode/useDarkMode';
// import { Outlet, useMatch } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const CommunityPage = () => {
//   const dispatch = useDispatch();
//   const { isDarkMode } = useDarkMode();
//   const { posts, status, pagination, error } = useSelector(
//     (state) => state.community
//   );
//   const { user } = useSelector((state) => state.auth);
//   const lastRequestTime = useRef(0);
//   const observer = useRef(null);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortBy, setSortBy] = useState('recent');
//   const [selectedTag, setSelectedTag] = useState('');
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [isFetching, setIsFetching] = useState(false);

//   const isPostDetail = useMatch('/community/posts/:postId');

//   // Debug state
//   useEffect(() => {
//     console.log('CommunityPage State:', {
//       posts: posts?.length,
//       status,
//       pagination,
//       error,
//       page,
//       hasMore,
//       isFetching,
//     });
//   }, [posts, status, pagination, error, page, hasMore, isFetching]);

//   const memoizedPosts = useMemo(() => posts || [], [posts]);

//   const filteredAndSortedPosts = useMemo(() => {
//     let filtered = [...memoizedPosts];

//     if (searchQuery.trim()) {
//       filtered = filtered.filter(
//         (post) =>
//           post.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           post.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (selectedTag) {
//       filtered = filtered.filter((post) => post.tags?.includes(selectedTag));
//     }

//     switch (sortBy) {
//       case 'popular':
//         return filtered.sort(
//           (a, b) => (b.likes?.length || 0) - (a.likes?.length || 0)
//         );
//       case 'trending':
//         return filtered.sort((a, b) => {
//           const aEngagement =
//             (a.likes?.length || 0) + (a.comments?.length || 0);
//           const bEngagement =
//             (b.likes?.length || 0) + (b.comments?.length || 0);
//           return bEngagement - aEngagement;
//         });
//       case 'recent':
//       default:
//         return filtered.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//     }
//   }, [memoizedPosts, searchQuery, selectedTag, sortBy]);

//   const communityStats = useMemo(() => {
//     const totalPosts = memoizedPosts.length;
//     const totalLikes = memoizedPosts.reduce(
//       (sum, post) => sum + (post.likes?.length || 0),
//       0
//     );
//     const totalComments = memoizedPosts.reduce(
//       (sum, post) => sum + (post.comments?.length || 0),
//       0
//     );
//     const activeUsers = new Set(memoizedPosts.map((post) => post.user?._id))
//       .size;

//     return { totalPosts, totalLikes, totalComments, activeUsers };
//   }, [memoizedPosts]);

//   const fetchPosts = useCallback(
//     async (pageNum = 1) => {
//       if (pageNum < 1) {
//         console.warn('Invalid page number:', pageNum);
//         return;
//       }
//       const now = Date.now();
//       if (now - lastRequestTime.current < 500 || isFetching || !hasMore) {
//         console.log('Fetch skipped:', {
//           isFetching,
//           hasMore,
//           timeSinceLast: now - lastRequestTime.current,
//         });
//         return;
//       }

//       lastRequestTime.current = now;
//       setIsFetching(true);
//       try {
//         console.log('Dispatching getPosts for page:', pageNum);
//         await dispatch(getPosts({ page: pageNum })).unwrap();
//         setPage(pageNum);
//         if (pagination?.numberOfPages && pageNum >= pagination.numberOfPages) {
//           console.log('No more pages to fetch:', {
//             pageNum,
//             numberOfPages: pagination.numberOfPages,
//           });
//           setHasMore(false);
//         }
//       } catch (err) {
//         toast.error(err || 'فشل في جلب المنشورات');
//         console.error('Failed to fetch posts:', err);
//       } finally {
//         setIsFetching(false);
//       }
//     },
//     [dispatch, isFetching, hasMore, pagination?.numberOfPages]
//   );

//   const handleSearch = useCallback(
//     (query) => {
//       setSearchQuery(query);
//       setPage(1);
//       setHasMore(true);
//       dispatch(resetPosts());
//       fetchPosts(1);
//     },
//     [dispatch, fetchPosts]
//   );

//   const handleTagSelect = useCallback(
//     (tag) => {
//       setSelectedTag(tag);
//       setPage(1);
//       setHasMore(true);
//       dispatch(resetPosts());
//       fetchPosts(1);
//     },
//     [dispatch, fetchPosts]
//   );

//   const handleSharePost = useCallback((post) => {
//     console.log('Sharing post:', post);
//   }, []);

//   const handleReportPost = useCallback((post) => {
//     console.log('Reporting post:', post);
//   }, []);

//   const lastPostElementRef = useCallback(
//     (node) => {
//       if (isFetching || !hasMore) {
//         console.log('Observer skipped:', { isFetching, hasMore });
//         return;
//       }
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver(
//         (entries) => {
//           console.log('IntersectionObserver triggered:', {
//             isIntersecting: entries[0].isIntersecting,
//             hasMore,
//             page,
//           });
//           if (entries[0].isIntersecting && hasMore) {
//             console.log('Fetching next page:', page + 1);
//             fetchPosts(page + 1);
//           }
//         },
//         { threshold: 0.5, rootMargin: '200px' }
//       );
//       if (node) {
//         console.log('Observing node:', node);
//         observer.current.observe(node);
//       }
//     },
//     [isFetching, hasMore, fetchPosts, page]
//   );

//   useEffect(() => {
//     if (!posts?.length && status.posts !== 'loading') {
//       fetchPosts(1);
//     }
//     return () => {
//       if (observer.current) observer.current.disconnect();
//     };
//   }, [fetchPosts, posts, status.posts]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearError());
//     }
//   }, [error, dispatch]);

//   return (
//     <div
//       className={`min-h-screen transition-all duration-500 ${
//         isDarkMode
//           ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
//           : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
//       }`}
//     >
//       {/* Animated background elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div
//           className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse ${
//             isDarkMode ? 'bg-blue-600' : 'bg-blue-400'
//           }`}
//         ></div>
//         <div
//           className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse delay-1000 ${
//             isDarkMode ? 'bg-purple-600' : 'bg-purple-400'
//           }`}
//         ></div>
//       </div>

//       <div className="container mx-auto px-4 py-8 relative z-10">
//         {/* Enhanced Header */}
//         <div
//           className={`rounded-2xl p-8 mb-8 backdrop-blur-sm border transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] ${
//             isDarkMode
//               ? 'bg-gray-800/80 border-gray-700/50 shadow-xl'
//               : 'bg-white/80 border-white/50 shadow-xl'
//           }`}
//         >
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             <div className="space-y-3">
//               <div className="flex items-center gap-3">
//                 <div
//                   className={`p-3 rounded-full ${
//                     isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
//                   }`}
//                 >
//                   <Sparkles
//                     className={`w-6 h-6 ${
//                       isDarkMode ? 'text-blue-400' : 'text-blue-600'
//                     }`}
//                   />
//                 </div>
//                 <h1
//                   className={`text-4xl font-bold bg-gradient-to-r ${
//                     isDarkMode
//                       ? 'from-blue-400 to-purple-400'
//                       : 'from-blue-600 to-purple-600'
//                   } bg-clip-text text-transparent`}
//                 >
//                   مجتمع التعلم
//                 </h1>
//               </div>
//               <p
//                 className={`text-lg ${
//                   isDarkMode ? 'text-gray-300' : 'text-gray-600'
//                 }`}
//               >
//                 شارك خبراتك وتعلم من الآخرين في بيئة تفاعلية ملهمة
//               </p>
//             </div>

//             {/* Enhanced Stats */}
//             <div className="grid grid-cols-3 gap-6">
//               <div
//                 className={`text-center p-4 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
//                   isDarkMode
//                     ? 'bg-blue-600/10 border border-blue-500/20'
//                     : 'bg-blue-50 border border-blue-200'
//                 }`}
//               >
//                 <div className="flex items-center justify-center mb-2">
//                   <MessageSquare
//                     className={`w-5 h-5 mr-2 ${
//                       isDarkMode ? 'text-blue-400' : 'text-blue-600'
//                     }`}
//                   />
//                   <div
//                     className={`text-2xl font-bold ${
//                       isDarkMode ? 'text-blue-400' : 'text-blue-600'
//                     }`}
//                   >
//                     {communityStats.totalPosts}
//                   </div>
//                 </div>
//                 <div
//                   className={`text-sm font-medium ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-600'
//                   }`}
//                 >
//                   منشور
//                 </div>
//               </div>

//               <div
//                 className={`text-center p-4 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
//                   isDarkMode
//                     ? 'bg-red-600/10 border border-red-500/20'
//                     : 'bg-red-50 border border-red-200'
//                 }`}
//               >
//                 <div className="flex items-center justify-center mb-2">
//                   <Heart
//                     className={`w-5 h-5 mr-2 ${
//                       isDarkMode ? 'text-red-400' : 'text-red-600'
//                     }`}
//                   />
//                   <div
//                     className={`text-2xl font-bold ${
//                       isDarkMode ? 'text-red-400' : 'text-red-600'
//                     }`}
//                   >
//                     {communityStats.totalLikes}
//                   </div>
//                 </div>
//                 <div
//                   className={`text-sm font-medium ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-600'
//                   }`}
//                 >
//                   إعجاب
//                 </div>
//               </div>

//               <div
//                 className={`text-center p-4 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
//                   isDarkMode
//                     ? 'bg-green-600/10 border border-green-500/20'
//                     : 'bg-green-50 border border-green-200'
//                 }`}
//               >
//                 <div className="flex items-center justify-center mb-2">
//                   <Users
//                     className={`w-5 h-5 mr-2 ${
//                       isDarkMode ? 'text-green-400' : 'text-green-600'
//                     }`}
//                   />
//                   <div
//                     className={`text-2xl font-bold ${
//                       isDarkMode ? 'text-green-400' : 'text-green-600'
//                     }`}
//                   >
//                     {communityStats.activeUsers}
//                   </div>
//                 </div>
//                 <div
//                   className={`text-sm font-medium ${
//                     isDarkMode ? 'text-gray-300' : 'text-gray-600'
//                   }`}
//                 >
//                   عضو نشط
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8">
//           <div className="w-full lg:w-2/3 space-y-6">
//             <Outlet />
//             {!isPostDetail && (
//               <>
//                 {user && (
//                   <div className="transform transition-all duration-300 hover:scale-[1.01]">
//                     <PostCreationForm
//                       onSuccess={() => {
//                         dispatch(resetPosts());
//                         fetchPosts(1);
//                       }}
//                     />
//                   </div>
//                 )}

//                 {/* Enhanced Search and Filter Section */}
//                 <div
//                   className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:shadow-lg ${
//                     isDarkMode
//                       ? 'bg-gray-800/80 border-gray-700/50 shadow-lg'
//                       : 'bg-white/80 border-white/50 shadow-lg'
//                   }`}
//                 >
//                   <div className="flex flex-col lg:flex-row gap-4">
//                     <div className="flex-1 relative group">
//                       <Search
//                         className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
//                           isDarkMode
//                             ? 'text-gray-400 group-focus-within:text-blue-400'
//                             : 'text-gray-500 group-focus-within:text-blue-500'
//                         }`}
//                       />
//                       <input
//                         type="text"
//                         placeholder="البحث في المنشورات..."
//                         value={searchQuery}
//                         onChange={(e) => handleSearch(e.target.value)}
//                         className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 ${
//                           isDarkMode
//                             ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700'
//                             : 'bg-gray-50/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white'
//                         }`}
//                       />
//                     </div>

//                     <div className="flex gap-3">
//                       {[
//                         { key: 'recent', label: 'الأحدث', icon: Activity },
//                         { key: 'popular', label: 'الأكثر شعبية', icon: Heart },
//                         {
//                           key: 'trending',
//                           label: 'الأكثر تفاعلاً',
//                           icon: TrendingUp,
//                         },
//                       ].map(({ key, label, icon: Icon }) => (
//                         <button
//                           key={key}
//                           onClick={() => setSortBy(key)}
//                           className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
//                             sortBy === key
//                               ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
//                               : isDarkMode
//                                 ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600'
//                                 : 'bg-gray-100/50 text-gray-700 hover:bg-gray-200/50 border border-gray-200'
//                           }`}
//                         >
//                           <Icon className="w-4 h-4" />
//                           {label}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   {(searchQuery || selectedTag) && (
//                     <div
//                       className={`mt-4 p-3 rounded-lg backdrop-blur-sm ${
//                         isDarkMode
//                           ? 'bg-blue-900/20 text-blue-300'
//                           : 'bg-blue-50 text-blue-700'
//                       }`}
//                     >
//                       <div className="flex items-center gap-2">
//                         <Search className="w-4 h-4" />
//                         <span className="text-sm font-medium">
//                           تم العثور على {filteredAndSortedPosts.length} منشور
//                           {searchQuery && ` للبحث "${searchQuery}"`}
//                           {selectedTag && ` في تصنيف "${selectedTag}"`}
//                         </span>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Posts Section */}
//                 <div className="space-y-6">
//                   {filteredAndSortedPosts.length > 0 ? (
//                     filteredAndSortedPosts.map((post, index) => (
//                       <div
//                         key={post._id || post.tempId}
//                         ref={
//                           index === filteredAndSortedPosts.length - 1
//                             ? lastPostElementRef
//                             : null
//                         }
//                         className="transform transition-all duration-300 hover:scale-[1.01]"
//                         style={{
//                           minHeight:
//                             index === filteredAndSortedPosts.length - 1
//                               ? '200px'
//                               : 'auto',
//                           animationDelay: `${index * 100}ms`,
//                         }}
//                       >
//                         <PostCard
//                           post={post}
//                           onShare={handleSharePost}
//                           onReport={handleReportPost}
//                         />
//                       </div>
//                     ))
//                   ) : status.posts === 'loading' ? (
//                     <div className="flex justify-center py-12">
//                       <div className="text-center">
//                         <LoadingSpinner size="lg" />
//                         <p
//                           className={`mt-4 text-lg ${
//                             isDarkMode ? 'text-gray-300' : 'text-gray-600'
//                           }`}
//                         >
//                           جاري تحميل المنشورات...
//                         </p>
//                       </div>
//                     </div>
//                   ) : (
//                     <div
//                       className={`text-center py-16 ${
//                         isDarkMode ? 'text-gray-400' : 'text-gray-500'
//                       }`}
//                     >
//                       <div
//                         className={`inline-flex p-6 rounded-full mb-6 ${
//                           isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
//                         }`}
//                       >
//                         <MessageSquare className="w-16 h-16 opacity-50" />
//                       </div>
//                       <h3 className="text-2xl font-bold mb-3">
//                         لا توجد منشورات بعد
//                       </h3>
//                       <p className="text-lg mb-6">
//                         كن أول من يشارك في المجتمع!
//                       </p>
//                       <div
//                         className={`w-24 h-1 mx-auto rounded-full bg-gradient-to-r ${
//                           isDarkMode
//                             ? 'from-blue-400 to-purple-400'
//                             : 'from-blue-500 to-purple-500'
//                         }`}
//                       ></div>
//                     </div>
//                   )}

//                   {/* Load More Button */}
//                   {hasMore && (
//                     <div className="flex justify-center py-6">
//                       <button
//                         onClick={() => fetchPosts(page + 1)}
//                         disabled={isFetching}
//                         className={`px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg ${
//                           isDarkMode
//                             ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-blue-500/25'
//                             : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-blue-500/25'
//                         } ${isFetching ? 'opacity-75 cursor-not-allowed scale-95' : 'hover:shadow-xl'}`}
//                       >
//                         {isFetching ? (
//                           <>
//                             <LoadingSpinner size="sm" />
//                             جاري التحميل...
//                           </>
//                         ) : (
//                           <>
//                             <TrendingUp className="w-5 h-5" />
//                             تحميل المزيد
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   )}

//                   {!hasMore && filteredAndSortedPosts.length > 0 && (
//                     <div
//                       className={`text-center py-8 ${
//                         isDarkMode ? 'text-gray-400' : 'text-gray-500'
//                       }`}
//                     >
//                       <div
//                         className={`w-16 h-1 mx-auto mb-4 rounded-full bg-gradient-to-r ${
//                           isDarkMode
//                             ? 'from-gray-600 to-gray-700'
//                             : 'from-gray-300 to-gray-400'
//                         }`}
//                       ></div>
//                       <p className="text-lg font-medium">
//                         لا توجد منشورات إضافية
//                       </p>
//                       <p className="text-sm mt-1">
//                         لقد وصلت إلى نهاية المنشورات
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>

//           <div className="w-full lg:w-1/3">
//             <div className="sticky top-8 transform transition-all duration-300 hover:scale-[1.01]">
//               <CommunitySidebar
//                 posts={memoizedPosts}
//                 isDarkMode={isDarkMode}
//                 onTagSelect={handleTagSelect}
//                 selectedTag={selectedTag}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommunityPage;
