"use client";
import React from "react";
import Header from "../ui/header";
import Footer from "../ui/footer";
import Image from "next/image";
import "../globals.css";

const Page = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <Image
        src="/img/bg.jpeg"
        alt="Background image"
        fill
        className="object-fit fixed top-0 left-0 z-0"
        priority
        sizes="100vw"
      />
      <Header />
      <main className="relative z-10 min-h-screen">
        {/* Section harmonisée - celle-ci reste identique */}
        <section className="flex flex-col-reverse md:flex-row justify-between md:space-x-2 min-h-[50vh] md:min-h-[60vh] mt-6 md:mt-12 ml-0 md:ml-12 ">
          <div className="w-full md:w-1/3 my-8  md:mb-0 text-left md:text-left px-4 ">
            <h1 className="text-5xl md:text-5xl 2xl:text-8xl font-artisual-deco text-gold sm:my-4 mb-4 md:mb-8">
              Salon de thé
            </h1>
            <p className="font-reglarik text-gold text-base md:text-2xl 2xl:text-3xl leading-relaxed max-w-xl mx-auto md:mx-0">
              Détendez-vous au milieu des plantes et profitez d&apos;un instant
              calme, hors du temps. Le salon en libre accès vous propose :
            </p>
          </div>
          <div className="w-full md:w-2/3 flex justify-center">
            <video
              src="/video/salon.mp4"
              loop
              className="w-full h-auto object-cover"
              autoPlay
              muted
              disablePictureInPicture
              playsInline
            />
          </div>
        </section>

        <div className="px-4 md:px-12 2xl:px-20 space-y-16 md:space-y-24">
          {/* #1 - Sections augmentées */}
          <section className="flex flex-col md:flex-row justify-between my-16 md:my-20">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center md:justify-start">
              {/* Image size increased */}
              <div className="w-full">
                <Image
                  src={"/img/test.png"}
                  width={800}
                  height={800}
                  alt="photo du salon"
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pl-12 flex flex-col ">
              <h1 className="text-5xl 2xl:text-8xl font-artisual-deco text-gold mb-6 md:mb-10 text-left">
                Boissons non alcoolisées
              </h1>
              <p className="font-reglarik text-gold text-lg md:text-xl 2xl:text-3xl leading-relaxed">
                Faites couler une boisson chaude (café, cappuccino, thé,…) ou
                désaltérez-vous avec un soda dans le réfrigérateur. Puis laissez
                votre paiement dans la tirelire sur le comptoir et
                n&apos;hésitez pas à récupérer votre monnaie !
              </p>
            </div>
          </section>

          {/* #2 */}
          <section className="flex flex-col md:flex-row justify-between mt-16 md:mt-24">
            <div className="w-full md:w-1/2 order-2 md:order-1 md:pr-12 flex flex-col ">
              <h1 className="text-5xl 2xl:text-8xl font-artisual-deco text-gold mb-6 md:mb-12 2x:mb-12 text-left">
                Jeux de société
              </h1>
              <p className="font-reglarik text-gold text-xl 2xl:text-3xl  leading-relaxed">
                L&apos;ink House vous met gratuitement à disposition un lot de
                jeux de société à utiliser sur place. Que vous soyez seul ou en
                groupe, différents univers vous attendent pour votre plus grand
                plaisir. Certaines consignes de jeu vous sont expliquées en
                vidéo sur Instagram. (bouton ?)
              </p>
            </div>
            <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center md:justify-end order-1 md:order-2">
              {/* Image size increased */}
              <div className="w-full">
                <Image
                  src={"/img/test.png"}
                  width={800}
                  height={800}
                  alt="photo du salon"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </section>

          {/* #3 */}
          <section className="flex flex-col md:flex-row justify-between mt-16 md:mt-24">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center md:justify-start">
              {/* Image size increased */}
              <div className="w-full">
                <Image
                  src={"/img/test.png"}
                  width={800}
                  height={800}
                  alt="photo du salon"
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pl-12 flex flex-col ">
              <h1 className="text-5xl 2xl:text-8xl font-artisual-deco text-gold mb-6 md:mb-12 2xl:mb-24 text-left">
                Espace de travail
              </h1>
              <p className="font-reglarik text-gold text-xl 2xl:text-3xl leading-relaxed">
                Prenez place dans votre coin favori, pour lire, travailler (seul
                ou entre amis), ou étudier. Invitez vos collaborateurs pour vos
                réunions de travail, vos camarades de classe pour réviser ou vos
                clients pour vos discussions professionnelles. Quelques livres
                sont consultables sur place, essentiellement des livres autour
                du dessin et des BD.
              </p>
            </div>
          </section>

          {/* #4 */}
          <section className="flex flex-col md:flex-row justify-between mt-16 md:mt-24 mb-16 md:mb-20">
            <div className="w-full md:w-1/2 order-2 md:order-1 md:pr-12 flex flex-col">
              <h1 className="text-5xl 2xl:text-8xl font-artisual-deco text-gold mb-6 md:mb-10 text-left">
                Musique
              </h1>
              <p className="font-reglarik text-gold text-xl 2xl:text-3xl leading-relaxed">
                Une enceinte connectée diffuse de la musique, que vous pouvez
                changer à votre guise par un simple « Écho, mets du (nom du
                groupe) ». Pas trop fort, ça reste un lieu de détente ;)
              </p>
            </div>
            <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center md:justify-end order-1 md:order-2">
              {/* Image size increased */}
              <div className="w-full">
                <Image
                  src={"/img/test.png"}
                  width={800}
                  height={800}
                  alt="photo du salon"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
