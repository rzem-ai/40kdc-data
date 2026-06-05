<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Dataset } from "@alpaca-software/40kdc-data";
  import {
    DISPOSITIONS,
    DISPOSITION_ABBR,
    DISPOSITION_LABELS,
    matrixCells,
    pairKey,
    type MatrixCell,
  } from "./matchup-grid.js";

  /**
   * The 5×5 force-disposition matchup matrix: rows are your disposition,
   * columns the opponent's. Every cell is a button resolving to the unordered
   * pairing — the upper and lower triangle mirror each other, so tapping
   * either (a,b) or (b,a) lands on the same matchup. Cell content comes from
   * the host's `cell` snippet (thumbnail, coverage dots, mission name…);
   * without one, cells show the variant-coverage dots.
   *
   * Full disposition names head the grid on wide screens, the community
   * abbreviations below 640px (full names stay in the accessible labels).
   * Styling is self-contained (shadowboxing fallbacks).
   */
  let {
    ds,
    onpick,
    selectedKey = null,
    cell,
  }: {
    ds: Dataset;
    onpick: (cell: MatrixCell) => void;
    /** pairKey of the active pairing, highlighted in both triangles. */
    selectedKey?: string | null;
    cell?: Snippet<[MatrixCell]>;
  } = $props();

  const cells = $derived(matrixCells(ds));
  const byKey = $derived(new Map(cells.map((c) => [c.key, c])));

  function cellFor(row: string, col: string): MatrixCell | undefined {
    return byKey.get(pairKey(row, col));
  }
</script>

<div class="matrix" role="grid" aria-label="Force Disposition matchup matrix">
  <div class="corner" role="presentation">
    <span>You ▼</span>
    <span class="opp">Opp ▶</span>
  </div>
  {#each DISPOSITIONS as col (col)}
    <div class="head col" role="columnheader" title={DISPOSITION_LABELS[col]}>
      <span class="full">{DISPOSITION_LABELS[col]}</span>
      <span class="abbr" aria-hidden="true">{DISPOSITION_ABBR[col]}</span>
      <span class="sr-only">{DISPOSITION_LABELS[col]}</span>
    </div>
  {/each}
  {#each DISPOSITIONS as row (row)}
    <div class="head row" role="rowheader" title={DISPOSITION_LABELS[row]}>
      <span class="full">{DISPOSITION_LABELS[row]}</span>
      <span class="abbr" aria-hidden="true">{DISPOSITION_ABBR[row]}</span>
      <span class="sr-only">{DISPOSITION_LABELS[row]}</span>
    </div>
    {#each DISPOSITIONS as col (col)}
      {@const c = cellFor(row, col)}
      {#if c}
        <button
          type="button"
          class="cell"
          class:selected={selectedKey === c.key}
          class:empty={c.layouts.length === 0}
          aria-label="{DISPOSITION_LABELS[row]} vs {DISPOSITION_LABELS[col]}: {c.layouts
            .length} of 3 layouts"
          onclick={() => onpick(c)}
        >
          {#if cell}
            {@render cell(c)}
          {:else}
            <span class="dots" role="img" aria-hidden="true">
              {#each [1, 2, 3] as v (v)}
                <span class="dot" class:on={v <= c.layouts.length}></span>
              {/each}
            </span>
          {/if}
        </button>
      {/if}
    {/each}
  {/each}
</div>

<style>
  .matrix {
    display: grid;
    grid-template-columns: minmax(48px, 0.7fr) repeat(5, minmax(0, 1fr));
    gap: var(--space-1, 4px);
  }
  .corner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: var(--space-1, 4px);
    font-family: var(--font-heading, "Barlow Condensed", system-ui, sans-serif);
    font-size: var(--text-2xs, 11px);
    text-transform: uppercase;
    letter-spacing: var(--tracking-wide, 0.05em);
    color: var(--dim, oklch(0.637 0.015 286));
  }
  .corner .opp {
    align-self: flex-end;
  }
  .head {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    text-align: center;
    padding: var(--space-1, 4px);
    font-family: var(--font-heading, "Barlow Condensed", system-ui, sans-serif);
    font-size: var(--text-2xs, 11px);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: var(--tracking-wide, 0.05em);
    color: var(--muted, oklch(0.735 0.014 286));
  }
  .head.row {
    align-items: center;
    justify-content: flex-start;
    text-align: left;
  }
  .abbr {
    display: none;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  @media (max-width: 640px) {
    .matrix {
      grid-template-columns: auto repeat(5, minmax(0, 1fr));
    }
    .full {
      display: none;
    }
    .abbr {
      display: inline;
    }
  }
  .cell {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    min-height: 44px;
    padding: var(--space-1, 4px);
    font: inherit;
    background: var(--panel-2, oklch(0.155 0.004 286));
    color: inherit;
    border: 1px solid var(--border, oklch(0.304 0.011 286));
    border-radius: var(--radius-md, 4px);
    cursor: pointer;
    transition:
      border-color 120ms ease-out,
      background 120ms ease-out;
  }
  .cell:hover {
    border-color: var(--accent, oklch(0.704 0.123 183));
  }
  .cell:focus-visible {
    outline: none;
    box-shadow: var(--shadow-focus, 0 0 0 2px oklch(0.704 0.123 183));
  }
  .cell:active {
    background: var(--panel-hover, oklch(0.237 0.008 286));
  }
  .cell.selected {
    border-color: var(--accent, oklch(0.704 0.123 183));
    background: var(--accent-fill, oklch(0.704 0.123 183 / 0.16));
  }
  .cell.empty {
    border-style: dashed;
  }
  .dots {
    display: flex;
    gap: 3px;
    justify-content: center;
  }
  .dot {
    width: 4px;
    height: 4px;
    border-radius: 999px;
    background: var(--border-strong, oklch(0.513 0.014 286));
  }
  .dot.on {
    background: var(--accent, oklch(0.704 0.123 183));
  }
</style>
