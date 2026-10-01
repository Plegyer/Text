# Current Project Handoff v1

## LEADER 1 RECOVERY UPDATE — 2026-10-01

This section supersedes older live-status/worker-queue sections below wherever they conflict.

Current audited authority:
- `docs/LEAD1_CURRENT_STATE_v1.md`

Verified pre-update main:
- `6afc01061646bc52cec824863bf89e8ad8c309d0`
- CI #417 / run 36809189373: SUCCESS
- 556/556 tests PASS
- 17 production packs / 46 events / 35 actions / 9 endings

Product reports all worker chats idle. Chats 1, 2 and 4 have exhausted chat context and must restart from the new Git restart prompts. Chats 3 and 5 receive new queues immediately.

Current assignments:
- Chat 1: C1D-85..96 — late-career derived unlocks, ordinary Hard Work/Meta, Palace 10/10 seam.
- Chat 2: C2-109..120 — full-roster/Hard-Work presentation production coverage.
- Chat 3: C3-109..120 — promote safe Forest/ordinary-poverty prepared material to production.
- Chat 4: C4-114..125 — clear open/frozen PR backlog and refresh acceptance truth.
- Chat 5: C5-109..120 — promote safe School prepared writing to production.

Do not infer worker activity from old queue prose below.


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

The latest known coordination/state snapshot is:

`011572ef1335deda5ac33120c3a7ea7f9849dbbf`

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


## 12. Superseding update — PR #22

This section supersedes stale PR21-era blocker descriptions above wherever they conflict.

Current main milestone:
`011572ef1335deda5ac33120c3a7ea7f9849dbbf`

PR #22 merged:
- typed production item definitions and generic inventory-derived item capabilities;
- capability-aware Activity option/action-space;
- route persistence and one-shot option persistence;
- legacy active Activity behavioral compatibility through option-model versioning;
- general 2-Energy Forest entry;
- normal logging-road route;
- capability-gated old-boundary route;
- UI route option controls;
- updated Product Acceptance evidence.

Merge-ref:
- typecheck PASS;
- validate PASS;
- build PASS;
- **200/200 tests PASS**.

### PA blocker status after PR22

No longer runtime blockers:
- generic item definition/capability registry;
- capability evaluation from inventory;
- item-driven Activity action-space mechanism;
- general Forest entry;
- route selection and reload persistence.

Still genuinely OPEN:
1. reachable `old_boundary_token` acquisition source;
2. final retain/consume semantics for the token;
3. School management/accounting public result provider + threshold;
4. School Arcana/Forest public result provider + threshold where required;
5. hunter-trail final clue/capability identity if not otherwise locked;
6. full Forest 3-route / 3-challenge / seasonal topology content depth.

Do not count seeded inventory as a full PA09 pass.

### Current worker queues

Chat 2:
- branch `chat2/presentation-replacement-next`
- items 1–30 completed;
- items 31–36 active.

Chat 3:
- branch `chat3/lumber-production-proof-next`
- items 1–24 completed;
- items 25–30 active.

Chat 4:
- branch `chat4/activation-ci-gate-next`
- items 1–24 completed;
- items 25–30 active.

Chat 5:
- branch `chat5/school-pa-gate-next`
- items 1–24 completed;
- items 25–30 active.

### Next Lead phase

PR #22 is merged. Do not resume work on the closed `lead/product-acceptance-closure-v1` branch.

Create a new branch from current main for release-candidate integration and:
1. integrate only minimal non-redundant worker tests/docs;
2. run the longest fully shipped E2E path;
3. preserve OPEN authoring decisions instead of guessing;
4. prepare the exact human/product decisions needed to close the remaining PA rows;
5. run full merge-ref check again before merge.


## 13. Superseding update — PR #23

Current RC regression milestone:
`e12665ce9063689400d8f39f893378f6f01911f3`

PR #23 merged only QA/fixture coverage for the already-merged PR #22 capability/Activity-option runtime.

Merge-ref:
- typecheck PASS;
- validate PASS;
- build PASS;
- **208/208 tests PASS**.

