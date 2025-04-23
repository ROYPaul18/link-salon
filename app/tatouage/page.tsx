"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../ui/header";
import Footer from "../ui/footer";
import Link from "next/link";
import DevisSimulator from "@/app/ui/form/Estimation";

// Définir les types pour les données
interface ContactInfo {
  type: string;
  label: string;
  url: string;
}

interface ArtistData {
  name: string;
  description: string;
  contacts: ContactInfo[];
  image: string;
  gallery: string[];
}

interface ArtistsDataMap {
  [key: string]: ArtistData;
}

interface TattooArtist {
  id: number;
  name: string;
  Description: string;
  Technique: string;
  Style: string;
  facebookLink: string | null;
  instagramLink: string | null;
  websiteLink: string | null;
  profilPic: string;
  workPics: string[];
}

// Interfaces pour PayPal
interface PayPalOrderData {
  purchase_units: Array<{
    description: string;
    amount: {
      value: string;
      currency_code: string;
    };
  }>;
  application_context?: {
    shipping_preference: string;
  };
}

interface PayPalActions {
  order: {
    create: (orderData: PayPalOrderData) => Promise<string>;
    capture: () => Promise<Record<string, unknown>>;
  };
}

interface PayPalData {
  orderID?: string;
  [key: string]: unknown;
}

