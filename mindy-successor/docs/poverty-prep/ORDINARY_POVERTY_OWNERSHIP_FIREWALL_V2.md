# Ordinary Poverty Ownership Firewall v2

Status: post-PR58 ownership boundary refresh for ordinary poverty.

Current main:
`52ddc76148e33836d3161b63bf4c25ffb5c39d02`.

## Ordinary poverty ownership

Current production packs:
- `poverty-street-production`;
- `poverty-street-production-v2`;
- `poverty-cheap-production`;
- `poverty-cheap-production-v2`;
- `poverty-recovery-production`;
- `poverty-pressure-production`.

Current event namespace:
`poverty-*`
with localization under:
`event.poverty-*`.

Current source domain:
`poverty`.

Current trigger family:
`nightPhase(after_lodging)`.

Ordinary poverty owns:
- street/cheap context scenes;
- helpful/recovery scenes;
- neutral scenes;
- environmental pressure scenes;
- their exact choice identities;
- their current semantic event presentation IDs.

## Secret Debt separation

Ordinary poverty must not become:
- lender offer;
- hidden bound career;
- forced debt Night;
- career lock;
- `paid_freedom`;
- `bound_life`;
- `takeover`.

No ordinary-poverty event ID may be reused as a Secret Debt activation/result identity.

No additive depth key from item 312 contains Secret Debt semantics.

## Palace separation

Ordinary poverty:
- is not an ordinary profession;
- grants no Hard Work credit;
- grants no Palace 10/10 credit;
- does not occupy a profession slot;
- does not replace Palace hidden/meta progression.

No poverty event or localization key should be used as Palace unlock evidence.

## Foreman / relationship Night separation

Current relationship Night event:
`lumber-night.foreman-professional`.

Owner:
`lumber.foreman`.

Trigger family:
`nightChoiceCompleted(lumber.foreman.night)`.

Ordinary poverty does not own:
- that event ID;
- its relationship state;
- its Night choice;
- its Night policy.

Ordinary-poverty `after_lodging` context events must not be promoted into Foreman or other relationship Night content.

## School separation

School owns:
- School courses;
- School Night Study choices;
- School lesson/result presentation/localization;
- School-specific Night copy.

Ordinary-poverty depth copy must not:
- create School facts;
- require School progress;
- reuse School Night choice IDs;
- alter School Energy costs or study effects.

## Forest Activity result separation

Forest Activity:
`lumber.forest`.

Exact results:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Forest result/reaction pack:
`forest-result-content-v1`.

Ordinary poverty must not:
- react to Forest `activityResult` as poverty content;
- reuse Forest result IDs;
- reuse Forest result event IDs;
- alter Forest world facts;
- affect Lumber Hard Work.

## Generic debt economy separation

Current generic debt primitives:
- metric `debt`;
- action `repay`;
- action `rent-room`.

These are economy/housing primitives, not ordinary-poverty event identity.

Ordinary-poverty localization-depth keys do not redefine them.

## Journal ownership

Ordinary poverty may use the shipped generic:
`eventChoice(eventId, choiceId)`
Journal/lastAction ref mechanism.

The ref mechanism is shared infrastructure.

The owned identity remains the exact poverty event/choice ID.

No locale-specific Save identity is allowed.

## Presentation ownership

Ordinary-poverty event semantic IDs remain:
`location/town/event/<clean-event-id>/<clean-variant-id>`.

Additive depth keys from item 312 are presentation strings only.

They do not create:
- gameplay variant IDs;
- event IDs;
- result IDs;
- media-dependent mechanics.

## Firewall summary

Strictly separate domains:
1. ordinary poverty;
2. Secret Debt;
3. Palace;
4. Foreman/relationship Night;
5. School;
6. Forest Activity result content;
7. generic debt economy.

Item 312 is safe only while all seven ownership boundaries remain intact.
