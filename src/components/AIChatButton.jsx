// import { useState } from 'react';
// import { useDarkMode } from '../features/darkMode/useDarkMode';
// import { askAI } from '../api/api';
// import { toast } from 'react-toastify';
// import { MessageCircle } from 'lucide-react';

// const AIChatButton = () => {
//   const { isDarkMode } = useDarkMode();
//   const [isOpen, setIsOpen] = useState(false);
//   const [message, setMessage] = useState('');
//   const [response, setResponse] = useState('');

//   const handleAskAI = async (e) => {
//     e.preventDefault();
//     if (!message.trim()) return toast.error('Please enter a question');
//     try {
//       const data = await askAI(message);
//       setResponse(data.response);
//     } catch (err) {
//       toast.error(err.message || 'Failed to get AI response');
//     }
//   };

//   return (
//     <div className="fixed bottom-4 right-4 z-50">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className={`p-4 rounded-full shadow-lg ${
//           isDarkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'
//         } hover:bg-blue-800`}
//       >
//         <MessageCircle size={24} />
//       </button>
//       {isOpen && (
//         <div
//           className={`absolute bottom-16 right-0 w-80 p-4 rounded-lg shadow-xl ${
//             isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
//           }`}
//         >
//           <h3 className="text-lg font-semibold mb-2">Ask AI</h3>
//           <form onSubmit={handleAskAI}>
//             <textarea
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Ask about courses or tests..."
//               className={`w-full p-2 rounded-md ${
//                 isDarkMode
//                   ? 'bg-gray-700 text-white'
//                   : 'bg-gray-100 text-gray-900'
//               } border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
//             />
//             <button
//               type="submit"
//               className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Ask
//             </button>
//           </form>
//           {response && (
//             <div className="mt-4 p-2 rounded-md bg-gray-200 dark:bg-gray-700">
//               <p>{response}</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AIChatButton;

// // import { useState, useEffect, useRef } from 'react';
// // import { useDarkMode } from '../features/darkMode/useDarkMode';
// // import {
// //   MessageCircle,
// //   Send,
// //   Bot,
// //   User,
// //   Minimize2,
// //   Maximize2,
// // } from 'lucide-react';

// // // Mock functions to replace your actual imports
// // const toast = {
// //   error: (msg) => console.error(msg),
// //   success: (msg) => console.log(msg),
// // };

// // // Mock API function
// // const askAI = async (message) => {
// //   // Simulate API delay
// //   await new Promise((resolve) => setTimeout(resolve, 1500));
// //   return {
// //     response:
// //       'We have a variety of courses available on this platform! 🎓 Based on the courses listed, here are some suggestions:\n\n🚀 If you\'re interested in learning about JavaScript, I would recommend: "Full-Stack JavaScript with Node, Express & MongoDB" or "Learn Node.js".\n🔗 If you\'re curious about blockchain development, "Blockchain Development with JavaScript & Solidity" might be the perfect fit for you.\n\nWe don\'t have many courses on this site so far, but I hope these suggestions help! 😊 Let me know if you have any questions or if there\'s anything else I can help you with. ✨',
// //   };
// // };

