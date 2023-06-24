import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { generateCharacter } from "cronicas-de-la-marca-lib";
import CharacterList from "./components/character-list";
import GenerateCharacter from "./components/generate-character";
import { Character } from "./types/character-type";

jest.mock("cronicas-de-la-marca-lib");

describe("App", () => {
  let mockGenerateCharacter;

  beforeEach(() => {
    mockGenerateCharacter = generateCharacter as jest.MockedFunction<
      typeof generateCharacter
    >;
    localStorage.clear();
  });

  it("loads characters from localStorage on mount", async () => {
    const characters: Character[] = [
      { name: "Test Character 1", ancestry: "elf", class: "mage", level: 1 },
      {
        name: "Test Character 2",
        ancestry: "human",
        class: "warrior",
        level: 3
      }
    ];

    localStorage.setItem("characters", JSON.stringify(characters));

    const { getByText } = render(<App />);

    await waitFor(() => getByText("Test Character 1"));
    await waitFor(() => getByText("Test Character 2"));
  });

  it("updates character list when a new character is generated", async () => {
    const newCharacter = {
      name: "New Character",
      ancestry: "dwarf",
      class: "barbarian",
      level: 5
    };
    mockGenerateCharacter.mockReturnValueOnce(newCharacter);

    const { getByText, getByLabelText } = render(<App />);

    fireEvent.change(getByLabelText(/nombre/i), {
      target: { value: newCharacter.name }
    });
    fireEvent.change(getByLabelText(/ascendencia/i), {
      target: { value: newCharacter.ancestry }
    });
    fireEvent.change(getByLabelText(/clase/i), {
      target: { value: newCharacter.class }
    });
    fireEvent.change(getByLabelText(/nivel/i), {
      target: { value: newCharacter.level }
    });
    fireEvent.click(getByText("Generar personaje"));

    await waitFor(() => getByText(newCharacter.name));
  });
});
