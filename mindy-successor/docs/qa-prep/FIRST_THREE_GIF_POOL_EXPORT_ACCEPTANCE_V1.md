# First-three GIF pool export acceptance v1

Status: COMPLETE / PRODUCTION_ACCEPTANCE_CONTRACT / NO_REAL_GIFS_YET

Current production main:
`6e2a5147603b71eed89a0966af417a33dd28d7a7`.

Source plan:
`FIRST_THREE_POOL_EXPORT_PLAN_V2.md`
blob `a651f2295b392105299c1e1a6901e3f60649d1a3`.

Current actual GIF candidates:
`0 / 9`.

Current production pools:
`0 / 3`.

This file defines acceptance for the first real exported pools only.

## Pool A — Lumber spring

Semantic presentation ID:
`job/lumber/shift/spring/default`.

Required real candidates:
1. `lumber-spring-loop-a`
   -> `assets/gif/careers/lumber/spring-loop-a.gif`;
2. `lumber-spring-loop-b`
   -> `assets/gif/careers/lumber/spring-loop-b.gif`;
3. `lumber-spring-loop-c`
   -> `assets/gif/careers/lumber/spring-loop-c.gif`.

Expected technical metadata:
- 640×360;
- 4 frames;
- 600 ms/frame;
- 2400 ms loop;
- infinite loop.

Static fallback:
`assets/presentation/career-lumber-shift-spring.svg`.

## Pool B — Guard summer

Semantic presentation ID:
`job/guard/shift/summer/default`.

Required real candidates:
1. `guard-summer-loop-a`;
2. `guard-summer-loop-b`;
3. `guard-summer-loop-c`.

Expected paths:
`assets/gif/careers/guard/summer-loop-{a,b,c}.gif`.

Expected:
- 640×360;
- 4 frames;
- 700 ms/frame;
- 2800 ms loop;
- infinite loop.

Static fallback:
`assets/presentation/career-guard-shift-summer.svg`.

## Pool C — Tavern autumn

Semantic presentation ID:
`job/tavern/shift/autumn/default`.

Required real candidates:
1. `tavern-autumn-loop-a`;
2. `tavern-autumn-loop-b`;
3. `tavern-autumn-loop-c`.

Expected paths:
`assets/gif/careers/tavern/autumn-loop-{a,b,c}.gif`.

Expected:
- 640×360;
- 4 frames;
- 650 ms/frame;
- 2600 ms loop;
- infinite loop.

Static fallback:
`assets/presentation/career-tavern-shift-autumn.svg`.

## Real-byte requirement

Each candidate must be an actual repository file.

Accept signatures:
- `GIF87a`;
- `GIF89a`.

Reject:
- fake header-only files;
- placeholder/staging/test-fixture bytes;
- source SVG renamed to .gif;
- external URL/data URL;
- missing file;
- zero-frame/corrupt GIF.

Every candidate must pass the project-owned GIF validator against expected metadata.

## Build-copy requirement

After build, each source GIF must exist under:
`dist/assets/gif/...`
at the corresponding relative path.

Require source/dist:
- both present;
- byte-identical;
- same SHA-256.

No runtime transcoding or regeneration in the shipped app.

## Per-file technical budget

Preferred:
`<= 2 MiB`.

Normal validator ceiling:
`<= 5 MiB`.

A file over 5 MiB requires explicit optimization/review.

Default reject over:
`8 MiB`
unless an explicit Lead exception is documented.

## Per-pool budget

For each 3-candidate pool:

Preferred:
`<= 6 MiB` total.

Soft review:
`> 8 MiB`.

Hard review:
`> 15 MiB`.

Optimize before increasing budget.

## Candidate-count requirement

For these first pools:
exactly `3` real compatible candidates each.

This satisfies the production 3–5 rule.

A pool with:
- 0 candidates;
- 1 candidate;
- 2 candidates
is not production-ready.

Do not count static fallback as a GIF candidate.

## Provenance

Every candidate requires a recorded project-owned export receipt containing:
- semantic presentationId;
- candidate key;
- source sequence key;
- ordered source frame hashes;
- exporter script revision;
- dependency lock revision;
- Node/platform;
- GIF SHA-256;
- byte size;
- dimensions;
- frame count;
- delay/duration;
- loop count.

External downloaded GIFs do not satisfy this first project-owned export acceptance.

## RU+EN accessibility

Each activated candidate/pool must have complete RU+EN presentation accessibility metadata as required by the current presentation schema/production pool patch.

Locale text may change.

Candidate key, GIF path and semantic presentation ID must remain locale-neutral.

No RU/EN duplicate physical GIF is required.

## Deterministic selection

For identical:
- presentationId;
- occurrence key;
- pool version
the selected candidate must be deterministic.

RU and EN must select the same candidate.

Locale must not:
- reseed;
- reroll;
- reorder;
- change candidate eligibility.

Save/reload and re-render of the same occurrence must preserve presentation selection according to the shipped deterministic presentation contract.

## No gameplay RNG

Pool selection must not consume:
- global gameplay RNG;
- Activity RNG;
- event RNG/variant RNG.

Presentation selection is presentation-owned only.

Executable acceptance:
snapshot gameplay RNG before media resolve and require exact equality afterward.

## No gameplay Save mutation

Resolving or rendering a GIF candidate must not write:
- gameplay Save;
- action/scene/event identity;
- career counters;
- metrics/resources;
- route state;
- Journal refs;
- NightFlow.

Locale switch and animation toggle are presentation operations only.

## Static fallback

For every pool:
- animations disabled -> shipped static fallback;
- reduced-motion/static mode -> shipped static fallback;
- missing/failed GIF candidate -> next valid presentation fallback according to current runtime;
- total GIF failure -> static fallback.

Fallback may not alter gameplay.

## Semantic compatibility

All three candidates within one pool must be semantically interchangeable.

Lumber spring candidates:
ordinary Lumber spring work only.

Guard summer:
ordinary Guard summer shift only.

Tavern autumn:
ordinary Tavern autumn shift only.

Reject a candidate that encodes:
- different gameplay outcome;
- reward;
- failure/success;
- route choice;
- hidden story state
not shared by the semantic slot.

## Reproducibility

On the approved same pinned exporter environment, repeat exports must be byte-identical.

Require same SHA-256 for two independent exports from the same exact source sequence/config.

If cross-platform output differs, each supported platform must still be internally byte-stable and metadata-equivalent under the approved reproducibility policy.

## Runtime tests

For each pool:
1. animations-on resolves one of exactly three real GIFs;
2. deterministic same occurrence resolves same candidate repeatedly;
3. RU->EN keeps same candidate;
4. animations-off resolves static SVG;
5. bad/missing candidate falls back safely;
6. gameplay Save/RNG unchanged;
7. build copy exists and is byte-identical.

## Full CI gate

Before a pool can be called production-ready:
- exporter dependencies/tools approved and pinned;
- all 3 files exported;
- validator green;
- localization/presentation patch reviewed;
- typecheck/validate/build/tests green;
- exact-head GitHub CI green;
- post-merge main push green.

## Current verdict

`NO_REAL_GIFS_YET`.

Acceptance contract is ready.

Do not claim any of the first three pools until 9 actual validated GIF files exist and the corresponding production presentation patch passes this gate.
