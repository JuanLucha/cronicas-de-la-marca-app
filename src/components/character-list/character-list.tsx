import React from "react";

// Define a type for your characters
interface Character {
  name: string;
  ancestry: string;
  class: string;
  level: number;
}

// Define a type for the component props
interface CharacterListProps {
  characters: Character[];
  onCharacterClick: (character: Character) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  onCharacterClick
}) => {
  return (
    <ul>
      {characters.map((character, index) => (
        <li key={index} onClick={() => onCharacterClick(character)}>
          <p>{character.name}</p>
          <p>{character.ancestry}</p>
          <p>{character.class}</p>
          <p>Level: {character.level}</p>
        </li>
      ))}
    </ul>
  );
};

export default CharacterList;
