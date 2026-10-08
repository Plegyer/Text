# Chat 3 — Stage 5 executable 23-case save/migration closure handoff

**Status: READY_FOR_LEADER — targeted executable migration closure green.**

PR: https://github.com/Plegyer/Text/pull/302 (Draft, test-only)

Worker branch: `chat3/stage5-final-save-migration-closure-v21`

Base live `main` at branch creation: `aad1e0a5ab1a254bfe821df20a2e58796db1634b`

**Exact runnable test source SHA:** `97e16870f77501bdb677a32aa2eb0f6a4c695c7f`

The subsequent change to this branch is this GitHub handoff document only. For the final docs-only head, see the exact PR #302 head/ref; the code-execution SHA remains frozen above. No production source was changed.

## Evidence: real Node 22.18.0 execution, not manifest-only

Targeted isolated Windows self-hosted run:

https://github.com/Plegyer/Text/actions/runs/37795261316

- Exact checkout/head SHA: `97e16870f77501bdb677a32aa2eb0f6a4c695c7f`.
- `npm ci`: PASS.
- `node --experimental-strip-types --test tests/final-save-migration-closure-v21.test.ts tests/final-historical-fixtures-v55.test.ts tests/final-save-migration-golden-v57.test.ts`: **PASS**.
- **38 tests passed, zero failed, zero skipped**: 23 distinct executed runtime migration cases, 5 original F1–F5 reconstruction contract tests, 10 original v57 golden package assertions.
- Every `case 01:` through `case 23:` emitted a distinct TAP `ok` record.
- No full `npm run check`, no full CI and no production merge.

The 23 cases are genuine executable contracts rather than static manifest-name tests: each directly invokes the current game `parseSave`/`dispatch` and concrete roundtrips, or runs exact-named accepted executable domain regressions on that **same checked-out current production SHA** via separate child Node test processes. The selected-test adapter rejects missing/skipped tests, TAP failures, process errors and non-zero exits. The child process explicitly clears inherited `NODE_TEST_CONTEXT`; without that, Node recursively skips all child tests.

For audit completeness, two earlier targeted runs exposed test-harness issues, **not product defects**:

