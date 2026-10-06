# CHAT 2 CONTEXT RECOVERY — SECRET DEBT + D51 NARROW REPAIR

Status: **FALLBACK ONLY — USE ONLY IF THE EXISTING CHAT2 WINDOW IS IRRETRIEVABLE**
Date: 2026-10-06
Owner: Chat 2

Do NOT use this to replace a still-live Chat2 conversation.

GitHub branch remains:
`chat2/assembly-secret-debt-d51-current-main-recovery-v2`

Current pointer:
`CONTINUE NOW — SECRET DEBT + D51 NARROW REPAIR`

Read:
1. `CURRENT_CHAT2_TASK_POINTER.md`
2. `CHAT2_SECRET_DEBT_D51_RECOVERY_v2_REPAIR_AFTER_CHAT4_v52.md`
3. `CHAT4_QA_SECRET_DEBT_D51_RECOVERY_HEAD_v52.md`
4. `LEADER1_CHECKPOINT_2026-10-06_LATE.md`
5. `USER_DECISIONS_LOCKED_v1.md`

Then re-query the live branch before changing anything.

Known current state:
- recovery tree is structurally full;
- malformed Secret Debt splice in `src/core/schema.ts` has been repaired;
- remaining confirmed blocker: `content/localization.json` still contains zero `secret-debt` keys and lacks the mandatory Secret Debt ending runtime localization rows;
- no READY_FOR_LEADER_MERGE handoff exists yet.

Required next work:
1. merge accepted Secret Debt v12 + v27 localization by exact key into the current localization file;
2. preserve all newer D42/global/current rows;
3. do not wholesale replace localization;
4. run typecheck/validate/build;
5. run the full focused Secret Debt/D51/Night/save/Strong Meta/Palace/localization roster;
6. only after focused green run one full CI;
7. freeze exact candidate;
8. report `READY_FOR_LEADER_MERGE`.

Do not merge main.
Do not rebuild the branch.
Do not reopen Product decisions.
