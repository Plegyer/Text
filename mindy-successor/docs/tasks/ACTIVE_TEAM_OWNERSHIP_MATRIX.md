# Active Team Ownership Matrix

## HANDOFF OWNERSHIP — 2026-10-01 11:33+03

Current takeover source:
- `../LEADER1_HANDOFF_CHECKPOINT_2026-10-01.md`.

- **Chat 1 Developer / Integration** — Tavern runtime PR #187 is frozen, CI #682 green, C4-147 PASS-WITH-NOTES. No new runtime queue assigned until Lead chooses the next complete ordinary career.
- **Chat 2 Presentation & Media** — must finalize Tavern presentation C2-155..156 against frozen runtime #187; draft #183 is not the final QA candidate.
- **Chat 3 World + Career Content** — Tavern authored content PR #185 is frozen green and waiting for Chat 4 C4-148.
- **Chat 4 QA + Product Acceptance** — next mandatory gate is C4-144 after the merged Undead runtime main CI; then C4-145, C4-146, Tavern C4-148.
- **Chat 5 School + Text Localization** — Tavern School PR #191 is frozen green and waiting for Chat 4 C4-148. Undead School #181 remains accepted and pending Lead integration before #182.

One file/slice = one active owner remains mandatory.


## LIVE OWNERSHIP — 2026-10-01 10:10+03

This section supersedes older queue ranges below.

- **Chat 1 Developer / Integration** — C1D-121..132, `TASK_CHAT1_DEVELOPER_QUEUE_v12.md`: Tavern complete-career runtime. Owns gameplay/state/integration for Tavern only.
- **Chat 2 Presentation & Media** — C2-145..156, `TASK_CHAT2_PRESENTATION_QUEUE_v14.md`: Tavern presentation/media/accessibility only.
- **Chat 3 World + Career Content Bundles** — C3-157..168, `TASK_CHAT3_CONTENT_QUEUE_v15.md`: Tavern authored production content only. This is an intentional role expansion from Forest/Poverty after PR #180 freeze; it still does not own shared runtime, School mechanics, ending conditions or presentation/media plumbing.
- **Chat 4 QA + Product Acceptance** — C4-138..149, `TASK_CHAT4_QA_QUEUE_v14.md`: exact-head gates, integration-order/collision review and current-main acceptance truth. No production fixes.
- **Chat 5 School + Text Localization** — C5-145..156, `TASK_CHAT5_SCHOOL_QUEUE_v14.md`: Tavern School cross-system content/localization only.

Current frozen candidates waiting for QA/integration:
- #178 Undead runtime;
- #180 Ordinary Poverty v14;
- #181 Undead School;
- #182 Undead presentation;
- previously accepted #174/#175/#172 are in Lead integration follow-up.

One file/slice = one active owner remains mandatory.


## LEADER 1 OWNERSHIP RESET — 2026-10-01

This section supersedes old queue ranges below.

- **Chat 1 Developer** owns C1D-85..96: seven late-career derived unlocks, ordinary Hard Work/Meta and Palace 10/10 unlock seam.
- **Chat 2 Presentation** owns C2-109..120: presentation/media/accessibility coverage for full-roster unlock/Hard Work surfaces and starter career media pools. No gameplay changes.
- **Chat 3 Forest/Poverty Content** owns C3-109..120: promotion of already-safe Forest/ordinary-poverty prepared content into production packs. No shared runtime/School/ending mechanics.
- **Chat 4 QA** owns C4-114..125: open PR disposition, exact-head CI/scope/collision gates and acceptance truth. No production fixes.
- **Chat 5 School Content** owns C5-109..120: promotion of safe School text/teacher/Night-study content into production using existing mechanics. No unresolved milestone/public-result invention.

One file/slice = one active owner remains mandatory.


Status: ACTIVE
Repository: `Plegyer/Text`
Owner: Chat 1 / Lead

Entry point:
- `mindy-successor/docs/tasks/PROJECT_WORK_ENTRYPOINT.md`
- `mindy-successor/docs/tasks/WORKER_CHAT_RECREATION_PROTOCOL_v1.md`

## Coordination model

Chat 1 / Lead is the only coordinator, archive owner, integration-order owner, merge-decision owner, ownership arbiter and CI/PR triage owner.

Five worker chats execute narrow queues under Lead control. Deleted chats are recreated from Git contracts and pointers, not from memory.

Target queue depth:
- 12 useful outstanding tasks per active worker when practical;
- no filler work;
- no self-assignment beyond the active queue.

## Current production priority

1. keep a valid shipped runtime baseline;
2. playable Lumber vertical slice;
3. professions with stages and outcomes;
4. School milestones connected to career progression;
5. Forest/Expedition challenges with meaningful outcomes;
6. poverty depth and alternative-life routes;
7. presentation/localization in parallel;
8. QA on frozen exact heads.

## Worker 1 — Chat 1 Developer / Integration Developer

Queue:
- `TASK_CHAT1_DEVELOPER_QUEUE_v6.md` then `TASK_CHAT1_DEVELOPER_QUEUE_v7.md` then `TASK_CHAT1_DEVELOPER_QUEUE_v8.md`
- C1D-49 through C1D-84.

