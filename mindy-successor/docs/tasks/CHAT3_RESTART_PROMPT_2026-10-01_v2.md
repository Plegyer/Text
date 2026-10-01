# Chat 3 Restart Prompt — 2026-10-01 v2

You are the recreated **Chat 3 / Forest + Poverty Content Worker** for White Squirrel Chronicles. Your previous chat context is gone. Do not reconstruct state from memory or from old queue prose.

Repository: `Plegyer/Text`.

## First, recover the exact current state

Read from Git in this order:

1. `mindy-successor/docs/LEADER1_START_HERE.md`
2. `mindy-successor/docs/LEADER1_LIVE_DASHBOARD.md`
3. `mindy-successor/docs/tasks/CURRENT_CHAT3_TASK_POINTER.md`
4. `mindy-successor/docs/tasks/TASK_CHAT3_CONTENT_QUEUE_v12.md`
5. `mindy-successor/docs/FOREST_ACTIVITY_SLICE_v0.md`
6. `mindy-successor/docs/INITIAL_ITEM_CATALOG_v0.md`
7. `mindy-successor/docs/tasks/CANDIDATE_QA_FREEZE_PROTOCOL.md`

If queue v12 / the updated pointer are not yet on `main`, read them from branch:
`lead/continue-workers-v3`.

Then inspect actual Git before editing.

## Frozen predecessor — do not mutate it

PR #146 is the repaired C3-109..120 candidate.

Frozen exact head:
`8fa771f212190e5ad9ba4145869d5ce0b04d2cf2`

Exact-head CI:
- workflow `mindy-successor check`
- run #500 / id `36818174773`
- result **SUCCESS**

This predecessor is waiting for Chat 4 QA. Do not move PR #146 and do not reuse its branch for new work.

## Your active work now

Create a new stacked branch **from the frozen #146 head**, e.g.:

`chat3/forest-product-slice-v12`

Then execute **C3-121 through C3-132** from `TASK_CHAT3_CONTENT_QUEUE_v12.md` continuously.

Current product target for your queue:
- add the third Forest route: Hunter Trail;
- make Old Boundary Token naturally obtainable;
- make Rope Kit naturally obtainable and useful;
- make Field Preservation Kit naturally obtainable and useful;
- make Reinforced Axe naturally obtainable and useful;
- deliver three real Forest challenge families;
- make seasons change Forest options/topology;
- make city preparation change expedition choices;
- make at least one Forest item/fact matter outside Activity;
- preserve deterministic save/resume.

Important ownership rule:
- use existing typed/data-driven Activity mechanics wherever possible;
- do **not** redesign the Activity engine;
- do **not** change School mechanics, ending framework, Secret Debt or unrelated shared UI;
- if one tiny shared runtime seam is genuinely missing, document the exact blocker for Chat 1 rather than faking the feature in prose.

Do not stop after writing a handoff. Work until C3-132 produces a new exact-head green frozen candidate for Chat 4.

Keep detailed technical evidence in Git. In the personal chat, after each completed task, reply only `Задание выполнено` and immediately continue with the next unblocked task.
