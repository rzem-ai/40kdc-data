<script lang="ts">
  // Author scratch context for handing a trace to an LLM: tag the units that
  // share this hull and jot freeform remarks, then copy a plain-text block.
  // Deliberately OUTSIDE the export — none of this touches the hull-shape JSON
  // (see export.ts / the IP firewall). The unit list comes from the embedded
  // dataset (see dataset.ts).
  import { UNIT_OPTIONS } from "./dataset.js";
  import { buildNotes, type NoteUnit } from "./notes.js";

  let {
    name,
    id,
    bounds,
  }: {
    name: string;
    id: string;
    bounds: { width: number; height: number } | null;
  } = $props();

  const MAX_RESULTS = 60;

  let query = $state("");
  let freeform = $state("");
  let selected = $state<NoteUnit[]>([]);
  let copied = $state(false);

  const selectedIds = $derived(new Set(selected.map((u) => u.id)));

  const matches = $derived.by(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as NoteUnit[];
    return UNIT_OPTIONS.filter(
      (u) => u.name.toLowerCase().includes(q) || u.id.includes(q),
    );
  });
  const shown = $derived(matches.slice(0, MAX_RESULTS));
  const overflow = $derived(Math.max(0, matches.length - MAX_RESULTS));

  // Group the shown matches by faction for a scannable dropdown.
  const groups = $derived.by(() => {
    const byFaction = new Map<string, NoteUnit[]>();
    for (const u of shown) {
      const key = u.faction ?? "Unaligned";
      const bucket = byFaction.get(key);
      if (bucket) bucket.push(u);
      else byFaction.set(key, [u]);
    }
    return [...byFaction.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  });

  function toggle(u: NoteUnit): void {
    if (selectedIds.has(u.id)) {
      selected = selected.filter((s) => s.id !== u.id);
    } else {
      selected = [...selected, u];
    }
  }

  function remove(unitId: string): void {
    selected = selected.filter((s) => s.id !== unitId);
  }

  const notes = $derived(buildNotes({ name, id, bounds, units: selected, freeform }));

  async function copy(): Promise<void> {
    if (!notes) return;
    await navigator.clipboard.writeText(notes);
    copied = true;
    setTimeout(() => (copied = false), 1500);
  }
</script>

<div class="notes">
  <p class="lead">
    Tag the models that share this hull and add remarks — copied as plain text for an LLM. Not part
    of the exported JSON.
  </p>

  {#if selected.length > 0}
    <div class="chips" aria-label="Tagged units">
      {#each selected as u (u.id)}
        <span class="chip">
          {u.name}
          <button class="chip-x focus-ring" aria-label={`Remove ${u.name}`} onclick={() => remove(u.id)}
            >×</button
          >
        </span>
      {/each}
    </div>
  {/if}

  <input
    type="text"
    class="search focus-ring"
    placeholder="Search units to tag…"
    bind:value={query}
  />

  {#if query.trim()}
    <div class="results" role="listbox" aria-label="Unit search results">
      {#if matches.length === 0}
        <p class="empty">No units match “{query.trim()}”.</p>
      {:else}
        {#each groups as [faction, units] (faction)}
          <div class="group-head">{faction}</div>
          {#each units as u (u.id)}
            <button
              class="result focus-ring"
              class:on={selectedIds.has(u.id)}
              role="option"
              aria-selected={selectedIds.has(u.id)}
              onclick={() => toggle(u)}
            >
              <span class="mark">{selectedIds.has(u.id) ? "✓" : "+"}</span>
              <span class="rname">{u.name}</span>
              <span class="rid">{u.id}</span>
            </button>
          {/each}
        {/each}
        {#if overflow > 0}
          <p class="empty">+{overflow} more — refine the search.</p>
        {/if}
      {/if}
    </div>
  {/if}

  <label class="field">
    <span>Notes</span>
    <textarea
      bind:value={freeform}
      rows="3"
      class="focus-ring"
      placeholder="e.g. measured from the hull, not the dozer blade"
    ></textarea>
  </label>

  <button class="copy focus-ring" disabled={!notes} onclick={copy}>
    {copied ? "Copied!" : "Copy notes"}
  </button>
</div>

<style>
  .notes {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .lead {
    margin: 0;
    font-size: 11px;
    color: var(--color-text-dim);
    line-height: 1.4;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 3px 6px 3px 8px;
    background: var(--color-accent-dim);
    border: 1px solid var(--color-accent);
    border-radius: var(--radius-sm);
    color: var(--color-text);
    font-size: 12px;
  }
  .chip-x {
    border: 0;
    background: none;
    color: var(--color-text-muted);
    font-size: 14px;
    line-height: 1;
    padding: 0;
  }
  .chip-x:hover {
    color: var(--color-text);
  }
  .search,
  .field textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 6px 8px;
    background: var(--color-panel);
    border: 1px solid var(--color-border-strong);
    border-radius: var(--radius-sm);
    color: var(--color-text);
    font-family: var(--font-mono);
    font-size: 12px;
  }
  .field textarea {
    resize: vertical;
  }
  .results {
    max-height: 220px;
    overflow-y: auto;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-panel);
  }
  .group-head {
    position: sticky;
    top: 0;
    padding: 4px 8px;
    background: var(--color-panel-surface);
    border-bottom: 1px solid var(--color-border-subtle);
    font-family: var(--font-heading);
    text-transform: uppercase;
    letter-spacing: var(--tracking-wide);
    font-size: 10px;
    color: var(--color-text-dim);
  }
  .result {
    display: flex;
    align-items: baseline;
    gap: 8px;
    width: 100%;
    padding: 5px 8px;
    border: 0;
    background: none;
    text-align: left;
    color: var(--color-text-muted);
    font-size: 12px;
  }
  .result:hover {
    background: var(--color-panel-hover);
    color: var(--color-text);
  }
  .result.on {
    color: var(--color-text);
  }
  .mark {
    flex: 0 0 auto;
    width: 1ch;
    color: var(--color-accent);
    font-family: var(--font-mono);
  }
  .rname {
    flex: 1 1 auto;
  }
  .rid {
    flex: 0 0 auto;
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--color-text-dim);
  }
  .empty {
    margin: 0;
    padding: 8px;
    font-size: 11px;
    color: var(--color-text-dim);
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
    color: var(--color-text-muted);
  }
  .copy {
    padding: 9px 12px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border-strong);
    background: transparent;
    color: var(--color-text-muted);
    font-family: var(--font-heading);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: var(--tracking-wide);
    font-size: 13px;
  }
  .copy:hover:not(:disabled) {
    border-color: var(--color-accent);
    color: var(--color-text);
  }
  .copy:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
</style>
