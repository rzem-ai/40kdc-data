[**@alpaca-software/40kdc-data**](../../README.md)

***

[@alpaca-software/40kdc-data](../../README.md) / [generated](../README.md) / Piece

# Interface: Piece

Defined in: [generated.ts:912](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L912)

One terrain feature placed on the board.

This interface was referenced by `0KdcBundledSchemas`'s JSON-Schema
via the `definition` "piece".

## Properties

### name?

> `optional` **name?**: `string`

Defined in: [generated.ts:913](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L913)

***

### footprint

> **footprint**: [`Footprint`](../type-aliases/Footprint.md)

Defined in: [generated.ts:914](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L914)

***

### position

> **position**: [`Vec21`](Vec21.md)

Defined in: [generated.ts:915](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L915)

***

### rotation\_degrees?

> `optional` **rotation\_degrees?**: `number`

Defined in: [generated.ts:919](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L919)

Clockwise rotation of the footprint about `position`. Absent or 0 means axis-aligned.

***

### template?

> `optional` **template?**: `string`

Defined in: [generated.ts:923](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L923)

Optional descriptive label for the GW standard template this piece uses (e.g. 'large-ruin', 'long-wall'). Free-form, not enum-locked — the geometry in `footprint` is authoritative.

***

### height\_inches?

> `optional` **height\_inches?**: `number`

Defined in: [generated.ts:927](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L927)

Height of the piece in inches. Gates Plunging Fire (a piece 3" or taller confers +1 BS on ground-level targets).

***

### terrain\_area\_keywords?

> `optional` **terrain\_area\_keywords?**: [`TerrainAreaKeyword`](../type-aliases/TerrainAreaKeyword.md)[]

Defined in: [generated.ts:931](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L931)

Terrain-area keywords this piece's area carries.

***

### link\_group?

> `optional` **link\_group?**: `string`

Defined in: [generated.ts:935](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L935)

Pieces sharing a `link_group` value are linked terrain — treated as a single terrain feature (and, where an objective sits among them, a single objective).

***

### is\_objective?

> `optional` **is\_objective?**: `boolean`

Defined in: [generated.ts:939](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L939)

Whether this piece carries an objective marker.

***

### objective?

> `optional` **objective?**: `object`

Defined in: [generated.ts:943](https://github.com/Tabletop-Developer-Consortium/40kdc-data/blob/c14295da9ec1432e1911fa2926d4bc9c0c5a796f/tools/src/generated.ts#L943)

Objective-marker metadata. Only meaningful when `is_objective` is true.

#### position?

> `optional` **position?**: [`Vec22`](Vec22.md)

#### control\_range\_inches?

> `optional` **control\_range\_inches?**: `number`

Range from the marker within which models contribute to control.
