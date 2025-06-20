// import { memo, useCallback, useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Heart,
//   MessageCircle,
//   Share2,
//   MoreVertical,
//   Flag,
//   BadgeCheck,
// } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   likeCommunityPost,
//   unlikeCommunityPost,
//   createCommunityComment,
// } from '../store/slices/communitySlice';
// import { useDarkMode } from '../features/darkMode/useDarkMode';
// import { toast } from 'react-toastify';

// const PostCard = memo(
//   ({ post, onShare, onReport, showCommentsInitially = false }) => {
//     const dispatch = useDispatch();
//     const { isDarkMode } = useDarkMode();
//     const userId = useSelector((state) => state.auth.user?._id);
//     const [showActions, setShowActions] = useState(false);
//     const [showComments, setShowComments] = useState(showCommentsInitially);
//     const [commentContent, setCommentContent] = useState('');

//     const isLiked = post?.likes?.includes(userId);
//     const commentCount = post?.comments?.length || 0;

//     const formatDate = useCallback((dateString) => {
//       if (!dateString) return '';
//       const date = new Date(dateString);
//       const now = new Date();
//       const diffTime = now - date;
//       const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//       if (diffDays === 0) return 'اليوم';
//       if (diffDays === 1) return 'منذ يوم واحد';
//       if (diffDays < 7) return `منذ ${diffDays} أيام`;
//       if (diffDays < 30) return `منذ ${Math.floor(diffDays / 7)} أسابيع`;
//       return date.toLocaleDateString('ar-EG');
//     }, []);

//     const handleLikeToggle = useCallback(async () => {
//       if (!post?._id || !userId) {
//         toast.error('يرجى تسجيل الدخول لتتمكن من الإعجاب');
//         return;
//       }
//       try {
//         const action = isLiked ? unlikeCommunityPost : likeCommunityPost;
//         await dispatch(action({ postId: post._id, userId })).unwrap();
//       } catch (err) {
//         toast.error('فشل في تحديث الإعجاب');
//         console.error('Failed to toggle like:', err);
//       }
//     }, [dispatch, post?._id, isLiked, userId]);

//     const handleShare = useCallback(() => {
//       if (onShare) {
//         onShare(post);
//       } else if (navigator.share) {
//         navigator
//           .share({
//             title: 'منشور من المجتمع',
//             text: post.content?.substring(0, 100) + '...',
//             url: window.location.origin + `/community/posts/${post._id}`,
//           })
//           .catch((err) => console.error('Share failed:', err));
//       } else {
//         toast.info('تم نسخ الرابط إلى الحافظة');
//         navigator.clipboard.writeText(
//           window.location.origin + `/community/posts/${post._id}`
//         );
//       }
//     }, [post, onShare]);

//     const handleReport = useCallback(() => {
//       if (onReport) {
//         onReport(post);
//         toast.info('تم إرسال بلاغك للمراجعة');
//       }
//       setShowActions(false);
//     }, [post, onReport]);

//     const handleCommentToggle = useCallback((e) => {
//       e.preventDefault();
//       e.stopPropagation();
//       setShowComments((prev) => !prev);
//     }, []);

//     const handleCommentSubmit = useCallback(
//       async (e) => {
//         e.preventDefault();
//         if (!commentContent.trim()) {
//           toast.error('يرجى إدخال تعليق');
//           return;
//         }
//         if (!userId) {
//           toast.error('يرجى تسجيل الدخول لتتمكن من التعليق');
//           return;
//         }
//         try {
//           await dispatch(
//             createCommunityComment({
//               postId: post._id,
//               commentData: { content: commentContent },
//             })
//           ).unwrap();
//           setCommentContent('');
//         } catch (error) {
//           toast.error(error || 'فشل إضافة التعليق');
//         }
//       },
//       [dispatch, commentContent, post._id, userId]
//     );

//     if (!post) return null;

//     return (
//       <div
//         className={`p-6 mb-6 rounded-xl shadow-sm border transition-colors overflow-hidden break-words  ${
//           isDarkMode
//             ? 'bg-gray-800 border-gray-700'
//             : 'bg-white border-gray-200'
//         }`}
//       >
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <img
//                 src={
//                   post.user?.profilePhoto ||
//                   'https://cdn-icons-png.flaticon.com/512/149/149071.png'
//                 }
//                 alt="User avatar"
//                 className="w-10 h-10 rounded-full object-cover border-2 border-transparent hover:border-blue-400 transition-colors"
//                 loading="lazy"
//               />
//               {post.user?.role === 'instructor' && (
//                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
//                   <span className="text-white text-xs">✓</span>
//                 </div>
//               )}
//             </div>
//             <div>
//               <div className="flex items-center gap-1">
//                 <span
//                   className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
//                 >
//                   {post.user?.name || 'مجهول'}
//                 </span>
//                 {post.user?.isVerified && (
//                   <BadgeCheck
//                     className="text-blue-500 w-4 h-4 inline-block ml-1"
//                     title="حساب موثق"
//                     aria-label="حساب موثق"
//                   />
//                 )}
//               </div>
//               {post.user?.role === 'instructor' && (
//                 <span className="text-blue-500 text-xs block">مدرس</span>
//               )}
//               <span
//                 className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
//               >
//                 {formatDate(post.createdAt)}
//               </span>
//             </div>
//           </div>

//           <div className="relative">
//             <button
//               onClick={() => setShowActions(!showActions)}
//               className={`p-2 rounded-full hover:bg-opacity-20 transition-colors ${
//                 isDarkMode
//                   ? 'text-gray-400 hover:bg-gray-700'
//                   : 'text-gray-500 hover:bg-gray-200'
//               }`}
//             >
//               <MoreVertical className="w-4 h-4" />
//             </button>

