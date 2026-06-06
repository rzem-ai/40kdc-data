import { Dataset, describeTrigger, describeAward } from "@alpaca-software/40kdc-data";
import type {
  AssertedAward,
  Mission,
  MissionMatchup,
  ForceDispositionId,
  SecondaryCard,
  ScoreEntry,
  ScoringAward,
  ScoringTrigger,
  TerrainLayout,
} from "@alpaca-software/40kdc-data";
import {
  layoutAvailability as sharedLayoutAvailability,
  canonicalMatchupId as sharedCanonicalMatchupId,
  layoutsForMatchup as sharedLayoutsForMatchup,
} from "../../../_shared/matchup-grid.js";

/** The embedded 40kdc dataset — the whole point of the demo is reading the
 *  linked, typed API: matchup → mission_id → mission. */
export const ds: Dataset = Dataset.embedded();

export { DISPOSITIONS, DISPOSITION_LABELS } from "../../../_shared/matchup-grid.js";

const pairKey = (own: ForceDispositionId, opp: ForceDispositionId): string =>
  `${own}|${opp}`;

// One lookup table keyed by (own disposition, opponent disposition).
const matchupByPair = new Map<string, MissionMatchup>();
for (const matchup of ds.missionMatchups) {
  matchupByPair.set(
    pairKey(matchup.disposition, matchup.opponent_disposition),
    matchup,
  );
}

/**
 * The mission a player with disposition `own` plays when their opponent reveals
 * disposition `opp`. Follows the linked API: the matchup names a `mission_id`,
 * which resolves to the mission entity.
 *
 * Note the asymmetry — a player reads their *own* card. To get the opponent's
 * mission for the same pairing, call `missionFor(opp, own)`.
 */
export function missionFor(
  own: ForceDispositionId,
  opp: ForceDispositionId,
): Mission | undefined {
  const matchup = matchupByPair.get(pairKey(own, opp));
  if (!matchup) return undefined;
  return ds.missions.get(matchup.mission_id);
}

/**
 * A mission's primary scoring card — the third link in the chain that this demo
 * exists to show off: disposition pair → matchup → mission, then
 * `mission.id` → its `card_type: "primary"` secondary-card (same id). Carries
 * the community `text` summary and the structured `awards` the readout humanizes.
 */
export function scoringCardFor(missionId: string): SecondaryCard | undefined {
  return ds.missionCards.get(missionId);
}

/**
 * The drawable secondary deck: every `card_type: "secondary"` card. The deck is
 * a single shared list (the Attacker/Defender printings are identical), so both
 * players draw from the same pool.
 */
export const SECONDARY_DECK: SecondaryCard[] = ds.missionCards.all.filter(
  (c) => c.card_type === "secondary",
);

const byId = new Map(SECONDARY_DECK.map((c) => [c.id, c] as const));

/** Resolve drawn card ids back to cards, dropping any that are unknown. */
export function secondariesByIds(ids: readonly string[]): SecondaryCard[] {
  return ids.map((id) => byId.get(id)).filter((c): c is SecondaryCard => c !== undefined);
}

/** A secondary's display name, or the raw id if unknown. */
export function secondaryName(id: string): string {
  return byId.get(id)?.name ?? id;
}

// ── terrain layouts per matchup ───────────────────────────────────────────────
// Each matrix cell (an unordered disposition pair) gets three terrain layouts;
// the pairing math and indexing live in the shared matchup-grid module — these
// wrappers just bind it to this app's dataset singleton.

/** The canonical ordered matchup id for an unordered disposition pair. */
export function canonicalMatchupId(
  a: ForceDispositionId,
  b: ForceDispositionId,
): string | undefined {
  return sharedCanonicalMatchupId(ds, a, b);
}

/** The matchup's authored terrain layouts, ordered by variant number. */
export function layoutsForMatchup(
  a: ForceDispositionId,
  b: ForceDispositionId,
): TerrainLayout[] {
  return sharedLayoutsForMatchup(ds, a, b);
}

/** How many of the matchup's three layout variants are authored (cell dots). */
export function layoutAvailability(a: ForceDispositionId, b: ForceDispositionId): number {
  return sharedLayoutAvailability(ds, a, b);
}

// ── award grouping for the scoring panel ─────────────────────────────────────
// Awards on a card share triggers in runs (e.g. battlefield-dominance: one
// end-of-turn award, then two end-of-Command-phase awards). The panel renders
// each run under one timing header instead of repeating the trigger per row.

/** One award row inside a trigger group. `index` is the award's position in
 *  the card's original `awards` array — the panel keys tick state by it. */
export interface AwardRow {
  award: ScoringAward;
  index: number;
  label: string;
}

