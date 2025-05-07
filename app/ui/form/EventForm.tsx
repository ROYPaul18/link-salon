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

  const handleRemoveImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
    <div className="bg-redlink p-8 rounded-lg shadow-lg mb-8 border-2 border-[#b8860b]">
      <h2 className="text-2xl font-bold mb-6 text-[#b8860b] border-b-2 border-[#b8860b] pb-2">
        Ajouter un événement
      </h2>

      {error && (
        <div className="bg-red-700 text-white p-4 rounded mb-6 animate-pulse">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[#b8860b] mb-2 font-medium">
            Titre de l&apos;événement
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gold text-black rounded border border-[#444] focus:border-[#b8860b] focus:outline-none focus:ring-1 focus:ring-[#b8860b] transition-colors"
          />
        </div>

        <div>
          <label className="block text-[#b8860b] mb-2 font-medium">
            Date et heure
          </label>
          <input
            type="datetime-local"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gold text-black rounded border border-[#444] focus:border-[#b8860b] focus:outline-none focus:ring-1 focus:ring-[#b8860b] transition-colors"
          />
        </div>

        <div>
          <label className="block text-[#b8860b] mb-2 font-medium">
            Durée (minutes)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="1"
            required
            className="w-full px-4 py-3 bg-gold text-black rounded border border-[#444] focus:border-[#b8860b] focus:outline-none focus:ring-1 focus:ring-[#b8860b] transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gold mb-2 font-medium">
              Lieu
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gold text-black rounded border border-[#444] focus:border-[#b8860b] focus:outline-none focus:ring-1 focus:ring-[#b8860b] transition-colors"
            />
          </div>

          <div>
            <label className="block text-gold mb-2 font-medium">
              Adresse complète
            </label>
            <input
              type="text"
              id="adresse"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gold text-black rounded border border-[#444] focus:border-[#b8860b] focus:outline-none focus:ring-1 focus:ring-[#b8860b] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#b8860b] mb-2 font-medium">
            Image de l&apos;événement
          </label>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="w-full px-4 py-3 bg-gold text-white rounded border border-[#444] focus:border-[#b8860b] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute right-0 top-0 h-full px-4 bg-gold text-black rounded-r hover:bg-[#9c7209] transition-colors"
                >
                  Parcourir
                </button>
              </div>
              <small className="text-gray-400 block mt-1">
                Taille max: 3 Mo (JPEG, PNG, WebP)
              </small>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center">
              {previewImage ? (
                <div className="relative">
                  <Image
                    src={previewImage}
                    alt="Aperçu"
                    width={160} 
                    height={160}
                    className="object-cover rounded border-2 border-[#b8860b]"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="w-40 h-40 border-2 border-dashed border-gold rounded flex items-center justify-center text-gray-400">
                  Aperçu image
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#b8860b] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#9c7209] transition-colors transform hover:scale-105 duration-200 disabled:bg-gray-500 disabled:transform-none flex items-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Création en cours...
              </>
            ) : (
              "Créer l'événement"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}