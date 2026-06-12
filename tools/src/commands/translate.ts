/**
 * Translates ability DSL entries into plain English descriptions.
 *
 * Thin CLI shell over the shared `translate/effect.ts` describer (the
 * conformance-pinned `ability.print()`); this file only handles file loading
 * and per-ability presentation.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describeAbility, type Effect, type AbilityScope } from "../translate/effect.js";

interface Ability {
  ability_id: string;
  name: string;
  ability_type?: string;
  behavior?: string;
  detachment_id?: string | null;
  faction_id?: string | null;
  unit_ids?: string[];
  effect: Effect;
  scope?: AbilityScope;
}

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
    console.log(describeAbility({ effect: a.effect, scope: a.scope }));
  }

  console.log(`\n── ${abilities.length} abilities translated ──`);
}
