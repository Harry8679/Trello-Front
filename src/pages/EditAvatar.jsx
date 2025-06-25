import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

const EditAvatar = () => {
  const { user, token, setUser } = useAuthStore();
  const navigate = useNavigate();

  const [avatarColor, setAvatarColor] = useState(user.avatarColor || '#2563eb');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');

  const initials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase();

  const handleColorSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${API_URL}/api/auth/update-avatar-color`,
        { avatarColor },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
      toast.success('Couleur mise à jour');
    } catch (err) {
      toast.error('Erreur lors de la mise à jour de la couleur');
    }
  };

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${API_URL}/api/auth/update-avatar-url`,
        { avatarUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
      toast.success('Image mise à jour');
    } catch (err) {
      toast.error('Erreur lors de la mise à jour de l’image');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Modifier l’avatar</h2>

        {/* Preview */}
        <div className="mb-6 flex justify-center">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center font-semibold text-white text-xl"
            style={
              avatarUrl
                ? {
                    backgroundImage: `url(${avatarUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'transparent'
                  }
                : { backgroundColor: avatarColor }
            }
          >
            {!avatarUrl && initials}
          </div>
        </div>

        {/* Form Couleur */}
        <form onSubmit={handleColorSubmit} className="mb-6">
          <label className="block mb-2 text-sm text-left">🎨 Choisir une couleur :</label>
          <input
            type="color"
            value={avatarColor}
            onChange={(e) => setAvatarColor(e.target.value)}
            className="w-full h-10 cursor-pointer"
          />
          <button className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Enregistrer la couleur
          </button>
        </form>

        {/* Form URL */}
        <form onSubmit={handleUrlSubmit}>
          <label className="block mb-2 text-sm text-left">📸 Lien de l’image (URL) :</label>
          <input
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://exemple.com/avatar.jpg"
            className="w-full border p-2 rounded"
          />
          <button className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Enregistrer l’image
          </button>
        </form>

        <button
          onClick={() => navigate('/profil')}
          className="mt-6 text-blue-600 hover:underline text-sm"
        >
          ⬅ Retour au profil
        </button>
      </div>
    </div>
  );
};

export default EditAvatar;