/**
 * De 12 Zodiaktekens en hun Life-effect per Fiend-type.
 *
 * Bron: Kengir-Spelregels.md § "Onder het Hemelteken". De eerste zes
 * tekens hebben bewust twee tegengestelde effecten, de laatste zes maar
 * één effect (zie toelichting onder de tabel aldaar).
 */
import type { ZodiacSign } from "../types";

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { naam: "Luhunga", symbool: "♈", effect: { Gallu: 1, Gidim: -1, Udug: 0 } },
  { naam: "GuAnna", symbool: "♉", effect: { Gallu: -1, Gidim: 1, Udug: 0 } },
  { naam: "MastabbaBagal", symbool: "♊", effect: { Gallu: 1, Gidim: 0, Udug: -1 } },
  { naam: "AlLul", symbool: "♋", effect: { Gallu: -1, Gidim: 0, Udug: 1 } },
  { naam: "Urgula", symbool: "♌", effect: { Gallu: 0, Gidim: 1, Udug: -1 } },
  { naam: "AbSin", symbool: "♍", effect: { Gallu: 0, Gidim: -1, Udug: 1 } },
  { naam: "ZibBaanna", symbool: "♎", effect: { Gallu: 1, Gidim: 0, Udug: 0 } },
  { naam: "Girtab", symbool: "♏", effect: { Gallu: 0, Gidim: 1, Udug: 0 } },
  { naam: "Pabilsag", symbool: "♐", effect: { Gallu: 0, Gidim: 0, Udug: 1 } },
  { naam: "Suhurmas", symbool: "♑", effect: { Gallu: -1, Gidim: 0, Udug: 0 } },
  { naam: "GuLa", symbool: "♒", effect: { Gallu: 0, Gidim: -1, Udug: 0 } },
  { naam: "Dununu", symbool: "♓", effect: { Gallu: 0, Gidim: 0, Udug: -1 } },
];
