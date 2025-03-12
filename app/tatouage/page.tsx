import React from "react";
import Header from "../ui/header";
import Footer from "../ui/footer";
import Link from "next/link";

const Page = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {/* Vidéo de fond */}
      <video
        src="/video/tattoo.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        loop
        autoPlay
        muted
        playsInline
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 -z-10"></div>
      <Header />      
      <div className="flex-grow flex items-center justify-center px-4 py-8">
        {/* Conteneur de l'image et des liens */}
        <div className="relative w-full max-w-6xl my-auto">
          {/* Navigation des artistes - Mobile first puis adaptation desktop */}
          <div
            className="w-full font-rehat text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gold flex flex-col sm:flex-row sm:space-x-4 md:space-x-8 lg:space-x-12 space-y-6 sm:space-y-0 items-center justify-center"
            style={{
              textShadow:
                "2px 2px 0 #4C2A27, -2px -2px 0 #4C2A27, 2px -2px 0 #4C2A27, -2px 2px 0 #4C2A27",
            }}
          >
            <Link href="/tatouage/gael">
              <div className="cursor-pointer rounded-lg transition-transform duration-300 hover:scale-110" title="Gaël">
                Gael
              </div>
            </Link>
            
            <Link href="/tatouage/chloe">
              <div className="cursor-pointer rounded-lg transition-transform duration-300 hover:scale-110" title="Chloé">
                Chloé
              </div>
            </Link>
            
            <Link href="/tatouage/axelle">
              <div className="cursor-pointer rounded-lg transition-transform duration-300 hover:scale-110" title="Axelle">
                Axelle
              </div>
            </Link>
            
            <Link href="/tatouage/autres">
              <div className="cursor-pointer rounded-lg transition-transform duration-300 hover:scale-110" title="Autres">
                Autres
              </div>
            </Link>
          </div>
          
          <div className="font-rehat text-xl sm:text-2xl text-gold mt-8 text-center">
            Choisi ton artiste
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;