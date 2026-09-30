# Chat 3 Forest + Poverty v5 Candidate Handoff

Status: C3-48 candidate handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Candidate base: `main@14c59901fce0899aa05c62edf6ebc6c556547d43`.

## Resync status

This candidate was rebuilt from current main after merged PR #93 and merged PR #100.

It does not duplicate their payload.

C3-38..47 add only new Forest/ordinary-poverty/Secret-Debt-boundary docs, fixtures and focused content-side tests.

## Delivered tasks

- C3-38 Forest route coverage audit.
- C3-39 Logging Road seasonal depth.
- C3-40 Old Boundary seasonal depth.
- C3-41 Forest success aftermath depth.
- C3-42 Forest escape/failure depth.
- C3-43 ordinary-poverty housing seasonal depth.
- C3-44 ordinary-poverty small-job/resource/help depth.
- C3-45 ordinary-poverty recovery depth.
- C3-46 Secret Debt separation regression.
- C3-47 Forest/poverty collision and RU/EN parity regression.

## Forest boundaries

The candidate uses only current identities:
- Activity `lumber.forest`;
- route options `forest.route.logging-road` and `forest.route.old-boundary`;
- results `lumber.forest.success|escape|failure`;
- result events `forest-result-content-v1.success|escape|failure`;
- success continuation `lumber-cross.activity-forest-return`.

Old Boundary keeps the existing `enter_old_boundary` item capability.

No non-terminal encounter/challenge ID is invented.

Escape/failure receive no Lumber state continuation.

## Ordinary poverty boundaries

All content maps to existing production event/variant/choice identities.

No change to:
- lodging costs;
- NightFlow;
- event effects;
- housing state;
- career/relationship state;
- persistent contacts;
- recovery milestones.

Ordinary poverty remains independent from Secret Debt.

## Secret Debt boundary

C3-46 proves current ordinary-poverty packs:
- contain no Secret Debt/lender/slave identity;
- write no generic debt metric;
- retain ordinary income/help/resource choices.

The existing generic `debt` / `repay` / `rent-room` surface remains separate from the planned hidden Secret Debt route.

No trigger probability, offer amount, activation delay, debt amount, Night penalty, threshold or reward is selected.

## Candidate content volume

New player-facing handoff strings in C3-39..45: 42 RU/EN pairs.

All are fixture/handoff content only; this candidate does not publish them into root production localization.

## Regression coverage

- `chat3-secret-debt-separation-v2.test.ts`
- `chat3-forest-poverty-parity-v5.test.ts`

The tests validate:
- stable route/result/event IDs;
- Old Boundary capability identity;
- success vs escape/failure state separation;
- poverty event/variant identity mappings;
- exact small-job effect snapshots;
- RU/EN completeness;
- candidate-key uniqueness/additivity;
- ordinary-poverty / Secret-Debt separation;
- ownership boundaries.

## Production impact

This candidate adds docs, fixtures and tests only.

It modifies no existing:
- `src/` runtime/UI file;
- `content/definitions.json`;
- `content/localization.json`;
- `content/presentation.json`;
- production pack;
- media asset;
- School file.

## Freeze

Exact candidate head and repository CI run are recorded in the PR after creation.

Any head movement after freeze requires fresh exact-head CI and QA.
