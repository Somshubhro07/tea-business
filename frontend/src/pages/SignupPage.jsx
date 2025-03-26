import { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const SignupPage = () => {
  const { login } = useContext(DataContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError('Something went wrong. Try again!');
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <pattern id="tea-leaves" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M20 20C25 15 30 20 35 25C40 30 35 35 30 30C25 25 20 30 20 20Z"
              fill="#A9BA9D"
            />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#tea-leaves)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-cream p-8 rounded-lg shadow-lg max-w-md w-full relative border border-tea-green"
      >
        <h2 className="text-3xl font-bold text-dark-brown text-center mb-6">
          Join the Tea Party
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-dark-brown mb-2">Your name, tea lover</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-tea-green focus:outline-none focus:ring-2 focus:ring-amber-yellow"
              required
            />
          </div>
          <div>
            <label className="block text-dark-brown mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-tea-green focus:outline-none focus:ring-2 focus:ring-amber-yellow"
              required
            />
          </div>
          <div>
            <label className="block text-dark-brown mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-tea-green focus:outline-none focus:ring-2 focus:ring-amber-yellow"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-matcha text-cream rounded-lg font-medium"
          >
            Start Steeping
          </motion.button>
        </form>
        <p className="text-center mt-4 text-dark-brown">
          Already a tea fan?{' '}
          <a href="/login" className="text-amber-yellow hover:underline">
            Log in here!
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;