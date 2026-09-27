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


## Queue item 90 — PR32 starter-career presentation coverage audit

Create NEW file only:
- `docs/presentation-prep/PR32_STARTER_CAREER_PRESENTATION_COVERAGE_v1.md`

Audit PR #32 presentation consequences for Satyr Maid and Undead Farm.

Verify:
- target action IDs map to `job/satyr-maid/*` and `job/undead-farm/*`;
- seasonal shift slots exist;
- result/default slots remain stable across seasons;
- reused `stage.tavern.*` / `stage.hunt.*` media do not merge semantic identity;
- GIF replacement can occur later without gameplay changes;
- no new media asset is required for functional merge.

Use actual PR head/current Git evidence. Do not invent art direction.

Continue items 82–90 sequentially without waiting for Lead review.
