"use client";
import Image from "next/image";
import Header from "./ui/header";
import Footer from "./ui/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <Image
        src="/img/bg.jpeg"
        alt="Background image"
        fill
        priority
        className="object-cover z-[-1]"
        sizes="100vw"
        quality={100}
      />
      <Header />
      <main className="relative z-10 min-h-screen px-4 md:px-8 2xl:px-20 space-y-16 md:space-y-24">
        {/* Section d'introduction */}
        <section className="flex flex-col md:flex-row justify-between md:space-x-2 min-h-[40vh] md:min-h-[50vh] mt-6 md:mt-12">
          <div className="w-full text-center">
            <h1 className="text-4xl md:text-5xl 2xl:text-8xl font-artisual-deco text-gold mb-4 md:mb-8">
              L&apos;Ink House
            </h1>
            <p className="font-reglarik text-gold text-base md:text-lg 2xl:text-3xl leading-relaxed ">
              Découvrez un espace unique combinant tatouage, salon de thé,
              piercing et événements artistiques.
            </p>
          </div>
        </section>

        {/* Sections détaillées */}
        {[
          {
            title: "Tatouage",
            desc: "Chez L’Ink House votre projet tatouage est étudié sérieusement : - Nous prenons le temps de comprendre l’intention de votre projet, la signification du tatouage. - Nous vous proposons des éléments, une composition qui répondent à votre envie - Nous trouvons avec vous la taille adaptée ainsi que le meilleur emplacement. - Nous fournissons le dessin à l’avance pour vous laisser le contrôle. Bref. Nous construisons votre projet ensemble et vous repartez avec ce que vous espériez ! ",
            img: "/img/test.png",
          },
          {
            title: "Salon de thé",
            desc: "L’espace détente L’ink est à votre disposition, en libre service, pour vous permettre de vous servir une boisson (chaude ou froide), jouer à un jeu de société, lire un livre, travailler, ou simplement discuter entre amis. Servez-vous, installez-vous et profitez !",
            img: "/img/test.png",
            reverse: true,
          },
          {
            title: "Prothésiste ongulaire",
            desc: "Chloé vous accueille sur rendez vous pour embellir vos ongles. Egalement tatoueuse, sa maîtrise du dessin vous permettra d’arborer des décors uniques.",
            img: "/img/test.png",
          },
          {
            title: "Piercing",
            desc: "Clothilde vous offre une prestation piercing de précision, dans les normes d’hygiène et de sécurité. Ses conseils vous aideront à choisir l’emplacement idéal pour votre futur bijou !",
            img: "/img/test.png",
            reverse: true,
          },
          {
            title: "Événements",
            desc: "L’ink House organise régulièrement des évènements, consultez-ici ceux passés et ceux à venir.",
            img: "/img/test.png",
          },
        ].map(({ title, desc, img, reverse }, index) => (
          <section
            key={index}
            className={`flex flex-col md:flex-row justify-between mt-16 md:mt-24 ${
              reverse ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="w-full md:w-1/2 flex justify-center md:justify-start">
              <div className="w-full">
                <Image
                  src={img}
                  width={800}
                  height={800}
                  alt={title}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pl-12 flex flex-col">
              <h1 className="text-3xl md:text-4xl 2xl:text-7xl font-artisual-deco text-gold mb-6 md:mb-10 text-left">
                {title}
              </h1>
              <p className="font-reglarik text-gold text-lg md:text-xl 2xl:text-3xl leading-relaxed">
                {desc}
              </p>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
}
