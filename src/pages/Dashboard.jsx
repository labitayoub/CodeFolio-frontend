import { useQuery } from "@apollo/client";
import { FolderGit2, Briefcase, GraduationCap, Code } from "lucide-react";
import { GET_CURRENT_USER, GET_PROJECTS, GET_EXPERIENCES, GET_FORMATIONS, GET_SKILLS } from "../graphql/queries";
import Card from "../components/ui/Card";
import Spinner from "../components/ui/Spinner";

const Dashboard = () => {
  const { data: userData, loading: userLoading } = useQuery(GET_CURRENT_USER);
  const { data: projectsData } = useQuery(GET_PROJECTS);
  const { data: experiencesData } = useQuery(GET_EXPERIENCES);
  const { data: formationsData } = useQuery(GET_FORMATIONS);
  const { data: skillsData } = useQuery(GET_SKILLS);

  const stats = [
    { 
      icon: FolderGit2, 
      label: "Projets", 
      count: projectsData?.projects?.length || 0, 
      color: "text-blue-500" 
    },
    { 
      icon: Briefcase, 
      label: "Expériences", 
      count: experiencesData?.getExperiences?.length || 0, 
      color: "text-green-500" 
    },
    { 
      icon: GraduationCap, 
      label: "Formations", 
      count: formationsData?.formations?.length || 0, 
      color: "text-purple-500" 
    },
    { 
      icon: Code, 
      label: "Compétences", 
      count: skillsData?.getCompetences?.length || 0, 
      color: "text-orange-500" 
    },
  ];

  if (userLoading) return <Spinner />;

  return (
    <div>
      {/* Informations du profil */}
      <Card className="mb-6">
        <div className="flex items-start gap-4">
          <div className="p-4 bg-blue-100 rounded-full">
            <span className="text-3xl">👤</span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">
              {userData?.getProfil?.prenom} {userData?.getProfil?.nom}
            </h1>
            <p className="text-gray-600 mt-1">@{userData?.getProfil?.username}</p>
            <p className="text-sm text-gray-500">{userData?.getProfil?.email}</p>
            {userData?.getProfil?.bio && (
              <p className="text-gray-700 mt-3 italic">"{userData.getProfil.bio}"</p>
            )}
          </div>
        </div>
      </Card>

      {/* Statistiques */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Mes Statistiques</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-gray-100 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.count}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Prochaines étapes */}
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
