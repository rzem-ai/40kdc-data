/** Live doc-session protocol + pure op application, re-exported from the sync
 *  worker's source so client and server can never drift (same repo, one
 *  definition). The worker modules are plain TS with no Workers APIs. */
export * from "../../workers/sync/src/doc-protocol";
export { applyDocOps, OpError, validateOps } from "../../workers/sync/src/apply-ops";
