# Poverty executable natural-path test QA v4

Status: COMPLETE / GREEN_AS_SELECTIVE_QA_SOURCE

Reviewed worker artifact:
- branch: `chat3/lumber-production-proof-next`
- Chat 3 item 149: `prior-work/astra/prototype-m3.2/tests/poverty-localization-natural-path-v2.test.ts`
- reviewed blob: `a5af2ab1d284dee696474ef77aa0f6230911d175`
- localization source: `content/poverty-localization-main-delta-v1.fixture.json` from Chat 3 item 140.

Current-main identity authority for this review:
- baseline SHA: `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`
- six root ordinary-poverty production packs remain the gameplay authority.
- Secret Debt is a separate Product-open domain and is not part of this test.

## Natural-path review

The test does not seed a pending poverty event directly.

It starts from `started()`, sets only the calendar day needed to select a deterministic shipped seasonal case, then enters ordinary Night through:
1. `endDay`;
2. real `LodgingResolution`;
3. real `chooseLodging`;
4. Resolver-produced pending poverty event.

### Street case

The test uses elapsed day 10 and `lodging.street`.

Expected current production identity:
- event: `poverty-street-production.helpful-summer`;
- variant: `default`;
- Night phase: `NightEventResolution`.

This is a clean current-main path. The higher-priority v2 summer street event is limited to days-in-year 13–14, so it does not steal the day-10 reaction.

The test resolves/checks both RU and EN entries for:
- event title;
- variant text;
- `take-errand` label/text;
- `media.stage.outside.alt`.

It snapshots pending IDs, presentationId, RNG, NightFlow and the serialized gameplay Save around localization lookup and requires the snapshot to remain identical.

It then resolves the real production choice `take-errand`, reads its authoritative `modifyResource(money)` effect from the production pack, checks the money delta exactly once, reloads through `parseSave`, and confirms a replayed choice is rejected because no active scene remains.

### Cheap-lodging case

The test uses elapsed day 20 and `lodging.cheap`.

Expected current production identity:
- event: `poverty-cheap-production.shared-quiet-autumn`;
- variant: `default`;
- Night phase: `NightEventResolution`.

This is also a clean current-main path. `poverty-cheap-production-v2.shared-room-seasons` explicitly targets spring/summer/winter rather than autumn, so the audited autumn event remains the natural result.

The test checks RU+EN title/body/choice/media-alt localization without changing pending identity, RNG, NightFlow or serialized Save. Resolving `settle-quietly` leaves resources unchanged, advances Night to `VoluntaryNightChoice`, and remains stable after save/reload.

## Exactly-once and reload acceptance

GREEN:
- effectful street choice applies its production money effect once;
- effect-free cheap-lodging choice remains effect-free;
- pending scene clears once;
- NightFlow resumes at the correct phase;
- reload does not replay resource effects;
- replaying a resolved choice is rejected.

No duplicate lodging transaction is authored by the localization test.

## RU/EN invariance

GREEN at the core/localization-contract level.

The test treats locale lookup as presentation-only and verifies that resolving RU and EN strings leaves:
- eventId;
- variantId;
- presentationId;
- RNG;
- NightFlow;
- whole gameplay Save
unchanged.

Limitation:
the test does not drive the browser language-toggle UI. It validates the stronger engine/fixture boundary but should be complemented by the selective integration PR's renderer smoke so the production localization resolver is proven to consume the same keys.

## Secret Debt isolation

GREEN.

The localization delta is explicitly scanned for:
- `secret-debt`;
- `secret debt`;
- `lender`;
- `forced-night`;
- `paid_freedom`;
- `bound_life`;
- `takeover`.

None may appear.

The test does not load, author or infer Secret Debt mechanics/rewards.

## Identity and merge-collision corroboration

Chat 3 item 150 is present:
`tests/poverty-localization-merge-collision-v1.test.ts`
(blob `2b0dfe194618200e490c3c76bf43b7f604e7d62f`).

It independently requires:
- additive or exact-identical localization merge;
- referenced event IDs to exist in the six current poverty packs;
- referenced media IDs to exist;
- locale-neutral IDs;
- no Secret Debt contamination.

This supports using item 149 as selective-integration QA evidence rather than as a standalone production patch.

## Verdict

`GREEN_AS_SELECTIVE_QA_SOURCE`.

For production integration, the 84-key localization delta, collision guard and this executable natural-path test should be copied selectively to a fresh branch from current main. The integration head still requires:
- actual localization merge into the authoritative bundle;
- renderer/localization smoke;
- exact-head full CI;
- post-merge main CI.

No worker branch should be merged wholesale.