Integrated RC QA now locks:
- inventory-derived capability semantics;
- worldFact is not item ownership;
- multi-provider capability deduplication;
- unknown capability validation;
- capability-aware authored Activity options;
- route/used-option reload identity;
- duplicate-option rejection;
- advance/escape continuity after route selection;
- capability removal when provider inventory is gone.

No runtime/content/UI production change was made in PR #23.

### Current worker queue snapshot

Chat 2:
- `chat2/presentation-replacement-next`
- items 31–36 active.

Chat 3:
- `chat3/lumber-production-proof-next`
- items 25–30 active.

Chat 4:
- `chat4/activation-ci-gate-next`
- items 25–30 active.

Chat 5:
- `chat5/school-pa-gate-next`
- items 25–30 active.
- At this snapshot Git confirms item 25 only; do not mark 26–30 complete until their commits/files appear.

### Lead next step

Start the next release-candidate integration/smoke branch from current main.
Integrate only post-PR22 worker artifacts whose assumptions match the merged capability model.
Do not integrate pre-PR22 tests that claim item-capability runtime is absent.


## 14. Superseding update — PR #24

PR #24 merged to main:
`9aa0eaf964735e82b9b964bbdcaf5362c292868a`

Release-candidate regression floor:
- typecheck PASS;
- validate PASS;
- build PASS;
- **209/209 tests PASS**.

The merged one-Save shipped path is:

`Lumber shift -> career milestone -> professional Foreman -> Arcana School lesson -> base.school/listen -> NightFlow -> normal lodging -> Foreman Night -> Forest logging-road -> Forest success -> Lumber continuation -> completed_shifts 49 accelerator -> real 50th shift -> Hard Work eligible -> commit -> complete -> reload/retry -> New Run -> reload`

Only direct state accelerator:
`completed_shifts=49`.

Important:
- Hard Work is explicitly absent at 49.
- No School public fact is injected.
- No Old Boundary Token/capability is injected.
- No Forest success fact is injected.
- No ending eligibility or reward is injected.
- Resolving `base.school` does not repeat tuition, Energy or typed lesson progress.

### Stale worker evidence warning

Chat 4 `PR24_ONE_SAVE_E2E_REVIEW_v1.md` reviewed the old failing PR24 head and therefore reports a School-pending blocker that is now fixed.

Chat 2 `presentation-pr24-one-save-audit.test.ts` was also authored before the final School blocking-scene transition was added.

Do not integrate those early PR24 artifacts as final evidence without a post-merge reconciliation.

### Remaining product decisions

Still OPEN:
- Old Boundary Token acquisition source;
- token retain/consume semantics;
- hunter-trail final clue/capability identity if unresolved;
- School management/accounting public result provider/threshold;
- School Arcana/Forest public result provider/threshold;
- full Forest 3-route / 3-challenge / season content depth.

Git remains authoritative.


## 15. Superseding update — PR #25

PR #25 merged:
`961208ea995ca034e8dfe896337a38828db52415`

Final technical RC gate evidence:
- typecheck PASS;
- validate PASS;
- build PASS;
- **218/218 tests PASS**.

PR #25 changed only QA/fixture files.

It locks:
- exact `ending.lumber.hard-work` condition;
- exact `hardWork:lumber`;
- inventory-derived item capabilities;
- pre-option schema4 Activity behavior;
- one-Save RC behavior;
- real School blocking-scene before NightFlow;
- blocking-scene save/reload and no duplicate School charge/progress;
- ending exactly-once transaction;
- New Run Meta reload.

### Current status after PR25

Technical release-candidate gate:
**GREEN**

Still OPEN by product decision/content authoring:
1. Old Boundary Token acquisition source;
2. token retained/consumed policy;
3. hunter-trail final clue/capability identity if unresolved;
4. School management/accounting public-result provider/threshold;
5. School Arcana/Forest public-result provider/threshold;
6. full Forest route/challenge/season content depth;
7. non-blocking future GIF/art polish.

