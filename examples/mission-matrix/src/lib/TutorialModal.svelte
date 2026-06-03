<script lang="ts">
  import Modal from "../../../_shared/Modal.svelte";

  /**
   * First-run onboarding for Mission Matrix. Auto-shows once per device (tracked
   * in localStorage), and the parent can reopen it any time from the header help
   * button via the bindable `open` prop.
   */
  interface Props {
    /** Bindable so the header "?" button can reopen the tutorial, and so the
     *  parent can suppress the support modal while it's showing. */
    open?: boolean;
  }
  let { open = $bindable(false) }: Props = $props();

  const STORAGE_KEY = "mission-matrix.tutorial-seen.v1";

  function seen(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      return true; // storage unavailable → behave as already-seen, never nag
    }
  }
  function stampSeen(): void {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* non-fatal */
    }
  }

  // Show once: stamp on display (not on dismiss) so a plain reload won't re-nag.
  $effect(() => {
    if (open) return;
    if (seen()) return;
    stampSeen();
    open = true;
  });
</script>

<Modal bind:open title="How to use Mission Matrix">
  <p class="lead">
    A two-player WTC scoresheet driven by the 40kdc dataset — pick dispositions, the
    missions resolve themselves, then track scoring round by round.
  </p>
  <ol class="steps">
    <li>
      Pick <strong>your</strong> Force Disposition (a row) and your
      <strong>opponent's</strong> (a column). The cell where they meet is the mission
      you play.
    </li>
    <li>
      Once both are set the matrix collapses to reveal both primaries. Turn on
      <strong>Keep open</strong> to stop that, or <strong>Verbose</strong> to expand a
      whole disposition's missions side by side for comparison.
    </li>
    <li>
      Draw secondaries and enter primary VP each round — the
      <strong>WTC result</strong> updates live as you score.
    </li>
    <li>Your game is saved locally, so you can close the tab and pick up later.</li>
  </ol>
  <div class="actions">
    <button type="button" class="primary" onclick={() => (open = false)}>Got it</button>
  </div>
</Modal>

<style>
  .lead {
    margin-top: 0;
  }
  .steps {
    margin: 0 0 0.4rem;
    padding-left: 1.2rem;
    line-height: 1.6;
  }
  .steps li {
    margin-bottom: 0.5rem;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 1.1rem;
  }
  .primary {
    font: inherit;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.55rem 0.95rem;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid transparent;
    background: #14b8a6;
    color: #0a1f1c;
    border-color: #14b8a6;
  }
  .primary:hover {
    background: #0d9488;
    border-color: #0d9488;
  }
  .primary:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px #14b8a6;
  }
</style>
