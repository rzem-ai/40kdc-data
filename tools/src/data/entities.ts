/**
 * Linked views over the four richly-connected entity types. Each wraps a raw
 * generated record and resolves its relationships lazily against the owning
 * {@link Dataset}; the full underlying record is always available via `.raw`.
 *
 * @packageDocumentation
 */
import type {
  AbilityDSLEntry,
  Faction,
  Phase,
  Unit,
  Weapon,
} from "../generated.js";
import type { Dataset } from "./dataset.js";

/** A unit, linked to its faction, weapons, and abilities. */
export class UnitView {
  constructor(
    /** The full generated `Unit` record. */
    readonly raw: Unit,
    private readonly ds: Dataset,
  ) {}

  get id(): string {
    return this.raw.id;
  }

  get name(): string {
    return this.raw.name;
  }

  /** The unit's faction, or `undefined` if its `faction_id` is unknown. */
  get faction(): FactionView | undefined {
    return this.ds.factions.get(this.raw.faction_id);
  }

  /** Weapons referenced by `weapon_ids`; unresolved ids are skipped. */
  get weapons(): WeaponView[] {
    return resolveAll(this.raw.weapon_ids, (id) => this.ds.weapons.get(id));
  }

  /** Abilities referenced by `ability_ids`; unresolved ids are skipped. */
  get abilities(): AbilityView[] {
    return resolveAll(this.raw.ability_ids, (id) => this.ds.abilities.get(id));
  }
}

/**
 * An ability, linked to the phases it acts in and the units that have it.
 *
 * Phases are not stored on the ability — they live in `phase-mappings` records.
 *
 * @example
 * units.find("Kharn")!.abilities
 *   .filter(a => a.phases.includes("shooting"));
 */
export class AbilityView {
  constructor(
    /** The full generated ability record. */
    readonly raw: AbilityDSLEntry,
    private readonly ds: Dataset,
  ) {}

  /** The ability's id (`ability_id` in the raw record). */
  get id(): string {
    return this.raw.ability_id;
  }

  get name(): string {
    return this.raw.name;
  }

  /** Game phases this ability acts in, unioned across its phase-mappings. */
  get phases(): Phase[] {
    return this.ds.phasesFor("ability", this.raw.ability_id);
  }

  /** Units that list this ability in their `ability_ids`. */
  get units(): UnitView[] {
    return this.ds.unitsWithAbility(this.raw.ability_id);
  }
}

/** A weapon, linked to the units that carry it. */
export class WeaponView {
  constructor(
    /** The full generated `Weapon` record. */
    readonly raw: Weapon,
    private readonly ds: Dataset,
  ) {}

  get id(): string {
    return this.raw.id;
  }

  get name(): string {
    return this.raw.name;
  }

  /** Units that list this weapon in their `weapon_ids`. */
  get units(): UnitView[] {
    return this.ds.unitsWithWeapon(this.raw.id);
  }
}

/** A faction, linked to its units and the records scoped to it. */
export class FactionView {
  constructor(
    /** The full generated `Faction` record. */
    readonly raw: Faction,
    private readonly ds: Dataset,
  ) {}

  get id(): string {
    return this.raw.id;
  }

  get name(): string {
    return this.raw.name;
  }

  /** Units whose `faction_id` is this faction (may be empty for successors). */
  get units(): UnitView[] {
    return this.ds.units.byFaction(this.raw.id);
  }

  /** Faction-scoped abilities (abilities whose `faction_id` is this faction). */
  get abilities(): AbilityView[] {
    return this.ds.abilities.byFaction(this.raw.id);
  }

  /** Distinct weapons carried by this faction's units. */
  get weapons(): WeaponView[] {
    const seen = new Set<string>();
    const out: WeaponView[] = [];
    for (const unit of this.units) {
      for (const weapon of unit.weapons) {
        if (seen.has(weapon.id)) continue;
        seen.add(weapon.id);
        out.push(weapon);
      }
    }
    return out;
  }
}

/** Resolve a list of ids, dropping any that don't resolve. */
function resolveAll<V>(ids: string[] | undefined, get: (id: string) => V | undefined): V[] {
  const out: V[] = [];
  for (const id of ids ?? []) {
    const v = get(id);
    if (v !== undefined) out.push(v);
  }
  return out;
}
