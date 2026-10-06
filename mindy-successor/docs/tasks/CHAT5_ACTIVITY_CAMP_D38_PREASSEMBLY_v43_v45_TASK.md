# CHAT 5 — ACTIVITY + CAMP + D38 PREASSEMBLY v43-v45

Status: **START NOW**
Owner: Chat 5
Branch: `chat5/activity-camp-d38-preassembly-v43`

Complete ALL tasks in order. No full CI. Do not mutate frozen producers.

Frozen authorities:
- Activity/Restricted Sites baseline: `ab378d68765f7c9bbff43abf3b4b41e24df82e01`
- D38 mechanics: `3cf69d7cb3df1a58d68908159d0acc14736435c4`
- D38 content/presentation: `df9ef5c3d04cfd8eb582c24838d971854e984218`
- D38 reachability audit: `7ae7a9b273f1806ac04b566c318896783bab6595`
- Camp executable-green repair: `efde0a38bf71a8946194402a9fc47abb168f2aff`

This is preassembly/QA only. Chat 2 remains the sole current-main assembly/full-CI lane.

## v43 — cumulative lineage and collision audit
Map the exact ancestry and changed-file surfaces of the frozen Activity, Camp and D38 candidates.
Identify:
- which candidates are cumulative vs parallel;
- shared-file collisions;
- exact selective assembly order;
- any stale whole-file snapshots that must not be copied onto future main.

Do not invent a synthetic combined candidate.

## v44 — exact-head focused executable QA
Where the frozen heads contain a runnable full tree, run exact-head guards plus:
- npm ci;
- typecheck;
- validate;
- build;
- focused Activity;
- Camp persistence/save-reload;
- D38 ending/content/reachability adjacency.

If a head is not structurally runnable or lineages conflict, classify that precisely instead of repairing production.
No full CI.

Preserve:
- Activity entry 2 Energy;
- Field Time 6;
- Camp max 2 field nights;
- Camp never suppresses Secret Debt forced Night;
- no universal Activity XP;
- D38 accepted ending identities/reachability.

## v45 — Chat2 preassembly handoff
Create:
`mindy-successor/docs/tasks/CHAT5_ACTIVITY_CAMP_D38_PREASSEMBLY_v45.md`

Include:
- exact frozen heads and evidence;
- recommended selective assembly order;
- collision map;
- focused test roster;
- save/migration stop conditions;
- any blockers requiring producer repair.

Do not merge main.
Report:
`BUNDLE_COMPLETE — READY_FOR_CHAT2_ACTIVITY_ASSEMBLY_PREP`.
