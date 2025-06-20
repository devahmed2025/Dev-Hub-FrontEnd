import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCourses,
  fetchCourseDetails,
  fetchMyCourses,
  addToCart,
  getCart,
  removeFromCart,
  applyCoupon,
  createOrder,
  checkoutOrder,
} from '../../api/api';

export const getCourses = createAsyncThunk('courses/fetchCourses', async () => {
  return await fetchCourses();
});

export const getCourseDetails = createAsyncThunk(
  'courses/fetchCourseDetails',
  async (courseId) => {
    return await fetchCourseDetails(courseId);
  }
);

export const getMyCourses = createAsyncThunk(
  'courses/fetchMyCourses',
  async () => {
    return await fetchMyCourses();
  }
);

export const addCourseToCart = createAsyncThunk(
  'courses/addToCart',
  async (courseId, { rejectWithValue }) => {
    try {
      return await addToCart(courseId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add to cart'
      );
    }
  }
);

export const fetchCart = createAsyncThunk('courses/fetchCart', async () => {
  return await getCart();
});

export const removeCourseFromCart = createAsyncThunk(
  'courses/removeFromCart',
  async (courseId, { rejectWithValue }) => {
    try {
      return await removeFromCart(courseId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to remove from cart'
      );
    }
  }
);

export const applyCouponCode = createAsyncThunk(
  'courses/applyCoupon',
  async (couponCode, { rejectWithValue }) => {
    try {
      return await applyCoupon(couponCode);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to apply coupon'
      );
    }
  }
);

export const createOrderThunk = createAsyncThunk(
  'courses/createOrder',
  async (cartId, { rejectWithValue }) => {
    try {
      return await createOrder(cartId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create order'
      );
    }
  }
);

export const checkoutOrderThunk = createAsyncThunk(
  'courses/checkoutOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      return await checkoutOrder(orderId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to checkout'
      );
    }
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    currentCourse: null,
    myCourses: [],
    cart: { cartItems: [], totalPrice: 0, totalPriceAfterDiscount: null },
    status: 'idle',
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getCourseDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCourseDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentCourse = action.payload;
      })
      .addCase(getCourseDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getMyCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMyCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.myCourses = action.payload;
      })
      .addCase(getMyCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCourseToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCourseToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload.cart;
      })
      .addCase(addCourseToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(removeCourseFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeCourseFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(removeCourseFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(applyCouponCode.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(applyCouponCode.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(applyCouponCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createOrderThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = { cartItems: [], totalPrice: 0 };
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(checkoutOrderThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkoutOrderThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        window.location.href = action.payload.redirectUrl;
      })
      .addCase(checkoutOrderThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearError } = courseSlice.actions;
export default courseSlice.reducer;
