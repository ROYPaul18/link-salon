import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative z-10 font-rehat text-gold p-4 mt-8 md:mt-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-8">
        {/* Logo and links section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="mb-2 md:mb-0">
            <Link href={"/"}>
              <Image
                src={"/img/logo.png"}
                width={96}
                height={96}
                alt="logo"
                className="w-16 md:w-24"
              />
            </Link>
          </div>
        </div>
        <div>
          <ul className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 text-lg xl:text-2xl">
            <li>
              <Link
                href={"/tatouage"}
                className="hover:text-white transition-colors duration-300"
              >
                Développé par Paul Roy
              </Link>
            </li>
            <li>
              <Link
                href={"/salon"}
                className="hover:text-white transition-colors duration-300"
              >
                Mention légale
              </Link>
            </li>
          </ul>
        </div>

        {/* Social media links */}
        <div className="flex gap-4 text-lg xl:text-2xl">
          <Link
            href={"https://instagram.com"}
            className="hover:text-white transition-colors duration-300"
          >
            Instagram
          </Link>
          <Link
            href={"https://facebook.com"}
            className="hover:text-white transition-colors duration-300"
          >
            Facebook
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
