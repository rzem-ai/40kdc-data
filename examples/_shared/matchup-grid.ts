/**
 * The force-disposition matchup grid, shared by the example apps.
 *
 * Five dispositions pair into 15 unordered matchups (5 mirrors + 10 mixed);
 * terrain layouts are tagged with the canonical ordered matchup id plus a
 * variant number, so 15 pairings × 3 variants = the full 45-card set. This
 * module is the one implementation of that indexing — the layout viewer,
 * mission-matrix, and the editor's library all speak the same pairing math.
 *
 * Everything is parameterized on the host's `Dataset` (memoized per dataset),
 * working straight off the package types like `layout-geometry.ts` does.
 */
import type { Dataset, ForceDispositionId, MissionMatchup, TerrainLayout } from "@alpaca-software/40kdc-data";

/** The five launch Force Dispositions, in the schema enum order. */
export const DISPOSITIONS: ForceDispositionId[] = [
  "take-and-hold",
  "disruption",
  "purge-the-foe",
  "priority-assets",
  "reconnaissance",
];

/** Display names. The core dataset ships no force-disposition records (only an
 *  `_example` file), so these factual objective names are kept here. */
export const DISPOSITION_LABELS: Record<ForceDispositionId, string> = {
  "take-and-hold": "Take and Hold",
  disruption: "Disruption",
  "purge-the-foe": "Purge the Foe",
  "priority-assets": "Priority Assets",
  reconnaissance: "Reconnaissance",
};

/** Compact header labels for narrow screens (full names go in aria/title). */
export const DISPOSITION_ABBR: Record<ForceDispositionId, string> = {
  "take-and-hold": "TaH",
  disruption: "Dis",
  "purge-the-foe": "PtF",
  "priority-assets": "PA",
  reconnaissance: "Rec",
};

const DISPOSITION_INDEX = new Map<string, number>(DISPOSITIONS.map((d, i) => [d, i]));

/** Unordered-pair key for a matchup grid cell: the two dispositions in DISPOSITIONS order. */
export function pairKey(a: string, b: string): string {
  const [lo, hi] =
    (DISPOSITION_INDEX.get(a) ?? 99) <= (DISPOSITION_INDEX.get(b) ?? 99) ? [a, b] : [b, a];
  return `${lo}|${hi}`;
}

/** "Take and Hold (mirror)" / "Take and Hold vs Disruption" — the cell heading. */
export function pairLabel(a: ForceDispositionId, b: ForceDispositionId): string {
  return a === b
    ? `${DISPOSITION_LABELS[a]} (mirror)`
    : `${DISPOSITION_LABELS[a]} vs ${DISPOSITION_LABELS[b]}`;
}

interface MatchupIndex {
  /** ordered "own|opp" → matchup (all 25 ordered ids exist in the data). */
  byOrderedPair: Map<string, MissionMatchup>;
  /** canonical matchup id → its authored layouts, variant-ordered. */
  layoutsByMatchup: Map<string, TerrainLayout[]>;
}

// Memoized per dataset: embedded data is immutable for the life of the build.
const indexCache = new WeakMap<Dataset, MatchupIndex>();

function indexOf(ds: Dataset): MatchupIndex {
  const hit = indexCache.get(ds);
  if (hit) return hit;

  const byOrderedPair = new Map<string, MissionMatchup>();
  for (const m of ds.missionMatchups.all) {
    byOrderedPair.set(`${m.disposition}|${m.opponent_disposition}`, m);
  }

  const layoutsByMatchup = new Map<string, TerrainLayout[]>();
  for (const l of ds.terrainLayouts.all) {
    if (!l.mission_matchup_id) continue;
    const list = layoutsByMatchup.get(l.mission_matchup_id) ?? [];
    list.push(l);
    layoutsByMatchup.set(l.mission_matchup_id, list);
  }
  for (const list of layoutsByMatchup.values()) {
    list.sort((a, b) => (a.variant ?? 99) - (b.variant ?? 99));
  }

  const built: MatchupIndex = { byOrderedPair, layoutsByMatchup };
  indexCache.set(ds, built);
  return built;
}

/**
 * The matchup as read from `own`'s Force Disposition card against an opponent
 * fielding `opp` — the *ordered* lookup. Missions are asymmetric: each player
 * finds their own primary mission by looking the opponent's disposition up on
 * their own card, so `matchupFor(ds, a, b)` and `matchupFor(ds, b, a)` are
 * different records (all 25 ordered ids exist in the data).
 */
export function matchupFor(
  ds: Dataset,
  own: ForceDispositionId,
  opp: ForceDispositionId,
): MissionMatchup | undefined {
  return indexOf(ds).byOrderedPair.get(`${own}|${opp}`);
}

/**
 * The canonical ordered matchup id for an unordered disposition pair: the
 * form with the lower-index disposition first (layout cards are tagged with
 * the canonical one).
 */
export function canonicalMatchupId(
  ds: Dataset,
  a: ForceDispositionId,
  b: ForceDispositionId,
): string | undefined {
  return indexOf(ds).byOrderedPair.get(pairKey(a, b))?.id;
}

/** The matchup's authored terrain layouts, ordered by variant number. */
export function layoutsForMatchup(
  ds: Dataset,
  a: ForceDispositionId,
  b: ForceDispositionId,
): TerrainLayout[] {
  const id = canonicalMatchupId(ds, a, b);
  return id ? (indexOf(ds).layoutsByMatchup.get(id) ?? []) : [];
}

/** How many of the matchup's three layout variants are authored (cell dots). */
export function layoutAvailability(
  ds: Dataset,
  a: ForceDispositionId,
  b: ForceDispositionId,
): number {
  return layoutsForMatchup(ds, a, b).length;
}

/** One unordered pairing cell of the matchup grid. */
export interface MatrixCell {
  a: ForceDispositionId;
  b: ForceDispositionId;
  /** Unordered-pair key — (a,b) and (b,a) share it. */
  key: string;
  /** Canonical ordered matchup id, when the data carries the pairing. */
  matchupId?: string;
  label: string;
  /** Same disposition on both sides. */
  mirror: boolean;
  /** Authored layouts, variant-ordered. */
  layouts: TerrainLayout[];
}

/** The 15 unordered pairing cells, upper-triangle order. */
export function matrixCells(ds: Dataset): MatrixCell[] {
  return DISPOSITIONS.flatMap((a, i) =>
    DISPOSITIONS.slice(i).map((b) => ({
      a,
      b,
      key: pairKey(a, b),
      matchupId: canonicalMatchupId(ds, a, b),
      label: pairLabel(a, b),
      mirror: a === b,
      layouts: layoutsForMatchup(ds, a, b),
    })),
  );
}