- run [37794822101](https://github.com/Plegyer/Text/actions/runs/37794822101): 15/38 PASS, 23/38 FAIL because inherited `NODE_TEST_CONTEXT` caused Node to skip nested executable suite files; corrected by running child suites in a fresh test context.
- run [37795003275](https://github.com/Plegyer/Text/actions/runs/37795003275): 37/38 PASS, case 13 failed because the test assumed a noncanonical `palace.counters.duties` field instead of the typed `palace.shifts` neutral contract. Corrected case 13 test assertion only.
- final run [37795261316](https://github.com/Plegyer/Text/actions/runs/37795261316): **38/38 PASS**, zero fail/skipped.

## Frozen source authorities and test-only assets

v57 golden producer: `chat3/final-save-migration-golden-manifest-v57@5d93d3f5b3ca34e2512d183e83e09404d5072701`.

Exact imported golden manifest blob (unmodified): `6ad4ed97ec6058960f90c6b6b80edfda0b9a6279`.

Exact imported original v57 validator blob (unmodified): `ca952168886eba510ae9bf832c3bad76595460e1`.

Historical producer: `chat3/final-historical-fixture-recovery-v54@5233a0b31a6254183395b1ec038297377df99565`.

Imported immutable reconstructed fixtures:

- F1: `tests/fixtures/final-historical/f1-schema1-reconstructed.json`, blob `3a113ac4472a2ed4a0138638c2961e5eb16c75c9`.
- F2: `tests/fixtures/final-historical/f2-pre-field-time-activity-envelope-reconstructed.json`, blob `995f3b1cb07a92ac37331b08cd4d5aba065655a5`.
- F3/F4/F5 reconstruction recipes: `tests/final-historical-reconstruction-v55.ts`, blob `d98a1429e0aaab49a861d269c5f0180d5fc25765`.
- Original reconstruction validator: `tests/final-historical-fixtures-v55.test.ts`, blob `318b306b30b92d12fbac4d63631bdc282e21c558`.

**F1–F5 are authoritative reconstructions, NOT genuine user-save files**. F1 retains a pre-v2 schema-1 raw boundary; F2 retains pre-Field-Time/mini-game Activity envelope; F3 preserves Palace access while removing only typed progression; F4/F5 reconstruct accepted legacy lumber completion proofs. The current migration is exercised before normalization; the test does not rewrite frozen raw fixtures to schema6.

## Final version identity at tested source

- final public `schemaVersion`: **6**
- content version / definitions.version: **0.1.0**
- Strong Meta registry: **`strong-meta-v5`**
- Activity local Camp state: **`campStateVersion=1`**
- Activity option model: **0/1**; adapter and definition version supplied by each current catalog Activity, not fabricated from F2
- D46 fresh Lust default: **5**; existing stored Lust must be preserved

The test executable asserts key schema/content/Strong Meta identities and migration/reload behavior; v55/v57 source contracts are validated independently.

## Exact 23-case executable mapping

| # | Runtime evidence executed on the candidate |
|---:|---|
| 01 | F1 raw schema1 -> production parseSave schema6 -> parse twice idempotent and pending identity; accepted M2 migration replay |
| 02 | Accepted v4 ended-run RunResult compatibility, completeEnding transaction and reload exactly-once |
| 03 | Accepted schema5 Strong Meta neutral migration, frozen current-run snapshot/runtime and protected profile merge |
| 04 | Accepted D40 conservative selected-stage projection and save/reload, no generic readiness inference |
| 05 | Accepted D41 legacy Tavern canonicalization, retired eligibility, canonical Specialist ownership |
| 06 | F4 existing legacy RunResult proof + F5 pre-RunResult reconstruction both parsed/reparsed through production; accepted lumber retirement tests |
| 07 | Accepted NightFlow before/after lodging, payment, pending RNG, calendar advance, invalid phase rejection |
| 08 | Accepted old save neutral unseen Secret Debt default, refusal closure and typed bound/trap transition |
| 09 | Accepted +2000 once, exact ten-day trap and no retroactive bound Night on activation morning |
| 10 | Accepted forced bound Night and D51 provenance queue checkpoint reload T4/T5/T8 |
| 11 | Accepted D51 Street+bound-only pair floor, Meta interaction, unrelated third penalty below 2, provenance |
| 12 | Accepted hidden work costs/benefits, repayment, Bound Life, Takeover and canonical ending ownership ledger |
| 13 | F3 live production parse: Palace access preserved, neutral shifts/stage/committed duties; accepted v15 old-save default |
| 14 | **Real negative parseSave** of access + ambiguous progression-complete without duty proof must throw; accepted duplicate/skipped duty proof rejection |
| 15 | Accepted deterministic Prince phase reload/retry, 4-phase defeat once and explicitly uncommitted Return Home |
| 16 | Accepted Activity one-shot route/checkpoint/RNG reload and exactly-once successful Activity completion |
| 17 | F2 source boundary confirmed; live Activity entered with paid Energy; pre-FT/mini-game fields removed from raw save then migrated/reloaded without recharge |
| 18 | Accepted old active Camp neutral default, partial/incompatible persisted Camp state rejection, chosen-phase reload |
| 19 | Accepted Camp calendar + FT refresh separate committed boundaries and strict two-night cap |
| 20 | Accepted forced Night preempts Camp and D51 subsequent real bound Street morning |
| 21 | Accepted D38 eligibility remains nonterminal; explicit ending completion canonical Strong Meta reward once; D38 run-local usage reload |
| 22 | Accepted D46 existing Lust preservation and fresh 5; D47 fresh creation atomic package selection and idempotence, D23 ten-package identity |
| 23 | **Real mechanical Save snapshot equality** through altered ending title/description/epilogue and presentation copy catalog; D23 package, Palace, immutable Strong Meta identities compared; accepted D23 gate denial regressions |

No row is a placeholder, and the v57 original manifest names are used verbatim in the 23 individual `test()` declarations. The worker's targeted run is **not** a substitute for Leader's final assembled Stage 5 exact-source QA.

## Change scope

New executable file:
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/final-save-migration-closure-v21.test.ts`

Unmodified imported original test/fixture authorities only:
- `tests/final-save-migration-golden-v57.test.ts`
- `tests/fixtures/final-save-migration-golden-v57.json`
- `tests/final-historical-fixtures-v55.test.ts`
- `tests/final-historical-reconstruction-v55.ts`
- `tests/fixtures/final-historical/f1-schema1-reconstructed.json`
- `tests/fixtures/final-historical/f2-pre-field-time-activity-envelope-reconstructed.json`

Ancillary scoped **targeted test-only** workflow:
- `.github/workflows/chat3-stage5-migration-closure-v21.yml`
- PR-triggered isolated `node --test` command only; never runs full CI.

No files under `src/`, `content/` (production), or PR #301's branch were changed. `main` was not merged or altered.

## Leader acceptance and remaining release gate

1. Review [Draft PR #302](https://github.com/Plegyer/Text/pull/302); verify only tests/reconstructed fixtures + isolated targeted test workflow + this handoff.
2. Diff frozen original v57/v55 source blobs against the imported blobs and keep v55/v57 package QA independently exact.
3. Port **only** the verified test-only blobs into Leader's fully assembled Stage 5 candidate; preserve all original product/save semantics and PR #301 branch.
4. Re-run on **one exact final assembled source SHA**, including the complete 23-case migration closure, F1–F5 provenance, original golden package QA, typecheck/validate/build, focused localization/UI/presentation/legacy gates.
5. Leader alone runs final full CI, merges production, runs exact-main CI and declares Stage5 closure.

At this worker stop:
- targeted executable migration closure **PASS (23/23)**
- original historical/golden preflight **PASS (15/15)**
- focused test job **PASS (38/38)**
- full CI **NOT RUN** (out of scope)
- production PR #301 **UNTOUCHED** (observed head `0cda9ba33c213d71e7b6a8849bfbe4bae601055c`)
- unresolved migration blocker on tested current-main source: **NONE**

**STAGE5_23_CASE_MIGRATION_CLOSURE_READY_FOR_LEADER**
