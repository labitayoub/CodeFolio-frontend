import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

const DocumentModal = ({ isOpen, onClose, onSubmit, document }) => {
  const [formData, setFormData] = useState({
    nom: "",
    urlStocket: ""
  });

  useEffect(() => {
    if (document) {
      setFormData({
        nom: document.nom || "",
        urlStocket: document.urlStocket || ""
      });
    } else {
      setFormData({
        nom: "",
        urlStocket: ""
      });
    }
  }, [document]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={document ? "Modifier le document" : "Ajouter un document"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nom du document"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          placeholder="CV, Certificat..."
          required
        />

        <Input
          label="URL du document"
          name="urlStocket"
          value={formData.urlStocket}
          onChange={handleChange}
          placeholder="https://example.com/document.pdf"
          required
        />

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Annuler
          </Button>
          <Button type="submit" className="flex-1">
            {document ? "Modifier" : "Ajouter"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DocumentModal;
