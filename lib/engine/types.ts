/**
 * Kengir: Heroes of Sumeria — kern data-modellen.
 *
 * Alles hier is pure data (geen classes met gedrag): een `GameState` is
 * volledig serialiseerbaar als JSON. Engine-functies (nog te bouwen in
 * latere stappen) nemen een `GameState` (+ eventueel een actie) en geven
 * een nieuwe `GameState` terug, of een lijst geldige acties.
 *
 * Bron: Kengir-Spelregels.md. Plekken waar de spelregels geen expliciete
 * keuze vastleggen zijn gemarkeerd met "AANNAME:".
 */

// ---------------------------------------------------------------------------
// Basistypen
// ---------------------------------------------------------------------------

/**
 * AANNAME: de spelregels noemen "4 Held-figuren" maar leggen de kleuren zelf
 * niet vast. Dit zijn de 4 gangbare bordspel-kleuren als startpunt — pas aan
 * zodra de fysieke componenten bekend zijn.
 */
export type PlayerColor = "rood" | "blauw" | "geel" | "groen";

export const CITY_NAMES = [
  "Uruk",
  "Eridu",
  "Kish",
  "Lagash",
  "Ur",
  "Nippur",
  "Shuruppak",
] as const;
export type CityName = (typeof CITY_NAMES)[number];

export const DEITY_NAMES = [
  "Anu",
  "Enki",
  "Zababa",
  "Ningirsu",
  "Nanna",
  "Enlil",
  "Ninlil",
] as const;
export type DeityName = (typeof DEITY_NAMES)[number];

export const FIEND_TYPES = ["Gidim", "Udug", "Gallu"] as const;
export type FiendType = (typeof FIEND_TYPES)[number];

/** Aantal Spellkaarten per type, bv. een hand of een kostenformule. */
export type FiendTypeCount = Record<FiendType, number>;

export const ZODIAC_SIGN_NAMES = [
  "Luhunga",
  "GuAnna",
  "MastabbaBagal",
  "AlLul",
  "Urgula",
  "AbSin",
  "ZibBaanna",
  "Girtab",
  "Pabilsag",
  "Suhurmas",
  "GuLa",
  "Dununu",
] as const;
export type ZodiacSignName = (typeof ZODIAC_SIGN_NAMES)[number];

export const PERMANENT_SKILL_NAMES = [
  "DemonicIntelligence",
  "SecretDagger",
  "FuryOfTheAncestors",
] as const;
export type PermanentSkillName = (typeof PERMANENT_SKILL_NAMES)[number];

export const MAIN_QUEST_NAMES = [
  "SaviourOfIdols",
  "ProtectorOfHoliness",
  "LiberatorOfWorship",
  "SalvagerOfTheDivine",
  "ChampionOfDivinity",
  "RescuerOfGods",
  "GuardianOfHeaven",
] as const;
export type MainQuestName = (typeof MAIN_QUEST_NAMES)[number];

export const SECONDARY_QUEST_NAMES = [
  "ScourgeOfTheSinners",
  "SlayerOfDivinity",
  "NorthernTyrant",
  "SouthernHegemon",
  "DestroyerOfEnlightenment",
  "DemolisherOfDecadence",
  "PurifierOfInsolence",
] as const;
export type SecondaryQuestName = (typeof SECONDARY_QUEST_NAMES)[number];

/** Fase 1/2/3 van een beurt, zie Kengir-Spelregels.md § "Het verloop van een beurt". */
export type GamePhase = "Regeneratie" | "Actie" | "Eind";

// ---------------------------------------------------------------------------
// Positie / bord
// ---------------------------------------------------------------------------

/**
 * Een positie op het bord. De precieze indeling van vakken binnen een
 * sectie wordt pas in Stap 3 (bordopbouw) vastgelegd; `tileId` is voor nu
 * een ondoorzichtige id die uniek is binnen zijn `sectionId`.
 */
export interface Position {
  sectionId: string;
  tileId: string;
}

/** Inhoud van een enkel vak. Discriminated union op `type`. */
export type TileContent =
  | { type: "leeg" }
  | { type: "grafsteen" }
  | { type: "fiend"; fiend: Fiend }
  | { type: "magischeBarriere"; geplaatstDoor: PlayerColor }
  | { type: "herrijzenisdrankje" }
  | { type: "hemelseZegening" }
  | { type: "startendeToren"; kleur: PlayerColor }
  /** Het middenvak van een sectie waar de stad + Godheid zich bevinden. */
  | { type: "stad"; stad: CityName };

export interface Tile {
  id: string;
  position: Position;
  content: TileContent;
  /** Aangrenzende vakken, incl. eventueel over sectiegrenzen heen. */
  adjacentTileIds: string[];
}

