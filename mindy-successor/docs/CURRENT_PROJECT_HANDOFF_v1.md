# Current Project Handoff v1

Date: 2026-09-26
Status: DURABLE LEAD RECOVERY SNAPSHOT

This document exists so project state can be reconstructed from Git even if the active chat context is lost.

Git is authoritative. On resume, always inspect the actual current `main`, active branches, open PRs and workflow results before acting on this snapshot.

## 1. Repository and project root

Repository:
`Plegyer/Text`

Project root inside the repository:
`mindy-successor/`

Stable implementation target:
`mindy-successor/prior-work/astra/prototype-m3.2/`

The repository root README is unrelated to this successor project. Use the project-local docs under `mindy-successor/`.

## 2. Mandatory recovery read order

A replacement Lead should read, in order:

1. `mindy-successor/README.md`
2. `mindy-successor/docs/PROJECT_STATE.md`
3. `mindy-successor/docs/DOCUMENT_AUTHORITY_AND_INDEX_v0.md`
4. `mindy-successor/docs/EXECUTABLE_TZ_v1.md`
5. `mindy-successor/docs/PARALLEL_WORK_PROTOCOL_v1.md`
6. `mindy-successor/docs/PARALLEL_WORK_BOARD_v1.md`
7. this file: `mindy-successor/docs/CURRENT_PROJECT_HANDOFF_v1.md`

Then inspect real Git state:
- current `main` HEAD;
- active worker branch heads;
- open PRs;
- latest workflow runs;
- changed files on each branch.

Never reconstruct project state from old chat text when Git disagrees.

## 3. Current main milestone baseline

The latest known coordination/state snapshot before creation of this handoff file is:

`1902ba885fa21a59b0a4ffc9d44dffb4d9a66482`

That commit records Product Acceptance evidence state after PR #21.

Important merged milestones:

### Architecture
- A1–A6 architecture implementation complete.
- Integrated Architecture Migration gate closed through PR #14.
- Real merge-ref check at that gate: **125/125 tests**.

### Phase B presentation
- PR #15 merged central presentation runtime.
- One persistent central media stage.
- Stable semantic `presentationId`.
- GIF primary, static/text fallback.
- Animation-off changes presentation only.
- Merge-ref check: **142/142 tests**.

### School runtime
- PR #17 merged the eight-course School runtime slice.
- Paid School lesson = tuition + 1 current-day Energy exactly once.
- Night study remains a separate Night-slot mechanic.
- Merge-ref check: **149/149 tests**.

### A6 reward identifier
- PR #18 aligned semantic reward IDs such as `hardWork:lumber`.

### Production activation
- PR #20 merged as:
  `9b427d75dc22021cd3373aa7dd3521782e54152d`
- Production activation now ships:
  - target `lumber.shift`;
  - Lumber career / Foreman / Forest / endings;
  - three approved Lumber production event packs;
  - first-class `schoolLesson`;
  - typed School-owned progression;
  - eight paid School courses in UI;
  - target NightFlow lodging / choices;
  - Forest Activity UI entry/actions;
  - semantic slash `presentationId` save/reload;
  - School and Activity presentation slots.
- Merge-ref: typecheck PASS, validate PASS, build PASS, **187/187 tests PASS**.

### Product Acceptance evidence
- PR #21 merged as:
  `e6c32903516d1ba40b9a3ffbf955d5f04783ac25`
- PA harness now uses first-class `schoolLesson`.
- Production-catalog evidence covers:
  - Lumber -> milestone -> professional Foreman;
  - all four seasonal Lumber shift variants;
  - paid School lesson;
  - normal lodging;
  - Foreman Night;
  - Forest Activity mechanics with an explicitly labeled capability accelerator;
  - simultaneous ending eligibility;
  - ordinary play while endings are eligible;
  - Hard Work commitment/completion;
  - exact Meta reward and New Run difference.
- Merge-ref: typecheck PASS, validate PASS, build PASS, **194/194 tests PASS**.

Current durable gate result:
`mindy-successor/docs/qa-prep/PRODUCT_ACCEPTANCE_GATE_RESULT_v1.md`

