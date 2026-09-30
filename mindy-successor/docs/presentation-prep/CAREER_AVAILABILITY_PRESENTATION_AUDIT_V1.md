# Career Availability Presentation Audit v1

Status: C2-49 COMPLETE
Owner: Chat 2 / Presentation & Media
Baseline main: `593f9936d72296557b36a0e0ca7d3c7bb780839c`

This audit describes the current Work-panel presentation state only. It does not change career unlock logic, action conditions, costs, wages, progression, Save state, or RNG.

## Current Work-panel structure

The Work panel renders the ten existing ordinary-career shift actions:

- `lumber.shift`
- `satyr-maid.shift`
- `undead-farm.shift`
- `tavern.shift`
- `hunter.shift`
- `guard.shift`
- `merchant.shift`
- `artist-geisha.shift`
- `assassin.shift`
- `prostitute.shift`

Every action has existing RU/EN action label and description text and five existing presentation identities: four seasonal shift slots plus one result slot.

## Current availability presentation state

At the ordinary started-run baseline after arrival:

| Career | Current Work state | Current policy fact |
| --- | --- | --- |
| Lumber | available | starter career |
| Satyr Maid | available | starter career |
| Undead Farm | available | starter career |
| Tavern | locked/disabled | non-starter action has no authored unlock condition |
| Hunter | locked/disabled | non-starter action has no authored unlock condition |
| Guard | locked/disabled | non-starter action has no authored unlock condition |
| Merchant | locked/disabled | non-starter action has no authored unlock condition |
| Artist-Geisha | locked/disabled | non-starter action has no authored unlock condition |
| Assassin | locked/disabled | non-starter action has no authored unlock condition |
| Prostitute / Professional | locked/disabled | non-starter action has no authored unlock condition |

The current engine explicitly keeps non-starter ordinary careers unavailable when their action has no authored unlock conditions. This audit does not propose or infer those missing conditions.

## Presentation distinction

Current visual distinction is primarily the disabled state of the Work button. The action card still exposes:
- localized career/action name;
- localized description;
- energy/cost/income presentation;
- existing project-owned seasonal/result presentation identities.

The queue-v6 presentation manifest records an explicit presentation-state label and help string in RU/EN for each current Work surface. C2-50 validates that locked-career metadata remains tied to exact existing action and presentation identities without creating unlock rules.

## Result

Ordinary career Work surfaces audited: **10**.

Currently available ordinary career controls: **3**.

Currently locked/disabled ordinary career controls: **7**.

Missing gameplay unlock conditions authored by Chat 2: **0**.

Gameplay or unlock-logic changes made by C2-49: **0**.
