export const characterMock = {
  name: "Pepe",
  ancestry: "elf",
  class: "assassin",
  level: 1,
  attackBonus: 0,
  armorClass: 0,
  hitPoints: 1,
  weapons: [],
  armor: [],
  ancestryTraits: {
    size: "mediano",
    speed: 10,
    languages: [
      "común",
      "élfico",
      "enano",
      "orco",
      "goblin",
      "halfling",
      "dracónico"
    ],
    preferredClass: [null, null, null, null, null, null, null]
  },
  classTraits: {
    name: "Asesino",
    mainAttribute: "dex",
    hitDice: 6,
    extraHitPoints: 2,
    weapons: ["all"],
    armor: [
      {
        name: "Armadura de cuero acolchado",
        cost: 5,
        AC: 1,
        weight: 5,
        VE: 2
      },
      {
        name: "Armadura de cuero endurecido",
        cost: 20,
        AC: 2,
        weight: 7,
        VE: 2
      },
      {
        name: "Armadura de cuero tachonado",
        cost: 30,
        AC: 3,
        weight: 10,
        VE: 3
      }
    ],
    abilities: [
      "Ataque furtivo",
      "Ataque letal",
      "Detectar punto débil (Sab)",
      "Disfraz (Car)",
      "Envenenar",
      "Escalar (Des)",
      "Esconderse",
      "Escuchar (Sab)",
      "Montar y desmontar trampas (Int)",
      "Moverse en silencio (Des)"
    ]
  },
  stats: { str: 15, dex: 17, con: 9, int: 11, wis: 18, cha: 8 },
  extra: [],
  primaryStats: ["dex", "int"],
  experiencePoints: 0
};
