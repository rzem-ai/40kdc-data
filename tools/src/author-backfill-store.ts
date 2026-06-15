/**
 * author:backfill-store — populate the out-of-repo raw-text store (the sibling
 * `40kdc-abilities` repo) for enrichment abilities that have NO store entry yet,
 * sourcing verbatim text from the community **game-datacards** 10th-edition
 * datasources (https://github.com/game-datacards/datasources).
 *
 * IP posture: identical to `author:ingest` — verbatim rules text lands ONLY in
 * the out-of-repo store (private), never in this repo. This tool itself is pure
 * structured code and is the only thing committed to 40kdc-data.
 *
 * Safety contract:
 *   - FILL-ONLY. An ability_id that already has a store entry is NEVER touched
 *     (preserves newer 11e prose captured by `author:ingest`). New entries are
 *     appended after the existing ones.
 *   - No fabrication. If game-datacards has no text for an ability_id, it is left
 *     missing and reported — never invented.
 *
 * Source provenance: every backfilled entry carries
 *   source: { kind: "game-datacards", ref: "10th/json/<file>.json", edition: "10e" }
 * so the 10e origin is explicit and the entry can be superseded by 11e text later.
 *
 * Usage:
 *   npx tsx tools/src/author-backfill-store.ts [faction...] [--store <dir>] [--dry-run] [--report <file>]
 *   (no faction args = all factions)
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const REPO = resolve(__dirname, "../..");
const ENRICH = resolve(REPO, "data/enrichment");

const args = process.argv.slice(2);
const flag = (name: string): string | undefined => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const DRY = args.includes("--dry-run");
const STORE_ROOT = resolve(REPO, flag("--store") ?? "../40kdc-abilities");
const REPORT_PATH = flag("--report");
const factionArgs = args.filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--store" && args[i - 1] !== "--report");

const GDC_BASE = "https://raw.githubusercontent.com/game-datacards/datasources/main/10th/json";

// enrichment faction id -> game-datacards file basename(s). Marines span chapters.
const FACTION_FILES: Record<string, string[]> = {
  "adepta-sororitas": ["adeptasororitas"],
  "adeptus-astartes": ["space_marines", "blacktemplar", "bloodangels", "darkangels", "deathwatch", "spacewolves", "marines_leviathan"],
  "adeptus-custodes": ["adeptuscustodes"],
  "adeptus-mechanicus": ["adeptusmechanicus"],
  aeldari: ["aeldari"],
  "agents-of-the-imperium": ["agents"],
  "astra-militarum": ["astramilitarum"],
  "chaos-daemons": ["chaosdaemons"],
  "chaos-knights": ["chaosknights"],
  "chaos-space-marines": ["chaos_spacemarines"],
  "death-guard": ["deathguard"],
  drukhari: ["drukhari"],
  "emperors-children": ["emperors_children"],
  "genestealer-cults": ["gsc"],
  "grey-knights": ["greyknights"],
  "imperial-knights": ["imperialknights"],
  "leagues-of-votann": ["votann"],
  necrons: ["necrons"],
  orks: ["orks"],
  "tau-empire": ["tau"],
  "thousand-sons": ["thousandsons"],
  tyranids: ["tyranids"],
  "world-eaters": ["worldeaters"],
};
// universal sources appended to every faction (core stratagems + global enhancements).
const GLOBAL_FILES = ["core", "enhancements"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Json = any;
const slug = (s: string): string =>
  String(s ?? "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
// strip a trailing USR parameter: feel-no-pain-5 -> feel-no-pain, deadly-demise-d3 -> deadly-demise
const baseName = (id: string): string => id.replace(/-(d?\d+)$/i, "");

const cleanText = (raw: string): string =>
  String(raw)
    .replace(/<\s*br\s*\/?\s*>/gi, "\n")
    .replace(/<\/(p|li|div)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&rsquo;|&#39;|&#8217;/g, "'").replace(/&ldquo;|&rdquo;|&quot;/g, '"').replace(/&hellip;/g, "…")
    .replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").replace(/[ \t]{2,}/g, " ").trim();

const fetched = new Map<string, Json>();
async function gdcFile(base: string): Promise<Json | null> {
  if (fetched.has(base)) return fetched.get(base);
  try {
    const res = await fetch(`${GDC_BASE}/${base}.json`);
    if (!res.ok) { fetched.set(base, null); return null; }
    const j = await res.json();
    fetched.set(base, j);
    return j;
  } catch {
    fetched.set(base, null);
    return null;
  }
}

/** Recursively harvest every {name, <prose>} pair into slug(name) -> text (first non-empty wins). */
function harvest(node: Json, out: Map<string, string>): void {
  if (Array.isArray(node)) { for (const v of node) harvest(v, out); return; }
  if (!node || typeof node !== "object") return;
  const name = typeof node.name === "string" ? node.name : null;
  if (name) {
    for (const field of ["description", "rule", "effect", "ability"]) {
      const t = node[field];
      if (typeof t === "string" && cleanText(t).length > 10) {
        const k = slug(name);
        if (k && !out.has(k)) out.set(k, cleanText(t));
        break;
      }
    }
  }
  for (const v of Object.values(node)) harvest(v, out);
}

