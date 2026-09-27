# Parallel Work Protocol v1

Status: coordination contract.

Default team size: 4 active chats.
- Chat 1: Lead / Integrator.
- Chat 2: presentation/media preparation.
- Chat 3: Lumber content/data preparation.
- Chat 4: QA/acceptance preparation.
- Chat 5: optional only for a fully independent package.

Rules:
- one branch per chat;
- one active owner per file path;
- only the Lead integrates to main;
- each task records base commit, allowed files, forbidden files, dependencies, deliverables, tests and acceptance;
- workers do not widen scope or resolve shared-file conflicts independently;
- repository state, commits, PRs and tests are the source of truth.

Current ownership while A5/A6 are active:
- Chat 1 owns shared core: schema.ts, engine.ts, content.ts, persistence.ts and A5/A6 integration tests;
- Chat 2 prepares GIF/presentation taxonomy and replacement workflow in new isolated docs/data files;
- Chat 3 prepares Lumber career/relationship/Forest/ending/presentation mappings in new isolated draft files;
- Chat 4 prepares acceptance, save/reload and Windows verification checklists in new audit files;
- Chat 5 remains idle unless a separate bounded package is assigned.

If the Lead chat is replaced, the new Lead first reads README.md, PROJECT_STATE.md, DOCUMENT_AUTHORITY_AND_INDEX_v0.md, EXECUTABLE_TZ_v1.md and this file, then inspects active branches/PRs before assigning new work.

Recommended branch names:
- lead/<package>
- chat2/<package>
- chat3/<package>
- chat4/<package>
- chat5/<package>

Never assign two active chats to the same shared file.


## Superseding continuous-production queue policy — 2026-09-27

The historical A5/A6 ownership paragraph above is retained for provenance. Current work is in the post-RC production-authoring phase and uses all four worker chats continuously.

Current role split:
- Chat 1: Lead / Integrator; owns shared runtime/schema/build/UI integration and coordination documents.
- Chat 2: presentation/GIF production preparation in isolated presentation docs/fixtures/tests.
- Chat 3: Forest, ordinary poverty and Secret Debt/Slave production preparation in isolated subsystem docs/fixtures/tests.
- Chat 4: QA, scope-preservation and acceptance preparation in isolated QA docs/tests.
- Chat 5: Relationships + ordinary voluntary Night authored content/localization in isolated subsystem docs/fixtures/tests; School wave is complete.

### Queue depth rule

Target active queue depth is **12 independent useful tasks per active worker** whenever practical.

Lead behavior:
1. verify worker completion from Git, never prose alone;
2. if a worker finishes its queue, immediately append the next **12** independent tasks in the same branch when ownership remains compatible;
3. if a worker has fewer than 12 queued/outstanding tasks and more independent work is available, top the queue back up to 12;
4. review/integrate completed checkpoints asynchronously; Lead review must not block worker continuation;
5. preserve one active owner per file path;
6. do not create filler tasks merely to reach twelve—tasks must advance production, authoring readiness, validation or integration.

Git remains the only source of truth for queue completion.
