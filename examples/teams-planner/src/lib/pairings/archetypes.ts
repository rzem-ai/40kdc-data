/**
 * The CPU opponent's roster material: a pool of community list archetypes
 * (the shorthand names a competitive-overview article would use — "MSU
 * Eldar", "Gaunt Carpet", "Defiler Spam") plus the generator that arranges a
 * random-but-legal opposing team out of them.
 *
 * Legality mirrors the Companion rules the planner validates with
 * `fdAssignmentIssues` / `factionKeywordIdentity`:
 *   - one player per faction keyword within the team,
 *   - dispositions at most ceil(n/5) deep, with repeats only after all five
 *     are covered (Σ(count−1) ≤ n−5), and
 *   - a player's disposition must be *available* to them — granted by one of
 *     their detachments. An archetype is pinned to its detachment, so its
 *     eligible dispositions come straight from the dataset record.
 * Teams are legal by construction here and asserted legal in tests.
 */
import type { ForceDispositionId } from "@alpaca-software/40kdc-data";
import { DISPOSITIONS } from "../../../../_shared/matchup-grid.js";
import { detachmentDispositions, factionKeywordIdentity, type TeamSize } from "../coverage";
import type { SimPlayer } from "./types";
import { ARCHETYPE_POOL } from "./archetype-pool";

export interface Archetype {
  /** Stable slug, unique across the pool. */
  id: string;
  /** Community shorthand for the list concept. */
  name: string;
  /** Must resolve in the dataset (asserted by the pool-integrity test). */
  factionId: string;
  /** The detachment the concept is built on — must resolve within
   *  `factionId`, and determines which dispositions the archetype can field. */
  detachmentId: string;
}

/** The dispositions an archetype can legally field (from its detachment). */
export function archetypeDispositions(a: Archetype): ForceDispositionId[] {
  return detachmentDispositions(a.detachmentId);
}

export { ARCHETYPE_POOL };

function shuffled<T>(items: T[], rand: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * A legal disposition multiset for an `n`-player team: `n ≤ 5` draws distinct
 * dispositions; `n ≥ 6` covers all five then adds `n − 5` distinct extras —
 * which satisfies both the per-disposition cap and repeats-after-coverage.
 */
function legalFdSlots(size: TeamSize, rand: () => number): ForceDispositionId[] {
  const base = shuffled(DISPOSITIONS, rand);
  if (size <= 5) return base.slice(0, size);
  return [...base, ...shuffled(DISPOSITIONS, rand).slice(0, size - 5)];
}

/**
 * Assemble a legal CPU team of `size` archetypes: distinct faction keywords,
 * dispositions assigned from a legal multiset, each archetype only in a slot
 * its detachment can field. Greedy over a shuffled pool with reshuffle-retry —
 * with ~100 archetypes spread across all five dispositions a fit is found in
 * the first attempt or two.
 */
export function generateCpuTeam(
  size: TeamSize,
  pool: Archetype[] = ARCHETYPE_POOL,
  rand: () => number = Math.random,
): SimPlayer[] {
  for (let attempt = 0; attempt < 40; attempt++) {
    const slots = legalFdSlots(size, rand);
    const team: (SimPlayer | undefined)[] = new Array(slots.length).fill(undefined);
    const usedKeywords = new Set<string>();
    let filled = 0;

    for (const candidate of shuffled(pool, rand)) {
      if (filled === slots.length) break;
      const keyword = factionKeywordIdentity(candidate.factionId);
      if (usedKeywords.has(keyword)) continue;
      const eligible = archetypeDispositions(candidate);
      const slotIndex = slots.findIndex((fd, i) => team[i] === undefined && eligible.includes(fd));
      if (slotIndex < 0) continue;
      team[slotIndex] = {
        id: candidate.id,
        name: candidate.name,
        factionId: candidate.factionId,
        fd: slots[slotIndex],
      };
      usedKeywords.add(keyword);
      filled += 1;
    }

    if (filled === slots.length) return team as SimPlayer[];
  }
  throw new Error(
    `couldn't assemble a legal ${size}-archetype team — pool too small or too narrow`,
  );
}
