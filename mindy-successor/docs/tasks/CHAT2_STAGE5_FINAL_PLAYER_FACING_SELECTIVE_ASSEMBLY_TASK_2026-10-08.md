# CHAT2 — Stage 5 selective player-facing production assembly — 2026-10-08

## Stage5 immutable Golden SHA guard — Leader correction (2026-10-08)

**Latest controlling QA rule, supersedes earlier suggestion to directly edit copied v54 Golden JSON.** Frozen v54 Golden `tests/fixtures/final-player-facing-golden-v54.json` MUST retain exact blob `bc8617be68825543ed7617e9dd5c7d9156b0e14`. The frozen v57 package QA asserts this SHA; the v64 cross-contract test asserts the same SHA; the v61 UI smoke matrix binds it as authority. Editing even two RU values in that file breaks reproducible strict QA. The two known legitimate shipped Secret Debt RU labels remain authorized unchanged in production by `LEADER1_STAGE5_EXACT_KEY_DISPOSITION_2026-10-08.md`.

**Safe test-only resolution:** provide a narrowly scoped, explicit release-target expectation overlay for exactly these two keys, applied when final player-facing validator v55 compares `row.value` with live localization. Do not mutate the frozen JSON. Document exact original expected RU, accepted Stage1/current RU, unmodified EN, and assert there are **exactly two** overlays, with direct reference to the Leader adjudication. Preserve every other key/slot/forbidden rule and exact original fixture hash. If importing v57 package QA, its expected original v55 validator blob is immutable too: run its original frozen version against original artifacts on an isolated package-QA source, **or** retain a byte-identical archived v55 validator and teach the imported package QA to hash that exact preserved validator independently of the transparently adapted release-target validator. DO NOT silently disable/skip the hash assertion. Exact source and normalized comparison evidence must be in GitHub handoff.

This is test-only authority/provenance management, not a new production change and not permission to bypass strict final-target gates.


## Stage5 exact-key conflict adjudication — 2026-10-08

The two previously unresolved Secret Debt RU Golden third-values have been explicitly resolved by Leader 1 in `LEADER1_STAGE5_EXACT_KEY_DISPOSITION_2026-10-08.md` by checking accepted Stage1 exact-main source and unchanged Stage4 source. **PRESERVE current production labels**, do not overwrite them. On a copied Golden v54 fixture ONLY, adjust exactly the two `localization.required[KEY].value.ru` test-only expected values with explicit provenance; no blanket Golden weakening. The Stage5 production worker should proceed with safe selective work and STOP only on *new* third values / ownership conflicts. All original Stage5 test gates still mandatory.


**Status: ASSIGNED, NOT ACTIVATED.** The user must manually wake a separate Chat2 context. Owner Chat2: production-only. Leader1: frozen-authority/third-value decisions, tests, QA, exact-source full CI, main merge, official exact-main CI, Stage5 closure. Worker must stop and report at `STAGE5_PLAYER_FACING_ASSEMBLY_READY_FOR_LEADER` or `STAGE5_PLAYER_FACING_ASSEMBLY_BLOCKED`.

## Baseline and boundaries

Live Stage4 merged source: `4e67da063716cde9c41aec3a6ae40cdfc96da962`, PR #300, exact-main run `37787726602` SUCCESS 1312/1312. **Re-query live main before branching**: a later docs-only Leader update is expected. Create a NEW scoped `chat2/stage5-final-player-facing-selective-assembly-v1` branch from live `main`. Never reuse an old producer branch or overwrite whole shared JSON/app files.

Read in order: `LEADER_STATE.md`, `CURRENT_CHAT2_TASK_POINTER.md`, `WORKER_TO_LEADER_GITHUB_REPORTING_PROTOCOL.md`, this task, `LEADER1_STAGE5_GOLDEN_GAP_AUDIT_2026-10-08.json`, and exact frozen input below.

## Frozen authority inputs

- Main player-facing Golden: `chat6/final-player-facing-golden-manifest-v54`; `tests/fixtures/final-player-facing-golden-v54.json` blob `bc8617be68825543ed7617e9dd5c7d9156b0e14`. Handoff `CHAT6_FINAL_PLAYER_FACING_GOLDEN_MANIFEST_v56.md` on that branch; golden validator `tests/final-player-facing-golden-manifest-v55.test.ts`. Source is a selective operations contract, NOT permission to copy old snapshot.
- Latest release dry-run: `chat6/final-player-facing-release-dryrun-v68` / `CHAT6_FINAL_PLAYER_FACING_RELEASE_DRYRUN_v69.md`, with final-target flags `FINAL_PLAYER_FACING_GOLDEN_TARGET=1`, `FINAL_UI_ACCESSIBILITY_SMOKE_TARGET=1`, `FINAL_PLAYER_FACING_CROSS_CONTRACT_TARGET=1`.
- Golden QA: `chat6/final-player-facing-golden-qa-v57`; UI smoke `chat6/final-ui-accessibility-smoke-v60`; cross-contract `chat6/final-player-facing-cross-contract-v63`; release evidence `chat6/final-player-facing-release-evidence-v66`. Their handoffs v59/v62/v65/v67 and exact fixture/test heads stay separate. Re-query true heads.
- Save/migration golden: `chat3/final-save-migration-golden-manifest-v57`, 23 frozen cases fixture blob `6ad4ed97ec6058960f90c6b6b80edfda0b9a6279`; historical F1–F5 reconstruction `chat3/final-historical-fixture-recovery-v54`; dry-run `chat3/final-save-migration-dryrun-v65` handoff v66. Final assembled closure test `tests/final-save-migration-closure-v21.test.ts` **is not present on Stage4 main**; final integration must explicitly account for it. F1–F5 are authoritative reconstructions, NOT user saves.
- Legacy cross-contract: `chat4/legacy-release-dryrun-v61` v62; D46 35/37/cap120, D47 ten packages, retired lumber stay +1 Energy historical once; canonical ordinary endings 40.
- Preserve accepted Stage1 Secret Debt/D51, Stage2 Palace v19/D48/D39/Strong Meta, Stage3 Activity/Camp/D38, Night/D42, current schema6, all 1312 current tests.

