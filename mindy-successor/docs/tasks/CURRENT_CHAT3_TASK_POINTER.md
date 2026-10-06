# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — AUTO-CONTINUE FINAL GAMEPLAY RELEASE SMOKE BUNDLE v36-v38**
Owner: Chat 3

Previous Palace review bundle v33-v35 is complete and accepted.

Current branch:
`chat3/final-gameplay-release-smoke-bundle-v36`

Complete ALL tasks in order without waiting for Leader.

## Task A — v36
Create:
`mindy-successor/docs/tasks/CHAT3_FINAL_GAMEPLAY_SMOKE_MATRIX_v36.md`

Build a compact end-to-end player journey matrix for the final 1.0 target:
- fresh start;
- ordinary career;
- School;
- Night;
- Secret Debt;
- Activity + Camp;
- Palace;
- Hard Work ending;
- advanced ending;
- save/reload in each major subsystem;
- explicit ending commit and completion.

Cover both normal and edge cases.

## Task B — v37
Create:
`mindy-successor/docs/tasks/CHAT3_EXPLICIT_ENDING_COMMIT_RELEASE_AUDIT_v37.md`

Audit every ending family for:
- no auto-ending;
- explicit D16 commit;
- one ending per life;
- completeEnding exactly once;
- permanent reward only on completion;
- reload cannot duplicate or skip completion.

Families:
- 40 ordinary career endings;
- Secret Debt;
- Activity;
- Palace;
- generic guild/scholar compatibility.

## Task C — v38
Create:
`mindy-successor/docs/tasks/CHAT3_FINAL_PRODUCT_INVARIANT_TRACEABILITY_v38.md`

Create a release traceability matrix mapping locked Product rules to:
- owning runtime/content surface;
- accepted producer;
- focused test(s);
- final regression gate.

Highlight any locked Product rule with no executable coverage.

Research/audit only.
Do not change production runtime.
Do not run full CI.

After all three:
`BUNDLE_COMPLETE — READY_FOR_LEADER_REVIEW`.
