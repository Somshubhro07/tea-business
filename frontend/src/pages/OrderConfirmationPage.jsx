import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <div className="container mx-auto py-16 text-center">
          <h1 className="text-4xl font-bold text-dark-brown mb-4">No Order Found</h1>
          <p className="text-dark-brown">
            It looks like you haven't placed an order yet.{' '}
            <Link to="/shop" className="text-matcha hover:underline">
              Start shopping now!
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const { cart, addressId, createdAt } = order;
  const subtotal = cart.reduce((sum, tea) => sum + tea.price * (tea.quantity || 1), 0);
  const shipping = 5.00; // Flat shipping rate
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold text-dark-brown text-center mb-8 drop-shadow-lg">
          Order Confirmation
        </h1>
        <div className="max-w-2xl mx-auto bg-cream bg-opacity-90 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-dark-brown mb-4">
            Thank you for your order!
          </h2>
          <p className="text-dark-brown mb-4">
            Your order was placed successfully on {new Date(createdAt).toLocaleString()}.
          </p>

          {/* Order Items */}
          <h3 className="text-xl font-bold text-dark-brown mb-4">Order Items</h3>
          {cart.map((tea, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center mb-4 border-b border-tea-green pb-4"
            >
              <img
                src={tea.image}
                alt={tea.name}
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-dark-brown">{tea.name}</h4>
                <p className="text-amber-yellow">{tea.description}</p>
                <p className="text-dark-brown">
                  ${tea.price.toFixed(2)} x {tea.quantity || 1} = ${(tea.price * (tea.quantity || 1)).toFixed(2)}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Order Summary */}
          <h3 className="text-xl font-bold text-dark-brown mb-4 mt-6">Order Summary</h3>
          <div className="space-y-2">
            <p className="flex justify-between text-dark-brown">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between text-dark-brown">
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </p>
            <p className="flex justify-between text-dark-brown font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </p>
          </div>

          {/* Shipping Address */}
          <h3 className="text-xl font-bold text-dark-brown mb-4 mt-6">Shipping Address</h3>
          <p className="text-dark-brown">
            Address ID: {addressId} (Detailed address display can be implemented by fetching address details)
          </p>

          {/* Continue Shopping */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <Link
              to="/shop"
              className="px-6 py-3 bg-matcha text-cream rounded-lg font-medium leaf-hover"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;