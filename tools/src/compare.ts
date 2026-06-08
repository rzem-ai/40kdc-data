/**
 * Fleet comparison: expected kills of attacker units against target-profile
 * archetypes. The cross product — a set of attacker units against a set of
 * targets — yielding a matrix of expected models killed per (unit, target).
 *
 * Target profiles reference real dataset units (`faction_id` + `unit_id`), so
 * each cell resolves the live unit and feeds it straight to {@link crunch}; the
 * target's defensive abilities (FNP, ability invulns, save/toughness mods) are
 * resolved via {@link Dataset.defensiveBuffsFor} and stacked onto the crunch.
 * Rapid Fire / Melta come for free: each cell sets `withinHalfRange` from
 * `distance <= range / 2`.
 *
 * Python mirror: `python/src/wh40kdc/compare.py`. The per-cell `expectedKills`
 * is pinned against Python by the `compare` conformance area.
 *
 * @packageDocumentation
 */
import { crunch, type EngineContext } from "./cruncher/index.js";
import type { Dataset } from "./data/dataset.js";
import type { UnitView } from "./data/entities.js";
import type { TargetProfile, Unit, Weapon } from "./generated.js";

export type ComparePhase = "shooting" | "fight";
export type CompareMetric = "best-weapon" | "unit-total";

/** Which weapon type fires in a phase: shooting → ranged, fight → melee. */
export function weaponTypeForComparePhase(phase: ComparePhase): "ranged" | "melee" {
  return phase === "fight" ? "melee" : "ranged";
}

/** One attacker weapon profile evaluated against one target. */
export interface WeaponCell {
  weaponId: string;
  weaponName: string;
  profileIndex: number;
  profileName: string;
  range: number | null;
  reaches: boolean;
  withinHalfRange: boolean;
  expectedKills: number;
}

/** One (attacker unit, target profile) pair across all the unit's weapons. */
export interface MatrixCell {
  targetProfileId: string;
  targetProfileName: string;
  best: WeaponCell | null;
  unitTotal: number;
  weapons: WeaponCell[];
}

export interface MatrixRow {
  unitId: string;
  unitName: string;
  cells: MatrixCell[];
  /** Peak cell value across targets — the row's sort key. */
  peak: number;
}

/** A target profile resolved to its live dataset unit. */
export interface ResolvedTarget {
  profileId: string;
  profileName: string;
  unitRaw: Unit;
  modelCount: number;
}

export function cellValue(cell: MatrixCell, metric: CompareMetric): number {
  if (metric === "unit-total") return cell.unitTotal;
  return cell.best?.expectedKills ?? 0;
}

/**
 * Resolve a target profile to its referenced unit, faction-scoped (shared ids
 * like Rhino/Forgefiend appear under several factions). Returns null if the
 * referenced unit is absent.
 */
export function resolveTarget(ds: Dataset, profile: TargetProfile): ResolvedTarget | null {
  const unit = ds.units.getInFaction(profile.unit_id, profile.faction_id);
  if (!unit) return null;
  const override = profile.model_count_override ?? null;
  const modelCount = override ?? unit.raw.model_count?.min ?? 1;
  return { profileId: profile.id, profileName: profile.name, unitRaw: unit.raw, modelCount };
}

/**
 * Expected models killed for one (weapon profile, target) at a distance. The
 * single unit of computation the matrix and the conformance corpus share.
 */
export function expectedKills(
  ds: Dataset,
  weaponRaw: Weapon,
  profileIndex: number,
  target: ResolvedTarget,
  phase: ComparePhase,
  modelsFiring: number,
  withinHalfRange: boolean,
): number {
  const ctx: EngineContext = { phase, withinHalfRange };
  const buffs = ds.defensiveBuffsFor(
    { unitId: target.unitRaw.id, factionId: target.unitRaw.faction_id },
    ctx,
  );
  const out = crunch(
    {
      attacker: { weapon: weaponRaw, profileIndex },
      target: { unit: target.unitRaw, profileIndex: 0, modelCount: target.modelCount },
      modelsFiring,
      buffs,
      context: ctx,
    },
    ds,
  );
  const stage = out.stages.find((s) => s.name === "models-killed");
  return stage ? stage.expected : 0;
}

/**
 * Evaluate every phase-appropriate weapon profile of one attacker unit against
 * one target, returning per-weapon results plus the best.
 */
