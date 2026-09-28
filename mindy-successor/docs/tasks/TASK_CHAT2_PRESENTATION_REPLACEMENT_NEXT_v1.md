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


## Queue item 19 — PA closure presentation dependency audit

Create NEW files only:
- `docs/presentation-prep/PRESENTATION_PA_CLOSURE_DEPENDENCY_AUDIT_v1.md`
- `prior-work/astra/prototype-m3.2/tests/presentation-pa-closure-dependency.test.ts`

Using current Product Acceptance gate status, classify every remaining OPEN PA blocker as:
- presentation-independent;
- presentation-ready once gameplay authoring lands;
- missing presentation authoring.

At minimum cover:
- Old Boundary Token acquisition/use;
- School management/accounting public result;
- deeper Forest routes/challenges/season depth;
- item-driven Activity action-space behavior.

Do not create gameplay thresholds, acquisition sources or runtime behavior.

## Queue item 20 — central-stage interaction regression contract

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-central-stage-interaction.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-central-stage-interaction.test.ts`

Define/verify the presentation contract for:
- ordinary action result;
- blocking pending scene;
- School lesson result;
- Night lodging/choice;
- active Activity;
- ending eligible/committed/completed.

Invariant:
- exactly one logical central media stage;
- gameplay controls may change around it;
- presentation changes never apply mechanics;
- pending/Activity/Night state owns interaction blocking, not GIF timing.

No UI/runtime edits.

## Queue item 21 — shipped fallback asset integrity manifest

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-fallback-asset-integrity.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-fallback-asset-integrity.test.ts`

Produce a deterministic manifest of all currently shipped static fallback assets used by target Lumber, School, Night, Activity and endings.

Verify:
- each referenced current asset exists;
- no duplicate logical media ID points to conflicting current paths;
- future GIF targets are excluded from “currently shipped” counts;
- text-only fallback slots remain valid without a file.

## Queue item 22 — replacement bundle vs shipped-catalog conflict matrix

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-replacement-conflict.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-replacement-conflict.test.ts`

Cover:
- override of existing static fallback with future GIF;
- duplicate override for same semantic ID;
- unknown semantic ID;
- asset-kind/source mismatch;
- override targeting an ending/School slot that exists in shipped catalog;
- stale bundle entry for a removed slot.

Define deterministic preflight outcome for each. No editor/runtime implementation.

## Queue item 23 — post-PR21 presentation smoke matrix

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-post-pr21-smoke.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-post-pr21-smoke.test.ts`

Mirror the shipped Product Acceptance evidence path:
Lumber shift -> milestone -> Foreman -> School -> Night -> accelerated Forest mechanics -> ending eligibility -> normal action while eligible -> commit -> completion -> new run.

For every visible boundary record:
- expected semantic presentationId;
- current fallback media behavior;
- save/reload persistence expectation;
- animation-off expectation.

Do not claim accelerated gameplay rows are full PA passes.

## Queue item 24 — presentation release-candidate handoff v2

Create:
- `docs/presentation-prep/PRESENTATION_RELEASE_CANDIDATE_HANDOFF_v2.md`
- `prior-work/astra/prototype-m3.2/content/presentation-release-candidate-handoff.fixture.json`

Consolidate all Chat 2 work after PR21 into:
- READY_TO_INTEGRATE_NOW;
- QA_EVIDENCE_ONLY;
- FUTURE_GIF_ASSET_WORK;
- BLOCKED_BY_GAMEPLAY_AUTHORING;
- SUPERSEDED.

Name exact files in each class and explain duplication/supersession so Lead can integrate a minimal non-redundant subset.

Continue items 19–24 sequentially without waiting for Lead review.


## Queue item 25 — presentation handoff deduplication proof

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-handoff-dedup.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-handoff-dedup.test.ts`

Using `PRESENTATION_RELEASE_CANDIDATE_HANDOFF_v2.md`, prove that READY_TO_INTEGRATE_NOW has:
- no duplicate semantic-ID contract coverage;
- no stale pre-PR20/PR21 assumptions;
- no runtime/UI ownership conflict;
- no fixture that falsely upgrades OPEN gameplay authoring to PASS.

## Queue item 26 — presentation current-main drift audit

Create:
- `docs/presentation-prep/PRESENTATION_CURRENT_MAIN_DRIFT_AUDIT_v1.md`
- optional NEW test `prior-work/astra/prototype-m3.2/tests/presentation-current-main-drift.test.ts`

Compare branch presentation contracts against latest main after PR20/PR21 + durable handoff.
Classify each delta:
- already shipped;
- useful branch-only QA;
- stale/superseded;
- blocked by gameplay authoring.

Do not request changes merely because a historical fixture differs.

## Queue item 27 — Product Acceptance presentation row ledger

Create:
- `docs/presentation-prep/PRESENTATION_PA_ROW_LEDGER_v1.md`
- `prior-work/astra/prototype-m3.2/content/presentation-pa-row-ledger.fixture.json`

Map PA00–PA26 presentation requirements only:
- visible slot/fallback;
- semantic presentationId;
- reload persistence;
- animation-off behavior;
- gameplay row status.

Presentation evidence must never upgrade an OPEN gameplay row to PASS.

## Queue item 28 — central media save/reload adversarial matrix

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-save-reload-adversarial.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-save-reload-adversarial.test.ts`

Cover save/reload at:
- ordinary result;
- pending reactive scene;
- School result;
- Night lodging;
- Night voluntary choice;
- Activity checkpoint;
- ending eligible;
- ending committed;
- ended/new-run boundary.

Verify only semantic presentation identity persists; no GIF frame/time/playback state is saved.

## Queue item 29 — future GIF drop-in package manifest

Create:
- `docs/presentation-prep/FUTURE_GIF_DROP_IN_PACKAGE_v1.md`
- `prior-work/astra/prototype-m3.2/content/future-gif-drop-in-package.fixture.json`

Produce the minimal future asset package format:
- semantic presentationId;
- expected media kind;
- logical filename suggestion;
- required static/text fallback;
- preflight status.

No actual GIFs, no gameplay changes, no source-path coupling.

## Queue item 30 — presentation closure readiness v3

Create:
- `docs/presentation-prep/PRESENTATION_CLOSURE_READINESS_v3.md`

Summarize:
- what is production-shipped;
- what Lead should integrate from Chat 2;
- what is QA evidence only;
- what remains future asset/polish work;
- which remaining PA blockers are presentation-independent.

Continue items 31–36 sequentially without waiting for Lead review.


## Queue item 31 — presentation release-candidate coverage ledger

Create NEW files only:
- `docs/presentation-prep/PRESENTATION_RC_COVERAGE_LEDGER_v1.md`
- `prior-work/astra/prototype-m3.2/content/presentation-rc-coverage.fixture.json`

Build a single deduplicated ledger for every production-facing semantic slot relevant after PR21:
- location;
- Lumber shift/result/event;
- Foreman relationship/Night;
- School paid lesson;
- School Night study;
- Forest Activity route/result;
- endings.

For each row record:
- semantic presentationId;
- current shipped fallback;
- future GIF status;
- text fallback;
- PA relevance;
- current blocker class, if any.

Do not edit shared runtime/UI/catalog.

## Queue item 32 — presentation save/import compatibility matrix

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-save-import-compat.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-save-import-compat.test.ts`

Cover:
- old save without presentationId;
- new save with slash semantic presentationId;
- pending scene reload;
- action result reload;
- Activity reload;
- ending reload;
- presentation replacement bundle import/export.

Prove presentation metadata remains optional/backward-compatible and never changes gameplay identity.

## Queue item 33 — release-candidate fallback degradation suite

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-rc-degradation.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-rc-degradation.test.ts`

Exercise representative RC slots under:
- primary GIF missing;
- static fallback missing;
- both missing but text fallback present;
- animations disabled;
- stale replacement entry.

Expected result: gameplay continues, or invalid presentation config is rejected before persistence.

## Queue item 34 — presentation asset replacement operator guide

Create:
- `docs/presentation-prep/PRESENTATION_ASSET_REPLACEMENT_OPERATOR_GUIDE_v1.md`

Write the exact safe operator workflow for replacing future GIF/static assets by semantic presentationId:
- locate slot;
- choose/import file;
- preflight;
- preview;
- persist override;
- verify animations-off;
- verify save/reload does not change gameplay identity;
- rollback.

No source-path editing workflow.

## Queue item 35 — Activity-option presentation readiness contract

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-activity-option-readiness.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-activity-option-readiness.test.ts`

Prepare the presentation contract for future capability-aware Forest options:
- logging road;
- hunter trail;
- old boundary;
- navigation;
- physical obstacle;
- interpretation/ritual anomaly.

Do not invent final event IDs/lore. Define semantic families and fallback policy only.

## Queue item 36 — presentation final integration handoff v3

Create:
- `docs/presentation-prep/PRESENTATION_FINAL_INTEGRATION_HANDOFF_v3.md`
- `prior-work/astra/prototype-m3.2/content/presentation-final-integration-handoff.fixture.json`

Consolidate Chat 2 items 1–29 into:
- MUST_INTEGRATE;
- QA_ONLY;
- FUTURE_ASSET_WORK;
- BLOCKED_BY_AUTHORING;
- SUPERSEDED.

Name exact files and recommend the minimal non-redundant integration subset.

Continue items 25–30 sequentially without waiting for Lead review.


## Queue item 31 — PR22 presentation delta audit

Create NEW files only:
- `docs/presentation-prep/PRESENTATION_PR22_DELTA_AUDIT_v1.md`
- `prior-work/astra/prototype-m3.2/tests/presentation-pr22-delta-audit.test.ts`

Review merged PR #22 presentation impact:
- Forest entry no longer depends on token capability;
- logging-road is a normal route;
- old-boundary route is capability-gated;
- legacy active Activity saves retain old advance/escape behavior;
- new option-aware Activity saves may expose authored route controls.

Classify which semantic slots already exist, which need new route/option presentation families, and which remain content-authoring OPEN.

Do not edit shared presentation runtime/UI/catalog.

## Queue item 32 — Forest route/challenge presentation family contract

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-forest-route-family.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-forest-route-family.test.ts`

Define semantic presentation families for the locked Forest product dimensions:
- logging road;
- hunter trail;
- old boundary;
- navigation challenge;
- physical obstacle;
- interpretation/ritual anomaly;
- success / escape / failure.

Do not invent final event IDs/lore/assets. Define stable semantic families and fallback policy only.

## Queue item 33 — PR22 option-state save presentation matrix

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-activity-option-save.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-activity-option-save.test.ts`

Cover:
- legacy optionModelVersion 0 active Activity;
- new optionModelVersion 1 before route;
- after logging-road route;
- after old-boundary route;
- after option use;
- after reload;
- success/escape result.

Verify presentation identity is deterministic and no animation state enters save.

## Queue item 34 — production media fallback release audit

Create:
- `docs/presentation-prep/PRESENTATION_PRODUCTION_FALLBACK_RELEASE_AUDIT_v1.md`
- optional NEW test `prior-work/astra/prototype-m3.2/tests/presentation-production-fallback-release.test.ts`

Audit currently shipped media fallback coverage after PR22 for:
Lumber, School, Night, Forest route surface, endings.
Separate:
- current static-backed;
- text-only safe;
- future GIF only;
- missing and blocking.

Presentation gaps must not be mislabeled as gameplay blockers.

## Queue item 35 — replacement bundle RC compatibility after new Activity routes

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-replacement-pr22-compat.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-replacement-pr22-compat.test.ts`

Verify replacement bundles remain deterministic as new Forest route/challenge semantic slots are added:
- existing overrides remain valid;
- new slots do not remap old IDs;
- unknown future slots reject/quarantine;
- export ordering remains stable;
- no gameplay state mutation.

## Queue item 36 — presentation release gate v1

Create:
- `docs/presentation-prep/PRESENTATION_RELEASE_GATE_v1.md`

Produce a final gate checklist for the presentation layer:
- central stage;
- semantic IDs;
- fallback safety;
- save/reload identity;
- Activity option-state compatibility;
- animation-off;
- replacement import/export;
- accessibility metadata;
- current asset coverage;
- future GIF backlog.

Mark each gate PASS / OPEN_ASSET / OPEN_AUTHORING / NEEDS_LIVE_EVIDENCE.

Continue items 31–36 sequentially without waiting for Lead review.


## Queue item 37 — PR24 one-Save smoke presentation audit

Create NEW files only:
- `docs/presentation-prep/PRESENTATION_PR24_ONE_SAVE_AUDIT_v1.md`
- `prior-work/astra/prototype-m3.2/tests/presentation-pr24-one-save-audit.test.ts`

Review the current Lead one-Save shipped E2E path:
Lumber -> Foreman -> School -> Night -> Forest logging-road -> Lumber return -> Hard Work -> New Run.

For every visible boundary record:
- semantic presentationId;
- current fallback behavior;
- whether pending scene / action result / Activity / ending owns presentation state;
- save/reload persistence;
- animation-off expectation.

Do not count the 49-shift threshold accelerator as presentation authoring.

## Queue item 38 — route/challenge semantic naming collision audit

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-route-challenge-collision.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-route-challenge-collision.test.ts`

Audit proposed Forest route/challenge semantic families for:
- duplicate slugs;
- route vs challenge name collision;
- dotted vs slash drift;
- season suffix ambiguity;
- legacy Activity result IDs colliding with new route IDs.

Define deterministic reject/normalize rules without changing runtime.

## Queue item 39 — presentation asset backlog priority matrix

Create:
- `docs/presentation-prep/PRESENTATION_ASSET_BACKLOG_PRIORITY_v1.md`
- `prior-work/astra/prototype-m3.2/content/presentation-asset-backlog-priority.fixture.json`

Rank only by product dependency class, not aesthetics:
- REQUIRED_FOR_RC_SAFE_FALLBACK;
- NICE_TO_HAVE_GIF;
- BLOCKED_BY_AUTHORING;
- ALREADY_COVERED_STATIC;
- TEXT_FALLBACK_ACCEPTABLE.

Include Lumber/School/Night/Forest/endings.

## Queue item 40 — release-candidate semantic coverage checksum

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-semantic-coverage-checksum.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-semantic-coverage-checksum.test.ts`

