import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  const { user, logout, cart } = useContext(DataContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="fixed top-0 w-full bg-tea-brown bg-opacity-90 text-cream py-4 z-20 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <RouterLink to="/" className="text-2xl font-bold tracking-wide text-amber-yellow">
          Steeped Serenity
        </RouterLink>

        <ul className="flex space-x-8 relative">
          {['Home', 'Sources', 'Types', 'About', 'Contact'].map((item) => (
            <li key={item} className="relative group">
              <ScrollLink
                to={item.toLowerCase()}
                smooth={true}
                duration={500}
                className="text-lg font-medium text-cream hover:text-amber-yellow transition-colors duration-300 cursor-pointer"
              >
                {item}
              </ScrollLink>
              <div className="absolute w-full h-1 bg-matcha opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </li>
          ))}
        </ul>

        <div className="flex space-x-4 items-center">
          <RouterLink to="/cart" className="relative">
            <svg
              className="w-6 h-6 text-cream hover:text-amber-yellow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-matcha text-cream text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </RouterLink>
          {user ? (
            <>
              <span className="text-lg text-cream">Hello, {user.name}</span>
              <button onClick={handleLogout} className="text-lg text-cream hover:text-amber-yellow">
                Logout
              </button>
            </>
          ) : (
            <>
              <RouterLink to="/login" className="text-lg text-cream hover:text-amber-yellow">
                Login
              </RouterLink>
              <RouterLink to="/signup" className="text-lg text-cream hover:text-amber-yellow">
                Signup
              </RouterLink>
            </>
          )}
        </div>
      </div>
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <pattern id="leaf-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <path
              d="M10 10C15 5 20 10 25 15C30 20 25 25 20 20C15 15 10 20 10 10Z"
              fill="#A9BA9D"
              opacity="0.5"
            />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#leaf-pattern)" />
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;