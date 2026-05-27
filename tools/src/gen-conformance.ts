/**
 * Generate the cross-implementation conformance corpus under repo-root
 * `conformance/`. The TypeScript package is the reference implementation, so the
 * goldens it emits are what the Rust crate must reproduce byte-for-byte
 * (structurally). Run via `npm run gen:conformance`; CI regenerates and asserts
 * `git diff --exit-code conformance/` is clean.
 *
 * Outputs:
 * - `conformance/normalize.json` — `[{ input, expected }]` for normalizeName.
 * - `conformance/roster/<case>/expected.roster.json` — the resolved Roster for
 *   the sibling `input.json` (the ListForge payload).
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { Dataset } from "./data/dataset.js";
import { normalizeName } from "./data/normalize.js";
import { importRoster } from "./import/import-listforge.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "../..");
const CONFORMANCE = join(REPO_ROOT, "conformance");

/** Inputs for the normalize table — every rule, plus real accented/quoted names. */
const NORMALIZE_INPUTS = [
  // NFD diacritic strip
  "Khârn the Betrayer",
  "Brôkhyr",
  "Ûthar",
  "Magnús",
  // apostrophe / quote variants
  "T'au",
  "Be’lakor",
  "Kor’sarro Khan",
  "Aetaos'rau'keres",
  "‘quoted’",
  // whitespace / hyphen collapse + trim
  "Brôkhyr Iron-master",
  "  the   betrayer  ",
  "space--marines",
  // casefold
  "KHÂRN THE BETRAYER",
  // already-normalized (idempotence)
  "kharn the betrayer",
  // distinctness anchors (must NOT collapse together)
  "Khorne",
  "Khârn",
];

/** Pretty JSON with a trailing newline (matches the repo's 2-space convention). */
function writeJson(path: string, value: unknown): void {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function genNormalize(): void {
  const table = NORMALIZE_INPUTS.map((input) => ({ input, expected: normalizeName(input) }));
  writeJson(join(CONFORMANCE, "normalize.json"), table);
  console.log(`normalize.json: ${table.length} cases`);
}

function genRosters(): void {
  const ds = Dataset.embedded();
  const rosterDir = join(CONFORMANCE, "roster");
  for (const entry of readdirSync(rosterDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const caseDir = join(rosterDir, entry.name);
    const input = JSON.parse(readFileSync(join(caseDir, "input.json"), "utf8"));
    const roster = importRoster(input, { dataset: ds });
    writeJson(join(caseDir, "expected.roster.json"), roster);
    console.log(`roster/${entry.name}: ${roster.units.length} units, ${roster.diagnostics.warnings.length} warnings`);
  }
}

genNormalize();
genRosters();
