# School Final Evidence Pack v5

Status: smallest non-redundant Chat 5 Lead handoff after merged PR24/PR25 behavior.

## Source of truth

Use:
- merged PR24 one-Save shipped E2E;
- merged PR25 final RC acceptance gate;
- the current School task evidence through Queue item 42.

Do not reopen shipped School mechanics without concrete integrated failing evidence.

## Exact tests worth integrating

- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-production-catalog-parity.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-full-reload-matrix.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-course-track-ownership.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-night-production-parity.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-blocking-scene-compat.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-old-save-defaults.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-public-boundary-exactly-once.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-long-save-state-preservation.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-ui-disabled-state.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-rc-no-false-green-v2.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-content-depth-negative.test.ts`

Why this set is non-redundant:
- catalog parity covers all eight paid definitions;
- full reload covers paid transaction persistence;
- course/track ownership covers typed counter isolation;
- Night production parity covers all 24 Night choices;
- blocking-scene compatibility covers paid lesson -> pending scene -> Night ordering;
- old-save defaults covers compatibility before typed School state;
- public-boundary exactly-once covers future publication idempotency;
- long-Save preservation covers unrelated Lumber/Foreman/Forest/ending/Meta state;
- UI disabled-state covers truthful paid-course availability;
- no-false-green v2 prevents synthetic QA evidence becoming authoring;
- content-depth negative keeps teachers/certificates/projects truthfully OPEN.

## Exact docs worth indexing

- `mindy-successor/docs/school-prep/SCHOOL_TRACK_DATA_MAP_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_PROGRESSION_STRUCTURE_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_PRESENTATION_SLOT_CATALOG_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_PR25_FINAL_GATE_REVIEW_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_AUTHORING_DECISION_READY_PACKET_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_PUBLIC_RESULT_DECISION_IMPACT_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_RC_PRESENTATION_CONTENT_GAP_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_FINAL_RC_ACCEPTANCE_MATRIX_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_FINAL_EVIDENCE_PACK_v5.md`

These are sufficient to recover:
- locked School mechanics and ownership;
- semantic presentation routing;
- merged PR25 School gate behavior;
- unresolved human decisions;
- exact Lumber listener impact;
- content-depth gap;
- final RC classification.

## Human decisions required

1. **management-provider** — Choose the School-owned management/accounting public-result provider.
2. **management-threshold** — Choose the management/accounting private threshold or milestone type.
3. **arcana-forest-provider** — Choose the School-owned Arcana/Forest public-result provider.
4. **arcana-forest-threshold** — Choose the Arcana/Forest private threshold or milestone type.
5. **arcana-forest-direct-listener** — If a durable Arcana School fact is used, choose the exact direct Forest listener/option.
6. **teacher-identities** — Choose canonical teacher/presenter identities and assignments.
7. **certificate-project-exam** — Choose whether certificates, projects, or exams participate in the minimum authored School path.

No preferred answer is selected.

Current exact management-side Lumber listener:
- `lumber-cross.school-management-return`.

Current exact post-Forest Lumber listener:
- `lumber-cross.activity-forest-return`.

The direct Arcana-School-to-Forest listener is not yet canonical and must not be invented.

## Content-depth backlog

- teacher/presenter identities
- teacher/course assignments
- teacher voice and lesson prose
- authored milestone/certificate/project/exam scenes
- public-result presentation copy
- course/Night result copy depth

These are product-content gaps, not hidden tuition/Energy/stat/progress regressions.

## Presentation-future backlog

- teacher portraits
- course stills
- lesson/result stills
- Night-study stills
- GIF loops
- milestone/certificate cards

Semantic presentation IDs are already stable; future assets must attach to them without changing gameplay course IDs or locked mechanics.

## Superseded handoffs/audits

- `mindy-successor/docs/school-prep/SCHOOL_INTEGRATION_HANDOFF_v1.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-integration-handoff.fixture.json`
- `mindy-successor/docs/school-prep/SCHOOL_RELEASE_CANDIDATE_HANDOFF_v2.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-release-candidate-handoff.fixture.json`
- `mindy-successor/docs/school-prep/SCHOOL_FINAL_INTEGRATION_HANDOFF_v3.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-final-integration-handoff.fixture.json`
- `mindy-successor/docs/school-prep/SCHOOL_FINAL_DECISION_EVIDENCE_HANDOFF_v4.md`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-final-decision-evidence-handoff.fixture.json`
- `mindy-successor/docs/school-prep/SCHOOL_RELEASE_READINESS_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_PA_BLOCKER_BURNDOWN_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_PA_CLOSURE_DEPENDENCY_AUDIT_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_PR24_ONE_SAVE_STATE_AUDIT_v1.md`

Superseded means historical/regression context only. Deletion is not required.

## Final integration rule

Preserve:
- exactly eight paid courses;
- exact tuition and one current-day Energy per paid lesson;
- exact stat packages;
- no ordinary Lust mutation;
- typed `lessons_completed` only from paid lessons;
- typed `night_study_sessions` only from Night study;
- all 24 Night choices with +2 supported stat, zero tuition/current-day Energy, next-day Energy -1;
- real blocking School scene compatibility;
- save/reload exactly once;
- public/private School-Lumber boundary;
- Hard Work independence from School;
- unrelated long-Save state preservation.

Do not integrate as production authoring:
- fixture-only public facts;
- direct typed counter setup;
- synthetic track state;
- guessed management/Arcana thresholds;
- guessed teachers;
- guessed certificate/project/exam definitions.

The remaining School work is human authoring and content depth, not another broad runtime rewrite.
