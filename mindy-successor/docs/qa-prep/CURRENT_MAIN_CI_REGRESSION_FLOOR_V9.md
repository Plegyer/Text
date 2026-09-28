# Current-main CI regression floor v9

Status: COMPLETE / CURRENT_MAIN_CI_GREEN

Current main:
`295e6fc74d235f0b7555794555a18373451e8b7e`
(PR55 shared Night/lodging localization merge).

## Latest successful main push

Workflow:
- `mindy-successor check`;
- run #99;
- id `36403132544`;
- event: push;
- head SHA: `295e6fc74d235f0b7555794555a18373451e8b7e`;
- conclusion: SUCCESS.

Validator:
- packs: 17;
- events: 46;
- actions: 35;
- endings: 9.

Tests:
- 342 total;
- 342 pass;
- 0 fail.

## PR55 exact-head corroboration

Accepted PR55 head:
`724ab70a5a83424fb8a576c3deb082b60256ffc0`.

Run #98:
- id `36402925719`;
- SUCCESS;
- validator 17 / 46 / 35 / 9;
- 342 / 342 tests.

Relevant PASS:
- exact 16 additive RU+EN Night UI keys;
- stable localization consumers without NightFlow mechanic change;
- presentation-only fixture;
- renderer shared Night/lodging RU↔EN without state drift;
- existing exactly-once lodging/Night regressions.

## PR54 floor retained

PR54 stable journal/outcome refs remain shipped beneath current main.

PR54 merge:
`6e2a5147603b71eed89a0966af417a33dd28d7a7`.

Run #97:
- 338/338;
- validator 17/46/35/9.

Current 342-test suite retains stable-ref, old-save and School compatibility regressions.

## Localization floor

Current root localization:
`556`.

Missing RU:
`0`.

Missing EN:
`0`.

Event coverage:
`40 / 46` fully root-localized.

Choice labels:
`59 / 68`.

Choice bodies:
`59 / 68`.

## Static floor

Active project-owned static mappings:
`80`.

Unique active project-owned sources:
`79`.

Established target:
`80 / 80`.

Presentation blob remains:
`0bed8e1a4a88358b7e1e8ef22d787f5bcee323f4`.

## Current app floor

App blob:
`8bc496f8678640e7134730dda943e326a9379fb1`.

PR55 localizes current Night/lodging presentation seams without changing NightFlow mechanics.

## Minimum next-integration floor

Unless intentionally reviewed:
- validator remains 17 packs / 46 events / 35 actions / 9 endings;
- test count does not drop below 342;
- failures remain 0;
- root localization does not silently lose current 556 keys;
- active project-owned static mappings remain >=80;
- static target remains 80/80.

## Locked invariants

Protect:
- Lumber Hard Work only `completed_shifts >= 50`;
- reward `hardWork:lumber`;
- exact Forest results/reactions;
- Old Boundary `enter_old_boundary` gate;
- School locale Save invariance;
- poverty natural paths;
- PR54 journal-ref compatibility/no fuzzy migration;
- Night lodging costs/housing/next-day effects;
- Foreman voluntary Night behavior;
- presentation/media resolution independent of gameplay RNG.

## Next route/presentation work

Forest route-specific seam:
- pure presentation mapping only;
- 10 additive localized route keys;
- no route/result/Hard Work mutation.

Animation exporter:
- dev-only candidate design acceptable;
- package/lock integration still requires Lead approval and native CI verification;
- no production GIFs yet.

## Verdict

`CURRENT_MAIN_CI_GREEN`.

Authoritative floor:
`main 295e6fc... / run #99 / 342 of 342 passing / 17 packs, 46 events, 35 actions, 9 endings / static 80 of 80`.
