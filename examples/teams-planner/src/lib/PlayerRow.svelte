<script lang="ts">
  import type { ForceDispositionId } from "@alpaca-software/40kdc-data";
  import {
    candidateDetachments,
    detachmentsByFaction,
    detachmentsForFactions,
    factionOptions,
    playerCoverage,
    reorderDetachmentIds,
    type IntentTier,
    type Player,
  } from "./coverage";
  import { DISPOSITIONS } from "../../../_shared/matchup-grid.js";
  import DispoPill from "./DispoPill.svelte";

  let {
    player,
    coverage,
    onchange,
    onremove,
  }: {
    player: Player;
    /** This player's covered dispositions, computed by the parent. */
    coverage: Set<ForceDispositionId>;
    onchange: (next: Player) => void;
    onremove: () => void;
  } = $props();

  const allFactions = factionOptions();

  // Factions still available to add (not already on this player).
  const addable = $derived(allFactions.filter((f) => !player.factionIds.includes(f.id)));
  const factionName = (id: string) => allFactions.find((f) => f.id === id)?.name ?? id;

  // Full deduped pool (toggle math); grouped view (render); ranked checked set.
  const detachments = $derived(detachmentsForFactions(player.factionIds));
  const groups = $derived(detachmentsByFaction(player.factionIds));
  const narrowing = $derived(player.detachmentIds != null);
  // Checked detachments, in the player's preference order (index 0 = top pick).
  const ranked = $derived(narrowing ? candidateDetachments(player) : []);

  /**
   * Merge a change and re-prune intent: an `intent` entry only survives if the
   * (post-change) player can still field that disposition, so narrowing away the
   * ability silently clears the stated intent. Centralized here so every
   * faction/detachment edit gets the cleanup for free.
   */
  function patch(next: Partial<Player>) {
    const merged: Player = { ...player, ...next };
    const cov = playerCoverage(merged);
    const intent: Partial<Record<ForceDispositionId, IntentTier>> = {};
    for (const d of DISPOSITIONS) {
      const tier = merged.intent?.[d];
      if (tier && cov.has(d)) intent[d] = tier;
    }
    merged.intent = intent;
    onchange(merged);
  }

  function addFaction(e: Event) {
    const sel = e.currentTarget as HTMLSelectElement;
    const id = sel.value;
    if (!id) return;
    sel.value = "";
    // Adding a faction widens the detachment pool; when narrowing is on, keep
    // the existing rank and append the new faction's detachments at the end so
    // coverage doesn't silently shrink and the established order is preserved.
    const next: Partial<Player> = { factionIds: [...player.factionIds, id] };
    if (player.detachmentIds != null) {
      const existing = player.detachmentIds;
      const added = detachmentsForFactions([id])
        .map((d) => d.id)
        .filter((d) => !existing.includes(d));
      next.detachmentIds = [...existing, ...added];
    }
    patch(next);
  }

  function removeFaction(id: string) {
    const factionIds = player.factionIds.filter((f) => f !== id);
    const next: Partial<Player> = { factionIds };
    // Drop any narrowed/ranked detachments that no longer resolve (order kept).
    if (player.detachmentIds != null) {
      const valid = new Set(detachmentsForFactions(factionIds).map((d) => d.id));
      next.detachmentIds = player.detachmentIds.filter((d) => valid.has(d));
    }
    patch(next);
  }

  // Remembers the selection while the limit is off so toggling it back on
  // restores the prior checkboxes/order rather than resetting to "all". View-only
  // (the persisted/shared model still uses `null` for "not narrowed").
  let stashedIds = $state<string[] | null>(null);

  function toggleNarrowing(on: boolean) {
    if (!on) {
      // Off → remember the current selection, then null = every detachment, unranked.
      stashedIds = player.detachmentIds;
      patch({ detachmentIds: null });
      return;
    }
    // On → restore the stashed selection, dropping ids whose faction was removed
    // while off; fall back to "all detachments" only when nothing survives.
    const valid = new Set(detachments.map((d) => d.id));
    const restored = stashedIds?.filter((id) => valid.has(id)) ?? [];
    patch({ detachmentIds: restored.length > 0 ? restored : detachments.map((d) => d.id) });
  }

  function toggleDetachment(id: string, on: boolean) {
    const cur = player.detachmentIds ?? [];
    // Check → append (least preferred); uncheck → remove, preserving rank order.
    const detachmentIds = on
      ? cur.includes(id)
        ? cur
        : [...cur, id]
      : cur.filter((d) => d !== id);
    patch({ detachmentIds });
  }

  /** Move a ranked detachment up (-1) or down (+1) in the preference order. */
  function moveDetachment(id: string, dir: -1 | 1) {
    const cur = player.detachmentIds;
    if (cur == null) return;
    const i = cur.indexOf(id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= cur.length) return;
    patch({ detachmentIds: reorderDetachmentIds(cur, id, cur[j]) });
  }

  // Drag-to-rank: the row under the pointer reorders live as the dragged row
  // crosses it. `dragId` is the id being dragged (null when idle), used both to
  // drive the reorder and to dim the lifted row.
  let dragId = $state<string | null>(null);

  function onDragEnter(overId: string) {
    const cur = player.detachmentIds;
    if (dragId == null || dragId === overId || cur == null) return;
    patch({ detachmentIds: reorderDetachmentIds(cur, dragId, overId) });
  }

  /** Cycle a fieldable disposition's intent: can → leaning → prefer → can. */
  function cycleIntent(d: ForceDispositionId) {
    const cur = player.intent?.[d];
    const next: IntentTier | undefined =
      cur === undefined ? "leaning" : cur === "leaning" ? "prefer" : undefined;
    const intent = { ...player.intent };
    if (next === undefined) delete intent[d];
    else intent[d] = next;
    patch({ intent });
  }

  const tierOf = (d: ForceDispositionId): IntentTier | "can" => player.intent?.[d] ?? "can";

  // Whole-row collapse — view-only, ephemeral per panel. A roster of 8 players
  // each with factions, intent, and two dropdowns overflows the viewport fast;
  // collapsing leaves just the name + an at-a-glance coverage readout.
  let collapsed = $state(false);
  const coveredCount = $derived(coverage.size);
