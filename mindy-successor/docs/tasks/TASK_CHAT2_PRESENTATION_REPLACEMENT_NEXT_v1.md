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


## Queue item 7 — presentation production smoke fixture

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-production-smoke.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-production-smoke.test.ts`

Define a short shipped-product smoke sequence covering town -> Lumber shift -> career event -> School lesson -> Night -> Forest Activity -> ending. Verify exact semantic IDs and safe fallback behavior at each step.

## Queue item 8 — semantic ID drift detector

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/presentation-semantic-id-drift.test.ts`

Cross-check all presentation fixtures/contracts accumulated on this branch and fail if the same gameplay entity maps to conflicting semantic presentation IDs. Explicitly catch dotted-vs-slash drift and School underscore-vs-kebab drift.

## Queue item 9 — screen fallback policy matrix

Create NEW files:
- `prior-work/astra/prototype-m3.2/content/presentation-screen-fallback-policy.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-screen-fallback-policy.test.ts`

Classify fallback policy for location, job shift/result/event, School, relationship, Night, Activity and ending slots. Prove missing media never changes gameplay state and every terminal fallback ends in static/text-safe behavior.

## Queue item 10 — replacement bundle version migration contract

Create NEW files:
- `docs/presentation-prep/PRESENTATION_REPLACEMENT_BUNDLE_MIGRATION_v1.md`
- `prior-work/astra/prototype-m3.2/tests/presentation-replacement-bundle-migration.test.ts`

Define version-to-version migration rules for presentation replacement bundles only. No life-save migration and no gameplay ID renames. Unknown old semantic IDs must be explicitly orphaned/rejected, not guessed.

## Queue item 11 — media-path preflight security contract

Create NEW test:
- `prior-work/astra/prototype-m3.2/tests/presentation-media-path-preflight.test.ts`

Verify replacement/override fixtures reject:
- absolute paths;
- parent-directory traversal;
- data URLs for video;
- unsupported extensions;
- gameplay JSON as a media target.

Keep valid local `assets/` references portable.

## Queue item 12 — presentation release-readiness checklist

Create:
- `docs/presentation-prep/PRESENTATION_RELEASE_READINESS_v1.md`
- optional NEW test `prior-work/astra/prototype-m3.2/tests/presentation-release-readiness.test.ts`

Summarize exact gates for a release-like presentation layer: semantic coverage, save/reload, fallback, animation-off, replacement import/export, current assets, future GIF gaps, and zero gameplay coupling.

Continue items 7–12 sequentially without waiting for Lead review.


## Queue item 13 — shipped main presentation delta map

Create NEW files only:
- `docs/presentation-prep/PRESENTATION_SHIPPED_MAIN_DELTA_MAP_v1.md`
- `prior-work/astra/prototype-m3.2/content/presentation-shipped-main-delta.fixture.json`

Compare the accepted presentation contracts on this branch with the production activation milestone now expected on main. Map every Lumber/School/Night/Activity/ending semantic slot to:
- expected shipped source domain;
- expected static fallback;
- future GIF target;
- whether the slot is required for PA00–PA26.

Do not edit runtime/UI/catalog files.

## Queue item 14 — presentation PA checkpoint matrix

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-pa-checkpoints.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-pa-checkpoints.test.ts`

Cover all PA save/reload checkpoints that have visible presentation state:
fresh, after shift, pending milestone, Foreman opening, School result, paid lodging/Night, Activity entry/internal/result, ending eligible/committed/completed/new-run.
Verify semantic identity is deterministic and never depends on animation frame/time.

## Queue item 15 — fallback exhaustion adversarial suite

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-fallback-exhaustion.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-fallback-exhaustion.test.ts`

Test pathological presentation configurations:
- missing primary + valid static fallback;
- missing primary/static + text fallback;
- missing optional slot entirely;
- fallback target missing;
- deep fallback chain;
- cycle;
- unknown semantic ID.

Expected gameplay outcome must remain unchanged or the presentation config must be rejected before persistence.

## Queue item 16 — replacement-pack deterministic ordering contract

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/presentation-replacement-ordering.test.ts`

Prove deterministic behavior when multiple override entries are imported:
- canonical sort/order independent;
- duplicate IDs reject;
- later file enumeration order cannot silently change winner;
- export order is stable.

No runtime implementation.

## Queue item 17 — presentation accessibility metadata contract

Create NEW files only:
- `docs/presentation-prep/PRESENTATION_ACCESSIBILITY_METADATA_v1.md`
- `prior-work/astra/prototype-m3.2/tests/presentation-accessibility-metadata.test.ts`

Define required non-mechanical metadata for shipped media slots:
- human-readable alt text;
- text fallback;
- semantic slot label;
- no information required exclusively from animation timing.

Audit representative Lumber, School, Night, Activity and ending slots.

## Queue item 18 — presentation integration handoff manifest

Create:
- `docs/presentation-prep/PRESENTATION_INTEGRATION_HANDOFF_v1.md`
- `prior-work/astra/prototype-m3.2/content/presentation-integration-handoff.fixture.json`

Produce a deduplicated handoff of branch artifacts for Lead:
- MUST_INTEGRATE tests/contracts;
- KEEP_AS_QA_EVIDENCE docs;
- REDUNDANT/SUPERSEDED files;
- FUTURE_ASSET_ONLY work.

Do not recommend shared runtime changes unless a currently demonstrated blocker requires one.

Continue items 13–18 sequentially without waiting for Lead review.
