import { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../components/Navbar';

const CartPage = () => {
  const { cart, setCart, user, token } = useContext(DataContext);
  const navigate = useNavigate();
  const [addressForm, setAddressForm] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    isDefault: false,
  });
  const [selectedAddress, setSelectedAddress] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm({
      ...addressForm,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/auth/address',
        addressForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowAddressForm(false);
      const res = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      user.addresses = res.data.user.addresses;
    } catch (err) {
      console.error('Error adding address:', err);
    }
  };

  const handleQuantityChange = (teaId, delta) => {
    setCart(cart.map(item => {
      if (item._id === teaId) {
        const newQuantity = (item.quantity || 1) + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(item => item !== null));
  };

  const handleRemoveItem = (teaId) => {
    setCart(cart.filter(item => item._id !== teaId));
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) return alert('Please select a shipping address');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/orders',
        { cart, addressId: selectedAddress },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart([]);
      navigate('/order-confirmation', { state: { order: res.data } });
    } catch (err) {
      console.error('Error placing order:', err);
    }
  };

  const subtotal = cart.reduce((sum, tea) => sum + tea.price * (tea.quantity || 1), 0);
  const shipping = 5.00; // Flat shipping rate
  const total = subtotal + shipping;

  return (
    <div
      className="min-h-screen bg-cream relative"
      style={{
        backgroundImage: `url('/src/assets/cart-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Semi-transparent overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />

      <Navbar />
      <div className="container mx-auto py-16 relative z-10">
        <h1 className="text-4xl font-bold text-cream text-center mb-8 drop-shadow-lg">Your Tea Cart</h1>
        {cart.length === 0 ? (
          <p className="text-center text-cream drop-shadow-lg">Your cart is empty. Start steeping!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2">
              {cart.map((tea, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-cream bg-opacity-90 p-6 rounded-lg shadow-lg flex items-center mb-4"
                >
                  <img
                    src={tea.image}
                    alt={tea.name}
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-dark-brown">{tea.name}</h3>
                    <p className="text-amber-yellow">{tea.description}</p>
                    <p className="text-dark-brown font-medium">${tea.price.toFixed(2)}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(tea._id, -1)}
                        className="px-2 py-1 bg-matcha text-cream rounded"
                      >
                        -
                      </button>
                      <span className="text-dark-brown">{tea.quantity || 1}</span>
                      <button
                        onClick={() => handleQuantityChange(tea._id, 1)}
                        className="px-2 py-1 bg-matcha text-cream rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveItem(tea._id)}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-cream bg-opacity-90 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-dark-brown mb-4">Order Summary</h2>
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

                {/* Address Section */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-dark-brown mb-2">Shipping Address</h3>
                  {user?.addresses?.length > 0 ? (
                    <div className="space-y-4">
                      {user.addresses.map((address) => (
                        <div key={address._id} className="flex items-center space-x-4">
                          <input
                            type="radio"
                            name="address"
                            value={address._id}
                            onChange={(e) => setSelectedAddress(e.target.value)}
                            className="text-matcha"
                          />
                          <p className="text-dark-brown">
                            {address.street}, {address.city}, {address.state}, {address.country}, {address.postalCode}
                            {address.isDefault && <span className="text-amber-yellow ml-2">(Default)</span>}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-dark-brown">No addresses saved. Add one below!</p>
                  )}
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="mt-4 px-4 py-2 bg-matcha text-cream rounded-lg leaf-hover"
                  >
                    {showAddressForm ? 'Cancel' : 'Add New Address'}
                  </button>

                  {showAddressForm && (
                    <motion.form
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      onSubmit={handleAddAddress}
                      className="mt-4 space-y-4 p-6 rounded-lg bg-cream bg-opacity-90 relative"
                      style={{
                        backgroundImage: `url('/src/assets/tea-leaf-pattern.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        border: '2px solid #8B5A2B', // Tea-brown border
                      }}
                    >
                      {/* Semi-transparent overlay for readability */}
                      <div className="absolute inset-0 bg-cream bg-opacity-80 rounded-lg" />
                      <div className="relative z-10">
                        <h4 className="text-lg font-semibold text-dark-brown mb-4">Add a New Address</h4>
                        <input
                          name="street"
                          value={addressForm.street}
                          onChange={handleAddressChange}
                          placeholder="Street"
                          className="w-full p-3 rounded-lg border border-tea-green focus:outline-none focus:ring-2 focus:ring-amber-yellow bg-cream text-dark-brown placeholder-tea-green"
                          required
                        />
                        <input
                          name="city"
                          value={addressForm.city}
                          onChange={handleAddressChange}
                          placeholder="City"
                          className="w-full p-3 rounded-lg border border-tea-green focus:outline-none focus:ring-2 focus:ring-amber-yellow bg-cream text-dark-brown placeholder-tea-green"
                          required
                        />
                        <input
                          name="state"
                          value={addressForm.state}
                          onChange={handleAddressChange}
                          placeholder="State"
                          className="w-full p-3 rounded-lg border border-tea-green focus:outline-none focus:ring-2 focus:ring-amber-yellow bg-cream text-dark-brown placeholder-tea-green"
                          required
                        />
                        <input
                          name="country"
                          value={addressForm.country}
                          onChange={handleAddressChange}
                          placeholder="Country"
                          className="w-full p-3 rounded-lg border border-tea-green focus:outline-none focus:ring-2 focus:ring-amber-yellow bg-cream text-dark-brown placeholder-tea-green"
                          required
                        />
                        <input
                          name="postalCode"
                          value={addressForm.postalCode}
                          onChange={handleAddressChange}
                          placeholder="Postal Code"
                          className="w-full p-3 rounded-lg border border-tea-green focus:outline-none focus:ring-2 focus:ring-amber-yellow bg-cream text-dark-brown placeholder-tea-green"
                          required
                        />
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="isDefault"
                            checked={addressForm.isDefault}
                            onChange={handleAddressChange}
                            className="text-matcha"
                          />
                          <span className="text-dark-brown">Set as default</span>
                        </label>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          className="w-full py-3 bg-tea-brown text-cream rounded-lg font-medium leaf-hover"
                        >
                          Save Address
                        </motion.button>
                      </div>
                    </motion.form>
                  )}
                </div>

                {/* Place Order */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlaceOrder}
                  className="mt-6 w-full py-3 bg-tea-brown text-cream rounded-lg font-medium leaf-hover"
                >
                  Place Order
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;