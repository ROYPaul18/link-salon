"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../ui/header";
import Footer from "../ui/footer";

// Interface pour les événements
interface Event {
  id: string;
  title: string;
  time: string;
  duration: number;
  location: string;
  image: string;
  adresse: string;
}

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchEvents();
  }, []);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const jour = date.toLocaleDateString("fr-FR", options);
    const heureDebut = `${date.getHours()}h${
      date.getMinutes() === 0 ? "00" : date.getMinutes()
    }`;

    const dateFin = new Date(date.getTime());
    const event = events.find((event) => event.id === dateString);
    const duree = event?.duration || 120;
    dateFin.setMinutes(dateFin.getMinutes() + duree);
    const heureFin = `${dateFin.getHours()}h${
      dateFin.getMinutes() === 0 ? "00" : dateFin.getMinutes()
    }`;

    return `${jour} ${heureDebut}-${heureFin}`;
  };

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.time);
    const now = new Date();
    return filter === "upcoming" ? eventDate >= now : eventDate < now;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="fixed inset-0 z-0">
        <Image
          src="/img/bg.jpeg"
          alt="Background image"
          fill
          priority
          className="object-fit fixed top-0 left-0 z-0"
        />
      </div>

      <main className="relative z-10 min-h-screen pt-20 md:pt-32">
        <div className="relative z-10 py-16 px-4 max-w-6xl mx-auto">
          <h1 className="text-center font-rehat text-gold text-6xl 2xl:text-8xl mb-10">
            Événements
          </h1>

          <div className="flex justify-center gap-4 mb-10">
            <button
              onClick={() => setFilter("upcoming")}
              className={`px-3 py-1 2xl:px-6 2xl:py-2 border font-rehat ${
                filter === "upcoming"
                  ? "bg-gold text-redlink border-gold"
                  : "bg-transparent text-gold border-gold hover:bg-gold/10"
              } transition-all font-script text-xl`}
            >
              À venir
            </button>
            <button
              onClick={() => setFilter("past")}
              className={`px-3 py-1 2xl:px-6 2xl:py-2 border font-rehat ${
                filter === "past"
                  ? "bg-gold text-redlink border-gold"
                  : "bg-transparent text-gold border-gold hover:bg-gold/10"
              } transition-all font-script text-xl`}
            >
              Passés
            </button>
          </div>

          <div className="space-y-6">
            {loading ? (
              <p className="text-center text-gold">
                Chargement des événements...
              </p>
            ) : filteredEvents.length === 0 ? (
              <p className="text-center text-gold">
                Aucun événement {filter === "upcoming" ? "à venir" : "passé"}{" "}
                pour le moment.
              </p>
            ) : (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col md:flex-row bg-gold overflow-hidden"
                >
                  <div className="w-full md:w-2/5 min-h-[200px] bg-gray-200 relative">
                    {event.image ? (
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        src="/img/test.png"
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="w-full md:w-4/5 p-6">
                    <p className="text-redlink text-xl 2xl:text-2xl font-medium font-rehat">
                      {formatDateTime(event.time)}
                    </p>
                    <h2 className="text-redlink font-rehat text-2xl 2xl:text-2xl font-script mt-8 mb-8">
                      {event.title}
                    </h2>
                    <p className="text-redlink font-rehat text-xl 2xl:text-2xl">
                      {event.location} / {event.adresse}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage;
