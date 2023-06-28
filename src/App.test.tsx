import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { generateCharacter } from "cronicas-de-la-marca-lib";
import { Character } from "./types/character-type";
import { characterMock } from "./helpers/mocks/character-mock";

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
    const characters: Partial<Character>[] = [
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
    mockGenerateCharacter.mockReturnValueOnce(characterMock);

    const { getByText, getByLabelText } = render(<App />);

    fireEvent.change(getByLabelText(/nombre/i), {
      target: { value: characterMock.name }
    });
    fireEvent.change(getByLabelText(/ascendencia/i), {
      target: { value: characterMock.ancestry }
    });
    fireEvent.change(getByLabelText(/clase/i), {
      target: { value: characterMock.class }
    });
    fireEvent.change(getByLabelText(/nivel/i), {
      target: { value: characterMock.level }
    });
    fireEvent.click(getByText("Generar personaje"));

    await waitFor(() => getByText(characterMock.name));
  });

  it("shows CharacterDetails when a character is clicked", () => {
    localStorage.setItem("characters", JSON.stringify([characterMock]));

    const { getByText, queryByText } = render(<App />);

    // Clicking on the character should display the character details
    fireEvent.click(getByText(characterMock.name));

    // After clicking on the character, we should see the character details
    expect(getByText(characterMock.name)).toBeInTheDocument();

    // And the character list should no longer be in the document
    expect(queryByText("Generate Character")).not.toBeInTheDocument();
  });

  it("updates character list when a character is deleted", async () => {
    const characters: Partial<Character>[] = [
      { name: "Test Character 1", ancestry: "elf", class: "mage", level: 1 },
      {
        name: "Test Character 2",
        ancestry: "human",
        class: "warrior",
        level: 3
      }
    ];

    localStorage.setItem("characters", JSON.stringify(characters));

    const { getByText, queryByText, getAllByRole } = render(<App />);

    // Wait for characters to load
    await waitFor(() => getByText("Test Character 1"));

    // Click delete button of a character
    const deleteButtons = getAllByRole("button", { name: /eliminar/i });
    fireEvent.click(deleteButtons[0]);

    // Verify character is no longer in the DOM
    await waitFor(() =>
      expect(queryByText("Test Character 1")).not.toBeInTheDocument()
    );
  });
});
