# Project-Owned Animation Source Handoff v4

Scope: Chat 2 items **268–278**.

Exact current-main semantic baseline rechecked during this queue:
`3fc5495310e281cf5cbe52da3642000f1cb1fb05`.

## Result

The project now has a complete source-authoring layer for eight current semantic presentation identities.

Validated totals:
- semantic identities: **8**;
- source sequences: **24**;
- SVG frames: **96**;
- source sequences per identity: **3**;
- real GIF files: **0**;
- production GIF pools: **0**.

No gameplay/runtime/schema/UI file was changed.

## New source sequences from items 268–274

### Ordinary poverty helpful summer

Semantic:
`location/town/event/poverty-street-production-helpful-summer/default`.

Existing:
- `poverty-helpful-summer-loop-a`.

New:
- `poverty-helpful-summer-loop-b`;
- `poverty-helpful-summer-loop-c`.

The three loops remain ordinary-poverty presentation only. Secret Debt is excluded.

### Forest success return

Semantic:
`activity/forest/return/success`.

Existing:
- `forest-success-return-loop-a`.

New:
- `forest-success-return-loop-b`;
- `forest-success-return-loop-c`.

No route/token/challenge semantic is introduced.

### Foreman professional Night

Semantic:
`relationship/lumber-foreman/lumber-night-foreman-professional/default`.

Existing:
- `foreman-night-professional-loop-a`.

New:
- `foreman-night-professional-loop-b`;
- `foreman-night-professional-loop-c`.

No relationship stage or Night gameplay mechanic is introduced.

### School Arcana

Semantic:
`school/arcana/lesson/default`.

Existing:
- `school-arcana-rune-loop-a`.

New:
- `school-arcana-rune-loop-b`;
- `school-arcana-rune-loop-c`.

The source is presentation-only and does not encode lesson result/stat gain/teacher routing.

## Timing normalization

Authority:
`docs/presentation-prep/ANIMATION_TIMING_NORMALIZATION_V1.md`.

Normalized future export timing:

| Semantic identity | Export loop | Frame delay |
| --- | ---: | ---: |
| Lumber spring | 2400 ms | 600 ms |
| Guard summer | 2800 ms | 700 ms |
| Tavern autumn | 2600 ms | 650 ms |
| School Literacy | 3000 ms | 750 ms |
| Poverty helpful summer | 2400 ms | 600 ms |
| Forest success return | 3200 ms | 800 ms |
| Foreman Night | 3600 ms | 900 ms |
| School Arcana | 3000 ms | 750 ms |

Original per-sequence source timing remains recorded in SVG metadata; normalization is an export target and does not rewrite source-history metadata.

## Source manifest v3

File:
`prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-animation-source-manifest-v3.json`.

It records all 24 source sequences with:
- exact current semantic `presentationId`;
- stable candidate key;
- four ordered SVG frame paths;
- authored source-loop duration;
- normalized export-loop duration;
- normalized per-frame delay;
- current static fallback;
- `exportReady=true`;
- `gifPath=null`.

Every listed semantic identity has exactly three compatible source sequences.

## Validator v4

File:
`prior-work/astra/prototype-m3.2/tests/project-owned-animation-frames-v4.test.ts`.

It validates:
- 24 sequences / 96 frames;
- exact current semantic IDs;
- unique candidate keys;
- four ordered frames per sequence;
- consistent 1200×675 viewBox;
- exact sequence/frame/duration metadata;
- source frame byte distinctness;
- static fallback existence;
- no external URLs/scripts;
- no gameplay/reward/effect/RNG/Save metadata;
- exactly three compatible sequences per semantic identity;
- zero GIF paths.

## First-three-pool readiness

Ledger:
`docs/presentation-prep/FIRST_THREE_POOL_SOURCE_READINESS_LEDGER_V1.md`.

Recommended first three future binary-export pools:
1. `job/lumber/shift/spring/default`;
2. `job/guard/shift/summer/default`;
3. `job/tavern/shift/autumn/default`.

