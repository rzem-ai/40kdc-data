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
  // Space Marine chapters: own datacards file where one exists, else the generic
  // space_marines file (shared detachments/enhancements/stratagems).
  "black-templars": ["blacktemplar", "space_marines"],
  "blood-angels": ["bloodangels", "space_marines"],
  "dark-angels": ["darkangels", "space_marines"],
  deathwatch: ["deathwatch", "space_marines"],
  "space-wolves": ["spacewolves", "space_marines"],
  "crimson-fists": ["space_marines"],
  "imperial-fists": ["space_marines"],
  "iron-hands": ["space_marines"],
  "raven-guard": ["space_marines"],
  salamanders: ["space_marines"],
  ultramarines: ["space_marines"],
  "white-scars": ["space_marines"],
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

interface Bucket { total: number; had: number; filled: number; missing: number }
interface FactionResult {
  faction: string;
  enrichment: Bucket;
  enhancements: Bucket;
  stratagems: Bucket;
  filled: number;
  missingSample: string[];
}
const DEFAULT_GV = { edition: "11th", dataslate: "pre-launch-provisional" };

async function backfillFaction(faction: string): Promise<FactionResult | null> {
  const enrPath = join(ENRICH, faction, "abilities.json");
  const corePath = (kind: string): string => join(REPO, "data/core", faction, `${kind}.json`);
  const enrichment: Json[] = existsSync(enrPath) ? readJSON(enrPath) : [];
  const coreEnh: Json[] = existsSync(corePath("enhancements")) ? readJSON(corePath("enhancements")) : [];
  const coreStrat: Json[] = existsSync(corePath("stratagems")) ? readJSON(corePath("stratagems")) : [];
  if (!enrichment.length && !coreEnh.length && !coreStrat.length) return null;

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
  const lookup = (key: string, name: string): { t: string; ref: string } | null => {
    for (const c of [key, slug(name), baseName(key), baseName(slug(name))])
      if (c && text.has(c)) return { t: text.get(c)!, ref: refOf.get(c) ?? "10th/json/?.json" };
    return null;
  };

  const newEntries: Json[] = [];
  const added = new Set<string>();
  const missingSample: string[] = [];
  // fill one entity keyed by `key`; returns 'had' | 'filled' | 'missing'
  const fill = (key: string, name: string, ability_type: string, unit_ids: Json, game_version: Json): "had" | "filled" | "missing" => {
    if (have.has(key) || added.has(key)) return "had";
    const hit = lookup(key, name);
    if (!hit) {
      if (missingSample.length < 30) missingSample.push(`${key} [${ability_type}]`);
      return "missing";
    }
    newEntries.push({
      ability_id: key, name, faction_id: faction, unit_ids: unit_ids ?? [],
      ability_type, game_version: game_version ?? DEFAULT_GV,
      source: { kind: "game-datacards", ref: hit.ref, edition: "10e" }, raw_text: hit.t,
    });
    added.add(key);
    return "filled";
  };

  const tally = (items: Json[], make: (e: Json) => ["had" | "filled" | "missing"]): Bucket => {
    const b: Bucket = { total: items.length, had: 0, filled: 0, missing: 0 };
    for (const e of items) b[make(e)[0]]++;
    return b;
  };
  const eBucket = tally(enrichment, (a) => [fill(a.ability_id, a.name, a.ability_type ?? "unknown", a.unit_ids, a.game_version)]);
  const hBucket = tally(coreEnh, (e) => [fill(e.ability_id ?? e.id, e.name, "enhancement", [], e.game_version)]);
  const sBucket = tally(coreStrat, (e) => [fill(e.ability_id ?? e.id, e.name, "stratagem", [], e.game_version)]);

  if (newEntries.length && !DRY) {
    if (!existsSync(STORE_ROOT)) mkdirSync(STORE_ROOT, { recursive: true });
    writeFileSync(storePath, JSON.stringify([...store, ...newEntries], null, 2) + "\n");
  }
  return { faction, enrichment: eBucket, enhancements: hBucket, stratagems: sBucket, filled: newEntries.length, missingSample };
}

async function main(): Promise<void> {
  const CORE = resolve(REPO, "data/core");
  const factions = factionArgs.length
    ? factionArgs
    : [...new Set([
        ...readdirSync(ENRICH).filter((f) => !f.startsWith("_") && existsSync(join(ENRICH, f, "abilities.json"))),
        ...readdirSync(CORE).filter((f) => !f.startsWith("_") && (existsSync(join(CORE, f, "enhancements.json")) || existsSync(join(CORE, f, "stratagems.json")))),
      ])].sort();

  const results: FactionResult[] = [];
  for (const f of factions) {
    const r = await backfillFaction(f);
    if (r) {
      results.push(r);
      const e = r.enrichment, h = r.enhancements, s = r.stratagems;
      console.log(`${f.padEnd(24)} enr +${String(e.filled).padStart(4)}  enh +${String(h.filled).padStart(3)}  strat +${String(s.filled).padStart(3)}  (faction total filled ${r.filled})`);
    }
  }
  const sum = (sel: (r: FactionResult) => Bucket) =>
    results.reduce((a, r) => { const b = sel(r); return { total: a.total + b.total, had: a.had + b.had, filled: a.filled + b.filled, missing: a.missing + b.missing }; }, { total: 0, had: 0, filled: 0, missing: 0 } as Bucket);
  const e = sum((r) => r.enrichment), h = sum((r) => r.enhancements), s = sum((r) => r.stratagems);
  const totalFilled = results.reduce((a, r) => a + r.filled, 0);
  console.log("—".repeat(72));
  const line = (name: string, b: Bucket) => console.log(`${name.padEnd(16)} total=${String(b.total).padStart(5)}  had=${String(b.had).padStart(5)}  filled=${String(b.filled).padStart(5)}  missing=${String(b.missing).padStart(5)}`);
  line("enrichment", e); line("core enhancements", h); line("core stratagems", s);
  console.log(`TOTAL ENTRIES FILLED THIS RUN: ${totalFilled}${DRY ? "  (DRY RUN — nothing written)" : ""}`);

  if (REPORT_PATH) {
    writeFileSync(resolve(REPO, REPORT_PATH), JSON.stringify({ generated: "backfill-store", totals: { enrichment: e, enhancements: h, stratagems: s, filled: totalFilled }, results }, null, 2) + "\n");
    console.log(`report → ${REPORT_PATH}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
