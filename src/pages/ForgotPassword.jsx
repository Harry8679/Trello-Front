import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
      toast.success('Un e-mail de réinitialisation a été envoyé.');
    } catch (err) {
      toast.error("Échec de l'envoi. Vérifie l'e-mail.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Mot de passe oublié</h2>

        <input
          type="email"
          placeholder="Entrez votre adresse e-mail"
          className="w-full border p-2 mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Envoyer le lien de réinitialisation
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Vous vous souvenez de votre mot de passe ?{" "}
            <a href="/connexion" className="text-blue-600 hover:underline">
              Se connecter
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;