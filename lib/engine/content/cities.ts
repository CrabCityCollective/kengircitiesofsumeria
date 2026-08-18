/**
 * Statische inhoud: de 7 oude steden van Kengir en hun patroongoden.
 *
 * Bron: Kengir-Spelregels.md § "De zeven oude steden van Kengir, en hun
 * patroongoden".
 *
 * AANNAME: `boardSectionId` en de precieze bordindeling worden pas in
 * Stap 3 (bordopbouw) vastgelegd — hier een stabiele placeholder-id per
 * stad die in Stap 3 vervangen/aangevuld kan worden.
 *
 * AANNAME: de spelregels noemen "7 Godheid-statbladen" als fysiek
 * component, maar leggen de exacte Life/Strength-waarden per Godheid niet
 * vast in de tekst. Alle Godheden starten hier met dezelfde placeholder-
 * waarden totdat de echte statbladen bekend zijn.
 */
import type { City, CityName, Deity, DeityName } from "../types";

const STARTING_DEITY_STATS = { life: 6, strength: 2 } as const;

function createDeity(naam: DeityName, stad: CityName): Deity {
  return {
    naam,
    stad,
    basisStats: { ...STARTING_DEITY_STATS },
    huidigeLife: STARTING_DEITY_STATS.life,
    isHerrezen: false,
  };
}

function createCity(naam: CityName, godheidNaam: DeityName): City {
  return {
    naam,
    godheid: createDeity(godheidNaam, naam),
    boardSectionId: `sectie-${naam.toLowerCase()}`,
    altaarNiveau: "geen",
    isVernietigd: false,
  };
}

export const CITIES: City[] = [
  createCity("Uruk", "Anu"),
  createCity("Eridu", "Enki"),
  createCity("Kish", "Zababa"),
  createCity("Lagash", "Ningirsu"),
  createCity("Ur", "Nanna"),
  createCity("Nippur", "Enlil"),
  createCity("Shuruppak", "Ninlil"),
];
