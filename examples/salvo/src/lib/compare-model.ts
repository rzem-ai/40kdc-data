/**
 * The fleet-comparison core lives in the package (`@alpaca-software/40kdc-data`,
 * `tools/src/compare.ts`) so the conformance runner and salvo share one
 * implementation, pinned against the Python mirror. This re-export keeps the
 * salvo import sites stable.
 */
export {
  buildMatrix,
  resolveTarget,
  cellValue,
  matrixToMarkdown,
  enumerateLoadouts,
  rankLoadouts,
  type ComparePhase,
  type CompareMetric,
  type WeaponCell,
  type MatrixCell,
  type MatrixRow,
  type ResolvedTarget,
  type LoadoutConfig,
  type LoadoutRanking,
} from "@alpaca-software/40kdc-data";
