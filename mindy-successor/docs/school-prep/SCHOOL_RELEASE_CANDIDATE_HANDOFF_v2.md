# School Release Candidate Handoff v2

Status: post-PR21 Chat 5 release-candidate handoff.
Purpose: provide one deduplicated integration index after the latest School Product Acceptance work.

## Final authoring state

Still explicitly OPEN:
- final management/accounting School public fact ID;
- final management/accounting private threshold/eligibility/content;
- final Arcana/Forest School public fact ID;
- final Arcana/Forest private threshold/eligibility/content.

Do not derive those values from fixture IDs, legacy `metrics.lessons`, or synthetic worldFact tests.

Shared runtime changes are not requested for already-green typed School progress unless a concrete failing integrated contract proves a specific gap.

## READY_TO_INTEGRATE_NOW

- `mindy-successor/prior-work/astra/prototype-m3.2/src/core/school.ts`
- `mindy-successor/docs/school-prep/SCHOOL_TRACK_DATA_MAP_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_PROGRESSION_STRUCTURE_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_PRESENTATION_SLOT_CATALOG_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_PRODUCT_ACCEPTANCE_ROW_MAP_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_LUMBER_PUBLIC_BOUNDARY_READINESS_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_PA_CLOSURE_DEPENDENCY_AUDIT_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_RELEASE_CANDIDATE_HANDOFF_v2.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-release-candidate-handoff.fixture.json`

These files carry the current mechanics/ownership/presentation/boundary/handoff authority. The v2 handoff and its fixture are the final index, not production gameplay data.

## QA_EVIDENCE_ONLY

- `mindy-successor/docs/school-prep/SCHOOL_PA_NO_FALSE_GREEN_AUDIT_v1.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-course-track-ownership.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-full-reload-chronology.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-low-money-safety.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-lumber-negative-boundary.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-night-choice-catalog.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-night-presentation.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-night-production-parity.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-nightflow-reachability.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-pa-executable-scenario.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-pa-shipped-row-evidence.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-picker-interaction.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-production-catalog-parity.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-production-ui.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-resolver-trigger-matrix.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-schema4-compat.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-target-definitions.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-typed-progress-exactly-once.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-typed-state-compat.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-ui-disabled-state.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-course-track-ownership.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-engine-adapter.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-full-reload-chronology.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-full-reload-matrix.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-low-money-safety.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-lumber-negative-boundary.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-lumber-public-boundary-readiness.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-night-choice-catalog.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-night-presentation.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-night-production-parity.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-nightflow-reachability.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-pa-closure-dependency.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-pa-executable-scenario.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-pa-no-false-green.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-pa-shipped-row-evidence.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-picker-interaction.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-presentation-depth-gap.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-production-catalog-parity.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-production-ui-fixture.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-public-fact-preflight.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-resolver-trigger-matrix.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-save-compat-adversarial.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-schema4-compat.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-target.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-typed-progress-exactly-once.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-typed-state-compat.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-ui-disabled-state.test.ts`

These fixtures/tests prove mechanics, parity, compatibility, reachability, exactly-once behavior, or evidence discipline. They must not be promoted to authored product content.

## OPEN_AUTHORING_PACKET

- `mindy-successor/docs/school-prep/SCHOOL_PUBLIC_FACT_AUTHORING_PACKET_v1.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-public-fact-authoring.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-public-fact-preflight.fixture.json`

These define how future School public results must be authored and validated while intentionally leaving canonical management/accounting and Arcana/Forest choices unresolved.

## PRESENTATION_CONTENT_DEPTH

- `mindy-successor/docs/school-prep/SCHOOL_PRESENTATION_DEPTH_GAP_v1.md`

Teacher identity, teacher-led lesson copy/media and authored milestone presentation remain content-depth work. Gameplay IDs and semantic presentation slots are already stable.

## SUPERSEDED

- `mindy-successor/docs/school-prep/SCHOOL_INTEGRATION_HANDOFF_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_INTEGRATION_NOTES_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_PA_BLOCKER_BURNDOWN_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_PROGRESSION_OWNERSHIP_AUDIT_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_RELEASE_READINESS_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_RUNTIME_INTEGRATION_WIRING_v1.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-activation-expectations.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-integration-handoff.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-night-study.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-production-reachability.fixture.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-activation-expectations.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-night-study-adapter.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-production-reachability.test.ts`

Superseded means retained historical/regression context but no longer the preferred integration authority. Deletion is not required.

## Release-candidate integration rules

Integrate/preserve:
- eight paid course IDs and locked tuition/Energy/stat packages;
- semantic paid/Night presentation namespaces;
- 24 Night choices and housing availability contract;
- School-owned `lessons_completed` versus `night_study_sessions`;
- exactly-once persistence semantics;
- complete paid-lesson Resolver boundary;
- private School state versus durable public cross-system boundary;
- no-Lust ordinary School baseline;
- Hard Work independence from School.

Do not integrate as production authoring:
- fixture-only public facts;
- synthetic events/endings/lodgings/media;
- direct typed counter setup;
- prebuilt track state;
- guessed teachers, certificates, milestone thresholds or public fact IDs.

## Remaining Product Acceptance content work

1. Author one real School milestone/public result path used by the Product Acceptance Lumber/Forewoman/Forest flow.
2. Author the relevant canonical public fact ID and private eligibility/content.
3. Add approved teacher/presenter and lesson/milestone presentation depth.
4. Run the integrated Product Acceptance path without synthetic fact/counter/track injection.
