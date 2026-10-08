# Chat3 Stage5 — materialize actual runnable 23-case migration closure v21 (2026-10-08)

**Status: ASSIGNED, NOT ACTIVATED until user manually wakes Chat3.** Owner Chat3: *test-only real executable migration closure*. Leader1: final integration / exact-source CI / merge / official exact-main / Stage5 release decision. Stop marker: `STAGE5_23_CASE_MIGRATION_CLOSURE_READY_FOR_LEADER` or `...BLOCKED`.

## Your exact output

Create scoped branch `chat3/stage5-final-save-migration-closure-v21` from freshly queried live `main` (docs-only ahead of Stage4 merge `4e67da063716cde9c41aec3a6ae40cdfc96da962`, official main CI `37787726602` SUCCESS 1312/1312). Test-only change: `mindy-successor/prior-work/astra/prototype-m3.2/tests/final-save-migration-closure-v21.test.ts`, plus scoped test helpers/fixtures ONLY if exact missing dependencies require them. **No production edits, no schema edits, no changes to Chat2 branch, no full CI, no merge**. Open Draft PR and commit detailed GitHub handoff. This is one missing exit gate for Stage5 production PR #301 `chat2/stage5-final-player-facing-selective-assembly-v1`, exact runnable source `9af6ffbb5522aec7c7511d10be06533e39c8c17d` (Leader later ports your exact test-only blobs into final QA branch). Do not redo Chat2 Stage5 content.

## Frozen case authority, mandatory

- `chat3/final-save-migration-golden-manifest-v57@5d93d3f5b3ca34e2512d183e83e09404d5072701`, exact `tests/fixtures/final-save-migration-golden-v57.json` Git blob `6ad4ed97ec6058960f90c6b6b80edfda0b9a6279`, and `tests/final-save-migration-golden-v57.test.ts`.
- `chat3/final-historical-fixture-recovery-v54@5233a0b31a6254183395b1ec038297377df99565`, F1/F2 raw historical reconstruction JSON and F3/F4/F5 `tests/final-historical-reconstruction-v55.ts`, and `tests/final-historical-fixtures-v55.test.ts`. **F1–F5 are reconstructed authorities, NOT real user-save blobs.**
- `mindy-successor/docs/tasks/CHAT3_FINAL_SAVE_MIGRATION_RELEASE_EVIDENCE_LEDGER_v63.md` on `chat3/final-save-migration-release-evidence-v63`, exact 23 listed names, domain matrix and focused adjacencies; `CHAT3_FINAL_SAVE_MIGRATION_GOLDEN_QA_v62.md` on `chat3/final-save-migration-golden-qa-v61`; `CHAT3_FINAL_SAVE_MIGRATION_DRYRUN_v66.md` on `chat3/final-save-migration-dryrun-v65`.
- Current production `src/core/engine.ts` parseSave/freshSave/dispatch, save schema version 6, original Stage4 retirement compatibility fix, tests helpers, accepted producer tests. Read all source before writing. Stage5 selective content is save-neutral; no need to modify game runtime.
- Canonical test title list is `manifest.cases[i].name`, exactly `case 01:` through `case 23:`, unique contiguous.

## Quality bar

**REAL EXECUTION, not manifest-only or 23 shallow placeholders.** Each of the 23 distinct named `test()` cases must execute the actual current production migration/Save runtime, a concrete representative end-to-end action + serialize/parse roundtrip, or a directly relevant accepted executable domain test whose assertion covers the same behavior; document mapping and coverage for each. DO NOT call a static equality of case names or existence check a migrated-case PASS. For complex cross-subsystem cases 07/09/10/15/19/20/21, use actual production scenario/action/reload or compose independent, runnable accepted adjacency tests; never claim coverage without triggering the target state boundary. If a frozen case is too hard to implement safely, explicitly mark BLOCKED with exact case IDs and evidence rather than weaker/fake PASS.

Invariants: exactly once money/Energy/calendar/reward/transaction/creation/RNG and pending identity; no invented historical fields, identities, 15 Palace duties, completion/eligibility or inferred Secret Debt, Camp, Hard Work, Strong Meta. Preserve implicit result ID / transaction normalization and aged ended RunResults; D46 existing saved Lust untouched; D47 only at fresh finishCreation, 50-shift award; Activity/Camp Field Time once; NightFlow once; Secret Debt+D51 provenance-gated; Palace ambiguous progression rejection or exact neutral mapping.

Case 14 **STOP/NO-GO** if `palace.progression-complete` without duty proof gets 15 duty count fabricated; write a real negative assertion. Case 23 save-neutral must compare serialized Save / active mechanics before and after content/presentation-only differences, not only check file paths. Version freeze header must explicitly capture final `schemaVersion`, content version, Strong Meta registry, Activity local versions from live source and compare runtime. For F1/F2 preserve raw reconstruction provenance; don't label genuine.

## Focused worker gate and handoff

Worker may run targeted `node --experimental-strip-types --test tests/final-save-migration-closure-v21.test.ts tests/final-historical-fixtures-v55.test.ts tests/final-save-migration-golden-v57.test.ts` via isolated CI workflow (Windows Node 22.18.0) or environment if available; capture exact source SHA, test counts/failure details. **No full `npm run check` and no merge.** Send Leader detailed GitHub report at `mindy-successor/docs/tasks/CHAT3_STAGE5_23_CASE_MIGRATION_CLOSURE_HANDOFF_2026-10-08.md` (on your branch) with SHA/PR/case matrix and execution vs NOT-RUN. User-facing message at most two lines: marker and PR. Leader independently reruns every case and reconciles with Chat2 Stage5 target.

Protocol: `WORKER_TO_LEADER_GITHUB_REPORTING_PROTOCOL.md`.
