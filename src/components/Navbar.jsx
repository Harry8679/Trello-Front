// src/components/Navbar.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!user) return null; // Ne rien afficher si non connecté

  const initials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase();

  const handleLogout = () => {
    logout();
    navigate('/connexion');
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div
        className="text-xl font-bold text-blue-700 cursor-pointer"
        onClick={() => navigate('/mes-projets')}
      >
        EMARH Trello
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold"
        >
          {initials}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-52 bg-white border rounded shadow-md z-10 text-sm">
            <button
              onClick={() => navigate('/show')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Voir le profil
            </button>
            <button
              onClick={() => navigate('/profil')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Modifier le profil
            </button>
            <button
              onClick={() => navigate('/changer-mot-de-passe')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Changer le mot de passe
            </button>
            <hr className="my-1" />
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;