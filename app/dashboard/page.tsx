"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EventForm from "@/app/ui/form/EventForm";
import TattooArtistForm from "@/app/ui/form/TattooArtistForm";
import Header from "../ui/header";
import Footer from "../ui/footer";
import Image from "next/image";

interface Event {
  id: string;
  title: string;
  time: string;
  duration: number;
  location: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  adresse: string;
}

interface TattooArtist {
  id: string;
  name: string;
  Description: string;
  Technique: string;
  Style: string;
  profilPic?: string;
  worksPics?: string[];
  facebookLink: string | null;
  instagramLink: string | null;
  websiteLink: string | null;
}

export default function Dashboard() {
  const [isAuth, setIsAuth] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [tattooArtists, setTattooArtists] = useState<TattooArtist[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingArtists, setLoadingArtists] = useState(true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showArtistForm, setShowArtistForm] = useState(false);
  const [activeTab, setActiveTab] = useState("events");
  const router = useRouter();

  useEffect(() => {
    const auth = sessionStorage.getItem("admin-auth");
    if (!auth) {
      router.push("/admin");
    } else {
      setIsAuth(true);
      fetchEvents();
      fetchTattooArtists();
    }
  }, [router]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/event");
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des événements:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTattooArtists = async () => {
    try {
      setLoadingArtists(true);
      const response = await fetch("/api/tatoueur");
      console.log("Réponse brute:", response);

      if (response.ok) {
        const data = await response.json();
        console.log("Données reçues:", data); // Ajout pour déboguer
        setTattooArtists(Array.isArray(data) ? data : []);
      } else {
        console.error("Erreur API:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des tatoueurs:", error);
    } finally {
      setLoadingArtists(false);
    }
  };
  const handleDeleteEvent = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      try {
        const response = await fetch(`/api/event?id=${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchEvents();
        } else {
          alert("Erreur lors de la suppression de l'événement");
        }
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  };

  const handleDeleteArtist = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce tatoueur ?")) {
      try {
        const response = await fetch(`/api/tatoueur?id=${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchTattooArtists();
        } else {
          alert("Erreur lors de la suppression du tatoueur");
        }
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin-auth");
    router.push("/");
  };

  if (!isAuth) return null;

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />

      <Image
        src="/img/bg.jpeg"
        alt="Background image"
        fill
        priority
        className="object-fit fixed top-0 left-0 z-0"
      />

      <div className="flex-grow z-10 relative py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gold">Dashboard Admin</h1>
            <button
              onClick={handleLogout}
              className="bg-redlink hover:bg-red-800 px-4 py-2 rounded text-gold"
            >
              Se déconnecter
            </button>
          </div>

          {/* Onglets */}
          <div className="flex border-b border-gold mb-6">
            <button
              onClick={() => setActiveTab("events")}
              className={`px-4 py-2 ${
                activeTab === "events"
                  ? "bg-gold text-redlink font-bold"
                  : "text-gold hover:bg-redlink"
              }`}
            >
              Événements
            </button>
            <button
              onClick={() => setActiveTab("artists")}
              className={`px-4 py-2 ${
                activeTab === "artists"
                  ? "bg-gold text-redlink font-bold"
                  : "text-gold hover:bg-redlink"
              }`}
            >
              Tatoueurs Vacataires
            </button>
          </div>

          {/* Section Événements */}
          {activeTab === "events" && (
            <>
              <div className="mb-8 z-10">
                <button
                  onClick={() => setShowEventForm(!showEventForm)}
                  className="bg-gold text-redlink px-4 py-2 rounded mb-4"
                >
                  {showEventForm
                    ? "Masquer le formulaire"
                    : "Ajouter un événement"}
                </button>

                {showEventForm && (
                  <EventForm
                    onSuccess={() => {
                      fetchEvents();
                      setShowEventForm(false);
                    }}
                  />
                )}
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gold">
                  Liste des événements
                </h2>

                {loading ? (
                  <p className="text-gray-500">Chargement des événements...</p>
                ) : events.length === 0 ? (
                  <p className="text-gray-500">Aucun événement trouvé.</p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className="overflow-hidden shadow-md bg-gold"
                      >
                        {event.image && (
                          <div className="h-48 overflow-hidden">
                            <Image
                              src={event.image}
                              alt={event.title}
                              width={400}
                              height={200}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <div className="p-4">
                          <h3 className="text-xl font-bold mb-2 text-redlink">
                            {event.title}
                          </h3>
                          <p className="text-redlink mb-1">
                            <span className="font-medium">Date:</span>{" "}
                            {formatDate(event.time)}
                          </p>
                          <p className="text-redlink mb-1">
                            <span className="font-medium">Durée:</span>{" "}
                            {event.duration} minutes
                          </p>
                          <p className="text-redlink mb-3">
                            <span className="font-medium">Lieu:</span>{" "}
                            {event.location}
                          </p>
                          <p className="text-redlink mb-3">
                            <span className="font-medium">Lieu:</span>{" "}
                            {event.adresse}
                          </p>

                          <div className="flex justify-end mt-4">
                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className="bg-redlink text-gold px-3 py-1 rounded text-sm"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Section Tatoueurs Vacataires */}
          {activeTab === "artists" && (
            <>
              <div className="mb-8 z-10">
                <button
                  onClick={() => setShowArtistForm(!showArtistForm)}
                  className="bg-gold text-redlink px-4 py-2 rounded mb-4"
                >
                  {showArtistForm
                    ? "Masquer le formulaire"
                    : "Ajouter un tatoueur"}
                </button>

                {showArtistForm && (
                  <TattooArtistForm
                    onSuccess={() => {
                      fetchTattooArtists();
                      setShowArtistForm(false);
                    }}
                  />
                )}
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gold">
                  Liste des tatoueurs vacataires
                </h2>
                {loadingArtists ? (
                  <p className="text-gray-500">Chargement des tatoueurs...</p>
                ) : tattooArtists.length === 0 ? (
                  <p className="text-gray-500">Aucun tatoueur trouvé.</p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {tattooArtists.map((artist) => (
                      <div
                        key={artist.id}
                        className="overflow-hidden shadow-md bg-gold"
                      >
                        <div className="p-4">
                          <h3 className="text-xl font-bold mb-2 text-redlink">
                            {artist.name}
                          </h3>
                          <p className="text-redlink mb-1">
                            <span className="font-medium">Style:</span>{" "}
                            {artist.Style}
                          </p>

                          <p className="text-redlink mb-1">
                            <span className="font-medium">Technique:</span>{" "}
                            {artist.Technique}
                          </p>

                          <div className="mt-2 mb-3">
                            <p className="font-medium text-redlink">
                              Description:
                            </p>
                            <p className="text-redlink text-sm">
                              {artist.Description}
                            </p>
                          </div>

                          <div className="mt-2 mb-3">
                            <p className="font-medium text-redlink">Liens:</p>
                            <ul className="list-disc list-inside text-sm">
                              {artist.facebookLink && (
                                <li className="text-redlink truncate">
                                  <a
                                    href={artist.facebookLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-800 hover:underline"
                                  >
                                    {artist.facebookLink}
                                  </a>
                                </li>
                              )}
                              {artist.instagramLink && (
                                <li className="text-redlink truncate">
                                  <a
                                    href={artist.instagramLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-800 hover:underline"
                                  >
                                    {artist.instagramLink}
                                  </a>
                                </li>
                              )}
                              {artist.websiteLink && (
                                <li className="text-redlink truncate">
                                  <a
                                    href={artist.websiteLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-800 hover:underline"
                                  >
                                    {artist.websiteLink}
                                  </a>
                                </li>
                              )}
                            </ul>
                          </div>

                          <div className="flex justify-end mt-4">
                            <button
                              onClick={() => handleDeleteArtist(artist.id)}
                              className="bg-redlink text-gold px-3 py-1 rounded text-sm"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
