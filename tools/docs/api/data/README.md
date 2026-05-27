[**@alpaca-software/40kdc-data**](../README.md)

***

[@alpaca-software/40kdc-data](../README.md) / data

# data

The linked, typed 40kdc dataset.

The default [dataset](variables/dataset.md) is built once from the data embedded in this
package; the top-level collections below are its accessors, re-exported for
the ergonomic one-liner form.

## Examples

```ts
import { units } from "@alpaca-software/40kdc-data";

units.find("Kharn")!.abilities
  .filter(a => a.phases.includes("shooting"))
  .map(a => a.id); // ["berzerker-frenzy"]
```

```ts
import { factions } from "@alpaca-software/40kdc-data";

factions.find("World Eaters")!.units.length;
```

## Classes

- [Collection](classes/Collection.md)
- [Dataset](classes/Dataset.md)
- [UnitView](classes/UnitView.md)
- [AbilityView](classes/AbilityView.md)
- [WeaponView](classes/WeaponView.md)
- [FactionView](classes/FactionView.md)

## Interfaces

- [CollectionConfig](interfaces/CollectionConfig.md)
- [RawData](interfaces/RawData.md)

## Variables

- [dataset](variables/dataset.md)
- [units](variables/units.md)
- [weapons](variables/weapons.md)
- [factions](variables/factions.md)
- [abilities](variables/abilities.md)
- [detachments](variables/detachments.md)
- [enhancements](variables/enhancements.md)
- [stratagems](variables/stratagems.md)
- [wargearOptions](variables/wargearOptions.md)
- [missions](variables/missions.md)
- [missionMatchups](variables/missionMatchups.md)
- [secondaryCards](variables/secondaryCards.md)
- [deploymentPatterns](variables/deploymentPatterns.md)
- [forceDispositions](variables/forceDispositions.md)
- [resourcePools](variables/resourcePools.md)

## Functions

- [normalizeName](functions/normalizeName.md)
- [emptyRawData](functions/emptyRawData.md)
