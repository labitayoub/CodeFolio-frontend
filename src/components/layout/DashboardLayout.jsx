import { Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { toast } from "react-hot-toast";
import { removeToken } from "../../utils/auth";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    toast.success("Déconnexion réussie !");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="flex justify-between items-center px-8 py-4">
            <h2 className="text-xl font-semibold text-gray-900">Mon Portfolio</h2>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
            >
              <LogOut size={20} />
              <span>Déconnexion</span>
            </button>
          </div>
        </header>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
