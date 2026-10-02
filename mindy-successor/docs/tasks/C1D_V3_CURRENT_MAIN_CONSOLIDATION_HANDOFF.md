# Chat 1 Developer v3 current-main consolidation handoff

Status: HISTORICAL — completed queue evidence; current work is governed by `CURRENT_CHAT1_DEVELOPER_TASK_POINTER.md`
Owner: Chat 1 Developer / Integration Developer
Queue: C1D-13..C1D-24
Current-main baseline: `ef16d9fa0c85e3792e3dc223baadd247df95ec7f`

## C1D-13 — current-main consolidation inventory

Current main contains coordination-only movement after the C1D-01..12 candidate work. The production source blobs used by the refreshed Lumber slices remain compatible with the old candidate heads.

Selective source inventory:

- PR #71 / C1D-01: inventory evidence only. Do not merge the branch; its substantive threshold/open-decision conclusions remain authority history.
- PR #73 / C1D-05: reuse only `tests/lumber-career-persistence.test.ts`.
- PR #74 / C1D-08: reuse only `tests/lumber-hard-work-invariant.test.ts`.
- PR #75 / C1D-09: reuse only `tests/lumber-ending-commitment.test.ts`.
- PR #76 / C1D-06: selectively reapply the Lumber Stats-panel UI/localization additions and `tests/lumber-career-ui.test.ts`; do not replace whole current files from the stale base.
- PR #77 / C1D-07: reuse only `tests/lumber-foreman-leadership-integration.test.ts`.
- PR #67: QA result C4-02 is PASS-WITH-NOTES on exact head `b6d1a451b9f729aa7e3534bf4a928961c7eee134`; only the approved ordinary-poverty localization depth/accessibility payload and lookup/fallback contract are eligible for shared UI consumption.

Locked exclusions:
- no draft Lumber 10/25/30 intermediate threshold;
- no wholesale merge of `chat1/lumber-vertical-slice`;
- no Save/RNG/NightFlow/ending-framework changes;
- no Chat 2 media-source ownership;
- no School authoring;
- no Forest authoring outside an approved Chat 3 candidate.

Planned current-main consolidation:
- C1D-14..18: refresh the five still-valid Lumber UI/regression slices;
- C1D-19: consume PR #67 depth contract via presentation-only pending-scene selection;
- C1D-20/C1D-21: consume only if the required worker candidates exist and are approved;
- C1D-22..24: one combined exact-head candidate and QA handoff.

Open blockers carried forward:
- intermediate Lumber career thresholds/stages beyond `accepted-hand` remain unresolved;
- natural School producer for the management result remains worker/Product dependent;
- C1D-20 and C1D-21 remain conditional on exact worker candidate handoffs.


## Task ledger before combined CI

- C1D-13 completed at branch commit `17d76d33cfc129219bcb1ad3fa2b621370f2cb85`: current-main consolidation inventory.
- C1D-14 completed through head `176d458943027a77c0413ef16358fbb2c14b63a6`: selectively refreshed Lumber career UI/localization plus browser regression.
- C1D-15 completed at `9e942c561214b090fb3096937c9460cb83f6c899`: refreshed Foreman leadership integration regression only.
- C1D-16 completed at `1e5be4a9598903652c271e55aceb1b0d353ec014`: refreshed Lumber Save persistence regression only.
- C1D-17 completed at `de5f01a21ae1b218686c04c01f67db69da71787b`: refreshed exact 50-shift Hard Work regression only.
- C1D-18 completed at `11b137add58cdd740a1ef11dc2a2a7cf8122cf22`: refreshed eligibility/commitment/RunResult regression only.
- C1D-19 completed through head `26653212452e55ac203b9851876f4c7f0c23f0f0`: selectively consumed QA-reviewed PR #67 ordinary-poverty depth data. Added 26 RU/EN depth keys, replaced 20 approved active poverty accessibility strings, added deterministic pending-scene lookup with no RNG/Save identity, wired it only into pending event variant presentation, and added focused consumer/UI regression.
- C1D-20 blocked at this checkpoint: Chat 3 has branch `chat3/forest-poverty-content-candidate-c3-12` but no active C3-12 candidate PR/handoff. Per role contract, a branch without an active PR is draft source only and is not consumed.
- C1D-21 blocked at this checkpoint: no active Chat 5 School milestone candidate/handoff PR exists. No course/milestone/threshold is invented.

## C1D-22 combined candidate composition

The current branch is the current-main combined regression candidate. It contains only:
- refreshed C1D-14 UI/localization;
- refreshed C1D-15..18 focused Lumber regressions;
- approved C1D-19 poverty pending-scene localization consumer;
- this Git handoff.

It intentionally does not contain:
- intermediate Lumber stage/threshold invention;
- Chat 3 C3-12 Forest draft branch content;
- Chat 5 School draft branch content;
- Chat 2 media-source changes.

Full repository CI must be run on the PR exact head before C1D-22 is complete.
