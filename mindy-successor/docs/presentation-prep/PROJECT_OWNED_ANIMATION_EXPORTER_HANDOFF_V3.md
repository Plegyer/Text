# Project-Owned Animation Exporter Handoff v3

Scope: Chat 2 items **256–266**.

Current semantic baseline used by frame-source validation:
`main@d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`.

## Exporter recommendation

Recommended smallest viable dev-only toolchain:

- `sharp@0.35.4`;
- `gifenc@1.0.3`.

Why:
- `sharp` can consume local SVG and emit fixed-size raw pixel buffers;
- `gifenc` is a small pure-JavaScript animated-GIF encoder/quantizer;
- both can be exact-pinned in npm/package-lock;
- no separate OS-level ImageMagick/ffmpeg install is needed;
- export can remain an explicit authoring command rather than part of runtime/build startup.

No dependency is installed by this queue.

## Proposed non-installed package/script changes

Proposed `devDependencies`:

```json
{
  "gifenc": "1.0.3",
  "sharp": "0.35.4"
}
```

Proposed script:

```json
{
  "scripts": {
    "media:export-gif": "node tools/export-project-gif.mjs"
  }
}
```

Future checked-in exporter:
`prior-work/astra/prototype-m3.2/tools/export-project-gif.mjs`.

The exporter should:
- accept only repository-local frame paths;
- rasterize to fixed 640×360 sRGB RGBA;
- preserve ordered 4-frame sequence input;
- use explicit loop delay;
- write only under `assets/gif/`;
- reject external URLs/absolute paths/traversal;
- print output dimensions/frame count/duration/byte size;
- never mutate gameplay/runtime state.

## Dependency alternatives reviewed

Item 256 also reviewed:
- `@resvg/resvg-js` + PNG decode + gifenc;
- ImageMagick CLI;
- ffmpeg plus a separate SVG rasterizer.

They are viable in principle but larger or less direct for this Node/CI repository.

## Lumber export specification

Item 258 defines the first future pool:
`job/lumber/shift/spring/default`.

Three source sequences:
- `lumber-spring-work-loop-a`;
- `lumber-spring-work-loop-b`;
- `lumber-spring-work-loop-c`.

Future candidate keys:
- `lumber-spring-loop-a`;
- `lumber-spring-loop-b`;
- `lumber-spring-loop-c`.

Target:
- 640×360;
- infinite loop;
- 4 frames;
- source loop timings 2400 / 2200 / 2600 ms;
- preferred <=2 MB each;
- static fallback `assets/presentation/career-lumber-shift-spring.svg`.

No GIF bytes currently exist.

## Semantic IDs with three compatible source sequences after item 264

The following current semantic presentation IDs now each have three compatible source sequences:

1. `job/lumber/shift/spring/default`
2. `job/guard/shift/summer/default`
3. `job/tavern/shift/autumn/default`
4. `school/literacy-and-numbers/lesson/default`

Other currently validated source identities still have one sequence each at this checkpoint:
- `location/town/event/poverty-street-production-helpful-summer/default`;
- `activity/forest/return/success`;
- `relationship/lumber-foreman/lumber-night-foreman-professional/default`;
- `school/arcana/lesson/default`.

## Validation

New test:
`prior-work/astra/prototype-m3.2/tests/project-owned-animation-frames-v3.test.ts`.

It validates:
- 16 source sequences;
- 64 SVG frames;
- exact current semantic IDs;
- four ordered frames per sequence;
- consistent 1200×675 viewBox;
- no external URL/script;
- no gameplay/reward/RNG/Save metadata;
- the exact four semantic IDs now having >=3 compatible sequences.

## Export-ready source manifest

File:
`prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-animation-source-manifest-v2.json`.

It records:
- 16 validated source sequences;
- future candidate keys;
- exact semantic IDs;
- ordered frame paths;
- target timing;
- static fallbacks;
- `exportReady=true` only for sequences belonging to identities with >=3 compatible sources;
- zero real GIF paths.

## Selective-copy files for Lead review

### Decision/spec/docs
- `docs/presentation-prep/GIF_EXPORTER_DEPENDENCY_OPTIONS_MATRIX_V2.md`
- `docs/presentation-prep/RECOMMENDED_GIF_EXPORTER_INTEGRATION_PLAN_V2.md`
- `docs/presentation-prep/LUMBER_SPRING_GIF_EXPORT_SPEC_V1.md`
- this handoff.

### New Guard sources
- `assets/presentation-frames/guard-summer-watch-loop-b-frame-01.svg` through `-04.svg`
- `assets/presentation-frames/guard-summer-watch-loop-c-frame-01.svg` through `-04.svg`

### New Tavern sources
- `assets/presentation-frames/tavern-autumn-service-loop-b-frame-01.svg` through `-04.svg`
- `assets/presentation-frames/tavern-autumn-service-loop-c-frame-01.svg` through `-04.svg`

### New School Literacy sources
- `assets/presentation-frames/school-literacy-study-loop-b-frame-01.svg` through `-04.svg`
- `assets/presentation-frames/school-literacy-study-loop-c-frame-01.svg` through `-04.svg`

### Validation/data
- `tests/project-owned-animation-frames-v3.test.ts`
- `content/presentation-drafts/project-owned-animation-source-manifest-v2.json`

Prior source sequences A remain required for the complete three-source groups.

## Production claim

Exporter dependency installed:
**NO**.

Actual GIF bytes:
**0**.

Production GIF pools:
**0**.

Source identities with three compatible sequences:
**4**.

Animation production coverage:
**NOT CLAIMED** until actual GIF bytes are exported, preflighted and mapped.
