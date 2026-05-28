[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / resolveRosterUnit

# Function: resolveRosterUnit()

> **resolveRosterUnit**(`rosterUnit`, `dataset`): [`UnitView`](../classes/UnitView.md) \| `undefined`

Defined in: [data/roster-resolve.ts:23](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/data/roster-resolve.ts#L23)

Resolve a roster's unit entry against the dataset, returning the linked
[UnitView](../classes/UnitView.md). Returns `undefined` when:
  - the roster's `ref.id` is `null` (the importer couldn't match the unit), or
  - the id doesn't appear in the dataset (e.g. the roster was authored
    against an older dataslate than the bundled one).

Doesn't surface diagnostics — the caller already has them on the roster's
own `diagnostics` field.

## Parameters

### rosterUnit

`RosterUnit`

### dataset

[`Dataset`](../classes/Dataset.md)

## Returns

[`UnitView`](../classes/UnitView.md) \| `undefined`
