

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { toast } from 'react-toastify';

// Fetch cart
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch cart';
      toast.error(message);
      if (error.response?.status === 404) {
        return {
          result: 0,
          status: 'success',
          cart: { cartItems: [], totalPrice: 0 },
        };
      }
      return rejectWithValue(message);
    }
  }
);

// Add to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ courseId }, { rejectWithValue, getState }) => {
    try {
      const response = await api.post('/cart', { courseId });
      toast.success('Course added to cart!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add to cart';
      toast.error(message);
      if (error.response?.status === 404) {
        const { courses } = getState().courses;
        const course = courses.courses.find((c) => c._id === courseId);
        if (course) {
          const currentItems = getState().cart.cartItems || [];
          const existingItem = currentItems.find(
            (item) => item.course._id === courseId
          );
          if (existingItem) {
            return getState().cart;
          } else {
            const newItem = {
              course,
              price: course.priceAfterDiscount || course.price,
              _id: `mock_${courseId}_${Date.now()}`,
            };
            currentItems.push(newItem);
          }
          const totalPrice = currentItems.reduce(
            (sum, item) => sum + (item.price || 0),
            0
          );
          return {
            result: currentItems.length,
            status: 'success',
            cart: {
              cartItems: currentItems,
              totalPrice,
            },
          };
        }
      }
      return rejectWithValue(message);
    }
  }
);

// Remove from cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ courseId }, { rejectWithValue, getState }) => {
    try {
      const response = await api.delete(`/cart/${courseId}`);
      return response.data.cart; // Expect backend to return updated cart
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to remove from cart';
      if (error.response?.status === 404) {
        // Handle case where course is not in cart
        const currentItems = getState().cart.cartItems || [];
        const updatedItems = currentItems.filter(
          (item) => item.course._id !== courseId
        );
        const totalPrice = updatedItems.reduce(
          (sum, item) =>
            sum + (item.course.priceAfterDiscount || item.course.price || 0),
          0
        );
        return {
          cart: {
            cartItems: updatedItems,
            totalPrice,
            totalPriceAfterDiscount: null, // Reset if coupon was applied
          },
        };
      }
      return rejectWithValue(message);
    }
  }
);

// Clear cart
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete('/cart');
      toast.success('Cart cleared!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to clear cart';
      toast.error(message);
      if (error.response?.status === 404) {
        return {
          result: 0,
          status: 'success',
          cart: { cartItems: [], totalPrice: 0 },
        };
      }
      return rejectWithValue(message);
    }
  }
);

// Create order
export const createOrder = createAsyncThunk(
  'cart/createOrder',
  async (cartId, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post(`/orders/${cartId}/checkout`);
      dispatch(clearCart());
      toast.success('Order created!');
      return {
        orderId: response.data.data.orderId,
        redirectUrl: response.data.data.redirectUrl,
        stripeSessionId: response.data.data.stripeSessionId,
      };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create order';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Apply coupon
export const applyCoupon = createAsyncThunk(
  'cart/applyCoupon',
  async (couponCode, { rejectWithValue }) => {
    try {
      const response = await api.put('/cart/coupon', { coupon: couponCode });
      toast.success('Coupon applied successfully!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to apply coupon';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    cartId: null,
    totalPrice: 0,
    totalPriceAfterDiscount: null,
    totalQuantity: 0,
    status: 'idle',
    error: null,
    order: null,
  },
  reducers: {
    resetCart: (state) => {
      state.cartItems = [];
      state.cartId = null;
      state.totalPrice = 0;
      state.totalPriceAfterDiscount = null;
      state.totalQuantity = 0;
      state.status = 'idle';
      state.error = null;
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Cart
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload.cart?.cartItems || [];
        state.totalPrice = action.payload.cart?.totalPrice || 0;
        state.totalPriceAfterDiscount =
          action.payload.cart?.totalPriceAfterDiscount || null;
        state.totalQuantity = action.payload.cart?.cartItems?.length || 0;
        state.cartId = action.payload.cart?._id;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload.cart?.cartItems || state.cartItems;
        state.totalPrice = action.payload.cart?.totalPrice || state.totalPrice;
        state.totalPriceAfterDiscount =
          action.payload.cart?.totalPriceAfterDiscount || null;
        state.totalQuantity =
          action.payload.cart?.cartItems?.length || state.totalQuantity;
        state.cartId = action.payload.cart?._id || state.cartId;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload.cart?.cartItems || [];
        state.totalPrice = action.payload.cart?.totalPrice || 0;
        state.totalPriceAfterDiscount =
          action.payload.cart?.totalPriceAfterDiscount || null;
        state.totalQuantity = action.payload.cart?.cartItems?.length || 0;
        state.error = null;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.status = 'succeeded';
        state.cartItems = [];
        state.totalPrice = 0;
        state.totalPriceAfterDiscount = null;
        state.totalQuantity = 0;
        state.cartId = null;
        state.error = null;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.order = action.payload;
        state.cartItems = [];
        state.totalPrice = 0;
        state.totalPriceAfterDiscount = null;
        state.totalQuantity = 0;
        state.cartId = null;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Apply Coupon
      .addCase(applyCoupon.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload.cart?.cartItems || state.cartItems;
        state.totalPrice = action.payload.cart?.totalPrice || state.totalPrice;
        state.totalPriceAfterDiscount =
          action.payload.cart?.totalPriceAfterDiscount || null;
        state.totalQuantity =
          action.payload.cart?.cartItems?.length || state.totalQuantity;
        state.cartId = action.payload.cart?._id || state.cartId;
        state.error = null;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
