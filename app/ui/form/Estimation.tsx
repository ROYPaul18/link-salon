"use client";
import { useState } from "react";

const DevisSimulator = () => {
  const [hauteur, setHauteur] = useState("");
  const [largeur, setLargeur] = useState("");
  const [couleur, setCouleur] = useState(false);

  // Calculate the total
  const calculateTotal = () => {
    if (hauteur && largeur) {
      const base = Number(hauteur) * Number(largeur);
      return (base * (couleur ? 1.2 : 1)).toFixed(0);
    }
    return "0";
  };

  return (
    <div className="text-gold font-rehat flex flex-col h-full">
      <h3 className="font-rehat text-gold text-4xl md:text-5xl 2xl:text-6xl mb-6 md:mb-10">
        Estimation du projet
      </h3>

      <div className="space-y-6">
        {/* Longueur */}
        <div className="mb-4">
          <label 
            htmlFor="hauteur" 
            className="font-rehat text-gold text-xl block mb-2"
          >
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
          <label 
            htmlFor="largeur" 
            className="font-rehat text-gold text-xl block mb-2"
          >
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
          <label className="font-rehat text-gold text-xl flex items-center gap-3">
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

        {/* Total */}
        <div className="mt-8">
          <div className="text-center mb-2 font-rehat text-gold text-xl">
            Prix estimé:
          </div>
          <div className="bg-redlink border-2 border-gold rounded p-4 text-center">
            <span className="font-bold text-3xl text-gold">{calculateTotal()} €</span>
          </div>
          <p className="text-gold text-sm mt-2 italic">
            (Cette estimation est approximative et peut varier selon la complexité du design)
          </p>
        </div>
      </div>
    </div>
  );
};

export default DevisSimulator;