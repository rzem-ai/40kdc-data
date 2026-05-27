# wh40kdc

Rust types for the [40kdc-data](https://github.com/Tabletop-Developer-Consortium/40kdc-data)
Warhammer 40K schema layer — the canonical community schema for 40K game entities.

Every type is generated from the project's JSON Schemas (JSON Schema draft 2020-12)
via [`typify`](https://crates.io/crates/typify), so the Rust structs stay in lockstep
with the schemas that other consortium tools validate against.

## Usage

```toml
[dependencies]
wh40kdc = { git = "https://github.com/Tabletop-Developer-Consortium/40kdc-data" }
serde_json = "1"
```

```rust
use wh40kdc::{Unit, Weapon};

let units: Vec<Unit> = serde_json::from_str(&units_json)?;
let weapons: Vec<Weapon> = serde_json::from_str(&weapons_json)?;
```

The bundled schema is available as a string for downstream validation:

```rust
let schema: serde_json::Value = serde_json::from_str(wh40kdc::BUNDLED_SCHEMA)?;
```

## Regenerating

Types are checked in (`src/generated.rs`). To regenerate after a schema change:

```sh
cd tools && npm run bundle:schemas   # rebuild crates/wh40kdc/schemas/bundled.schema.json
cargo run -p xtask -- codegen        # rewrite src/generated.rs
```

CI fails if the committed artifacts drift from the schemas.

## Licensing

The crate code is [MIT](../../LICENSE-TOOLS). The schema content these types
describe is [CC0](../../LICENSE-SCHEMAS) (public domain).