## 4. Product Acceptance status

Production runtime/integration:
**GREEN**

Full Product Acceptance Slice:
**PARTIAL / NOT CLOSED**

Remaining genuine product-authoring/depth blockers are intentionally not fabricated by tests.

### Blocker A — Old Boundary Token production path

Locked identities:
- item: `old_boundary_token`
- capability: `enter_old_boundary`

Already executable:
- Forest entry gate consumes public capability-shaped fact:
  `lumber.capability.enter-old-boundary`
- Forest Activity entry cost = 2 daytime Energy.
- Activity save/resume/result boundaries work.

Still OPEN:
- production typed item/capability integration;
- actual reachable acquisition source;
- retain/use/consume semantics;
- item-driven Activity action-space change.

Do not invent price, vendor, source event, or automatic consumption.

### Blocker B — School -> Lumber public result

Existing Lumber listener:
`lumber-cross.school-management-return`

Fixture-shaped transport fact currently demonstrated:
`lumber.school.management-ready`

But authoritative School authoring remains OPEN:
- final School-owned management/accounting public result ID;
- exact provider;
- milestone/certificate/project threshold.

Do not promote synthetic action:
`school.lumber-management`

Do not invent a certificate threshold.

### Blocker C — deeper Forest Product Acceptance depth

Current Activity adapter proves architecture and mechanics, but Product Acceptance asks for richer product depth:
- 3 route contexts;
- 3 challenge families;
- season difference;
- meaningful item capability use;
- save/resume;
- distinct success/escape.

Current `counter.v1` Activity does not yet satisfy all product-depth requirements.

### Blocker D — item-dependent Activity action-space

Current Activity command surface is still:
- `advance`
- `escape`

The acceptance requirement that an item capability changes available action/route is not yet production-authored.

## 5. Locked invariants — never reopen silently

### Lumber Hard Work

Ending:
`ending.lumber.hard-work`

Eligibility is ONLY:
`careerCounter(lumber, completed_shifts) >= 50`

There must be NO:
- milestone prerequisite;
- relationship prerequisite;
- School prerequisite;
- Forest prerequisite;
- season prerequisite;
- item prerequisite.

Exact A6 Meta reward:
`hardWork:lumber`

A5 Forest continuation boundary:
exact `activityResult`.

### School

Locked baseline:
- exactly 8 paid courses;
- current locked tuition/stat packages;
- each paid lesson costs 1 current-day Energy;
- no ordinary School Lust gain;
- typed School progress owns `lessons_completed`;
- Night study uses Night slot;
- Night study tuition 0;
- Night study current-day Energy 0;
- Night study +2 to a supported selected stat;
- next-day Energy -1;
- separate `night_study_sessions`;
- final management/Arcana milestone thresholds remain OPEN.

### Presentation

Locked baseline:
- one persistent central media window;
- semantic `presentationId` is gameplay-facing presentation identity;
- GIF is primary dynamic format;
- static/text fallback is non-fatal;
- mechanics do not depend on GIF completion/frame/timing;
- save never stores animation frame/time;
- animation-off changes presentation only;
- user replacement workflow is presentationId/file-picker based, not manual source-path editing.

Canonical shapes include:
- `job/lumber/shift/<season>/default`
- `job/lumber/result/default`
- `school/<track>/lesson/default`
- `ending/lumber/hard-work`

## 6. Current Lead branch

Active Lead branch:
`lead/product-acceptance-closure-v1`

It was created from current main after PR #21 and, at handoff creation time, had no Lead changes yet.

Purpose:
- close only Product Acceptance blockers that are supported by authoritative design;
- do not fabricate unresolved product authoring;
- integrate minimal current worker evidence/contracts;
- move toward release-candidate gate.

Before editing this branch after a context reset, compare it to current main and inspect whether later commits have landed.

## 7. Current worker branches and queues

No-idle rule:
workers must have long queues and continue item -> commit -> next item without waiting for Lead review.

One file = one active owner.

### Chat 2 — Presentation

Branch:
`chat2/presentation-replacement-next`

Task:
`mindy-successor/docs/tasks/TASK_CHAT2_PRESENTATION_REPLACEMENT_NEXT_v1.md`

