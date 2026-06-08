/**
 * Standardized extractor for GW 11e Faction Pack PDFs → IP-safe staging JSON.
 *
 * The faction packs are the structural source of truth for detachments,
 * stratagems, and enhancements. This tool pulls the *facts* out of a pack —
 * detachment names, stratagem names + CP cost + type + phase, enhancement names,
 * detachment-rule names — and writes them to `data/_audit/faction-pack-input/
 * <faction>.json` for human review before they are merged into `data/core/`.
 *
 * IP firewall: this tool MUST NOT emit GW rules/effect prose. It reads the
 * `WHEN:` line of a stratagem card only to *derive* the structured phase /
 * player-turn fields; the prose itself is never written to the staging file.
 * Stored output is names + numeric/enum metadata only.
 *
 * The packs are *supplements*, not complete codexes: a pack contains only the
 * extra/updated detachments. Absence from a pack does not imply removal. This
 * tool reports only what a pack actually contains; completeness is reconciled
 * against GW's full Detachment-Points list separately.
 *
 * Parsing uses `pdftotext -bbox-layout`, which emits per-word coordinates. GW
 * lays each card out as discrete text blocks; we locate the "<DET> – <TYPE>
 * STRATAGEM" label block, then read the name block directly above it, the CP
 * block in the column gutter, and the `WHEN:` block below — all by coordinate.
 * This is layout-independent (column positions differ across packs and pages).
 * Anything the parser cannot determine is left null and recorded in a per-entry
 * `flags` array for the reviewer.
 *
 * Requires `pdftotext` (poppler) on PATH — authoring-time only, not CI.
 *
 * Usage:
 *   npx tsx tools/src/extract-faction-pack.ts <pdf-path> --faction <faction-id>
 *   npx tsx tools/src/extract-faction-pack.ts --all --dir <pack-pdf-dir>
 */
