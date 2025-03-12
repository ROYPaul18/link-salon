import React from "react";
import Header from "../ui/header";
import Footer from "../ui/footer";
import Image from "next/image";
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
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 -z-10"></div>
      {/* Header */}
      <Header />
      {/* Conteneur principal avec alignement vertical */}
      <div className="flex-grow flex items-center justify-center">
        {/* Conteneur de l'image et des liens */}
        <div className="relative max-w-6xl my-auto">
          {/* Image principale */}
          <Image
            src="/img/membre.png"
            alt="Liste des Tatoueurs"
            width={1200}
            height={1200}
            className="w-full h-auto"
            priority
          />
          {/* Zones cliquables positionnées en % - ajustées pour correspondre aux images */}
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Pour faciliter le développement, vous pouvez temporairement ajouter 
                une bordure ou un fond semi-transparent pour visualiser les zones */}
            <Link href="/gael">
              <div 
                className="absolute top-[45%] left-[12%] w-[16%] h-[12%] cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-lg"
                title="Gaël"
              ></div>
            </Link>
            <Link href="/chloe">
              <div 
                className="absolute top-[45%] left-[36%] w-[16%] h-[12%] cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-lg"
                title="Chloé"
              ></div>
            </Link>
            <Link href="/axelle">
              <div 
                className="absolute top-[45%] left-[60%] w-[16%] h-[12%] cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-lg"
                title="Axelle"
              ></div>
            </Link>
            <Link href="/autres">
              <div 
                className="absolute top-[45%] left-[84%] w-[16%] h-[12%] cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-lg"
                title="Autres"
              ></div>
            </Link>
          </div>
        </div>
      </div>
      {/* Footer collé en bas */}
      <Footer />
    </div>
  );
};

export default Page;