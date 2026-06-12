<script lang="ts">
  import { docSession, leaveDocSession } from "./doc-session.svelte";

  /**
   * Live-session strip: start/leave, the spoken-friendly code, invite-link
   * copy buttons, and who's here. The host owns starting (it must seed the
   * session with its current document) and the entitlement gate.
   */
  interface Props {
    /** Start a session seeded with the host's current document. */
    onStart: () => void;
    onFlash: (msg: string) => void;
  }
  let { onStart, onFlash }: Props = $props();

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

<section class="session">
  {#if docSession.status === "idle"}
    <button type="button" class="start" onclick={onStart}>⦿ Live session</button>
    <span class="hint">edit together in real time</span>
  {:else}
    <span class="status {docSession.status}">
      {docSession.status === "connected" ? "● live" : "○ connecting…"}
    </span>
    {#if docSession.code}
      <span class="code" title="Session code">{docSession.code}</span>
    {/if}
    <span class="who">
      {docSession.participants.length || 1}
      {docSession.participants.length === 1 ? "person" : "people"}
      {#if docSession.role === "viewer"}· viewing{/if}
    </span>
    {#if docSession.editorLink}
      <button type="button" onclick={() => copyLink(docSession.editorLink, "Editor")}>
        Copy edit link
      </button>
      <button type="button" onclick={() => copyLink(docSession.viewerLink, "Viewer")}>
        Copy view link
      </button>
    {/if}
    <button type="button" class="leave" onclick={leaveDocSession}>Leave</button>
  {/if}
  {#if docSession.error}
    <span class="error">{docSession.error}</span>
  {/if}
</section>

<style>
  /* Self-contained palette, same convention as Modal/CloudSavesPane. */
  .session {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid #2e2e34;
    border-radius: 8px;
    background: #151517;
    padding: 0.45rem 0.7rem;
    font-family: "Barlow", system-ui, sans-serif;
    font-size: 0.8rem;
    color: #a8a8b2;
  }
  button {
    background: #1b1b1f;
    color: #ededf0;
    border: 1px solid #66666f;
    border-radius: 6px;
    padding: 0.3rem 0.65rem;
    font: inherit;
    cursor: pointer;
  }
  button:hover {
    border-color: #14b8a6;
  }
  .start {
    background: #14b8a6;
    color: #04221e;
    border: none;
    font-weight: 600;
  }
  .start:hover {
    background: #2dd4bf;
  }
  .leave {
    color: #f87171;
    border-color: #3a2a2a;
  }
  .status.connected {
    color: #2dd4bf;
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
    color: #66666f;
    font-size: 0.72rem;
  }
  .error {
    color: #f87171;
  }
</style>
