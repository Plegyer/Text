# TASK CHAT 2 — Presentation Boundary Continuation v1

Status: ACTIVE / CONTINUOUS.
Base: completed `chat2/presentation-product-next`.
Previous checkpoint is frozen for Lead review.

Do not edit Lead-owned shared runtime/schema/build/UI while `lead/product-activation-school-lumber-v2` is active.

## Queue item 1 — semantic presentationId save-boundary audit

Create NEW files only:
- `docs/presentation-prep/PRESENTATION_SAVE_BOUNDARY_AUDIT_v1.md`
- `prior-work/astra/prototype-m3.2/tests/presentation-save-boundary.test.ts`

Audit the actual persisted field `run.flow.pendingScene.presentationId`.

Prove/document:
- canonical semantic presentation IDs use slash taxonomy;
- current save schema behavior for a slash ID such as `job/lumber/event/lumber-career-first-shift/default`;
- whether save/reload currently accepts or rejects that persisted value;
- eventId/variantId identity must remain unchanged;
- no GIF source/timing/frame data is persisted;
- identify the exact schema/API seam responsible if blocked.

The test must describe current behavior accurately; do not weaken schema or patch runtime.

## Queue item 2 — shipped media/fallback gap matrix

Create NEW files:
- `prior-work/astra/prototype-m3.2/content/presentation-shipped-media-gap.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-shipped-media-gap.test.ts`

Starting from the completed product coverage manifest:
- classify each required semantic slot as direct media-backed, fallback-backed, or currently unbound;
- check current catalog media IDs and actual asset paths where possible;
- keep missing media non-fatal;
- ensure fallback chains remain cycle-free;
- distinguish semantic slot ID from asset media ID;
- no mechanics/effects/RNG/Energy fields.

After item 1 commit immediately continue to item 2 without waiting for Lead review.
