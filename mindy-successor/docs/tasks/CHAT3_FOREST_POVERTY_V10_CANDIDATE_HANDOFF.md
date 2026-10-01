# Chat 3 Forest + Poverty v10 Candidate Handoff

Status: C3-108 candidate handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Candidate base: `main@6afc01061646bc52cec824863bf89e8ad8c309d0`.

## Scope

This candidate contains C3-97 through C3-107 only.

Delivered:
- current content reachability audit v10;
- Forest continuity depth v5;
- Forest aftermath depth v5;
- ordinary-poverty continuity depth v5;
- small-job identity boundary audit v3;
- Secret Debt separation audit v6;
- voice/density audit v4;
- stable-ID parity regression v6;
- ownership/collision regression v6;
- selective integration handoff cleanup;
- focused regression fixture coverage.

## Forest boundary

All queue-v10 Forest content uses only current identities:
- Activity `lumber.forest`;
- `forest.route.logging-road -> logging-road`;
- `forest.route.old-boundary -> old-boundary`;
- exact Old Boundary capability `enter_old_boundary`;
- `lumber.forest.success|escape|failure`;
- `forest-result-content-v1.success|escape|failure`;
- success-only Lumber continuation `lumber-cross.activity-forest-return`.

Forest continuity and aftermath v5 remain preparation-only because Chat 3 does not own the shared presentation/content selector. No Activity mechanics, progress/endurance, world/career facts, rewards, penalties, injuries or ending logic are added.

## Ordinary poverty boundary

Sixteen new RU/EN continuity variants map only to exact existing event/variant identities. They change no choice effects, NightFlow, economy, housing state, relationship/contact state or recovery state.

The existing poverty-depth selector is the selective-integration seam. Queue-v10 does not publish these candidate keys into root production localization.

## Small-job result boundary

The current result renderer identifies outcomes by `eventId + choiceId` and does not expose `variantId` to result localization.

Safe single-variant result mappings remain the paid errand, short cleanup, anonymous coin help and herb bundle.

The `market-closing` and `late-shade` variants under `poverty-street-production-v2.helpful-summer-shade` share the same `take-small-task` result identity and therefore remain preparation-only as distinct post-choice prose.

## Secret Debt

Ordinary poverty remains independent from Secret Debt. The legacy/general `debt` / `repay` / `rent-room` surface is not repurposed as the hidden Secret Debt route.

No exact Product value is chosen for trigger chance, offer amount, activation delay, future debt, forced Night penalty, career/outcome thresholds, penalties, rewards, or School/Activity availability while bound.

## Voice / density

Queue-v10 source prose contains 33 RU/EN pairs:
- Forest continuity: 8;
- Forest aftermath: 9;
- ordinary-poverty continuity: 16.

Audited result:
- exact duplicate keys: 0;
- exact duplicate RU texts: 0;
- exact duplicate EN texts: 0;
- root localization collisions: 0;
- implementation-facing technical jargon in player-facing source prose: 0.

## Production impact

The candidate adds docs, content-side fixtures and focused tests only. It modifies no existing shared `src/` runtime/UI, production definitions/localization/presentation, production packs, media assets, Save/RNG, Activity mechanics, career/relationship state machines, NightFlow/economy, School or ending framework.

## Regression sources

- `tests/chat3-forest-poverty-parity-v10.test.ts`;
- `tests/chat3-ownership-collision-v6.test.ts`;
- `tests/chat3-regression-fixture-coverage-v10.test.ts`.

Exact frozen head and exact-head repository CI are recorded in the PR after CI completes. Any head movement after freeze invalidates prior exact-head CI/QA evidence.
