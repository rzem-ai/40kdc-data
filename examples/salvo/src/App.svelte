<script lang="ts">
  import ImportPane from "./lib/import-pane.svelte";
  import AttackerPane from "./lib/attacker-pane.svelte";
  import AbilitiesPane from "./lib/abilities-pane.svelte";
  import TargetPane from "./lib/target-pane.svelte";
  import OutputPane from "./lib/output-pane.svelte";
</script>

<div class="app">
  <header class="app-header">
    <h1>Sal<span class="accent">vo</span></h1>
    <span class="subtitle"
      >A 40k damage calculator powered by <code>@alpaca-software/40kdc-data</code></span
    >
  </header>

  <section class="pane import"><h2>Import</h2><ImportPane /></section>
  <section class="pane attacker"><h2>Attacker</h2><AttackerPane /></section>
  <section class="pane abilities"><h2>Abilities & buffs</h2><AbilitiesPane /></section>
  <section class="pane target"><h2>Target</h2><TargetPane /></section>
  <section class="pane output"><h2>Projection</h2><OutputPane /></section>
</div>
