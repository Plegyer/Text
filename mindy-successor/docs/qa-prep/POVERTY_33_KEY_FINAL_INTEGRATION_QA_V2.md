# Poverty 33-key final integration QA v2

Status: COMPLETE / GREEN_SAFE_TEXT_PATCH

Current main reviewed:
`f93878b954385a1c61d8a06a0673354207d11d70`
(after PR50).

Source:
`poverty-copyedit-post-pr48-v4.fixture.json`.

Source blob:
`7a8eaca80b14bfea9cdf94336575d6004b8701e7`.

Natural-path source:
`poverty-copyedit-natural-path-v2.fixture.json`.

Natural-path blob:
`c8e1f1a4de67679829ce62cb82fb53e7434f37c1`.

## Exact-key result

Patch keys:
`33`.

Against exact current main:
- existing keys: 33;
- missing keys: 0;
- already-equal/superseded: 0;
- third-value collision: 0;
- proposed replacements still differ from current text: 33.

Therefore all 33 remain clean text replacements.

## RU+EN parity

Missing RU:
`0`.

Missing EN:
`0`.

Every replacement updates the same stable existing key in both locales.

## Media/static-media exclusion

Keys under:
- `media.*`: 0;
- `presentation.*`: 0.

The patch cannot overwrite PR47/48/49/50 static accessibility ownership.

## Secret Debt exclusion

No source occurrence of:
- secret-debt;
- secret debt;
- lender;
- forced-night;
- paid_freedom;
- bound_life;
- takeover.

Secret Debt remains isolated.

## Gameplay fields

The fixture is localization text only.

No:
- condition;
- effect;
- reward;
- resource delta;
- next-day modifier;
- RNG;
- NightFlow;
- housing;
- Save
field is added.

## Natural-path identity

The path fixture has exactly 33 rows.

For every changed key, the current referenced:
- pack ID;
- event ID;
- variant ID;
- non-null choice ID
exists.

No natural-path row invents a gameplay identity.

Current event conditions/effects recorded in the fixture are expectations, not patch data.

## PR50 interaction

PR50 changes only generic Forest route/default presentation.

It does not touch ordinary-poverty event text or mechanics.

Thus the 33-key patch remains valid after PR50.

## Required Lead merge gate

On the fresh integration head:
- repeat exact-key collision check;
- copy only the 33 root localization values;
- run ordinary-poverty full localization;
- run all-six-pack natural-path test;
- run pending-scene RU↔EN Save invariance;
- run full exact-head CI;
- require post-merge main CI.

## Verdict

`GREEN_SAFE_TEXT_PATCH`.

The 33-key ordinary-poverty copyedit is ready for selective integration from current main.
