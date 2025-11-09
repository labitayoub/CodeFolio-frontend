import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

const SocialModal = ({ isOpen, onClose, onSubmit, social }) => {
  const [formData, setFormData] = useState({
    nom: "",
    liensSociaux: "",
    icon: ""
  });

  useEffect(() => {
    if (social) {
      setFormData({
        nom: social.nom || "",
        liensSociaux: social.liensSociaux || "",
        icon: social.icon || ""
      });
    } else {
      setFormData({
        nom: "",
        liensSociaux: "",
        icon: ""
      });
    }
  }, [social]);

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
      title={social ? "Modifier le réseau social" : "Ajouter un réseau social"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nom du réseau"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          placeholder="LinkedIn, GitHub, Twitter..."
          required
        />

        <Input
          label="Lien du profil"
          name="liensSociaux"
          value={formData.liensSociaux}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/username"
          required
        />

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Réseau social <span className="text-red-500">*</span>
          </label>
          <select
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Sélectionner un réseau</option>
            <option value="linkedin">LinkedIn</option>
            <option value="github">GitHub</option>
            <option value="twitter">Twitter</option>
            <option value="instagram">Instagram</option>
            <option value="youtube">YouTube</option>
            <option value="facebook">Facebook</option>
            <option value="link">Autre</option>
          </select>
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Annuler
          </Button>
          <Button type="submit" className="flex-1">
            {social ? "Modifier" : "Ajouter"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SocialModal;
