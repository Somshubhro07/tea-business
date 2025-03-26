import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { DataContext } from '../context/DataContext';

const ShopPage = () => {
  const { cart, setCart } = useContext(DataContext);
  const [teas, setTeas] = useState([]);

  useEffect(() => {
    const fetchTeas = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/teas');
        setTeas(res.data);
      } catch (err) {
        console.error('Error fetching teas:', err);
      }
    };
    fetchTeas();
  }, []);

  const handleAddToCart = (tea) => {
    const existingItem = cart.find(item => item._id === tea._id);
    if (existingItem) {
      setCart(cart.map(item =>
        item._id === tea._id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      ));
    } else {
      setCart([...cart, { ...tea, quantity: 1 }]);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold text-dark-brown text-center mb-12 drop-shadow-lg">
          Shop Our Teas
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teas.map((tea) => (
            <motion.div
              key={tea._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-cream bg-opacity-90 p-6 rounded-lg shadow-lg"
            >
              <img
                src={tea.image}
                alt={tea.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-dark-brown">{tea.name}</h3>
              <p className="text-amber-yellow">{tea.description}</p>
              <p className="text-dark-brown font-medium">${tea.price.toFixed(2)}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddToCart(tea)}
                className="mt-4 w-full py-3 bg-matcha text-cream rounded-lg font-medium leaf-hover"
              >
                Add to Cart
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;