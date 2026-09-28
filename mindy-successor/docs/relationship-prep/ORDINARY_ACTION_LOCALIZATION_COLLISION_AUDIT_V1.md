# Ordinary Action Localization Collision Audit v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `4223be1f90f15a43938e072bc2171b0de5d2d1aa`
Fixture: `content/ordinary-action-localization-v1.fixture.json`

## Summary

| Classification | Count |
|---|---:|
| ADDITIVE | 50 |
| IDENTICAL | 2 |
| REUSE_EXISTING | 0 |
| CONFLICT | 0 |
| **Total** | **52** |

## Full classification

| Fixture key | Classification | Existing key / reason |
|---|---|---|
| `action.arrival.description` | ADDITIVE | absent from root |
| `action.arrival.label` | ADDITIVE | absent from root |
| `action.arrival.scene.default.text` | ADDITIVE | absent from root |
| `action.brew.description` | ADDITIVE | absent from root |
| `action.brew.label` | ADDITIVE | absent from root |
| `action.brew.recipe.fastFailure.text` | ADDITIVE | absent from root |
| `action.brew.recipe.success.text` | ADDITIVE | absent from root |
| `action.brew.scene.default.text` | ADDITIVE | absent from root |
| `action.deliver.description` | ADDITIVE | absent from root |
| `action.deliver.label` | ADDITIVE | absent from root |
| `action.deliver.scene.default.text` | ADDITIVE | absent from root |
| `action.exam.description` | ADDITIVE | absent from root |
| `action.exam.label` | ADDITIVE | absent from root |
| `action.exam.scene.default.text` | ADDITIVE | absent from root |
| `action.forage.description` | ADDITIVE | absent from root |
| `action.forage.label` | ADDITIVE | absent from root |
| `action.forage.scene.default.text` | ADDITIVE | absent from root |
| `action.forest-search.description` | ADDITIVE | absent from root |
| `action.forest-search.label` | ADDITIVE | absent from root |
| `action.forest-search.scene.default.text` | ADDITIVE | absent from root |
| `action.landlord.description` | ADDITIVE | absent from root |
| `action.landlord.label` | ADDITIVE | absent from root |
| `action.landlord.scene.default.text` | ADDITIVE | absent from root |
| `action.oddjob.description` | ADDITIVE | absent from root |
| `action.oddjob.label` | ADDITIVE | absent from root |
| `action.oddjob.scene.default.text` | ADDITIVE | absent from root |
| `action.rent-room.description` | ADDITIVE | absent from root |
| `action.rent-room.label` | ADDITIVE | absent from root |
| `action.rent-room.scene.default.text` | ADDITIVE | absent from root |
| `action.repay.description` | ADDITIVE | absent from root |
| `action.repay.label` | ADDITIVE | absent from root |
| `action.repay.scene.default.text` | ADDITIVE | absent from root |
| `action.rest.description` | ADDITIVE | absent from root |
| `action.rest.label` | ADDITIVE | absent from root |
| `action.rest.scene.default.text` | ADDITIVE | absent from root |
| `action.scales.description` | ADDITIVE | absent from root |
| `action.scales.label` | ADDITIVE | absent from root |
| `action.scales.scene.default.text` | ADDITIVE | absent from root |
| `action.sell.description` | ADDITIVE | absent from root |
| `action.sell.label` | ADDITIVE | absent from root |
| `action.sell.scene.default.text` | ADDITIVE | absent from root |
| `action.tavern-talk.description` | ADDITIVE | absent from root |
| `action.tavern-talk.label` | ADDITIVE | absent from root |
| `action.tavern-talk.scene.default.text` | ADDITIVE | absent from root |
| `action.visit.description` | ADDITIVE | absent from root |
| `action.visit.label` | ADDITIVE | absent from root |
| `action.visit.scene.default.text` | ADDITIVE | absent from root |
| `action.work.description` | ADDITIVE | absent from root |
| `action.work.label` | ADDITIVE | absent from root |
| `action.work.scene.default.text` | ADDITIVE | absent from root |
| `ui.work.recipeFast` | IDENTICAL | same key, exact RU+EN |
| `ui.work.recipeReliable` | IDENTICAL | same key, exact RU+EN |

## Integration rule

- ADDITIVE: safe presentation candidate after exact-head recheck.
- IDENTICAL: keep the already-shipped root entry; do not replace unnecessarily.
- REUSE_EXISTING: prefer the existing semantic key when it is genuinely the same UI concept.
- CONFLICT: requires explicit review before merge; none should be silently overwritten.

## Expected current reuse

The brew recipe button labels are already shipped under:
- `ui.work.recipeReliable`
- `ui.work.recipeFast`

They are expected to classify IDENTICAL on this baseline.

## Boundary

No root localization file is edited here. No action mechanics, economics, conditions, scene selection, journal, Save or RNG changes.
