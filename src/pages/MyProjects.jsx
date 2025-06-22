import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuthStore from '../store/useAuthStore';

const API_URL = process.env.REACT_APP_API_URL;

const MyProjects = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) {
      navigate('/connexion');
      return;
    }

    const fetchBoards = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/boards`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBoards(res.data);
      } catch (err) {
        toast.error("Impossible de récupérer les projets");
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, [token, navigate]);

  const handleCreateBoard = async () => {
    const title = prompt("Nom du nouveau projet :");
    if (!title) return;

    try {
      const res = await axios.post(
        `${API_URL}/api/boards`,
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBoards((prev) => [...prev, res.data]);
      toast.success("Projet créé !");
    } catch (err) {
      toast.error("Erreur lors de la création du projet");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mes Projets</h1>
        <button
          onClick={handleCreateBoard}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Créer un projet
        </button>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : boards.length === 0 ? (
        <p className="text-gray-500">Aucun projet disponible.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {boards.map((board) => (
            <div key={board._id} className="bg-white p-4 rounded shadow hover:shadow-md cursor-pointer">
              <h2 className="text-lg font-semibold">{board.title}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProjects;