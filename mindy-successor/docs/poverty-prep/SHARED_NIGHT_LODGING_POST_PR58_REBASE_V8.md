# Shared Night / Lodging Post-PR58 Rebase v8

Status: exact rebase of the prior 20-key shared Night/lodging fixture against current `main` after PR #58.

Current main:
`52ddc76148e33836d3161b63bf4c25ffb5c39d02`.

Source:
`prior-work/astra/prototype-m3.2/content/poverty-shared-ui-localization-v5.fixture.json`.

Classification:
- **ADDITIVE** — exact key still absent and still has an active consumer need.
- **IDENTICAL** — current root already contains the exact RU+EN pair.
- **SUPERSEDED** — key itself is absent, but current shipped UI consumes another owned key for that same player-facing seam.
- **CONFLICT** — current root contains the exact key with different content.

## Exact-key rebase

| Key | Classification | Post-PR58 reason |
| --- | --- | --- |
| `ui.night.eyebrow` | **IDENTICAL** | Exact RU+EN shipped. |
| `ui.night.lodging.prompt` | **IDENTICAL** | Exact RU+EN shipped and consumed. |
| `ui.night.nextDayEnergy` | **IDENTICAL** | Exact formatter shipped and consumed. |
| `ui.night.choice.title` | **IDENTICAL** | Exact RU+EN shipped and consumed. |
| `ui.night.choice.prompt` | **IDENTICAL** | Exact RU+EN shipped and consumed. |
| `ui.night.choice.slot` | **IDENTICAL** | Exact RU+EN shipped and consumed. |
| `ui.night.choice.select` | **IDENTICAL** | Exact RU+EN shipped and consumed. |
| `ui.night.sequence.title` | **IDENTICAL** | Exact RU+EN shipped and consumed. |
| `ui.night.panel.title` | **SUPERSEDED** | Active sleep panel now consumes shipped `ui.sleep.title`. |
| `ui.night.panel.description` | **SUPERSEDED** | Active sleep panel now consumes shipped `ui.sleep.help`. |
| `ui.night.panel.start` | **SUPERSEDED** | Active sleep panel now consumes shipped `ui.sleep.startButton`. |
| `ui.result.chooseLodging` | **IDENTICAL** | Exact RU+EN shipped and consumed by the result bridge. |
| `ui.town.lodgingToday` | **IDENTICAL** | Exact RU+EN shipped and consumed. |
| `lodging.lodging.normal.label` | **IDENTICAL** | Exact RU+EN shipped. |
| `lodging.lodging.cheap.label` | **IDENTICAL** | Exact RU+EN shipped. |
| `lodging.lodging.street.label` | **IDENTICAL** | Exact RU+EN shipped. |
| `housing.room.label` | **IDENTICAL** | Exact RU+EN shipped. |
| `housing.hostel.label` | **IDENTICAL** | Exact RU+EN shipped. |
| `housing.shelter.label` | **IDENTICAL** | Exact RU+EN shipped. |
| `nightChoice.night.sleep.label` | **IDENTICAL** | Exact RU+EN shipped and generic resolver consumes it. |

## Totals

- ADDITIVE: **0**
- IDENTICAL: **17**
- SUPERSEDED: **3**
- CONFLICT: **0**

## Superseded seam ownership

Do not add:
- `ui.night.panel.title`;
- `ui.night.panel.description`;
- `ui.night.panel.start`.

Current UI owner:
- `ui.sleep.title`;
- `ui.sleep.help`;
- `ui.sleep.startButton`.

Adding the old three keys would create dead/duplicate ownership rather than satisfy a current consumer.

## Final delta implication

Item 271 should contain:
**zero still-needed localization keys**.

Every prior shared Night/lodging key is now either:
- already shipped exact-identical; or
- superseded by current `ui.sleep.*` ownership.

## Mechanics firewall

This rebase changes no:
- NightFlow phase/order;
- lodging ID;
- housing value;
- cost;
- next-day Energy/effect;
- command;
- Save state.