const Page = () => {
  const [mounted, setMounted] = useState(false);
  const [amount, setAmount] = useState(50); // Montant par défaut pour les arrhes
  const [apiArtists, setApiArtists] = useState<TattooArtist[]>([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [activeArtist, setActiveArtist] = useState<string | null>(null);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch API tattoo artists
  useEffect(() => {
    if (!mounted) return;

    const fetchTattooArtists = async () => {
      try {
        setApiLoading(true);
        const response = await fetch("/api/tatoueur");

        if (!response.ok) {
          throw new Error(`Erreur: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Tatoueurs:", data);
        setApiArtists(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des tatoueurs:", err);
      } finally {
        setApiLoading(false);
      }
    };

    fetchTattooArtists();
  }, [mounted]);

  // Script PayPal pour le bouton de paiement
  useEffect(() => {
    if (!mounted || activeArtist !== "gael") return;

    // Supprime tout script PayPal existant pour éviter les doublons
    const existingScript = document.getElementById("paypal-script");
    if (existingScript) {
      existingScript.remove();
    }

    // Crée et ajoute le nouveau script PayPal
    const script = document.createElement("script");
    script.id = "paypal-script";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ASMZTL9ga3WDTk72pnLjRzt4puDA-VD6g_llf4BB5ckQ3Oqn38uJwgblg2yMpQxtK93fbEcyeHsIBUKs&currency=EUR&components=buttons,funding-eligibility,payment-fields";
    script.async = true;

    script.onload = () => {
      if (window.paypal) {
        // Bouton de paiement standard (paiement immédiat)
        window.paypal
          .Buttons({
            style: {
              layout: "vertical",
              color: "gold",
              shape: "rect",
              label: "paypal",
              height: 40,
            },
            createOrder: function (data: PayPalData, actions: PayPalActions) {
              return actions.order.create({
                purchase_units: [
                  {
                    description: `Arrhes pour séance de tatouage avec ${activeArtist}`,
                    amount: {
                      value: amount.toString(),
                      currency_code: "EUR",
                    },
                  },
                ],
                application_context: {
                  shipping_preference: "NO_SHIPPING",
                },
              });
            },
            onApprove: function (data: PayPalData, actions: PayPalActions) {
              return actions.order.capture().then(function () {
                alert("Paiement réussi! Merci pour votre réservation.");
              });
            },
            onError: function (err: Error) {
              console.error("Erreur lors du paiement:", err);
              alert(
                "Une erreur est survenue lors du paiement. Veuillez réessayer."
              );
            },
          })
          .render("#paypal-button-container");
      }
    };

    document.body.appendChild(script);
  }, [mounted, amount, activeArtist]);

  // Script PayPal pour le message d'information sur le paiement en 4 fois
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/ppcredit/messaging/code?layout=text&logo-type=inline&text-color=black&country.x=FR&locale.x=en_FR";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Script PayPal pour le bouton de paiement
  useEffect(() => {
    if (mounted) {
      // Supprime tout script PayPal existant pour éviter les doublons
      const existingScript = document.getElementById("paypal-script");
      if (existingScript) {
        existingScript.remove();
      }

      // Crée et ajoute le nouveau script PayPal
      const script = document.createElement("script");
      script.id = "paypal-script";
      script.src =
        "https://www.paypal.com/sdk/js?client-id=ASMZTL9ga3WDTk72pnLjRzt4puDA-VD6g_llf4BB5ckQ3Oqn38uJwgblg2yMpQxtK93fbEcyeHsIBUKs&currency=EUR&components=buttons,funding-eligibility,payment-fields";
      script.async = true;

      script.onload = () => {
        if (window.paypal) {
          // Bouton de paiement standard (paiement immédiat)
          window.paypal
            .Buttons({
              style: {
                layout: "vertical",
                color: "gold",
                shape: "rect",
                label: "paypal",
                height: 40,
              },
              createOrder: function (data: PayPalData, actions: PayPalActions) {
                return actions.order.create({
                  purchase_units: [
                    {
                      description: "Arrhes pour séance de tatouage avec",
                      amount: {
                        value: amount.toString(),
                        currency_code: "EUR",
                      },
                    },
                  ],
                  application_context: {
                    shipping_preference: "NO_SHIPPING",
                  },
                });
              },
              onApprove: function (data: PayPalData, actions: PayPalActions) {
                return actions.order.capture().then(function () {
                  alert("Paiement réussi! Merci pour votre réservation.");
                });
              },
              onError: function (err: Error) {
                console.error("Erreur lors du paiement:", err);
                alert(
                  "Une erreur est survenue lors du paiement. Veuillez réessayer."
                );
              },
            })
            .render("#paypal-button-container");
        }
      };

      document.body.appendChild(script);
    }
  }, [mounted, amount]);


  // Données des artistes
  const artistsData: ArtistsDataMap = {
    gael: {
      name: "Gaël",
      description:
        "Artiste tatoueur depuis 2019\nStyle : Asiatique, celtique et animalier\nTechnique possible : Noir et gris, couleur, cover lourd\nCertifié Label Cosmét'Ink : la prise en charge de vos soins post tattoo est comprise dans votre prestation tatouage.\nPlusieurs prix remportés lors de convention de tatouage\nAccepte de tatouer les mineurs de plus de 16 ans, avec autorisation parentale",
      contacts: [
        {
          type: "facebook",
          label: "Facebook",
          url: "https://www.facebook.com/linksalondetatouage?",
        },
        {
          type: "instagram",
          label: "Instagram",
          url: "https://www.instagram.com/gael_linktatouage?igsh=MTViZXRsaW1tMG1zdA==&utm_source=qr",
        },
        { type: "email", label: "Email", url: "gael.tatouage@gmail.com" },
      ],
      image: "/img/gael.png",
      gallery: [
        "/img/gael/img1.jpeg",
        "/img/gael/img2.jpeg",
        "/img/gael/img3.jpeg",
        "/img/gael/img4.jpeg",
        "/img/gael/img5.jpeg",
      ],
    },
    axelle: {
      name: "Axelle",
      description:
        "Artiste tatoueuse depuis 2019\nStyle : végétal, ornemental et animalier\nCréations personnalisées\nTechnique possible : Noir et gris, couleur, cover, recouvrement de cicatrices et vergetures",
      contacts: [
        {
          type: "instagram",
          label: "Instagram",
          url: "https://www.instagram.com/axelletattoo?igsh=MTFtYm13NjZ2MndraA==",
        },
        { type: "email", label: "Email", url: "tattooaxelle@gmail.com" },
      ],
      image: "/img/axel.png",
      gallery: [
        "/img/axel/tat1.jpg",
        "/img/axel/tat2.jpg",
        "/img/axel/tat3.jpg",
        "/img/axel/tat4.jpg",
        "/img/axel/tat5.jpg",
      ],
    },
    chloe: {
      name: "Chloé / Beaudy Ink",
      description:
        "Nail artiste depuis 2018, artiste tatoueuse depuis 2021\nStyle : Fantasy, Disney, floral\nTechnique possible : Noir et gris, couleur",
      contacts: [
        {
          type: "facebook",
          label: "Facebook",
          url: "https://www.facebook.com/profile.php?id=100072912670661",
        },
        {
          type: "instagram",
          label: "Instagram",
          url: "https://www.instagram.com/beaudy_ink_tattoo?igsh=MWwwczB5ZmFudjJjbQ==",
        },
        {
          type: "website",
          label: "Site web",
          url: "https://www.beaudy-ink.com",
        },
      ],
      image: "/img/chloe.png",
      gallery: [
        "/img/chloe/tat1.jpg",
        "/img/chloe/tat2.jpg",
        "/img/chloe/tat3.jpg",
        "/img/chloe/tat4.jpg",
        "/img/chloe/tat5.jpg",
      ],
    },
  };

  if (!mounted) {
    return (
      <div className="relative min-h-screen w-full">
        <video
          src="/video/tattoo.mp4"
          className="absolute top-0 left-0 w-full h-[100vh] object-cover -z-10"
          loop
          autoPlay
          muted
          playsInline
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 -z-10"></div>
        <Header />
        <main className="relative z-10 min-h-screen flex items-center justify-center">
          <p className="text-gold text-xl">Chargement...</p>
        </main>
        <Footer />
      </div>
    );
  }

  // Formatter la description avec des sauts de ligne
  const formatDescription = (description: string) => {
    return description.split("\n").map((line: string, index: number) => (
      <React.Fragment key={index}>
        {line}
        {index < description.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {/* Vidéo de fond */}
      <video
        src="/video/tattoo.mp4"
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        loop
        autoPlay
        muted
        playsInline
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 -z-10"></div>
      <Header />

      <main className="flex-grow relative z-10 min-h-screen pt-28 md:pt-36">
        <div className="container mx-auto px-4">
          {/* Section tatoueurs fixes (Gael, Axelle, Chloé) */}
          {Object.keys(artistsData).map((artistKey) => {
            const artist = artistsData[artistKey];
            return (
              <div key={artistKey} className="mb-24">
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-8">
                  {/* Image principale */}
                  <div className="w-full md:w-6/12">
                    <div className="w-full aspect-[4/3] relative">
                      <Image
                        src={artist.image}
                        alt={`Image de ${artist.name}`}
                        width={1000}
                        height={1000}
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                  {/* Texte descriptif */}
                  <div className="w-full md:w-6/12 text-gold flex flex-col justify-between">
                    <h2 className="text-3xl md:text-5xl 2xl:text-8xl font-artisual-deco mb-4 md:mb-6">
                      {artist.name}
                    </h2>
                    <div className="font-reglarik mb-4 md:mb-8 leading-relaxed text-base md:text-xl 2xl:text-4xl">
                      {formatDescription(artist.description)}
                    </div>
                    <div className="flex flex-wrap gap-4 font-rehat text-base md:text-xl 2xl:text-4xl">
                      {artist.contacts.map((contact, index) => {
                        if (contact.type === "email") {
                          return (
                            <a
                              key={index}
                              href={`mailto:${contact.url}`}
                              className="text-gold hover:underline"
                            >
                              {contact.label}
                            </a>
                          );
                        } else {
                          return (
                            <Link
                              key={index}
                              href={contact.url}
                              className="text-gold hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {contact.label}
                            </Link>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>

                {/* Galerie d'images */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-12">
                  {artist.gallery.map((imageSrc, index) => (
                    <div key={index} className="aspect-square relative">
                      <Image
                        src={imageSrc}
                        alt={`Travail de ${artist.name} - ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Section de paiement pour Gaël uniquement */}
                {artistKey === "gael" && (
                  <div className="mt-12 flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/2 flex flex-col">
                      <div className="h-full flex flex-col  p-6">
                        <DevisSimulator />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col">
                      <div className="h-full flex flex-col p-6">
                        <h3 className="font-rehat text-gold text-4xl md:text-5xl 2xl:text-6xl mb-6 md:mb-10">
                          Régler les arrhes
                        </h3>
                        <p className="font-rehat text-gold text-base md:text-xl mb-4">
                          (toute annulation moins de 14 jours avant la séance
                          entraînera la perte des arrhes, ou une majoration de
                          10% du prix du projet. Le règlement par ce lien vaut
                          pour accord du règlement.)
                        </p>

                        {/* Sélection du montant */}
                        <div className="mb-6">
                          <label
                            htmlFor="amount"
                            className="font-rehat text-gold text-xl block mb-2"
                          >
                            Montant des arrhes (€):
                          </label>
                          <select
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="bg-redlink text-gold border border-gold p-2 w-full max-w-xs font-rehat"
                            onClick={() => setActiveArtist("gael")}
                          >
                            <option value="50">50 €</option>
                            <option value="100">100 €</option>
                            <option value="150">150 €</option>
                            <option value="200">200 €</option>
                          </select>
                        </div>

                        {/* Message d'information PayPal */}
                        <div
                          id="paypal-credit-message"
                          className="mt-4 mb-6 text-gold"
                        ></div>

                        {/* Boutons de paiement PayPal */}
                        <div className="flex flex-col gap-4 mt-auto">
                          <div
                            id="paypal-button-container"
                            className="max-w-md"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Séparateur entre artistes */}
                <div className="border-b border-gold/30 mt-12"></div>
              </div>
            );
          })}

          {/* Section tatoueurs depuis l'API */}
          <div className="mt-12">
            {apiLoading ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-gold text-xl">Chargement des tatoueurs...</p>
              </div>
            ) : (
              <section className="flex flex-col gap-12">
                {apiArtists && apiArtists.length > 0 ? (
                  apiArtists.map((artist, index) => (
                    <div key={artist.id || index} className="mb-12">
                      {/* Section principale avec image et texte */}
                      <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-8">
                        {/* Image principale */}
                        <div className="w-full md:w-6/12">
                          <div className="w-full aspect-[4/3] relative">
                            <Image
                              src={
                                artist.profilPic || "/img/default-artist.png"
                              }
                              alt={`Image de ${artist.name}`}
                              width={1000}
                              height={1000}
                              className="object-contain"
                            />
                          </div>
                        </div>
                        {/* Texte descriptif */}
                        <div className="w-full md:w-6/12 text-gold flex flex-col justify-between">
                          <h2 className="text-3xl md:text-5xl 2xl:text-8xl font-artisual-deco mb-4 md:mb-6">
                            {artist.name}
                          </h2>
                          <div className="font-reglarik mb-4 md:mb-8 leading-relaxed text-base md:text-xl 2xl:text-4xl">
                            <p className="mb-4">{artist.Description}</p>
                            <p className="mb-4">Style : {artist.Style}</p>
                            <p>Technique : {artist.Technique}</p>
                          </div>
                          <div className="flex flex-wrap gap-4 font-rehat text-base md:text-xl 2xl:text-4xl">
                            {artist.facebookLink && (
                              <Link
                                href={artist.facebookLink}
                                className="text-gold hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Facebook
                              </Link>
                            )}
                            {artist.instagramLink && (
                              <Link
                                href={artist.instagramLink}
                                className="text-gold hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Instagram
                              </Link>
                            )}
                            {artist.websiteLink && (
                              <Link
                                href={artist.websiteLink}
                                className="text-gold hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Site web
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Galerie d'images */}
                      {artist.workPics && artist.workPics.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-12">
                          {artist.workPics.map((imageUrl, imgIndex) => (
                            <div
                              key={imgIndex}
                              className="aspect-square relative"
                            >
                              <Image
                                src={imageUrl}
                                alt={`Travail de ${artist.name} - ${
                                  imgIndex + 1
                                }`}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Séparateur entre artistes */}
                      {index < apiArtists.length - 1 && (
                        <div className="border-b border-gold/30 mt-12"></div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gold text-xl">
                      Aucun tatoueur supplémentaire disponible pour le moment.
                    </p>
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Pour TypeScript, ajoutez la déclaration pour PayPal
declare global {
  interface Window {
    paypal: {
      
      Buttons: (config: any) => {
        render: (containerId: string) => void;
      };
    };
  }
}

export default Page;