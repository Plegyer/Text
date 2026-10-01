# CURRENT CHAT5 TASK POINTER

Status: **CANDIDATE CI RUNNING / DO NOT FREEZE YET**
Owner: Chat 5 / School + Text Localization Content Worker

Mandatory current sources:
- `../LEADER1_LIVE_DASHBOARD.md`
- `../LEAD1_CURRENT_STATE_v1.md`
- `CANDIDATE_QA_FREEZE_PROTOCOL.md`
- `TASK_CHAT5_SCHOOL_QUEUE_v11.md`

Queue C5-109..120 is in candidate repair/freeze phase.

Current PR:
- #156 `chat5/school-production-v11-candidate`;
- observed exact head: `97b659d78ac3a2ccfe72c556344631f7de570507`;
- CI run #489 / id `36817263697`: **IN PROGRESS** at this pointer update.

Earlier School candidate heads failed validation/regressions; do not reuse their evidence.

If current exact-head CI is green:
- update PR handoff/body to explicitly freeze that exact SHA;
- stop mutating it and wait for Chat 4.

If red:
- repair only School-owned content/localization/tests;
- do not alter shared runtime, Save/RNG, NightFlow, career/Activity state, curriculum mechanics or unresolved producer thresholds.

Old v10 PR #143 is closed as superseded source history.
Do not self-assign beyond C5-120.
