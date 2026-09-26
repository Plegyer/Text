# Worker Checkpoint Integration Audit v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Current main: `ee9f8365aba5bfef3c90551082da7ba06f62873f`  
PR20 latest reviewed head: `4cd0f62451899387f8f268f0893aadc33d7fb740`

Checkpoint branches reviewed:

- Chat 2: `chat2/presentation-activation-next` @ `84580f04945ceafdb3a69a255bc05483ec4aacc8`
- Chat 3: `chat3/lumber-integration-prep-next` @ `0d225ecfeefc47665df348f69943d148b36388e8`
- Chat 5: `chat5/school-save-compat-next` @ `cd6d466f27f0937ae6feab9594dac732510cc0f8`

## Goal

Identify which completed worker artifacts remain branch-only, which should be integrated after PR20, and which must **not** be merged unchanged because PR20 changed the underlying runtime/content contract.

This audit intentionally avoids duplicative test integration.

A test should be integrated only if it adds distinct post-activation evidence.

---

# Chat 2 — presentation checkpoint

## Branch-only artifacts

Key tests:

- `presentation-activation-acceptance.test.ts`
- `presentation-override-pack-preflight.test.ts`
- `presentation-product-coverage.test.ts`
- `presentation-save-boundary.test.ts`
- `presentation-shipped-media-gap.test.ts`
- `presentation-shipped-slot-closure.test.ts`

Key fixtures/docs:

- `PRESENTATION_SAVE_BOUNDARY_AUDIT_v1.md`
- presentation coverage/slot/media-gap/preflight fixtures.

## Integration recommendation

### INTEGRATE AFTER PR20, with rebase/update

**`presentation-activation-acceptance.test.ts`**

Distinct value:

- deterministic semantic slot coverage;
- pending event reload;
- missing-media fallback without gameplay mutation;
- Animation Off presentation-only behavior;
- ending semantic ID through commit/completion.

This is the strongest consolidated Chat 2 acceptance test and should be preferred over importing every overlapping presentation fixture test.

It must be rebased onto PR20 and checked against the new persisted semantic presentation behavior.

### CONSIDER INTEGRATING if still non-duplicative

**`presentation-override-pack-preflight.test.ts`**

Useful if editor/override-pack shipping remains part of release scope. It exercises override safety rather than activation mechanics.

Do not add it merely to increase test count if existing presentation/editor tests already cover the same exact seams.

### DO NOT MERGE UNCHANGED

**`presentation-save-boundary.test.ts`**

It records the old defect and explicitly expects canonical slash presentation IDs to be rejected.

PR20 fixes this schema boundary.

The useful invariant should be rewritten as:

`slash presentationId -> save -> parseSave -> exact same ID`.

The negative historical assertion must not survive as a current gate.

### DO NOT MERGE UNCHANGED

**`presentation-shipped-media-gap.test.ts`**

This test intentionally expects missing declared target GIF assets to remain visible as a gap.

PR20 changed activation strategy by promoting production packs that use existing static shipped assets.

That expectation is now stale.

Replace it with the shipped-dist/media-existence contract rather than preserving “some target media is missing” as a required truth.

### OPTIONAL / FOLD INTO CONSOLIDATED ACTIVATION TEST

**`presentation-shipped-slot-closure.test.ts`** and  
**`presentation-product-coverage.test.ts`**

They contain useful semantic surface inventories, but their purpose overlaps with:

- `presentation-activation-acceptance.test.ts`;
- Chat 4 `qa-shipped-dist-smoke-contract.test.ts`;
- existing semantic-ID tests.

Prefer one maintained semantic surface manifest rather than three parallel copies.

## Docs

`PRESENTATION_SAVE_BOUNDARY_AUDIT_v1.md` is historically useful but describes the pre-fix state.

If integrated, mark it clearly **SUPERSEDED BY PR20 semanticPresentationId fix**.

Do not present it as current behavior documentation.

---

# Chat 3 — Lumber checkpoint

## Branch-only tests

- `lumber-ending-independence.test.ts`
- `lumber-forest-acceptance-depth.test.ts`
- `lumber-item-capability-integration-audit.test.ts`
- `lumber-production-activation-contract.test.ts`

