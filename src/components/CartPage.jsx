import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import {
  fetchCart,
  removeFromCart,
  clearCart,
  createOrder,
  applyCoupon,
} from '../store/slices/cartSlice';
import {
  Trash2,
  ShoppingCart,
  Tag,
  Lock,
  CreditCard,
  ArrowRight,
  X,
  Loader2,
} from 'lucide-react';
import Button from './ui/Button';

const CartPage = () => {
  const { isDarkMode } = useDarkMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const {
    cartItems,
    totalPrice,
    totalPriceAfterDiscount,
    totalQuantity,
    status,
    error,
    order,
    cartId,
  } = useSelector((state) => state.cart);

  const [couponCode, setCouponCode] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [isRemoving, setIsRemoving] = useState({}); // Track removal loading per course

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please log in to view your cart');
      navigate('/login');
      return;
    }
    dispatch(fetchCart());
  }, [dispatch, isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      // Optionally dispatch a clearError action if defined
    }
  }, [error]);

  useEffect(() => {
    if (order?.orderId) {
      navigate(`/orders/${order.orderId}`);
    }
  }, [order, navigate]);

  const handleRemoveFromCart = async (courseId) => {
    if (!courseId) {
      toast.error('Invalid course ID');
      return;
    }

    setIsRemoving((prev) => ({ ...prev, [courseId]: true }));
    try {
      const actionResult = await dispatch(removeFromCart({ courseId }));
      if (removeFromCart.fulfilled.match(actionResult)) {
        dispatch(fetchCart()); // Refresh cart to ensure sync
        toast.success('Course removed from cart!');
      } else {
        throw new Error(actionResult.payload || 'Failed to remove from cart');
      }
    } catch (error) {
      // Error toast handled in useEffect
    } finally {
      setIsRemoving((prev) => ({ ...prev, [courseId]: false }));
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    try {
      await dispatch(applyCoupon(couponCode));
      setCouponCode('');
      setShowCouponInput(false);
    } catch (error) {
      // Error handling is done in the slice
    }
  };

  const handleCheckout = async () => {
    if (totalQuantity === 0) {
      toast.error('Cart is empty');
      return;
    }
    if (!cartId) {
      toast.error('Cart ID missing');
      return;
    }

    setIsCheckingOut(true);

    try {
      const action = await dispatch(createOrder(cartId));
      if (createOrder.fulfilled.match(action)) {
        const { redirectUrl } = action.payload;
        if (redirectUrl) {
          toast.success('Redirecting to secure checkout...');
          setTimeout(() => {
            window.location.href = redirectUrl;
          }, 1000);
        } else {
          toast.error('No redirect URL provided');
          setIsCheckingOut(false);
        }
      } else {
        toast.error('Failed to create order');
        setIsCheckingOut(false);
      }
    } catch (error) {
      toast.error(error.message || 'Checkout failed');
      setIsCheckingOut(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price);
  };

  if (status === 'loading' && !cartItems.length) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p
            className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Loading your cart...
          </p>
        </div>
      </div>
    );
  }

  if (error && !cartItems.length) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}
      >
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <X size={48} className="mx-auto" />
          </div>
          <p className="text-lg text-red-600 mb-4">Error: {error}</p>
          <Button onClick={() => dispatch(fetchCart())}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Shopping Cart
          </h1>
          <p
            className={`mt-2 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} in your
            cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div
            className={`text-center py-16 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-xl shadow-sm`}
          >
            <ShoppingCart
              size={64}
              className={`mx-auto mb-6 ${
                isDarkMode ? 'text-gray-500' : 'text-gray-400'
              }`}
            />
            <h2
              className={`text-2xl font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Your cart is empty
            </h2>
            <p
              className={`text-lg mb-8 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Discover our courses and start learning today
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Browse Courses
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-xl shadow-sm overflow-hidden`}
              >
                <div
                  className={`px-6 py-4 border-b ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}
                >
                  <h2
                    className={`text-lg font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Course Details
                  </h2>
                </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cartItems.map((item) => (
                    <div key={item.course._id} className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            src={item.course.coverPhoto || '/placeholder.png'}
                            alt={item.course.title}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3
                            className={`text-lg font-semibold ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {item.course.title}
                          </h3>
                          <p
                            className={`mt-1 text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            } line-clamp-2`}
                          >
                            {item.course.description}
                          </p>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <span
                                className={`text-lg font-bold ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {formatPrice(
                                  Number(
                                    item.course.priceAfterDiscount ||
                                      item.course.price
                                  )
                                )}
                              </span>
                            </div>

                            <button
                              onClick={() =>
                                handleRemoveFromCart(item.course._id)
                              }
                              disabled={isRemoving[item.course._id]}
                              className={`p-2 rounded-lg transition-colors duration-200 flex items-center gap-2 ${
                                isRemoving[item.course._id]
                                  ? 'text-gray-400 cursor-not-allowed'
                                  : isDarkMode
                                    ? 'text-red-400 hover:bg-red-900/20'
                                    : 'text-red-600 hover:bg-red-50'
                              }`}
                              aria-label="Remove from cart"
                            >
                              {isRemoving[item.course._id] ? (
                                <>
                                  <Loader2 size={18} className="animate-spin" />
                                  Removing...
                                </>
                              ) : (
                                <Trash2 size={18} />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Cart Button */}
                <div
                  className={`px-6 py-4 border-t ${
                    isDarkMode
                      ? 'border-gray-700 bg-gray-800/50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <button
                    onClick={handleClearCart}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isDarkMode
                        ? 'text-red-400 hover:text-red-300'
                        : 'text-red-600 hover:text-red-700'
                    }`}
                  >
                    Clear all items
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-xl shadow-sm overflow-hidden sticky top-8`}
              >
                <div
                  className={`px-6 py-4 border-b ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}
                >
                  <h2
                    className={`text-lg font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Order Summary
                  </h2>
                </div>

                <div className="p-6 space-y-4">
                  {/* Coupon Code Section */}
                  <div>
                    {!showCouponInput ? (
                      <button
                        onClick={() => setShowCouponInput(true)}
                        className={`w-full flex items-center justify-center px-4 py-2 border rounded-lg transition-colors duration-200 ${
                          isDarkMode
                            ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Tag size={16} className="mr-2" />
                        Add coupon code
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter coupon code"
                            className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                          />
                          <button
                            onClick={handleApplyCoupon}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                          >
                            Apply
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            setShowCouponInput(false);
                            setCouponCode('');
                          }}
                          className={`text-sm ${
                            isDarkMode
                              ? 'text-gray-400 hover:text-gray-300'
                              : 'text-gray-600 hover:text-gray-700'
                          }`}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div
                      className={`flex justify-between text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      <span>Subtotal</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>

                    {totalPriceAfterDiscount !== null &&
                      totalPriceAfterDiscount !== totalPrice && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Discount</span>
                          <span>
                            -{formatPrice(totalPrice - totalPriceAfterDiscount)}
                          </span>
                        </div>
                      )}

                    <div
                      className={`flex justify-between text-lg font-semibold pt-3 border-t ${
                        isDarkMode
                          ? 'border-gray-700 text-white'
                          : 'border-gray-200 text-gray-900'
                      }`}
                    >
                      <span>Total</span>
                      <span>
                        {formatPrice(
                          totalPriceAfterDiscount !== null
                            ? totalPriceAfterDiscount
                            : totalPrice
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock size={16} className="mr-2" />
                        Secure Checkout
                      </>
                    )}
                  </button>

                  {/* Stripe Badge */}
                  <div className="flex items-center justify-center space-x-2 pt-4">
                    <CreditCard
                      size={16}
                      className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}
                    />
                    <span
                      className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    >
                      Secured by Stripe
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
