// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getCurrentUser } from '../api/api';
// import {
//   setAuthState,
//   setLoading,
//   oauthSuccess,
//   fetchUserThunk,
// } from '../store/slices/authSlice';

// export default function AuthInitializer({ children }) {
//   const dispatch = useDispatch();
//   const { isLoading } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const checkAuth = async () => {
//       dispatch(setLoading(true));

//       const urlParams = new URLSearchParams(window.location.search);
//       // const oauthSuccessParam = urlParams.get('oauth/success');
//       const isOauthSuccess =
//         window.location.pathname.includes('/oauth/success');
//       const isFailed = window.location.pathname.includes('/auth/login/failed');

//       if (isFailed) {
//         dispatch(setAuthState({ user: null, isAuthenticated: false }));
//         window.history.replaceState({}, '', '/');
//         dispatch(setLoading(false));
//         return;
//       }

//       const attemptAuth = async () => {
//         try {
//           // ✅ Await the result of the thunk
//           const resultAction = await dispatch(fetchUserThunk());

//           // ✅ If needed, extract the user data from the fulfilled action
//           if (fetchUserThunk.fulfilled.match(resultAction)) {
//             return resultAction.payload;
//           } else {
//             throw new Error('Auth failed');
//           }
//         } catch (error) {
//           console.log('Auth check error:', error);
//           return null;
//         }
//       };

//       try {
//         if (isOauthSuccess) {
//           window.history.replaceState({}, '', window.location.pathname);
//           const user = await attemptAuth();
//           dispatch(oauthSuccess({ user }));
//           return;
//         }

//         const user = await attemptAuth();
//         dispatch(setAuthState({ user, isAuthenticated: true }));
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

export default function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setLoading(true));

      const pathname = window.location.pathname;
      const isOauthSuccess = pathname.includes('/oauth/success');
      const isOauthFailed = pathname.includes('/auth/login/failed');

      // Handle failed OAuth login
      if (isOauthFailed) {
        dispatch(setAuthState({ user: null, isAuthenticated: false }));
        window.history.replaceState({}, '', '/');
        dispatch(setLoading(false));
        return;
      }

      const attemptAuth = async () => {
        try {
          const resultAction = await dispatch(fetchUserThunk());
          if (fetchUserThunk.fulfilled.match(resultAction)) {
            return resultAction.payload;
          }
          return null;
        } catch (error) {
          console.error('Auth attempt failed:', error);
          return null;
        }
      };

      try {
        if (isOauthSuccess) {
          const user = await attemptAuth();

          // Remove /oauth/success from URL after login
          window.history.replaceState({}, '', '/');

          if (user) {
            dispatch(oauthSuccess({ user }));
            dispatch(setAuthState({ user, isAuthenticated: true }));
          } else {
            dispatch(oauthFailure('OAuth user fetch failed'));
            dispatch(setAuthState({ user: null, isAuthenticated: false }));
          }
        } else {
          const user = await attemptAuth();
          dispatch(setAuthState({ user, isAuthenticated: !!user }));
        }
      } catch (err) {
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
        <div className="animate-spin h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return children;
}