export interface BoardSection {
  id: string;
  /** Elke sectie heeft precies 1 stad in het midden. */
  stad: CityName;
  heeftRivier: boolean;
  tiles: Tile[];
  /** Ids van de secties die hieraan grenzen. */
  aangrenzendeSecties: string[];
}

export interface Board {
  sections: BoardSection[];
}

// ---------------------------------------------------------------------------
// Fiends
// ---------------------------------------------------------------------------

export interface Fiend {
  id: string;
  type: FiendType;
  life: number;
}

// ---------------------------------------------------------------------------
// Spellkaarten en Spells
// ---------------------------------------------------------------------------

/**
 * Een Spellkaart is uitsluitend een type — geen individuele identiteit.
 * Trek-/aflegstapels zijn arrays van deze losse tokens; de hand van een
 * Held wordt als aggregaat bijgehouden (zie `Hero.hand`).
 */
export interface SpellCard {
  type: FiendType;
}

/**
 * Effect van een spell uit het Book of Spells. Discriminated union zodat de
 * engine (latere stappen) exhaustief kan pattern-matchen zonder vrije tekst
 * te hoeven interpreteren.
 */
export type SpellEffect =
  /** Tijdelijke (deze beurt) of permanente bonus op Movement. */
  | {
      kind: "movementBonus";
      amount: number;
      duration: "dezeBeurt" | "permanent";
      /** Negeer Fiends/Grafstenen onderweg, behalve de laatste stap. */
      negeerEncountersOnderweg: boolean;
    }
  /** Verplaats het Zodiakteken naar een teken naar keuze. */
  | { kind: "verplaatsZodiakteken" }
  /** Verwijder N Grafstenen naar keuze van het bord. */
  | { kind: "verwijderGrafstenen"; aantal: number }
  /** Bonus op Strength, alleen geldig tijdens het huidige gevecht. Stapelbaar. */
  | { kind: "strengthBonusDitGevecht"; amount: number; stapelbaar: boolean }
  /** Plaats een Magische Barrière grenzend aan de castende Held. */
  | { kind: "plaatsMagischeBarriere" }
  /** Verwijder een Magische Barrière grenzend aan de castende Held. */
  | { kind: "verwijderMagischeBarriere" }
  /** Ontvang onmiddellijk een Herrijzenisdrankje, indien beschikbaar. */
  | { kind: "ontvangHerrijzenisdrankje" }
  /** Bonus op elke dobbelsteenwaarde tijdens het huidige gevecht. */
  | { kind: "diceBonusDitGevecht"; amount: number }
  /** Permanente bonus op Strength. */
  | { kind: "permanentStrengthBonus"; amount: number }
  /** Vlucht onmiddellijk uit het huidige gevecht. */
  | { kind: "vluchtUitGevecht" }
  /** Als de Held op Max Life is: krijg extra Life, alleen dit gevecht. */
  | { kind: "conditioneleHeal"; amount: number; vereist: "opMaxLife" }
  /** Permanente bonus op Max Life. */
  | { kind: "permanentMaxLifeBonus"; amount: number }
  /** Permanente bonus op Max Life, en herstel direct alle Life. */
  | { kind: "permanentMaxLifeBonusEnVolledigeHeal"; amount: number }
  /** Doe onmiddellijk schade aan een tegenstander (Fiend, Godheid of Held). */
  | { kind: "directeSchade"; amount: number; doelwit: "fiend" | "godheid" | "held" }
  /**
   * Doe schade op afstand (max `bereik` vakken) aan een Fiend, Held of
   * Godheid. `amount` is variabel per aantal ingezette kaarten (vandaar
   * "X" in de spelregels) en wordt door de engine bepaald a.d.h.v. de
   * daadwerkelijk afgelegde kaarten.
   */
  | { kind: "afstandsSchade"; bereik: number }
  /** Herrijs onmiddellijk bij een zelf-bezeten Altaar naar keuze, zonder verlies. */
  | { kind: "teleportNaarAltaarEnHerrijs" }
  /** Leer een permanente skill. */
  | { kind: "leerSkill"; skill: PermanentSkillName }
  /**
   * Doe alle verslagen Fiends in hun sectie herrijzen (behalve waar alle
   * Fiends in de stadssectie al verslagen zijn), verwijder Grafstenen,
   * en schud de aflegstapel tot een nieuwe trekstapel.
   */
  | { kind: "immanentCataclysm"; fiendLifeBonus: number }
  /**
   * Dwing andere Helden hun kaarten open te spelen; kies daarna één van
   * twee sub-effecten (eenmalige buit, of doorlopend meelezen).
   */
  | {
      kind: "cosmicInsight";
      keuze: "eenmaligeBuit" | "doorlopendMeelezen";
    }
  /** Vernietig een stad permanent. Vereist het bezit van de Tablet. */
  | { kind: "vernietigStad" }
  /** Herrijzenisspell: bouw Altaar II en laat de bijbehorende Godheid herrijzen. */
  | { kind: "herrijsGodheid"; godheid: DeityName; stad: CityName };

