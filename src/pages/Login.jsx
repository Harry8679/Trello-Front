import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuthStore from '../store/useAuthStore';
import InputField from '../components/InputField';
import PasswordField from '../components/PasswordField';

const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setToken } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      setToken(res.data.token);
      toast.success('Connexion réussie');
      navigate('/');
    } catch (err) {
      toast.error('Connexion échouée');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>

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
        />

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Se connecter
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Pas encore de compte ?{' '}
            <a href="/inscription" className="text-blue-600 hover:underline">
              Inscription
            </a>
          </p>
          <p className="mt-1">
            <a href="/mot-de-passe-oublie" className="text-blue-600 hover:underline">
              Mot de passe oublié ?
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
