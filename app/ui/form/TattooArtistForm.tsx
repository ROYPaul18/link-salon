"use client";

import { useState } from "react";

interface TattooArtistFormProps {
  onSuccess?: () => void;
}

export default function TattooArtistForm({ onSuccess }: TattooArtistFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    Description: "",
    Technique: "",
    Style: "",
    Link: [""],
    image: "", // URL de l'image principale
    projectImages: [] as string[], // URLs des images de projets
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...formData.Link];
    newLinks[index] = value;
    setFormData((prev) => ({ ...prev, Link: newLinks }));
  };

  const addLinkField = () => {
    setFormData((prev) => ({ ...prev, Link: [...prev.Link, ""] }));
  };

  const removeLinkField = (index: number) => {
    const newLinks = [...formData.Link];
    newLinks.splice(index, 1);
    setFormData((prev) => ({ ...prev, Link: newLinks }));
  };

  // Fonction d'upload vers Cloudinary
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ton_upload_preset"); // Remplace par ton preset Cloudinary

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/ton_cloud_name/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Erreur d'upload Cloudinary", error);
      return null;
    }
  };

  // Gestion de l'upload de l'image principale
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = await uploadImage(e.target.files[0]);
      if (url) {
        setFormData((prev) => ({ ...prev, image: url }));
      }
    }
  };

  // Gestion de l'upload des images de projets
  const handleProjectImagesUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const urls = await Promise.all(files.map((file) => uploadImage(file)));
      setFormData((prev) => ({
        ...prev,
        projectImages: [
          ...prev.projectImages,
          ...urls.filter((url) => url !== null),
        ],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Filtrer les liens vides
      const filteredLinks = formData.Link.filter((link) => link.trim() !== "");

      const response = await fetch("/api/tatoueur", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          Link: filteredLinks,
        }),
      });

      if (response.ok) {
        // Réinitialisation du formulaire
        setFormData({
          name: "",
          Description: "",
          Technique: "",
          Style: "",
          Link: [""],
          image: "",
          projectImages: [],
        });

        if (onSuccess) onSuccess();
      } else {
        const data = await response.json();
        setError(data.error || "Une erreur est survenue");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire", error);
      setError("Erreur lors de l'envoi du formulaire");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gold p-6 rounded-lg mb-8">
      <h2 className="text-xl font-bold mb-4 text-redlink">
        Ajouter un tatoueur
      </h2>

      {error && (
        <div className="bg-red-700 text-white p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Nom */}
        <div className="mb-4">
          <label className="block text-redlink mb-2">Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-redlink text-white rounded"
          />
        </div>

        {/* Image principale */}
        <div className="mb-4">
          <label className="block text-redlink mb-2">Image principale</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-3 py-2 bg-redlink text-white rounded"
          />
        </div>
        {/* Description */}
        <div className="mb-4">
          <label className="block text-redlink mb-2">Description</label>
          <textarea
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 bg-redlink text-white rounded"
          />
        </div>

        {/* Technique */}
        <div className="mb-4">
          <label className="block text-redlink mb-2">Technique</label>
          <input
            type="text"
            name="Technique"
            value={formData.Technique}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-redlink text-white rounded"
          />
        </div>

        {/* Style */}
        <div className="mb-4">
          <label className="block text-redlink mb-2">Style</label>
          <input
            type="text"
            name="Style"
            value={formData.Style}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-redlink text-white rounded"
          />
        </div>

        {/* Images de projets */}
        <div className="mb-4">
          <label className="block text-redlink mb-2">Images de projets</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleProjectImagesUpload}
            className="w-full px-3 py-2 bg-redlink text-white rounded"
          />
        </div>

        {/* Bouton d'envoi */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gold text-redlink px-4 py-2 rounded disabled:bg-gray-500"
          >
            {isSubmitting ? "Envoi en cours..." : "Ajouter le tatoueur"}
          </button>
        </div>
      </form>
    </div>
  );
}