//             {showActions && (
//               <div
//                 className={`absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg border z-10 ${
//                   isDarkMode
//                     ? 'bg-gray-800 border-gray-700'
//                     : 'bg-white border-gray-200'
//                 }`}
//               >
//                 <button
//                   onClick={handleReport}
//                   className={`flex items-center gap-2 px-4 py-2 text-sm w-full text-left hover:bg-opacity-20 ${
//                     isDarkMode
//                       ? 'hover:bg-gray-700 text-red-500'
//                       : 'hover:bg-gray-200 text-red-600'
//                   }`}
//                 >
//                   <Flag className="w-4 h-4" />
//                   إبلاغ عن المنشور
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         <Link to={`posts/${post._id}`}>
//           <p
//             className={`text-sm mb-4 leading-relaxed ${
//               isDarkMode
//                 ? 'text-gray-200 hover:text-blue-400'
//                 : 'text-gray-800 hover:text-blue-600'
//             } transition-colors`}
//           >
//             {post.content || 'لا يوجد محتوى'}
//           </p>
//         </Link>

//         {post.tags?.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-4">
//             {post.tags.map((tag, index) => (
//               <Link
//                 key={`${post._id}_tag_${index}`}
//                 to={`/tags/${tag}`}
//                 className={`inline-block text-xs px-2 py-1 rounded-full transition-colors ${
//                   isDarkMode
//                     ? 'bg-blue-900 text-blue-300 hover:bg-blue-800'
//                     : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
//                 }`}
//               >
//                 #{tag}
//               </Link>
//             ))}
//           </div>
//         )}

//         <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
//           <div className="flex gap-6 ">
//             <button
//               onClick={handleLikeToggle}
//               disabled={!userId}
//               className={`flex items-center gap-2 text-sm ${
//                 isLiked
//                   ? 'text-red-500 hover:text-red-600'
//                   : isDarkMode
//                     ? 'text-gray-400  hover:text-red-400 bg-black'
//                     : 'text-gray-500 hover:text-red-500 bg-white'
//               }`}
//             >
//               <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
//               <span>{post.likes?.length || 0}</span>
//             </button>

//             <button
//               onClick={handleCommentToggle}
//               className={`flex items-center gap-2 text-sm ${
//                 isDarkMode
//                   ? 'text-gray-400 hover:text-blue-400 bg-black'
//                   : 'text-gray-500 hover:text-blue-500 bg-white'
//               }`}
//             >
//               <MessageCircle className="w-4 h-4" />
//               <span>{commentCount}</span>
//             </button>

//             <button
//               onClick={handleShare}
//               className={`flex items-center gap-2 text-sm ${
//                 isDarkMode
//                   ? 'text-gray-400 hover:text-blue-400 bg-slate-600'
//                   : 'text-gray-500 hover:text-blue-500 bg-white'
//               }`}
//             >
//               <Share2 className="w-4 h-4 " />
//               <span>مشاركة</span>
//             </button>
//           </div>
//         </div>

//         {showComments && (
//           <div className="mt-4">
//             {userId && (
//               <form onSubmit={handleCommentSubmit} className="mb-4">
//                 <textarea
//                   value={commentContent}
//                   onChange={(e) => setCommentContent(e.target.value)}
//                   placeholder="أضف تعليقك..."
//                   className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
//                     isDarkMode
//                       ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
//                       : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
//                   }`}
//                   rows="3"
//                 />
//                 <button
//                   type="submit"
//                   className={`mt-2 px-4 py-2 rounded-lg text-sm font-medium ${
//                     isDarkMode
//                       ? 'bg-blue-500 text-white hover:bg-blue-600'
//                       : 'bg-blue-500 text-white hover:bg-blue-600'
//                   }`}
//                 >
//                   إضافة تعليق
//                 </button>
//               </form>
//             )}
//             {commentCount > 0 ? (
//               <div className="space-y-3">
//                 {post?.comments.map((comment) => (
//                   <div
//                     key={comment._id}
//                     className={`p-3 rounded-lg ${
//                       isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
//                     }`}
//                   >
//                     <div className="flex items-center gap-2 mb-2">
//                       <img
//                         src={
//                           comment?.user?.profilePhoto ||
//                           'https://cdn-icons-png.flaticon.com/512/149/149071.png'
//                         }
//                         alt={comment.user?.name}
//                         className="w-8 h-8 rounded-full object-cover"
//                         loading="lazy"
//                       />
//                       <div>
//                         <div className="flex items-center gap-1">
//                           <p
//                             className={`text-sm font-semibold ${
//                               isDarkMode ? 'text-white' : 'text-gray-900'
//                             }`}
//                           >
//                             {comment.user?.name || 'مجهول'}
//                           </p>
//                           {comment.user?.isVerified && (
//                             <span
//                               className="text-blue-500 text-sm"
//                               title="حساب موثق"
//                               aria-label="حساب موثق"
//                             >
//                               ✅
//                             </span>
//                           )}
//                         </div>
//                         <p
//                           className={`text-xs ${
//                             isDarkMode ? 'text-gray-400' : 'text-gray-500'
//                           }`}
//                         >
//                           {formatDate(comment.createdAt)}
//                         </p>
//                       </div>
//                     </div>
//                     <p
//                       className={`text-sm ${
//                         isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}
//                     >
//                       {comment.content}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p
//                 className={`text-sm ${
//                   isDarkMode ? 'text-gray-400' : 'text-gray-500'
//                 }`}
//               >
//                 لا توجد تعليقات بعد
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   },
//   (prevProps, nextProps) => {
//     return (
//       prevProps.post?._id === nextProps.post?._id &&
//       prevProps.post?.likes?.length === nextProps.post?.likes?.length &&
//       prevProps.post?.comments?.length === nextProps.post?.comments?.length &&
//       prevProps.post?.content === nextProps.post?.content &&
//       prevProps.post?.user?.profilePhoto ===
//         nextProps.post?.user?.profilePhoto &&
//       prevProps.post?.user?.name === nextProps.post?.user?.name &&
//       prevProps.post?.user?.isVerified === nextProps.post?.user?.isVerified &&
//       prevProps.showCommentsInitially === nextProps.showCommentsInitially
//     );
//   }
// );