Build a deterministic checksum-like manifest over all current production semantic presentation IDs relevant to the RC slice.

Verify:
- stable sort;
- no duplicates;
- no gameplay IDs silently renamed;
- same manifest after fixture enumeration order changes;
- future GIF filenames never affect semantic identity.

## Queue item 41 — presentation override rollback contract

Create NEW files only:
- `docs/presentation-prep/PRESENTATION_OVERRIDE_ROLLBACK_CONTRACT_v1.md`
- `prior-work/astra/prototype-m3.2/tests/presentation-override-rollback.test.ts`

Define safe rollback behavior:
- bad override can be removed;
- original shipped fallback becomes active again;
- no save/gameplay state mutation;
- no orphan override remains active;
- import/export remains deterministic.

No editor/runtime implementation.

## Queue item 42 — final presentation RC evidence pack

Create:
- `docs/presentation-prep/PRESENTATION_RC_EVIDENCE_PACK_v1.md`
- `prior-work/astra/prototype-m3.2/content/presentation-rc-evidence-pack.fixture.json`

Produce the minimal final evidence pack for Lead:
- exact tests worth integrating;
- exact docs worth indexing;
- asset backlog;
- authoring-blocked slots;
- superseded artifacts;
- post-release-only work.

Keep it minimal and non-redundant.

Continue items 37–42 sequentially without waiting for Lead review.


## Queue item 43 — merged PR24 presentation reconciliation

Create NEW files only:
- `docs/presentation-prep/PRESENTATION_PR24_MERGED_RECONCILIATION_v1.md`
- `prior-work/astra/prototype-m3.2/tests/presentation-pr24-merged-reconciliation.test.ts`

Reconcile all PR24 presentation assumptions against merged main, not the old pre-fix head.

Must include the real School blocking boundary:
`school/arcana/lesson/default -> pending base.school/listen -> NightFlow`.

Correct any earlier PR24 audit assumption that skipped the blocking School scene.

Do not edit shared presentation runtime/UI/catalog.

## Queue item 44 — one-Save presentation state ownership matrix v2

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-one-save-ownership-v2.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-one-save-ownership-v2.test.ts`

Cover the merged one-Save path with exact ownership:
- lastAction;
- pendingScene;
- NightFlow;
- Activity;
- ending state;
- RunResult;
- New Run location.

Include the `base.school` pending scene explicitly.

## Queue item 45 — RC semantic fallback live-path audit

Create:
- `docs/presentation-prep/PRESENTATION_RC_LIVE_PATH_FALLBACK_AUDIT_v1.md`
- optional NEW test.

Audit only the exact merged one-Save path and classify every visible boundary as:
- direct shipped media;
- static fallback;
- text-safe fallback;
- future GIF target.

Do not widen to unused catalog slots.

## Queue item 46 — presentation final no-timing-coupling sentinel

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/presentation-final-no-timing-coupling.test.ts`

Fail if any current RC presentation/save/override artifact:
- stores frame index;
- stores elapsed media time;
- stores playback timestamp;
- requires animation completion for mechanics;
- changes command availability based on animation state.

## Queue item 47 — merged RC presentation override smoke

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-merged-rc-override-smoke.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-merged-rc-override-smoke.test.ts`

Use representative merged-main semantic IDs:
- Lumber result;
- School Arcana lesson;
- School blocking scene;
- Foreman Night;
- Forest route;
- Hard Work ending.

Verify override/fallback/reload identity without gameplay mutation.

## Queue item 48 — final presentation decision/evidence handoff v4

Create:
- `docs/presentation-prep/PRESENTATION_FINAL_DECISION_EVIDENCE_HANDOFF_v4.md`
- `prior-work/astra/prototype-m3.2/content/presentation-final-decision-evidence-handoff.fixture.json`

Consolidate post-PR24 state into:
- SHIPPED_GREEN;
- MUST_INTEGRATE_QA;
- FUTURE_ASSET_ONLY;
- AUTHORING_BLOCKED;
- SUPERSEDED.

Explicitly mark the old pre-fix PR24 presentation audit as superseded where it omitted `base.school`.

Continue items 43–48 sequentially without waiting for Lead review.


## Queue item 49 — PR25 merged presentation gate reconciliation

Create NEW files only:
- `docs/presentation-prep/PRESENTATION_PR25_GATE_RECONCILIATION_v1.md`
- `prior-work/astra/prototype-m3.2/tests/presentation-pr25-gate-reconciliation.test.ts`

Review merged/final PR25 semantics from the presentation side.

Confirm:
- paid School lesson -> real blocking School scene -> NightFlow ordering;
- presentation ownership remains lastAction/pendingScene/NightFlow/Activity/ending;
- no presentation timing drives mechanics;
- no PR25 QA fixture introduces a new production presentation identity.

Do not edit shared runtime/UI/catalog.

## Queue item 50 — production semantic-slot completeness negative suite

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-slot-completeness-negative.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-slot-completeness-negative.test.ts`

Truthfully detect missing production-facing semantic presentation coverage for the RC slice.

Cover:
- Lumber;
- Foreman;
- School paid lesson;
- blocking School scene;
- Night;
- Forest route/result;
- ending;
- New Run.

Classify missing slot as:
- BLOCKING_IDENTITY_GAP;
- SAFE_STATIC_FALLBACK;
- SAFE_TEXT_FALLBACK;
- FUTURE_ASSET_ONLY.

