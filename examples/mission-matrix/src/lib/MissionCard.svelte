<script lang="ts">
  import type { Mission, SecondaryCard } from "@alpaca-software/40kdc-data";
  import { describeScoringCard } from "@alpaca-software/40kdc-data";

  let { mission, card }: { mission: Mission | undefined; card: SecondaryCard | undefined } =
    $props();

  // The award lines come from the package's cross-impl translator — the same
  // strings the Rust crate produces and the conformance corpus pins.
  const awards = $derived(card ? describeScoringCard(card) : []);
  const actionCount = $derived(card?.actions?.length ?? 0);
</script>

{#if mission}
  <div class="mission-card">
    <h3>{mission.name}</h3>
    <div class="vp">
      <span class="vp-stat">
        <span class="vp-num">{mission.vp_per_game_cap}</span>
        <span class="vp-label">VP / game</span>
      </span>
      <span class="vp-stat">
        <span class="vp-num">{mission.vp_per_round_cap}</span>
        <span class="vp-label">VP / round</span>
      </span>
    </div>

    {#if card?.text}
      <p class="summary">{card.text}</p>
    {/if}

    {#if awards.length > 0}
      <div class="section-label">Scoring</div>
      <ul class="awards">
        {#each awards as line}
          <li>{line}</li>
        {/each}
      </ul>
    {/if}

    {#if actionCount > 0}
      <span class="chip">Player action{actionCount > 1 ? ` ×${actionCount}` : ""}</span>
    {/if}
  </div>
{:else}
  <div class="dim">No mission found for this pairing.</div>
{/if}
