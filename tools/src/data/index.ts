/**
 * The linked, typed 40kdc dataset.
 *
 * The default {@link dataset} is built once from the data embedded in this
 * package; the top-level collections below are its accessors, re-exported for
 * the ergonomic one-liner form.
 *
 * @packageDocumentation
 *
 * @example
 * import { units } from "@alpaca-software/40kdc-data";
 *
 * units.find("Kharn")!.abilities
 *   .filter(a => a.phases.includes("shooting"))
 *   .map(a => a.id); // ["berzerker-frenzy"]
 *
 * @example
 * import { factions } from "@alpaca-software/40kdc-data";
 *
 * factions.find("World Eaters")!.units.length;
 */
export { Dataset } from "./dataset.js";
export { Collection } from "./collection.js";
export type { CollectionConfig } from "./collection.js";
export { UnitView, AbilityView, WeaponView, FactionView } from "./entities.js";
export { normalizeName } from "./normalize.js";
export { emptyRawData } from "./types.js";
export type { RawData } from "./types.js";

import { Dataset } from "./dataset.js";

/** The dataset built from this package's embedded data. */
export const dataset = Dataset.embedded();

/** All units, linked to their faction, weapons, and abilities. */
export const units = dataset.units;
/** All weapons, linked to the units that carry them. */
export const weapons = dataset.weapons;
/** All factions, linked to their units, abilities, and weapons. */
export const factions = dataset.factions;
/** All abilities, linked to their phases and the units that have them. */
export const abilities = dataset.abilities;
/** All detachments. */
export const detachments = dataset.detachments;
/** All enhancements. */
export const enhancements = dataset.enhancements;
/** All stratagems. */
export const stratagems = dataset.stratagems;
/** All wargear options. */
export const wargearOptions = dataset.wargearOptions;
/** All missions. */
export const missions = dataset.missions;
/** All mission matchups. */
export const missionMatchups = dataset.missionMatchups;
/** All secondary mission cards. */
export const secondaryCards = dataset.secondaryCards;
/** All deployment patterns. */
export const deploymentPatterns = dataset.deploymentPatterns;
/** All force dispositions. */
export const forceDispositions = dataset.forceDispositions;
/** All resource pools. */
export const resourcePools = dataset.resourcePools;
