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


## Queue item 37 — PR25 School final-gate review

Create NEW files only:
- `docs/school-prep/SCHOOL_PR25_FINAL_GATE_REVIEW_v1.md`
- `prior-work/astra/prototype-m3.2/tests/school-pr25-final-gate-review.test.ts`

Review current PR #25 from the School perspective.

Confirm:
- first-class `schoolLesson` remains atomic;
- real blocking School scene is preserved;
- resolving the scene does not recharge tuition/Energy or duplicate typed progress;
- NightFlow remains blocked until the scene is resolved;
- no management/accounting public fact is fabricated;
- no Arcana/Forest threshold/provider is invented;
- no production School runtime/UI change occurs in PR #25.

## Queue item 38 — School long-Save state preservation matrix

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/school-long-save-state-preservation.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-long-save-state-preservation.test.ts`

Using the merged one-Save path model, verify School preserves unrelated domains:
- Lumber career stage/counters;
- Foreman relationship route;
- money;
- Energy;
- Night state;
- Forest facts;
- ending eligibility;
- Meta.

School transaction must mutate only its owned resources/stats/typed progress plus legitimate Resolver output.

## Queue item 39 — School public-result decision impact matrix

Create:
- `docs/school-prep/SCHOOL_PUBLIC_RESULT_DECISION_IMPACT_v1.md`
- `prior-work/astra/prototype-m3.2/content/school-public-result-decision-impact.fixture.json`

For each unresolved School public-result decision, map:
- authoring source;
- threshold/milestone type;
- exact downstream Lumber listener;
- save/reload semantics;
- Resolver publication boundary;
- PA rows affected;
- tests/content files affected.

Do not select final provider or threshold.

## Queue item 40 — School teacher/content-depth completeness negative suite

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/school-content-depth-negative.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-content-depth-negative.test.ts`

Truthfully detect that current School mechanics may be RC-ready while teacher/certificate/project/content depth remains incomplete.

Fail any artifact that falsely labels missing teacher identities or milestone/certificate authoring as already shipped.

Do not invent them.

## Queue item 41 — School final RC acceptance matrix

Create:
- `docs/school-prep/SCHOOL_FINAL_RC_ACCEPTANCE_MATRIX_v1.md`
- optional NEW test.

Classify School-related acceptance areas as:
- SHIPPED_GREEN;
- QA_GREEN;
- HUMAN_DECISION_REQUIRED;
- CONTENT_DEPTH_OPEN;
- PRESENTATION_ASSET_OPEN.

Use merged PR24/PR25 behavior as current source of truth.

## Queue item 42 — School final evidence pack v5

Create:
- `docs/school-prep/SCHOOL_FINAL_EVIDENCE_PACK_v5.md`
- `prior-work/astra/prototype-m3.2/content/school-final-evidence-pack.fixture.json`

Produce the smallest non-redundant Lead handoff:
- exact tests worth integrating;
- exact docs worth indexing;
- human decisions required;
- content-depth backlog;
- superseded artifacts.

Continue items 37–42 sequentially without waiting for Lead review.


## Queue item 43 — PR26/PR27 School authority reconciliation

Create NEW file only:
- `docs/school-prep/SCHOOL_PR27_MAIN_RECONCILIATION_v1.md`

Reconcile School evidence against current main after PR #26, PR #27 and the direct post-merge docs commits.

Confirm:
- technical RC floor is 221/221;
- missing schema4 `progression.school` compatibility defaults to `{tracks:{}}` without changing School ownership rules;
- paid lessons, blocking School scene and Night study contracts remain locked;
- management/accounting and Arcana/Forest public-result authoring remain OPEN.

Do not edit production runtime/UI/content.

## Queue item 44 — management/accounting decision option schema

Create NEW files only:
- `docs/school-prep/SCHOOL_MANAGEMENT_RESULT_DECISION_SCHEMA_v1.md`
- `prior-work/astra/prototype-m3.2/content/school-management-result-decision-schema.fixture.json`

Define neutral acceptable answer shapes for the management/accounting public result:
- provider type;
- milestone type;
- threshold/value type;
- durable public result identifier constraints;
- publication timing;
- exactly-once/reload expectations.

