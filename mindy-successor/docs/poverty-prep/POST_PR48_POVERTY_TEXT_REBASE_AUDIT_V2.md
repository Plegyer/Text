# Post-PR48 Poverty Text Rebase Audit v2

Status: exact rebase audit of the 33-key ordinary-poverty text patch against current `main` after PR #48.

Current main:
`4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`.

Previous patch baseline:
`7f27caca4e3e711799e9c1f235c4a27adbf31026`.

PR #48:
`Lead: activate seasonal project-owned career media`.

Scope:
33 exact-key RU+EN text replacements from
`prior-work/astra/prototype-m3.2/content/poverty-copyedit-post-pr47-v3.fixture.json`.

Static-media keys are excluded from this audit.

Classification:
- **CLEAN_APPLY** — current main still equals the previous baseline for this exact key, so the proposed RU+EN replacement applies without conflict.
- **SUPERSEDED** — current main already contains the proposed replacement.
- **CONFLICT** — current main changed the exact key to a third value.

## Exact-key audit

| Key | Classification | Reason |
| --- | --- | --- |
| `event.poverty-street-production.helpful-summer.variant.default.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-street-production.helpful-summer.choice.take-errand.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-street-production.neutral-autumn.choice.settle-in.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-street-production.pressure-winter.variant.default.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-street-production.pressure-winter.choice.take-shelter.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-street-production.pressure-winter.choice.keep-moving.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-street-production-v2.helpful-summer-shade.variant.market-closing.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-street-production-v2.helpful-summer-shade.variant.late-shade.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-street-production-v2.helpful-summer-shade.choice.take-small-task.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-street-production-v2.helpful-summer-shade.choice.keep-place.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-street-production-v2.neutral-autumn-crossing.variant.drizzle.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-street-production-v2.neutral-autumn-crossing.choice.wait-out-night.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-street-production-v2.pressure-winter-wind.variant.crosswind.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-street-production-v2.pressure-winter-wind.variant.long-gusts.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-street-production-v2.pressure-winter-wind.choice.use-recess.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-street-production-v2.pressure-winter-wind.choice.keep-walking.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-cheap-production.shared-quiet-autumn.variant.default.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-cheap-production.shared-quiet-autumn.choice.settle-quietly.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-cheap-production-v2.shared-room-seasons.title` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-cheap-production-v2.shared-room-seasons.variant.shared-room.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-cheap-production-v2.shared-room-seasons.choice.settle-in.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-recovery-production.small-coin-help.choice.take-coins.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-recovery-production.short-cleanup.choice.do-cleanup.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-recovery-production.herb-bundle.choice.take-herb.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-recovery-production.herb-bundle.choice.leave-herb.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-pressure-production.cold-rain.variant.default.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-pressure-production.cold-rain.choice.take-doorway.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-pressure-production.cold-rain.choice.wait-it-out.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-pressure-production.noisy-loading.choice.move-corner.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-pressure-production.noisy-loading.choice.stay-put.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-pressure-production.muddy-splash.variant.default.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-pressure-production.muddy-splash.choice.wipe-down.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |
| `event.poverty-pressure-production.muddy-splash.choice.leave-for-morning.text` | **CLEAN_APPLY** | PR48 did not change this exact localization key; the text replacement rebases cleanly. |

## Totals

- CLEAN_APPLY: **33**
- SUPERSEDED: **0**
- CONFLICT: **0**
- reviewed: **33**

## Rebase conclusion

All 33 proposed ordinary-poverty text replacements remain **CLEAN_APPLY** on exact post-PR48 current main.

PR #48 changed seasonal project-owned presentation media, not these ordinary-poverty localization text keys.

Item 222 should therefore contain exactly these 33 RU+EN replacements and nothing else.

## Exclusions

This audit excludes:
- `media.stage.outside.alt`;
- `media.stage.room.alt`;
- all `presentation.static.*` keys;
- Secret Debt;
- gameplay fields;
- new localization keys.

## Mechanics firewall

This audit authorizes text replacement only. It does not change:
- six ordinary-poverty production packs;
- 14 event IDs;
- event conditions/effects;
- money/item amounts;
- next-day modifiers;
- cooldowns/timing;
- RNG;
- NightFlow;
- housing;
- Save state.
