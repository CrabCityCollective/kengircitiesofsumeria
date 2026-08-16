# Kengir: Heroes of Sumeria — Stappenplan voor Claude Code

Geef deze opdrachten één voor één aan Claude Code, in volgorde. Wacht na elke stap tot Claude Code klaar is en test/review het resultaat voordat je naar de volgende stap gaat. Geef bij Stap 1 ook `Kengir-Spelregels.md` mee als bijlage/context.

---

## Stap 1: Project-setup en TypeScript data-modellen

```
Zet een nieuw Next.js 14+ project op (App Router, TypeScript, strict mode).
Gebruik geen extra UI-framework voor nu, gewone CSS/Tailwind is prima.

Lees Kengir-Spelregels.md (bijgevoegd) volledig door.

Maak de mapstructuur aan zoals beschreven in de briefing, met een
UI-onafhankelijke game-engine in /lib/engine/ (pure TypeScript, geen
React-imports, geen netwerkcode).

Werk alle TypeScript types volledig uit in /lib/engine/types.ts:
GameState, Hero, Deity, City, BoardSection, Tile, Fiend, SpellCard,
Spell, MainQuest, SecondaryQuest, ZodiacSign, en wat verder nodig is.
State moet volledig serialiseerbaar zijn als JSON (geen classes met
gedrag in de state zelf).

Bouw nog GEEN UI en nog GEEN engine-logica — alleen project-setup en
types. Als iets in de spelregels ambigu is voor het typesysteem, vraag
het na in plaats van aan te nemen.
```

---

## Stap 2: Statische spelinhoud (content, geen logica)

```
Vul /lib/engine/content/ met de statische game-data uit de spelregels,
als losse, goed leesbare bestanden:

- de 7 steden met hun godheden en basisstats
- de 7 hoofdquests
- de 7 nevenquests
- de 12 Zodiaktekens met hun effecten
- het volledige Book of Spells inclusief de 7 Herrijzenisspells, met
  hun kosten (kaarttype-combinatie) en effect

Gebruik de types uit Stap 1. Dit is puur data, geen functies die er
iets mee doen. Voeg een klein testbestand of console-check toe dat
bevestigt dat elke quest, spell en Zodiakteken-effect overeenkomt met
wat in Kengir-Spelregels.md staat.
```

---

## Stap 3: Bordopbouw (setup-fase)

```
Implementeer in /lib/engine/ de setup-fase van het spel als pure
functies:

- de 7 speelbordsecties samenvoegen tot een bord (voor nu: een simpele
  vaste/voorbeeld-lay-out is prima, geen UI voor handmatige plaatsing
  nodig in deze stap)
- riviercontrole (max 2 rivieren, moeten aan elkaar grenzen)
- schudden en uitdelen van hoofd- en nevenquests
- plaatsen van startende Torens, Helden, Herrijzenisdrankjes, Hemelse
  Zegeningen
- initiële statbladen per Held
- schudden van de spellkaarten-trekstapel
- initieel Zodiakteken instellen op het huidige westerse sterrenbeeld

Schrijf dit als een functie `createInitialGameState(players: ...): GameState`.
Voeg simpele tests toe die checken dat een gegenereerde staat geldig is
(bijv. geen dubbele startposities, elke speler heeft precies 1 hoofd-
en 1 nevenquest).
```

---

## Stap 4: Beweging en encounters

```
Implementeer de beweging- en encounter-logica uit Kengir-Spelregels.md
als pure functies in /lib/engine/:

- een Held zijn volledige Movement in één keer afleggen
- encounter-resolutie alleen op de eindbestemming (Fiend-ontmoeting op
  lege vakken, Grafsteen-worp op Grafstenen)
- na een opgeloste encounter mag de speler opnieuw zijn volledige
  Movement gebruiken, herhaalbaar tot hij zelf stopt of gedwongen wordt
  te stoppen (rivier, Grafsteen-worp die de beurt beëindigt)
- riviergedrag: movement direct op nul bij passeren

Gebruik een RNG die injecteerbaar is (bijv. een functie-parameter of
seedable random) zodat dobbelsteenworpen deterministisch getest kunnen
worden. Schrijf unit tests die de dobbelsteen-uitkomsttabellen dekken
(1-2-3 / 4 / 5 / 6 bij Fiend-encounters, en 1-2-3 / 4 / 5-6 bij
Grafstenen).
```

