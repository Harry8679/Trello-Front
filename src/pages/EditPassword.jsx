import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuthStore from '../store/useAuthStore';

const API_URL = process.env.REACT_APP_API_URL;

const EditPassword = () => {
  const navigate = useNavigate();
  const { token } = useAuthStore();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Les nouveaux mots de passe ne correspondent pas');
      return;
    }

    try {
      await axios.put(
        `${API_URL}/api/auth/update-password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Mot de passe mis à jour');
      navigate('/profil');
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Erreur lors de la mise à jour du mot de passe'
      );
    }
  };

  const renderPasswordField = (label, value, onChange, show, setShow) => (
    <div className="relative mb-4">
      <input
        type={show ? 'text' : 'password'}
        placeholder={label}
        className="w-full border p-2 rounded pr-10"
        value={value}
        onChange={onChange}
        required
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-2 top-2 text-sm text-gray-500 hover:text-gray-700"
      >
        {show ? 'Masquer' : 'Afficher'}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Changer le mot de passe</h2>

        {renderPasswordField('Mot de passe actuel', currentPassword, (e) => setCurrentPassword(e.target.value), showCurrent, setShowCurrent)}
        {renderPasswordField('Nouveau mot de passe', newPassword, (e) => setNewPassword(e.target.value), showNew, setShowNew)}
        {renderPasswordField('Confirmer le nouveau mot de passe', confirmPassword, (e) => setConfirmPassword(e.target.value), showConfirm, setShowConfirm)}

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default EditPassword;