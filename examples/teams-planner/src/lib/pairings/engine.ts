/**
 * Pure state machine for the Teams Event pairing system. Every reducer takes
 * the current {@link SimState} plus one user action and returns the next state
 * (or the input unchanged when the action is invalid for the current step —
 * the UI can call blindly). The CPU's matching secret pick is produced by the
 * injected {@link CpuStrategy} at the same step the user acts, stored on the
 * module state, and only *shown* once the matching reveal step is reached.
 *
 * No dataset access and no randomness live here; mission/layout resolution is
 * a UI concern (see `missions.ts`) and all CPU choice goes through the
 * strategy interface, so the whole module is deterministic under test.
 */
import type {
  CpuStrategy,
  LayoutChoice,
  Matchup,
  ModuleKind,
  ModuleState,
  Round,
  SimPlayer,
  SimState,
} from "./types";
import type { TeamSize } from "../coverage";

/** The Companion's module list for each team size. */
export function modulesFor(size: TeamSize): ModuleKind[] {
  switch (size) {
    case 3: return ["main"];
    case 4: return ["main", "champion"];
    case 5: return ["skirmish", "main"];
    case 6: return ["skirmish", "main", "champion"];
    case 7: return ["skirmish", "skirmish", "main"];
    case 8: return ["skirmish", "skirmish", "main", "champion"];
  }
}

/** Refused-attacker / champion layout for the event round: A, B, C, cycling. */
export function roundLayout(round: Round): LayoutChoice {
  return (["A", "B", "C"] as const)[(round - 1) % 3];
}

/** Fresh sim over two rosters. Both sides must have exactly `size` players. */
export function createSim(
  user: SimPlayer[],
  cpu: SimPlayer[],
  size: TeamSize,
  round: Round,
): SimState {
  const base: SimState = {
    phase: "running",
    round,
    size,
    userPool: [...user],
    cpuPool: [...cpu],
    modules: modulesFor(size),
    moduleIndex: 0,
    current: null,
    results: [],
  };
  return enterModule(base);
}

function byId(pool: SimPlayer[], id: string | undefined): SimPlayer | undefined {
  return pool.find((p) => p.id === id);
}

function without(pool: SimPlayer[], ids: (string | undefined)[]): SimPlayer[] {
  const drop = new Set(ids.filter(Boolean));
  return pool.filter((p) => !drop.has(p.id));
}

/**
 * Open the module at `moduleIndex`: skirmish/main get a fresh step ladder;
 * champion auto-resolves (one player left per side — no decisions); past the
 * last module the sim flips to summary.
 */
function enterModule(state: SimState): SimState {
  if (state.moduleIndex >= state.modules.length) {
    return { ...state, current: null, phase: "summary" };
  }
  const kind = state.modules[state.moduleIndex];
  if (kind !== "champion") {
    return { ...state, current: { kind, step: "pick-defender" } };
  }
  // Champion: the remaining player from each side plays, layout by round.
  const user = state.userPool[0];
  const cpu = state.cpuPool[0];
  if (!user || !cpu) return { ...state, current: null, phase: "summary" };
  const table: Matchup = {
    user,
    cpu,
    source: "champion",
    layout: roundLayout(state.round),
    layoutChooser: "round",
    moduleIndex: state.moduleIndex,
  };
  return enterModule({
    ...state,
    userPool: without(state.userPool, [user.id]),
    cpuPool: without(state.cpuPool, [cpu.id]),
    results: [...state.results, table],
    moduleIndex: state.moduleIndex + 1,
    current: null,
  });
}

/** Step 1: the user's secret defender; the CPU picks its own simultaneously. */
export function submitDefender(state: SimState, userId: string, cpu: CpuStrategy): SimState {
  const mod = state.current;
  if (state.phase !== "running" || !mod || mod.step !== "pick-defender") return state;
  if (!byId(state.userPool, userId)) return state;
  const cpuDefender = cpu.pickDefender(state.cpuPool);
  return {
    ...state,
    current: { ...mod, step: "reveal-defenders", userDefender: userId, cpuDefender: cpuDefender.id },
  };
}

/** Steps 2/4/6: move past a simultaneous reveal (or out of a finished module). */
export function acknowledgeReveal(state: SimState): SimState {
  const mod = state.current;
  if (state.phase !== "running" || !mod) return state;
  switch (mod.step) {
    case "reveal-defenders":
      return { ...state, current: { ...mod, step: "pick-attackers" } };
    case "reveal-attackers":
      return { ...state, current: { ...mod, step: "pick-accepted" } };
    case "reveal-accepted":
      return { ...state, current: { ...mod, step: "declare-layouts" } };
    case "module-done":
      return enterModule({ ...state, current: null, moduleIndex: state.moduleIndex + 1 });
    default:
      return state;
  }
}

