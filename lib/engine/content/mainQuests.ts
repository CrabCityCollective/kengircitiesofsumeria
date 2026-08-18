/**
 * De 7 hoofdquests: elke quest vereist het doen herrijzen van 3
 * specifieke Godheden.
 *
 * Bron: Kengir-Spelregels.md § "De hoofdquests".
 */
import type { MainQuest } from "../types";

export const MAIN_QUESTS: MainQuest[] = [
  { naam: "SaviourOfIdols", godheden: ["Anu", "Nanna", "Ningirsu"] },
  { naam: "ProtectorOfHoliness", godheden: ["Enki", "Zababa", "Enlil"] },
  { naam: "LiberatorOfWorship", godheden: ["Zababa", "Ningirsu", "Enlil"] },
  { naam: "SalvagerOfTheDivine", godheden: ["Enki", "Nanna", "Ninlil"] },
  { naam: "ChampionOfDivinity", godheden: ["Enlil", "Nanna", "Enki"] },
  { naam: "RescuerOfGods", godheden: ["Ninlil", "Ningirsu", "Anu"] },
  { naam: "GuardianOfHeaven", godheden: ["Ninlil", "Anu", "Zababa"] },
];
