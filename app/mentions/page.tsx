"use client";
import React from "react";
import Header from "../ui/header";
import Footer from "../ui/footer";
import Image from "next/image";

const LegalMentions = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <Image
        src="/img/bg.jpeg"
        alt="Background image"
        fill
        className="object-cover fixed top-0 left-0 z-0"
        priority
        sizes="100vw"
      />
      <Header />
      <main className="relative z-10 min-h-screen pt-20 md:pt-32 px-4 md:px-12 2xl:px-20">
        <section className="max-w-4xl mx-auto py-12 space-y-12">
          <h1 className="text-5xl 2xl:text-8xl font-artisual-deco text-gold mb-8">
            Mentions légales
          </h1>

          {/* Éditeur */}
          <section>
            <h2 className="text-2xl font-artisual-deco text-gold mb-2">Éditeur du site</h2>
            <p className="font-alte text-gold text-lg leading-relaxed">
              Raison sociale : L’ink<br />
              Forme juridique : SASU<br />
              Capital social : 1 000 euros<br />
              Siège social : 7 rue de la mairie, 18340 Soye-en-Septaine, France<br />
              SIRET : 911 097 343 00022<br />
              TVA intracommunautaire : FR45 911097343<br />
              RCS : Bourges B 911 097 343<br />
              Représentant légal / Directeur de la publication : Monsieur Gaël Defontaine<br />
              Téléphone : 06 15 95 64 05<br />
              Email : <a href="mailto:gael.tatouage@gmail.com" className="underline">gael.tatouage@gmail.com</a>
            </p>
          </section>

          {/* Hébergement */}
          <section>
            <h2 className="text-2xl font-artisual-deco text-gold mb-2">Hébergement du site</h2>
            <p className="font-alte text-gold text-lg leading-relaxed">
              Vercel Inc.<br />
              440 N Barranca Ave #4133<br />
              Covina, CA 91723, États-Unis<br />
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                https://vercel.com
              </a>
            </p>
          </section>

          {/* Domaine */}
          <section>
            <h2 className="text-2xl font-artisual-deco text-gold mb-2">Nom de domaine</h2>
            <p className="font-alte text-gold text-lg leading-relaxed">
              IONOS SARL<br />
              7 place de la Gare, BP 70109<br />
              57201 Sarreguemines Cedex<br />
              <a
                href="https://www.ionos.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                https://www.ionos.fr
              </a>
            </p>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-2xl font-artisual-deco text-gold mb-2">Propriété intellectuelle</h2>
            <p className="font-alte text-gold text-lg leading-relaxed">
              L’ensemble du contenu présent sur ce site (textes, images, graphismes, logo, icônes, etc.)
              est la propriété exclusive de L’ink, sauf mention contraire. Toute reproduction,
              représentation, modification, publication, adaptation de tout ou partie des éléments
              du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.
            </p>
          </section>

          {/* Responsabilité */}
          <section>
            <h2 className="text-2xl font-artisual-deco text-gold mb-2">Responsabilité</h2>
            <p className="font-alte text-gold text-lg leading-relaxed">
              L’ink ne pourra être tenue responsable des dommages directs et indirects causés
              au matériel de l’utilisateur lors de l’accès au site. Le site peut contenir des liens
              vers d'autres sites ; L’ink décline toute responsabilité quant au contenu de ces sites externes.
            </p>
          </section>

          {/* Conception */}
          <section>
            <h2 className="text-2xl font-artisual-deco text-gold mb-2">Conception et développement</h2>
            <p className="font-alte text-gold text-lg leading-relaxed">
              Site conçu et développé par Paul Roy<br />
              📧 <a href="mailto:roypaul.18.pro@gmail.com" className="underline">roypaul.18.pro@gmail.com</a>
            </p>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LegalMentions;