// // const TypingIndicator = ({ isDarkMode }) => {
// //   // const { isDarkMode } = useDarkMode();
// //   const [dots, setDots] = useState('');

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setDots((prev) => {
// //         if (prev === '...') return '';
// //         return prev + '.';
// //       });
// //     }, 500);

// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <div className="flex items-center space-x-2 p-3">
// //       <div
// //         className={`w-8 h-8 rounded-full flex items-center justify-center ${
// //           isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
// //         }`}
// //       >
// //         <Bot size={16} className="text-white" />
// //       </div>
// //       <div
// //         className={`px-3 py-2 rounded-lg max-w-xs ${
// //           isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
// //         }`}
// //       >
// //         <div className="flex items-center space-x-1">
// //           <span className="text-sm">AI is typing</span>
// //           <div className="flex space-x-1">
// //             <div
// //               className={`w-2 h-2 rounded-full animate-bounce ${
// //                 isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
// //               }`}
// //               style={{ animationDelay: '0ms' }}
// //             ></div>
// //             <div
// //               className={`w-2 h-2 rounded-full animate-bounce ${
// //                 isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
// //               }`}
// //               style={{ animationDelay: '150ms' }}
// //             ></div>
// //             <div
// //               className={`w-2 h-2 rounded-full animate-bounce ${
// //                 isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
// //               }`}
// //               style={{ animationDelay: '300ms' }}
// //             ></div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const MessageBubble = ({ message, isUser, isDarkMode, isTyping = false }) => {
// //   const [displayedText, setDisplayedText] = useState('');

// //   useEffect(() => {
// //     if (!isUser && !isTyping && message) {
// //       let index = 0;
// //       const timer = setInterval(() => {
// //         if (index < message.length) {
// //           setDisplayedText(message.slice(0, index + 1));
// //           index++;
// //         } else {
// //           clearInterval(timer);
// //         }
// //       }, 20);

// //       return () => clearInterval(timer);
// //     } else if (isUser) {
// //       setDisplayedText(message);
// //     }
// //   }, [message, isUser, isTyping]);

// //   return (
// //     <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
// //       <div
// //         className={`flex items-start space-x-2 max-w-xs ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
// //       >
// //         <div
// //           className={`w-8 h-8 rounded-full flex items-center justify-center ${
// //             isUser
// //               ? isDarkMode
// //                 ? 'bg-green-600'
// //                 : 'bg-green-500'
// //               : isDarkMode
// //                 ? 'bg-blue-600'
// //                 : 'bg-blue-500'
// //           }`}
// //         >
// //           {isUser ? (
// //             <User size={16} className="text-white" />
// //           ) : (
// //             <Bot size={16} className="text-white" />
// //           )}
// //         </div>
// //         <div
// //           className={`px-3 py-2 rounded-lg ${
// //             isUser
// //               ? isDarkMode
// //                 ? 'bg-green-600 text-white'
// //                 : 'bg-green-500 text-white'
// //               : isDarkMode
// //                 ? 'bg-gray-700 text-white'
// //                 : 'bg-gray-200 text-gray-900'
// //           }`}
// //         >
// //           <p className="text-sm whitespace-pre-wrap">{displayedText}</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const AIChatButton = () => {
// //   const { isDarkMode } = useDarkMode();
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [isMinimized, setIsMinimized] = useState(false);
// //   const [message, setMessage] = useState('');
// //   const [messages, setMessages] = useState([
// //     {
// //       text: "Hello! 👋 I'm your AI assistant. How can I help you today?",
// //       isUser: false,
// //       id: 1,
// //     },
// //   ]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const messagesEndRef = useRef(null);
// //   const inputRef = useRef(null);

// //   const scrollToBottom = () => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   };

// //   useEffect(() => {
// //     scrollToBottom();
// //   }, [messages, isLoading]);

// //   const handleAskAI = async (e) => {
// //     if (e) e.preventDefault();
// //     if (!message.trim()) {
// //       toast.error('Please enter a question! 💭');
// //       return;
// //     }

// //     const userMessage = { text: message, isUser: true, id: Date.now() };
// //     setMessages((prev) => [...prev, userMessage]);
// //     setMessage('');
// //     setIsLoading(true);

// //     try {
// //       const data = await askAI(message);
// //       setIsLoading(false);

// //       const aiMessage = {
// //         text: data.response,
// //         isUser: false,
// //         id: Date.now() + 1,
// //       };
// //       setMessages((prev) => [...prev, aiMessage]);
// //       toast.success('Response received! ✨');
// //     } catch (err) {
// //       setIsLoading(false);
// //       toast.error(err.message || 'Failed to get AI response 😞');
// //       const errorMessage = {
// //         text: 'Sorry, I encountered an error. Please try again! 🤔',
// //         isUser: false,
// //         id: Date.now() + 1,
// //       };
// //       setMessages((prev) => [...prev, errorMessage]);
// //     }
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === 'Enter' && !e.shiftKey) {
// //       e.preventDefault();
// //       handleAskAI(e);
// //     }
// //   };

// //   const clearChat = () => {
// //     setMessages([
// //       {
// //         text: 'Chat cleared! 🧹 How can I help you?',
// //         isUser: false,
// //         id: Date.now(),
// //       },
// //     ]);
// //   };

// //   return (
// //     <div className="fixed bottom-4 right-4 z-50">
// //       {/* Chat Button */}
// //       <button
// //         onClick={() => setIsOpen(!isOpen)}
// //         className={`p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
// //           isDarkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'
// //         } hover:bg-blue-800 relative`}
// //       >
// //         <MessageCircle size={24} />
// //         {!isOpen && (
// //           <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
// //         )}
// //       </button>

// //       {/* Chat Window */}
// //       {isOpen && (
// //         <div
// //           className={`absolute bottom-16 right-0 rounded-lg shadow-2xl transition-all duration-300 transform ${
// //             isMinimized ? 'w-80 h-12' : 'w-96 h-96'
// //           } ${
// //             isDarkMode
// //               ? 'bg-gray-800 text-white border border-gray-700'
// //               : 'bg-white text-gray-900 border border-gray-200'
// //           }`}
// //         >
// //           {/* Header */}
// //           <div
// //             className={`flex items-center justify-between p-4 border-b ${
// //               isDarkMode ? 'border-gray-700' : 'border-gray-200'
// //             }`}
// //           >
// //             <div className="flex items-center space-x-2">
// //               <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
// //               <h3 className="text-lg font-semibold">AI Assistant 🤖</h3>
// //             </div>
// //             <div className="flex space-x-2">
// //               <button
// //                 onClick={() => setIsMinimized(!isMinimized)}
// //                 className={`p-1 rounded hover:bg-gray-200 ${isDarkMode ? 'hover:bg-gray-700' : ''}`}
// //               >
// //                 {isMinimized ? (
// //                   <Maximize2 size={16} />
// //                 ) : (
// //                   <Minimize2 size={16} />
// //                 )}
// //               </button>
// //               <button
// //                 onClick={clearChat}
// //                 className={`px-2 py-1 text-xs rounded ${
// //                   isDarkMode
// //                     ? 'bg-gray-700 hover:bg-gray-600'
// //                     : 'bg-gray-100 hover:bg-gray-200'
// //                 }`}
// //               >
// //                 Clear
// //               </button>
// //             </div>
// //           </div>

// //           {!isMinimized && (
// //             <>
// //               {/* Messages */}
// //               <div className="h-64 overflow-y-auto p-4 space-y-2">
// //                 {messages.map((msg) => (
// //                   <MessageBubble
// //                     key={msg.id}
// //                     message={msg.text}
// //                     isUser={msg.isUser}
// //                     isDarkMode={isDarkMode}
// //                   />
// //                 ))}
// //                 {isLoading && <TypingIndicator isDarkMode={isDarkMode} />}
// //                 <div ref={messagesEndRef} />
// //               </div>

// //               {/* Input */}
// //               <div
// //                 className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
// //               >
// //                 <div className="flex space-x-2">
// //                   <textarea
// //                     ref={inputRef}
// //                     value={message}
// //                     onChange={(e) => setMessage(e.target.value)}
// //                     onKeyPress={handleKeyPress}
// //                     placeholder="Ask about courses, tests, or anything else... 💬"
// //                     className={`flex-1 p-2 rounded-md resize-none text-sm transition-all duration-200 ${
// //                       isDarkMode
// //                         ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500'
// //                         : 'bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500'
// //                     } border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
// //                     rows="1"
// //                     disabled={isLoading}
// //                   />
// //                   <button
// //                     onClick={handleAskAI}
// //                     disabled={isLoading || !message.trim()}
// //                     className={`px-3 py-2 rounded-md transition-all duration-200 ${
// //                       isLoading || !message.trim()
// //                         ? 'bg-gray-400 cursor-not-allowed'
// //                         : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
// //                     } text-white flex items-center space-x-1`}
// //                   >
// //                     <Send size={16} />
// //                   </button>
// //                 </div>
// //               </div>
// //             </>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AIChatButton;

// // // import { useState, useEffect, useRef } from 'react';
// // // import { useDarkMode } from '../features/darkMode/useDarkMode';
// // // import {
// // //   MessageCircle,
// // //   Send,
// // //   Bot,
// // //   User,
// // //   Minimize2,
// // //   Maximize2,
// // // } from 'lucide-react';
// // // import { toast } from 'react-toastify';
// // // import api from '../api/api'; // Import your actual API client

// // // const TypingIndicator = ({ isDarkMode }) => {
// // //   const [dots, setDots] = useState('');

// // //   useEffect(() => {
// // //     const interval = setInterval(() => {
// // //       setDots((prev) => {
// // //         if (prev === '...') return '';
// // //         return prev + '.';
// // //       });
// // //     }, 500);

// // //     return () => clearInterval(interval);
// // //   }, []);

// // //   return (
// // //     <div className="flex items-center space-x-2 p-3">
// // //       <div
// // //         className={`w-8 h-8 rounded-full flex items-center justify-center ${
// // //           isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
// // //         }`}
// // //       >
// // //         <Bot size={16} className="text-white" />
// // //       </div>
// // //       <div
// // //         className={`px-3 py-2 rounded-lg max-w-xs ${
// // //           isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
// // //         }`}
// // //       >
// // //         <div className="flex items-center space-x-1">
// // //           <span className="text-sm">AI is typing</span>
// // //           <div className="flex space-x-1">
// // //             <div
// // //               className={`w-2 h-2 rounded-full animate-bounce ${
// // //                 isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
// // //               }`}
// // //               style={{ animationDelay: '0ms' }}
// // //             ></div>
// // //             <div
// // //               className={`w-2 h-2 rounded-full animate-bounce ${
// // //                 isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
// // //               }`}
// // //               style={{ animationDelay: '150ms' }}
// // //             ></div>
// // //             <div
// // //               className={`w-2 h-2 rounded-full animate-bounce ${
// // //                 isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
// // //               }`}
// // //               style={{ animationDelay: '300ms' }}
// // //             ></div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const MessageBubble = ({ message, isUser, isDarkMode, isTyping = false }) => {
// // //   const [displayedText, setDisplayedText] = useState('');

// // //   useEffect(() => {
// // //     if (!isUser && !isTyping && message) {
// // //       let index = 0;
// // //       const timer = setInterval(() => {
// // //         if (index < message.length) {
// // //           setDisplayedText(message.slice(0, index + 1));
// // //           index++;
// // //         } else {
// // //           clearInterval(timer);
// // //         }
// // //       }, 20);

// // //       return () => clearInterval(timer);
// // //     } else if (isUser) {
// // //       setDisplayedText(message);
// // //     }
// // //   }, [message, isUser, isTyping]);

// // //   return (
// // //     <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
// // //       <div
// // //         className={`flex items-start space-x-2 max-w-xs ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
// // //       >
// // //         <div
// // //           className={`w-8 h-8 rounded-full flex items-center justify-center ${
// // //             isUser
// // //               ? isDarkMode
// // //                 ? 'bg-green-600'
// // //                 : 'bg-green-500'
// // //               : isDarkMode
// // //                 ? 'bg-blue-600'
// // //                 : 'bg-blue-500'
// // //           }`}
// // //         >
// // //           {isUser ? (
// // //             <User size={16} className="text-white" />
// // //           ) : (
// // //             <Bot size={16} className="text-white" />
// // //           )}
// // //         </div>
// // //         <div
// // //           className={`px-3 py-2 rounded-lg ${
// // //             isUser
// // //               ? isDarkMode
// // //                 ? 'bg-green-600 text-white'
// // //                 : 'bg-green-500 text-white'
// // //               : isDarkMode
// // //                 ? 'bg-gray-700 text-white'
// // //                 : 'bg-gray-200 text-gray-900'
// // //           }`}
// // //         >
// // //           <p className="text-sm whitespace-pre-wrap">{displayedText}</p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // Mock function as fallback
// // // const mockAskAI = async (message) => {
// // //   await new Promise((resolve) => setTimeout(resolve, 1500));
// // //   return {
// // //     response:
// // //       'We have a variety of courses available on this platform! 🎓 Based on the courses listed, here are some suggestions:\n\n🚀 If you\'re interested in learning about JavaScript, I would recommend: "Full-Stack JavaScript with Node, Express & MongoDB" or "Learn Node.js".\n🔗 If you\'re curious about blockchain development, "Blockchain Development with JavaScript & Solidity" might be the perfect fit for you.\n\nWe don\'t have many courses on this site so far, but I hope these suggestions help! 😊 Let me know if you have any questions or if there\'s anything else I can help you with. ✨',
// // //   };
// // // };

// // // const AIChatButton = () => {
// // //   const { isDarkMode } = useDarkMode();
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [isMinimized, setIsMinimized] = useState(false);
// // //   const [message, setMessage] = useState('');
// // //   const [messages, setMessages] = useState([
// // //     {
// // //       text: "Hello! 👋 I'm your AI assistant. How can I help you today?",
// // //       isUser: false,
// // //       id: 1,
// // //     },
// // //   ]);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const messagesEndRef = useRef(null);
// // //   const inputRef = useRef(null);

// // //   const scrollToBottom = () => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // //   };

// // //   useEffect(() => {
// // //     scrollToBottom();
// // //   }, [messages, isLoading]);

// // //   const askAI = async (message) => {
// // //     try {
// // //       // First try the real API
// // //       const response = await api.post('/ai/ask', { message });
// // //       return response.data;
// // //     } catch (error) {
// // //       console.error('Failed to call real API, using fallback:', error);
// // //       // Fallback to mock data if real API fails
// // //       return mockAskAI(message);
// // //     }
// // //   };

// // //   const handleAskAI = async (e) => {
// // //     if (e) e.preventDefault();
// // //     if (!message.trim()) {
// // //       toast.error('Please enter a question! 💭');
// // //       return;
// // //     }

// // //     const userMessage = { text: message, isUser: true, id: Date.now() };
// // //     setMessages((prev) => [...prev, userMessage]);
// // //     setMessage('');
// // //     setIsLoading(true);

// // //     try {
// // //       const data = await askAI(message);
// // //       setIsLoading(false);

// // //       const aiMessage = {
// // //         text: data.response,
// // //         isUser: false,
// // //         id: Date.now() + 1,
// // //       };
// // //       setMessages((prev) => [...prev, aiMessage]);
// // //       toast.success('Response received! ✨');
// // //     } catch (err) {
// // //       setIsLoading(false);
// // //       toast.error(err.message || 'Failed to get AI response 😞');
// // //       const errorMessage = {
// // //         text: 'Sorry, I encountered an error. Please try again! 🤔',
// // //         isUser: false,
// // //         id: Date.now() + 1,
// // //       };
// // //       setMessages((prev) => [...prev, errorMessage]);
// // //     }
// // //   };

// // //   const handleKeyPress = (e) => {
// // //     if (e.key === 'Enter' && !e.shiftKey) {
// // //       e.preventDefault();
// // //       handleAskAI(e);
// // //     }
// // //   };

// // //   const clearChat = () => {
// // //     setMessages([
// // //       {
// // //         text: 'Chat cleared! 🧹 How can I help you?',
// // //         isUser: false,
// // //         id: Date.now(),
// // //       },
// // //     ]);
// // //   };

// // //   return (
// // //     <div className="fixed bottom-4 right-4 z-50">
// // //       {/* Chat Button */}
// // //       <button
// // //         onClick={() => setIsOpen(!isOpen)}
// // //         className={`p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
// // //           isDarkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'
// // //         } hover:bg-blue-800 relative`}
// // //       >
// // //         <MessageCircle size={24} />
// // //         {!isOpen && (
// // //           <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
// // //         )}
// // //       </button>

// // //       {/* Chat Window */}
// // //       {isOpen && (
// // //         <div
// // //           className={`absolute bottom-16 right-0 rounded-lg shadow-2xl transition-all duration-300 transform ${
// // //             isMinimized ? 'w-80 h-12' : 'w-96 h-96'
// // //           } ${
// // //             isDarkMode
// // //               ? 'bg-gray-800 text-white border border-gray-700'
// // //               : 'bg-white text-gray-900 border border-gray-200'
// // //           }`}
// // //         >
// // //           {/* Header */}
// // //           <div
// // //             className={`flex items-center justify-between p-4 border-b ${
// // //               isDarkMode ? 'border-gray-700' : 'border-gray-200'
// // //             }`}
// // //           >
// // //             <div className="flex items-center space-x-2">
// // //               <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
// // //               <h3 className="text-lg font-semibold">AI Assistant 🤖</h3>
// // //             </div>
// // //             <div className="flex space-x-2">
// // //               <button
// // //                 onClick={() => setIsMinimized(!isMinimized)}
// // //                 className={`p-1 rounded hover:bg-gray-200 ${isDarkMode ? 'hover:bg-gray-700' : ''}`}
// // //               >
// // //                 {isMinimized ? (
// // //                   <Maximize2 size={16} />
// // //                 ) : (
// // //                   <Minimize2 size={16} />
// // //                 )}
// // //               </button>
// // //               <button
// // //                 onClick={clearChat}
// // //                 className={`px-2 py-1 text-xs rounded ${
// // //                   isDarkMode
// // //                     ? 'bg-gray-700 hover:bg-gray-600'
// // //                     : 'bg-gray-100 hover:bg-gray-200'
// // //                 }`}
// // //               >
// // //                 Clear
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {!isMinimized && (
// // //             <>
// // //               {/* Messages */}
// // //               <div className="h-64 overflow-y-auto p-4 space-y-2">
// // //                 {messages.map((msg) => (
// // //                   <MessageBubble
// // //                     key={msg.id}
// // //                     message={msg.text}
// // //                     isUser={msg.isUser}
// // //                     isDarkMode={isDarkMode}
// // //                   />
// // //                 ))}
// // //                 {isLoading && <TypingIndicator isDarkMode={isDarkMode} />}
// // //                 <div ref={messagesEndRef} />
// // //               </div>

// // //               {/* Input */}
// // //               <div
// // //                 className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
// // //               >
// // //                 <div className="flex space-x-2">
// // //                   <textarea
// // //                     ref={inputRef}
// // //                     value={message}
// // //                     onChange={(e) => setMessage(e.target.value)}
// // //                     onKeyPress={handleKeyPress}
// // //                     placeholder="Ask about courses, tests, or anything else... 💬"
// // //                     className={`flex-1 p-2 rounded-md resize-none text-sm transition-all duration-200 ${
// // //                       isDarkMode
// // //                         ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500'
// // //                         : 'bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500'
// // //                     } border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
// // //                     rows="1"
// // //                     disabled={isLoading}
// // //                   />
// // //                   <button
// // //                     onClick={handleAskAI}
// // //                     disabled={isLoading || !message.trim()}
// // //                     className={`px-3 py-2 rounded-md transition-all duration-200 ${
// // //                       isLoading || !message.trim()
// // //                         ? 'bg-gray-400 cursor-not-allowed'
// // //                         : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
// // //                     } text-white flex items-center space-x-1`}
// // //                   >
// // //                     <Send size={16} />
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </>
// // //           )}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default AIChatButton;

import { useState, useEffect, useRef } from 'react';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import { askAI } from '../api/api';
import { toast } from 'react-toastify';
import {
  MessageCircle,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
} from 'lucide-react';

const TypingIndicator = ({ isDarkMode }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev === '...' ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-2 space-x-reverse p-3">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
        }`}
      >
        <Bot size={16} className="text-white" />
      </div>
      <div
        className={`px-3 py-2 rounded-lg max-w-xs ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`}
      >
        <div className="flex items-center space-x-1 space-x-reverse">
          <span className="text-sm">الذكاء الاصطناعي يكتب{dots}</span>
        </div>
      </div>
    </div>
  );
};

const MessageBubble = ({ message, isUser, isDarkMode }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!isUser && message) {
      let index = 0;
      const timer = setInterval(() => {
        if (index < message.length) {
          setDisplayedText(message.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 20);
      return () => clearInterval(timer);
    } else {
      setDisplayedText(message);
    }
  }, [message, isUser]);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`flex items-start space-x-2 max-w-xs ${
          isUser ? 'flex-row-reverse space-x-reverse' : ''
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser
              ? isDarkMode
                ? 'bg-green-600'
                : 'bg-green-500'
              : isDarkMode
                ? 'bg-blue-600'
                : 'bg-blue-500'
          }`}
        >
          {isUser ? (
            <User size={16} className="text-white" />
          ) : (
            <Bot size={16} className="text-white" />
          )}
        </div>
        <div
          className={`px-3 py-2 rounded-lg ${
            isUser
              ? isDarkMode
                ? 'bg-green-600 text-white'
                : 'bg-green-500 text-white'
              : isDarkMode
                ? 'bg-gray-700 text-white'
                : 'bg-gray-200 text-gray-900'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{displayedText}</p>
        </div>
      </div>
    </div>
  );
};

const AIChatButton = () => {
  const { isDarkMode } = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      text: 'مرحبًا! 👋 أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟',
      isUser: false,
      id: 1,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleAskAI = async (e) => {
    if (e) e.preventDefault();
    if (!message.trim()) {
      toast.error('يرجى إدخال سؤال!');
      return;
    }

    const userMessage = { text: message, isUser: true, id: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const data = await askAI(message);
      setIsLoading(false);
      const aiMessage = {
        text: data.response,
        isUser: false,
        id: Date.now() + 1,
      };
      setMessages((prev) => [...prev, aiMessage]);
      toast.success('تم استلام الرد!');
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message || 'فشل في الحصول على رد الذكاء الاصطناعي');
      const errorMessage = {
        text: 'عذرًا، حدث خطأ. حاول مرة أخرى!',
        isUser: false,
        id: Date.now() + 1,
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskAI();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        text: 'تم مسح الدردشة! 🧹 كيف يمكنني مساعدتك؟',
        isUser: false,
        id: Date.now(),
      },
    ]);
    toast.info('تم مسح الدردشة!');
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isDarkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'
        } hover:bg-blue-800 relative`}
        aria-label="فتح الدردشة مع الذكاء الاصطناعي"
      >
        <MessageCircle size={24} />
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`absolute bottom-16 right-0 rounded-lg shadow-2xl transition-all duration-300 transform ${
            isMinimized ? 'w-80 h-12' : 'w-96 h-[28rem]'
          } ${
            isDarkMode
              ? 'bg-gray-800 text-white border border-gray-700'
              : 'bg-white text-gray-900 border border-gray-200'
          }`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between p-3 border-b ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <h3 className="text-base font-semibold">
                مساعد الذكاء الاصطناعي 🤖
              </h3>
            </div>
            <div className="flex space-x-2 space-x-reverse">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className={`p-1 rounded hover:bg-gray-200 ${
                  isDarkMode ? 'hover:bg-gray-700' : ''
                }`}
                aria-label={isMinimized ? 'تكبير النافذة' : 'تصغير النافذة'}
              >
                {isMinimized ? (
                  <Maximize2 size={16} />
                ) : (
                  <Minimize2 size={16} />
                )}
              </button>
              <button
                onClick={clearChat}
                className={`px-2 py-1 text-xs rounded ${
                  isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                aria-label="مسح الدردشة"
              >
                مسح
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="h-[calc(28rem-8rem)] overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg.text}
                    isUser={msg.isUser}
                    isDarkMode={isDarkMode}
                  />
                ))}
                {isLoading && <TypingIndicator isDarkMode={isDarkMode} />}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div
                className={`p-4 border-t ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div className="flex space-x-2 space-x-reverse">
                  <textarea
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="اسأل عن الدورات، الاختبارات، أو أي شيء آخر... 💬"
                    className={`flex-1 p-2 rounded-md resize-none text-sm transition-all duration-200 ${
                      isDarkMode
                        ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500'
                        : 'bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500'
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                    rows="2"
                    disabled={isLoading}
                    aria-label="إدخال سؤال للذكاء الاصطناعي"
                  />
                  <button
                    onClick={handleAskAI}
                    disabled={isLoading || !message.trim()}
                    className={`px-3 py-2 rounded-md transition-all duration-200 ${
                      isLoading || !message.trim()
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
                    } text-white flex items-center space-x-1 space-x-reverse`}
                    aria-label="إرسال السؤال"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      <style>{`
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

export default AIChatButton;
