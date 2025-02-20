import type { glyphs } from "./gen/glyphs_pb.js";
declare function debug(buffer: Uint8Array | glyphs): string;
export declare function decode(buffer: Uint8Array): glyphs;
export declare function encode(data: glyphs): Uint8Array;
/**
 * Combine any number of glyph (SDF) PBFs.
 * Returns a re-encoded PBF with the combined font faces, composited using array order
 * to determine glyph priority.
 * @param buffers An array of SDF PBFs.
 * @param fontstackName Optional font stack name.
 * @returns Combined glyph PBF.
 */
export declare function combine(buffers: Uint8Array[], fontstackName?: string): Uint8Array | undefined;
export { debug };
export * from "./gen/glyphs_pb.js";
