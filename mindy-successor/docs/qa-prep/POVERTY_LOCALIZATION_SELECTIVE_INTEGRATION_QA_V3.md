# Poverty Localization Selective-Integration QA v3

Status: QA / Product acceptance
Queue item: Chat 4 item 142
Current main: `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`
Current ordinary-poverty production source: PR37
Chat3 branch reviewed: `chat3/lumber-production-proof-next`
Latest Chat3 head observed: `f6e439a0d35b8f4791e65023d1b3e2042fa14a27`

This review was refreshed after Chat3 completed items 146–148. The earlier same-session `BLOCKED_BY_MISSING_DELIVERABLES` verdict is stale and superseded.

## Overall verdict

**GREEN_CONTENT_DELTA_FOR_SELECTIVE_INTEGRATION**.

Before production merge the Lead integration branch still requires **FRESH_EXACT_HEAD_CI + EXECUTED POVERTY RU↔EN NATURAL-PATH SMOKE**. This is now an integration-validation requirement, not a missing-worker-deliverable blocker.

## Current PR37 production identity mapping

The six current-main ordinary-poverty production packs are:

- `poverty-street-production.json`
- `poverty-street-production-v2.json`
- `poverty-cheap-production.json`
- `poverty-cheap-production-v2.json`
- `poverty-recovery-production.json`
- `poverty-pressure-production.json`

They contain these 14 current production event IDs:

- `poverty-street-production.helpful-summer`
- `poverty-street-production.neutral-autumn`
- `poverty-street-production.pressure-winter`
- `poverty-street-production-v2.helpful-summer-shade`
- `poverty-street-production-v2.neutral-autumn-crossing`
- `poverty-street-production-v2.pressure-winter-wind`
- `poverty-cheap-production.shared-quiet-autumn`
- `poverty-cheap-production-v2.shared-room-seasons`
- `poverty-recovery-production.small-coin-help`
- `poverty-recovery-production.short-cleanup`
- `poverty-recovery-production.herb-bundle`
- `poverty-pressure-production.cold-rain`
- `poverty-pressure-production.noisy-loading`
- `poverty-pressure-production.muddy-splash`

Chat3 item 143 maps exactly these 14 IDs. No mapped event is missing from current main.

Acceptance: **PASS**.

## RU+EN localization delta

File:
`prior-work/astra/prototype-m3.2/content/poverty-localization-main-delta-v1.fixture.json`

Observed:

- status `READY_FOR_SELECTIVE_MERGE`;
- 84 localization strings;
- 82 event presentation keys plus 2 current media-alt keys;
- every entry has non-empty RU and EN;
- no locale-specific gameplay identity;
- every event-key prefix maps to one of the 14 actual current-main production events;
- explicit fallback debt is empty;
- no Secret Debt/lender identity;
- no gameplay conditions/effects/rewards/RNG payload.

Acceptance: **PASS / SAFE SELECTIVE CONTENT DELTA**.

Lead must merge only the reviewed `delta.strings` into fresh current-main `content/localization.json` after collision review.

## Key convention

Item 143 uses the current PR43 runtime convention:

- `event.<eventId>.title`;
- `event.<eventId>.variant.<variantId>.text`;
- `event.<eventId>.choice.<choiceId>.label`;
- `event.<eventId>.choice.<choiceId>.text`;
- `media.<mediaId>.alt`.

This matches current generic event/media localization consumption.

Acceptance: **PASS**.

## No Secret Debt bleed

Ordinary-poverty localization remains bounded to PR37 production. Secret Debt is absent from the delta and map.

Acceptance: **PASS**.

Secret Debt authored bilingual material elsewhere remains separate and Product-blocked in mechanics/rewards.

## Locale-neutral gameplay IDs

The reviewed localization keys are derived from the same event/variant/choice/media identities used by current production. No RU/EN-specific gameplay IDs are introduced.

Acceptance: **PASS**.

Locale must remain outside life Save and must not alter event materialization, conditions/effects, NightFlow, RNG or candidate selection.

## Natural-path invariance

Chat3 item 145 now provides a concrete poverty natural-path smoke specification:

- street path through EndDay → lodging → current poverty reaction;
- cheap-lodging path;
- effectful recovery path;
- RU presentation;
- switch EN without dispatch;
- same pending identity/RNG/history/resources/metrics/progression/NightFlow/Save;
- resolve once;
- reload;
- no reroll or duplicate effect.

This is the correct acceptance shape, but it remains a prose smoke plan. It is not a separate executable poverty locale-switch test on the worker branch.

Chat3 item 146 is now substantive executable evidence for Forest. It naturally reaches Forest success/escape/failure, proves exact `activityResult` reaction identity, RU+EN key presence, pending reload stability, no additional gameplay effect from return, and the exact Lumber Hard Work condition/reward. It strengthens the shared regression floor but does not substitute for executing the poverty smoke after integration.

Acceptance: **PLAN CORRECT; EXECUTE ON FRESH INTEGRATION HEAD**.

## Multi-GIF staging

File:
`prior-work/astra/prototype-m3.2/content/presentation-drafts/ordinary-poverty-multigif-staging-v1.json`

Observed:

- status `STAGING_ONLY`;
- 9 GIF candidate sources under `assets/staging/`;
- real existing static fallbacks `assets/stage-outside.svg` / `assets/stage-room.svg`;
- no real repository GIF candidate exists.

Acceptance: **STAGING_ONLY**.

Do not include this patch in production until 3–5 real repo GIFs exist for an approved semantic identity and candidate-specific bilingual alt handling is accepted.

## Completed supporting deliverables

The formerly missing Chat3 items are now present:

- item 146 executable Forest natural-path regression, blob `05c55cd86adbc9f65209e311f5d8be87e84e0237`;
- item 147 ordinary-poverty localization integration handoff, blob `f71eb510d90399d046b5100aa6adea02a1eec02c`;
- item 148 Forest+poverty current-main integration ledger, blob `926a7745c72c519fec1800681c94dbfecc0f998f`.

Therefore **no Chat3 140–148 deliverable is currently missing**.

## Selective integration path

Never merge `chat3/lumber-production-proof-next` wholesale.

On a fresh branch from current main:

1. merge only item-140 `delta.strings` into `content/localization.json`;
2. selectively copy/adapt item-141 contract test;
3. use item-143 key map as exact identity evidence;
4. optionally retain item-142 copy bank and item-147/148 docs as review evidence;
5. execute item-145 poverty natural-path smoke against the real integrated UI/runtime;
6. run full `npm run check` and exact-head Actions;
7. require post-merge main CI.

Do not promote item-144 placeholder multi-GIF staging.

## Locked invariants

No localization integration may change ordinary-poverty gameplay, Secret Debt state, Forest exact `activityResult`, Lumber Hard Work `completed_shifts >= 50` / `hardWork:lumber`, Save schema, gameplay RNG or locale-neutral media selection.
