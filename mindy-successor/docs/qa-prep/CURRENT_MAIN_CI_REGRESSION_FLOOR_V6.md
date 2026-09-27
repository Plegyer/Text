# Current-main CI regression floor v6

Status: COMPLETE / CURRENT_MAIN_CI_GREEN

Current main:
`d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`
(PR49 merge).

## Latest successful main push

Workflow:
- `mindy-successor check`
- run #79
- id `36345257986`
- event: push
- head SHA: `d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`
- conclusion: SUCCESS

Validator:
- packs: 17;
- events: 46;
- actions: 35;
- endings: 9.

Tests:
- 317 total;
- 317 pass;
- 0 fail.

## PR49 exact-head corroboration

Exact PR49 head:
`51e8fba20d5cc0c7d08fa5d7e814a678b4f514ee`.

Workflow:
- run #78;
- id `36345113971`;
- conclusion: SUCCESS;
- 317/317 tests;
- validator 17/46/35/9.

## PR49-specific regressions on current main

PASS:
- `27 safe non-career semantic slots use refined project-owned static assets`;
- `safe non-career refinements preserve semantic identity and animation-mode independence`;
- `route-specific Product-open Forest assets remain absent from root production presentation`;
- existing static RU↔EN asset-identity renderer regression.

## Current production floor

For the next localization/presentation-only integration, current minimum baseline is:
- 17 packs;
- 46 events;
- 35 actions;
- 9 endings;
- 317 passing tests;
- 0 failures.

Unexpected gameplay-count drift or loss of existing tests is blocking unless intentionally reviewed.

## Media/localization floor

Current main additionally has:
- PR47 project-owned static/altKey architecture;
- PR48 40 seasonal static mappings;
- PR49 27 refined non-career mappings;
- 79 active project-owned static semantic slots;
- 401 root localization keys.

These counts must not silently regress in a presentation/localization-only PR.

## Locked invariants

Continue to protect:
- Lumber Hard Work only `completed_shifts >= 50`;
- Meta reward `hardWork:lumber`;
- Forest exact success/escape/failure result identities;
- exact activityResult continuation;
- Old Boundary current capability gate;
- School Save invariance under locale;
- ordinary-poverty natural paths;
- Foreman voluntary Night mechanics;
- generic Night-choice stable ID localization;
- deterministic presentation selection independent of gameplay RNG;
- static asset identity across RU↔EN;
- route-specific Product-open assets absent until reviewed seam.

## Future exact-head rule

Every production integration requires:
- exact PR head;
- full successful workflow;
- validator counts;
- total/pass/fail test counts;
- domain-specific acceptance tests.

Then require a successful push workflow on the resulting merge SHA.

Do not substitute earlier main or PR evidence.

## Verdict

`CURRENT_MAIN_CI_GREEN`.

Current floor:
`main d383a228... / run #79 / 317 of 317 passing / 17 packs, 46 events, 35 actions, 9 endings`.
