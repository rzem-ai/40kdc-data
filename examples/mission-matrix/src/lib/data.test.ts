import { describe, expect, it } from "vitest";
import type { ScoreEntry, SecondaryCard } from "@alpaca-software/40kdc-data";
import { SECONDARY_DECK, drawSecondary, excludedIds } from "./data.js";

// A tiny fixture deck keeps the draw tests hermetic — independent of which
// cards the embedded dataset ships.
const card = (id: string): SecondaryCard =>
  ({ id, name: id, card_type: "secondary" }) as SecondaryCard;
const DECK = ["alpha", "bravo", "charlie", "delta"].map(card);

const entry = (cardId: string): ScoreEntry => ({ cardId, round: 1, vp: 3 });

describe("excludedIds", () => {
  it("unions hand, scored log, and manual discards", () => {
    expect(excludedIds(["alpha"], [entry("bravo")], ["charlie"]).sort()).toEqual([
      "alpha",
      "bravo",
      "charlie",
    ]);
  });

  it("dedupes ids that appear in more than one bucket", () => {
    expect(excludedIds(["alpha"], [entry("alpha")], ["alpha"])).toEqual(["alpha"]);
  });

  it("releases a card when its score is removed (engine returns it to hand)", () => {
    // After removeScore: the log entry is gone, the card is back in hand —
    // still excluded, but via the hand bucket.
    const afterUndo = excludedIds(["alpha"], [], []);
    expect(afterUndo).toEqual(["alpha"]);
    // And once discarded from hand it moves to the discard bucket.
    const afterDiscard = excludedIds([], [], ["alpha"]);
    expect(afterDiscard).toEqual(["alpha"]);
  });
});

describe("drawSecondary", () => {
  it("never returns an excluded card", () => {
    const excluded = ["alpha", "charlie"];
    for (let i = 0; i < 20; i++) {
      const got = drawSecondary(excluded, Math.random, DECK);
      expect(got).toBeDefined();
      expect(excluded).not.toContain(got!.id);
    }
  });

  it("is deterministic under an injected rand", () => {
    expect(drawSecondary([], () => 0, DECK)?.id).toBe("alpha");
    expect(drawSecondary([], () => 0.999, DECK)?.id).toBe("delta");
    // Excluding the first card shifts the floor of the pool.
    expect(drawSecondary(["alpha"], () => 0, DECK)?.id).toBe("bravo");
  });

  it("returns undefined when the deck is exhausted", () => {
    expect(drawSecondary(DECK.map((c) => c.id), Math.random, DECK)).toBeUndefined();
  });

  it("treats scored and discarded cards as out of the real deck", () => {
    const [scored, discarded] = [SECONDARY_DECK[0]!, SECONDARY_DECK[1]!];
    const excluded = excludedIds([], [entry(scored.id)], [discarded.id]);
    for (let i = 0; i < 50; i++) {
      const got = drawSecondary(excluded);
      expect(got?.id).not.toBe(scored.id);
      expect(got?.id).not.toBe(discarded.id);
    }
  });
});
