# Release Candidate Shipped E2E v1

Date: 2026-09-26
Branch: `lead/release-candidate-smoke-v2`

## Purpose

Exercise the longest current **shipped** cross-system path in one persisted Save without fabricating OPEN authoring.

Path:

`Lumber shift -> career milestone -> professional Foreman -> paid School lesson -> NightFlow -> normal lodging -> Foreman Night -> Forest logging-road -> Forest success -> Lumber continuation -> Hard Work threshold accelerator -> commit -> complete -> reload/retry -> New Run`

## Evidence rules

The test uses real production content and real commands for every product-facing step above.

One explicit accelerator is allowed:

- set Lumber `completed_shifts` to 49 immediately before the final ordinary shift.

This is a long-threshold accelerator only. It avoids replaying many days and does not stand in for missing product authoring.

The test does **not** inject:

- School management/accounting public fact;
- Old Boundary Token acquisition;
- item capability worldFacts;
- Forest success fact;
- ending reward;
- Meta progression.

Those are produced only by shipped mechanics where applicable.

## OPEN authoring remains OPEN

This E2E does not claim closure of:

- Old Boundary Token acquisition source;
- token retain/consume policy;
- School management/accounting public result;
- School Arcana/Forest public result;
- hunter-trail final authoring;
- full 3-route / 3-challenge / seasonal Forest depth.

## Locked invariants asserted

- first Lumber shift costs one daytime Energy;
- paid School Arcana lesson costs 500 + one Energy and increments typed `lessons_completed`;
- normal lodging costs 100 once;
- Foreman Night consumes the Night slot and no daytime Energy;
- Forest entry costs 2 Energy;
- logging-road route requires no item;
- Forest success triggers exact Lumber continuation;
- Hard Work becomes eligible at exactly 50 completed shifts;
- Hard Work has no School/Forest/item/relationship/season prerequisite;
- explicit completion applies exact `hardWork:lumber` once;
- reload/retry does not duplicate the reward;
- New Run exposes the locked Strength/Endurance Meta effect.
