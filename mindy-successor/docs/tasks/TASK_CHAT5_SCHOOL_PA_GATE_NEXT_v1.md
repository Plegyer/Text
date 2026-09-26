# TASK CHAT 5 — School Product Acceptance Gate Continuation v1

Status: ACTIVE / CONTINUOUS.
Base: completed `chat5/school-night-ui-contract-next`.
Previous checkpoint is frozen for Lead review.

Locked School mechanics remain unchanged.
Do not edit Lead-owned shared runtime/schema/build/UI while `lead/product-activation-school-lumber-v2` is active.

## Queue item 1 — School Product Acceptance executable scenario

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/school-pa-executable-scenario.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-pa-executable-scenario.test.ts`

Cover arrived run -> one of eight paid courses -> atomic tuition + 1 Energy -> full stat package -> typed `lessons_completed` -> semantic presentation -> save/reload -> NightFlow -> lodging -> School Night study -> typed `night_study_sessions` -> next-day -1 Energy exactly once.

## Queue item 2 — School typed progress exactly-once matrix

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/school-typed-progress-exactly-once.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-typed-progress-exactly-once.test.ts`

For all eight courses verify paid lessons increment only `lessons_completed`; representative Night choices increment only `night_study_sessions`; reload never duplicates either.

## Queue item 3 — School UI disabled-state matrix

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/school-ui-disabled-state.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-ui-disabled-state.test.ts`

Cover all eight courses under:
- insufficient money;
- insufficient Energy;
- not arrived;
- pending scene;
- active Night;
- active Activity;
- normal enabled state.

No invented prerequisites.

## Queue item 4 — School schema-4 compatibility matrix

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/school-schema4-compat.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-schema4-compat.test.ts`

Prove fixture-level expectations for old schema-4 saves missing School-owned progression and new saves containing School track state. Other progression domains must remain unchanged.

## Queue item 5 — School/Lumber public-boundary negative suite

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/school-lumber-negative-boundary.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-lumber-negative-boundary.test.ts`

Prove:
- no invented management/certificate threshold;
- no invented Arcana/forest threshold;
- typed School counters do not leak directly into Lumber;
- public cross-system facts remain the only durable boundary;
- Hard Work never depends on School.

## Queue item 6 — School full reload chronology

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/school-full-reload-chronology.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-full-reload-chronology.test.ts`

Chronology:
paid lesson -> reload -> end day -> lodging -> reload -> Night study -> reload -> day advance -> reload.
Verify money, current-day Energy, next-day Energy modifier, stat package, `lessons_completed`, `night_study_sessions`, presentation identity and no Lust mutation.

Continue sequentially through items 1–6 without waiting for Lead review.


## Queue item 7 — School production catalog parity

Create NEW files:
- `prior-work/astra/prototype-m3.2/content/school-production-catalog-parity.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-production-catalog-parity.test.ts`

Cross-check all eight course definitions and 24 Night-study choices against current accepted School constants/contracts. No invented School production pack event is required.

## Queue item 8 — School Night choice label/presentation matrix

Create NEW files:
- `prior-work/astra/prototype-m3.2/content/school-night-presentation.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-night-presentation.test.ts`

Verify all 24 Night choices map deterministically to course/track/stat and a stable Night presentation family without changing course gameplay IDs.

## Queue item 9 — School Resolver trigger matrix

Create NEW files:
- `prior-work/astra/prototype-m3.2/content/school-resolver-trigger-matrix.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-resolver-trigger-matrix.test.ts`

Document/test reaction facts emitted by a paid lesson: actionCompleted, all statChanged facts, resourceChanged, energyChanged, and same-boundary endingEligible when applicable. No partial package boundary.

## Queue item 10 — School save compatibility adversarial suite

Create NEW test:
- `prior-work/astra/prototype-m3.2/tests/school-save-compat-adversarial.test.ts`

Cover missing default School state, malformed trackId/key mismatch, unknown track, duplicate/replayed counters, pending semantic School presentationId and NightFlow reload checkpoints.

## Queue item 11 — School PA row mapping

Create:
- `docs/school-prep/SCHOOL_PRODUCT_ACCEPTANCE_ROW_MAP_v1.md`
- optional NEW test.

Map relevant PA rows to exact School commands/course IDs/Night choices/reload points and identify only genuine OPEN public-fact authoring.

## Queue item 12 — School release-readiness checklist

Create:
- `docs/school-prep/SCHOOL_RELEASE_READINESS_v1.md`

Summarize paid lessons, typed progress, Resolver visibility, Night study, UI reachability expectations, save compatibility, cross-system public boundary and remaining OPEN authoring.

Continue items 7–12 sequentially without waiting for Lead review.


