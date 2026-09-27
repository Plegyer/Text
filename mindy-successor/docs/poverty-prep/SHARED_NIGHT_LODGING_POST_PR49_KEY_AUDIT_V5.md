# Shared Night/Lodging Post-PR49 Key Audit v5

Status: exact-key audit against current root localization after PR #49.

Current main:
`d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`.

Source:
`prior-work/astra/prototype-m3.2/content/poverty-shared-ui-localization-v3.fixture.json`.

Classification:
- **ADDITIVE** — proposed key is absent and safe to add without overwriting another owner.
- **IDENTICAL** — root already contains the exact same RU+EN pair.
- **CONFLICT** — root already contains a different RU+EN value.
- **REUSE_EXISTING** — shipped key should be consumed instead of duplicated.

## Finalized 20 proposed keys

| Key | Classification | Reason |
| --- | --- | --- |
| `ui.night.eyebrow` | **ADDITIVE** | Key is absent from exact post-PR49 root localization. |
| `ui.night.lodging.prompt` | **ADDITIVE** | Key is absent from exact post-PR49 root localization. |
| `ui.night.nextDayEnergy` | **ADDITIVE** | Key is absent from exact post-PR49 root localization. |
| `ui.night.choice.title` | **ADDITIVE** | Key is absent from exact post-PR49 root localization. |
| `ui.night.choice.prompt` | **ADDITIVE** | Key is absent from exact post-PR49 root localization. |
| `ui.night.choice.slot` | **ADDITIVE** | Key is absent from exact post-PR49 root localization. |
| `ui.night.choice.select` | **ADDITIVE** | Key is absent from exact post-PR49 root localization. |
| `ui.night.sequence.title` | **ADDITIVE** | Key is absent from exact post-PR49 root localization. |
| `ui.night.panel.title` | **ADDITIVE** | Key is absent from exact post-PR49 root localization. |
| `ui.night.panel.description` | **ADDITIVE** | Key is absent from exact post-PR49 root localization. |
| `ui.night.panel.start` | **ADDITIVE** | Key is absent from exact post-PR49 root localization. |
| `ui.result.chooseLodging` | **ADDITIVE** | Key is absent from exact post-PR49 root localization. |
| `ui.town.lodgingToday` | **ADDITIVE** | Key is absent from exact post-PR49 root localization. |
| `lodging.lodging.normal.label` | **ADDITIVE** | Key is absent from exact post-PR49 root localization. |
| `lodging.lodging.cheap.label` | **ADDITIVE** | Key is absent from exact post-PR49 root localization. |
| `lodging.lodging.street.label` | **ADDITIVE** | Key is absent from exact post-PR49 root localization. |
| `housing.room.label` | **ADDITIVE** | Key is absent from exact post-PR49 root localization. |
| `housing.hostel.label` | **ADDITIVE** | Key is absent from exact post-PR49 root localization. |
| `housing.shelter.label` | **ADDITIVE** | Key is absent from exact post-PR49 root localization. |
| `nightChoice.night.sleep.label` | **ADDITIVE** | Key is absent from exact post-PR49 root localization. |

## Existing shipped keys to reuse

| Key | Classification | Reason |
| --- | --- | --- |
| `ui.panel.sleep` | **REUSE_EXISTING** | Existing shipped key should be consumed rather than duplicated. |
| `ui.town.sleep.subtitle` | **REUSE_EXISTING** | Existing shipped key should be consumed rather than duplicated. |
| `ui.town.noEnergyPrompt` | **REUSE_EXISTING** | Existing shipped key should be consumed rather than duplicated. |
| `ui.work.coins` | **REUSE_EXISTING** | Existing shipped key should be consumed rather than duplicated. |

## Totals

- ADDITIVE: **20**
- IDENTICAL: **0**
- CONFLICT: **0**
- REUSE_EXISTING: **4**

## Conclusion

All 20 finalized shared Night/lodging keys remain additive on exact post-PR49 current main.

No exact-key conflict was introduced by PR #49.

Item 237 may therefore carry the same finalized 20 RU+EN presentation keys with the post-PR49 baseline.

The reuse-only keys remain outside the additive patch.

No NightFlow, lodging, housing, cost, Energy, command or Save identity is changed by this audit.
