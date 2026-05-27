//! The format-adapter seam.
//!
//! Each supported source format implements [`FormatAdapter`]: it recognises a
//! decoded payload ([`detect`](FormatAdapter::detect)) and lowers it to the
//! format-agnostic [`ParsedRoster`] ([`parse`](FormatAdapter::parse)).
//! Resolution onto 40kdc entity ids happens once, downstream, against any
//! `ParsedRoster` — so adding a new source format (New Recruit, Rosterizer, a
//! native 40kdc export, …) means writing one adapter, not touching
//! [`decode`](super::decode_listforge) or [`resolve`](super::resolve).
//!
//! v1 registers only [`ListForgeAdapter`](super::ListForgeAdapter).

use serde_json::Value;

use super::types::ParsedRoster;

/// Recognises and parses one source list-export format.
pub trait FormatAdapter {
    /// Stable identifier for the format (e.g. `"listforge"`).
    fn format(&self) -> &'static str;

    /// Whether this adapter can parse the given decoded payload. Should be a
    /// cheap structural sniff, not a full parse.
    fn detect(&self, decoded: &Value) -> bool;

    /// Lower a recognised payload to the format-agnostic intermediate.
    fn parse(&self, decoded: &Value) -> Result<ParsedRoster, ParseError>;
}

/// An error lowering a payload to a [`ParsedRoster`].
#[derive(Debug)]
pub struct ParseError(pub String);

impl std::fmt::Display for ParseError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str(&self.0)
    }
}

impl std::error::Error for ParseError {}

/// Pick the first registered adapter whose [`detect`](FormatAdapter::detect)
/// recognises the payload.
pub fn select_adapter<'a>(
    decoded: &Value,
    adapters: &'a [Box<dyn FormatAdapter>],
) -> Result<&'a dyn FormatAdapter, ParseError> {
    adapters
        .iter()
        .map(AsRef::as_ref)
        .find(|a| a.detect(decoded))
        .ok_or_else(|| {
            let tried: Vec<&str> = adapters.iter().map(|a| a.format()).collect();
            let tried = if tried.is_empty() {
                "none".to_string()
            } else {
                tried.join(", ")
            };
            ParseError(format!(
                "no registered import adapter recognises this payload (tried: {tried})"
            ))
        })
}
