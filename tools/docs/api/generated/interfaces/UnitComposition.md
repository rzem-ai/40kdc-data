[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / UnitComposition

# Interface: UnitComposition

Defined in: [generated.ts:906](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L906)

Describes the internal model-type breakdown of a unit.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "unit-composition".

## Properties

### unit\_id

> **unit\_id**: `string`

Defined in: [generated.ts:907](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L907)

***

### models

> **models**: \[\{ `name`: `string`; `profile_name?`: `string` \| `null`; `min`: `number`; `max`: `number`; `default_weapon_ids?`: `string`[]; `is_leader_model?`: `boolean`; \}, ...\{ name: string; profile\_name?: string \| null; min: number; max: number; default\_weapon\_ids?: string\[\]; is\_leader\_model?: boolean \}\[\]\]

Defined in: [generated.ts:911](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L911)

#### Min Items

1

***

### game\_version

> **game\_version**: [`GameVersionReference`](GameVersionReference.md)

Defined in: [generated.ts:929](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/ff930e1260b0bcc1c6960d689de0cb6a2104d104/tools/src/generated.ts#L929)
