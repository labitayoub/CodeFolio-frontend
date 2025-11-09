import { FileText } from 'lucide-react';

const PortfolioHeader = ({ user, documents }) => {
  const photoProfile = documents?.find(doc => doc.nom === "Photo de profil")?.urlStocket;
  const coverProfile = documents?.find(doc => doc.nom === "Cover de profil")?.urlStocket;
  const cvDocument = documents?.find(doc => doc.nom === "CV")?.urlStocket;

  return (
    <div 
      className="relative text-white py-20"
      style={{
        backgroundImage: coverProfile ? `url(${coverProfile})` : 'linear-gradient(to right, #2563eb, #9333ea)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <div className="mb-6">
          {photoProfile ? (
            <img 
              src={photoProfile} 
              alt={`${user.prenom} ${user.nom}`}
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <span className="text-6xl">👤</span>
          )}
        </div>
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
          {user.prenom} {user.nom}
        </h1>
        <p className="text-xl mb-2 drop-shadow-lg">@{user.username}</p>
        {user.bio && (
          <p className="text-lg max-w-2xl mx-auto mt-6 drop-shadow-lg">
            {user.bio}
          </p>
        )}
        {cvDocument && (
          <button
            onClick={() => window.open(cvDocument, '_blank')}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            <FileText size={20} />
            Voir mon CV
          </button>
        )}
      </div>
    </div>
  );
};

export default PortfolioHeader;
