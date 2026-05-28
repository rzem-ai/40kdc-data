<script lang="ts">
  import {
    salvo,
    ds,
    MANUAL_BUFF_TOGGLES,
    CONTEXT_FLAG_TOGGLES,
  } from "./store.svelte.js";
  import type { EligibleAbility } from "@alpaca-software/40kdc-data";

  const eligible = $derived.by<EligibleAbility[]>(() => {
    if (!salvo.selectedUnitId) return [];
    try {
      return ds.eligibleAbilities(
        {
          unitId: salvo.selectedUnitId,
          factionId: salvo.selectedFactionId ?? undefined,
          detachmentId: salvo.selectedDetachmentId ?? undefined,
          attachedLeaderId: salvo.attachedLeaderId ?? undefined,
        },
        salvo.phase,
      );
    } catch {
      return [];
    }
  });

  const grouped = $derived.by(() => {
    const byKind = new Map<string, EligibleAbility[]>();
    for (const e of eligible) {
      const list = byKind.get(e.source.kind) ?? [];
      list.push(e);
      byKind.set(e.source.kind, list);
    }
    const order = [
      "army",
      "detachment",
      "detachment-stratagem",
      "unit",
      "leader",
      "support",
    ] as const;
    return order
      .map((k) => ({ kind: k, items: byKind.get(k) ?? [] }))
      .filter((g) => g.items.length > 0);
  });

  function abilityKey(e: EligibleAbility): string {
    return `${e.source.kind}:${e.ability.id}`;
  }

  function isActive(e: EligibleAbility): boolean {
    if (e.source.kind === "detachment-stratagem") {
      return salvo.optedInStratagemIds.has(e.ability.id);
    }
    return !salvo.disabledAbilityIds.has(abilityKey(e));
  }

  function toggle(e: EligibleAbility) {
    if (e.source.kind === "detachment-stratagem") {
      const next = new Set(salvo.optedInStratagemIds);
      if (next.has(e.ability.id)) next.delete(e.ability.id);
      else next.add(e.ability.id);
      salvo.optedInStratagemIds = next;
    } else {
      const next = new Set(salvo.disabledAbilityIds);
      const k = abilityKey(e);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      salvo.disabledAbilityIds = next;
    }
  }

  function toggleManual(id: string) {
    const next = new Set(salvo.manualBuffsActive);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    salvo.manualBuffsActive = next;
  }

  function describeSource(kind: EligibleAbility["source"]["kind"]): string {
    switch (kind) {
      case "detachment-stratagem":
        return "Stratagem";
      default:
        return kind;
    }
  }

  function buffDescription(e: EligibleAbility): string {
    try {
      const buffs = e.ability.getBuffs({
        kind: "ability",
        abilityId: e.ability.id,
        abilityKind: e.source.kind,
      });
      if (buffs.length === 0) return "no buff translated";
      return buffs.map((b) => b.contribution.type).join(", ");
    } catch {
      return "—";
    }
  }
</script>

{#if !salvo.selectedUnitId}
  <p class="dim" style="font-size:12px">Pick an attacker unit to see eligible abilities.</p>
{:else if eligible.length === 0}
  <p class="dim" style="font-size:12px">No eligible abilities in the {salvo.phase} phase.</p>
{:else}
  <div class="ability-list">
    {#each grouped as g (g.kind)}
      <div style="margin-top:4px;color:var(--muted);font-size:11px;text-transform:uppercase;letter-spacing:.08em">
        {g.kind}
      </div>
      {#each g.items as e (g.kind + ":" + e.ability.id)}
        <label class="ability-row" class:active={isActive(e)}>
          <input
            type="checkbox"
            checked={isActive(e)}
            onchange={() => toggle(e)}
          />
          <span class="name">
            {e.ability.name}
            <small>· {buffDescription(e)}</small>
          </span>
          <span class="chip {g.kind}">{describeSource(g.kind)}</span>
        </label>
      {/each}
    {/each}
  </div>
{/if}

<hr style="border:0;border-top:1px solid var(--border);margin:14px 0" />

<div style="color:var(--muted);font-size:11px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">
  Manual toggles
</div>
<div class="ability-list">
  {#each MANUAL_BUFF_TOGGLES as t (t.id)}
    <label class="ability-row" class:active={salvo.manualBuffsActive.has(t.id)}>
      <input
        type="checkbox"
        checked={salvo.manualBuffsActive.has(t.id)}
        onchange={() => toggleManual(t.id)}
      />
      <span class="name">{t.label}</span>
      <span class="chip manual">manual</span>
    </label>
  {/each}
  {#each CONTEXT_FLAG_TOGGLES as t (t.id)}
    <label class="ability-row" class:active={salvo.contextFlags[t.id]}>
      <input
        type="checkbox"
        checked={salvo.contextFlags[t.id]}
        onchange={(e) =>
          (salvo.contextFlags = {
            ...salvo.contextFlags,
            [t.id]: (e.currentTarget as HTMLInputElement).checked,
          })}
      />
      <span class="name">{t.label}</span>
      <span class="chip manual">context</span>
    </label>
  {/each}
</div>
