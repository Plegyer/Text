# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — LARGE ACTIVITY / GAME-WITHIN-THE-GAME FULL-SCOPE v8**
Owner: Chat 3

Accepted prior research:
`chat3/live-economy-affordability-harness-v7@7d9daa6f1faa69d42d5fbaa56e683a35aac447b0`

Disposition:
- live executable economy is viable under diversified cheap-lodging play without mandatory Meta;
- one-career play remains economically tight;
- D31 has real wage cost;
- normal lodging dominance gap is now resolved at Product level by D35 private-space semantics;
- no wage compensation was authorized.

## New assignment

Close the major remaining Product gap around the **Large Activity as a real second game mode**.

New branch:
`chat3/large-activity-full-scope-v8`

Read:
- `LARGE_ACTIVITY_PRODUCT_ROLE_v0.md`;
- `FOREST_ACTIVITY_SLICE_v0.md`;
- `NIGHT_AND_ACTIVITY_CONTRACT_v1.md`;
- current `content/definitions.json`;
- Lumber / Hunter / Assassin / Guard / Merchant career drafts;
- relationship, items and School cross-system docs;
- D4, D7, D8, D16, D26 and current Product blocker index.

Current executable activities include:
- `lumber.forest`;
- `hunter.expedition`;
- `assassin.infiltration`.

Do not confuse infrastructure existence with finished 1.0 scope.

## Deliverables

Create:
1. `mindy-successor/docs/tasks/CHAT3_LARGE_ACTIVITY_FULL_SCOPE_v8.md`
2. `mindy-successor/research/large_activity_scope_matrix_v1.csv`

The packet must compare **3-region vs 4-region vs 5-region** 1.0 structures and recommend one exact target.

For the recommended structure define at minimum:

1. exact region count;
2. region identity/function without final lore prose;
3. which regions are available early/mid/late;
4. how 160-day pacing prevents Activity from becoming a separate grind;
5. entry Energy policy;
6. internal resource model;
7. exploration/navigation layer;
8. challenge/stat/equipment layer;
9. at least 2–3 specialized mini-game families across the full Activity umbrella;
10. save/resume and deterministic reload boundaries;
11. success / escape / failure consequences;
12. seasonal differences;
13. city preparation -> Activity feedback;
14. Activity result -> career/relationship/School feedback;
15. item/capability hooks;
16. relationship companion/contact hooks;
17. camp policy and when city Night is replaced by field camp;
18. Secret Debt compatibility;
19. Palace compatibility;
20. standalone Activity ending-family requirement;
21. how Activity contributes to complex ordinary-career endings without becoming mandatory for every Hard Work;
22. production content budget per region;
23. minimum presentation/media budget;
24. acceptance tests and milestone plan.

Explicitly answer the user's product question:
**what makes this feel like a game inside the game rather than another event menu?**

Audit current three executable activities against that bar and classify each as:
- infrastructure only;
- vertical slice;
- production-ready;
- missing major depth.

Do not invent a universal combat system unless the evidence actually requires it.
Do not make Activity mandatory for all careers.
No production runtime/content changes.
No full CI.

Freeze exact SHA and report:
`READY_FOR_LEADER_PRODUCT_DECISION`.
