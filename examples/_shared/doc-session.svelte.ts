/**
 * Generic live doc-session client (runes), modeled on shadowboxing's session
 * client but much smaller: the server owns the authoritative document and a
 * welcome always carries it in full, so reconnect = fresh welcome (no
 * snapshot uploads, no digests). The host app supplies two callbacks:
 *
 *  - onDoc(doc): replace local state with the authoritative document
 *    (welcome / reconnect / hard-resync after a rejected batch);
 *  - onRemoteOps(ops): apply a peer's ops to local state.
 *
 * The host sends its own local mutations via sendOps() — already applied
 * locally (optimistic); the server acks rather than echoing, so there is no
 * rebase. Joining is free (the link token is the auth); creation is
 * entitlement-gated by the worker.
 */
import { storedEntitlement } from "./entitlement.svelte";
import { SYNC_URL, type DocKind } from "./sync-api";
import type { DocOp, Participant, ServerMessage } from "./doc-protocol";

const RECONNECT_MIN_MS = 1_000;
const RECONNECT_MAX_MS = 15_000;

export interface DocSessionState {
  status: "idle" | "connecting" | "connected" | "error";
  code: string | null;
  role: "editor" | "viewer" | null;
  participants: Participant[];
  /** Share links for inviting others (set for the creator). */
  editorLink: string | null;
  viewerLink: string | null;
  error: string | null;
  /** True when the last create attempt was refused for lack of entitlement. */
  entitlementRequired: boolean;
}

export const docSession = $state<DocSessionState>({
  status: "idle",
  code: null,
  role: null,
  participants: [],
  editorLink: null,
  viewerLink: null,
  error: null,
  entitlementRequired: false,
});

export interface DocSessionCallbacks {
  onDoc: (doc: unknown) => void;
  onRemoteOps: (ops: DocOp[]) => void;
}

let callbacks: DocSessionCallbacks | null = null;
let ws: WebSocket | null = null;
let connectToken: string | null = null;
let nicknameMemo = "";
let clientSeq = 0;
let reconnectDelay = RECONNECT_MIN_MS;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
/** Deliberate leave — suppresses the reconnect loop. */
let closing = false;

export function registerDocSession(cb: DocSessionCallbacks): void {
  callbacks = cb;
}

function inviteLink(code: string, token: string): string {
  return `${location.origin}${location.pathname}?session=${code}&token=${token}`;
}

/** Create a room seeded with the current document, then join as editor. */
export async function createDocSession(
  kind: DocKind,
  doc: unknown,
  nickname: string,
): Promise<void> {
  const entitlement = storedEntitlement();
  docSession.entitlementRequired = false;
  docSession.error = null;
  if (!entitlement) {
    docSession.entitlementRequired = true;
    return;
  }
  docSession.status = "connecting";
  try {
    const res = await fetch(`${SYNC_URL.replace(/\/$/, "")}/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${entitlement}`,
      },
      body: JSON.stringify({ kind, payload: doc }),
    });
    if (res.status === 401 || res.status === 403) {
      docSession.entitlementRequired = true;
      docSession.status = "idle";
      return;
    }
    if (res.status === 503) {
      docSession.status = "error";
      docSession.error = "All session slots are in use right now — try again soon.";
      return;
    }
    if (!res.ok) throw new Error(`create failed (${res.status})`);
    const { code, editorToken, viewerToken } = (await res.json()) as {
      code: string;
      editorToken: string;
      viewerToken: string;
    };
    docSession.editorLink = inviteLink(code, editorToken);
    docSession.viewerLink = inviteLink(code, viewerToken);
    connect(code, editorToken, nickname);
  } catch (e) {
    docSession.status = "error";
    docSession.error = e instanceof Error ? e.message : "create failed";
  }
}

/** Join an existing room from a code + link token (free — no entitlement). */
export function joinDocSession(code: string, token: string, nickname: string): void {
  docSession.error = null;
  connect(code.toUpperCase(), token, nickname);
}

export function leaveDocSession(): void {
  closing = true;
  if (reconnectTimer) clearTimeout(reconnectTimer);
  reconnectTimer = null;
  ws?.close(1000, "leaving");
  ws = null;
  docSession.status = "idle";
  docSession.code = null;
  docSession.role = null;
  docSession.participants = [];
  docSession.editorLink = null;
  docSession.viewerLink = null;
}

/** Send a locally-applied op batch (editors only; no-op otherwise). */
export function sendOps(ops: DocOp[]): void {
  if (!ws || ws.readyState !== WebSocket.OPEN || docSession.role !== "editor" || ops.length === 0) {
    return;
  }
  clientSeq += 1;
  ws.send(JSON.stringify({ t: "op", clientSeq, ops }));
}

function connect(code: string, token: string, nickname: string): void {
  closing = false;
  connectToken = token;
  nicknameMemo = nickname;
  docSession.status = "connecting";
  docSession.code = code;

  const base = SYNC_URL.replace(/^http/, "ws").replace(/\/$/, "");
  const socket = new WebSocket(`${base}/session/${code}/ws?token=${encodeURIComponent(token)}`);
  ws = socket;

  socket.addEventListener("open", () => {
    socket.send(JSON.stringify({ t: "hello", nickname, lastSeq: 0 }));
  });

  socket.addEventListener("message", (event) => {
    let msg: ServerMessage;
    try {
      msg = JSON.parse(event.data as string) as ServerMessage;
    } catch {
      return;
    }
    if (msg.t === "welcome") {
      docSession.status = "connected";
      docSession.role = msg.role;
      docSession.participants = msg.participants;
      reconnectDelay = RECONNECT_MIN_MS;
      callbacks?.onDoc(msg.doc);
    } else if (msg.t === "op") {
      callbacks?.onRemoteOps(msg.ops);
    } else if (msg.t === "presence") {
      docSession.participants = msg.participants;
    } else if (msg.t === "error") {
      if (msg.code === "bad_ops") {
        // The doc diverged — hard-resync: reconnect for a fresh welcome.
        socket.close(4000, "resync");
      } else if (msg.code === "read_only") {
        docSession.error = "You're viewing this session — ask for an editor link to make changes.";
      }
    }
  });

  socket.addEventListener("close", () => {
    if (ws !== socket) return; // superseded by a newer connect
    ws = null;
    if (closing) return;
    // Drop to connecting and retry with backoff; a fresh welcome restores
    // the exact document, so nothing is lost by reconnecting.
    docSession.status = "connecting";
    reconnectTimer = setTimeout(() => {
      if (!closing && docSession.code && connectToken) {
        connect(docSession.code, connectToken, nicknameMemo);
      }
    }, reconnectDelay);
    reconnectDelay = Math.min(reconnectDelay * 2, RECONNECT_MAX_MS);
  });

  socket.addEventListener("error", () => {
    /* close fires next; the close handler owns retry */
  });
}

/** Parse `?session=CODE&token=UUID` (the invite-link shape). */
export function parseSessionInvite(search: string): { code: string; token: string } | null {
  const params = new URLSearchParams(search);
  const code = params.get("session") ?? "";
  const token = params.get("token") ?? "";
  return /^[A-HJ-NP-Z2-9]{6}$/i.test(code) && token ? { code: code.toUpperCase(), token } : null;
}
