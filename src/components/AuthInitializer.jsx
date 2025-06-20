// // import { useEffect } from 'react';
// // import { useDispatch } from 'react-redux';
// // import { getCurrentUser } from '../api/api';
// // import { setAuthState, setLoading, oauthSuccess } from '../store/slices/authSlice';

// // export default function AuthInitializer({ children }) {
// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     const checkAuth = async () => {
// //       try {
// //         dispatch(setLoading(true));

// //         const urlParams = new URLSearchParams(window.location.search);
// //         const oauthSuccess = urlParams.get('oauth_success');
// //         const isFailed = window.location.pathname.includes('/auth/login/failed');

// //         if (isFailed) {
// //           console.log('OAuth login failed detected, clearing cookies...');
// //           document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
// //           document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
// //           document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/auth;';
// //           dispatch(setAuthState({ user: null, isAuthenticated: false }));
// //           window.history.replaceState({}, '', '/');
// //           return;
// //         }

// //         const attemptAuth = async () => {
// //           try {
// //             const response = await getCurrentUser();
// //             console.log('getCurrentUser response:', response.data);
// //             return response.data.data;
// //           } catch (error) {
// //             console.error('Auth attempt failed:', error.response?.data || error.message);
// //             throw error;
// //           }
// //         };

// //         if (oauthSuccess) {
// //           console.log('OAuth success detected, checking user...');
// //           window.history.replaceState({}, '', window.location.pathname);
// //           const user = await attemptAuth();
// //           dispatch(oauthSuccess({ user }));
// //           return;
// //         }

// //         console.log('Performing regular auth check...');
// //         const user = await attemptAuth();
// //         dispatch(setAuthState({ user, isAuthenticated: true }));
// //       } catch (error) {
// //         console.error('AuthInitializer error:', error.message);
// //         dispatch(setAuthState({ user: null, isAuthenticated: false }));
// //       } finally {
// //         dispatch(setLoading(false));
// //       }
// //     };

// //     checkAuth();
// //   }, [dispatch]);

// //   return children;
// // }

// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { getCurrentUser } from '../api/api';
// import {
//   setAuthState,
//   setLoading,
//   oauthSuccess,
// } from '../store/slices/authSlice';

// // Helper function to get cookie value
// const getCookie = (name) => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// };

// export default function AuthInitializer({ children }) {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         // Skip auth check if no tokens exist
//         const accessToken = getCookie('accessToken');
//         // if (!accessToken) {
//         //   console.log('No auth token found - skipping auth check');
//         //   dispatch(setLoading(false));
//         //   return;
//         // }

//         dispatch(setLoading(true));

//         const urlParams = new URLSearchParams(window.location.search);
//         const oauthSuccessParam = urlParams.get('oauth/success');
//         const isFailed =
//           window.location.pathname.includes('/auth/login/failed');

//         if (isFailed) {
//           console.log('OAuth login failed detected, clearing cookies...');
//           document.cookie =
//             'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//           document.cookie =
//             'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//           document.cookie =
//             'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/auth;';
//           dispatch(setAuthState({ user: null, isAuthenticated: false }));
//           window.history.replaceState({}, '', '/');
//           return;
//         }

//         const attemptAuth = async () => {
//           try {
//             const response = await getCurrentUser();
//             console.log('getCurrentUser response:', response.data);
//             return response.data.data;
//           } catch (error) {
//             // Clear invalid tokens on 401
//             if (error.response?.status === 401) {
//               document.cookie =
//                 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//               document.cookie =
//                 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//             }
//             throw error;
//           }
//         };

//         if (oauthSuccessParam) {
//           console.log('OAuth success detected, checking user...');
//           window.history.replaceState({}, '', window.location.pathname);
//           const user = await attemptAuth();
//           dispatch(oauthSuccess({ user }));
//           return;
//         }

//         console.log('Performing regular auth check...');
//         const user = await attemptAuth();
//         dispatch(setAuthState({ user, isAuthenticated: true }));
//       } catch (error) {
//         console.error('AuthInitializer error:', error.message);
//         dispatch(setAuthState({ user: null, isAuthenticated: false }));
//       } finally {
//         dispatch(setLoading(false));
//       }
//     };

//     checkAuth();
//   }, [dispatch]);

//   return children;
// }

// src/components/AuthInitializer.jsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../api/api';
import {
  setAuthState,
  setLoading,
  oauthSuccess,
} from '../store/slices/authSlice';

export default function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setLoading(true));

      const urlParams = new URLSearchParams(window.location.search);
      const oauthSuccessParam = urlParams.get('oauth/success');
      const isFailed = window.location.pathname.includes('/auth/login/failed');

      if (isFailed) {
        dispatch(setAuthState({ user: null, isAuthenticated: false }));
        window.history.replaceState({}, '', '/');
        dispatch(setLoading(false));
        return;
      }

      const attemptAuth = async () => {
        const response = await getCurrentUser();
        return response.data.data;
      };

      try {
        if (oauthSuccessParam) {
          window.history.replaceState({}, '', window.location.pathname);
          const user = await attemptAuth();
          dispatch(oauthSuccess({ user }));
          return;
        }

        const user = await attemptAuth();
        dispatch(setAuthState({ user, isAuthenticated: true }));
      } catch {
        dispatch(setAuthState({ user: null, isAuthenticated: false }));
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkAuth();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  return children;
}
