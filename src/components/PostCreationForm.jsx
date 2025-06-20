// // import { useState, useCallback } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { toast } from 'react-toastify';
// // import { X, Plus } from 'lucide-react';
// // import {
// //   createCommunityPost,
// //   addTempPost,
// // } from '../store/slices/communitySlice';
// // import { useDarkMode } from '../features/darkMode/useDarkMode';
// // import { memo } from 'react';

// // const PostCreationForm = memo(({ onSuccess }) => {
// //   const dispatch = useDispatch();
// //   const { isDarkMode } = useDarkMode();
// //   const { status } = useSelector((state) => state.community);
// //   const { user } = useSelector((state) => state.auth);
// //   const [showForm, setShowForm] = useState(false);
// //   const [content, setContent] = useState('');
// //   const [tags, setTags] = useState([]);
// //   const [newTag, setNewTag] = useState('');

// //   const handleAddTag = useCallback(
// //     (e) => {
// //       e.preventDefault();
// //       if (newTag.trim() && !tags.includes(newTag.trim())) {
// //         setTags((prev) => [...prev, newTag.trim()]);
// //         setNewTag('');
// //       }
// //     },
// //     [newTag, tags]
// //   );

// //   const handleRemoveTag = useCallback((tag) => {
// //     setTags((prev) => prev.filter((t) => t !== tag));
// //   }, []);

// //   const handleSubmit = useCallback(
// //     async (e) => {
// //       e.preventDefault();
// //       if (!content.trim()) {
// //         toast.error('المحتوى لا يمكن أن يكون فارغًا');
// //         return;
// //       }

// //       const tempId = Date.now().toString();
// //       const tempPost = {
// //         tempId,
// //         content,
// //         tags,
// //         user,
// //         likes: [],
// //         createdAt: new Date().toISOString(),
// //         commentCount: 0,
// //       };

// //       try {
// //         dispatch(addTempPost(tempPost));
// //         await dispatch(createCommunityPost({ content, tags, tempId })).unwrap();
// //         setContent('');
// //         setTags([]);
// //         setShowForm(false);
// //         if (onSuccess) onSuccess();
// //         toast.success('تم إنشاء المنشور بنجاح!');
// //       } catch (err) {
// //         toast.error(err || 'فشل إنشاء المنشور');
// //       }
// //     },
// //     [dispatch, content, tags, user, onSuccess]
// //   );

// //   const toggleForm = useCallback(() => {
// //     setShowForm((prev) => !prev);
// //   }, []);

// //   if (!showForm) {
// //     return (
// //       <button
// //         onClick={toggleForm}
// //         className={`w-full max-w-2xl mx-auto p-4 mb-6 rounded-lg shadow flex items-center justify-center gap-2 ${
// //           isDarkMode
// //             ? 'bg-gray-800 text-white hover:bg-gray-700'
// //             : 'bg-white text-gray-900 hover:bg-gray-100'
// //         }`}
// //       >
// //         <Plus className="w-5 h-5" />
// //         <span>إنشاء منشور جديد</span>
// //       </button>
// //     );
// //   }

// //   return (
// //     <form
// //       onSubmit={handleSubmit}
// //       className={`w-full max-w-2xl mx-auto p-4 mb-6 rounded-lg shadow ${
// //         isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
// //       }`}
// //     >
// //       <div className="flex justify-between items-center mb-4">
// //         <h2 className="text-xl font-semibold">إنشاء منشور جديد</h2>
// //         <button
// //           type="button"
// //           onClick={toggleForm}
// //           className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
// //         >
// //           <X className="w-5 h-5" />
// //         </button>
// //       </div>

// //       <div className="mb-4">
// //         <label className="block text-sm font-medium mb-1">المحتوى</label>
// //         <textarea
// //           value={content}
// //           onChange={(e) => setContent(e.target.value)}
// //           placeholder="ما الذي تفكر فيه؟"
// //           className={`w-full p-2 rounded-md border ${
// //             isDarkMode
// //               ? 'bg-gray-700 border-gray-600 text-white'
// //               : 'bg-gray-100 border-gray-300 text-gray-900'
// //           } focus:ring-2 focus:ring-blue-500`}
// //           rows={4}
// //           required
// //         />
// //       </div>