/** A run of consecutive same-trigger awards under one humanized header. */
export interface AwardGroup {
  header: string;
  trigger: ScoringTrigger | undefined;
  rows: AwardRow[];
}

// describeAward's wording for an award with no trigger block.
const NO_TRIGGER_HEADER = "Any time";

function triggerHeader(t: ScoringTrigger | undefined): string {
  return t ? describeTrigger(t) : NO_TRIGGER_HEADER;
}

/**
 * The award's `describeAward` line minus the trigger prefix (the group header
 * already says it) and the `[highest tier]` suffix (the panel's tier chip
 * already says it). The cumulative `+ ` marker is preserved. The prefix is
 * rebuilt with the same conformance-pinned `describeTrigger`, so the strip is
 * exact — if the formats ever drift the full line passes through untouched.
 */
export function awardRowLabel(a: ScoringAward): string {
  const full = describeAward(a);
  const marker = a.cumulative ? "+ " : "";
  const prefix = `${marker}${triggerHeader(a.trigger)}: `;
  let body = full.startsWith(prefix) ? full.slice(prefix.length) : full;
  const tier = " [highest tier]";
  if (body.endsWith(tier)) body = body.slice(0, -tier.length);
  return body === full ? full : `${marker}${body}`;
}

/**
 * Group consecutive awards that share a trigger (by its humanized form) for
 * sectioned rendering. Array order is load-bearing and preserved — runs are
 * never merged across a different trigger in between.
 */
export function groupAwards(awards: readonly ScoringAward[]): AwardGroup[] {
  const groups: AwardGroup[] = [];
  awards.forEach((award, index) => {
    const header = triggerHeader(award.trigger);
    const row: AwardRow = { award, index, label: awardRowLabel(award) };
    const last = groups[groups.length - 1];
    if (last && last.header === header) last.rows.push(row);
    else groups.push({ header, trigger: award.trigger, rows: [row] });
  });
  return groups;
}

/**
 * Whether `round` falls inside the trigger's battle-round window. No trigger
 * or no window means the award is live in every round.
 */
export function triggerContainsRound(
  t: ScoringTrigger | undefined,
  round: number,
): boolean {
  const br = t?.battle_round;
  if (!br) return true;
  return round >= (br.min ?? 1) && round <= (br.max ?? Infinity);
}

// ── persistent primary tick state ─────────────────────────────────────────────
// The primary is scored by ticking awards as they happen during a round; the
// ticks persist for the whole round (and across reloads) so the player can see
// what they already banked at each timing. The round's primary VP is derived
// live from the ticks — there is no commit step.

/** One round's award selection, keyed by award index in the card's `awards`. */
export interface PrimaryTicks {
  on: Record<number, boolean>;
  counts: Record<number, number>;
}

/** Per-round tick state for one side, keyed by battle round (1-5). */
export type PrimaryTicksByRound = Record<number, PrimaryTicks>;

export function emptyTicks(): PrimaryTicks {
  return { on: {}, counts: {} };
}

/**
 * Rebuild the asserted-award list a tick state represents — the same
 * derivation the scoring panel uses (count defaults to `per_max ?? 1`).
 * Feed the result to `scoreTurn` to get the round's raw primary VP.
 */
export function assertedFromTicks(
  awards: readonly ScoringAward[],
  ticks: PrimaryTicks | undefined,
): AssertedAward[] {
  if (!ticks) return [];
  return awards.flatMap((award, i) =>
    ticks.on[i] ? [{ award, count: ticks.counts[i] ?? award.per_max ?? 1 }] : [],
  );
}

/**
 * Every card id out of the deck for one player: held in hand, scored (the
 * engine's log discards on score), or manually discarded. A card that leaves
 * the hand never re-enters the pool — tactical-deck semantics. `removeScore`
 * un-logs and returns the card to hand, so an undone score stays excluded via
 * `handIds` and a restored discard via the same route.
 */
export function excludedIds(
  handIds: readonly string[],
  log: readonly ScoreEntry[],
  discards: readonly string[],
): string[] {
  return [...new Set([...handIds, ...log.map((e) => e.cardId), ...discards])];
}

/**
 * Draw one random secondary still in the deck. `excluded` is the full
 * out-of-deck set (see `excludedIds`). Returns `undefined` once the deck is
 * exhausted. `rand` is injectable and `deck` overridable for determinism in
 * tests.
 */
export function drawSecondary(
  excluded: readonly string[],
  rand: () => number = Math.random,
  deck: readonly SecondaryCard[] = SECONDARY_DECK,
): SecondaryCard | undefined {
  const out = new Set(excluded);
  const pool = deck.filter((c) => !out.has(c.id));
  if (pool.length === 0) return undefined;
  return pool[Math.floor(rand() * pool.length)];
}
