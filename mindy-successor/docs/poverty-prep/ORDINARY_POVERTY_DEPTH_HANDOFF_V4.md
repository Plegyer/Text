# Ordinary Poverty Depth Handoff v4

Status: current-main content/handoff candidate for queue items 341–350. Production runtime/UI wiring is deferred to Lead / Chat 1 Developer.

Worker branch:
`chat3/ordinary-poverty-depth-refresh-341-352`.

Branch start:
fresh from `main` at `05ceaeaaaf2c7c42f668c1140d9aaf3d61491148`.

Secret Debt remains excluded.

## CURRENT_IDENTITIES

Source:
`ORDINARY_POVERTY_CURRENT_MAIN_IDENTITY_AUDIT_V4.md`.

Exact current ordinary-poverty production remains:
- six pack IDs;
- 14 event IDs;
- 20 gameplay variant IDs;
- 24 choice IDs;
- `event.poverty-*` core localization namespace;
- 10 active event-specific poverty static presentation slots.

Gameplay identity is unchanged from the historical v3 handoff.

The historical worker baseline itself is stale and is not reused as integration authority.

## DEPTH_KEYS_READY

Source:
`ORDINARY_POVERTY_DEPTH_KEY_COLLISION_AUDIT_V4.md`.

Fixture:
`prior-work/astra/prototype-m3.2/content/ordinary-poverty-localization-depth-v3.fixture.json`.

Exact-current classification of the historical 26 depth keys:
- ADDITIVE: **26**;
- IDENTICAL: **0**;
- REUSE_EXISTING: **0**;
- CONFLICT: **0**;
- SUPERSEDED: **0**.

The rebuilt v3 fixture contains only the approved 26 RU+EN presentation keys.

It contains no event IDs, mechanics, RNG or Save payload.

## ACCESSIBILITY_READY

Source:
`POVERTY_STATIC_ACCESSIBILITY_TARGET_REVALIDATION_V3.md`.

Fixture:
`prior-work/astra/prototype-m3.2/content/poverty-static-accessibility-v3.fixture.json`.

Historical accessibility targets revalidated against exact active current poverty static bindings:
- ACTIVE_TARGET: **20**;
- ALREADY_REPLACED: **0**;
- NO_LONGER_ACTIVE: **0**;
- CONFLICT: **0**;
- OWNED_ELSEWHERE: **0**.

The fixture contains only current active alt/caption localization replacements.

It changes no:
- asset path;
- media source;
- gameplay identity.

## ORDERED_LOOKUP_READY

Source:
`POVERTY_DEPTH_CANDIDATE_ORDERING_LEDGER_V2.md`.

Fixture:
`prior-work/astra/prototype-m3.2/content/poverty-depth-render-lookup-v2.fixture.json`.

Exact current mapped groups:
- 17 eventId + variantId groups with approved depth keys;
- 26 approved depth keys total;
- 0 invalid historical mappings.

Deterministic presentation-only selection remains:

`index = max(showCount - 1, 0) % candidateCount`

using the existing read-only occurrence source:

`run.historyState.eventHistory[eventId].count`.

No gameplay RNG and no new Save field.

## FALLBACK_COMPLETE

Source:
`POVERTY_DEPTH_FALLBACK_COVERAGE_AUDIT_V2.md`.

Exact current coverage:
- 20 gameplay event/variant pairs total;
- 17 mapped to depth candidate(s);
- 3 explicit core-fallback-only pairs;
- coverage: **20/20**.

Core fallback identity:

`event.<eventId>.variant.<variantId>.text`.

No gameplay variant is invented.

## JOURNAL_NONOVERLAP

Regression source:
`prior-work/astra/prototype-m3.2/tests/poverty-depth-journal-nonoverlap-v2.test.ts`.

It validates:
- depth keys remain pending-scene presentation only;
- resolved Journal identity remains `eventChoice(eventId, choiceId)`;
- no depth key enters Save identity;
- no gameplay RNG field is used;
- RU/EN rendering uses the same Journal ref identity.

The stable Journal/outcome-ref mechanism remains shared production infrastructure and is not modified by Chat 3.

## OWNERSHIP_NONOVERLAP

Regression source:
`prior-work/astra/prototype-m3.2/tests/ordinary-poverty-localization-depth-v4.test.ts`.

