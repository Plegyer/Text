# TASK CHAT 4 — Architecture / Product Acceptance Audit v1

CHAT: 4
ROLE: QA / Acceptance Worker
BASE COMMIT: 42de07be793d0f5ef0b59ea2c8acf9f0c4c80125
BRANCH: chat4/acceptance-audit
STATUS: READY

## Goal

Prepare an executable audit/checklist layer for A1–A6 and the first Product Acceptance slice.

This worker reviews and prepares tests/checklists but does not modify shared runtime or existing test files while Chat 1 owns A5/A6.

## Required reads

- docs/PARALLEL_WORK_PROTOCOL_v1.md
- docs/ARCHITECTURE_MIGRATION_SLICE_v1.md
- docs/PRODUCT_ACCEPTANCE_SLICE_v0.md
- docs/EXECUTABLE_TZ_v1.md
- docs/SAVE_AND_MIGRATION_CONTRACT_v1.md
- docs/EVENT_RESOLVER_CONTRACT_v1.md
- docs/NIGHT_AND_ACTIVITY_CONTRACT_v1.md
- docs/IMPLEMENTATION_PACKAGE_A1_v1.md
- docs/IMPLEMENTATION_PACKAGE_A2_v1.md
- docs/IMPLEMENTATION_PACKAGE_A3_v1.md
- docs/IMPLEMENTATION_PACKAGE_A4_v1.md
- prior-work/astra/prototype-m3.2/docs/STATUS.md
- existing tests/* read-only

A5/A6 may not exist yet; mark their checks pending rather than inventing implementation results.

## Allowed writes

Only new isolated files under:
- mindy-successor/workstreams/chat4/qa/
- mindy-successor/docs/qa-prep/

This task packet may be updated with result status.

## Forbidden writes

Do not modify:
- src/core/*
- src/ui/*
- tests/*
- active content/*
- PROJECT_STATE.md
- EXECUTABLE_TZ_v1.md
- main branch

## Deliverables

1. ARCHITECTURE_GATE_AUDIT_v1.md
   - every mandatory architecture requirement;
   - status: VERIFIED / PENDING_A5 / PENDING_A6 / NOT_COVERED;
   - point to exact existing test/file evidence where possible;
   - do not claim a requirement is verified without evidence.

2. PRODUCT_ACCEPTANCE_EXECUTION_PLAN_v1.md
   - exact sequence for first Lumber vertical slice;
   - state assertions after each step;
   - Energy/money/calendar expectations;
   - reactive scene expectations;
   - GIF/presentation fallback checks;
   - save/reload checkpoints.

3. SAVE_RELOAD_ADVERSARIAL_MATRIX_v1.md
   Include cases such as:
   - before/after paid work;
   - pending resolver scene;
   - after lodging payment;
   - pending forced night event;
   - inside future Activity;
   - ending eligible before commit;
   - ending committed before reward;
   - after reward before new run;
   - corrupted/unknown content IDs.

4. WINDOWS_RELEASE_CHECKLIST_v1.md
   - npm start;
   - npm run check;
   - npm run dist:win;
   - clean-machine installation/run;
   - save persistence;
   - GIF asset paths and missing fallback;
   - no development-path dependency.

5. QA_GAPS_AFTER_A4_v1.md
   - identify real current gaps only;
   - separate architecture gaps from content gaps;
   - do not reopen locked product decisions.

## Acceptance

- No forbidden files changed.
- Every VERIFIED item cites concrete repo evidence.
- A5/A6 are clearly marked pending where appropriate.
- Checklist is usable by another chat without hidden context.
- No speculative bug claims without evidence.

## Handoff

Commit to this branch and return:
- final commit SHA;
- changed files;
- verified gaps;
- highest-risk pending checks;
- do not merge to main.

## Start instruction

If you are Chat 4, begin with repository evidence. Do not change core/tests to make the audit pass.
