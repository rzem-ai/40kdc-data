//! Name normalization for diacritic- and punctuation-insensitive lookup.
//!
//! Warhammer 40,000 is played globally and many entity names carry diacritics or
//! punctuation — "Khârn the Betrayer", "T'au", "Be'lakor". A user typing the
//! plain-ASCII form of a name must still find the entity. Every name comparison
//! in this crate routes through [`normalize_name`] so the matching rule is
//! defined in exactly one place; it is exported so consumers can reproduce the
//! same behaviour in their own search UIs.
//!
//! This is the Rust mirror of the TypeScript `normalizeName`
//! (`tools/src/data/normalize.ts`); the two implementations are pinned together
//! by the shared `conformance/normalize.json` corpus.

use unicode_normalization::{char::is_combining_mark, UnicodeNormalization};

/// Reduce a display name to a canonical lookup key.
///
/// The transform, in order:
/// 1. Unicode NFD-decompose, then strip combining marks — `Khârn` → `Kharn`.
/// 2. Casefold to lower case.
/// 3. Remove apostrophe and quote variants (`'`, `’`, `‘`, `` ` ``, `"`, `“`,
///    `”`) — `T'au` → `Tau`.
/// 4. Collapse any run of whitespace or hyphens to a single space, then trim —
///    `Be'lakor` → `belakor`, `the   betrayer` → `the betrayer`.
///
/// The result is intended only for comparison; it is not a display value.
///
/// # Examples
///
/// ```
/// use wh40kdc::normalize_name;
///
/// assert_eq!(normalize_name("Khârn the Betrayer"), "kharn the betrayer");
/// assert_eq!(normalize_name("T'au"), "tau");
/// assert_eq!(normalize_name("Be'lakor"), "belakor");
/// assert_eq!(normalize_name("  Adeptus   Astartes  "), "adeptus astartes");
/// ```
pub fn normalize_name(input: &str) -> String {
    // NFD-decompose, drop combining marks, then lowercase. Ordering matches the
    // TS `.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()`.
    let decomposed: String = input.nfd().filter(|c| !is_combining_mark(*c)).collect();

    let mut out = String::with_capacity(decomposed.len());
    let mut pending_space = false;
    for c in decomposed.chars().flat_map(char::to_lowercase) {
        match c {
            // Apostrophe / quote variants are removed outright (not spaced),
            // so `T'au` → `tau` rather than `t au`.
            '\'' | '\u{2019}' | '\u{2018}' | '`' | '"' | '\u{201C}' | '\u{201D}' => {}
            // Whitespace and hyphens collapse to a single separating space; a
            // leading run is suppressed (out is still empty) and a trailing run
            // is dropped because the space is only flushed before the next char.
            _ if c.is_whitespace() || c == '-' => {
                if !out.is_empty() {
                    pending_space = true;
                }
            }
            _ => {
                if pending_space {
                    out.push(' ');
                    pending_space = false;
                }
                out.push(c);
            }
        }
    }
    out
}

#[cfg(test)]
mod tests {
    use super::normalize_name;

    #[test]
    fn strips_diacritics() {
        assert_eq!(normalize_name("Khârn the Betrayer"), "kharn the betrayer");
        assert_eq!(normalize_name("Magnús"), "magnus");
    }

    #[test]
    fn removes_quote_variants() {
        assert_eq!(normalize_name("T'au"), "tau");
        assert_eq!(normalize_name("Be'lakor"), "belakor");
        assert_eq!(normalize_name("\u{2018}quoted\u{2019}"), "quoted");
    }

    #[test]
    fn collapses_whitespace_and_hyphens() {
        assert_eq!(normalize_name("the   betrayer"), "the betrayer");
        assert_eq!(normalize_name("space--marines"), "space marines");
        assert_eq!(
            normalize_name("  leading and trailing  "),
            "leading and trailing"
        );
    }

    #[test]
    fn distinct_names_stay_distinct() {
        assert_ne!(normalize_name("Khorne"), normalize_name("Khârn"));
    }
}
