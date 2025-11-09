import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { GET_FORMATIONS, GET_CURRENT_USER } from "../graphql/queries";
import { CREATE_FORMATION, UPDATE_FORMATION, DELETE_FORMATION } from "../graphql/mutations";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import FormationCard from "../components/Formation/FormationCard";
import FormationModal from "../components/Formation/FormationModal";

const DashboardFormations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFormation, setEditingFormation] = useState(null);
  
  const { data: userData } = useQuery(GET_CURRENT_USER);
  const { loading, data, refetch } = useQuery(GET_FORMATIONS);
  const [createFormation] = useMutation(CREATE_FORMATION);
  const [updateFormation] = useMutation(UPDATE_FORMATION);
  const [deleteFormation] = useMutation(DELETE_FORMATION);

  const handleCreate = async (formData) => {
    try {
      await createFormation({
        variables: {
          ...formData,
          userId: userData?.getProfil?.id
        }
      });
      toast.success("Formation ajoutée !");
      refetch();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateFormation({
        variables: {
          id: editingFormation.id,
          ...formData
        }
      });
      toast.success("Formation modifiée !");
      refetch();
      setIsModalOpen(false);
      setEditingFormation(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Supprimer cette formation ?")) {
      try {
        await deleteFormation({ variables: { id } });
        toast.success("Formation supprimée !");
        refetch();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const openEditModal = (formation) => {
    setEditingFormation(formation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingFormation(null);
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Mes Formations</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={20} className="inline mr-2" />
          Ajouter une formation
        </Button>
      </div>

      {data?.formations?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-lg text-gray-600 mb-4">Aucune formation pour le moment</p>
          <Button onClick={() => setIsModalOpen(true)}>Ajouter votre première formation</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data?.formations?.map((formation) => (
            <FormationCard
              key={formation.id}
              formation={formation}
              onEdit={() => openEditModal(formation)}
              onDelete={() => handleDelete(formation.id)}
            />
          ))}
        </div>
      )}

      <FormationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingFormation ? handleUpdate : handleCreate}
        formation={editingFormation}
      />
    </div>
  );
};

export default DashboardFormations;