// PostCard.displayName = 'PostCard';
// export default PostCard;

// import { memo, useCallback, useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Heart,
//   MessageCircle,
//   Share2,
//   MoreVertical,
//   Flag,
//   BadgeCheck,
//   ChevronDown,
//   ChevronUp,
// } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   likeCommunityPost,
//   unlikeCommunityPost,
//   createCommunityComment,
// } from '../store/slices/communitySlice';
// import { useDarkMode } from '../features/darkMode/useDarkMode';
// import { toast } from 'react-toastify';

// // Rich text renderer component
// const RichTextRenderer = ({
//   content,
//   maxLength = 300,
//   showFullContent = false,
// }) => {
//   if (!content) return <span>No content available</span>;

//   // Parse rich text formatting
//   const parseRichText = (text) => {
//     if (typeof text !== 'string') return text;

//     // Replace formatting patterns
//     let parsedText = text
//       // Bold text: **text** or __text__
//       .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
//       .replace(/__(.*?)__/g, '<strong>$1</strong>')
//       // Semi-bold text: *text* or _text_
//       .replace(
//         /(?<!\*)\*([^*]+)\*(?!\*)/g,
//         '<em style="font-weight: 600;">$1</em>'
//       )
//       .replace(/(?<!_)_([^_]+)_(?!_)/g, '<em style="font-weight: 600;">$1</em>')
//       // Colored text: [color:text] or [#hex:text]
//       .replace(
//         /\[([a-zA-Z]+|#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}):(.*?)\]/g,
//         '<span style="color: $1;">$2</span>'
//       )
//       // Bullet points: - item or * item
//       .replace(/^[\s]*[-*]\s+(.+)$/gm, '<li>$1</li>')
//       // Line breaks
//       .replace(/\n/g, '<br>');

//     // Wrap list items in ul tags
//     parsedText = parsedText.replace(
//       /((?:<li>.*<\/li>\s*)+)/gs,
//       '<ul class="list-disc list-inside my-2 space-y-1">$1</ul>'
//     );

//     return parsedText;
//   };

//   const shouldTruncate = content.length > maxLength && !showFullContent;
//   const displayContent = shouldTruncate
//     ? content.substring(0, maxLength) + '...'
//     : content;
//   const formattedContent = parseRichText(displayContent);

//   return (
//     <div
//       className="rich-text-content"
//       dangerouslySetInnerHTML={{ __html: formattedContent }}
//     />
//   );
// };

// const PostCard = memo(
//   ({ post, onShare, onReport, showCommentsInitially = false }) => {
//     const dispatch = useDispatch();
//     const { isDarkMode } = useDarkMode();
//     const userId = useSelector((state) => state.auth.user?._id);
//     const [showActions, setShowActions] = useState(false);
//     const [showComments, setShowComments] = useState(showCommentsInitially);
//     const [commentContent, setCommentContent] = useState('');
//     const [showFullContent, setShowFullContent] = useState(false);

//     const isLiked = post?.likes?.includes(userId);
//     const commentCount = post?.comments?.length || 0;

//     // Detect if content is Arabic or mixed
//     const isArabic = (text) => {
//       if (!text) return false;
//       const arabicRegex = /[\u0600-\u06FF\u0750-\u077F]/;
//       return arabicRegex.test(text);
//     };

//     const formatDate = useCallback(
//       (dateString) => {
//         if (!dateString) return '';
//         const date = new Date(dateString);
//         const now = new Date();
//         const diffTime = now - date;
//         const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
//         const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
//         const diffMinutes = Math.floor(diffTime / (1000 * 60));

//         const contentIsArabic = isArabic(post?.content);

//         if (diffMinutes < 1) return contentIsArabic ? 'الآن' : 'now';
//         if (diffMinutes < 60)
//           return contentIsArabic
//             ? `منذ ${diffMinutes} دقيقة`
//             : `${diffMinutes}m ago`;
//         if (diffHours < 24)
//           return contentIsArabic
//             ? `منذ ${diffHours} ساعة`
//             : `${diffHours}h ago`;
//         if (diffDays === 0) return contentIsArabic ? 'اليوم' : 'today';
//         if (diffDays === 1)
//           return contentIsArabic ? 'منذ يوم واحد' : '1 day ago';
//         if (diffDays < 7)
//           return contentIsArabic ? `منذ ${diffDays} أيام` : `${diffDays}d ago`;
//         if (diffDays < 30)
//           return contentIsArabic
//             ? `منذ ${Math.floor(diffDays / 7)} أسابيع`
//             : `${Math.floor(diffDays / 7)}w ago`;

//         return contentIsArabic
//           ? date.toLocaleDateString('ar-EG')
//           : date.toLocaleDateString('en-US');
//       },
//       [post?.content]
//     );

