import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/SignupPage';
import MerchantLogin from './pages/merchant/MerchantLogin';
import MerchantRegister from './pages/merchant/MerchantRegister';
import MerchantDashboard from './pages/merchant/MerchantDashboard';

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/sources" element={<div>Sources Page (TBD)</div>} />
          <Route path="/types" element={<div>Types Page (TBD)</div>} />
          <Route path="/about" element={<div>About Page (TBD)</div>} />
          <Route path="/contact" element={<div>Contact Page (TBD)</div>} />
          <Route path="/merchant/login" element={<MerchantLogin />} />
          <Route path="/merchant/register" element={<MerchantRegister />} />
          <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;