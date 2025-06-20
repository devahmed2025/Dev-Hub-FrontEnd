import axios from 'axios';
// import { logout } from '../store/slices/authSlice';
// import { logoutUserThunk } from '../store/slices/authSlice'; // ✅ Import thunk instead of slice action

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'https://vvvejhxellmt.eu-central-1.clawcloudrun.com/api/v1',
//   withCredentials: true,
// });
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    'https://vvvejhxellmt.eu-central-1.clawcloudrun.com/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest.url.includes('/auth/me') ||
      originalRequest.url.includes('/auth/refresh-token')
    ) {
      return Promise.reject(error);
    }

    const isTokenExpired =
      error.response?.status === 401 &&
      error.response?.data?.message?.toLowerCase().includes('token expired');

    if (isTokenExpired && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.get('/auth/refresh-token');
        isRefreshing = false;
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);

        // ⬇️ Lazy import to avoid circular dependency
        const { store } = await import('../store/store');
        const { logoutUserThunk } = await import('../store/slices/authSlice');
        store.dispatch(logoutUserThunk());

        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 401) {
      const { store } = await import('../store/store');
      const { logoutUserThunk } = await import('../store/slices/authSlice');
      store.dispatch(logoutUserThunk());
    }

    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       originalRequest.url.includes('/auth/me') ||
//       originalRequest.url.includes('/auth/refresh-token')
//     ) {
//       // console.log(
//       //   'Skipping error handling for /auth/me or /auth/refresh-token'
//       // );
//       return Promise.reject(error);
//     }

