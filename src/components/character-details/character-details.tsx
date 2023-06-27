import { Character } from "../../types/character-type";
import "./character-details.css";

const CharacterDetail = ({
  character,
  goBack
}: {
  character: Character;
  goBack: () => void;
}) => {
  if (!character) {
    return <p>Selecciona un personaje para ver los detalles.</p>;
  }

  return (
    <div className="character-detail">
      <h2>{character.name}</h2>
      <p>Ascendencia: {character.ancestry}</p>
      <p>Clase: {character.class}</p>
      <p>Nivel: {character.level}</p>

      <h3>Características</h3>
      {Object.entries(character.stats).map(([stat, value]) => (
        <p key={stat}>
          {stat}: {value}
        </p>
      ))}

      <p>Puntos de Experiencia: {character.experiencePoints}</p>

      <p>Ataque: {character.attackBonus}</p>
      <p>Clase de Armadura: {character.armorClass}</p>
      <p>Puntos de golpe: {character.hitPoints}</p>

      <h3>Rasgos de ascendencia</h3>
      <p>Tamaño: {character.ancestryTraits.size}</p>
      <p>Velocidad: {character.ancestryTraits.speed}</p>
      <p>Idiomas: {character.ancestryTraits.languages.join(", ")}</p>

      <h3>Rasgos de clase</h3>
      <p>Nombre de Clase: {character.classTraits.name}</p>
      <p>Atributo principal: {character.classTraits.mainAttribute}</p>
      <p>Habilidades:</p>
      <ul>
        {character.classTraits.abilities.map((ability, index) => (
          <li key={index}>{ability}</li>
        ))}
      </ul>

      <button onClick={goBack}>Volver</button>
    </div>
  );
};

export default CharacterDetail;
