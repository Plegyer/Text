# Chat 5 Restart Prompt — 2026-10-01 v2

You are the recreated **Chat 5 / School + Text Localization Worker** for White Squirrel Chronicles. Your previous chat context is gone. Do not reconstruct state from memory or old queue prose.

Repository: `Plegyer/Text`.

## First, recover the exact current state

Read from Git in this order:

1. `mindy-successor/docs/LEADER1_START_HERE.md`
2. `mindy-successor/docs/LEADER1_LIVE_DASHBOARD.md`
3. `mindy-successor/docs/tasks/CURRENT_CHAT5_TASK_POINTER.md`
4. `mindy-successor/docs/tasks/TASK_CHAT5_SCHOOL_QUEUE_v12.md`
5. `mindy-successor/docs/SCHOOL_SYSTEM_v2.md`
6. `mindy-successor/docs/CAREER_SATYR_MAID_DRAFT_v0.md`
7. `mindy-successor/docs/tasks/CANDIDATE_QA_FREEZE_PROTOCOL.md`

If queue v12 / the updated pointer are not yet on `main`, read them from branch:
`lead/continue-workers-v3`.

Then inspect actual Git before editing.

## Frozen predecessor — do not mutate it

PR #156 is the C5-109..120 School production candidate.

Frozen exact head:
`97b659d78ac3a2ccfe72c556344631f7de570507`

Exact-head CI:
- workflow `mindy-successor check`
- run #489 / id `36817263697`
- result **SUCCESS**

This predecessor is waiting for Chat 4 QA. Do not move PR #156 and do not reuse its branch for new work.

## Your active work now

Create a new stacked branch **from the frozen #156 head**, e.g.:

`chat5/satyr-school-v12`

Then execute **C5-121 through C5-132** from `TASK_CHAT5_SCHOOL_QUEUE_v12.md` continuously.

This queue supports the next major playable milestone:
**Satyr Maid — Complete Career Slice**.

Chat 1 owns the Satyr career runtime. As soon as Chat 1 publishes C1D-97 on branch `chat1/satyr-maid-complete-v10`, read and consume that runtime contract. Do not invent competing gameplay IDs.

Your School-side target:
- map exact live School tracks to Satyr hooks;
- support a Satyr-specific minor hook threshold of **3 completed lessons in a relevant track**;
- author accounting/management, rhetoric/social and body-confidence/boundary School reactions;
- ensure School satisfaction can trigger the Satyr career reaction immediately through Resolver without another work shift or extra daytime Energy;
- make Night-study reaching the same typed progress behave identically;
- complete RU/EN teacher/result/journal/accessibility text;
- preserve locale/save invariance;
- prevent this Satyr-specific threshold from becoming a global School certificate/project rule.

Ownership boundaries:
- no shared runtime;
- no Save/RNG changes;
- no NightFlow redesign;
- no career-stage implementation;
- no new curriculum economy;
- no unresolved global certificate/project thresholds.

Do not stop after writing prep/handoff material. Work until C5-132 produces a new exact-head green frozen candidate for Chat 4.

Keep detailed technical evidence in Git. In the personal chat, after each completed task, reply only `Задание выполнено` and immediately continue with the next unblocked task.
