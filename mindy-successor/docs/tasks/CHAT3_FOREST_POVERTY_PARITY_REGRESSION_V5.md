# Chat 3 Forest / Poverty Collision and Parity Regression v5

Status: C3-47 focused content-side regression.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `14c59901fce0899aa05c62edf6ebc6c556547d43`.

Manifest:
`prior-work/astra/prototype-m3.2/content/chat3-forest-poverty-parity-v5.fixture.json`.

Executable test:
`prior-work/astra/prototype-m3.2/tests/chat3-forest-poverty-parity-v5.test.ts`.

## Coverage

The regression validates:
- C3-38 current Forest route/result RU/EN coverage;
- C3-39 Logging Road identity stability;
- C3-40 Old Boundary identity and exact existing unlock capability;
- C3-41 success result/continuation identities;
- C3-42 escape/failure no-continuation boundary;
- C3-43/C3-44/C3-45 ordinary-poverty event/variant mappings;
- current effect snapshots on small-job choices;
- RU/EN completeness and candidate-key uniqueness;
- absence of collisions with current production localization;
- C3-46 ordinary-poverty / Secret-Debt separation.

## Stable-ID boundary

The test resolves all authored Forest route/result IDs and all ordinary-poverty event/variant IDs from current production.

No handoff-only alias is accepted as a gameplay identity.

## Ownership boundary

The manifest explicitly keeps outside Chat 3 ownership:
- shared runtime/UI;
- Save schema;
- gameplay RNG;
- School;
- media;
- career/relationship state machines;
- ending framework;
- Secret Debt runtime.

## C3-47 disposition

Ready for exact-head repository CI on the C3-48 candidate.
