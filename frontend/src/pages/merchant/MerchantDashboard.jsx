import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MerchantNavbar from '../../components/MerchantNavbar';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const MerchantDashboard = () => {
  const navigate = useNavigate();
  const [merchant, setMerchant] = useState(null);
  const [error, setError] = useState('');
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [teas, setTeas] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
    discountTiers: [{ quantity: 500, discount: 10 }, { quantity: 1000, discount: 20 }],
  });
  const [productError, setProductError] = useState('');

  // Fetch merchant profile, teas, customers, and orders on mount
  useEffect(() => {
    const merchantId = localStorage.getItem('merchantId');
    if (!merchantId) {
      navigate('/merchant/login');
      return;
    }

    const fetchMerchantProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/merchants/${merchantId}`);
        const fetchedMerchant = res.data.merchant;
        if (fetchedMerchant.role !== 'merchant') {
          setError('Access denied. Only merchants can access this dashboard.');
          localStorage.removeItem('merchantId');
          navigate('/merchant/login');
          return;
        }
        setMerchant(fetchedMerchant);
      } catch (err) {
        console.error('Error fetching merchant profile:', err.response || err);
        setError('Failed to load profile. Please log in again.');
        localStorage.removeItem('merchantId');
        navigate('/merchant/login');
      }
    };

    const fetchTeas = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/teas');
        setTeas(res.data);
      } catch (err) {
        console.error('Error fetching teas:', err.response || err);
      }
    };

    const fetchCustomers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setCustomers(res.data);
      } catch (err) {
        console.error('Error fetching customers:', err.response || err);
      }
    };

    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders');
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err.response || err);
      }
    };

    fetchMerchantProfile();
    fetchTeas();
    fetchCustomers();
    fetchOrders();
  }, [navigate]);

  // Handle form input changes
  const handleProductChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setNewProduct({ ...newProduct, image: files[0] });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  // Handle discount tier changes
  const handleDiscountTierChange = (index, field, value) => {
    const updatedTiers = [...newProduct.discountTiers];
    updatedTiers[index] = { ...updatedTiers[index], [field]: parseInt(value) };
    setNewProduct({ ...newProduct, discountTiers: updatedTiers });
  };

  // Add a new discount tier
  const addDiscountTier = () => {
    setNewProduct({
      ...newProduct,
      discountTiers: [...newProduct.discountTiers, { quantity: 0, discount: 0 }],
    });
  };

  // Remove a discount tier
  const removeDiscountTier = (index) => {
    const updatedTiers = newProduct.discountTiers.filter((_, i) => i !== index);
    setNewProduct({ ...newProduct, discountTiers: updatedTiers });
  };

  // Handle adding a new product with file upload
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setProductError('');

    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('description', newProduct.description);
      formData.append('price', newProduct.price);
      formData.append('category', newProduct.category);
      formData.append('image', newProduct.image);
      formData.append('discountTiers', JSON.stringify(newProduct.discountTiers));

      const res = await axios.post('http://localhost:5000/api/teas', formData);
      setTeas([...teas, res.data]); // Update the teas list with the new product
      alert('Product added successfully!');
      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null,
        discountTiers: [{ quantity: 500, discount: 10 }, { quantity: 1000, discount: 20 }],
      });
    } catch (err) {
      console.error('Error adding product:', err.response || err);
      setProductError(err.response?.data?.message || 'Error adding product. Please try again.');
    }
  };

  // Prepare data for order graph (orders per day)
  const orderGraphData = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString();
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.orders += 1;
    } else {
      acc.push({ date, orders: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <MerchantNavbar merchant={merchant} />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold text-dark-brown text-center mb-8 drop-shadow-lg">
          Merchant Dashboard
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {merchant ? (
          <div className="space-y-12">
            {/* Merchant Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto bg-cream bg-opacity-90 p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-dark-brown mb-4">
                Welcome, {merchant.name}!
              </h2>
              <p className="text-dark-brown mb-2">Email: {merchant.email}</p>
              <p className="text-dark-brown mb-4">Role: {merchant.role}</p>
            </motion.div>

            {/* Add New Product */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto bg-cream bg-opacity-90 p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-dark-brown mb-4">Add New Product (Chai)</h2>
              {productError && <p className="text-red-500 text-center mb-4">{productError}</p>}
              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div>
                  <label className="block text-dark-brown mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleProductChange}
                    placeholder="Tea Name"
                    className="w-full p-3 rounded-lg border border-tea-green focus:outline-none focus:ring-2 focus:ring-amber-yellow bg-cream text-dark-brown placeholder-tea-green"
                    required
                  />
                </div>
                <div>
                  <label className="block text-dark-brown mb-1">Description</label>
                  <textarea
                    name="description"
                    value={newProduct.description}
                    onChange={handleProductChange}
                    placeholder="Tea Description"
                    className="w-full p-3 rounded-lg border border-tea-green focus:outline-none focus:ring-2 focus:ring-amber-yellow bg-cream text-dark-brown placeholder-tea-green"
                    required
                  />
                </div>
                <div>
                  <label className="block text-dark-brown mb-1">Base Price (per 100g)</label>
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleProductChange}
                    placeholder="Price per 100g"
                    className="w-full p-3 rounded-lg border border-tea-green focus:outline-none focus:ring-2 focus:ring-amber-yellow bg-cream text-dark-brown placeholder-tea-green"
                    required
                  />
                </div>
                <div>
                  <label className="block text-dark-brown mb-1">Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleProductChange}
                    className="w-full p-3 rounded-lg border border-tea-green focus:outline-none focus:ring-2 focus:ring-amber-yellow bg-cream text-dark-brown"
                    required
                  />
                </div>
                <div>
                  <label className="block text-dark-brown mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={newProduct.category}
                    onChange={handleProductChange}
                    placeholder="Category (e.g., Green Tea)"
                    className="w-full p-3 rounded-lg border border-tea-green focus:outline-none focus:ring-2 focus:ring-amber-yellow bg-cream text-dark-brown placeholder-tea-green"
                    required
                  />
                </div>
                <div>
                  <label className="block text-dark-brown mb-1">Discount Tiers</label>
                  {newProduct.discountTiers.map((tier, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <input
                        type="number"
                        value={tier.quantity}
                        onChange={(e) => handleDiscountTierChange(index, 'quantity', e.target.value)}
                        placeholder="Quantity (g)"
                        className="w-1/2 p-2 rounded-lg border border-tea-green focus:outline-none focus:ring-2 focus:ring-amber-yellow bg-cream text-dark-brown"
                        required
                      />
                      <input
                        type="number"
                        value={tier.discount}
                        onChange={(e) => handleDiscountTierChange(index, 'discount', e.target.value)}
                        placeholder="Discount (%)"
                        className="w-1/2 p-2 rounded-lg border border-tea-green focus:outline-none focus:ring-2 focus:ring-amber-yellow bg-cream text-dark-brown"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeDiscountTier(index)}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addDiscountTier}
                    className="text-tea-green hover:underline"
                  >
                    Add Discount Tier
                  </button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full py-3 bg-tea-brown text-cream rounded-lg font-medium leaf-hover"
                >
                  Add Product
                </motion.button>
              </form>
            </motion.div>

            {/* Customer Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto bg-cream bg-opacity-90 p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-dark-brown mb-4">Customer Stats</h2>
              <p className="text-dark-brown">Total Customers: {customers.length}</p>
            </motion.div>

            {/* Active Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto bg-cream bg-opacity-90 p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-dark-brown mb-4">Active Orders</h2>
              {orders.length > 0 ? (
                <ul className="space-y-4">
                  {orders.map(order => (
                    <li key={order._id} className="border-b border-tea-green pb-2">
                      <p className="text-dark-brown">
                        Order ID: {order._id} | Total: ${order.total} | Status: {order.status}
                      </p>
                      <p className="text-dark-brown text-sm">
                        Placed on: {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-dark-brown">No active orders.</p>
              )}
            </motion.div>

            {/* Order Graph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto bg-cream bg-opacity-90 p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-dark-brown mb-4">Order Trends</h2>
              {orderGraphData.length > 0 ? (
                <LineChart width={600} height={300} data={orderGraphData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="orders" stroke="#8B5A2B" />
                </LineChart>
              ) : (
                <p className="text-dark-brown">No order data to display.</p>
              )}
            </motion.div>
          </div>
        ) : (
          <p className="text-center text-dark-brown">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default MerchantDashboard;