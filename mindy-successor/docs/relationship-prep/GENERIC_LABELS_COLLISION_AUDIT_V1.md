# Generic Labels Collision Audit v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `295e6fc74d235f0b7555794555a18373451e8b7e`
Fixture: `content/generic-labels-localization-v1.fixture.json`

## Summary

| Classification | Count |
|---|---:|
| ADDITIVE | 28 |
| IDENTICAL | 17 |
| REUSE_EXISTING | 4 |
| CONFLICT | 0 |
| **Total** | **49** |

## Full classification

| Fixture key | Classification | Existing key / reason |
|---|---|---|
| `housing.cheap.label` | REUSE_EXISTING | `lodging.lodging.cheap.label`, `housing.hostel.label` |
| `housing.hostel.label` | IDENTICAL | same key, exact RU+EN |
| `housing.normal.label` | REUSE_EXISTING | `lodging.lodging.normal.label`, `housing.room.label` |
| `housing.room.label` | IDENTICAL | same key, exact RU+EN |
| `housing.shelter.label` | IDENTICAL | same key, exact RU+EN |
| `housing.street.label` | REUSE_EXISTING | `housing.shelter.label` |
| `item.field_preservation_kit.label` | ADDITIVE | absent from root |
| `item.herb.label` | ADDITIVE | absent from root |
| `item.old_boundary_token.label` | ADDITIVE | absent from root |
| `item.reinforced_axe.label` | ADDITIVE | absent from root |
| `item.rope_kit.label` | ADDITIVE | absent from root |
| `item.scales.label` | ADDITIVE | absent from root |
| `item.tonic.label` | ADDITIVE | absent from root |
| `resource.energy.label` | REUSE_EXISTING | `ui.hud.energy` |
| `resource.money.label` | ADDITIVE | absent from root |
| `season.autumn.label` | ADDITIVE | absent from root |
| `season.spring.label` | ADDITIVE | absent from root |
| `season.summer.label` | ADDITIVE | absent from root |
| `season.winter.label` | ADDITIVE | absent from root |
| `stat.charm.hint` | ADDITIVE | absent from root |
| `stat.charm.label` | IDENTICAL | same key, exact RU+EN |
| `stat.creativity.hint` | ADDITIVE | absent from root |
| `stat.creativity.label` | IDENTICAL | same key, exact RU+EN |
| `stat.dexterity.hint` | ADDITIVE | absent from root |
| `stat.dexterity.label` | IDENTICAL | same key, exact RU+EN |
| `stat.endurance.hint` | ADDITIVE | absent from root |
| `stat.endurance.label` | IDENTICAL | same key, exact RU+EN |
| `stat.grooming.hint` | ADDITIVE | absent from root |
| `stat.grooming.label` | IDENTICAL | same key, exact RU+EN |
| `stat.magic.hint` | ADDITIVE | absent from root |
| `stat.magic.label` | IDENTICAL | same key, exact RU+EN |
| `stat.manners.hint` | ADDITIVE | absent from root |
| `stat.manners.label` | IDENTICAL | same key, exact RU+EN |
| `stat.reason.hint` | ADDITIVE | absent from root |
| `stat.reason.label` | IDENTICAL | same key, exact RU+EN |
| `stat.sexuality.hint` | ADDITIVE | absent from root |
| `stat.sexuality.label` | IDENTICAL | same key, exact RU+EN |
| `stat.sociability.hint` | ADDITIVE | absent from root |
| `stat.sociability.label` | IDENTICAL | same key, exact RU+EN |
| `stat.strength.hint` | ADDITIVE | absent from root |
| `stat.strength.label` | IDENTICAL | same key, exact RU+EN |
| `stat.wits.hint` | ADDITIVE | absent from root |
| `stat.wits.label` | IDENTICAL | same key, exact RU+EN |
| `ui.event.eyebrow` | ADDITIVE | absent from root |
| `ui.legacy.nextLifeButton` | IDENTICAL | same key, exact RU+EN |
| `ui.run.endingAccepted` | ADDITIVE | absent from root |
| `ui.run.fatesAndNextLife` | ADDITIVE | absent from root |
| `ui.run.timeExpired` | ADDITIVE | absent from root |
| `ui.town.lodgingToday` | IDENTICAL | same key, exact RU+EN |

## Reuse guidance

### Target housing identities

The target labels:
- `housing.normal.label`
- `housing.cheap.label`
- `housing.street.label`

have exact-value matches in existing lodging/legacy housing keys.

Lead may either:
1. add the target-ID keys for direct semantic lookup, or
2. deliberately map target IDs to the existing equivalent housing/lodging keys.

Do not create two independent translations that can drift.

### Resource Energy

`resource.energy.label` exactly matches existing `ui.hud.energy`.

Because a resource-domain semantic key is useful for requirement/result presentation, adding `resource.energy.label` is acceptable if Lead wants domain separation. Otherwise reuse `ui.hud.energy`.

## Identical guidance

Exact existing keys must not be replaced unnecessarily. They can be omitted from the root patch while retaining their current consumers:
- target stat labels;
- legacy housing aliases;
- `ui.legacy.nextLifeButton`;
- `ui.town.lodgingToday`.

## Additive guidance

The 28 additive keys are safe presentation candidates after exact-head recheck.

## Conflict result

No fixture key conflicts with current root localization.

## Boundary

No root localization file is changed by this audit. No gameplay IDs, economics, conditions, Save, NightFlow or RNG behavior changes.
