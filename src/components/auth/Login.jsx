import { useActionData, Form, Navigate, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login as loginApi, getCurrentUser } from '../../api/api';
import { login, setLoggingIn } from '../../store/slices/authSlice';

import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { toast } from 'react-toastify';
import OAuthButton from './OAuthButton';

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);

    document.cookie =
      'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie =
      'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    await loginApi(credentials);
    const response = await getCurrentUser();
    return { user: response.data.data };
  } catch (error) {
    return {
      error: error.response?.data?.message || error.message || 'Login failed',
    };
  }
}

function Login() {
  const actionData = useActionData();
  const dispatch = useDispatch();
  const { user, isLoading, isLoggingIn, oauthLoading } = useSelector(
    (state) => state.auth
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (actionData) {
      if (actionData.user) {

        dispatch(login({ user: actionData.user }));
        toast.success('Logged in successfully!');
        setIsSubmitting(false);
        dispatch(setLoggingIn(false));
      } else if (actionData.error) {
        toast.error(actionData.error);
        setIsSubmitting(false);
        dispatch(setLoggingIn(false));
      }
    }
  }, [actionData, dispatch]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    dispatch(setLoggingIn(true));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Login
        </h2>

        <OAuthButton />

        <div className="relative flex items-center my-6">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400">
            or
          </span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        <Form method="post" onSubmit={handleSubmit}>
          <Input
            id="email"
            label="Email"
            type="email"
            name="email"
            required
            className="mb-4"
            disabled={isSubmitting || oauthLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            name="password"
            required
            className="mb-4"
            disabled={isSubmitting || oauthLoading}
          />
          <Button
            type="primary"
            className="w-full"
            disabled={isSubmitting || isLoggingIn || oauthLoading}
          >
            {isSubmitting || isLoggingIn ? 'Logging in...' : 'Login'}
          </Button>
          <NavLink
            to="/forgot-password"
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot Password
          </NavLink>
        </Form>
      </Card>
    </div>
  );
}

export default Login;

// import { useActionData, Navigate, NavLink } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { login as loginApi, getCurrentUser } from '../../api/api';
// import { login, setLoggingIn } from '../../store/slices/authSlice';
// import { useDarkMode } from '../../features/darkMode/useDarkMode';
// import { toast } from 'react-toastify';
// import { Sparkles, Loader2 } from 'lucide-react';
// import Input from '../ui/Input';
// import Button from '../ui/Button';
// import Card from '../ui/Card';
// import OAuthButton from './OAuthButton';

// export async function action({ request }) {
//   try {
//     const formData = await request.formData();
//     const credentials = Object.fromEntries(formData);

//     document.cookie =
//       'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//     document.cookie =
//       'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

//     await loginApi(credentials);
//     const response = await getCurrentUser();
//     return { user: response.data.data };
//   } catch (error) {
//     return {
//       error: error.response?.data?.message || error.message || 'Login failed',
//     };
//   }
// }

// function Login() {
//   const actionData = useActionData();
//   const dispatch = useDispatch();
//   const { user, isLoading, isLoggingIn, oauthLoading } = useSelector(
//     (state) => state.auth
//   );
//   const { isDarkMode } = useDarkMode();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (actionData) {
//       if (actionData.user) {
//         dispatch(login({ user: actionData.user }));
//         toast.success('Logged in successfully!');
//         setIsSubmitting(false);
//         dispatch(setLoggingIn(false));
//       } else if (actionData.error) {
//         toast.error(actionData.error);
//         setIsSubmitting(false);
//         dispatch(setLoggingIn(false));
//       }
//     }
//   }, [actionData, dispatch]);

//   const handleSubmit = () => {
//     setIsSubmitting(true);
//     dispatch(setLoggingIn(true));
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 dark:border-cyan-400"></div>
//       </div>
//     );
//   }

//   if (user) {
//     return <Navigate to="/" replace />;
//   }

//   return (
//     <div
//       className={`min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-8 transition-all duration-300 ${isDarkMode ? 'dark' : ''}`}
//     >
//       <div className="max-w-md w-full px-4">
//         <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-emerald-200/30 dark:border-emerald-400/20 rounded-2xl shadow-2xl shadow-gray-900/10 dark:shadow-black/20 p-6">
//           <div className="flex items-center justify-center mb-6">
//             <div className="relative">
//               <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-violet-500 flex items-center justify-center shadow-lg ring-4 ring-white/20 dark:ring-gray-800/20 group-hover:shadow-xl group-hover:shadow-emerald-500/20 transition-all duration-300">
//                 <Sparkles className="w-6 h-6 text-white" />
//               </div>
//             </div>
//             <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent ml-3">
//               EduVerse Login
//             </h2>
//           </div>

//           <OAuthButton className="w-full px-6 py-2.5 bg-white/50 dark:bg-gray-800/50 border border-emerald-200/30 dark:border-emerald-400/20 rounded-2xl text-gray-900 dark:text-gray-100 font-medium hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 hover:scale-105" />

//           <div className="relative flex items-center my-6">
//             <div className="flex-grow border-t border-emerald-200/30 dark:border-emerald-400/20"></div>
//             <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400">
//               or
//             </span>
//             <div className="flex-grow border-t border-emerald-200/30 dark:border-emerald-400/20"></div>
//           </div>

//           <div className="space-y-4">
//             <Input
//               id="email"
//               label="Email"
//               type="email"
//               name="email"
//               required
//               disabled={isSubmitting || oauthLoading}
//               className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 border border-emerald-200/30 dark:border-emerald-400/20 rounded-2xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
//             />
//             <Input
//               id="password"
//               label="Password"
//               type="password"
//               name="password"
//               required
//               disabled={isSubmitting || oauthLoading}
//               className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 border border-emerald-200/30 dark:border-emerald-400/20 rounded-2xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
//             />
//             <Button
//               type="primary"
//               className="w-full px-6 py-2.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 text-white text-sm font-medium rounded-2xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
//               disabled={isSubmitting || isLoggingIn || oauthLoading}
//             >
//               <span className="relative z-10">
//                 {isSubmitting || isLoggingIn ? (
//                   <span className="flex items-center justify-center">
//                     <Loader2 className="w-5 h-5 animate-spin mr-2" />
//                     Logging in...
//                   </span>
//                 ) : (
//                   'Login'
//                 )}
//               </span>
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
//             </Button>
//             <NavLink
//               to="/forgot-password"
//               className="block text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-200 text-center"
//             >
//               Forgot Password?
//             </NavLink>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }

// export default Login;
