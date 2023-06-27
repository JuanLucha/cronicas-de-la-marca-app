export type Character = {
  name: string;
  ancestry: string;
  class: string;
  level: number;
  attackBonus: number;
  armorClass: number;
  hitPoints: number;
  weapons: string[];
  armor: string[];
  ancestryTraits: {
    size: string;
    speed: number;
    languages: string[];
    preferredClass: (string | null)[];
  };
  classTraits: {
    name: string;
    mainAttribute: string;
    hitDice: number;
    extraHitPoints: number;
    weapons: string[];
    armor: {
      name: string;
      cost: number;
      AC: number;
      weight: number;
      VE: number;
    }[];
    abilities: string[];
  };
  stats: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
  extra: any[];
  primaryStats: string[];
  experiencePoints: number;
};