//     if (
//       error.response?.status === 401 &&
//       error.response?.data?.message === 'Token expired' &&
//       !originalRequest._retry
//     ) {
//       if (isRefreshing) {
//         // console.log('Waiting for token refresh...');
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then(() => {
//             // console.log('Retrying original request:', originalRequest.url);
//             return api(originalRequest);
//           })
//           .catch((err) => {
//             console.error('Retry failed:', err);
//             return Promise.reject(err);
//           });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;
//       // console.log('Attempting to refresh token...');

//       try {
//         const response = await api.get('/auth/refresh-token');
//         // console.log('Token refresh response:', response.data);
//         isRefreshing = false;
//         processQueue(null);
//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error(
//           'Token refresh failed:',
//           refreshError.response?.data || refreshError.message
//         );
//         isRefreshing = false;
//         processQueue(refreshError, null);
//         document.cookie =
//           'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//         document.cookie =
//           'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//         store.dispatch(logout());
//         return Promise.reject(refreshError);
//       }
//     }

//     if (error.response?.status === 401) {
//       // console.log('Handling 401 error, clearing cookies and logging out');
//       document.cookie =
//         'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//       document.cookie =
//         'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//       store.dispatch(logout());
//     }

//     return Promise.reject(error);
//   }
// );

// Auth endpoints
export const register = (data) => api.post('/auth/signup', data);
export const login = (data) => api.post('/auth/login', data);
export const logoutUser = () => api.post('/auth/logout');
export const forgotPassword = (data) => api.post('/auth/forgotPassword', data);
export const verifyResetCode = (data) =>
  api.post('/auth/verifyPasswordResetCode', JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
export const resetPassword = (data) =>
  api.put('/auth/resetPassword', data, {
    headers: { 'Content-Type': 'application/json' },
  });
// export const getCurrentUser = () => api.get('/auth/me');
export const getCurrentUser = () =>
  api.get('/auth/me', { withCredentials: true });
export const resendVerification = () => api.get('/auth/resent-verification');
export const initiateGoogleAuth = () => {
  const apiUrl =
    import.meta.env.VITE_API_URL_oAuth ||
    'https://vvvejhxellmt.eu-central-1.clawcloudrun.com';
  window.location.href = `${apiUrl}/auth/google`;
};

// User endpoints
export const getUser = (userId) => api.get(`/users/${userId}`);

// Course endpoints
export const fetchCourses = async () => {
  const response = await api.get('/courses');
  return response.data.data;
};

export const fetchCourseDetails = async (courseId) => {
  try {
    const response = await api.get(`/courses/${courseId}`);
    if (!response.data?.data) {
      throw new Error('Invalid course data received');
    }
    return response.data.data;
  } catch (error) {
    console.error('fetchCourseDetails Error:', error.message);
    throw error;
  }
};

export const getVideos = async (courseId) => {
  try {
    const response = await api.get(`/courses/${courseId}/videos`);
    // console.log(response.videos),"hello";
    // Verify the response structure matches exactly what you shared
    if (response.data?.status === 'success' && response.data?.videos?.videos) {
      return response.data.videos.videos; // Directly return the videos array
    }

    throw new Error('Invalid video data structure received');
  } catch (error) {
    console.error('fetchVideos Error:', error);
    throw error;
  }
};

// api.js

export const fetchCourseCategories = () => api.get('/CourseCategory');
export const fetchCourseCategory = (categoryId) =>
  api.get(`/CourseCategory/${categoryId}`);

export const enrollInCourse = (courseId) =>
  api.post(`/courses/${courseId}/enroll`);

export const createCourse = async (courseData) => {
  const response = await api.post('/courses', courseData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
};

export const updateCourse = async (courseId, courseData) => {
  const response = await api.patch(`/courses/${courseId}`, courseData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
};

export const deleteCourse = async (courseId) => {
  const response = await api.delete(`/courses/${courseId}`);
  return response.data;
};

export const addVideoToCourse = async (courseId, videoData) => {
  const response = await api.post(`/courses/${courseId}/videos`, videoData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
};

export const fetchMyCourses = async () => {
  const response = await api.get('/courses/my-courses');
  return response.data.data;
};

// Cart endpoints
export const addToCart = async (courseId) => {
  const response = await api.post('/cart', { courseId });
  return response.data;
};

export const getCart = async () => {
  const response = await api.get('/cart');
  return response.data.cart;
};

export const removeFromCart = async (courseId) => {
  const response = await api.delete(`/cart/${courseId}`);
  return response.data.cart;
};

// Coupon endpoints
export const createCoupon = async (couponData) => {
  const response = await api.post('/coupons', couponData);
  return response.data.data;
};

export const applyCoupon = async (couponCode) => {
  const response = await api.put('/cart/coupon', { coupon: couponCode });
  return response.data.cart;
};

// Order endpoints
export const createOrder = async (cartId) => {
  const response = await api.post(`/orders/${cartId}`);
  return response.data.data;
};

export const getOrders = async () => {
  const response = await api.get('/orders');
  return response.data.data;
};

export const checkoutOrder = async (orderId) => {
  const response = await api.post(`/orders/${orderId}/checkout`);
  return response.data.data;
};

// Category endpoints
export const fetchCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const fetchCategory = async (categoryId) => {
  const response = await api.get(`/categories/${categoryId}`);
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await api.post('/categories', categoryData);
  return response.data.data;
};

export const updateCategory = async (categoryId, categoryData) => {
  const response = await api.patch(
    `/CourseCategory/${categoryId}`,
    categoryData
  );
  return response.data.data;
};

export const deleteCategory = async (categoryId) => {
  const response = await api.delete(`/CourseCategory/${categoryId}`);
  return response.data;
};

export const getMyCategory = async () => {
  const response = await api.get('/categories/my-category');
  return response.data.data;
};

export const updateMyCategory = async (categoryId) => {
  const response = await api.post('/categories/my-category', { categoryId });
  return response.data.data;
};

export const deleteMyCategory = async () => {
  const response = await api.delete('/categories/my-category');
  return response.data;
};

// Community endpoints
export const createPost = async (postData) => {
  const response = await api.post('/community/posts', postData);
  return response.data;
};
// export const fetchPosts = async () => {
//   const response = await api.get('/community/posts');
//   return response.data;
// };
export const fetchPosts = async (page = 1) => {
  try {
    const response = await api.get(`/community/posts?page=${page}`);
    // Log response for debugging
    // console.log('API Response:', response.data);
    // Validate response structure
    if (
      !response.data ||
      !response.data.data ||
      !response.data.paginationReult
    ) {
      throw new Error('Invalid API response structure');
    }
    // Normalize pagination keys
    return {
      data: response.data.data,
      paginationResult: {
        currentPage:
          parseInt(response.data.paginationReult.currentPage, 10) || 1,
        numberOfPages: response.data.paginationReult.numperOfPages || 1,
        limit: response.data.paginationReult.limit || 10,
        prev: response.data.paginationReult.prev || null,
      },
    };
  } catch (error) {
    console.error('Fetch Posts Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch posts');
  }
};
export const fetchPost = async (postId) => {
  const response = await api.get(`/community/posts/${postId}`);
  return response.data;
};

export const updatePost = async (postId, postData) => {
  const response = await api.patch(`/community/posts/${postId}`, postData);
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await api.delete(`/community/posts/${postId}`);
  return response.data;
};

export const likePost = async (postId) => {
  const response = await api.post(`/community/posts/${postId}/like`);
  return response.data;
};

export const unlikePost = async (postId) => {
  const response = await api.post(`/community/posts/${postId}/unlike`);
  return response.data;
};

export const createComment = async (postId, commentData) => {
  const response = await api.post(
    `/community/posts/${postId}/comments`,
    commentData
  );
  return response.data;
};

export const fetchComments = async (postId) => {
  const response = await api.get(`/community/posts/${postId}/comments`);
  return response.data;
};

export const updateComment = async (postId, commentId, commentData) => {
  const response = await api.patch(
    `/community/posts/${postId}/comments/${commentId}`,
    commentData
  );
  return response.data;
};

export const deleteComment = async (postId, commentId) => {
  const response = await api.delete(
    `/community/posts/${postId}/comments/${commentId}`
  );
  return response.data;
}; // AI endpoints
export const askAI = async (message) => {
  const response = await api.post('/ai/ask', { message });
  return response.data.data;
};

// Test endpoints
export const fetchTests = async () => {
  try {
    const response = await api.get('/tests');
    // console.log('fetchTests API Response:', response.data);
    return response.data; // Return full response.data: { status, results, data }
  } catch (error) {
    console.error(
      'fetchTests API Error:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchTestDetails = async (testId) => {
  const response = await api.get(`/tests/${testId}`);
  return response.data;
};

export const createTest = async (testData) => {
  const response = await api.post(`/tests`, testData);
  return response.data;
};

export const updateTest = async (testId, testData) => {
  const response = await api.patch(`/tests/${testId}`, testData);
  return response.data;
};

export const deleteTest = async (testId) => {
  const response = await api.delete(`/tests/${testId}`);
  return response.data;
};

export const fetchTestGrades = async (testId) => {
  const response = await api.get(`/tests/${testId}/grades`);
  return response.data;
};

export const startTest = async (testId) => {
  if (!testId) throw new Error('Test ID is required to start the test.');
  try {
    const response = await api.post(`/tests/${testId}/start`);
    return response.data;
  } catch (error) {
    console.error('Failed to start the test:', error);
    throw new Error(
      error.response?.data?.message ||
        'Something went wrong while starting the test.'
    );
  }
};

export const submitTest = async (testId, answers) => {
  try {
    const response = await api.post(`/tests/${testId}/submit`, {
      testId,
      answers,
    });
    return response.data;
  } catch (err) {
    if (
      err.response?.status === 401 &&
      err.response?.data?.message?.includes('Test not started')
    ) {
      await api.post(`/tests/${testId}/start`);
      const response = await api.post(`/tests/${testId}/submit`, {
        testId,
        answers,
      });
      return response.data;
    }
    throw err;
  }
};

// Utility functions
export const uploadFile = (url, formData, onUploadProgress) =>
  api.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
  });

export const createCancelToken = () => api.CancelToken.source();

export default api;
