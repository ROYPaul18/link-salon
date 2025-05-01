"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../../ui/header";
import Footer from "../../ui/footer";
import Link from "next/link";
import { useParams } from "next/navigation";
import DevisSimulator from "@/app/ui/form/Estimation";

// Define types for our data structures
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

const ArtistPage = () => {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const [mounted, setMounted] = useState(false);
  const [apiArtists, setApiArtists] = useState<TattooArtist[]>([]);
  const [apiLoading, setApiLoading] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch API tattoo artists when needed
  useEffect(() => {
    if (!mounted || slug !== "autres") return;

    const fetchTattooArtists = async () => {
      try {
        setApiLoading(true);
        const response = await fetch("/api/tatoueur");

        if (!response.ok) {
          throw new Error(`Erreur: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setApiArtists(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des tatoueurs:", err);
      } finally {
        setApiLoading(false);
      }
    };

    fetchTattooArtists();
  }, [mounted, slug]);

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
        "/img/axel/tat4.jpg",
        "/img/chloe/tat1.jpg",
        "/img/axel/tat2.jpg",
        "/img/axel/tat3.jpg",
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
        "/img/axel/tat4.jpg",
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
        <Image
          src="/img/bg.jpeg"
          alt="Background image"
          fill
          priority
          className="object-fit fixed top-0 left-0 z-0"
        />
        <Header />
        <main className="relative z-10 min-h-screen flex items-center justify-center">
          <p className="text-gold text-xl">Chargement...</p>
        </main>
        <Footer />
      </div>
    );
  }
  const artistData: ArtistData =
    slug in artistsData
      ? artistsData[slug]
      : {
          name: "Artiste",
          description: "Information non disponible",
          contacts: [],
          image: "/img/axel.png",
          gallery: [
            "/img/test.png",
            "/img/test.png",
            "/img/test.png",
            "/img/test.png",
            "/img/test.png",
          ],
        };

  // Formatter la description avec des sauts de ligne
  const formattedDescription = artistData.description
    .split("\n")
    .map((line: string, index: number) => (
      <React.Fragment key={index}>
        {line}
        {index < artistData.description.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  if (slug === "autres") {
    return (
      <div className="relative min-h-screen w-full">
        <Image
          src="/img/bg.jpeg"
          alt="Background image"
          fill
          priority
          className="object-fit fixed top-0 left-0 z-0"
        />
        <Header />
        <main className="relative z-10 min-h-screen pt-20 md:pt-32">
          {apiLoading ? (
            <div className="flex items-center justify-center min-h-screen">
              <p className="text-gold text-xl">Chargement des tatoueurs...</p>
            </div>
          ) : (
            <section className="flex flex-col gap-12 px-4 sm:px-8 md:px-16 mt-8 mb-12">
              {apiArtists && apiArtists.length > 0 ? (
                apiArtists.map((artist, index) => (
                  <div key={artist.id || index} className="mb-12">
                    {/* Section principale avec image et texte */}
                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-8">
                      {/* Image principale */}
                      <div className="w-full md:w-6/12">
                        <div className="w-full aspect-[4/3] relative">
                          <Image
                            src={artist.profilPic || "/img/default-artist.png"}
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
                        <h1 className="text-3xl md:text-5xl 2xl:text-8xl font-artisual-deco mb-4 md:mb-6">
                          {artist.name}
                        </h1>
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
                    Aucun tatoueur disponible pour le moment.
                  </p>
                </div>
              )}
            </section>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  // Render standard pour les autres artistes (gael, axelle, chloe)
  return (
    <div className="relative min-h-screen w-full">
      <Image
        src="/img/bg.jpeg"
        alt="Background image"
        fill
        priority
        className="object-fit fixed top-0 left-0 z-0"
      />
      <Header />
      <main className="relative z-10 min-h-screen pt-20 md:pt-32">
        <section className="flex flex-col gap-6 md:gap-12 px-4 sm:px-8 md:px-16 mt-4 md:mt-8">
          {/* Top section with main image and text */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            {/* Left side - Main image */}
            <div className="w-full md:w-6/12">
              <div className="w-full aspect-[4/3] relative">
                <Image
                  src={artistData.image}
                  alt={`Image de ${artistData.name}`}
                  width={1000}
                  height={1000}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            {/* Right side - Text content */}
            <div className="w-full md:w-6/12 text-gold flex flex-col justify-between">
              <h1 className="text-3xl md:text-5xl 2xl:text-8xl font-artisual-deco mb-4 md:mb-6">
                {artistData.name}
              </h1>
              <p className="font-alte mb-4 md:mb-8 leading-relaxed text-base md:text-xl 2xl:text-4xl">
                {formattedDescription}
              </p>
              <div className="flex flex-wrap gap-4 font-rehat text-base md:text-xl 2xl:text-4xl">
                {artistData.contacts.map(
                  (contact: ContactInfo, index: number) => {
                    // Déterminer le type de lien
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
                  }
                )}
              </div>
            </div>
          </div>
          {/* Bottom section with gallery images */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-12">
            {artistData.gallery.map((imageSrc: string, index: number) => (
              <div key={index} className="aspect-square relative">
                <Image
                  src={imageSrc}
                  alt={`Travail de ${artistData.name} - ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-fit"
                />
              </div>
            ))}
          </div>
          {slug === "gael" && (
            <div className="flex flex-col md:flex-row gap-8">
              {/* Section DevisSimulator */}
              <div className="w-full md:w-1/2">
                <h1 className="font-rehat text-gold text-4xl md:text-6xl 2xl:text-8xl mb-6 md:mb-10">
                  Estimation du projet
                </h1>
                <DevisSimulator />
              </div>

              {/* Section Paiement */}
              <div className="w-full md:w-1/2 flex flex-col">
                <h1 className="font-rehat text-gold text-4xl md:text-6xl 2xl:text-8xl mb-6 md:mb-10">
                  Régler les arrhes
                </h1>
                <p className="font-rehat text-gold text-base md:text-xl 2xl:text-4xl mb-4">
                  (toute annulation moins de 14 jours avant la séance entraînera
                  la perte des arrhes, ou une majoration de 10% du prix du
                  projet. Le règlement par ce lien vaut pour accord du
                  règlement.)
                </p>

                {/* Boutons de paiement SumUp - alignés en bas */}
                <div className="mt-auto flex flex-col gap-4">
                  <Link
                    href="https://pay.sumup.com/b2c/QB7J4I1V"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gold text-redlink font-rehat py-3 px-6 text-center text-xl hover:bg-opacity-90 transition-colors"
                  >
                    Payer avec SumUp (50€)
                  </Link>
                  <Link
                    href="https://pay.sumup.com/b2c/QUE4OZTP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gold text-redlink font-rehat py-3 px-6 text-center text-xl hover:bg-opacity-90 transition-colors"
                  >
                    Payer avec SumUp (100€)
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ArtistPage;
