import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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

// Déclaration des métadonnées (Next.js les injectera automatiquement dans <head>)
export const metadata: Metadata = {
  metadataBase: new URL("https://www.salon-link.fr/"),
  title: {
    default: "Link Salon - Tatouage, Café et Jeux de Société à Soye-en-Septaine",
    template: "Link Salon - %s",
  },
  description:
    "Venez découvrir Link Salon à Soye-en-Septaine : un espace unique combinant tatouage, café et jeux de société. Une ambiance conviviale pour se détendre et s'exprimer artistiquement.",
  keywords: [
    // Mots-clés principaux locaux
    "tatoueur Bourges",
    "salon tatouage Bourges",
    "tatouage Bourges",
    "meilleur tatoueur Bourges",
    "tatoueur près de Bourges",

    // Localisation précise
    "tatoueur Soye-en-Septaine",
    "salon tatouage Soye-en-Septaine",
    "tatouage Cher 18",
    "tatoueur département Cher",
    "tatoueur région Centre",
    "tatoueur Berry",

    // Villes environnantes
    "tatoueur Vierzon",
    "tatoueur Saint-Doulchard",
    "tatoueur Mehun-sur-Yèvre",
    "tatoueur Dun-sur-Auron",
    "tatoueur Saint-Germain-du-Puy",
    "tatoueur Avord",
    "tatoueur La Guerche-sur-l'Aubois",

    // Styles de tatouage
    "tatouage asiatique Bourges",
    "tatouage japonais Bourges",
    "tatouage celtique Bourges",
    "tatouage floral Bourges",
    "tatouage animal Bourges",
    "tatouage ornemental Bourges",
    "tatouage géométrique Bourges",
    "tatouage réaliste Bourges",
    "tatouage old school Bourges",
    "tatouage tribal Bourges",
    "tatouage minimaliste Bourges",
    "tatouage noir et gris Bourges",
    "tatouage couleur Bourges",

    // Spécialités
    "tatoueur femme Bourges",
    "tatoueur homme Bourges",
    "premier tatouage Bourges",
    "retouche tatouage Bourges",
    "cover up tatouage Bourges",
    "tatouage sur cicatrice Bourges",

    // Services connexes
    "café tatouage Bourges",
    "salon tatouage jeux société",
    "tatoueur convivial Bourges",
    "tatouage ambiance détendue",

    // Marque et nom
    "Link Salon",
    "Gaël tatoueur",
    "salon Link tatouage",

    // Longue traîne locale
    "où se faire tatouer à Bourges",
    "bon tatoueur région Bourges",
    "salon tatouage recommandé Bourges",
    "tatoueur professionnel Cher",
    "studio tatouage hygiène Bourges",
    "prix tatouage Bourges",
    "rendez-vous tatouage Bourges",
    "consultation tatouage Bourges",

    // Termes connexes
    "tatouage artistique",
    "art corporel Bourges",
    "encre tatouage qualité",
    "matériel tatouage stérilisé",
    "hygiène tatouage",
    "aftercare tatouage",
    "cicatrisation tatouage",
  ],
  openGraph: {
    title: "Link Salon - Tatouage, Café et Jeux de Société",
    description:
      "Plongez dans l'univers de Gael à Soye-en-Septaine : tatouages artistiques, café chaleureux et jeux de société pour des moments inoubliables.",
    url: "https://www.salon-link.fr/",
    type: "website",
  },
};

const googleFontsURL =
  "https://fonts.googleapis.com/css2?family=Arcane+Nine&family=Artisual+Deco&family=Reglarik&family=Rehat&display=swap";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        {/* Fallback favicon + description explicite pour Google */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W47WH8KT');
          `}
        </Script>
        <meta
          name="description"
          content="Venez découvrir Link Salon à Soye-en-Septaine (5min de Bourges !): un espace unique combinant tatouage, café et jeux de société. Une ambiance conviviale pour se détendre et s'exprimer artistiquement."
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href={googleFontsURL} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W47WH8KT"
          height="0" width="0" className="display:none;visibility:hidden"></iframe></noscript>

        {children}
      </body>
    </html>
  );
}
