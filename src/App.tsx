import React, { useState, useEffect } from "react";
import CharacterList from "./components/character-list/character-list";
import GenerateCharacter from "./components/generate-character/generate-character";
import { Character } from "./types/character-type";

const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  // Load the characters from localStorage on mount
  useEffect(() => {
    const loadedCharacters = localStorage.getItem("characters");
    if (loadedCharacters) {
      setCharacters(JSON.parse(loadedCharacters));
    }
  }, []);

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
      <GenerateCharacter onCharacterCreated={onCharacterCreated} />
      <CharacterList characters={characters} onCharacterClick={() => null} />
    </div>
  );
};

export default App;
