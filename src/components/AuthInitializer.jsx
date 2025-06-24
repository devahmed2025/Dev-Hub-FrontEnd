// // // import { useEffect } from 'react';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { getCurrentUser } from '../api/api';
// // // import {
// // //   setAuthState,
// // //   setLoading,
// // //   oauthSuccess,
// // //   fetchUserThunk,
// // // } from '../store/slices/authSlice';

// // // export default function AuthInitializer({ children }) {
// // //   const dispatch = useDispatch();
// // //   const { isLoading } = useSelector((state) => state.auth);

// // //   useEffect(() => {
// // //     const checkAuth = async () => {
// // //       dispatch(setLoading(true));

// // //       const urlParams = new URLSearchParams(window.location.search);
// // //       // const oauthSuccessParam = urlParams.get('oauth/success');
// // //       const isOauthSuccess =
// // //         window.location.pathname.includes('/oauth/success');
// // //       const isFailed = window.location.pathname.includes('/auth/login/failed');

// // //       if (isFailed) {
// // //         dispatch(setAuthState({ user: null, isAuthenticated: false }));
// // //         window.history.replaceState({}, '', '/');
// // //         dispatch(setLoading(false));
// // //         return;
// // //       }

// // //       const attemptAuth = async () => {
// // //         try {
// // //           // ✅ Await the result of the thunk
// // //           const resultAction = await dispatch(fetchUserThunk());

// // //           // ✅ If needed, extract the user data from the fulfilled action
// // //           if (fetchUserThunk.fulfilled.match(resultAction)) {
// // //             return resultAction.payload;
// // //           } else {
// // //             throw new Error('Auth failed');
// // //           }
// // //         } catch (error) {
// // //           console.log('Auth check error:', error);
// // //           return null;
// // //         }
// // //       };

// // //       try {
// // //         if (isOauthSuccess) {
// // //           window.history.replaceState({}, '', window.location.pathname);
// // //           const user = await attemptAuth();
// // //           dispatch(oauthSuccess({ user }));
// // //           return;
// // //         }

// // //         const user = await attemptAuth();
// // //         dispatch(setAuthState({ user, isAuthenticated: true }));
// // //       } catch {
// // //         dispatch(setAuthState({ user: null, isAuthenticated: false }));
// // //       } finally {
// // //         dispatch(setLoading(false));
// // //       }
// // //     };

// // //     checkAuth();
// // //   }, [dispatch]);

// // //   if (isLoading) {
// // //     return (
// // //       <div className="flex justify-center items-center h-screen">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
// // //       </div>
// // //     );
// // //   }

// // //   return children;
// // // }

// // import { useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import {
// //   setAuthState,
// //   setLoading,
// //   oauthSuccess,
// //   oauthFailure,
// //   fetchUserThunk,
// // } from '../store/slices/authSlice';

// // export default function AuthInitializer({ children }) {
// //   const dispatch = useDispatch();
// //   const { isLoading } = useSelector((state) => state.auth);

// //   useEffect(() => {
// //     const checkAuth = async () => {
// //       dispatch(setLoading(true));

// //       const isOauthSuccess =
// //         window.location.pathname.includes('/oauth/success');
// //       const isFailed = window.location.pathname.includes('/auth/login/failed');

// //       if (isFailed) {
// //         dispatch(setAuthState({ user: null, isAuthenticated: false }));
// //         window.history.replaceState({}, '', '/');
// //         dispatch(setLoading(false));
// //         return;
// //       }

// //       const attemptAuth = async () => {
// //         try {
// //           const resultAction = await dispatch(fetchUserThunk());

// //           if (fetchUserThunk.fulfilled.match(resultAction)) {
// //             return resultAction.payload;
// //           } else {
// //             throw new Error('Auth failed');
// //           }
// //         } catch (error) {
// //           console.error('Auth check error:', error);
// //           return null;
// //         }
// //       };

// //       try {
// //         const user = await attemptAuth();

// //         if (!user) {
// //           dispatch(setAuthState({ user: null, isAuthenticated: false }));
// //           if (isOauthSuccess)
// //             dispatch(oauthFailure('Invalid user after login'));
// //           return;
// //         }

// //         if (isOauthSuccess) {
// //           dispatch(oauthSuccess({ user }));
// //           window.history.replaceState({}, '', '/');
// //         } else {
// //           dispatch(setAuthState({ user, isAuthenticated: true }));
// //         }
// //       } catch {
// //         dispatch(setAuthState({ user: null, isAuthenticated: false }));
// //       } finally {
// //         dispatch(setLoading(false));
// //       }
// //     };

