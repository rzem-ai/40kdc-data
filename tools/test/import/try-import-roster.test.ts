import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import {
  REGISTERED_ADAPTERS,
  tryImportRoster,
} from "../../src/import/import-roster.js";

const fixture = (path: string): string =>
  readFileSync(
    fileURLToPath(new URL(`../../../conformance/roster/${path}`, import.meta.url)),
    "utf8",
  );

// Per-format fixtures, each labelled with the format identifier the auto-detect
// should pick. Drawn from the conformance corpus so the same inputs feed both
// TS and Rust dispatch.
const FIXTURES: { label: string; input: string; format: string }[] = [
  {
    label: "ListForge JSON (gk-banishers)",
    input: fixture("gk-banishers/input.json"),
    format: "listforge",
  },
  {
    label: "ListForge JSON (gk-allied-multiforce)",
    input: fixture("gk-allied-multiforce/input.json"),
    format: "listforge",
  },
  {
    label: "NewRecruit JSON (chaos-knights-houndpack)",
    input: fixture("chaos-knights-houndpack/input.newrecruit-json.json"),
    format: "newrecruit-json",
  },
  {
    label: "NewRecruit wtc-compact (chaos-knights-houndpack)",
    input: fixture("chaos-knights-houndpack/input.newrecruit-wtc-compact.txt"),
    format: "newrecruit-wtc-compact",
  },
  {
    label: "NewRecruit wtc-full (chaos-knights-houndpack)",
    input: fixture("chaos-knights-houndpack/input.newrecruit-wtc-full.txt"),
    format: "newrecruit-wtc-full",
  },
  {
    label: "NewRecruit simple (chaos-knights-houndpack)",
    input: fixture("chaos-knights-houndpack/input.newrecruit-simple.txt"),
    format: "newrecruit-simple",
  },
];

describe("tryImportRoster — positive auto-detect", () => {
  for (const { label, input, format } of FIXTURES) {
    it(`detects ${format} from ${label}`, () => {
      const result = tryImportRoster(input);
      if (!result.ok) {
        throw new Error(
          `expected ok, got ${result.reason}: ${result.message}\n` +
            `trials: ${JSON.stringify(result.trials, null, 2)}`,
        );
      }
      expect(result.format).toBe(format);
      expect(result.roster.units.length).toBeGreaterThan(0);
      expect(result.roster.source.format).toBe(format);
    });
  }

  it("decodes a gzipped ListForge URL", () => {
    const json = fixture("gk-banishers/input.json");
    const b64 = gzipSync(Buffer.from(json, "utf8")).toString("base64");
    const url = `https://yourapp.example/#/listforge/${b64}`;

    const result = tryImportRoster(url);
    if (!result.ok) throw new Error(`expected ok: ${result.message}`);
    expect(result.format).toBe("listforge");
  });
});

describe("tryImportRoster — failure modes", () => {
  it("rejects empty input", () => {
    const result = tryImportRoster("   ");
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("empty-input");
    expect(result.trials).toEqual([]);
  });

  it("rejects a base64-shaped string that isn't valid gzip", () => {
    const result = tryImportRoster("H4sIAAAAnotreallygzip====");
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("decode-failed");
    expect(result.trials[0]?.id).toBe("listforge");
  });

  it("rejects malformed JSON", () => {
    const result = tryImportRoster("{not valid json");
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("decode-failed");
  });

  it("rejects JSON that no adapter recognises", () => {
    const result = tryImportRoster(JSON.stringify({ hello: "world" }));
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("no-adapter-matched");
    // Every adapter should have been polled and rejected.
    expect(result.trials.length).toBe(REGISTERED_ADAPTERS.length);
    for (const trial of result.trials) {
      expect(trial.matched).toBe(false);
    }
  });

  it("rejects free-form text that no text adapter recognises", () => {
    const result = tryImportRoster("just some random pasted prose, not a list at all");
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("no-adapter-matched");
    expect(result.trials.length).toBe(REGISTERED_ADAPTERS.length);
  });
});

describe("adapter matcher disjointness", () => {
  // Greedy first-match dispatch in tryImportRoster relies on at most one
  // adapter's matches() returning true for any given decoded payload. This test
  // guards that invariant against regressions when new adapters or formats land.
  for (const { label, input, format } of FIXTURES) {
    it(`exactly one adapter matches ${label} (expected: ${format})`, () => {
      // Reproduce the decode pipeline up to (but not including) dispatch.
      let decoded: unknown;
      const trimmed = input.trim();
      if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
        decoded = JSON.parse(trimmed);
      } else {
        decoded = input;
      }

      const matchers = REGISTERED_ADAPTERS.map((a) => ({
        id: a.id,
        matches: a.matches(decoded),
      }));
      const matched = matchers.filter((m) => m.matches);
      expect(matched, `matchers that accepted ${label}: ${JSON.stringify(matchers)}`)
        .toHaveLength(1);
      expect(matched[0].id).toBe(format);
    });
  }
});
