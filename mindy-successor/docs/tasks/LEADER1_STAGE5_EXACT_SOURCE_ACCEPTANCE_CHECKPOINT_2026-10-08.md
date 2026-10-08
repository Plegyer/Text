# Leader1 Stage5 exact-source acceptance checkpoint — 2026-10-08

**Status: STAGE5_QA_PENDING_RUNNER — NO MERGE / NO CLOSURE.** This document is a docs-only handoff recorded on the Leader branch after exact runnable SHA `dd08aff9fc9533d1bccb4789c2d51923fb478423`.

## Worker origin and integration

- Chat2 Draft #301 `0cda9ba33c213d71e7b6a8849bfbe4bae601055c` with source `9af6ffbb5522aec7c7511d10be06533e39c8c17d`. Production JSON selective Stage5 assembly under `content/localization.json` (96 new/10 predecessor/12 forbidden retirement) and `content/presentation.json` (93 new), no gameplay/Save/schema changes.
- Chat3 Draft #302 `568835ef73204eefad7bc9aacec2790541716738` with runnable test source `97e16870f77501bdb677a32aa2eb0f6a4c695c7f`; exact real v21 closure test blob `323d6a27d974bb80ffbc7e0505f2b141c9942028`, targeted run `37795261316` SUCCESS **38/38 (23 executable migration+5 F1–F5+10 immutable v57 contracts)**. That is independent worker test evidence, not acceptance on assembled Stage5.
- Leader combined source `dd08aff9fc9533d1bccb4789c2d51923fb478423` in Draft PR #303. Production paths vs accepted main: ONLY `content/localization.json`, `content/presentation.json`. Additional changes in tests and the scoped `tsconfig.json` typecheck exclude for the **original byte-immutable frozen v55 validator**. An adapted v55-derived release-target validator is typechecked and strictly run with its final-target flag. Original golden v54 JSON SHA `bc8617be68825543ed7617e9dd5c7d915f6b0e14`, v55 test original SHA `e40737f3c6d6da83d1e4692e4457c04936279d53`, v60 UI matrix, v57 save manifest remain immutable.
- Leader three exact-key Tavern human-copy adjudication in `LEADER1_STAGE5_QA_COLLISION_ADJUDICATION_2026-10-08.md`: the frozen v54 historical descriptions of `ending.tavern-court.description`, `ending.tavern-guild.description`, `ending.tavern-stay.description` explicitly embedded raw modern IDs. Human-readable RU/EN production display is required by accepted v60 UI rule; final-target test overlay checks original frozen values and exact readable replacements. The source fixture is NOT altered, and the adapted v64 cross-contract now distinguishes historical evidence from rendered output.
- Two approved Secret Debt Stage1 RU labels retained, and original v54 Golden final-target overlay remains exactly two keys. Guard + Undead authored presentation additions have live frozen catalog scene backing, and legacy Artist alias deletion is selective.

## Executable evidence and current operational blockade

- Stage5 raw Chat2 source diagnostic run `37792925434`: typecheck / validate / build / 15/15 save-contract PASS, full test 1326/1335 PASS, 5 FAIL + 4 conditional target SKIPs; leader addressed all identified categories in isolated integration branch. This is NOT a green full gate.
- Separate v130 strict player-facing targeted run `37795194889` initially found missing human display for more than one Tavern historical description. Exact three-key resolution now included in combined SHA above.
- 32 mandatory Stage4 Golden assertions `A01–A32`: isolated witness runner v131 `37795475726` failed 32/32 due nested Node `NODE_TEST_CONTEXT` propagation, NOT evidence of gameplay failure. Leader test-only witness runner now clears the context like verified Chat3 v21 harness. Static audit verified **all 37 mapped witness substrings exist in their mapped accepted producer test source** on `dd08aff9fc9533d1bccb4789c2d51923fb478423`; no executable PASS claimed yet.
- Final Windows exact-source v128 `37796683968` checkout `fb841ee1...`, and controlling v129 `37797349700` checkout `dd08aff9fc9533d1bccb4789c2d51923fb478423`: both **QUEUED, no steps executed** at this checkpoint. Only v129 is authoritative latest and contains 32 legacy, strict RU/EN, 23+15 save closure, full check.
- Linux GitHub-hosted fallback `37797571784` on **same exact code SHA** `dd08aff9fc9533d1bccb4789c2d51923fb478423`: job `failure` before the first step (job `steps=null`, logs unavailable). Infra/pre-startup failure, NOT code test evidence.
- NO Stage5 source combined executable PASS; NO final RU and EN rendered DOM pass; NO 32/32 PASS; NO full CI green; NO merge. Stage5 broad burn-down stays **1**.

## Explicit next gates

1. Restore availability of a matching Actions runner; run v129 exact-source `node 22.18.0` checks from its already-submitted workflow. No necessity to wake Chat2 or Chat3 for product repairs unless an actual failure is classified.
2. If focused gates fail, classify product bug vs test fixture/QA contract, fix exact scope on Leader integration branch and re-run SHA-guarded workflow.
3. Final strict rendered RU and EN UI smoke is separate from source-only semantic checks and must be honestly labeled. Stage4 prerequisite 32 assertions must truly execute.
4. Merge PR #303 only after all mandatory exact-source focused and full gates green; rerun official push exact-main CI; then and only then Stage5 broad burn-down **1 -> 0**, release GO/no-GO record.
