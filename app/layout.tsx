import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Import des polices Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configuration des métadonnées
export const metadata: Metadata = {
  title: "Salon de thé",
  description: "Un salon de thé élégant et raffiné",
};

// Définition des polices personnalisées via URL
const googleFontsURL = 'https://fonts.googleapis.com/css2?family=Arcane+Nine&family=Artisual+Deco&family=Reglarik&family=Rehat&display=swap';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" href={googleFontsURL} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}