Map downstream Lumber listener/test impact without selecting any provider, threshold, certificate or project.

## Queue item 45 — Arcana/Forest decision option schema

Create NEW files only:
- `docs/school-prep/SCHOOL_ARCANA_FOREST_RESULT_DECISION_SCHEMA_v1.md`
- `prior-work/astra/prototype-m3.2/content/school-arcana-forest-result-decision-schema.fixture.json`

Define neutral acceptable answer shapes for the Arcana/Forest public result:
- provider/milestone category;
- threshold/value category;
- durable publication boundary;
- Forest/Lumber consumer expectations;
- save/reload and exactly-once requirements.

Do not invent a final provider, threshold, teacher, certificate, or route unlock.

## Queue item 46 — School teacher and milestone content-depth template

Create NEW file only:
- `docs/school-prep/SCHOOL_CONTENT_DEPTH_AUTHORING_TEMPLATE_v1.md`

Prepare a fill-in authoring template for human/Product completion of:
- teacher identity and role per track;
- milestone/certificate/project content;
- presentation hooks;
- public-result publication points where applicable;
- validation/acceptance notes.

The template must clearly distinguish LOCKED mechanics from OPEN authored content and must not fill the OPEN fields itself.

## Queue item 47 — post-decision School verification matrix

Create NEW file only:
- `docs/school-prep/SCHOOL_POST_DECISION_VERIFICATION_MATRIX_v1.md`

For each still-open School human decision, list the exact validation work required after a choice is made:
- production content file(s) expected to change;
- resolver/public-result tests;
- save/reload tests;
- no-double-charge/no-duplicate-progress checks;
- Lumber/Forest integration checks;
- presentation semantic-ID checks.

Do not pre-author the decision.

## Queue item 48 — School product-authoring handoff v6

Create NEW files only:
- `docs/school-prep/SCHOOL_PRODUCT_AUTHORING_HANDOFF_v6.md`
- `prior-work/astra/prototype-m3.2/content/school-product-authoring-handoff-v6.fixture.json`

Produce the smallest current-main School handoff with:
- LOCKED_AND_SHIPPED;
- TECHNICAL_QA_GREEN;
- HUMAN_DECISION_REQUIRED;
- CONTENT_AUTHORING_REQUIRED;
- OPTIONAL_PRESENTATION_POLISH;
- READY_AFTER_DECISION;
- SUPERSEDED.

Name exact current authoritative School files and keep all unresolved provider/threshold/content choices neutral.

Continue items 43–48 sequentially without waiting for Lead review.


## Queue item 49 — eight-track teacher authoring matrix

Create NEW files only:
- `docs/school-prep/SCHOOL_EIGHT_TRACK_TEACHER_AUTHORING_MATRIX_v1.md`
- `prior-work/astra/prototype-m3.2/content/school-eight-track-teacher-authoring.fixture.json`

For all eight School tracks, provide structured OPEN fields for:
- teacher/presenter identity;
- role in world;
- lesson tone;
- relationship hooks;
- milestone role;
- presentation needs.

Do not invent canonical identities. Preserve existing course mechanics and stat packages.

## Queue item 50 — School milestone type comparison packet

Create NEW file only:
- `docs/school-prep/SCHOOL_MILESTONE_TYPE_COMPARISON_PACKET_v1.md`

Compare acceptable authored milestone forms already allowed by project direction:
- lesson-count milestone;
- exam;
- project;
- certificate;
- mixed authored gate.

For management/accounting and Arcana/Forest, map consequences for content, public-result publication, save/reload and downstream consumers without selecting a winner.

## Queue item 51 — School public-result publication contract draft

Create NEW files only:
- `docs/school-prep/SCHOOL_PUBLIC_RESULT_PUBLICATION_CONTRACT_DRAFT_v1.md`
- `prior-work/astra/prototype-m3.2/content/school-public-result-publication-contract.fixture.json`

Define a generic content-authoring contract for School-owned public results:
- stable result ID;
- private trigger stays School-owned;
- publication exactly once;
- reload idempotency;
- downstream systems consume only public result;
- no direct read of School-private counters.

