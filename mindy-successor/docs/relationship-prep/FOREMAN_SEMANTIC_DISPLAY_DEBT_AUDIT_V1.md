# Foreman Semantic Display Debt Audit v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `01b31b9ab0d0267d95edf5b5b80638acd63f5c04`

## Exact current semantic identities

Relationship:
- `lumber.foreman`

Stages:
- `unknown`
- `professional`
- `route-professional`

Counter currently written by ordinary voluntary Night:
- `night_meetings`

Fact currently written by the Foreman Night follow-up event:
- `night-followup-complete`

Relationship choice/value currently written by transition `choose-professional`:
- choice: `route`
- value: `professional`

No other Foreman stage/counter/fact/choice value is current.

## Current player-visible raw-ID seam

Current shared condition renderer prints relationship semantics with raw stable IDs:

- relationship stage: `Отношения {relationship}: этап {stage}`
- relationship counter: `Отношения {relationship}: {counter} ...`
- relationship fact: `Отношения {relationship}: факт {fact} ...`
- relationship choice: `Отношения {relationship}: {choice} = {value}`

The exact current normal-player condition that exposes Foreman IDs is the Lumber Forewoman ending requirement:

`{"kind":"relationshipStage","relationship":"lumber.foreman","stage":"route-professional"}`

So the Legacy panel can currently show raw:
- `lumber.foreman`
- `route-professional`

## Current condition-capable semantic debt

The shared renderer already supports relationshipCounter / relationshipFact / relationshipChoice. Current Foreman content owns exact identities for:
- counter `night_meetings`
- fact `night-followup-complete`
- choice/value `route=professional`

They are not currently used by a normal-player ending requirement, but they are valid current relationship semantics and can surface through future/current debug-adjacent condition presentation without requiring new gameplay identity.

This queue prepares display labels only.

## Current root localization status

Root localization contains no `relationship.lumber.foreman.*` semantic-name keys.

Current event/Night prose is already localized separately and is not semantic-label debt.

## Required presentation layer

Prepare stable keys for:
- relationship label;
- each exact current stage label;
- current counter label;
- current fact label;
- current route-choice name;
- current route value label.

The stable gameplay IDs remain unchanged.

## Product-open excluded

Do not add:
- personal Foreman name;
- romance stage/value;
- affection meter/counter;
- additional Night facts;
- extra relationship choices/routes;
- housing gate;
- reward/economy semantics.

## Boundary

Presentation only. No relationship transitions, conditions, effects, NightFlow, Save, or RNG changes.