It validates:
- exact current poverty IDs;
- RU+EN completeness;
- active accessibility targets;
- lookup/fallback coherence;
- no Secret Debt;
- no School ownership;
- no Foreman / PR #65 ownership;
- no Chat 2 media-source ownership;
- no gameplay/RNG/Save fields.

Ownership boundaries remain:
- Chat 3: content/localization fixtures, audits, regressions, handoff;
- Chat 2: media source assets;
- Chat 1 Developer: shared production/runtime/UI wiring;
- Chat 4: QA gate;
- Chat 5: School localization;
- Lead: integration decisions.

## SELECTIVE_COPY

The candidate PR should contain only the queue-341–351 refresh artifacts from this fresh branch.

Production integration should selectively consume:
- approved 26 depth localization keys;
- approved 20 accessibility replacements;
- exact 20-entry depth render lookup contract;
- regression expectations.

Do not merge or copy the historical `chat3/lumber-production-proof-next` branch wholesale.

## PRODUCTION_WIRING_DEFERRED

This candidate does **not** implement:
- pending-scene depth runtime/UI consumer;
- selector helper in shared runtime;
- production localization merge;
- media asset/path changes.

Lead / Chat 1 Developer owns any later shared runtime/UI integration after review.

## Historical v3 artifact disposition

### REUSED

Reused only after exact-current validation:
- the 26 RU+EN depth string values from historical `ordinary-poverty-localization-depth-v2.fixture.json`;
- the 20 reviewed RU+EN visible-scene accessibility values from historical `poverty-static-accessibility-v2.fixture.json`;
- the exact historical depth key -> current event/variant mapping where item 344 confirmed all 26 mappings still valid;
- the deterministic no-gameplay-RNG ordering concept.

“Reused” means content/source logic was revalidated and rebuilt into new files. It does not mean the historical branch is an integration base.

### REBUILT

Rebuilt on this fresh branch:
- `ORDINARY_POVERTY_CURRENT_MAIN_IDENTITY_AUDIT_V4.md`;
- `ORDINARY_POVERTY_DEPTH_KEY_COLLISION_AUDIT_V4.md`;
- `POVERTY_STATIC_ACCESSIBILITY_TARGET_REVALIDATION_V3.md`;
- `POVERTY_DEPTH_CANDIDATE_ORDERING_LEDGER_V2.md`;
- `POVERTY_DEPTH_FALLBACK_COVERAGE_AUDIT_V2.md`;
- `ordinary-poverty-localization-depth-v3.fixture.json`;
- `poverty-static-accessibility-v3.fixture.json`;
- `poverty-depth-render-lookup-v2.fixture.json`;
- `poverty-depth-journal-nonoverlap-v2.test.ts`;
- `ordinary-poverty-localization-depth-v4.test.ts`;
- this handoff.

### DROPPED

Not carried forward as candidate artifacts:
- historical `ORDINARY_POVERTY_DEPTH_HANDOFF_V3.md`;
- historical rebase/ordering/fallback audit versions;
- historical `ordinary-poverty-localization-depth-v2.fixture.json`;
- historical `poverty-static-accessibility-v2.fixture.json`;
- historical `poverty-depth-render-lookup-v1.fixture.json`;
- historical `poverty-depth-key-to-variant-map-v1.fixture.json` as an integration dependency;
- historical `poverty-depth-journal-nonoverlap-v1.test.ts`;
- historical `ordinary-poverty-localization-depth-v3.test.ts`;
- stale historical baseline metadata.

The old key-to-variant map was used only as a historical source during revalidation. The current lookup fixture is self-contained for the candidate contract.

## Locked invariants

This candidate must not change:
- ordinary-poverty pack/event/variant/choice gameplay IDs;
- conditions/effects/rewards/economy;
- NightFlow/lodging semantics;
- gameplay RNG;
- Save schema/identity;
- Journal stable identity;
- School/Foreman/Forest/Secret Debt behavior;
- media assets or media paths.

Locale changes remain presentation-only.

## Candidate status

Item 352 still must:
1. re-read exact current `main`;
2. run the new item-349 and item-350 regressions;
3. run relevant existing ordinary-poverty tests;
4. run `npm run check` if the available environment permits;
5. open the focused worker PR;
6. report exact candidate head and actually-run checks.

Until the PR exists, this handoff remains a working candidate rather than a delivered change.
