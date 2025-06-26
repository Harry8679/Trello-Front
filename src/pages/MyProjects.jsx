import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuthStore from '../store/useAuthStore';

const API_URL = process.env.REACT_APP_API_URL;

const MyProjects = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const navigate = useNavigate();
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) {
      navigate('/connexion');
      return;
    }

    fetchBoards();
  }, [token, navigate]);

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

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await axios.post(
        `${API_URL}/api/boards`,
        { title: newTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Projet créé !");
      setBoards((prev) => [...prev, res.data]);
      setShowModal(false);
      setNewTitle('');
    } catch (err) {
      toast.error("Erreur lors de la création du projet");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mes Projets</h1>
        <button
          onClick={() => setShowModal(true)}
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
            <div
              key={board._id}
              className="bg-white p-4 rounded shadow hover:shadow-md cursor-pointer"
              onClick={() => navigate(`/projets/${board._id}`)}
            >
              <h2 className="text-lg font-semibold">{board.title}</h2>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Créer un nouveau projet</h2>
            <form onSubmit={handleCreateBoard}>
              <input
                type="text"
                placeholder="Nom du projet"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full border p-2 rounded mb-4"
                autoFocus
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setNewTitle('');
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProjects;