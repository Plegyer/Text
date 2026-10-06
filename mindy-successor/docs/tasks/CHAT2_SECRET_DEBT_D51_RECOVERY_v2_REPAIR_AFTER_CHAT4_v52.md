# CHAT 2 — SECRET DEBT + D51 RECOVERY v2 NARROW REPAIR

Status: **CONTINUE NOW — REPAIR THEN RE-RUN GATES**
Owner: Chat 2
Branch: `chat2/assembly-secret-debt-d51-current-main-recovery-v2`

Keep the SAME Chat 2 conversation. Do not replace/restart it.

Independent QA authority:
`mindy-successor/docs/tasks/CHAT4_QA_SECRET_DEBT_D51_RECOVERY_HEAD_v52.md`

Frozen bad head:
`652a1c394991ba2668179fcbecdf1282fb16ce1c`

Chat4 verified that this recovery tree is structurally full, not sparse. Do not rebuild the branch.

## Required narrow repair A — schema.ts composition

Repair only the malformed Secret Debt splice points in the current schema6 file:
- restore complete existing `addNextDayModifier` object member;
- add `secretDebtAccept` and `secretDebtRefuse` as sibling effect-schema members;
- keep `nextDay` and `secretDebt` as separate capability-write properties with valid syntax;
- define/export `secretDebtStateSchema`, `SecretDebtState`, and `defaultSecretDebtState` as normal top-level declarations;
- keep `legacyCompatSchema` separate.

Do NOT wholesale replace `schema.ts` from historical Secret Debt v12.
Do NOT weaken strict validation.

## Required narrow repair B — Secret Debt localization

Current frozen head has zero Secret Debt localization rows.

Merge by exact key:
- accepted v12 route/action/event/UI/status/title-description localization;
- accepted v27 three ending epilogue rows;
- preserve accepted v27 title/description wording;
- preserve all newer D42/global/current localization rows.

Do NOT wholesale replace `localization.json`.
Do NOT create generic unlock ownership merely to justify localization.

## Re-run gate

After repair:
1. npm run typecheck
2. npm run validate
3. npm run build
4. rerun the full 21-file focused v28 Secret Debt/D51/Night/save/Strong Meta/Palace/localization roster
5. require all focused phases green
6. only then run one full CI
7. freeze exact candidate and report `READY_FOR_LEADER_MERGE`

If any repair requires changing engine/definitions/content/secretDebt pack semantics beyond the narrow blockers above, STOP and report exact conflict for Leader review.

Do not merge main.
