import { useContext } from 'react';
import { DataContext } from '../context/DataContext';

const ProtectedWrapper = ({ children, fallback }) => {
  const { user } = useContext(DataContext);
  return user ? children : fallback;
};

export default ProtectedWrapper;