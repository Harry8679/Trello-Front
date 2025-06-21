import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuthStore from '../store/useAuthStore';
import InputField from '../components/InputField';
import PasswordField from '../components/PasswordField';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const { setToken } = useAuthStore();

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

      setToken(res.data.token);
      toast.success('Inscription réussie !');
      navigate('/');
    } catch (err) {
      toast.error("L'inscription a échoué");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>

        <InputField
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <InputField
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          highlight
          className={
            password && confirmPassword
              ? password === confirmPassword
                ? 'border-green-500'
                : 'border-red-500'
              : ''
          }
        />

        <PasswordField
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmer le mot de passe"
          highlight
          className={
            password && confirmPassword
              ? password === confirmPassword
                ? 'border-green-500'
                : 'border-red-500'
              : ''
          }
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          S'inscrire
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Vous avez déjà un compte ?{' '}
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