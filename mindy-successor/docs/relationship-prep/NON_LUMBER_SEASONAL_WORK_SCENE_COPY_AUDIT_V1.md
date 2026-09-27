# Non-Lumber Seasonal Work-Scene Copy Audit v1

Date: 2026-09-27
Owner: Chat 5
Baseline main: `1af3104c1e4c180019b965adac8e87e67de89347`
Scope: nine non-Lumber ordinary careers, four current seasonal scene identities each.

## Audit rule

A current seasonal work scene is considered bilingual only when its player-facing seasonal scene text has a stable RU+EN localization entry. Embedded English in `definitions.json` is a fallback, not RU+EN localization coverage.

Current main has no seasonal-scene localization keys for these 36 identities.

## Classification

| Career | Spring | Summer | Autumn | Winter | Notes |
|---|---|---|---|---|---|
| Satyr Maid | MISSING | MISSING | MISSING | MISSING | Embedded EN is career-specific, but no RU+EN scene key exists. |
| Undead Farm | MISSING | MISSING | MISSING | MISSING | Embedded EN is career-specific, but no RU+EN scene key exists. |
| Tavern | GENERIC_OR_REUSED | GENERIC_OR_REUSED | GENERIC_OR_REUSED | GENERIC_OR_REUSED | Embedded EN uses generic seasonal work wording; no RU+EN scene key exists. |
| Hunter | GENERIC_OR_REUSED | GENERIC_OR_REUSED | GENERIC_OR_REUSED | GENERIC_OR_REUSED | Embedded EN is generic; ordinary `hunter.shift` only. |
| Guard | GENERIC_OR_REUSED | GENERIC_OR_REUSED | GENERIC_OR_REUSED | GENERIC_OR_REUSED | Embedded EN is generic seasonal work wording. |
| Merchant | GENERIC_OR_REUSED | GENERIC_OR_REUSED | GENERIC_OR_REUSED | GENERIC_OR_REUSED | Embedded EN is generic seasonal work wording. |
| Artist/Geisha | GENERIC_OR_REUSED | GENERIC_OR_REUSED | GENERIC_OR_REUSED | GENERIC_OR_REUSED | Embedded EN is generic seasonal work wording. |
| Assassin | GENERIC_OR_REUSED | GENERIC_OR_REUSED | GENERIC_OR_REUSED | GENERIC_OR_REUSED | Embedded EN is generic; presentation-only boundary applies. |
| Prostitute | GENERIC_OR_REUSED | GENERIC_OR_REUSED | GENERIC_OR_REUSED | GENERIC_OR_REUSED | Embedded EN is generic; non-explicit voluntary boundary applies. |

No identity is currently `SHIPPED_RU_ONLY` or `SHIPPED_RU_EN`.
No identity requires a `PRODUCT_OPEN` decision to receive text-only bilingual seasonal copy.

## Exact current seasonal presentation identities

For each current action scene `<season>.default`, current presentation code resolves:

`job/<career>/shift/<season>/default`

Thus the 36 identities are the Cartesian product of these careers:

- `satyr-maid`
- `undead-farm`
- `tavern`
- `hunter`
- `guard`
- `merchant`
- `artist-geisha`
- `assassin`
- `prostitute`

and seasons:

- `spring`
- `summer`
- `autumn`
- `winter`

## Proposed stable text-key convention

For the existing scene IDs only:

`action.<action-id>.scene.<season>.default.text`

Examples:
- `action.satyr-maid.shift.scene.spring.default.text`
- `action.guard.shift.scene.winter.default.text`

This is separate from the result-screen body keys prepared in the previous wave:

`action.<action-id>.result.<season>.default.text`

The two surfaces must not be conflated.

## Presentation/media compatibility

Current scene media references remain authoritative and project-owned. This content wave does not copy, rename, replace, or re-own static asset paths. Text keys attach to semantic seasonal scene identities only.

## Boundaries

- no mechanics, costs, wages, seasonal stat effects, conditions, rewards or progression edits;
- no semantic presentation-ID changes;
- no Lumber edits;
- no Forest Hunter route/clue/token/Old Boundary/expedition semantics;
- no new Assassin mission semantics or mechanics;
- Prostitute copy remains voluntary, non-explicit and mechanics-neutral.
