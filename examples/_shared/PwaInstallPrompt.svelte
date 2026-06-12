<script lang="ts">
  import Modal from "./Modal.svelte";

  /**
   * Nudges users to install the app as a PWA after the app version bumps.
   * Shows at most once per version (tracked in localStorage), never when already
   * running standalone, and only when the browser has offered an install path
   * (a captured `beforeinstallprompt`, or iOS Safari where that event never fires
   * and we fall back to manual instructions).
   *
   * Shared across the 40kdc example apps: each supplies its `appName` (modal
   * copy) and a per-app `storageKey` so the once-per-version stamp doesn't
   * collide between apps on the same origin. Relies on the `__APP_VERSION__`
   * compile-time constant, which each app defines in its vite config.
   */
  interface Props {
    /** App name shown in the modal title and body copy. */
    appName: string;
    /** Per-app localStorage key for the once-per-version stamp. */
    storageKey: string;
    /** Bindable so the parent can suppress the support modal while this is open. */
    open?: boolean;
    /** When true, hold back the auto-show (e.g. the first-run tutorial is up).
     *  The nudge re-fires on the next version bump, so skipping one session is fine. */
    suppressed?: boolean;
  }
  let { appName, storageKey, open = $bindable(false), suppressed = false }: Props = $props();

  interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
  }

  let deferred = $state<BeforeInstallPromptEvent | null>(null);

  // iOS Safari supports Add-to-Home-Screen but never fires beforeinstallprompt,
  // so it gets a manual-instructions variant instead of an install button.
  const isIOS = /iphone|ipad|ipod/i.test(
    typeof navigator === "undefined" ? "" : navigator.userAgent,
  );
  const iosMode = $derived(isIOS && deferred === null);

  function isStandalone(): boolean {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as { standalone?: boolean }).standalone === true
    );
  }
  function storedVersion(): string | null {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return __APP_VERSION__; // storage unavailable → behave as already-prompted
    }
  }
  function stampVersion(): void {
    try {
      localStorage.setItem(storageKey, __APP_VERSION__);
    } catch {
      /* non-fatal */
    }
  }

  // Show once per version: stamping on display (not just on action) means a plain
  // reload within the same version won't re-nag.
  function maybeShow(): void {
    if (open) return;
    if (suppressed) return;
    if (isStandalone()) return;
    if (storedVersion() === __APP_VERSION__) return;
    if (deferred === null && !isIOS) return; // no install path available yet
    stampVersion();
    open = true;
  }

  $effect(() => {
    const onBeforeInstall = (e: Event) => {
      e.preventDefault(); // keep Chrome's mini-infobar from showing on its own
      deferred = e as BeforeInstallPromptEvent;
      maybeShow();
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    // iOS never fires the event, so attempt the manual variant directly.
    if (isIOS) maybeShow();
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  });

  async function install(): Promise<void> {
    const evt = deferred;
    if (evt) {
      await evt.prompt();
      await evt.userChoice;
      deferred = null;
    }
    open = false;
  }
</script>

<Modal bind:open title={`Install ${appName}`}>
  {#if iosMode}
    <p class="lead">Add {appName} to your home screen to play offline, full-screen.</p>
    <ol class="steps">
      <li>Tap the <strong>Share</strong> button in Safari's toolbar.</li>
      <li>Choose <strong>Add to Home Screen</strong>.</li>
    </ol>
    <div class="actions">
      <button type="button" class="secondary" onclick={() => (open = false)}>Got it</button>
    </div>
  {:else}
    <p class="lead">
      Install {appName} as an app — it works offline, launches full-screen, and keeps your
      in-progress work.
    </p>
    <div class="actions">
      <button type="button" class="primary" onclick={install}>Install</button>
      <button type="button" class="secondary" onclick={() => (open = false)}>Not now</button>
    </div>
  {/if}
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
    border: 1px solid transparent;
  }
  /* Shared 40kdc brand teal (matches both apps' --accent / --color-accent). */
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
    border-color: #2e2e34;
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
