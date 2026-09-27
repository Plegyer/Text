# Project-Owned Animation Source Handoff v2

Scope: Chat 2 items **244–254**.

Current semantic baseline used for validation:
`main@d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`.

## Source status

Project-owned frame-source authoring can proceed while GIF export remains blocked.

Validated source set:
- **10 frame sequences**;
- **40 SVG frame files**;
- **8 current production semantic presentation identities**;
- **0 GIF files**;
- **0 production animation pools**.

All frame files are repository-authored SVGs under:
`prior-work/astra/prototype-m3.2/assets/presentation-frames/`.

## Lumber spring — first 3-source-sequence identity

Current semantic identity:
`job/lumber/shift/spring/default`.

Three compatible source sequences now exist:

### Sequence A
`lumber-spring-work-loop-a`
- 4 frames;
- 2400 ms target loop;
- work-tool / foliage motion;
- static fallback: `assets/presentation/career-lumber-shift-spring.svg`.

### Sequence B
`lumber-spring-work-loop-b`
- 4 frames;
- 2200 ms target loop;
- distinct tool-angle / chip / foliage beat;
- same semantic identity and static fallback.

### Sequence C
`lumber-spring-work-loop-c`
- 4 frames;
- 2600 ms target loop;
- distinct log-handling / foliage movement;
- same semantic identity and static fallback.

This is the first current semantic identity with **three compatible project-owned source sequences** ready for future GIF encoding.

It is not yet a 3-candidate GIF pool because no GIF bytes exist.

## Additional validated sequences

### Guard summer
Semantic:
`job/guard/shift/summer/default`

Sequence:
`guard-summer-watch-loop-a`

Frames:
4.

Motion:
summer sun, pennant, weapon/idle micro-motion.

Static fallback:
`assets/presentation/career-guard-shift-summer.svg`.

### Tavern autumn
Semantic:
`job/tavern/shift/autumn/default`

Sequence:
`tavern-autumn-service-loop-a`

Frames:
4.

Motion:
service vessels, cloth, small hand movement.

Static fallback:
`assets/presentation/career-tavern-shift-autumn.svg`.

### School Literacy & Numbers
Semantic:
`school/literacy-and-numbers/lesson/default`

Sequence:
`school-literacy-study-loop-a`

Frames:
4.

Motion:
page shift, counting tokens, study-hand micro-motion.

Static fallback:
`assets/presentation/school-course-literacy-and-numbers.svg`.

No teacher route/stage is introduced.

### Ordinary poverty helpful summer
Semantic:
`location/town/event/poverty-street-production-helpful-summer/default`

Sequence:
`poverty-helpful-summer-loop-a`

Frames:
4.

Motion:
small parcel/help exchange, warm street vegetation, hand micro-motion.

Static fallback:
`assets/presentation/poverty-street-helpful-summer.svg`.

Secret Debt is excluded.

### Forest success return
Semantic:
`activity/forest/return/success`

Sequence:
`forest-success-return-loop-a`

Frames:
4.

Motion:
leaf drift, safe-return idle/breathing, bag settling, light pulse.

Static fallback:
`assets/presentation/forest-return-success-v2.svg`.

No route/token/challenge semantic is introduced.

### Foreman professional Night follow-up
Semantic:
`relationship/lumber-foreman/lumber-night-foreman-professional/default`

Sequence:
`foreman-night-professional-loop-a`

Frames:
4.

Motion:
fire flicker, ember rise, calm character idle motion.

Static fallback:
`assets/presentation/foreman-night-voluntary-v2.svg`.

No new relationship stage/Night mechanics are introduced.

### School Arcana — prior sequence retained
Semantic:
`school/arcana/lesson/default`

Sequence:
`school-arcana-rune-loop-a`

Frames:
4.

Motion:
rune glow, motes, page shift.

Static fallback:
`assets/presentation/school-course-arcana.svg`.

This prior sequence remains part of the validated source manifest.

## Validation

New regression:
`prior-work/astra/prototype-m3.2/tests/project-owned-animation-frames-v2.test.ts`.

It validates:
- exact current semantic IDs;
- 10 sequence keys;
- 40 unique frame paths;
- 4 ordered frames per sequence;
- consistent `viewBox="0 0 1200 675"`;
- exact sequence/presentation/frame-count/index/duration metadata;
- no external URLs;
- no scripts;
- no reward/effect/RNG/Save/gameplay metadata;
- local project-owned SVG source only.

