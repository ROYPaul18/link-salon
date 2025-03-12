"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EventForm from "@/app/ui/form/EventForm";
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
}

export default function Dashboard() {
  const [isAuth, setIsAuth] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = sessionStorage.getItem("admin-auth");
    if (!auth) {
      router.push("/admin");
    } else {
      setIsAuth(true);
      fetchEvents();
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

          <div className="mb-8 z-10">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-gold text-redlink px-4 py-2 rounded mb-4"
            >
              {showForm ? "Masquer le formulaire" : "Ajouter un événement"}
            </button>

            {showForm && (
              <EventForm
                onSuccess={() => {
                  fetchEvents();
                  setShowForm(false);
                }}
              />
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gold">Liste des événements</h2>

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
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="p-4">
                      <h3 className="text-xl font-bold mb-2 text-redlink">{event.title}</h3>
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
        </div>
      </div>
      
      <Footer />
    </div>
  );
}