# Media Asset Build Path Audit v1

Baseline: current `main` `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`.

Scope: static presentation media and future real GIF files. No runtime/schema/UI changes are proposed.

## Source asset directory

The production prototype source asset root is:

`mindy-successor/prior-work/astra/prototype-m3.2/assets/`

Current production media blobs are static SVG files in that directory, including:
- `stage-lumber.svg`;
- `stage-tavern.svg`;
- `stage-forest.svg`;
- `stage-town.svg`;
- `stage-room.svg`;
- `stage-outside.svg`;
- `stage-school.svg`.

Current real GIF count remains **0**.

A future production GIF should be added beneath the same source asset root. A subdirectory such as `assets/gif/...` is valid because the build copies the asset tree recursively.

## Build behavior

`scripts/build.mjs` performs:

`await cp('assets','dist/assets',{recursive:true});`

Therefore every source file under prototype-relative `assets/` is copied recursively to:

`dist/assets/`

The build does not currently hash, rename, transcode, optimize, or bundle individual media files. Relative paths under `assets/` survive unchanged beneath `dist/assets/`.

Example:

source:
`assets/gif/careers/lumber/shift-01.gif`

built file:
`dist/assets/gif/careers/lumber/shift-01.gif`

runtime URL:
`assets/gif/careers/lumber/shift-01.gif`

## Runtime URL convention

Presentation media sources accepted by the shipped presentation runtime use portable relative URLs such as:

`assets/stage-lumber.svg`

and, for a GIF:

`assets/gif/careers/lumber/shift-01.gif`

The presentation source validator accepts local `assets/...` paths with supported media extensions. GIF pool candidates specifically require an `assets/...gif` path or a GIF data URL at schema level; production policy is stricter and requires a real repository file.

The renderer places the resolved `src` directly on an `<img>` element for image/GIF media. It does not prepend an absolute filesystem path.

## Desktop resolution

The Electron entrypoint loads:

`dist/index.html`

as a `file:` URL. A relative runtime media path such as `assets/gif/example.gif` therefore resolves beside the built HTML as:

`dist/assets/gif/example.gif`.

The packaged application includes `dist/**/*`, so copied media under `dist/assets/` is included by the current electron-builder file rule.

## Preview-server resolution

`scripts/serve.mjs` serves `dist/` as its root. Therefore:

runtime request:
`/assets/gif/example.gif`

maps to:
`dist/assets/gif/example.gif`.

Unknown extensions, including `.gif`, fall back to `application/octet-stream` in the current preview server MIME map. Browsers can still sniff/render GIF image bytes in normal image contexts, but adding an explicit GIF MIME mapping would be a separate Lead-owned tooling/runtime decision and is **not required or changed by this audit**.

## Presentation slot resolution

Current flow is:

1. gameplay/runtime produces a semantic `presentationId`;
2. `presentationSlots(...)` defines the known semantic slot;
3. `resolvePresentation(...)` reads any slot override;
4. with animations enabled, a PR42 pool selects one deterministic candidate by semantic ID + persisted occurrence identity;
5. if the selected candidate fails to load, renderer error handling advances to another resolved candidate;
6. animations-off excludes the GIF pool and uses static/catalog fallback;
7. the renderer uses the candidate's relative `src` unchanged.

The asset filename never becomes gameplay identity.

## Exact source-to-shipping path

For a future real GIF to ship correctly:

1. add the real file under:
   `mindy-successor/prior-work/astra/prototype-m3.2/assets/<subpath>.gif`;
2. reference it from presentation data as:
   `assets/<subpath>.gif`;
3. run the normal build;
4. verify the built copy exists at:
   `mindy-successor/prior-work/astra/prototype-m3.2/dist/assets/<subpath>.gif`;
5. verify the semantic pool retains its static fallback;
6. run media preflight and presentation tests;
7. require exact-head CI before production integration.

Do **not** place a source GIF directly in `dist/`: `dist/` is build output and the durable source-of-truth is the source `assets/` tree.

## Production conclusion

No build-path blocker exists for real GIF adoption.

The missing ingredient is the real media file itself. Once a valid GIF blob is committed under the prototype `assets/` source tree, the existing build copies it into the runtime/package path without requiring presentation runtime changes.
