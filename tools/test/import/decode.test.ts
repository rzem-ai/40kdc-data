import { describe, it, expect } from "vitest";
import { gzipSync } from "node:zlib";
import { decodeListForge } from "../../src/import/decode.js";

const payload = {
  name: "Test",
  roster: { name: "Test", costs: [{ name: "pts", value: 10 }], forces: [] },
};

function gzipB64(value: unknown): string {
  return gzipSync(Buffer.from(JSON.stringify(value), "utf8")).toString("base64");
}

describe("decodeListForge", () => {
  const b64 = gzipB64(payload);

  it("produces the documented gzip+base64 prefix", () => {
    expect(b64.startsWith("H4sIA")).toBe(true);
  });

  it("round-trips a bare base64 segment", () => {
    expect(decodeListForge(b64)).toEqual(payload);
  });

  it("round-trips a full ListForge URL", () => {
    const url = `https://yourapp.example/#/listforge/${b64}`;
    expect(decodeListForge(url)).toEqual(payload);
  });

  it("accepts already-decoded JSON", () => {
    expect(decodeListForge(JSON.stringify(payload))).toEqual(payload);
  });

  it("yields the same object for all three input forms", () => {
    const fromB64 = decodeListForge(b64);
    const fromUrl = decodeListForge(`https://app/#/listforge/${b64}`);
    const fromJson = decodeListForge(JSON.stringify(payload));
    expect(fromB64).toEqual(fromUrl);
    expect(fromUrl).toEqual(fromJson);
  });

  it("rejects empty input", () => {
    expect(() => decodeListForge("   ")).toThrow(/empty/);
  });

  it("rejects a non-ListForge, non-JSON string", () => {
    expect(() => decodeListForge("not-a-payload")).toThrow(/not a ListForge payload/);
  });
});
