<script lang="ts">
  import type { Snippet } from "svelte";
  import GithubMark from "./GithubMark.svelte";
  import { APPS, HOME_URL, PACKAGE_URL, REPO_URL, siblingApps } from "./links.js";

  // The standard example-app header: brand left (uppercase accent title plus a
  // muted tag) linking to the family landing page, an optional app-controls
  // snippet, then a uniform link cluster — an app switcher, GitHub, and npm.
  // The switcher panel lists the sibling apps (and, for single-page apps that
  // pass `onHome`, a "back to home screen" action). Narrow-screen rules trim
  // identically across apps: tag + npm + switcher label drop below 640px; only
  // the switcher survives below 380px.
  //
  // Styling is self-contained (shadowboxing fallbacks) but follows the host's
  // tokens when present, so the component works in Tailwind and scoped-CSS hosts.
  let {
    title,
    tag,
    appId,
    brandHref = HOME_URL,
    homeUrl = HOME_URL,
    repoUrl = REPO_URL,
    packageUrl = PACKAGE_URL,
    showSwitcher = true,
    onHome,
    homeLabel,
    nav,
  }: {
    title: string;
    /** Short descriptor next to the title; hidden below 640px. */
    tag?: string;
    /**
     * This app's registry id (see `APPS` in links.ts). Drives the switcher's
     * sibling list; when omitted the switcher lists all apps.
     */
    appId?: string;
    /** Where the brand links — the family landing page by default. */
    brandHref?: string;
    /** @deprecated retained for back-compat; the cluster no longer renders it. */
    homeUrl?: string;
    repoUrl?: string;
    packageUrl?: string;
    /** Render the app switcher in the link cluster. */
    showSwitcher?: boolean;
    /**
     * In-app "home" action for single-page apps (e.g. resetting list-builder to
     * its start screen). When set, the switcher panel shows a top section that
     * calls this instead of navigating.
     */
    onHome?: () => void;
    /** Label for the `onHome` row; defaults to "Home screen". */
    homeLabel?: string;
    /** App-specific controls rendered between the brand and the link cluster. */
    nav?: Snippet;
  } = $props();

  let open = $state(false);
  let switcherEl = $state<HTMLDivElement>();
  const siblings = $derived(appId ? siblingApps(appId) : APPS);

  function goHome() {
    onHome?.();
    open = false;
  }

  $effect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (switcherEl && !switcherEl.contains(e.target as Node)) open = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") open = false;
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  });
</script>

