"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  combine: () => combine,
  debug: () => debug,
  decode: () => decode,
  encode: () => encode,
  file_glyphs: () => file_glyphs,
  fontstackSchema: () => fontstackSchema,
  glyphSchema: () => glyphSchema,
  glyphsSchema: () => glyphsSchema
});
module.exports = __toCommonJS(src_exports);
var import_protobuf = require("@bufbuild/protobuf");

// src/gen/glyphs_pb.ts
var import_codegenv1 = require("@bufbuild/protobuf/codegenv1");
var file_glyphs = /* @__PURE__ */ (0, import_codegenv1.fileDesc)(
  "CgxnbHlwaHMucHJvdG8SC2xsbXIuZ2x5cGhzIm4KBWdseXBoEgoKAmlkGAEgAigNEg4KBmJpdG1hcBgCIAEoDBINCgV3aWR0aBgDIAIoDRIOCgZoZWlnaHQYBCACKA0SDAoEbGVmdBgFIAIoERILCgN0b3AYBiACKBESDwoHYWR2YW5jZRgHIAIoDSJMCglmb250c3RhY2sSDAoEbmFtZRgBIAIoCRINCgVyYW5nZRgCIAIoCRIiCgZnbHlwaHMYAyADKAsyEi5sbG1yLmdseXBocy5nbHlwaCI3CgZnbHlwaHMSJgoGc3RhY2tzGAEgAygLMhYubGxtci5nbHlwaHMuZm9udHN0YWNrKgUIEBCAQEICSAM"
);
var glyphSchema = /* @__PURE__ */ (0, import_codegenv1.messageDesc)(file_glyphs, 0);
var fontstackSchema = /* @__PURE__ */ (0, import_codegenv1.messageDesc)(file_glyphs, 1);
var glyphsSchema = /* @__PURE__ */ (0, import_codegenv1.messageDesc)(file_glyphs, 2);

// src/index.ts
function debug(buffer) {
  if (buffer instanceof Uint8Array) {
    const g = (0, import_protobuf.fromBinary)(glyphsSchema, buffer);
    return (0, import_protobuf.toJsonString)(glyphsSchema, g);
  }
  return (0, import_protobuf.toJsonString)(glyphsSchema, buffer);
}
function decode(buffer) {
  return (0, import_protobuf.fromBinary)(glyphsSchema, buffer);
}
function encode(data) {
  return (0, import_protobuf.toBinary)(glyphsSchema, data);
}
function range256(start) {
  if (start < 0 || start > 65535)
    throw new Error(`start must be between 0 and 255; given ${start}`);
  const start256 = Math.trunc(start / 256) * 256;
  const stop256 = start256 + 255;
  return {
    start: start256,
    stop: stop256,
    str: `${start256}-${stop256}`
  };
}
function parseRange(range) {
  const [start, stop] = range.split("-").map(Number);
  if (start === void 0 || stop === void 0 || Number.isNaN(start) || Number.isNaN(stop) || start < 0 || stop < 0 || start > 65535 || stop > 65535) {
    throw new Error(`range must be in the form 'start-stop'; given ${range}`);
  }
  return { start, stop, str: `${start}-${stop}` };
}
function combineRanges(ranges) {
  const parsedRanges = ranges.map((element) => parseRange(element));
  const start = Math.min(...parsedRanges.map((r) => r.start));
  const stop = Math.max(...parsedRanges.map((r) => r.stop));
  return { start, stop, str: `${start}-${stop}` };
}
function combine(buffers, fontstackName) {
  if (buffers.length === 0) return;
  if (buffers.length === 1) return buffers[0];
  const combinedGlyphs = [];
  const coverage = /* @__PURE__ */ new Set();
  const names = [];
  const rangeStrings = [];
  for (const buffer of buffers) {
    const {
      stacks: [currentFontstack]
    } = decode(buffer);
    const {
      glyphs: currentGlyphs = [],
      range: fsRange,
      name: currentFontstackName
    } = currentFontstack || {};
    if (fsRange) rangeStrings.push(fsRange);
    if (currentFontstackName) names.push(currentFontstackName);
    for (const glyph of currentGlyphs) {
      if (!coverage.has(glyph.id)) {
        combinedGlyphs.push(glyph);
        coverage.add(glyph.id);
      }
    }
  }
  combinedGlyphs.sort((a, b) => a.id - b.id);
  const range = rangeStrings.length > 0 ? combineRanges(rangeStrings) : range256(Math.min(...coverage));
  const { str: rangeStr } = range;
  const resultFontstack = (0, import_protobuf.create)(fontstackSchema, {
    name: fontstackName || names.join(", "),
    glyphs: combinedGlyphs,
    range: rangeStr || ""
  });
  return encode((0, import_protobuf.create)(glyphsSchema, { stacks: [resultFontstack] }));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  combine,
  debug,
  decode,
  encode,
  file_glyphs,
  fontstackSchema,
  glyphSchema,
  glyphsSchema
});
