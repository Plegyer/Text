# Current-main CI regression floor v5

Status: COMPLETE / CURRENT_MAIN_CI_GREEN

Current main:
`4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`
(PR48 merge).

## Latest successful push workflow

Workflow:
- `mindy-successor check`
- run #77
- id `36344820956`
- event: push
- head SHA: `4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`
- conclusion: SUCCESS

Validator:
- packs: 17;
- events: 46;
- actions: 35;
- endings: 9.

Tests:
- 314 total;
- 314 pass;
- 0 fail.

## PR48 exact-head corroboration

Accepted exact head:
`9a3789536b05717a77e576ac79d96eb2cc4f8319`.

Workflow #76 / id `36344721303`:
- SUCCESS;
- 314/314;
- same validator counts.

## Current media regression floor

Current main now includes:
- PR47 first-wave project-owned static media;
- PR48 40 seasonal career static SVGs;
- 40 current seasonal slot mappings;
- 80 seasonal RU+EN alt/caption keys.

Current root localization total:
`347` keys.

Existing PR47/PR48 media regressions remain green.

## Minimum next integration floor

For localization/presentation-only work, unexpected drift from:
- 17 packs;
- 46 events;
- 35 actions;
- 9 endings
is blocking unless separately reviewed.

Existing test count must not drop below:
`314`
without an explicit reviewed test-removal reason.

## Locked high-value regressions

Future integrations must preserve:
- Lumber Hard Work only `completed_shifts >= 50`;
- reward `hardWork:lumber`;
- exact Forest Activity result identities/continuation;
- School locale Save invariance;
- ordinary poverty natural paths;
- Foreman voluntary Night invariance;
- generic Night-choice identity;
- PR47 static altKey backward compatibility;
- project-owned static asset identity across RU↔EN;
- PR48 40/40 seasonal mapping;
- deterministic/static media resolution without gameplay RNG.

## Next-PR evidence

Require:
- exact PR head SHA;
- exact workflow run id/number;
- validator counts;
- total/pass/fail tests;
- domain-specific regression names;
- successful post-merge main push.

## Verdict

`CURRENT_MAIN_CI_GREEN`.

Floor:
`main 4270bbc... / run #77 / 314 of 314 passing / 17 packs, 46 events, 35 actions, 9 endings`.
