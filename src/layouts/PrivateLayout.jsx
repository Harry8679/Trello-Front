import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import Navbar from '../components/Navbar';

const PrivateLayout = () => {
  const { token, fetchUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/connexion');
    } else {
      fetchUser(); // 👈 hydrate user
    }
  }, [token, navigate, fetchUser]);

  return (
    <>
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};

export default PrivateLayout;