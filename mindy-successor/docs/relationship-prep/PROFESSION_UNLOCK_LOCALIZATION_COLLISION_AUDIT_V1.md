# Profession / Unlock Localization Collision Audit v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `54131488c65302f81b3001abaaa345d21f0281e2`

Audited:
- `content/profession-localization-v1.fixture.json`
- `content/legacy-unlock-localization-v1.fixture.json`

## Summary

| Classification | Count |
|---|---:|
| ADDITIVE | 30 |
| IDENTICAL | 0 |
| REUSE_EXISTING | 0 |
| CONFLICT | 0 |
| **Total** | **30** |

## Full classification

| Source | Key | Classification | Note |
|---|---|---|---|
| profession | `profession.artist-geisha.description` | ADDITIVE | absent from root |
| profession | `profession.artist-geisha.label` | ADDITIVE | absent from root |
| profession | `profession.assassin.description` | ADDITIVE | absent from root |
| profession | `profession.assassin.label` | ADDITIVE | absent from root |
| profession | `profession.guard.description` | ADDITIVE | absent from root |
| profession | `profession.guard.label` | ADDITIVE | absent from root |
| profession | `profession.hunter.description` | ADDITIVE | absent from root |
| profession | `profession.hunter.label` | ADDITIVE | absent from root |
| profession | `profession.lumber.description` | ADDITIVE | absent from root |
| profession | `profession.lumber.label` | ADDITIVE | absent from root |
| profession | `profession.merchant.description` | ADDITIVE | absent from root |
| profession | `profession.merchant.label` | ADDITIVE | absent from root |
| profession | `profession.prostitute.description` | ADDITIVE | absent from root |
| profession | `profession.prostitute.label` | ADDITIVE | absent from root |
| profession | `profession.satyr-maid.description` | ADDITIVE | absent from root |
| profession | `profession.satyr-maid.label` | ADDITIVE | absent from root |
| profession | `profession.tavern.description` | ADDITIVE | absent from root |
| profession | `profession.tavern.label` | ADDITIVE | absent from root |
| profession | `profession.undead-farm.description` | ADDITIVE | absent from root |
| profession | `profession.undead-farm.label` | ADDITIVE | absent from root |
| unlock | `unlock.calendar.label` | ADDITIVE | absent from root |
| unlock | `unlock.court.label` | ADDITIVE | absent from root |
| unlock | `unlock.guild.label` | ADDITIVE | absent from root |
| unlock | `unlock.host.label` | ADDITIVE | absent from root |
| unlock | `unlock.lumber.forest.compat.label` | ADDITIVE | absent from root |
| unlock | `unlock.lumber.forewoman.compat.label` | ADDITIVE | absent from root |
| unlock | `unlock.mediator.label` | ADDITIVE | absent from root |
| unlock | `unlock.palace.label` | ADDITIVE | absent from root |
| unlock | `unlock.scholar.label` | ADDITIVE | absent from root |
| unlock | `unlock.vitality.label` | ADDITIVE | absent from root |

## Semantic overlap notes

Profession keys are deliberately separate from the shipped executable shift-action keys:
- `profession.<career>.label/description` = career display identity;
- `action.<career>.shift.label/description` = executable shift action.

Legacy unlock keys are deliberately separate from ending titles:
- `unlock.<id>.label` = persistent unlock display;
- `ending.<endingId>.title` = ending/fate display.

No duplicate gameplay identity is created.

## Current hardcoded fallback dictionary

Some unlock RU values already exist in `src/ui/labels.ts`, but that dictionary is not root localization and does not provide EN switching. Those entries therefore remain ADDITIVE localization keys, not root IDENTICAL entries.

## Palace boundary

`unlock.palace.label` is valid.
No `profession.palace.*` key exists.

## Merge rule

Recheck the exact integration head before merge. Never overwrite a future same-key conflict silently.

## Boundary

No action/career IDs, rewards, Hard Work progress, Palace condition, wages, requirements, Save or RNG changes.
