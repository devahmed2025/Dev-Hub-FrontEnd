import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useDarkMode } from './features/darkMode/useDarkMode';
import DarkModeToggle from './features/darkMode/DarkModeToggle';
import AppLayout from './layouts/AppLayout';
import ErrorFallback from './components/ui/ErrorFallback';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';
import AuthInitializer from './components/AuthInitializer';
import api from './api/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store/store';
import {
  fetchCategories,
  fetchCategory,
  fetchTests,
  getCurrentUser,
  getVideos,
  fetchTestDetails,
  fetchCourses,
  fetchCourseDetails,
  fetchCourseCategories,
  fetchCourseCategory,
  fetchMyCourses,
  fetchPosts,
  createPost,
  getMyCategory,
  updateMyCategory,
  deleteMyCategory,
} from './api/api';
import { action as loginAction } from './components/auth/Login';

import AIChatButton from './components/AIChatButton';

import VideoPlayer from './components/VideoPlayer';
import CourseVideoPage from './components/CourseVideoPage';
import GoogleCallback from './components/auth/GoogleCallback';

// Lazy-loaded components
// import PostDetail from './components/PostDetail';
const PostDetail = lazy(() => import('./components/PostDetail'));

const Login = lazy(() => import('./components/auth/Login'));
const Signup = lazy(() => import('./components/auth/Signup'));
const TestContainer = lazy(() => import('./components/TestContainer'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const TestList = lazy(() => import('./components/TestList'));
const CreateTest = lazy(() => import('./components/CreateTest'));
const CreateCategory = lazy(() => import('./components/CreateCategory'));
const TestGrades = lazy(() => import('./components/TestGrades'));
const StudentGrades = lazy(() => import('./components/StudentGrades'));
const EditTest = lazy(() => import('./components/EditTest'));
const ForgotPasswordFlow = lazy(
  () => import('./components/auth/ForgotPasswordFlow')
);
const CategoriesList = lazy(() => import('./components/CategoriesList'));
const CategoryDetails = lazy(() => import('./components/CategoryDetails'));
const Home = lazy(() => import('./components/Home'));
const CourseList = lazy(() => import('./components/CourseList'));
const CourseDetails = lazy(() => import('./components/CourseDetails'));
const CourseCategoryList = lazy(
  () => import('./components/CourseCategoryList')
);
const CourseCategoryDetails = lazy(
  () => import('./components/CourseCategoryDetails')
);
const CommunityPage = lazy(() => import('./components/CommunityPage'));
const UserSettings = lazy(() => import('./components/UserSettings'));
const CartPage = lazy(() => import('./components/CartPage'));
const OrderPage = lazy(() => import('./components/OrderPage'));
const Profile = lazy(() => import('./components/Profile'));

const AdminCourseManagement = lazy(
  () => import('./components/AdminCourseManagement')
);
const AdminCategoryManagement = lazy(
  () => import('./components/AdminCategoryManagement')
);

// Placeholder admin components
const AdminUserManagement = lazy(() =>
  Promise.resolve({
    default: () => (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
        <p>Placeholder: Implement user management functionality here.</p>
      </div>
    ),
  })
);
const AdminCommunityManagement = lazy(() =>
  Promise.resolve({
    default: () => (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Manage Community</h2>
        <p>Placeholder: Implement community management functionality here.</p>
      </div>
    ),
  })
);

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Loaders
const testsLoader = async () => {
  try {
    const data = await fetchTests();
    // if (import.meta.env.DEV) console.log('testsLoader Data:', data);
    return { tests: data, status: 'succeeded', error: null };
  } catch (error) {
    console.error('testsLoader Error:', error.message);
    return {
      tests: [],
      status: 'error',
      error: error.message || 'Failed to fetch tests',
    };
  }
};

const categoriesLoader = async () => {
  try {
    const res = await fetchCategories();
    // if (import.meta.env.DEV) console.log('categoriesLoader Data:', res.data);
    return { categories: res.data, status: 'succeeded', error: null };
  } catch (error) {
    console.error('categoriesLoader Error:', error.message);
    return {
      categories: [],
      status: 'error',
      error: error.message || 'Failed to fetch categories',
    };
  }
};

const categoryLoader = async ({ params }) => {
  const { categoryId } = params;
  try {
    const res = await fetchCategory(categoryId); // fetches full response
    // const category = res.data; // get only the data array

    if (import.meta.env.DEV) {
      // console.log('category loader Data:', res);
    }

    return {
      res,

      status: 'succeeded',
      error: null,
    };
  } catch (error) {
    console.error('category Error:', error.message);
    return {
      category: [], // ← fixed from 'tests'
      status: 'error',
      error: error.message || 'Failed to fetch categories',
    };
  }
};

const coursesLoader = async () => {
  try {
    const data = await fetchCourses();
    if (import.meta.env.DEV) console.log('coursesLoader Data:', data);
    return { courses: data.data, status: 'succeeded', error: null };
  } catch (error) {
    console.error('coursesLoader Error:', error.message);
    return {
      courses: [],
      status: 'error',
      error: error.message || 'Failed to fetch courses',
    };
  }
};
// loaders/courseLoader.js
export const courseLoader = async ({ params }) => {
  const { courseId } = params;
  try {
    const courseData = await fetchCourseDetails(courseId);
    // console.log(courseData, 'courseData');
    return {
      course: courseData,
      status: 'succeeded',
      error: null,
    };
  } catch (error) {
    throw new Response('Not Found', { status: 404 });
  }
};
// loaders/courseLoader.js
export const videosLoader = async ({ params }) => {
  const { courseId } = params;
  try {
    const videos = await getVideos(courseId);
    // console.log(videos, 'videosLoader');
    if (!Array.isArray(videos)) {
      throw new Error('Received invalid videos data - expected an array');
    }

    return {
      videos, // Direct array of videos
      status: 'succeeded',
      error: null,
    };
  } catch (error) {
    console.error('videosLoader Error:', error);
    throw new Response('Not Found', { status: 404 });
  }
};

const courseCategoriesLoader = async () => {
  try {
    const response = await fetchCourseCategories();

    // Access the nested data array
    const categories = response.data.data || [];

    return {
      categories,
      status: 'succeeded',
      error: null,
    };
  } catch (error) {
    console.error('courseCategoriesLoader Error:', error.message);
    return {
      categories: [],
      status: 'error',
      error: error.message || 'Failed to fetch course categories',
    };
  }
};
const courseCategoryLoader = async ({ params }) => {
  const { categoryId } = params;
  try {
    const data = await fetchCourseCategory(categoryId);
    // if (import.meta.env.DEV) console.log('courseCategoryLoader Data:', data);
    return { category: data.data, status: 'succeeded', error: null };
  } catch (error) {
    console.error('courseCategoryLoader Error:', error.message);
    return {
      category: null,
      status: 'error',
      error: error.message || 'Failed to fetch course category',
    };
  }
};

const myCoursesLoader = async () => {
  try {
    const response = await api.get('/my-courses');
    return response.data.data;
  } catch (error) {
    console.error('myCoursesLoader Error:', error.message);
    return [];
  }
};

// const cartLoader = async () => {
//   try {
//     const data = await api.get('/cart');
//     if (import.meta.env.DEV) console.log('cartLoader Data:', data);
//     return { cart: data.cart.cartItems, status: 'succeeded', error: null };
//   } catch (error) {
//     console.error('cartLoader Error:', error.message);
//     return {
//       cart: { items: [], totalPrice: 0 },
//       status: 'error',
//       error: error.message || 'Failed to fetch cart',
//     };
//   }
// };

export const postsLoader = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || 1;

  try {
    const response = await api.get(`/community/posts?page=${page}`);
    // if (import.meta.env.DEV) {
    //   console.log('postsLoader Data:', response.data);
    // }

    return {
      posts: response.data.data || [],
      pagination: response.data.paginationResult || {},
      status: 'succeeded',
      error: null,
    };
  } catch (error) {
    console.error('postsLoader Error:', error.message);
    return {
      posts: [],
      pagination: {},
      status: 'failed',
      error: error.response?.data?.message || 'Failed to fetch posts',
    };
  }
};

const testLoader = async ({ params }) => {
  const { testId } = params;
  // console.log('[testLoader] Initializing with testId:', testId);
  try {
    // console.log('[testLoader] Fetching test details...');
    const testResponse = await fetchTestDetails(testId);
    // console.log(
    //   '[testLoader] Raw test response:',
    //   JSON.stringify(testResponse, null, 2)
    // );
    if (!testResponse || !testResponse.data || !testResponse.data.test) {
      console.error('[testLoader] Invalid test data structure received');
      throw new Error('Invalid test data structure received');
    }
    const { test, hasStarted: serverHasStarted } = testResponse.data;
    // console.log('[testLoader] Extracted test:', JSON.stringify(test, null, 2));
    // console.log('[testLoader] Server hasStarted flag:', serverHasStarted);
    // console.log('[testLoader] Fetching current user...');
    const userResponse = await getCurrentUser();
    // console.log(
    //   '[testLoader] Raw user response:',
    //   JSON.stringify(userResponse, null, 2)
    // );
    const user = userResponse.data.data;
    // console.log('[testLoader] User data:', JSON.stringify(user, null, 2));
    // console.log('[testLoader] User ongoing tests:', user.onGoingtests);
    const clientHasStarted =
      user.onGoingtests?.some((t) => t.test && t.test.toString() === testId) ||
      false;
    // console.log('[testLoader] Client-side hasStarted:', clientHasStarted);
    const hasStarted =
      typeof serverHasStarted !== 'undefined'
        ? serverHasStarted
        : clientHasStarted;
    // console.log('[testLoader] Final hasStarted value:', hasStarted);
    return { test, hasStarted };
  } catch (error) {
    console.error(
      '[testLoader] Error:',
      error.message,
      '\nStack:',
      error.stack
    );
    throw new Response(
      JSON.stringify({ error: error.message || 'Failed to load test data' }),
      {
        status: error.response?.status || 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

const gradesLoader = async ({ params }) => {
  const { studentId } = params;
  if (!studentId) throw new Error('Student ID is required to load grades.');
  try {
    const response = await api.get(`/tests/grades/${studentId}`);
    // console.log('gradesLoader:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'gradesLoader Error:',
      error.response?.data?.message || error.message
    );
    throw new Error(
      error.response?.data?.message || 'Failed to fetch student grades.'
    );
  }
};

const adminLoader = async () => {
  try {
    const [testsRes, categoriesRes, coursesRes, courseCategoriesRes] =
      await Promise.all([
        api.get('/tests'),
        api.get('/categories'),
        api.get('/courses'),
        api.get('/CourseCategory'),
      ]);
    return {
      tests: testsRes.data?.data?.tests || [],
      categories: categoriesRes.data?.data || [],
      courses: coursesRes.data?.data || [],
      courseCategories: courseCategoriesRes.data?.data || [],
    };
  } catch (error) {
    console.error(
      'adminLoader Error:',
      error.response?.data?.message || error.message
    );
    throw new Error(
      error.response?.data?.message || 'Failed to load admin data'
    );
  }
};

const testGradesLoader = async ({ params }) => {
  const { testId } = params;
  try {
    const response = await api.get(`/tests/${testId}/grades`);
    // console.log('[testGradesLoader] Grades response:', response.data);
    if (!response.data)
      throw new Error('Invalid test grades data structure received');
    return response.data;
  } catch (error) {
    console.error('[testGradesLoader] Error:', error.message);
    throw new Response(
      JSON.stringify({
        error: error.response?.data?.message || 'Failed to load test grades',
      }),
      {
        status: error.response?.status || 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

const orderLoader = async ({ params }) => {
  const { orderId } = params;
  try {
    const response = await api.get(`/orders/${orderId}`);
    // if (import.meta.env.DEV) console.log('orderLoader Data:', response.data);
    return { order: response.data.data, status: 'succeeded', error: null };
  } catch (error) {
    // console.error('orderLoader Error:', error.message);
    throw new Response(
      JSON.stringify({ error: error.message || 'Failed to load order' }),
      {
        status: error.response?.status || 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

// Actions
const createTestAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const testData = Object.fromEntries(formData);
    // console.log('[createTestAction] Creating test with data:', testData);
    const response = await api.post('/tests', testData, {
      headers: { 'Content-Type': 'application/json' },
    });
    // console.log('[createTestAction] Test created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      '[createTestAction] Error:',
      error.message,
      error.response?.data
    );
    throw new Response(
      JSON.stringify({
        error: error.response?.data?.message || 'Failed to create test',
      }),
      {
        status: error.response?.status || 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

const updateTestAction = async ({ params, request }) => {
  const { testId } = params;
  try {
    const formData = await request.formData();
    const testData = Object.fromEntries(formData);
    // console.log(
    //   '[updateTestAction] Updating test:',
    //   testId,
    //   'with data:',
    //   testData
    // );
    const response = await api.patch(`/tests/${testId}`, testData, {
      headers: { 'Content-Type': 'application/json' },
    });
    // console.log('[updateTestAction] Test updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      '[updateTestAction] Error updating test:',
      error.message,
      error.response?.data
    );
    throw new Response(
      JSON.stringify({
        error: error.response?.data?.message || 'Failed to update test',
      }),
      {
        status: error.response?.status || 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

const deleteTestAction = async ({ params }) => {
  const { testId } = params;
  try {
    // console.log('[deleteTestAction] Deleting test:', testId);
    const response = await api.delete(`/tests/${testId}`);
    console.log('[deleteTestAction] Test deleted successfully');
    return { ok: true, deletedId: testId };
  } catch (error) {
    console.error(
      '[deleteTestAction] Error deleting test:',
      error.message,
      error.response?.data
    );
    throw new Response(
      JSON.stringify({
        error: error.response?.data?.message || 'Failed to delete test',
      }),
      {
        status: error.response?.status || 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

const createCategoryAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const categoryData = Object.fromEntries(formData);
    console.log('[createCategoryAction] Creating category:', categoryData);
    const response = await api.post('/categories', categoryData, {
      headers: { 'Content-Type': 'application/json' },
    });
    // console.log('[createCategoryAction] Category created:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      '[createCategoryAction] Error:',
      error.message,
      error.response?.data
    );
    throw new Response(
      JSON.stringify({
        error: error.response?.data?.message || 'Failed to create category',
      }),
      {
        status: error.response?.status || 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

const addToCartAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const { courseId, isFree } = Object.fromEntries(formData);
    console.log(
      '[addToCartAction] Adding course to cart:',
      courseId,
      'isFree:',
      isFree
    );
    const response = await api.post('/cart', { courseId });
    return response.data;
  } catch (error) {
    console.error(
      '[addToCartAction] Error:',
      error.message,
      error.response?.data
    );
    throw new Response(
      JSON.stringify({
        error: error.response?.data?.message || 'Failed to add to cart',
      }),
      {
        status: error.response?.status || 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

const createOrderAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const { cartId } = Object.fromEntries(formData);
    console.log('[createOrderAction] Creating order for cart:', cartId);
    const response = await api.post('/orders', { cartId });
    return response.data.data;
  } catch (error) {
    console.error(
      '[createOrderAction] Error:',
      error.message,
      error.response?.data
    );
    throw new Response(
      JSON.stringify({
        error: error.response?.data?.message || 'Failed to create order',
      }),
      {
        status: error.response?.status || 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

// Enhanced createPostAction with form validation
export const createPostAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const content = formData.get('content');

    if (!content || content.trim().length < 5) {
      throw new Error('Post content must be at least 5 characters long');
    }

    const response = await api.post('/community/posts', { content });

    return {
      success: true,
      post: response.data.data,
      message: 'Post created successfully!',
    };
  } catch (error) {
    console.error('[createPostAction] Error:', error);
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        'Failed to create post',
    };
  }
};

const updateCategoryAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const { categoryId } = Object.fromEntries(formData);
    console.log('[updateCategoryAction] Updating user category:', categoryId);
    const response = await updateMyCategory(categoryId);
    return response.data.data;
  } catch (error) {
    console.error(
      '[updateCategoryAction] Error:',
      error.message,
      error.response?.data
    );
    throw new Response(
      JSON.stringify({
        error: error.response?.data?.message || 'Failed to update category',
      }),
      {
        status: error.response?.status || 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

const deleteCategoryAction = async () => {
  try {
    console.log('[deleteCategoryAction] Deleting user category');
    const response = await deleteMyCategory();
    return response.data.data;
  } catch (error) {
    console.error(
      '[deleteCategoryAction] Error:',
      error.message,
      error.response?.data
    );
    throw new Response(
      JSON.stringify({
        error: error.response?.data?.message || 'Failed to delete category',
      }),
      {
        status: error.response?.status || 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

const router = createBrowserRouter([
  {
    element: (
      <>
        <AppLayout />
        <Suspense fallback={<LoadingSpinner />}>
          <AIChatButton />
        </Suspense>
      </>
    ),
    errorElement: <ErrorFallback />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
        // loader: testsLoader,
      },
      {
        path: '/oauth/success',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GoogleCallback />
          </Suspense>
        ),
        // loader: testsLoader,
      },
      {
        path: '/profile',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Profile />
          </Suspense>
        ),
        // loader: testsLoader,
      },
      {
        path: '/courses',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CourseList />
          </Suspense>
        ),
        // loader: coursesLoader,
      },
      {
        path: '/courses/:courseId',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CourseDetails />
          </Suspense>
        ),
        loader: courseLoader,
        action: addToCartAction,
      },
      {
        path: '/courses/:courseId/videos/:videoId',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <CourseVideoPage />
            </Suspense>
          </ProtectedRoute>
        ),
        loader: videosLoader,
      },
      {
        path: '/course-categories',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CourseCategoryList />
          </Suspense>
        ),
        loader: courseCategoriesLoader,
      },
      {
        path: '/course-categories/:categoryId',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CourseCategoryDetails />
          </Suspense>
        ),
        loader: courseCategoryLoader,
      },
      {
        path: '/community',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CommunityPage />
          </Suspense>
        ),
        children: [
          {
            path: 'posts/:postId',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <PostDetail />
              </Suspense>
            ),
          },
        ],
        // loader: postsLoader,
        action: createPostAction,
      },
      {
        path: '/settings',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <UserSettings />
            </Suspense>
          </ProtectedRoute>
        ),
        loader: myCoursesLoader,
        action: updateCategoryAction,
      },
      {
        path: '/settings/remove-category',
        action: deleteCategoryAction,
      },
      {
        path: '/cart',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <CartPage />
            </Suspense>
          </ProtectedRoute>
        ),
        // loader: cartLoader,
      },
      {
        path: '/orders/:orderId',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <OrderPage />
            </Suspense>
          </ProtectedRoute>
        ),
        // loader: orderLoader,
      },
      {
        path: '/categories',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CategoriesList />
          </Suspense>
        ),
        loader: categoriesLoader,
      },
      {
        path: '/categories/:categoryId',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CategoryDetails />
          </Suspense>
        ),
        loader: categoryLoader,
      },
      {
        path: '/tests',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TestList />
          </Suspense>
        ),
        loader: testsLoader,
      },
      {
        path: '/tests/:testId',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <TestContainer />
            </Suspense>
          </ProtectedRoute>
        ),
        loader: testLoader,
        errorElement: <ErrorFallback />,
      },
      {
        path: '/tests/grades/:studentId',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <StudentGrades />
            </Suspense>
          </ProtectedRoute>
        ),
        loader: gradesLoader,
        errorElement: <ErrorFallback />,
      },
      {
        path: '/admin',
        element: (
          <ProtectedRoute requiredRole="admin">
            <Suspense fallback={<LoadingSpinner />}>
              <AdminDashboard />
            </Suspense>
          </ProtectedRoute>
        ),
        loader: adminLoader,
        errorElement: <ErrorFallback />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <TestList adminView />
              </Suspense>
            ),
            loader: testsLoader,
          },
          {
            path: 'tests/create',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <CreateTest />
              </Suspense>
            ),
            action: createTestAction,
          },
          {
            path: 'tests/:testId/edit',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <EditTest />
              </Suspense>
            ),
            loader: testLoader,
            action: updateTestAction,
          },
          {
            path: 'tests/:testId/grades',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <TestGrades />
              </Suspense>
            ),
            loader: testGradesLoader,
          },
          {
            path: 'categories/create',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <CreateCategory />
              </Suspense>
            ),
            action: createCategoryAction,
          },
          {
            path: 'courses',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <AdminCourseManagement />
              </Suspense>
            ),
            loader: coursesLoader,
          },
          {
            path: 'course-categories',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <AdminCategoryManagement />
              </Suspense>
            ),
            loader: courseCategoriesLoader,
          },
          {
            path: 'users',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <AdminUserManagement />
              </Suspense>
            ),
          },
          {
            path: 'community',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <AdminCommunityManagement />
              </Suspense>
            ),

            // loader: postsLoader,
          },
        ],
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        ),
        action: loginAction,
        errorElement: <ErrorFallback />,
      },
      {
        path: '/signup',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Signup />
          </Suspense>
        ),
        errorElement: <ErrorFallback />,
      },
      {
        path: '/forgot-password',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ForgotPasswordFlow />
          </Suspense>
        ),
        errorElement: <ErrorFallback />,
      },
      {
        path: '*',
        element: <ErrorFallback message="Page not found" />,
      },
    ],
  },
]);

function App() {
  const { isDarkMode } = useDarkMode();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className={isDarkMode ? 'dark' : ''}>
          {/* <AuthInitializer> */}
            <div className="fixed right-4 top-4 z-50">
              {/* <DarkModeToggle /> */}
            </div>
            <RouterProvider router={router} />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={isDarkMode ? 'dark' : 'light'}
              toastClassName={
                isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
              }
              bodyClassName={isDarkMode ? 'text-gray-100' : 'text-gray-800'}
            />
          {/* </AuthInitializer> */}
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
