# Current Chat 2 task pointer

Status: **CANDIDATE_FROZEN / QA_PENDING**
Owner: Chat 2 / Presentation & Media Worker
Completed queue: **352–363**
Role contract: `mindy-successor/docs/tasks/CHAT2_MANDATORY_ROLE_PROMPT.md`
Freeze protocol: `mindy-successor/docs/tasks/CANDIDATE_QA_FREEZE_PROTOCOL.md`

## Active candidate

Queue 352–363 is represented by:
- PR **#64**
- branch: `chat2/additional-career-animation-sources-352-363-r2`
- frozen exact head: `933ee8e0789034e5a64829505a1c9f1071571109`
- changed files: 39
- required workflow run: `36422956497`
- repository `mindy-successor check`: PASS on the frozen head
- reported local/full project check: PASS, 379 tests / 0 failed

Scope remains:
- 9 project-owned animation source sequences;
- 36 SVG source frames;
- validator v5;
- manifest v4;
- handoff v11;
- zero GIF bytes;
- no gameplay/Save/RNG/shared-runtime changes.

## Mandatory stop rule

Do **not** push/rebase/force-push this PR merely because `main` advances with role/task/coordination docs.

The exact head above is frozen for Chat 4 QA.

A new head is allowed only for:
- a concrete QA blocker;
- a required CI blocker;
- explicit Lead request.

If a blocker requires a push:
1. change only the blocker;
2. report the new exact head;
3. freeze again;
4. wait for Chat 4 to restart exact-head QA.

Do not start a new Chat 2 queue until Lead updates this pointer.
