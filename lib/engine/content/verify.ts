/**
 * Console-check: verifieert dat de statische content in dit bestand exact
 * overeenkomt met de tabellen in Kengir-Spelregels.md. Er is nog geen
 * testframework in dit project (zie package.json) — dit script gooit een
 * `Error` zodra iets niet klopt, en logt een samenvatting bij succes.
 *
 * Uitvoeren: `npm run verify:content`.
 */
import { CITIES } from "./cities";
import { MAIN_QUESTS } from "./mainQuests";
import { SECONDARY_QUESTS } from "./secondaryQuests";
import { ZODIAC_SIGNS } from "./zodiacSigns";
import { BOOK_OF_SPELLS } from "./spells";
import { FIEND_TYPES } from "../types";
import type { CityName, DeityName, FiendTypeCount, Spell } from "../types";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`Content-verificatie mislukt: ${message}`);
  }
}

function sameFiendCounts(a: Partial<FiendTypeCount>, b: Partial<FiendTypeCount>): boolean {
  return FIEND_TYPES.every((type) => (a[type] ?? 0) === (b[type] ?? 0));
}

function describeFiendCounts(counts: Partial<FiendTypeCount>): string {
  return FIEND_TYPES.map((type) => `${type}:${counts[type] ?? 0}`).join(" ");
}