Fixtures:

- `lumber-ending-independence.fixture.json`
- `lumber-production-activation.fixture.json`

Doc:

- `LUMBER_ITEM_CAPABILITY_INTEGRATION_AUDIT_v1.md`

## Integration recommendation

### HIGH VALUE — INTEGRATE AFTER PR20

**`lumber-ending-independence.test.ts`**

Distinct evidence not supplied by PR20's current changed tests:

- Hard Work false at 49 / true at 50;
- Forewoman eligibility independent from Hard Work;
- Forest ending eligibility independent from Hard Work;
- exact `hardWork:lumber` completion;
- commit/completion reload idempotency;
- no accidental cross-ending prerequisite coupling.

This directly protects the most important locked ending invariant.

### HIGH VALUE — INTEGRATE AFTER PR20

**`lumber-forest-acceptance-depth.test.ts`**

Distinct evidence:

- Activity entry 2 Energy exactly once;
- checkpoint reload deterministic;
- success -> exact ActivityResult -> Lumber continuation;
- escape/failure separation;
- result/reload idempotency;
- Forest content cannot add prerequisites to Hard Work.

PR20 adds Activity UI reachability but does not replace this deeper A5 regression coverage.

### PARTIALLY REDUNDANT — FOLD, DO NOT BLINDLY DUPLICATE

**`lumber-production-activation-contract.test.ts`**

Useful assertions:

- target activation allowlist;
- synthetic School action exclusion;
- Hard Work exact contract;
- semantic ID/media separation.

These now overlap substantially with:

- Chat 4 activation sentinels;
- dist smoke contract;
- PR20 production definitions.

Recommended approach:

move any unique assertion into the consolidated post-PR20 QA tests rather than adding a second parallel activation manifest unless the manifest is adopted as the single source of truth.

### KEEP AS OPEN-AUTHORING EVIDENCE, NOT PASS GATE

**`lumber-item-capability-integration-audit.test.ts`**

The real `old_boundary_token` item/capability acquisition remains open.

This test is valuable because it prevents the QA adapter from being mistaken for shipped item functionality.

Do not reinterpret it as proof that PA09/PA17 are complete.

## Doc integration

**`LUMBER_ITEM_CAPABILITY_INTEGRATION_AUDIT_v1.md`**

Should remain visible in the OPEN-authoring ledger after PR20 because it documents a real unresolved product boundary.

---

# Chat 5 — School checkpoint

## Branch-only tests

- `school-activation-expectations.test.ts`
- `school-full-reload-matrix.test.ts`
- `school-night-choice-catalog.test.ts`
- `school-production-ui-fixture.test.ts`
- `school-typed-state-compat.test.ts`

Fixtures:

- activation expectations;
- Night-choice catalog;
- production UI manifest;
- typed-state compatibility fixture.

Doc:

- `SCHOOL_PROGRESSION_OWNERSHIP_AUDIT_v1.md`

## Integration recommendation

### HIGH VALUE — INTEGRATE AFTER PR20 WITH PR20 SEMANTICS

**`school-typed-state-compat.test.ts`**

Distinct evidence:

- old schema-4-shaped save gets empty School progression;
- stable mapping of eight course IDs to track IDs;
- paid vs Night counters remain separate;
- no invented milestone/certificate thresholds.

This directly protects schema-4 activation compatibility.

Before integration, run it against PR20's actual schema/defaults rather than only fixture-shaped state.

### HIGH VALUE — INTEGRATE AFTER UPDATE

**`school-full-reload-matrix.test.ts`**

Distinct breadth:

- all eight paid courses through reload;
- all supported Night-study course/stat combinations;
- unsupported combinations reject;
- exact once behavior.

PR20 current tests cover representative reloads and all package data, but not this full cross-product reload matrix.

Required updates before merge:

- include `story.arrived` where School availability requires it;
- account for typed `lessons_completed`;
- account for typed `night_study_sessions`;
- ensure fixture catalog contains any compatibility action ID persisted in `lastAction/actionCounts`;
- assert persisted semantic presentation identity.

