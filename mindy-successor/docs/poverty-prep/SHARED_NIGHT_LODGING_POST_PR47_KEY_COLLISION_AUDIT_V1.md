# Shared Night/Lodging Post-PR47 Key Collision Audit v1

Status: exact collision audit against root `content/localization.json` after PR #45, PR #46 and PR #47.

Current main:
`7f27caca4e3e711799e9c1f235c4a27adbf31026`.

Source fixture:
`prior-work/astra/prototype-m3.2/content/poverty-shared-ui-localization-v3.fixture.json`.

## Classification

- **ADDITIVE** — proposed key is absent from root localization and may be added without overwriting another owner.
- **IDENTICAL** — root already contains the exact same RU+EN pair.
- **CONFLICT** — root already contains the key with different RU/EN content.
- **REUSE_EXISTING** — an already-shipped key should be consumed by UI rather than duplicated under a new key.

## Finalized 20 proposed keys

| Key | Classification |
| --- | --- |
| `ui.night.eyebrow` | **ADDITIVE** |
| `ui.night.lodging.prompt` | **ADDITIVE** |
| `ui.night.nextDayEnergy` | **ADDITIVE** |
| `ui.night.choice.title` | **ADDITIVE** |
| `ui.night.choice.prompt` | **ADDITIVE** |
| `ui.night.choice.slot` | **ADDITIVE** |
| `ui.night.choice.select` | **ADDITIVE** |
| `ui.night.sequence.title` | **ADDITIVE** |
| `ui.night.panel.title` | **ADDITIVE** |
| `ui.night.panel.description` | **ADDITIVE** |
| `ui.night.panel.start` | **ADDITIVE** |
| `ui.result.chooseLodging` | **ADDITIVE** |
| `ui.town.lodgingToday` | **ADDITIVE** |
| `lodging.lodging.normal.label` | **ADDITIVE** |
| `lodging.lodging.cheap.label` | **ADDITIVE** |
| `lodging.lodging.street.label` | **ADDITIVE** |
| `housing.room.label` | **ADDITIVE** |
| `housing.hostel.label` | **ADDITIVE** |
| `housing.shelter.label` | **ADDITIVE** |
| `nightChoice.night.sleep.label` | **ADDITIVE** |

Totals:
- ADDITIVE: **20**
- IDENTICAL: **0**
- CONFLICT: **0**

## Existing shipped keys to reuse

| Key | Classification |
| --- | --- |
| `ui.panel.sleep` | **REUSE_EXISTING** |
| `ui.town.sleep.subtitle` | **REUSE_EXISTING** |
| `ui.town.noEnergyPrompt` | **REUSE_EXISTING** |
| `ui.work.coins` | **REUSE_EXISTING** |

These existing keys should be consumed at the relevant UI seams rather than duplicated.

## Conclusion

PR #47 did not create any exact-key collision with the finalized 20-key shared Night/lodging fixture.

The 20 keys remain safe as additive presentation localization, subject to Lead-owned UI wiring.

No NightFlow phase, lodging ID, housing value, cost, Energy delta, command or Save field is changed by this audit.
