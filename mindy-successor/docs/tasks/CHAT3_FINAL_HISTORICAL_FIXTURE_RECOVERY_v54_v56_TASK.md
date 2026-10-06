# CHAT 3 — FINAL HISTORICAL FIXTURE RECOVERY v54-v56

Status: **START NOW**
Owner: Chat 3
Branch: `chat3/final-historical-fixture-recovery-v54`

Previous final save/migration gate prep v51-v53 is accepted.

This bundle resolves the historical fixture debt identified in:
`CHAT3_FINAL_SAVE_MIGRATION_GATE_PREP_v53.md`

No production runtime/content changes.
No full CI.
Do not merge main.

## v54 — source recovery search

Recover authoritative historical source material for these fixture gaps:

F1 — genuine schema1 save;
F2 — genuine pre-Field-Time Activity envelope lacking `fieldTimeRemaining` / `miniGames`;
F3 — historical Palace access-without-ledger save shape;
F4 — completed old `lumber-stay` with existing modern RunResult/transaction;
F5 — completed old `lumber-stay` without modern RunResult.

Search Git history, frozen branches, tests, docs, fixtures and accepted producer artifacts.

For each item classify:
- exact historical fixture found;
- reconstructable from authoritative historical code/state contract;
- not recoverable without explicit reconstruction authority.

Do not fabricate and label as genuine.

## v55 — test-only golden fixture preparation

Where an exact historical fixture is found or an authoritative reconstruction is unambiguous:
- add test-only fixture files under the existing test fixture conventions;
- preserve the historical schema/state exactly;
- document provenance in comments or companion manifest;
- do not normalize them into the current schema before the migration test sees them.

For any reconstructed fixture:
- mark it explicitly as reconstructed;
- cite the exact historical authority;
- state every inferred field and why the inference is safe.

Do not change runtime migration behavior to fit the fixture.

## v56 — handoff

Create:
`mindy-successor/docs/tasks/CHAT3_FINAL_HISTORICAL_FIXTURE_RECOVERY_v56.md`

Include:
- F1-F5 disposition table;
- exact source commits/files;
- fixture paths created;
- genuine vs reconstructed classification;
- unresolved gaps;
- exact final save/migration cases unlocked by each fixture;
- stop conditions for final release gate.

Expected status:
`BUNDLE_COMPLETE — READY_FOR_FINAL_HISTORICAL_FIXTURE_GATE`

No production mutation. No full CI. Do not merge main.
