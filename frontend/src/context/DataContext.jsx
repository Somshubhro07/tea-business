import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
const DataContext = createContext();

// Create the provider component
const DataProvider = ({ children }) => {
  const [teas, setTeas] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch teas
    const fetchTeas = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/teas');
        setTeas(res.data);
      } catch (err) {
        console.error('Error fetching teas:', err);
      }
    };
    fetchTeas();
  }, []); // Run once on mount

  const addToCart = (tea) => {
    if (!user) return alert('Login to add to cart!');
    const existingItem = cart.find(item => item._id === tea._id);
    if (existingItem) {
      setCart(cart.map(item =>
        item._id === tea._id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      ));
    } else {
      setCart([...cart, { ...tea, quantity: 1 }]);
    }
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('merchantId');
  };

  return (
    <DataContext.Provider value={{ teas, cart, setCart, addToCart, user, setUser, login, logout }}>
      {children}
    </DataContext.Provider>
  );
};

// Export both as named exports
export { DataContext, DataProvider };