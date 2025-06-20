// PostCreationForm.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { X, Plus } from 'lucide-react';
import { Form, useActionData, useSubmit } from 'react-router-dom';

const PostCreationForm = ({ isOpen, onClose, isDarkMode }) => {
  const submit = useSubmit();
  const actionData = useActionData();
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (actionData?.success) {
      toast.success('تم إنشاء المنشور بنجاح!');
      setContent('');
      setTags([]);
      setNewTag('');
      onClose();
    } else if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData, onClose]);

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    tags.forEach((tag) => formData.append('tags', tag));
    submit(formData, { method: 'post', action: '/community' });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-labelledby="post-creation-title"
    >
      <div
        className={`w-full max-w-lg p-6 rounded-lg shadow-xl max-h-[80vh] overflow-y-auto ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="post-creation-title" className="text-xl font-semibold">
            إنشاء منشور جديد
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="إغلاق النافذة"
          >
            <X size={20} />
          </button>
        </div>
        <Form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">المحتوى</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="ما الذي تفكر فيه؟"
              className={`w-full p-2 rounded-md border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-gray-100 border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500`}
              rows={5}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">الوسوم</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="الموضوع عن ؟"
                className={`flex-1 p-2 rounded-md border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-gray-100 border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500`}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                aria-label="إضافة وسم"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                    isDarkMode
                      ? 'bg-blue-900 text-blue-300'
                      : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-red-500 hover:text-red-700"
                    aria-label={`إزالة الوسم ${tag}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-md ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              نشر
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PostCreationForm;
