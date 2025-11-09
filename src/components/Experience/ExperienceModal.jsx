import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

const ExperienceModal = ({ isOpen, onClose, onSubmit, experience }) => {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: ""
  });

  useEffect(() => {
    if (experience) {
      setFormData({
        company: experience.company || "",
        role: experience.role || "",
        startDate: experience.startDate || "",
        endDate: experience.endDate || "",
        description: experience.description || ""
      });
    } else {
      setFormData({
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: ""
      });
    }
  }, [experience]);

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
      title={experience ? "Modifier l'expérience" : "Ajouter une expérience"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Entreprise"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Google"
          required
        />

        <Input
          label="Poste"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Développeur Full Stack"
          required
        />

        <Input
          label="Date de début"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <Input
          label="Date de fin"
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleChange}
        />

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Décrivez vos missions..."
            rows="4"
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Annuler
          </Button>
          <Button type="submit" className="flex-1">
            {experience ? "Modifier" : "Ajouter"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ExperienceModal;
