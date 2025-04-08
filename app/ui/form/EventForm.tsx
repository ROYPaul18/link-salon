"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface EventFormProps {
  onSuccess?: () => void;
}

interface FormData {
  title: string;
  time: string;
  duration: number;
  location: string;
  adresse: string;
}

export default function EventForm({ onSuccess }: EventFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    time: "",
    duration: 60,
    location: "",
    adresse: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" ? parseInt(value) || 0 : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Vérifier que le fichier fait moins de 3 Mo
      if (file.size > 3 * 1024 * 1024) {
        setError("L'image ne doit pas dépasser 3 Mo.");
        if (fileInputRef.current) fileInputRef.current.value = "";
        setPreviewImage(null);
        return;
      }

      // Créer un aperçu
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("time", formData.time);
      formDataToSend.append("duration", formData.duration.toString());
      formDataToSend.append("location", formData.location);
      formDataToSend.append('adresse', formData.adresse);

      if (fileInputRef.current?.files?.[0]) {
        formDataToSend.append("image", fileInputRef.current.files[0]);
      }

      const response = await fetch("/api/event", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Une erreur s'est produite");
      }

      // Réinitialisation
      setFormData({ title: "", time: "", duration: 60, location: "", adresse:"" });
      setPreviewImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      onSuccess?.();
      router.refresh();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur inconnue s'est produite"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gold p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Ajouter un événement</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Titre de l&apos;événement *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="time">
            Date et heure *
          </label>
          <input
            type="datetime-local"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="duration">
            Durée (minutes) *
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            min="1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="location">
            Lieu *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="adresse">
            Adresse complète
          </label>
          <input
            type="text"
            id="adresse"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="image">
            Image de l&apos;événement (max 3 Mo)
          </label>
          <input
            type="file"
            id="image"
            name="image"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="w-full px-3 py-2 border rounded-md"
          />
          {previewImage && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Aperçu :</p>
              <Image
                src={previewImage}
                alt="Aperçu de l'image"
                className="max-h-40 rounded-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300"
        >
          {isLoading ? "Création en cours..." : "Créer l'événement"}
        </button>
      </form>
    </div>
  );
}
