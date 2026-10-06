# CHAT 4 — SECRET DEBT + D51 RECOVERY-HEAD QA v50-v52

Status: **START NOW**
Owner: Chat 4
Branch: `chat4/qa-secret-debt-d51-recovery-head-v50`

Previous D46+D47+legacy exact-head QA v47-v49 is accepted.

This bundle independently reviews the current Chat2 Secret Debt + D51 recovery assembly.
Do not mutate Chat2 production branch. No full CI. Do not merge main.

Source branch under review:
`chat2/assembly-secret-debt-d51-current-main-recovery-v2`

## v50 — freeze and diff current Chat2 recovery head
At start, re-query the live Chat2 recovery branch and freeze its exact head SHA.
Compare it against the current production main and against the accepted Secret Debt/D51 authorities.
Verify the tree is structurally full, not sparse.
Map all current production changes by file and classify them as:
- intended Secret Debt/D51;
- required current-main semantic union;
- unrelated drift;
- missing expected work.

Do not review an older cached SHA if Chat2 has advanced before you begin.

## v51 — exact-head focused QA
On a QA-only branch/checkout pinned to the frozen Chat2 head, run where possible:
- exact SHA guard;
- npm ci;
- typecheck;
- validate;
- build;
- Secret Debt v12 route tests;
- D51 compatibility tests;
- Night/forced-Night adjacency;
- save/reload/migration adjacency;
- ending/reward/Strong Meta adjacency;
- localization/UI focused checks relevant to Secret Debt.

No full CI.

Classify failures precisely as:
- product/runtime;
- stale test/fixture;
- current-main composition;
- branch/tree/infrastructure.

Do not repair Chat2 production in this lane.

## v52 — Leader handoff
Create:
`mindy-successor/docs/tasks/CHAT4_QA_SECRET_DEBT_D51_RECOVERY_HEAD_v52.md`

Include:
- frozen Chat2 SHA;
- structural tree verdict;
- exact changed-file map;
- exact executable evidence;
- remaining blocker list;
- smallest repair guidance if needed;
- whether the frozen head is ready for Chat2 to proceed to its own full CI.

Expected status:
`BUNDLE_COMPLETE — READY_FOR_LEADER_SECRET_DEBT_REVIEW`

No main merge. No full CI.
