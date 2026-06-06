<script lang="ts">
  import type { ScoringAward, AssertedAward } from "@alpaca-software/40kdc-data";
  import { scoreAward, scoreTurn } from "@alpaca-software/40kdc-data";
  import { groupAwards, triggerContainsRound, type PrimaryTicks } from "./data.js";

  // A generic award-ticking scorer shared by the primary and secondary panels.
  // The caller supplies the awards (already filtered for the active approach),
  // the per-score `cap`, and what scoring means. Two modes:
  //  - uncontrolled (secondary): ticks are panel-local, a commit button calls
  //    `onCommit(asserted)` and resets them — score once, discard the card.
  //  - controlled (primary): the caller owns the ticks via `ticks` +
  //    `onTicksChange`; there is no commit — every change re-banks the round
  //    live, and `banked` echoes the engine's cap-clamped stored value.
  // Preview is the asserted total clamped to `cap`, which is
  // `scoreSecondaryEvent` / `scorePrimaryEvent` made generic.
  let {
    title,
    text = undefined,
    awards,
    round,
    cap,
    capLabel,
    commitLabel = undefined,
    emptyHint,
    onCommit = undefined,
    extraAction = undefined,
    ticks = undefined,
    onTicksChange = undefined,
    banked = undefined,
  }: {
    title: string;
    text?: string;
    awards: ScoringAward[];
    /** Current battle round — out-of-window timing groups render dimmed. */
    round: number;
    cap: number;
    capLabel: string;
    /** Commit-button label (uncontrolled mode only). */
    commitLabel?: (vp: number) => string;
    emptyHint: string;
    onCommit?: (asserted: AssertedAward[]) => void;
    extraAction?: { label: string; disabled?: boolean; onClick: () => void };
    /** Caller-owned tick state — supplying it switches to controlled mode. */
    ticks?: PrimaryTicks;
    onTicksChange?: (next: PrimaryTicks) => void;
    /** The stored, cap-clamped VP the current ticks bank (controlled mode). */
    banked?: number;
  } = $props();

  // Awards sectioned by timing: consecutive same-trigger awards share a
  // header, and a group outside its battle-round window dims (advisory only —
  // rows stay tickable, since late scoring is legitimate).
  const groups = $derived(groupAwards(awards));

  // Per-award selection: whether it's ticked, and (for vp_per) how many
  // instances. The local pair backs uncontrolled mode; when `ticks` is
  // supplied, reads come from it and writes go through `onTicksChange`.
  let localOn = $state<Record<number, boolean>>({});
  let localCounts = $state<Record<number, number>>({});
  const controlled = $derived(ticks !== undefined);
  const on = $derived(ticks?.on ?? localOn);
  const counts = $derived(ticks?.counts ?? localCounts);
  function countFor(i: number, a: ScoringAward): number {
    return counts[i] ?? a.per_max ?? 1;
  }
  function setCount(i: number, a: ScoringAward, v: number): void {
    const next = { ...counts, [i]: Math.max(1, Math.min(a.per_max ?? 99, v)) };
    if (controlled) onTicksChange?.({ on, counts: next });
    else localCounts = next;
  }
  function toggle(i: number): void {
    const next = { ...on, [i]: !on[i] };
    if (controlled) onTicksChange?.({ on: next, counts });
    else localOn = next;
  }

  const asserted = $derived<AssertedAward[]>(
    awards.flatMap((award, i) => (on[i] ? [{ award, count: countFor(i, award) }] : [])),
  );
  const rawTotal = $derived(scoreTurn(asserted));
  const preview = $derived(Math.min(rawTotal, cap));

  function commit(): void {
    if (asserted.length === 0) return;
    onCommit?.(asserted);
    localOn = {};
    localCounts = {};
  }
</script>

