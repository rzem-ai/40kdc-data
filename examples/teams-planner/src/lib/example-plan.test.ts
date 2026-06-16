import { describe, expect, it } from "vitest";
import { examplePlan } from "./example-plan";
import { sanitizePlan } from "./share-plan";
import { teamCoverage } from "./coverage";
import { DISPOSITIONS } from "../../../_shared/matchup-grid.js";

describe("examplePlan", () => {
  it("fills a five-player demo from real dataset ids", () => {
    const plan = examplePlan();
    expect(plan.size).toBe(5);
    expect(plan.players).toHaveLength(5);
    for (const p of plan.players) {
      expect(p.factionIds.length).toBeGreaterThan(0);
      expect(p.armies.length).toBeGreaterThan(0);
      expect(p.preferences.length).toBeGreaterThan(0);
    }
  });

  it("survives the sanitizer with no dropped ids", () => {
    // The demo must round-trip cleanly: every faction/detachment/army id resolves.
    const result = sanitizePlan(examplePlan());
    expect(result).not.toBeNull();
    expect(result!.dropped).toEqual([]);
    expect(result!.plan.players).toHaveLength(5);
  });

  it("covers every disposition and locks the first two players in", () => {
    const plan = examplePlan();
    const coverage = teamCoverage(plan);
    expect(coverage.gaps).toEqual([]);
    expect(coverage.ready).toBe(true);
    // First two players are locked into their covering disposition.
    expect(coverage.lockedByDisposition[DISPOSITIONS[0]].length).toBeGreaterThan(0);
    expect(coverage.lockedByDisposition[DISPOSITIONS[1]].length).toBeGreaterThan(0);
  });
});
