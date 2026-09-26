# TASK CHAT 4 — Activation Gate QA Continuation v1

Status: ACTIVE / CONTINUOUS.
Base: completed `chat4/product-activation-qa-next`.
Previous checkpoint is frozen for Lead review.
QA-only ownership; no production runtime/UI/content edits.

## Queue item 1 — presentation save-schema compatibility audit

Create:
- `docs/qa-prep/PRESENTATION_SAVE_SCHEMA_COMPAT_AUDIT_v1.md`

Audit current main for the persisted presentation seam:
- `run.flow.pendingScene.presentationId`;
- canonical slash semantic IDs;
- current schema regex/type used by that field;
- parseSave behavior;
- whether a pending semantic ID survives save/reload;
- impact on Product Acceptance rows that require reload during pending scenes.

Name exact file/field/API and provide a minimal reproducible sequence.
Do not fix it.

## Queue item 2 — production activation merge gate checklist

Create:
- `docs/qa-prep/PRODUCT_ACTIVATION_MERGE_GATE_CHECKLIST_v1.md`

Turn all known activation blockers into an executable pre-merge checklist for Lead:
- production definitions include target Lumber data but exclude synthetic test-only School action;
- shipped pack discovery includes intended target packs exactly once;
- validate and build use the same pack set;
- required media paths are handled safely;
- UI exposes target Lumber and all eight School courses;
- Forest Activity entry and Night paths are reachable from production UI/API;
- Hard Work remains only 50 completed shifts;
- exact `hardWork:lumber`;
- semantic presentation IDs save/reload correctly;
- full `npm run check` plus PA row subset evidence.

For each gate list the exact file/API/test that should prove it.
No invented thresholds/content.

After item 1 commit immediately continue to item 2 without waiting for Lead review.
