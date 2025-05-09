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
    "Link Salon",
    "salon tatouage Soye-en-Septaine",
    "salon tatouage Bourges",
    "salon tatouage Cher",
    "tatouage asiatique",
    "tatouage celtique",
    "tatouage floral",
    "tatouage animal",
    "tatouage ornemental",
    "tatoueur Bourges",
    "tatoueur région centre"
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
          content="Venez découvrir Link Salon à Soye-en-Septaine : un espace unique combinant tatouage, café et jeux de société. Une ambiance conviviale pour se détendre et s'exprimer artistiquement."
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
