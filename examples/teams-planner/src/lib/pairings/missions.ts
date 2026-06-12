/**
 * Dataset-bound resolution for resolved tables: the asymmetric primary
 * missions (each player reads the opponent's disposition on their own card)
 * and the authored terrain layout behind a declared A/B/C choice. Kept out of
 * the engine so the state machine stays dataset-free.
 */
import type { Mission, TerrainLayout } from "@alpaca-software/40kdc-data";
import { layoutsForMatchup, matchupFor } from "../../../../_shared/matchup-grid.js";
import { ds } from "../dataset";
import type { LayoutChoice, Matchup } from "./types";

/** The primary mission `own` plays against an opponent fielding `opp`. */
export function missionFor(own: Matchup["user"]["fd"], opp: Matchup["user"]["fd"]): Mission | undefined {
  const matchup = matchupFor(ds, own, opp);
  return matchup ? ds.missions.get(matchup.mission_id) : undefined;
}

const VARIANT_FOR: Record<LayoutChoice, number> = { A: 1, B: 2, C: 3 };

/**
 * The authored layout behind a table's declared choice, when the dataset has
 * it (most matchups aren't authored yet — callers render the bare letter
 * otherwise).
 */
export function layoutFor(table: Matchup): TerrainLayout | undefined {
  const variant = VARIANT_FOR[table.layout];
  return layoutsForMatchup(ds, table.user.fd, table.cpu.fd).find((l) => l.variant === variant);
}
