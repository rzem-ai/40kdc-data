import { describe, expect, it } from "vitest";
import {
  acknowledgeReveal,
  createSim,
  modulesFor,
  randomStrategy,
  roundLayout,
  submitAccepted,
  submitAttackers,
  submitDefender,
  submitLayout,
} from "./engine";
import type { CpuStrategy, Round, SimPlayer, SimState } from "./types";
import type { TeamSize } from "../coverage";

/** Deterministic LCG so walkthroughs are reproducible. */
function seeded(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

function roster(side: string, n: number): SimPlayer[] {
  const fds = ["take-and-hold", "disruption", "purge-the-foe", "priority-assets", "reconnaissance"];
  return Array.from({ length: n }, (_, i) => ({
    id: `${side}${i}`,
    name: `${side} ${i}`,
    factionId: "world-eaters",
    fd: fds[i % 5] as SimPlayer["fd"],
  }));
}

/** Drive the sim to completion, making arbitrary-but-valid user picks. */
function playThrough(size: TeamSize, round: Round, cpu: CpuStrategy): SimState {
  let state = createSim(roster("u", size), roster("c", size), size, round);
  // Generous bound; each loop iteration advances exactly one step.
  for (let guard = 0; guard < 100 && state.phase === "running"; guard++) {
    const mod = state.current;
    if (!mod) throw new Error("running with no module");
    switch (mod.step) {
      case "pick-defender":
        state = submitDefender(state, state.userPool[0].id, cpu);
        break;
      case "pick-attackers": {
        const eligible = state.userPool.filter((p) => p.id !== mod.userDefender);
        state = submitAttackers(state, [eligible[0].id, eligible[1].id], cpu);
        break;
      }
      case "pick-accepted":
        state = submitAccepted(state, mod.cpuAttackers![0], cpu);
        break;
      case "declare-layouts":
        state = submitLayout(state, "B", cpu);
        break;
      default:
        state = acknowledgeReveal(state);
    }
  }
  return state;
}

describe("modulesFor", () => {
  it("matches the Companion table and consumes exactly the team size", () => {
    const consumed = { skirmish: 2, main: 3, champion: 1 };
    expect(modulesFor(3)).toEqual(["main"]);
    expect(modulesFor(4)).toEqual(["main", "champion"]);
    expect(modulesFor(5)).toEqual(["skirmish", "main"]);
    expect(modulesFor(6)).toEqual(["skirmish", "main", "champion"]);
    expect(modulesFor(7)).toEqual(["skirmish", "skirmish", "main"]);
    expect(modulesFor(8)).toEqual(["skirmish", "skirmish", "main", "champion"]);
    for (const size of [3, 4, 5, 6, 7, 8] as const) {
      const total = modulesFor(size).reduce((sum, m) => sum + consumed[m], 0);
      expect(total).toBe(size);
    }
  });
});

describe("roundLayout", () => {
  it("cycles A, B, C by round", () => {
    expect(roundLayout(1)).toBe("A");
    expect(roundLayout(2)).toBe("B");
    expect(roundLayout(3)).toBe("C");
  });
});

describe("full walkthroughs", () => {
  for (const size of [3, 5, 6, 8] as const) {
    it(`size ${size}: every player paired exactly once, table count == size`, () => {
      const state = playThrough(size, 1, randomStrategy(seeded(42 + size)));
      expect(state.phase).toBe("summary");
      expect(state.results).toHaveLength(size);
      expect(state.userPool).toHaveLength(0);
      expect(state.cpuPool).toHaveLength(0);
      const users = state.results.map((m) => m.user.id).sort();
      const cpus = state.results.map((m) => m.cpu.id).sort();
      expect(users).toEqual(roster("u", size).map((p) => p.id).sort());
      expect(cpus).toEqual(roster("c", size).map((p) => p.id).sort());
    });
  }

  it("refused tables appear only in main, champion pairs the leftovers", () => {
    const state = playThrough(8, 1, randomStrategy(seeded(7)));
    const bySource = (s: string) => state.results.filter((m) => m.source === s);
    // 8 = skirmish×2 (2 tables each) + main (3) + champion (1)
    expect(bySource("defender-user")).toHaveLength(3);
    expect(bySource("defender-cpu")).toHaveLength(3);
    expect(bySource("refused")).toHaveLength(1);
    expect(bySource("champion")).toHaveLength(1);
    const refused = bySource("refused")[0];
    expect(state.modules[refused.moduleIndex]).toBe("main");
    const champion = bySource("champion")[0];
    expect(state.modules[champion.moduleIndex]).toBe("champion");
  });

  it("defender-declared layouts land on the defenders' tables; refused/champion follow the round", () => {
    for (const round of [1, 2, 3] as const) {
      const state = playThrough(6, round, randomStrategy(seeded(round)));
      for (const table of state.results) {
        if (table.source === "defender-user") {
          expect(table.layout).toBe("B"); // playThrough always declares B
          expect(table.layoutChooser).toBe("user");
        }
        if (table.source === "refused" || table.source === "champion") {
          expect(table.layout).toBe(roundLayout(round));
          expect(table.layoutChooser).toBe("round");
        }
      }
    }
  });

  it("a skirmish returns refused attackers to the pools for later modules", () => {
    const cpu = randomStrategy(seeded(3));
    let state = createSim(roster("u", 5), roster("c", 5), 5, 1);
    // Walk just the first (skirmish) module.
    const defender = state.userPool[0].id;
    state = submitDefender(state, defender, cpu);
    state = acknowledgeReveal(state);
    const attackers = state.userPool.filter((p) => p.id !== defender).slice(0, 2);
    state = submitAttackers(state, [attackers[0].id, attackers[1].id], cpu);
    state = acknowledgeReveal(state);
    const mod = state.current!;
    state = submitAccepted(state, mod.cpuAttackers![0], cpu);
    state = acknowledgeReveal(state);
    state = submitLayout(state, "A", cpu);
    expect(state.current!.step).toBe("module-done");
    // Skirmish consumed 2/side; the refused attacker is back in the pool.
    expect(state.userPool).toHaveLength(3);
    expect(state.cpuPool).toHaveLength(3);
    const refusedUser = state.current!.userAttackers!.find(
      (id) => id !== state.current!.cpuAccepted,
    );
    expect(state.userPool.some((p) => p.id === refusedUser)).toBe(true);
  });
});

describe("reducer guards", () => {
  const cpu = randomStrategy(seeded(1));

  it("rejects out-of-step actions and invalid ids without changing state", () => {
    const fresh = createSim(roster("u", 5), roster("c", 5), 5, 1);
    expect(submitAttackers(fresh, ["u1", "u2"], cpu)).toBe(fresh); // wrong step
    expect(submitAccepted(fresh, "c0", cpu)).toBe(fresh);
    expect(submitLayout(fresh, "A", cpu)).toBe(fresh);
    expect(submitDefender(fresh, "nope", cpu)).toBe(fresh); // unknown id

    let state = submitDefender(fresh, "u0", cpu);
    state = acknowledgeReveal(state);
    expect(submitAttackers(state, ["u1", "u1"], cpu)).toBe(state); // duplicate
    expect(submitAttackers(state, ["u0", "u1"], cpu)).toBe(state); // defender attacking
    state = submitAttackers(state, ["u1", "u2"], cpu);
    state = acknowledgeReveal(state);
    expect(submitAccepted(state, "u1", cpu)).toBe(state); // not a CPU attacker
  });
});