Keep actual management/Arcana IDs and thresholds OPEN unless authoritative.

## Queue item 52 — School content production unit template

Create NEW file only:
- `docs/school-prep/SCHOOL_CONTENT_PRODUCTION_UNIT_TEMPLATE_v1.md`

Create the reusable authoring unit for a School content scene:
- track/course;
- teacher/presenter;
- trigger/milestone;
- text variants;
- semantic presentationId;
- GIF/static/text fallback;
- public result if any;
- tests/acceptance.

Designed for rapid parallel content production after human decisions.

## Queue item 53 — School-to-career integration inventory

Create NEW file only:
- `docs/school-prep/SCHOOL_TO_CAREER_INTEGRATION_INVENTORY_v1.md`

Using authoritative career drafts, inventory intended School hooks across all ordinary careers plus Palace/Secret Debt where applicable.

Classify:
- explicit existing hook;
- draft hook;
- authoring needed;
- no School dependency intended.

Do not create new prerequisites or let School affect Lumber Hard Work.

## Queue item 54 — School production continuity pack v7

Create NEW file only:
- `docs/school-prep/SCHOOL_PRODUCTION_CONTINUITY_PACK_v7.md`

Consolidate items 49–53 with current School technical baseline:
- eight paid tracks;
- Night study separation;
- public/private boundary;
- OPEN human decisions;
- reusable production templates;
- next production-ready work after decisions.

Continue items 49–54 sequentially without waiting for Lead review.


## Queue item 55 — School teacher/lesson variant authoring template

Create NEW file only:
- `docs/school-prep/SCHOOL_TEACHER_LESSON_VARIANT_TEMPLATE_v1.md`

Define a reusable authored-content unit for teacher-led School variants:
- track/course;
- teacher identity placeholder;
- lesson/milestone context;
- text/media variants;
- relationship hook allowance;
- public-result publication if approved;
- semantic presentationId;
- GIF/static/text fallback;
- acceptance checks.

Do not invent canonical teachers or thresholds.

## Queue item 56 — School career-hook validation checklist

Create NEW file only:
- `docs/school-prep/SCHOOL_CAREER_HOOK_VALIDATION_CHECKLIST_v1.md`

For future School-to-career authored hooks, require:
- public result owned by School;
- downstream career reads only the public boundary;
- no private School counter leakage;
- save/reload idempotency;
- no double tuition/Energy/progress;
- no accidental Hard Work prerequisite;
- presentation identity stability.

Make it reusable across all careers.

## Queue item 57 — School implementation package boundary v1

Create NEW file only:
- `docs/school-prep/SCHOOL_IMPLEMENTATION_PACKAGE_BOUNDARY_v1.md`

Define the smallest future implementation/content packages for:
- teacher identity/content;
- management/accounting public result;
- Arcana/Forest public result if retained;
- milestone/certificate/project/exam content;
- cross-career integration;
- presentation assets.

Separate human decisions from content authoring and runtime changes.

Continue items 49–57 sequentially without waiting for Lead review.


## Queue item 58 — School balance-parameter ledger

Create NEW file only:
- `docs/school-prep/SCHOOL_BALANCE_PARAMETER_LEDGER_v1.md`

Inventory School values that remain balance/Product-owned versus mechanics already locked:
- tuition values;
- course stat-package numbers where already locked vs still tunable;
- management/accounting milestone threshold;
- Arcana/Forest milestone threshold;
- certificate/project/exam thresholds if adopted;
- Night study values that are already locked and therefore must be marked non-open.

For each open value identify affected tracks, simulations/acceptance needed, and whether the eventual change is balance-data, content-authoring, or runtime.

Do not choose final numbers or reopen locked Night-study mechanics.

Continue items 50–58 sequentially without waiting for Lead review.


## Queue item 59 — School authoring batch-plan template

Create NEW file only:
- `docs/school-prep/SCHOOL_AUTHORING_BATCH_PLAN_TEMPLATE_v1.md`

Define how approved School content can be produced in parallel batches after Product decisions:
- teacher identity batch;
- repeatable lesson variant batch;
- milestone/project/exam batch;
- public-result publication batch;
- career integration batch;
- presentation/GIF batch.