## Export-ready source manifest

File:
`prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-animation-source-manifest-v1.json`.

Contains for every validated sequence:
- exact `presentationId`;
- sequence key;
- ordered frame paths;
- target loop duration;
- future candidate key;
- current static fallback.

It intentionally contains:
- **0 GIF paths**.

## Exact remaining blocker

The only blocker to converting the first three Lumber source sequences into actual animation candidates is:

**the repository still has no approved, declared, reproducible SVG-frame -> animated-GIF export toolchain.**

Current classification remains:
`NEEDS_SMALL_DEV_DEPENDENCY`.

Required before export:
1. Lead/Product approves the exporter dependency/tool;
2. version is pinned;
3. local and CI/dev invocation is reproducible;
4. exporter consumes only repository-local project-owned SVG frames;
5. output dimensions/frame timing/loop behavior are fixed;
6. resulting GIF bytes pass signature/size/build/runtime QA.

No dependency was added by items 244–254.

## Selective-copy frame sources

### Lumber spring A
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/lumber-spring-work-loop-a-frame-01.svg`
- `...-02.svg`
- `...-03.svg`
- `...-04.svg`

### Lumber spring B
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/lumber-spring-work-loop-b-frame-01.svg`
- `...-02.svg`
- `...-03.svg`
- `...-04.svg`

### Lumber spring C
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/lumber-spring-work-loop-c-frame-01.svg`
- `...-02.svg`
- `...-03.svg`
- `...-04.svg`

### Guard summer
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/guard-summer-watch-loop-a-frame-01.svg`
- `...-02.svg`
- `...-03.svg`
- `...-04.svg`

### Tavern autumn
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/tavern-autumn-service-loop-a-frame-01.svg`
- `...-02.svg`
- `...-03.svg`
- `...-04.svg`

### School Literacy
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/school-literacy-study-loop-a-frame-01.svg`
- `...-02.svg`
- `...-03.svg`
- `...-04.svg`

### Poverty helpful summer
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/poverty-helpful-summer-loop-a-frame-01.svg`
- `...-02.svg`
- `...-03.svg`
- `...-04.svg`

### Forest success return
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/forest-success-return-loop-a-frame-01.svg`
- `...-02.svg`
- `...-03.svg`
- `...-04.svg`

### Foreman Night
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/foreman-night-professional-loop-a-frame-01.svg`
- `...-02.svg`
- `...-03.svg`
- `...-04.svg`

### School Arcana
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/school-arcana-rune-loop-a-frame-01.svg`
- `...-02.svg`
- `...-03.svg`
- `...-04.svg`

## Selective-copy data/test/docs

- `docs/presentation-prep/ANIMATION_SOURCE_BACKLOG_AFTER_EXPORT_BLOCKER_V1.md`
- `prior-work/astra/prototype-m3.2/tests/project-owned-animation-frames-v2.test.ts`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-animation-source-manifest-v1.json`
- this handoff.

The earlier GIF-export blocker/decision packet remains authoritative for why no GIF bytes are present.

## Commit ledger

- 244 — `d381107393722237df4fa37550137aaa549e7e78`
- 245 — `a824cd99da3f771d7af4c7404b572a124e1f6502`
- 246 — `8aff98433704631628e53cf55404a172a468c68a`
- 247 — `a6f83dc8030c0bf9c2adb3ccaa5172ab1035162b`
- 248 — `d8b246345b3fda20c331e72a871f44605517f3dd`
- 249 — `7d1b2e849b2929dc79ba88bff384422a6de754cb`
- 250 — `99f8eb9d07fad9f7045113e36a79ab02e624eda3`
- 251 — `04ee8d375d6660a11ca8d6c077dd2a557d53d43d`
- 252 — `f760505109e1561714d00020becc2c110f53657e`
- 253 — `3f389b17213cc9ee3794e72fbf85db4ac968f2ab`
- 254 — `29db4e86f52fcbcd091e4f61a3cadc30f4718b48`

## Production claim

Frame-source readiness:
**YES**.

One semantic identity with 3 compatible source sequences:
**YES — Lumber spring**.

Actual GIF bytes:
**0**.

Production 3–5 GIF pool:
**NO**.

Animation coverage claim:
**NO**.

Next animation work should begin only after Lead reviews/approves the export toolchain.
