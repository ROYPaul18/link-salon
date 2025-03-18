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
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Filter out empty links
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
        // Reset form
        setFormData({
          name: "",
          Description: "",
          Technique: "",
          Style: "",
          Link: [""],
        });

        if (onSuccess) onSuccess();
      } else {
        const data = await response.json();
        setError(data.error || "Une erreur est survenue");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Erreur lors de l'envoi du formulaire");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-8">
      <h2 className="text-xl font-bold mb-4 text-gold">
        Ajouter un tatoueur vacataire
      </h2>

      {error && (
        <div className="bg-red-700 text-white p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gold mb-2">Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gold mb-2">Description</label>
          <textarea
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gold mb-2">Technique</label>
          <input
            type="text"
            name="Technique"
            value={formData.Technique}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gold mb-2">Style</label>
          <input
            type="text"
            name="Style"
            value={formData.Style}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gold mb-2">
            Liens (portfolio, réseaux sociaux, etc.)
          </label>

          {formData.Link.map((link, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="url"
                value={link}
                onChange={(e) => handleLinkChange(index, e.target.value)}
                placeholder="https://..."
                className="flex-grow px-3 py-2 bg-gray-700 text-white rounded-l"
              />
              <button
                type="button"
                onClick={() => removeLinkField(index)}
                disabled={formData.Link.length === 1}
                className="bg-red-700 text-white px-3 py-2 rounded-r disabled:bg-gray-600"
              >
                &times;
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addLinkField}
            className="bg-blue-700 text-white px-3 py-1 rounded text-sm mt-2"
          >
            + Ajouter un lien
          </button>
        </div>

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
