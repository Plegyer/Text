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
