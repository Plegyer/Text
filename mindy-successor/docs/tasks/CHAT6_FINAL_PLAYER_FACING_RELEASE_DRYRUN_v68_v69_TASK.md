# CHAT 6 — FINAL PLAYER-FACING RELEASE DRY-RUN PREP v68-v69

Status: **START NOW**
Owner: Chat 6
Branch: `chat6/final-player-facing-release-dryrun-v68`

Previous release evidence v66-v67 is accepted.

This is a LIGHTWEIGHT bundle. Keep context usage low.
Do not reread large manifests unless checking one exact field.

Read only:
1. `CURRENT_CHAT6_TASK_POINTER.md`
2. `CHAT6_FINAL_PLAYER_FACING_RELEASE_EVIDENCE_v67.md`
3. `LEADER1_CHECKPOINT_2026-10-06_LATE.md`
4. `USER_DECISIONS_LOCKED_v1.md`

No production runtime/mechanics/content changes.
No full CI.
Do not merge main.

## v68 — final execution dry-run checklist

Create one compact ordered checklist for the future fully assembled candidate that tells Chat2/Leader exactly:
- which player-facing/static validators run first;
- which final-target environment flags are required;
- where rendered RU/EN checks occur;
- where the 23-case migration gate fits;
- where legacy 32-assertion evidence is recorded;
- what exact PASS/FAIL/NOT-RUN evidence must be attached to one frozen candidate SHA;
- which STOP condition aborts the sequence immediately.

Do not duplicate large historical manifests. Reference existing accepted handoffs.

## v69 — handoff

Create:
`mindy-successor/docs/tasks/CHAT6_FINAL_PLAYER_FACING_RELEASE_DRYRUN_v69.md`

Expected:
`BUNDLE_COMPLETE — READY_FOR_FINAL_PLAYER_FACING_RELEASE_DRYRUN`

No production mutation. No full CI. Do not merge main.
