# Current-main CI regression floor v8

Status: COMPLETE / CURRENT_MAIN_CI_GREEN

Current main:
`3fc5495310e281cf5cbe52da3642000f1cb1fb05`
(PR53 global UI-shell localization merge).

## Latest successful main push

Workflow:
- `mindy-successor check`
- run #92
- id `36400322979`
- event: push
- head SHA: `3fc5495310e281cf5cbe52da3642000f1cb1fb05`
- conclusion: SUCCESS

Validator:
- packs: 17;
- events: 46;
- actions: 35;
- endings: 9.

Tests:
- 334 total;
- 334 pass;
- 0 fail.

## PR53 exact-head corroboration

Accepted PR53 head:
`dd68c04e307bd8517a9468be2138366cbaf900d7`.

Exact-head workflow:
- run #91;
- id `36400152319`;
- SUCCESS;
- validator 17 / 46 / 35 / 9;
- 334 / 334 tests.

PR53-specific regressions PASS:
- global UI shell production fixture fully merged RU+EN;
- visible consumers use stable localization keys;
- fixture is presentation-only;
- global UI-shell panels localize RU↔EN without changing Save;
- arrival shell localizes before gameplay state changes.

## PR52 floor retained

PR52 legacy root localization remains shipped under current main.

PR52 merge:
`5dffefd15703d431a604b4cc9f831c4e55460aed`.

Its post-merge run #88:
- 329 / 329;
- validator 17 / 46 / 35 / 9.

Current 334-test suite retains the PR52 legacy root production regressions.

## PR51 floor retained

PR51 ordinary-poverty copyedit remains shipped.

PR51 merge:
`1a2f6e428da41e356f8d48df4a72923a5cc1928c`.

Current suite retains:
- exact 33-key text-only regression;
- six-pack natural-path locale invariance;
- poverty pending-scene Save invariance.

## PR50 floor retained

PR50 generic Forest route/default project-owned static remains shipped.

Current suite retains its:
- semantic-slot regression;
- deterministic static-resolution regression;
- natural Explore -> Forest RU↔EN Save-invariance smoke.

## Current localization floor

Root localization:
`540` keys.

Missing RU:
`0`.

Missing EN:
`0`.

Current app blob:
`30626e7fd68e6d92fcd01f0eb3bea1a1605002fb`.

## Current static-media floor

Active project-owned static semantic mappings:
`80`.

Unique active project-owned physical sources:
`79`.

Established current static target:
`80 / 80`.

A text/UI-only integration must not silently reduce those counts.

## Current event/choice coverage floor

Fully root-localized current events:
`40 / 46`.

Zero-root-localization event identities:
`6`.

Current choices:
- total: 68;
- bilingual labels: 59;
- bilingual body/outcome keys: 59.

Current root media-alt coverage:
`26 / 64`.

These are useful regression counts for localization-only PRs.

## Minimum next integration floor

Unless an intentional reviewed change says otherwise, a presentation/localization/shared-UI PR must preserve:
- 17 packs;
- 46 events;
- 35 actions;
- 9 endings;
- at least 334 passing tests;
- 0 failures;
- 540 current root localization keys or a reviewed additive increase;
- 80 active project-owned static mappings.

Unexpected loss is blocking.

## Locked invariants

Continue to protect:
- Lumber Hard Work only `completed_shifts >= 50`;
- reward `hardWork:lumber`;
- Forest exact success/escape/failure result IDs;
- exact `activityResult` reactions;
- Old Boundary `enter_old_boundary` gate;
- generic route/default has no route-specific gameplay effect;
- School locale Save invariance;
- poverty natural-path and text-only guarantees;
- PR52 legacy localization-only scope;
- Foreman voluntary Night mechanics;
- generic Night-choice stable identity;
- presentation selection independent of gameplay RNG;
- static media identity across RU↔EN;
- PR53 UI shell changes presentation only.

## Open PR54 note

At the time this floor is recorded, PR #54
`Lead: localize journal choice outcomes via stable refs`
is open and not part of current main.

Its exact-head CI must succeed before it can replace this floor.

## Future PR evidence

Require:
- exact PR head SHA;
- successful exact-head full check;
- validator counts;
- total/pass/fail tests;
- domain-specific regressions;
- successful post-merge push on resulting main SHA.

## Verdict

`CURRENT_MAIN_CI_GREEN`.

Current authoritative floor:
`main 3fc5495... / run #92 / 334 of 334 passing / 17 packs, 46 events, 35 actions, 9 endings`.
