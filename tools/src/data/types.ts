/**
 * The shape of the embedded data bundle: one named array per entity collection.
 *
 * `RawData` is the boundary between the generated JSON-Schema types and the
 * linked view layer. The codegen ({@link file://../codegen-data.ts}) emits a
 * `RAW_DATA: RawData` constant; {@link Dataset} wraps it with linked accessors.
 *
 * @packageDocumentation
 */
import type {
  AbilityDSLEntry,
  DeploymentPattern,
  Detachment,
  Enhancement,
  Faction,
  ForceDisposition,
  GameVersion,
  InteractionFlag,
  LeaderAttachment,
  Mission,
  MissionMatchup,
  PhaseMapping,
  ResourcePool,
  SecondaryCard,
  Stratagem,
  TimingFlag,
  Unit,
  UnitComposition,
  WargearOption,
  Weapon,
} from "../generated.js";

/**
 * Every entity collection in the dataset, keyed by camelCase collection name.
 *
 * Collections with no authored data yet (e.g. `interactionFlags`) are present
 * as empty arrays so the API surface is stable and new data flows through
 * automatically once authored.
 */
export interface RawData {
  units: Unit[];
  weapons: Weapon[];
  factions: Faction[];
  /** Community-authored ability mechanics (key is `ability_id`, not `id`). */
  abilities: AbilityDSLEntry[];
  /** Phase assignments, joined to abilities/stratagems/etc. via `source_id`. */
  phaseMappings: PhaseMapping[];
  detachments: Detachment[];
  stratagems: Stratagem[];
  enhancements: Enhancement[];
  leaderAttachments: LeaderAttachment[];
  unitCompositions: UnitComposition[];
  wargearOptions: WargearOption[];
  gameVersions: GameVersion[];
  missions: Mission[];
  missionMatchups: MissionMatchup[];
  secondaryCards: SecondaryCard[];
  deploymentPatterns: DeploymentPattern[];
  forceDispositions: ForceDisposition[];
  resourcePools: ResourcePool[];
  timingFlags: TimingFlag[];
  interactionFlags: InteractionFlag[];
}

/** A `RawData` with every collection initialised to an empty array. */
export function emptyRawData(): RawData {
  return {
    units: [],
    weapons: [],
    factions: [],
    abilities: [],
    phaseMappings: [],
    detachments: [],
    stratagems: [],
    enhancements: [],
    leaderAttachments: [],
    unitCompositions: [],
    wargearOptions: [],
    gameVersions: [],
    missions: [],
    missionMatchups: [],
    secondaryCards: [],
    deploymentPatterns: [],
    forceDispositions: [],
    resourcePools: [],
    timingFlags: [],
    interactionFlags: [],
  };
}
