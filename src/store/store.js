import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/slices/authSlice';
import darkModeReducer from '../store/slices/darkModeSlice';
import passwordResetReducer from '../store/slices/passwordResetSlice';
import testReducer from '../store/slices/testSlice';
import courseReducer from './slices/courseSlice';
import communityReducer from './slices/communitySlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    darkMode: darkModeReducer,
    passwordReset: passwordResetReducer,
    test: testReducer,
    courses: courseReducer,
    community: communityReducer,
    cart: cartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable fields in actions (e.g., Date objects)
        ignoredActions: ['test/beginTest/fulfilled'],
        ignoredPaths: ['test.startTime'],
      },
    }),
});
