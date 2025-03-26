import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataContext } from '../../context/DataContext';
import { motion } from 'framer-motion';

const MerchantRegister = () => {
  const { login } = useContext(DataContext); // Use the login function
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/merchants/register', formData);
      const userData = { name: formData.name, email: formData.email, role: 'merchant' };
      login(userData, res.data.token); // Use the login function to set user and token
      navigate('/merchant/dashboard');
    } catch (err) {
      console.error('Error registering merchant:', err.response || err);
      setError(err.response?.data?.message || 'Error registering. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-cream bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full"
        style={{
          backgroundImage: `url('/src/assets/tea-leaf-pattern.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '2px solid #8B5A2B',
        }}
      >
        <div className="absolute inset-0 bg-cream bg-opacity-80 rounded-lg" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-dark-brown text-center mb-6">Merchant Register</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-dark-brown mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-3 rounded-lg border border-tea-green focus:outline-none focus:ring-2 focus:ring-amber-yellow bg-cream text-dark-brown placeholder-tea-green"
                required
              />
            </div>
            <div>
              <label className="block text-dark-brown mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 rounded-lg border border-tea-green focus:outline-none focus:ring-2 focus:ring-amber-yellow bg-cream text-dark-brown placeholder-tea-green"
                required
              />
            </div>
            <div>
              <label className="block text-dark-brown mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 rounded-lg border border-tea-green focus:outline-none focus:ring-2 focus:ring-amber-yellow bg-cream text-dark-brown placeholder-tea-green"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 bg-tea-brown text-cream rounded-lg font-medium leaf-hover"
            >
              Register
            </motion.button>
          </form>
          <p className="text-dark-brown text-center mt-4">
            Already have an account?{' '}
            <a href="/merchant/login" className="text-matcha hover:underline">
              Login
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default MerchantRegister;