// //     checkAuth();
// //   }, [dispatch]);

// //   if (isLoading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
// //       </div>
// //     );
// //   }

// //   return children;
// // }

// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   setAuthState,
//   setLoading,
//   oauthSuccess,
//   oauthFailure,
//   fetchUserThunk,
// } from '../store/slices/authSlice';
// import axios from 'axios';

// export default function AuthInitializer({ children }) {
//   const dispatch = useDispatch();
//   const { isLoading } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const checkAuth = async () => {
//       dispatch(setLoading(true));

//       const isOauthSuccess =
//         window.location.pathname.includes('/oauth/success');
//       const isFailed = window.location.pathname.includes('/auth/login/failed');

//       if (isFailed) {
//         dispatch(setAuthState({ user: null, isAuthenticated: false }));
//         window.history.replaceState({}, '', '/');
//         dispatch(setLoading(false));
//         return;
//       }

//       const attemptRefresh = async () => {
//         try {
//           await axios.get('/auth/refresh-token', { withCredentials: true });
//         } catch (err) {
//           console.warn('Refresh token failed:', err?.response?.data || err);
//         }
//       };

//       const attemptAuth = async () => {
//         try {
//           const resultAction = await dispatch(fetchUserThunk());

//           if (fetchUserThunk.fulfilled.match(resultAction)) {
//             return resultAction.payload;
//           } else {
//             throw new Error('Auth failed');
//           }
//         } catch (error) {
//           console.error('Auth check error:', error);
//           return null;
//         }
//       };

//       try {
//         // ⬇️ Force refresh before fetching user
//         await attemptRefresh();
//         const user = await attemptAuth();

//         if (!user) {
//           dispatch(setAuthState({ user: null, isAuthenticated: false }));
//           if (isOauthSuccess)
//             dispatch(oauthFailure('Invalid user after login'));
//           return;
//         }

//         if (isOauthSuccess) {
//           dispatch(oauthSuccess({ user }));
//           window.history.replaceState({}, '', '/');
//         } else {
//           dispatch(setAuthState({ user, isAuthenticated: true }));
//         }
//       } catch {
//         dispatch(setAuthState({ user: null, isAuthenticated: false }));
//       } finally {
//         dispatch(setLoading(false));
//       }
//     };

//     checkAuth();
//   }, [dispatch]);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
//       </div>
//     );
//   }

//   return children;
// }

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAuthState,
  setLoading,
  oauthSuccess,
  oauthFailure,
  fetchUserThunk,
} from '../store/slices/authSlice';
import axios from 'axios';
import api from '../api/api';

export default function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const initializeAuth = async () => {
      dispatch(setLoading(true));

      const isOauthSuccess =
        window.location.pathname.includes('/oauth/success');
      const isOauthFail =
        window.location.pathname.includes('/auth/login/failed');

      // 🛑 If OAuth failed
      if (isOauthFail) {
        console.warn('🚫 OAuth failed route detected');
        dispatch(setAuthState({ user: null, isAuthenticated: false }));
        window.history.replaceState({}, '', '/');
        dispatch(setLoading(false));
        return;
      }

      try {
        // 🌐 Attempt token refresh
        const refreshRes = await api.get('/auth/refresh-token');

        console.log('🔄 Token refreshed:', refreshRes.data);

        // 👤 Attempt to fetch user
        const resultAction = await dispatch(fetchUserThunk());
        if (!fetchUserThunk.fulfilled.match(resultAction)) {
          throw new Error('User fetch failed');
        }

        const user = resultAction.payload;

        // ✅ OAuth login success
        if (isOauthSuccess) {
          dispatch(oauthSuccess({ user }));
          window.history.replaceState({}, '', '/');
          console.log('🔁 Reloading after OAuth login...');
          window.location.reload(); // Important to re-init Redux + UI
        } else {
          dispatch(setAuthState({ user, isAuthenticated: true }));
        }
      } catch (err) {
        console.warn('❌ Auth init failed:', err);
        dispatch(setAuthState({ user: null, isAuthenticated: false }));
        if (isOauthSuccess) dispatch(oauthFailure('Login failed after OAuth'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    initializeAuth();

    // 🔁 Token Refresh every 10 minutes
    const intervalId = setInterval(
      async () => {
        try {
          const res = await api.get('/auth/refresh-token');
          console.log('🟢 [Interval] Token refreshed:', res.data);
        } catch (err) {
          console.warn(
            '🔴 [Interval] Refresh failed:',
            err?.response?.data || err
          );
        }
      },
      10 * 60 * 1000
    );

    return () => clearInterval(intervalId);
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