For each batch list required inputs, owned files, validation evidence and dependencies. Preserve one-file-one-owner and do not choose OPEN content.

Continue items 51–59 sequentially without waiting for Lead review.


## Queue item 60 — School public-result consumer crosswalk

Create NEW file only:
- `docs/school-prep/SCHOOL_PUBLIC_RESULT_CONSUMER_CROSSWALK_v1.md`

Map every currently documented or intended School public-result consumer across:
- Lumber;
- other ordinary careers;
- Forest/Activity;
- relationships;
- Palace/Meta where applicable.

For each distinguish:
- current shipped consumer;
- draft consumer;
- Product decision required;
- content authoring required;
- no dependency intended.

Never allow downstream systems to read School-private counters directly and do not invent new Hard Work prerequisites.

Continue items 52–60 sequentially without waiting for Lead review.


## Queue item 61 — School authored-scene completeness matrix template

Create NEW file only:
- `docs/school-prep/SCHOOL_AUTHORED_SCENE_COMPLETENESS_TEMPLATE_v1.md`

Provide a reusable completeness matrix for each School track:
- repeatable lesson variants;
- teacher/presenter scenes;
- milestone scenes;
- relationship/career reaction hooks;
- public-result scene if approved;
- Night-study presentation;
- ending/Meta relevance if any;
- semantic presentation coverage;
- save/reload acceptance.

Keep all not-yet-authored content OPEN rather than filling it.

Continue items 53–61 sequentially without waiting for Lead review.


## Queue item 62 — School repeatable-lesson content batch plan

Create NEW file only:
- `docs/school-prep/SCHOOL_REPEATABLE_LESSON_CONTENT_BATCH_PLAN_v1.md`

Plan parallel authoring of repeatable lesson variants across all eight tracks while preserving fixed course mechanics.

For each track specify:
- number/type of reusable text/media variant slots to author as a bounded batch;
- teacher dependency;
- semantic presentation reuse;
- validation against unchanged tuition/Energy/stat package;
- relationship/career reaction hooks kept outside the base transaction unless explicitly authored.

Do not set final prose quotas as Product locks; label batch sizes as production planning values.

Continue items 54–62 sequentially without waiting for Lead review.


## Queue item 63 — School Product-decision intake template

Create NEW file only:
- `docs/school-prep/SCHOOL_PRODUCT_DECISION_INTAKE_TEMPLATE_v1.md`

Create a fill-in template for human decisions on:
- management/accounting provider and milestone;
- Arcana/Forest provider and milestone;
- teacher identities;
- certificate/project/exam participation;
- content/presentation priorities.

For each field record downstream content/runtime/test impact while preserving locked course and Night-study mechanics.

Continue items 55–63 sequentially without waiting for Lead review.


## Queue item 64 — School teacher-relationship boundary template

Create NEW file only:
- `docs/school-prep/SCHOOL_TEACHER_RELATIONSHIP_BOUNDARY_TEMPLATE_v1.md`

Define how future teacher/presenter relationships may interact with School while preserving ownership:
- School owns lesson transaction/progress;
- relationship domain owns relationship state;
- public results bridge systems;
- teacher relationship cannot silently become a paid-lesson prerequisite;
- Night/relationship scenes remain separate from School payment;
- save/reload remains exactly-once.

Leave teacher identities and relationship content OPEN.

Continue items 56–64 sequentially without waiting for Lead review.


## Queue item 65 — School milestone presentation dependency map

Create NEW file only:
- `docs/school-prep/SCHOOL_MILESTONE_PRESENTATION_DEPENDENCY_MAP_v1.md`

Map presentation dependencies for each allowed milestone form:
- lesson-count milestone;
- exam;
- project;
- certificate;
- mixed authored gate.

For each identify what must be decided/authored before semantic presentation IDs and GIF/static assets can be finalized. Do not select a milestone form.

Continue items 57–65 sequentially without waiting for Lead review.


## Queue item 66 — School production test-case inventory