export interface Spell {
  naam: string;
  /** Exacte kaarten die afgelegd moeten worden om deze spell te casten. */
  kosten: Partial<FiendTypeCount>;
  effect: SpellEffect;
  /** Herrijzenisspells en permanente skills werken net iets anders qua timing/herbruikbaarheid. */
  categorie: "spell" | "herrijzenisspell" | "permanenteSkill";
}

// ---------------------------------------------------------------------------
// Quests
// ---------------------------------------------------------------------------

export interface MainQuest {
  naam: MainQuestName;
  /** De 3 Godheden die de Held moet doen herrijzen. */
  godheden: [DeityName, DeityName, DeityName];
}

export interface SecondaryQuest {
  naam: SecondaryQuestName;
  /** De 3 steden die de Held moet veroveren. */
  steden: [CityName, CityName, CityName];
}

// ---------------------------------------------------------------------------
// Zodiakteken
// ---------------------------------------------------------------------------

export interface ZodiacSign {
  naam: ZodiacSignName;
  symbool: string;
  /** Life-modifier per Fiend-type onder dit teken (0 = geen effect). */
  effect: FiendTypeCount;
}

// ---------------------------------------------------------------------------
// Godheid / Stad
// ---------------------------------------------------------------------------

export interface DeityStats {
  life: number;
  strength: number;
}

export interface Deity {
  naam: DeityName;
  stad: CityName;
  /** Vaste basiswaarden zoals op het Godheid-statblad. */
  basisStats: DeityStats;
  /** Werkelijke resterende Life; kan niet regenereren. */
  huidigeLife: number;
  isHerrezen: boolean;
  herrezenDoor?: PlayerColor;
}

export type AltaarNiveau = "geen" | "I" | "II";

export interface City {
  naam: CityName;
  godheid: Deity;
  boardSectionId: string;
  altaarNiveau: AltaarNiveau;
  /** Eigenaar van het (huidige) Altaar; onbepaald zolang er geen Altaar staat. */
  altaarEigenaar?: PlayerColor;
  isVernietigd: boolean;
}

// ---------------------------------------------------------------------------
// Held
// ---------------------------------------------------------------------------

export interface HeroStats {
  life: number;
  maxLife: number;
  strength: number;
  movement: number;
}

export const STARTING_HERO_STATS: HeroStats = {
  life: 6,
  maxLife: 6,
  strength: 1,
  movement: 1,
};

export interface Hero {
  id: string;
  kleur: PlayerColor;
  positie: Position;
  stats: HeroStats;
  geleerdeSkills: PermanentSkillName[];
  /** Hand: aantal kaarten per type, geen individuele kaartidentiteit. */
  hand: FiendTypeCount;
  /**
   * Spellkaarten gewonnen tijdens de huidige beurt — nog niet bruikbaar,
   * gaan pas naar `hand` zodra Fase 3 (Eind) bereikt wordt. Bij het
   * sneuvelen van de Held gaan deze terug naar de onderkant van de
   * trekstapel i.p.v. naar `hand`.
   */
  kaartenGewonnenDezeBeurt: FiendTypeCount;
  hoofdquest: MainQuestName;
  nevenquest: SecondaryQuestName;
  heeftTabletOfBloodIncantation: boolean;
  /** Aantal meegedragen Herrijzenisdrankjes (kunnen later gedronken worden bij verlies). */
  aantalHerrijzenisdrankjes: number;
  /** true zodra de hoofdquest onmogelijk werd (stad vernietigd) en de Held zich moest terugtrekken. */
  isTeruggetrokken: boolean;
}

// ---------------------------------------------------------------------------
// GameState
// ---------------------------------------------------------------------------

/** Een tijdelijke ZoC-afspraak tussen twee Helden, geldig voor de lopende beurt. */
export interface ZoneOfControlAfspraak {
  heroIds: [string, string];
  /** `GameState.beurtNummer` waarin de afspraak gemaakt is; moet elke beurt herbevestigd worden. */
  beurtNummer: number;
}

export interface GameState {
  spelers: Hero[];
  /** Volgorde waarin spelers hun beurt nemen (array van Hero-ids). */
  spelerVolgorde: string[];
  actieveSpelerId: string;
  huidigeFase: GamePhase;
  /** Telt op bij elke voltooide beurt; gebruikt om ZoC-afspraken te laten verlopen. */
  beurtNummer: number;

  board: Board;
  steden: City[];

  huidigZodiakteken: ZodiacSignName;

  trekstapel: SpellCard[];
  aflegstapel: SpellCard[];

  zoneOfControlAfspraken: ZoneOfControlAfspraak[];

  /** Id van de winnende Held, gezet zodra een hoofdquest voltooid is. */
  winnaarId?: string;
}
