# Chat 3 Forest + Poverty v8 Candidate Handoff

Status: C3-84 candidate handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Candidate base after required current-main refresh: `main@f4de3b01a4369417ae9eff4b384f755790f75279`.

## Scope

This candidate contains C3-73 through C3-83 only.

Delivered:
- post-consumer reachability audit;
- Logging Road contextual depth v3;
- Old Boundary capability-aware depth v3;
- Forest return aftermath depth v3;
- ordinary-poverty housing continuity v3;
- ordinary-poverty recovery continuity v3;
- small-job exact-identity limitation audit;
- Secret Debt separation audit v4;
- variant density / voice consistency audit v2;
- RU/EN stable-ID parity v4;
- ownership/collision regression v4.

## C3-73 dependency

No production consumer advance landed between C3-61 and the C3-73 audit baseline.

Therefore:
- Forest v2 depth remains preparation-only;
- ordinary-poverty v2 depth remains consumer-ready rather than newly player-facing;
- Chat 3 does not modify shared runtime/UI to force consumption.

Dependency owner remains Chat 1 Developer / Integration.

## Queue-v8 Forest content

New v3 preparation:
- 7 Logging Road RU/EN variants;
- 7 Old Boundary RU/EN variants;
- 9 terminal return-aftermath RU/EN variants.

All use only current identities:
- Activity `lumber.forest`;
- routes `logging-road` and `old-boundary`;
- Old Boundary capability `enter_old_boundary`;
- results `lumber.forest.success|escape|failure`;
- terminal events `forest-result-content-v1.success|escape|failure`;
- success-only continuation `lumber-cross.activity-forest-return`.

No Activity mechanics, progress/endurance, world/career facts, penalties, injuries, rewards or endings are changed.

## Queue-v8 ordinary poverty content

New v3 preparation:
- 8 housing continuity RU/EN variants;
- 6 recovery/contact continuity RU/EN variants.

All map to exact existing production event/variant identities.

No NightFlow/economy/housing-state, persistent relationship/contact, recovery milestone/counter or guaranteed future opportunity is introduced.

## Small-job exact-identity limitation

Current result localization uses `eventId + choiceId`, not `eventId + variantId + choiceId`.

Safe single-variant choice-result identities:
- helpful-summer / take-errand;
- short-cleanup / do-cleanup;
- small-coin-help / take-coins;
- herb-bundle / take-herb.

Blocked as variant-specific result copy:
- helpful-summer-shade / market-closing / take-small-task;
- helpful-summer-shade / late-shade / take-small-task.

Those two variants share one choice-result identity and must not be selectively consumed as distinct post-choice prose without an approved variant-aware result seam.

## Secret Debt

Ordinary poverty remains independent.

The generic `debt` / `repay` / `rent-room` surface remains separate from the hidden Secret Debt concept.

All exact Product values remain OPEN, including trigger chance, amounts, delay, penalties, thresholds, rewards and School/Activity availability while bound.

## Density / voice

Current v2 + v3 preparation totals 83 RU/EN source pairs with:
- zero exact duplicate keys;
- zero exact duplicate RU texts;
- zero exact duplicate EN texts.

The 37 new queue-v8 v3 pairs are voice-clean after review.

Seven older merged v2 preparation keys contain implementation-facing wording and are marked `NEEDS_REWRITE_BEFORE_PLAYER_FACING_CONSUMPTION`; this candidate does not rewrite historical merged fixtures.

## Ownership / production impact

This candidate adds docs, content-side fixtures and focused tests only.

It does not modify existing:
- shared runtime/UI;
- production definitions/localization/presentation;
- production packs;
- media assets/sources;
- Save/RNG;
- Activity mechanics;
- career/relationship state machines;
- NightFlow/economy;
- School;
- ending framework.

## Regression sources

- `tests/chat3-forest-poverty-parity-v8.test.ts`;
- `tests/chat3-ownership-collision-v4.test.ts`.

The refreshed exact head and exact-head repository CI are recorded in the PR after CI completes.

Any head movement after freeze requires fresh repository CI and QA.