Do not convert any of these into runtime assumptions without explicit authoring decisions.

### Active worker queues

- Chat 2: items 49–54 on `chat2/presentation-replacement-next`.
- Chat 3: items 37–42 on `chat3/lumber-production-proof-next`.
- Chat 4: items 37–42 on `chat4/activation-ci-gate-next`.
- Chat 5: items 37–42 on `chat5/school-pa-gate-next`.

### Next Lead phase

Start a clean branch from current main to consolidate only:
- post-PR25 worker evidence that matches merged main;
- human/product decisions still required;
- final content-depth backlog;
- release-candidate closeout documentation.

Do not reopen already-green runtime architecture.


## 16. Superseding update — PR #26 / PR #27

### PR #26

Docs-only closeout merged:
`4c86946167bf424665a499875c597afeb340ab8f`

Current decision/status authorities:
- `qa-prep/RC_CLOSEOUT_STATUS_v1.md`
- `qa-prep/RC_HUMAN_DECISIONS_REQUIRED_v1.md`
- `lumber-prep/OLD_BOUNDARY_TOKEN_PRODUCT_DECISION_IMPACT_v1.md`
- `lumber-prep/LUMBER_FINAL_RC_ACCEPTANCE_MATRIX_v1.md`
- `school-prep/SCHOOL_AUTHORING_DECISION_READY_PACKET_v1.md`
- `presentation-prep/PRESENTATION_RC_EVIDENCE_PACK_v1.md`

### PR #27

Merged technical QA hardening:
`6cd990f45d368291b4a288f9f48c569f6e0b207f`

Latest full merge-ref:
- typecheck PASS;
- validate PASS;
- build PASS;
- **221/221 tests PASS**.

New direct compatibility locks:
- missing schema4 `progression.school` parses as `{tracks:{}}` with unrelated state preserved;
- missing pending/action `presentationId` remains mechanically valid;
- final one-Save drift sentinel v2 tracks Lumber, Foreman, School, Night, Forest, ending, Meta and New Run reload in one state history.

No production runtime/content/UI changed in PR #27.

### Current worker progress at this snapshot

- Chat 2: items 49–51 committed; 52–54 active on `chat2/presentation-replacement-next`.
- Chat 3: items 49–54 queued after completing 43–48 on `chat3/lumber-production-proof-next`.
- Chat 4: items 43–48 queued after completing 37–42 on `chat4/activation-ci-gate-next`.
- Chat 5: items 37–41 committed; 42 active on `chat5/school-pa-gate-next`.

### Current phase

Technical RC:
**GREEN — 221/221**

Remaining work:
- explicit Product/human decisions;
- Forest content depth;
- optional presentation/art polish;
- additive QA only where it hardens already-green contracts.

Do not reopen Hard Work, School baseline, generic item capability or presentation timing contracts without a demonstrated defect.


## 17. Live continuity update — full-game production-authoring phase

This is a live recovery update, not a final handoff. Git remains authoritative.

### Current main / technical floor

Current coordination main after the latest board sync:
- board sync commit: `b218f5f341ffb174067ed9559e6a5ad4b873add2`;
- technical RC floor remains PR #27 / `6cd990f45d368291b4a288f9f48c569f6e0b207f`;
- full technical check at that floor: **221/221 PASS**;
- later main changes are coordination/docs only.

### What game is being built

This project is the full successor game, not a Lumber-only demo.

The target product includes:
- 10 ordinary/public careers;
- Palace as a hidden/meta career unlocked only by Hard Work on all 10 ordinary careers;
- ordinary poverty/housing with normal room / cheap lodging / street recovery;
- a separate Secret Debt/Slave hidden career triggered from street poverty, with delayed debt trap, ordinary-job blocking, forced Night component and three required outcome families: `paid_freedom`, `bound_life`, `takeover`;
- School as a progression system, not a stat shop;
- typed NPC relationships;
- NightFlow;
- items/capabilities;
- expedition-style large Activity, with Forest as the first authored slice;
- endings and Meta progression;
- 160-day runs, 12 progression stats plus separate Lust axis;
- GIF-first central presentation.

