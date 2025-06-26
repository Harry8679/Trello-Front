import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuthStore from '../store/useAuthStore';

export default function BoardView() {
  const { boardId } = useParams();
  const { token } = useAuthStore();
  const [board, setBoard] = useState(null);
  const [columns, setColumns] = useState([]);
  const [cards, setCards] = useState({}); // { colId: [cards...] }
  const API = process.env.REACT_APP_API_URL;

  // Récup board + colonnes + cartes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bRes, cRes] = await Promise.all([
          axios.get(`${API}/api/boards/${boardId}`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API}/api/boards/${boardId}/columns`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setBoard(bRes.data);
        setColumns(cRes.data);
        // ensuite fetch cartes par colonne
        const cardsByCol = {};
        await Promise.all(
          cRes.data.map(async col => {
            const cr = await axios.get(`${API}/columns/${col._id}/cards`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            cardsByCol[col._id] = cr.data;
          })
        );
        setCards(cardsByCol);
      } catch (err) {
        toast.error('Erreur de chargement du board');
      }
    };
    fetchData();
  }, [API, boardId, token]);

  if (!board) return <p>Chargement...</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">{board.title}</h1>
      <div className="flex space-x-4 overflow-x-auto">
        {columns.map(col => (
          <div key={col._id} className="bg-white rounded shadow p-4 w-64 flex-shrink-0">
            <h2 className="font-semibold mb-2">{col.title}</h2>
            <div className="space-y-2">
              {(cards[col._id] || []).map(card => (
                <div key={card._id}
                     className="bg-gray-100 p-2 rounded cursor-pointer hover:bg-gray-200">
                  {card.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}