## Verified current-main delta, before Stage5 production

On exact `4e67da06...` main vs Chat6 v54 required Golden:
- Localization required 343: **241 exact matches; 90 missing; 10 exact predecessor values; 2 THIRD values**. 12 forbidden live localization keys still present; deletion must distinguish required historical compatibility. Source audit JSON contains exact keys.
- Presentation required 127: **34 exact matches; 93 missing; zero third values**. Retired presentation deletions already absent. Current-main existing Night/D42 and other owned slots MUST remain.
- Current `content/localization.json` blob `cf3735bd4c141bcfeaea150b9f3a72369535effc`, `content/presentation.json` blob `deb6a3b65bf843529a8a57a220e76bd9097f9dbc`, `src/ui/app.ts` blob `c086bfef44cadeabe16049cff61a22f0c0565a58`. Re-read after branching, as SHA may change due control docs only.
- **Two explicit THIRD-VALUES, STOP on just these exact keys:** `unlock.secret-debt.paid-freedom.earned-reserve-match.label` (current RU 'Сопоставление заработанного резерва'; Golden RU 'Паритет заработанного резерва') and `unlock.secret-debt.takeover.network-retainer.label` (current RU 'Сетевое содержание'; Golden RU 'Сетевой гонорар'). EN exact matches. NEVER blindly override accepted current-main Stage1 Secret Debt copy; preserve it and escalate a semantic decision to Leader in GitHub handoff. Do not weaken Golden validation to silently conceal them.

## Assigned production operations

1. Perform keyed three-way compare of each Golden localization/presentation row `entry.value` vs `entry.predecessorValue` vs current main. No wholesale producer snapshot. Apply only `missing` or approved exact-predecessor -> exact final Golden operations, preserving all rows/slots that already match. Isolate any third value for Leader decision and apply no blind substitution. You MAY produce a partial safe assembly branch with both known conflicts unchanged, clearly marked BLOCKED; do not claim release-ready until resolution.
2. Preserve historically required names/alt/caption, D42 110 localization/12 Night slots, Activity Network **v36** not v17, all four D48 assets and 17 Palace-only replacements, retired Tavern/Lumber absent live and compat display retained. Golden manifest calls for 17 forbidden localization live rows (currently 12 present), exact one lumber slot and three Tavern slots absent. Delete only forbidden live keys with demonstrated nonhistorical ownership; reject any conflict with required compatibility.
3. Merge the seven accepted Strong Meta/modal semantic UI hunks selectively into current app only if missing. Preserve current runtime/Save/Strong Meta behavior, UI structure, accessibility, NightFlow/Activity/Palace and Stage4. No raw internal IDs as fallback on accepted player-facing surfaces; build RU/EN localized and alt/caption-consistent.
4. If actual production changes exist (confirmed), create corresponding narrowly scoped tests and bring in the **minimal exact validated** frozen Golden fixture/validator packages needed to run Stage5 strict final-target QA. Never call package-level static PASS the same as assembled-target PASS. Ensure 23-case closure test is executable/available or explicitly mark NOT-RUN and give exact materialization path/dependency.
5. Worker does **not** run full CI, does **not** merge `main`, does **not** close Stage5. Worker can run small scoped static/focused QA if available; state accurately if not run. All new/removed stable IDs must be audited. Stop on a third-value needing authority, schema/Save change, ownership collision, or use of whole-file replacement.

## Handoff back to Leader

Commit a detailed `mindy-successor/docs/tasks/CHAT2_STAGE5_PLAYER_FACING_PRODUCTION_HANDOFF_2026-10-08.md` **on worker branch**, open a Draft PR against `main`, include exact baseline, runnable SHA, handoff head, tested commands with actual results, per-key collision disposition, changed files, 23-case and RU/EN + 32-assertion status. User-facing response: **at most two lines** with `STAGE5_PLAYER_FACING_ASSEMBLY_READY_FOR_LEADER` or `...BLOCKED` and the PR link. Only Leader independently tests + merges after exact-source full green, then official exact-main green before burn-down 1 -> 0.