Lumber is the first fully exercised reference career used to validate architecture and cross-system behavior. Do not narrow overall project scope to Lumber.

### Visual production model

The presentation baseline is intentionally lightweight and media-replaceable:
- animated GIF is the primary production format;
- one persistent central media window;
- stable semantic `presentationId`;
- GIF/static/text fallback chain;
- gameplay never depends on GIF frames, timing or completion;
- animation-off affects presentation only;
- save does not store animation frame/time;
- GIFs may be reused across content variants where gameplay identity remains distinct.

This matters for production estimates: the project does not assume a conventional bespoke animation pipeline for every scene.

### Locked invariants that must survive all future work

Lumber Hard Work:
- ending: `ending.lumber.hard-work`;
- ONLY eligibility condition: `completed_shifts >= 50`;
- exact reward: `hardWork:lumber`;
- no School, Forest, item, relationship, season, Night or milestone prerequisite.

Forest -> Lumber continuation:
- exact A5 boundary: `activityResult`.

Palace:
- unlock requires Hard Work on all 10 ordinary careers;
- Secret Debt/Slave does not count toward the 10/10 prerequisite.

School:
- exactly eight paid courses;
- locked tuition/stat packages;
- one current-day Energy per paid lesson;
- no ordinary Lust gain;
- paid lesson increments only `lessons_completed`;
- Night study increments only `night_study_sessions`;
- Night study uses Night slot, costs zero tuition/current-day Energy, grants +2 to supported selected stat, and applies next-day Energy -1;
- management/accounting and Arcana/Forest public-result authoring remain Product-owned until explicitly decided.

### Current worker branches and active queues

All four previous queues were rechecked in Git and are complete. Each worker immediately received six more tasks in the same branch.

Chat 2 — presentation/GIF production:
- branch: `chat2/presentation-replacement-next`;
- active items: **61–66**;
- task file: `docs/tasks/TASK_CHAT2_PRESENTATION_REPLACEMENT_NEXT_v1.md`;
- queue commit: `bfa4e5b8b0e27b4147e6380e1e094fe9d2cdcf0c`;
- current focus: full-roster GIF coverage, poverty/Secret Debt presentation flow, GIF reuse taxonomy, full-game presentationId template, asset dependency matrix.

Chat 3 — Forest + poverty/Secret Debt:
- branch: `chat3/lumber-production-proof-next`;
- active items: **55–60**;
- task file: `docs/tasks/TASK_CHAT3_LUMBER_PRODUCTION_PROOF_NEXT_v1.md`;
- queue commit: `a67aca7e32f7d9193cb4671c851445d9b5dc8655`;
- current focus: ordinary poverty readiness, Secret Debt state machine, cross-system dependencies, outcome acceptance, Forest/poverty coexistence.

Chat 4 — QA/full product-scope preservation:
- branch: `chat4/activation-ci-gate-next`;
- active items: **49–54**;
- task file: `docs/tasks/TASK_CHAT4_ACTIVATION_CI_GATE_NEXT_v1.md`;
- queue commit: `d139b3b88563f88e08dcd936d684a87a5f132c30`;
- current focus: full-scope audit, starter trio readiness, remaining-seven readiness, poverty QA and GIF-first full-game guardrails.

Chat 5 — School production authoring:
- branch: `chat5/school-pa-gate-next`;
- active items: **49–54**;
- task file: `docs/tasks/TASK_CHAT5_SCHOOL_PA_GATE_NEXT_v1.md`;
- queue commit: `d6b407608d2a347ab9fee99a52fe6ac1a30891ba`;
- current focus: eight-track teacher authoring structure, milestone choices, public-result publication contract, reusable content unit, School-to-career integration inventory.

### Lead operating rule

Do not wait for all workers before reviewing/integrating useful completed work. When a worker finishes:
1. verify expected artifacts in Git;
2. review ownership and locked invariants;
3. immediately append the next six independent tasks in the same branch when ownership remains compatible;
4. integrate useful compatible work asynchronously;
5. update live board and this recovery snapshot after meaningful phase changes.

