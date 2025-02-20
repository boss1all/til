import { GenFile, GenMessage } from '@bufbuild/protobuf/codegenv1';
import { Message } from '@bufbuild/protobuf';

/**
 * Describes the file glyphs.proto.
 */
declare const file_glyphs: GenFile;
/**
 * Stores a glyph with metrics and optional SDF bitmap information.
 *
 * @generated from message llmr.glyphs.glyph
 */
type glyph = Message<"llmr.glyphs.glyph"> & {
    /**
     * @generated from field: required uint32 id = 1;
     */
    id: number;
    /**
     * A signed distance field of the glyph with a border of 3 pixels.
     *
     * @generated from field: optional bytes bitmap = 2;
     */
    bitmap: Uint8Array;
    /**
     * Glyph metrics.
     *
     * @generated from field: required uint32 width = 3;
     */
    width: number;
    /**
     * @generated from field: required uint32 height = 4;
     */
    height: number;
    /**
     * @generated from field: required sint32 left = 5;
     */
    left: number;
    /**
     * @generated from field: required sint32 top = 6;
     */
    top: number;
    /**
     * @generated from field: required uint32 advance = 7;
     */
    advance: number;
};
/**
 * Describes the message llmr.glyphs.glyph.
 * Use `create(glyphSchema)` to create a new message.
 */
declare const glyphSchema: GenMessage<glyph>;
/**
 * Stores fontstack information and a list of faces.
 *
 * @generated from message llmr.glyphs.fontstack
 */
type fontstack = Message<"llmr.glyphs.fontstack"> & {
    /**
     * @generated from field: required string name = 1;
     */
    name: string;
    /**
     * @generated from field: required string range = 2;
     */
    range: string;
    /**
     * @generated from field: repeated llmr.glyphs.glyph glyphs = 3;
     */
    glyphs: glyph[];
};
/**
 * Describes the message llmr.glyphs.fontstack.
 * Use `create(fontstackSchema)` to create a new message.
 */
declare const fontstackSchema: GenMessage<fontstack>;
/**
 * @generated from message llmr.glyphs.glyphs
 */
type glyphs = Message<"llmr.glyphs.glyphs"> & {
    /**
     * @generated from field: repeated llmr.glyphs.fontstack stacks = 1;
     */
    stacks: fontstack[];
};
/**
 * Describes the message llmr.glyphs.glyphs.
 * Use `create(glyphsSchema)` to create a new message.
 */
declare const glyphsSchema: GenMessage<glyphs>;

declare function debug(buffer: Uint8Array | glyphs): string;
declare function decode(buffer: Uint8Array): glyphs;
declare function encode(data: glyphs): Uint8Array;
/**
 * Combine any number of glyph (SDF) PBFs.
 * Returns a re-encoded PBF with the combined font faces, composited using array order
 * to determine glyph priority.
 * @param buffers An array of SDF PBFs.
 * @param fontstackName Optional font stack name.
 * @returns Combined glyph PBF.
 */
declare function combine(buffers: Uint8Array[], fontstackName?: string): Uint8Array | undefined;

export { combine, debug, decode, encode, file_glyphs, type fontstack, fontstackSchema, type glyph, glyphSchema, type glyphs, glyphsSchema };
