import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MerchantNavbar = ({ merchant }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('merchantId');
    navigate('/merchant/login');
  };

  return (
    <nav className="bg-tea-brown text-cream p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold drop-shadow-lg"
        >
          ChaiCharm - Merchant
        </motion.h1>
        <div className="space-x-4">
          {merchant ? (
            <>
              <span className="text-cream">Welcome, {merchant.name}</span>
              <button
                onClick={handleLogout}
                className="py-2 px-4 bg-cream text-tea-brown rounded-lg font-medium leaf-hover"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/merchant/login')}
              className="py-2 px-4 bg-cream text-tea-brown rounded-lg font-medium leaf-hover"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MerchantNavbar;