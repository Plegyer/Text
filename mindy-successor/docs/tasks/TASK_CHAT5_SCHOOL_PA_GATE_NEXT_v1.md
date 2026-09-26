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


## Queue item 25 — School release-candidate coverage ledger

Create NEW files only:
- `docs/school-prep/SCHOOL_RC_COVERAGE_LEDGER_v1.md`
- `prior-work/astra/prototype-m3.2/content/school-rc-coverage.fixture.json`

Create one deduplicated release-candidate ledger for:
- all 8 paid courses;
- all 24 Night-study course/stat choices;
- typed `lessons_completed`;
- typed `night_study_sessions`;
- semantic presentation IDs;
- save/reload boundaries;
- Lumber-facing public-boundary hooks.

Classify each row:
- SHIPPED;
- QA_ONLY;
- OPEN_AUTHORING;
- CONTENT_DEPTH_ONLY.

Do not invent management/Arcana thresholds.

## Queue item 26 — School old-save/default-state compatibility deep matrix

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/school-old-save-defaults.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-old-save-defaults.test.ts`

Cover schema4 saves from before typed School progress existed:
- no `progression.school`;
- empty School tracks;
- unrelated career/quest/relationship progress;
- pending non-School scene;
- pending School presentationId if present;
- NightFlow active.

Expected:
- safe default School state;
- unrelated progression preserved exactly;
- no phantom lessons/certificates/public facts.

## Queue item 27 — School public-boundary exactly-once publication contract

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/school-public-boundary-exactly-once.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-public-boundary-exactly-once.test.ts`

Define future publication semantics without selecting final milestone thresholds:
- private School state reaches an authored milestone;
- one explicit public fact is emitted;
- reload before/after publication cannot duplicate it;
- Lumber sees only the public fact;
- removing/replaying private counters cannot silently re-emit after commit.

Actual final management and Arcana public fact identities may remain OPEN unless already authoritative.

## Queue item 28 — School Night/paid-course interaction exclusion matrix

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/school-day-night-interaction.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-day-night-interaction.test.ts`

Verify:
- paid lesson cannot execute inside active NightFlow;
- paid lesson cannot execute inside active Activity;
- Night study cannot be selected before Night voluntary-choice phase;
- Night study never increments paid-lesson counter;
- paid lesson never increments Night-study counter;
- save/reload preserves these exclusions.

No shared runtime changes.

## Queue item 29 — School presentation/content-depth release gap

Create:
- `docs/school-prep/SCHOOL_RC_PRESENTATION_CONTENT_GAP_v1.md`
- optional NEW test `prior-work/astra/prototype-m3.2/tests/school-rc-presentation-content-gap.test.ts`

Separate:
- mechanics-ready course surface;
- semantic presentation-ready surface;
- missing teacher identities;
- missing milestone/certificate/project authoring;
- future GIF/static asset depth.

Do not turn presentation polish into a mechanics blocker.

## Queue item 30 — School final integration handoff v3

Create:
- `docs/school-prep/SCHOOL_FINAL_INTEGRATION_HANDOFF_v3.md`
- `prior-work/astra/prototype-m3.2/content/school-final-integration-handoff.fixture.json`

Consolidate Chat 5 items 1–29 into:
- MUST_INTEGRATE;
- QA_ONLY;
- OPEN_AUTHORING;
- CONTENT_DEPTH;
- PRESENTATION_FUTURE;
- SUPERSEDED.

Name exact files and recommend a minimal non-redundant Lead integration subset.

Continue items 25–30 sequentially without waiting for Lead review.


## Queue item 31 — PR24 one-Save School state audit

Create NEW files only:
- `docs/school-prep/SCHOOL_PR24_ONE_SAVE_STATE_AUDIT_v1.md`
- `prior-work/astra/prototype-m3.2/tests/school-pr24-one-save-state-audit.test.ts`

Review the current Lead one-Save shipped E2E path from the School perspective:
Lumber -> Foreman -> paid Arcana lesson -> shipped School blocking scene -> Night -> Forest -> ending -> New Run.

Verify:
- Arcana tuition 500 exactly once;
- paid lesson costs 1 current-day Energy exactly once;
- full stat package is applied atomically;
- `lessons_completed` increments once;
- semantic `school/arcana/lesson/default` persists correctly;
- first School blocking scene is resolved before NightFlow;
- no School management/accounting public fact is fabricated;
- unrelated Lumber/Forest/Meta state survives the School transaction.

Do not edit shared runtime/UI.

## Queue item 32 — School blocking-scene compatibility contract

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/school-blocking-scene-compat.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-blocking-scene-compat.test.ts`

Cover interaction between first-class `schoolLesson` and legacy-compatible blocking School events.

Verify:
- a paid lesson may legitimately open a blocking scene;
- NightFlow cannot begin until it is resolved;
- save/reload preserves the pending School scene;
- resolving the scene does not re-charge tuition/Energy;
- typed School progress is not duplicated;
- presentation identity remains stable.

## Queue item 33 — School RC state-drift sentinel

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/school-rc-state-drift-sentinel.test.ts`

Build sentinels around a paid lesson inside a longer shared Save:
- money delta;
- daytime Energy delta;
- all affected stats;
- `lessons_completed`;
- `night_study_sessions`;
- pending scene state;
- unrelated career/relationship/quest progress;
- no phantom public facts.

Fail on duplication/reset of unrelated subsystems.

## Queue item 34 — School authoring decision-ready packet

Create:
- `docs/school-prep/SCHOOL_AUTHORING_DECISION_READY_PACKET_v1.md`
- `prior-work/astra/prototype-m3.2/content/school-authoring-decision-ready.fixture.json`

Turn remaining School authoring gaps into explicit human/product decisions.

At minimum cover:
- management/accounting public-result provider;
- management/accounting threshold/milestone type;
- Arcana/Forest public-result provider;
- Arcana/Forest threshold/milestone type;
- teacher identities/content depth;
- certificate/project authoring if still OPEN.

For each list:
- acceptable answer types;
- downstream files/systems affected;
- PA rows affected;
- runtime already ready vs runtime change needed.

Do NOT choose a preferred answer.

## Queue item 35 — School RC no-false-green sentinel v2

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/school-rc-no-false-green-v2.test.ts`

Fail if any RC School artifact:
- treats direct worldFact injection as authored School result;
- treats direct typed counter setup as ordinary player progression;
- invents a management/certificate threshold;
- invents Arcana/Forest threshold/provider;
- lets paid lessons increment `night_study_sessions`;
- lets Night study increment `lessons_completed`;
- changes Hard Work eligibility through School.

## Queue item 36 — School final decision/evidence handoff v4

Create:
- `docs/school-prep/SCHOOL_FINAL_DECISION_EVIDENCE_HANDOFF_v4.md`
- `prior-work/astra/prototype-m3.2/content/school-final-decision-evidence-handoff.fixture.json`

Consolidate all post-PR23 School work into:
- SHIPPED_GREEN;
- MUST_INTEGRATE_QA;
- HUMAN_DECISION_REQUIRED;
- CONTENT_DEPTH;
- PRESENTATION_FUTURE;
- SUPERSEDED.

Name exact files and identify the smallest Lead integration subset.

Continue items 31–36 sequentially without waiting for Lead review.