## Queue item 51 — fallback failure-injection suite v2

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/presentation-fallback-failure-injection-v2.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-fallback-failure-injection-v2.test.ts`

Inject representative failures on merged RC semantic IDs:
- missing GIF;
- missing static;
- invalid override;
- stale override;
- fallback cycle;
- animations disabled.

Verify gameplay remains unchanged or invalid presentation config rejects before persistence.

## Queue item 52 — operator replacement smoke manifest v2

Create:
- `docs/presentation-prep/PRESENTATION_OPERATOR_SMOKE_V2.md`
- `prior-work/astra/prototype-m3.2/content/presentation-operator-smoke-v2.fixture.json`

Produce a short operator smoke for replacing one representative asset by presentationId:
- import;
- validate;
- preview;
- persist;
- reload;
- animations-off;
- rollback.

No source-path editing.

## Queue item 53 — presentation authoring decision matrix

Create:
- `docs/presentation-prep/PRESENTATION_AUTHORING_DECISION_MATRIX_v1.md`

List only unresolved human/content decisions:
- which future GIFs to author first;
- missing final art for routes/challenges;
- School teacher/content visuals;
- ending polish.

Separate these from already-green presentation runtime mechanics.

Do not choose a preferred art direction.

## Queue item 54 — final presentation closeout pack v5

Create:
- `docs/presentation-prep/PRESENTATION_FINAL_CLOSEOUT_PACK_v5.md`
- `prior-work/astra/prototype-m3.2/content/presentation-final-closeout-pack.fixture.json`

Produce the smallest final handoff:
- SHIPPED_GREEN;
- MUST_INTEGRATE_QA;
- HUMAN_ASSET_DECISION;
- AUTHORING_BLOCKED;
- SUPERSEDED;
- POST_RELEASE.

Name exact files and explicitly supersede stale pre-fix PR24 artifacts.

Continue items 49–54 sequentially without waiting for Lead review.


## Queue item 55 — PR27/current-main presentation authority reconciliation

Create NEW file only:
- `docs/presentation-prep/PRESENTATION_PR27_MAIN_RECONCILIATION_v1.md`

Reconcile the presentation closeout against current main after PR #27 and the direct post-merge docs commits.

Confirm:
- technical RC floor remains 221/221;
- missing schema4 `presentationId` remains compatibility-only and does not change presentation identity rules;
- no PR27 change introduced production runtime/content/UI presentation behavior;
- current human/content gaps remain asset authoring and product content depth, not presentation mechanics.

Do not edit shared runtime/UI/catalog or select art direction.

## Queue item 56 — Forest content-depth presentation dependency matrix

Create NEW files only:
- `docs/presentation-prep/PRESENTATION_FOREST_CONTENT_DEPTH_ASSET_MATRIX_v1.md`
- `prior-work/astra/prototype-m3.2/content/presentation-forest-content-depth-asset-matrix.fixture.json`

Map presentation needs for the still-open Forest product depth without inventing content:
- logging road;
- hunter trail;
- old boundary;
- navigation challenge family;
- physical obstacle family;
- interpretation/ritual anomaly family;
- seasonal topology variants;
- success / escape / failure result surfaces.

Classify each row as:
- SHIPPED_IDENTITY_READY;
- AUTHORING_DECISION_REQUIRED;
- CONTENT_FIRST_THEN_ASSET;
- OPTIONAL_POLISH.

Keep gameplay identity separate from media assets.

## Queue item 57 — School authoring-to-asset dependency matrix

Create NEW files only:
- `docs/presentation-prep/PRESENTATION_SCHOOL_AUTHORING_ASSET_DEPENDENCIES_v1.md`
- `prior-work/astra/prototype-m3.2/content/presentation-school-authoring-asset-dependencies.fixture.json`

Map unresolved School authoring decisions to presentation work:
- teacher identities;
- management/accounting public-result milestone;
- Arcana/Forest public-result milestone;
- certificate/project content where still OPEN;
- paid lesson and blocking-scene visuals already supported by semantic IDs.

Do not invent teacher identities, thresholds, providers, or certificates.

## Queue item 58 — human asset decision packet

Create NEW file only:
- `docs/presentation-prep/PRESENTATION_HUMAN_ASSET_DECISION_PACKET_v1.md`

Produce a neutral decision packet containing only choices a human/Product author must make before final art/GIF production.

For each decision record:
- affected semantic presentation IDs;
- whether content authoring must happen first;
- fallback currently available;
- whether the decision is blocking for authored product depth or only polish;
- downstream replacement/import work.

Do not recommend a preferred visual style.

## Queue item 59 — post-decision asset integration checklist

Create NEW file only:
- `docs/presentation-prep/PRESENTATION_POST_DECISION_ASSET_INTEGRATION_CHECKLIST_v1.md`

Define the deterministic operator sequence after Product/content decisions are made:
- receive approved content/asset mapping;
- validate semantic IDs;
- validate fallback preservation;
- import replacement media;
- preview with animations on/off;
- save/reload smoke;
- rollback smoke;
- confirm zero gameplay-state mutation.

No runtime implementation.

## Queue item 60 — presentation content-depth handoff v6

Create NEW files only:
- `docs/presentation-prep/PRESENTATION_CONTENT_DEPTH_HANDOFF_v6.md`
- `prior-work/astra/prototype-m3.2/content/presentation-content-depth-handoff-v6.fixture.json`

Produce the smallest current-main handoff with:
- TECHNICAL_PRESENTATION_GREEN;
- HUMAN_ASSET_DECISION;
- CONTENT_FIRST_THEN_ASSET;
- OPTIONAL_POLISH;
- READY_AFTER_PRODUCT_DECISION;
- SUPERSEDED.

Name exact current authoritative presentation files and explicitly reference PR27/current-main compatibility status.

Continue items 55–60 sequentially without waiting for Lead review.


## Queue item 61 — full-roster GIF presentation coverage map

Create NEW files only:
- `docs/presentation-prep/FULL_ROSTER_GIF_COVERAGE_MAP_v1.md`
- `prior-work/astra/prototype-m3.2/content/full-roster-gif-coverage-map.fixture.json`

Using authoritative career/product docs, map presentation needs for all 10 ordinary careers plus Palace and Secret Debt/Slave.

For each system/career classify:
- semantic identity already defined;
- semantic identity needs content authoring first;
- reusable GIF/still candidate;
- static/text fallback sufficient during implementation;
- dedicated GIF desirable after content lock.

Do not invent gameplay rules, character identities or art direction.

## Queue item 62 — poverty and Secret Debt presentation flow map

Create NEW files only:
- `docs/presentation-prep/POVERTY_SECRET_DEBT_PRESENTATION_FLOW_v1.md`
- `prior-work/astra/prototype-m3.2/content/poverty-secret-debt-presentation-flow.fixture.json`

Map the presentation surfaces for:
- normal room;
- cheap lodging;
- street sleep;
- ordinary poverty events;
- one-time secret lender offer;
- delayed debt activation;
- hidden Slave career day work;
- forced Night obligation;
- paid_freedom / bound_life / takeover outcomes.

Keep mechanics sourced from current product docs. Do not choose final GIFs or prose.

## Queue item 63 — GIF reuse and variant production taxonomy

Create NEW file only:
- `docs/presentation-prep/GIF_REUSE_VARIANT_TAXONOMY_v1.md`

Define a production taxonomy that supports the intended one-person-style asset workflow:
- reusable loops;
- seasonal variants;
- career-stage variants;
- relationship variants;
- Night variants;
- result/ending variants;
- static/text fallback.

The taxonomy must minimize asset count without collapsing distinct gameplay identities.

## Queue item 64 — full-game presentationId authoring template

Create NEW file only:
- `docs/presentation-prep/FULL_GAME_PRESENTATION_ID_AUTHORING_TEMPLATE_v1.md`

Provide a fill-in template for future authored scenes across careers, School, poverty, Night, Activity, Palace and endings.

Require:
- gameplay source ID;
- semantic `presentationId`;
- GIF target;
- static fallback;
- text fallback;
- reuse group;
- animation-off behavior;
- save identity owner.

Do not populate OPEN content identities.

## Queue item 65 — GIF production priority dependency matrix

Create NEW files only:
- `docs/presentation-prep/GIF_PRODUCTION_DEPENDENCY_MATRIX_v1.md`
- `prior-work/astra/prototype-m3.2/content/gif-production-dependency-matrix.fixture.json`

Order asset work only by dependency/readiness:
- READY_NOW;
- WAIT_FOR_CONTENT_AUTHORING;
- WAIT_FOR_PRODUCT_DECISION;
- REUSE_EXISTING;
- OPTIONAL_POLISH.

Cover starter trio, remaining seven ordinary careers, School, poverty/Secret Debt, Forest, Palace, endings and Meta surfaces.

Do not rank aesthetics or choose art direction.

## Queue item 66 — presentation production continuity pack v7

Create NEW file only:
- `docs/presentation-prep/PRESENTATION_PRODUCTION_CONTINUITY_PACK_v7.md`

Produce a concise current-state handoff for the Lead containing:
- GIF-first product contract;
- what can be produced immediately;
- what waits on authoring;
- what waits on human decisions;
- exact files created in items 61–65;
- no-runtime-change guardrails.

Continue items 61–66 sequentially without waiting for Lead review.


## Queue item 67 — full-game GIF batching plan

Create NEW files only:
- `docs/presentation-prep/FULL_GAME_GIF_BATCHING_PLAN_v1.md`
- `prior-work/astra/prototype-m3.2/content/full-game-gif-batching-plan.fixture.json`

Group future GIF production into reusable batches across:
- starter trio;
- remaining seven ordinary careers;
- School;
- ordinary poverty;
- Secret Debt/Slave;
- Forest/Activity;
- Palace;
- endings/Meta.

For each batch record shared reusable motion/setting intent, required semantic identities, content-authoring dependencies, and fallback availability.

Do not merge distinct gameplay IDs merely because they can reuse the same GIF.

## Queue item 68 — full-scope presentation namespace collision audit

Create NEW file only:
- `docs/presentation-prep/FULL_SCOPE_PRESENTATION_NAMESPACE_COLLISION_AUDIT_v1.md`

Audit proposed/current semantic presentation namespaces across careers, School, Night, poverty, Secret Debt, Activity, Palace, endings and Meta.

Identify:
- existing canonical patterns;
- collision risks;
- places where content identity must be authored before assigning a final ID;
- safe reuse where media can be shared without identity collision.

Do not rename shipped IDs.

## Queue item 69 — batch asset operator checklist

Create NEW file only:
- `docs/presentation-prep/BATCH_ASSET_OPERATOR_CHECKLIST_v1.md`

Define a repeatable operator checklist for importing or replacing a batch of GIF/static assets:
- semantic-ID manifest validation;
- duplicate/collision check;
- fallback validation;
- animations-on/off preview;
- save/reload smoke;
- rollback;
- zero gameplay mutation confirmation.

The checklist must work for later full-game content production without source-path editing.

Continue items 61–69 sequentially without waiting for Lead review.


## Queue item 70 — presentation production intake manifest template

Create NEW file only:
- `docs/presentation-prep/PRESENTATION_PRODUCTION_INTAKE_MANIFEST_TEMPLATE_v1.md`

Define the minimal intake manifest required when new authored gameplay content is ready for GIF/static presentation work:
- source gameplay/content ID;
- semantic `presentationId`;
- owning subsystem;
- required vs optional visual;
- reusable media group;
- fallback requirement;
- animations-off requirement;
- save identity owner;
- Product/content approval reference.

The template must support batch handoff from career/School/poverty/Activity authors without requiring source-code path editing.

Continue items 62–70 sequentially without waiting for Lead review.


## Queue item 71 — poverty presentation fallback acceptance matrix

Create NEW file only:
- `docs/presentation-prep/POVERTY_PRESENTATION_FALLBACK_ACCEPTANCE_v1.md`

Define presentation acceptance for normal room, cheap lodging, street sleep, ordinary street events and future Secret Debt scenes:
- semantic identity remains gameplay-owned;
- GIF may be absent;
- static/text fallback must remain usable;
- animations-off must not change lodging/event availability;
- save/reload must not depend on media timing;
- reused poverty GIFs must not collapse distinct event identities.

Do not invent final poverty events or assets.

Continue items 63–71 sequentially without waiting for Lead review.


## Queue item 72 — career-draft to presentation-intake crosswalk

Create NEW file only:
- `docs/presentation-prep/CAREER_DRAFT_PRESENTATION_INTAKE_CROSSWALK_v1.md`

For all 10 ordinary career drafts plus Palace and Secret Debt, identify which authored content units must exist before Presentation can assign/finalize:
- repeatable shift IDs;
- milestone/event IDs;
- relationship/Night IDs;
- ending IDs;
- optional Activity/item hooks.

Do not invent missing content IDs. The purpose is to make the handoff from career authoring to GIF production deterministic.

Continue items 64–72 sequentially without waiting for Lead review.


## Queue item 73 — full-game media reuse safety checklist

Create NEW file only:
- `docs/presentation-prep/FULL_GAME_MEDIA_REUSE_SAFETY_CHECKLIST_v1.md`

Define checks required before one GIF/static asset is reused across multiple semantic IDs:
- distinct gameplay IDs remain distinct;
- text/choice context remains correct;
- fallback chain remains independent;
- animation-off behavior remains valid;
- accessibility alt text is context-correct;
- no save identity derives from filename;
- replacement/rollback can affect one mapping without corrupting others where intended.

Apply as a generic production checklist, not a media catalog.

Continue items 65–73 sequentially without waiting for Lead review.


## Queue item 74 — presentation-ready content acceptance template

Create NEW file only:
- `docs/presentation-prep/PRESENTATION_READY_CONTENT_ACCEPTANCE_TEMPLATE_v1.md`

Define when an authored gameplay content unit is ready to enter GIF/static production:
- gameplay ID approved;
- choices/effects stable enough for presentation;
- semantic presentationId assigned;
- text fallback exists;
- owner and replacement scope known;
- save identity owner known;
- unresolved Product decisions explicitly absent or listed.

This should prevent art production from running ahead of unstable content identity.

Continue items 66–74 sequentially without waiting for Lead review.


## Queue item 75 — presentation production batch acceptance ledger

Create NEW file only:
- `docs/presentation-prep/PRESENTATION_PRODUCTION_BATCH_ACCEPTANCE_LEDGER_v1.md`

Define a compact ledger format for each future media production batch:
- source content batch;
- semantic IDs covered;
- fallback coverage before/after;
- reused assets;
- newly added assets;
- animations-off verification;
- replacement/rollback result;
- gameplay-state invariance;
- reviewer/acceptance evidence.

No media implementation in this task.

Continue items 67–75 sequentially without waiting for Lead review.


## Queue item 76 — full-game presentation production dependency graph

Create NEW file only:
- `docs/presentation-prep/FULL_GAME_PRESENTATION_DEPENDENCY_GRAPH_v1.md`

Express presentation production dependencies across:
- career content authoring;
- School authoring;
- poverty/Secret Debt authoring;
- Activity route/challenge authoring;
- Palace/meta authoring;
- semantic presentation IDs;
- GIF/static production;
- fallback validation;
- replacement/rollback.

Represent dependencies clearly enough that Lead can schedule media work without blocking gameplay implementation. Do not invent content decisions.

Continue items 68–76 sequentially without waiting for Lead review.


## Queue item 77 — full-game fallback coverage completeness template

Create NEW file only:
- `docs/presentation-prep/FULL_GAME_FALLBACK_COVERAGE_COMPLETENESS_TEMPLATE_v1.md`

Define a reusable completeness check for authored presentation surfaces:
- semantic ID exists;
- GIF optional;
- static fallback presence;
- text fallback presence;
- animations-off path;
- accessibility alt text;
- replacement readiness;
- rollback readiness.

The template must cover careers, School, poverty, Activity, Palace and endings without requiring final assets.

Continue items 69–77 sequentially without waiting for Lead review.


## Queue item 78 — presentation implementation handoff checksum

Create NEW file only:
- `docs/presentation-prep/PRESENTATION_IMPLEMENTATION_HANDOFF_CHECKSUM_v1.md`

Define a deterministic checklist/checksum-style summary for a completed presentation authoring handoff:
- content IDs;
- semantic presentation IDs;
- media mappings;
- fallback classes;
- unresolved assets;
- reuse groups;
- replacement package version;
- no gameplay-state fields.

The purpose is to detect accidental drift between content authoring and later media implementation.

Continue items 70–78 sequentially without waiting for Lead review.


## Queue item 79 — presentation authoring stale-content rejection checklist

Create NEW file only:
- `docs/presentation-prep/PRESENTATION_STALE_CONTENT_REJECTION_CHECKLIST_v1.md`

Define checks before accepting media work against authored content:
- source gameplay/content ID still exists;
- semantic presentationId is still canonical;
- choices/effects did not materially change after media brief;
- superseded content is not receiving new assets;
- fallback remains valid;
- replacement bundle targets current identity.

No asset creation or gameplay changes.

Continue items 71–79 sequentially without waiting for Lead review.


## Queue item 80 — presentation human-decision packet v2

Create NEW file only:
- `docs/presentation-prep/PRESENTATION_HUMAN_DECISION_PACKET_v2.md`

Consolidate only visual/presentation choices that truly need human input before media production:
- art/GIF priority by system;
- whether specific authored routes/events get dedicated GIFs or reuse;
- teacher/presenter visual identities after content identity exists;
- ending polish priority;
- any optional animation scope.

Do not ask about mechanics already fixed by semantic presentation contracts. For each decision state what can proceed without it.

Continue items 72–80 sequentially without waiting for Lead review.


## Queue item 81 — full-game presentation implementation package boundary

Create NEW file only:
- `docs/presentation-prep/FULL_GAME_PRESENTATION_IMPLEMENTATION_PACKAGE_BOUNDARY_v1.md`

Define bounded future implementation packages for:
- semantic ID/content mapping;
- shipped fallback registration;
- batch GIF/static import;
- user override/replacement;
- rollback;
- presentation QA.

Separate content authoring dependencies from runtime/media implementation and preserve zero gameplay timing coupling.

Continue items 73–81 sequentially without waiting for Lead review.


## Queue item 82 — semantic media brief template

Create NEW file only:
- `docs/presentation-prep/SEMANTIC_MEDIA_BRIEF_TEMPLATE_v1.md`

Define the smallest brief needed to produce one GIF/static asset for an already-authored semantic `presentationId`:
- semantic ID;
- gameplay/content context;
- visual subject/action;
- reusable loop vs dedicated asset;
- season/context variants;
- static fallback;
- text fallback;
- accessibility alt;
- prohibited gameplay/timing coupling;
- approval/source-content reference.

The template must allow fast external GIF production without exposing mechanics to the asset producer.

Continue items 74–82 sequentially without waiting for Lead review.


## Queue item 83 — full-game media production batch template

Create NEW file only:
- `docs/presentation-prep/FULL_GAME_MEDIA_PRODUCTION_BATCH_TEMPLATE_v1.md`

Define a reusable batch packet for producing multiple GIF/static assets at once:
- batch scope;
- semantic IDs;
- shared location/action motif;
- reusable loops;
- dedicated exceptions;
- static/text fallback status;
- source-content approval;
- animations-off acceptance;
- import/rollback validation.

Keep media production separate from gameplay authoring.

Continue items 75–83 sequentially without waiting for Lead review.


## Queue item 84 — starter-trio semantic GIF shot list

Create NEW file only:
- `docs/presentation-prep/STARTER_TRIO_SEMANTIC_GIF_SHOT_LIST_v1.md`

Using only already-authored/authoritative content, prepare production shot-list entries for Lumber, Satyr Maid and Undead Farm:
- semantic presentation surface;
- gameplay/content context;
- reusable vs dedicated loop;
- seasonal/context variants;
- static/text fallback;
- content dependency still OPEN, if any.

Do not choose art style, character appearance, explicit prose, or invent missing gameplay IDs. Lumber may be more complete than the other two; represent that honestly.

## Queue item 85 — School/poverty semantic GIF shot list

Create NEW file only:
- `docs/presentation-prep/SCHOOL_POVERTY_SEMANTIC_GIF_SHOT_LIST_v1.md`

Prepare media-production shot-list entries for:
- eight School course lesson surfaces;
- Night study presentation;
- normal room;
- cheap lodging;
- street sleep;
- ordinary poverty event families;
- future Secret Debt surfaces only where structural identity is already known.

Mark CONTENT_AUTHORING_FIRST or PRODUCT_DECISION_REQUIRED where final semantic identity is not ready. Keep GIF production independent from mechanics.

Continue items 77–85 sequentially without waiting for Lead review.


## Queue item 86 — media-ready semantic manifest draft

Create NEW file only:
- `docs/presentation-prep/MEDIA_READY_SEMANTIC_MANIFEST_DRAFT_v1.md`

Build a concise manifest format that can later be populated directly from approved authored content for GIF/static production.

Required columns/fields:
- subsystem;
- gameplay/content ID;
- semantic `presentationId`;
- media readiness status;
- reuse group;
- dedicated vs reusable asset;
- static fallback;
- text fallback;
- source authority;
- blocking Product/content dependency.

Include representative rows only where identity is already authoritative (for example shipped Lumber/School surfaces). Mark all non-authoritative rows OPEN rather than inventing IDs.

Continue items 78–86 sequentially without waiting for Lead review.


## Queue item 87 — presentation decision-to-media execution map

Create NEW file only:
- `docs/presentation-prep/PRESENTATION_DECISION_TO_MEDIA_EXECUTION_MAP_v1.md`

Map how an approved human/Product visual decision becomes a production media update:
- decision reference;
- authored content identity;
- semantic `presentationId`;
- media brief;
- GIF/static production;
- import mapping;
- fallback verification;
- animation-off verification;
- rollback;
- acceptance evidence.

Separate mandatory steps from optional polish and do not introduce gameplay dependencies.

Continue items 79–87 sequentially without waiting for Lead review.


## Queue item 88 — media replacement package acceptance plan

Create NEW file only:
- `docs/presentation-prep/MEDIA_REPLACEMENT_PACKAGE_ACCEPTANCE_PLAN_v1.md`

Define acceptance for a batch replacement/import package:
- semantic IDs unchanged;
- media mapping resolves;
- missing asset falls back;
- animations-off path remains valid;
- save/reload is unaffected;
- no gameplay timing/state derives from media;
- rollback restores prior mappings;
- partial batch failure does not corrupt unrelated mappings.

No runtime/media implementation in this task.

Continue items 80–88 sequentially without waiting for Lead review.


## Queue item 89 — starter-trio media replacement readiness map

Create NEW file only:
- `docs/presentation-prep/STARTER_TRIO_MEDIA_REPLACEMENT_READINESS_v1.md`

Audit Lumber, Satyr Maid and Undead Farm presentation readiness against current production state.

For each:
- shipped semantic IDs;
- current base media/fallback;
- content identities still missing;
- GIFs that can be produced now without waiting for Product;
- GIFs that must wait for authored NPC/route/milestone content;
- batch replacement path after approval.

Do not invent character appearance or art direction.

Continue items 81–89 sequentially without waiting for Lead review.


## Queue item 90 — PR34 starter-career presentation coverage audit

Create NEW file only:
- `docs/presentation-prep/PR34_STARTER_CAREER_PRESENTATION_COVERAGE_v1.md`

Audit PR #34 presentation consequences for Satyr Maid and Undead Farm.

Verify:
- target action IDs map to `job/satyr-maid/*` and `job/undead-farm/*`;
- seasonal shift slots exist;
- result/default slots remain stable across seasons;
- reused `stage.tavern.*` / `stage.hunt.*` media do not merge semantic identity;
- GIF replacement can occur later without gameplay changes;
- no new media asset is required for functional merge.

Use actual PR head/current Git evidence. Do not invent art direction.

Continue items 82–90 sequentially without waiting for Lead review.


## Queue item 91 — starter-trio GIF production batch v1

Create NEW file only:
- `docs/presentation-prep/STARTER_TRIO_GIF_PRODUCTION_BATCH_v1.md`

Prepare a concrete first media-production batch for already-shipped/PR34 semantic surfaces:
- Lumber seasonal shift/result;
- Satyr Maid seasonal shift/result if PR34 remains green;
- Undead Farm seasonal shift/result if PR34 remains green.

For each slot include:
- semantic presentationId;
- current fallback media;
- reusable-vs-dedicated recommendation category;
- source content authority;
- variant count;
- alt-text requirement;
- import/rollback acceptance.

Do not invent character appearance or final art style.

Continue items 83–91 sequentially without waiting for Lead review.


## Queue item 92 — starter-trio presentation registry delta

Create NEW files only:
- `docs/presentation-prep/STARTER_TRIO_PRESENTATION_REGISTRY_DELTA_v1.md`
- `prior-work/astra/prototype-m3.2/content/starter-trio-presentation-registry-delta.fixture.json`

Using current main plus PR34 evidence, enumerate the semantic slots added/confirmed for Lumber, Satyr Maid and Undead Farm:
- seasonal shift slots;
- result/default slots;
- current base media;
- fallback chain;
- whether the slot is READY_FOR_GIF / CONTENT_FIRST / OPTIONAL_POLISH.

Do not add gameplay IDs that are not in production/PR34.

## Queue item 93 — starter-trio media draft bundle

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/starter-trio-media-batch-v1.json`

Prepare a valid presentation override draft for existing starter-trio semantic slots using only static/base fallback mappings already available. Do not invent GIF paths or files.

Purpose:
- provide a ready import shape for later GIF replacement;
- prove semantic slots can be addressed independently;
- keep gameplay unchanged.

The draft must not be wired as mandatory production media.

## Queue item 94 — starter-trio presentation draft validation

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/starter-trio-presentation-draft.test.ts`

Validate the item-93 draft against the presentation schema/catalog where the referenced PR34 slots exist.

Cover:
- semantic IDs resolve;
- animation-off fallback remains usable;
- no save/gameplay mutation;
- Satyr Maid and Undead Farm remain separate semantic identities despite reused base media.

If PR34 is not yet on the worker branch, build the test against a minimal explicit fixture and label that limitation; do not fake main state.

## Queue item 95 — external GIF filename/import convention

Create NEW file only:
- `docs/presentation-prep/EXTERNAL_GIF_FILENAME_IMPORT_CONVENTION_v1.md`

Define a deterministic external-asset convention derived from semantic presentation IDs:
- canonical relative asset path suggestion;
- collision handling;
- season/context suffixes;
- reusable-loop grouping;
- alt-text sidecar requirement;
- import manifest mapping.

Filenames remain presentation-only and never become gameplay identity.

## Queue item 96 — media producer acceptance card template

Create NEW file only:
- `docs/presentation-prep/MEDIA_PRODUCER_ACCEPTANCE_CARD_TEMPLATE_v1.md`

Create the smallest card an external GIF producer needs for one asset:
- semantic ID;
- scene context;
- action/motion;
- reusable/dedicated;
- loop expectation;
- season/context;
- visual exclusions;
- static fallback;
- alt text;
- approval source.

No mechanics, thresholds or save rules beyond “media cannot drive them.”

## Queue item 97 — presentation production integration handoff v8

Create NEW file only:
- `docs/presentation-prep/PRESENTATION_PRODUCTION_INTEGRATION_HANDOFF_v8.md`

Consolidate items 89–96 into a concise Lead-facing handoff:
- media that can be produced now;
- media waiting on authored identities;
- PR34-related starter-trio slots;
- School/poverty dependencies;
- human art decisions that are optional;
- exact files ready for selective integration.

Continue items 89–97 sequentially without waiting for Lead review.


## Queue item 98 — multi-GIF event presentation contract v1

Create NEW file only:
- `docs/presentation-prep/MULTI_GIF_EVENT_PRESENTATION_CONTRACT_v1.md`

Define the production presentation contract for one gameplay/semantic event owning a **pool of 3–5 visual variants**.

Required invariants:
- one gameplay/content identity;
- one semantic `presentationId`;
- multiple media candidates under that identity;
- choosing a GIF never changes effects, choices, timing, save state or eligibility;
- selection may vary between occurrences;
- reload of an already materialized/pending scene must not silently reroll if the current architecture persists the chosen presentation instance;
- animation-off keeps static/text fallback;
- missing one GIF falls through to remaining candidates/fallback without breaking gameplay.

Distinguish media-pool selection from gameplay event variant selection.

## Queue item 99 — multi-GIF pool fixture v1

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-multi-gif-pools-v1.fixture.json`

Create representative authoring fixtures for:
- Lumber repeatable shift with 3–5 GIF candidates;
- Satyr Maid shift with 3–5 candidates;
- Undead Farm shift with 3–5 candidates;
- one School lesson surface;
- one poverty/street surface.

Use semantic IDs already present in production/main where possible. GIF paths may be placeholder authoring paths only and must be clearly marked non-shipped.

## Queue item 100 — multi-GIF selection acceptance tests draft

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/presentation-multi-gif-pool-contract.test.ts`

Write executable tests against current presentation primitives where possible and explicit fixture-level contract tests for functionality not yet implemented.

Cover:
- same semantic ID can own 3–5 candidate media;
- gameplay effects are invariant across media candidates;
- animation-off fallback;
- invalid/missing media candidate does not invalidate gameplay;
- save schema does not store GIF frame/time;
- media filename is never gameplay identity.

Clearly mark any failing/future assertions as fixture-contract evidence rather than pretending current runtime supports them.

## Queue item 101 — starter-trio 3–5 GIF slot plan

Create NEW file only:
- `docs/presentation-prep/STARTER_TRIO_MULTI_GIF_SLOT_PLAN_v1.md`

For Lumber, Satyr Maid and Undead Farm, map each repeatable/seasonal surface to:
- target candidate count (normally 3–5);
- reusable cross-season candidates;
- dedicated seasonal candidates;
- current fallback;
- content context;
- whether visual variation can be produced immediately.

Do not choose final art style or character appearance.

## Queue item 102 — remaining-seven multi-GIF slot plan

Create NEW file only:
- `docs/presentation-prep/REMAINING_SEVEN_MULTI_GIF_SLOT_PLAN_v1.md`

Assuming PR36 remains/lands green, map repeatable shift surfaces for Tavern, Hunter, Guard, Merchant, Artist/Geisha, Assassin and Prostitute to 3–5-GIF candidate pools.

Keep candidate counts as production planning, not gameplay rules. Do not invent Hard Work/endings/NPC scenes.

## Queue item 103 — School multi-GIF lesson pool plan

Create NEW file only:
- `docs/presentation-prep/SCHOOL_MULTI_GIF_LESSON_POOL_PLAN_v1.md`

Using Chat5 authored teacher/lesson material, map School lesson surfaces to reusable 3–5-GIF pools:
- teacher-specific vs shared classroom loops;
- track-specific variants;
- Night-study distinction;
- fallback coverage;
- identities that remain Product-blocked.

Do not change locked School mechanics.

## Queue item 104 — poverty multi-GIF event pool plan

Create NEW file only:
- `docs/presentation-prep/POVERTY_MULTI_GIF_EVENT_POOL_PLAN_v1.md`

Using Chat3 ordinary-poverty production content, map street and cheap-lodging event surfaces to 3–5-GIF visual pools.

Preserve:
- one gameplay event identity;
- no Secret Debt bleed;
- visual reroll cannot change event outcome;
- fallback works without GIF.

## Queue item 105 — media-pool import manifest v1

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/media-pool-import-manifest-v1.json`

Create a batch import manifest shape supporting:
- semantic presentation ID;
- ordered/unordered candidate media pool;
- static fallback;
- text fallback;
- optional weights only if clearly presentation-only;
- per-candidate alt text;
- replacement/rollback metadata.

Do not wire it into production runtime.

## Queue item 106 — multi-GIF production handoff v1

Create NEW file only:
- `docs/presentation-prep/MULTI_GIF_PRODUCTION_HANDOFF_v1.md`

Consolidate items 98–105 into Lead implementation guidance:
- exact runtime/schema gap, if any;
- what already works;
- minimum extension needed for 3–5 GIF candidates/event;
- migration/save impact;
- tests required;
- starter-trio / seven-career / School / poverty adoption order.

Continue items 98–106 sequentially without waiting for Lead review.


## Queue item 107 — multi-GIF current-runtime black-box fixture

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-multi-gif-runtime-v1.fixture.json`

Encode representative 3–5-candidate pools for current shipped semantic IDs across:
- Lumber;
- Satyr Maid;
- Undead Farm;
- one remaining ordinary career;
- one School surface;
- one ordinary-poverty surface.

The fixture is presentation-only and must not add gameplay semantics.

## Queue item 108 — multi-GIF schema acceptance test matrix

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/presentation-multi-gif-schema-matrix.test.ts`

Write contract tests for the future bounded schema extension:
- accepts exactly 3 and 5 candidates;
- rejects 0/1/2 and >5 in explicit pool mode;
- each candidate requires GIF source + alt;
- optional positive finite presentation weight;
- old primary/static/fallback override remains valid;
- ambiguous primary+pool is rejected unless Lead later defines precedence.

Keep future-only assertions clearly isolated from current executable assertions if schema is not yet extended.

## Queue item 109 — stable occurrence-key inventory

Create NEW file only:
- `docs/presentation-prep/MULTI_GIF_OCCURRENCE_KEY_INVENTORY_v1.md`

For each shipped presentation family identify the existing persisted value that can stabilize GIF choice across reload:
- action/result;
- reactive event;
- School paid lesson;
- Night study;
- Activity;
- ending/RunResult;
- ordinary poverty events.

Classify DERIVABLE_NOW / NEEDS_SMALL_PLUMBING / NEEDS_OPTIONAL_PRESENTATION_KEY.

Do not add save fields.

## Queue item 110 — starter-trio concrete media-pool draft v2

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/starter-trio-multi-gif-v2.json`

Create concrete 3–5-candidate authoring pools for current main starter-trio semantic IDs.

Use placeholder asset paths only under a clearly non-shipped authoring namespace. Include per-candidate alt text and stable candidate keys.

## Queue item 111 — ten-career multi-GIF production manifest

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/ten-career-multi-gif-v1.json`

Now that PR36 is merged, enumerate all 10 ordinary career base shift/result semantic IDs and prepare 3–5-candidate production-manifest entries.

Do not invent Hard Work/relationship/event presentation IDs that are not shipped.

## Queue item 112 — School authored-content multi-GIF manifest

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/school-authored-multi-gif-v1.json`

Using Chat5 authored teacher/lesson production handoff, prepare 3–5-candidate pools for approved generic School surfaces and clearly label teacher-specific surfaces CONTENT_DRAFT until selectively integrated.

No School mechanics changes.

## Queue item 113 — ordinary poverty multi-GIF manifest

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/ordinary-poverty-multi-gif-v1.json`

Using Chat3 production identities, prepare 3–5-candidate media pools per event+variant semantic identity.

Never allow media candidate choice to encode helpful/neutral/pressure outcome.

## Queue item 114 — multi-GIF replacement/rollback regression plan

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/presentation-multi-gif-replacement-contract.test.ts`

Add executable current behavior checks plus future contract cases for:
- replacing a whole pool;
- removing one broken candidate;
- fallback if all dynamic candidates fail;
- rollback to prior pool;
- unchanged semantic/gameplay identity;
- save remains frame/time-free.

## Queue item 115 — multi-GIF runtime integration handoff v2

Create NEW file only:
- `docs/presentation-prep/MULTI_GIF_RUNTIME_INTEGRATION_HANDOFF_v2.md`

Produce the smallest Lead implementation packet:
- exact schema fields proposed;
- resolver/selector functions touched;
- occurrence-key plumbing;
- compatibility behavior;
- exact new tests;
- exact authoring manifests ready after implementation;
- no-save-migration preferred path.

Continue items 107–115 sequentially without waiting for Lead review.


## Queue item 116 — deterministic media-pool selector fixture v2

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-multi-gif-selector-v2.fixture.json`

Provide deterministic selection examples for 3–5 candidate GIF pools using:
- semantic presentationId;
- stable occurrence key;
- pool version;
- candidate stable key;
- optional presentation-only weights.

Include reload-stability examples and prove no gameplay RNG/state is required.

## Queue item 117 — multi-GIF selector black-box test plan

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/presentation-multi-gif-selector-blackbox.test.ts`

Write current/future-compatible black-box tests for:
- same occurrence -> same selected first candidate;
- different occurrence keys may vary;
- pool ordering/replacement remains deterministic;
- candidate failure exposes remaining pool/fallback;
- no mutation of game Save/RNG.

Do not edit shared presentation runtime.

## Queue item 118 — ten-career media-pool density audit

Create NEW file only:
- `docs/presentation-prep/TEN_CAREER_MEDIA_POOL_DENSITY_AUDIT_v1.md`

For all 10 ordinary careers now on main, audit shipped base shift/result semantic surfaces and target visual diversity.

For each surface record:
- current fallback;
- target 3–5 GIF count;
- reuse opportunities;
- seasonal differentiation;
- missing authored content before additional pools.

## Queue item 119 — poverty production media-pool mapping v2

Create NEW file only:
- `docs/presentation-prep/POVERTY_PRODUCTION_MEDIA_POOL_MAPPING_v2.md`

Map the actual PR37 production event identities to 3–5 GIF pools:
- street;
- cheap lodging;
- recovery/help;
- pressure/bad-luck.

Visual candidate selection must never select or alter gameplay outcome.

## Queue item 120 — School reachable-hook media mapping v2

Create NEW file only:
- `docs/presentation-prep/SCHOOL_REACHABLE_HOOK_MEDIA_MAPPING_v2.md`

Using PR38's safe routing model, distinguish:
- reachable generic post-paid-lesson hooks;
- exact Night-study hooks;
- staged teacher/course-specific libraries awaiting routing.

Prepare 3–5 GIF pool targets only for identities that are actually reachable or clearly staged.

## Queue item 121 — GIF producer batch: ordinary work loops v1

Create NEW file only:
- `docs/presentation-prep/GIF_PRODUCER_BATCH_ORDINARY_WORK_V1.md`

Create production cards for the first media batch covering all 10 ordinary career base shifts.

For each career provide 3–5 distinct loop briefs that show visual variety without implying different gameplay outcomes. Keep character appearance/art style open unless already authored.

## Queue item 122 — GIF producer batch: School/poverty loops v1

Create NEW file only:
- `docs/presentation-prep/GIF_PRODUCER_BATCH_SCHOOL_POVERTY_V1.md`

Create production cards for:
- reachable School lesson/Night contexts;
- street sleep;
- cheap lodging;
- representative poverty event contexts.

Use 3–5 candidate loops where repetition warrants it.

## Queue item 123 — media-pool accessibility/alt audit v1

Create NEW file only:
- `docs/presentation-prep/MEDIA_POOL_ACCESSIBILITY_ALT_AUDIT_v1.md`

Define and audit alt-text requirements for multi-GIF pools:
- each candidate needs useful alt text;
- alt text describes presentation, not hidden mechanics;
- reused GIF may need context-specific alt;
- fallback text remains meaningful.

Cover representative career, School and poverty pools.

## Queue item 124 — multi-GIF adoption handoff v3

Create NEW file only:
- `docs/presentation-prep/MULTI_GIF_ADOPTION_HANDOFF_v3.md`

Consolidate items 116–123 with current main/Lead implementation status:
- selector evidence;
- all-ten-career media coverage;
- poverty/School mappings;
- producer-ready batches;
- exact remaining runtime gap;
- selective integration list.

Continue items 116–124 sequentially without waiting for Lead review.


## Cross-cutting Product rule — RU + EN from now on

Effective immediately by direct Product decision:
- the game ships in **Russian and English**;
- Russian is the source authoring language; English is a full second locale;
- one gameplay/content identity, one semantic ID, one set of mechanics and one save-state serve both languages;
- language affects presentation/text only;
- no locale-specific conditions, rewards, timing, RNG, eligibility or save identity;
- Presentation/media authoring: all new player-facing alt text, captions, producer-facing text examples and fallback text must provide RU + EN. Semantic IDs/media identity remain language-neutral.
- if an already-assigned item has player-facing text and is not yet committed, author both locales now;
- if an item was already committed before this rule, do not rewrite it blindly; record it for localization migration/review.

Do not create a second copy of the gameplay event for English.


## Queue item 125 — bilingual presentation text contract v1

Create NEW file only:
- `docs/presentation-prep/BILINGUAL_PRESENTATION_TEXT_CONTRACT_v1.md`

Define RU+EN rules for all presentation-layer player-facing text:
- one gameplay/content identity;
- one semantic `presentationId`;
- locale-specific text/alt only;
- Russian source authoring + full English locale;
- no locale-specific mechanics, eligibility, RNG, timing, save identity or media identity;
- fallback behavior when one locale entry is temporarily missing;
- language switch must not reroll gameplay or GIF selection.

## Queue item 126 — ten-career bilingual presentation inventory

Create NEW file only:
- `docs/presentation-prep/TEN_CAREER_BILINGUAL_PRESENTATION_INVENTORY_v1.md`

For all 10 ordinary careers on current main, enumerate player-facing presentation surfaces that require RU+EN:
- base shift labels/descriptions;
- seasonal scene text;
- result text;
- multi-GIF alt text;
- future milestone/Hard Work placeholders only where identity already exists.

Do not invent missing Hard Work/endings.

## Queue item 127 — School bilingual presentation inventory

Create NEW file only:
- `docs/presentation-prep/SCHOOL_BILINGUAL_PRESENTATION_INVENTORY_v1.md`

Map RU+EN needs for:
- reachable generic post-lesson content;
- exact Night-study presentation;
- staged teacher/course libraries;
- teacher names/roles;
- classroom media alt text;
- multi-GIF pools.

Clearly distinguish REACHABLE_NOW vs STAGED.

## Queue item 128 — poverty bilingual presentation inventory

Create NEW file only:
- `docs/presentation-prep/POVERTY_BILINGUAL_PRESENTATION_INVENTORY_v1.md`

Map RU+EN needs for current ordinary-poverty production:
- street;
- cheap lodging;
- recovery/help;
- pressure/bad-luck;
- static/text fallback;
- 3–5 GIF pool alt text.

Secret Debt remains separate/staged unless its authored content is explicitly referenced.

## Queue item 129 — bilingual multi-GIF authoring manifest v1

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/bilingual-multi-gif-authoring-v1.json`

Create a presentation-only authoring manifest shape where each semantic ID may contain:
- 3–5 media candidates;
- candidate stable key;
- locale-neutral media path;
- `alt.ru`;
- `alt.en`;
- optional caption/text keys for RU/EN;
- static/text fallback;
- no gameplay fields.

Use representative shipped career/School/poverty semantic IDs only.

## Queue item 130 — bilingual presentation completeness contract test

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/presentation-bilingual-completeness-contract.test.ts`

Validate the item-129 authoring fixture:
- every player-facing candidate has RU and EN alt text;
- semantic/media IDs are locale-neutral;
- no duplicated RU/EN gameplay events;
- no locale-specific conditions/effects/rewards;
- 3–5 candidate pool rule remains presentation-only.

If current runtime has no localization schema yet, keep this as authoring-contract validation without pretending runtime support exists.

## Queue item 131 — bilingual GIF producer batch: ten careers

Create NEW file only:
- `docs/presentation-prep/BILINGUAL_GIF_PRODUCER_BATCH_TEN_CAREERS_v1.md`

For the already-authored 10 career base-shift media pools, add:
- RU scene/context text;
- EN scene/context text;
- RU alt;
- EN alt;
- locale-neutral visual brief;
- 3–5 candidate loop plan.

Do not duplicate the actual GIF asset per language.

## Queue item 132 — bilingual GIF producer batch: School + poverty

Create NEW file only:
- `docs/presentation-prep/BILINGUAL_GIF_PRODUCER_BATCH_SCHOOL_POVERTY_v1.md`

Prepare bilingual producer cards for:
- reachable School lesson/Night contexts;
- ordinary street/cheap/recovery/pressure poverty contexts.

Each card must show:
- shared semantic/media identity;
- RU/EN context text;
- RU/EN alt;
- shared 3–5 GIF candidate pool.

## Queue item 133 — bilingual presentation integration handoff v1

Create NEW file only:
- `docs/presentation-prep/BILINGUAL_PRESENTATION_INTEGRATION_HANDOFF_v1.md`

Summarize items 125–132 for Lead:
- exact content needing localization infrastructure;
- authoring fixture/tests ready now;
- multi-GIF interaction;
- locale-neutral IDs;
- no-save-migration expectation;
- what can ship immediately after Lead localization seam;
- what remains staged/Product-blocked.

Continue items 125–133 sequentially without waiting for Lead review.


## Queue item 134 — localization-key convention for presentation surfaces

Create NEW file only:
- `docs/presentation-prep/LOCALIZATION_KEY_CONVENTION_FOR_PRESENTATION_v1.md`

Define stable locale-neutral text keys for:
- action labels/descriptions;
- event variant text;
- choice labels;
- semantic presentation captions;
- GIF/image alt text.

Keys must derive from existing stable IDs and must not become gameplay identity.

## Queue item 135 — bilingual fallback audit for current presentation

Create NEW file only:
- `docs/presentation-prep/BILINGUAL_PRESENTATION_FALLBACK_AUDIT_v1.md`

Audit representative current-main career/School/poverty presentation surfaces for:
- RU source availability;
- EN coverage available from worker authoring;
- safe Russian fallback;
- missing alt/caption localization debt;
- no gameplay dependency on locale.

## Queue item 136 — bilingual presentation migration batch v1

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/bilingual-presentation-migration-batch-v1.json`

Prepare a locale-neutral migration batch for the first production slice:
- Work panel / 10 ordinary career labels;
- Lumber result/season surfaces;
- reachable School generic/Night surfaces;
- ordinary poverty representative surfaces.

Provide RU+EN strings/alt where authored; do not edit shared runtime.

## Queue item 137 — localization + multi-GIF regression matrix v1

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/presentation-localization-multigif-contract.test.ts`

Contract-test authoring fixtures for:
- locale switch keeps same semantic presentation ID;
- locale switch keeps same media candidate key;
- RU/EN alt/caption vary only as text;
- missing EN falls back to RU;
- gameplay/event IDs are unchanged.

Continue items 129–137 sequentially without waiting for Lead review.


## Queue item 138 — ten-career localization presentation bundle v1

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/ten-career-localization-v1.json`

Create a machine-readable RU+EN presentation bundle for all 10 target career base shifts:
- locale-neutral semantic/action IDs;
- RU label/description/result-shell text;
- EN equivalents;
- shared media-pool references;
- RU/EN alt text where media candidates exist.

Do not duplicate gameplay actions.

## Queue item 139 — localized career media alt pack v1

Create NEW file only:
- `docs/presentation-prep/TEN_CAREER_MEDIA_ALT_RU_EN_v1.md`

For every current base-shift media candidate, provide concise RU+EN alt text.
Visual meaning must be equivalent across locales and must not disclose hidden mechanics.

## Queue item 140 — localization fallback fixture v1

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/localization-fallback-v1.fixture.json`

Provide representative:
- fully translated entry;
- RU-only migration-debt entry;
- missing-key legacy fallback;
- localized multi-GIF alt/caption entry.

No gameplay fields.

## Queue item 141 — presentation locale-switch regression contract v2

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/presentation-locale-switch-contract-v2.test.ts`

Validate authoring fixtures:
- semantic IDs/media keys remain identical RU↔EN;
- switching locale cannot choose another GIF candidate;
- RU fallback is deterministic;
- missing EN is QA-visible;
- no gameplay conditions/effects appear in localization bundles.

## Queue item 142 — bilingual presentation production coverage matrix v2

Create NEW file only:
- `docs/presentation-prep/BILINGUAL_PRESENTATION_PRODUCTION_COVERAGE_v2.md`

Audit current-main after PR41 status for:
- town/HUD;
- 10 career Work panel;
- School;
- poverty;
- Forest;
- Night;
- endings;
- multi-GIF alt/captions.

Separate SHIPPED_RU_EN / RU_FALLBACK / STAGED_RU_EN / NOT_MIGRATED.

## Queue item 143 — localization presentation handoff v2

Create NEW file only:
- `docs/presentation-prep/LOCALIZATION_PRESENTATION_HANDOFF_v2.md`

Consolidate 134–142 into exact Lead integration guidance and next production media batches.

Continue items 135–143 sequentially without waiting for Lead review.


## Queue item 144 — multi-GIF production patch fixture v1

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/multi-gif-production-patch-v1.json`

Prepare a staging patch compatible with the Lead multi-GIF runtime schema for representative shipped semantic IDs:
- Lumber spring shift;
- Satyr Maid spring shift;
- Undead Farm spring shift;
- one Tavern shift;
- one ordinary-poverty event;
- one reachable School generic surface.

Each pool:
- 3–5 locale-neutral GIF candidate keys;
- RU+EN alt/caption payload references;
- shared static fallback;
- no gameplay fields.

Use placeholder asset paths only under an explicit non-shipped staging namespace if real GIF files do not yet exist.

## Queue item 145 — ten-career pool adoption manifest v2

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/ten-career-pool-adoption-v2.json`

Map all 10 ordinary careers to current multi-GIF runtime pool shape:
- semantic presentation ID;
- pool version;
- 3–5 candidate stable keys;
- static fallback;
- RU+EN alt localization keys;
- coverage status REAL_ASSET_READY / PLACEHOLDER / NEEDS_ART.

No invented Hard Work or relationship surfaces.

## Queue item 146 — poverty pool adoption manifest v2

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/poverty-pool-adoption-v2.json`

Convert PR37 ordinary-poverty presentation identities into the current multi-GIF pool runtime shape.

Keep helpful/neutral/pressure gameplay outcomes fixed independently of media selection.

## Queue item 147 — School reachable pool adoption manifest v2

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/school-reachable-pool-adoption-v2.json`

Prepare multi-GIF pools only for School identities that are actually reachable on current main:
- generic post-lesson;
- exact Night-study identities where routed.

Teacher/course-specific staged identities must remain clearly STAGED.

## Queue item 148 — RU+EN multi-GIF asset readiness ledger v1

Create NEW file only:
- `docs/presentation-prep/RU_EN_MULTI_GIF_ASSET_READINESS_LEDGER_v1.md`

For every pool in items 144–147 record:
- real GIF candidate count;
- placeholder count;
- static fallback;
- RU alt;
- EN alt;
- missing art/animation work.

Do not count placeholder paths as shipped assets.

## Queue item 149 — multi-GIF production patch contract test v1

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/multi-gif-production-patch-contract.test.ts`

Validate staging manifests:
- pool size 3..5;
- candidate keys unique;
- IDs locale-neutral;
- RU+EN alt present;
- static fallback defined;
- no gameplay conditions/effects/rewards;
- staged placeholders explicitly marked.

## Queue item 150 — post-runtime media integration handoff v4

Create NEW file only:
- `docs/presentation-prep/POST_RUNTIME_MEDIA_INTEGRATION_HANDOFF_v4.md`

Summarize items 142–149 against PR42 status:
- which pools can be selectively integrated immediately;
- which need real GIF files first;
- localization coverage;
- exact files/tests;
- no-runtime-change path after PR42.

Continue items 142–150 sequentially without waiting for Lead review.


## Queue item 151 — existing GIF asset inventory v1

Create NEW file only:
- `docs/presentation-prep/EXISTING_GIF_ASSET_INVENTORY_v1.md`

Audit current repo assets and list every real GIF already present.

For each:
- repo path;
- current semantic presentation use;
- dimensions/duration if available from metadata already in repo;
- whether it is safe to reuse;
- which shipped career/School/poverty/Forest semantic identities it can serve without changing gameplay meaning.

Do not count placeholders or external URLs as real assets.

## Queue item 152 — real-asset-only multi-GIF patch v1

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/real-asset-only-multigif-v1.json`

Using item 151, build the largest honest PR42-compatible presentation patch possible using only real GIF files already in the repo.

Requirements:
- each pool 3..5 real GIFs;
- locale-neutral candidate keys;
- static fallback;
- no placeholder paths;
- RU/EN alt localization keys;
- if a semantic identity lacks 3 real candidates, omit the pool rather than fake completeness.

## Queue item 153 — real-asset multi-GIF contract test

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/real-asset-multigif-v1.test.ts`

Validate item 152:
- every referenced GIF path exists in repo;
- every pool size 3..5;
- no placeholder marker;
- candidate keys unique;
- semantic IDs resolve to current production presentation slots;
- no gameplay fields.

## Queue item 154 — career presentation semantic coverage audit v3

Create NEW file only:
- `docs/presentation-prep/CAREER_PRESENTATION_SEMANTIC_COVERAGE_v3.md`

Audit all 10 ordinary careers on current main after PR42:
- base shift semantic ID;
- seasonal semantic IDs;
- result semantic IDs;
- existing real asset count per identity;
- real multi-GIF readiness YES/NO;
- exact missing asset count to reach 3.

## Queue item 155 — School presentation semantic coverage audit v3

Create NEW file only:
- `docs/presentation-prep/SCHOOL_PRESENTATION_SEMANTIC_COVERAGE_v3.md`

Audit reachable School generic + exact Night-study semantic identities against real assets and current PR42 pool capability.

Teacher/course-specific staged identities remain explicitly STAGED.

## Queue item 156 — poverty presentation semantic coverage audit v3

Create NEW file only:
- `docs/presentation-prep/POVERTY_PRESENTATION_SEMANTIC_COVERAGE_v3.md`

Audit current ordinary-poverty production identities from PR37 against real assets and exact missing count to reach 3..5 GIF pools.

Secret Debt excluded.

## Queue item 157 — Forest presentation semantic coverage audit v3

Create NEW file only:
- `docs/presentation-prep/FOREST_PRESENTATION_SEMANTIC_COVERAGE_v3.md`

Audit current-main Forest result/reaction/activity semantic IDs after PR43:
- real GIF assets available;
- reusable assets;
- exact pool deficit;
- RU/EN alt keys;
- no Product-blocked route semantics invented.

## Queue item 158 — first real-GIF production batch manifest v1

Create NEW file only:
- `docs/presentation-prep/FIRST_REAL_GIF_PRODUCTION_BATCH_MANIFEST_v1.md`

Choose the smallest high-value set of missing GIFs that, once produced, would complete the most useful first real 3..5-candidate pools.

Prioritize:
1. repeatable ordinary career shifts;
2. ordinary poverty repeat events;
3. reachable School repeat events;
4. Forest result/repeatable Activity surfaces.

For each requested GIF give locale-neutral filename, semantic ID, loop brief, and reuse compatibility.

## Queue item 159 — real-asset adoption handoff v5

Create NEW file only:
- `docs/presentation-prep/REAL_ASSET_ADOPTION_HANDOFF_v5.md`

Consolidate items 151–158:
- what can ship now using real assets;
- what still needs GIF production;
- exact patch/test files;
- no-placeholder production rule;
- recommended selective integration order.

Continue items 151–159 sequentially without waiting for Lead review.


## Queue depth Product rule — 12

Current coordination target:
- keep **12 independent presentation/media tasks** queued/outstanding whenever practical;
- Chat 2 owns presentation/GIF/media preparation only;
- shared runtime/schema/UI remains Lead-owned;
- placeholders and external URLs are never production assets;
- production multi-GIF pools require 3–5 real repository GIF files.

## Queue item 160 — media asset build-path audit v1

Create NEW file only:
- `docs/presentation-prep/MEDIA_ASSET_BUILD_PATH_AUDIT_v1.md`

Audit the exact current source/build/runtime path for static and GIF media:
- source asset directories;
- build copy/bundle behavior;
- runtime URL convention;
- current presentation slot resolution;
- what directory a future real GIF must enter to ship correctly.

Do not add fake media.

## Queue item 161 — real media intake manifest schema v1

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/real-media-intake-manifest-schema-v1.json`

Define a machine-readable intake shape for real media files:
- semantic presentationId;
- candidate key;
- repo-relative src;
- media kind;
- RU alt localization key;
- EN alt localization key;
- provenance/source note;
- reuse approval;
- static fallback reference.

This is an intake schema/example only, not a shipped pool.

## Queue item 162 — media file preflight utility v1

Create NEW tooling file only:
- `prior-work/astra/prototype-m3.2/tools/media-asset-preflight.mjs`

Implement a non-runtime utility that can validate a future intake manifest against repository files:
- referenced path exists;
- .gif candidates have GIF signature;
- no http/external URL;
- no placeholder/TODO marker;
- candidate keys unique within a semantic pool;
- pool size 3..5 when marked production-ready.

Do not edit core runtime/schema/UI.

## Queue item 163 — media preflight utility tests v1

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/media-asset-preflight.test.ts`

Cover:
- missing file rejected;
- external URL rejected;
- fake .gif extension rejected by signature;
- duplicate candidate key rejected;
- 2-candidate production pool rejected;
- 3-candidate real-file fixture accepted when valid test fixtures are used.

Test fixtures must remain explicitly test-only.

## Queue item 164 — first ordinary-career GIF producer brief v2

Create NEW file only:
- `docs/presentation-prep/FIRST_ORDINARY_CAREER_GIF_PRODUCER_BRIEF_v2.md`

Turn item 158 into concrete production briefs for the smallest high-value career batch.
For each requested real GIF specify:
- locale-neutral target filename;
- exact current semantic presentationId;
- loop action/composition;
- what must remain visually invariant for RU/EN;
- reuse compatibility;
- static fallback;
- acceptance notes.

No placeholder path may be described as already shipped.

## Queue item 165 — poverty real-GIF producer brief v1

Create NEW file only:
- `docs/presentation-prep/POVERTY_REAL_GIF_PRODUCER_BRIEF_v1.md`

Prepare producer-ready briefs for repeatable ordinary-poverty shipped identities only.
Exclude Secret Debt.
Prioritize a smallest batch that can complete at least one 3–5-candidate pool once assets are actually supplied.

## Queue item 166 — School reachable real-GIF producer brief v1

Create NEW file only:
- `docs/presentation-prep/SCHOOL_REACHABLE_REAL_GIF_PRODUCER_BRIEF_v1.md`

Prepare briefs only for currently reachable generic School/Night-study semantic identities.
Teacher/course-specific staged identities remain STAGED.

## Queue item 167 — Forest real-GIF producer brief v1

Create NEW file only:
- `docs/presentation-prep/FOREST_REAL_GIF_PRODUCER_BRIEF_v1.md`

Prepare real-GIF briefs for current-main Forest result/reaction identities after PR43.
Do not invent Hunter/Old Boundary route semantics.

## Queue item 168 — static fallback production inventory v2

Create NEW file only:
- `docs/presentation-prep/STATIC_FALLBACK_PRODUCTION_INVENTORY_v2.md`

Audit all current production semantic presentation identities in:
- 10 ordinary careers;
- School reachable surfaces;
- ordinary poverty;
- Forest;
- Foreman relationship/Night where shipped.

Record whether a real static fallback exists and its repo path.
Do not classify test-only assets as production.

## Queue item 169 — media provenance and replacement ledger v1

Create NEW file only:
- `docs/presentation-prep/MEDIA_PROVENANCE_REPLACEMENT_LEDGER_v1.md`

Define the per-asset production ledger fields needed when real GIFs arrive:
- source/provenance;
- license/permission note;
- checksum;
- semantic owners;
- reuse owners;
- replacement version;
- rollback target;
- RU/EN alt-key coverage.

Do not claim provenance that is not known.

## Queue item 170 — real-asset adoption blocking gate v1

Create NEW file only:
- `docs/presentation-prep/REAL_ASSET_ADOPTION_BLOCKING_GATE_v1.md`

Define the exact gate before Lead may integrate a production multi-GIF pool:
- 3–5 real GIF files in repo;
- build/runtime path verified;
- preflight utility green;
- semantic ID exists on current main;
- RU+EN alt keys exist;
- static fallback exists;
- locale switch preserves candidate;
- no gameplay fields;
- exact-head CI required.

Zero real GIF assets => no production pool integration.

## Queue item 171 — media production readiness handoff v6

Create NEW file only:
- `docs/presentation-prep/MEDIA_PRODUCTION_READINESS_HANDOFF_v6.md`

Consolidate items 160–170:
- tooling ready for real asset intake;
- exact producer briefs;
- static fallback state;
- current blockers;
- exact files Lead may integrate now;
- what must wait until real GIF files are supplied;
- recommended next work only if it creates or validates real assets.

Continue items 160–171 sequentially without waiting for Lead review.


## Queue item 172 — production GIF source policy and allowlist v1
Create NEW file only:
- `docs/presentation-prep/PRODUCTION_GIF_SOURCE_POLICY_AND_ALLOWLIST_v1.md`

Define sources Chat 2 may autonomously use for shipped GIFs: project-owned, CC0/public-domain, or otherwise explicitly redistribution-compatible assets with verifiable provenance. Record forbidden/uncertain cases. No generic Giphy/Tenor scraping.

## Queue item 173 — first real GIF source discovery batch v1
Create NEW file only:
- `docs/presentation-prep/FIRST_REAL_GIF_SOURCE_DISCOVERY_BATCH_v1.md`

Search allowed sources for the highest-priority semantic identities from item 164. For every candidate record direct source, license/provenance evidence, semantic fit, and whether redistribution in repo is permitted. Prefer candidates capable of forming one honest 3–5 asset pool.

## Queue item 174 — first real GIF repository import batch v1
Import NEW real GIF files only under:
- `prior-work/astra/prototype-m3.2/assets/gif/`

Import only candidates from item 173 whose provenance/license is clear and whose content fits an existing semantic identity. Do not import placeholders or uncertain-rights assets. If fewer than 3 valid compatible assets exist, commit a blocking evidence document instead of fake files:
- `docs/presentation-prep/FIRST_REAL_GIF_IMPORT_BLOCKER_v1.md`

## Queue item 175 — imported GIF technical inventory v1
Create NEW file only:
- `docs/presentation-prep/IMPORTED_GIF_TECHNICAL_INVENTORY_v1.md`

For every imported GIF record repo path, byte size, GIF signature, dimensions/frame metadata where available, provenance, semantic identity, and reuse constraints.

## Queue item 176 — imported GIF preflight test v2
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/imported-real-gif-preflight-v2.test.ts`

Run the media preflight against actual imported production candidates. Test-only fixtures do not count as success.

## Queue item 177 — first real production pool patch v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/first-real-production-pool-v1.json`

Only if item 174 produced at least 3 compatible real repo GIFs for one current semantic presentationId, build one PR42-compatible 3–5 candidate pool. Otherwise self-declare BLOCKED_BY_REAL_ASSETS and contain no fake candidates.

## Queue item 178 — first real production pool localization delta v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/first-real-production-pool-localization-v1.fixture.json`

Provide RU+EN alt/caption keys only for actual item-177 candidates. Locale must not change candidate selection.

## Queue item 179 — first real pool build-distribution smoke v1
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/first-real-gif-build-distribution-v1.test.ts`

If a real pool exists, prove its files are copied into `dist/assets`, runtime paths resolve, and static fallback remains valid. If blocked, assert no production pool claims exist.

## Queue item 180 — second semantic pool sourcing batch v1
Create NEW file only:
- `docs/presentation-prep/SECOND_REAL_GIF_SOURCE_DISCOVERY_BATCH_v1.md`

Repeat legal-source discovery for the next highest-value current semantic identity, using the same provenance bar. Prefer poverty/School/Forest only when semantic fit is strong.

## Queue item 181 — GIF repository budget and optimization gate v1
Create NEW file only:
- `docs/presentation-prep/GIF_REPOSITORY_BUDGET_AND_OPTIMIZATION_GATE_v1.md`

Define practical file-size/dimensions/frame-rate guidance and non-destructive optimization acceptance for imported GIFs. Do not modify gameplay/runtime.

## Queue item 182 — real media license/provenance audit v1
Create NEW file only:
- `docs/presentation-prep/REAL_MEDIA_LICENSE_PROVENANCE_AUDIT_v1.md`

Audit every imported real asset against item 172 and classify SHIP_OK / NEEDS_ATTRIBUTION / DO_NOT_SHIP / UNKNOWN. Unknown or unclear rights must block production adoption.

## Queue item 183 — real GIF integration handoff v7
Create NEW file only:
- `docs/presentation-prep/REAL_GIF_INTEGRATION_HANDOFF_v7.md`

Consolidate items 172–182: actual imported assets, provenance, technical validation, any real 3–5 pool ready for Lead, blockers, and exact selective integration files.

Continue items 172–183 sequentially without waiting for Lead review.


## Queue item 184 — project-owned static media production plan v1
Create NEW file only:
- `docs/presentation-prep/PROJECT_OWNED_STATIC_MEDIA_PRODUCTION_PLAN_v1.md`

Pivot from web GIF sourcing to original project-owned static production assets.
Prioritize semantic coverage gaps where current fallback is generic/reused.
No runtime/schema/UI edits.

## Queue item 185 — ordinary careers static fallback batch A v1
Create NEW original SVG assets only under:
- `prior-work/astra/prototype-m3.2/assets/presentation/`

Produce distinct project-owned static fallback art for the first five ordinary career semantic result identities, using current production presentation IDs as the mapping source.
Do not alter gameplay.

## Queue item 186 — ordinary careers static fallback batch B v1
Create NEW original SVG assets only under:
- `prior-work/astra/prototype-m3.2/assets/presentation/`

Produce distinct static fallback art for the remaining five ordinary careers.
Keep visual language consistent with item 185.

## Queue item 187 — School reachable static fallback batch v1
Create NEW original SVG assets only under:
- `prior-work/astra/prototype-m3.2/assets/presentation/`

Cover current reachable School lesson / Night-study presentation identities only.
Do not create teacher/exact-course Product-open identities as production.

## Queue item 188 — ordinary poverty static fallback batch v1
Create NEW original SVG assets only under:
- `prior-work/astra/prototype-m3.2/assets/presentation/`

Cover representative current ordinary-poverty production identities.
Secret Debt excluded.

## Queue item 189 — Forest result static fallback batch v1
Create NEW original SVG assets only under:
- `prior-work/astra/prototype-m3.2/assets/presentation/`

Create distinct static fallback assets for current Forest success / escape / failure result semantics.
Do not invent Hunter/challenge mechanics.

## Queue item 190 — Foreman relationship static fallback batch v1
Create NEW original SVG assets only under:
- `prior-work/astra/prototype-m3.2/assets/presentation/`

Cover current shipped Foreman professional milestone and Night follow-up identities only.
No new relationship stages/routes.

## Queue item 191 — project-owned static media manifest v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-static-media-v1.json`

Map items 185–190 to current semantic presentation IDs, repo-relative paths, fallback purpose, and RU/EN alt localization keys.
Presentation-only; do not root-load automatically.

## Queue item 192 — project-owned media accessibility delta v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/project-owned-static-media-localization-v1.fixture.json`

Provide RU+EN alt/caption keys for actual assets created in 185–190.
No fake keys for missing assets.

## Queue item 193 — static media build/distribution test v1
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/project-owned-static-media-build-v1.test.ts`

Validate:
- every manifest asset exists;
- SVG is non-empty and parseable as text;
- build copies it under dist/assets;
- current semantic presentation IDs exist;
- no gameplay fields are present;
- no external URLs.

## Queue item 194 — static fallback coverage acceptance ledger v1
Create NEW file only:
- `docs/presentation-prep/PROJECT_OWNED_STATIC_FALLBACK_COVERAGE_v1.md`

Record coverage across 10 careers, reachable School, ordinary poverty, Forest results, Foreman relationship/Night.
Classify UNIQUE_PROJECT_OWNED / GENERIC_EXISTING / MISSING / PRODUCT_OPEN.

## Queue item 195 — static media selective integration handoff v1
Create NEW file only:
- `docs/presentation-prep/PROJECT_OWNED_STATIC_MEDIA_INTEGRATION_HANDOFF_v1.md`

Consolidate items 184–194 with exact selective-copy file list, semantic mapping, test evidence, remaining gaps, and what should wait for final GIF production.

Continue 184–195 sequentially without waiting for Lead review.


## Queue item 196 — ordinary-career seasonal fallback gap audit v1
Create NEW file only:
- `docs/presentation-prep/ORDINARY_CAREER_SEASONAL_FALLBACK_GAP_AUDIT_v1.md`

Audit the 40 current ordinary-career seasonal shift presentation identities. Record which still reuse generic fallback and the exact existing semantic IDs. No runtime/schema/UI edits.

## Queue item 197 — Lumber + Satyr Maid seasonal static batch v1
Create NEW original SVG assets only under:
- `prior-work/astra/prototype-m3.2/assets/presentation/`

Create distinct project-owned spring/summer/autumn/winter shift fallbacks for current Lumber and Satyr Maid semantic shift identities only.

## Queue item 198 — Undead Farm + Tavern seasonal static batch v1
Create NEW original SVG assets only under:
- `prior-work/astra/prototype-m3.2/assets/presentation/`

Create distinct spring/summer/autumn/winter shift fallbacks for current Undead Farm and Tavern semantic identities.

## Queue item 199 — Hunter + Guard seasonal static batch v1
Create NEW original SVG assets only under:
- `prior-work/astra/prototype-m3.2/assets/presentation/`

Create distinct spring/summer/autumn/winter shift fallbacks for current ordinary Hunter shift and Guard identities. Do not invent Forest Hunter route semantics.

## Queue item 200 — Merchant + Artist/Geisha seasonal static batch v1
Create NEW original SVG assets only under:
- `prior-work/astra/prototype-m3.2/assets/presentation/`

Create distinct spring/summer/autumn/winter shift fallbacks for current Merchant and Artist/Geisha semantic identities.

## Queue item 201 — Assassin + Prostitute seasonal static batch v1
Create NEW original SVG assets only under:
- `prior-work/astra/prototype-m3.2/assets/presentation/`

Create distinct spring/summer/autumn/winter shift fallbacks for current Assassin and Prostitute semantic identities. Keep content non-explicit.

## Queue item 202 — seasonal static media manifest extension v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-seasonal-static-media-v1.json`

Map all actual item-197–201 assets to exact current semantic presentation IDs. Presentation-only; no gameplay fields and no root-load claim.

## Queue item 203 — seasonal media RU+EN accessibility delta v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/project-owned-seasonal-static-localization-v1.fixture.json`

Provide RU+EN alt/caption keys for every actual seasonal asset. No locale-specific asset identity duplication.

## Queue item 204 — seasonal static build/distribution regression v1
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/project-owned-seasonal-static-build-v1.test.ts`

Validate file existence, SVG sanity, semantic-ID validity, build copy into dist/assets, RU+EN alt coverage, no external URLs and no gameplay fields.

## Queue item 205 — seasonal visual consistency audit v1
Create NEW file only:
- `docs/presentation-prep/ORDINARY_CAREER_SEASONAL_VISUAL_CONSISTENCY_AUDIT_v1.md`

Audit the 40 seasonal assets for coherent style, readable silhouettes, seasonal differentiation and career recognizability. Flag duplicates that are visually indistinguishable.

## Queue item 206 — ordinary-career static coverage closure v2
Create NEW file only:
- `docs/presentation-prep/ORDINARY_CAREER_STATIC_COVERAGE_CLOSURE_v2.md`

Recompute all 10 ordinary careers: result + four seasonal shift identities. Classify UNIQUE_PROJECT_OWNED / GENERIC_EXISTING / MISSING and require 0 MISSING in this scope.

## Queue item 207 — seasonal static selective-integration handoff v2
Create NEW file only:
- `docs/presentation-prep/SEASONAL_STATIC_MEDIA_INTEGRATION_HANDOFF_v2.md`

Consolidate items 196–206 with exact asset/data/test selective-copy list, semantic mapping, build evidence, accessibility coverage and remaining final-GIF-only work.

Continue items 196–207 sequentially without waiting for Lead review.


## Queue item 208 — non-career static coverage gap audit v1
Create NEW file only:
- `docs/presentation-prep/NON_CAREER_STATIC_COVERAGE_GAP_AUDIT_v1.md`

Audit current-main shipped semantic presentation identities outside the 10 ordinary careers:
- reachable School;
- ordinary poverty;
- current Forest routes/results;
- current Foreman relationship/Night.
Classify UNIQUE_PROJECT_OWNED / GENERIC_EXISTING / MISSING / PRODUCT_OPEN.

## Queue item 209 — School eight-course static batch v1
Create NEW original SVG assets only under:
- `prior-work/astra/prototype-m3.2/assets/presentation/`

Create distinct project-owned static fallbacks for the eight current School course lesson presentation IDs.
No teacher/exact-course staged identities.

## Queue item 210 — School Night-study static batch v1
Create NEW original SVG assets only under:
- `prior-work/astra/prototype-m3.2/assets/presentation/`

Create project-owned static fallbacks for current reachable generic School Night-study presentation identities only.

## Queue item 211 — ordinary-poverty street event static batch v1
Create NEW original SVG assets only under:
- `prior-work/astra/prototype-m3.2/assets/presentation/`

Create distinct static fallbacks for current shipped ordinary-poverty street event identities.
Secret Debt excluded.

## Queue item 212 — ordinary-poverty lodging/recovery static batch v1
Create NEW original SVG assets only under:
- `prior-work/astra/prototype-m3.2/assets/presentation/`

Create distinct static fallbacks for current cheap-lodging and recovery/help ordinary-poverty identities.
No new lodging mechanics.

## Queue item 213 — ordinary-poverty pressure static batch v1
Create NEW original SVG assets only under:
- `prior-work/astra/prototype-m3.2/assets/presentation/`

Create distinct static fallbacks for current pressure/cold-rain/noisy-loading/muddy-splash identities.
No Secret Debt imagery.

## Queue item 214 — Forest route static batch v1
Create NEW original SVG assets only under:
- `prior-work/astra/prototype-m3.2/assets/presentation/`

Create distinct project-owned static fallbacks for current shipped route identities:
- logging road;
- old boundary.

Do not invent Hunter route or token semantics.

## Queue item 215 — Forest result/reaction static refinement v2
Create NEW original SVG assets only if they improve current coverage under:
- `prior-work/astra/prototype-m3.2/assets/presentation/`

Ensure success / escape / failure Activity return identities and their current reaction-event identities have semantically appropriate project-owned static fallback coverage. Reuse an existing asset only when the semantic scene is genuinely the same.

## Queue item 216 — Foreman relationship/Night static refinement v2
Create NEW original SVG assets only under:
- `prior-work/astra/prototype-m3.2/assets/presentation/`

Refine current shipped Foreman professional milestone and voluntary Night follow-up coverage. No new relationship route/stage.

## Queue item 217 — non-career project-owned static manifest v2
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-non-career-static-media-v2.json`

Map actual items 209–216 assets to exact current semantic presentation IDs, repo paths and stable RU+EN alt/caption keys. Presentation-only.

## Queue item 218 — non-career static localization + build regression v2
Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/project-owned-non-career-static-localization-v2.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/project-owned-non-career-static-build-v2.test.ts`

Validate actual assets, current semantic IDs, RU+EN alt/caption coverage, build distribution, no external URLs and no gameplay fields.

## Queue item 219 — project-owned static full-scope handoff v3
Create NEW file only:
- `docs/presentation-prep/PROJECT_OWNED_STATIC_FULL_SCOPE_HANDOFF_V3.md`

Consolidate items 208–218 plus prior career result/seasonal work:
- exact total static coverage;
- exact selective-copy assets/data/tests;
- remaining GENERIC_EXISTING / MISSING / PRODUCT_OPEN;
- what remains final-GIF-only.

Continue items 208–219 sequentially without waiting for Lead review.


## Queue item 220 — post-PR47 static media baseline reconciliation v1
Create NEW file only:
- `docs/presentation-prep/POST_PR47_STATIC_MEDIA_BASELINE_RECONCILIATION_V1.md`

Re-audit exact current main after PR47.
Record which project-owned static assets/mappings are now shipped versus still worker-only.
Use actual root `presentation.json` and `localization.json`, not prior assumptions.

## Queue item 221 — seasonal static incremental production manifest v2
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/seasonal-static-incremental-production-v2.json`

Contain only the 40 seasonal career mappings not already shipped by PR47.
Exact current semantic IDs only; no duplicates of shipped result/default mappings.

## Queue item 222 — seasonal static incremental localization delta v2
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/seasonal-static-incremental-localization-v2.fixture.json`

Contain only RU+EN alt/caption keys needed by item 221 and not already present in current root localization.

## Queue item 223 — seasonal static current-main collision regression v2
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/seasonal-static-current-main-collision-v2.test.ts`

Validate item 221/222 against exact current main:
- 40 exact current seasonal semantic IDs;
- no root slot overwrite except intentional absent-static fill;
- additive/identical localization only;
- all 40 actual SVGs exist;
- no gameplay fields.

## Queue item 224 — non-career safe production subset manifest v3
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/non-career-safe-production-subset-v3.json`

From item 217 keep only current-production mappings safe now:
- 8 School course lesson IDs;
- current generic School Night refinement;
- 10 ordinary-poverty event IDs;
- 6 Forest return/reaction IDs;
- 2 Foreman IDs.
Exclude both route-specific Product-open assets.

## Queue item 225 — non-career safe localization delta v3
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/non-career-safe-static-localization-v3.fixture.json`

Contain only RU+EN alt/caption keys required by item 224 that are not already shipped after PR47.

## Queue item 226 — non-career current-main collision regression v3
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/non-career-static-current-main-collision-v3.test.ts`

Validate item 224/225 against exact current main, including no Product-open route IDs and no staged teacher-specific School IDs.

## Queue item 227 — shared Forest route default project-owned fallback v1
Create NEW original SVG only:
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-route-default-v1.svg`

Create one project-owned generic route-in-progress fallback for the already-shipped semantic ID:
- `activity/forest/route/default`.

It must remain semantically neutral between logging-road and old-boundary and must not imply Hunter/token/challenge mechanics.

## Queue item 228 — shared Forest route default media record v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/forest-route-default-static-v1.json`

Map item 227 only to existing `activity/forest/route/default`.
Provide stable RU+EN alt/caption key references and no gameplay fields.

## Queue item 229 — static asset supersession/retention ledger v1
Create NEW file only:
- `docs/presentation-prep/STATIC_ASSET_SUPERSESSION_RETENTION_LEDGER_V1.md`

Classify all project-owned presentation SVGs as:
- SHIPPED_CURRENT;
- READY_INCREMENTAL;
- SUPERSEDED_KEEP_SOURCE_HISTORY;
- PRODUCT_OPEN;
- UNUSED_CANDIDATE.

Do not delete files.

## Queue item 230 — post-PR47 full static coverage closure v4
Create NEW file only:
- `docs/presentation-prep/POST_PR47_FULL_STATIC_COVERAGE_CLOSURE_V4.md`

Recompute current production semantic coverage after items 220–229:
- 10 career results;
- 40 career seasons;
- reachable School;
- ordinary poverty;
- Forest route default + returns/reactions;
- Foreman.
Report exact UNIQUE_PROJECT_OWNED / GENERIC_EXISTING / MISSING counts.

## Queue item 231 — next static-media selective integration handoff v4
Create NEW file only:
- `docs/presentation-prep/NEXT_STATIC_MEDIA_SELECTIVE_INTEGRATION_HANDOFF_V4.md`

Consolidate items 220–230 with exact incremental assets/data/tests safe for Lead after PR47 and exact Product-open exclusions.

Continue items 220–231 sequentially without waiting for Lead review.


## Queue item 232 — project-owned GIF production capability audit v1
Create NEW file only:
- `docs/presentation-prep/PROJECT_OWNED_GIF_PRODUCTION_CAPABILITY_AUDIT_V1.md`

Audit the repository/toolchain for an honest local path from project-owned SVG/frame sources to GIF:
- existing Node/Python/image tools;
- whether binary GIF export is reproducible in CI/dev;
- whether extra dependency would be required;
- license/security/size implications.

Do not add a dependency yet.

## Queue item 233 — GIF export pipeline decision packet v1
Create NEW file only:
- `docs/presentation-prep/GIF_EXPORT_PIPELINE_DECISION_PACKET_V1.md`

Based on item 232, document the smallest viable project-owned export path.
Classify:
- CAN_EXPORT_WITH_EXISTING_TOOLING;
- NEEDS_SMALL_DEV_DEPENDENCY;
- BLOCKED_IN_CURRENT_REPO.

Do not choose a dependency if Product/Lead approval would be required.

## Queue item 234 — first animation semantic priority list v2
Create NEW file only:
- `docs/presentation-prep/FIRST_ANIMATION_SEMANTIC_PRIORITY_LIST_V2.md`

Rank by production value without changing gameplay:
- ordinary-career shift/result;
- School;
- poverty;
- Forest return/reaction;
- Foreman.
Pick the first 4–6 semantic identities suitable for lightweight loop animation from existing project-owned static art.

## Queue item 235 — first animation motion briefs v1
Create NEW file only:
- `docs/presentation-prep/FIRST_ANIMATION_MOTION_BRIEFS_V1.md`

For each priority identity from item 234 define:
- 2–4 second loop;
- 3–8 frame concept;
- what changes between frames;
- what must stay semantically stable;
- no gameplay-state implication;
- reduced-motion/static fallback behavior.

## Queue item 236 — first animation frame-source batch v1
Create NEW original SVG frame sources only under:
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/`

Create frame sequences for the first 2 priority semantic identities using only project-owned source art.
No external media.

## Queue item 237 — frame-source validation regression v1
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/project-owned-animation-frames-v1.test.ts`

Validate:
- all frame files exist;
- SVG parse sanity;
- consistent dimensions/viewBox per sequence;
- no external URLs;
- exact semantic identity metadata;
- no gameplay fields.

## Queue item 238 — first project-owned GIF export batch v1
If item 233 is CAN_EXPORT_WITH_EXISTING_TOOLING, create actual GIFs under:
- `prior-work/astra/prototype-m3.2/assets/gif/`

Export at least 3 compatible loop candidates for ONE current semantic presentation identity.

If blocked, create instead:
- `docs/presentation-prep/FIRST_PROJECT_OWNED_GIF_EXPORT_BLOCKER_V1.md`

Do not fake GIF files and do not use external downloaded media.

## Queue item 239 — first project-owned GIF technical QA v1
Create NEW file only:
- `docs/presentation-prep/FIRST_PROJECT_OWNED_GIF_TECHNICAL_QA_V1.md`

For actual item-238 GIFs record:
- repo path;
- byte size;
- dimensions;
- frame count/duration where available;
- loop behavior;
- source frame sequence;
- semantic identity.
If blocked, record the exact blocker only.

## Queue item 240 — first project-owned 3–5 candidate pool v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/first-project-owned-gif-pool-v1.json`

Only if at least 3 actual compatible GIFs exist for one current semantic ID:
- build one PR42-compatible 3–5 candidate pool;
- preserve current static fallback;
- locale-neutral candidate keys;
- no gameplay RNG.

Otherwise self-declare BLOCKED_BY_GIF_EXPORT and contain no fake candidates.

## Queue item 241 — first project-owned GIF localization delta v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/first-project-owned-gif-localization-v1.fixture.json`

Provide RU+EN alt/caption keys only for actual item-240 candidates.
Locale switch must not change selected candidate.

## Queue item 242 — project-owned GIF build/runtime regression v1
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/project-owned-gif-build-runtime-v1.test.ts`

If actual GIFs/pool exist, validate:
- GIF signature;
- build distribution;
- 3–5 pool size;
- current semantic ID;
- deterministic selection independent of locale;
- static fallback;
- no Save/gameplay RNG mutation.

If blocked, validate that no production pool claim is emitted.

## Queue item 243 — project-owned animation integration handoff v1
Create NEW file only:
- `docs/presentation-prep/PROJECT_OWNED_ANIMATION_INTEGRATION_HANDOFF_V1.md`

Consolidate items 232–242:
- whether GIF export is actually viable;
- exact frame/GIF assets created;
- exact pool ready for Lead, if any;
- blockers;
- exact selective-copy files;
- next work only after Lead review.

Continue items 232–243 sequentially without waiting for Lead review.


## Queue item 244 — animation source backlog after GIF-export blocker v1
Create NEW file only:
- `docs/presentation-prep/ANIMATION_SOURCE_BACKLOG_AFTER_EXPORT_BLOCKER_V1.md`

Prioritize 8–12 current semantic presentation identities for project-owned frame-source authoring while GIF export remains blocked.
Current shipped identities only; no Product-open surfaces.

## Queue item 245 — Lumber spring second frame sequence v1
Create NEW original SVG frame sources only under:
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/`

Create a second distinct 4-frame loop source for:
- `job/lumber/shift/spring/default`.

No GIF claim.

## Queue item 246 — Lumber spring third frame sequence v1
Create NEW original SVG frame sources only under the same directory.

Create a third distinct 4-frame loop source for:
- `job/lumber/shift/spring/default`.

Together with existing sequence A this should make three compatible source sequences ready for future export.

## Queue item 247 — Guard summer frame sequence v1
Create NEW original SVG frame sources only for:
- `job/guard/shift/summer/default`.

Use current project-owned seasonal static art as source style.

## Queue item 248 — Tavern autumn frame sequence v1
Create NEW original SVG frame sources only for:
- `job/tavern/shift/autumn/default`.

## Queue item 249 — School literacy lesson frame sequence v1
Create NEW original SVG frame sources only for:
- `school/literacy-and-numbers/lesson/default`.

Do not alter School mechanics or teacher routing.

## Queue item 250 — poverty helpful-summer frame sequence v1
Create NEW original SVG frame sources only for:
- `location/town/event/poverty-street-production-helpful-summer/default`.

Ordinary poverty only; Secret Debt excluded.

## Queue item 251 — Forest success-return frame sequence v1
Create NEW original SVG frame sources only for:
- `activity/forest/return/success`.

Do not imply new route/challenge mechanics.

## Queue item 252 — Foreman Night frame sequence v1
Create NEW original SVG frame sources only for:
- `relationship/lumber-foreman/lumber-night-foreman-professional/default`.

No new relationship stage or Night mechanics.

## Queue item 253 — expanded frame-source validation regression v2
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/project-owned-animation-frames-v2.test.ts`

Validate all frame sequences from items 245–252 plus prior sequence A:
- exact current semantic IDs;
- frame order/count;
- consistent dimensions/viewBox per sequence;
- no external URLs/scripts;
- no gameplay/reward/RNG/Save metadata;
- project-owned only.

## Queue item 254 — animation export-ready source manifest v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-animation-source-manifest-v1.json`

List every validated frame sequence with:
- semantic presentationId;
- sequence key;
- ordered frame paths;
- target loop duration;
- future candidate key;
- static fallback reference.

No GIF paths unless actual GIFs exist.

## Queue item 255 — animation-source handoff v2
Create NEW file only:
- `docs/presentation-prep/PROJECT_OWNED_ANIMATION_SOURCE_HANDOFF_V2.md`

Consolidate items 244–254:
- exact source sequences ready;
- which semantic identity already has 3 compatible source sequences;
- exact remaining blocker to real GIF export;
- selective-copy files;
- no production animation claim.

Continue items 244–255 sequentially without waiting for Lead review.


## Queue item 256 — GIF exporter dependency options matrix v2
Create NEW file only:
- `docs/presentation-prep/GIF_EXPORTER_DEPENDENCY_OPTIONS_MATRIX_V2.md`

Compare 2–4 small, reproducible dev-only approaches for repository-local SVG-frame -> GIF export.
For each record:
- package/tool name;
- whether pure Node or native binary;
- reproducibility implications;
- CI portability;
- maintenance/license notes;
- whether it can consume only local project-owned SVG frames;
- whether pinning is straightforward.

Do not install anything yet.

## Queue item 257 — recommended GIF exporter integration plan v2
Create NEW file only:
- `docs/presentation-prep/RECOMMENDED_GIF_EXPORTER_INTEGRATION_PLAN_V2.md`

Recommend the smallest viable dev-only exporter/toolchain from item 256.
Include exact package.json/script changes that WOULD be needed, but do not modify package.json.

## Queue item 258 — Lumber spring export specification v1
Create NEW file only:
- `docs/presentation-prep/LUMBER_SPRING_GIF_EXPORT_SPEC_V1.md`

For source sequences A/B/C define exact target:
- dimensions;
- frame timing;
- loop count;
- output naming;
- candidate keys;
- max preferred file size;
- static fallback;
- exact semantic presentationId.

## Queue item 259 — Guard summer second source sequence v1
Create NEW original SVG frame sources only under:
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/`

Create a second distinct 4-frame source sequence for:
- `job/guard/shift/summer/default`.

## Queue item 260 — Guard summer third source sequence v1
Create NEW original SVG frame sources only for the same semantic identity.

After items 247/259/260, Guard summer should have three compatible source sequences ready for future GIF export.

## Queue item 261 — Tavern autumn second source sequence v1
Create NEW original SVG frame sources only for:
- `job/tavern/shift/autumn/default`.

## Queue item 262 — Tavern autumn third source sequence v1
Create NEW original SVG frame sources only for the same semantic identity.

## Queue item 263 — School literacy second source sequence v1
Create NEW original SVG frame sources only for:
- `school/literacy-and-numbers/lesson/default`.

No teacher/exact-course gameplay implications.

## Queue item 264 — School literacy third source sequence v1
Create NEW original SVG frame sources only for the same semantic identity.

## Queue item 265 — multi-identity animation source validation v3
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/project-owned-animation-frames-v3.test.ts`

Validate all source sequences through item 264:
- exact semantic IDs;
- 4 ordered frames each;
- per-sequence dimensions/viewBox consistency;
- no external URLs/scripts;
- no gameplay/RNG/Save metadata;
- identify which semantic IDs now have >=3 compatible source sequences.

## Queue item 266 — export-ready candidate source manifest v2
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-animation-source-manifest-v2.json`

Extend the manifest with all validated source sequences and explicit:
- export-ready=true/false;
- candidate key;
- source sequence;
- semantic presentationId;
- target timing;
- static fallback.

No GIF path unless a real GIF exists.

## Queue item 267 — animation exporter decision handoff v3
Create NEW file only:
- `docs/presentation-prep/PROJECT_OWNED_ANIMATION_EXPORTER_HANDOFF_V3.md`

Consolidate items 256–266:
- recommended exporter/toolchain;
- exact non-installed package/script proposal;
- semantic IDs now having 3 compatible source sequences;
- exact files ready for Lead review;
- no production animation claim until actual GIF bytes exist.

Continue items 256–267 sequentially without waiting for Lead review.


## Queue item 268 — poverty animation source expansion v1
Create NEW original SVG frame sources only under:
- `prior-work/astra/prototype-m3.2/assets/presentation-frames/`

Create two additional distinct 4-frame source sequences for:
- `location/town/event/poverty-street-production-helpful-summer/default`.

Together with the existing sequence, this semantic identity should have 3 compatible animation source sequences.

## Queue item 269 — Forest success-return second source sequence v1
Create NEW original SVG frame sources only for:
- `activity/forest/return/success`.

## Queue item 270 — Forest success-return third source sequence v1
Create NEW original SVG frame sources only for the same semantic identity.

## Queue item 271 — Foreman Night second source sequence v1
Create NEW original SVG frame sources only for:
- `relationship/lumber-foreman/lumber-night-foreman-professional/default`.

## Queue item 272 — Foreman Night third source sequence v1
Create NEW original SVG frame sources only for the same semantic identity.

## Queue item 273 — School Arcana second source sequence v1
Create NEW original SVG frame sources only for:
- `school/arcana/lesson/default`.

Presentation-only; no Arcana public fact/result mechanics.

## Queue item 274 — School Arcana third source sequence v1
Create NEW original SVG frame sources only for the same semantic identity.

## Queue item 275 — multi-scene animation timing normalization v1
Create NEW file only:
- `docs/presentation-prep/ANIMATION_TIMING_NORMALIZATION_V1.md`

Normalize target loop timing/frame pacing for every semantic identity with >=3 source sequences.
No GIF bytes required.

## Queue item 276 — animation source manifest v3
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-animation-source-manifest-v3.json`

Include every validated source sequence and identify semantic IDs with >=3 compatible source sequences.

## Queue item 277 — animation source validator v4
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/project-owned-animation-frames-v4.test.ts`

Validate all source sequences through item 276:
exact current semantic IDs, ordered frames, consistent viewBox, no external resources, no gameplay/RNG/Save metadata.

## Queue item 278 — first-three-pool source readiness ledger v1
Create NEW file only:
- `docs/presentation-prep/FIRST_THREE_POOL_SOURCE_READINESS_LEDGER_V1.md`

Identify at least three semantic identities that now have 3 compatible source sequences and are ready for GIF export once exporter approval lands.

## Queue item 279 — animation source handoff v4
Create NEW file only:
- `docs/presentation-prep/PROJECT_OWNED_ANIMATION_SOURCE_HANDOFF_V4.md`

Consolidate items 268–278 with exact selective-copy files and no production GIF claim.

Continue items 268–279 sequentially without waiting for Lead review.
