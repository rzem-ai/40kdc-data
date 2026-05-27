/**
 * Orchestrates a ListForge import: decode → parse → resolve.
 *
 * @packageDocumentation
 */
import { Dataset } from "../data/dataset.js";
import { selectAdapter } from "./adapter.js";
import { decodeListForge } from "./decode.js";
import { listForgeAdapter } from "./listforge.js";
import { resolve } from "./resolve.js";
import type { Roster } from "./types.js";

/** Adapters available to {@link importRoster}, in match-priority order. */
const ADAPTERS = [listForgeAdapter];

export interface ImportOptions {
  /** Dataset to resolve against. Defaults to the package's embedded dataset. */
  dataset?: Dataset;
}

/**
 * Import a ListForge army-list export into a resolved 40kdc {@link Roster}.
 *
 * `input` may be a full ListForge URL, a bare base64 segment, or an
 * already-decoded JSON string — all are handled transparently.
 */
export function importListForge(input: string, opts: ImportOptions = {}): Roster {
  const decoded = decodeListForge(input);
  return importRoster(decoded, opts);
}

/**
 * Import an already-decoded payload. Selects the matching format adapter and
 * resolves the result against the dataset.
 */
export function importRoster(decoded: unknown, opts: ImportOptions = {}): Roster {
  const ds = opts.dataset ?? Dataset.embedded();
  const adapter = selectAdapter(decoded, ADAPTERS);
  const parsed = adapter.parse(decoded);
  return resolve(parsed, ds);
}
