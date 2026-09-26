# Parallel Work Board v1

Status: LIVE COORDINATION BOARD.

Main baseline at worker creation:
42de07be793d0f5ef0b59ea2c8acf9f0c4c80125

## Critical path owned by Chat 1

A5 ActivityEnvelope
-> A6 Ending / RunResult / Meta
-> Architecture Migration gate
-> Phase B shell / GIF central stage
-> Lumber Product Slice
-> Product Acceptance gate.

Chat 1 owns shared core and integration until A6 is green.

## Ready workers

### Chat 2
Role: Presentation / GIF preparation
Branch: chat2/presentation-prep
Task packet:
docs/tasks/TASK_CHAT2_PRESENTATION_PREP_v1.md
Packet commit:
78b6e42d514b5c6479cc1a057ba351df3011b593
State: READY

### Chat 3
Role: Lumber product/data preparation
Branch: chat3/lumber-data-prep
Task packet:
docs/tasks/TASK_CHAT3_LUMBER_DATA_PREP_v1.md
Packet commit:
f303987b7f24b89f3979fc781c9e7157bdf271c5
State: READY

### Chat 4
Role: QA / acceptance audit
Branch: chat4/acceptance-audit
Task packet:
docs/tasks/TASK_CHAT4_ACCEPTANCE_AUDIT_v1.md
Packet commit:
c6fe153c1224668b11939605589a2f795193cdd2
State: READY

### Chat 5
Role: School production-data preparation
Branch: chat5/school-data-prep
Task packet:
docs/tasks/TASK_CHAT5_SCHOOL_DATA_PREP_v1.md
Packet commit:
301fc6a48f623705d65e9c91265158b5775fccfe
State: READY

## Shared-core lock

Until A6 is complete, only Chat 1 may modify:
- prior-work/astra/prototype-m3.2/src/core/schema.ts
- prior-work/astra/prototype-m3.2/src/core/engine.ts
- prior-work/astra/prototype-m3.2/src/core/content.ts
- prior-work/astra/prototype-m3.2/src/core/persistence.ts
- A5/A6 integration tests tied directly to those files.

Other chats work only in their packet's isolated allowed paths.

## Worker start rule

When the user opens a worker chat, tell it its Chat number and branch.
The worker must read:
- docs/PARALLEL_WORK_PROTOCOL_v1.md from main;
- this board from main;
- its task packet from its assigned branch.

No worker merges to main.

## Lead integration rule

Before merging worker output:
1. compare branch with current main;
2. inspect changed paths;
3. verify allowed/forbidden writes;
4. check deliverables;
5. run package-appropriate validation;
6. merge in dependency order;
7. update this board and PROJECT_STATE.

Git state wins if this board becomes stale.