Create NEW file only:
- `docs/school-prep/SCHOOL_PRODUCTION_TEST_CASE_INVENTORY_v1.md`

Inventory executable/future tests for:
- all eight paid courses;
- Night study;
- teacher-authored variants;
- milestones;
- management/accounting public result;
- Arcana/Forest public result;
- career consumers;
- save/reload exactly once;
- presentation fallback.

Classify each case as executable now, Product-decision blocked, content blocked, or future runtime work. Do not invent thresholds/providers.

Continue items 58–66 sequentially without waiting for Lead review.


## Queue item 67 — School balance simulation scenario template

Create NEW file only:
- `docs/school-prep/SCHOOL_BALANCE_SIMULATION_SCENARIO_TEMPLATE_v1.md`

Define future simulation scenarios for:
- fresh-run School access;
- work + School economy;
- repeated single-track investment;
- mixed-track build correction;
- Night study usage;
- poverty pressure;
- Meta-assisted later life.

Specify measurable outputs while preserving locked course mechanics and leaving OPEN thresholds/providers undecided.

Continue items 59–67 sequentially without waiting for Lead review.


## Queue item 68 — School production pack file-layout plan

Create NEW file only:
- `docs/school-prep/SCHOOL_PRODUCTION_PACK_FILE_LAYOUT_v1.md`

Define a scalable file/package layout for future authored School content:
- base repeatable lesson variants;
- teacher-specific packs;
- milestone/public-result packs;
- cross-career reaction packs;
- presentation/media mapping.

The layout must preserve explicit inclusion, avoid one giant pack, and keep fixture-only authoring out of production. Do not modify current production files.

Continue items 60–68 sequentially without waiting for Lead review.


## Queue item 69 — School cross-system authoring dependency matrix

Create NEW file only:
- `docs/school-prep/SCHOOL_CROSS_SYSTEM_AUTHORING_DEPENDENCIES_v1.md`

Map School authoring dependencies with:
- all 10 ordinary careers;
- ordinary poverty/housing;
- Secret Debt/Slave where relevant;
- relationships;
- Night;
- items;
- Forest/Activity;
- Palace/Meta.

For each distinguish current explicit dependency, optional hook, Product decision required, content authoring required, and no-dependency intended. Do not invent prerequisites.

Continue items 61–69 sequentially without waiting for Lead review.


## Queue item 70 — School ending/meta interaction inventory

Create NEW file only:
- `docs/school-prep/SCHOOL_ENDING_META_INTERACTION_INVENTORY_v1.md`

Inventory where School is intended to contribute to:
- career endings;
- relationship endings;
- education-specific endings if still in scope;
- Palace/meta routes.

For each classify current authority, authored content needed, public-result boundary, and whether Meta reward details remain open. Explicitly preserve Lumber Hard Work independence from School.

Continue items 62–70 sequentially without waiting for Lead review.


## Queue item 71 — School Palace/meta dependency boundary

Create NEW file only:
- `docs/school-prep/SCHOOL_PALACE_META_DEPENDENCY_BOUNDARY_v1.md`

Map what School may contribute to Palace/meta progression while preserving:
- Palace unlock = Hard Work on all 10 ordinary careers only;
- School cannot become an additional Palace unlock prerequisite without a new direct decision;
- School public results may still influence Palace content after unlock;
- education endings/meta rewards remain separate from ordinary Hard Work counting.

Keep exact Palace/School content and rewards OPEN.

Continue items 63–71 sequentially without waiting for Lead review.


## Queue item 72 — School human-decision packet v2

Create NEW file only:
- `docs/school-prep/SCHOOL_HUMAN_DECISION_PACKET_v2.md`

Consolidate only current School decisions that require human/Product input:
- management/accounting provider;
- management/accounting milestone form/value;
- Arcana/Forest provider;
- Arcana/Forest milestone form/value and whether retained in scope;
- teacher/presenter identities;
- whether certificates/projects/exams participate in minimum authored School;
- any truly blocking presentation priority.

For each record:
- locked surrounding mechanics;
- acceptable answer shape;
- downstream content/runtime/tests affected;
- what can proceed without the answer.

Do not recommend a preferred choice.

