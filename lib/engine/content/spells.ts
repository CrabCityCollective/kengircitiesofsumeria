/**
 * Het Book of Spells, inclusief de 7 Herrijzenisspells en de 3 permanente
 * skills.
 *
 * Bron: Kengir-Spelregels.md § "Book of Spells" en § "Herrijzenisspells".
 *
 * AANNAME: "Teleportation Ritual" heeft in de spelregels drie alternatieve
 * kaartcombinaties (𒄇𒋼𒇲 / 𒄇𒌜 / 𒌜𒋼𒇲). `Spell.kosten` modelleert maar één
 * vaste combinatie per Spell, dus dit is hier opgesplitst in drie losse
 * castbare varianten met identiek effect (elk telt als "de spell casten").
 *
 * AANNAME: "Summon Firebolt" heeft een variabele kostencomponent (X extra
 * Gidim-kaarten bepalen de schade, zie `afstandsSchade` in ../types.ts).
 * `kosten` bevat hier alleen de vaste basiskosten (𒋼𒇲𒌜); de variabele X
 * wordt pas door de engine (latere stappen) bepaald a.d.h.v. de
 * daadwerkelijk afgelegde extra kaarten.
 */
import type { Spell } from "../types";

export const BOOK_OF_SPELLS: Spell[] = [
  {
    naam: "March to Glory",
    kosten: { Gidim: 1 },
    effect: {
      kind: "movementBonus",
      amount: 2,
      duration: "dezeBeurt",
      negeerEncountersOnderweg: true,
    },
    categorie: "spell",
  },
  {
    naam: "Heavenly Prayer",
    kosten: { Gidim: 1 },
    effect: { kind: "verplaatsZodiakteken" },
    categorie: "spell",
  },
  {
    naam: "Riding the Ancient Winds",
    kosten: { Gidim: 2 },
    effect: {
      kind: "movementBonus",
      amount: 1,
      duration: "permanent",
      negeerEncountersOnderweg: true,
    },
    categorie: "spell",
  },
  {
    naam: "Under the Blood Moon",
    kosten: { Gidim: 2, Gallu: 1 },
    effect: { kind: "verwijderGrafstenen", aantal: 5 },
    categorie: "spell",
  },
  {
    naam: "Protective Talisman",
    kosten: { Gallu: 1 },
    effect: { kind: "strengthBonusDitGevecht", amount: 2, stapelbaar: true },
    categorie: "spell",
  },
  {
    naam: "Summon Magical Barrier",
    kosten: { Gallu: 1 },
    effect: { kind: "plaatsMagischeBarriere" },
    categorie: "spell",
  },
  {
    naam: "Brewing Mastery",
    kosten: { Gallu: 2 },
    effect: { kind: "ontvangHerrijzenisdrankje" },
    categorie: "spell",
  },
  {
    naam: "Antediluvian Vigour",
    kosten: { Gallu: 3 },
    effect: { kind: "diceBonusDitGevecht", amount: 2 },
    categorie: "spell",
  },
  {
    naam: "Strength of the Holy Mountain",
    kosten: { Gallu: 3 },
    effect: { kind: "permanentStrengthBonus", amount: 1 },
    categorie: "spell",
  },
  {
    naam: "Staff of Blinding Brilliance",
    kosten: { Udug: 1 },
    effect: { kind: "vluchtUitGevecht" },
    categorie: "spell",
  },
  {
    naam: "Dispell Magical Barrier",
    kosten: { Udug: 1 },
    effect: { kind: "verwijderMagischeBarriere" },
    categorie: "spell",
  },
  {
    naam: "Supernatural Assistance",
    kosten: { Udug: 2 },
    effect: { kind: "conditioneleHeal", amount: 2, vereist: "opMaxLife" },
    categorie: "spell",
  },
  {
    naam: "Burning Faith",
    kosten: { Udug: 3 },
    effect: { kind: "permanentMaxLifeBonus", amount: 1 },
    categorie: "spell",
  },
  {
    naam: "Raging Frenzy",
    kosten: { Udug: 3 },
    effect: { kind: "directeSchade", amount: 5, doelwit: ["fiend", "godheid", "held"] },
    categorie: "spell",
  },
  {
    naam: "Teleportation Ritual",
    kosten: { Gidim: 1, Gallu: 1 },
    effect: { kind: "teleportNaarAltaarEnHerrijs" },
    categorie: "spell",
  },
  {
    naam: "Teleportation Ritual",
    kosten: { Gidim: 1, Udug: 1 },
    effect: { kind: "teleportNaarAltaarEnHerrijs" },
    categorie: "spell",
  },
  {
    naam: "Teleportation Ritual",
    kosten: { Udug: 1, Gallu: 1 },
    effect: { kind: "teleportNaarAltaarEnHerrijs" },
    categorie: "spell",
  },
  {
    naam: "Demonic Intelligence",
    kosten: { Udug: 3, Gidim: 2 },
    effect: { kind: "leerSkill", skill: "DemonicIntelligence" },
    categorie: "permanenteSkill",
  },
  {
    naam: "Secret Dagger",
    kosten: { Gallu: 3, Gidim: 2 },
    effect: { kind: "leerSkill", skill: "SecretDagger" },
    categorie: "permanenteSkill",
  },
  {
    naam: "Fury of the Ancestors",
    kosten: { Gidim: 3, Udug: 2 },
    effect: { kind: "leerSkill", skill: "FuryOfTheAncestors" },
    categorie: "permanenteSkill",
  },
  {
    naam: "Summon Firebolt",
    kosten: { Gallu: 1, Udug: 1 },
    effect: { kind: "afstandsSchade", bereik: 2 },
    categorie: "spell",
  },
  {
    naam: "Ardent Ambush",
    kosten: { Udug: 3, Gallu: 2 },
    effect: { kind: "permanentMaxLifeBonusEnVolledigeHeal", amount: 5 },
    categorie: "spell",
  },
  {
    naam: "Immanent Cataclysm",
    kosten: { Gallu: 3, Udug: 2 },
    effect: { kind: "immanentCataclysm", fiendLifeBonus: 1 },
    categorie: "spell",
  },
  {
    naam: "Cosmic Insight",
    kosten: { Udug: 3, Gidim: 1, Gallu: 1 },
    effect: { kind: "cosmicInsight" },
    categorie: "spell",
  },
  {
    naam: "Blood Incantation",
    kosten: { Gidim: 1, Udug: 1, Gallu: 1 },
    effect: { kind: "vernietigStad" },
    categorie: "spell",
  },
  {
    naam: "Resurrection Ritual of Anu",
    kosten: { Gidim: 1, Udug: 4, Gallu: 1 },
    effect: { kind: "herrijsGodheid", godheid: "Anu", stad: "Uruk" },
    categorie: "herrijzenisspell",
  },
  {
    naam: "Resurrection Ritual of Enki",
    kosten: { Gidim: 4, Udug: 1, Gallu: 1 },
    effect: { kind: "herrijsGodheid", godheid: "Enki", stad: "Eridu" },
    categorie: "herrijzenisspell",
  },
  {
    naam: "Resurrection Ritual of Zababa",
    kosten: { Gidim: 1, Udug: 1, Gallu: 4 },
    effect: { kind: "herrijsGodheid", godheid: "Zababa", stad: "Kish" },
    categorie: "herrijzenisspell",
  },
  {
    naam: "Resurrection Ritual of Ningirsu",
    kosten: { Gidim: 1, Udug: 2, Gallu: 3 },
    effect: { kind: "herrijsGodheid", godheid: "Ningirsu", stad: "Lagash" },
    categorie: "herrijzenisspell",
  },
  {
    naam: "Resurrection Ritual of Nanna",
    kosten: { Gidim: 2, Udug: 1, Gallu: 3 },
    effect: { kind: "herrijsGodheid", godheid: "Nanna", stad: "Ur" },
    categorie: "herrijzenisspell",
  },
  {
    naam: "Resurrection Ritual of Enlil",
    kosten: { Gidim: 3, Udug: 1, Gallu: 2 },
    effect: { kind: "herrijsGodheid", godheid: "Enlil", stad: "Nippur" },
    categorie: "herrijzenisspell",
  },
  {
    naam: "Resurrection Ritual of Ninlil",
    kosten: { Gidim: 1, Udug: 3, Gallu: 2 },
    effect: { kind: "herrijsGodheid", godheid: "Ninlil", stad: "Shuruppak" },
    categorie: "herrijzenisspell",
  },
];