All eight listed identities are source-ready, not just those first three.

## Exact new selective-copy frame files — items 268–274

- `prior-work/astra/prototype-m3.2/assets/presentation-frames/poverty-helpful-summer-loop-b-frame-01.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/poverty-helpful-summer-loop-b-frame-02.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/poverty-helpful-summer-loop-b-frame-03.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/poverty-helpful-summer-loop-b-frame-04.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/poverty-helpful-summer-loop-c-frame-01.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/poverty-helpful-summer-loop-c-frame-02.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/poverty-helpful-summer-loop-c-frame-03.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/poverty-helpful-summer-loop-c-frame-04.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/forest-success-return-loop-b-frame-01.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/forest-success-return-loop-b-frame-02.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/forest-success-return-loop-b-frame-03.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/forest-success-return-loop-b-frame-04.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/forest-success-return-loop-c-frame-01.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/forest-success-return-loop-c-frame-02.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/forest-success-return-loop-c-frame-03.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/forest-success-return-loop-c-frame-04.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/foreman-night-professional-loop-b-frame-01.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/foreman-night-professional-loop-b-frame-02.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/foreman-night-professional-loop-b-frame-03.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/foreman-night-professional-loop-b-frame-04.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/foreman-night-professional-loop-c-frame-01.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/foreman-night-professional-loop-c-frame-02.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/foreman-night-professional-loop-c-frame-03.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/foreman-night-professional-loop-c-frame-04.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/school-arcana-rune-loop-b-frame-01.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/school-arcana-rune-loop-b-frame-02.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/school-arcana-rune-loop-b-frame-03.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/school-arcana-rune-loop-b-frame-04.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/school-arcana-rune-loop-c-frame-01.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/school-arcana-rune-loop-c-frame-02.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/school-arcana-rune-loop-c-frame-03.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/school-arcana-rune-loop-c-frame-04.svg`

## Exact new selective-copy data/test/docs — items 275–278

- `docs/presentation-prep/ANIMATION_TIMING_NORMALIZATION_V1.md`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-animation-source-manifest-v3.json`
- `prior-work/astra/prototype-m3.2/tests/project-owned-animation-frames-v4.test.ts`
- `docs/presentation-prep/FIRST_THREE_POOL_SOURCE_READINESS_LEDGER_V1.md`
- this handoff.

## Required prior source prerequisites

Manifest v3 intentionally includes source sequences created before item 268.

Lead must also retain/copy the prior project-owned frame files for:
- `lumber-spring-work-loop-a/b/c`;
- `guard-summer-watch-loop-a/b/c`;
- `tavern-autumn-service-loop-a/b/c`;
- `school-literacy-study-loop-a/b/c`;
- `poverty-helpful-summer-loop-a`;
- `forest-success-return-loop-a`;
- `foreman-night-professional-loop-a`;
- `school-arcana-rune-loop-a`.

Those prerequisites were already handed off in:
- `PROJECT_OWNED_ANIMATION_SOURCE_HANDOFF_V2.md`;
- `PROJECT_OWNED_ANIMATION_EXPORTER_HANDOFF_V3.md`.

## Exporter dependency remains uninstalled

Recommended but not installed:
- `sharp@0.35.4`;
- `gifenc@1.0.3`.

No `package.json` or `package-lock.json` change was made by Chat 2.

## Production boundary

Do not:
- treat source SVG sequences as GIF candidates;
- populate PR42 media candidates with SVG frame paths;
- claim production animation coverage;
- create placeholder GIFs;
- install exporter dependencies without Lead approval.

The project is now **source-ready for multiple real 3-candidate pools**, but remains **binary-export blocked** until the approved dev-only exporter is integrated.

## Final state

Project-owned source animation:
**READY — 8 semantic identities / 24 sequences / 96 frames**.

First three pool source groups:
**READY**.

Actual GIF bytes:
**0**.

Production PR42 GIF pools:
**0**.

Remaining blocker:
**approved reproducible SVG-frame -> GIF exporter integration**.
