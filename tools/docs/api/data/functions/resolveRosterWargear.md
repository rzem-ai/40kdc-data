[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / resolveRosterWargear

# Function: resolveRosterWargear()

> **resolveRosterWargear**(`wargear`, `dataset`): `object`[]

Defined in: [data/roster-resolve.ts:38](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/roster-resolve.ts#L38)

Resolve every wargear entry on a roster unit to a [WeaponView](../classes/WeaponView.md),
keeping each entry's count alongside. Unresolved entries are dropped
silently (matching [resolveRosterUnit](resolveRosterUnit.md)). Useful when the SPA
needs to enumerate firing options after the user picks a roster unit.

## Parameters

### wargear

`RosterWargear`[]

### dataset

[`Dataset`](../classes/Dataset.md)

## Returns

`object`[]