Owns:
- selective integration of approved worker handoffs;
- Lumber production career integration;
- shared runtime/UI seams required by assigned slices;
- focused integration regressions;
- candidate production PRs.

Historical sources not to restart:
- `chat1/lumber-vertical-slice` remains draft history only;
- baseline repair PR #68 is merged;
- current-main Lumber consolidation PR #84 is merged;
- starter-trio availability PR #97 is merged and is now current-main behavior.

Must not own media asset production, Forest/poverty authoring, School authoring/localization or QA acceptance.

## Worker 2 — Chat 2 / Presentation & Media Worker

Queue:
- `TASK_CHAT2_PRESENTATION_QUEUE_v8.md` then `TASK_CHAT2_PRESENTATION_QUEUE_v9.md`
- C2-73 through C2-96.

Owns project-owned presentation/media sources, presentation IDs/registries/manifests, static/animation fallbacks, presentation-specific accessibility metadata and presentation validators.

Merged/integrated work not to restart:
- PR #64 / old queue 352–363;
- Lumber presentation candidate PR #79, integrated through Lead PR #89;
- starter/School presentation validation PR #88 is merged;
- late-career presentation validation PR #98 is merged.

Must not modify gameplay mechanics, progression, Save/RNG or content canon.

## Worker 3 — Chat 3 / Forest + Poverty Content Bundles Worker

Queue:
- `TASK_CHAT3_CONTENT_QUEUE_v8.md` then `TASK_CHAT3_CONTENT_QUEUE_v9.md`
- C3-73 through C3-96.

Owns ordinary poverty content/localization bundles, Forest/Expedition content hooks and result bundles, explicitly assigned Secret Debt boundary/content preparation, fixtures/collision audits/content regressions and selective-integration handoffs.

Historical/integrated sources not to restart:
- PR #67 / `chat3/ordinary-poverty-depth-refresh-341-352` is historical selective-source material already consumed where approved;
- repaired Forest/poverty candidate PR #82 was integrated through Lead PR #89;
- starter-career/poverty content PR #93 is merged;
- content-depth PR #100 is merged.

Must not own shared runtime/UI integration, Chat 2 media production, Chat 5 School content or QA.

## Worker 4 — Chat 4 / QA + Product Acceptance Gate

Queue:
- `TASK_CHAT4_QA_QUEUE_v10.md` then `TASK_CHAT4_QA_QUEUE_v11.md`
- C4-90 through C4-113.

Owns exact-head PR/CI verification, scope/collision review, runtime/catalog gates, cross-system acceptance and final Lumber product-acceptance gate.

Immediate evidence/candidates:
- use current main and the current worker pointers first;
- merged #84, #85, #88, #89, #90, #93, #97, #98, #99 and #100 are historical accepted integration evidence;
- queue-v5 candidates #106, #109, #108 and #105 are QA-gated and merged;
- PR #114 (Chat 3 C3-60) is QA PASS-WITH-NOTES and merged;
- PR #116 (Chat 2 C2-60) passed C4-80 and is merged;
- PR #118 (Chat 5 C5-60 refresh) passed C4-78 PASS-WITH-NOTES and is merged; PR #113/#115 are superseded source/history;
- PR #125 (Chat 2 C2-72) passed C4-91 and is merged;
- PR #126 (Chat 3 C3-72) passed C4-92 PASS-WITH-NOTES and is merged;
- PR #127 (Chat 5 C5-72) passed C4-93 PASS-WITH-NOTES and is merged;
- PR #124 is Chat 1 C1D-60, exact frozen head green and ready for C4-79; PR #119/#123 are superseded/closed;
- PR #134 is Chat 3 C3-84, exact frozen head green and ready for C4-104;
- PR #132 is Chat 5 C5-84, exact frozen head green and ready for C4-105;
- when dependency-gated, Chat 4 continues independent v8/v9 QA instead of idling.

Must not create duplicate production content.

## Worker 5 — Chat 5 / School + Text Localization Content Worker

Queue:
- `TASK_CHAT5_SCHOOL_QUEUE_v8.md` then `TASK_CHAT5_SCHOOL_QUEUE_v9.md`
- C5-73 through C5-96.

Owns School player-facing content/localization, teacher/milestone/night-study text preparation, RU/EN parity, School-to-career content handoff fixtures and School content-side regressions.

Merged/integrated work not to restart:
- PR #66 / residual localization 193–204;
- repaired School handoff PR #85;
- School depth preparation PR #90 is merged;
- late-career School preparation PR #99 is merged.

Must not create career state, shared runtime architecture, Save fields, NightFlow rules or new curriculum without Lead-approved design.

## Worker communication

Detailed task evidence belongs in Git branches, PRs, checks and handoffs.

Personal chat output is intentionally minimal:
- after one completed task: `Задание выполнено`;
- after rechecking the current pointer/queue and finding no further assigned unblocked work: `Задания выполнены`.

No long worker reports are required unless Leader explicitly asks for one.

## Duplicate-work rule

Before any edit:
1. inspect current task pointer;
2. inspect this ownership matrix;
3. inspect current main;
4. inspect open PRs and named draft branches;
5. do not restart delivered/active work.

One file/slice has one active owner. Cross-role dependencies are reported, not solved by trespassing into another role.