export function unitVsTarget(
  ds: Dataset,
  attackerUnit: UnitView,
  target: ResolvedTarget,
  distance: number,
  phase: ComparePhase,
  modelsFiring = 1,
): MatrixCell {
  const wantType = weaponTypeForComparePhase(phase);
  const weapons: WeaponCell[] = [];
  for (const weapon of attackerUnit.weapons) {
    const wraw = weapon.raw;
    if (wraw.type !== wantType) continue;
    wraw.profiles.forEach((wprofile, idx) => {
      const rng = wprofile.range;
      const isRanged = typeof rng === "number";
      const reaches = !isRanged || (rng as number) >= distance;
      const withinHalf = isRanged && distance <= (rng as number) / 2;
      const kills = reaches
        ? expectedKills(ds, wraw, idx, target, phase, modelsFiring, withinHalf)
        : 0;
      weapons.push({
        weaponId: wraw.id,
        weaponName: weapon.name,
        profileIndex: idx,
        profileName: wprofile.name ?? weapon.name,
        range: isRanged ? (rng as number) : null,
        reaches,
        withinHalfRange: withinHalf,
        expectedKills: kills,
      });
    });
  }
  const reaching = weapons.filter((w) => w.reaches);
  const best = reaching.reduce<WeaponCell | null>(
    (acc, w) => (acc === null || w.expectedKills > acc.expectedKills ? w : acc),
    null,
  );
  const unitTotal = reaching.reduce((sum, w) => sum + w.expectedKills, 0);
  return { targetProfileId: target.profileId, targetProfileName: target.profileName, best, unitTotal, weapons };
}

/** Result of evaluating one (attacker weapon profile, target profile) cell. */
export interface CompareCell {
  expectedKills: number;
  reaches: boolean;
  withinHalfRange: boolean;
  modelCount: number;
}

/**
 * Evaluate one (attacker weapon profile, target profile) cell — the single-cell
 * entry point shared by the conformance runner and consumers. Throws on unknown
 * profile/weapon ids so the runner can map them to the closed error enum.
 */
export function compareCell(
  ds: Dataset,
  opts: {
    factionId: string;
    unitId: string;
    weaponId: string;
    profileIndex: number;
    targetProfileId: string;
    distance: number;
    phase: ComparePhase;
    modelsFiring?: number;
  },
): CompareCell {
  const profile = ds.targetProfiles.get(opts.targetProfileId);
  if (!profile) throw new Error(`unknown target profile: ${opts.targetProfileId}`);
  const target = resolveTarget(ds, profile);
  if (!target) {
    throw new Error(
      `target profile ${opts.targetProfileId} references missing unit ${profile.unit_id}`,
    );
  }
  const weapon = ds.weapons.get(opts.weaponId);
  if (!weapon) throw new Error(`unknown weapon: ${opts.weaponId}`);
  const wraw = weapon.raw;
  const rng = wraw.profiles[opts.profileIndex]?.range;
  const isRanged = typeof rng === "number";
  const reaches = !isRanged || (rng as number) >= opts.distance;
  const withinHalfRange = isRanged && opts.distance <= (rng as number) / 2;
  const kills = reaches
    ? expectedKills(ds, wraw, opts.profileIndex, target, opts.phase, opts.modelsFiring ?? 1, withinHalfRange)
    : 0;
  return { expectedKills: kills, reaches, withinHalfRange, modelCount: target.modelCount };
}

/** The cross product: one row per attacker unit, one column per target. */
export function buildMatrix(
  ds: Dataset,
  attackerUnits: UnitView[],
  targets: ResolvedTarget[],
  distance: number,
  phase: ComparePhase,
  metric: CompareMetric,
  modelsFiring = 1,
): MatrixRow[] {
  const rows = attackerUnits.map((unit) => {
    const cells = targets.map((t) => unitVsTarget(ds, unit, t, distance, phase, modelsFiring));
    const peak = cells.reduce((m, c) => Math.max(m, cellValue(c, metric)), 0);
    return { unitId: unit.id, unitName: unit.name, cells, peak };
  });
  return rows.sort((a, b) => b.peak - a.peak);
}

/** Render a matrix as a Discord-paste markdown table. */
export function matrixToMarkdown(
  rows: MatrixRow[],
  targets: ResolvedTarget[],
  metric: CompareMetric,
): string {
  const headers = ["Unit", ...targets.map((t) => t.profileName)];
  const lines = [`| ${headers.join(" | ")} |`, `|${headers.map(() => "---").join("|")}|`];
  for (const row of rows) {
    const cells = row.cells.map((c) => {
      const v = cellValue(c, metric);
      const text = v ? v.toFixed(2) : "—";
      return v >= 1 ? `**${text}**` : text;
    });
    lines.push(`| ${[row.unitName, ...cells].join(" | ")} |`);
  }
  return lines.join("\n");
}
