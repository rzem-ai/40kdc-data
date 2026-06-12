/**
 * BuilderState ⇄ live-session document mapping (the list-builder counterpart
 * of teams-planner's session-doc, validated by that pilot).
 *
 * Units replicate **keyed by their row key** so concurrent edits to two
 * different units are `set` ops on disjoint paths; row order is a separate
 * whole-array LWW field (losing an ordering race is benign, losing a unit
 * edit is not). `loadout` is a Map in builder state, so units serialize
 * through a JSON twin with entry pairs.
 */
import {
	emptyBuilderState,
	type BattleSize,
	type BuilderState,
	type BuilderUnit,
} from "./data/builder";
import type { DocOp } from "../../../_shared/doc-protocol";

/** A BuilderUnit with the Map lowered to JSON-safe entry pairs. */
export type JsonUnit = Omit<BuilderUnit, "loadout"> & { loadout: [string, number][] };

export interface ListSessionDoc {
	name: string;
	factionId: string | null;
	detachmentIds: string[];
	battleSize: BattleSize;
	disposition: string | null;
	unitsByKey: Record<string, JsonUnit>;
	unitOrder: string[];
}

function toJsonUnit(u: BuilderUnit): JsonUnit {
	return { ...u, loadout: [...u.loadout.entries()] };
}

function fromJsonUnit(u: JsonUnit): BuilderUnit {
	return { ...u, loadout: new Map(u.loadout) };
}

export function builderToSessionDoc(state: BuilderState): ListSessionDoc {
	const unitsByKey: Record<string, JsonUnit> = {};
	for (const u of state.units) unitsByKey[u.key] = toJsonUnit(u);
	return {
		name: state.name,
		factionId: state.factionId,
		detachmentIds: state.detachmentIds,
		battleSize: state.battleSize,
		disposition: state.disposition,
		unitsByKey,
		unitOrder: state.units.map((u) => u.key),
	};
}

/** Back to builder shape. Order keys missing a unit are skipped; units
 *  missing from the order are appended (benign LWW-race artifacts). */
export function sessionDocToBuilder(doc: ListSessionDoc): BuilderState {
	const seen = new Set<string>();
	const units: BuilderUnit[] = [];
	for (const key of doc.unitOrder ?? []) {
		const u = doc.unitsByKey?.[key];
		if (u && !seen.has(key)) {
			units.push(fromJsonUnit(u));
			seen.add(key);
		}
	}
	for (const [key, u] of Object.entries(doc.unitsByKey ?? {})) {
		if (!seen.has(key)) units.push(fromJsonUnit(u));
	}
	const empty = emptyBuilderState();
	return {
		name: doc.name ?? empty.name,
		factionId: doc.factionId ?? null,
		detachmentIds: Array.isArray(doc.detachmentIds) ? doc.detachmentIds : [],
		battleSize: doc.battleSize ?? empty.battleSize,
		disposition: doc.disposition ?? null,
		units,
	};
}

/** Minimal op batch turning `prev` into `next` (unit-key-disjoint paths). */
export function diffListDocs(prev: ListSessionDoc, next: ListSessionDoc): DocOp[] {
	const ops: DocOp[] = [];
	if (prev.name !== next.name) ops.push({ o: "set", p: ["name"], v: next.name });
	if (prev.factionId !== next.factionId) ops.push({ o: "set", p: ["factionId"], v: next.factionId });
	if (prev.battleSize !== next.battleSize) {
		ops.push({ o: "set", p: ["battleSize"], v: next.battleSize });
	}
	if (prev.disposition !== next.disposition) {
		ops.push({ o: "set", p: ["disposition"], v: next.disposition });
	}
	if (JSON.stringify(prev.detachmentIds) !== JSON.stringify(next.detachmentIds)) {
		ops.push({ o: "set", p: ["detachmentIds"], v: next.detachmentIds });
	}
	for (const [key, unit] of Object.entries(next.unitsByKey)) {
		const before = prev.unitsByKey[key];
		if (!before || JSON.stringify(before) !== JSON.stringify(unit)) {
			ops.push({ o: "set", p: ["unitsByKey", key], v: unit });
		}
	}
	for (const key of Object.keys(prev.unitsByKey)) {
		if (!(key in next.unitsByKey)) ops.push({ o: "del", p: ["unitsByKey", key] });
	}
	if (JSON.stringify(prev.unitOrder) !== JSON.stringify(next.unitOrder)) {
		ops.push({ o: "set", p: ["unitOrder"], v: next.unitOrder });
	}
	return ops;
}
