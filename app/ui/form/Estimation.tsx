import Image from "next/image";
import { useState } from "react";

const DevisSimulator = () => {
  const [hauteur, setHauteur] = useState("");
  const [largeur, setLargeur] = useState("");
  const [couleur, setCouleur] = useState(false);

  return (
    <div className="relative flex flex-col items-center p-4">
      <div className="relative">
        <Image
          src="/img/estimation.png"
          alt="Simulateur de devis"
          width={1000}
          height={1000}
        />
        {/* Hauteur */}
        <input
          type="number"
          value={hauteur}
          onChange={(e) => setHauteur(e.target.value)}
          className="absolute top-[60%] left-[28%] border rounded p-1 w-16 bg-white"
        />
        {/* Largeur */}
        <input
          type="number"
          value={largeur}
          onChange={(e) => setLargeur(e.target.value)}
          className="absolute top-[80%] left-[40%] border rounded p-1 w-16 bg-white"
        />
        {/* Couleur Checkbox */}
        <input
          type="checkbox"
          checked={couleur}
          onChange={(e) => setCouleur(e.target.checked)}
          className="absolute top-[70%] left-[65%] w-5 h-5"
        />
        {/* Budget estimé */}
        <div className="absolute top-[40%] left-[45%] text-lg font-bold text-red-500">
          {hauteur && largeur
            ? `${(
                Number(hauteur) *
                Number(largeur) *
                (couleur ? 1.2 : 1)
              ).toFixed(2)} €`
            : "—"}
        </div>
      </div>
    </div>
  );
};

export default DevisSimulator;
