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
  metadataBase: new URL('https://link-salon.com'),
  keywords: [
    'Link Salon',
    'salon tatouage Soye-en-Septaine',
    'salon tatouage Bourges',
    'café Soye-en-Septaine',
    'café Bourges',
    'événement Soye-en-Septaine',
    'salon jeux de société et tatouages Bourges',
    'tatouage et café Soye-en-Septaine',
    'jeux de société et détente Bourges',
    'tatouage Soye-en-Septaine',
    'café et jeux de société Soye-en-Septaine',
    'événement jeux et tatouages Soye-en-Septaine',
    'sortie jeux de société Bourges',
    'animations et tatouages Bourges',
  ],
  title: {
    default: 'Link Salon - Tatouage, Café et Jeux de Société à Soye-en-Septaine',
    template: 'Link Salon - %s',
  },
  description:
    "Venez découvrir Link Salon à Soye-en-Septaine : un espace unique combinant tatouage, café et jeux de société. Une ambiance conviviale pour se détendre et s'exprimer artistiquement.",
  openGraph: {
    title: 'Link Salon - Tatouage, Café et Jeux de Société',
    description:
      "Plongez dans l'univers de Link Salon à Soye-en-Septaine : tatouages artistiques, café chaleureux et jeux de société pour des moments inoubliables.",
    url: 'https://link-salon.com',
    type: 'website',
  },
};


// Définition des polices personnalisées via URL
const googleFontsURL =
  "https://fonts.googleapis.com/css2?family=Arcane+Nine&family=Artisual+Deco&family=Reglarik&family=Rehat&display=swap";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" href={googleFontsURL} />
        <link rel="icon" href="/logo.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
