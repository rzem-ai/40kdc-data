/**
 * Translates ability DSL entries into plain English descriptions.
 *
 * Recursively walks the effect/condition tree and produces human-readable
 * text purely from the structured data — no external text sources needed.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describeCondition, type Condition } from "../translate/condition.js";

// ─── Types (minimal, matching schema shapes) ─────────────────────────

interface Effect {
  type: string;
  target?: string;
  modifier?: Record<string, unknown>;
  condition?: Condition;
  effect?: Effect;
  steps?: Effect[];
  options?: (Effect & { name?: string; requirement?: Record<string, unknown>; choice_label?: string })[];
  choice_label?: string;
  dice?: string;
  threshold?: number | string;
  comparison?: string;
  on_success?: Effect | null;
  on_fail?: Effect | null;
  pool?: { count: number; die: string };
  max_activations?: number;
}

interface Ability {
  ability_id: string;
  name: string;
  ability_type?: string;
  behavior?: string;
  detachment_id?: string | null;
  faction_id?: string | null;
  unit_ids?: string[];
  effect: Effect;
  scope?: { range: string; duration: string; range_inches?: number };
}

// ─── Effect translator ───────────────────────────────────────────────
//
// Condition humanization lives in ../translate/condition.ts (shared with the
// scoring-card translator and pinned by the conformance corpus).

function translateEffect(e: Effect, depth: number = 0): string {
  const indent = "  ".repeat(depth);
  const arrow = depth > 0 ? "→ " : "";

  switch (e.type) {
    case "conditional":
      return (
        `${indent}If ${describeCondition(e.condition!)}:\n` +
        translateEffect(e.effect!, depth + 1)
      );

    case "sequence":
      return e
        .steps!.map((s) => translateEffect(s, depth))
        .join("\n");

    case "choice":
      return (
        `${indent}${arrow}Choose one${e.choice_label ? ` (${e.choice_label})` : ""}:\n` +
        e
          .options!.map((o, i) => `${indent}  ${i + 1}. ${translateEffectInline(o)}`)
          .join("\n")
      );

    case "dice-gated": {
      const comp = formatComparison(e.comparison ?? "gte", e.threshold!);
      const success = e.on_success
        ? translateEffectInline(e.on_success)
        : "nothing";
      const fail = e.on_fail
        ? `, otherwise ${translateEffectInline(e.on_fail)}`
        : "";
      return `${indent}${arrow}Roll ${e.dice}: on ${comp}, ${success}${fail}`;
    }

    case "dice-pool-allocation": {
      const poolStr = `${e.pool!.count}${e.pool!.die}`;
      const lines = [`${indent}${arrow}Roll ${poolStr} (max ${e.max_activations} activations):`];
      for (const opt of e.options!) {
        const req = opt.requirement!;
        lines.push(
          `${indent}  - ${opt.name}: need ${req.type} of ${req.min_value}+ → ${translateEffectInline(opt.effect!)}`
        );
      }
      return lines.join("\n");
    }

    default:
      return `${indent}${arrow}${translateEffectInline(e)}`;
  }
}

/** Single-line translation for leaf effects. */
function translateEffectInline(e: Effect): string {
  const m = e.modifier ?? {};
  const target = formatTarget(e.target);

  switch (e.type) {
    case "stat-modifier": {
      const op = m.operation === "add" ? "+" : m.operation === "subtract" ? "-" : `${m.operation} `;
      const scope = m.attack_type ? ` (${m.attack_type})` : "";
      return `${op}${m.value} ${m.stat}${scope} for ${target}`;
    }
    case "roll-modifier": {
      const op = m.operation === "add" ? "+" : "-";
      return `${op}${m.value} to ${m.roll} rolls for ${target}`;
    }
    case "re-roll":
      return `re-roll ${m.roll}${m.value ? ` (${m.value}s)` : ""} for ${target}`;
    case "mortal-wounds":
      return `deal ${m.amount ?? m.amount_table ? "variable" : "?"} mortal wounds to ${target}`;
    case "feel-no-pain":
      return `${target} gains Feel No Pain ${m.threshold}+`;
    case "keyword-grant": {
      // Grants come as singular `keyword` or the (dominant) `keywords` array.
      const kw = Array.isArray(m.keywords) ? m.keywords.join(", ") : (m.keyword ?? "keywords");
      return `${target}'s ${m.weapon_type ?? "all"} weapons gain ${kw}`;
    }
    case "ability-grant":
      return `${target} gains ${formatGrantType((m.grant_type ?? m.ability_id) as string | undefined)}`;
    case "movement-modifier":
      return `${target} gains ${m.move_type}${m.value ? ` ${m.value}"` : ""}`;
    case "damage-reduction":
      return `reduce incoming damage to ${target} by ${m.amount}`;
    case "resurrection":
      return `return ${m.count ?? 1} model(s) to ${target} with ${m.wounds_remaining ?? "full"} wounds`;
    case "model-destruction":
      return `destroy ${m.count} non-leader model(s) from ${target}`;
    case "cp-gain":
      return `gain ${m.amount} CP`;
    case "cp-refund":
      return `refund ${m.amount} CP`;
    case "resource-gain":
      return `gain ${m.amount} to ${m.pool_id}`;
    case "resource-spend":
      return `spend ${m.amount} from ${m.pool_id}`;
    case "invulnerable-save":
      return `${target} gains ${m.value}+ invulnerable save`;
    case "leadership-modifier":
      return `force battle-shock test on ${target}`;
    case "fight-on-death":
      return `${target} fights on death`;
    case "shoot-on-death":
      return `${target} shoots on death`;
    case "fight-first":
      return `${target} fights first`;
    case "fight-last":
      return `${target} fights last`;
    case "deep-strike":
      return `${target} can deep strike`;
    case "fallback-and-act":
      return `${target} can fall back and act`;
    case "attack-restriction":
      return `${target}: ${m.restriction_type ?? "restriction"} (max ${m.max_models ?? "?"} models)`;
    case "objective-control-modifier":
      return `modify OC of ${target} by ${m.value}`;

    // Container types — recurse
    case "conditional":
      return `if ${describeCondition(e.condition!)}: ${translateEffectInline(e.effect!)}`;
    case "sequence":
      return e.steps!.map(translateEffectInline).join("; ");
    case "dice-gated": {
      const comp = formatComparison(e.comparison ?? "gte", e.threshold!);
      return `roll ${e.dice} (${comp}): ${e.on_success ? translateEffectInline(e.on_success) : "nothing"}`;
    }

    default:
      return `[${e.type}]`;
  }
}