//     const handleLikeToggle = useCallback(async () => {
//       if (!post?._id || !userId) {
//         const message = isArabic(post?.content)
//           ? 'يرجى تسجيل الدخول لتتمكن من الإعجاب'
//           : 'Please login to like posts';
//         toast.error(message);
//         return;
//       }
//       try {
//         const action = isLiked ? unlikeCommunityPost : likeCommunityPost;
//         await dispatch(action({ postId: post._id, userId })).unwrap();
//       } catch (err) {
//         const message = isArabic(post?.content)
//           ? 'فشل في تحديث الإعجاب'
//           : 'Failed to update like';
//         toast.error(message);
//         console.error('Failed to toggle like:', err);
//       }
//     }, [dispatch, post?._id, isLiked, userId, post?.content]);

//     const handleShare = useCallback(() => {
//       const contentIsArabic = isArabic(post?.content);

//       if (onShare) {
//         onShare(post);
//       } else if (navigator.share) {
//         navigator
//           .share({
//             title: contentIsArabic ? 'منشور من المجتمع' : 'Community Post',
//             text: post.content?.substring(0, 100) + '...',
//             url: window.location.origin + `/community/posts/${post._id}`,
//           })
//           .catch((err) => console.error('Share failed:', err));
//       } else {
//         const message = contentIsArabic
//           ? 'تم نسخ الرابط إلى الحافظة'
//           : 'Link copied to clipboard';
//         toast.info(message);
//         navigator.clipboard.writeText(
//           window.location.origin + `/community/posts/${post._id}`
//         );
//       }
//     }, [post, onShare]);

//     const handleReport = useCallback(() => {
//       if (onReport) {
//         onReport(post);
//         const message = isArabic(post?.content)
//           ? 'تم إرسال بلاغك للمراجعة'
//           : 'Report submitted for review';
//         toast.info(message);
//       }
//       setShowActions(false);
//     }, [post, onReport]);

//     const handleCommentToggle = useCallback((e) => {
//       e.preventDefault();
//       e.stopPropagation();
//       setShowComments((prev) => !prev);
//     }, []);

//     const handleCommentSubmit = useCallback(
//       async (e) => {
//         e.preventDefault();
//         const contentIsArabic = isArabic(post?.content);

//         if (!commentContent.trim()) {
//           const message = contentIsArabic
//             ? 'يرجى إدخال تعليق'
//             : 'Please enter a comment';
//           toast.error(message);
//           return;
//         }
//         if (!userId) {
//           const message = contentIsArabic
//             ? 'يرجى تسجيل الدخول لتتمكن من التعليق'
//             : 'Please login to comment';
//           toast.error(message);
//           return;
//         }
//         try {
//           await dispatch(
//             createCommunityComment({
//               postId: post._id,
//               commentData: { content: commentContent },
//             })
//           ).unwrap();
//           setCommentContent('');
//         } catch (error) {
//           const message =
//             error ||
//             (contentIsArabic ? 'فشل إضافة التعليق' : 'Failed to add comment');
//           toast.error(message);
//         }
//       },
//       [dispatch, commentContent, post._id, userId, post?.content]
//     );

//     const toggleContentView = useCallback(() => {
//       setShowFullContent((prev) => !prev);
//     }, []);

//     if (!post) return null;

//     const contentIsArabic = isArabic(post?.content);
//     const shouldShowSeeMore = post?.content && post.content.length > 300;

//     return (
//       <div
//         className={`p-6 mb-6 rounded-xl shadow-sm border transition-colors overflow-hidden break-words ${
//           isDarkMode
//             ? 'bg-gray-800 border-gray-700'
//             : 'bg-white border-gray-200'
//         }`}
//         dir={contentIsArabic ? 'rtl' : 'ltr'}
//       >
//         {/* Custom styles for rich text */}
//         <style >{`
//           .rich-text-content ul {
//             padding-inline-start: ${contentIsArabic ? '20px' : '20px'};
//           }
//           .rich-text-content li {
//             margin: 4px 0;
//           }
//           .rich-text-content strong {
//             font-weight: 700;
//           }
//         `}</style>

//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <img
//                 src={
//                   post.user?.profilePhoto ||
//                   'https://cdn-icons-png.flaticon.com/512/149/149071.png'
//                 }
//                 alt="User avatar"
//                 className="w-10 h-10 rounded-full object-cover border-2 border-transparent hover:border-blue-400 transition-colors"
//                 loading="lazy"
//               />
//               {post.user?.role === 'instructor' && (
//                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
//                   <span className="text-white text-xs">✓</span>
//                 </div>
//               )}
//             </div>
//             <div>
//               <div className="flex items-center gap-1">
//                 <span
//                   className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
//                 >
//                   {post.user?.name || (contentIsArabic ? 'مجهول' : 'Anonymous')}
//                 </span>
//                 {post.user?.isVerified && (
//                   <BadgeCheck
//                     className="text-blue-500 w-4 h-4 inline-block ml-1"
//                     title={contentIsArabic ? 'حساب موثق' : 'Verified account'}
//                     aria-label={
//                       contentIsArabic ? 'حساب موثق' : 'Verified account'
//                     }
//                   />
//                 )}
//               </div>
//               {post.user?.role === 'instructor' && (
//                 <span className="text-blue-500 text-xs block">
//                   {contentIsArabic ? 'مدرس' : 'Instructor'}
//                 </span>
//               )}
//               <span
//                 className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
//               >
//                 {formatDate(post.createdAt)}
//               </span>
//             </div>
//           </div>

//           <div className="relative">
//             <button
//               onClick={() => setShowActions(!showActions)}
//               className={`p-2 rounded-full hover:bg-opacity-20 transition-colors ${
//                 isDarkMode
//                   ? 'text-gray-400 hover:bg-gray-700'
//                   : 'text-gray-500 hover:bg-gray-200'
//               }`}
//             >
//               <MoreVertical className="w-4 h-4" />
//             </button>

