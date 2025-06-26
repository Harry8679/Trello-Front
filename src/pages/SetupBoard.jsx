import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { toast } from 'react-toastify';

export default function SetupBoard() {
  const { boardId } = useParams();
  const { token } = useAuthStore();
  const navigate = useNavigate();

  // ⚙️ Step control
  const [step, setStep] = useState(1);
  // Colonne config
  const [columns, setColumns] = useState([{ title: '' }]);
  // Invitations
  const [invites, setInvites] = useState([{ email: '', canCreate: false }]);

  const API = process.env.REACT_APP_API_URL;

  const handleNext = () => setStep((s) => s+1);
  const handleBack = () => setStep((s) => s-1);

  const submitColumns = async () => {
    try {
      await axios.post(
        `${API}/boards/${boardId}/columns`,
        { columns },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Colonnes créées");
      handleNext();
    } catch(err) {
      toast.error("Erreur colonnes");
    }
  };

  const submitInvites = async () => {
    try {
      // fire all invites
      await Promise.all(invites.map(inv =>
        axios.put(`${API}/boards/${boardId}/invite`,
          { userEmail: inv.email, canCreateTasks: inv.canCreate },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      ));
      toast.success("Invitations envoyées");
      navigate(`/projects/${boardId}`);
    } catch(e) {
      toast.error("Erreur invitation");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Configuration projet</h1>

      {step === 1 && (
        <div>
          <h2 className="font-semibold">Étape 1 : Colonnes</h2>
          {columns.map((col, i) => (
            <input
              key={i}
              className="block w-full border p-2 mb-2"
              placeholder={`Titre colonne ${i+1}`}
              value={col.title}
              onChange={e => {
                const arr = [...columns];
                arr[i].title = e.target.value;
                setColumns(arr);
              }}
            />
          ))}
          <button
            className="text-blue-600 hover:underline mb-4"
            onClick={() => setColumns(cols => [...cols, { title: '' }])}
          >+ Ajouter colonne</button>
          <div className="flex justify-end space-x-2">
            <button disabled className="opacity-50">Retour</button>
            <button
              onClick={submitColumns}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >Suivant</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="font-semibold">Étape 2 : Inviter membres</h2>
          {invites.map((i,iIdx) => (
            <div key={iIdx} className="flex items-center gap-2 mb-2">
              <input
                type="email"
                placeholder="Email"
                className="border p-2 flex-1"
                value={i.email}
                onChange={e => {
                  const arr=[...invites]; arr[iIdx].email=e.target.value;
                  setInvites(arr);
                }}
              />
              <label className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={i.canCreate}
                  onChange={() => {
                    const arr=[...invites]; arr[iIdx].canCreate = !arr[iIdx].canCreate;
                    setInvites(arr);
                  }}
                />
                <span>Créer tâches</span>
              </label>
            </div>
          ))}
          <button
            className="text-blue-600 hover:underline mb-4"
            onClick={() => setInvites(inv => [...inv, { email:'', canCreate:false }])}
          >+ Ajouter membre</button>
          <div className="flex justify-between space-x-2">
            <button onClick={handleBack} className="px-4 py-2">Retour</button>
            <button
              onClick={submitInvites}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >Terminer</button>
          </div>
        </div>
      )}
    </div>
  );
}