</script>

<div class="rounded-md border border-panel-border bg-panel-surface p-3 shadow-sm">
  <div class="flex items-start gap-2">
    <button
      type="button"
      class="focus-ring rounded border border-border-strong px-2 py-1.5 leading-none text-text-muted hover:border-accent hover:text-accent"
      aria-expanded={!collapsed}
      aria-label={collapsed ? `Expand ${player.name || "player"}` : `Collapse ${player.name || "player"}`}
      onclick={() => (collapsed = !collapsed)}
    >
      <span class="inline-block transition-transform {collapsed ? '' : 'rotate-90'}">▶</span>
    </button>
    <input
      class="focus-ring min-w-0 flex-1 rounded border border-border-strong bg-panel px-2 py-1.5 text-sm text-text placeholder:text-text-dim"
      placeholder="Player name"
      value={player.name}
      oninput={(e) => patch({ name: (e.currentTarget as HTMLInputElement).value })}
    />
    <button
      type="button"
      class="focus-ring rounded border border-border-strong px-2 py-1.5 text-xs uppercase tracking-wide text-text-muted hover:border-danger hover:text-danger"
      onclick={onremove}
      aria-label="Remove player"
    >
      Remove
    </button>
  </div>

  {#if collapsed}
    <!-- Collapsed: at-a-glance coverage so the row stays scannable in a long roster. -->
    <div class="mt-2 flex flex-wrap items-center gap-1.5">
      {#each DISPOSITIONS as d (d)}
        <DispoPill disposition={d} tier={coverage.has(d) ? tierOf(d) : "uncovered"} />
      {/each}
      <span class="ml-1 text-xs text-text-dim">{coveredCount}/{DISPOSITIONS.length} covered</span>
    </div>
  {:else}
  <!-- Factions -->
  <div class="mt-2 flex flex-wrap items-center gap-1.5">
    {#each player.factionIds as id (id)}
      <span class="inline-flex items-center gap-1 rounded bg-accent-dim px-2 py-0.5 text-xs text-text">
        {factionName(id)}
        <button
          type="button"
          class="focus-ring text-text-muted hover:text-danger"
          onclick={() => removeFaction(id)}
          aria-label={`Remove ${factionName(id)}`}>×</button
        >
      </span>
    {/each}
    {#if addable.length > 0}
      <select
        class="focus-ring rounded border border-border-strong bg-panel px-2 py-0.5 text-xs text-text-muted"
        onchange={addFaction}
      >
        <option value="">+ Add faction…</option>
        {#each addable as f (f.id)}
          <option value={f.id}>{f.name}</option>
        {/each}
      </select>
    {/if}
  </div>

  <!-- Disposition intent (click a covered pill to cycle can → leaning → prefer) -->
  <div class="mt-2 flex flex-wrap items-center gap-1.5">
    {#each DISPOSITIONS as d (d)}
      {#if coverage.has(d)}
        <DispoPill
          disposition={d}
          tier={tierOf(d)}
          size="md"
          interactive
          onclick={() => cycleIntent(d)}
        />
      {:else}
        <DispoPill disposition={d} tier="uncovered" size="md" />
      {/if}
    {/each}
    {#if coverage.size > 0}
      <span class="ml-1 text-xs text-text-dim">tap: can → leaning → prefer</span>
    {/if}
  </div>

  <!-- Detachments: the limit checklist, collapsible. -->
  {#if detachments.length > 0}
    <details class="group mt-2" open>
      <summary
        class="focus-ring flex cursor-pointer list-none items-center gap-1 font-heading text-xs font-bold uppercase tracking-wider text-text-muted hover:text-accent"
      >
        <span class="inline-block transition-transform group-open:rotate-90">▶</span>
        Detachments
      </summary>
      <div class="mt-1.5 text-sm">
        <label class="flex cursor-pointer items-center gap-1.5 text-text-muted">
          <input
            type="checkbox"
            checked={narrowing}
            onchange={(e) => toggleNarrowing((e.currentTarget as HTMLInputElement).checked)}
          />
          Limit to specific detachments
        </label>
        {#if narrowing}
          <!-- Grouped by faction; heading shown only when more than one faction. -->
          <div class="mt-1.5 flex flex-col gap-2">
            {#each groups as g (g.faction.id)}
              <div>
                {#if groups.length > 1}
                  <div class="mb-1 font-heading text-xs font-bold uppercase tracking-wider text-text-dim">
                    {g.faction.name}
                  </div>
                {/if}
                <div class="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {#each g.detachments as det (det.id)}
                    <label class="flex cursor-pointer items-center gap-1.5 rounded bg-panel px-2 py-1 text-text">
                      <input
                        type="checkbox"
                        checked={player.detachmentIds?.includes(det.id) ?? false}
                        onchange={(e) => toggleDetachment(det.id, (e.currentTarget as HTMLInputElement).checked)}
                      />
                      <span class="min-w-0 flex-1 truncate">{det.name}</span>
                      {#each det.force_dispositions ?? [] as fd}
                        <DispoPill disposition={fd as ForceDispositionId} tier="tag" />
                      {/each}
                    </label>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </details>
  {/if}

  <!-- Preferences: drag (or ↑/↓) to rank the limited detachments, collapsible. -->
  {#if narrowing && ranked.length >= 2}
    <details class="group mt-2" open>
      <summary
        class="focus-ring flex cursor-pointer list-none items-center gap-1 font-heading text-xs font-bold uppercase tracking-wider text-text-muted hover:text-accent"
      >
        <span class="inline-block transition-transform group-open:rotate-90">▶</span>
        Preferences
        <span class="font-body font-normal normal-case tracking-normal text-text-dim">(drag to rank)</span>
      </summary>
      <ol class="mt-1.5 flex flex-col gap-1 text-sm">
        {#each ranked as det, i (det.id)}
          <li
            draggable="true"
            ondragstart={() => (dragId = det.id)}
            ondragenter={() => onDragEnter(det.id)}
            ondragover={(e) => e.preventDefault()}
            ondragend={() => (dragId = null)}
            class="flex cursor-grab items-center gap-1.5 rounded bg-panel px-2 py-1 text-text active:cursor-grabbing {dragId ===
            det.id
              ? 'opacity-50'
              : ''}"
          >
            <span class="select-none text-text-dim" aria-hidden="true">⠿</span>
            <span class="w-4 text-right font-mono text-xs text-text-dim">{i + 1}.</span>
            <span class="min-w-0 flex-1 truncate">{det.name}</span>
            {#each det.force_dispositions ?? [] as fd}
              <DispoPill disposition={fd as ForceDispositionId} tier="tag" />
            {/each}
            <button
              type="button"
              class="focus-ring rounded border border-border-strong px-1 leading-none text-text-muted hover:border-accent hover:text-accent disabled:opacity-30"
              disabled={i === 0}
              onclick={() => moveDetachment(det.id, -1)}
              aria-label={`Move ${det.name} up`}>↑</button
            >
            <button
              type="button"
              class="focus-ring rounded border border-border-strong px-1 leading-none text-text-muted hover:border-accent hover:text-accent disabled:opacity-30"
              disabled={i === ranked.length - 1}
              onclick={() => moveDetachment(det.id, 1)}
              aria-label={`Move ${det.name} down`}>↓</button
            >
          </li>
        {/each}
      </ol>
    </details>
  {/if}
  {/if}
</div>
