import { defineWorkersConfig, readD1Migrations } from "@cloudflare/vitest-pool-workers/config";
import path from "node:path";
import { TEST_PUBLIC_KEY_B64URL } from "./test/keypair";

export default defineWorkersConfig(async () => {
  const migrations = await readD1Migrations(path.join(__dirname, "migrations"));
  return {
    test: {
      setupFiles: ["./test/apply-migrations.ts"],
      poolOptions: {
        workers: {
          // Per-test isolated storage doesn't pop cleanly while a test holds
          // open WebSockets / live DO SQLite handles (the same known friction
          // shadowboxing's session-worker hit). Every test uses fresh random
          // codes/ids, so shared storage is safe — but it must then be ONE
          // worker, or parallel test files race the D1 migration setup.
          isolatedStorage: false,
          singleWorker: true,
          wrangler: { configPath: "./wrangler.jsonc" },
          miniflare: {
            bindings: {
              TEST_MIGRATIONS: migrations,
              ENTITLEMENT_PUBLIC_KEYS: TEST_PUBLIC_KEY_B64URL,
            },
          },
        },
      },
    },
  };
});