function formatTarget(t?: string): string {
  if (!t) return "target";
  return t.replace(/-/g, " ");
}

function formatGrantType(g: string | undefined): string {
  // ability-grant carries either `grant_type` or `ability_id`; an unauthored
  // stub may carry neither. Don't crash the whole translation on a missing key.
  return g ? g.replace(/-/g, " ") : "an ability";
}

function formatComparison(comp: string, threshold: number | string): string {
  const thStr = typeof threshold === "string" ? threshold : `${threshold}`;
  switch (comp) {
    case "gte": return `${thStr}+`;
    case "lte": return `${thStr} or less`;
    case "gt": return `greater than ${thStr}`;
    case "lt": return `less than ${thStr}`;
    case "eq": return `exactly ${thStr}`;
    default: return `${thStr}+`;
  }
}

// ─── Scope translator ────────────────────────────────────────────────

function translateScope(s?: { range: string; duration: string; range_inches?: number }): string {
  if (!s) return "";
  const range = s.range.replace(/-/g, " ");
  const duration = s.duration.replace(/-/g, " ");
  return `Scope: ${range}${s.range_inches ? ` (${s.range_inches}")` : ""}. Duration: ${duration}.`;
}

// ─── Main command ────────────────────────────────────────────────────

export async function translateCommand(
  path?: string
): Promise<void> {
  const filePath = resolve(
    process.cwd(),
    path ?? "../data/enrichment/world-eaters/abilities.json"
  );
  const abilities: Ability[] = JSON.parse(readFileSync(filePath, "utf-8"));

  for (const a of abilities) {
    const meta: string[] = [];
    if (a.ability_type) meta.push(a.ability_type);
    if (a.behavior) meta.push(a.behavior);
    if (a.detachment_id) meta.push(`detachment: ${a.detachment_id}`);
    if (a.unit_ids?.length) meta.push(`units: ${a.unit_ids.join(", ")}`);

    console.log(`\n═══ ${a.name} [${a.ability_id}] ═══`);
    if (meta.length) console.log(`    ${meta.join(" | ")}`);
    console.log(translateEffect(a.effect));
    const scope = translateScope(a.scope);
    if (scope) console.log(scope);
  }

  console.log(`\n── ${abilities.length} abilities translated ──`);
}
