# Leader 1 successor — Stage5 integration transition (2026-10-08)

**AUTHORITATIVE LIVE STATUS: Stage 1–4 CLOSED; Stage 5 OPEN; broad burn-down 1. DO NOT MERGE YET.**
This GitHub-native checkpoint supersedes historical Stage5 "queued" status in `LEADER1_STAGE5_EXACT_SOURCE_ACCEPTANCE_CHECKPOINT_2026-10-08.md` and all older leader notes. Re-query GitHub refs/runs on activation; commits may advance.

## Repository and exact refs (verified when written)

- Repository `Plegyer/Text`. Live `main@aad1e0a5ab1a254bfe821df20a2e58796db1634b` BEFORE this docs-only successor checkpoint; fresh main SHA after commit is docs-only. Latest accepted Stage4 gameplay main merge `4e67da063716cde9c41aec3a6ae40cdfc96da962`, exact-main run `37787726602` SUCCESS **1312/1312**.
- **Primary FINAL INTEGRATION PR #303** https://github.com/Plegyer/Text/pull/303 , Draft, open, NOT MERGED. Branch `lead/stage5-qa-integration-v1` current head `4766579910da552ff0c8b2ece5541b2897689f96`. **Exact runnable production/test source** `dd08aff9fc9533d1bccb4789c2d51923fb478423`; compare verified `dd08 -> 476` changed ONLY this branch's documentation checkpoint file. If later changed, use live branch code SHA, not old refs.
- Chat2 Stage5 assembly source `9af6ffbb5522aec7c7511d10be06533e39c8c17d`; original Draft PR #301 https://github.com/Plegyer/Text/pull/301 (current head `0cda9ba33c213d71e7b6a8849bfbe4bae601055c`, docs-only beyond source). **DO NOT MERGE #301 separately** if using #303; it is upstream provenance.
- Chat3 independently verified full executable 23-case migration closure source `97e16870f77501bdb677a32aa2eb0f6a4c695c7f`, targeted run `37795261316` **38/38 PASS** (23 migrated cases+5 historical F1–F5+10 Golden), Draft PR #302 https://github.com/Plegyer/Text/pull/302, head `568835ef73204eefad7bc9aacec2790541716738`. **DO NOT MERGE #302 separately** if its test-only contents are already incorporated into #303.
- Working directory for executable tests: `mindy-successor/prior-work/astra/prototype-m3.2`; Node `22.18.0`; Windows self-hosted runner `[self-hosted, Windows, X64]`.

## Critical latest exact-source CI — ACTUAL failure, narrowly isolated

Official Leader exact-source full workflow **v129 run #37797349700** https://github.com/Plegyer/Text/actions/runs/37797349700 : `failure`, SHA guard checked out **exact** `dd08aff9fc9533d1bccb4789c2d51923fb478423`. Its completed steps:
- `npm ci`, typecheck, validate, build: **PASS**.
- Independently executed 32 mandatory Stage4 legacy Golden A01–A32 witness checks: **32/32 PASS**, 0 skip.
- Strict Stage5 RU/EN Golden release target, UI smoke, cross-contract focused tests: **6/6 PASS**.
- Final executable Stage5 save/migration 23 + historical F1–F5 + immutable 10 Golden package checks: **38/38 PASS**, 0 skip.
- Full `npm run check`: **1353 PASS / 1358 total / 1 FAIL / 4 SKIP**, not green. **ONLY FAILURE**: test #1354 `C2-143 every published Undead Farm override is backed by a real frozen-runtime identity`, file `tests/undead-farm-production-presentation-reachability-c2-143.test.ts` around lines 48–57. Error `job/undead-farm/shift/spring/default/default must be a real catalog action scene`.
- Exact root cause: the Stage5 test-only loop builds `job/undead-farm/shift/${scene.id.split('.').join('/')}/default` for **every** `undead-farm.shift` action scene; for the already-covered canonical `spring.default` scene this creates a false doubled `default/default`. The preceding separate loop already checks four canonical season default IDs; restrict the new loop to the **eight non-default authored seasonal scenes** (`scene.id.endsWith('.default')` skipped), verifying each with actual `presentationSlots(catalog)` and current frozen runtime. No need to delete any Golden production slot or change gameplay to fix this invented ID. Verify focused rerun before full CI; do not weaken identity backing.
- Four `npm test` SKIPs are opt-in final-target tests normally off in full test suite; they **were actually run with strict flags** as the separate 6/6 stage. Ensure this separation remains and NEVER claim 1358/1358 pass if SKIPs present.
- Previous v127 worker diagnostic `37792925434` used `continue-on-error`; workflow displayed success even with failed tests, NEVER treat as final green. Previous Windows v128 `37796683968` failed strict prior to three Tavern human-copy fixes. v130/v131 earlier focused failures superseded by v129 focused 32/32 + 6/6 + 38/38.
- Linux fallback `37797571784` failed before the first job step; not game-code evidence. Windows v129 runner DID start and executed all gates, so current practical blocker is **one test logic bug**, not runner availability.

