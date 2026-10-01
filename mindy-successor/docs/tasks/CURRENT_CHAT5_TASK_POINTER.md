# CURRENT CHAT5 TASK POINTER

Status: **HUNTER SCHOOL v15 FROZEN / READY FOR QA**
Owner: Chat 5 / School + Text Localization Worker

Current candidate:
- PR #199
- branch `chat5/hunter-school-v15`
- exact head `f04c93db866b1d2603f6917b41297670f86b0bef`
- base `chat5/hunter-school-v15-base` @ frozen Chat 1 Hunter runtime `8af661de2ce6d73e4db0f61fe4206d3334822998`
- exact-head CI #745 / id `36846888973`: **SUCCESS**
- C5-157..168 complete under frozen Hunter authority.
- focused delta: 15 files, no task pointer/queue or shared-runtime ownership drift.
- all Hunter-local School numeric thresholds remain authoritative `null`.
- only live Hunter School consumer is `hunter.school.field-craft`; Arcana/Literacy/Physical remain fact-only until a future authority publishes consumers.

Do not move PR #199 while Chat 4 gates it except for a concrete QA/required-CI blocker or explicit Lead request.

Frozen predecessor:
- PR #191 Tavern School v14
- exact head `b31c10ac3b2e024018a8499bd1ff7b8f39d8824c`
- CI #692 SUCCESS
- keep immutable while QA/integration uses it.

Frozen dependency:
- Chat 1 PR #201 Hunter runtime
- exact head `8af661de2ce6d73e4db0f61fe4206d3334822998`
- CI #734 / id `36844983432`: SUCCESS
- CANDIDATE_FROZEN for Chat 4 QA.

Current main observed when this pointer was refreshed:
- `d97a970283612ce25591741a521aa31d2a982c95`
- main CI #719: SUCCESS.

No Chat 5 queue newer than v15 was assigned at this refresh. Check Git before creating v16 work.

Current project handoff:
- `../LEADER1_HANDOFF_CHECKPOINT_2026-10-01.md`
