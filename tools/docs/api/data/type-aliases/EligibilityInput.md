[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [data](../README.md) / EligibilityInput

# Type Alias: EligibilityInput

> **EligibilityInput** = `object`

Defined in: [abilities-resolver/resolver.ts:37](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/abilities-resolver/resolver.ts#L37)

## Properties

### unitId

> **unitId**: `string`

Defined in: [abilities-resolver/resolver.ts:38](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/abilities-resolver/resolver.ts#L38)

***

### factionId?

> `optional` **factionId?**: `string`

Defined in: [abilities-resolver/resolver.ts:40](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/abilities-resolver/resolver.ts#L40)

Overrides the unit's own `faction_id` when given (for inheritance cases).

***

### detachmentId?

> `optional` **detachmentId?**: `string`

Defined in: [abilities-resolver/resolver.ts:41](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/abilities-resolver/resolver.ts#L41)

***

### attachedLeaderId?

> `optional` **attachedLeaderId?**: `string`

Defined in: [abilities-resolver/resolver.ts:42](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/abilities-resolver/resolver.ts#L42)

***

### supportingUnitIds?

> `optional` **supportingUnitIds?**: `string`[]

Defined in: [abilities-resolver/resolver.ts:44](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/abilities-resolver/resolver.ts#L44)

Friendly units whose auras could apply (M2 walks only their aura-ranged abilities).