// //       <div className="mb-4">
// //         <label className="block text-sm font-medium mb-1">الوسوم</label>
// //         <div className="flex gap-2 mb-2">
// //           <input
// //             type="text"
// //             value={newTag}
// //             onChange={(e) => setNewTag(e.target.value)}
// //             placeholder="الموضوع عن؟"
// //             className={`flex-1 p-2 rounded-md border ${
// //               isDarkMode
// //                 ? 'bg-gray-700 border-gray-600 text-white'
// //                 : 'bg-gray-100 border-gray-300 text-gray-900'
// //             } focus:ring-2 focus:ring-blue-500`}
// //           />
// //           <button
// //             type="button"
// //             onClick={handleAddTag}
// //             className={`px-3 py-2 rounded ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
// //           >
// //             <Plus size={16} />
// //           </button>
// //         </div>
// //         <div className="flex flex-wrap gap-2">
// //           {tags.map((tag) => (
// //             <span
// //               key={tag}
// //               className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
// //                 isDarkMode
// //                   ? 'bg-blue-900 text-blue-300'
// //                   : 'bg-blue-50 text-blue-700'
// //               }`}
// //             >
// //               #{tag}
// //               <button
// //                 type="button"
// //                 onClick={() => handleRemoveTag(tag)}
// //                 className="text-red-500 hover:text-red-700"
// //               >
// //                 <X size={12} />
// //               </button>
// //             </span>
// //           ))}
// //         </div>
// //       </div>

// //       <div className="flex justify-end gap-2">
// //         <button
// //           type="button"
// //           onClick={toggleForm}
// //           className={`px-4 py-2 rounded ${isDarkMode ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
// //         >
// //           إلغاء
// //         </button>
// //         <button
// //           type="submit"
// //           disabled={status.actions === 'loading'}
// //           className={`px-4 py-2 rounded ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
// //         >
// //           {status.actions === 'loading' ? 'جاري النشر...' : 'نشر'}
// //         </button>
// //       </div>
// //     </form>
// //   );
// // });

// // PostCreationForm.displayName = 'PostCreationForm';
// // export default PostCreationForm;

// import { useState, useCallback, memo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import { X, Plus } from 'lucide-react';
// import {
//   createCommunityPost,
//   addTempPost,
//   removeTempPost,
// } from '../store/slices/communitySlice';
// import { useDarkMode } from '../features/darkMode/useDarkMode';
// import LoadingSpinner from './ui/LoadingSpinner';

// const PostCreationForm = memo(
//   ({ onSuccess }) => {
//     const dispatch = useDispatch();
//     const { isDarkMode } = useDarkMode();
//     const { status = {} } = useSelector((state) => state.community);
//     const { user } = useSelector((state) => state.auth);
//     const [showForm, setShowForm] = useState(false);
//     const [content, setContent] = useState('');
//     const [tags, setTags] = useState([]);
//     const [newTag, setNewTag] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleAddTag = useCallback(
//       (e) => {
//         e.preventDefault();
//         const trimmedTag = newTag.trim();
//         if (!trimmedTag) {
//           toast.error('الوسم لا يمكن أن يكون فارغًا');
//           return;
//         }
//         if (trimmedTag.length > 20) {
//           toast.error('الوسم يجب ألا يتجاوز ٢٠ حرفًا');
//           return;
//         }
//         if (tags.length >= 5) {
//           toast.error('يمكن إضافة ٥ وسوم كحد أقصى');
//           return;
//         }
//         if (trimmedTag && !tags.includes(trimmedTag)) {
//           setTags((prev) => [...prev, trimmedTag]);
//           setNewTag('');
//         } else if (tags.includes(trimmedTag)) {
//           toast.error('الوسم موجود بالفعل');
//         }
//       },
//       [newTag, tags]
//     );

//     const handleRemoveTag = useCallback((tag) => {
//       setTags((prev) => prev.filter((t) => t !== tag));
//     }, []);

//     const handleSubmit = useCallback(
//       async (e) => {
//         e.preventDefault();
//         if (!user) {
//           toast.error('يرجى تسجيل الدخول لإنشاء منشور');
//           return;
//         }
//         if (!content.trim()) {
//           toast.error('المحتوى لا يمكن أن يكون فارغًا');
//           return;
//         }

//         const tempId = Date.now().toString();
//         const tempPost = {
//           tempId,
//           content,
//           tags,
//           user,
//           likes: [],
//           createdAt: new Date().toISOString(),
//           commentCount: 0,
//         };

