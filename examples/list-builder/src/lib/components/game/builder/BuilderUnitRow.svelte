<script lang="ts">
import {
	unitRaw,
	unitPoints,
	loadoutSummary,
	builderViolations,
	type BuilderState,
	type BuilderUnit,
} from '$lib/data/builder';

interface Props {
	unit: BuilderUnit;
	draft: BuilderState;
	selected: boolean;
	onselect: () => void;
	onclone: () => void;
	onremove: () => void;
}
let { unit, draft, selected, onselect, onclone, onremove }: Props = $props();

const raw = $derived(unitRaw(unit.datasheetId));
const points = $derived(unitPoints(unit));
const summary = $derived(loadoutSummary(unit));
const hasIssues = $derived(builderViolations(draft).some((v) => v.unitKey === unit.key));
</script>

<div
	class="flex items-stretch gap-1 rounded border px-1.5 py-1 transition-colors {selected
		? 'border-accent bg-accent/10'
		: 'bg-panel-surface border-panel-border hover:border-panel-border/80'}"
>
	<!-- Main hit area selects the unit and drives the right-hand detail panel. -->
	<button class="flex min-w-0 flex-1 flex-col text-left" onclick={onselect}>
		<div class="flex items-center gap-1.5">
			<span class="text-text truncate text-xs font-medium">{raw?.name ?? unit.datasheetId}</span>
			{#if unit.modelCount > 1}<span class="text-text-dim shrink-0 tabular-nums text-[10px]"
					>×{unit.modelCount}</span
				>{/if}
			{#if unit.isWarlord}<span class="rounded bg-amber-900/40 px-1 text-[10px] text-amber-300"
					>WL</span
				>{/if}
			{#if hasIssues}<span
					class="shrink-0 text-[10px] text-amber-400"
					title="This unit has advisory violations">⚠</span
				>{/if}
		</div>
		{#if summary}
			<span class="text-text-dim/70 truncate text-[10px] italic" title={summary}>{summary}</span>
		{/if}
	</button>

	<div class="flex shrink-0 items-center gap-1.5">
		<span class="text-text-dim tabular-nums text-xs">{points}</span>
		<button
			class="text-text-dim hover:text-text text-xs leading-none"
			onclick={onclone}
			title="Duplicate this unit"
			aria-label="duplicate unit">⧉</button
		>
		<button
			class="text-text-dim hover:text-red-400 text-xs leading-none"
			onclick={onremove}
			aria-label="remove unit">×</button
		>
	</div>
</div>