//             {showActions && (
//               <div
//                 className={`absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg border z-10 ${
//                   isDarkMode
//                     ? 'bg-gray-800 border-gray-700'
//                     : 'bg-white border-gray-200'
//                 }`}
//               >
//                 <button
//                   onClick={handleReport}
//                   className={`flex items-center gap-2 px-4 py-2 text-sm w-full text-left hover:bg-opacity-20 ${
//                     isDarkMode
//                       ? 'hover:bg-gray-700 text-red-500'
//                       : 'hover:bg-gray-200 text-red-600'
//                   }`}
//                 >
//                   <Flag className="w-4 h-4" />
//                   {contentIsArabic ? 'إبلاغ عن المنشور' : 'Report Post'}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         <Link to={`posts/${post._id}`}>
//           <div
//             // className={`text-sm mb-4 leading-relaxed ${
//             //   isDarkMode
//             //     ? 'text-gray-200 hover:text-blue-400'
//             //     : 'text-gray-800 hover:text-blue-600'
//             // } transition-colors`}
//           >
//             <RichTextRenderer
//               content={
//                 post.content ||
//                 (contentIsArabic ? 'لا يوجد محتوى' : 'No content')
//               }
//               showFullContent={showFullContent}
//             />

//             {shouldShowSeeMore && (
//               <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   e.stopPropagation();
//                   toggleContentView();
//                 }}
//                 className={`flex items-center gap-1 mt-2 text-sm font-medium ${
//                   isDarkMode
//                     ? 'text-blue-400 hover:text-blue-300'
//                     : 'text-blue-600 hover:text-blue-500'
//                 } transition-colors`}
//               >
//                 {showFullContent ? (
//                   <>
//                     <ChevronUp className="w-4 h-4" />
//                     {contentIsArabic ? 'عرض أقل' : 'Show less'}
//                   </>
//                 ) : (
//                   <>
//                     <ChevronDown className="w-4 h-4" />
//                     {contentIsArabic ? 'عرض المزيد' : 'See more'}
//                   </>
//                 )}
//               </button>
//             )}
//           </div>
//         </Link>

//         {post.tags?.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-4">
//             {post.tags.map((tag, index) => (
//               <Link
//                 key={`${post._id}_tag_${index}`}
//                 to={`/tags/${tag}`}
//                 className={`inline-block text-xs px-2 py-1 rounded-full transition-colors ${
//                   isDarkMode
//                     ? 'bg-blue-900 text-blue-300 hover:bg-blue-800'
//                     : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
//                 }`}
//               >
//                 #{tag}
//               </Link>
//             ))}
//           </div>
//         )}

//         <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
//           <div className="flex gap-6 ">
//             <button
//               onClick={handleLikeToggle}
//               disabled={!userId}
//               className={`flex items-center gap-2 text-sm transition-colors ${
//                 isLiked
//                   ? 'text-red-500 hover:text-red-600'
//                   : isDarkMode
//                     ? 'text-gray-400 hover:text-red-400'
//                     : 'text-gray-500 hover:text-red-500'
//               }`}
//             >
//               <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
//               <span>{post.likes?.length || 0}</span>
//             </button>

//             <button
//               onClick={handleCommentToggle}
//               className={`flex items-center gap-2 text-sm transition-colors ${
//                 isDarkMode
//                   ? 'text-gray-400 hover:text-blue-400'
//                   : 'text-gray-500 hover:text-blue-500'
//               }`}
//             >
//               <MessageCircle className="w-4 h-4" />
//               <span>{commentCount}</span>
//             </button>

//             <button
//               onClick={handleShare}
//               className={`flex items-center gap-2 text-sm transition-colors ${
//                 isDarkMode
//                   ? 'text-gray-400 hover:text-blue-400'
//                   : 'text-gray-500 hover:text-blue-500'
//               }`}
//             >
//               <Share2 className="w-4 h-4 " />
//               <span>{contentIsArabic ? 'مشاركة' : 'Share'}</span>
//             </button>
//           </div>
//         </div>

