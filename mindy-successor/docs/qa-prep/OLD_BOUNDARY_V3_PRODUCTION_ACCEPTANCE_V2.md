# Old Boundary v3 production acceptance v2

Status: COMPLETE / GREEN_POST_MERGE_MAIN

Reviewed Chat2 items:
`317–319`.

## Item 317 — activation candidate

`old-boundary-v3-current-main-activation-v1.json`

Blob:
`432df4cd195252fe76f6bb48268b9ccd7eef32a7`.

Exact semantic target:
`activity/forest/route/old-boundary`.

Static:
`assets/presentation/forest-route-old-boundary-v3.svg`.

Fallback:
`activity/forest/route/default`.

Payload is presentation-only with no gameplay/runtime fields.

## Item 318 — accessibility

`old-boundary-v3-accessibility-v1.fixture.json`

Blob:
`c39c466b9a8d6999e1b144a2b7e4cf350e8e3809`.

Complete RU+EN:
- `presentation.activity.forest.route.old-boundary.alt`;
- `presentation.activity.forest.route.old-boundary.caption`.

Copy is limited to stones/marks/path semantics.

## Item 319 — activation regression

`old-boundary-v3-current-main-activation-v1.test.ts`

Blob:
`92724086a12174a7f1ce188191ab22fc54afdb9d`.

It validates:
- exact semantic ID;
- local project-owned SVG;
- 1200×675;
- no scripts/external resources;
- recursive build-copy path;
- locale-neutral media identity;
- neutral fallback retention;
- no forbidden gameplay fields;
- no Hunter/token/gate/challenge/reward/result/magic semantics.

Its original "no root slot yet" assertion was intentionally a post-PR59 pre-activation collision check and is superseded after PR60.

## Physical asset

`forest-route-old-boundary-v3.svg`

Blob:
`97c38b2f08073b2e833289d2ca31fc29841ec4a3`.

Observed:
- narrow old path;
- low/weathered stones;
- weathered marks;
- vegetation/mist.

Absent:
- gate/arch/barrier;
- key/token;
- Hunter;
- challenge/reward;
- success/failure/result cue;
- magic activation.

## Production integration

PR #60:
`Lead: activate safe old-boundary Forest static`.

Accepted exact head:
`36f933d8c01a249992d84295bc69c3d554bb1f89`.

Run #119 / id `36410203903`:
- SUCCESS;
- validator 17 / 46 / 35 / 9;
- 363 / 363.

Merge:
`2ad9fb8b0572f8903bbf57d144c8c5938023a440`.

Post-merge run #120 / id `36410358345`:
- SUCCESS;
- validator 17 / 46 / 35 / 9;
- 363 / 363.

Latest current main after PR61 still retains the exact v3 asset/slot.

## Gameplay firewall

Unchanged:
- persisted routeId `old-boundary`;
- Old Boundary capability gate;
- route option identity;
- progress/endurance;
- Forest result IDs/reactions;
- RNG;
- Save;
- Lumber Hard Work.

## Verdict

`GREEN_POST_MERGE_MAIN`.

The safe stones/marks/path v3 asset is production-shipped with bilingual accessibility and no Product-open leakage.
