import { describe, expect, it } from "vitest";
import type { ScoringAward } from "@alpaca-software/40kdc-data";
import {
  awardsOf,
  describeAward,
  describeTrigger,
  emptyPlayerGame,
  scoreTurn,
  setPrimary,
} from "@alpaca-software/40kdc-data";
import {
  assertedFromTicks,
  awardRowLabel,
  groupAwards,
  scoringCardFor,
  triggerContainsRound,
} from "./data.js";

// Hermetic fixtures — independent of what the embedded dataset ships.
const endOfTurn: ScoringAward = {
  trigger: { timing: "end-of-turn", player_turn: "your-turn" },
  vp: 3,
};
const endOfCommand: ScoringAward = {
  trigger: { timing: "end-of-phase", phase: "command", player_turn: "your-turn" },
  vp_per: 2,
  per: "controlled-objective",
};

describe("groupAwards", () => {
  it("groups consecutive same-trigger awards and keeps original indices", () => {
    const groups = groupAwards([endOfTurn, endOfCommand, endOfCommand]);
    expect(groups).toHaveLength(2);
    expect(groups[0]!.rows.map((r) => r.index)).toEqual([0]);
    expect(groups[1]!.rows.map((r) => r.index)).toEqual([1, 2]);
    expect(groups[0]!.header).toBe(describeTrigger(endOfTurn.trigger!));
    expect(groups[1]!.header).toBe(describeTrigger(endOfCommand.trigger!));
  });

  it("never merges runs across a different trigger (order is load-bearing)", () => {
    const groups = groupAwards([endOfTurn, endOfCommand, endOfTurn]);
    expect(groups).toHaveLength(3);
    expect(groups.map((g) => g.rows.map((r) => r.index))).toEqual([[0], [1], [2]]);
  });

  it("groups trigger-less awards under the describeAward default header", () => {
    const groups = groupAwards([{ vp: 1 }, { vp: 2 }]);
    expect(groups).toHaveLength(1);
    expect(groups[0]!.header).toBe("Any time");
    expect(groups[0]!.trigger).toBeUndefined();
  });

  it("matches the real battlefield-dominance card's timing structure", () => {
    const card = scoringCardFor("battlefield-dominance");
    expect(card).toBeDefined();
    const groups = groupAwards(awardsOf(card!));
    // One end-of-turn award (rounds 1-2), then two end-of-Command-phase
    // awards (round 2+) — two timing sections.
    expect(groups).toHaveLength(2);
    expect(groups[0]!.rows.map((r) => r.index)).toEqual([0]);
    expect(groups[1]!.rows.map((r) => r.index)).toEqual([1, 2]);
  });
});

describe("awardRowLabel", () => {
  it("strips the trigger prefix the group header already states", () => {
    expect(describeAward(endOfTurn)).toBe("End of your turn: 3 VP");
    expect(awardRowLabel(endOfTurn)).toBe("3 VP");
  });

  it("preserves the cumulative '+ ' marker", () => {
    const a: ScoringAward = { ...endOfCommand, cumulative: true };
    expect(awardRowLabel(a)).toBe("+ 2 VP per controlled objective");
  });

  it("strips the [highest tier] suffix (the panel's tier chip covers it)", () => {
    const a: ScoringAward = { ...endOfTurn, exclusive_group: "tiers" };
    expect(describeAward(a)).toContain("[highest tier]");
    expect(awardRowLabel(a)).toBe("3 VP");
  });

  it("strips the 'Any time' default prefix from trigger-less awards", () => {
    expect(awardRowLabel({ vp: 5 })).toBe("5 VP");
  });
});

describe("assertedFromTicks", () => {
  const awards: ScoringAward[] = [
    endOfTurn, // flat 3 VP
    { ...endOfCommand, per_max: 4 }, // 2 VP per objective, max 4
  ];

  it("returns nothing for missing or empty tick state", () => {
    expect(assertedFromTicks(awards, undefined)).toEqual([]);
    expect(assertedFromTicks(awards, { on: {}, counts: {} })).toEqual([]);
  });

  it("asserts a ticked flat award with count 1", () => {
    const asserted = assertedFromTicks(awards, { on: { 0: true }, counts: {} });
    expect(asserted).toHaveLength(1);
    expect(asserted[0]!.count).toBe(1);
    expect(scoreTurn(asserted)).toBe(3);
  });

  it("uses the stored count for vp_per awards, defaulting to per_max", () => {
    const counted = assertedFromTicks(awards, { on: { 1: true }, counts: { 1: 3 } });
    expect(counted[0]!.count).toBe(3);
    expect(scoreTurn(counted)).toBe(6);
    // No stored count → per_max (the panel's default).
    const defaulted = assertedFromTicks(awards, { on: { 1: true }, counts: {} });
    expect(defaulted[0]!.count).toBe(4);
    expect(scoreTurn(defaulted)).toBe(8);
  });

  it("scores only the highest tier when exclusive-group siblings are both ticked", () => {
    const tiers: ScoringAward[] = [
      { vp: 2, exclusive_group: "t" },
      { vp: 5, exclusive_group: "t" },
    ];
    const asserted = assertedFromTicks(tiers, { on: { 0: true, 1: true }, counts: {} });
    expect(scoreTurn(asserted)).toBe(5);
  });
});

describe("live primary re-banking caps", () => {
  it("setPrimary with raw caps clamps to the remaining per-game room", () => {
    // Rounds 1-3 already bank 40 of a 45 VP game cap; a 15 VP round-4 tick
    // total must clamp to the remaining 5 — the engine subtracts the other
    // rounds itself, which is why the raw caps (not the pre-computed
    // effective cap) are passed in. Feeding the effective cap here would
    // double-subtract and bank 0.
    let g = emptyPlayerGame();
    g = setPrimary(g, 1, 15, { roundCap: 15, gameCap: 45 });
    g = setPrimary(g, 2, 15, { roundCap: 15, gameCap: 45 });
    g = setPrimary(g, 3, 10, { roundCap: 15, gameCap: 45 });
    g = setPrimary(g, 4, 15, { roundCap: 15, gameCap: 45 });
    expect(g.rounds[3]!.primary).toBe(5);
    // Re-banking the same round live replaces (not accumulates) its value.
    g = setPrimary(g, 4, 3, { roundCap: 15, gameCap: 45 });
    expect(g.rounds[3]!.primary).toBe(3);
  });
});

describe("triggerContainsRound", () => {
  it("treats a missing trigger or window as always live", () => {
    expect(triggerContainsRound(undefined, 3)).toBe(true);
    expect(triggerContainsRound({ timing: "end-of-turn" }, 3)).toBe(true);
  });

  it("honors max-only windows (rounds 1-N)", () => {
    const t = { battle_round: { max: 2 } };
    expect(triggerContainsRound(t, 1)).toBe(true);
    expect(triggerContainsRound(t, 2)).toBe(true);
    expect(triggerContainsRound(t, 3)).toBe(false);
  });

  it("honors min-only windows (round N+)", () => {
    const t = { battle_round: { min: 2 } };
    expect(triggerContainsRound(t, 1)).toBe(false);
    expect(triggerContainsRound(t, 2)).toBe(true);
    expect(triggerContainsRound(t, 5)).toBe(true);
  });

  it("honors closed windows", () => {
    const t = { battle_round: { min: 2, max: 4 } };
    expect([1, 2, 3, 4, 5].map((r) => triggerContainsRound(t, r))).toEqual([
      false,
      true,
      true,
      true,
      false,
    ]);
  });
});
