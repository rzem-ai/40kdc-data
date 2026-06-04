<script lang="ts">
  import Thumbnail from "./Thumbnail.svelte";
  import type { TerrainTemplate } from "@alpaca-software/40kdc-data";

  interface Props {
    areas: TerrainTemplate[];
    features: TerrainTemplate[];
    onadd: (t: TerrainTemplate) => void;
    /** Fired once when a press travels past the drag threshold; the host owns the drag from there. */
    ondragstart?: (t: TerrainTemplate, e: PointerEvent) => void;
  }
  let { areas, features, onadd, ondragstart }: Props = $props();

  // A press is "armed" until it either travels past the threshold (drag — the
  // host takes over via window listeners) or releases in place (click-to-add,
  // unchanged behavior). Pointer capture keeps move/up coming to the card even
  // after the cursor leaves it; captured events still bubble to window.
  const DRAG_THRESHOLD_PX = 4;
  let armed: { t: TerrainTemplate; x: number; y: number; dragging: boolean } | null = null;

  function down(e: PointerEvent, t: TerrainTemplate): void {
    if (e.button !== 0) return;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    armed = { t, x: e.clientX, y: e.clientY, dragging: false };
  }
  function move(e: PointerEvent): void {
    if (!armed || armed.dragging) return;
    if (Math.hypot(e.clientX - armed.x, e.clientY - armed.y) > DRAG_THRESHOLD_PX) {
      armed.dragging = true;
      ondragstart?.(armed.t, e);
    }
  }
  function up(): void {
    if (armed && !armed.dragging) onadd(armed.t);
    armed = null;
  }
  function cancel(): void {
    armed = null;
  }
</script>

<div class="palette">
  <h2>Templates</h2>

  <h4>Areas</h4>
  <div class="grid">
    {#each areas as t (t.id)}
      <button
        class="card area"
        title={t.name}
        onpointerdown={(e) => down(e, t)}
        onpointermove={move}
        onpointerup={up}
        onpointercancel={cancel}
      >
        <Thumbnail template={t} />
        <span class="name">{t.name}</span>
      </button>
    {/each}
  </div>

  <h4>Features</h4>
  <div class="grid">
    {#each features as t (t.id)}
      <button
        class="card feature"
        title={t.name}
        onpointerdown={(e) => down(e, t)}
        onpointermove={move}
        onpointerup={up}
        onpointercancel={cancel}
      >
        <Thumbnail template={t} />
        <span class="name">{t.name}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .palette {
    display: flex;
    flex-direction: column;
  }
  h2 {
    font-family: "Barlow Condensed", sans-serif;
    font-size: 1.1rem;
    margin: 0 0 0.5rem;
  }
  h4 {
    margin: 0.8rem 0 0.4rem;
    color: var(--text-dim);
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    padding: 0.5rem 0.35rem 0.4rem;
    background: var(--surface-2);
    border: 1px solid var(--rim);
    border-radius: 6px;
    cursor: pointer;
    color: var(--text-dim);
    font: inherit;
    /* Vertical swipes still scroll the rail; horizontal presses become drags. */
    touch-action: pan-y;
    transition: border-color 120ms ease-out, background 120ms ease-out;
  }
  .card:hover {
    border-color: var(--accent);
    background: var(--accent-fill);
  }
  .card .name {
    font-size: 0.72rem;
    line-height: 1.1;
    text-align: center;
  }
  .card.feature .name {
    color: var(--piece-feature-stroke);
  }
  .card.area .name {
    color: var(--piece-area-stroke);
  }
</style>
