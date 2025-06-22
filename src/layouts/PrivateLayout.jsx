import { Outlet, Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import Navbar from '../components/Navbar';

const PrivateLayout = () => {
  const { token } = useAuthStore();

  if (!token) return <Navigate to="/connexion" />;

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default PrivateLayout;