Do not create a final transfer document merely because context may eventually expire. Keep these durable Git documents current so a replacement Lead can recover at any time.


## 18. Live queue-policy update — nine-deep worker queues

This is a live continuity update, not a final transfer.

User-directed worker queue policy now targets **9 independent outstanding tasks per worker whenever practical**. This supersedes earlier six-deep queue guidance.

Authoritative protocol update:
- `PARALLEL_WORK_PROTOCOL_v1.md`;
- policy commit: `562515ca04c574987066b6724e2306223c6f2e7f`.

Latest board recheck/update:
- `PARALLEL_WORK_BOARD_v1.md`;
- board commit: `5e2b49be2ee7256c6e27562145a489754bb547b3`.

Current active ranges:
- Chat 2 / `chat2/presentation-replacement-next`: **61–69**.
- Chat 3 / `chat3/lumber-production-proof-next`: **55–63**.
- Chat 4 / `chat4/activation-ci-gate-next`: **49–57**.
- Chat 5 / `chat5/school-pa-gate-next`: **49–57**.

At the recheck immediately before topping up to nine, none of the newly assigned six-item production queues had yet produced their expected output files. Their previously reported prior queues had already been verified complete. Therefore the current ranges above are active work, not stale completed work.

When any worker reports completion, verify exact expected files/commits in Git and then immediately provide the next nine independent tasks (or top the outstanding queue back to nine) while preserving one-file-one-active-owner.


## 19. Live milestone — PR28 authority integration and replenished queues

This remains a live recovery snapshot, not a final transfer.

### PR #28

Merged:
`fb866bc95c3b4998693c48b66a21b8a3f8d900f8`

Purpose:
- integrate the current verified Presentation/Lumber/Forest/QA/School post-RC authority documents from worker branches into main;
- make current recovery references self-contained on main;
- keep Product decisions neutral and preserve full-game scope.

Changed only documentation/authority files. No production runtime/content/UI changed.

Technical RC remains:
- PR #27;
- `6cd990f45d368291b4a288f9f48c569f6e0b207f`;
- **221/221 PASS**.

### Nine-deep queue progress

The first item in each full-game production queue was verified complete in Git:
- Chat 2 item 61;
- Chat 3 item 55;
- Chat 4 item 49;
- Chat 5 item 49.

Lead immediately replenished to nine outstanding tasks.

Current active ranges:
- Chat 2 — `chat2/presentation-replacement-next`: **62–70**.
- Chat 3 — `chat3/lumber-production-proof-next`: **56–64**.
- Chat 4 — `chat4/activation-ci-gate-next`: **50–58**.
- Chat 5 — `chat5/school-pa-gate-next`: **50–58**.

Latest queue top-up commits:
- Chat 2: `ad33aa2ca5eaf844eb8abe1a0a9de5eedda56536`;
- Chat 3: `b35ded8d812ed0a744344d0bbe2e964f1d7a6ed6`;
- Chat 4: `1c1fcaf99600f8a60dfd6fdad39822643b9e855f`;
- Chat 5: `1cca3df8e376af8cd6319ab5c38e27ea3147feb9`.

Do not wait for a worker to empty all nine items. Whenever a completed item is verified and fewer than nine useful independent tasks remain, top the queue back up to nine while respecting one-file-one-active-owner.


## 20. Live milestone — PR30 production wave 1

This is a live recovery update, not a final transfer.

Merged PR #30:
`dbe78efdb9cd5ed384b66f7536bb5145702779c7`

It integrates the first completed full-game production-authoring wave into main as docs/authority only:
- full-roster GIF coverage and presentation continuity;
- ordinary poverty implementation readiness;
- poverty/Secret Debt production handoff;
- full-product scope preservation;
- next-phase QA handoff;
- eight-track School teacher authoring matrix;
- School production continuity.

Technical RC remains unchanged at PR #27 / **221/221 PASS**.

