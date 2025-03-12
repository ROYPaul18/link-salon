import React from "react";
import Image from "next/image";
import Header from "../ui/header";
import Footer from "../ui/footer";
import Link from "next/link";

const Page = () => {
  return (
    <div className="relative min-h-screen w-full">
      <Header />
      <Image
        src="/img/bg.jpeg"
        alt="Background image"
        fill
        priority
        className="object-fit fixed top-0 left-0 z-0"
      />
      <main className="relative z-10 min-h-screen">
        <section className="flex flex-col gap-6 md:gap-12 px-4 sm:px-8 md:px-16 mt-4 md:mt-8">
          {/* Top section with main image and text */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            {/* Left side - Main image */}
            <div className="w-full md:w-6/12">
              <div className="w-full aspect-[4/3] relative">
                <Image
                  src="/img/chloe.png"
                  alt="Image principale"
                  fill
                  className="object-fit"
                />
              </div>
            </div>
            {/* Right side - Text content */}
            <div className="w-full md:w-6/12 text-gold flex flex-col justify-between">
              <h1 className="text-3xl md:text-5xl 2xl:text-8xl font-artisual-deco mb-4 md:mb-6">
                Chloé / Beaudy Ink
              </h1>
              <p className="font-reglarik mb-4 md:mb-8 leading-relaxed text-base md:text-xl 2xl:text-4xl">
                Chloé vous accueille pour repousser vos cuticules et colorer vos
                ongles. Direction son site internet pour découvrir ses
                prestations et prendre rendez-vous en ligne :
              </p>
              <div className="flex space-x-4 font-rehat text-base md:text-xl 2xl:text-4xl">
                <Link
                  href="https://www.facebook.com/profile.php?id=100072912670661"
                  className="text-gold hover:underline"
                >
                  Facebook
                </Link>
                <Link
                  href="https://www.instagram.com/beaudy_ink_tattoo?igsh=MWwwczB5ZmFudjJjbQ%3D%3D"
                  className=" text-gold hover:underline"
                >
                  Instagram
                </Link>
                <Link
                  href="https://beaudy-ink.com"
                  className="text-gold hover:underline"
                >
                  https://beaudy-ink.com
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom section with smaller images */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="aspect-square relative">
                <Image
                  src="/img/test.png"
                  alt={`Image ${index}`}
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
