import React, { useState, useEffect } from "react";
import CharacterList from "./components/character-list/character-list";
import GenerateCharacter from "./components/generate-character/generate-character";
import { Character } from "./types/character-type";
import CharacterDetail from "./components/character-details/character-details";

const loadedCharacters = () => {
  const loadedCharacters = localStorage.getItem("characters");
  if (loadedCharacters) {
    return JSON.parse(loadedCharacters);
  } else {
    return [];
  }
};
const App = () => {
  const [characters, setCharacters] = useState<Character[]>(loadedCharacters());
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  // Load the characters from localStorage on mount
  // useEffect(() => {
  //   const loadedCharacters = localStorage.getItem("characters");
  //   if (loadedCharacters) {
  //     setCharacters(JSON.parse(loadedCharacters));
  //   } else {
  //     setCharacters([]);
  //   }
  // }, []);

  // Stores the characters in localStorage
  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters));
  }, [characters]);

  const onCharacterCreated = (character: Character) => {
    setCharacters((prevCharacters: Character[]) => [
      ...prevCharacters,
      character
    ]);
  };

  return (
    <div>
      {!selectedCharacter && (
        <GenerateCharacter onCharacterCreated={onCharacterCreated} />
      )}
      {!selectedCharacter && (
        <CharacterList
          characters={characters}
          onCharacterClick={setSelectedCharacter}
        />
      )}
      {selectedCharacter && (
        <CharacterDetail
          character={selectedCharacter}
          goBack={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
};

export default App;
