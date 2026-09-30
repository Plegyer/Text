# Chat 3 Forest / Poverty RU-EN Parity Regression v6

Status: C3-58 focused content-side regression.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.

Manifest:
`prior-work/astra/prototype-m3.2/content/chat3-forest-poverty-parity-v6.fixture.json`.

Executable test:
`prior-work/astra/prototype-m3.2/tests/chat3-forest-poverty-parity-v6.test.ts`.

## Coverage

The regression validates:
- C3-49 live-vs-preparation-only Forest consumption status;
- C3-50 Logging Road stable route identity;
- C3-51 Old Boundary stable route identity and exact existing capability;
- C3-52 success result/event/continuation identities;
- C3-53 escape/failure terminal identities with no Lumber continuation;
- C3-54/C3-55/C3-56 ordinary-poverty event/variant mappings;
- exact current choice-effect snapshots for small jobs/help/resources;
- RU/EN completeness for all queue-v6 authored player-facing strings;
- candidate localization-key uniqueness and no root-localization collision;
- C3-57 ordinary-poverty / Secret-Debt separation.

## Stable-ID boundary

All checks resolve gameplay identities from current production definitions/packs.

Fixture presence is not treated as runtime consumption.

## C3-58 disposition

Ready for repository CI and C3-59 ownership/collision regression.
