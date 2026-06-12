/**
 * TeamPlan ⇄ live-session document mapping.
 *
 * In a shared session the plan is replicated as an **id-keyed** shape —
 * `playersById` + a separate `playerOrder` — so concurrent edits to two
 * different players are `set` ops on disjoint paths (they commute under the
 * server order), instead of array-index ops that land on the wrong row after
 * a concurrent insert/remove. Order changes are whole-array LWW: losing an
 * ordering race is benign, losing a player edit is not.
 */
import type { Player, TeamPlan } from "./coverage";
import type { DocOp } from "../../../_shared/doc-protocol";

export interface SessionDoc {
  teamName: string;
  size: TeamPlan["size"];
  playersById: Record<string, Player>;
  playerOrder: string[];
}

export function planToSessionDoc(plan: TeamPlan): SessionDoc {
  const playersById: Record<string, Player> = {};
  for (const p of plan.players) playersById[p.id] = p;
  return {
    teamName: plan.teamName,
    size: plan.size,
    playersById,
    playerOrder: plan.players.map((p) => p.id),
  };
}

/** Back to the array shape. Order ids missing a player row are skipped, and
 *  players missing from the order are appended (LWW races can briefly leave
 *  either) — callers still run the result through sanitizePlan. */
export function sessionDocToPlan(doc: SessionDoc): TeamPlan {
  const seen = new Set<string>();
  const players: Player[] = [];
  for (const id of doc.playerOrder ?? []) {
    const p = doc.playersById?.[id];
    if (p && !seen.has(id)) {
      players.push(p);
      seen.add(id);
    }
  }
  for (const [id, p] of Object.entries(doc.playersById ?? {})) {
    if (!seen.has(id)) players.push(p);
  }
  return { teamName: doc.teamName ?? "", size: doc.size ?? 5, players };
}

/** Does this cloud payload carry the id-keyed session shape? (A doc that has
 *  been live-edited is stored session-shaped; uploads are storage-shaped.) */
export function isSessionShaped(payload: unknown): payload is SessionDoc {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "playersById" in payload &&
    typeof (payload as { playersById: unknown }).playersById === "object"
  );
}

/** Normalize any cloud payload (storage- or session-shaped) toward the
 *  TeamPlan storage shape. Callers still run the result through
 *  sanitizePlan — this only bridges the shape divide. */
export function fromCloudPayload(payload: unknown): unknown {
  return isSessionShaped(payload) ? sessionDocToPlan(payload) : payload;
}

/** The storage/interop shape for snapshot shortlinks (which must stay
 *  pasteable across apps even after the doc was live-edited). */
export function toSnapshotPayload(payload: unknown): unknown {
  return fromCloudPayload(payload);
}

/** Minimal op batch turning `prev` into `next`: per-player set/del on
 *  disjoint id paths, whole-value sets for the scalars and the order. */
export function diffSessionDocs(prev: SessionDoc, next: SessionDoc): DocOp[] {
  const ops: DocOp[] = [];
  if (prev.teamName !== next.teamName) ops.push({ o: "set", p: ["teamName"], v: next.teamName });
  if (prev.size !== next.size) ops.push({ o: "set", p: ["size"], v: next.size });

  for (const [id, player] of Object.entries(next.playersById)) {
    const before = prev.playersById[id];
    if (!before || JSON.stringify(before) !== JSON.stringify(player)) {
      ops.push({ o: "set", p: ["playersById", id], v: player });
    }
  }
  for (const id of Object.keys(prev.playersById)) {
    if (!(id in next.playersById)) ops.push({ o: "del", p: ["playersById", id] });
  }
  if (JSON.stringify(prev.playerOrder) !== JSON.stringify(next.playerOrder)) {
    ops.push({ o: "set", p: ["playerOrder"], v: next.playerOrder });
  }
  return ops;
}