//         setIsSubmitting(true);
//         try {
//           dispatch(addTempPost(tempPost));
//           await dispatch(
//             createCommunityPost({ content, tags, tempId })
//           ).unwrap();
//           setContent('');
//           setTags([]);
//           setNewTag('');
//           setShowForm(false);
//           if (onSuccess) onSuccess();
//           toast.success('تم إنشاء المنشور بنجاح!');
//         } catch (err) {
//           dispatch(removeTempPost(tempId));
//           toast.error(err || 'فشل إنشاء المنشور');
//           console.error('Failed to create post:', err);
//         } finally {
//           setIsSubmitting(false);
//         }
//       },
//       [dispatch, content, tags, user, onSuccess]
//     );

//     const toggleForm = useCallback(() => {
//       setShowForm((prev) => !prev);
//       if (showForm) {
//         setContent('');
//         setTags([]);
//         setNewTag('');
//       }
//     }, [showForm]);

//     if (!showForm) {
//       return (
//         <button
//           onClick={toggleForm}
//           className={`w-full max-w-2xl mx-auto p-4 mb-6 rounded-lg shadow flex items-center justify-center gap-2 ${
//             isDarkMode
//               ? 'bg-gray-800 text-white hover:bg-gray-700'
//               : 'bg-white text-gray-900 hover:bg-gray-100'
//           }`}
//         >
//           <Plus className="w-5 h-5" />
//           <span>إنشاء منشور جديد</span>
//         </button>
//       );
//     }

//     return (
//       <form
//         onSubmit={handleSubmit}
//         className={`w-full max-w-2xl mx-auto p-4 mb-6 rounded-lg shadow ${
//           isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
//         }`}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">إنشاء منشور جديد</h2>
//           <button
//             type="button"
//             onClick={toggleForm}
//             className={`p-1 rounded-full ${
//               isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
//             }`}
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">المحتوى</label>
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="ما الذي تفكر فيه؟"
//             className={`w-full p-2 rounded-md border ${
//               isDarkMode
//                 ? 'bg-gray-700 border-gray-600 text-white'
//                 : 'bg-gray-100 border-gray-300 text-gray-900'
//             } focus:ring-2 focus:ring-blue-500`}
//             rows={4}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">الوسوم</label>
//           <div className="flex gap-2 mb-2">
//             <input
//               type="text"
//               value={newTag}
//               onChange={(e) => setNewTag(e.target.value)}
//               placeholder="الموضوع عن؟ (حد أقصى ٥ وسوم)"
//               className={`flex-1 p-2 rounded-md border ${
//                 isDarkMode
//                   ? 'bg-gray-700 border-gray-600 text-white'
//                   : 'bg-gray-100 border-gray-300 text-gray-900'
//               } focus:ring-2 focus:ring-blue-500`}
//             />
//             <button
//               type="button"
//               onClick={handleAddTag}
//               className={`px-3 py-2 rounded ${
//                 isDarkMode
//                   ? 'bg-blue-600 hover:bg-blue-700 text-white'
//                   : 'bg-blue-500 hover:bg-blue-600 text-white'
//               }`}
//               disabled={tags.length >= 5}
//             >
//               <Plus size={16} />
//             </button>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {tags.map((tag) => (
//               <span
//                 key={tag}
//                 className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
//                   isDarkMode
//                     ? 'bg-blue-900 text-blue-300'
//                     : 'bg-blue-50 text-blue-700'
//                 }`}
//               >
//                 #{tag}
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveTag(tag)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   <X size={12} />
//                 </button>
//               </span>
//             ))}
//           </div>
//         </div>