Lead PR #29 is still open and intentionally unmerged until independent QA review:
- branch: `lead/poverty-production-contract-v1`;
- one added test: `tests/poverty-production-contract.test.ts`;
- purpose: lock the already-shipped zero-money street anti-softlock path without locking OPEN balance numbers;
- GitHub connector exposes no automated workflow run for the PR head, so do not claim a new full-suite pass until separate validation exists.

Current active worker ranges after further verified completion and queue replenishment:
- Chat 2: **68–76**;
- Chat 3: **62–70**;
- Chat 4: **56–64**;
- Chat 5: **56–64**.

Queue target remains nine outstanding independent tasks whenever practical.


## 21. Live recovery — stream interruption checkpoint

This is a live continuity note, not a final transfer.

After a Chat 1 HTTP/UI stream interruption, Git was re-read before retrying any write. No repository corruption or duplicate main integration was found.

Current nine-deep worker ranges:
- Chat 2: **77–85**;
- Chat 3: **72–80**;
- Chat 4: **66–74**;
- Chat 5: **73–81**.

PR #29:
- OPEN, mergeable;
- independent Chat 4 content review = GREEN_FOR_MERGE;
- no executable GitHub workflow result is attached/visible for the exact head through the connected integration;
- do not promote the technical pass floor beyond PR #27's 221/221 solely because of PR29 review.

PR #30 remains the latest merged production-authority PR:
`dbe78efdb9cd5ed384b66f7536bb5145702779c7`.

Continue normal Lead operation: verify Git, top queues back to nine, integrate minimal useful subsets, and keep human/Product decisions separate from technical inference.


## 22. Live milestone — CI-enabled production and starter trio

This is a live recovery snapshot, not a final transfer.

### Automated full-check CI

GitHub Actions is now part of main:
- workflow: `.github/workflows/mindy-successor-check.yml`;
- PR #31 merge: `ed92f1f2067d1208446a961af4ba801a25e5b940`;
- exact-head pull-request validation is now available for production integrations.

### New production milestones

PR #33:
- merge: `e36cc1aaa44991d3340276b4f82efa5c9d9cf15a`;
- test-only poverty anti-softlock production contract;
- exact-head CI: **223/223 PASS**;
- old PR #29 was closed as superseded.

PR #34:
- merge: `712ab6c7368ab21906f3fcb0184b35d4f3e1411c`;
- first target production layer for Satyr Maid and Undead Farm;
- exact-head CI: **227/227 PASS**;
- current main push CI after merge: SUCCESS.

After PR #34 all three starter careers have target repeatable shift coverage:
- Lumber;
- Satyr Maid;
- Undead Farm.

Satyr Maid / Undead Farm Hard Work thresholds, endings and exact Meta rewards are still NOT authored/locked and must not be guessed.

### Current worker queues

- Chat 2: items **89–97**.
- Chat 3: items **87–95**.
- Chat 4: items **78–86**.
- Chat 5: items **73 + 82–89**.

Each worker currently has nine outstanding items. Long-lived worker branches are behind current main; selectively integrate completed files onto fresh Lead branches rather than merging entire worker history.

### Current execution direction

Work has moved from RC-preparation into actual full-game production:
- Chat 3 is building real ordinary-poverty content packs/tests;
- Chat 5 is authoring concrete School teachers/text/presentation briefs;
- Chat 2 is preparing media/GIF-ready manifests and draft bundles;
- Chat 4 is providing independent production/CI review;
- Lead continues target career implementation and integration on fresh current-main branches.


## 23. Live production update — completed wave and 3–5 GIF pools

This is a live recovery update, not a final transfer.

All previous worker queues were verified complete in Git:
- Chat 2: 89–97;
- Chat 3: 87–95;
- Chat 4: 78–86;
- Chat 5: 73 and 82–89.

Current nine-deep queues:
- Chat 2: **98–106**;
- Chat 3: **96–104**;
- Chat 4: **87–95**;
- Chat 5: **90–98**.

Important presentation clarification from Product:
**one gameplay event may own 3–5 GIF/media variants** so repeated actions/events do not become visually monotonous.

