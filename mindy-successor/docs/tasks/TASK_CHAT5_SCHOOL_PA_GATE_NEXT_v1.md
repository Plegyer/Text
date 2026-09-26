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
