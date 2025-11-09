import { FolderGit2, Briefcase, GraduationCap, Code } from "lucide-react";
import Card from "../components/ui/Card";

const Dashboard = () => {
  const stats = [
    { icon: FolderGit2, label: "Projets", count: 0, color: "text-blue-500" },
    { icon: Briefcase, label: "Expériences", count: 0, color: "text-green-500" },
    { icon: GraduationCap, label: "Formations", count: 0, color: "text-purple-500" },
    { icon: Code, label: "Compétences", count: 0, color: "text-orange-500" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Bienvenue sur votre Dashboard 🎉</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-gray-100 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.count}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="text-xl font-bold mb-4">Prochaines étapes</h2>
        <ul className="space-y-2 text-gray-600">
          <li>✅ Ajouter vos projets</li>
          <li>✅ Compléter vos expériences professionnelles</li>
          <li>✅ Lister vos formations</li>
          <li>✅ Ajouter vos compétences</li>
          <li>✅ Configurer vos réseaux sociaux</li>
        </ul>
      </Card>
    </div>
  );
};

export default Dashboard;
