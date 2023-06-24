import React from "react";
import { render, fireEvent } from "@testing-library/react";
import generateCharacter from "cronicas-de-la-marca-lib";
import GenerateCharacter from "./generate-character";

jest.mock("cronicas-de-la-marca-lib", () => ({
  __esModule: true,
  default: jest.fn()
}));

describe("GenerateCharacter", () => {
  let mockGenerateCharacter;

  beforeEach(() => {
    mockGenerateCharacter = generateCharacter as jest.MockedFunction<
      typeof generateCharacter
    >;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("does not call generateCharacter when button is clicked if fields are not selected", () => {
    const { getByText } = render(<GenerateCharacter />);
    fireEvent.click(getByText("Generar personaje"));

    expect(mockGenerateCharacter).not.toHaveBeenCalled();
  });

  it("shows an error when not all fields are filled and button is clicked", () => {
    const onCharacterCreated = jest.fn();
    const { getByText, getByLabelText } = render(
      <GenerateCharacter onCharacterCreated={onCharacterCreated} />
    );

    const button = getByText("Generar personaje");

    // Simula el cambio de los campos para que estén vacíos.
    fireEvent.change(getByLabelText(/nombre/i), { target: { value: "" } });
    fireEvent.change(getByLabelText(/ascendencia/i), { target: { value: "" } });
    fireEvent.change(getByLabelText(/clase/i), { target: { value: "" } });
    fireEvent.change(getByLabelText(/nivel/i), { target: { value: "" } });

    // Simula el click en el botón
    fireEvent.click(button);

    // Ahora, el mensaje de error debería estar visible
    expect(getByText("Por favor, selecciona todos los campos")).toBeDefined();
  });
});
