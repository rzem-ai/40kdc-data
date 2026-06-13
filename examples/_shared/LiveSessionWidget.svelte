<script lang="ts">
  import {
    confirmNickname,
    docSession,
    leaveDocSession,
    retryLive,
    sendNickname,
  } from "./doc-session.svelte";
  import Modal from "./Modal.svelte";
  import { normalizeNickname, storedNickname } from "./nickname";

  /**
   * Live-session UI (all apps). The first-join nickname prompt is a centered
   * modal — it's the one moment that must not be missed (especially on a
   * phone, where the floating panel hid below the fold). Everything after —
   * connection status, doc name, participant roster, rename, invite-link
   * copy, the snapshot fallback — lives in the floating bottom-left panel,
   * which minimizes to a status pill so it doesn't eat phone screen. Hidden
   * while idle; the host's "Go live" / invite-link handling drives state.
   */
  interface Props {
    onFlash: (msg: string) => void;
  }
  let { onFlash }: Props = $props();

  let nameInput = $state(storedNickname() ?? "");
  let renaming = $state(false);
  let renameInput = $state("");

  // ── Join prompt as a modal ───────────────────────────────────────────────
  // Modal.open is bindable both ways: the session status drives it open, and
  // a user-initiated close (Escape / backdrop / ×) while still prompting
  // means Cancel.
  let joinOpen = $state(false);
  $effect(() => {
    joinOpen = docSession.status === "prompt-nickname";
  });
  function onJoinClose(): void {
    if (docSession.status === "prompt-nickname") leaveDocSession();
  }

  // ── Panel minimize ───────────────────────────────────────────────────────
  // Collapses to a corner pill; remembered per tab so a refresh mid-session
  // doesn't pop the panel back open. A *new* error auto-expands once —
  // errors must not hide silently behind the pill.
  const COLLAPSE_KEY = "live-widget.collapsed";
  let collapsed = $state(readCollapsed());
  function readCollapsed(): boolean {
    try {
      return sessionStorage.getItem(COLLAPSE_KEY) === "1";
    } catch {
      return false;
    }
  }
  function setCollapsed(next: boolean): void {
    collapsed = next;
    try {
      sessionStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
    } catch {
      /* non-fatal */
    }
  }
  let lastError: string | null = null;
  $effect(() => {
    if (docSession.error && docSession.error !== lastError && collapsed) {
      collapsed = false; // surface the error, but don't overwrite the stored preference
    }
    lastError = docSession.error;
  });

  const self = $derived(
    docSession.participants.find((p) => p.id === docSession.participantId) ?? null,
  );

  const pillLabel = $derived.by(() => {
    if (docSession.status === "error") return "⚠ live session";
    if (docSession.status === "snapshot") return "○ read-only";
    if (docSession.status === "connected") {
      const n = docSession.participants.length;
      return n > 1 ? `● live · ${n}` : "● live";
    }
    return "○ connecting…";
  });

  function join(): void {
    const name = normalizeNickname(nameInput);
    if (!name) return;
    confirmNickname(name);
  }

  function startRename(): void {
    renameInput = self?.nickname ?? "";
    renaming = true;
  }

  function applyRename(): void {
    const name = normalizeNickname(renameInput);
    if (name) sendNickname(name);
    renaming = false;
  }

  async function copyLink(link: string | null, label: string): Promise<void> {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      onFlash(`${label} link copied.`);
    } catch {
      onFlash(`${label} link: ${link}`);
    }
  }
</script>

<!-- First-join nickname prompt: centered, over the blurred backdrop. -->
<Modal bind:open={joinOpen} title="Join live session" onClose={onJoinClose}>
  <div class="join">
    <p class="hint">Pick a name others will see:</p>
    <div class="row">
      <!-- svelte-ignore a11y_autofocus — the dialog exists solely for this input -->
      <input
        type="text"
        placeholder="your name"
        maxlength="40"
        autofocus
        bind:value={nameInput}
        onkeydown={(e) => e.key === "Enter" && join()}
      />
      <button type="button" class="primary" disabled={!normalizeNickname(nameInput)} onclick={join}>
        Join
      </button>
    </div>
    <button type="button" class="leave" onclick={leaveDocSession}>Cancel</button>
  </div>