## Frozen authority and accepted narrow adjustments

- Immutable Chat6 final Golden v54 JSON Git blob `bc8617be68825543ed7617e9dd5c7d915f6b0e14`; original frozen v55 validator blob `e40737f3c6d6da83d1e4692e4457c04936279d53`. Recreate byte-exact originals in Windows CI via `git show HEAD:<path>` when hash-sensitive; Windows text checkout may introduce CRLF.
- Two current shipped Stage1 Secret Debt RU strings are preserved; **only two exactly adjudicated test-only expected-value overlays** in `tests/stage5-secret-debt-ru-adjudication-v1.ts`. Never blindly overwrite product translations or modify immutable fixture.
- Three frozen Tavern historical descriptions cite raw internal IDs; Leader-authorized **three exact human-readable RU/EN visible production replacements**, originals frozen and validated via narrow adapter, documented at `LEADER1_STAGE5_QA_COLLISION_ADJUDICATION_2026-10-08.md`. Other forbidden keys, D42, D48, Night, Palace, Activity/Camp, Strong Meta untouched.
- Only two production files changed relative to Stage4: `content/localization.json` (Chat2 selective: 96 adds, 10 predecessor changes, 12 forbidden deletions; Leader three historical display rewrites) and `content/presentation.json` (93 exact required slots). No runtime/schema/Strong Meta engine edits. Test/fixture/tsconfig changes are scoped, but REVIEW exclusion of the untouched original frozen v55 validator from TS compilation; derived release validator remains typechecked and executable.
- 23-case actual `tests/final-save-migration-closure-v21.test.ts` integrated from Chat3; mandatory A01–A32 executable witness test `tests/gates/stage5-legacy-golden-32-v1.test.ts` is on integration branch; both now independently green in v129.
- **Rendered real DOM RU and EN interactive UI/focus/ARIA/alt/caption check** may remain a separate final acceptance evidence item. 6/6 strict tests prove source/target contracts, not necessarily interactive rendered DOM. Do not falsely claim a screenshot/live DOM was executed unless evidence exists.

## Immediate work for successor

1. On activation, query main, PR #303, branch `lead/stage5-qa-integration-v1` and CI run #37797349700. Read `LEADER1_STAGE5_EXACT_SOURCE_ACCEPTANCE_CHECKPOINT_2026-10-08.md` and `LEADER1_STAGE5_QA_COLLISION_ADJUDICATION_2026-10-08.md` **on integration branch** and this successor note **on main**.
2. Make ONE test-only exact fix to Undead test's added loop; keep all eight catalog-backed non-default slots; choose new code SHA on Leader branch. Run SHA-guarded focused test and exact-source full `npm ci`, typecheck, validate, build, 32/32, strict 6/6, migration 38/38 and full `npm run check`. If any failure remains, repeat QA narrowly.
3. Check true rendered UI RU and EN accessibility gate evidence or plainly mark NOT-RUN / no-GO if mandatory. Confirm diff and final provenance; do not merge two worker PRs in addition to #303.
4. ONLY AFTER **exact-source full CI SUCCESS** and all mandatory gates, ready+merge **PR #303** into live main with expected exact head SHA / merge commit; then official exact-main full CI on merged SHA. Only after **both green** change Stage5 **OPEN -> CLOSED**, burn-down **1 -> 0**, publish release GO/no-GO and final pointers.
5. Chats 2 and 3 are **PARKED** after their handoffs; no need to wake them for this one leader-owned test correction. All detailed records in GitHub, user notices concise and only for manual wakeups.

**DO NOT infer future work or success from this handoff; verify live GitHub and latest run statuses.**
