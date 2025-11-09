const PortfolioHeader = ({ user }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-6">
          <span className="text-6xl">👤</span>
        </div>
        <h1 className="text-5xl font-bold mb-4">
          {user.prenom} {user.nom}
        </h1>
        <p className="text-xl mb-2">@{user.username}</p>
        {user.bio && (
          <p className="text-lg max-w-2xl mx-auto mt-6 opacity-90">
            {user.bio}
          </p>
        )}
      </div>
    </div>
  );
};

export default PortfolioHeader;
