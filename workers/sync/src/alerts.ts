/**
 * Discord webhook alerts (optional — silently a no-op without the secret).
 * Ported from shadowboxing's session-worker alerts: fire-and-forget, an
 * alerting failure must never fail the request that triggered it.
 */

export interface AlertsEnv {
  DISCORD_WEBHOOK_URL?: string;
}

export async function sendDiscordAlert(env: AlertsEnv, lines: string[]): Promise<void> {
  if (!env.DISCORD_WEBHOOK_URL) return;
  try {
    await fetch(env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: lines.join("\n") }),
    });
  } catch {
    // Alerting is best-effort by design.
  }
}
