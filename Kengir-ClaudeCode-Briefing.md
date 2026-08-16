# Briefing voor Claude Code: Kengir: Heroes of Sumeria

## Opdracht

Zet een nieuw Next.js (App Router) + TypeScript project op voor een digitale implementatie van het bordspel "Kengir: Heroes of Sumeria". Begin met de projectstructuur en de kern data-modellen/game-engine — nog geen UI, geen multiplayer-laag. De volledige spelregels staan in het bijgevoegde bestand `Kengir-Spelregels.md` (lever dat apart aan als context).

## Doelplatform

- Desktop/tablet, geen mobiele layout nodig. Minimale ondersteunde breedte: 768px.
- Op kleinere schermen: toon een nette melding dat het spel het best speelt op tablet/desktop, geen uitgeklede mobiele UI bouwen.

## Architectuurkeuzes

- **Next.js 14+ (App Router), TypeScript, strict mode.**
- **Game-engine als pure, UI-onafhankelijke TypeScript module** (`/lib/engine/` ofzo) — geen React-imports, geen netwerkcode. Puur functies die een `GameState` nemen en een nieuwe `GameState` teruggeven (of een lijst van geldige acties). Dit maakt het mogelijk om dezelfde engine te gebruiken voor:
  - Lokale hotseat-modus (later)
  - Multiplayer sync (later, via Supabase Realtime of vergelijkbaar)
  - Een regelgebaseerde AI-tegenstander (later)
- **State-representatie:** alles als serialiseerbaar JSON (geen classes met gedrag in de state zelf — state is data, functies in de engine bewerken die data).
- Nog **geen** backend/database/multiplayer opzetten in deze stap — alleen de engine en types, lokaal testbaar met unit tests of een simpele debug-pagina.

## Kern data-modellen (TypeScript types)

Zet in elk geval types op voor (pas vrij aan waar nodig, dit is een startpunt):

- `GameState` — alle spelers, bordstatus, actieve speler, huidige fase (Regeneratie/Actie/Eind), Zodiakteken, trek-/aflegstapel van spellkaarten, ZoC-afspraken die deze beurt gemaakt zijn, etc.
- `Hero` — id, kleur, positie, stats (Life, Max Life, Strength, Movement), geleerde permanente skills, hand met spellkaarten (per type: Gidim/Udug/Gallu aantal), hoofdquest, nevenquest, of hij de Tablet of Blood Incantation bezit, of hij zich heeft teruggetrokken.
- `Deity` — naam, stad, basisstats, huidige stats (incl. bonussen), of hij herrezen is en door wie, of de stad veroverd is en door wie.
- `City` — naam, godheid, Altaar-status (geen/niveau I/niveau II) en eigenaar-kleur, of hij vernietigd is.
- `BoardSection` — de 7 secties, welke steden/vakken erin zitten, rivier-informatie, aangrenzende secties.
- `Tile` — leeg vak, Grafsteen, Fiend-token (type + Life), Magische Barrière, Herrijzenisdrankje, Hemelse Zegening, startende Toren.
- `Fiend` — type (Gidim/Udug/Gallu), Life.
- `SpellCard` — type (Gidim/Udug/Gallu) — verder geen inhoud, puur een resource-token.
- `Spell` — naam, kostenformule (aantal per kaarttype), effect (als een enum/discriminated union van effecttypes, niet vrije tekst).
- `MainQuest` / `SecondaryQuest` — welke 3 steden/godheden vereist zijn.
- `ZodiacSign` — naam, symbool, effect op Fiend-typen.

## Kern engine-functies (startpunt, mag je aanvullen)

- Movement resolven (incl. de "herhaal movement na encounter"-regel uit de spelregels)
- Fiend-encounter resolven (dobbelworp-tabel)
- Gevecht resolven (Fiend/Godheid/Held-varianten, met de specifieke regels per type)
- Spell casten (kaarten aftrekken, effect toepassen)
- Stad veroveren / Godheid doen herrijzen
- Quest-voortgang checken en win-conditie detecteren
- Zodiak-verschuiving na elke volledige ronde

## Vervolgstappen (nog niet nu bouwen, alleen zodat je de architectuur er rekening mee houdt)

1. Lokale hotseat-UI bovenop de engine
2. Multiplayer-sync via Supabase (Postgres + Realtime), turn-based dus polling/realtime-subscriptions zijn prima — geen WebSocket-server nodig
3. Simpele regelgebaseerde AI-tegenstander als alternatieve "speler"-controller binnen dezelfde engine

## Vraag aan jou (Claude Code)

Stel voor: de mapstructuur, de TypeScript types (volledig uitgewerkt), en een korte uitleg van hoe de engine-functies met elkaar samenwerken (bijv. reducer-achtig patroon met acties, of directe functie-aanroepen). Geen UI-componenten nog. Als iets in de spelregels ambigu is voor implementatie-doeleinden, vraag het na in plaats van aan te nemen.
