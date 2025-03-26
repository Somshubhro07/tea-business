import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { order } = state || {};

  if (!order) return <p className="text-center text-dark-brown">No order found.</p>;

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <div className="container mx-auto py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-dark-brown mb-4"
        >
          Order Confirmed!
        </motion.h1>
        <p className="text-dark-brown mb-4">
          Thank you for your order. Your teas will be steeped and shipped soon!
        </p>
        <p className="text-dark-brown">Order ID: {order._id}</p>
        <p className="text-dark-brown">Total: ${order.total.toFixed(2)}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="mt-8 px-6 py-3 bg-matcha text-cream rounded-lg font-medium leaf-hover"
        >
          Back to Home
        </motion.button>
      </div>
    </div>
  );
};

export default OrderConfirmation;