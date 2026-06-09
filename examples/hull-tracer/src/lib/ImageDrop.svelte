<script lang="ts">
  // Image intake. Two paths:
  //  • file — drag/drop or pick a local file, turned into a `blob:` object URL
  //           that lives only in this browser tab.
  //  • url  — paste a link; the browser fetches it as a normal <img> backdrop.
  // Either way the parent owns the URL lifecycle (revocation) via the emitted
  // value. Pixels are never read back (the photo is only an SVG backdrop, never
  // drawn to a canvas), so cross-origin tainting is irrelevant and only the
  // natural dimensions are read.
  let {
    onImage,
  }: {
    onImage: (img: { url: string; width: number; height: number; name: string }) => void;
  } = $props();

  let dragOver = $state(false);
  let error = $state<string | null>(null);
  let urlInput = $state("");

  function probe(url: string, name: string, onFail: () => void): void {
    const img = new Image();
    img.onload = () => {
      onImage({ url, width: img.naturalWidth, height: img.naturalHeight, name });
    };
    img.onerror = onFail;
    img.src = url;
  }

  function acceptFile(file: File | undefined | null): void {
    error = null;
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      error = "That file isn't an image.";
      return;
    }
    const url = URL.createObjectURL(file);
    probe(url, file.name, () => {
      URL.revokeObjectURL(url);
      error = "Couldn't read that image.";
    });
  }

  function nameFromUrl(raw: string): string {
    try {
      const u = new URL(raw, window.location.href);
      const last = u.pathname.split("/").filter(Boolean).pop();
      return last || u.hostname || raw;
    } catch {
      return raw;
    }
  }

  function acceptUrl(): void {
    error = null;
    const raw = urlInput.trim();
    if (!raw) return;
    probe(raw, nameFromUrl(raw), () => {
      error = "Couldn't load that URL — check the link, or the host may block hotlinking.";
    });
  }

  function onInput(e: Event): void {
    acceptFile((e.currentTarget as HTMLInputElement).files?.[0]);
  }

  function onDrop(e: DragEvent): void {
    e.preventDefault();
    dragOver = false;
    acceptFile(e.dataTransfer?.files?.[0]);
  }
</script>

<div
  class="drop"
  class:over={dragOver}
  ondragover={(e) => {
    e.preventDefault();
    dragOver = true;
  }}
  ondragleave={() => (dragOver = false)}
  ondrop={onDrop}
  role="region"
  aria-label="Load a top-down image"
>
  <p class="lead">Drop a top-down photo here</p>
  <p class="or">or</p>
  <label class="pick focus-ring">
    Choose image
    <input type="file" accept="image/*" onchange={onInput} />
  </label>

  <div class="url-row">
    <input
      type="url"
      class="url-field focus-ring"
      placeholder="…or paste an image URL"
      bind:value={urlInput}
      onkeydown={(e) => e.key === "Enter" && acceptUrl()}
    />
    <button class="url-btn focus-ring" onclick={acceptUrl} disabled={!urlInput.trim()}>Load</button>
  </div>

  {#if error}<p class="err" role="alert">{error}</p>{/if}
  <p class="privacy">
    A file you choose stays in your browser — never uploaded. A pasted URL is fetched by your
    browser from that address, but is still only a backdrop: only the polygon you trace is ever
    exported.
  </p>
</div>

<style>
  .drop {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-2, 8px);
    padding: 32px 20px;
    border: 1.5px dashed var(--color-border-strong);
    border-radius: var(--radius-lg);
    background: var(--color-panel);
    text-align: center;
  }
  .drop.over {
    border-color: var(--color-accent);
    background: color-mix(in oklch, var(--color-accent) 8%, var(--color-panel));
  }
  .lead {
    margin: 0;
    font-family: var(--font-heading);
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: var(--tracking-wide);
    color: var(--color-text);
  }
  .or {
    margin: 0;
    color: var(--color-text-dim);
    font-size: 12px;
  }
  .pick {
    display: inline-block;
    padding: 8px 16px;
    border-radius: var(--radius-md);
    background: var(--color-accent);
    color: var(--color-accent-foreground);
    font-family: var(--font-heading);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: var(--tracking-wide);
    cursor: pointer;
  }
  .pick:hover {
    background: var(--color-accent-hover);
  }
  .pick input {
    display: none;
  }
  .url-row {
    display: flex;
    gap: 6px;
    width: 100%;
    max-width: 360px;
    margin-top: 4px;
  }
  .url-field {
    flex: 1 1 auto;
    min-width: 0;
    padding: 7px 10px;
    background: var(--color-panel-surface);
    border: 1px solid var(--color-border-strong);
    border-radius: var(--radius-sm);
    color: var(--color-text);
    font-family: var(--font-mono);
    font-size: 12px;
  }
  .url-btn {
    flex: 0 0 auto;
    padding: 7px 14px;
    border: 1px solid var(--color-border-strong);
    border-radius: var(--radius-sm);
    background: var(--color-panel-surface);
    color: var(--color-text-muted);
    font-family: var(--font-heading);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: var(--tracking-wide);
  }
  .url-btn:hover:not(:disabled) {
    border-color: var(--color-accent);
    color: var(--color-text);
  }
  .url-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .err {
    margin: 0;
    color: var(--color-danger);
    font-size: 12px;
  }
  .privacy {
    margin: 8px 0 0;
    max-width: 42ch;
    font-size: 11px;
    color: var(--color-text-dim);
    line-height: 1.4;
  }
</style>
