//! Rust types for the [40kdc-data](https://github.com/Tabletop-Developer-Consortium/40kdc-data)
//! Warhammer 40K schema layer.
//!
//! Every type in this crate is generated from the canonical JSON Schemas by
//! `cargo run -p xtask -- codegen`. The schema content these types describe is
//! published under CC0 — see the crate README.
//!
//! ```
//! use wh40kdc::Unit;
//!
//! let data = std::fs::read_to_string("path/to/units.json").unwrap_or("[]".to_string());
//! let units: Vec<Unit> = serde_json::from_str(&data).unwrap();
//! ```
//!
//! With the default `bundled-data` feature the whole dataset ships embedded
//! behind a linked, typed API ([`Dataset`]) — find an entity and follow it to
//! its weapons, abilities, phases, and faction:
//!
//! ```
//! use wh40kdc::{Dataset, Phase};
//!
//! let ds = Dataset::embedded();
//! let kharn = ds.find_unit("Kharn").unwrap(); // resolves "Khârn the Betrayer"
//! let shooting: Vec<&str> = ds
//!     .abilities_of(kharn)
//!     .into_iter()
//!     .filter(|a| ds.phases_of(a).contains(&Phase::Shooting))
//!     .map(|a| a.ability_id.as_str())
//!     .collect();
//! assert_eq!(shooting, ["berzerker-frenzy"]);
//! ```

// generated.rs is prettyplease-formatted by the codegen (see xtask); skip rustfmt
// so `cargo fmt` doesn't fight the committed output / CI drift check.
#[rustfmt::skip]
mod generated;

pub use generated::*;

/// Linked, typed access over the embedded dataset (default `bundled-data`).
#[cfg(feature = "bundled-data")]
pub mod data;

#[cfg(feature = "bundled-data")]
pub use data::{normalize_name, Collection, Dataset, RawData};

/// Army-list importer: ListForge share payload → resolved 40kdc roster
/// (default `import`).
#[cfg(feature = "import")]
pub mod import;

/// The bundled, self-contained JSON Schema (draft 2020-12) these types were
/// generated from. Consumers can feed this to a JSON Schema validator to check
/// data before deserializing; the canonical validation CLI lives in the
/// `@alpaca-software/40kdc-data` npm package.
pub const BUNDLED_SCHEMA: &str = include_str!("../schemas/bundled.schema.json");
