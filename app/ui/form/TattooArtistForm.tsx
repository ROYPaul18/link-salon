"use client";

import { useState, useRef } from "react";
import Image from "next/image";
interface TattooArtistFormProps {
  onSuccess?: () => void;
}

export default function TattooArtistForm({ onSuccess }: TattooArtistFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const multipleFileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    Description: "",
    Technique: "",
    Style: "",
    facebookLink: "",
    instagramLink: "",
    websiteLink: "",
    profilPic: "",
    workPics: [] as string[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewProjectImages, setPreviewProjectImages] = useState<string[]>(
    []
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tattoo_artists");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dhjr5yz4o/image/upload",
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 3 * 1024 * 1024) {
        setError("L'image ne doit pas dépasser 3 Mo");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);

      const url = await uploadImage(file);
      if (url) {
        setFormData((prev) => ({ ...prev, profilPic: url }));
      }
    }
  };

  const handleProjectImagesUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      for (const file of files) {
        if (file.size > 3 * 1024 * 1024) {
          setError(`L'image ${file.name} ne doit pas dépasser 3 Mo`);
          return;
        }
      }

      const localPreviews = await Promise.all(
        files.map((file) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              resolve(event.target?.result as string);
            };
            reader.readAsDataURL(file);
          });
        })
      );

      setPreviewProjectImages((prev) => [...prev, ...localPreviews]);

      const urls = await Promise.all(files.map((file) => uploadImage(file)));
      setFormData((prev) => ({
        ...prev,
        workPics: [
          ...prev.workPics,
          ...(urls.filter((url) => url !== null) as string[]),
        ],
      }));
    }
  };

  const handleRemoveProjectImage = (index: number) => {
    setPreviewProjectImages((prev) => {
      const newPreviews = [...prev];
      newPreviews.splice(index, 1);
      return newPreviews;
    });

    setFormData((prev) => {
      const newProjectImages = [...prev.workPics];
      newProjectImages.splice(index, 1);
      return { ...prev, workPics: newProjectImages };
    });
  };

  const handleRemoveMainImage = () => {
    setPreviewImage(null);
    setFormData((prev) => ({ ...prev, profilPic: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.Description);
      formDataToSend.append("technique", formData.Technique);
      formDataToSend.append("style", formData.Style);
      formDataToSend.append("facebookLink", formData.facebookLink);
      formDataToSend.append("instagramLink", formData.instagramLink);
      formDataToSend.append("websiteLink", formData.websiteLink);

      if (fileInputRef.current?.files?.[0]) {
        formDataToSend.append("profilPic", fileInputRef.current.files[0]);
      }

      if (multipleFileInputRef.current?.files) {
        Array.from(multipleFileInputRef.current.files).forEach((file) => {
          formDataToSend.append("workPics", file);
        });
      }

      const response = await fetch("/api/tatoueur", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setFormData({
        name: "",
        Description: "",
        Technique: "",
        Style: "",
        facebookLink: "",
        instagramLink: "",
        websiteLink: "",
        profilPic: "",
        workPics: [],
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (multipleFileInputRef.current) multipleFileInputRef.current.value = "";
      setPreviewImage(null);
      setPreviewProjectImages([]);

      if (onSuccess) onSuccess();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erreur lors de l'envoi"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-lg mb-8 border-2 border-[#b8860b]">
      <h2 className="text-2xl font-bold mb-6 text-[#b8860b] border-b-2 border-[#b8860b] pb-2">
        Ajouter un tatoueur
      </h2>

      {error && (
        <div className="bg-red-700 text-white p-4 rounded mb-6 animate-pulse">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[#b8860b] mb-2 font-medium">Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#2c2c2c] text-white rounded border border-[#444] focus:border-[#b8860b] focus:outline-none focus:ring-1 focus:ring-[#b8860b] transition-colors"
          />
        </div>

        <div>
          <label className="block text-[#b8860b] mb-2 font-medium">
            Image principale
          </label>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/webp"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  className="w-full px-4 py-3 bg-[#2c2c2c] text-white rounded border border-[#444] focus:border-[#b8860b] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute right-0 top-0 h-full px-4 bg-[#b8860b] text-black rounded-r hover:bg-[#9c7209] transition-colors"
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
                    onClick={handleRemoveMainImage}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="w-40 h-40 border-2 border-dashed border-[#444] rounded flex items-center justify-center text-gray-400">
                  Aperçu image
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[#b8860b] mb-2 font-medium">
            Description
          </label>
          <textarea
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 bg-[#2c2c2c] text-white rounded border border-[#444] focus:border-[#b8860b] focus:outline-none focus:ring-1 focus:ring-[#b8860b] transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#b8860b] mb-2 font-medium">
              Technique
            </label>
            <input
              type="text"
              name="Technique"
              value={formData.Technique}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#2c2c2c] text-white rounded border border-[#444] focus:border-[#b8860b] focus:outline-none focus:ring-1 focus:ring-[#b8860b] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[#b8860b] mb-2 font-medium">
              Style
            </label>
            <input
              type="text"
              name="Style"
              value={formData.Style}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#2c2c2c] text-white rounded border border-[#444] focus:border-[#b8860b] focus:outline-none focus:ring-1 focus:ring-[#b8860b] transition-colors"
            />
          </div>
        </div>

        <div className="bg-[#2a2a2a] p-4 rounded-lg border border-[#444]">
          <h3 className="text-[#b8860b] mb-4 font-medium border-b border-[#444] pb-2">
            Liens sociaux
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[#b8860b] mb-2">Facebook</label>
              <div className="relative">
                <span className="absolute left-0 top-0 h-full flex items-center pl-3 text-gray-400">
                  📘
                </span>
                <input
                  type="url"
                  name="facebookLink"
                  value={formData.facebookLink}
                  onChange={handleChange}
                  placeholder="https://facebook.com/..."
                  className="w-full pl-10 pr-4 py-3 bg-[#2c2c2c] text-white rounded border border-[#444] focus:border-[#b8860b] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#b8860b] mb-2">Instagram</label>
              <div className="relative">
                <span className="absolute left-0 top-0 h-full flex items-center pl-3 text-gray-400">
                  📷
                </span>
                <input
                  type="url"
                  name="instagramLink"
                  value={formData.instagramLink}
                  onChange={handleChange}
                  placeholder="https://instagram.com/..."
                  className="w-full pl-10 pr-4 py-3 bg-[#2c2c2c] text-white rounded border border-[#444] focus:border-[#b8860b] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#b8860b] mb-2">Site Web</label>
              <div className="relative">
                <span className="absolute left-0 top-0 h-full flex items-center pl-3 text-gray-400">
                  🌐
                </span>
                <input
                  type="url"
                  name="websiteLink"
                  value={formData.websiteLink}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full pl-10 pr-4 py-3 bg-[#2c2c2c] text-white rounded border border-[#444] focus:border-[#b8860b] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[#b8860b] mb-2 font-medium">
            Images de projets
          </label>
          <div className="relative mb-4">
            <input
              type="file"
              accept="image/jpeg, image/png, image/webp"
              multiple
              ref={multipleFileInputRef}
              onChange={handleProjectImagesUpload}
              className="w-full px-4 py-3 bg-[#2c2c2c] text-white rounded border border-[#444] focus:border-[#b8860b] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => multipleFileInputRef.current?.click()}
              className="absolute right-0 top-0 h-full px-4 bg-[#b8860b] text-black rounded-r hover:bg-[#9c7209] transition-colors"
            >
              Parcourir
            </button>
          </div>
          <small className="text-gray-400 block mt-1">
            Taille max par image: 3 Mo (JPEG, PNG, WebP)
          </small>

          {previewProjectImages.length > 0 && (
            <div className="mt-4">
              <h4 className="text-[#b8860b] mb-2">Aperçu des projets</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {previewProjectImages.map((src, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={src}
                      width={160} 
                      height={160}
                      alt={`Aperçu projet ${index + 1}`}
                      className="w-full h-24 object-cover rounded border border-[#444]"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveProjectImage(index)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#b8860b] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#9c7209] transition-colors transform hover:scale-105 duration-200 disabled:bg-gray-500 disabled:transform-none flex items-center"
          >
            {isSubmitting ? (
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
                Envoi en cours...
              </>
            ) : (
              "Ajouter le tatoueur"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
