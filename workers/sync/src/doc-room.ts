/**
 * DocRoom — one live shared-editing session over one JSON document (a team
 * plan or an army list), mirroring shadowboxing's SessionRoom seq/ack shape
 * but doc-generic and deliberately simpler: the room itself holds and
 * mutates the authoritative document, so a welcome always carries the exact
 * full doc (no client checkpoints, no digest/heal machinery).
 *
 * Flow: POST /session creates the room with the creator's current doc and
 * returns role-scoped link tokens; clients connect over WebSocket with a
 * token, say hello, and get a welcome (full doc + seq). Editor op batches
 * are validated + applied server-side under a total order: the sender gets
 * an ack, everyone else gets the ops. Any rejected batch tells the client to
 * hard-resync (reconnect → fresh welcome).
 *
 * Uses the WebSocket hibernation API so an idle-but-connected room costs
 * nothing between messages; an alarm evicts rooms idle past the TTL and
 * releases their registry slot.
 */
import { DurableObject } from "cloudflare:workers";
import { applyDocOps, OpError } from "./apply-ops";
import type { ClientMessage, Participant, ServerMessage } from "./doc-protocol";
import type { SyncRegistry, SyncRegistryEnv } from "./sync-registry";

export interface DocRoomEnv extends SyncRegistryEnv {
  SYNC_REGISTRY: DurableObjectNamespace<SyncRegistry>;
  MAX_EDITORS?: string;
  MAX_VIEWERS?: string;
}

const DEFAULT_MAX_EDITORS = 10;
const DEFAULT_MAX_VIEWERS = 20;
const DEFAULT_TTL_MINUTES = 120;
const MAX_NICKNAME_LEN = 40;

/** Per-socket state, persisted via serializeAttachment so it survives
 *  hibernation. */
interface SocketInfo {
  participantId: string;
  nickname: string;
  role: "editor" | "viewer";
  /** Welcome sent (hello received) — ops are ignored before that. */
  ready: boolean;
}

export class DocRoom extends DurableObject<DocRoomEnv> {
  constructor(ctx: DurableObjectState, env: DocRoomEnv) {
    super(ctx, env);
    ctx.blockConcurrencyWhile(async () => {
      this.ctx.storage.sql.exec(`
        CREATE TABLE IF NOT EXISTS meta (
          k TEXT PRIMARY KEY,
          v TEXT NOT NULL
        );
      `);
    });
  }

  private readMeta(k: string): string | null {
    const row = this.ctx.storage.sql
      .exec<{ v: string }>("SELECT v FROM meta WHERE k = ?", k)
      .toArray()[0];
    return row ? row.v : null;
  }

  private writeMeta(k: string, v: string): void {
    this.ctx.storage.sql.exec(
      "INSERT INTO meta (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v",
      k,
      v,
    );
  }

  private ttlMs(): number {
    return Number(this.env.DOC_SESSION_TTL_MINUTES ?? DEFAULT_TTL_MINUTES) * 60_000;
  }

  private touch(): void {
    this.writeMeta("last_activity", String(Date.now()));
  }

  /** Initialize the room (idempotent guard: a second init on a live code is
   *  refused so a code collision can't clobber a session). Returns the
   *  role-scoped connect tokens. */
  async init(
    code: string,
    kind: string,
    doc: unknown,
  ): Promise<{ editorToken: string; viewerToken: string } | null> {
    if (this.readMeta("code") !== null) return null;
    const editorToken = crypto.randomUUID();
    const viewerToken = crypto.randomUUID();
    this.writeMeta("code", code);
    this.writeMeta("kind", kind);
    this.writeMeta("doc", JSON.stringify(doc));
    this.writeMeta("seq", "0");
    this.writeMeta("editor_token", editorToken);
    this.writeMeta("viewer_token", viewerToken);
    this.touch();
    await this.ctx.storage.setAlarm(Date.now() + this.ttlMs());
    return { editorToken, viewerToken };
  }

  /** WebSocket upgrade (?token=…). The worker routes /session/:code/ws here. */
  async fetch(request: Request): Promise<Response> {
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("expected websocket", { status: 426 });
    }
    if (this.readMeta("code") === null) {
      return new Response("no such session", { status: 404 });
    }
    const token = new URL(request.url).searchParams.get("token") ?? "";
    const role: "editor" | "viewer" | null =
      token && token === this.readMeta("editor_token")
        ? "editor"
        : token && token === this.readMeta("viewer_token")
          ? "viewer"
          : null;
    if (!role) return new Response("bad token", { status: 403 });

    const counts = this.roleCounts();
    if (role === "editor" && counts.editors >= Number(this.env.MAX_EDITORS ?? DEFAULT_MAX_EDITORS)) {
      return new Response("room full", { status: 503 });
    }
    if (role === "viewer" && counts.viewers >= Number(this.env.MAX_VIEWERS ?? DEFAULT_MAX_VIEWERS)) {
      return new Response("room full", { status: 503 });
    }

