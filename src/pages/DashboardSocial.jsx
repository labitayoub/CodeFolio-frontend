import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { GET_SOCIAL, GET_CURRENT_USER } from "../graphql/queries";
import { CREATE_SOCIAL, UPDATE_SOCIAL, DELETE_SOCIAL } from "../graphql/mutations";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import SocialCard from "../components/Social/SocialCard";
import SocialModal from "../components/Social/SocialModal";

const DashboardSocial = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState(null);
  
  const { data: userData } = useQuery(GET_CURRENT_USER);
  const { loading, data, refetch } = useQuery(GET_SOCIAL);
  const [createSocial] = useMutation(CREATE_SOCIAL);
  const [updateSocial] = useMutation(UPDATE_SOCIAL);
  const [deleteSocial] = useMutation(DELETE_SOCIAL);

  const handleCreate = async (formData) => {
    try {
      await createSocial({
        variables: {
          ...formData,
          userId: userData?.getProfil?.id
        }
      });
      toast.success("Réseau social ajouté !");
      refetch();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateSocial({
        variables: {
          id: editingSocial.id,
          ...formData
        }
      });
      toast.success("Réseau social modifié !");
      refetch();
      setIsModalOpen(false);
      setEditingSocial(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Supprimer ce réseau social ?")) {
      try {
        await deleteSocial({ variables: { id } });
        toast.success("Réseau social supprimé !");
        refetch();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const openEditModal = (social) => {
    setEditingSocial(social);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSocial(null);
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Mes Réseaux Sociaux</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={20} className="inline mr-2" />
          Ajouter un réseau
        </Button>
      </div>

      {data?.resieauxSociauxs?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-lg text-gray-600 mb-4">Aucun réseau social pour le moment</p>
          <Button onClick={() => setIsModalOpen(true)}>Ajouter votre premier réseau</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.resieauxSociauxs?.map((social) => (
            <SocialCard
              key={social.id}
              social={social}
              onEdit={() => openEditModal(social)}
              onDelete={() => handleDelete(social.id)}
            />
          ))}
        </div>
      )}

      <SocialModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingSocial ? handleUpdate : handleCreate}
        social={editingSocial}
      />
    </div>
  );
};

export default DashboardSocial;
