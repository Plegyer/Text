# Ordinary Poverty Depth Handoff v3

Status: selective-integration handoff for queue items 329–339.

Worker branch:
`chat3/lumber-production-proof-next`.

Current-main baseline:
`01b31b9ab0d0267d95edf5b5b80638acd63f5c04`.

Never merge the full worker branch.

Use fresh exact-current-main branches and selective copy/application only.

# DEPTH_KEYS_REBASED

Rebase audit:
`docs/poverty-prep/ORDINARY_POVERTY_DEPTH_CURRENT_MAIN_REBASE_AUDIT_V3.md`.

Final depth patch:
`prior-work/astra/prototype-m3.2/content/ordinary-poverty-localization-depth-v2.fixture.json`.

Exact current-main result:
- depth keys: **26**;
- ADDITIVE: **26**;
- IDENTICAL: **0**;
- CONFLICT: **0**;
- SUPERSEDED: **0**.

All keys remain presentation-only under:
`presentation.poverty.depth.*`.

No current `event.poverty-*` gameplay/core localization key is overwritten.

# ACCESSIBILITY_COPY_READY

Debt inventory:
`docs/poverty-prep/POVERTY_STATIC_ACCESSIBILITY_WORDING_DEBT_V2.md`.

RU source:
`docs/poverty-prep/POVERTY_STATIC_ACCESSIBILITY_RU_SOURCE_V2.md`.

EN parity:
`docs/poverty-prep/POVERTY_STATIC_ACCESSIBILITY_EN_PARITY_V2.md`.

Machine-readable localization replacement:
`prior-work/astra/prototype-m3.2/content/poverty-static-accessibility-v2.fixture.json`.

Scope:
- 10 exact current event-specific poverty static assets;
- 20 exact alt/caption keys;
- RU+EN complete;
- visible-content descriptions only;
- no media path changes;
- no event IDs;
- no gameplay fields.

The new wording removes implementation/mechanics phrases such as:
- reward;
- exact penalty;
- event outcome;
- hidden effects;
- selected event identity.

Generic/root-only poverty fallback keys are documented separately and are not silently included in the active-asset replacement fixture.

# ORDERED_LOOKUP_READY

Candidate ordering ledger:
`docs/poverty-prep/POVERTY_DEPTH_CANDIDATE_ORDERING_LEDGER_V1.md`.

Fallback coverage audit:
`docs/poverty-prep/POVERTY_DEPTH_FALLBACK_COVERAGE_AUDIT_V1.md`.

Machine-readable render lookup:
`prior-work/astra/prototype-m3.2/content/poverty-depth-render-lookup-v1.fixture.json`.

Current exact coverage:
- gameplay event/variant pairs: **20**;
- pairs with mapped depth candidates: **17**;
- explicit core-fallback-only pairs: **3**;
- coverage: **20/20**.

Selection rule for mapped groups:

`index = max(showCount - 1, 0) % candidateCount`

with candidate keys sorted lexicographically.

Existing occurrence source:
`historyState.eventHistory[eventId].count`.

Properties:
- no gameplay RNG;
- no Activity RNG;
- no new Save field;
- same candidate key in RU and EN;
- stable across reload for the same pending event.

Fallback:
`event.<eventId>.variant.<variantId>.text`.

# JOURNAL_NONOVERLAP_PROVEN

Regression source:
`prior-work/astra/prototype-m3.2/tests/poverty-depth-journal-nonoverlap-v1.test.ts`.

The authored regression validates:
- depth keys are pending-scene presentation keys only;
- resolved Journal refs remain:
  `eventChoice(eventId, choiceId)`;
- no depth key enters Journal Save identity;
- depth render lookup references no gameplay RNG field;
- resolved Journal text continues to use current `event.*.choice.*.text` localization.

The shipped Journal/lastAction stable-ref mechanism remains authoritative.

Depth keys must not be stored as gameplay Journal identity.

This handoff does not claim the new test was executed.

# SHARED_NIGHT_ISOLATED

Ownership audit:
`docs/poverty-prep/POVERTY_DEPTH_SHARED_NIGHT_OWNERSHIP_AUDIT_V1.md`.

Exact key collision result between poverty depth/static keys and current shared Night/lodging ownership:
**0**.

