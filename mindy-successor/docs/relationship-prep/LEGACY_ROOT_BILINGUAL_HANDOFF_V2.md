# Legacy Root Bilingual Handoff v2

Date: 2026-09-27
Owner: Chat 5
Post-PR49 current-main baseline checked: `d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`
Scope: queue items 73–83
Integration mode: selective copy only; never wholesale-merge the worker branch.

## SAFE_ROOT_LOCALIZATION

Primary production-ready source:

- `prior-work/astra/prototype-m3.2/content/legacy-root-localization-production-patch-v2.fixture.json`

Item 82 contains exactly the current legacy root scope prepared in this wave:
- event titles;
- variant bodies;
- choice labels;
- finalized choice-outcome strings;
- refined current-media alt strings;
- complete RU+EN;
- current exact event/media IDs only;
- no gameplay fields.

Rebase evidence:
- `docs/relationship-prep/POST_PR49_LEGACY_ROOT_LOCALIZATION_REBASE_AUDIT_V2.md`

At the audited post-PR49 baseline, item-67 prepared root keys classified as:
- 108 ADDITIVE;
- 1 IDENTICAL;
- 0 CONFLICT;
- 0 SUPERSEDED.

The exact-identical key is `media.base.workshop.alt`.

Regression source:
- `prior-work/astra/prototype-m3.2/tests/legacy-root-localization-post-pr49-v2.test.ts`

Lead must rerun collision/identity checks on the exact integration head before merging strings into root localization.

## CHOICE_OUTCOME_SOURCE_READY

The choice-outcome content layer is complete for all 26 current choices in the assigned legacy root scope.

Sources:
- `docs/relationship-prep/LEGACY_CHOICE_OUTCOME_VISIBILITY_DEBT_INVENTORY_V1.md`
- `prior-work/astra/prototype-m3.2/content/legacy-choice-outcome-key-map-v1.fixture.json`
- `docs/relationship-prep/LEGACY_CHOICE_OUTCOME_RU_COPY_NORMALIZATION_V1.md`
- `docs/relationship-prep/LEGACY_CHOICE_OUTCOME_EN_PARITY_REVIEW_V1.md`
- `prior-work/astra/prototype-m3.2/content/legacy-choice-outcome-localization-v2.fixture.json`
- `docs/relationship-prep/LEGACY_OUTCOME_NATURAL_PATH_EXPECTATION_MATRIX_V1.md`

Stable content identity:

`event.<eventId>.choice.<choiceId>.text`

The normalized RU and full EN outcomes preserve exact current event/choice semantics and existing effects.

## SHARED_PRESENTATION_CONSUMER_REQUIRED

Contract:
- `docs/relationship-prep/LEGACY_JOURNAL_OUTCOME_PRESENTATION_CONTRACT_V1.md`

Current main still persists embedded `sceneChoice.text` into gameplay journal strings and conditionally `lastAction.text`.

Consequences:
- root choice-outcome localization strings are safe to merge;
- title, selected variant body, choice label, and media alt can already use current generic localization helpers;
- visible EN for post-choice Journal / raw lastAction outcome text remains blocked;
- fixing that visibility requires Lead-owned shared presentation/runtime work.

Required future behavior:
- derive visible outcome from stable event/choice identity;
- never use RU/EN prose as gameplay identity;
- never reapply the choice during locale switch;
- same effects/flags/resolver/RNG behavior;
- locale switch changes presentation only;
- old saves without stable outcome identity fall back to stored embedded text rather than guessed migration.

## Media-alt post-PR49 refinement

Source:
- `docs/relationship-prep/LEGACY_ROOT_MEDIA_ALT_POST_PR49_REFINEMENT_V2.md`

The post-PR49 re-audit found that these legacy root events still use their current pack media identities; no dedicated presentation-slot overrides were installed for them by PR47/48/49.

Item 81 therefore refines narrative-overfit alt wording to match the actual current generic assets:
- town image describes the visible town/traveler, not an unseen gopher/hatch;
- tavern image describes the visible tavern, not unseen documents/characters;
- seasonal tavern identities do not claim visual season cues absent from the shared image;
- forest media does not claim unseen receipt/Ren details;
- lumber media describes the actual worksite;
- room media describes the room, not an unseen landlord;
- goblin media keeps the visibly supported goblin description.

