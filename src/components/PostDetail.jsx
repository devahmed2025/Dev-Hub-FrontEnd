// import { useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getPost, clearError } from '../store/slices/communitySlice';
// import PostCard from './PostCard';
// import LoadingSpinner from './ui/LoadingSpinner';
// import { useDarkMode } from '../features/darkMode/useDarkMode';
// import { toast } from 'react-toastify';

// const PostDetail = () => {
//   const { postId } = useParams();
//   const dispatch = useDispatch();
//   const { isDarkMode } = useDarkMode();
//   const { currentPost, status, error } = useSelector(
//     (state) => state.community
//   );

//   useEffect(() => {
//     if (postId) {
//       dispatch(getPost(postId))
//         .unwrap()
//         .catch((err) => {
//           toast.error(err || 'فشل تحميل المنشور');
//         });
//     }
//   }, [dispatch, postId]);

//   useEffect(() => {
//     if (error && status.currentPost === 'failed') {
//       toast.error(error);
//       dispatch(clearError()); // Clear error after displaying
//     }
//   }, [error, status.currentPost, dispatch]);

//   if (status.currentPost === 'loading') {
//     return (
//       <div className="max-w-3xl mx-auto py-6">
//         <div
//           className={`p-6 rounded-xl shadow-sm border flex justify-center ${
//             isDarkMode
//               ? 'bg-gray-800 border-gray-700'
//               : 'bg-white border-gray-200'
//           }`}
//         >
//           <LoadingSpinner size="lg" />
//         </div>
//       </div>
//     );
//   }

//   if (!currentPost || status.currentPost === 'failed') {
//     return (
//       <div className="max-w-3xl mx-auto py-6">
//         <div
//           className={`p-6 rounded-xl shadow-sm border ${
//             isDarkMode
//               ? 'bg-gray-800 border-gray-700'
//               : 'bg-white border-gray-200'
//           }`}
//         >
//           <p
//             className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
//           >
//             المنشور غير موجود أو تم حذفه
//           </p>
//           <Link
//             to="/community"
//             className={`block text-center mt-4 text-blue-500 hover:text-blue-600`}
//           >
//             العودة إلى المجتمع
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto py-6">
//       <PostCard
//         post={currentPost}
//         showCommentsInitially={true}
//         onShare={() => {
//           if (navigator.share) {
//             navigator
//               .share({
//                 title: 'منشور من المجتمع',
//                 text: currentPost.content?.substring(0, 100) + '...',
//                 url: window.location.href,
//               })
//               .catch((err) => console.error('Share failed:', err));
//           } else {
//             navigator.clipboard.writeText(window.location.href);
//             toast.info('تم نسخ الرابط إلى الحافظة');
//           }
//         }}
//         onReport={() => {
//           toast.info('تم إرسال بلاغك للمراجعة');
//         }}
//       />
//     </div>
//   );
// };

// export default PostDetail;

import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, clearError } from '../store/slices/communitySlice';
import PostCard from './PostCard';
import LoadingSpinner from './ui/LoadingSpinner';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import { toast } from 'react-toastify';
import { ChevronLeft } from 'lucide-react';

const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const { currentPost, status, error } = useSelector(
    (state) => state.community
  );

  // Detect if content is Arabic
  const isArabic = (text) => {
    if (!text) return false;
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F]/;
    return arabicRegex.test(text);
  };

  const contentIsArabic = currentPost ? isArabic(currentPost.content) : false;

  useEffect(() => {
    if (postId) {
      dispatch(getPost(postId))
        .unwrap()
        .catch((err) => {
          toast.error(
            err || contentIsArabic ? 'فشل تحميل المنشور' : 'Failed to load post'
          );
        });
    }
  }, [dispatch, postId, contentIsArabic]);

  useEffect(() => {
    if (error && status.currentPost === 'failed') {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, status.currentPost, dispatch]);

  const handleBackToCommunity = () => {
    navigate('/community');
  };

  if (status.currentPost === 'loading') {
    return (
      <div className="max-w-3xl mx-auto py-6">
        <div
          className={`p-6 rounded-xl shadow-sm border flex justify-center ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (!currentPost || status.currentPost === 'failed') {
    return (
      <div className="max-w-3xl mx-auto py-6">
        <div
          className={`p-6 rounded-xl shadow-sm border ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <p
            className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
          >
            {contentIsArabic
              ? 'المنشور غير موجود أو تم حذفه'
              : 'Post not found or deleted'}
          </p>
          <Link
            to="/community?scrollToCreate=true"
            className={`block text-center mt-4 text-blue-500 hover:text-blue-600`}
          >
            {contentIsArabic ? 'العودة إلى المجتمع' : 'Back to Community'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6">
      <button
        onClick={handleBackToCommunity}
        className={`flex items-center gap-2 mb-4 px-4 py-2 rounded-lg text-sm font-medium ${
          isDarkMode
            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        {contentIsArabic ? 'العودة إلى المجتمع' : 'Back to Community'}
      </button>
      <PostCard
        post={currentPost}
        showCommentsInitially={true}
        onShare={() => {
          if (navigator.share) {
            navigator
              .share({
                title: contentIsArabic ? 'منشور من المجتمع' : 'Community Post',
                text: currentPost.content?.substring(0, 100) + '...',
                url: window.location.href,
              })
              .catch((err) => console.error('Share failed:', err));
          } else {
            navigator.clipboard.writeText(window.location.href);
            toast.info(
              contentIsArabic
                ? 'تم نسخ الرابط إلى الحافظة'
                : 'Link copied to clipboard'
            );
          }
        }}
        onReport={() => {
          toast.info(
            contentIsArabic
              ? 'تم إرسال بلاغك للمراجعة'
              : 'Your report has been submitted'
          );
        }}
      />
    </div>
  );
};

export default PostDetail;