const readJSON = (p: string): Json => JSON.parse(readFileSync(p, "utf-8"));

interface FactionResult {
  faction: string;
  enrichment: number;
  alreadyInStore: number;
  filled: number;
  stillMissing: number;
  filledIds: string[];
  missingByType: Record<string, number>;
  missingSample: string[];
}

async function backfillFaction(faction: string): Promise<FactionResult | null> {
  const enrPath = join(ENRICH, faction, "abilities.json");
  if (!existsSync(enrPath)) return null;
  const enrichment: Json[] = readJSON(enrPath);

  const storePath = join(STORE_ROOT, `${faction}.json`);
  const store: Json[] = existsSync(storePath) ? readJSON(storePath) : [];
  const have = new Set(store.map((e) => e.ability_id));

  // build text map from this faction's game-datacards file(s) + universal files
  const files = [...(FACTION_FILES[faction] ?? []), ...GLOBAL_FILES];
  const text = new Map<string, string>();
  const refOf = new Map<string, string>();
  for (const base of files) {
    const data = await gdcFile(base);
    if (!data) continue;
    const before = new Set(text.keys());
    harvest(data, text);
    for (const k of text.keys()) if (!before.has(k) && !refOf.has(k)) refOf.set(k, `10th/json/${base}.json`);
  }

  const lookup = (a: Json): { t: string; ref: string } | null => {
    const cands = [a.ability_id, slug(a.name), baseName(a.ability_id), baseName(slug(a.name))];
    for (const c of cands) if (c && text.has(c)) return { t: text.get(c)!, ref: refOf.get(c) ?? "10th/json/?.json" };
    return null;
  };

  const newEntries: Json[] = [];
  const filledIds: string[] = [];
  const missingByType: Record<string, number> = {};
  const missingSample: string[] = [];
  for (const a of enrichment) {
    if (have.has(a.ability_id)) continue;
    const hit = lookup(a);
    if (hit) {
      newEntries.push({
        ability_id: a.ability_id,
        name: a.name,
        faction_id: faction,
        unit_ids: a.unit_ids ?? [],
        ability_type: a.ability_type ?? null,
        game_version: a.game_version ?? { edition: "11th", dataslate: "pre-launch-provisional" },
        source: { kind: "game-datacards", ref: hit.ref, edition: "10e" },
        raw_text: hit.t,
      });
      filledIds.push(a.ability_id);
    } else {
      const ty = a.ability_type ?? "unknown";
      missingByType[ty] = (missingByType[ty] ?? 0) + 1;
      if (missingSample.length < 30) missingSample.push(`${a.ability_id} [${ty}]`);
    }
  }

  if (newEntries.length && !DRY) {
    if (!existsSync(STORE_ROOT)) mkdirSync(STORE_ROOT, { recursive: true });
    writeFileSync(storePath, JSON.stringify([...store, ...newEntries], null, 2) + "\n");
  }

  return {
    faction,
    enrichment: enrichment.length,
    alreadyInStore: enrichment.filter((e) => have.has(e.ability_id)).length,
    filled: newEntries.length,
    stillMissing: enrichment.length - enrichment.filter((e) => have.has(e.ability_id)).length - newEntries.length,
    filledIds,
    missingByType,
    missingSample,
  };
}

async function main(): Promise<void> {
  const factions = factionArgs.length
    ? factionArgs
    : readdirSync(ENRICH).filter((f) => !f.startsWith("_") && existsSync(join(ENRICH, f, "abilities.json")));

  const results: FactionResult[] = [];
  for (const f of factions) {
    const r = await backfillFaction(f);
    if (r) {
      results.push(r);
      console.log(`${f.padEnd(26)} enr=${String(r.enrichment).padStart(4)} had=${String(r.alreadyInStore).padStart(4)} filled=${String(r.filled).padStart(4)} missing=${String(r.stillMissing).padStart(4)}`);
    }
  }
  const tot = results.reduce(
    (a, r) => ({ enr: a.enr + r.enrichment, had: a.had + r.alreadyInStore, filled: a.filled + r.filled, missing: a.missing + r.stillMissing }),
    { enr: 0, had: 0, filled: 0, missing: 0 },
  );
  console.log("—".repeat(60));
  console.log(`TOTAL enrichment=${tot.enr} already-in-store=${tot.had} FILLED=${tot.filled} still-missing=${tot.missing}${DRY ? "  (DRY RUN — nothing written)" : ""}`);

  if (REPORT_PATH) {
    writeFileSync(resolve(REPO, REPORT_PATH), JSON.stringify({ generated: "backfill-store", totals: tot, results }, null, 2) + "\n");
    console.log(`report → ${REPORT_PATH}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