No asset ID/path changes.

## EXCLUDED_OTHER_OWNER

Do not use this wave to modify or claim:

### School
- `base.school`
- current School event/content/runtime localization

### Ordinary poverty
- all `poverty-*` event/content streams

### Foreman / relationship stream
- `lumber.foreman-notice`
- `lumber-night.foreman-professional`
- related Foreman presentation assets/localization

### Forest result / Chat3
- `forest-result-content-v1.*`
- Forest Activity route/result semantics

`gopher.receipt` and `gopher.hunt-intro` remain only their existing legacy/tutorial event identities.

### Secret Debt
All forced Secret Debt / Product-open content remains out of scope.

## PRODUCT_OPEN

No Product decision is required to integrate item-82 localization strings.

Still Product/open or outside this wave:
- changing current event story semantics;
- adding routes/choices/relationships;
- changing triggers, effects, flags, rewards, balance or progression;
- replacing generic legacy media with new dedicated assets;
- deciding on a broader journal data-model migration beyond the content contract;
- any new Forest, School, poverty, Foreman or Secret Debt mechanics.

## Exact selective-copy files

73. `mindy-successor/docs/relationship-prep/POST_PR49_LEGACY_ROOT_LOCALIZATION_REBASE_AUDIT_V2.md`
74. `mindy-successor/docs/relationship-prep/LEGACY_CHOICE_OUTCOME_VISIBILITY_DEBT_INVENTORY_V1.md`
75. `mindy-successor/prior-work/astra/prototype-m3.2/content/legacy-choice-outcome-key-map-v1.fixture.json`
76. `mindy-successor/docs/relationship-prep/LEGACY_CHOICE_OUTCOME_RU_COPY_NORMALIZATION_V1.md`
77. `mindy-successor/docs/relationship-prep/LEGACY_CHOICE_OUTCOME_EN_PARITY_REVIEW_V1.md`
78. `mindy-successor/prior-work/astra/prototype-m3.2/content/legacy-choice-outcome-localization-v2.fixture.json`
79. `mindy-successor/docs/relationship-prep/LEGACY_OUTCOME_NATURAL_PATH_EXPECTATION_MATRIX_V1.md`
80. `mindy-successor/docs/relationship-prep/LEGACY_JOURNAL_OUTCOME_PRESENTATION_CONTRACT_V1.md`
81. `mindy-successor/docs/relationship-prep/LEGACY_ROOT_MEDIA_ALT_POST_PR49_REFINEMENT_V2.md`
82. `mindy-successor/prior-work/astra/prototype-m3.2/content/legacy-root-localization-production-patch-v2.fixture.json`
83. `mindy-successor/prior-work/astra/prototype-m3.2/tests/legacy-root-localization-post-pr49-v2.test.ts`
84. `mindy-successor/docs/relationship-prep/LEGACY_ROOT_BILINGUAL_HANDOFF_V2.md`

## Recommended Lead integration order

1. Recheck item 82 against the exact current root localization using item 83.
2. Selectively merge approved item-82 strings into root localization.
3. Exercise item-79 natural paths in RU and EN.
4. Verify existing pending-scene title/body/choice-label/media-alt localization.
5. Keep choice outcomes locale-neutral in Save; do not solve Journal EN by persisting selected translations.
6. Implement a shared post-choice consumer only under Lead ownership and item-80 contract.
7. Validate exact effects once, same IDs, same resolver behavior and same RNG evolution across locales.
8. Run exact-head CI.

## Remaining visible localization debt after this wave

Content debt in the assigned legacy root scope is closed for:
- titles;
- selected variant bodies;
- choice labels;
- choice-outcome RU+EN source;
- current media alt.

One visible integration debt remains:

**Journal / raw lastAction post-choice outcome rendering still needs a shared locale-neutral presentation consumer.**

No additional Chat5 content string is required for that consumer.
