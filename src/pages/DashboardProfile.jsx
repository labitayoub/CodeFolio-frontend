import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { GET_CURRENT_USER } from "../graphql/queries";
import { UPDATE_PROFILE } from "../graphql/mutations";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import Card from "../components/ui/Card";

const DashboardProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    username: "",
    email: "",
    bio: ""
  });

  const { loading, data } = useQuery(GET_CURRENT_USER);
  const [updateProfile, { loading: updating }] = useMutation(UPDATE_PROFILE);

  useEffect(() => {
    if (data?.getProfil) {
      setFormData({
        nom: data.getProfil.nom || "",
        prenom: data.getProfil.prenom || "",
        username: data.getProfil.username || "",
        email: data.getProfil.email || "",
        bio: data.getProfil.bio || ""
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        variables: formData,
        refetchQueries: [{ query: GET_CURRENT_USER }]
      });
      toast.success("Profil mis à jour !");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mon Profil</h1>

      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Votre nom"
              required
            />

            <Input
              label="Prénom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              placeholder="Votre prénom"
              required
            />
          </div>

          <Input
            label="Nom d'utilisateur"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="johndoe"
            required
          />
          <p className="text-xs text-gray-500 -mt-2">
            Votre portfolio sera accessible sur : /{formData.username || 'username'}
          </p>

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="exemple@email.com"
            required
          />

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Parlez-nous de vous..."
              rows="4"
            />
          </div>

          <Button type="submit" disabled={updating} className="w-full">
            {updating ? "Mise à jour..." : "Mettre à jour le profil"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default DashboardProfile;
