import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import ProtectedWrapper from './ProtectedWrapper';
import { motion } from 'framer-motion';

const TeaCard = ({ tea }) => {
  const { addToCart } = useContext(DataContext);

  // Map tea names to image filenames
  const teaImages = {
    'Assam Bold': '/src/assets/assam.png',
    'Matcha Bliss': '/src/assets/matcha.png',
    'Herbal Calm': '/src/assets/herbal.png',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-cream p-6 rounded-lg shadow-lg relative overflow-hidden leaf-hover"
    >
      <img
        src={teaImages[tea.name] || '/src/assets/default-tea.jpg'} // Fallback image if name doesn't match
        alt={tea.name}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <h3 className="text-xl font-semibold text-dark-brown mt-4 relative">
        {tea.name}
        <svg
          className="absolute -top-2 -right-2 w-8 h-8 text-tea-green"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </h3>
      <p className="text-amber-yellow">{tea.description}</p>
      <p className="text-dark-brown font-medium mt-2">${tea.price.toFixed(2)}</p>
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute top-2 right-2 bg-tea-green text-cream px-3 py-1 rounded-full text-sm"
      >
        {tea.quip}
      </motion.div>
      <ProtectedWrapper
        fallback={
          <button className="mt-4 px-4 py-2 bg-gray-300 text-white rounded-lg leaf-hover">
            Login to Order
          </button>
        }
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => addToCart(tea)}
          className="mt-4 px-4 py-2 bg-matcha text-cream rounded-lg relative leaf-hover"
        >
          Add to Cart
        </motion.button>
      </ProtectedWrapper>
    </motion.div>
  );
};

export default TeaCard;