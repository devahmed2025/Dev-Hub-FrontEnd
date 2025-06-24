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


import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAuthState,
  setLoading,
  oauthSuccess,
  oauthFailure,
  fetchUserThunk,
} from '../store/slices/authSlice';

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export default function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false); // ✅ block children until done
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const initAuth = async () => {
      dispatch(setLoading(true));

      const isOauthSuccess =
        window.location.pathname.includes('/oauth/success');
      const isFailed = window.location.pathname.includes('/auth/login/failed');
      const accessToken = getCookie('accessToken');

      if (isFailed) {
        dispatch(setAuthState({ user: null, isAuthenticated: false }));
        window.history.replaceState({}, '', '/');
        setInitialized(true);
        dispatch(setLoading(false));
        return;
      }

      if (!accessToken) {
        dispatch(setAuthState({ user: null, isAuthenticated: false }));
        setInitialized(true);
        dispatch(setLoading(false));
        return;
      }

      try {
        const result = await dispatch(fetchUserThunk());

        if (fetchUserThunk.fulfilled.match(result)) {
          const user = result.payload;

          if (isOauthSuccess) {
            dispatch(oauthSuccess({ user }));
            window.history.replaceState({}, '', '/');
          } else {
            dispatch(setAuthState({ user, isAuthenticated: true }));
          }
        } else {
          throw new Error('Failed to fetch user');
        }
      } catch (err) {
        console.error('Auth error:', err);
        dispatch(setAuthState({ user: null, isAuthenticated: false }));
        if (isOauthSuccess) dispatch(oauthFailure('Invalid token'));
      } finally {
        setInitialized(true); // ✅ only render children once auth is checked
        dispatch(setLoading(false));
      }
    };

    initAuth();
  }, [dispatch]);

  if (!initialized) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return children;
}
