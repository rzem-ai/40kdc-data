/** List session-doc mapping: Map round-trips, key-disjoint diffs, and
 *  convergence of the diff→apply loop (what the live session runs). */
import { describe, expect, it } from "vitest";
import { applyDocOps } from "../../../_shared/doc-protocol";
import {
	builderToSessionDoc,
	diffListDocs,
	fromCloudPayload,
	isSessionShaped,
	sessionDocToBuilder,
	toSnapshotPayload,
	type ListSessionDoc,
} from "./session-doc";
import type { BuilderState, BuilderUnit } from "./data/builder";

function unit(key: string, datasheetId: string, loadout: [string, number][] = []): BuilderUnit {
	return { key, datasheetId, modelCount: 5, loadout: new Map(loadout) } as BuilderUnit;
}

const state: BuilderState = {
	name: "Eightbound Rush",
	factionId: "world-eaters",
	detachmentIds: ["berzerker-warband"],
	battleSize: "strike-force",
	disposition: null,
	units: [
		unit("u0-aaaa", "khorne-berzerkers", [["chainblade", 9]]),
		unit("u1-aaaa", "eightbound"),
	],
};

describe("builderToSessionDoc / sessionDocToBuilder", () => {
	it("round-trips including the loadout Map", () => {
		const doc = builderToSessionDoc(state);
		expect(doc.unitOrder).toEqual(["u0-aaaa", "u1-aaaa"]);
		const back = sessionDocToBuilder(doc);
		expect(back.name).toBe("Eightbound Rush");
		expect(back.units[0].loadout).toBeInstanceOf(Map);
		expect(back.units[0].loadout.get("chainblade")).toBe(9);
		// Full structural equality once Maps are lowered the same way.
		expect(builderToSessionDoc(back)).toEqual(doc);
	});

	it("tolerates LWW-race artifacts: dangling order keys and orphan units", () => {
		const doc = builderToSessionDoc(state);
		const raced: ListSessionDoc = {
			...doc,
			unitOrder: ["ghost", "u1-aaaa", "u0-aaaa", "u1-aaaa"],
			unitsByKey: {
				...doc.unitsByKey,
				"u0-bbbb": { ...doc.unitsByKey["u0-aaaa"], key: "u0-bbbb" },
			},
		};
		const restored = sessionDocToBuilder(raced);
		expect(restored.units.map((u) => u.key)).toEqual(["u1-aaaa", "u0-aaaa", "u0-bbbb"]);
	});
});

describe("diffListDocs", () => {
	it("emits nothing for identical docs and only the touched unit's path otherwise", () => {
		const prev = builderToSessionDoc(state);
		expect(diffListDocs(prev, builderToSessionDoc(state))).toEqual([]);

		const edited: BuilderState = {
			...state,
			units: [unit("u0-aaaa", "khorne-berzerkers", [["chainblade", 10]]), state.units[1]],
		};
		const ops = diffListDocs(prev, builderToSessionDoc(edited));
		expect(ops).toHaveLength(1);
		expect(ops[0]).toMatchObject({ o: "set", p: ["unitsByKey", "u0-aaaa"] });
	});

	it("diff→apply converges and a second diff is empty", () => {
		const prev = builderToSessionDoc(state);
		const next = builderToSessionDoc({
			...state,
			name: "Renamed",
			detachmentIds: ["vessels-of-wrath"],
			units: [state.units[1], unit("u2-cccc", "lord-invocatus")],
		});
		const applied = applyDocOps(prev, diffListDocs(prev, next)) as ListSessionDoc;
		expect(applied).toEqual(next);
		expect(diffListDocs(applied, next)).toEqual([]);
	});

	it("concurrent edits to different units commute under any order", () => {
		const base = builderToSessionDoc(state);
		const editA = diffListDocs(
			base,
			builderToSessionDoc({
				...state,
				units: [unit("u0-aaaa", "khorne-berzerkers", [["chainblade", 10]]), state.units[1]],
			}),
		);
		const editB = diffListDocs(
			base,
			builderToSessionDoc({
				...state,
				units: [state.units[0], { ...unit("u1-aaaa", "eightbound"), modelCount: 6 } as BuilderUnit],
			}),
		);
		const ab = applyDocOps(applyDocOps(base, editA), editB) as ListSessionDoc;
		const ba = applyDocOps(applyDocOps(base, editB), editA) as ListSessionDoc;
		expect(ab).toEqual(ba);
		expect(ab.unitsByKey["u0-aaaa"].loadout).toEqual([["chainblade", 10]]);
		expect(ab.unitsByKey["u1-aaaa"].modelCount).toBe(6);
	});
});

describe("cloud payload shape bridge", () => {
	it("detects session-shaped payloads", () => {
		expect(isSessionShaped(builderToSessionDoc(state))).toBe(true);
		expect(isSessionShaped({ faction_id: "world-eaters", units: [] })).toBe(false);
		expect(isSessionShaped(null)).toBe(false);
		expect(isSessionShaped("junk")).toBe(false);
	});

	it("passes roster-json and garbage payloads through untouched", () => {
		const roster = { faction_id: "world-eaters", detachments: [], units: [] };
		expect(fromCloudPayload(roster)).toBe(roster);
		expect(fromCloudPayload(null)).toBe(null);
		expect(fromCloudPayload("junk")).toBe("junk");
	});

	it("lowers a session doc to canonical roster-json for snapshots", () => {
		const out = toSnapshotPayload(builderToSessionDoc(state)) as Record<string, unknown>;
		// The interop shape a shortlink consumer (or shadowboxing paste) eats —
		// never the id-keyed session shape.
		expect(isSessionShaped(out)).toBe(false);
		expect(Array.isArray(out.units)).toBe(true);
		expect((out.units as unknown[]).length).toBe(2);
		expect(Array.isArray(out.detachments)).toBe(true);
	});
});
