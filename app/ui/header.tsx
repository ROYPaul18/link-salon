"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
 
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-20 text-gold font-arcane-nine backdrop-blur-md">
      <div className="flex justify-between lg:justify-center items-center p-4 md:p-8 md:pb-2">
        <div className="z-30 md:mr-8">
          <Link href={"/"}>
            <Image
              src={"/img/chloe/logo.png"}
              width={72}
              height={72}
              alt="logo"
              className="w-16 md:w-24"
              priority
            />
          </Link>
        </div>
        {/* Bouton hamburger pour mobile */}
        <button
          className="z-30 md:hidden flex flex-col justify-center items-center w-10 h-10"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gold mb-1.5 transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gold mb-1.5 transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gold transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>

        {/* Navigation bureau */}
        <nav className="hidden md:block">
          <ul className="flex justify-center items-center space-x-8 lg:space-x-12 text-lg xl:text-2xl 2xl:text-4xl">
            <li>
              <Link
                href={"/tatouage"}
                className="hover:text-white transition-colors duration-300"
              >
                Tatouage
              </Link>
            </li>
            <li>
              <Link
                href={"/salon"}
                className="hover:text-white transition-colors duration-300"
              >
                Salon de thé
              </Link>
            </li>
            <li>
              <Link
                href={"/prothese"}
                className="hover:text-white transition-colors duration-300"
              >
                Prothésiste
              </Link>
            </li>
            <li>
              <Link
                href={"/piercing"}
                className="hover:text-white transition-colors duration-300"
              >
                Piercing
              </Link>
            </li>
            <li>
              <Link
                href={"/event"}
                className="hover:text-white transition-colors duration-300"
              >
                Événement
              </Link>
            </li>
          </ul>
        </nav>

        {/* Overlay de navigation mobile */}
        <div
          className={`fixed inset-0 top-0 z-20 h-[100vh] w-full transition-opacity duration-300 md:hidden ${
            menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Image de fond */}
          {menuOpen && (
            <Image
              src="/img/bg.jpeg"
              alt="Background image"
              fill
              priority
              className="object-cover z-[-1]"
              sizes="100vw"
              quality={100}
            />
          )}
          <nav className="h-full flex items-center justify-center">
            <ul className="flex flex-col items-center space-y-6 text-2xl font-rehat">
              <li>
                <Link
                  href={"/tatouage"}
                  className="hover:text-white transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Tatouage
                </Link>
              </li>
              <li>
                <Link
                  href={"/salon"}
                  className="hover:text-white transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Salon de thé
                </Link>
              </li>
              <li>
                <Link
                  href={"/prothese"}
                  className="hover:text-white transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Prothésiste
                </Link>
              </li>
              <li>
                <Link
                  href={"/piercing"}
                  className="hover:text-white transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Piercing
                </Link>
              </li>
              <li>
                <Link
                  href={"/event"}
                  className="hover:text-white transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Événement
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;