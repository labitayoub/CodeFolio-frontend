import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { GET_DOCUMENTS } from "../graphql/queries";
import { CREATE_DOCUMENT, UPDATE_DOCUMENT, DELETE_DOCUMENT } from "../graphql/mutations";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import DocumentCard from "../components/Document/DocumentCard";
import DocumentModal from "../components/Document/DocumentModal";

const DashboardDocuments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);
  
  const { loading, data, refetch } = useQuery(GET_DOCUMENTS);
  const [createDocument] = useMutation(CREATE_DOCUMENT);
  const [updateDocument] = useMutation(UPDATE_DOCUMENT);
  const [deleteDocument] = useMutation(DELETE_DOCUMENT);

  const handleCreate = async (formData) => {
    try {
      await createDocument({
        variables: {
          input: {
            nom: formData.nom,
            urlStocket: formData.urlStocket
          }
        }
      });
      toast.success("Document ajouté !");
      refetch();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateDocument({
        variables: {
          id: editingDocument._id,
          input: {
            nom: formData.nom,
            urlStocket: formData.urlStocket
          }
        }
      });
      toast.success("Document modifié !");
      refetch();
      setIsModalOpen(false);
      setEditingDocument(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Supprimer ce document ?")) {
      try {
        await deleteDocument({ variables: { id } });
        toast.success("Document supprimé !");
        refetch();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const openEditModal = (document) => {
    setEditingDocument(document);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDocument(null);
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Mes Documents</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={20} className="inline mr-2" />
          Ajouter un document
        </Button>
      </div>

      {data?.documents?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-lg text-gray-600 mb-4">Aucun document pour le moment</p>
          <Button onClick={() => setIsModalOpen(true)}>Ajouter votre premier document</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.documents?.map((document) => (
            <DocumentCard
              key={document._id}
              document={document}
              onEdit={() => openEditModal(document)}
              onDelete={() => handleDelete(document._id)}
            />
          ))}
        </div>
      )}

      <DocumentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingDocument ? handleUpdate : handleCreate}
        document={editingDocument}
      />
    </div>
  );
};

export default DashboardDocuments;
