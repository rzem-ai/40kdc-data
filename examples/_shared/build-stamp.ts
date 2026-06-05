/**
 * Build-time stamp helpers for the example apps' vite configs (Node context
 * only — never import from app code). Each app injects the results as
 * compile-time constants so the footer can show which dataset version and
 * commit a deployed page was built from.
 */
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";

/**
 * The version of the @alpaca-software/40kdc-data package this app will bundle.
 * Resolved through the package entry point (the exports map doesn't expose
 * package.json directly), so it follows the workspace symlink to tools/.
 */
export function dataPackageVersion(fromUrl: string): string {
  const req = createRequire(fromUrl);
  const entry = req.resolve("@alpaca-software/40kdc-data");
  return JSON.parse(readFileSync(resolve(dirname(entry), "..", "package.json"), "utf8"))
    .version as string;
}

/** Short commit hash of the build, or "dev" outside a git checkout. */
export function buildSha(): string {
  try {
    return execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
  } catch {
    return "dev";
  }
}
