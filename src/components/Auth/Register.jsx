import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { toast } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import { REGISTER_MUTATION } from '../../graphql/mutations';

const Register = () => {
  const [formData, setFormData] = useState({ 
    nom: '', 
    prenom: '',
    username: '', 
    email: '', 
    password: '', 
    bio: '' 
  });
  const navigate = useNavigate();

  // Utiliser Apollo Client useMutation
  const [register, { loading }] = useMutation(REGISTER_MUTATION, {
    onCompleted: () => {
      toast.success('Inscription réussie ! Redirection...');
      setTimeout(() => navigate('/login'), 2000);
    },
    onError: (err) => {
      const errorMessage = err.message;
      
      // Gestion de l'erreur d'email déjà existant
      if (errorMessage.includes('E11000') || errorMessage.includes('duplicate') || errorMessage.includes('déjà utilisé')) {
        toast.error('Cet email est déjà utilisé. Veuillez utiliser un autre email ou vous connecter.');
      } else {
        toast.error(errorMessage);
      }
    }
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  register({
    variables: {
      nom: formData.nom,
      prenom: formData.prenom,
      username: formData.username.toLowerCase().trim(),
      email: formData.email.toLowerCase().trim(),
      password: formData.password,
      bio: formData.bio
    }
  });
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="text-xl font-bold text-gray-800">
            Inscription
          </h2>
          <div className="w-5"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Nom *
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nom"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Prénom *
              </label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Prénom"
                required
                disabled={loading}
              />
            </div>
          </div>
<div>
  <label className="block text-gray-700 text-sm font-bold mb-1">
    Username *
  </label>
  <input
    type="text"
    name="username"
    value={formData.username}
    onChange={handleChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="johndoe"
    required
    disabled={loading}
  />
</div>


          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="exemple@email.com"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Mot de passe *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Bio (optionnel)
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Parlez-nous de vous..."
              rows="2"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
          >
            {loading ? 'Inscription...' : 'S\'inscrire'}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
