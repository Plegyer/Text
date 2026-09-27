# Project-Owned Animation Integration Handoff v1

Scope: Chat 2 items **232–242**.

Current main observed during handoff:
`d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`
(PR49: non-career project-owned static-media refinement).

## GIF export viability

Decision:
**NEEDS_SMALL_DEV_DEPENDENCY**.

The repository can:
- author project-owned SVG frame sequences;
- distribute already-created GIF files;
- validate real GIF signatures and pools.

The repository cannot currently:
- reproducibly rasterize SVG frames;
- reproducibly encode animated GIF bytes;
- do so through a declared Node/CI toolchain.

No new dependency was added.

## Frame sources created

Eight original project-owned SVG frame files were created under:

`prior-work/astra/prototype-m3.2/assets/presentation-frames/`

### Lumber spring work loop

Semantic identity:
`job/lumber/shift/spring/default`

Sequence:
`lumber-spring-work-loop-a`

Frames:
- `lumber-spring-work-loop-a-frame-01.svg`
- `lumber-spring-work-loop-a-frame-02.svg`
- `lumber-spring-work-loop-a-frame-03.svg`
- `lumber-spring-work-loop-a-frame-04.svg`

Declared loop duration:
2400 ms.

### School Arcana rune loop

Semantic identity:
`school/arcana/lesson/default`

Sequence:
`school-arcana-rune-loop-a`

Frames:
- `school-arcana-rune-loop-a-frame-01.svg`
- `school-arcana-rune-loop-a-frame-02.svg`
- `school-arcana-rune-loop-a-frame-03.svg`
- `school-arcana-rune-loop-a-frame-04.svg`

Declared loop duration:
3000 ms.

Each frame embeds:
- exact semantic presentation ID;
- sequence ID;
- frame index/count;
- loop-duration metadata.

No gameplay fields or external media are embedded.

## Validation

Test:
`prior-work/astra/prototype-m3.2/tests/project-owned-animation-frames-v1.test.ts`

It checks:
- all 8 frame files exist;
- SVG parse sanity;
- consistent 1200×675 viewBox;
- exact semantic metadata;
- frame count/index metadata;
- no external URL/script;
- no gameplay-state/reward/effect/RNG/Save metadata.

## Actual GIF export result

Item 238:
**BLOCKED_BY_GIF_EXPORT**.

Actual project-owned production GIF files created:
**0**.

No fake GIF bytes and no external downloaded media were added.

Blocker file:
`docs/presentation-prep/FIRST_PROJECT_OWNED_GIF_EXPORT_BLOCKER_V1.md`.

Technical QA file:
`docs/presentation-prep/FIRST_PROJECT_OWNED_GIF_TECHNICAL_QA_V1.md`.

## Pool state

File:
`prior-work/astra/prototype-m3.2/content/presentation-drafts/first-project-owned-gif-pool-v1.json`.

Status:
`BLOCKED_BY_GIF_EXPORT`.

Target semantic identity:
`job/lumber/shift/spring/default`.

Actual GIF candidates:
**0**.

Production pool:
**none**.

Current static fallback preserved:
`assets/presentation/career-lumber-shift-spring.svg`.

## Localization state

File:
`prior-work/astra/prototype-m3.2/content/first-project-owned-gif-localization-v1.fixture.json`.

Actual GIF candidate strings:
**0**.

No fake RU/EN media keys are emitted because no GIF candidates exist.

## Blocked-state regression

Test:
`prior-work/astra/prototype-m3.2/tests/project-owned-gif-build-runtime-v1.test.ts`.

It validates:
- blocked pool status;
- zero candidate claim;
- empty presentation-patch slots/media;
- preserved static fallback;
- empty localization delta;
- no item-238 production GIF files;
- real frame-source SVGs remain separate from production-GIF claims.

## Selective-copy files ready now

### Documentation
- `docs/presentation-prep/PROJECT_OWNED_GIF_PRODUCTION_CAPABILITY_AUDIT_V1.md`
- `docs/presentation-prep/GIF_EXPORT_PIPELINE_DECISION_PACKET_V1.md`
- `docs/presentation-prep/FIRST_ANIMATION_SEMANTIC_PRIORITY_LIST_V2.md`
- `docs/presentation-prep/FIRST_ANIMATION_MOTION_BRIEFS_V1.md`
- `docs/presentation-prep/FIRST_PROJECT_OWNED_GIF_EXPORT_BLOCKER_V1.md`
- `docs/presentation-prep/FIRST_PROJECT_OWNED_GIF_TECHNICAL_QA_V1.md`
- this handoff.

### Frame sources
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/lumber-spring-work-loop-a-frame-01.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/lumber-spring-work-loop-a-frame-02.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/lumber-spring-work-loop-a-frame-03.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/lumber-spring-work-loop-a-frame-04.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/school-arcana-rune-loop-a-frame-01.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/school-arcana-rune-loop-a-frame-02.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/school-arcana-rune-loop-a-frame-03.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/school-arcana-rune-loop-a-frame-04.svg`

### Tests/data
- `prior-work/astra/prototype-m3.2/tests/project-owned-animation-frames-v1.test.ts`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/first-project-owned-gif-pool-v1.json`
- `prior-work/astra/prototype-m3.2/content/first-project-owned-gif-localization-v1.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/project-owned-gif-build-runtime-v1.test.ts`

## Not ready for Lead production activation

There is no GIF pool to activate.

Do not:
- add empty/placeholder candidates to root presentation;
- treat SVG frames as GIFs;
- add external downloaded GIFs;
- add an unapproved exporter dependency;
- claim animation coverage from frame sources alone.

## Next work only after Lead review

The next animation-production step requires Lead approval of a reproducible dev-only SVG-frame -> GIF export toolchain.

After approval:
1. add/pin the approved exporter;
2. export three compatible Lumber spring loop candidates from project-owned frame sources;
3. run technical QA/signature/build checks;
4. populate a real 3–5 candidate PR42 pool;
5. add actual RU+EN candidate alt/caption keys;
6. run deterministic-selection/static-fallback regressions;
7. require exact-head CI.

Until that approval, project-owned static fallbacks remain complete and production-safe.
