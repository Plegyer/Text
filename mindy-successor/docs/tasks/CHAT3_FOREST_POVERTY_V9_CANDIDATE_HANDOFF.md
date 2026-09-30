# Chat 3 Forest + Poverty v9 Candidate Handoff

Status: C3-96 candidate handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Candidate base: `main@a341303183dc277a26b3e64a61d8ed8e35c5d05f`.

## Scope

This candidate contains C3-85 through C3-95 only.

Delivered:
- post-v8 content reachability audit;
- Logging Road continuity depth v4;
- Old Boundary continuity depth v4;
- Forest aftermath continuity v4;
- ordinary-poverty housing continuity v4;
- ordinary-poverty recovery/contact continuity v4;
- small-job consumption boundary v2;
- Secret Debt separation audit v5;
- voice/density consistency v3;
- RU/EN stable-ID parity v5;
- ownership/collision regression v5.

## Dependency on frozen v8 candidate

PR #134 is frozen at `fac977ba10e16c38f519782c6ce415aa39abba19` but was not merged on the C3-85/C3-96 baseline.

This v9 candidate does not duplicate PR #134 payload. It contains only new v9 files.

C3-93 may reference frozen-v8 v3 content for density/voice comparison, but no v8 fixture or doc is copied into this PR.

## Reachability

Current merged production remains:
- player-facing for existing Forest entry/route/result surfaces and current ordinary-poverty production/depth copy;
- consumer-ready for safe ordinary-poverty v2 handoff subsets;
- preparation-only for Forest depth and variant-specific ambiguous small-job result copy.

Queue-v9 v4 strings remain preparation-only in this PR.

## Forest identity contract

Queue-v9 adds:
- 7 Logging Road RU/EN continuity variants;
- 7 Old Boundary RU/EN continuity variants;
- 6 Forest terminal aftermath RU/EN variants.

All use only current:
- Activity `lumber.forest`;
- `forest.route.logging-road -> logging-road`;
- `forest.route.old-boundary -> old-boundary`;
- exact Old Boundary capability `enter_old_boundary`;
- `lumber.forest.success|escape|failure`;
- `forest-result-content-v1.success|escape|failure`;
- success-only `lumber-cross.activity-forest-return`.

No Activity mechanics, progress/endurance, facts, penalties, injuries, rewards or ending changes.

## Ordinary poverty

Queue-v9 adds:
- 8 housing-continuity RU/EN variants;
- 6 recovery/contact RU/EN variants.

All use exact existing event/variant IDs.

No NightFlow/economy/housing state, persistent relationship/contact, recovery milestone/counter, guaranteed future opportunity or Secret Debt state is added.

## Small-job boundary

Current result localization remains keyed by `eventId + choiceId`, not variant.

Safe single-variant result identities remain:
- helpful-summer / take-errand;
- short-cleanup / do-cleanup;
- small-coin-help / take-coins;
- herb-bundle / take-herb.

Preparation-only because of ambiguous shared result identity:
- helpful-summer-shade / market-closing / take-small-task;
- helpful-summer-shade / late-shade / take-small-task.

No runtime identity is invented.

## Secret Debt

Ordinary poverty remains independent.

Generic `debt` / `repay` / `rent-room` remains separate from the hidden Secret Debt concept.

All exact Secret Debt Product values remain OPEN, including trigger chance, amounts, delay, penalties, thresholds, rewards and School/Activity availability while bound.

## Density / voice

The reviewed preparation set totals 117 RU/EN pairs:
- v2: 46;
- frozen-v8 v3: 37;
- queue-v9 v4: 34.

Exact duplicate keys/RU/EN texts: 0.

Queue-v9 v4 player-facing implementation jargon: 0.

Seven prior v2 voice-risk keys remain excluded from unchanged publication.

## Production impact / ownership

This candidate adds docs, content-side fixtures and focused tests only.

It modifies no existing:
- shared runtime/UI;
- production definitions/localization/presentation;
- production packs;
- media assets/sources;
- Save/RNG;
- Activity mechanics;
- career/relationship state;
- NightFlow/economy;
- School;
- ending framework.

## Regression sources

- `tests/chat3-forest-poverty-parity-v9.test.ts`;
- `tests/chat3-ownership-collision-v5.test.ts`.

Exact frozen head and exact-head repository CI are recorded in the PR after CI completes.

Any head movement after freeze requires fresh CI/QA.
