import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CharacterList from "./character-list";
import { Character } from "../../types/character-type";

// Mock characters data
const characters: Partial<Character> = [
  {
    name: "Juan",
    ancestry: "human",
    class: "paladin",
    level: 1
  },
  {
    name: "Maria",
    ancestry: "elf",
    class: "wizard",
    level: 2
  }
];

describe("CharacterList", () => {
  it("renders without crashing", () => {
    render(<CharacterList characters={characters} />);
  });

  it("renders correct number of characters", () => {
    render(<CharacterList characters={characters} />);
    const characterItems = screen.getAllByRole("listitem");
    expect(characterItems).toHaveLength(characters.length);
  });

  it("displays the correct character details", () => {
    render(<CharacterList characters={characters} />);
    characters.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
      expect(screen.getByText(character.ancestry)).toBeInTheDocument();
      expect(screen.getByText(character.class)).toBeInTheDocument();
      expect(screen.getByText(`Level: ${character.level}`)).toBeInTheDocument();
    });
  });

  it("calls the appropriate function when a character is clicked", () => {
    const mockFunction = jest.fn();
    render(
      <CharacterList characters={characters} onCharacterClick={mockFunction} />
    );

    const firstCharacterItem = screen.getAllByRole("listitem")[0];
    userEvent.click(firstCharacterItem);
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it("calls the appropriate function with the correct character data when a character is clicked", () => {
    const mockFunction = jest.fn();
    render(
      <CharacterList characters={characters} onCharacterClick={mockFunction} />
    );

    const firstCharacterItem = screen.getAllByRole("listitem")[0];
    userEvent.click(firstCharacterItem);
    expect(mockFunction).toHaveBeenCalledWith(characters[0]);
  });
});
