# Chat5 legacy root bilingual wave QA v1

Status: COMPLETE / GREEN_SELECTIVE_LOCALIZATION_SOURCE / CHOICE_BODY_UI_DEBT

Reviewed Chat 5 items 61–72 as currently completed.

Current worker handoff baseline:
`4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`.

Current production main at QA:
`4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`.

## Exact event scope

Fixture:
`legacy-root-event-localization-v1.fixture.json`

Blob:
`fc6aec3db80144321e1b7aebaa3792b6ff9e7d1a`.

Covered exact current events:
- `base.arrival`;
- `base.order`;
- `base.bran`;
- `base.invite`;
- `base.workday`;
- `base.winter`;
- `base.shelter`;
- `gopher.arrival`;
- `gopher.tavern-intro`;
- `gopher.tavern-quest`;
- `gopher.receipt`;
- `gopher.tavern-resolution`;
- `gopher.tavern-routine`;
- `gopher.woods-intro`;
- `gopher.hunt-intro`;
- `gopher.landlord`;
- `stage.goblin`.

Event count:
`17`.

All 17 IDs exist on current main.

## Exact media scope

Covered media IDs:
`16`.

All 16 exist on current main.

They include:
- `base.workshop`;
- `base.town`;
- current gopher event media;
- current stage goblin media.

Missing media identity:
`0`.

## Localization completeness

Fixture strings:
`109`.

Missing RU:
`0`.

Missing EN:
`0`.

Keys are locale-neutral.

The fixture contains no gameplay fields.

## Root collision policy

Against current main after PR48:
- root collisions: 1;
- non-identical collisions: 0.

The one existing collision is exact-identical:
`media.base.workshop.alt`.

Therefore the current fixture satisfies:
`ADDITIVE_OR_EXACT_IDENTICAL`.

Lead must repeat this collision check on the final integration head.

## Ownership exclusion

Machine check found no keys overlapping:
- School;
- ordinary poverty;
- Foreman;
- Forest result/route ownership;
- Secret Debt.

The worker test also explicitly rejects those namespaces.

`gopher.receipt` remains the existing legacy/tutorial event reached through existing `forest-search`; localization does not create Chat3 Forest Activity semantics.

## Natural-path evidence

Item 69 maps current production paths for all 17 events and preserves:
- current trigger conditions;
- blocking/repeat behavior;
- exact choice IDs;
- existing priority/cooldown rules.

This is documentation/acceptance evidence, not new trigger logic.

## Current renderer coverage

Current shared event renderer already localizes:
- event title;
- variant body;
- choice label;
- media alt
through stable IDs.

Therefore those surfaces are:
`SAFE_TO_COPY_NOW`
after integration-head collision verification.

## Choice-body caveat

Fixture also includes:
`event.<eventId>.choice.<choiceId>.text`.

Current engine may persist embedded choice outcome text into gameplay journal/lastAction state, and the pending-scene renderer does not use the localized choice-body key.

Do not solve this by writing locale-selected prose into Save.

Classification:
`SHARED_UI_REQUIRED_FOR_VISIBLE_LOCALIZED_CHOICE_OUTCOME`.

Safe options:
- root-load the keys now as inert localization data; or
- add a future presentation consumer derived from stable event/choice identity.

Gameplay Save identity must remain locale-neutral.

## Copy duplication review

Item 70 found no exact duplicate full RU/EN lines.

A few short label refinements are optional text-only cleanup and must keep RU+EN paired if adopted.

They are not required for semantic correctness.

## Product boundary

No Product decision is needed for the 17 current event/localization surfaces.

Still excluded:
- new event/choice mechanics;
- new Hunter Forest semantics;
- School;
- poverty;
- Foreman;
- Forest route/result;
- Secret Debt;
- unrelated Lumber ownership.

## Production acceptance

Lead selective integration must:
1. copy only reviewed fixture/test/docs;
2. collision-check against exact integration head;
3. merge approved root strings;
4. exercise representative/all natural paths;
5. assert RU↔EN pending identity invariance;
6. preserve choice effects/flags/RNG/Save;
7. keep locale-specific prose out of Save identity;
8. pass exact-head CI;
9. pass post-merge main CI.

## Verdict

`GREEN_SELECTIVE_LOCALIZATION_SOURCE`.

Safe now:
- 109-key legacy root fixture for exact current IDs;
- generic event title/body/choice-label/media-alt localization.

Shared UI debt:
- visible localized post-choice outcome/journal text.

No other-owner or Product-open namespace leakage was found.
