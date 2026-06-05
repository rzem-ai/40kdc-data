import { describe, expect, it } from "vitest";
import {
  DISPOSITIONS,
  canonicalMatchupId,
  layoutAvailability,
  layoutsForMatchup,
  matrixCells,
  pairKey,
  pairLabel,
} from "../../../_shared/matchup-grid.js";
import { ds } from "./data.js";

// The shared pairing math, exercised against the embedded dataset (the same
// instance the app binds in data.ts). The wrappers in data.ts are covered by
// data.test.ts; these pin the ds-parameterized module itself.

describe("pairKey", () => {
  it("is symmetric over the unordered pair", () => {
    for (const a of DISPOSITIONS) {
      for (const b of DISPOSITIONS) {
        expect(pairKey(a, b)).toBe(pairKey(b, a));
      }
    }
  });

  it("orders by DISPOSITIONS index, lower first", () => {
    expect(pairKey("reconnaissance", "take-and-hold")).toBe("take-and-hold|reconnaissance");
    expect(pairKey("disruption", "disruption")).toBe("disruption|disruption");
  });
});

describe("canonicalMatchupId", () => {
  it("is order-insensitive and resolves the lower-index-first form", () => {
    const ab = canonicalMatchupId(ds, "take-and-hold", "purge-the-foe");
    const ba = canonicalMatchupId(ds, "purge-the-foe", "take-and-hold");
    expect(ab).toBeDefined();
    expect(ab).toBe(ba);
    expect(ab).toBe("take-and-hold-vs-purge-the-foe");
  });

  it("resolves every one of the 15 unordered pairings", () => {
    for (const a of DISPOSITIONS) {
      for (const b of DISPOSITIONS) {
        expect(canonicalMatchupId(ds, a, b)).toBeDefined();
      }
    }
  });
});

describe("layoutsForMatchup", () => {
  it("is variant-ordered and order-insensitive", () => {
    const a = layoutsForMatchup(ds, "take-and-hold", "purge-the-foe");
    const b = layoutsForMatchup(ds, "purge-the-foe", "take-and-hold");
    expect(a.map((l) => l.id)).toEqual(b.map((l) => l.id));
    const variants = a.map((l) => l.variant ?? 0);
    expect([...variants].sort((x, y) => x - y)).toEqual(variants);
    expect(a.length).toBeGreaterThan(0);
    for (const l of a) expect(l.mission_matchup_id).toBe("take-and-hold-vs-purge-the-foe");
  });

  it("availability counts the authored layouts", () => {
    for (const a of DISPOSITIONS) {
      for (const b of DISPOSITIONS) {
        expect(layoutAvailability(ds, a, b)).toBe(layoutsForMatchup(ds, a, b).length);
      }
    }
  });
});

describe("matrixCells", () => {
  it("emits the 15 unordered pairings in upper-triangle order, 5 of them mirrors", () => {
    const cells = matrixCells(ds);
    expect(cells).toHaveLength(15);
    expect(cells.filter((c) => c.mirror)).toHaveLength(5);
    // Upper triangle: every cell's a is at or before its b in DISPOSITIONS.
    for (const c of cells) {
      expect(DISPOSITIONS.indexOf(c.a)).toBeLessThanOrEqual(DISPOSITIONS.indexOf(c.b));
    }
    // Keys are unique — (a,b) and (b,a) never both appear.
    expect(new Set(cells.map((c) => c.key)).size).toBe(15);
  });

  it("cells carry the same layouts the pair lookup returns", () => {
    for (const c of matrixCells(ds)) {
      expect(c.layouts.map((l) => l.id)).toEqual(
        layoutsForMatchup(ds, c.a, c.b).map((l) => l.id),
      );
      expect(c.matchupId).toBe(canonicalMatchupId(ds, c.a, c.b));
    }
  });

  it("labels mirrors and mixed pairings distinctly", () => {
    expect(pairLabel("disruption", "disruption")).toBe("Disruption (mirror)");
    expect(pairLabel("take-and-hold", "reconnaissance")).toBe("Take and Hold vs Reconnaissance");
  });
});
