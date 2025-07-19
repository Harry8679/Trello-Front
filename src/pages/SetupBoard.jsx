import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { toast } from 'react-toastify';

export default function SetupBoard() {
  const { boardId } = useParams();
  const { token } = useAuthStore();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [columns, setColumns] = useState([{ title: '' }]);
  const [invites, setInvites] = useState([{ email: '', canCreate: false }]);

  const API = process.env.REACT_APP_API_URL;

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const submitColumns = async () => {
    const hasEmpty = columns.some(c => !c.title.trim());
    if (hasEmpty) return toast.error("Tous les titres sont requis");

    try {
      const res = await axios.post(
        `${API}/api/boards/${boardId}/columns`,
        { columns },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Colonnes créées");
      handleNext();
    } catch (err) {
      toast.error("Erreur colonnes");
    }
  };

  const submitInvites = async () => {
    const missing = invites.some(i => !i.email.trim());
    if (missing) return toast.error("Tous les emails sont requis");

    try {
      await Promise.all(invites.map(inv =>
        axios.put(`${API}api/boards/${boardId}/invite`,
          { userEmail: inv.email, canCreateTasks: inv.canCreate },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      ));
      toast.success("Invitations envoyées");
      navigate(`/projects/${boardId}`);
    } catch (e) {
      toast.error("Erreur invitation");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Configuration du projet</h1>

      {step === 1 && (
        <div>
          <h2 className="font-semibold mb-2">Étape 1 : Colonnes</h2>

          {columns.map((col, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                className="flex-1 border p-2 rounded"
                placeholder={`Titre colonne ${i + 1}`}
                value={col.title}
                onChange={e => {
                  const arr = [...columns];
                  arr[i].title = e.target.value;
                  setColumns(arr);
                }}
              />
              {columns.length > 1 && (
                <button
                  onClick={() => setColumns(columns.filter((_, idx) => idx !== i))}
                  className="text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            className="text-blue-600 hover:underline mb-4"
            onClick={() => setColumns(cols => [...cols, { title: '' }])}
          >
            + Ajouter une colonne
          </button>

          <div className="flex justify-end space-x-2">
            <button disabled className="opacity-50 cursor-not-allowed px-4 py-2 border rounded">
              Retour
            </button>
            <button
              onClick={submitColumns}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Suivant
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="font-semibold mb-2">Étape 2 : Inviter des membres</h2>

          {invites.map((i, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2">
              <input
                type="email"
                placeholder="Email"
                className="border p-2 flex-1 rounded"
                value={i.email}
                onChange={e => {
                  const arr = [...invites];
                  arr[idx].email = e.target.value;
                  setInvites(arr);
                }}
              />
              <label className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={i.canCreate}
                  onChange={() => {
                    const arr = [...invites];
                    arr[idx].canCreate = !arr[idx].canCreate;
                    setInvites(arr);
                  }}
                />
                <span className="text-sm">Créer tâches</span>
              </label>
              {invites.length > 1 && (
                <button
                  onClick={() => setInvites(invites.filter((_, iIdx) => iIdx !== idx))}
                  className="text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            className="text-blue-600 hover:underline mb-4"
            onClick={() => setInvites(inv => [...inv, { email: '', canCreate: false }])}
          >
            + Ajouter un membre
          </button>

          <div className="flex justify-between space-x-2">
            <button
              onClick={handleBack}
              className="px-4 py-2 border rounded"
            >
              Retour
            </button>
            <button
              onClick={submitInvites}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Terminer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}