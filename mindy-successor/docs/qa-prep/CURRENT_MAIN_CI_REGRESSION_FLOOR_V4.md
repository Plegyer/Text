# Current-main CI regression floor v4

Status: COMPLETE / CURRENT_MAIN_CI_GREEN

Current main:
`7f27caca4e3e711799e9c1f235c4a27adbf31026`
(PR47 project-owned static-media merge).

## Latest successful main push

Workflow:
- `mindy-successor check`
- run #74
- id `36344297121`
- event: push
- head SHA: `7f27caca4e3e711799e9c1f235c4a27adbf31026`
- conclusion: SUCCESS

Full check:
- validator: `Content OK: 17 packs, 46 events, 35 actions, 9 endings.`
- tests: 311
- pass: 311
- fail: 0

## PR47 exact-head corroboration

Accepted PR head:
`8f7e5ae18d56542c21e777dfafcce050784c12fa`.

Run #73 / id `36344188520`:
- SUCCESS;
- 311/311 tests;
- same validator counts.

## New static-media floor

Current main now includes:
- 21 project-owned SVG source files;
- 39 activated static presentation slots;
- 21 unique mapped project-owned sources;
- optional presentation altKey support;
- RU+EN localized alt runtime;
- static-media production regressions.

Current localization bundle:
- 267 total keys.

## Regression floor

For the next presentation/localization-only integration, minimum current baseline is:
- packs: 17;
- events: 46;
- actions: 35;
- endings: 9;
- tests: 311 passing;
- failures: 0.

Unexpected loss of existing tests or gameplay-count drift is blocking unless separately reviewed.

## High-value locked regressions

Continue protecting:
- Lumber Hard Work only `completed_shifts >= 50`;
- reward `hardWork:lumber`;
- exact Forest result continuation;
- School RU↔EN Save invariance;
- ordinary poverty natural-path localization;
- Foreman voluntary Night invariance;
- generic Night-choice localization;
- project-owned static exact slot mapping;
- static build byte preservation;
- static asset identity across RU↔EN;
- deterministic GIF selection unaffected by altKey.

## Future PR rule

Every production PR requires:
- exact head SHA;
- successful exact-head full CI;
- domain-specific regression evidence;
- successful post-merge main push on resulting main SHA.

## Verdict

`CURRENT_MAIN_CI_GREEN`.

Current regression floor:
`7f27caca... / run #74 / 311 of 311 passing / 17 packs, 46 events, 35 actions, 9 endings`.
