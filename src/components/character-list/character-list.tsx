import React from "react";
import { Character } from "../../types/character-type";
import "./character-list.css";

interface CharacterListProps {
  characters: Character[];
  onCharacterClick: (character: Character) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  onCharacterClick
}) => {
  return (
    <div className="character-list">
      {characters.map((character, index) => (
        <div
          key={index}
          onClick={() => onCharacterClick(character)}
          className="character-list__item"
        >
          <p>{character.name}</p>
          <p>{character.ancestry}</p>
          <p>{character.class}</p>
          <p>Level: {character.level}</p>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