{#if awards.length > 0}
  <div class="flex flex-col gap-3">
    <div class="flex items-baseline justify-between gap-2">
      <h3 class="font-heading text-base font-bold uppercase tracking-wide text-accent m-0">
        {title}
      </h3>
      <span class="font-mono text-[11px] text-text-dim whitespace-nowrap" title="Per-score cap">
        max {capLabel} VP
      </span>
    </div>

    {#if text}
      <p class="m-0 text-xs leading-snug text-text-muted">{text}</p>
    {/if}

    <div class="flex flex-col gap-2.5">
      {#each groups as g (g.rows[0]!.index)}
        {@const live = triggerContainsRound(g.trigger, round)}
        <section class="flex flex-col gap-1" class:opacity-50={!live}>
          <!-- Timing header for the run of awards below it. The chip flags the
               window state for the *current* round; dimming is advisory only. -->
          <div class="flex items-baseline gap-2">
            <span
              class="font-heading text-[10px] font-bold uppercase tracking-wider {live
                ? 'text-accent'
                : 'text-text-dim'}">{g.header}</span
            >
            {#if !live}
              <span class="font-heading text-[9px] uppercase tracking-wide text-text-dim border border-border rounded px-1"
                >not round {round}</span
              >
            {/if}
          </div>
          <ul class="flex flex-col gap-1.5 m-0 p-0 list-none">
            {#each g.rows as { award: a, index: i, label } (i)}
              {@const ticked = !!on[i]}
              <!-- The row-filling button is the checkbox; the count steppers are
                   separate sibling controls so adjusting a count never toggles it. -->
              <li
                class="flex items-center gap-2 rounded border px-2 py-1.5 transition-colors {ticked
                  ? 'bg-accent-dim border-accent'
                  : 'bg-panel-surface border-panel-border'}"
              >
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={ticked}
                  class="focus-ring flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer"
                  onclick={() => toggle(i)}
                >
                  <span
                    aria-hidden="true"
                    class="shrink-0 w-5 h-5 rounded-sm border flex items-center justify-center text-[11px] {ticked
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'border-border-strong text-transparent'}">✓</span
                  >
                  <span class="min-w-0 flex-1">
                    <span class="block text-xs leading-snug text-text">{label}</span>
                    {#if a.exclusive_group}
                      <span class="block font-heading text-[10px] uppercase tracking-wide text-text-dim">tier — score one</span>
                    {/if}
                  </span>
                </button>

                {#if a.vp_per != null}
                  <div class="flex items-center gap-1" class:opacity-40={!ticked}>
                    <button
                      type="button"
                      class="focus-ring w-11 h-11 lg:w-6 lg:h-6 rounded bg-panel border border-border-strong text-text-muted hover:border-accent hover:text-accent"
                      disabled={!ticked}
                      aria-label="decrease count"
                      onclick={() => setCount(i, a, countFor(i, a) - 1)}>−</button
                    >
                    <span class="font-mono tabular-nums text-sm w-5 text-center">{countFor(i, a)}</span>
                    <button
                      type="button"
                      class="focus-ring w-11 h-11 lg:w-6 lg:h-6 rounded bg-panel border border-border-strong text-text-muted hover:border-accent hover:text-accent"
                      disabled={!ticked}
                      aria-label="increase count"
                      onclick={() => setCount(i, a, countFor(i, a) + 1)}>+</button
                    >
                  </div>
                {/if}

                <span class="font-mono tabular-nums text-sm w-8 text-right text-text-muted shrink-0"
                  >{scoreAward(a, countFor(i, a))}</span
                >
              </li>
            {/each}
          </ul>
        </section>
      {/each}
    </div>

    <div class="flex items-center gap-2">
      {#if extraAction}
        <button
          type="button"
          class="focus-ring shrink-0 font-heading text-xs font-bold uppercase tracking-wide rounded border px-3 py-2.5 bg-panel text-text-muted border-border-strong hover:border-danger hover:text-danger disabled:opacity-40 disabled:hover:border-border-strong disabled:hover:text-text-muted"
          disabled={extraAction.disabled}
          onclick={extraAction.onClick}
        >
          {extraAction.label}
        </button>
      {/if}
      {#if controlled}
        <!-- Live total: the engine's stored round value, so the player sees the
             cap-clamped number actually banked rather than the raw tick sum. -->
        <div
          class="flex-1 flex items-baseline justify-between gap-2 rounded border border-panel-border bg-panel px-3 py-2.5"
        >
          <span class="font-heading text-xs font-bold uppercase tracking-wide text-text-muted"
            >Round {round} primary</span
          >
          <span class="font-mono tabular-nums text-sm text-text">
            {banked ?? preview} VP{#if banked != null && rawTotal > banked}<span
              class="text-text-dim"
            >
              (capped)</span
            >{/if}
          </span>
        </div>
      {:else}
        <button
          type="button"
          class="focus-ring flex-1 font-heading text-sm font-bold uppercase tracking-wide rounded px-3 py-2.5 shadow-md bg-accent text-accent-foreground hover:bg-accent-hover disabled:bg-panel disabled:text-text-muted disabled:border disabled:border-border disabled:shadow-none"
          disabled={asserted.length === 0}
          onclick={commit}
        >
          {commitLabel?.(preview) ?? `Score ${preview} VP`}
        </button>
      {/if}
    </div>
  </div>
{:else}
  <div class="text-text-muted text-sm">{emptyHint}</div>
{/if}
