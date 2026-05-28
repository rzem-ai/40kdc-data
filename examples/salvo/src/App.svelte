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
      >40k damage calculator · <code>@alpaca-software/40kdc-data</code></span
    >
  </header>

  <aside class="column setup">
    <section class="pane"><h2>Import</h2><ImportPane /></section>
    <section class="pane"><h2>Attacker</h2><AttackerPane /></section>
    <section class="pane"><h2>Target</h2><TargetPane /></section>
  </aside>

  <main class="canvas">
    <section class="pane hero"><h2>Projection</h2><OutputPane /></section>
  </main>

  <aside class="column tools">
    <section class="pane"><h2>Abilities &amp; buffs</h2><AbilitiesPane /></section>
  </aside>
</div>
