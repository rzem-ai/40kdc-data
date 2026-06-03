[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / weaponBounds

# Function: weaponBounds()

> **weaponBounds**(`unit`, `modelCount`, `options`): `Map`\<`string`, [`WeaponBound`](../interfaces/WeaponBound.md)\>

Defined in: [data/loadout.ts:110](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/data/loadout.ts#L110)

Inclusive valid count range for each weapon/wargear id, used to clamp a UI's
per-weapon inputs so invalid loadouts are unreachable. A base weapon ranges
`[modelCount − maxSwapsAway, modelCount]`; an optional (replacement) id ranges
`[0, Σ caps that add it]`.

## Parameters

### unit

[`Unit`](../../generated/interfaces/Unit.md)

### modelCount

`number`

### options

readonly [`WargearOption`](../../generated/interfaces/WargearOption.md)[]

## Returns

`Map`\<`string`, [`WeaponBound`](../interfaces/WeaponBound.md)\>
