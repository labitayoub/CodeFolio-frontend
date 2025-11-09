import { NavLink } from "react-router-dom";
import { LayoutDashboard, FolderGit2, Briefcase, GraduationCap, Code, FileText, Share2, User } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/dashboard/projects", icon: FolderGit2, label: "Projets" },
    { path: "/dashboard/experiences", icon: Briefcase, label: "Expériences" },
    { path: "/dashboard/formations", icon: GraduationCap, label: "Formations" },
    { path: "/dashboard/skills", icon: Code, label: "Compétences" },
    { path: "/dashboard/documents", icon: FileText, label: "Documents" },
    { path: "/dashboard/social", icon: Share2, label: "Réseaux sociaux" },
    { path: "/dashboard/profile", icon: User, label: "Profil" },
  ];

  return (
    <aside className="w-64 bg-white border-r h-screen sticky top-0">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-900">CodeFolio</h1>
        <p className="text-sm text-gray-500 mt-1">Dashboard</p>
      </div>
      
      <nav className="p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
