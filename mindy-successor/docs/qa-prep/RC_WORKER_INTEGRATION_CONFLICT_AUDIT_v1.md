# RC Worker Integration Conflict Audit v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Current main: `0450d46eb29c2551c4ecf55f994e0f271e82e3c7`

Worker heads reviewed:

- Chat 2 `chat2/presentation-activation-next` @ `84580f04945ceafdb3a69a255bc05483ec4aacc8`
- Chat 3 `chat3/lumber-integration-prep-next` @ `0d225ecfeefc47665df348f69943d148b36388e8`
- Chat 5 `chat5/school-save-compat-next` @ `cd6d466f27f0937ae6feab9594dac732510cc0f8`

All three worker branches diverged before PR20/PR21/PR22 and are currently 17 commits behind main.

Do not bulk merge any worker branch.

## Minimal integration recommendation

Integrate only distinct QA value, rebased onto current main:

1. Chat 2 `presentation-activation-acceptance.test.ts`
2. Chat 3 `lumber-ending-independence.test.ts`
3. Chat 5 `school-full-reload-matrix.test.ts`
4. Chat 5 `school-night-choice-catalog.test.ts`
5. Chat 5 `school-typed-state-compat.test.ts`

Every file should be applied as a test-level cherry-pick/rebase, not as a branch merge.

---

# Chat 2 — presentation

## SAFE TO ADAPT / CHERRY-PICK

### `presentation-activation-acceptance.test.ts`

Distinct value remains:

- activation semantic-slot determinism;
- pending event/reload identity;
- missing-primary-media fallback without mechanics mutation;
- Animation Off presentation-only behavior;
- ending semantic ID stability through commit/completion.

No shared runtime file is changed by the worker branch.

Before integration:

- run against current main presentation catalog;
- remove any isolated fixture assumption already replaced by production slots;
- keep positive slash semantic persistence.

## DOCS / EVIDENCE ONLY

### `PRESENTATION_SAVE_BOUNDARY_AUDIT_v1.md`

Historical defect provenance only.

PR20 fixed slash semantic save compatibility.

Do not use its pre-fix status as current truth.

## SUPERSEDED — DO NOT CHERRY-PICK

### `presentation-save-boundary.test.ts`

It explicitly expects canonical slash `presentationId` to be rejected.

Current main accepts semantic slash IDs.

This test is now wrong.

### `presentation-shipped-media-gap.test.ts`

Pre-PR20 gap test expects missing target media as a live product gap.

PR20 intentionally shipped static fallback assets.

Current release gate should check built media existence, not preserve a historical missing-media expectation.

## REDUNDANT / OPTIONAL

- `presentation-product-coverage.test.ts`
- `presentation-shipped-slot-closure.test.ts`
- associated coverage fixtures

Most useful assertions overlap:

- existing presentation tests;
- PR20/PR21 shipped evidence;
- Chat 4 shipped-dist smoke;
- the proposed activation-acceptance test.

Avoid parallel semantic-slot manifests unless one is adopted as the single maintained source.

---

# Chat 3 — Lumber

## SAFE TO ADAPT / CHERRY-PICK

### `lumber-ending-independence.test.ts`

Still distinct after PR22:

- Hard Work false at 49, true at 50;
- no extra prerequisite;
- Forest ending independent;
- Forewoman ending independent;
- exact `hardWork:lumber`;
- commit/completion/reload idempotency.

Required adaptation:

The file still uses old isolated fixture seams including synthetic:

`school.lumber-management`

for one Forewoman-path setup.

That setup may remain a narrowly labeled fixture for ending-independence testing, but must not be used as evidence that PA07/PA08 are shipped.

Prefer replacing only the setup with current accepted typed facts if a direct current-main fixture exists.

The Hard Work independence assertions themselves remain high-value.

## STALE AFTER PR22 — DO NOT CHERRY-PICK UNCHANGED

### `lumber-forest-acceptance-depth.test.ts`

It assumes:

- temporary worldFact capability adapter;
- immediate `advance` after Forest entry.

PR22 changed both assumptions:

- Forest entry is general;
- new option-aware Forest requires route selection;
- logging-road is the natural route;
- item capability comes from inventory definitions, not worldFact.

The useful A5 assertions are already covered by current main:

- PR22 closure test;
- PR22 shipped Product Acceptance test;
- existing Activity tests.

If any unique deterministic checkpoint assertion is needed, port that assertion into current route-aware tests rather than cherry-picking the file.

### `lumber-item-capability-integration-audit.test.ts`

Explicitly obsolete.

