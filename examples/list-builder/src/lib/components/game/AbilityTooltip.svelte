<script lang="ts">
import type { Snippet } from 'svelte';

interface Props {
	text: string;
	children: Snippet;
}
let { text, children }: Props = $props();

let show = $state(false);
let hoverTimer: ReturnType<typeof setTimeout> | null = null;
let triggerEl: HTMLElement | undefined = $state();
let contentEl: HTMLElement | undefined = $state();

// Tooltip position (fixed, computed from trigger rect)
let top = $state(0);
let left = $state(0);

// Scroll state
let canScroll = $state(false);
let atBottom = $state(false);

function enter() {
	if (hoverTimer) clearTimeout(hoverTimer);
	hoverTimer = setTimeout(() => {
		if (triggerEl) {
			const rect = triggerEl.getBoundingClientRect();
			const tooltipMaxH = 208; // max-h-48 (192) + p-2 (16)
			const above = rect.top > tooltipMaxH;
			top = above ? rect.top - tooltipMaxH : rect.bottom + 4;
			left = Math.max(4, Math.min(rect.left, window.innerWidth - 304));
		}
		show = true;
		canScroll = false;
		atBottom = false;
	}, 150);
}

function leave() {
	if (hoverTimer) clearTimeout(hoverTimer);
	hoverTimer = setTimeout(() => {
		show = false;
	}, 100);
}

function tooltipEnter() {
	if (hoverTimer) clearTimeout(hoverTimer);
}

function onScroll(e: Event) {
	const el = e.currentTarget as HTMLElement;
	atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
}

$effect(() => {
	if (show && contentEl) {
		// Check after render whether the content overflows
		requestAnimationFrame(() => {
			if (contentEl) {
				canScroll = contentEl.scrollHeight > contentEl.clientHeight;
			}
		});
	}
});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	bind:this={triggerEl}
	onmouseenter={enter}
	onmouseleave={leave}
>
	{@render children()}
</span>

{#if show && text}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="bg-panel-surface border-panel-border pointer-events-auto fixed z-50 max-w-72 rounded border shadow-lg"
		style="top: {top}px; left: {left}px;"
		onmouseenter={tooltipEnter}
		onmouseleave={leave}
	>
		<div
			bind:this={contentEl}
			class="text-text max-h-48 overflow-y-auto p-2 text-[11px] leading-relaxed whitespace-pre-line"
			onscroll={onScroll}
		>
			{text}
		</div>
		{#if canScroll && !atBottom}
			<div
				class="from-panel-surface pointer-events-none absolute right-0 bottom-0 left-0 h-6 rounded-b bg-gradient-to-t to-transparent"
			></div>
		{/if}
	</div>
{/if}
