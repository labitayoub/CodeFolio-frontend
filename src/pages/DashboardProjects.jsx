import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { GET_PROJECTS } from "../graphql/queries";
import { CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT } from "../graphql/mutations";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";

const DashboardProjects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { loading, data, refetch } = useQuery(GET_PROJECTS);
  const [createProject] = useMutation(CREATE_PROJECT);
  const [updateProject] = useMutation(UPDATE_PROJECT);
  const [deleteProject] = useMutation(DELETE_PROJECT);

  const handleDelete = async (id) => {
    if (confirm("Supprimer ce projet ?")) {
      try {
        await deleteProject({ variables: { id } });
        toast.success("Projet supprimé !");
        refetch();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Mes Projets</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={20} className="inline mr-2" />
          Ajouter un projet
        </Button>
      </div>

      {data?.projects?.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-4">Aucun projet pour le moment</p>
          <Button onClick={() => setIsModalOpen(true)}>Créer votre premier projet</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.projects?.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">{project.titre}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {}}>Modifier</Button>
                <Button variant="danger" onClick={() => handleDelete(project.id)}>Supprimer</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardProjects;
