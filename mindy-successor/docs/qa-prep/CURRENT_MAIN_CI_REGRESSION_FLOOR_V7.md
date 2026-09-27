# Current-main CI regression floor v7

Status: COMPLETE / CURRENT_MAIN_CI_GREEN

Current main:
`f93878b954385a1c61d8a06a0673354207d11d70`
(PR50 merge).

## Latest successful main push

Workflow:
- `mindy-successor check`
- run #82
- id `36346497575`
- event: push
- head SHA: `f93878b954385a1c61d8a06a0673354207d11d70`
- conclusion: SUCCESS

Validator:
- packs: 17;
- events: 46;
- actions: 35;
- endings: 9.

Tests:
- 320 total;
- 320 pass;
- 0 fail.

## PR50 exact-head corroboration

Accepted exact head:
`12aa6fa4a35fdb3e6f15edd13936f0757e394b93`.

Workflow:
- run #81;
- id `36346301697`;
- conclusion: SUCCESS;
- validator 17/46/35/9;
- 320/320 tests.

## New PR50 regression floor

Relevant tests PASS on exact head and merged main:
- neutral Forest route/default uses one project-owned locale-neutral static fallback;
- route/default fallback is presentation-only and deterministic;
- renderer natural Explore -> Forest route/default preserves Save across RU↔EN.

## Current localization/media floor

Root localization:
- 403 total keys;
- missing RU: 0;
- missing EN: 0.

Active project-owned static semantic mappings:
`80`.

Unique active project-owned physical sources:
`79`.

Established project-owned static target:
`80 / 80`.

## Minimum next integration floor

For the next localization/presentation-only integration, unexpected drift from:
- 17 packs;
- 46 events;
- 35 actions;
- 9 endings
is blocking unless separately reviewed.

Existing test count must not drop below:
`320`
without an explicit reviewed reason.

Root project-owned static mapping count must not drop below:
`80`
for a text-only integration.

## Locked invariants

Continue to protect:
- Lumber Hard Work eligibility only `completed_shifts >= 50`;
- Meta reward `hardWork:lumber`;
- Forest exact success/escape/failure result IDs;
- exact activityResult reaction identities;
- Old Boundary current `enter_old_boundary` gate;
- route/default presentation has no route-specific semantic effect;
- School locale Save invariance;
- ordinary-poverty natural paths;
- Foreman voluntary Night mechanics;
- generic Night-choice stable-ID localization;
- deterministic presentation selection outside gameplay RNG;
- project-owned static media identity across RU↔EN.

## Future PR evidence

Require:
- exact PR head SHA;
- exact successful full-check run;
- validator counts;
- total/pass/fail tests;
- domain-specific regressions.

Then require successful push CI on the resulting merge SHA.

Do not substitute earlier evidence.

## Verdict

`CURRENT_MAIN_CI_GREEN`.

Current floor:
`main f93878b... / run #82 / 320 of 320 passing / 17 packs, 46 events, 35 actions, 9 endings`.
