# CHAT 3 — FINAL SAVE / MIGRATION GOLDEN QA v60-v62

Status: **START NOW**
Owner: Chat 3
Branch: `chat3/final-save-migration-golden-qa-v60`

Previous final save/migration golden manifest v57-v59 is accepted.

This bundle independently QA-checks the golden manifest/fixture package itself before it is consumed by the final assembled release lane.

No production runtime/content changes.
No full CI.
Do not merge main.

Accepted inputs:
- `tests/fixtures/final-save-migration-golden-v57.json`
- `tests/final-save-migration-golden-v57.test.ts`
- `CHAT3_FINAL_SAVE_MIGRATION_GOLDEN_MANIFEST_v59.md`
- F1-F5 reconstructed historical fixtures/reconstruction module from v54-v56.

## v60 — exact-head package QA

Freeze the exact accepted v57-v59 implementation head and verify:
- golden JSON parses;
- exactly 23 unique cases exist;
- case IDs are contiguous and names unique;
- all dependency classifications are legal;
- all future/final-assembly cases have explicit post-integration requirements;
- F1-F5 remain labeled authoritative reconstruction, never genuine user save;
- exactly-once domains cover money, Energy, calendar, reward, transaction, creation, RNG/pending identity;
- required subsystem coverage includes Activity, Camp, Secret Debt, Palace, D46, D47, lumber retirement, Strong Meta, NightFlow, D40, D41, D38;
- content/presentation-only layers are explicitly save-neutral;
- all stop conditions required by v21/v52 remain represented.

Run package-level test execution where available.
Do not run the final 23-case migration suite against an unassembled target and call that a failure.

## v61 — frozen-authority spot-check

Re-query a high-risk sample against frozen authorities and compare the manifest records:
- Secret Debt default/typed state and D51 provenance rules;
- Camp neutral old-save default / partial-state rejection / two-night exactly-once boundaries;
- Palace access-without-ledger, ambiguous progression-complete policy, Prince phase persistence and explicit Return Home;
- D46 fresh Lust vs stored Lust preservation;
- D47 whole-package snapshot/application semantics;
- lumber-stay/vitality historical compatibility;
- Strong Meta permanent/current-run/package separation;
- content/presentation save-neutrality.

If a manifest/test-only entry disagrees with frozen authority, repair only manifest/test/docs in this branch.
Do not modify production runtime/content.

## v62 — replacement-chat handoff

Create:
`mindy-successor/docs/tasks/CHAT3_FINAL_SAVE_MIGRATION_GOLDEN_QA_v62.md`

Include:
- exact v57-v59 head reviewed;
- package-level executable checks actually run;
- internal consistency verdict;
- frozen-authority spot-check verdict;
- any manifest/test-only corrections;
- exact future final-target execution command/sequence;
- remaining post-integration conditions;
- final stop conditions.

Expected:
`BUNDLE_COMPLETE — READY_FOR_FINAL_SAVE_MIGRATION_GOLDEN_EXECUTION_QA`

No production mutation. No full CI. Do not merge main.
