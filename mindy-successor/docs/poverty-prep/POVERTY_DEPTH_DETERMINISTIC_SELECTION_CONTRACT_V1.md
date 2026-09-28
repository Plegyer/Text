# Poverty Depth Deterministic Selection Contract v1

Status: presentation-only selection contract. No runtime implementation is included.

Current-main baseline:
`54131488c65302f81b3001abaaa345d21f0281e2`.

## Inputs

The selector may read only:
- authoritative pending `eventId`;
- authoritative pending `variantId`;
- existing `run.historyState.eventHistory[eventId].count`;
- the ordered depth-candidate keys mapped to that exact `eventId + variantId`.

The event history count is already gameplay-owned state. The presentation consumer reads it but never writes it.

## Candidate source

Candidates come only from:
`poverty-depth-key-to-variant-map-v1.fixture.json`.

Candidate ordering:
lexicographic by depth key.

No candidate may cross an event/variant boundary.

## Selection rule

Let:
- `candidates` = ordered keys for exact `eventId + variantId`;
- `showCount` = current existing `eventHistory[eventId].count`.

Then:

- zero candidates -> use normal core variant text;
- one candidate -> use candidate 0;
- two or more candidates ->
  `index = max(showCount - 1, 0) % candidates.length`.

Selected depth key:
`candidates[index]`.

This rotates presentation copy across repeated shows without any random draw.

## Why `showCount - 1`

Current resolver records event history when the event becomes pending.

At that point the first selected occurrence has:
`count = 1`.

Therefore:
- first show -> index 0;
- second show -> index 1;
- third show -> index 0 for a two-candidate group.

## No gameplay RNG

The selector must never call:
- global gameplay `random(...)`;
- `run.rng`;
- Activity RNG;
- event chance RNG.

Depth selection happens only after gameplay has already selected the event and variant.

## No Save mutation

The selector must not write:
- selected depth key;
- presentation index;
- locale;
- media candidate;
- any extra field

into gameplay Save.

It is a pure derived view of already-saved state.

## Reload stability

For a pending event:
- `eventId` is stable;
- `variantId` is stable;
- event history count is already recorded and stable.

Therefore the same depth key is derived after save/reload.

## Locale stability

RU and EN use the same selected depth key.

Locale switch resolves:
- `strings[key].ru`; or
- `strings[key].en`.

Locale is not part of candidate selection.

## Journal independence

Resolved Journal/lastAction rendering continues to use:
`eventChoice(eventId, choiceId)`.

Do not reconstruct a depth candidate for historical Journal text.

Depth copy is a pending-scene presentation layer only.

## Fallback

If:
- mapping missing;
- key missing;
- localized value missing;
- invalid event/variant input

then render current core:
`event.<eventId>.variant.<variantId>.text`.

Never reroll or replace gameplay identity.

## No mechanic coupling

Depth candidate index cannot affect:
- choices;
- choice eligibility;
- effects;
- event chance;
- cooldown;
- maxShows;
- NightFlow;
- lodging;
- money/Energy/Grooming;
- RNG;
- Save.

## Secret Debt firewall

Only exact mapped ordinary-poverty identities are eligible.

Unknown/Secret Debt identities return no depth candidate.

## Acceptance

The function is conceptually:

`(eventId, variantId, existingShowCount, mappedKeys) -> depthKey | null`

with no side effects and no gameplay randomness.