Continue items 64–72 sequentially without waiting for Lead review.


## Queue item 73 — School post-decision implementation map

Create NEW file only:
- `docs/school-prep/SCHOOL_POST_DECISION_IMPLEMENTATION_MAP_v1.md`

Assume the human School decision packet is later answered. Map the immediate implementation/content sequence for:
1. teacher identities/content;
2. management/accounting milestone/public result;
3. Arcana/Forest result if retained;
4. milestone/project/certificate/exam scenes;
5. career/Activity consumers;
6. presentation/GIF follow-up;
7. acceptance/regression.

Name expected production file domains and tests without pre-filling unanswered decisions.

Continue items 65–73 sequentially without waiting for Lead review.


## Queue item 74 — School minimum authored release slice

Create NEW file only:
- `docs/school-prep/SCHOOL_MINIMUM_AUTHORED_RELEASE_SLICE_v1.md`

Define the smallest content-complete School slice that demonstrates School as a life system beyond a stat shop while preserving all eight mechanical courses.

Include:
- minimum teacher/presenter coverage;
- repeatable lesson variants;
- at least one authored milestone/public-result path once decided;
- Night-study presentation;
- one cross-system career/Activity consequence;
- save/reload and presentation acceptance.

Keep exact identities/thresholds OPEN until Product decides them.

Continue items 66–74 sequentially without waiting for Lead review.


## Queue item 75 — School production package acceptance plan

Create NEW file only:
- `docs/school-prep/SCHOOL_PRODUCTION_PACKAGE_ACCEPTANCE_PLAN_v1.md`

Define acceptance for the first real authored School production package after Product decisions:
- production content included explicitly;
- locked paid-course mechanics unchanged;
- authored teacher/milestone identity present;
- public-result publication exactly once where applicable;
- downstream consumer uses public boundary only;
- save/reload exactly once;
- presentation fallback valid;
- targeted and full regression requirements.

Do not claim the package is implemented yet.

Continue items 67–75 sequentially without waiting for Lead review.


## Queue item 76 — School authored-content data shape draft

Create NEW file only:
- `docs/school-prep/SCHOOL_AUTHORED_CONTENT_DATA_SHAPE_DRAFT_v1.md`

Define a content-facing, non-runtime draft shape for authored School units:
- track/course reference;
- teacher/presenter content ID;
- repeatable lesson variant ID/text;
- milestone/public-result reference;
- relationship/career hook references;
- semantic presentationId;
- media fallback references.

Keep current runtime schema untouched. Mark fields that depend on unresolved Product decisions as optional/OPEN rather than inventing values.

Continue items 68–76 sequentially without waiting for Lead review.


## Queue item 77 — School authored-pack inclusion plan

Create NEW file only:
- `docs/school-prep/SCHOOL_AUTHORED_PACK_INCLUSION_PLAN_v1.md`

Define how future authored School packs should be explicitly included in production without recursively shipping fixtures.

Cover:
- base lesson-variant pack;
- teacher-specific pack;
- milestone/public-result pack;
- cross-career reaction pack;
- presentation references;
- validation before inclusion;
- rollback/removal.

Do not change production content in this task.

Continue items 69–77 sequentially without waiting for Lead review.


## Queue item 78 — eight-track authored-content batch worksheet

Create NEW file only:
- `docs/school-prep/SCHOOL_EIGHT_TRACK_CONTENT_BATCH_WORKSHEET_v1.md`

Create a fill-in production worksheet for all eight School tracks covering:
- teacher/presenter identity placeholder;
- repeatable lesson variant slots;
- milestone slot;
- public-result slot if approved;
- relationship/career hooks;
- semantic presentation IDs;
- GIF/static/text needs;
- acceptance evidence.

Do not fill unresolved identities or thresholds.

## Queue item 79 — management/accounting post-decision production packet

Create NEW file only:
- `docs/school-prep/SCHOOL_MANAGEMENT_POST_DECISION_PRODUCTION_PACKET_v1.md`

Prepare the exact implementation/content checklist to execute once Product supplies the management/accounting provider + milestone decision:
- production content fields to fill;
- public result ID/publication boundary;
- Lumber and other consumer updates;
- save/reload tests;
- presentation mapping;
- rollback.

