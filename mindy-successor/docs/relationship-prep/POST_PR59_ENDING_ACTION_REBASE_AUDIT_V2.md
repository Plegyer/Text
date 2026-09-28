# Post-PR59 Ending / Action Rebase Audit v2

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `54131488c65302f81b3001abaaa345d21f0281e2` (post-PR59)

Audited prior sources:
- `content/ending-localization-v1.fixture.json` (item 136)
- `content/ordinary-action-result-localization-v2.fixture.json` (item 141)

## Summary

| Classification | Count |
|---|---:|
| ADDITIVE | 50 |
| IDENTICAL | 0 |
| REUSE_EXISTING | 0 |
| CONFLICT | 0 |
| **Total** | **50** |

## Full classification

| Source | Key | Classification | Note |
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

## Rebase result

PR59 changed Forest presentation assets/routes, not these title/body localization namespaces.

Current root still has:
- no `ending.*` title/description keys;
- no ordinary-action result `action.<id>.label` / `action.<id>.scene.default.text` keys for this exact set.

Therefore all item-136/item-141 strings remain additive on the audited head.

## Integration rule

Only ADDITIVE entries proceed to items 146/147.
No gameplay data is copied from prior fixtures.

## Invariants

This audit does not change ending/action IDs, conditions, rewards, metaRewards, costs, effects, Forest route semantics, Save, or RNG.
