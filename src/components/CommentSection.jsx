import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { User, Send, Trash2, Edit } from 'lucide-react';
import {
  createCommunityComment,
  updateCommunityComment,
  deleteCommunityComment,
} from '../store/slices/communitySlice';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import LoadingSpinner from './ui/LoadingSpinner';
import { memo } from 'react';

const CommentSection = memo(({ postId }) => {
  const dispatch = useDispatch();
  const { isDarkMode } = useDarkMode();
  const { user } = useSelector((state) => state.auth);
  const { commentsByPostId, status } = useSelector((state) => state.community);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState('');

  const comments = commentsByPostId[postId] || [];
  setNewComment('newComment', comments);
  const handleAddComment = useCallback(
    async (e) => {
      e.preventDefault();
      if (!newComment.trim()) {
        toast.error('التعليق لا يمكن أن يكون فارغًا');
        return;
      }
      try {
        await dispatch(
          createCommunityComment({
            postId,
            commentData: { content: newComment },
          })
        ).unwrap();
      } catch (err) {
        toast.error(err || 'فشل إضافة التعليق');
      }
    },
    [dispatch, newComment, postId]
  );

  const handleDeleteComment = useCallback(
    async (commentId) => {
      try {
        await dispatch(deleteCommunityComment({ postId, commentId })).unwrap();
      } catch (err) {
        toast.error(err || 'فشل حذف التعليق');
      }
    },
    [dispatch, postId]
  );

  // Add this to your component
  useEffect(() => {
    if (commentsByPostId[postId]) {
      // console.log('Current comments:', commentsByPostId[postId]);
    }
  }, [commentsByPostId, postId]);
  const handleEditComment = useCallback(
    async (commentId, content) => {
      try {
        await dispatch(
          updateCommunityComment({
            postId,
            commentId,
            commentData: { content },
          })
        ).unwrap();
        setEditingCommentId(null);
        setEditContent('');
      } catch (err) {
        toast.error(err || 'فشل تحديث التعليق');
      }
    },
    [dispatch, postId]
  );

  const handleEditStart = useCallback((comment) => {
    setEditingCommentId(comment._id);
    setEditContent(comment.content || '');
  }, []);

  return (
    <div className="mt-4">
      {user && (
        <form onSubmit={handleAddComment} className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="أضف تعليقك..."
            className={`w-full p-2 border rounded-lg ${
              isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
            }`}
            rows="3"
          />
          <button
            type="submit"
            disabled={status.actions === 'loading'}
            className={`mt-2 px-4 py-2 rounded-lg flex items-center gap-2 ${
              isDarkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <Send className="w-4 h-4" />
            إرسال
          </button>
        </form>
      )}

      <div className="space-y-4">
        {status.actions === 'loading' && (
          <div className="flex justify-center">
            <LoadingSpinner size="sm" />
          </div>
        )}

        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment._id}
              className={`p-3 border rounded-lg ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <span
                    className={`font-medium ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}
                  >
                    {comment.user?.name || 'مجهول'}
                  </span>
                </div>
                {user?._id === comment.user?._id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditStart(comment)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {editingCommentId === comment._id ? (
                <div className="mt-2">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className={`w-full p-2 border rounded-lg ${
                      isDarkMode
                        ? 'bg-gray-700 text-white'
                        : 'bg-white text-gray-900'
                    }`}
                    rows="2"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() =>
                        handleEditComment(comment._id, editContent)
                      }
                      className={`px-3 py-1 rounded-lg ${
                        isDarkMode
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                    >
                      حفظ
                    </button>
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className={`px-3 py-1 rounded-lg ${
                        isDarkMode
                          ? 'bg-gray-600 hover:bg-gray-700 text-white'
                          : 'bg-gray-500 hover:bg-gray-600 text-white'
                      }`}
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              ) : (
                <p
                  className={`mt-2 text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {comment.content || 'لا يوجد محتوى'}
                </p>
              )}

              <p
                className={`text-xs mt-1 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                {comment.createdAt
                  ? new Date(comment.createdAt).toLocaleString('ar-EG')
                  : 'غير معروف'}
              </p>
            </div>
          ))
        ) : (
          <p
            className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            لا توجد تعليقات بعد
          </p>
        )}
      </div>
    </div>
  );
});

CommentSection.displayName = 'CommentSection';
export default CommentSection;
