# Ordinary Poverty First Production Slice Plan v1

Status: smallest real content slice that upgrades shipped lodging infrastructure into visible ordinary-poverty gameplay without requiring Secret Debt decisions.

## Slice boundary

Include only ordinary poverty.

Exclude:
- lender/Secret Debt offer;
- delayed debt;
- hidden career;
- forced Secret Debt Night;
- Secret Debt endings/Meta;
- any new runtime architecture.

Use existing:
- `lodging.normal` / `lodging.cheap` / `lodging.street`;
- housingTier conditions;
- NightFlow event delivery;
- event history/RNG persistence;
- money/item/public-fact effects;
- next-day modifiers;
- semantic presentationId + static/text fallback.

## Content family 1 — ordinary street events

Minimum authored production content:
- at least one helpful street event;
- at least one neutral street event;
- at least one bad street event;
- all use authoritative `housingTier=street` or equivalent current housing state;
- all remain ordinary poverty events, never Secret Debt state transitions.

Authoring rules:
- stable canonical event IDs;
- event history/cooldown/repeatability explicit;
- no final chance/weight assumed until balance-approved;
- effects use existing money/resource/item/public-state primitives;
- bad outcome passes anti-softlock guard.

Production domains:
- poverty/street event pack;
- presentation mapping/fallback.

## Content family 2 — recovery/help hook

Minimum slice needs at least one optional authored recovery/help source beyond the baseline starting-job income floor.

Allowed already-authorized shapes:
- relationship help/favor through public relationship state;
- small paid event;
- item/resource assistance using existing inventory effects.

Do not require:
- one specific helper NPC;
- sale/barter if that system is not yet accepted;
- Secret Debt.

Authoring rule:
recovery hook must be optional; absence/failure does not remove the baseline earned-income recovery path.

## Seasonal/context variation

Minimum strategy:
- at least one ordinary street event family has deterministic calendar-season or meaningful context variation;
- variation may change eligibility/variant/effect family/presentation;
- no new topology/runtime primitive required.

Do not require four fully bespoke seasonal events in the first slice.

Acceptance:
- same authoritative season/context produces same available variant set after reload;
- committed variant does not reroll.

## Cheap-lodging visible content

Optional but desirable within first slice if file ownership allows:
- at least one cheap-lodging-specific Night/context variant;
- distinguishes cheap from normal beyond price alone;
- no final penalty magnitude required if kept parameterized.

This is not required to block the core street-event slice.

## Zero-money anti-softlock

Must remain true:
1. zero-money player can select street lodging;
2. Night can complete;
3. next day begins;
4. at least one deterministic ordinary income/progress path is reachable;
5. helpful random event is not required;
6. Secret Debt is not required.

Bad street-event design must not invalidate this.

## Natural reachability

Production QA must reach street content through normal flow:
`daytime -> EndDay -> choose production street lodging -> Night/event resolution`.

Do not:
- inject pending event directly;
- seed a fake poverty fact solely to force the event;
- call a synthetic event ID and label the path naturally reachable.

## Save/reload acceptance

Required checkpoints:
- after EndDay before lodging choice;
- after street lodging selection;
- after ordinary event selection/pending state;
- after event resolution before/through day advance;
- after next day starts.

Assert:
- no duplicate lodging payment;
- no event reroll after selection;
- no duplicate money/item/public effect;
- next-day modifier applies once;
- calendar advances once.

## Presentation fallback

Every new visible surface needs:
- semantic `presentationId`;
- text fallback;
- static fallback;
- optional GIF only.

Minimum surfaces:
- street event family/variant;
- recovery/help event;
- seasonal/context variant if visually distinct.

Mechanics must be identical with GIF absent.

## Balance parameterization

First slice may keep these configurable:
- event weights;
- money/resource deltas;
- street penalty magnitude if still open;
- recovery/help amount;
- cooldown/frequency.

Production content must reference one authoritative config/data value rather than duplicating numbers across prose/tests.

## Expected production file domains

Future implementation should touch only the minimum owned domains, for example:
- poverty/street event pack;
- existing lodging definition data only if approved balance values are activated;
- presentation semantic mapping/fallback;
- targeted poverty tests.

No core schema/engine changes are expected for this slice.

## Targeted tests

Minimum:
- ordinary street event natural reachability;
- helpful/neutral/bad family validation;
- bad-event anti-softlock;
- reload/reroll/idempotency;
- zero-money next-day path;
- optional recovery/help hook;
- seasonal/context deterministic variant;
- presentation fallback.

## Full regression

Before merge:
- typecheck;
- content validation;
- build;
- targeted tests;
- full test suite.

Preserve:
- normal NightFlow;
- School baseline;
- Activity save/resume;
- endings/Meta;
- Palace prerequisite;
- all Lumber locked contracts.

## Slice completion definition

This first slice is complete when ordinary poverty is visible through naturally reachable production street content, remains recoverable at zero money, survives reload, has presentation fallback, and does not depend on Secret Debt or new runtime architecture.

## Explicit OPEN

Do not choose here:
- final prices;
- final event probabilities;
- final money deltas;
- canonical NPC identities;
- final prose;
- final GIFs;
- sale/barter system.
