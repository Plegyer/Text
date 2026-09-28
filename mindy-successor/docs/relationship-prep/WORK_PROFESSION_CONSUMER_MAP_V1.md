# Work Profession Consumer Map v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `54131488c65302f81b3001abaaa345d21f0281e2`
Current consumer: `src/ui/app.ts`
Fixture: `content/profession-localization-v1.fixture.json`

## Current Work seam

The Work panel calls `actionList(professions)`, where `professions` is the exact 10-item shift-action list.

Current action cards already resolve:
- `action.<shiftActionId>.label`
- `action.<shiftActionId>.description`

Those shipped action keys should remain the authoritative labels for the executable **shift** itself.

Item 160 adds separate career/profession display keys. These may be used where the UI wants the profession identity rather than the shift-action wording.

## Exact mapping

| Career ID | Shift action ID | Profession label key | Profession description key | Existing Work action keys |
|---|---|---|---|---|
| `lumber` | `lumber.shift` | `profession.lumber.label` | `profession.lumber.description` | `action.lumber.shift.label/description` |
| `satyr-maid` | `satyr-maid.shift` | `profession.satyr-maid.label` | `profession.satyr-maid.description` | `action.satyr-maid.shift.label/description` |
| `undead-farm` | `undead-farm.shift` | `profession.undead-farm.label` | `profession.undead-farm.description` | `action.undead-farm.shift.label/description` |
| `tavern` | `tavern.shift` | `profession.tavern.label` | `profession.tavern.description` | `action.tavern.shift.label/description` |
| `hunter` | `hunter.shift` | `profession.hunter.label` | `profession.hunter.description` | `action.hunter.shift.label/description` |
| `guard` | `guard.shift` | `profession.guard.label` | `profession.guard.description` | `action.guard.shift.label/description` |
| `merchant` | `merchant.shift` | `profession.merchant.label` | `profession.merchant.description` | `action.merchant.shift.label/description` |
| `artist-geisha` | `artist-geisha.shift` | `profession.artist-geisha.label` | `profession.artist-geisha.description` | `action.artist-geisha.shift.label/description` |
| `assassin` | `assassin.shift` | `profession.assassin.label` | `profession.assassin.description` | `action.assassin.shift.label/description` |
| `prostitute` | `prostitute.shift` | `profession.prostitute.label` | `profession.prostitute.description` | `action.prostitute.shift.label/description` |

## Recommended Work behavior

Default recommendation:
- keep current action-card title/body on the existing `action.<shift>.label/description` keys;
- use `profession.<career>.label/description` only if the card gains a distinct profession heading, filter, summary, tooltip, or career identity display.

If Lead chooses to show the profession name as the card heading, the exact shift action ID remains the command identity and the current action key remains a valid fallback.

## No action-ID changes

Do not replace:
- `lumber.shift` with `lumber`;
- any other shift action ID with its career ID.

The two IDs serve different roles: action command identity versus career display identity.

## Palace separation

`palace` has no Work action and no profession key. It remains a separate meta unlock.

## Invariants

No changes to wages, requirements, action costs, effect tags, counters, progression, Hard Work rules, Save, or RNG.
