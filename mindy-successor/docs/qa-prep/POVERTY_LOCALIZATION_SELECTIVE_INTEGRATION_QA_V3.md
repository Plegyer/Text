# Poverty Localization Selective-Integration QA v3

Status: QA / Product acceptance
Queue item: Chat 4 item 142
Current main: `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`
Current ordinary-poverty production source: PR37
Chat3 branch reviewed: `chat3/lumber-production-proof-next`
Chat3 head observed: `dab63c120fa0b4727e21f93d8e1d1f90ad2ef00b`

## Scope and current result

This gate reviews the arrived Chat3 ordinary-poverty localization delta, contract test, copy bank, current-production key map, natural-path plan and multi-GIF staging file against current main after PR43.

Overall complete-wave verdict: **BLOCKED_BY_MISSING_DELIVERABLES**.

Within that blocked wave, the ordinary-poverty localization payload itself is a **GREEN_CONTENT_DELTA_CANDIDATE_FOR_SELECTIVE_INTEGRATION** after Lead rebases/copies it onto a fresh current-main branch and runs exact-head CI.

## Current PR37 production identity mapping

The six current-main ordinary-poverty production packs reviewed are:

- `poverty-street-production.json`
- `poverty-street-production-v2.json`
- `poverty-cheap-production.json`
- `poverty-cheap-production-v2.json`
- `poverty-recovery-production.json`
- `poverty-pressure-production.json`

They contain these 14 production event identities:

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

Chat3 item 143 maps exactly these 14 IDs. No mapped event is missing from current main. This is materially different from the stale School reachability map reviewed in item 139.

## RU+EN localization delta

File:
`prior-work/astra/prototype-m3.2/content/poverty-localization-main-delta-v1.fixture.json`

Observed:

- status `READY_FOR_SELECTIVE_MERGE`;
- 84 localization strings;
- every included entry has non-empty RU and EN;
- no locale-specific `.ru` / `.en` suffix is used as gameplay identity;
- every event-key prefix resolves to one of the 14 current-main production events;
- no Secret Debt/lender identity was found;
- no conditions, effects, rewards or RNG fields were found in the localization payload.

The delta therefore satisfies the presentation-only localization boundary for its included ordinary-poverty production surfaces.

## Localization key map

File:
`prior-work/astra/prototype-m3.2/content/poverty-event-localization-key-map-v1.fixture.json`

Observed:

- status `CURRENT_PR37_PRODUCTION_MAP`;
- 14 mapped events, exactly matching current main;
- key convention matches the generic PR43 renderer convention:
  - `event.<eventId>.title`
  - `event.<eventId>.variant.<variantId>.text`
  - `event.<eventId>.choice.<choiceId>.label`
  - `event.<eventId>.choice.<choiceId>.text`
  - `media.<mediaId>.alt`

Acceptance: **GREEN_FOR_SELECTIVE_COPY**, subject to exact-head validation after integration.

## No Secret Debt bleed

The ordinary-poverty localization delta and its contract do not include Secret Debt/lender content. This is required. Authored Secret Debt material remains a separate staged/Product-blocked family and must not be pulled into the ordinary-poverty production localization PR.

Acceptance: **PASS**.

## Locale-neutral gameplay and natural-path invariance

The arrived artifacts are consistent with the required rule that locale changes presentation only. Item 145 defines natural-path checks for street, cheap-lodging and effectful recovery paths and explicitly snapshots pending identity, RNG/history/resources/metrics/progression/NightFlow/Save around a locale switch.

However item 145 is a plan, not executable evidence.

The requested executable Forest bilingual natural-path regression at item 146 currently contains only:

`// item 146`

That file does not prove any invariant and must not be counted as a test.

Therefore natural-path invariance for this worker wave is **NOT_YET_EXECUTABLY_PROVEN**.

## Multi-GIF staging

File:
`prior-work/astra/prototype-m3.2/content/presentation-drafts/ordinary-poverty-multigif-staging-v1.json`

Observed:

- status `STAGING_ONLY`;
- 12 referenced media sources;
- 9 candidate GIF sources are under `assets/staging/`;
- the remaining sources are existing static SVG fallbacks such as `assets/stage-outside.svg` and `assets/stage-room.svg`.

Acceptance: **STAGING_ONLY**.

The placeholder GIF candidates are not real shipped repo assets and must not be counted toward production 3–5 candidate pools. The static fallbacks remain useful fallback evidence only.

## Missing deliverables blocking complete-wave green

Chat3 item 146 exists only as a stub and is not a completed test.

These requested files are absent from the current Chat3 branch:

- item 147: `docs/poverty-prep/ORDINARY_POVERTY_LOCALIZATION_INTEGRATION_HANDOFF_v5.md`
- item 148: `docs/lumber-prep/FOREST_POVERTY_CURRENT_MAIN_INTEGRATION_LEDGER_v1.md`

A full Chat3 140–148 integration verdict therefore remains **BLOCKED_BY_MISSING_DELIVERABLES**.

## Selective integration rule

Never merge the stale Chat3 branch as a unit.

A Lead branch created fresh from current main may selectively copy:

1. the item-140 ordinary-poverty localization string delta;
2. the item-141 contract test, rebased to exact current main;
3. the item-143 exact production key map as QA/integration evidence;
4. optionally the item-142 copy bank as authoring evidence.

Do not copy item 144 as production media. Do not count item 145 as executed regression. Do not infer completion of items 146–148.

Before merge require current-main exact-head validation, actual UI/event rendering in RU and EN, pending-event/save/RNG invariance, and post-merge main CI.

## Locked invariants

This QA accepts no gameplay change. Locale must not alter poverty conditions, effects, rewards, event IDs, variant/choice IDs, RNG, Save state or media candidate identity. Secret Debt remains out of this production localization slice. Placeholder multi-GIF paths remain non-shipped.
