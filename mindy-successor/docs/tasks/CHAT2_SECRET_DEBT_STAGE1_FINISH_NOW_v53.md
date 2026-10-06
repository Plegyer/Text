# CHAT 2 — SECRET DEBT + D51 STAGE 1 FINISH NOW

Status: **CRITICAL PATH — APPLY EXACT LOCALIZATION RECOVERY, THEN RUN GATES**

Current production branch:
`chat2/assembly-secret-debt-d51-current-main-recovery-v2`

Leader independently compared the live Chat2 localization blob against the frozen accepted v12 + v27 authorities.

Current exact result:
- required Secret Debt localization keys: **37**
- exact matches already present: **9**
- missing: **22**
- present but authority-mismatched: **6**

Machine-readable exact repair manifest:
`mindy-successor/docs/tasks/CHAT2_SECRET_DEBT_LOCALIZATION_EXACT_RECOVERY_v53.json`

Current Chat2 localization blob audited:
`da97ee5773ba0c6d010e22f337d1004a8d4668bf`

Frozen source blobs:
- v12: `c22e4cc9e9ea87615584b13801bb9547f45ccc72`
- v27: `80c1bf3e41c31ca57e7837c3b73c0d6f7e8a66ae`

## Do now

1. Re-fetch the live Chat2 `content/localization.json`.
2. If its blob is still `da97ee5773ba0c6d010e22f337d1004a8d4668bf`, apply the manifest rows by exact key:
   - add every `missing` row;
   - replace every `mismatch` row with the exact expected RU/EN value;
   - leave every unlisted localization key byte-for-byte/semantically preserved.
3. If the localization blob changed, recompute/inspect before applying; do not blindly overwrite.
4. Do **not** wholesale replace `content/localization.json`.
5. Run:
   - `npm run typecheck`
   - `npm run validate`
   - `npm run build`
6. Run the full focused Secret Debt+D51 v28 roster, including v12/v20/v27 localization coverage and Night/save/Strong Meta/Palace adjacency.
7. If any focused check is red, repair only the proven defect and rerun focused gates.
8. Only after focused green run exactly one full CI.
9. Freeze exact candidate SHA and report:
   `READY_FOR_LEADER_MERGE`

Do not merge main.

No more research/prep is required before this repair. This is the production critical path.
