# Stats Profession Consumer Map v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `54131488c65302f81b3001abaaa345d21f0281e2`
Current consumer: `src/ui/app.ts`
Fixture: `content/profession-localization-v1.fixture.json`

## Current Stats seam

The Stats panel currently iterates the shift-action list and prints each raw catalog action label next to its action count. The list contains shift action IDs, while the panel concept is “Professions”.

This causes two presentation problems:
- the seam bypasses existing localization;
- the raw action label describes a shift rather than the profession identity.

## Exact mapping

| Career ID | Current Stats action ID | Profession label key | Profession description key |
|---|---|---|---|
| `lumber` | `lumber.shift` | `profession.lumber.label` | `profession.lumber.description` |
| `satyr-maid` | `satyr-maid.shift` | `profession.satyr-maid.label` | `profession.satyr-maid.description` |
| `undead-farm` | `undead-farm.shift` | `profession.undead-farm.label` | `profession.undead-farm.description` |
| `tavern` | `tavern.shift` | `profession.tavern.label` | `profession.tavern.description` |
| `hunter` | `hunter.shift` | `profession.hunter.label` | `profession.hunter.description` |
| `guard` | `guard.shift` | `profession.guard.label` | `profession.guard.description` |
| `merchant` | `merchant.shift` | `profession.merchant.label` | `profession.merchant.description` |
| `artist-geisha` | `artist-geisha.shift` | `profession.artist-geisha.label` | `profession.artist-geisha.description` |
| `assassin` | `assassin.shift` | `profession.assassin.label` | `profession.assassin.description` |
| `prostitute` | `prostitute.shift` | `profession.prostitute.label` | `profession.prostitute.description` |

## Recommended Stats presentation

Keep the exact current action-count lookup under each shift action ID.

Change only the visible name to the profession label key, with the current action label as fallback. Optional help can use the profession description key.

Do not derive a career ID from translated text.

## Palace separation

`palace` is not part of the mapping. It is a meta unlock, not a profession or shift action.

## Invariants

Stats wiring must not change shift action IDs, action-count values, career progression, Hard Work progress, Palace unlock behavior, Save, or RNG.
