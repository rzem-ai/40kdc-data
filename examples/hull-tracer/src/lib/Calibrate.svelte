<script lang="ts">
  import { distance } from "./geometry.js";
  import type { Vec2 } from "./types.js";

  // Calibration *controls*. Establishes pixels-per-inch two ways:
  //  • width — the real-world width the FULL image spans.
  //  • ruler — a two-point span of known length, placed and dragged directly on
  //            the main canvas (this panel only owns the length and the math;
  //            the endpoints `rulerA`/`rulerB` live in the parent and render on
  //            the canvas so they are large, visible, and easy to grab).
  // The single output is `pxPerInch`, bound to the parent.
  let {
    imageWidth,
    imageHeight,
    rulerA,
    rulerB,
    pxPerInch = $bindable(),
    method = $bindable(),
  }: {
    imageWidth: number;
    imageHeight: number;
    rulerA: Vec2;
    rulerB: Vec2;
    pxPerInch: number | null;
    method: "width" | "ruler";
  } = $props();

  let widthIn = $state<number>(3.2);
  let lengthIn = $state<number>(3.2);

  const rulerPx = $derived(distance(rulerA, rulerB));

  // Recompute pxPerInch whenever the active method's inputs change. A
  // non-positive denominator yields null (export stays gated).
  $effect(() => {
    if (method === "width") {
      pxPerInch = widthIn > 0 ? imageWidth / widthIn : null;
    } else {
      pxPerInch = lengthIn > 0 && rulerPx > 0 ? rulerPx / lengthIn : null;
    }
  });
</script>

<div class="cal">
  <div class="seg" role="tablist" aria-label="Calibration method">
    <button
      role="tab"
      aria-selected={method === "width"}
      class:active={method === "width"}
      class="focus-ring"
      onclick={() => (method = "width")}>Image width</button
    >
    <button
      role="tab"
      aria-selected={method === "ruler"}
      class:active={method === "ruler"}
      class="focus-ring"
      onclick={() => (method = "ruler")}>Two-point ruler</button
    >
  </div>

  {#if method === "width"}
    <label class="field">
      <span>Real width of the full image (inches)</span>
      <input type="number" min="0.1" step="0.1" bind:value={widthIn} class="focus-ring" />
    </label>
    <p class="note">
      Use this when the photo is cropped so its full width equals a known span (e.g. a 3″ ruler laid
      edge to edge).
    </p>
  {:else}
    <label class="field">
      <span>Length of the ruler span (inches)</span>
      <input type="number" min="0.1" step="0.1" bind:value={lengthIn} class="focus-ring" />
    </label>
    <p class="note">
      Drag the <strong>A</strong> and <strong>B</strong> endpoints on the canvas across a feature of
      known length (or drag the line to reposition both).
    </p>
  {/if}

  <div class="readout" aria-live="polite">
    {#if pxPerInch}
      <strong>{pxPerInch.toFixed(1)}</strong> px / inch · image ≈ {(imageWidth / pxPerInch).toFixed(
        2,
      )}″ × {(imageHeight / pxPerInch).toFixed(2)}″
    {:else}
      Enter a positive measurement to set the scale.
    {/if}
  </div>
</div>

<style>
  .cal {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .seg {
    display: flex;
    gap: 4px;
  }
  .seg button {
    flex: 1;
    padding: 6px 8px;
    background: var(--color-panel-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    color: var(--color-text-muted);
    font-family: var(--font-heading);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: var(--tracking-wide);
  }
  .seg button.active {
    background: var(--color-accent-dim);
    border-color: var(--color-accent);
    color: var(--color-text);
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
    color: var(--color-text-muted);
  }
  .field input {
    padding: 6px 8px;
    background: var(--color-panel);
    border: 1px solid var(--color-border-strong);
    border-radius: var(--radius-sm);
    color: var(--color-text);
    font-family: var(--font-mono);
  }
  .note {
    margin: 0;
    font-size: 11px;
    color: var(--color-text-dim);
    line-height: 1.4;
  }
  .note strong {
    color: var(--color-warning);
  }
  .readout {
    font-size: 12px;
    color: var(--color-text-muted);
    font-family: var(--font-mono);
  }
  .readout strong {
    color: var(--color-accent);
  }
</style>
