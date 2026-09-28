# Profession Display-Label Debt Audit v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `54131488c65302f81b3001abaaa345d21f0281e2`

## Exact current ordinary careers

Current target schema defines exactly 10 ordinary Hard Work careers:

- `lumber`
- `satyr-maid`
- `undead-farm`
- `tavern`
- `hunter`
- `guard`
- `merchant`
- `artist-geisha`
- `assassin`
- `prostitute`

Each has a current executable `<career>.shift` action in the Work panel.

## Current Work-panel status

Work cards already localize the executable shift action using shipped keys:

`action.<career>.shift.label`

`action.<career>.shift.description`

This is good action-card coverage, but those keys describe a **shift/action**, not the profession/career identity itself.

## Current Stats-panel debt

Stats currently renders profession rows from the raw catalog action label:

`catalog.definitions.actions.find(a=>a.id===id)!.label`

where `id` is the shift action ID.

Consequences:
- locale switching does not use the shipped action localization in this seam;
- the visible profession name is raw catalog English on current main;
- Stats conceptually needs a profession name, not necessarily a “shift” button label.

Item 160 therefore prepares separate presentation keys for the exact career identities.

## Current Legacy/condition debt

Generic condition presentation can expose stable career IDs such as `lumber` directly in:
- career stage/counter/fact/choice requirements;
- Hard Work meta conditions.

A profession display-label layer can later supply the human-readable career name while keeping the exact ID unchanged.

This queue does not alter condition objects or condition-schema behavior.

## Palace separation

`palace` is **not** a profession/career.

Current engine adds the meta unlock `palace` only after all 10 ordinary Hard Work careers are present in `meta.hardWorkProgress`.

Therefore:
- do not create `profession.palace.*`;
- do not add Palace to the 10-career Work/Stats list;
- Palace belongs only to the legacy/meta-unlock localization stream in items 163–165.

## Exact current career catalog source

| Career ID | Current career catalog label | Current shift action ID | Current localized shift label |
|---|---|---|---|
| `lumber` | Lumber | `lumber.shift` | Смена лесоруба / Lumber shift |
| `satyr-maid` | Satyr Maid | `satyr-maid.shift` | Смена служанки у сатиров / Satyr Maid shift |
| `undead-farm` | Undead Farm | `undead-farm.shift` | Смена на ферме нежити / Undead Farm shift |
| `tavern` | Tavern | `tavern.shift` | Смена в таверне / Tavern shift |
| `hunter` | Hunter | `hunter.shift` | Охотничья работа / Hunter shift |
| `guard` | Guard | `guard.shift` | Патруль стражи / Guard patrol |
| `merchant` | Merchant | `merchant.shift` | Смена торговца / Merchant shift |
| `artist-geisha` | Artist House | `artist-geisha.shift` | Смена в Доме искусств / Artist House shift |
| `assassin` | Assassin | `assassin.shift` | Тайная работа / Assassin shift |
| `prostitute` | Professional | `prostitute.shift` | Профессиональная смена / Professional shift |

## Recommended stable profession namespace

Use the exact career ID:

`profession.<careerId>.label`

`profession.<careerId>.description`

These are presentation keys only. They do not replace:
- career IDs;
- shift action IDs;
- career state-machine IDs;
- Hard Work identity;
- action localization keys.

## Boundary

No wages, requirements, counters, progression stages, Hard Work rules, Palace unlock rule, Save or RNG changes.