function sameSet<T>(a: readonly T[], b: readonly T[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((value, i) => value === sortedB[i]);
}

function verifyCities(): void {
  const expected: Record<CityName, DeityName> = {
    Uruk: "Anu",
    Eridu: "Enki",
    Kish: "Zababa",
    Lagash: "Ningirsu",
    Ur: "Nanna",
    Nippur: "Enlil",
    Shuruppak: "Ninlil",
  };

  assert(CITIES.length === 7, `verwacht 7 steden, kreeg ${CITIES.length}`);
  for (const [stad, godheid] of Object.entries(expected) as [CityName, DeityName][]) {
    const city = CITIES.find((c) => c.naam === stad);
    assert(city !== undefined, `stad ${stad} ontbreekt`);
    assert(
      city!.godheid.naam === godheid,
      `${stad} zou beschermd moeten worden door ${godheid}, maar heeft ${city!.godheid.naam}`
    );
    assert(city!.godheid.stad === stad, `Godheid ${godheid} moet aan stad ${stad} gekoppeld zijn`);
  }
}

function verifyMainQuests(): void {
  const expected: Record<string, [DeityName, DeityName, DeityName]> = {
    SaviourOfIdols: ["Anu", "Nanna", "Ningirsu"],
    ProtectorOfHoliness: ["Enki", "Zababa", "Enlil"],
    LiberatorOfWorship: ["Zababa", "Ningirsu", "Enlil"],
    SalvagerOfTheDivine: ["Enki", "Nanna", "Ninlil"],
    ChampionOfDivinity: ["Enlil", "Nanna", "Enki"],
    RescuerOfGods: ["Ninlil", "Ningirsu", "Anu"],
    GuardianOfHeaven: ["Ninlil", "Anu", "Zababa"],
  };

  assert(MAIN_QUESTS.length === 7, `verwacht 7 hoofdquests, kreeg ${MAIN_QUESTS.length}`);
  for (const [naam, godheden] of Object.entries(expected)) {
    const quest = MAIN_QUESTS.find((q) => q.naam === naam);
    assert(quest !== undefined, `hoofdquest ${naam} ontbreekt`);
    assert(
      sameSet(quest!.godheden, godheden),
      `hoofdquest ${naam} zou ${godheden.join(", ")} moeten herrijzen, maar heeft ${quest!.godheden.join(", ")}`
    );
  }
}

function verifySecondaryQuests(): void {
  const expected: Record<string, [CityName, CityName, CityName]> = {
    ScourgeOfTheSinners: ["Uruk", "Ur", "Lagash"],
    SlayerOfDivinity: ["Eridu", "Kish", "Nippur"],
    NorthernTyrant: ["Kish", "Uruk", "Nippur"],
    SouthernHegemon: ["Eridu", "Ur", "Shuruppak"],
    DestroyerOfEnlightenment: ["Nippur", "Ur", "Eridu"],
    DemolisherOfDecadence: ["Eridu", "Lagash", "Uruk"],
    PurifierOfInsolence: ["Shuruppak", "Uruk", "Kish"],
  };

  assert(SECONDARY_QUESTS.length === 7, `verwacht 7 nevenquests, kreeg ${SECONDARY_QUESTS.length}`);
  for (const [naam, steden] of Object.entries(expected)) {
    const quest = SECONDARY_QUESTS.find((q) => q.naam === naam);
    assert(quest !== undefined, `nevenquest ${naam} ontbreekt`);
    assert(
      sameSet(quest!.steden, steden),
      `nevenquest ${naam} zou ${steden.join(", ")} moeten veroveren, maar heeft ${quest!.steden.join(", ")}`
    );
  }
}

function verifyZodiacSigns(): void {
  const expected: Record<string, { symbool: string; effect: FiendTypeCount }> = {
    Luhunga: { symbool: "♈", effect: { Gallu: 1, Gidim: -1, Udug: 0 } },
    GuAnna: { symbool: "♉", effect: { Gallu: -1, Gidim: 1, Udug: 0 } },
    MastabbaBagal: { symbool: "♊", effect: { Gallu: 1, Gidim: 0, Udug: -1 } },
    AlLul: { symbool: "♋", effect: { Gallu: -1, Gidim: 0, Udug: 1 } },
    Urgula: { symbool: "♌", effect: { Gallu: 0, Gidim: 1, Udug: -1 } },
    AbSin: { symbool: "♍", effect: { Gallu: 0, Gidim: -1, Udug: 1 } },
    ZibBaanna: { symbool: "♎", effect: { Gallu: 1, Gidim: 0, Udug: 0 } },
    Girtab: { symbool: "♏", effect: { Gallu: 0, Gidim: 1, Udug: 0 } },
    Pabilsag: { symbool: "♐", effect: { Gallu: 0, Gidim: 0, Udug: 1 } },
    Suhurmas: { symbool: "♑", effect: { Gallu: -1, Gidim: 0, Udug: 0 } },
    GuLa: { symbool: "♒", effect: { Gallu: 0, Gidim: -1, Udug: 0 } },
    Dununu: { symbool: "♓", effect: { Gallu: 0, Gidim: 0, Udug: -1 } },
  };

  assert(ZODIAC_SIGNS.length === 12, `verwacht 12 Zodiaktekens, kreeg ${ZODIAC_SIGNS.length}`);
  for (const [naam, { symbool, effect }] of Object.entries(expected)) {
    const sign = ZODIAC_SIGNS.find((z) => z.naam === naam);
    assert(sign !== undefined, `Zodiakteken ${naam} ontbreekt`);
    assert(
      sign!.symbool === symbool,
      `Zodiakteken ${naam} zou symbool ${symbool} moeten hebben, kreeg ${sign!.symbool}`
    );
    assert(
      sameFiendCounts(sign!.effect, effect),
      `Zodiakteken ${naam} zou effect [${describeFiendCounts(effect)}] moeten hebben, kreeg [${describeFiendCounts(sign!.effect)}]`
    );
  }
}

interface ExpectedSpell {
  naam: string;
  kosten: Partial<FiendTypeCount>;
  categorie: Spell["categorie"];
}

function verifySpells(): void {
  const expected: ExpectedSpell[] = [
    { naam: "March to Glory", kosten: { Gidim: 1 }, categorie: "spell" },
    { naam: "Heavenly Prayer", kosten: { Gidim: 1 }, categorie: "spell" },
    { naam: "Riding the Ancient Winds", kosten: { Gidim: 2 }, categorie: "spell" },
    { naam: "Under the Blood Moon", kosten: { Gidim: 2, Gallu: 1 }, categorie: "spell" },
    { naam: "Protective Talisman", kosten: { Gallu: 1 }, categorie: "spell" },
    { naam: "Summon Magical Barrier", kosten: { Gallu: 1 }, categorie: "spell" },
    { naam: "Brewing Mastery", kosten: { Gallu: 2 }, categorie: "spell" },
    { naam: "Antediluvian Vigour", kosten: { Gallu: 3 }, categorie: "spell" },
    { naam: "Strength of the Holy Mountain", kosten: { Gallu: 3 }, categorie: "spell" },
    { naam: "Staff of Blinding Brilliance", kosten: { Udug: 1 }, categorie: "spell" },
    { naam: "Dispell Magical Barrier", kosten: { Udug: 1 }, categorie: "spell" },
    { naam: "Supernatural Assistance", kosten: { Udug: 2 }, categorie: "spell" },
    { naam: "Burning Faith", kosten: { Udug: 3 }, categorie: "spell" },
    { naam: "Raging Frenzy", kosten: { Udug: 3 }, categorie: "spell" },
    { naam: "Teleportation Ritual", kosten: { Gidim: 1, Gallu: 1 }, categorie: "spell" },
    { naam: "Teleportation Ritual", kosten: { Gidim: 1, Udug: 1 }, categorie: "spell" },
    { naam: "Teleportation Ritual", kosten: { Udug: 1, Gallu: 1 }, categorie: "spell" },
    { naam: "Demonic Intelligence", kosten: { Udug: 3, Gidim: 2 }, categorie: "permanenteSkill" },
    { naam: "Secret Dagger", kosten: { Gallu: 3, Gidim: 2 }, categorie: "permanenteSkill" },
    { naam: "Fury of the Ancestors", kosten: { Gidim: 3, Udug: 2 }, categorie: "permanenteSkill" },
    { naam: "Summon Firebolt", kosten: { Gallu: 1, Udug: 1 }, categorie: "spell" },
    { naam: "Ardent Ambush", kosten: { Udug: 3, Gallu: 2 }, categorie: "spell" },
    { naam: "Immanent Cataclysm", kosten: { Gallu: 3, Udug: 2 }, categorie: "spell" },
    { naam: "Cosmic Insight", kosten: { Udug: 3, Gidim: 1, Gallu: 1 }, categorie: "spell" },
    { naam: "Blood Incantation", kosten: { Gidim: 1, Udug: 1, Gallu: 1 }, categorie: "spell" },
    { naam: "Resurrection Ritual of Anu", kosten: { Gidim: 1, Udug: 4, Gallu: 1 }, categorie: "herrijzenisspell" },
    { naam: "Resurrection Ritual of Enki", kosten: { Gidim: 4, Udug: 1, Gallu: 1 }, categorie: "herrijzenisspell" },
    { naam: "Resurrection Ritual of Zababa", kosten: { Gidim: 1, Udug: 1, Gallu: 4 }, categorie: "herrijzenisspell" },
    { naam: "Resurrection Ritual of Ningirsu", kosten: { Gidim: 1, Udug: 2, Gallu: 3 }, categorie: "herrijzenisspell" },
    { naam: "Resurrection Ritual of Nanna", kosten: { Gidim: 2, Udug: 1, Gallu: 3 }, categorie: "herrijzenisspell" },
    { naam: "Resurrection Ritual of Enlil", kosten: { Gidim: 3, Udug: 1, Gallu: 2 }, categorie: "herrijzenisspell" },
    { naam: "Resurrection Ritual of Ninlil", kosten: { Gidim: 1, Udug: 3, Gallu: 2 }, categorie: "herrijzenisspell" },
  ];

  assert(
    BOOK_OF_SPELLS.length === expected.length,
    `verwacht ${expected.length} spells (Book of Spells + Herrijzenisspells, Teleportation Ritual als 3 varianten), kreeg ${BOOK_OF_SPELLS.length}`
  );

  const remaining = [...BOOK_OF_SPELLS];
  for (const exp of expected) {
    const index = remaining.findIndex(
      (s) => s.naam === exp.naam && s.categorie === exp.categorie && sameFiendCounts(s.kosten, exp.kosten)
    );
    assert(
      index !== -1,
      `spell "${exp.naam}" met kosten [${describeFiendCounts(exp.kosten)}] (${exp.categorie}) ontbreekt of komt niet overeen`
    );
    remaining.splice(index, 1);
  }
  assert(remaining.length === 0, `onverwachte spell(s) gevonden: ${remaining.map((s) => s.naam).join(", ")}`);

  const herrijzenisGodheden: Record<CityName, DeityName> = {
    Uruk: "Anu",
    Eridu: "Enki",
    Kish: "Zababa",
    Lagash: "Ningirsu",
    Ur: "Nanna",
    Nippur: "Enlil",
    Shuruppak: "Ninlil",
  };
  for (const [stad, godheid] of Object.entries(herrijzenisGodheden) as [CityName, DeityName][]) {
    const spell = BOOK_OF_SPELLS.find(
      (s) => s.categorie === "herrijzenisspell" && s.naam === `Resurrection Ritual of ${godheid}`
    );
    assert(spell !== undefined, `Herrijzenisspell voor ${godheid} ontbreekt`);
    const effect = spell!.effect;
    assert(
      effect.kind === "herrijsGodheid" && effect.godheid === godheid && effect.stad === stad,
      `Herrijzenisspell voor ${godheid} moet Godheid ${godheid} in stad ${stad} doen herrijzen`
    );
  }
}

export function verifyContent(): void {
  verifyCities();
  verifyMainQuests();
  verifySecondaryQuests();
  verifyZodiacSigns();
  verifySpells();
}

verifyContent();
console.log(
  `Content-check geslaagd: ${CITIES.length} steden, ${MAIN_QUESTS.length} hoofdquests, ` +
    `${SECONDARY_QUESTS.length} nevenquests, ${ZODIAC_SIGNS.length} Zodiaktekens, ` +
    `${BOOK_OF_SPELLS.length} spells (incl. Herrijzenisspells) komen overeen met Kengir-Spelregels.md.`
);
