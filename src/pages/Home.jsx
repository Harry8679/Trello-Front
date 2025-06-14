const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-6">Bienvenue sur Trello Clone</h1>
      <p className="text-lg mb-6">Organisez vos tâches efficacement avec des tableaux, colonnes et cartes.</p>
      <div className="space-x-4">
        <a href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Connexion</a>
        <a href="/register" className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400">Inscription</a>
      </div>
    </div>
  );
};

export default Home;