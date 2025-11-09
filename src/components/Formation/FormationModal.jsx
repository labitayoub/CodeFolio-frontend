import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

const FormationModal = ({ isOpen, onClose, onSubmit, formation }) => {
  const [formData, setFormData] = useState({
    filiere: "",
    ecole: "",
    localisation: "",
    dateDebut: "",
    dateFinal: "",
    description: ""
  });

  useEffect(() => {
    if (formation) {
      setFormData({
        filiere: formation.filiere || "",
        ecole: formation.ecole || "",
        localisation: formation.localisation || "",
        dateDebut: formation.dateDebut || "",
        dateFinal: formation.dateFinal || "",
        description: formation.description || ""
      });
    } else {
      setFormData({
        filiere: "",
        ecole: "",
        localisation: "",
        dateDebut: "",
        dateFinal: "",
        description: ""
      });
    }
  }, [formation]);

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
      title={formation ? "Modifier la formation" : "Ajouter une formation"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Filière"
          name="filiere"
          value={formData.filiere}
          onChange={handleChange}
          placeholder="Licence Informatique"
          required
        />

        <Input
          label="École"
          name="ecole"
          value={formData.ecole}
          onChange={handleChange}
          placeholder="Université Paris"
          required
        />

        <Input
          label="Localisation"
          name="localisation"
          value={formData.localisation}
          onChange={handleChange}
          placeholder="Paris, France"
          required
        />

        <Input
          label="Date de début"
          name="dateDebut"
          type="date"
          value={formData.dateDebut}
          onChange={handleChange}
          required
        />

        <Input
          label="Date de fin"
          name="dateFinal"
          type="date"
          value={formData.dateFinal}
          onChange={handleChange}
          required
        />

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Décrivez votre formation..."
            rows="4"
            required
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Annuler
          </Button>
          <Button type="submit" className="flex-1">
            {formation ? "Modifier" : "Ajouter"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default FormationModal;
