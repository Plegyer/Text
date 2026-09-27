# Poverty Copyedit Production-Readiness Ledger v2

Status: review of item 185 against exact current `main` after PR #45 and PR #46.

Baseline:
`1af3104c1e4c180019b965adac8e87e67de89347`.

Scope:
36 exact-key RU+EN text replacements from `poverty-copyedit-main-delta-v1.fixture.json`.

Classification:
- **SAFE_NOW** — text-only replacement is semantically supported by the current event/choice mechanics and removes implementation-facing copy without changing meaning.
- **NEEDS_CONTEXT_REVIEW** — text remains presentation-only but adds scene/media specificity that should be checked against all current consumers/staging before production replacement.
- **KEEP_CURRENT** — current wording should remain because the proposal would be less accurate or less reusable.

No key, ID, mechanic, amount, condition, effect, RNG, NightFlow, housing or save-state change is authorized here.

## Per-key classification

| Key | Classification | Reason |
| --- | --- | --- |
| `event.poverty-street-production.helpful-summer.variant.default.text` | **SAFE_NOW** | Scene wording remains consistent with current conditions/variant context and changes presentation only. |
| `event.poverty-street-production.helpful-summer.choice.take-errand.text` | **SAFE_NOW** | Matches the current choice effect/effect-free behavior while removing implementation/tuning commentary from player-facing copy. |
| `event.poverty-street-production.neutral-autumn.choice.settle-in.text` | **SAFE_NOW** | Matches the current choice effect/effect-free behavior while removing implementation/tuning commentary from player-facing copy. |
| `event.poverty-street-production.pressure-winter.variant.default.text` | **SAFE_NOW** | Scene wording remains consistent with current conditions/variant context and changes presentation only. |
| `event.poverty-street-production.pressure-winter.choice.take-shelter.text` | **SAFE_NOW** | Matches the current choice effect/effect-free behavior while removing implementation/tuning commentary from player-facing copy. |
| `event.poverty-street-production.pressure-winter.choice.keep-moving.text` | **SAFE_NOW** | Matches the current choice effect/effect-free behavior while removing implementation/tuning commentary from player-facing copy. |
| `event.poverty-street-production-v2.helpful-summer-shade.variant.market-closing.text` | **SAFE_NOW** | Scene wording remains consistent with current conditions/variant context and changes presentation only. |
| `event.poverty-street-production-v2.helpful-summer-shade.variant.late-shade.text` | **SAFE_NOW** | Scene wording remains consistent with current conditions/variant context and changes presentation only. |
| `event.poverty-street-production-v2.helpful-summer-shade.choice.take-small-task.text` | **SAFE_NOW** | Matches the current choice effect/effect-free behavior while removing implementation/tuning commentary from player-facing copy. |
| `event.poverty-street-production-v2.helpful-summer-shade.choice.keep-place.text` | **SAFE_NOW** | Matches the current choice effect/effect-free behavior while removing implementation/tuning commentary from player-facing copy. |
| `event.poverty-street-production-v2.neutral-autumn-crossing.variant.drizzle.text` | **SAFE_NOW** | Scene wording remains consistent with current conditions/variant context and changes presentation only. |
| `event.poverty-street-production-v2.neutral-autumn-crossing.choice.wait-out-night.text` | **SAFE_NOW** | Matches the current choice effect/effect-free behavior while removing implementation/tuning commentary from player-facing copy. |
| `event.poverty-street-production-v2.pressure-winter-wind.variant.crosswind.text` | **SAFE_NOW** | Scene wording remains consistent with current conditions/variant context and changes presentation only. |
| `event.poverty-street-production-v2.pressure-winter-wind.variant.long-gusts.text` | **SAFE_NOW** | Scene wording remains consistent with current conditions/variant context and changes presentation only. |
| `event.poverty-street-production-v2.pressure-winter-wind.choice.use-recess.text` | **SAFE_NOW** | Matches the current choice effect/effect-free behavior while removing implementation/tuning commentary from player-facing copy. |
| `event.poverty-street-production-v2.pressure-winter-wind.choice.keep-walking.text` | **SAFE_NOW** | Matches the current choice effect/effect-free behavior while removing implementation/tuning commentary from player-facing copy. |
| `event.poverty-cheap-production.shared-quiet-autumn.variant.default.text` | **SAFE_NOW** | Scene wording remains consistent with current conditions/variant context and changes presentation only. |
| `event.poverty-cheap-production.shared-quiet-autumn.choice.settle-quietly.text` | **SAFE_NOW** | Matches the current choice effect/effect-free behavior while removing implementation/tuning commentary from player-facing copy. |
| `event.poverty-cheap-production-v2.shared-room-seasons.title` | **SAFE_NOW** | Wording polish only; same current event identity and semantic scope. |
| `event.poverty-cheap-production-v2.shared-room-seasons.variant.shared-room.text` | **SAFE_NOW** | Scene wording remains consistent with current conditions/variant context and changes presentation only. |
| `event.poverty-cheap-production-v2.shared-room-seasons.choice.settle-in.text` | **SAFE_NOW** | Matches the current choice effect/effect-free behavior while removing implementation/tuning commentary from player-facing copy. |
| `event.poverty-recovery-production.small-coin-help.choice.take-coins.text` | **SAFE_NOW** | Matches the current choice effect/effect-free behavior while removing implementation/tuning commentary from player-facing copy. |
| `event.poverty-recovery-production.short-cleanup.choice.do-cleanup.text` | **SAFE_NOW** | Matches the current choice effect/effect-free behavior while removing implementation/tuning commentary from player-facing copy. |
| `event.poverty-recovery-production.herb-bundle.variant.default.text` | **NEEDS_CONTEXT_REVIEW** | Proposed copy strengthens ownership/context claims (“nobody nearby” / nobody returning) beyond the current neutral find description. Review against intended scene staging before replacing. |
| `event.poverty-recovery-production.herb-bundle.choice.take-herb.text` | **SAFE_NOW** | Matches the current choice effect/effect-free behavior while removing implementation/tuning commentary from player-facing copy. |
| `event.poverty-recovery-production.herb-bundle.choice.leave-herb.text` | **SAFE_NOW** | Matches the current choice effect/effect-free behavior while removing implementation/tuning commentary from player-facing copy. |
| `event.poverty-pressure-production.cold-rain.variant.default.text` | **SAFE_NOW** | Scene wording remains consistent with current conditions/variant context and changes presentation only. |
| `event.poverty-pressure-production.cold-rain.choice.take-doorway.text` | **SAFE_NOW** | Matches the current choice effect/effect-free behavior while removing implementation/tuning commentary from player-facing copy. |
| `event.poverty-pressure-production.cold-rain.choice.wait-it-out.text` | **SAFE_NOW** | Matches the current choice effect/effect-free behavior while removing implementation/tuning commentary from player-facing copy. |
| `event.poverty-pressure-production.noisy-loading.choice.move-corner.text` | **SAFE_NOW** | Matches the current choice effect/effect-free behavior while removing implementation/tuning commentary from player-facing copy. |
| `event.poverty-pressure-production.noisy-loading.choice.stay-put.text` | **SAFE_NOW** | Matches the current choice effect/effect-free behavior while removing implementation/tuning commentary from player-facing copy. |
| `event.poverty-pressure-production.muddy-splash.variant.default.text` | **SAFE_NOW** | Scene wording remains consistent with current conditions/variant context and changes presentation only. |
| `event.poverty-pressure-production.muddy-splash.choice.wipe-down.text` | **SAFE_NOW** | Matches the current choice effect/effect-free behavior while removing implementation/tuning commentary from player-facing copy. |
| `event.poverty-pressure-production.muddy-splash.choice.leave-for-morning.text` | **SAFE_NOW** | Matches the current choice effect/effect-free behavior while removing implementation/tuning commentary from player-facing copy. |
| `media.stage.outside.alt` | **NEEDS_CONTEXT_REVIEW** | Shared media ID may serve more than one outdoor poverty framing (awning, arcade, doorway). Proposed “open sky” is more specific than the reusable current alt. |
| `media.stage.room.alt` | **NEEDS_CONTEXT_REVIEW** | Shared media ID is generic. Proposed “crowded/tight” is plausible for cheap lodging but should be confirmed against every current consumer before changing the shared alt. |

## Totals

- SAFE_NOW: **33**
- NEEDS_CONTEXT_REVIEW: **3**
- KEEP_CURRENT: **0**
- reviewed total: **36**

## Final-delta rule

Item 198 should include **SAFE_NOW only**.

The three NEEDS_CONTEXT_REVIEW keys remain unchanged on current main until their broader presentation consumers are confirmed.

## Mechanics firewall

The SAFE_NOW set:
- uses existing localization keys only;
- preserves all six ordinary-poverty production pack IDs;
- preserves all 14 event IDs;
- changes no conditions/effects;
- changes no reward amounts;
- changes no event timing/cooldowns;
- changes no RNG;
- changes no NightFlow or housing behavior;
- contains no Secret Debt content.

## PR46 note

PR #46 integrates Foreman relationship localization. It does not change the ordinary-poverty event mechanics or justify broadening the copyedit scope. This ledger therefore keeps the item-185 ordinary-poverty key set bounded and treats current main as the collision authority.