Leave all unanswered Product fields blank/OPEN.

## Queue item 80 — Arcana/Forest post-decision production packet

Create NEW file only:
- `docs/school-prep/SCHOOL_ARCANA_FOREST_POST_DECISION_PRODUCTION_PACKET_v1.md`

Prepare the exact implementation/content checklist to execute once Product decides the Arcana/Forest provider + milestone and whether this public result remains in scope:
- production content fields;
- public publication boundary;
- Forest/Activity consumers;
- save/reload tests;
- presentation mapping;
- rollback.

Do not select or retain the route by assumption.

## Queue item 81 — School teacher identity batch intake

Create NEW file only:
- `docs/school-prep/SCHOOL_TEACHER_IDENTITY_BATCH_INTAKE_v1.md`

Create one concise human-authoring intake table for all eight teacher/presenter identities:
- canonical content ID placeholder;
- player-facing name;
- in-world role;
- track(s);
- relationship-role yes/no;
- visual brief dependency;
- reuse across tracks allowed yes/no;
- downstream authored scenes affected.

Do not propose canonical names or identities.

Continue items 73–81 sequentially without waiting for Lead review.


## Queue item 82 — canonical teacher content draft v1

Create NEW file only:
- `docs/school-prep/SCHOOL_CANONICAL_TEACHER_CONTENT_DRAFT_v1.md`

Author concrete draft teacher/presenter identities for all eight School tracks as delegated content authoring, not mechanics.

For each provide:
- stable proposed content ID;
- player-facing name;
- in-world role;
- track(s);
- concise personality/teaching voice;
- optional relationship potential;
- visual brief seed.

Guardrails:
- do not change tuition/Energy/stat packages;
- do not add lesson prerequisites;
- do not select management/Arcana public-result semantics;
- mark identities as CONTENT_DRAFT until Lead integration.

## Queue item 83 — teacher identity fixture

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/school-teacher-identities-v1.fixture.json`

Mirror item-82 identities in a machine-readable authoring fixture for later production conversion.

Include no mechanics or thresholds.

## Queue item 84 — eight-track repeatable lesson text bank v1

Create NEW file only:
- `docs/school-prep/SCHOOL_REPEATABLE_LESSON_TEXT_BANK_v1.md`

Author a bounded bank of reusable lesson scene text for all eight tracks.

Target:
- several distinct short lesson variants per track;
- teacher voice consistent with item 82;
- no mechanical claims beyond the locked course package;
- no new stat, Lust, tuition or Energy effects;
- no milestone prerequisite implied.

## Queue item 85 — School milestone-neutral scene bank

Create NEW file only:
- `docs/school-prep/SCHOOL_MILESTONE_NEUTRAL_SCENE_BANK_v1.md`

Author scenes that enrich School life without selecting unresolved milestone semantics:
- arrival/classroom moments;
- teacher feedback;
- peer/context moments;
- post-lesson reactions;
- Night-study flavor.

Do not assert exam/certificate/project completion unless separately decided.

## Queue item 86 — teacher relationship seed matrix

Create NEW file only:
- `docs/school-prep/SCHOOL_TEACHER_RELATIONSHIP_SEEDS_v1.md`

For each drafted teacher, author optional relationship seeds:
- first impression;
- repeated-contact hook;
- Night/social hook shape;
- career/world reaction hook.

These remain optional content and must never gate ordinary paid lessons.

## Queue item 87 — School teacher presentation briefs

Create NEW file only:
- `docs/school-prep/SCHOOL_TEACHER_PRESENTATION_BRIEFS_v1.md`

Create concise visual/media briefs for the eight drafted teacher identities:
- portrait/static need;
- optional GIF loop;
- classroom/location motif;
- semantic School presentation context;
- reuse opportunities;
- alt-text seed.

Do not select final art style.

## Queue item 88 — School authored-content consistency audit

Create NEW file only:
- `docs/school-prep/SCHOOL_AUTHORED_CONTENT_CONSISTENCY_AUDIT_v1.md`

Cross-check items 82–87 against locked School mechanics and current course IDs.

Reject any authored sentence that implies:
- different tuition/Energy/stat gains;
- Lust gain;
- paid lesson/night-study counter mixing;
- teacher prerequisite;
- unapproved public result.

## Queue item 89 — School authored-content integration handoff v8

Create NEW file only:
- `docs/school-prep/SCHOOL_AUTHORED_CONTENT_INTEGRATION_HANDOFF_v8.md`

Provide Lead with:
- exact teacher draft identities;
- text banks ready for integration;
- presentation briefs;
- what remains Product-blocked;
- what can ship as content without new runtime;
- selective integration file list.

Complete item 73 first if still missing, then continue items 82–89 without waiting for Lead review.


## Queue item 90 — School teacher production pack v1

Create NEW production file only:
- `prior-work/astra/prototype-m3.2/content/packs/school-target/school-teachers-v1.json`

Convert the reviewed drafted teacher identities from items 82–88 into a production-oriented authored content pack using existing School/event primitives only.

Requirements:
- all eight course tracks represented;
- no tuition/Energy/stat-package changes;
- no teacher prerequisite for paid lessons;
- no management/Arcana public-result mechanics;
- content/presentation only.

If current pack schema cannot represent teacher metadata directly, encode only valid authored event/media content and document the limitation in the next item; do not change shared schema.

## Queue item 91 — School teacher pack validation test

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/school-teachers-v1.test.ts`