/** Step 3: two user attackers against the revealed CPU defender. */
export function submitAttackers(
  state: SimState,
  picks: [string, string],
  cpu: CpuStrategy,
): SimState {
  const mod = state.current;
  if (state.phase !== "running" || !mod || mod.step !== "pick-attackers") return state;
  const [a, b] = picks;
  if (a === b) return state;
  // Attackers come from the remaining members — never the defender.
  const eligible = without(state.userPool, [mod.userDefender]);
  if (!byId(eligible, a) || !byId(eligible, b)) return state;
  const userDefender = byId(state.userPool, mod.userDefender)!;
  const cpuEligible = without(state.cpuPool, [mod.cpuDefender]);
  const cpuPicks = cpu.pickAttackers(cpuEligible, userDefender);
  return {
    ...state,
    current: {
      ...mod,
      step: "reveal-attackers",
      userAttackers: [a, b],
      cpuAttackers: [cpuPicks[0].id, cpuPicks[1].id],
    },
  };
}

/** Step 5: which opposing (CPU) attacker the user's defender accepts. */
export function submitAccepted(state: SimState, cpuAttackerId: string, cpu: CpuStrategy): SimState {
  const mod = state.current;
  if (state.phase !== "running" || !mod || mod.step !== "pick-accepted") return state;
  if (!mod.cpuAttackers?.includes(cpuAttackerId)) return state;
  const cpuDefender = byId(state.cpuPool, mod.cpuDefender)!;
  const userAttackers = mod.userAttackers!.map((id) => byId(state.userPool, id)!) as [
    SimPlayer,
    SimPlayer,
  ];
  const cpuAccepted = cpu.chooseAccepted(cpuDefender, userAttackers);
  return {
    ...state,
    current: {
      ...mod,
      step: "reveal-accepted",
      userAccepted: cpuAttackerId,
      cpuAccepted: cpuAccepted.id,
    },
  };
}

/**
 * Step 7: the user defender declares their table's layout; the CPU defender
 * declares simultaneously. Resolves the module: both defender tables are
 * emitted, plus the refused pair in a Main Engagement; paired players leave
 * the pools (refused skirmish attackers return to them).
 */
export function submitLayout(state: SimState, choice: LayoutChoice, cpu: CpuStrategy): SimState {
  const mod = state.current;
  if (state.phase !== "running" || !mod || mod.step !== "declare-layouts") return state;

  const userDefender = byId(state.userPool, mod.userDefender)!;
  const cpuDefender = byId(state.cpuPool, mod.cpuDefender)!;
  const userAccepted = byId(state.cpuPool, mod.userAccepted)!; // a CPU attacker
  const cpuAccepted = byId(state.userPool, mod.cpuAccepted)!; // a user attacker
  const cpuChoice = cpu.declareLayout(cpuDefender, cpuAccepted);

  const tables: Matchup[] = [
    {
      user: userDefender,
      cpu: userAccepted,
      source: "defender-user",
      layout: choice,
      layoutChooser: "user",
      moduleIndex: state.moduleIndex,
    },
    {
      user: cpuAccepted,
      cpu: cpuDefender,
      source: "defender-cpu",
      layout: cpuChoice,
      layoutChooser: "cpu",
      moduleIndex: state.moduleIndex,
    },
  ];

  // Consumed this module: each side's defender + the attacker the opposing
  // defender accepted. Refused attackers pair up in Main, return to the pool
  // in a Skirmish.
  const userConsumed = [userDefender.id, cpuAccepted.id];
  const cpuConsumed = [cpuDefender.id, userAccepted.id];
  if (mod.kind === "main") {
    const refusedUser = byId(
      state.userPool,
      mod.userAttackers!.find((id) => id !== mod.cpuAccepted),
    )!;
    const refusedCpu = byId(
      state.cpuPool,
      mod.cpuAttackers!.find((id) => id !== mod.userAccepted),
    )!;
    tables.push({
      user: refusedUser,
      cpu: refusedCpu,
      source: "refused",
      layout: roundLayout(state.round),
      layoutChooser: "round",
      moduleIndex: state.moduleIndex,
    });
    userConsumed.push(refusedUser.id);
    cpuConsumed.push(refusedCpu.id);
  }

  return {
    ...state,
    userPool: without(state.userPool, userConsumed),
    cpuPool: without(state.cpuPool, cpuConsumed),
    results: [...state.results, ...tables],
    current: { ...mod, step: "module-done", userLayout: choice, cpuLayout: cpuChoice },
  };
}

/** A uniform-random strategy over the injected `rand` (0 ≤ rand() < 1). */
export function randomStrategy(rand: () => number): CpuStrategy {
  const pick = <T>(items: T[]): T => items[Math.floor(rand() * items.length)];
  return {
    pickDefender: (pool) => pick(pool),
    pickAttackers: (pool) => {
      const first = pick(pool);
      const second = pick(pool.filter((p) => p.id !== first.id));
      return [first, second];
    },
    chooseAccepted: (_defender, attackers) => pick([...attackers]),
    declareLayout: () => pick(["A", "B", "C"] as LayoutChoice[]),
  };
}