Known status at handoff:
- items 1–18 completed;
- items 19–24 queued.

Current item group 19–24:
- PA closure presentation dependency audit;
- central-stage interaction regression contract;
- shipped fallback asset integrity manifest;
- replacement bundle vs shipped-catalog conflict matrix;
- post-PR21 presentation smoke matrix;
- presentation release-candidate handoff v2.

### Chat 3 — Lumber

Branch:
`chat3/lumber-production-proof-next`

Task:
`mindy-successor/docs/tasks/TASK_CHAT3_LUMBER_PRODUCTION_PROOF_NEXT_v1.md`

Known status at handoff:
- items 1–12 completed;
- items 13–18 queued and partially progressing.

Current group 13–18:
- PA shipped-row evidence matrix;
- Old Boundary Token authoring packet;
- Forest depth gap-to-spec matrix;
- School -> Lumber public-fact authoring packet;
- PA blocker burn-down;
- Lumber integration handoff.

### Chat 4 — QA

Branch:
`chat4/activation-ci-gate-next`

Task:
`mindy-successor/docs/tasks/TASK_CHAT4_ACTIVATION_CI_GATE_NEXT_v1.md`

Known status at handoff:
- items 1–12 completed;
- items 13–18 queued and progressing.

Current group 13–18:
- PR21 latest-head recheck;
- minimal PA closure plan;
- shipped-flow smoke script;
- no-false-green audit;
- release-candidate delta;
- QA integration handoff.

### Chat 5 — School

Branch:
`chat5/school-pa-gate-next`

Task:
`mindy-successor/docs/tasks/TASK_CHAT5_SCHOOL_PA_GATE_NEXT_v1.md`

Known status at handoff:
- items 1–18 completed;
- items 19–24 queued.

Current group 19–24:
- School PA closure dependency audit;
- School public-fact preflight validator;
- course/track ownership consistency suite;
- School Night production parity;
- School PA no-false-green audit;
- School release-candidate handoff v2.

## 8. Coordination rule

Do NOT wait for workers before doing Lead integration.

When a worker reports completion:
1. verify in Git, not by prose report;
2. check the expected files/commits exist in the correct branch;
3. immediately ensure at least 5–6 tasks remain queued;
4. extend the same branch queue if ownership has not changed;
5. review/integrate asynchronously.

Do not create a new branch after every 2 tasks. Long same-branch queues are preferred.

## 9. Current next Lead actions

After a context reset, the recommended next Lead sequence is:

1. fetch current main and compare `lead/product-acceptance-closure-v1`;
2. verify current worker progress on items 13+ / 19+;
3. read:
   - `PRODUCT_ACCEPTANCE_GATE_RESULT_v1.md`;
   - Chat 3 Old Boundary / Forest / School-public-fact authoring packets when completed;
   - Chat 4 minimal-closure and no-false-green audits when completed;
   - Chat 5 School public-fact preflight when completed;
4. decide which PA blockers can be closed from already-authoritative design without inventing content;
5. implement only those;
6. run full merge-ref `npm run check`;
7. preserve the row-by-row distinction between shipped pass, accelerator evidence and OPEN authoring.

## 10. Important historical mistakes to avoid

- Do not leave worker chats idle while Lead reviews.
- Do not assume a worker's “done” report is correct until Git proves it.
- Do not let a worker accidentally inspect another worker's branch/task.
- Do not treat fixture-only synthetic School content as production.
- Do not count direct worldFact/counter injection as a full PA pass unless explicitly labeled as accelerator evidence.
- Do not weaken save/runtime contracts merely to satisfy stale tests.
- Do not recursively ship all nested fixture packs; production pack inclusion must be explicit.
- Do not change Hard Work eligibility from exactly 50 completed shifts.

## 11. If this document becomes stale

This file is a recovery snapshot, not a substitute for Git.

If branch heads or task items moved:
- trust Git;
- update this file after the next major merged milestone;
- keep `PROJECT_STATE.md` and `PARALLEL_WORK_BOARD_v1.md` synchronized with the actual repository.
