// src/pages/EditEmail.jsx
import { useState, useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

const EditEmail = () => {
  const { user, token, fetchUser } = useAuthStore();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) setEmail(user.email);
    else if (token) fetchUser();
    else navigate('/connexion');
  }, [user, token, fetchUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${API_URL}/api/auth/update-email`,
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Email mis à jour avec succès");
      fetchUser();
      navigate('/profil');
    } catch (err) {
      toast.error(err.response?.data?.message || "Erreur lors de la mise à jour");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Modifier l'email</h2>

        <label className="block text-gray-600 text-sm mb-1">Nouvel Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 p-2 rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default EditEmail;