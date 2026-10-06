# CHAT 2 — SECRET DEBT + D51 CURRENT-MAIN RECOVERY v2

Status: **CONTINUE NOW — SAME CHAT WINDOW / BRANCH-TREE REPAIR**
Owner: Chat 2 / sole current-main assembly + full-CI lane

Do NOT replace or restart the Chat 2 conversation. The current window remains authoritative.
Do NOT continue production assembly on the sparse v1 tree.

New full-tree recovery branch:
`chat2/assembly-secret-debt-d51-current-main-recovery-v2`

Recovery base:
`main@a020cdecd1b09bfa6802385084b27a6cbe82b31b`

This main head differs from the exact D42 production merge only by Leader control-plane/docs files; production files are unchanged.

## Confirmed blocker
Independent Leader verification confirms the v1 branch tree is structurally sparse:
- current v1 head `12632711439cec09d776cae33f5a7d5621ddb60b`: 22 tree entries / 11 blobs;
- first bad commit `0463e2a18ba619b3bdf9636b37876c4cbbbd2829`: 5 entries / 2 blobs;
- its D42 parent `358eb404e449364b9c63a3e261e88cf9312baf7c`: 1622 entries / 1564 blobs.

Authority:
`mindy-successor/docs/tasks/CHAT5_SECRET_DEBT_CURRENT_HEAD_GAP_QA_v42.md`

This is a branch-tree recovery defect, not a Secret Debt semantic failure.

## Preserve from v1
Do not discard already-authored work. Selectively replay/port from frozen implementation head `a02d4931087e0884756a6888354b8a69e0327b02` and later v1 history:
- exact `src/core/secretDebt.ts`;
- exact `content/packs/secret-debt.json`;
- Secret Debt schema6 leaves/defaults only;
- Secret Debt capability clauses only;
- three Secret Debt action records;
- three ending records with canonical Strong Meta bindings;
- D51 focused test;
- v27 localization producer test;
- v12 route test, adapted away from stale generic-unlock assertions.

Do NOT copy sparse/historical shared files wholesale over current main:
- no wholesale `schema.ts`;
- no wholesale `content.ts`;
- no wholesale `definitions.json`;
- no wholesale `engine.ts`;
- no wholesale `app.ts`;
- no wholesale `localization.json`.

## Finish on the full current-main tree
Continue the existing Secret Debt + D51 task:
1. compose Secret Debt runtime into current `engine.ts`;
2. compose D51 pair-only Energy floor with provenance tags;
3. preserve D42 forced-Night ownership and priority;
4. compose Secret Debt UI into current `app.ts`;
5. merge v12/v27 localization by key;
6. preserve canonical Strong Meta reward reconciliation;
7. run npm ci + typecheck + validate + build;
8. run the Chat4 v28 / Chat5 v42 focused Secret Debt-D51-Night-save roster;
9. only after focused green, run one full CI;
10. freeze exact candidate and report `READY_FOR_LEADER_MERGE`.

Preserve locked behavior:
- bound ordinary jobs locked;
- School/Activity available;
- Bound Life exactly 50 hidden shifts;
- Takeover explicit;
- hidden wage cap 140;
- D51 floor only for Street -1 + bound-night -1 pair;
- no global Energy floor;
- unrelated later penalties may reduce below 2;
- no auto-ending.

Do not merge main.
