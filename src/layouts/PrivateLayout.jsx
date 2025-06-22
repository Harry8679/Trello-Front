// src/layouts/PrivateLayout.jsx
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';
import Navbar from '../components/Navbar';

const PrivateLayout = () => {
  const { token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/connexion');
    }
  }, [token, navigate]);

  return (
    <>
      <Navbar /> {/* 👈 Affichée uniquement sur les routes privées */}
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};

export default PrivateLayout;