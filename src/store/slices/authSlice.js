import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logoutUser } from '../../api/api';
import { toast } from 'react-toastify';
import api from '../../api/api';

// Thunk: Handles API call + cookie cleanup
export const logoutUserThunk = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutUser(); // backend clears cookies
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout API failed:', error);

      // ✅ Still proceed with logout even if API fails
      // This handles cases where token is expired/invalid
      if (error.response?.status === 401) {
        console.log(
          'Token expired during logout - proceeding with local logout'
        );
        toast.success('Logged out successfully');
        return; // Don't reject, just proceed with logout
      }

      toast.error('Logout failed');
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchUserThunk = createAsyncThunk(
  'auth/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/auth/me');
      console.log(res.data.data, 'res of auth slice');
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial state loader (respected)
const loadInitialState = () => {
  return {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    isLoggingIn: false,
    oauthLoading: false,
    oauthError: null,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialState(),
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.isLoggingIn = false;
    },
    logout(state) {
      // Pure Redux cleanup only (e.g. fallback)
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isLoggingIn = false;
    },
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setLoggingIn(state, action) {
      state.isLoggingIn = action.payload;
    },
    setAuthState(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.user;
      state.isLoading = false;
      state.isLoggingIn = false;
    },
    startOAuth(state) {
      state.oauthLoading = true;
      state.oauthError = null;
    },
    oauthSuccess(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.oauthLoading = false;
    },
    oauthFailure(state, action) {
      state.oauthLoading = false;
      state.oauthError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      // Ensures Redux reflects backend logout
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isLoggingIn = false;
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      // ✅ Still clear state for 401 errors (expired tokens)
      if (
        action.error?.message?.includes('401') ||
        action.payload?.status === 401 ||
        action.meta?.arg === undefined
      ) {
        // Handle when we don't reject with value
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.isLoggingIn = false;
      }
    });
    builder
      .addCase(fetchUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(fetchUserThunk.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      });
  },
});

export const {
  login,
  logout,
  updateUser,
  setLoading,
  setLoggingIn,
  setAuthState,
  startOAuth,
  oauthSuccess,
  oauthFailure,
} = authSlice.actions;

export default authSlice.reducer;
