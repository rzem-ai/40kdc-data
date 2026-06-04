<script lang="ts">
  import Modal from "./Modal.svelte";

  interface Props {
    /** Patreon (or other support) URL the call-to-action opens. */
    patreonUrl: string;
    /** Host can suppress the prompt (e.g. while a higher-priority modal is open). */
    enabled?: boolean;
    /** Optional app name woven into the copy. */
    appName?: string;
  }

  let { patreonUrl, enabled = true, appName }: Props = $props();

  // Re-prompt at most once every 7 days, per origin. Each example is served from
  // its own subdomain, so each tracks its own timestamp — intentional.
  const STORAGE_KEY = "40kdc.support-prompt.lastShownMs";
  const INTERVAL_MS = 7 * 24 * 60 * 60 * 1000;
  const SHOW_DELAY_MS = 1500;

  let open = $state(false);

  function lastShown(): number {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? Number(raw) || 0 : 0;
    } catch {
      return Number.NaN; // storage unavailable → treat as ineligible
    }
  }
  function stampNow(): void {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* non-fatal */
    }
  }

  // Decide once on mount. `enabled` is read only inside the timer callback, so it
  // is not a reactive dependency — this effect runs a single time.
  $effect(() => {
    const since = lastShown();
    if (Number.isNaN(since)) return; // no storage
    if (Date.now() - since < INTERVAL_MS) return; // shown too recently
    const timer = setTimeout(() => {
      if (!enabled) return; // a higher-priority modal won this load; try next time
      stampNow();
      open = true;
    }, SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  });

  // If a higher-priority modal opens after we're already showing (e.g. a late
  // `beforeinstallprompt`), stand down so the two never stack.
  $effect(() => {
    if (open && !enabled) open = false;
  });
</script>

<Modal bind:open title="Thanks for using {appName ?? 'this tool'}">
  <p class="lead">
    {appName ?? "These tools"} and the rest of the 40kdc examples are free and open —
    no ads, no accounts, no paywalls.
  </p>
  <p>
    If they help your games, you can support continued development on Patreon. Totally
    optional, and this is the only nudge you'll get for a while.
  </p>
  <div class="actions">
    <a
      class="primary"
      href={patreonUrl}
      target="_blank"
      rel="noreferrer noopener"
      onclick={() => (open = false)}
    >
      Support on Patreon
    </a>
    <button type="button" class="secondary" onclick={() => (open = false)}>Maybe later</button>
  </div>
</Modal>

<style>
  .lead {
    margin-top: 0;
  }
  p {
    margin: 0 0 0.8rem;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 1.1rem;
  }
  .primary,
  .secondary {
    font: inherit;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.55rem 0.95rem;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    border: 1px solid transparent;
  }
  .primary {
    background: #14b8a6;
    color: #0a1f1c;
    border-color: #14b8a6;
  }
  .primary:hover {
    background: #0d9488;
    border-color: #0d9488;
  }
  .secondary {
    background: #0c0c0e;
    color: #a8a8b2;
    border-color: #66666f; /* control outline — matches --color-border-strong */
  }
  .secondary:hover {
    color: #ededf0;
    border-color: #14b8a6;
  }
  .primary:focus-visible,
  .secondary:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px #14b8a6;
  }
</style>
