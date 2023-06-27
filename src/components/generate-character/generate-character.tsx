import React, { useState } from "react";
import { generateCharacter } from "cronicas-de-la-marca-lib";
import "./generate-character.css";

interface Props {
  onCharacterCreated: (character: any) => void;
}

interface Option {
  label: string;
  value: string;
}

const ancestries: Option[] = [
  { label: "Elfo", value: "elf" },
  { label: "Elfo oscuro", value: "dark_elf" },
  { label: "Enano", value: "dwarf" },
  { label: "Gnomo", value: "gnome" },
  { label: "Humano", value: "human" },
  { label: "Halfling", value: "halfling" },
  { label: "Semielfo", value: "half_elf" },
  { label: "Semiorco", value: "half_orc" }
];

const classes: Option[] = [
  { label: "Asesino", value: "assassin" },
  { label: "Bárbaro", value: "barbarian" },
  { label: "Caballero", value: "knight" },
  { label: "Clérigo", value: "cleric" },
  { label: "Druida", value: "druid" },
  { label: "Explorador", value: "explorer" },
  { label: "Guerrero", value: "warrior" },
  { label: "Ilusionista", value: "illusionist" },
  { label: "Ladrón", value: "thief" },
  { label: "Mago", value: "mage" },
  { label: "Místico", value: "mystic" },
  { label: "Paladín", value: "paladin" }
];

const levels = Array.from({ length: 12 }, (_, i) => i + 1);

const GenerateCharacter: React.FC<Props> = ({ onCharacterCreated }) => {
  const [name, setName] = useState("");
  const [ancestry, setAncestry] = useState("");
  const [charClass, setCharClass] = useState("");
  const [level, setLevel] = useState<number>(1); // Valor inicial
  const [error, setError] = useState("");

  const handleGenerateCharacter = () => {
    if (!name || !ancestry || !charClass || !level) {
      setError("Por favor, selecciona todos los campos");
      return;
    }

    const newCharacter = generateCharacter(
      name,
      ancestries.find((a) => a.value === ancestry)?.value || "",
      classes.find((c) => c.value === charClass)?.value || "",
      level
    );
    onCharacterCreated(newCharacter);
    setError("");
  };

  return (
    <div className="generate-character">
      <label>
        Nombre
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Ascendencia
        <select value={ancestry} onChange={(e) => setAncestry(e.target.value)}>
          <option value="">Selecciona Ascendencia</option>
          {ancestries.map((a) => (
            <option key={a.value} value={a.value}>
              {a.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Clase
        <select
          value={charClass}
          onChange={(e) => setCharClass(e.target.value)}
        >
          <option value="">Selecciona Clase</option>
          {classes.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Nivel
        <select
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
        >
          <option value="">Selecciona Nivel</option>
          {levels.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleGenerateCharacter}>Generar personaje</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default GenerateCharacter;
