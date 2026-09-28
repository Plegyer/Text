# Ordinary Poverty Depth Handoff v1

Status: selective-integration handoff for queue items 305–315.

Worker branch:
`chat3/lumber-production-proof-next`.

Current-main baseline:
`52ddc76148e33836d3161b63bf4c25ffb5c39d02`.

Never merge the long-lived worker branch wholesale.

Use fresh current-main branches and selective copy/application only.

# SAFE_DEPTH_KEYS

## Current production inventory

File:
`docs/poverty-prep/POST_PR58_ORDINARY_POVERTY_PRODUCTION_INVENTORY_V1.md`.

Exact current production:
- 6 ordinary-poverty packs;
- 14 event IDs;
- 20 gameplay variant IDs;
- 24 choice IDs;
- 82 current `event.poverty-*` localization keys;
- 28 poverty static-presentation localization keys;
- 10 current bespoke root static event-variant slots.

Secret Debt excluded.

## Depth audit

File:
`docs/poverty-prep/ORDINARY_POVERTY_EVENT_DEPTH_AUDIT_V1.md`.

All current event title/body/choice localization is non-empty in RU and EN.

Current content-depth opportunities are presentation-only:
- more phrasing/scene variety around single-variant events;
- richer cheap/recovery/pressure presentation;
- additional route/event-specific static media where current semantic IDs fall back.

No mechanics change is requested.

## Authored RU/EN banks

Files:
- `docs/poverty-prep/HELPFUL_POVERTY_VARIANT_BANK_RU_EN_V1.md`;
- `docs/poverty-prep/PRESSURE_POVERTY_VARIANT_BANK_RU_EN_V1.md`;
- `docs/poverty-prep/CHEAP_RECOVERY_POVERTY_VARIANT_BANK_RU_EN_V1.md`.

The banks use only exact current event/variant ownership.

No new gameplay event/variant/choice ID is introduced.

## Final additive depth fixture

File:
`prior-work/astra/prototype-m3.2/content/ordinary-poverty-localization-depth-v1.fixture.json`.

Contains:
- **26** additive RU+EN presentation keys;
- current-root collisions: **0**;
- exact existing event/variant references only;
- no gameplay fields;
- no Secret Debt content.

Namespace:
`presentation.poverty.depth.*`.

These are presentation-source keys only. They need an explicit Lead-owned consumer before becoming player-visible.

# JOURNAL_READY

File:
`prior-work/astra/prototype-m3.2/content/poverty-event-choice-journal-map-v2.fixture.json`.

Coverage:
- all **24** current ordinary-poverty resolved choices;
- exact stable `eventChoice(eventId, choiceId)` refs;
- title key;
- choice label key;
- choice outcome text key;
- RU+EN presence.

The shipped Journal/lastAction consumer already supports locale-at-render-time behavior.

No new Save identity is required.

# PRESENTATION_READY

File:
`prior-work/astra/prototype-m3.2/content/poverty-presentation-identity-map-v2.fixture.json`.

Coverage:
- all 14 current events;
- all 20 current gameplay variants;
- exact semantic event presentation IDs:
  `location/town/event/<clean-event-id>/<clean-variant-id>`.

A resolved choice does not create a new gameplay/result presentation namespace.

Current bespoke static coverage is partial; semantic identity exists even when media falls back.

## Natural-path localization proof

File:
`docs/poverty-prep/ORDINARY_POVERTY_NATURAL_PATH_LOCALIZATION_MATRIX_V3.md`.

Representative paths:
- helpful;
- pressure;
- cheap lodging;
- recovery.

The matrix records exact current:
- lodging costs;
- lodging Energy/effects;
- event/variant/choice IDs;
- choice effects;
- RU/EN keys;
- Journal refs.

Depth presentation changes none of those values.

# PRODUCT_OPEN_EXCLUDED

File:
`docs/poverty-prep/ORDINARY_POVERTY_OWNERSHIP_FIREWALL_V2.md`.

Strictly excluded from this depth slice:
- Secret Debt;
- Palace progression;
- Foreman/relationship Night;
- School;
- Forest Activity result content;
- generic debt economy reinterpretation.

Ordinary poverty remains:
- recoverable;
- contextual;
- independent from Secret Debt hidden/forced career logic.

No Product-open Secret Debt identity is introduced.

# REGRESSION_SOURCE

File:
`prior-work/astra/prototype-m3.2/tests/ordinary-poverty-localization-depth-v1.test.ts`.

Authored validation:
- exact current 14 event IDs;
- exact referenced current variant IDs;
- 26 RU+EN additive depth keys;
- zero current-root collisions;
- no Secret Debt ownership;
- no gameplay mechanics fields.

This handoff does **not** claim the new test was executed.

# SELECTIVE_COPY

## Group A — audit/source banks

Copy:
1. `POST_PR58_ORDINARY_POVERTY_PRODUCTION_INVENTORY_V1.md`;
2. `ORDINARY_POVERTY_EVENT_DEPTH_AUDIT_V1.md`;
3. `HELPFUL_POVERTY_VARIANT_BANK_RU_EN_V1.md`;
4. `PRESSURE_POVERTY_VARIANT_BANK_RU_EN_V1.md`;
5. `CHEAP_RECOVERY_POVERTY_VARIANT_BANK_RU_EN_V1.md`.

## Group B — journal/presentation maps

Copy:
1. `poverty-event-choice-journal-map-v2.fixture.json`;
2. `poverty-presentation-identity-map-v2.fixture.json`.

## Group C — additive localization depth

Copy:
1. `ordinary-poverty-localization-depth-v1.fixture.json`;
2. `ORDINARY_POVERTY_NATURAL_PATH_LOCALIZATION_MATRIX_V3.md`;
3. `ordinary-poverty-localization-depth-v1.test.ts`.

Apply/add the 26 depth keys only if the integration branch also provides the intended presentation consumer.

Do not modify existing gameplay packs to consume them by changing event IDs or variant IDs.

## Group D — ownership gate

Copy:
- `ORDINARY_POVERTY_OWNERSHIP_FIREWALL_V2.md`.

# Integration invariants

Must remain unchanged:
- six production pack IDs;
- 14 event IDs;
- 20 gameplay variant IDs;
- 24 choice IDs;
- current conditions;
- current effects;
- lodging costs;
- RNG behavior;
- NightFlow timing;
- Journal ref identity;
- Save schema.

# Recommended integration order

1. start from exact current main;
2. copy inventory/firewall/reference docs;
3. copy journal and presentation maps;
4. add the 26 localization-depth keys;
5. wire presentation-only consumption without touching gameplay identity;
6. run the collision regression;
7. run ordinary-poverty natural-path/reload coverage;
8. run full project check and exact-head CI.

# Handoff conclusion

Items 305–315 consolidate to:
- **SAFE_DEPTH_KEYS** — 26 additive bilingual presentation strings;
- **JOURNAL_READY** — all 24 resolved choices mapped to shipped stable refs;
- **PRESENTATION_READY** — all 20 current variant semantic IDs mapped;
- **PRODUCT_OPEN_EXCLUDED** — Secret Debt/Palace/Foreman/School/Forest result boundaries preserved;
- **SELECTIVE_COPY** — integration can proceed file-by-file without merging the worker branch.
