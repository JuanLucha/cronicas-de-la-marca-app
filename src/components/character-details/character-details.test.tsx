import React from "react";
import { render } from "@testing-library/react";
import { generateCharacter } from "cronicas-de-la-marca-lib";
import CharacterDetails from "./character-details";

describe("CharacterDetail", () => {
  const characters = [
    generateCharacter("Pepe", "elf", "assassin", 1),
    generateCharacter("Juan", "human", "fighter", 3),
    generateCharacter("Ana", "dwarf", "cleric", 2)
  ];

  characters.forEach((character, index) => {
    it(`displays character details for character ${index + 1}`, () => {
      const { getByText } = render(<CharacterDetails character={character} />);

      // Replace these with the actual details you want to check
      expect(getByText(character.name)).toBeInTheDocument();
      expect(
        getByText(new RegExp(`Ascendencia: ${character.ancestry}`))
      ).toBeInTheDocument();
      expect(
        getByText(new RegExp(`Clase: ${character.class}`))
      ).toBeInTheDocument();

      expect(getByText(`Nivel: ${character.level}`)).toBeInTheDocument();

      // Check for characteristics
      expect(getByText(`Ataque: ${character.attackBonus}`)).toBeInTheDocument();
      expect(
        getByText(`Clase de Armadura: ${character.armorClass}`)
      ).toBeInTheDocument();
      expect(
        getByText(`Puntos de golpe: ${character.hitPoints}`)
      ).toBeInTheDocument();

      // Check for ancestry traits
      expect(
        getByText(`Tamaño: ${character.ancestryTraits.size}`)
      ).toBeInTheDocument();
      expect(
        getByText(`Velocidad: ${character.ancestryTraits.speed}`)
      ).toBeInTheDocument();
      expect(
        getByText(
          new RegExp(
            `Idiomas: ${character.ancestryTraits.languages.join(", ")}`
          )
        )
      ).toBeInTheDocument();

      // Check for class traits
      expect(
        getByText(`Nombre de Clase: ${character.classTraits.name}`)
      ).toBeInTheDocument();

      expect(
        getByText(`Atributo principal: ${character.classTraits.mainAttribute}`)
      ).toBeInTheDocument();
      character.classTraits.abilities.forEach((ability) => {
        expect(getByText(ability)).toBeInTheDocument();
      });

      // Check for stats
      Object.keys(character.stats).forEach((statKey) => {
        expect(
          getByText(`${statKey}: ${character.stats[statKey]}`)
        ).toBeInTheDocument();
      });

      // Check for experience points
      expect(
        getByText(`Puntos de Experiencia: ${character.experiencePoints}`)
      ).toBeInTheDocument();
    });
  });

  it("displays message if no character selected", () => {
    const { getByText } = render(<CharacterDetails character={null} />);
    expect(
      getByText(/Selecciona un personaje para ver los detalles./i)
    ).toBeInTheDocument();
  });
});
