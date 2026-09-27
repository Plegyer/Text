# Generic World Media-Alt Debt Audit v1

Date: 2026-09-27
Owner: Chat 5
Baseline main: `7f27caca4e3e711799e9c1f235c4a27adbf31026`

Scope: media identities actually used by the generic-world events in items 62–66.

## Classification

| Media ID | Classification | Notes |
|---|---|---|
| `base.workshop` | ROOT_RU_EN_ALT | Exact root key `media.base.workshop.alt` already exists in RU+EN. |
| `base.town` | EMBEDDED_RU_ONLY | Pack alt exists in Russian; exact root RU+EN key missing. |
| `gopher.arrival.default` | EMBEDDED_RU_ONLY | Player-facing; generic town asset source is reused. |
| `gopher.tavern-intro.default` | EMBEDDED_RU_ONLY | Player-facing; generic tavern asset source is reused. |
| `gopher.tavern-quest.default` | EMBEDDED_RU_ONLY | Player-facing; generic tavern asset source is reused. |
| `gopher.receipt.default` | EMBEDDED_RU_ONLY | Player-facing; generic forest asset source is reused. |
| `gopher.tavern-resolution.default` | EMBEDDED_RU_ONLY | Player-facing; generic tavern asset source is reused. |
| `gopher.tavern-routine.spring` | EMBEDDED_RU_ONLY | Player-facing; shares generic tavern asset source. |
| `gopher.tavern-routine.summer` | EMBEDDED_RU_ONLY | Player-facing; shares generic tavern asset source. |
| `gopher.tavern-routine.autumn` | EMBEDDED_RU_ONLY | Player-facing; shares generic tavern asset source. |
| `gopher.tavern-routine.winter` | EMBEDDED_RU_ONLY | Player-facing; shares generic tavern asset source. |
| `gopher.tavern-routine.default` | EMBEDDED_RU_ONLY | Player-facing; shares generic tavern asset source. |
| `gopher.woods-intro.default` | EMBEDDED_RU_ONLY | Player-facing; generic lumber asset source is reused. |
| `gopher.hunt-intro.default` | EMBEDDED_RU_ONLY | Player-facing; generic forest asset source is reused. |
| `gopher.landlord.default` | EMBEDDED_RU_ONLY | Player-facing; generic room asset source is reused. |
| `stage.goblin` | EMBEDDED_RU_ONLY | Player-facing goblin stage identity; exact root RU+EN key missing. |

## Category totals

- ROOT_RU_EN_ALT: 1
- EMBEDDED_RU_ONLY: 15
- SHARED_GENERIC: 0 as a primary localization state
- MISSING: 0
- NOT_PLAYER_FACING: 0

Several identities reuse a shared generic SVG source, but they still have their own current media IDs and embedded Russian alt strings. For localization purposes their primary debt is therefore EMBEDDED_RU_ONLY, not MISSING.

## Stable key rule

Use:

`media.<media-id>.alt`

Do not localize by file path. Different semantic media identities may point to the same generic static asset while retaining distinct alt copy.

## Ownership boundary

No media file path, asset file, presentation ID or selection rule changes in this wave. Item 70 supplies only RU+EN alt strings for the exact current identities above.
