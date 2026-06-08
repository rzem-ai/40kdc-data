/**
 * The 40kdc dataset singleton — the embedded dataset baked into the
 * `@alpaca-software/40kdc-data` package. Every component resolves static
 * display data (unit profiles, weapon stats, ability text, keywords,
 * detachments, enhancements) from here by id.
 *
 * Module-level constant, not a store: the dataset is immutable and global.
 * (In the host Shadowboxing app this same `ds` is the TS twin of the Rust
 * `Dataset::embedded()`; in this standalone example it is simply the package's
 * embedded dataset — the builder logic is identical either way.)
 */
import { Dataset } from '@alpaca-software/40kdc-data';

export const ds: Dataset = Dataset.embedded();
