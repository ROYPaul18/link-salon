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
    return "250";
  };

  return (
    <div className="text-gold p-6 rounded-lg font-rehat">
      <h2 className="font-rehat text-gold text-4xl md:text-6xl 2xl:text-8xl mb-6 md:mb-10">Estimations du projet</h2>

      {/* Longueur */}
      <div className="mb-4">
        <label className="block mb-1">longeurs</label>
        <div className="flex items-center bg-[#e2c88e] text-[#622c23] rounded p-2">
          <input
            type="text"
            value={hauteur}
            onChange={(e) => setHauteur(e.target.value)}
            className="w-1/2 bg-transparent font-bold outline-none text-3xl md:text-4xl"
          />
          <span className="ml-auto text-3xl md:text-4xl">en cm</span>
        </div>
      </div>

      {/* Largeur */}
      <div className="mb-4">
        <label className="block mb-1">largeur</label>
        <div className="flex items-center bg-[#e2c88e] text-[#622c23] rounded p-2">
          <input
            type="text"
            value={largeur}
            onChange={(e) => setLargeur(e.target.value)}
            className="w-1/2 bg-transparent font-bold outline-none text-3xl md:text-4xl"
          />
          <span className="ml-auto text-3xl md:text-4xl">en cm</span>
        </div>
      </div>

      {/* Couleur */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 border-2 border-[#e2c88e] flex items-center justify-center mr-4">
          <input
            type="checkbox"
            checked={couleur}
            onChange={(e) => setCouleur(e.target.checked)}
            className="w-6 h-6"
          />
        </div>
        <span className="text-3xl md:text-4xl">en couleurs ?</span>
      </div>

      {/* Total */}
      <div className="flex items-center bg-[#e2c88e] text-[#622c23] rounded p-2">
        <span className="font-bold text-3xl md:text-4xl">{calculateTotal()}</span>
        <span className="ml-auto text-3xl md:text-4xl">total en €</span>
      </div>
    </div>
  );
};

export default DevisSimulator;
