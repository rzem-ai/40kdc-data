/**
 * Builds the human/LLM-readable notes block for a trace.
 *
 * This is deliberately separate from `export.ts`: the hull-shape JSON is a
 * geometry-only artifact (the IP firewall), whereas these notes are scratch
 * context an author assembles to hand to an LLM — which units share the hull,
 * plus freeform remarks. None of this is written into the exported entity.
 */

/** A unit the author has tagged as sharing this hull. */
export interface NoteUnit {
  id: string;
  name: string;
  /** Faction display name, when the unit links to one. */
  faction?: string;
}

export interface BuildNotesInput {
  /** Hull display name, as typed in the Export panel (may be blank). */
  name: string;
  /** Hull entity id, as typed in the Export panel (may be blank). */
  id: string;
  /** Live bounds in inches, or null before the trace is measurable. */
  bounds: { width: number; height: number } | null;
  /** Tagged units, in selection order. */
  units: readonly NoteUnit[];
  /** Freeform author remarks (may be blank). */
  freeform: string;
}

const BOUNDS_DP = 2;

/**
 * Assemble the notes as a plain-text block. Sections with no content are
 * omitted, so an empty input yields an empty string and a partially-filled one
 * never emits dangling headers. Output is stable (no timestamps / ordering
 * nondeterminism) so it is straightforward to test.
 */
export function buildNotes(input: BuildNotesInput): string {
  const { name, id, bounds, units, freeform } = input;
  const lines: string[] = [];

  // Blank-line separator before a new block — but only once there is prior
  // content, so the output never starts (or doubles up) on an empty line.
  const separate = (): void => {
    if (lines.length > 0) lines.push("");
  };

  const trimmedName = name.trim();
  const trimmedId = id.trim();
  if (trimmedName || trimmedId) {
    const label = trimmedName || "(unnamed)";
    lines.push(trimmedId ? `Hull shape: ${label} (${trimmedId})` : `Hull shape: ${label}`);
  }

  if (bounds) {
    lines.push(
      `Bounds: ${bounds.width.toFixed(BOUNDS_DP)}″ × ${bounds.height.toFixed(BOUNDS_DP)}″`,
    );
  }

  if (units.length > 0) {
    separate();
    lines.push("Used by:");
    for (const u of units) {
      const suffix = u.faction ? ` — ${u.faction}` : "";
      lines.push(`- ${u.name} (${u.id})${suffix}`);
    }
  }

  const trimmedFree = freeform.trim();
  if (trimmedFree) {
    separate();
    lines.push("Notes:", trimmedFree);
  }

  return lines.join("\n");
}
