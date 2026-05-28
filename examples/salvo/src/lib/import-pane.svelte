<script lang="ts">
  import { salvo, importRosterText } from "./store.svelte.js";

  let attackerText = $state("");
  let attackerError = $state<string | null>(null);
  let targetText = $state("");
  let targetError = $state<string | null>(null);

  function importAttacker() {
    const { roster, error } = importRosterText(attackerText);
    salvo.attackerRoster = roster;
    attackerError = error;
    if (roster && roster.units.length > 0) {
      // Auto-pick the first resolved unit if nothing's selected yet.
      const firstResolved = roster.units.find((u) => u.ref.resolved && u.ref.id);
      if (firstResolved) {
        salvo.selectedUnitId = firstResolved.ref.id;
        salvo.selectedFactionId = roster.faction_id;
        salvo.selectedDetachmentId = roster.detachment_id;
      }
    }
  }

  function importTarget() {
    const { roster, error } = importRosterText(targetText);
    salvo.targetRoster = roster;
    targetError = error;
    if (roster && salvo.targetMode !== "roster") salvo.targetMode = "roster";
  }
</script>

<div class="row">
  <label for="attacker-paste">Attacker</label>
  <span class="dim grow">ListForge URL or NewRecruit JSON</span>
</div>
<textarea id="attacker-paste" bind:value={attackerText} placeholder="Paste a ListForge URL or NewRecruit JSON…" rows="4"></textarea>
<div class="row">
  <button class="primary" onclick={importAttacker} disabled={!attackerText.trim()}>Import attacker</button>
  {#if salvo.attackerRoster}
    <span class="dim">{salvo.attackerRoster.name} — {salvo.attackerRoster.units.length} units, {salvo.attackerRoster.diagnostics.resolved_units} resolved</span>
  {/if}
</div>
{#if attackerError}<div class="error">{attackerError}</div>{/if}

{#if salvo.attackerRoster}
  <div class="diagnostics">
    {#if salvo.attackerRoster.diagnostics.unresolved_units > 0}
      <span class="chip warn">{salvo.attackerRoster.diagnostics.unresolved_units} unresolved units</span>
    {/if}
    {#if salvo.attackerRoster.diagnostics.unresolved_weapons > 0}
      <span class="chip warn">{salvo.attackerRoster.diagnostics.unresolved_weapons} unresolved weapons</span>
    {/if}
  </div>
{/if}

<hr style="border:0;border-top:1px solid var(--border);margin:14px 0" />

<div class="row">
  <label for="target-paste">Target</label>
  <span class="dim grow">Optional — for "Target → Imported list" mode</span>
</div>
<textarea id="target-paste" bind:value={targetText} placeholder="Paste a target list (optional)…" rows="3"></textarea>
<div class="row">
  <button onclick={importTarget} disabled={!targetText.trim()}>Import target</button>
  {#if salvo.targetRoster}
    <span class="dim">{salvo.targetRoster.name} — {salvo.targetRoster.units.length} units</span>
  {/if}
</div>
{#if targetError}<div class="error">{targetError}</div>{/if}

<p class="dim" style="margin-top:14px;font-size:12px">
  No list to hand? Pick a unit straight from the embedded dataset in the Attacker pane.
</p>
