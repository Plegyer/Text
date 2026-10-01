# CURRENT CHAT5 TASK POINTER

Status: **FINISH SATYR SCHOOL v12, THEN UNDEAD SCHOOL v13**
Owner: Chat 5 / School + Text Localization Worker

Current clean candidate:
- PR #172 — Satyr Maid School cross-system slice.
- historical PR #161 is superseded/closed; do not use it.

Current repair rule:
- save/reload tests must compare semantic state, not raw JSON property insertion order;
- do not change Save/runtime merely to preserve JSON key ordering.

Finish C5-132:
1. require full exact-head repository CI green on the final #172 head;
2. mark/freeze the clean candidate for Chat 4;
3. do not move it after QA starts.

Then immediately continue on a new branch with:
- `TASK_CHAT5_SCHOOL_QUEUE_v13.md`
- C5-133..144
- target: **Undead Farm School Cross-System Slice**.

Authoritative gameplay identity source:
- `UNDEAD_FARM_RUNTIME_CONTRACT_v1.json` on Chat 1 v11.
- Arcana local hook: 3 lessons -> `undead-farm.school.arcana-research`.
- Literacy & Numbers local hook: 3 lessons -> `undead-farm.school.management-records`.

Do not invent global School certificate/project thresholds or change shared runtime.
