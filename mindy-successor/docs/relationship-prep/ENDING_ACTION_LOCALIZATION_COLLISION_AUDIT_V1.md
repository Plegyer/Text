# Ending / Action Localization Collision Audit v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `52ddc76148e33836d3161b63bf4c25ffb5c39d02`

Audited sources:
- `content/ending-localization-v1.fixture.json`
- `content/ordinary-action-result-localization-v2.fixture.json`

## Summary

| Classification | Count |
|---|---:|
| ADDITIVE | 50 |
| IDENTICAL | 0 |
| REUSE_EXISTING | 0 |
| CONFLICT | 0 |
| **Total** | **50** |

## Full classification

| Source | Key | Classification | Existing key / reason |
|---|---|---|---|
| action | `action.arrival.label` | ADDITIVE | absent from root |
| action | `action.arrival.scene.default.text` | ADDITIVE | absent from root |
| action | `action.brew.label` | ADDITIVE | absent from root |
| action | `action.brew.scene.default.text` | ADDITIVE | absent from root |
| action | `action.deliver.label` | ADDITIVE | absent from root |
| action | `action.deliver.scene.default.text` | ADDITIVE | absent from root |
| action | `action.exam.label` | ADDITIVE | absent from root |
| action | `action.exam.scene.default.text` | ADDITIVE | absent from root |
| action | `action.forage.label` | ADDITIVE | absent from root |
| action | `action.forage.scene.default.text` | ADDITIVE | absent from root |
| action | `action.forest-search.label` | ADDITIVE | absent from root |
| action | `action.forest-search.scene.default.text` | ADDITIVE | absent from root |
| action | `action.landlord.label` | ADDITIVE | absent from root |
| action | `action.landlord.scene.default.text` | ADDITIVE | absent from root |
| action | `action.oddjob.label` | ADDITIVE | absent from root |
| action | `action.oddjob.scene.default.text` | ADDITIVE | absent from root |
| action | `action.rent-room.label` | ADDITIVE | absent from root |
| action | `action.rent-room.scene.default.text` | ADDITIVE | absent from root |
| action | `action.repay.label` | ADDITIVE | absent from root |
| action | `action.repay.scene.default.text` | ADDITIVE | absent from root |
| action | `action.rest.label` | ADDITIVE | absent from root |
| action | `action.rest.scene.default.text` | ADDITIVE | absent from root |
| action | `action.scales.label` | ADDITIVE | absent from root |
| action | `action.scales.scene.default.text` | ADDITIVE | absent from root |
| action | `action.sell.label` | ADDITIVE | absent from root |
| action | `action.sell.scene.default.text` | ADDITIVE | absent from root |
| action | `action.tavern-talk.label` | ADDITIVE | absent from root |
| action | `action.tavern-talk.scene.default.text` | ADDITIVE | absent from root |
| action | `action.visit.label` | ADDITIVE | absent from root |
| action | `action.visit.scene.default.text` | ADDITIVE | absent from root |
| action | `action.work.label` | ADDITIVE | absent from root |
| action | `action.work.scene.default.text` | ADDITIVE | absent from root |
| ending | `ending.ending.lumber.forest.description` | ADDITIVE | absent from root |
| ending | `ending.ending.lumber.forest.title` | ADDITIVE | absent from root |
| ending | `ending.ending.lumber.forewoman.description` | ADDITIVE | absent from root |
| ending | `ending.ending.lumber.forewoman.title` | ADDITIVE | absent from root |
| ending | `ending.ending.lumber.hard-work.description` | ADDITIVE | absent from root |
| ending | `ending.ending.lumber.hard-work.title` | ADDITIVE | absent from root |
| ending | `ending.guild-life.description` | ADDITIVE | absent from root |
| ending | `ending.guild-life.title` | ADDITIVE | absent from root |
| ending | `ending.lumber-stay.description` | ADDITIVE | absent from root |
| ending | `ending.lumber-stay.title` | ADDITIVE | absent from root |
| ending | `ending.scholar-life.description` | ADDITIVE | absent from root |
| ending | `ending.scholar-life.title` | ADDITIVE | absent from root |
| ending | `ending.tavern-court.description` | ADDITIVE | absent from root |
| ending | `ending.tavern-court.title` | ADDITIVE | absent from root |
| ending | `ending.tavern-guild.description` | ADDITIVE | absent from root |
| ending | `ending.tavern-guild.title` | ADDITIVE | absent from root |
| ending | `ending.tavern-stay.description` | ADDITIVE | absent from root |
| ending | `ending.tavern-stay.title` | ADDITIVE | absent from root |

## Merge rule

- ADDITIVE: safe presentation candidate after exact-head recheck.
- IDENTICAL: keep the already-shipped root value.
- REUSE_EXISTING: prefer the existing semantic key if it is the same user-facing concept.
- CONFLICT: requires explicit Lead review; never overwrite silently.

## Ownership / semantics

This collision audit does not authorize:
- condition changes;
- reward/metaReward changes;
- action mechanics/economics changes;
- result Save changes;
- RNG changes.

It only compares RU+EN presentation keys and values.
