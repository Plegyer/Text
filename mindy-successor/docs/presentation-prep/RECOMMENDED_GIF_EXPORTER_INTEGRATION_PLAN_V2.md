# Recommended GIF Exporter Integration Plan v2

Source decision:
`docs/presentation-prep/GIF_EXPORTER_DEPENDENCY_OPTIONS_MATRIX_V2.md`.

Recommendation:
**sharp + gifenc**, exact-pinned as development-only dependencies.

Proposed versions for Lead review:
- `sharp@0.35.4`;
- `gifenc@1.0.3`.

No package or lockfile is modified by this item.

## Proposed package.json changes

Under `devDependencies`:

```json
{
  "gifenc": "1.0.3",
  "sharp": "0.35.4"
}
```

Use exact versions rather than ranges for the first exporter integration.

## Proposed script changes

Add a development script:

```json
{
  "scripts": {
    "media:export-gif": "node tools/export-project-gif.mjs"
  }
}
```

Optionally add a deterministic check mode later:

```json
{
  "scripts": {
    "media:export-gif": "node tools/export-project-gif.mjs",
    "media:check-gif": "node tools/export-project-gif.mjs --check"
  }
}
```

No build/runtime script needs to invoke GIF export automatically.

## Proposed checked-in tool

Future file:
`prior-work/astra/prototype-m3.2/tools/export-project-gif.mjs`.

Responsibilities:

1. read one source-manifest sequence;
2. reject any frame path outside `assets/presentation-frames/`;
3. read SVG bytes locally;
4. render each frame with `sharp` to a fixed RGBA buffer;
5. force exact width/height and sRGB/alpha handling;
6. use `gifenc` quantization/palette mapping;
7. encode ordered frames at explicit centisecond-compatible delay;
8. set loop count to infinite;
9. write only under `assets/gif/`;
10. print byte size, width, height, frame count and source sequence;
11. fail if output exceeds configured hard budget;
12. never fetch network assets.

## Proposed rendering contract

Recommended first-output raster:
- width: 640 px;
- height: 360 px;
- source viewBox: 1200×675;
- fit: exact 16:9;
- background: opaque unless transparent output is explicitly approved;
- colorspace: sRGB;
- palette target: up to 256 colors;
- deterministic frame order from the checked-in source manifest.

The existing SVGs are flat-color/vector-heavy, which should compress better than photographic content.

## Proposed encoder flow

Pseudo-interface only:

```js
const rgba = await sharp(svgBuffer)
  .resize(640, 360, { fit: "fill" })
  .ensureAlpha()
  .raw()
  .toBuffer();

const palette = quantize(rgba, 256);
const indexed = applyPalette(rgba, palette);

gif.writeFrame(indexed, 640, 360, {
  palette,
  delay: frameDelayMs
});
```

The exact gifenc API should be verified in implementation tests when Lead approves the dependencies.

## Lockfile / CI consequences

Lead integration would need:
1. modify `package.json`;
2. run `npm install --save-dev --save-exact sharp@0.35.4 gifenc@1.0.3`;
3. commit resulting `package-lock.json`;
4. confirm `npm ci` succeeds on the repo's Node 22.18.0 CI;
5. add exporter unit/smoke tests;
6. keep export as an explicit authoring command, not an application startup/build dependency.

## Security controls

Exporter must:
- accept only repo-relative manifest inputs;
- reject `..`, URL schemes and absolute paths;
- disallow external SVG image/font URLs;
- cap frame count and dimensions;
- cap output bytes;
- never execute SVG scripts;
- never access the network;
- not mutate runtime/gameplay files.

## Licensing

Proposed dependencies:
- sharp: Apache-2.0;
- gifenc: MIT.

Lead should add required third-party notices according to project policy if these dev tools are adopted.

## Approval boundary

This document recommends the toolchain but does **not** authorize dependency installation.

Until Lead approves and integrates these package/script changes:
- GIF export remains blocked;
- frame sources remain valid;
- no production animation claim is allowed.
