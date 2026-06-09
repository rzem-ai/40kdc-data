/**
 * The embedded 40kdc dataset, used *only* to populate the units multiselect in
 * the notes panel.
 *
 * Note this ends the tracer's former "type-only import" property — pulling
 * `Dataset.embedded()` bakes the embedded data into the bundle. That is
 * intentional: the notes are author scratch context, not part of the export.
 * Nothing here reaches `export.ts`; the hull-shape JSON stays geometry-only.
 */
import { Dataset } from "@alpaca-software/40kdc-data";
import type { NoteUnit } from "./notes.js";

export const ds: Dataset = Dataset.embedded();

/**
 * Flat, name-sorted list of every unit as a {@link NoteUnit}. Computed once at
 * module load (the dataset is immutable) so the picker can search/group without
 * re-walking the collection on each keystroke.
 */
export const UNIT_OPTIONS: NoteUnit[] = ds.units.all
  .map((u) => ({ id: u.id, name: u.name, faction: u.faction?.name }))
  .sort((a, b) => a.name.localeCompare(b.name));