//         {showComments && (
//           <div className="mt-4">
//             {userId && (
//               <form onSubmit={handleCommentSubmit} className="mb-4">
//                 <textarea
//                   value={commentContent}
//                   onChange={(e) => setCommentContent(e.target.value)}
//                   placeholder={
//                     contentIsArabic ? 'أضف تعليقك...' : 'Add your comment...'
//                   }
//                   className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
//                     isDarkMode
//                       ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
//                       : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
//                   }`}
//                   rows="3"
//                   dir={contentIsArabic ? 'rtl' : 'ltr'}
//                 />
//                 <button
//                   type="submit"
//                   className={`mt-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                     isDarkMode
//                       ? 'bg-blue-500 text-white hover:bg-blue-600'
//                       : 'bg-blue-500 text-white hover:bg-blue-600'
//                   }`}
//                 >
//                   {contentIsArabic ? 'إضافة تعليق' : 'Add Comment'}
//                 </button>
//               </form>
//             )}
//             {commentCount > 0 ? (
//               <div className="space-y-3">
//                 {post?.comments.map((comment) => (
//                   <div
//                     key={comment._id}
//                     className={`p-3 rounded-lg ${
//                       isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
//                     }`}
//                   >
//                     <div className="flex items-center gap-2 mb-2">
//                       <img
//                         src={
//                           comment?.user?.profilePhoto ||
//                           'https://cdn-icons-png.flaticon.com/512/149/149071.png'
//                         }
//                         alt={comment.user?.name}
//                         className="w-8 h-8 rounded-full object-cover"
//                         loading="lazy"
//                       />
//                       <div>
//                         <div className="flex items-center gap-1">
//                           <p
//                             className={`text-sm font-semibold ${
//                               isDarkMode ? 'text-white' : 'text-gray-900'
//                             }`}
//                           >
//                             {comment.user?.name ||
//                               (contentIsArabic ? 'مجهول' : 'Anonymous')}
//                           </p>
//                           {comment.user?.isVerified && (
//                             <span
//                               className="text-blue-500 text-sm"
//                               title={
//                                 contentIsArabic
//                                   ? 'حساب موثق'
//                                   : 'Verified account'
//                               }
//                               aria-label={
//                                 contentIsArabic
//                                   ? 'حساب موثق'
//                                   : 'Verified account'
//                               }
//                             >
//                               ✅
//                             </span>
//                           )}
//                         </div>
//                         <p
//                           className={`text-xs ${
//                             isDarkMode ? 'text-gray-400' : 'text-gray-500'
//                           }`}
//                         >
//                           {formatDate(comment.createdAt)}
//                         </p>
//                       </div>
//                     </div>
//                     <div
//                       className={`text-sm ${
//                         isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}
//                       dir={isArabic(comment.content) ? 'rtl' : 'ltr'}
//                     >
//                       <RichTextRenderer content={comment.content} />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p
//                 className={`text-sm ${
//                   isDarkMode ? 'text-gray-400' : 'text-gray-500'
//                 }`}
//               >
//                 {contentIsArabic ? 'لا توجد تعليقات بعد' : 'No comments yet'}
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   },
//   (prevProps, nextProps) => {
//     return (
//       prevProps.post?._id === nextProps.post?._id &&
//       prevProps.post?.likes?.length === nextProps.post?.likes?.length &&
//       prevProps.post?.comments?.length === nextProps.post?.comments?.length &&
//       prevProps.post?.content === nextProps.post?.content &&
//       prevProps.post?.user?.profilePhoto ===
//         nextProps.post?.user?.profilePhoto &&
//       prevProps.post?.user?.name === nextProps.post?.user?.name &&
//       prevProps.post?.user?.isVerified === nextProps.post?.user?.isVerified &&
//       prevProps.showCommentsInitially === nextProps.showCommentsInitially
//     );
//   }
// );

// PostCard.displayName = 'PostCard';
// export default PostCard;


import { memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  Flag,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  likeCommunityPost,
  unlikeCommunityPost,
  createCommunityComment,
} from '../store/slices/communitySlice';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import { toast } from 'react-toastify';

