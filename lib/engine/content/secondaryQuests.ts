/**
 * De 7 nevenquests: elke quest vereist het veroveren (niet per se
 * herrijzen) van 3 specifieke steden.
 *
 * Bron: Kengir-Spelregels.md § "De nevenquests".
 */
import type { SecondaryQuest } from "../types";

export const SECONDARY_QUESTS: SecondaryQuest[] = [
  { naam: "ScourgeOfTheSinners", steden: ["Uruk", "Ur", "Lagash"] },
  { naam: "SlayerOfDivinity", steden: ["Eridu", "Kish", "Nippur"] },
  { naam: "NorthernTyrant", steden: ["Kish", "Uruk", "Nippur"] },
  { naam: "SouthernHegemon", steden: ["Eridu", "Ur", "Shuruppak"] },
  { naam: "DestroyerOfEnlightenment", steden: ["Nippur", "Ur", "Eridu"] },
  { naam: "DemolisherOfDecadence", steden: ["Eridu", "Lagash", "Uruk"] },
  { naam: "PurifierOfInsolence", steden: ["Shuruppak", "Uruk", "Kish"] },
];
