import React from "react";
import Image from "next/image";
import Header from "../ui/header";
import Footer from "../ui/footer";
import Link from "next/link";
interface ArtistData {

  gallery: string[];
}
interface ArtistsDataMap {
  [key: string]: ArtistData;
}

const artistsData: ArtistsDataMap = {
  chloe:{
    gallery: [
      "/img/axel/pier1.jpg",
      "/img/axel/pier2.jpg",
      "/img/axel/pier3.jpg",
      "/img/axel/pier4.jpg",
    ],
  }
};
const Page = () => {
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
                  src="/img/piercing.png"
                  alt="Image principale"
                  width={1000}
                  height={1000}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right side - Text content */}
            <div className="w-full md:w-6/12 text-gold flex flex-col justify-between">
              <h1 className="text-3xl md:text-5xl 2xl:text-8xl font-artisual-deco mb-4 md:mb-6">
                Clothilde
              </h1>
              <p className="font-reglarik mb-4 md:mb-8 leading-relaxed text-base md:text-xl 2xl:text-4xl">
                Clothilde est à votre disposition pour implanter de nouveaux
                bijoux sur votre corps. Laissez son professionnalisme vous aider
                à choisir l&apos;emplacement de votre piercing, et en un tour de
                main (et d&apos;aiguille), admirez votre nouveau style !
                <br></br>
                Pour consulter ses diverses prestations, ou pour la contacter et
                prendre votre rendez vous :
              </p>
              <div className="flex space-x-4 font-rehat text-base md:text-xl 2xl:text-4xl">
                <a
                  href="tattooaxelle@gmail.com"
                  className=" text-gold hover:underline"
                >
                  tattooaxelle@gmail.com
                </a>
                <Link
                  href="https://www.instagram.com/axelletattoo?igsh=MTFtYm13NjZ2MndraA%3D%3D"
                  className="text-gold hover:underline"
                >
                  Instagram
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom section with smaller images */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-12">
          {artistsData.chloe.gallery.map((imageSrc, index) => (
              <div key={index} className="aspect-square relative">
                <Image
                  src={imageSrc}
                  alt={`Travail de d'Axel`}
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

export default Page;