// Rich text renderer component with fixed color styling
const RichTextRenderer = ({
  content,
  maxLength = 300,
  showFullContent = false,
  isDarkMode = false,
}) => {
  if (!content) return <span>No content available</span>;

  // Parse rich text formatting
  const parseRichText = (text) => {
    if (typeof text !== 'string') return text;

    // Base text color class
    const textColorClass = isDarkMode ? 'text-gray-200' : 'text-gray-800';

    // Replace formatting patterns
    let parsedText = text
      // Bold text: **text** or __text__
      .replace(
        /\*\*(.*?)\*\*/g,
        `<strong class="font-bold ${textColorClass}">$1</strong>`
      )
      .replace(
        /__(.*?)__/g,
        `<strong class="font-bold ${textColorClass}">$1</strong>`
      )
      // Semi-bold text: *text* or _text_
      .replace(
        /(?<!\*)\*([^*]+)\*(?!\*)/g,
        `<em class="font-semibold ${textColorClass}">$1</em>`
      )
      .replace(
        /(?<!_)_([^_]+)_(?!_)/g,
        `<em class="font-semibold ${textColorClass}">$1</em>`
      )
      // Colored text: [color:text] or [#hex:text]
      .replace(
        /\[([a-zA-Z]+|#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}):(.*?)\]/g,
        '<span style="color: $1;">$2</span>'
      )
      // Bullet points: - item or * item
      .replace(/^[\s]*[-*]\s+(.+)$/gm, `<li class="${textColorClass}">$1</li>`)
      // Line breaks
      .replace(/\n/g, '<br>');

    // Wrap list items in ul tags
    parsedText = parsedText.replace(
      /((?:<li.*?>.*<\/li>\s*)+)/gs,
      `<ul class="list-disc list-inside my-2 space-y-1 ${textColorClass}">$1</ul>`
    );

    // Add base text color to the entire content
    parsedText = `<div class="${textColorClass}">${parsedText}</div>`;

    return parsedText;
  };

  const shouldTruncate = content.length > maxLength && !showFullContent;
  const displayContent = shouldTruncate
    ? content.substring(0, maxLength) + '...'
    : content;
  const formattedContent = parseRichText(displayContent);

  return (
    <div
      className="rich-text-content"
      dangerouslySetInnerHTML={{ __html: formattedContent }}
    />
  );
};

const PostCard = memo(
  ({ post, onShare, onReport, showCommentsInitially = false }) => {
    const dispatch = useDispatch();
    const { isDarkMode } = useDarkMode();
    const userId = useSelector((state) => state.auth.user?._id);
    const [showActions, setShowActions] = useState(false);
    const [showComments, setShowComments] = useState(showCommentsInitially);
    const [commentContent, setCommentContent] = useState('');
    const [showFullContent, setShowFullContent] = useState(false);

    const isLiked = post?.likes?.includes(userId);
    const commentCount = post?.comments?.length || 0;

    // Detect if content is Arabic or mixed
    const isArabic = (text) => {
      if (!text) return false;
      const arabicRegex = /[\u0600-\u06FF\u0750-\u077F]/;
      return arabicRegex.test(text);
    };

    const formatDate = useCallback(
      (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = now - date;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffTime / (1000 * 60));

        const contentIsArabic = isArabic(post?.content);

        if (diffMinutes < 1) return contentIsArabic ? 'الآن' : 'now';
        if (diffMinutes < 60)
          return contentIsArabic
            ? `منذ ${diffMinutes} دقيقة`
            : `${diffMinutes}m ago`;
        if (diffHours < 24)
          return contentIsArabic
            ? `منذ ${diffHours} ساعة`
            : `${diffHours}h ago`;
        if (diffDays === 0) return contentIsArabic ? 'اليوم' : 'today';
        if (diffDays === 1)
          return contentIsArabic ? 'منذ يوم واحد' : '1 day ago';
        if (diffDays < 7)
          return contentIsArabic ? `منذ ${diffDays} أيام` : `${diffDays}d ago`;
        if (diffDays < 30)
          return contentIsArabic
            ? `منذ ${Math.floor(diffDays / 7)} أسابيع`
            : `${Math.floor(diffDays / 7)}w ago`;

        return contentIsArabic
          ? date.toLocaleDateString('ar-EG')
          : date.toLocaleDateString('en-US');
      },
      [post?.content]
    );

    const handleLikeToggle = useCallback(async () => {
      if (!post?._id || !userId) {
        const message = isArabic(post?.content)
          ? 'يرجى تسجيل الدخول لتتمكن من الإعجاب'
          : 'Please login to like posts';
        toast.error(message);
        return;
      }
      try {
        const action = isLiked ? unlikeCommunityPost : likeCommunityPost;
        await dispatch(action({ postId: post._id, userId })).unwrap();
      } catch (err) {
        const message = isArabic(post?.content)
          ? 'فشل في تحديث الإعجاب'
          : 'Failed to update like';
        toast.error(message);
        console.error('Failed to toggle like:', err);
      }
    }, [dispatch, post?._id, isLiked, userId, post?.content]);

    const handleShare = useCallback(() => {
      const contentIsArabic = isArabic(post?.content);

      if (onShare) {
        onShare(post);
      } else if (navigator.share) {
        navigator
          .share({
            title: contentIsArabic ? 'منشور من المجتمع' : 'Community Post',
            text: post.content?.substring(0, 100) + '...',
            url: window.location.origin + `/community/posts/${post._id}`,
          })
          .catch((err) => console.error('Share failed:', err));
      } else {
        const message = contentIsArabic
          ? 'تم نسخ الرابط إلى الحافظة'
          : 'Link copied to clipboard';
        toast.info(message);
        navigator.clipboard.writeText(
          window.location.origin + `/community/posts/${post._id}`
        );
      }
    }, [post, onShare]);

    const handleReport = useCallback(() => {
      if (onReport) {
        onReport(post);
        const message = isArabic(post?.content)
          ? 'تم إرسال بلاغك للمراجعة'
          : 'Report submitted for review';
        toast.info(message);
      }
      setShowActions(false);
    }, [post, onReport]);

    const handleCommentToggle = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
      setShowComments((prev) => !prev);
    }, []);

    const handleCommentSubmit = useCallback(
      async (e) => {
        e.preventDefault();
        const contentIsArabic = isArabic(post?.content);

        if (!commentContent.trim()) {
          const message = contentIsArabic
            ? 'يرجى إدخال تعليق'
            : 'Please enter a comment';
          toast.error(message);
          return;
        }
        if (!userId) {
          const message = contentIsArabic
            ? 'يرجى تسجيل الدخول لتتمكن من التعليق'
            : 'Please login to comment';
          toast.error(message);
          return;
        }
        try {
          await dispatch(
            createCommunityComment({
              postId: post._id,
              commentData: { content: commentContent },
            })
          ).unwrap();
          setCommentContent('');
        } catch (error) {
          const message =
            error ||
            (contentIsArabic ? 'فشل إضافة التعليق' : 'Failed to add comment');
          toast.error(message);
        }
      },
      [dispatch, commentContent, post._id, userId, post?.content]
    );

    const toggleContentView = useCallback(() => {
      setShowFullContent((prev) => !prev);
    }, []);

    if (!post) return null;

    const contentIsArabic = isArabic(post?.content);
    const shouldShowSeeMore = post?.content && post.content.length > 300;

    return (
      <div
        className={`p-6 mb-6 rounded-xl shadow-sm border transition-colors overflow-hidden break-words ${
          isDarkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}
        dir={contentIsArabic ? 'rtl' : 'ltr'}
      >
        {/* Custom styles for rich text */}
        <style>{`
          .rich-text-content ul {
            padding-inline-start: ${contentIsArabic ? '20px' : '20px'};
          }
          .rich-text-content li {
            margin: 4px 0;
          }
          .rich-text-content strong {
            font-weight: 700;
          }
          .rich-text-content a {
            color: ${isDarkMode ? '#60a5fa' : '#2563eb'};
            text-decoration: underline;
          }
        `}</style>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={
                  post.user?.profilePhoto ||
                  'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                }
                alt="User avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-transparent hover:border-blue-400 transition-colors"
                loading="lazy"
              />
              {post.user?.role === 'instructor' && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span
                  className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                  {post.user?.name || (contentIsArabic ? 'مجهول' : 'Anonymous')}
                </span>
                {post.user?.isVerified && (
                  <BadgeCheck
                    className="text-blue-500 w-4 h-4 inline-block ml-1"
                    title={contentIsArabic ? 'حساب موثق' : 'Verified account'}
                    aria-label={
                      contentIsArabic ? 'حساب موثق' : 'Verified account'
                    }
                  />
                )}
              </div>
              {post.user?.role === 'instructor' && (
                <span className="text-blue-500 text-xs block">
                  {contentIsArabic ? 'مدرس' : 'Instructor'}
                </span>
              )}
              <span
                className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
              >
                {formatDate(post.createdAt)}
              </span>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className={`p-2 rounded-full hover:bg-opacity-20 transition-colors ${
                isDarkMode
                  ? 'text-gray-400 hover:bg-gray-700'
                  : 'text-gray-500 hover:bg-gray-200'
              }`}
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showActions && (
              <div
                className={`absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg border z-10 ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}
              >
                <button
                  onClick={handleReport}
                  className={`flex items-center gap-2 px-4 py-2 text-sm w-full text-left hover:bg-opacity-20 ${
                    isDarkMode
                      ? 'hover:bg-gray-700 text-red-500'
                      : 'hover:bg-gray-200 text-red-600'
                  }`}
                >
                  <Flag className="w-4 h-4" />
                  {contentIsArabic ? 'إبلاغ عن المنشور' : 'Report Post'}
                </button>
              </div>
            )}
          </div>
        </div>

        <Link to={`posts/${post._id}`}>
          <div>
            <RichTextRenderer
              content={
                post.content ||
                (contentIsArabic ? 'لا يوجد محتوى' : 'No content')
              }
              showFullContent={showFullContent}
              isDarkMode={isDarkMode}
            />

            {shouldShowSeeMore && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleContentView();
                }}
                className={`flex items-center gap-1 mt-2 text-sm font-medium ${
                  isDarkMode
                    ? 'text-blue-400 hover:text-blue-300'
                    : 'text-blue-600 hover:text-blue-500'
                } transition-colors`}
              >
                {showFullContent ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    {contentIsArabic ? 'عرض أقل' : 'Show less'}
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    {contentIsArabic ? 'عرض المزيد' : 'See more'}
                  </>
                )}
              </button>
            )}
          </div>
        </Link>

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <Link
                key={`${post._id}_tag_${index}`}
                to={`/tags/${tag}`}
                className={`inline-block text-xs px-2 py-1 rounded-full transition-colors ${
                  isDarkMode
                    ? 'bg-blue-900 text-blue-300 hover:bg-blue-800'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-6 ">
            <button
              onClick={handleLikeToggle}
              disabled={!userId}
              className={`flex items-center gap-2 text-sm transition-colors ${
                isLiked
                  ? 'text-red-500 hover:text-red-600'
                  : isDarkMode
                    ? 'text-gray-400 hover:text-red-400'
                    : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{post.likes?.length || 0}</span>
            </button>

            <button
              onClick={handleCommentToggle}
              className={`flex items-center gap-2 text-sm transition-colors ${
                isDarkMode
                  ? 'text-gray-400 hover:text-blue-400'
                  : 'text-gray-500 hover:text-blue-500'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>{commentCount}</span>
            </button>

            <button
              onClick={handleShare}
              className={`flex items-center gap-2 text-sm transition-colors ${
                isDarkMode
                  ? 'text-gray-400 hover:text-blue-400'
                  : 'text-gray-500 hover:text-blue-500'
              }`}
            >
              <Share2 className="w-4 h-4 " />
              <span>{contentIsArabic ? 'مشاركة' : 'Share'}</span>
            </button>
          </div>
        </div>

        {showComments && (
          <div className="mt-4">
            {userId && (
              <form onSubmit={handleCommentSubmit} className="mb-4">
                <textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder={
                    contentIsArabic ? 'أضف تعليقك...' : 'Add your comment...'
                  }
                  className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  rows="3"
                  dir={contentIsArabic ? 'rtl' : 'ltr'}
                />
                <button
                  type="submit"
                  className={`mt-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDarkMode
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {contentIsArabic ? 'إضافة تعليق' : 'Add Comment'}
                </button>
              </form>
            )}
            {commentCount > 0 ? (
              <div className="space-y-3">
                {post?.comments.map((comment) => (
                  <div
                    key={comment._id}
                    className={`p-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={
                          comment?.user?.profilePhoto ||
                          'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                        }
                        alt={comment.user?.name}
                        className="w-8 h-8 rounded-full object-cover"
                        loading="lazy"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <p
                            className={`text-sm font-semibold ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {comment.user?.name ||
                              (contentIsArabic ? 'مجهول' : 'Anonymous')}
                          </p>
                          {comment.user?.isVerified && (
                            <span
                              className="text-blue-500 text-sm"
                              title={
                                contentIsArabic
                                  ? 'حساب موثق'
                                  : 'Verified account'
                              }
                              aria-label={
                                contentIsArabic
                                  ? 'حساب موثق'
                                  : 'Verified account'
                              }
                            >
                              ✅
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-xs ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          {formatDate(comment.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                      dir={isArabic(comment.content) ? 'rtl' : 'ltr'}
                    >
                      <RichTextRenderer
                        content={comment.content}
                        isDarkMode={isDarkMode}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p
                className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {contentIsArabic ? 'لا توجد تعليقات بعد' : 'No comments yet'}
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.post?._id === nextProps.post?._id &&
      prevProps.post?.likes?.length === nextProps.post?.likes?.length &&
      prevProps.post?.comments?.length === nextProps.post?.comments?.length &&
      prevProps.post?.content === nextProps.post?.content &&
      prevProps.post?.user?.profilePhoto ===
        nextProps.post?.user?.profilePhoto &&
      prevProps.post?.user?.name === nextProps.post?.user?.name &&
      prevProps.post?.user?.isVerified === nextProps.post?.user?.isVerified &&
      prevProps.showCommentsInitially === nextProps.showCommentsInitially
    );
  }
);

PostCard.displayName = 'PostCard';
export default PostCard;
