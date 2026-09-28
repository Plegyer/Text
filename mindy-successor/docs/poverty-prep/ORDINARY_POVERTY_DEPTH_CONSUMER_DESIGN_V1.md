# Ordinary Poverty Depth Consumer Design v1

Status: presentation-only consumer design for the 26 additive `presentation.poverty.depth.*` keys.

Current-main baseline:
`54131488c65302f81b3001abaaa345d21f0281e2`.

No runtime/schema/gameplay change is implemented by this document.

## Goal

Use deeper RU+EN scene copy only **after** the existing ordinary-poverty gameplay event and gameplay variant have already been selected.

The consumer must never choose:
- an event;
- a gameplay variant;
- a choice;
- a reward;
- a penalty.

It chooses only one presentation string from the depth candidates mapped to the already-authoritative `eventId + variantId`.

## Authoritative current identities

The consumer may read only current shipped ordinary-poverty event and variant identities from these packs:
- `poverty-street-production`;
- `poverty-street-production-v2`;
- `poverty-cheap-production`;
- `poverty-cheap-production-v2`;
- `poverty-recovery-production`;
- `poverty-pressure-production`.

Exact key-to-identity mapping is delegated to:
`content/poverty-depth-key-to-variant-map-v1.fixture.json`.

## Consumer boundary

Input:
- exact current `eventId`;
- exact current `variantId`;
- current presentation locale;
- presentation-only deterministic selector input.

Output:
- one localized depth string, or no depth override.

The consumer does not receive or mutate:
- choice effects;
- event conditions;
- NightFlow phase;
- resources;
- RNG state;
- Save fields.

## Rendering order

1. gameplay selects the current ordinary-poverty event;
2. gameplay selects its current gameplay variant;
3. UI resolves normal core localization:
   `event.<eventId>.variant.<variantId>.text`;
4. optional depth consumer looks up mapped `presentation.poverty.depth.*` candidates;
5. deterministic presentation-only selector chooses one candidate;
6. UI renders that candidate in RU or EN;
7. if no candidate exists or lookup fails, UI keeps the normal core variant text.

Depth text is therefore an optional presentation override, never gameplay authority.

## Fallback

Fallback target:
`event.<eventId>.variant.<variantId>.text`.

Missing depth keys must never:
- block the event;
- alter event selection;
- reroll the event/variant;
- suppress a choice;
- change an effect.

## Locale rule

The selected depth candidate identity is locale-neutral.

RU and EN must use the same selected depth key.

Locale switch changes only:
- the string value read from that key.

Locale switch must not change:
- event ID;
- variant ID;
- depth candidate key;
- choice ID;
- RNG;
- Save.

## Journal rule

The depth consumer is for the **pending scene body**.

Resolved Journal/lastAction continues to use the shipped stable:
`eventChoice(eventId, choiceId)`
identity and current:
`event.<eventId>.choice.<choiceId>.text`
localization.

Do not write the depth-key identity into Journal gameplay history.

## Candidate grouping

Candidates are grouped strictly by exact:
`eventId + variantId`.

A key mapped to one gameplay variant may never be consumed by another variant even if the prose seems visually compatible.

## Determinism

Selection contract:
`POVERTY_DEPTH_DETERMINISTIC_SELECTION_CONTRACT_V1.md`.

The selector must:
- consume no gameplay RNG;
- write no Save field;
- produce the same candidate across RU/EN;
- be stable across reload for the same pending scene context.

## Presentation identity

The existing event semantic presentation ID remains:
`location/town/event/<clean-event-id>/<clean-variant-id>`.

Depth copy does not create a new gameplay presentation identity.

The depth key is a localized presentation child of the existing event/variant context.

## Static media

Static/media lookup remains independent.

A depth text candidate may accompany:
- bespoke current poverty static;
- generic poverty fallback;
- future approved presentation media.

Media availability must not choose or alter gameplay.

## Secret Debt firewall

This consumer handles ordinary poverty only.

It must reject/ignore any event outside the exact mapped ordinary-poverty identities.

No:
- lender;
- bound career;
- forced debt Night;
- `paid_freedom`;
- `bound_life`;
- `takeover`.

## Acceptance

A correct implementation can be summarized as:

`already-selected eventId + variantId -> optional deterministic depth key -> localized text`

with zero changes to gameplay IDs, mechanics, RNG or Save.