### HIGH VALUE — INTEGRATE AFTER UPDATE

**`school-night-choice-catalog.test.ts`**

Distinct breadth:

- exact 24 generated Night choices;
- stable IDs;
- every supported course/stat pair;
- no unsupported pairs;
- exact Night mechanics.

Update expected effect arrays to include:

`incrementSchoolCounter(...night_study_sessions...)`.

This is broader than PR20's representative Night-study test.

### OPTIONAL — FOLD INTO REAL UI TESTS

**`school-production-ui-fixture.test.ts`**

It validates the eight-course data manifest, but PR20 now has actual School UI.

Prefer direct jsdom assertions against the production UI:

- exactly eight controls;
- exact course IDs;
- dispatch `schoolLesson`;
- tuition/Energy disabled state.

The fixture can remain useful as data documentation, but adding both the fixture-only UI test and equivalent real UI assertions would be duplicative.

### PARTIALLY REDUNDANT

**`school-activation-expectations.test.ts`**

Its accepted mechanics overlap with:

- PR20 School tests;
- full reload matrix;
- Night catalog test;
- typed-state compatibility test.

Keep only unique “no authorial threshold/Lust mutation” assertions if not already present elsewhere.

## Doc integration

**`SCHOOL_PROGRESSION_OWNERSHIP_AUDIT_v1.md`**

Still valuable after PR20.

It documents why:

- `lessons_completed` is School-owned;
- `night_study_sessions` is distinct;
- legacy `metrics.lessons` and generic actionCounts are not authoritative progression;
- milestone/certificate thresholds remain open.

This should be retained as current architectural guidance.

---

# Already supplied by PR20 — avoid duplicating

PR20 itself now adds:

- `school-activation-boundary.test.ts`;
- updates to `school-engine-adapter.test.ts`;
- updates to `school-night-study-adapter.test.ts`;
- activation workflow.

Do not import worker tests that merely restate:

- one representative School lesson package;
- one representative Night-study choice;
- same-boundary School ending registration.

Prefer broader compatibility matrices and cross-system tests.

---

# Already supplied by Chat 4 activation QA — avoid duplicating

Current Chat 4 queue adds or already contains:

- invariant activation sentinels;
- PA regression subset;
- shipped dist smoke contract;
- save-edge matrix/spec;
- exact activation CI evidence checklist.

Therefore worker integration should avoid adding second copies of:

- Hard Work exact deep-equality test if identical;
- synthetic School exclusion if identical;
- exact pack-set smoke if identical.

Chat 3 ending-independence remains valuable because it tests **behavioral independence**, not just static equality.

---

# Recommended post-PR20 integration set

## Priority A — executable regression value

1. Chat 3 `lumber-ending-independence.test.ts`
2. Chat 3 `lumber-forest-acceptance-depth.test.ts`
3. Chat 5 `school-typed-state-compat.test.ts`
4. Chat 5 updated `school-full-reload-matrix.test.ts`
5. Chat 5 updated `school-night-choice-catalog.test.ts`
6. Chat 2 updated/consolidated `presentation-activation-acceptance.test.ts`

## Priority B — docs/open ledgers

- `SCHOOL_PROGRESSION_OWNERSHIP_AUDIT_v1.md`
- `LUMBER_ITEM_CAPABILITY_INTEGRATION_AUDIT_v1.md`

## Do not integrate unchanged

- Chat 2 negative slash save-boundary test;
- Chat 2 shipped-media-gap test expecting missing target assets;
- stale School tests that do not satisfy arrival/typed-counter/compatibility-ID rules;
- duplicated fixture-only activation manifests when equivalent consolidated QA exists.

---

# Integration sequencing

After PR20 is green and merged:

1. rebase/adapt the six Priority A tests to merged main;
2. run each individually;
3. run full `npm run check`;
4. remove/rewrite stale expectations rather than suppressing failures;
5. keep OPEN-authoring docs visible;
6. only then count worker checkpoint integration as complete.

Worker tests should enter main because they protect a distinct invariant, not because they existed on a worker branch.

No production file was modified by Chat 4.
