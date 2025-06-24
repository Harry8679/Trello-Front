// src/pages/Profile.jsx
import { useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, fetchUser, token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/connexion');
    } else if (!user) {
      fetchUser();
    }
  }, [token, user, fetchUser, navigate]);

  if (!user) return <p className="text-center mt-10">Chargement du profil...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Profil utilisateur</h2>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Prénom</label>
          <input
            type="text"
            value={user.firstName}
            disabled
            className="w-full border border-gray-300 bg-gray-100 p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Nom</label>
          <input
            type="text"
            value={user.lastName}
            disabled
            className="w-full border border-gray-300 bg-gray-100 p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full border border-gray-300 bg-gray-100 p-2 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;