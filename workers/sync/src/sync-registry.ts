/**
 * Global live-session registry — the hard ceiling on DocRoom spend, cloned
 * from shadowboxing's SessionRegistry cap mechanism (no keys/admin/digest:
 * identity lives at keys.alpacasoft.dev and alerts are a later hardening).
 *
 * One singleton instance (`getByName("global")`) counts active rooms.
 * Creation past MAX_DOC_SESSIONS is refused cleanly; registrations carry a
 * timestamp and a sweep drops entries older than the room TTL so a crashed
 * room can't leak its slot forever.
 */
import { DurableObject } from "cloudflare:workers";

export interface SyncRegistryEnv {
  MAX_DOC_SESSIONS?: string;
  DOC_SESSION_TTL_MINUTES?: string;
}

const DEFAULT_MAX_SESSIONS = 20;
const DEFAULT_TTL_MINUTES = 120;
const SWEEP_SLACK_MS = 30 * 60_000;

export class SyncRegistry extends DurableObject<SyncRegistryEnv> {
  constructor(ctx: DurableObjectState, env: SyncRegistryEnv) {
    super(ctx, env);
    ctx.blockConcurrencyWhile(async () => {
      this.ctx.storage.sql.exec(`
        CREATE TABLE IF NOT EXISTS active (
          code TEXT PRIMARY KEY,
          created_at INTEGER NOT NULL
        );
      `);
    });
  }

  private maxSessions(): number {
    return Number(this.env.MAX_DOC_SESSIONS ?? DEFAULT_MAX_SESSIONS);
  }

  private sweepHorizonMs(): number {
    return Number(this.env.DOC_SESSION_TTL_MINUTES ?? DEFAULT_TTL_MINUTES) * 60_000 + SWEEP_SLACK_MS;
  }

  /** Try to register a new room. False = at capacity (creation must fail). */
  async tryAcquire(code: string): Promise<boolean> {
    const now = Date.now();
    this.ctx.storage.sql.exec("DELETE FROM active WHERE created_at < ?", now - this.sweepHorizonMs());
    const count = this.ctx.storage.sql
      .exec<{ n: number }>("SELECT COUNT(*) AS n FROM active")
      .toArray()[0].n;
    if (count >= this.maxSessions()) return false;
    this.ctx.storage.sql.exec(
      "INSERT INTO active (code, created_at) VALUES (?, ?) ON CONFLICT(code) DO UPDATE SET created_at = excluded.created_at",
      code,
      now,
    );
    return true;
  }

  /** Release a room's slot (idle eviction or explicit end). */
  async release(code: string): Promise<void> {
    this.ctx.storage.sql.exec("DELETE FROM active WHERE code = ?", code);
  }

  /** Current active-room count (ops/tests). */
  async activeCount(): Promise<number> {
    return this.ctx.storage.sql
      .exec<{ n: number }>("SELECT COUNT(*) AS n FROM active")
      .toArray()[0].n;
  }
}