Interpretation:
- one gameplay identity;
- one semantic `presentationId`;
- multiple visual candidates/pool beneath it;
- candidate selection is presentation-only;
- no change to mechanics, effects, choices, timing, save state or eligibility;
- fallback remains mandatory;
- gameplay event variants and media variants are separate concepts.

Chat 2 is now preparing the exact contract/fixtures/tests for this. Lead owns any required shared presentation runtime/schema extension.

PR #35 is the current Lead implementation for the seven remaining ordinary-career base layers. The first CI run correctly rejected orphan stages; Lead removed undeclared future stages from the base layer and a corrected exact-head run is in progress.


## 24. Live product lock — Russian + English

Direct Product decision on 2026-09-27:
- ship/authored game is bilingual RU+EN from the start;
- Russian is source authoring language, English is full second locale;
- gameplay/content IDs and semantic presentation IDs are locale-neutral;
- mechanics/save/RNG/timing are identical across locales;
- language is presentation/text only;
- multi-GIF assets are shared, with localized alt/caption text;
- new player-facing content should be authored RU+EN immediately;
- old monolingual content is migrated subsystem-by-subsystem rather than duplicated as separate gameplay.

Authority: `BILINGUAL_LOCALIZATION_CONTRACT_v1.md`.

Current main after PR #40:
- merge `c71898654ea8419799816d9642184c4dcf23b039`;
- exact-head PR CI 288/288 PASS;
- post-merge main CI SUCCESS;
- Work UI exposes all 10 target ordinary careers;
- `lumber.shift` reuses existing Lumber wage formula and UI regression proves money is awarded through the rendered Work flow.


## 25. Live runtime milestone — RU/EN + multi-GIF

This is a live recovery snapshot, not final transfer.

### PR #41 — bilingual runtime

Merged as `974d6e077ffc511e304a64aef32f2aab81167f41`.

Exact-head CI: **291/291 PASS**.

Shipped:
- RU + EN runtime;
- Russian fallback;
- locale stored outside life Save;
- first localized town/HUD/Work slice;
- all 10 target ordinary career labels/descriptions RU+EN;
- locale switching proven not to change Work action IDs, availability or life Save.

### PR #42 — multi-GIF runtime

Merged as `55adc69dcda4c41c71548cd146756896fa5976d0`.

Exact-head CI: **295/295 PASS**.

Shipped:
- presentation slot pool of 3–5 GIF candidates;
- stable candidate keys;
- deterministic presentation-only selection using existing persisted occurrence identity;
- no gameplay RNG consumption;
- no Save migration/frame/time fields;
- reload-stable candidate selection;
- RU↔EN switch keeps same candidate;
- animations-off static fallback;
- old primary/static override compatibility.

The Product model is now executable:
**one gameplay event / one semantic presentation identity / multiple visual candidates**.

### Immediate production direction

Do not spend the next phase on more shared architecture unless a concrete integration blocker proves it necessary.

Lead should now selectively integrate:
- safe School RU/EN content;
- Forest bilingual/result content;
- ordinary-poverty localization;
- real multi-GIF pools when real assets are available.

Placeholder GIF paths/manifests are staging evidence only and must not be counted as shipped visual content.


## 26. Forest bilingual production — PR43

Merged as `326c7d495720147f17b40056369987f515363899`.

Exact-head CI:
- **299/299 PASS**
- 17 packs
- 46 events
- 35 actions
- 9 endings

Shipped:
- strict Forest result reaction pack for exact `activityResult` success / escape / failure;
- RU+EN localization for Forest result scenes and route labels;
- generic UI localization consumption for event title/body/choice, Activity labels/options, and media alt;
- renderer smoke proves RU->EN changes presentation text only while pending gameplay event identity remains unchanged;
- Lumber Hard Work remains exactly `completed_shifts >= 50` with reward `hardWork:lumber`.

Not shipped / still open:
- Product-blocked Hunter trail semantics;
- Old Boundary Token semantics;
- placeholder-only multi-GIF art does not count as shipped assets.
