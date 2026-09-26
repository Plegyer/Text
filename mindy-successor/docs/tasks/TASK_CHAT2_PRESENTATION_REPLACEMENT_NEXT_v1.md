# TASK CHAT 2 — Presentation Replacement Continuation v1

Status: ACTIVE / CONTINUOUS.
Base: completed `chat2/presentation-production-plan-next`.
Previous checkpoint is frozen for Lead review.

Do not edit Lead-owned shared runtime/schema/build/UI while `lead/product-activation-school-lumber-v2` is active.

## Queue item 1 — replacement-bundle acceptance fixture

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-replacement-bundle.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-replacement-bundle.test.ts`

Using the completed production patch plan, define a portable replacement bundle keyed only by semantic `presentationId`.

For every Lumber/School/Forest/ending slot that has a future GIF target:
- semantic presentationId;
- current fallback media id/path;
- future GIF logical target name;
- whether static fallback is mandatory;
- whether text fallback is available.

Verify:
- no absolute/user filesystem paths;
- no mechanics/effects/RNG/Energy/save-state fields;
- duplicate semantic IDs reject;
- unknown IDs reject/quarantine in preflight;
- changing replacement media never changes gameplay/event/course/ending identity.

## Queue item 2 — drop-in replacement regression matrix

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-replacement-regression.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-replacement-regression.test.ts`

Cover representative replacements for:
- Lumber seasonal shift;
- Lumber milestone;
- Foreman relationship/Night;
- Forest Activity;
- two School courses from different stat families;
- Hard Work ending.

For each, assert:
- semantic presentationId before/after replacement is identical;
- current static fallback remains valid if GIF missing;
- animations-off chooses a non-animated candidate without changing mechanics;
- save/reload identity remains event/course/ending-driven;
- replacement bundle cannot mutate gameplay content.

Do not edit `content/presentation.json`, shared presentation runtime, editor, or UI.

After item 1 commit immediately continue to item 2 without waiting for Lead review.


## Queue item 3 — shipped presentation closure inventory

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-shipped-closure-inventory.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-shipped-closure-inventory.test.ts`

Inventory every required Lumber / School / Forest / Night / ending semantic slot and classify it as:
- direct media-backed;
- static fallback-backed;
- text fallback-only;
- future GIF replacement.

Verify there is exactly one row per semantic slot and no duplicate semantic IDs.

## Queue item 4 — presentation override import/export contract

Create NEW files only:
- `docs/presentation-prep/PRESENTATION_OVERRIDE_IMPORT_EXPORT_CONTRACT_v1.md`
- `prior-work/astra/prototype-m3.2/tests/presentation-override-import-export-contract.test.ts`

Define a deterministic portable override payload:
- keyed by semantic `presentationId`;
- versioned independently from life saves;
- no gameplay state;
- no absolute filesystem paths;
- unknown slot IDs rejected/quarantined;
- import is atomic;
- export/import round-trip preserves semantic identity.

Do not implement UI/runtime import/export.

## Queue item 5 — presentation asset manifest consistency

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-asset-consistency.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-asset-consistency.test.ts`

Cross-check current shipped assets, static fallback IDs and planned future GIF targets.

Verify:
- every “currently available” static asset path exists;
- future GIF targets are explicitly marked unavailable until added;
- no stale asset ID points to a missing current file;
- semantic IDs never depend on filenames.

## Queue item 6 — presentation Product Acceptance scenario matrix

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-pa-scenario.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-pa-scenario.test.ts`

Cover representative full flows:
- Lumber shift -> result -> milestone;
- Foreman relationship -> Night;
- Forest Activity -> result;
- School paid lesson;
- Hard Work ending;
- complex Lumber ending.

For each step record semantic presentationId, fallback behavior, save/reload expectation and animation-off expectation.

Do not patch shared presentation runtime/UI. Continue sequentially through items 2–6 without waiting for Lead review.