---

## Stap 5: Gevechtssysteem

```
Implementeer het volledige gevechtssysteem uit Kengir-Spelregels.md als
pure functies in /lib/engine/combat.ts:

- Fiend-gevechten (aanvaller max 3 dobbelstenen op basis van Life,
  verdediger kiest zijn aantal dobbelstenen NA de aanvaller, hoog-naar-
  laag vergelijken, Strength-tiebreak, doorgaan tot iemand geen Life
  meer heeft of de aanvaller vlucht)
- Godheid-gevechten (zelfde kernmechaniek + Zone of Control, +1/+1
  bonus en eigenaar-gooit-dobbelstenen zodra de Godheid herrezen is,
  -2/-2 als alle Fiends in de stadssectie verslagen zijn)
- Held-gevechten (Strength-tiebreak, kaarten afgeven bij verlies, GEEN
  stat-reset bij verlies, terrein-bonussen voor stad/Grafsteen-secties)

Herbouw het voorbeeldgevecht uit Kengir-Spelregels.md als test-case om
te verifiëren dat de implementatie exact hetzelfde resultaat geeft.
Zorg dat de RNG injecteerbaar blijft voor deterministische tests.
```

---

## Stap 6: Spells casten

```
Implementeer het spellsysteem in /lib/engine/spells.ts:

- een Held zijn hand bijhouden als aantal Gidim/Udug/Gallu-kaarten
  (geen individuele kaartidentiteit)
- een spell casten: valideer dat de Held genoeg kaarten van elk
  vereist type heeft, leg ze af naar de discard-stapel, pas het effect
  toe op de GameState
- implementeer alle effecten uit het Book of Spells uit
  Kengir-Spelregels.md, inclusief de 3 permanente skills (Demonic
  Intelligence, Secret Dagger, Fury of the Ancestors) die het
  gevechtssysteem uit Stap 5 moeten kunnen beïnvloeden
- implementeer Blood Incantation (stad vernietigen, quest-onmogelijk-
  check die daaruit volgt) en de Herrijzenisspells (Altaar niveau II,
  Godheid herrijst)

Schrijf voor elke spell minimaal één test die het effect op een
GameState verifieert.
```

---

## Stap 7: Beurtstructuur en win-conditie

```
Bouw de beurtstructuur samen in /lib/engine/turn.ts:

- Fase 1 (Regeneratie): Life herstellen tot Max Life
- Fase 2 (Actie): de speler mag bewegen, vechten, spells casten, in
  willekeurige volgorde en herhaaldelijk, tot hij zelf stopt
- Fase 3 (Eind): gewonnen spellkaarten deze beurt worden definitief,
  geen spells meer castbaar
- Zodiak-verschuiving naar het volgende teken zodra alle spelers hun
  beurt gehad hebben
- win-conditie: hoofdquest voltooid → speler wint, spel eindigt
- terugtrekking: check of een hoofdquest nog mogelijk is na elke Blood
  Incantation, trek zo nodig een speler terug (steden blijven zoals ze
  waren, zie spelregels)

Schrijf een end-to-end test die een volledig fictief spel simuleert
met een vaste RNG-seed, van setup tot een winnende speler.
```

---

## Stap 8: Minimale speelbare UI (lokale hotseat)

```
Bouw nu pas een minimale UI bovenop de bestaande engine, voor lokale
hotseat-play (om de beurt op hetzelfde scherm, geen multiplayer/
netwerk nog). Doel: het volledige spel moet hiermee speelbaar zijn,
puur functioneel, nog geen visueel polijsten.

Minimaal nodig:
- bordweergave met de 7 secties, steden, tokens, Torens
- per-Held statblad en handkaarten (aantal per type) zichtbaar
- knoppen/interactie voor bewegen, gevecht starten, spell casten
- duidelijke aanduiding van actieve speler en huidige fase
- desktop/tablet-only: toon vanaf <768px breedte een nette melding
  dat het spel daar niet ondersteund wordt, geen mobiele layout bouwen

Gebruik de bestaande engine-functies één op één, voeg geen nieuwe
spellogica toe in de UI-laag.
```

---

Na Stap 8 heb je een lokaal speelbare MVP. Multiplayer (Supabase) en een AI-tegenstander zijn logische vervolgstappen daarna, maar niet nodig om het spel voor het eerst zelf te kunnen testen.
