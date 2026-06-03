[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / clampWeaponCount

# Function: clampWeaponCount()

> **clampWeaponCount**(`bounds`, `id`, `requested`): `number`

Defined in: [data/loadout.ts:143](https://github.com/wn-mitch/40kdc-data/blob/0b6959256a79cf859a201d8971874d4a811c6024/tools/src/data/loadout.ts#L143)

Clamp a single weapon's requested count into its valid range. Ids with no
bound (not part of this unit's loadout) are returned unchanged but floored at
zero.

## Parameters

### bounds

`Map`\<`string`, [`WeaponBound`](../interfaces/WeaponBound.md)\>

### id

`string`

### requested

`number`

## Returns

`number`
