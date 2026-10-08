# CURRENT CHAT2 STATUS — PARKED AFTER STAGE5 RELEASE GO (2026-10-08)

**Stage1–5 CLOSED; burn-down 0. NO ACTIVE ASSIGNMENT. DO NOT WAKE / RESTART OLD STAGE5 TASK.** The earlier assignment below is archived and superseded; its work was integrated by Leader through merged PR #303 and final official exact-main CI [#37812797149](https://github.com/Plegyer/Text/actions/runs/37812797149). Production selective assembly delivered via provenance PR #301; do not merge separately. New work requires a new explicit Leader task and manual user activation.

---

# CURRENT CHAT2 TASK POINTER — Stage 5 SELECTIVE ASSEMBLY

### Stage5 frozen Golden original vs exactly-two-key auditable derivative — latest Leader clarification

**Accepted implementation paths (equally strict):** (A) Keep a byte-exact copy of original Chat6 Golden v54 SHA `bc8617be68825543ed7617e9dd5c7d915f6b0e14`, apply the two Leader-resolved Secret Debt RU exceptions only in an explicit final-target expectation adapter; OR (B) create a local Stage5 *test-only* derived golden fixture containing exactly the two permitted RU changes and a `leaderAdjudication` provenance marker, and enforce a lossless reverse operation that reconstructs the **entire original file byte-for-byte** with SHA `bc8617be68825543ed7617e9dd5c7d915f6b0e14`. For path B, original v54 frozen package QA must still be run independently against exact original v54/v55/v56 artifacts; cross-contract must assert the reverse SHA and all other required gates. The two paths must NOT weaken 343 localization, 127 presentation, 17 forbidden, RU/EN, UI, D42, D48 or legacy invariants. No production translation overrides for those two keys. Reject a derived fixture with any other differences.

## Stage5 immutable Golden SHA guard — Leader correction (2026-10-08)

**Latest controlling QA rule, supersedes earlier suggestion to directly edit copied v54 Golden JSON.** Frozen v54 Golden `tests/fixtures/final-player-facing-golden-v54.json` MUST retain exact blob `bc8617be68825543ed7617e9dd5c7d915f6b0e14`. The frozen v57 package QA asserts this SHA; the v64 cross-contract test asserts the same SHA; the v61 UI smoke matrix binds it as authority. Editing even two RU values in that file breaks reproducible strict QA. The two known legitimate shipped Secret Debt RU labels remain authorized unchanged in production by `LEADER1_STAGE5_EXACT_KEY_DISPOSITION_2026-10-08.md`.

**Safe test-only resolution:** provide a narrowly scoped, explicit release-target expectation overlay for exactly these two keys, applied when final player-facing validator v55 compares `row.value` with live localization. Do not mutate the frozen JSON. Document exact original expected RU, accepted Stage1/current RU, unmodified EN, and assert there are **exactly two** overlays, with direct reference to the Leader adjudication. Preserve every other key/slot/forbidden rule and exact original fixture hash. If importing v57 package QA, its expected original v55 validator blob is immutable too: run its original frozen version against original artifacts on an isolated package-QA source, **or** retain a byte-identical archived v55 validator and teach the imported package QA to hash that exact preserved validator independently of the transparently adapted release-target validator. DO NOT silently disable/skip the hash assertion. Exact source and normalized comparison evidence must be in GitHub handoff.

This is test-only authority/provenance management, not a new production change and not permission to bypass strict final-target gates.


## Stage5 exact-key conflict adjudication — 2026-10-08

The two previously unresolved Secret Debt RU Golden third-values have been explicitly resolved by Leader 1 in `LEADER1_STAGE5_EXACT_KEY_DISPOSITION_2026-10-08.md` by checking accepted Stage1 exact-main source and unchanged Stage4 source. **PRESERVE current production labels**, do not overwrite them. On a copied Golden v54 fixture ONLY, adjust exactly the two `localization.required[KEY].value.ru` test-only expected values with explicit provenance; no blanket Golden weakening. The Stage5 production worker should proceed with safe selective work and STOP only on *new* third values / ownership conflicts. All original Stage5 test gates still mandatory.


**ASSIGNED, NOT ACTIVE until the user manually wakes Chat2.** Previous Stage4 assembly is completed and merged via Leader PR #300; do not repeat Stage4.

Read:
1. `mindy-successor/docs/tasks/LEADER_STATE.md`
2. `mindy-successor/docs/tasks/WORKER_TO_LEADER_GITHUB_REPORTING_PROTOCOL.md`
3. `mindy-successor/docs/tasks/CHAT2_STAGE5_FINAL_PLAYER_FACING_SELECTIVE_ASSEMBLY_TASK_2026-10-08.md`
4. `mindy-successor/docs/tasks/LEADER1_STAGE5_GOLDEN_GAP_AUDIT_2026-10-08.json`

Your concrete task: produce scoped Stage5 player-facing RU/EN localization, presentation, accessibility/UI final-target operations from accepted Chat6 v54 Golden on a new branch from **live main**; coordinate test/fixture seams with frozen Chat3 23-case save/migration contract; preserve Stage1–4. **Two exact Secret Debt RU third values are unresolved Leader-only decisions. NEVER overwrite them as last-write-wins.** Record conflict, and status BLOCKED if no authority resolves it. Worker production assembly only, no full CI and no merge. Detailed GitHub handoff + Draft PR, minimal message to user; only the user can start this chat.

Stage4 evidence anchor: main production merge `4e67da063716cde9c41aec3a6ae40cdfc96da962`, official exact-main CI `37787726602` SUCCESS 1312/1312. Stage5 NOT EXECUTED.
