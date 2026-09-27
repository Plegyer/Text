# Current-main CI regression floor v3

Status: COMPLETE / CURRENT_MAIN_CI_GREEN

Current main:
`1af3104c1e4c180019b965adac8e87e67de89347`
(PR46 merge).

## Latest post-merge main workflow

Workflow:
- name: `mindy-successor check`
- run #71
- run id: `36343191446`
- event: `push`
- head SHA: `1af3104c1e4c180019b965adac8e87e67de89347`
- conclusion: SUCCESS

Full check:
- validator: `Content OK: 17 packs, 46 events, 35 actions, 9 endings.`
- build: PASS
- tests: 307
- pass: 307
- fail: 0

This is post-merge push evidence on the exact current main SHA.

## PR46 exact-head corroboration

Accepted PR46 head:
`1ee9d26ce0dd12cb4b77b9e5b18ee1a117ce6433`.

Exact-head workflow:
- run #70
- run id `36343095488`
- conclusion: SUCCESS
- validator: 17 packs, 46 events, 35 actions, 9 endings
- tests: 307
- pass: 307
- fail: 0

Relevant exact-head regressions pass:
- Foreman RU+EN root-bundle contract;
- Foreman relationship/Night/Hard Work mechanic lock;
- School Night-study locale regression;
- ordinary poverty pending-scene locale regression;
- Foreman relationship + voluntary Night locale/save invariance.

## Current regression floor

For the next presentation/localization-only integration, unexpected drift below or away from this current baseline is blocking unless the PR intentionally and separately reviews gameplay content changes.

Baseline:
- packs: 17
- events: 46
- actions: 35
- endings: 9
- tests: 307 passing
- failures: 0

A presentation/static-media PR should normally preserve:
- pack count;
- event count;
- action count;
- ending count.

Its test count may increase, but existing tests must not disappear without explicit reviewed reason.

## Required next-PR evidence

Before merge, record:
- exact PR head SHA;
- workflow run number/id;
- validator counts;
- total/pass/fail test count;
- domain-specific regression names.

A previous green main run is not proof that a later PR head is green.

## Post-merge requirement

After merge, require a successful `push` workflow bound to the resulting main SHA.

If a future merge has no post-merge push run available yet:
- explicitly record `POST_MERGE_PUSH_EVIDENCE_PENDING`;
- do not substitute exact-head PR success for main success;
- do not mark the post-merge gate green until the main run exists and succeeds.

For the current audit, this caveat does not apply: run #71 is present and green.

## Locked high-value regressions

Future work must continue to preserve:
- Lumber Hard Work only `completed_shifts >= 50`;
- reward `hardWork:lumber`;
- exact Forest success result continuation;
- School paid-lesson and Night-study Save invariance under locale;
- ordinary poverty RU+EN natural paths;
- generic Night-choice localization without gameplay Save mutation;
- Foreman `night_meetings += 1` and next-day Energy delta 0.

## Verdict

`CURRENT_MAIN_CI_GREEN`.

Current production CI floor is:
`main 1af3104... / run #71 / 307 of 307 passing / 17 packs, 46 events, 35 actions, 9 endings`.
