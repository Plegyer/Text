# Foreman Stage Transition Display Matrix v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `01b31b9ab0d0267d95edf5b5b80638acd63f5c04`

## Exact current stage graph

Current relationship:
`lumber.foreman`

Initial stage:
`unknown`

Current stages:
- `unknown`
- `professional`
- `route-professional`

There are exactly two current transitions.

| Transition ID | From ID | From RU / EN | Exact condition | To ID | To RU / EN | Exact effect |
|---|---|---|---|---|---|---|
| `notice-work` | `unknown` | `Ещё не знакомы` / `Not yet acquainted` | career `lumber` stage `accepted-hand` | `professional` | `Рабочее доверие` / `Professional trust` | none |
| `choose-professional` | `professional` | `Рабочее доверие` / `Professional trust` | none | `route-professional` | `Профессиональный путь` / `Professional route` | set choice `route=professional` |

## Current event path

`lumber.foreman-notice` resolves both current transitions in order through its exact `professional` choice:

1. `advanceRelationship(..., transition='notice-work')`
2. `advanceRelationship(..., transition='choose-professional')`

Visible localization may show the before/after stage names, but it must not split, reorder, repeat or otherwise change those transition effects.

## Night eligibility

Current voluntary Night choice `lumber.foreman.night` requires exact stage:

`route-professional`

Expected display:
- RU: `Профессиональный путь`
- EN: `Professional route`

The localized stage name is presentation only; eligibility still compares the stable stage ID.

## No reverse/additional transition

Current schema has no:
- `route-professional → professional` transition;
- romance branch;
- affection stage;
- additional route selection.

Those remain Product-open and are not represented in this matrix.

## Invariants

Localization must not alter transition IDs, from/to arrays, conditions, effects, event ordering, Save, or RNG.
