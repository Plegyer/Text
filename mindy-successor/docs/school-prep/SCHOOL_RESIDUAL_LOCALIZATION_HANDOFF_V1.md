# School Residual Localization Handoff v1

Date: 2026-09-28
Owner: Chat 5 / School + Text Localization Content Worker
Queue: 193–204
Fresh worker branch: `chat5/school-residual-localization-193-204`
Starting main: `5b22db9bbc2f7c306d25ca4d079e1eda2900b5d4`

## CURRENT_VISIBLE_DEBT

Current normal-player School localization is already complete for:
- School panel title/help;
- all eight current course labels/descriptions;
- course stat labels;
- tuition/current-day Energy text;
- lesson controls;
- immediate lesson result title/body;
- paid-lesson follow-up event copy;
- exact-course Night-study dynamic labels/help/button;
- Night-study follow-up event copy;
- School fallback media alts.

No normal-player School string is missing RU or EN.

The verified residual is accessibility quality debt on four active current course static alt keys:
- stale RU course identity wording on 2 keys;
- EN article grammar on 3 keys;
- 4 unique keys total.

## VERIFIED_RESIDUAL_KEYS

Production-ready worker fixture:
- `prior-work/astra/prototype-m3.2/content/school-residual-localization-v1.fixture.json`

Keys:
1. `presentation.static.school-course-literacy-and-numbers.alt`
2. `presentation.static.school-course-arcana.alt`
3. `presentation.static.school-course-etiquette-and-presentation.alt`
4. `presentation.static.school-course-arts-and-performance.alt`

RU source patch:
- `content/school-residual-localization-ru-v1.fixture.json`
- 2 corrected RU values

EN parity patch:
- `content/school-residual-localization-en-v1.fixture.json`
- exact EN parity for RU residual + 3 verified EN grammar corrections
- 4 EN entries total

Merged fixture:
- 4 complete RU+EN pairs

No new key namespace or identity is created.

## ZERO_DEBT_AREAS

Verified zero residual School localization debt:
- panel controls;
- course labels;
- course descriptions;
- result title/body;
- paid-lesson event prose;
- Night-study choice labels;
- Night-study help/button;
- Night-study event prose;
- generic condition-copy reuse;
- School-specific controls;
- fallback School media alt entries;
- current generic Night shell reuse.

Caption keys are NOT_PLAYER_VISIBLE in the current `mediaHTML()` consumer and are intentionally not changed.

## COLLISION_STATUS

Audit:
- `SCHOOL_RESIDUAL_LOCALIZATION_COLLISION_OWNERSHIP_AUDIT_V1.md`

Exact starting-main classification:
- ADDITIVE: 0
- IDENTICAL: 0
- REUSE_EXISTING: 0
- CONFLICT: 0
- SUPERSEDED: 4

All four are same-key corrections to current active accessibility localization values.

An exact integration-head recheck is still required before production replacement.

## EXISTING_CONSUMERS_ONLY

Consumer map:
- `SCHOOL_RESIDUAL_LOCALIZATION_CONSUMER_MAP_V1.md`

All four keys:
- already exist in root localization;
- are already referenced by exact current School presentation slots;
- are already consumed by current `mediaHTML()`;
- are already rendered to existing image `alt` attributes.

No shared UI/runtime wiring is required.

No proposed residual key lacks a current consumer.

## CURRENT PRESENTATION IDENTITIES

Inventory:
- `SCHOOL_CURRENT_PRESENTATION_IDENTITY_INVENTORY_V2.md`

Exact production set recorded:
- eight course IDs/tracks;
- eight lesson presentation IDs;
- reachable paid-lesson notification event identities;
- 24 current exact-course Night-study choice IDs;
- current generic Night-study follow-up presentation.

No teacher/exact-course staging is promoted.

## RESULT / CONTROL AUDITS

Result matrix:
- `SCHOOL_RESULT_TEXT_GAP_MATRIX_V1.md`

Controls/conditions:
- `SCHOOL_CONTROL_CONDITION_COPY_GAP_MATRIX_V1.md`

Both establish zero residual normal-player key debt outside the four accessibility corrections.

## REGRESSION_SOURCE

Worker regression:
- `prior-work/astra/prototype-m3.2/tests/school-residual-localization-source-v1.test.ts`

It validates:
- exact 4-key residual set, while allowing an audit-proven empty patch;
- complete RU+EN pairs;
- exact current presentation-slot consumers;
- RU/EN patch-to-merged consistency;
- exact audited collision assumptions;
- no teacher staging promotion;
- no gameplay/RNG/Save/economy/progression fields.

Exact-head production CI remains Lead/QA responsibility.

## SELECTIVE_COPY

193. `mindy-successor/docs/school-prep/SCHOOL_CURRENT_MAIN_VISIBLE_LOCALIZATION_DEBT_V1.md`
194. `mindy-successor/docs/school-prep/SCHOOL_CURRENT_PRESENTATION_IDENTITY_INVENTORY_V2.md`
195. `mindy-successor/docs/school-prep/SCHOOL_RESULT_TEXT_GAP_MATRIX_V1.md`
196. `mindy-successor/docs/school-prep/SCHOOL_CONTROL_CONDITION_COPY_GAP_MATRIX_V1.md`
197. `mindy-successor/docs/school-prep/SCHOOL_ACCESSIBILITY_TEXT_PARITY_AUDIT_V1.md`
198. `mindy-successor/prior-work/astra/prototype-m3.2/content/school-residual-localization-ru-v1.fixture.json`
199. `mindy-successor/prior-work/astra/prototype-m3.2/content/school-residual-localization-en-v1.fixture.json`
200. `mindy-successor/prior-work/astra/prototype-m3.2/content/school-residual-localization-v1.fixture.json`
201. `mindy-successor/docs/school-prep/SCHOOL_RESIDUAL_LOCALIZATION_COLLISION_OWNERSHIP_AUDIT_V1.md`
202. `mindy-successor/docs/school-prep/SCHOOL_RESIDUAL_LOCALIZATION_CONSUMER_MAP_V1.md`
203. `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-residual-localization-source-v1.test.ts`
204. `mindy-successor/docs/school-prep/SCHOOL_RESIDUAL_LOCALIZATION_HANDOFF_V1.md`

## OUT_OF_SCOPE

Not changed or duplicated:
- PR #63 Foreman semantic integration;
- Chat 2 School/media asset production;
- Chat 3 poverty/Forest/Secret Debt;
- Chat 4 QA/product acceptance;
- Chat 1 Developer shared runtime integration;
- School mechanics, course economy, stat effects or Night-study mechanics;
- teacher canon or worker-only exact-course staging;
- Save schema/identity;
- RNG;
- presentation media paths/selection.

## Candidate integration recommendation

Lead/integration may selectively replace the four root localization values after exact-head revalidation.

No runtime/UI code change is required.
