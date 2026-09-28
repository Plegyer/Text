# Ordinary Poverty Depth Handoff v2

Status: selective handoff for queue items 317–327.

Worker branch:
`chat3/lumber-production-proof-next`.

Current-main baseline used by the v2 patch:
`01b31b9ab0d0267d95edf5b5b80638acd63f5c04`.

Never merge the full worker branch.

Use fresh current-main branches and selective copy/application only.

# DEPTH_KEYS_READY

## Final v2 localization patch

File:
`prior-work/astra/prototype-m3.2/content/ordinary-poverty-localization-depth-v2.fixture.json`.

Contains:
- exactly **26** additive `presentation.poverty.depth.*` keys;
- complete RU+EN values;
- exact current event/variant references only;
- zero current-root collisions at the audited baseline;
- no gameplay fields;
- no Secret Debt.

Source banks:
- `HELPFUL_POVERTY_SCENE_DEPTH_BANK_V2.md`;
- `PRESSURE_POVERTY_SCENE_DEPTH_BANK_V2.md`;
- `CHEAP_RECOVERY_SCENE_DEPTH_BANK_V2.md`.

## Exact key mapping

File:
`prior-work/astra/prototype-m3.2/content/poverty-depth-key-to-variant-map-v1.fixture.json`.

Every depth key maps to exact:
- pack ID;
- event ID;
- variant ID;
- presentation candidate ID.

No prose inference is required.

# PRESENTATION_CONSUMER_REQUIRED

## Consumer design

File:
`docs/poverty-prep/ORDINARY_POVERTY_DEPTH_CONSUMER_DESIGN_V1.md`.

Required flow:

1. gameplay selects the ordinary-poverty event;
2. gameplay selects the existing gameplay variant;
3. presentation consumer reads exact `eventId + variantId`;
4. consumer looks up mapped depth keys;
5. pure deterministic presentation selector chooses a depth key;
6. UI renders RU or EN from that same key;
7. missing depth data falls back to current core variant text.

The consumer changes presentation only.

## Deterministic selector

File:
`docs/poverty-prep/POVERTY_DEPTH_DETERMINISTIC_SELECTION_CONTRACT_V1.md`.

Candidate grouping:
exact `eventId + variantId`.

Existing read-only occurrence input:
`run.historyState.eventHistory[eventId].count`.

Selection for ordered candidates:
`max(showCount - 1, 0) % candidateCount`.

Properties:
- no gameplay RNG;
- no Activity RNG;
- no new Save field;
- same key in RU and EN;
- stable across reload for the same pending event.

## Natural-path expectation

File:
`prior-work/astra/prototype-m3.2/content/poverty-depth-natural-path-render-v1.fixture.json`.

Representative exact paths:
- helpful;
- pressure;
- cheap lodging;
- recovery.

The fixture records:
- exact event/variant/choice IDs;
- exact conditions;
- exact choice effects;
- exact stable Journal ref;
- selected first-show depth key;
- expected RU+EN render;
- Save/RNG invariance.

# JOURNAL_ALREADY_READY

The shipped Journal/lastAction event-choice reference mechanism is already sufficient.

Current stable resolved identity:
`eventChoice(eventId, choiceId)`.

Depth copy is a pending-scene presentation layer.

Do not:
- write depth key into gameplay Journal identity;
- rewrite historical Save on locale change;
- replay choice effects;
- create locale-specific event/choice IDs.

Existing ordinary-poverty Journal mapping remains:
`poverty-event-choice-journal-map-v2.fixture.json`.

# ACCESSIBILITY_STATUS

File:
`docs/poverty-prep/POVERTY_DEPTH_ACCESSIBILITY_AUDIT_V1.md`.

Result:
- current poverty static visuals are semantically compatible with the new depth banks;
- semantic mismatch count: **0**;
- several current alt/caption strings contain meta-mechanical wording.

That wording is a separate accessibility localization cleanup.

No asset change is required for the depth-text integration.

# SECRET_DEBT_EXCLUDED

The v2 depth patch contains no:
- lender/offer;
- delayed debt activation;
- forced debt Night;
- bound career;
- `paid_freedom`;
- `bound_life`;
- `takeover`.

Ordinary poverty remains separate from Secret Debt.

No Secret Debt production identity is inferred from poverty depth copy.

# COLLISION_REGRESSION_READY

File:
`prior-work/astra/prototype-m3.2/tests/ordinary-poverty-localization-depth-v2.test.ts`.

Authored checks:
- exactly 26 keys;
- exact current event/variant references;
- exact key-to-variant map consistency;
- RU+EN completeness;
- zero root collisions;
- no Secret Debt;
- no gameplay fields.

The test is authored only; this handoff does not claim it was executed.

# SELECTIVE_COPY

## Group A — design/contracts

Copy:
1. `ORDINARY_POVERTY_DEPTH_CONSUMER_DESIGN_V1.md`;
2. `POVERTY_DEPTH_DETERMINISTIC_SELECTION_CONTRACT_V1.md`;
3. `ORDINARY_POVERTY_DEPTH_SELECTIVE_INTEGRATION_CHECKLIST_V1.md`.

## Group B — exact maps/patch

Copy:
1. `poverty-depth-key-to-variant-map-v1.fixture.json`;
2. `ordinary-poverty-localization-depth-v2.fixture.json`;
3. `poverty-depth-natural-path-render-v1.fixture.json`.

## Group C — copy banks

Copy:
1. `HELPFUL_POVERTY_SCENE_DEPTH_BANK_V2.md`;
2. `PRESSURE_POVERTY_SCENE_DEPTH_BANK_V2.md`;
3. `CHEAP_RECOVERY_SCENE_DEPTH_BANK_V2.md`.

## Group D — accessibility/test

Copy:
1. `POVERTY_DEPTH_ACCESSIBILITY_AUDIT_V1.md`;
2. `ordinary-poverty-localization-depth-v2.test.ts`.

# Integration invariants

Must remain exact:
- current six poverty pack IDs;
- current 14 event IDs;
- current 20 gameplay variant IDs;
- current 24 choice IDs;
- current event conditions;
- current choice effects;
- current event chance/cooldown/maxShows;
- current NightFlow timing;
- current lodging costs/effects;
- current Journal refs;
- gameplay RNG;
- Save schema.

# Recommended Lead order

1. start from exact current `main`;
2. re-run exact-key collision check for the 26 v2 keys;
3. add the 26 localization keys;
4. add a presentation-only key-to-variant lookup;
5. add the pure deterministic selector;
6. consume depth text only on the current pending scene body;
7. keep current core variant text as fallback;
8. run v2 collision regression;
9. run natural-path/reload/RNG/Journal regressions;
10. run full check and exact-head CI.

# Handoff conclusion

Items 317–327 are ready as:

- **DEPTH_KEYS_READY** — 26 refined additive RU+EN presentation keys;
- **PRESENTATION_CONSUMER_REQUIRED** — pure mapped deterministic pending-scene consumer;
- **JOURNAL_ALREADY_READY** — existing stable event-choice refs remain authoritative;
- **SECRET_DEBT_EXCLUDED** — no hidden-debt identity or mechanic enters this slice;
- **SELECTIVE_COPY** — all integration inputs are isolated file-by-file.
