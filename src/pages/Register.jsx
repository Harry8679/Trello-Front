import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuthStore from '../store/useAuthStore';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  
  const API_URL = process.env.REACT_APP_API_URL;

  const { setToken } = useAuthStore(); // 👈 récupère l'action Zustand

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, {
        email,
        password,
        firstName,
        lastName
      });

      setToken(res.data.token); // 👈 via Zustand
      toast.success('Inscription réussie !');
      navigate('/');
    } catch (err) {
      toast.error("L'inscription a échoué");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>

        <input
          type="text"
          placeholder="Prénom"
          className="w-full border p-2 mb-4 rounded"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Nom"
          className="w-full border p-2 mb-4 rounded"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Mot de passe"
            className={`w-full border p-2 rounded pr-10 ${
              password && confirmPassword
                ? password === confirmPassword
                  ? 'border-green-500'
                  : 'border-red-500'
                : ''
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-sm text-gray-500 hover:text-gray-700"
          >
            {showPassword ? 'Masquer' : 'Afficher'}
          </button>
        </div>

        <div className="relative mb-4">
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Confirmer le mot de passe"
            className={`w-full border p-2 rounded pr-10 ${
              password && confirmPassword
                ? password === confirmPassword
                  ? 'border-green-500'
                  : 'border-red-500'
                : ''
            }`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-2 top-2 text-sm text-gray-500 hover:text-gray-700"
          >
            {showConfirm ? 'Masquer' : 'Afficher'}
          </button>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          S'inscrire
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Vous avez déjà un compte ?{" "}
            <a href="/connexion" className="text-blue-600 hover:underline">
              Se connecter
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;