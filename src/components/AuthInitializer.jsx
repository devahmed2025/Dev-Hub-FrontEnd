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
import { getCurrentUser } from '../api/api';
import {
  setAuthState,
  setLoading,
  oauthSuccess,
  fetchUserThunk,
  oauthFailure,
} from '../store/slices/authSlice';

export default function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setLoading(true));

      const urlParams = new URLSearchParams(window.location.search);
      // const oauthSuccessParam = urlParams.get('oauth/success');
      const isOauthSuccess =
        window.location.pathname.includes('/oauth/success');
      const isFailed = window.location.pathname.includes('/auth/login/failed');

      if (isFailed) {
        dispatch(setAuthState({ user: null, isAuthenticated: false }));
        window.history.replaceState({}, '', '/');
        dispatch(setLoading(false));
        return;
      }

      const attemptAuth = async () => {
        try {
          let resultAction = await dispatch(fetchUserThunk());

          if (fetchUserThunk.rejected.match(resultAction)) {
            // 🕒 Delay and retry ONCE
            await new Promise((res) => setTimeout(res, 500));
            resultAction = await dispatch(fetchUserThunk());
          }

          if (fetchUserThunk.fulfilled.match(resultAction)) {
            return resultAction.payload;
          } else {
            throw new Error('Auth failed');
          }
        } catch (error) {
          console.log('Auth check error:', error);
          return null;
        }
      };

      try {
        if (isOauthSuccess) {
          window.history.replaceState({}, '', window.location.pathname);

          const user = await attemptAuth();
          if (user) {
            dispatch(oauthSuccess({ user }));
            return; // ✅ Don't continue
          } else {
            dispatch(oauthFailure('OAuth session invalid'));
            dispatch(setAuthState({ user: null, isAuthenticated: false }));
          }
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
