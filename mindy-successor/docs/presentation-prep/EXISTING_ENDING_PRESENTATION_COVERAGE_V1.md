# Existing Ending Presentation Coverage v1

Status: C2-52 COMPLETE
Owner: Chat 2 / Presentation & Media
Baseline main: `593f9936d72296557b36a0e0ca7d3c7bb780839c`

Current gameplay exposes nine ending semantic presentation identities.

Coverage is intentionally split to avoid duplicating the frozen C2-37..48 candidate.

## Already exact on current main

- `ending/lumber/hard-work`
- `ending/lumber/forewoman`
- `ending/lumber/forest`

All three have exact static bindings and RU/EN presentation accessibility metadata.

## Merged source — PR #109

PR #109, exact head `946d8b6188ff7aab8b7bf41faabdcbe42faf8445`, is now merged on current main and supplies prepared Tavern assets/coverage for:

- `ending/tavern-stay`
- `ending/tavern-guild`
- `ending/tavern-court`

C2-52 does not duplicate those already-merged assets. Final queue-v6 production coverage may bind these existing semantic IDs to the now-current-main Tavern assets.

## New C2-52 coverage

This queue prepares project-owned static sources and RU/EN alt/caption metadata for the three remaining current ending identities:

- `ending/guild-life` -> `assets/presentation/ending-guild-life.svg`
- `ending/scholar-life` -> `assets/presentation/ending-scholar-life.svg`
- `ending/lumber-stay` -> `assets/presentation/ending-lumber-stay.svg`

All three preserve the current registry fallback:
- `location/town/default`.

No ending, condition, reward, Meta effect, Save field, or gameplay identity is invented.

## Coverage result

Current ending semantic IDs: **9**.

Exact current-main ending overrides: **3**.

Merged PR #109 prepared Tavern overrides/assets: **3**.

New C2-52 prepared overrides: **3**.

Current ending identities without owned presentation coverage across current main + C2-52 prepared sources: **0**.