//         <div className="flex justify-end gap-2">
//           <button
//             type="button"
//             onClick={toggleForm}
//             className={`px-4 py-2 rounded ${
//               isDarkMode
//                 ? 'bg-gray-600 hover:bg-gray-700 text-white'
//                 : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
//             }`}
//           >
//             إلغاء
//           </button>
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`px-4 py-2 rounded flex items-center gap-2 ${
//               isDarkMode
//                 ? 'bg-blue-600 hover:bg-blue-700 text-white'
//                 : 'bg-blue-500 hover:bg-blue-600 text-white'
//             } ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
//           >
//             {isSubmitting ? (
//               <>
//                 <LoadingSpinner size="sm" />
//                 جاري النشر...
//               </>
//             ) : (
//               'نشر'
//             )}
//           </button>
//         </div>
//       </form>
//     );
//   },
//   (prevProps, nextProps) => prevProps.onSuccess === nextProps.onSuccess
// );

// PostCreationForm.displayName = 'PostCreationForm';
// export default PostCreationForm;
import { useState, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  X,
  Plus,
  Bold,
  Italic,
  List,
  Palette,
  Type,
  Eye,
  EyeOff,
  HelpCircle,
} from 'lucide-react';
import {
  createCommunityPost,
  addTempPost,
  removeTempPost,
} from '../store/slices/communitySlice';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import LoadingSpinner from './ui/LoadingSpinner';

// Rich text preview component
const RichTextPreview = ({ content, isDarkMode }) => {
  if (!content) return null;

  const parseRichText = (text) => {
    if (typeof text !== 'string') return text;

    let parsedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')
      .replace(
        /(?<!\*)\*([^*]+)\*(?!\*)/g,
        '<em style="font-weight: 600;">$1</em>'
      )
      .replace(/(?<!_)_([^_]+)_(?!_)/g, '<em style="font-weight: 600;">$1</em>')
      .replace(
        /\[([a-zA-Z]+|#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}):(.*?)\]/g,
        '<span style="color: $1;">$2</span>'
      )
      .replace(/^[\s]*[-*]\s+(.+)$/gm, '<li>$1</li>')
      .replace(/\n/g, '<br>');

    parsedText = parsedText.replace(
      /((?:<li>.*<\/li>\s*)+)/gs,
      '<ul class="list-disc list-inside my-2 space-y-1">$1</ul>'
    );

    return parsedText;
  };

  return (
    <div
      className={`mt-4 p-3 rounded-lg border ${
        isDarkMode
          ? 'bg-gray-700 border-gray-600'
          : 'bg-gray-50 border-gray-300'
      }`}
    >
      <h4
        className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
      >
        معاينة / Preview
      </h4>
      <div
        className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
        dangerouslySetInnerHTML={{ __html: parseRichText(content) }}
      />
    </div>
  );
};

// Formatting help component
const FormattingHelp = ({ isDarkMode, isVisible, onClose }) => {
  if (!isVisible) return null;

  const examples = [
    {
      label: 'Bold Text / نص عريض',
      syntax: '**text** or __text__',
      example: '**مرحبا** **Hello**',
    },
    {
      label: 'Semi-bold / نص متوسط',
      syntax: '*text* or _text_',
      example: '*مرحبا* *Hello*',
    },
    {
      label: 'Colored Text / نص ملون',
      syntax: '[color:text]',
      example: '[red:نص أحمر] [blue:Blue text]',
    },
    {
      label: 'Hex Colors / ألوان مخصصة',
      syntax: '[#hex:text]',
      example: '[#ff6b6b:Custom color]',
    },
    {
      label: 'Bullet Points / نقاط',
      syntax: '- item or * item',
      example: '- العنصر الأول\n- العنصر الثاني',
    },
  ];

  return (
    <div
      className={`mt-4 p-4 rounded-lg border ${
        isDarkMode
          ? 'bg-gray-700 border-gray-600'
          : 'bg-blue-50 border-blue-200'
      }`}
    >
      <div className="flex justify-between items-center mb-3">
        <h4
          className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-blue-800'}`}
        >
          دليل التنسيق / Formatting Guide
        </h4>
        <button
          onClick={onClose}
          className={`p-1 rounded-full hover:bg-opacity-20 ${
            isDarkMode
              ? 'text-gray-400 hover:bg-gray-600'
              : 'text-blue-600 hover:bg-blue-200'
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-2">
        {examples.map((item, index) => (
          <div key={index} className="text-xs">
            <div
              className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-blue-700'}`}
            >
              {item.label}
            </div>
            <div
              className={`font-mono ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}
            >
              {item.syntax}
            </div>
            <div
              className={`${isDarkMode ? 'text-gray-500' : 'text-blue-500'}`}
            >
              Example: {item.example}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PostCreationForm = memo(
  ({ onSuccess }) => {
    const dispatch = useDispatch();
    const { isDarkMode } = useDarkMode();
    const { status = {} } = useSelector((state) => state.community);
    const { user } = useSelector((state) => state.auth);
    const [showForm, setShowForm] = useState(false);
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    // Detect if content is Arabic
    const isArabic = (text) => {
      if (!text) return false;
      const arabicRegex = /[\u0600-\u06FF\u0750-\u077F]/;
      return arabicRegex.test(text);
    };

    const contentIsArabic = isArabic(content);

    // Formatting helper function
    const insertFormatting = useCallback(
      (before, after = '') => {
        const textarea = document.getElementById('post-content');
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end) || 'text';
        const newText = `${content.substring(0, start)}${before}${selectedText}${after}${content.substring(end)}`;

        setContent(newText);

        // Move cursor to after the formatted text
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd =
            start + before.length + selectedText.length + after.length;
          textarea.focus();
        }, 0);
      },
      [content]
    );

    const insertColor = useCallback(
      (color) => {
        insertFormatting(`[${color}:`, ']');
      },
      [insertFormatting]
    );

    const insertBullet = useCallback(() => {
      const textarea = document.getElementById('post-content');
      const start = textarea.selectionStart;
      const lines = content.substring(0, start).split('\n');
      const currentLine = lines[lines.length - 1];

      // If not at the start of a line, add a newline
      const prefix = currentLine.trim() ? '\n- ' : '- ';
      insertFormatting(prefix);
    }, [content, insertFormatting]);

    const handleAddTag = useCallback(
      (e) => {
        e.preventDefault();
        const trimmedTag = newTag.trim();
        const errorMessage = contentIsArabic
          ? {
              empty: 'الوسم لا يمكن أن يكون فارغًا',
              tooLong: 'الوسم يجب ألا يتجاوز ٢٠ حرفًا',
              maxTags: 'يمكن إضافة ٥ وسوم كحد أقصى',
              exists: 'الوسم موجود بالفعل',
            }
          : {
              empty: 'Tag cannot be empty',
              tooLong: 'Tag must not exceed 20 characters',
              maxTags: 'Maximum 5 tags allowed',
              exists: 'Tag already exists',
            };

        if (!trimmedTag) {
          toast.error(errorMessage.empty);
          return;
        }
        if (trimmedTag.length > 20) {
          toast.error(errorMessage.tooLong);
          return;
        }
        if (tags.length >= 5) {
          toast.error(errorMessage.maxTags);
          return;
        }
        if (trimmedTag && !tags.includes(trimmedTag)) {
          setTags((prev) => [...prev, trimmedTag]);
          setNewTag('');
        } else if (tags.includes(trimmedTag)) {
          toast.error(errorMessage.exists);
        }
      },
      [newTag, tags, contentIsArabic]
    );

    const handleRemoveTag = useCallback((tag) => {
      setTags((prev) => prev.filter((t) => t !== tag));
    }, []);

    const handleSubmit = useCallback(
      async (e) => {
        e.preventDefault();
        const errorMessage = contentIsArabic
          ? {
              noUser: 'يرجى تسجيل الدخول لإنشاء منشور',
              emptyContent: 'المحتوى لا يمكن أن يكون فارغًا',
              success: 'تم إنشاء المنشور بنجاح!',
              failure: 'فشل إنشاء المنشور',
            }
          : {
              noUser: 'Please log in to create a post',
              emptyContent: 'Content cannot be empty',
              success: 'Post created successfully!',
              failure: 'Failed to create post',
            };

        if (!user) {
          toast.error(errorMessage.noUser);
          return;
        }
        if (!content.trim()) {
          toast.error(errorMessage.emptyContent);
          return;
        }

        const tempId = Date.now().toString();
        const tempPost = {
          tempId,
          content,
          tags,
          user,
          likes: [],
          createdAt: new Date().toISOString(),
          commentCount: 0,
        };

        setIsSubmitting(true);
        try {
          dispatch(addTempPost(tempPost));
          await dispatch(
            createCommunityPost({ content, tags, tempId })
          ).unwrap();
          setContent('');
          setTags([]);
          setNewTag('');
          setShowForm(false);
          if (onSuccess) onSuccess();
          toast.success(errorMessage.success);
        } catch (err) {
          dispatch(removeTempPost(tempId));
          toast.error(err || errorMessage.failure);
          console.error('Failed to create post:', err);
        } finally {
          setIsSubmitting(false);
        }
      },
      [dispatch, content, tags, user, onSuccess, contentIsArabic]
    );

    const toggleForm = useCallback(() => {
      setShowForm((prev) => !prev);
      if (showForm) {
        setContent('');
        setTags([]);
        setNewTag('');
        setShowPreview(false);
        setShowHelp(false);
      }
    }, [showForm]);

    return (
      <div
        className={`w-full max-w-2xl mx-auto mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}
        dir={contentIsArabic ? 'rtl' : 'ltr'}
      >
        {!showForm ? (
          <button
            onClick={toggleForm}
            className={`w-full p-4 rounded-lg shadow flex items-center justify-center gap-2 ${
              isDarkMode
                ? 'bg-gray-800 text-white hover:bg-gray-700'
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Plus className="w-5 h-5" />
            <span>
              {contentIsArabic ? 'إنشاء منشور جديد' : 'Create a new post'}
            </span>
          </button>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={`p-4 rounded-lg shadow ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {contentIsArabic ? 'إنشاء منشور جديد' : 'Create a new post'}
              </h2>
              <button
                type="button"
                onClick={toggleForm}
                className={`p-1 rounded-full ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">
                  {contentIsArabic ? 'المحتوى' : 'Content'}
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className={`p-1 rounded-full ${
                      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                    }`}
                    title={contentIsArabic ? 'معاينة' : 'Preview'}
                  >
                    {showPreview ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowHelp(!showHelp)}
                    className={`p-1 rounded-full ${
                      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                    }`}
                    title={
                      contentIsArabic ? 'مساعدة التنسيق' : 'Formatting Help'
                    }
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => insertFormatting('**', '**')}
                  className={`p-2 rounded ${
                    isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  title={contentIsArabic ? 'نص عريض' : 'Bold'}
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('*', '*')}
                  className={`p-2 rounded ${
                    isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  title={contentIsArabic ? 'نص متوسط' : 'Semi-bold'}
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={insertBullet}
                  className={`p-2 rounded ${
                    isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  title={contentIsArabic ? 'نقاط' : 'Bullet Points'}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertColor('red')}
                  className={`p-2 rounded bg-red-500 hover:bg-red-600 text-white`}
                  title={contentIsArabic ? 'نص أحمر' : 'Red Text'}
                >
                  <Palette className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertColor('blue')}
                  className={`p-2 rounded bg-blue-500 hover:bg-blue-600 text-white`}
                  title={contentIsArabic ? 'نص أزرق' : 'Blue Text'}
                >
                  <Palette className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertColor('#ff6b6b')}
                  className={`p-2 rounded bg-pink-500 hover:bg-pink-600 text-white`}
                  title={contentIsArabic ? 'لون مخصص' : 'Custom Color'}
                >
                  <Type className="w-4 h-4" />
                </button>
              </div>
              <textarea
                id="post-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={
                  contentIsArabic ? 'ما الذي تفكر فيه؟' : "What's on your mind?"
                }
                className={`w-full p-2 rounded-md border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-gray-100 border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 resize-y`}
                rows={6}
                dir={contentIsArabic ? 'rtl' : 'ltr'}
                required
              />
              {showPreview && (
                <RichTextPreview content={content} isDarkMode={isDarkMode} />
              )}
              {showHelp && (
                <FormattingHelp
                  isDarkMode={isDarkMode}
                  isVisible={showHelp}
                  onClose={() => setShowHelp(false)}
                />
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {contentIsArabic ? 'الوسوم' : 'Tags'}
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder={
                    contentIsArabic
                      ? 'الموضوع عن؟ (حد أقصى ٥ وسوم)'
                      : 'Add up to 5 tags'
                  }
                  className={`flex-1 p-2 rounded-md border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-gray-100 border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500`}
                  dir={isArabic(newTag) ? 'rtl' : 'ltr'}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className={`px-3 py-2 rounded ${
                    isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                  disabled={tags.length >= 5}
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
                onClick={toggleForm}
                className={`px-4 py-2 rounded ${
                  isDarkMode
                    ? 'bg-gray-600 hover:bg-gray-700 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                {contentIsArabic ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 rounded flex items-center gap-2 ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                } ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" />
                    {contentIsArabic ? 'جاري النشر...' : 'Publishing...'}
                  </>
                ) : contentIsArabic ? (
                  'نشر'
                ) : (
                  'Publish'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.onSuccess === nextProps.onSuccess
);

PostCreationForm.displayName = 'PostCreationForm';
export default PostCreationForm;
