/**
 * A realistic demo plan for the "Load example plan" button + guided tour. Built
 * from real dataset ids at runtime (never hardcoded ids, which rot when factions
 * are reconverted): greedily cover each of the five Force Dispositions with a
 * distinct faction's one-detachment army, state a desire tier on each, and lock
 * the first couple of players in so the matrix shows the full range of states.
 *
 * Guaranteed to pass `sanitizePlan` with no dropped ids — every faction /
 * detachment / army id resolves in the embedded dataset.
 */
import { DISPOSITIONS } from "../../../_shared/matchup-grid.js";
import { ds } from "./dataset";
import {
  autoArmyName,
  detachmentDispositions,
  factionOptions,
  placementKey,
  setPlacementTier,
  syncPreferences,
  type Army,
  type Player,
  type PrefTier,
  type TeamPlan,
} from "./coverage";

/** Neutral display names for the demo roster (not tied to any real person). */
const NAMES = ["Avery", "Blake", "Casey", "Devon", "Emory"];
/** A little tier variety across the demo rows. */
const TIERS: PrefTier[] = ["want", "pref", "could", "want", "pref"];

export function examplePlan(): TeamPlan {
  const factions = factionOptions();
  const usedFactions = new Set<string>();
  const players: Player[] = [];

  DISPOSITIONS.forEach((disposition, i) => {
    // First not-yet-used faction with a detachment that grants this disposition.
    let chosen: { factionId: string; detachmentId: string } | null = null;
    for (const f of factions) {
      if (usedFactions.has(f.id)) continue;
      const det = ds.detachments
        .byFaction(f.id)
        .find((d) => detachmentDispositions(d.id).includes(disposition));
      if (det) {
        chosen = { factionId: f.id, detachmentId: det.id };
        break;
      }
    }
    if (!chosen) return; // dataset can't cover this disposition with a fresh faction
    usedFactions.add(chosen.factionId);

    const army: Army = {
      id: `ex-army-${i}`,
      name: autoArmyName([chosen.detachmentId]),
      factionId: chosen.factionId,
      detachmentIds: [chosen.detachmentId],
    };
    const player: Player = {
      id: `ex-player-${i}`,
      name: NAMES[i] ?? `Player ${i + 1}`,
      factionIds: [chosen.factionId],
      armies: [army],
      preferences: [],
      locked: {},
    };
    // Populate the could-band placements from the pool, then state a tier on the
    // disposition this player was built to cover.
    player.preferences = setPlacementTier(
      syncPreferences(player),
      placementKey({ armyId: army.id, disposition }),
      TIERS[i] ?? "pref",
    );
    players.push(player);
  });

  // Lock the first couple of players into their covering disposition so the demo
  // shows the accent-filled locked state and a greyed-out row.
  for (let i = 0; i < Math.min(2, players.length); i++) {
    players[i].locked = { [DISPOSITIONS[i]]: players[i].armies[0].id };
  }

  return { teamName: "Example Strike Force", size: 5, players };
}