Shared Night/lodging owns:
- `ui.night.*`;
- `ui.sleep.*`;
- lodging/housing/nightChoice labels;
- shared Night shell.

Ordinary poverty owns:
- selected poverty event presentation;
- event/variant core text;
- optional `presentation.poverty.depth.*` pending-scene body.

A poverty event triggering at `nightPhase(after_lodging)` does not transfer its body-copy ownership to the shared Night shell.

Secret Debt remains separate.

# CURRENT-MAIN COLLISION REGRESSION

Regression source:
`prior-work/astra/prototype-m3.2/tests/ordinary-poverty-localization-depth-v3.test.ts`.

Authored checks:
- exact 26 depth keys;
- exact current event/variant mappings;
- RU+EN completeness;
- exact 20 accessibility-v2 current key targets;
- zero unreviewed current-root conflicts;
- no Secret Debt;
- no gameplay mechanics fields.

Reviewed root replacements are limited to the accessibility-v2 keys.

Depth keys themselves remain additive with zero root collisions.

This handoff does not claim the new test was executed.

# SECRET DEBT EXCLUDED

Nothing in items 329–339 creates or reuses:
- lender/offer identity;
- forced debt Night;
- hidden bound career;
- `paid_freedom`;
- `bound_life`;
- `takeover`.

Ordinary poverty remains its own recoverable/contextual domain.

# SELECTIVE_COPY

## Group A — depth rebase/lookup

Copy:
1. `ORDINARY_POVERTY_DEPTH_CURRENT_MAIN_REBASE_AUDIT_V3.md`;
2. `POVERTY_DEPTH_CANDIDATE_ORDERING_LEDGER_V1.md`;
3. `POVERTY_DEPTH_FALLBACK_COVERAGE_AUDIT_V1.md`;
4. `poverty-depth-render-lookup-v1.fixture.json`;
5. existing `ordinary-poverty-localization-depth-v2.fixture.json`;
6. existing `poverty-depth-key-to-variant-map-v1.fixture.json`.

## Group B — accessibility localization

Copy:
1. `POVERTY_STATIC_ACCESSIBILITY_WORDING_DEBT_V2.md`;
2. `POVERTY_STATIC_ACCESSIBILITY_RU_SOURCE_V2.md`;
3. `POVERTY_STATIC_ACCESSIBILITY_EN_PARITY_V2.md`;
4. `poverty-static-accessibility-v2.fixture.json`.

Apply only the 20 reviewed current alt/caption replacements.

Do not change media paths.

## Group C — ownership/regressions

Copy:
1. `POVERTY_DEPTH_SHARED_NIGHT_OWNERSHIP_AUDIT_V1.md`;
2. `poverty-depth-journal-nonoverlap-v1.test.ts`;
3. `ordinary-poverty-localization-depth-v3.test.ts`.

# Integration acceptance

Before applying:
1. start from exact current `main`;
2. re-run depth exact-key classification;
3. verify all 20 accessibility targets still exist;
4. add the 26 depth keys;
5. apply only reviewed 20 accessibility replacements;
6. add the presentation-only lookup/selector consumer;
7. keep core variant text fallback;
8. run v3 collision regression;
9. run Journal non-overlap regression;
10. run ordinary-poverty natural-path/reload coverage;
11. run full project check;
12. require exact-head CI.

# Locked invariants

Must remain unchanged:
- six poverty pack IDs;
- 14 event IDs;
- 20 gameplay variant IDs;
- 24 choice IDs;
- event conditions;
- choice effects;
- event chance/cooldown/maxShows;
- NightFlow timing;
- lodging costs/effects;
- Journal `eventChoice` identity;
- gameplay RNG;
- Save schema.

# Handoff conclusion

Items 329–339 are ready as:

- **DEPTH_KEYS_REBASED** — all 26 keys remain additive on exact current main;
- **ACCESSIBILITY_COPY_READY** — 20 current asset alt/caption replacements in polished RU+EN;
- **ORDERED_LOOKUP_READY** — deterministic 20/20 variant coverage with explicit fallback;
- **JOURNAL_NONOVERLAP_PROVEN** — regression source keeps depth out of resolved Save identity;
- **SHARED_NIGHT_ISOLATED** — zero real key collisions with shared Night/lodging ownership;
- **SELECTIVE_COPY** — integration is isolated file-by-file without whole-branch merge.
