# CURRENT CHAT2 TASK POINTER

Status: **RUN NOW — STAGE 1 FINAL REPAIR + GATES**
Owner: Chat 2 / sole production assembly + full-CI lane

Keep the current Chat2 conversation if it is still available.
Do not rebuild the recovery branch.

Branch:
`chat2/assembly-secret-debt-d51-current-main-recovery-v2`

Read first:
`mindy-successor/docs/tasks/CHAT2_SECRET_DEBT_STAGE1_FINISH_NOW_v53.md`

Exact localization repair manifest:
`mindy-successor/docs/tasks/CHAT2_SECRET_DEBT_LOCALIZATION_EXACT_RECOVERY_v53.json`

Leader audit found:
- 37 required Secret Debt localization keys;
- 9 exact matches;
- 22 missing;
- 6 authority mismatches.

Apply exact-key repair only, preserve all unlisted current localization.

Then immediately:
typecheck -> validate -> build -> full focused v28 roster -> exactly one full CI.

If all green, freeze exact SHA and report:
`READY_FOR_LEADER_MERGE`

Do not merge main.
