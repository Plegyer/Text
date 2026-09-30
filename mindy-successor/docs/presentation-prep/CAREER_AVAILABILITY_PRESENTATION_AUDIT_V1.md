# Career Availability Presentation Audit v1

Status: C2-49 COMPLETE
Owner: Chat 2 / Presentation & Media
Baseline main: `5f2685f1fde6b4718483febd6f49108eaa4ac873`

## Scope

This is a presentation/UI audit of the current Work panel only. It does not change ordinary-career unlock logic, action conditions, progression, rewards, Save state, or career mechanics.

## Current ordinary-career set

The Work panel renders ten current ordinary shift actions:

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

The engine's current availability contract designates Lumber, Satyr Maid and Undead Farm as the starter trio. For any other ordinary-career shift, `actionAvailable` requires at least one authored action condition. Current main carries no conditions on the seven later-career shift actions, so they remain disabled.

## Work-panel state on a started Day 1 save

| Career action | Engine availability | Work control | Presentation status |
| --- | --- | --- | --- |
| `lumber.shift` | available | enabled | coherent |
| `satyr-maid.shift` | available | enabled | coherent |
| `undead-farm.shift` | available | enabled | coherent |
| `tavern.shift` | unavailable | disabled | locked reason not exposed |
| `hunter.shift` | unavailable | disabled | locked reason not exposed |
| `guard.shift` | unavailable | disabled | locked reason not exposed |
| `merchant.shift` | unavailable | disabled | locked reason not exposed |
| `artist-geisha.shift` | unavailable | disabled | locked reason not exposed |
| `assassin.shift` | unavailable | disabled | locked reason not exposed |
| `prostitute.shift` | unavailable | disabled | locked reason not exposed |

Existing regression `starter-trio-availability-ui.test.ts` already verifies this enabled/disabled split.

## Presentation gap

The current Work renderer shows action conditions only when `a.conditions` fail. The seven late-career actions have no conditions, so their disabled buttons have no adjacent explanation even though `actionAvailable` returns false.

That is a presentation/accessibility gap rather than an unlock-logic gap:
- button state is mechanically correct;
- label and description are localized;
- the reason for a disabled late-career control is not presented;
- no new unlock rule should be inferred or authored by Chat 2.

## C2-50 target

C2-50 should preserve the exact engine availability result and add only:
- a neutral visible locked-state help string;
- an associated accessible description for the disabled career control;
- RU/EN parity;
- regression that the starter trio stays enabled and the seven locked careers stay disabled.

No condition, unlock, effect, career stage, Save field or action ID is to be changed.
