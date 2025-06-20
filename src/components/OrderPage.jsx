import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import { toast } from 'react-toastify';
import Button from './ui/Button';
import api from '../api/api';

const OrderPage = () => {
  const { isDarkMode } = useDarkMode();
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // Check for Stripe redirect query parameters
        const query = new URLSearchParams(location.search);
        const sessionId = query.get('session_id');

        if (sessionId) {
          // Verify payment status with backend
          await api.post(`/orders/verify-payment`, { sessionId });
        }

        // Fetch order details
        const response = await api.get(`/orders/${orderId}`);
        setOrder(response.data.data);
      } catch (error) {
        toast.error('Failed to load order details');
        navigate('/cart');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate, location.search]);

  if (loading) {
    return <div className="text-center p-6">Loading order details...</div>;
  }

  if (!order) {
    return <div className="text-center p-6">Order not found</div>;
  }

  return (
    <div
      className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Order Confirmation</h1>

        <div
          className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'} mb-6`}
        >
          <h2 className="text-xl font-semibold mb-4">Order #{order._id}</h2>
          <p className="mb-2">Status: {order.status}</p>
          <p className="mb-4">Total: ${order.totalAmount.toFixed(2)}</p>

          {order.status === 'pending' && order.paymentUrl && (
            <Button
              onClick={() => (window.location.href = order.paymentUrl)}
              className="w-full"
            >
              Complete Payment
            </Button>
          )}
        </div>

        <div
          className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <h2 className="text-xl font-semibold mb-4">Courses</h2>
          {order.items.map((item) => (
            <div
              key={item.course._id}
              className="mb-4 pb-4 border-b last:border-b-0"
            >
              <h3 className="font-medium">{item.course.title}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.course.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
