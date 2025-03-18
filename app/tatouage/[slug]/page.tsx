'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../../ui/header";
import Footer from "../../ui/footer";
import Link from "next/link";
import { useParams } from "next/navigation";

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
  gallery: string[]; // Array of image paths
}

interface ArtistsDataMap {
  [key: string]: ArtistData;
}

const ArtistPage = () => {
  const params = useParams();
  const slug = params.slug;
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Données des artistes
  const artistsData: ArtistsDataMap = {
    gael: {
      name: "Gaël",
      description: "Artiste tatoueur depuis 2019\nStyle : Asiatique, celtique et animalier\nTechnique possible : Noir et gris, couleur, cover lourd\nCertifié Label Cosmét'Ink : la prise en charge de vos soins post tattoo est comprise dans votre prestation tatouage.\nPlusieurs prix remportés lors de convention de tatouage\nAccepte de tatouer les mineurs de plus de 16 ans, avec autorisation parentale",
      contacts: [
        { type: "facebook", label: "Facebook", url: "https://www.facebook.com/linksalondetatouage?" },
        { type: "instagram", label: "Instagram", url: "https://www.instagram.com/gael_linktatouage?igsh=MTViZXRsaW1tMG1zdA==&utm_source=qr" },
        { type: "email", label: "Email", url: "gael.tatouage@gmail.com" }
      ],
      image: "/img/gael.png",
      gallery: [
        "/img/gael/img1.jpeg",
        "/img/gael/img2.jpeg",
        "/img/gael/img3.jpeg",
        "/img/gael/img4.jpeg",
        "/img/gael/img5.jpeg"
      ]
    },
    axelle: {
      name: "Axelle",
      description: "Artiste tatoueuse depuis 2019\nStyle : végétal, ornemental et animalier\nCréations personnalisées\nTechnique possible : Noir et gris, couleur, cover, recouvrement de cicatrices et vergetures",
      contacts: [
        { type: "instagram", label: "Instagram", url: "https://www.instagram.com/axelletattoo?igsh=MTFtYm13NjZ2MndraA==" },
        { type: "email", label: "Email", url: "tattooaxelle@gmail.com" }
      ],
      image: "/img/axel.png",
      gallery: [
        "/img/axel/tat1.jpg",
        "/img/axel/tat2.jpg",
        "/img/axel/tat3.jpg",
        "/img/axel/tat4.jpg",
        "/img/axel/tat5.jpg"
      ]
    },
    chloe: {
      name: "Chloé / Beaudy Ink",
      description: "Nail artiste depuis 2018, artiste tatoueuse depuis 2021\nStyle : Fantasy, Disney, floral\nTechnique possible : Noir et gris, couleur",
      contacts: [
        { type: "facebook", label: "Facebook", url: "https://www.facebook.com/profile.php?id=100072912670661" },
        { type: "instagram", label: "Instagram", url: "https://www.instagram.com/beaudy_ink_tattoo?igsh=MWwwczB5ZmFudjJjbQ==" },
        { type: "website", label: "Site web", url: "https://www.beaudy-ink.com" }
      ],
      image: "/img/chloe.png",
      gallery: [
        "/img/chloe/tat1.jpg",
        "/img/chloe/tat2.jpg",
        "/img/chloe/tat3.jpg",
        "/img/chloe/tat4.jpg",
        "/img/chloe/tat5.jpg"
      ]
    },
    autres: {
      name: "Autres artistes",
      description: "Découvrez nos autres artistes invités et collaborateurs qui travaillent occasionnellement dans notre studio.",
      contacts: [],
      image: "/img/piercing.png",
      gallery: [
        "/img/test.png",
        "/img/test.png",
        "/img/test.png",
        "/img/test.png",
        "/img/test.png"
      ]
    }
  };
  // Don't render content until client-side mounting is complete
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

  // Récupérer les données de l'artiste sélectionné ou utiliser des valeurs par défaut
  const artistData: ArtistData = typeof slug === 'string' && slug in artistsData
    ? artistsData[slug]
    : {
      name: "Artiste",
      description: "Information non disponible",
      contacts: [],
      image: "/img/axel.png",
      gallery: ["/img/test.png", "/img/test.png", "/img/test.png", "/img/test.png", "/img/test.png"]
    };

  // Formatter la description avec des sauts de ligne
  const formattedDescription = artistData.description.split('\n').map((line: string, index: number) => (
    <React.Fragment key={index}>
      {line}
      {index < artistData.description.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

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
      <main className="relative z-10 min-h-screen">
        <section className="flex flex-col gap-6 md:gap-12 px-4 sm:px-8 md:px-16 mt-4 md:mt-8">
          {/* Top section with main image and text */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            {/* Left side - Main image */}
            <div className="w-full md:w-6/12">
              <div className="w-full aspect-[4/3] relative">
                <Image
                  src={artistData.image}
                  alt={`Image de ${artistData.name}`}
                  fill
                  className="object-fit"
                />
              </div>
            </div>
            {/* Right side - Text content */}
            <div className="w-full md:w-6/12 text-gold flex flex-col justify-between">
              <h1 className="text-3xl md:text-5xl 2xl:text-8xl font-artisual-deco mb-4 md:mb-6">
                {artistData.name}
              </h1>
              <p className="font-reglarik mb-4 md:mb-8 leading-relaxed text-base md:text-xl 2xl:text-4xl">
                {formattedDescription}
              </p>
              <div className="flex flex-wrap gap-4 font-rehat text-base md:text-xl 2xl:text-4xl">
                {artistData.contacts.map((contact: ContactInfo, index: number) => {
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
                })}
              </div>
            </div>
          </div>
          {/* Bottom section with gallery images */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-12">
            {artistData.gallery.map((imageSrc, index) => (
              <div key={index} className="aspect-square relative">
                <Image
                  src={imageSrc}
                  alt={`Travail de ${artistData.name} - ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ArtistPage;