    const pair = new WebSocketPair();
    const [client, server] = [pair[0], pair[1]];
    this.ctx.acceptWebSocket(server);
    const info: SocketInfo = {
      participantId: crypto.randomUUID(),
      nickname: "",
      role,
      ready: false,
    };
    server.serializeAttachment(info);
    this.touch();
    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws: WebSocket, raw: string | ArrayBuffer): Promise<void> {
    if (typeof raw !== "string" || raw.length > 512 * 1024) {
      this.send(ws, { t: "error", code: "bad_message", message: "malformed message" });
      return;
    }
    let msg: ClientMessage;
    try {
      msg = JSON.parse(raw) as ClientMessage;
    } catch {
      this.send(ws, { t: "error", code: "bad_message", message: "malformed message" });
      return;
    }
    const info = ws.deserializeAttachment() as SocketInfo;
    this.touch();

    if (msg.t === "hello") {
      info.nickname = (msg.nickname ?? "").slice(0, MAX_NICKNAME_LEN).trim() || "anonymous";
      info.ready = true;
      ws.serializeAttachment(info);
      this.send(ws, {
        t: "welcome",
        participantId: info.participantId,
        role: info.role,
        kind: this.readMeta("kind") ?? "",
        doc: JSON.parse(this.readMeta("doc") ?? "null"),
        seq: Number(this.readMeta("seq") ?? "0"),
        participants: this.participants(),
      });
      this.broadcastPresence(ws);
      return;
    }

    if (msg.t === "op") {
      if (!info.ready) return;
      if (info.role !== "editor") {
        // Viewers' writes are dropped with an explicit error, never applied.
        this.send(ws, { t: "error", code: "read_only", message: "viewers cannot edit" });
        return;
      }
      let nextDoc: unknown;
      try {
        nextDoc = applyDocOps(JSON.parse(this.readMeta("doc") ?? "null"), msg.ops);
      } catch (e) {
        // Reject atomically; the client hard-resyncs (reconnect → welcome).
        const message = e instanceof OpError ? e.message : "apply failed";
        this.send(ws, { t: "error", code: "bad_ops", message });
        return;
      }
      const seq = Number(this.readMeta("seq") ?? "0") + 1;
      this.writeMeta("doc", JSON.stringify(nextDoc));
      this.writeMeta("seq", String(seq));
      this.send(ws, { t: "ack", clientSeq: msg.clientSeq, seq });
      for (const peer of this.ctx.getWebSockets()) {
        if (peer === ws) continue;
        const peerInfo = peer.deserializeAttachment() as SocketInfo | null;
        if (!peerInfo?.ready) continue;
        this.send(peer, { t: "op", seq, ops: msg.ops, from: info.participantId });
      }
    }
  }

  async webSocketClose(ws: WebSocket): Promise<void> {
    this.broadcastPresence(ws);
  }

  async webSocketError(ws: WebSocket): Promise<void> {
    this.broadcastPresence(ws);
  }

  /** Idle eviction: TTL past the last activity, drop everything and release
   *  the registry slot; otherwise re-arm for the remainder. */
  async alarm(): Promise<void> {
    const last = Number(this.readMeta("last_activity") ?? "0");
    const idleFor = Date.now() - last;
    if (idleFor < this.ttlMs()) {
      await this.ctx.storage.setAlarm(Date.now() + (this.ttlMs() - idleFor));
      return;
    }
    const code = this.readMeta("code");
    for (const ws of this.ctx.getWebSockets()) {
      try {
        ws.close(1001, "session expired");
      } catch {
        /* already gone */
      }
    }
    await this.ctx.storage.deleteAll();
    if (code) {
      await this.env.SYNC_REGISTRY.get(this.env.SYNC_REGISTRY.idFromName("global")).release(code);
    }
  }

  // ── helpers ─────────────────────────────────────────────────────────────────

  private send(ws: WebSocket, msg: ServerMessage): void {
    try {
      ws.send(JSON.stringify(msg));
    } catch {
      /* socket already closing — presence will catch up */
    }
  }

  private participants(): Participant[] {
    const out: Participant[] = [];
    for (const ws of this.ctx.getWebSockets()) {
      const info = ws.deserializeAttachment() as SocketInfo | null;
      if (info?.ready) {
        out.push({ id: info.participantId, nickname: info.nickname, role: info.role });
      }
    }
    return out;
  }

  private roleCounts(): { editors: number; viewers: number } {
    let editors = 0;
    let viewers = 0;
    for (const ws of this.ctx.getWebSockets()) {
      const info = ws.deserializeAttachment() as SocketInfo | null;
      if (info?.role === "editor") editors++;
      else if (info?.role === "viewer") viewers++;
    }
    return { editors, viewers };
  }

  /** Push the current roster to everyone except `except` (the socket whose
   *  own join/leave triggered the change gets its roster via welcome). */
  private broadcastPresence(except?: WebSocket): void {
    const participants = this.participants();
    for (const ws of this.ctx.getWebSockets()) {
      if (ws === except) continue;
      const info = ws.deserializeAttachment() as SocketInfo | null;
      if (!info?.ready) continue;
      this.send(ws, { t: "presence", participants });
    }
  }
}
