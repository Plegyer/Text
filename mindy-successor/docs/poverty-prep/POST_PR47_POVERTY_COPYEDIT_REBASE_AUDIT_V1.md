# Post-PR47 Poverty Copyedit Rebase Audit v1

Status: exact rebase audit of item 198 against current `main` after PR #47.

Current main:
`7f27caca4e3e711799e9c1f235c4a27adbf31026`.

Item-198 base:
`1af3104c1e4c180019b965adac8e87e67de89347`.

PR #47:
`Lead: activate project-owned static presentation media`.

Scope:
33 text-only SAFE_NOW replacements from
`prior-work/astra/prototype-m3.2/content/poverty-copyedit-final-delta-v2.fixture.json`.

Classification:
- **CLEAN_APPLY** — current main still equals the item-198 base for this exact key, so the proposed RU+EN replacement applies without rebase conflict.
- **CONFLICT** — current main changed the exact key to a third value.
- **SUPERSEDED** — current main already equals the proposed replacement.

## Exact-key audit

| Key | Classification | Reason |
| --- | --- | --- |
| `event.poverty-street-production.helpful-summer.variant.default.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-street-production.helpful-summer.choice.take-errand.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-street-production.neutral-autumn.choice.settle-in.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-street-production.pressure-winter.variant.default.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-street-production.pressure-winter.choice.take-shelter.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-street-production.pressure-winter.choice.keep-moving.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-street-production-v2.helpful-summer-shade.variant.market-closing.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-street-production-v2.helpful-summer-shade.variant.late-shade.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-street-production-v2.helpful-summer-shade.choice.take-small-task.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-street-production-v2.helpful-summer-shade.choice.keep-place.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-street-production-v2.neutral-autumn-crossing.variant.drizzle.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-street-production-v2.neutral-autumn-crossing.choice.wait-out-night.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-street-production-v2.pressure-winter-wind.variant.crosswind.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-street-production-v2.pressure-winter-wind.variant.long-gusts.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-street-production-v2.pressure-winter-wind.choice.use-recess.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-street-production-v2.pressure-winter-wind.choice.keep-walking.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-cheap-production.shared-quiet-autumn.variant.default.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-cheap-production.shared-quiet-autumn.choice.settle-quietly.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-cheap-production-v2.shared-room-seasons.title` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-cheap-production-v2.shared-room-seasons.variant.shared-room.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-cheap-production-v2.shared-room-seasons.choice.settle-in.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-recovery-production.small-coin-help.choice.take-coins.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-recovery-production.short-cleanup.choice.do-cleanup.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-recovery-production.herb-bundle.choice.take-herb.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-recovery-production.herb-bundle.choice.leave-herb.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-pressure-production.cold-rain.variant.default.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-pressure-production.cold-rain.choice.take-doorway.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-pressure-production.cold-rain.choice.wait-it-out.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-pressure-production.noisy-loading.choice.move-corner.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-pressure-production.noisy-loading.choice.stay-put.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-pressure-production.muddy-splash.variant.default.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-pressure-production.muddy-splash.choice.wipe-down.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |
| `event.poverty-pressure-production.muddy-splash.choice.leave-for-morning.text` | **CLEAN_APPLY** | PR47 did not change this key; the item-198 replacement rebases cleanly. |

## Totals

- CLEAN_APPLY: **33**
- CONFLICT: **0**
- SUPERSEDED: **0**
- reviewed: **33**

## Rebase conclusion

All 33 item-198 replacements are **CLEAN_APPLY** on post-PR47 current main.

PR #47 changed static presentation-media ownership but did not modify any of these ordinary-poverty localization keys.

Item 210 should therefore carry exactly these 33 RU+EN text replacements, with:
- existing keys only;
- no media-alt keys;
- no new keys;
- no gameplay fields;
- no Secret Debt content.

## Mechanics firewall

This audit authorizes text replacement only. It does not change:
- six ordinary-poverty production packs;
- 14 event IDs;
- event conditions/effects;
- money/item amounts;
- next-day modifiers;
- cooldowns or timing;
- RNG;
- NightFlow;
- housing;
- Save state.
