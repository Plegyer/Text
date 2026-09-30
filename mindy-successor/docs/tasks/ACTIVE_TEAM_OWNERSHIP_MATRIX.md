# Active Team Ownership Matrix

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
- `TASK_CHAT1_DEVELOPER_QUEUE_v5.md`
- C1D-37 through C1D-48.

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
- `TASK_CHAT2_PRESENTATION_QUEUE_v5.md`
- C2-37 through C2-48.

Owns project-owned presentation/media sources, presentation IDs/registries/manifests, static/animation fallbacks, presentation-specific accessibility metadata and presentation validators.

Merged/integrated work not to restart:
- PR #64 / old queue 352–363;
- Lumber presentation candidate PR #79, integrated through Lead PR #89;
- starter/School presentation validation PR #88 is merged;
- late-career presentation validation PR #98 is merged.

Must not modify gameplay mechanics, progression, Save/RNG or content canon.

## Worker 3 — Chat 3 / Forest + Poverty Content Bundles Worker

Queue:
- `TASK_CHAT3_CONTENT_QUEUE_v5.md`
- C3-37 through C3-48.

Owns ordinary poverty content/localization bundles, Forest/Expedition content hooks and result bundles, explicitly assigned Secret Debt boundary/content preparation, fixtures/collision audits/content regressions and selective-integration handoffs.

Historical/integrated sources not to restart:
- PR #67 / `chat3/ordinary-poverty-depth-refresh-341-352` is historical selective-source material already consumed where approved;
- repaired Forest/poverty candidate PR #82 was integrated through Lead PR #89;
- starter-career/poverty content PR #93 is merged;
- content-depth PR #100 is merged.

Must not own shared runtime/UI integration, Chat 2 media production, Chat 5 School content or QA.

## Worker 4 — Chat 4 / QA + Product Acceptance Gate

Queue:
- `TASK_CHAT4_QA_QUEUE_v6.md`
- C4-42 through C4-53.

Owns exact-head PR/CI verification, scope/collision review, runtime/catalog gates, cross-system acceptance and final Lumber product-acceptance gate.

Immediate evidence/candidates:
- use current main and the current worker pointers first;
- merged #84, #85, #88, #89, #90, #93, #97, #98, #99 and #100 are historical accepted integration evidence;
- gate only still-open/new frozen candidates named by the active QA queue.

Must not create duplicate production content.

## Worker 5 — Chat 5 / School + Text Localization Content Worker

Queue:
- `TASK_CHAT5_SCHOOL_QUEUE_v5.md`
- C5-37 through C5-48.

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
