# PR44 School localization post-merge audit v1

Status: COMPLETE / GREEN_POST_MERGE_MAIN

PR:
- #44 `Lead: integrate School RU/EN production localization`
- accepted PR head: `07912a4870f82472a01f6ff8d0d81f1f67081593`
- merged: YES
- merge commit / current main at audit: `ab53da4059e348734703c2de490e43e94c02b057`
- merged at: 2026-09-27T13:33:43Z

## Merge identity

GitHub main branch at audit points directly to:
`ab53da4059e348734703c2de490e43e94c02b057`.

Its parents are:
- previous main `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`;
- accepted PR head `07912a4870f82472a01f6ff8d0d81f1f67081593`.

This confirms the accepted exact PR head is the content merged into main.

## Post-merge main CI

Workflow:
- `mindy-successor check`
- run #62
- run id `36322824233`
- event: `push`
- head SHA: `ab53da4059e348734703c2de490e43e94c02b057`
- conclusion: SUCCESS
- check job id: `108629823267`

Full check evidence:
- validation: `Content OK: 17 packs, 46 events, 35 actions, 9 endings.`
- build: PASS
- tests: 301
- pass: 301
- fail: 0

Relevant post-merge renderer tests:
- School RU/EN course command + pending-scene identity: PASS
- School Night-study RU/EN + NightFlow Save invariance: PASS
- Forest RU/EN pending-state regression: PASS

The post-merge run is bound to the actual main merge SHA, not to the prior PR run.

## School localization production status

Main now ships the reviewed PR44 localization/UI integration:
- School panel/help;
- all eight course labels/descriptions;
- tuition/current-Energy copy;
- paid-lesson control;
- current School stat labels used by the localized rows;
- School Night-study labels/context/control;
- current reachable School event/media RU+EN localization;
- localized paid-lesson result presentation.

## Gameplay boundary after merge

No pack/event/action/ending validator count changed from the PR43 baseline:
- packs 17;
- events 46;
- actions 35;
- endings 9.

The PR44 tests preserve:
- paid lesson course command ID;
- tuition and Energy transaction;
- stat package;
- pending current School event identity;
- NightFlow identity;
- gameplay Save across locale switch.

No Save schema or gameplay RNG change was introduced by the localization merge.

## Staging/Product-open boundary after merge

Still not promoted:
- worker-only exact-course teacher events;
- teacher exact-course routing;
- School management/accounting public-result provider/threshold;
- School Arcana/Forest public result;
- real School GIF pools.

PR44 changes presentation/localization for current production only.

## Verdict

`GREEN_POST_MERGE_MAIN`.

PR44 is accepted both at exact PR head and on post-merge main.

Future QA should treat School PR44 localization as `SHIPPED_RU_EN`, not staged, from main SHA `ab53da4059e348734703c2de490e43e94c02b057` onward.
