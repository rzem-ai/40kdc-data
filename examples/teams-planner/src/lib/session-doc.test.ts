/** Session-doc mapping: round-trips, minimal diffs on id-disjoint paths, and
 *  convergence of the diff→apply loop (what the live session actually runs). */
import { describe, expect, it } from "vitest";
import { applyDocOps } from "../../../_shared/doc-protocol";
import {
  diffSessionDocs,
  fromCloudPayload,
  isSessionShaped,
  planToSessionDoc,
  sessionDocToPlan,
  toSnapshotPayload,
  type SessionDoc,
} from "./session-doc";
import type { Player, TeamPlan } from "./coverage";

function player(id: string, name: string): Player {
  return { id, name, factionIds: [], armies: [], preferences: [], locked: {} };
}

const plan: TeamPlan = {
  teamName: "Crusaders",
  size: 5,
  players: [player("p1", "Alice"), player("p2", "Bob")],
};

describe("planToSessionDoc / sessionDocToPlan", () => {
  it("round-trips a plan preserving order", () => {
    const doc = planToSessionDoc(plan);
    expect(doc.playerOrder).toEqual(["p1", "p2"]);
    expect(sessionDocToPlan(doc)).toEqual(plan);
  });

  it("tolerates LWW-race artifacts: dangling order ids and orphan players", () => {
    const doc = planToSessionDoc(plan);
    const raced: SessionDoc = {
      ...doc,
      playerOrder: ["ghost", "p2", "p1", "p2"],
      playersById: { ...doc.playersById, p3: player("p3", "Cara") },
    };
    const restored = sessionDocToPlan(raced);
    expect(restored.players.map((p) => p.id)).toEqual(["p2", "p1", "p3"]);
  });
});

describe("diffSessionDocs", () => {
  it("emits nothing for identical docs", () => {
    const doc = planToSessionDoc(plan);
    expect(diffSessionDocs(doc, planToSessionDoc(plan))).toEqual([]);
  });

  it("touches only the changed player's path", () => {
    const prev = planToSessionDoc(plan);
    const next = planToSessionDoc({
      ...plan,
      players: [player("p1", "Alicia"), player("p2", "Bob")],
    });
    const ops = diffSessionDocs(prev, next);
    expect(ops).toEqual([{ o: "set", p: ["playersById", "p1"], v: player("p1", "Alicia") }]);
  });

  it("diff→apply converges (the live-session loop invariant)", () => {
    const prev = planToSessionDoc(plan);
    const next = planToSessionDoc({
      teamName: "Despoilers",
      size: 8,
      players: [player("p2", "Bob"), player("p3", "Cara")],
    });
    const applied = applyDocOps(prev, diffSessionDocs(prev, next)) as SessionDoc;
    expect(applied).toEqual(next);
    // And a second diff is empty — no oscillation between peers.
    expect(diffSessionDocs(applied, next)).toEqual([]);
  });

  it("concurrent edits to different players commute under any order", () => {
    const base = planToSessionDoc(plan);
    const aliceEdit = diffSessionDocs(
      base,
      planToSessionDoc({ ...plan, players: [player("p1", "Alicia"), player("p2", "Bob")] }),
    );
    const bobEdit = diffSessionDocs(
      base,
      planToSessionDoc({ ...plan, players: [player("p1", "Alice"), player("p2", "Bobby")] }),
    );
    const ab = applyDocOps(applyDocOps(base, aliceEdit), bobEdit) as SessionDoc;
    const ba = applyDocOps(applyDocOps(base, bobEdit), aliceEdit) as SessionDoc;
    expect(ab).toEqual(ba);
    expect(ab.playersById.p1.name).toBe("Alicia");
    expect(ab.playersById.p2.name).toBe("Bobby");
  });
});

describe("cloud payload shape bridge", () => {
  it("detects session-shaped payloads and converts them to the plan shape", () => {
    const doc = planToSessionDoc(plan);
    expect(isSessionShaped(doc)).toBe(true);
    expect(isSessionShaped(plan)).toBe(false);
    expect(fromCloudPayload(doc)).toEqual(plan);
  });

  it("passes storage-shaped and garbage payloads through untouched", () => {
    expect(fromCloudPayload(plan)).toBe(plan);
    expect(fromCloudPayload(null)).toBe(null);
    expect(fromCloudPayload("junk")).toBe("junk");
    expect(fromCloudPayload({ unrelated: true })).toEqual({ unrelated: true });
  });

  it("snapshot export always yields the storage/interop shape", () => {
    // A live-edited doc (session shape) and a plain upload both export the
    // same plan — what a cross-app shortlink consumer expects.
    expect(toSnapshotPayload(planToSessionDoc(plan))).toEqual(plan);
    expect(toSnapshotPayload(plan)).toBe(plan);
  });

  it("round-trips: plan → session → cloud → plan", () => {
    expect(fromCloudPayload(planToSessionDoc(plan))).toEqual(plan);
  });
});