Validate item 90:
- pack schema;
- all eight course IDs represented;
- no mechanics writes outside allowed School/content domains;
- no course transaction mutation;
- semantic presentation identities unique;
- save schema unaffected.

## Queue item 92 — School repeatable lesson authored pack v1

Create NEW production file only:
- `prior-work/astra/prototype-m3.2/content/packs/school-target/school-lesson-content-v1.json`

Convert the repeatable lesson text bank into naturally reachable authored lesson/context events where current primitives allow.

Do not duplicate or replace the paid-lesson transaction itself. No changed tuition/Energy/stat effects.

## Queue item 93 — School lesson content validation

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/school-lesson-content-v1.test.ts`

Verify:
- all eight tracks have authored content;
- course mechanics remain unchanged;
- paid lesson increments only `lessons_completed`;
- no ordinary Lust gain;
- Night study remains separate;
- authored presentation fallback resolves.

## Queue item 94 — School milestone-neutral content pack

Create NEW production file only:
- `prior-work/astra/prototype-m3.2/content/packs/school-target/school-life-content-v1.json`

Convert milestone-neutral arrival/feedback/peer/post-lesson/Night-study flavor scenes into valid production authored content.

Do not assert unresolved certificates/exams/projects/public results.

## Queue item 95 — School life content reload regression

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/school-life-content-reload.test.ts`

Verify item-94 authored events:
- no reroll after materialization;
- effects/content commit once;
- reload safe;
- no double tuition/Energy/progress;
- Night study ownership unchanged.

## Queue item 96 — School teacher presentation identity inventory

Create NEW file only:
- `docs/school-prep/SCHOOL_TEACHER_PRESENTATION_IDENTITY_INVENTORY_v1.md`

Enumerate semantic presentation surfaces created or implied by the production-authored teacher/lesson packs:
- teacher/classroom;
- track lesson;
- Night study;
- reusable 3–5-GIF pool candidates;
- current fallback.

This feeds Chat2 multi-GIF work.

## Queue item 97 — School production inclusion manifest

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/school-authored-production-inclusion-v1.fixture.json`

Prepare exact proposed inclusion order for items 90/92/94 plus existing School production pack.

Do not modify current catalog inclusion yet.

## Queue item 98 — School authored production handoff v9

Create NEW file only:
- `docs/school-prep/SCHOOL_AUTHORED_PRODUCTION_HANDOFF_v9.md`

Provide Lead with:
- exact production packs;
- exact tests;
- inclusion manifest;
- teacher identities/text now authored;
- public-result decisions still OPEN;
- multi-GIF presentation opportunities;
- selective integration steps.

Continue items 90–98 sequentially without waiting for Lead review.
