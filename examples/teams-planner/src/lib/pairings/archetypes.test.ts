import { describe, expect, it } from "vitest";
import { archetypeDispositions, ARCHETYPE_POOL, generateCpuTeam } from "./archetypes";
import {
  factionKeywordIdentity,
  fdAssignmentIssues,
  isKnownFaction,
  TEAM_SIZES,
} from "../coverage";
import { ds } from "../dataset";
import { DISPOSITIONS } from "../../../../_shared/matchup-grid.js";

function seeded(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

describe("archetype pool integrity", () => {
  it("has unique ids", () => {
    const ids = ARCHETYPE_POOL.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every faction and detachment resolves in the dataset", () => {
    for (const a of ARCHETYPE_POOL) {
      expect(isKnownFaction(a.factionId), `${a.id}: faction ${a.factionId}`).toBe(true);
      expect(
        ds.detachments.getInFaction(a.detachmentId, a.factionId),
        `${a.id}: ${a.factionId} can't field ${a.detachmentId}`,
      ).not.toBeNull();
    }
  });

  it("every archetype's detachment grants at least one disposition", () => {
    for (const a of ARCHETYPE_POOL) {
      expect(archetypeDispositions(a).length, a.id).toBeGreaterThan(0);
    }
  });

  it("each disposition is coverable by several distinct faction keywords", () => {
    // generateCpuTeam needs slack: for every disposition, count the distinct
    // keywords that can field it. 8-player teams need up to 2 per disposition
    // plus alternatives once keywords collide — 4 distinct is a safe floor.
    for (const d of DISPOSITIONS) {
      const keywords = new Set(
        ARCHETYPE_POOL.filter((a) => archetypeDispositions(a).includes(d)).map((a) =>
          factionKeywordIdentity(a.factionId),
        ),
      );
      expect(keywords.size, `${d}: ${[...keywords].join(", ")}`).toBeGreaterThanOrEqual(4);
    }
  });

  it("is big enough to feel varied", () => {
    expect(ARCHETYPE_POOL.length).toBeGreaterThanOrEqual(100);
  });
});

describe("generateCpuTeam", () => {
  it("produces legal teams across many seeds and every size", () => {
    for (const size of TEAM_SIZES) {
      for (let seed = 0; seed < 25; seed++) {
        const team = generateCpuTeam(size, ARCHETYPE_POOL, seeded(seed * 31 + size));
        expect(team).toHaveLength(size);
        // Disposition assignment is legal.
        expect(fdAssignmentIssues(size, team.map((p) => p.fd))).toEqual([]);
        // One player per faction keyword.
        const keywords = team.map((p) => factionKeywordIdentity(p.factionId));
        expect(new Set(keywords).size).toBe(team.length);
        // Every assigned disposition is actually available to that archetype.
        for (const p of team) {
          const archetype = ARCHETYPE_POOL.find((a) => a.id === p.id)!;
          expect(archetypeDispositions(archetype)).toContain(p.fd);
        }
      }
    }
  });

  it("teams of 8 cover all five dispositions", () => {
    const team = generateCpuTeam(8, ARCHETYPE_POOL, seeded(99));
    expect(new Set(team.map((p) => p.fd)).size).toBe(5);
  });
});
