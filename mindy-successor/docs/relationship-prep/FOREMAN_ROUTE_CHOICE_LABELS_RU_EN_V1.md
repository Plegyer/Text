# Foreman Route Choice Labels RU+EN v1

Date: 2026-09-28
Status: PRESENTATION_ONLY
Baseline main: `01b31b9ab0d0267d95edf5b5b80638acd63f5c04`

## Exact current relationship choice

Choice ID:
`route`

Stable key:
`relationship.lumber.foreman.choice.route.label`

RU:
`Путь отношений`

EN:
`Relationship route`

## Exact current value

Value ID:
`professional`

Stable key:
`relationship.lumber.foreman.choice.route.value.professional.label`

RU:
`Профессиональный путь`

EN:
`Professional route`

## Current write identity

Transition:
`choose-professional`

Current effect:
`setRelationshipChoice(relationship='lumber.foreman', choice='route', value='professional')`

No other route value is current.

## Compatibility note

Earlier presentation source used a combined convenience key for the exact pair. This item defines separate semantic labels for the choice name and the value so a generic relationshipChoice renderer can localize both fields independently.

## Product-open exclusion

Do not add:
- romance value;
- friendship value;
- affection value;
- alternative route;
- route-dependent reward.

## Boundary

Presentation only. The stored choice/value IDs remain `route=professional`.
