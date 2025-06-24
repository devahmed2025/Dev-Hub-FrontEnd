import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logoutUser } from '../../api/api';
import { toast } from 'react-toastify';
import api from '../../api/api';

// Thunk: Handles API call + cookie cleanup
export const logoutUserThunk = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      // Set logging out state immediately
      dispatch(setLoggingOut(true));

      // Attempt API logout
      await logoutUser();

      // Clear local state even if API fails
      toast.success('Logged out successfully');
      return true;
    } catch (error) {
      console.error('Logout API failed:', error);

      // If it's a 401, we're already logged out - treat as success
      if (error.response?.status === 401) {
        toast.success('Logged out successfully');
        return true;
      }

      toast.error('Logout failed');
      return rejectWithValue(error.response?.data || error.message);
    } finally {
      // Ensure we clear the logging out state
      dispatch(setLoggingOut(false));
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
    isLoggingOut: false, // Add this
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
    setLoggingOut(state, action) {
      state.isLoggingOut = action.payload;
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
    builder.addCase(logoutUserThunk.pending, (state) => {
      state.isLoggingOut = true;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      // Ensures Redux reflects backend logout
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isLoggingIn = false;
      state.isLoggingOut = false;
    });
    builder.addCase(logoutUserThunk.rejected, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isLoggingIn = false;
      state.isLoggingOut = false;
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
  setLoggingOut, // Add this
} = authSlice.actions;

export default authSlice.reducer;
