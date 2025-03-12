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

      <div className="relative flex-grow">
        <div className="relative z-10 py-16 px-4 max-w-6xl mx-auto">
          <h1 className="text-center font-artisual-deco text-gold text-4xl 2xl:text-8xl mb-10">
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
                  <div className="w-full md:w-1/5 min-h-[180px] bg-gray-200 relative">
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
                    <p className="text-redlink font-medium font-rehat">
                      {formatDateTime(event.time)}
                    </p>
                    <h2 className="text-redlink font-rehat text-2xl font-script mt-8 mb-8">
                      {event.title}
                    </h2>
                    <p className="text-redlink font-rehat">{event.location}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;
