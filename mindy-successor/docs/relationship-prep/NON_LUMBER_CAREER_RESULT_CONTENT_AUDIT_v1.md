# Non-Lumber Career Result Content Audit v1

Date: 2026-09-27
Owner: Chat 5
Baseline: current main `c0763f9f9fa9887593fe8567165bbedce2b6cd3a`
Scope: nine ordinary careers excluding Lumber.

## Current result pipeline

All nine careers use existing target-shaped action IDs ending in `.shift`. The engine stores the selected seasonal scene text in `lastAction.text` and the action label in `lastAction.title`. For target-shaped profession actions, `presentationIdForActionResult()` resolves a stable career result identity:

`job/<career>/result/default`

The current result UI renders `lastAction.title` and `lastAction.text` directly. Unlike event text and School result copy, it does not currently resolve ordinary career result title/body through the localization bundle.

Therefore current main has bilingual action-menu labels/descriptions, but the ordinary career **result screen body remains embedded English scene text**. That is a shared-UI/localization consumption gap, not a content-ID gap.

## Career inventory

| Career | Action ID | Result presentationId | Current scene IDs | Current media | Root RU+EN action label/description | Root RU+EN result-body keys |
|---|---|---|---|---|---|---|
| Satyr Maid | `satyr-maid.shift` | `job/satyr-maid/result/default` | spring/summer/autumn/winter `.default` | `stage.tavern.<season>` | SHIPPED | none |
| Undead Farm | `undead-farm.shift` | `job/undead-farm/result/default` | spring/summer/autumn/winter `.default` | `stage.hunt.<season>` | SHIPPED | none |
| Tavern | `tavern.shift` | `job/tavern/result/default` | spring/summer/autumn/winter `.default` | `stage.tavern.<season>` | SHIPPED | none |
| Hunter | `hunter.shift` | `job/hunter/result/default` | spring/summer/autumn/winter `.default` | `stage.hunt.<season>` | SHIPPED | none |
| Guard | `guard.shift` | `job/guard/result/default` | spring/summer/autumn/winter `.default` | `stage.guard.<season>` | SHIPPED | none |
| Merchant | `merchant.shift` | `job/merchant/result/default` | spring/summer/autumn/winter `.default` | `stage.town` | SHIPPED | none |
| Artist/Geisha | `artist-geisha.shift` | `job/artist-geisha/result/default` | spring/summer/autumn/winter `.default` | `stage.tavern.<season>` | SHIPPED | none |
| Assassin | `assassin.shift` | `job/assassin/result/default` | spring/summer/autumn/winter `.default` | `stage.town` | SHIPPED | none |
| Prostitute | `prostitute.shift` | `job/prostitute/result/default` | spring/summer/autumn/winter `.default` | `stage.room` | SHIPPED | none |

## Current copy depth

Satyr Maid and Undead Farm already have career-specific embedded English seasonal result prose.

The remaining seven careers largely reuse a generic seasonal sentence pattern such as “the season changes the ordinary work context”, “demand, routes, or crowds shift”, “seasonal pressure changes the work mix”, and “scarcity, access, or regular clients change the routine”.

This is safe to deepen without changing action cost, wage, seasonal stat effects, counters, relationships, RNG, Save, or presentation identity.

## Safe presentation-only opportunity

For each existing scene ID, author RU source + full EN result prose under a locale-neutral key:

`action.<action-id>.result.<scene-id>.text`

Example:

`action.guard.shift.result.autumn.default.text`

The result title can reuse the already-shipped bilingual key:

`action.<action-id>.label`

No new action, scene, condition, effect, reward, media identity, or career relationship is required.

## SHARED_UI_REQUIRED

To display these proposed result-body keys, Lead-owned UI/runtime presentation code would need to localize ordinary career `lastAction` title/body rather than rendering embedded strings directly.

This audit does not edit shared UI.

## Boundaries

- Hunter copy covers only `hunter.shift`, not Forest/Hunter routes, clues, tokens, or Old Boundary semantics.
- Assassin copy remains ordinary covert-work presentation and adds no violent mechanics or rewards.
- Prostitute copy remains non-explicit, voluntary, and presentation-only.
- No new relationship identities are created.
- Lumber Hard Work remains untouched.
- Locale affects text only.
