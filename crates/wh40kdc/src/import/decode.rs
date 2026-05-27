//! Decode a ListForge share payload into a JSON value.
//!
//! ListForge packs a roster as `base64( gzip( utf8(json) ) )` and embeds it in
//! a URL hash fragment: `https://app/#/listforge/<BASE64>`. The fragment is used
//! deliberately so browsers never send it to a server, preserving the payload
//! verbatim. A valid gzipped payload always base64-encodes to a string starting
//! with `H4sIAAAAAAAAA`.
//!
//! [`decode_listforge`] accepts any of three forms and returns the parsed JSON:
//! - a full URL (the segment after the `/listforge/` marker, or after the last
//!   `/`, is taken),
//! - a bare base64 segment,
//! - an already-decoded JSON string (parsed directly).
//!
//! Rust mirror of `tools/src/import/decode.ts`.

use std::io::Read;

use base64::Engine;
use flate2::read::GzDecoder;
use serde_json::Value;

/// The base64 prefix every ListForge gzip payload begins with.
const GZIP_BASE64_PREFIX: &str = "H4sIA";

/// The path marker ListForge uses ahead of the payload.
const LISTFORGE_MARKER: &str = "/listforge/";

/// Errors that can arise decoding a ListForge payload.
#[derive(Debug)]
pub enum DecodeError {
    /// The input was empty after trimming.
    Empty,
    /// The input was neither raw JSON nor a `H4sIA…` gzip+base64 segment.
    NotAPayload,
    /// The base64 segment failed to decode.
    Base64(base64::DecodeError),
    /// The decoded bytes failed to gunzip.
    Gzip(std::io::Error),
    /// The decoded text was not valid JSON.
    Json(serde_json::Error),
}

impl std::fmt::Display for DecodeError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            DecodeError::Empty => f.write_str("decode_listforge: empty input"),
            DecodeError::NotAPayload => write!(
                f,
                "decode_listforge: input is not a ListForge payload (expected raw JSON, \
                 or a gzip+base64 segment beginning with \"{GZIP_BASE64_PREFIX}…\")"
            ),
            DecodeError::Base64(e) => write!(f, "decode_listforge: base64 decode failed: {e}"),
            DecodeError::Gzip(e) => write!(f, "decode_listforge: failed to gunzip payload: {e}"),
            DecodeError::Json(e) => write!(f, "decode_listforge: invalid JSON: {e}"),
        }
    }
}

impl std::error::Error for DecodeError {}

/// Extract the payload segment from an input that may be a URL.
///
/// The base64 alphabet includes `/`, so a bare base64 segment cannot be split
/// on `/`. The input is treated as a URL only when it carries the
/// `/listforge/` marker or an `http(s)://` scheme; otherwise it is returned
/// unchanged.
fn extract_segment(input: &str) -> &str {
    if let Some(idx) = input.find(LISTFORGE_MARKER) {
        return &input[idx + LISTFORGE_MARKER.len()..];
    }
    let lower = input.to_ascii_lowercase();
    if lower.starts_with("http://") || lower.starts_with("https://") {
        return match input.rfind('/') {
            Some(i) => &input[i + 1..],
            None => input,
        };
    }
    input
}

/// Decode a ListForge payload (URL, bare base64, or raw JSON) into a JSON value.
///
/// # Examples
///
/// A raw JSON string is parsed directly:
///
/// ```
/// use wh40kdc::import::decode_listforge;
///
/// let value = decode_listforge(r#"{"name":"My List"}"#).unwrap();
/// assert_eq!(value["name"], "My List");
/// ```
pub fn decode_listforge(input: &str) -> Result<Value, DecodeError> {
    let trimmed = input.trim();
    if trimmed.is_empty() {
        return Err(DecodeError::Empty);
    }

    // Raw JSON object passed directly.
    if trimmed.starts_with('{') {
        return serde_json::from_str(trimmed).map_err(DecodeError::Json);
    }

    let segment = extract_segment(trimmed);
    if !segment.starts_with(GZIP_BASE64_PREFIX) {
        return Err(DecodeError::NotAPayload);
    }

    let bytes = base64::engine::general_purpose::STANDARD
        .decode(segment)
        .map_err(DecodeError::Base64)?;
    let mut decoder = GzDecoder::new(&bytes[..]);
    let mut json = String::new();
    decoder
        .read_to_string(&mut json)
        .map_err(DecodeError::Gzip)?;

    serde_json::from_str(&json).map_err(DecodeError::Json)
}

#[cfg(test)]
mod tests {
    use super::*;
    use base64::Engine;
    use std::io::Write;

    fn encode_payload(json: &str) -> String {
        let mut encoder = flate2::write::GzEncoder::new(Vec::new(), flate2::Compression::default());
        encoder.write_all(json.as_bytes()).unwrap();
        let gz = encoder.finish().unwrap();
        base64::engine::general_purpose::STANDARD.encode(gz)
    }

    #[test]
    fn decodes_raw_json() {
        let v = decode_listforge(r#"{"a":1}"#).unwrap();
        assert_eq!(v["a"], 1);
    }

    #[test]
    fn decodes_bare_base64_segment() {
        let seg = encode_payload(r#"{"name":"X"}"#);
        assert!(
            seg.starts_with(GZIP_BASE64_PREFIX),
            "sanity: gzip base64 prefix"
        );
        let v = decode_listforge(&seg).unwrap();
        assert_eq!(v["name"], "X");
    }

    #[test]
    fn decodes_full_url() {
        let seg = encode_payload(r#"{"name":"Y"}"#);
        let url = format!("https://listforge.app/#/listforge/{seg}");
        let v = decode_listforge(&url).unwrap();
        assert_eq!(v["name"], "Y");
    }

    #[test]
    fn rejects_empty() {
        assert!(matches!(decode_listforge("   "), Err(DecodeError::Empty)));
    }

    #[test]
    fn rejects_non_payload() {
        assert!(matches!(
            decode_listforge("not-a-payload"),
            Err(DecodeError::NotAPayload)
        ));
    }
}
