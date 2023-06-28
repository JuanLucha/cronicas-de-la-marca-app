import React from "react";
import { Character } from "../../types/character-type";
import "./character-list.css";

interface CharacterListProps {
  characters: Character[];
  onCharacterClick: (character: Character) => void;
  onDeleteCharacter: (character: Character) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  onCharacterClick,
  onDeleteCharacter // Nueva función de borrado
}) => {
  return (
    <ul className="character-list">
      {" "}
      {/* <ul> or <ol> wrapping the list of characters */}
      {characters.map((character, index) => (
        <li
          key={index}
          onClick={() => onCharacterClick(character)}
          className="character-list__item"
        >
          <p>{character.name}</p>
          <p>{character.ancestry}</p>
          <p>{character.class}</p>
          <p>Level: {character.level}</p>

          {/* Nuevo botón de eliminación */}
          <button
            onClick={(event) => {
              event.stopPropagation(); // Esto previene que el evento de clic en el contenedor se active
              onDeleteCharacter(character);
            }}
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CharacterList;