<header class="app-header">
  <a class="brand" href={brandHref}>
    <h1>{title}</h1>
    {#if tag}<span class="tag">{tag}</span>{/if}
  </a>
  {#if nav}
    <nav class="app-nav" aria-label="App controls">{@render nav()}</nav>
  {/if}
  <nav class="links" aria-label="Project links">
    {#if showSwitcher}
      <div class="switcher" bind:this={switcherEl}>
        <button
          type="button"
          class="switch-trigger"
          aria-haspopup="true"
          aria-expanded={open}
          aria-label="Switch app"
          onclick={() => (open = !open)}
        >
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path fill="currentColor" d="M1 1h6v6H1zM9 1h6v6H9zM1 9h6v6H1zM9 9h6v6H9z" />
          </svg>
          <span class="switch-label">Apps</span>
        </button>
        {#if open}
          <div class="switch-panel" role="menu">
            {#if onHome}
              <button type="button" class="switch-home" role="menuitem" onclick={goHome}>
                ← {homeLabel ?? "Home screen"}
              </button>
              <div class="switch-divider" aria-hidden="true"></div>
            {/if}
            {#each siblings as app (app.id)}
              <a class="switch-item" role="menuitem" href={app.url}>
                <span class="switch-item-label">{app.label}</span>
                <span class="switch-item-tag">{app.tag}</span>
              </a>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
    <a class="repo" href={repoUrl} target="_blank" rel="noreferrer noopener" aria-label="GitHub repository">
      <GithubMark />
    </a>
    <a class="pkg" href={packageUrl} target="_blank" rel="noreferrer noopener" aria-label="npm package">
      <code>npm</code>
    </a>
  </nav>
</header>

<style>
  .app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4, 16px);
    min-height: 44px;
    padding: var(--space-1, 4px) var(--space-4, 16px);
    background: var(--panel, oklch(0.224 0.008 286));
    border-bottom: 1px solid var(--border, oklch(0.304 0.011 286));
    flex-wrap: wrap;
  }
  .brand {
    display: flex;
    align-items: baseline;
    gap: var(--space-3, 12px);
    text-decoration: none;
    color: inherit;
    min-width: 0;
    flex: 0 1 auto;
  }
  h1 {
    margin: 0;
    font-family: var(--font-heading, "Barlow Condensed", system-ui, sans-serif);
    font-size: var(--text-lg, 18px);
    font-weight: 800;
    letter-spacing: var(--tracking-wider, 0.08em);
    text-transform: uppercase;
    line-height: 1;
    color: var(--accent, oklch(0.704 0.123 183));
  }
  .brand:hover h1 {
    color: var(--accent-hover, oklch(0.6 0.104 185));
  }
  .tag {
    color: var(--muted, oklch(0.735 0.014 286));
    font-size: var(--text-xs, 12px);
    font-family: var(--font-heading, "Barlow Condensed", system-ui, sans-serif);
    text-transform: uppercase;
    letter-spacing: var(--tracking-wide, 0.05em);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .app-nav {
    display: flex;
    align-items: center;
    gap: var(--space-2, 8px);
    flex-wrap: wrap;
    min-width: 0;
    flex: 1 1 auto;
    justify-content: flex-end;
  }
  .links {
    display: flex;
    align-items: center;
    gap: var(--space-3, 12px);
    flex: 0 0 auto;
  }
  .links a {
    display: inline-flex;
    align-items: center;
    color: var(--muted, oklch(0.735 0.014 286));
    text-decoration: none;
    transition: color 80ms ease;
  }
  .links a:hover,
  .links a:focus-visible {
    color: var(--accent, oklch(0.704 0.123 183));
  }
  .links .pkg code {
    font-family: var(--font-mono, "JetBrains Mono", ui-monospace, monospace);
    font-size: var(--text-2xs, 11px);
  }

  /* ── App switcher — uniform with the GitHub glyph, panel in the dialect ── */
  .switcher {
    position: relative;
    display: inline-flex;
  }
  .switch-trigger {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1, 4px);
    appearance: none;
    background: none;
    border: 0;
    padding: 0;
    margin: 0;
    font: inherit;
    color: var(--muted, oklch(0.735 0.014 286));
    transition: color 80ms ease;
  }
  .switch-trigger:hover,
  .switch-trigger:focus-visible,
  .switch-trigger[aria-expanded="true"] {
    color: var(--accent, oklch(0.704 0.123 183));
  }
  .switch-label {
    font-family: var(--font-heading, "Barlow Condensed", system-ui, sans-serif);
    font-size: var(--text-2xs, 11px);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: var(--tracking-wide, 0.05em);
  }
  .switch-panel {
    position: absolute;
    top: calc(100% + var(--space-2, 8px));
    right: 0;
    z-index: 50;
    display: flex;
    flex-direction: column;
    min-width: 200px;
    padding: var(--space-1, 4px);
    background: var(--panel, oklch(0.224 0.008 286));
    border: 1px solid var(--border, oklch(0.304 0.011 286));
    border-radius: var(--radius-md, 4px);
    box-shadow: var(
      --shadow-md,
      0 1px 0 0 rgba(255, 255, 255, 0.08) inset,
      0 2px 0 0 rgba(0, 0, 0, 0.8),
      0 10px 20px -4px rgba(0, 0, 0, 0.95)
    );
  }
  .switch-item,
  .switch-home {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1px;
    padding: var(--space-2, 8px) var(--space-3, 12px);
    border-radius: var(--radius-sm, 2px);
    text-decoration: none;
    /* button reset for the home row */
    appearance: none;
    background: none;
    border: 0;
    margin: 0;
    width: 100%;
    font: inherit;
    text-align: left;
    transition: background 80ms ease;
  }
  .switch-item:hover,
  .switch-item:focus-visible,
  .switch-home:hover,
  .switch-home:focus-visible {
    background: var(--panel-hover, oklch(0.237 0.008 286));
  }
  .switch-item-label {
    font-family: var(--font-heading, "Barlow Condensed", system-ui, sans-serif);
    font-size: var(--text-sm, 13px);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: var(--tracking-wide, 0.05em);
    color: var(--text, oklch(0.947 0.004 286));
  }
  .switch-item:hover .switch-item-label,
  .switch-item:focus-visible .switch-item-label {
    color: var(--accent, oklch(0.704 0.123 183));
  }
  .switch-item-tag {
    font-size: var(--text-2xs, 11px);
    color: var(--muted, oklch(0.735 0.014 286));
  }
  .switch-home {
    flex-direction: row;
    align-items: center;
    font-family: var(--font-heading, "Barlow Condensed", system-ui, sans-serif);
    font-size: var(--text-2xs, 11px);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: var(--tracking-wide, 0.05em);
    color: var(--muted, oklch(0.735 0.014 286));
  }
  .switch-home:hover,
  .switch-home:focus-visible {
    color: var(--accent, oklch(0.704 0.123 183));
  }
  .switch-divider {
    height: 1px;
    margin: var(--space-1, 4px) 0;
    background: var(--border, oklch(0.304 0.011 286));
  }

  @media (max-width: 640px) {
    .app-header {
      padding-left: var(--space-3, 12px);
      padding-right: var(--space-3, 12px);
      gap: var(--space-2, 8px);
    }
    .tag,
    .switch-label,
    .links .pkg {
      display: none;
    }
  }
  @media (max-width: 380px) {
    /* Keep the cross-app switcher on the smallest phones; drop the rest. */
    .links > a {
      display: none;
    }
  }
</style>
