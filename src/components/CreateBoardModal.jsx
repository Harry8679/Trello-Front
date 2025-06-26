import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuthStore from '../store/useAuthStore';

const CreateBoardModal = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const { token } = useAuthStore();

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/api/boards`,
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Projet créé avec succès !');
      setTitle('');
      onSuccess?.(); // Rechargement ou fermeture modal
    } catch (err) {
      toast.error("Erreur lors de la création du projet");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Nom du projet"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-64"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Créer
      </button>
    </form>
  );
};

export default CreateBoardModal;