# First Three Pool Source Readiness Ledger v1

Exact current-main semantic baseline:
`3fc5495310e281cf5cbe52da3642000f1cb1fb05`.

Authority:
`content/presentation-drafts/project-owned-animation-source-manifest-v3.json`.

## Readiness definition

`SOURCE_READY` means:
- current production semantic presentation ID exists;
- exactly three compatible project-owned source sequences exist;
- each sequence has four ordered local SVG frames;
- static fallback exists;
- normalized export timing is defined;
- future candidate key is stable and locale-neutral;
- no GIF bytes are claimed.

It does **not** mean a production GIF pool exists.

## First three recommended export pools

| Order | Semantic presentation ID | Source sequences | Normalized loop | Static fallback | Status |
| ---: | --- | --- | ---: | --- | --- |
| 1 | `job/lumber/shift/spring/default` | `lumber-spring-work-loop-a/b/c` | 2400 ms | `assets/presentation/career-lumber-shift-spring.svg` | SOURCE_READY |
| 2 | `job/guard/shift/summer/default` | `guard-summer-watch-loop-a/b/c` | 2800 ms | `assets/presentation/career-guard-shift-summer.svg` | SOURCE_READY |
| 3 | `job/tavern/shift/autumn/default` | `tavern-autumn-service-loop-a/b/c` | 2600 ms | `assets/presentation/career-tavern-shift-autumn.svg` | SOURCE_READY |

These are the recommended first three real pools after exporter approval because they exercise three ordinary-career visual patterns while already having shipped project-owned static fallbacks.

## Additional source-ready semantic identities

| Semantic presentation ID | Source sequences | Normalized loop | Static fallback | Status |
| --- | --- | ---: | --- | --- |
| `school/literacy-and-numbers/lesson/default` | `school-literacy-study-loop-a/b/c` | 3000 ms | `assets/presentation/school-course-literacy-and-numbers.svg` | SOURCE_READY |
| `location/town/event/poverty-street-production-helpful-summer/default` | `poverty-helpful-summer-loop-a/b/c` | 2400 ms | `assets/presentation/poverty-street-helpful-summer.svg` | SOURCE_READY |
| `activity/forest/return/success` | `forest-success-return-loop-a/b/c` | 3200 ms | `assets/presentation/forest-return-success-v2.svg` | SOURCE_READY |
| `relationship/lumber-foreman/lumber-night-foreman-professional/default` | `foreman-night-professional-loop-a/b/c` | 3600 ms | `assets/presentation/foreman-night-voluntary-v2.svg` | SOURCE_READY |
| `school/arcana/lesson/default` | `school-arcana-rune-loop-a/b/c` | 3000 ms | `assets/presentation/school-course-arcana.svg` | SOURCE_READY |

## Aggregate

- current semantic identities with >=3 compatible source sequences: **8**;
- compatible source sequences: **24**;
- source SVG frames: **96**;
- semantic identities with exactly 3 source sequences: **8 / 8**;
- real GIF files: **0**;
- real PR42 GIF pools: **0**.

## Export blocker

All eight source groups remain blocked only at the binary export stage:

**the approved, exact-pinned SVG-frame -> GIF development toolchain is not yet installed in the repository/CI path.**

Recommended non-installed path:
- `sharp@0.35.4`;
- `gifenc@1.0.3`.

Lead approval/integration is required before exporter dependencies or package scripts are changed.

## Production boundary

Do not treat `SOURCE_READY` as animation coverage.

A semantic identity becomes production-animation-ready only after:
1. three actual GIF files are exported;
2. signatures/dimensions/frame timing/loop behavior pass QA;
3. file sizes pass budget;
4. RU+EN candidate alt/caption keys exist;
5. PR42 pool mapping uses exact current semantic ID;
6. deterministic locale-independent selection is tested;
7. static fallback remains intact;
8. exact-head CI passes.