It asserts production excludes `old_boundary_token` from typed item APIs and that capability is a test-only worldFact adapter.

PR22 shipped the opposite accepted architecture:

- typed item definition;
- inventory-derived capability;
- capability-aware Activity option.

Do not integrate.

### `LUMBER_ITEM_CAPABILITY_INTEGRATION_AUDIT_v1.md`

Historical evidence only.

Its runtime-gap conclusion is superseded by PR22.

Its remaining acquisition/consume authoring concerns are now represented by current Chat 4 authoring ledgers.

## REDUNDANT

### `lumber-production-activation-contract.test.ts`

Most static activation assertions are now covered by:

- production validation;
- PR21/PR22 shipped PA test;
- Chat 4 shipped-dist contract;
- exact Hard Work tests.

Do not add another parallel manifest unless a unique assertion is identified.

---

# Chat 5 — School

## SAFE TO ADAPT / CHERRY-PICK

### `school-full-reload-matrix.test.ts`

High-value breadth:

- all eight paid courses;
- all supported Night-study course/stat combinations;
- tuition/Energy exactly once;
- full stat packages;
- reload behavior;
- unsupported combinations reject.

The worker file already sets:

`story.arrived=true`

so it avoids the early pre-PR20 fixture defect.

Before integration verify it matches current:

- first-class `schoolLesson`;
- typed `lessons_completed`;
- typed `night_study_sessions`;
- semantic presentation IDs.

### `school-night-choice-catalog.test.ts`

Still high-value:

- complete generated Night-study surface;
- stable choice IDs;
- course/track/stat mapping;
- +2 stat;
- zero tuition;
- next-day Energy -1;
- unsupported pairs absent.

Rebase against current School source and ensure expected effects include the typed Night counter where the executable choice effect is inspected.

### `school-typed-state-compat.test.ts`

Still useful:

- older schema-4-shaped save defaults missing School state;
- eight course IDs -> stable track IDs;
- paid/Night counters remain separate;
- no fabricated milestone/certificate thresholds.

Prefer wiring its compatibility assertion to real `parseSave` where possible instead of only fixture-shaped transformations.

## OPTIONAL / REDUNDANT

### `school-activation-expectations.test.ts`

Broadly overlaps current PR20/PR21 School tests plus the full reload matrix.

Port only unique assertions such as:

- no invented milestone threshold;
- no Lust mutation

if not already covered.

### `school-production-ui-fixture.test.ts`

PR20 now has actual School UI.

Prefer direct UI tests over a fixture-only UI manifest.

## DOCS / EVIDENCE

### `SCHOOL_PROGRESSION_OWNERSHIP_AUDIT_v1.md`

Still useful architectural evidence:

- School owns `lessons_completed`;
- Night study uses separate counter;
- legacy generic actionCounts are not authoritative progression;
- milestone/certificate thresholds are authoring-owned.

Safe to keep as documentation, but not required to run the RC.

---

# Shared runtime ownership conflicts

The reviewed worker branches do not carry current shared runtime changes; their diffs are mostly:

- tests;
- fixtures;
- prep docs/tasks.

The main conflict risk is semantic, not textual:

- pre-PR20 presentation assumptions;
- pre-PR22 worldFact capability assumptions;
- pre-PR22 immediate Forest `advance`;
- fixture-only School milestone assumptions.

Therefore:

**Do not cherry-pick by commit range.**

Copy/rebase named tests individually onto current main and run them there.

---

# Minimal release-candidate worker set

## Integrate

- Chat 2: `presentation-activation-acceptance.test.ts`
- Chat 3: `lumber-ending-independence.test.ts`
- Chat 5: `school-full-reload-matrix.test.ts`
- Chat 5: `school-night-choice-catalog.test.ts`
- Chat 5: `school-typed-state-compat.test.ts`

## Keep as evidence only

- Chat 2 presentation save-boundary audit doc
- Chat 3 Lumber capability audit doc
- Chat 5 School progression ownership audit doc

## Do not integrate unchanged

- Chat 2 negative slash-ID save test
- Chat 2 missing-media-gap test
- Chat 3 Forest depth test with worldFact adapter / immediate advance
- Chat 3 item-capability audit test
- redundant activation manifests
- worker task files

## Validation after integration

Run:

```text
typecheck
validate
build
full tests
shipped-dist smoke
schema-4 compatibility
```

A worker test that requires weakening current runtime or restoring a superseded product assumption should be rejected rather than “fixed” by production changes.

No production runtime/UI/content file was modified by Chat 4.
