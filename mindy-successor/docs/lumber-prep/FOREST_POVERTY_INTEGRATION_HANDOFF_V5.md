# Forest / Poverty Integration Handoff v5

Status: selective-integration handoff for Chat 3 queue items 197–207.

Worker branch:
`chat3/lumber-production-proof-next`.

Current-main baseline used:
`1af3104c1e4c180019b965adac8e87e67de89347`
(PR #46 merged after PR #45).

Integration rule:
**do not merge this long-lived worker branch wholesale**. Lead should selectively copy reviewed files onto fresh branches from current `main`.

No shared runtime/schema/UI file is changed by this wave.

---

# SAFE_TEXT_PATCH

## Poverty production-readiness review

File:
`docs/poverty-prep/POVERTY_COPYEDIT_PRODUCTION_READINESS_LEDGER_V2.md`.

Reviews all 36 item-185 replacements against current main.

Classification:
- 33 SAFE_NOW;
- 3 NEEDS_CONTEXT_REVIEW;
- 0 KEEP_CURRENT.

Held for context review:
- `event.poverty-recovery-production.herb-bundle.variant.default.text`;
- `media.stage.outside.alt`;
- `media.stage.room.alt`.

The held keys are excluded because the proposed wording is more scene-specific/shared-media-specific than the current reusable source.

## Final poverty text delta

File:
`prior-work/astra/prototype-m3.2/content/poverty-copyedit-final-delta-v2.fixture.json`.

Contains the final 33-key RU+EN SAFE_NOW subset only.

Properties:
- existing keys only;
- no additions/deletions/renames;
- no ID changes;
- no gameplay fields;
- no Secret Debt content.

Selective application:
merge only `strings` values into matching current-main `content/localization.json` keys.

## Final poverty regression

File:
`prior-work/astra/prototype-m3.2/tests/poverty-copyedit-final-delta-v2.test.ts`.

Validates:
- exact 84-key ordinary-poverty source namespace;
- 33-key final replacement subset;
- excluded context-review keys stay out;
- RU+EN completeness;
- replacement values differ from current main;
- six ordinary-poverty production pack identities unchanged;
- no gameplay fields;
- Secret Debt excluded.

Recommended patch set:
1. copy item 198;
2. copy item 199;
3. apply item-198 text only;
4. run poverty localization/natural-path/reload suites;
5. run full check and exact-head CI.

---

# SHARED_UI_REQUIRED

## RU source review

File:
`docs/poverty-prep/SHARED_NIGHT_LODGING_RU_COPY_REVIEW_V1.md`.

Reviews all 20 proposed shared Night/lodging strings.

Key polish:
- player-facing lodging payment wording;
- `Энергия` stat capitalization;
- `Ночное занятие` instead of `Ночной слот`;
- `Ход ночи` instead of implementation-like wording;
- removes visible internal `NightFlow` terminology from the explanatory panel copy.

## EN parity review

File:
`docs/poverty-prep/SHARED_NIGHT_LODGING_EN_PARITY_REVIEW_V1.md`.

Provides exact EN parity for the same 20 keys.

## Final shared UI fixture

File:
`prior-work/astra/prototype-m3.2/content/poverty-shared-ui-localization-v3.fixture.json`.

Contains finalized 20-key RU+EN presentation-only strings.

Lead/Chat 1 wiring is still required for:
- hardcoded Night/Lodging shell text;
- lodging labels;
- housing labels;
- next-day Energy formatter;
- sleep-choice label;
- result-to-lodging bridge;
- town lodging summary.

Do not change:
- NightFlow phases;
- lodging IDs;
- housing values;
- costs;
- Energy deltas;
- commands;
- save state.

Existing keys to reuse rather than duplicate:
- `ui.panel.sleep`;
- `ui.town.sleep.subtitle`;
- `ui.town.noEnergyPrompt`;
- `ui.work.coins`.

Exact selective-copy set:
- `SHARED_NIGHT_LODGING_RU_COPY_REVIEW_V1.md`;
- `SHARED_NIGHT_LODGING_EN_PARITY_REVIEW_V1.md`;
- `poverty-shared-ui-localization-v3.fixture.json`.

---

# SAFE_PRESENTATION_SOURCE

## Logging-road scene polish

File:
`docs/lumber-prep/FOREST_LOGGING_ROAD_SCENE_BANK_POLISH_V3.md`.

Existing gameplay identity only:
`forest.route.logging-road`.

Semantic presentation ID:
`activity/forest/route/logging-road`.

Contains concise RU+EN UI-ready versions of:
- wheel ruts;
- timber stack;
- work marks;
- narrowing;
- route reaction.

No route mechanics are added.

## Old-boundary scene polish

File:
`docs/lumber-prep/FOREST_OLD_BOUNDARY_SCENE_BANK_POLISH_V3.md`.

Existing gameplay identity only:
`forest.route.old-boundary`.

Semantic presentation ID:
`activity/forest/route/old-boundary`.

Contains concise RU+EN UI-ready versions of:
- stones;
- old marks;
- clearing;
- beyond markers;
- route reaction.

The player-facing clearing prose no longer exposes the capability gate as implementation text.

Explicitly not defined:
- token acquisition;
- price;
- consume/retain/turn-in;
- Hunter semantics;
- deeper lore meaning.

## Route semantic media brief

File:
`docs/lumber-prep/FOREST_ROUTE_SEMANTIC_MEDIA_BRIEF_V1.md`.

Presentation-only guidance for the two existing semantic route IDs.

Logging-road visual anchors:
- wheel ruts;
- cut branches;
- timber stacks;
- work marks;
- narrowing road.

Old-boundary visual anchors:
- moss-covered stones;
- weathered marks;
- stony line;
- repeated markers;
- less-worked forest beyond.

Static fallback:
`assets/stage-forest.svg`.

Future animated opportunities:
3–5 semantically compatible candidates per route.

No placeholder asset is claimed shipped.

## Route alt/caption fixture

File:
`prior-work/astra/prototype-m3.2/content/forest-route-media-localization-v1.fixture.json`.

Provides RU+EN:
- alt;
- caption

for:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

The fixture is presentation-only and uses locale-neutral presentation identities.

It does not create media-dependent gameplay.

---

# SHARED_PRESENTATION_WIRING_REQUIRED

Current shared Activity UI still requests:
`activity/forest/route/default`
while Forest Activity is active.

Before route-specific source can be consumed in production, Lead/Chat 1 must provide the shared mapping:
- `logging-road` -> `activity/forest/route/logging-road`;
- `old-boundary` -> `activity/forest/route/old-boundary`.

The mapping must run only after authoritative route selection.

It must not:
- write gameplay state;
- advance RNG;
- change route availability;
- change progress/endurance;
- change result identity;
- change Save semantics.

## Acceptance checklist

File:
`docs/lumber-prep/FOREST_ROUTE_PRESENTATION_ACCEPTANCE_CHECKLIST_V2.md`.

Lead acceptance covers:
- exact route/activity identity;
- existing route gate unchanged;
- Save invariance;
- global + Activity RNG invariance;
- reload stability;
- exact `activityResult` continuation;
- locale presentation-only behavior;
- static fallback;
- future media-pool safety;
- Old Boundary semantic isolation;
- Hunter isolation;
- challenge/season isolation;
- Lumber Hard Work unchanged.

This document defines acceptance criteria only; it does not claim tests/CI were executed.

---

# PRODUCT_OPEN

The following remain outside this wave.

## Hunter route

Still open:
- production route ID;
- route state;
- access source;
- clue/fact/capability;
- provider;
- threshold;
- reward;
- challenge/season binding.

No Hunter production route is introduced.

## Old Boundary Token

Current authority:
`old_boundary_token` provides `enter_old_boundary`;
current route gate checks that capability.

Still open:
- acquisition;
- price;
- provider;
- consumption;
- retention;
- turn-in;
- deeper use/lore.

No item-203–207 content decides these.

## Forest challenge mechanics

Still open:
- production IDs;
- route bindings;
- thresholds;
- progress/endurance values;
- rewards;
- persistent effects.

## School Arcana

Still open:
- exact public result/fact;
- provider;
- threshold;
- relation to anomaly interpretation.

## Seasonal topology

Still open:
- route closures;
- shortcuts;
- winter frozen passage;
- mechanical seasonal costs/rewards.

Seasonal media remains presentation-only.

## Deeper lore

Still open:
- creator/meaning of old markers;
- anomaly truth;
- Hunter provenance;
- deeper route outcomes/rewards.

---

# Exact Lead selective-copy groups

## Group A — poverty final copyedit

Copy:
- `docs/poverty-prep/POVERTY_COPYEDIT_PRODUCTION_READINESS_LEDGER_V2.md`;
- `prior-work/astra/prototype-m3.2/content/poverty-copyedit-final-delta-v2.fixture.json`;
- `prior-work/astra/prototype-m3.2/tests/poverty-copyedit-final-delta-v2.test.ts`.

Apply only the 33 final RU+EN replacement values.

## Group B — shared Night/lodging localization

Copy:
- `docs/poverty-prep/SHARED_NIGHT_LODGING_RU_COPY_REVIEW_V1.md`;
- `docs/poverty-prep/SHARED_NIGHT_LODGING_EN_PARITY_REVIEW_V1.md`;
- `prior-work/astra/prototype-m3.2/content/poverty-shared-ui-localization-v3.fixture.json`.

Requires Lead-owned UI consumption changes.

## Group C — Forest route presentation source

Copy:
- `docs/lumber-prep/FOREST_LOGGING_ROAD_SCENE_BANK_POLISH_V3.md`;
- `docs/lumber-prep/FOREST_OLD_BOUNDARY_SCENE_BANK_POLISH_V3.md`;
- `docs/lumber-prep/FOREST_ROUTE_SEMANTIC_MEDIA_BRIEF_V1.md`;
- `prior-work/astra/prototype-m3.2/content/forest-route-media-localization-v1.fixture.json`;
- `docs/lumber-prep/FOREST_ROUTE_PRESENTATION_ACCEPTANCE_CHECKLIST_V2.md`.

Also retain the prior current-main route sources as integration references:
- `forest-logging-road-localization-v2.fixture.json`;
- `forest-old-boundary-localization-v2.fixture.json`;
- `forest-route-presentation-replacement-v1.fixture.json`;
- `forest-route-presentation-contract-v1.test.ts`;
- `forest-route-natural-path-identity-v1.test.ts`;
- `FOREST_ROUTE_PRODUCT_OPEN_ISOLATION_LEDGER_V1.md`.

Do not activate route-specific UI without the shared route-state -> presentationId seam.

---

# Locked invariants

## Forest

Lumber Hard Work:
- eligibility ONLY `completed_shifts >= 50`;
- reward exactly `hardWork:lumber`;
- no route/item/School/relationship/challenge prerequisite.

Exact results:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Exact current routes:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

## Poverty

Ordinary poverty remains separate from Secret Debt.

Copyedit/localization:
- changes text only;
- preserves six production packs and 14 event identities;
- changes no mechanics, tuning, RNG, NightFlow, housing or Save.

## Branch policy

Never merge the entire Chat 3 worker branch.

Use selective copy/application from a fresh current-main branch.

# Handoff conclusion

Items 197–207 now provide:
- a production-reviewed final ordinary-poverty copyedit subset;
- finalized shared Night/lodging RU+EN source;
- concise Forest route scene prose;
- route media direction;
- route alt/caption localization;
- exact presentation acceptance criteria.

The remaining implementation work belongs to Lead-owned shared UI/presentation seams or to explicitly unresolved Product decisions.
