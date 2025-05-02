"use client";
import { useState } from "react";

// Tableau des tarifs par surface
const priceTable = [
  { maxCm2: 25, price: 80 },
  { maxCm2: 36, price: 90 },
  { maxCm2: 49, price: 110 },
  { maxCm2: 64, price: 130 },
  { maxCm2: 81, price: 180 },
  { maxCm2: 100, price: 220 },
  { maxCm2: 150, price: 300 },
  { maxCm2: 200, price: 380 },
  { maxCm2: 300, price: 450 },
  { maxCm2: 400, price: 500 },
  { maxCm2: 500, price: 580 },
  { maxCm2: 600, price: 650 },
];

const DevisSimulator = () => {
  const [hauteur, setHauteur] = useState("");
  const [largeur, setLargeur] = useState("");
  const [couleur, setCouleur] = useState(false);

  const calculateTotal = () => {
    const h = Number(hauteur);
    const l = Number(largeur);
    if (!h || !l) return { price: "0", note: null };

    const surface = h * l;

    let lower = null;
    let upper = null;

    for (let i = 0; i < priceTable.length; i++) {
      if (surface <= priceTable[i].maxCm2) {
        upper = priceTable[i];
        lower = priceTable[i - 1] || priceTable[i];
        break;
      }
    }

    if (!upper) {
      lower = priceTable[priceTable.length - 1];
      upper = null;
    }

    const factor = couleur ? 1.2 : 1;
    const lowerPrice = lower ? Math.round(lower.price * factor) : 0;
    const upperPrice = upper ? Math.round(upper.price * factor) : null;

    const price =
      upperPrice && lowerPrice !== upperPrice
        ? `Entre ${lowerPrice} € et ${upperPrice} €`
        : `${lowerPrice} €`;

    const note =
      surface > 600
        ? "Pièce considérée comme une grande pièce — les tarifs sont à la session : 300 € (4h), 450 € (7h), 600 € (9h)."
        : null;

    return { price, note };
  };

  const { price, note } = calculateTotal();

  return (
    <div className="text-gold font-alte flex flex-col h-full">
      <div className="space-y-6">
        {/* Hauteur */}
        <div className="mb-4">
          <label htmlFor="hauteur" className="font-alte text-gold text-xl block mb-2">
            Longueur (cm):
          </label>
          <div className="flex items-center bg-redlink border border-gold rounded p-2">
            <input
              id="hauteur"
              type="text"
              value={hauteur}
              onChange={(e) => setHauteur(e.target.value)}
              className="w-3/4 bg-transparent font-bold outline-none text-2xl text-gold"
              placeholder="0"
            />
            <span className="ml-auto text-xl text-gold">cm</span>
          </div>
        </div>

        {/* Largeur */}
        <div className="mb-4">
          <label htmlFor="largeur" className="font-alte text-gold text-xl block mb-2">
            Largeur (cm):
          </label>
          <div className="flex items-center bg-redlink border border-gold rounded p-2">
            <input
              id="largeur"
              type="text"
              value={largeur}
              onChange={(e) => setLargeur(e.target.value)}
              className="w-3/4 bg-transparent font-bold outline-none text-2xl text-gold"
              placeholder="0"
            />
            <span className="ml-auto text-xl text-gold">cm</span>
          </div>
        </div>

        {/* Couleur */}
        <div className="mb-6">
          <label className="font-alte text-gold text-xl flex items-center gap-3">
            <div className="w-6 h-6 border border-gold flex items-center justify-center">
              <input
                type="checkbox"
                checked={couleur}
                onChange={(e) => setCouleur(e.target.checked)}
                className="w-4 h-4"
              />
            </div>
            En couleurs
          </label>
        </div>

        {/* Résultat */}
        <div className="mt-8">
          <div className="text-center mb-2 font-alte text-gold text-xl">
            Prix estimé:
          </div>
          <div className="bg-redlink border-2 border-gold rounded p-4 text-center">
            <span className="font-bold text-3xl text-gold">{price}</span>
          </div>
          <p className="text-gold text-sm mt-2 font-alte">
            (Cette estimation est approximative et peut varier selon la complexité du design)
          </p>
          {note && (
            <p className="text-gold text-sm mt-2 font-alte">{note}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DevisSimulator;