import { execFileSync } from "node:child_process";
import { readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const DATA_ROOT = resolve(__dirname, "../../data");
const OUT_DIR = resolve(DATA_ROOT, "_audit", "faction-pack-input");

/** Pack-filename fragment → 40kdc faction id. `--all` uses this to route packs. */
const PACK_FACTION: Array<[fragment: string, faction: string]> = [
  ["space-marines", "adeptus-astartes"],
  ["black_templars", "black-templars"],
  ["blood_angels", "blood-angels"],
  ["dark_angels", "dark-angels"],
  ["space_wolves", "space-wolves"],
  ["deathwatch", "deathwatch"],
  ["grey_knights", "grey-knights"],
];

const STRAT_TYPE: Record<string, string> = {
  "BATTLE TACTIC": "battle-tactic",
  "STRATEGIC PLOY": "strategic-ploy",
  "EPIC DEED": "epic-deed",
  WARGEAR: "wargear",
};
const TYPE_RE = /(BATTLE TACTIC|STRATEGIC PLOY|EPIC DEED|WARGEAR)\s+STRATAGEM$/;
const PHASES = ["command", "movement", "shooting", "charge", "fight"] as const;
const SECTION_WORDS = /^(DETACHMENT RULES?|ENHANCEMENTS?|STRATAGEMS?|KEYWORDS?|RESTRICTIONS?)$/;
// Note: "Legends Datasheets" (not bare "Legends") — else it eats the detachment
// "Legends of Saga and Song".
const SECTION_TERMINATORS = /^(Datasheets|Rules Updates|Legends Datasheets|Imperial Armour|Index)\b/i;

export interface ExtractedStratagem {
  id: string;
  name: string;
  type: string | null;
  cp_cost: number | null;
  phases: string[];
  player_turn: string | null;
  timing: string | null;
  flags: string[];
}
export interface ExtractedEnhancement {
  id: string;
  name: string;
  cost: null; // never in the pack — comes from the Munitorum Field Manual
  flags: string[];
}
export interface ExtractedDetachment {
  id: string;
  name: string;
  detachment_rule_name: string | null;
  stratagems: ExtractedStratagem[];
  enhancements: ExtractedEnhancement[];
  flags: string[];
}
export interface PackExtract {
  faction_id: string;
  source_pack: string;
  detachments: ExtractedDetachment[];
}

/** A positioned text block from `pdftotext -bbox-layout`. `gy` is page-globalised y. */
interface Block {
  x: number;
  gy: number;
  text: string;
}

/** Title/caps name → kebab id, matching existing entity-id conventions. */
export function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Title-case a pack ALL-CAPS header for storage as a display name. */
export function titleCase(raw: string): string {
  const small = new Set(["of", "the", "and", "to", "a", "in", "for"]);
  return raw
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((w, i) => (i > 0 && small.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

function runPdftotext(args: string[]): string {
  try {
    return execFileSync("pdftotext", args, { encoding: "utf-8", maxBuffer: 128 * 1024 * 1024 });
  } catch (err: unknown) {
    if ((err as { code?: string }).code === "ENOENT") {
      throw new Error("pdftotext not found — install poppler (e.g. `brew install poppler`).");
    }
    throw err;
  }
}

const decodeEntities = (s: string): string =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');

/**
 * Parse the whole pack's bbox-layout HTML into positioned blocks. `gy` globalises
 * y across pages (pageIndex × 100000 + y) so blocks sort in reading order without
 * relying on printed page numbers (which drift from physical pages on later pages
 * when full-bleed art is inserted).
 */
function allBlocks(pdf: string): Block[] {
  const html = runPdftotext(["-bbox-layout", pdf, "-"]);
  const blocks: Block[] = [];
  html.split(/<page\b/).slice(1).forEach((pageHtml, pageIdx) => {
    const offset = pageIdx * 100000;
    for (const m of pageHtml.matchAll(/<block\b([^>]*)>([\s\S]*?)<\/block>/g)) {
      const x = Number(/xMin="([\d.]+)"/.exec(m[1])?.[1] ?? "0");
      const y = Number(/yMin="([\d.]+)"/.exec(m[1])?.[1] ?? "0");
      const words = [...m[2].matchAll(/<word[^>]*>([^<]*)<\/word>/g)].map((w) => decodeEntities(w[1]));
      const text = words.join(" ").replace(/\s+/g, " ").trim();
      if (text) blocks.push({ x, gy: offset + y, text });
    }
  });
  return blocks;
}

const normCaps = (s: string): string => s.toUpperCase().replace(/[’']/g, "'").replace(/\s+/g, " ").trim();
/** Datasheet/table headers that can masquerade as caps "enhancement" names. */
const DATASHEET_NOISE = new Set([
  "RANGED WEAPONS", "MELEE WEAPONS", "RANGE", "WARGEAR OPTIONS", "UNIT COMPOSITION",
  "KEYWORDS", "LEADER", "TRANSPORT", "DAMAGED", "SUPREME COMMANDER",
]);
/** Non-detachment section headers that bound the last detachment's content. */
const SECTION_MARKER = /^(DATASHEETS|RULES UPDATES|LEGENDS DATASHEETS|IMPERIAL ARMOUR|INDEX)\b/;

const isCapsHeader = (t: string): boolean =>
  /^[A-Z0-9][A-Z0-9'’.,!&/()\- ]*$/.test(t) &&
  /[A-Z]{3,}/.test(t) && // a real word, not a "1CP"/"D6" token
  t.length >= 3 &&
  t.length <= 46 &&
  t.split(" ").length <= 7 &&
  !SECTION_WORDS.test(t) &&
  !/^\d+\s?CP$/.test(t) &&
  !/\bSTRATAGEM$/.test(t);

const sameColumn = (a: number, b: number): boolean => Math.abs(a - b) < 46;
const stripCp = (t: string): { name: string; cp: number | null } => {
  const m = t.match(/^(.*?)[\s]+(\d+)\s?CP$/);
  return m ? { name: m[1].trim(), cp: Number(m[2]) } : { name: t, cp: null };
};

/** Derive phases / player-turn from a `WHEN:` line (the prose itself is discarded). */
function parseWhen(when: string): { phases: string[]; player_turn: string | null; flag?: string } {
  const low = when.toLowerCase();
  const phases = PHASES.filter((p) => low.includes(`${p} phase`));
  let player_turn: string | null = null;
  if (/opponent['’]?s?\b/.test(low)) player_turn = "opponent-turn";
  else if (/\byour\b/.test(low) && phases.length) player_turn = "your-turn";
  else if (phases.length) player_turn = "either";
  const flag = phases.length ? undefined : "phase-review"; // e.g. "any phase"
  return { phases, player_turn, flag };
}

/** Extract stratagems, enhancements, and rule name from a detachment's blocks. */
export function parseDetachmentBlocks(blocks: Block[], detachmentId: string): Omit<ExtractedDetachment, "id" | "name"> {
  const flags: string[] = [];
  const labels = blocks.filter((b) => /\bSTRATAGEM$/.test(b.text) && !/^STRATAGEMS?$/.test(b.text));
  const cpBlocks = blocks.filter((b) => /^\d+\s?CP$/.test(b.text));
  const whenBlocks = blocks.filter((b) => /^WHEN:/i.test(b.text));

  // --- detachment rule name: first caps header under a DETACHMENT RULE(S) marker
  let detachment_rule_name: string | null = null;
  const ruleHeader = blocks.filter((b) => /^DETACHMENT RULES?$/.test(b.text)).sort((a, b) => a.gy - b.gy)[0];
  if (ruleHeader) {
    const rn = blocks
      .filter((b) => sameColumn(b.x, ruleHeader.x) && b.gy > ruleHeader.gy && isCapsHeader(b.text))
      .sort((a, b) => a.gy - b.gy)[0];
    if (rn) detachment_rule_name = titleCase(rn.text);
  }

  // --- stratagems: keyed off each "<…> <TYPE> STRATAGEM" label block.
  const stratagems: ExtractedStratagem[] = [];
  const seenS = new Set<string>();
  for (const label of labels) {
    const typeM = label.text.match(TYPE_RE);
    const type = typeM ? STRAT_TYPE[typeM[1]] : null;

    // name: nearest caps-header block directly above the label, same column
    const nameBlock = blocks
      .filter((b) => sameColumn(b.x, label.x) && b.gy < label.gy && isCapsHeader(stripCp(b.text).name))
      .sort((a, b) => b.gy - a.gy)[0];
    if (!nameBlock) continue;
    const { name, cp: inlineCp } = stripCp(nameBlock.text);
    const id = slug(name);
    if (!id || seenS.has(id)) continue;
    seenS.add(id);

    // cp: inline on the name block, else the CP block within the card window.
    // Card layouts differ: new detachments put CP at the name's right edge on
    // the name row; reprints put it in the left gutter below the label. So scan
    // a window [name row → just below label] × [card width] and pick the CP
    // nearest the name horizontally (avoids grabbing the adjacent column's CP).
    let cp = inlineCp;
    if (cp === null) {
      const inCard = cpBlocks
        .filter((b) => b.gy >= nameBlock.gy - 15 && b.gy <= label.gy + 70 && b.x >= nameBlock.x - 70 && b.x <= nameBlock.x + 260)
        .sort((a, b) => Math.abs(a.x - nameBlock.x) - Math.abs(b.x - nameBlock.x))[0];
      if (inCard) cp = Number(inCard.text.match(/(\d+)/)![1]);
    }

    // phase: the first WHEN: block below the label in the same column
    const when = whenBlocks
      .filter((b) => sameColumn(b.x, label.x) && b.gy >= label.gy)
      .sort((a, b) => a.gy - b.gy)[0];
    const sFlags: string[] = [];
    let phases: string[] = [];
    let player_turn: string | null = null;
    if (when) {
      const w = parseWhen(when.text);
      phases = w.phases;
      player_turn = w.player_turn;
      if (w.flag) sFlags.push(w.flag);
    } else {
      sFlags.push("phase-missing");
    }
    if (!type) sFlags.push("type-missing");
    if (cp === null) sFlags.push("cp-missing");
    sFlags.push("timing-missing"); // pack rarely states once-per-phase/turn/battle

    stratagems.push({ id, name: titleCase(name), type, cp_cost: cp, phases, player_turn, timing: null, flags: sFlags });
  }

  if (!detachment_rule_name) flags.push("rule-name-missing");

  // --- enhancements (subtractive): a detachment page's caps headers are the
  //     title, tagline, rule name, section words, stratagem names, type labels,
  //     and enhancement names. Remove every known category; the rest are
  //     enhancements. Each must be a name+description pair, i.e. followed by a
  //     mixed-case prose block in its column. Cost is never printed in the pack.
  const ruleSlug = detachment_rule_name ? slug(detachment_rule_name) : "";
  const hasProseBelow = (b: Block): boolean =>
    blocks
      .filter((o) => sameColumn(o.x, b.x) && o.gy > b.gy)
      .sort((p, q) => p.gy - q.gy)
      .some((o, i) => i === 0 && /[a-z]/.test(o.text)); // nearest block below is prose
  const enhancements: ExtractedEnhancement[] = [];
  const seenE = new Set<string>();
  for (const b of blocks) {
    if (!isCapsHeader(b.text) || DATASHEET_NOISE.has(normCaps(b.text))) continue;
    const isUpgrade = / UPGRADE$/.test(b.text);
    const name = b.text.replace(/ UPGRADE$/, "").trim();
    const id = slug(name);
    if (!id || seenE.has(id) || seenS.has(id)) continue; // skip stratagem names
    if (id === detachmentId || id === ruleSlug) continue; // skip title / rule name
    if (!hasProseBelow(b)) continue; // enhancements always have a description
    seenE.add(id);
    enhancements.push({
      id,
      name: titleCase(name),
      cost: null,
      flags: ["cost-missing", "name-needs-review", ...(isUpgrade ? ["upgrade-tag?"] : [])],
    });
  }
  if (!enhancements.length) flags.push("no-enhancements-parsed");

  return { detachment_rule_name, stratagems, enhancements, flags };
}

/**
 * Parse the pack's table of contents (first two pages) into the ordered list of
 * detachments with their start pages. Uses non-layout extraction so the two
 * columns don't interleave; dot leaders are private-font glyphs (non-word
 * chars), so a TOC row is `<Name><2+ non-word><page#>`. Entries are kept only
 * between the "Detachments" header and the first non-detachment section.
 */
export function parseToc(tocText: string): Array<{ name: string; page: number; section?: boolean }> {
  const rows: Array<{ name: string; page: number; section?: boolean }> = [];
  let inDetachments = false;
  let sawHeader = false;
  for (const line of tocText.split("\n")) {
    const m = line.match(/^\s*([A-Z][A-Za-z0-9'’ \-]+?)[^\w\s]{2,}\s*(\d+)\s*$/);
    if (!m) continue;
    const name = m[1].trim();
    const page = Number(m[2]);
    if (/^Detachments$/i.test(name)) {
      inDetachments = true;
      sawHeader = true;
      continue;
    }
    if (sawHeader && SECTION_TERMINATORS.test(name)) {
      if (inDetachments) rows.push({ name, page, section: true }); // bounds the last detachment
      inDetachments = false;
      continue;
    }
    if (inDetachments) rows.push({ name, page });
  }
  return rows;
}

export function extractPack(pdf: string, faction: string): PackExtract {
  // detachment names (ordered) from the TOC; content boundaries from block positions
  const names = parseToc(runPdftotext(["-f", "1", "-l", "2", pdf, "-"]))
    .filter((t) => !t.section)
    .map((t) => t.name);
  const blocks = allBlocks(pdf);

  // start of each detachment = its title block (exact uppercase name match, first
  // occurrence). Stratagem labels like "NAME – TYPE STRATAGEM" are not exact, so
  // they don't collide with the title.
  const starts = names
    .map((name) => {
      const title = blocks.filter((b) => normCaps(b.text) === normCaps(name)).sort((a, b) => a.gy - b.gy)[0];
      return title ? { name, gy: title.gy } : null;
    })
    .filter((s): s is { name: string; gy: number } => s !== null)
    .sort((a, b) => a.gy - b.gy);
  const sectionGys = blocks.filter((b) => SECTION_MARKER.test(normCaps(b.text))).map((b) => b.gy).sort((a, b) => a - b);

  const detachments: ExtractedDetachment[] = [];
  for (let i = 0; i < starts.length; i++) {
    const start = starts[i].gy;
    const nextDet = starts[i + 1]?.gy ?? Infinity;
    const nextSection = sectionGys.find((gy) => gy > start) ?? Infinity;
    // Backstop: a detachment is at most ~2 pages (gy page stride is 100000).
    // Bounds the last detachment when no datasheets/section divider block is
    // detected, so it can't bleed into the datasheet pages that follow.
    const end = Math.min(nextDet, nextSection, start + 200000);
    const id = slug(starts[i].name);
    const body = parseDetachmentBlocks(
      blocks.filter((b) => b.gy >= start && b.gy < end),
      id,
    );
    detachments.push({ id, name: starts[i].name, ...body });
  }
  return { faction_id: faction, source_pack: basename(pdf), detachments };
}

function factionForPack(file: string): string | undefined {
  const lower = file.toLowerCase();
  return PACK_FACTION.find(([frag]) => lower.includes(frag))?.[1];
}

function main(): void {
  const argv = process.argv.slice(2);
  mkdirSync(OUT_DIR, { recursive: true });

  let jobs: Array<{ pdf: string; faction: string }> = [];
  if (argv[0] === "--all") {
    const dirIdx = argv.indexOf("--dir");
    const dir = dirIdx === -1 ? undefined : argv[dirIdx + 1];
    if (!dir) {
      console.error("Usage: extract-faction-pack.ts --all --dir <pack-pdf-dir>");
      process.exit(1);
    }
    for (const f of readdirSync(dir)) {
      if (!/faction_pack.*\.pdf$/i.test(f)) continue;
      const faction = factionForPack(f);
      if (faction) jobs.push({ pdf: resolve(dir, f), faction });
    }
  } else {
    const facIdx = argv.indexOf("--faction");
    const pdf = argv[0];
    if (!pdf || facIdx === -1) {
      console.error("Usage: extract-faction-pack.ts <pdf-path> --faction <faction-id>");
      process.exit(1);
    }
    jobs = [{ pdf: resolve(pdf), faction: argv[facIdx + 1] }];
  }

  for (const { pdf, faction } of jobs) {
    const result = extractPack(pdf, faction);
    const out = resolve(OUT_DIR, `${faction}.json`);
    writeFileSync(out, JSON.stringify(result, null, 2) + "\n");
    const nStrat = result.detachments.reduce((a, d) => a + d.stratagems.length, 0);
    const nEnh = result.detachments.reduce((a, d) => a + d.enhancements.length, 0);
    console.log(
      `  ${faction}: ${result.detachments.length} detachments, ${nStrat} stratagems, ${nEnh} enhancements → ${out}`,
    );
  }
}

const isMain =
  process.argv[1] &&
  resolve(process.argv[1]).replace(/\.\w+$/, "") === fileURLToPath(import.meta.url).replace(/\.\w+$/, "");
if (isMain) main();
