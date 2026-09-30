# Existing Ending Presentation Inventory v1

Status: C2-37 COMPLETE
Owner: Chat 2 / Presentation & Media
Baseline main: `8265a6af2bd87b9e69f0bce96e6a20a80a9e852c`

This inventory uses only ending identities currently present on main. It does not create endings, eligibility rules, career state, story facts, rewards, Save fields, RNG behavior, or synthetic presentation IDs.

## Registry rule

Current ending presentation identity is derived by `presentationIdForEnding`.

Every current ending semantic slot falls back through the registry to:

`location/town/default`

The generic town slot is catalog-backed by `stage.town`, so every ending has a safe non-text-only registry fallback even when no ending-specific override exists.

## Current endings

| Gameplay ending ID | Semantic presentation ID | Exact static override | RU/EN alt + caption | Classification |
| --- | --- | --- | --- | --- |
| `guild-life` | `ending/guild-life` | none | missing | current identity; generic town fallback only |
| `scholar-life` | `ending/scholar-life` | none | missing | current identity; generic town fallback only |
| `tavern-stay` | `ending/tavern-stay` | none | missing | current Tavern ending; C2-38 target |
| `tavern-guild` | `ending/tavern-guild` | none | missing | current Tavern ending; C2-38 target |
| `tavern-court` | `ending/tavern-court` | none | missing | current Tavern ending; C2-38 target |
| `lumber-stay` | `ending/lumber-stay` | none | missing | current legacy Lumber ending; generic town fallback only |
| `ending.lumber.hard-work` | `ending/lumber/hard-work` | `assets/presentation/career-lumber-result.svg` | complete | current target Lumber ending |
| `ending.lumber.forewoman` | `ending/lumber/forewoman` | `assets/presentation/foreman-professional.svg` | complete | current target Lumber ending |
| `ending.lumber.forest` | `ending/lumber/forest` | `assets/presentation/forest-return-success-v2.svg` | complete | current target Lumber ending |

## Counts

Current ending semantic identities: **9**.

Exact ending-specific static overrides: **3**.

Current ending identities using only generic registry fallback: **6**.

Ending overrides with complete RU/EN presentation alt + caption metadata: **3**.

## Queue boundary

C2-38 is assigned only to the three existing Tavern endings.

C2-39 explicitly re-audits only:
- `ending/lumber/hard-work`;
- `ending/lumber/forewoman`;
- `ending/lumber/forest`.

The current `guild-life`, `scholar-life`, and `lumber-stay` identities are therefore documented presentation gaps but are not self-assigned for new ending art in this queue.

No ending semantic ID is stale: all nine are derived from current main ending gameplay identities.