## Queue item 13 — School PA shipped-row evidence matrix

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/school-pa-shipped-row-evidence.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-pa-shipped-row-evidence.test.ts`

Map School-related PA rows to exact first-class `schoolLesson` / NightFlow behavior.
Separate:
- paid lesson transaction already shipped;
- typed progress already shipped;
- presentation/save/reload already shipped;
- missing public fact authoring required for Lumber continuation.

## Queue item 14 — School public-fact authoring packet

Create:
- `docs/school-prep/SCHOOL_PUBLIC_FACT_AUTHORING_PACKET_v1.md`
- `prior-work/astra/prototype-m3.2/content/school-public-fact-authoring.fixture.json`

Specify an authoring contract for future School milestones that may emit public cross-system facts. The packet must NOT choose final thresholds for:
- management/accounting;
- Arcana/forest knowledge.

Define ownership, exactly-once emission, reload stability and Resolver boundary only.

## Queue item 15 — School teacher/presentation depth gap matrix

Create:
- `docs/school-prep/SCHOOL_PRESENTATION_DEPTH_GAP_v1.md`
- `prior-work/astra/prototype-m3.2/tests/school-presentation-depth-gap.test.ts`

Compare current eight-course product surface against PA requirement that School has track/teacher/presentation/progress. Identify which parts are shipped and which are still content-depth gaps. Do not fabricate teacher identities or milestones.

## Queue item 16 — School low-money/no-softlock contract

Create NEW files:
- `prior-work/astra/prototype-m3.2/content/school-low-money-safety.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-low-money-safety.test.ts`

Verify School itself fails atomically under insufficient money/Energy and does not corrupt the run. Document how normal non-School actions remain available; do not claim economy-wide no-softlock unless the current product evidence proves it.

## Queue item 17 — School PA blocker burn-down ledger

Create:
- `docs/school-prep/SCHOOL_PA_BLOCKER_BURNDOWN_v1.md`

Reduce all School OPEN issues to the smallest remaining set after production activation. Map each to exact PA rows and distinguish:
- runtime blocker;
- content authoring blocker;
- presentation/content-depth gap;
- already closed.

## Queue item 18 — School integration handoff manifest

Create:
- `docs/school-prep/SCHOOL_INTEGRATION_HANDOFF_v1.md`
- `prior-work/astra/prototype-m3.2/content/school-integration-handoff.fixture.json`

Deduplicate Chat 5 artifacts into:
- MUST_INTEGRATE;
- QA_EVIDENCE_ONLY;
- SUPERSEDED;
- OPEN_AUTHORING_PACKET.

Do not request shared runtime changes for already-green typed School progress unless a concrete failing contract proves one is necessary.

Continue items 13–18 sequentially without waiting for Lead review.


## Queue item 19 — School PA closure dependency audit

Create NEW files only:
- `docs/school-prep/SCHOOL_PA_CLOSURE_DEPENDENCY_AUDIT_v1.md`
- `prior-work/astra/prototype-m3.2/tests/school-pa-closure-dependency.test.ts`

Using the current Product Acceptance gate result, classify every remaining School-related blocker as:
- already shipped;
- presentation/content-depth only;
- OPEN authoring;
- runtime-independent external blocker.

At minimum cover PA07/PA08 and the School-facing part of Forewoman/Forest routes.
Do not invent final public fact IDs, thresholds, certificates, teacher identities or projects.

## Queue item 20 — School public-fact authoring preflight validator

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/school-public-fact-preflight.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-public-fact-preflight.test.ts`

Define a preflight contract for future School-authored public facts:
- School owns the private trigger/progression;
- publication crosses through worldFacts/domain-public boundary;
- emitted fact ID must be explicitly declared;
- exactly-once across reload;
- no direct Lumber private-state mutation;
- no private School counter may be read directly by Lumber.

Include invalid examples that must reject. Keep actual management/Arcana fact IDs OPEN.

## Queue item 21 — School course/track ownership consistency suite

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/school-course-track-ownership.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-course-track-ownership.test.ts`

For all eight courses verify:
- exactly one stable courseId -> trackId mapping;
- paid lesson increments only that track's `lessons_completed`;
- Night study increments only that track's `night_study_sessions`;
- no other track counter mutates;
- gameplay IDs and semantic presentation IDs remain stable.

No shared runtime edits.

## Queue item 22 — School Night production parity after PR21

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/school-night-production-parity.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-night-production-parity.test.ts`

Cross-check the accepted 24-choice School Night catalog against the shipped Night rules:
- normal/cheap availability;
- street restriction;
- tuition 0;
- current-day Energy 0;
- +2 supported stat;
- next-day Energy -1;
- one Night slot;
- typed `night_study_sessions`;
- save/reload exactly-once expectation.

Do not patch NightFlow or UI.

## Queue item 23 — School PA no-false-green audit

Create:
- `docs/school-prep/SCHOOL_PA_NO_FALSE_GREEN_AUDIT_v1.md`
- optional NEW test `prior-work/astra/prototype-m3.2/tests/school-pa-no-false-green.test.ts`

Identify every School fixture/accelerator that could be mistaken for a full product pass:
- synthetic public fact;
- direct typed counter setup;
- direct track state setup;
- fixture-only certificate/milestone placeholder;
- direct worldFact injection.

Classify each as legitimate isolated evidence vs forbidden Product Acceptance pass evidence.

## Queue item 24 — School release-candidate handoff v2

Create:
- `docs/school-prep/SCHOOL_RELEASE_CANDIDATE_HANDOFF_v2.md`
- `prior-work/astra/prototype-m3.2/content/school-release-candidate-handoff.fixture.json`

Consolidate all Chat 5 work after PR21 into:
- READY_TO_INTEGRATE_NOW;
- QA_EVIDENCE_ONLY;
- OPEN_AUTHORING_PACKET;
- PRESENTATION_CONTENT_DEPTH;
- SUPERSEDED.

Name exact files in each class and keep the final management/accounting and Arcana/Forest public-fact authoring explicitly OPEN.

Continue items 19–24 sequentially without waiting for Lead review.