</Modal>

{#if docSession.status !== "idle" && docSession.status !== "prompt-nickname"}
  {#if collapsed}
    <button
      type="button"
      class="pill {docSession.status}"
      onclick={() => setCollapsed(false)}
      aria-label="Expand session panel"
      title={docSession.docName ?? "Live session"}
    >
      {pillLabel}
    </button>
  {:else}
    <aside class="widget" aria-label="Live session">
      {#if docSession.status === "snapshot"}
        <header>
          <span class="title">○ read-only copy</span>
          {#if docSession.docName}<span class="doc">{docSession.docName}</span>{/if}
          <button type="button" class="mini" aria-label="Minimize session panel" onclick={() => setCollapsed(true)}>–</button>
        </header>
        <p class="hint">{docSession.error ?? "Live session unavailable."}</p>
        <div class="row">
          <button type="button" class="primary" onclick={retryLive}>Retry live</button>
          <button type="button" class="leave" onclick={leaveDocSession}>Dismiss</button>
        </div>
      {:else if docSession.status === "error"}
        <header>
          <span class="title err">live session</span>
          <button type="button" class="mini" aria-label="Minimize session panel" onclick={() => setCollapsed(true)}>–</button>
        </header>
        <p class="hint err">{docSession.error ?? "Something went wrong."}</p>
        <button type="button" class="leave" onclick={leaveDocSession}>Close</button>
      {:else}
        <header>
          <span class="title {docSession.status}">
            {docSession.status === "connected" ? "● live" : "○ connecting…"}
          </span>
          {#if docSession.docName}
            <span class="doc" title={docSession.docName}>{docSession.docName}</span>
          {:else if docSession.code}
            <span class="code" title="Session code">{docSession.code}</span>
          {/if}
          <button type="button" class="mini" aria-label="Minimize session panel" onclick={() => setCollapsed(true)}>–</button>
          <button type="button" class="leave" onclick={leaveDocSession}>Leave</button>
        </header>

        {#if docSession.participants.length > 0}
          <ul class="roster">
            {#each docSession.participants as p (p.id)}
              <li>
                {#if p.id === docSession.participantId && renaming}
                  <input
                    type="text"
                    class="rename"
                    maxlength="40"
                    bind:value={renameInput}
                    onkeydown={(e) => e.key === "Enter" && applyRename()}
                  />
                  <button type="button" class="mini" onclick={applyRename}>✓</button>
                {:else}
                  <span class="who" class:you={p.id === docSession.participantId}>
                    {p.nickname}{#if p.id === docSession.participantId}&nbsp;(you){/if}
                  </span>
                  {#if p.role === "viewer"}<span class="badge">viewing</span>{/if}
                  {#if p.id === docSession.participantId}
                    <button type="button" class="mini" title="Change your name" onclick={startRename}>
                      ✎
                    </button>
                  {/if}
                {/if}
              </li>
            {/each}
          </ul>
        {/if}

        {#if docSession.editorLink || docSession.viewerLink}
          <div class="row">
            {#if docSession.editorLink}
              <button type="button" onclick={() => copyLink(docSession.editorLink, "Edit")}>
                Copy edit link
              </button>
            {/if}
            {#if docSession.viewerLink}
              <button type="button" onclick={() => copyLink(docSession.viewerLink, "View")}>
                Copy view link
              </button>
            {/if}
          </div>
        {/if}

        {#if docSession.error}
          <p class="hint err">{docSession.error}</p>
        {/if}
      {/if}
    </aside>
  {/if}
{/if}

<style>
  /* Self-contained palette, same convention as Modal/CloudSavesPane. */
  .widget {
    position: fixed;
    left: 1rem;
    bottom: 1rem;
    z-index: 60;
    width: min(20rem, calc(100vw - 2rem));
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    background: #151517;
    border: 1px solid #2e2e34;
    border-radius: 10px;
    padding: 0.7rem 0.8rem;
    font-family: "Barlow", system-ui, sans-serif;
    font-size: 0.8rem;
    color: #a8a8b2;
    box-shadow:
      0 1px 0 0 rgba(255, 255, 255, 0.06) inset,
      0 12px 32px -8px rgba(0, 0, 0, 0.9);
  }
  .pill {
    position: fixed;
    left: 1rem;
    bottom: 1rem;
    z-index: 60;
    display: inline-flex;
    align-items: center;
    height: 2.2rem;
    padding: 0 0.8rem;
    background: #151517;
    border: 1px solid #2e2e34;
    border-radius: 999px;
    font-family: "Barlow Condensed", system-ui, sans-serif;
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #a8a8b2;
    cursor: pointer;
    box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.9);
  }
  .pill.connected {
    color: #2dd4bf;
  }
  .pill.error {
    color: #f87171;
  }
  .pill:hover {
    border-color: #14b8a6;
  }
  .join {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    font-family: "Barlow", system-ui, sans-serif;
    font-size: 0.8rem;
    color: #a8a8b2;
  }
  header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
  }
  .title {
    font-family: "Barlow Condensed", system-ui, sans-serif;
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    white-space: nowrap;
  }
  .title.connected {
    color: #2dd4bf;
  }
  .title.err {
    color: #f87171;
  }
  .doc {
    flex: 1;
    min-width: 0;
    color: #ededf0;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .code {
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: #ededf0;
    background: #0c0c0e;
    border: 1px solid #2e2e34;
    border-radius: 4px;
    padding: 0.1rem 0.45rem;
  }
  .hint {
    margin: 0;
    font-size: 0.78rem;
    color: #a8a8b2;
  }
  .hint.err {
    color: #f87171;
  }
  .roster {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    max-height: 9rem;
    overflow-y: auto;
  }
  .roster li {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    min-width: 0;
  }
  .who {
    color: #ededf0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .who.you {
    color: #2dd4bf;
  }
  .badge {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #a8a8b2;
    border: 1px solid #2e2e34;
    border-radius: 999px;
    padding: 0 0.4rem;
  }
  .row {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    align-items: center;
  }
  input {
    flex: 1;
    min-width: 0;
    background: #0c0c0e;
    color: #ededf0;
    border: 1px solid #2e2e34;
    border-radius: 6px;
    padding: 0.35rem 0.5rem;
    font: inherit;
  }
  input:focus-visible {
    outline: none;
    border-color: #14b8a6;
  }
  input.rename {
    padding: 0.15rem 0.4rem;
    font-size: 0.78rem;
  }
  button {
    background: #1b1b1f;
    color: #ededf0;
    border: 1px solid #66666f;
    border-radius: 6px;
    padding: 0.3rem 0.65rem;
    font: inherit;
    font-size: 0.78rem;
    cursor: pointer;
    white-space: nowrap;
  }
  button:hover {
    border-color: #14b8a6;
  }
  button:disabled {
    opacity: 0.4;
    cursor: default;
  }
  .primary {
    background: #14b8a6;
    color: #04221e;
    border: none;
    font-weight: 600;
  }
  .primary:hover {
    background: #2dd4bf;
  }
  .leave {
    margin-left: auto;
    color: #f87171;
    border-color: #3a2a2a;
  }
  .mini {
    padding: 0 0.35rem;
    font-size: 0.72rem;
    border: none;
    background: none;
    color: #66666f;
  }
  .mini:hover {
    color: #2dd4bf;
  }
  .pill,
  .pill:hover {
    /* keep the pill's own border rules over the generic button ones */
    background: #151517;
  }
</style>
