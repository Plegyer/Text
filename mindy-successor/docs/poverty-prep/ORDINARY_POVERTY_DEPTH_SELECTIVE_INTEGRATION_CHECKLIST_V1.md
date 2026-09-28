# Ordinary Poverty Depth Selective Integration Checklist v1

Status: Lead acceptance checklist for selectively integrating the ordinary-poverty depth consumer and v2 localization patch.

Current-main baseline for the v2 patch:
`01b31b9ab0d0267d95edf5b5b80638acd63f5c04`.

Worker branch:
`chat3/lumber-production-proof-next`.

Do not merge the worker branch wholesale.

## Files under acceptance

Required:
- `prior-work/astra/prototype-m3.2/content/ordinary-poverty-localization-depth-v2.fixture.json`;
- `prior-work/astra/prototype-m3.2/content/poverty-depth-key-to-variant-map-v1.fixture.json`;
- `docs/poverty-prep/ORDINARY_POVERTY_DEPTH_CONSUMER_DESIGN_V1.md`;
- `docs/poverty-prep/POVERTY_DEPTH_DETERMINISTIC_SELECTION_CONTRACT_V1.md`;
- `prior-work/astra/prototype-m3.2/content/poverty-depth-natural-path-render-v1.fixture.json`;
- `prior-work/astra/prototype-m3.2/tests/ordinary-poverty-localization-depth-v2.test.ts`.

Supporting copy/a11y:
- `HELPFUL_POVERTY_SCENE_DEPTH_BANK_V2.md`;
- `PRESSURE_POVERTY_SCENE_DEPTH_BANK_V2.md`;
- `CHEAP_RECOVERY_SCENE_DEPTH_BANK_V2.md`;
- `POVERTY_DEPTH_ACCESSIBILITY_AUDIT_V1.md`.

## Localization acceptance

PASS only if:
- exactly 26 `presentation.poverty.depth.*` keys are added;
- every key has non-empty RU and EN;
- current root has no exact-key collision;
- no existing `event.poverty-*` key is overwritten by this slice;
- no locale-specific gameplay ID is introduced.

The v2 fixture is additive only.

## Exact identity acceptance

Every depth key must map through the item-318 map to an exact current:
- pack ID;
- event ID;
- variant ID;
- presentation candidate ID.

No consumer may infer identities from prose.

No event or gameplay variant is created by the depth patch.

## Consumer placement

Depth lookup occurs only after gameplay has already committed:
- `run.pending.eventId`;
- `run.pending.variantId`.

The consumer may replace only the **rendered pending scene body**.

It must not:
- choose an event;
- choose a gameplay variant;
- alter allowed choices;
- alter an effect;
- change event history.

## Deterministic selector

Required candidate grouping:
exact `eventId + variantId`.

Required presentation-only rotation input:
existing:
`run.historyState.eventHistory[eventId].count`.

For an ordered candidate array:

`index = max(showCount - 1, 0) % candidates.length`.

PASS only if:
- no gameplay RNG is consumed;
- no Activity RNG is consumed;
- no new Save field stores the selected depth key;
- RU and EN select the same key;
- reload of the same pending event selects the same key.

## Fallback

If:
- no mapped depth candidate;
- missing key;
- missing locale value;
- unsupported identity

then render:
`event.<eventId>.variant.<variantId>.text`.

Fallback must not reroll or replace the event/variant.

## Natural-path acceptance

Use:
`poverty-depth-natural-path-render-v1.fixture.json`.

Representative paths:
- helpful street;
- pressure street;
- cheap lodging;
- recovery work.

For every path:
- current reaction trigger remains exact;
- event conditions remain exact;
- variant conditions remain exact;
- selected choice remains exact;
- choice effects remain exact;
- Journal ref remains `eventChoice(eventId, choiceId)`;
- depth rendering does not mutate Save/RNG.

## Journal acceptance

The shipped Journal/lastAction stable-ref mechanism is already authoritative.

Do not:
- store depth candidate key as Journal gameplay identity;
- replace `eventChoice(eventId, choiceId)`;
- replay choice effects when rendering localized Journal text.

Depth consumer is pending-scene-only unless a separately reviewed presentation-only historical consumer is later designed.

## Static/accessibility acceptance

Current poverty static assets are semantically compatible with the depth banks.

Do not use long scene-depth paragraphs as image alt text.

Existing meta-mechanical alt/caption wording is a separate accessibility-localization cleanup and is not a blocker for this text-depth consumer.

## Mechanics firewall

Reject integration if it changes any current:
- event ID;
- gameplay variant ID;
- choice ID;
- event conditions;
- choice effects;
- event chance;
- cooldown/maxShows;
- lodging cost;
- next-day Energy/stat effects;
- NightFlow point/policy;
- RNG;
- Save schema.

## Secret Debt firewall

Depth patch/consumer must exclude:
- lender/offer;
- forced debt Night;
- hidden bound career;
- `paid_freedom`;
- `bound_life`;
- `takeover`.

Ordinary poverty remains separate.

## Ownership firewall

Do not affect:
- Palace progression;
- Foreman relationship Night;
- School;
- Forest Activity/result content;
- generic debt economy.

## Test/CI acceptance

On the integration branch:
1. run `ordinary-poverty-localization-depth-v2.test.ts`;
2. run existing poverty localization/natural-path regressions;
3. run Journal localization regressions;
4. run full project check;
5. require exact-head CI.

Chat 3 authored the v2 regression source but does not claim it was executed here.

## Final acceptance

This slice is acceptable only when the observable change is limited to:

**same ordinary-poverty event + same gameplay variant + same choices/effects -> deeper deterministic RU/EN scene body**

with no gameplay identity, RNG, Save or Secret Debt change.
