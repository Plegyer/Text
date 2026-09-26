# TASK CHAT 2 — Presentation Production Plan Continuation v1

Status: ACTIVE / CONTINUOUS.
Base: completed `chat2/presentation-activation-next`.
Previous checkpoint is frozen for Lead review.

Do not edit Lead-owned shared runtime/schema/build/UI while `lead/product-activation-school-lumber-v2` is active.

## Queue item 1 — production presentation patch plan

Create NEW files only:
- `docs/presentation-prep/PRESENTATION_PRODUCTION_PATCH_PLAN_v1.md`
- `prior-work/astra/prototype-m3.2/content/presentation-production-patch-plan.fixture.json`

Using completed coverage/slot-closure/media-gap work, define the exact production presentation patch needed for Lumber + School activation.

For every required semantic slot:
- semantic `presentationId`;
- preferred existing static media id/path if already shipped;
- primary GIF target if planned but currently absent;
- fallbackId;
- text fallback;
- classification: direct-existing / static-fallback / text-only / future-GIF.

Rules:
- no mechanics fields;
- no gameplay IDs renamed;
- no source filename in presentationId;
- no missing asset path may be marked as currently available;
- School IDs remain kebab-case;
- relationship/ending/Lumber event IDs follow current resolver taxonomy.

Do not edit `content/presentation.json`; this is the exact patch plan for Lead.

## Queue item 2 — production patch plan validator

Create NEW test file only:
- `prior-work/astra/prototype-m3.2/tests/presentation-production-patch-plan.test.ts`

Validate the new patch-plan fixture:
- every direct-existing/static fallback asset path actually exists under `assets/`;
- every semantic ID is slash-taxonomy valid;
- fallback graph is cycle-free;
- no gameplay/effect/RNG/Energy data appears;
- planned-but-missing GIFs are explicitly marked future/unavailable;
- all eight School lesson slots and required Lumber/Forest/ending slots are covered exactly once.

After item 1 commit immediately continue to item 2 without waiting for Lead review.
