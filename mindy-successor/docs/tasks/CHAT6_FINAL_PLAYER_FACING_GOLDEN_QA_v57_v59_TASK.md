# CHAT 6 — FINAL PLAYER-FACING GOLDEN QA v57-v59

Status: **START NOW**
Owner: Chat 6
Branch: `chat6/final-player-facing-golden-qa-v57`

Previous golden manifest v54-v56 is accepted.

This bundle independently executable-checks the golden fixture/validator package itself and hardens its future use.
No production runtime/mechanics changes. No full CI. Do not merge main.

Authorities:
- `tests/fixtures/final-player-facing-golden-v54.json`
- `tests/final-player-facing-golden-manifest-v55.test.ts`
- `CHAT6_FINAL_PLAYER_FACING_GOLDEN_MANIFEST_v56.md`
- accepted frozen source authorities embedded in the fixture.

## v57 — exact-head package QA

Freeze the exact accepted v54-v56 implementation head and verify:
- fixture JSON parses;
- schemaVersion/id/status metadata are coherent;
- all declared counts match the actual fixture arrays/maps;
- no duplicate localization keys;
- no duplicate presentation slots;
- deleted keys/slots do not also appear as required final live targets unless explicitly historical-only;
- exactly four D48 assets are declared;
- exactly 17 D48 Palace replacements are declared;
- D42 Night preservation counts match the accepted contract;
- Activity Network final authority is v36.

Run npm/typecheck or direct Node test execution where the branch permits it.
Do not enable final-target mode against an unassembled production checkout and call that a failure.

## v58 — frozen-authority spot-check

Re-query a representative high-risk sample against the frozen producer authorities:
- Activity Network v17 predecessor and v36 final row;
- all 17 Palace v19 -> D48 slot replacements;
- all four D48 asset paths/altKey families;
- lumber-stay/vitality live-surface deletions + historical compatibility retention;
- retired Tavern deletions/compatibility rows;
- Strong Meta/modal localization + semantic hunk markers;
- D42 Night preservation sample and count metadata.

If any manifest entry disagrees with frozen authority, classify exact key/slot and repair only test/fixture/docs in this branch.
Do not modify production files.

## v59 — handoff

Create:
`mindy-successor/docs/tasks/CHAT6_FINAL_PLAYER_FACING_GOLDEN_QA_v59.md`

Include:
- exact v54-v56 head reviewed;
- executable checks actually run;
- fixture internal consistency verdict;
- frozen-authority spot-check verdict;
- any corrected manifest/test-only entries;
- exact command for later final-target execution;
- remaining post-integration conditions.

Expected:
`BUNDLE_COMPLETE — READY_FOR_FINAL_PLAYER_FACING_GOLDEN_EXECUTION`

No production mutation. No full CI. Do not merge main.
