import { Link, Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import { Rocket, Zap, Palette } from "lucide-react";

const Home = () => {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            Code<span className="text-purple-600">Folio</span>
          </h1>
          <p className="text-xl text-gray-600">
            Créez votre portfolio professionnel en quelques minutes
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
            <Rocket className="text-purple-600 w-8 h-8 mb-3 mx-auto" />
            <h3 className="text-gray-800 font-semibold mb-2">Moderne</h3>
            <p className="text-gray-600 text-sm">Interface élégante et responsive</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
            <Zap className="text-purple-600 w-8 h-8 mb-3 mx-auto" />
            <h3 className="text-gray-800 font-semibold mb-2">Rapide</h3>
            <p className="text-gray-600 text-sm">Configuration en quelques clics</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
            <Palette className="text-purple-600 w-8 h-8 mb-3 mx-auto" />
            <h3 className="text-gray-800 font-semibold mb-2">Personnalisable</h3>
            <p className="text-gray-600 text-sm">Adaptez selon vos besoins</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Commencer gratuitement
          </Link>
          <Link
            to="/login"
            className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-3 rounded-lg font-semibold border border-gray-300 transition-colors"
          >
            Se connecter
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-16 text-gray-500 text-sm">
          <p>Rejoignez des milliers de développeurs qui font confiance à CodeFolio</p>
        </div>
      </div>
    </div>
  );
};

export default Home;