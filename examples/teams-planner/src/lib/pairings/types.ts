/**
 * Data model for the pairings simulator — a practice walkthrough of the Teams
 * Event Companion's pairing system against a CPU-controlled opposing team.
 *
 * The pairing system is three modules, chosen by team size:
 *
 *   3 players  → Main Engagement
 *   4 players  → Main Engagement + Champion
 *   5 players  → Initial Skirmish + Main Engagement
 *   6 players  → Initial Skirmish + Main Engagement + Champion
 *   7 players  → Initial Skirmish ×2 + Main Engagement
 *   8 players  → Initial Skirmish ×2 + Main Engagement + Champion
 *
 * Skirmish and Main share the same secret-pick / simultaneous-reveal dance
 * (defender → two attackers vs the opposing defender → each defender's side
 * picks which attacker it accepts → defenders declare layouts); Main also
 * pairs the two refused attackers, and Champion pairs the last player from
 * each side. Refused/champion tables use a layout fixed by the round number
 * (round 1 → A, 2 → B, 3 → C, cycling).
 *
 * Everything here is plain data — the engine in `engine.ts` is a pure reducer
 * over `SimState`, and all randomness/strategy is injected.
 */
import type { ForceDispositionId } from "@alpaca-software/40kdc-data";
import type { TeamSize } from "../coverage";

export type Side = "user" | "cpu";
export type LayoutChoice = "A" | "B" | "C";
export type Round = 1 | 2 | 3;

/** One competitor in the sim: a plan player (user side) or an archetype (CPU side). */
export interface SimPlayer {
  id: string;
  /** Player name (user side) or archetype name like "MSU Eldar" (CPU side). */
  name: string;
  factionId: string;
  /** The Force Disposition this player fields this round. */
  fd: ForceDispositionId;
}

export type ModuleKind = "skirmish" | "main" | "champion";

/** Where a resolved table came from, which determines who declared its layout. */
export type MatchupSource = "defender-user" | "defender-cpu" | "refused" | "champion";

/** One resolved table. Missions are asymmetric — each side reads its own FD card. */
export interface Matchup {
  user: SimPlayer;
  cpu: SimPlayer;
  source: MatchupSource;
  layout: LayoutChoice;
  /** Defenders declare their table's layout; refused/champion follow the round. */
  layoutChooser: Side | "round";
  /** The module this table came out of (index into `SimState.modules`). */
  moduleIndex: number;
}

/**
 * The shared step ladder for skirmish/main. Each `pick-*` step takes one user
 * action; the CPU's matching secret pick is computed at the same step and held
 * hidden until the matching `reveal-*` step.
 */
export type PairingStep =
  | "pick-defender"
  | "reveal-defenders"
  | "pick-attackers"
  | "reveal-attackers"
  | "pick-accepted"
  | "reveal-accepted"
  | "declare-layouts"
  | "module-done";

export interface ModuleState {
  kind: "skirmish" | "main";
  step: PairingStep;
  /** SimPlayer ids. CPU picks exist from the step they were made at, but the
   *  UI must only render them once the matching reveal step is reached. */
  userDefender?: string;
  cpuDefender?: string;
  /** User attackers sent against the CPU defender (and vice versa). */
  userAttackers?: [string, string];
  cpuAttackers?: [string, string];
  /** The CPU attacker the user's defender accepted (plays against). */
  userAccepted?: string;
  /** The user attacker the CPU's defender accepted. */
  cpuAccepted?: string;
  userLayout?: LayoutChoice;
  cpuLayout?: LayoutChoice;
}

export interface SimState {
  phase: "setup" | "running" | "summary";
  /** Event round, driving the refused/champion layout cycle. */
  round: Round;
  size: TeamSize;
  /** Players not yet committed to a table. */
  userPool: SimPlayer[];
  cpuPool: SimPlayer[];
  modules: ModuleKind[];
  moduleIndex: number;
  /** The in-progress skirmish/main module; null while between modules
   *  (champion modules auto-resolve and never hold state here). */
  current: ModuleState | null;
  results: Matchup[];
}

/**
 * The CPU side of every secret decision. `randomStrategy` ships first; a
 * smarter heuristic can slot in behind the same interface.
 */
export interface CpuStrategy {
  pickDefender(pool: SimPlayer[]): SimPlayer;
  pickAttackers(pool: SimPlayer[], opposingDefender: SimPlayer): [SimPlayer, SimPlayer];
  chooseAccepted(defender: SimPlayer, attackers: [SimPlayer, SimPlayer]): SimPlayer;
  declareLayout(defender: SimPlayer, opponent: SimPlayer): LayoutChoice;
}
