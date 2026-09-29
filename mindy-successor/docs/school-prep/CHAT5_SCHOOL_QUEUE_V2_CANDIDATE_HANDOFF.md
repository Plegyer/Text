# Chat 5 School Queue v2 Candidate Handoff

Date: 2026-09-29
Owner: Chat 5 / School + Text Localization Content Worker
Task: C5-12
Branch: `chat5/school-queue-v2`
Pre-handoff content head: `679c87560dc2d017b09e8f54533bfa1acd563abb`
Candidate exact head: recorded in the PR body after this handoff commit is created.

## Baselines and main revalidation

- C5-01 originally inspected `main@921abfa79f4dba9c0acee4eca6724c3ed122d42f`.
- The worker branch was then synchronized with merged coordination PR #70 at `main@95322727dc481b2ac54a9f764d31eb2067343149`.
- C5-02 through C5-11 were authored against that production baseline.
- Before C5-12, current `main` was re-read at `ef16d9fa0c85e3792e3dc223baadd247df95ec7f`.
- Diff from `95322727...` to `ef16d9fa...` contains coordination/task files only. No School runtime/content/localization, Lumber production pack, definitions, or tests used by this candidate changed.
- Under `CANDIDATE_QA_FREEZE_PROTOCOL.md`, that unrelated main movement does not require rebasing.

## Queue completion

### C5-01 — exact-current identity inventory

Added:
- `docs/school-prep/SCHOOL_EXACT_CURRENT_IDENTITY_INVENTORY_V1.md`

Records:
- exact eight courses/tracks;
- 24 active Night-study IDs;
- active/stale/reusable School event/teacher/presentation identities;
- current localization consumers;
- save/reload-visible School state;
- legacy School identity quarantine;
- current Lumber management consumer seam;
- missing Arcana direct consumer.

### C5-02 — Lumber School dependency map

Added:
- `docs/school-prep/SCHOOL_LUMBER_DEPENDENCY_MAP_V1.md`

Findings:
- no missing course for the approved conceptual needs;
- Literacy & Numbers is the existing accounting/management preparation match;
- Arcana is the existing forest knowledge/magic/reasoning match;
- Rhetoric & Social / Field Craft / Physical Training remain supporting existing capabilities;
- missing pieces are producer/publication/consumer decisions, not curriculum.

### C5-03 — career milestone content handoff

Added:
- `content/school-lumber-milestone-handoff-v1.fixture.json`
- `docs/school-prep/SCHOOL_LUMBER_MILESTONE_CONTENT_HANDOFF_V1.md`

The fixture is deliberately decision-incomplete:
- no threshold;
- no selected provider;
- no new public fact;
- no parallel career state.

### C5-04 — leadership preparation text

Added:
- `content/school-leadership-preparation-text-v1.fixture.json`
- `docs/school-prep/SCHOOL_LEADERSHIP_PREPARATION_TEXT_HANDOFF_V1.md`

Prepared RU/EN Literacy & Numbers content for:
- ledger discrepancy;
- budget prioritization;
- auditable handoff notes;
- milestone-neutral transferable-work result.

No certificate/exam/threshold/career effect is asserted.

### C5-05 — Forest knowledge preparation text

Added:
- `content/school-forest-knowledge-preparation-text-v1.fixture.json`
- `docs/school-prep/SCHOOL_FOREST_KNOWLEDGE_PREPARATION_TEXT_HANDOFF_V1.md`

Prepared RU/EN Arcana content for:
- observation before explanation;
- competing explanations;
- field-sample investigation planning;
- milestone-neutral falsifiable-hypothesis result.

No Forest unlock/public result is asserted.

### C5-06 — teacher milestone depth

Added:
- `content/school-teacher-milestone-depth-v1.fixture.json`
- `docs/school-prep/SCHOOL_TEACHER_MILESTONE_DEPTH_HANDOFF_V1.md`

Prepared RU/EN depth around existing teacher identities:
- `school.teacher.mara-fen`;
- `school.teacher.ilyra-venn`.

The fixture contains no effects, thresholds, or world-fact publication.

### C5-07 — Night-study content depth

Added:
- `content/school-night-study-content-depth-v1.fixture.json`
- `docs/school-prep/SCHOOL_NIGHT_STUDY_CONTENT_DEPTH_HANDOFF_V1.md`

Prepared RU/EN content for five exact active choices:
- `school.night_study.literacy_and_numbers.reason`
- `school.night_study.literacy_and_numbers.wits`
- `school.night_study.arcana.magic`
- `school.night_study.arcana.reason`
- `school.night_study.arcana.creativity`

Existing Night mechanics remain unchanged.

### C5-08 — School-to-career handoff fixture

Added:
- `content/school-to-career-handoff-v1.fixture.json`
- `docs/school-prep/SCHOOL_TO_CAREER_HANDOFF_FIXTURE_V1.md`

Exact demonstrated current seam:
- public consumer transport key: `lumber.school.management-ready`;
- Lumber event: `lumber-cross.school-management-return`;
- downstream career facts: `management-school-ready`, `forewoman-problem-resolved`.

The School publisher remains unset.

### C5-09 — natural-path matrix

Added:
- `docs/school-prep/SCHOOL_NATURAL_PATH_MATRIX_V1.md`
- `tests/school-natural-path-lumber-v1.test.ts`

The regression is intentionally no-false-green:
1. real paid Literacy & Numbers lesson proves current private School progress but no management public fact;
2. a labelled test-only injection of the already-existing public transport key proves the existing downstream Lumber resolver/event/career-fact seam without mutating School progress or adding a shift.

### C5-10 — RU/EN parity regression

Added:
- `docs/school-prep/SCHOOL_PREPARED_CONTENT_PARITY_REGRESSION_V1.md`
- `tests/school-prepared-content-parity-v1.test.ts`

Covers 54 prepared localization keys across C5-04 through C5-07:
- complete RU/EN values;
- stable key shape;
- no cross-fixture collisions;
- current exact course/track/teacher/Night IDs;
- Product-open fields remain null;
- Night-study mechanics invariants remain unchanged.

### C5-11 — Save/reload expectation matrix

Added:
- `content/school-save-reload-expectations-v1.fixture.json`
- `docs/school-prep/SCHOOL_SAVE_RELOAD_EXPECTATION_MATRIX_V1.md`

Records expectations for:
- paid lessons;
- Night study;
- pre-publication milestone state;
- durable world-fact publication;
- Lumber consumer state;
- pending School scenes;
- localization/presentation-only content.

It identifies runtime gaps rather than modifying Save.

## Exact current identities consumed

School:
- `school.course.literacy_and_numbers`
- `school.track.literacy_and_numbers`
- `school.teacher.mara-fen`
- `school.course.arcana`
- `school.track.arcana`
- `school.teacher.ilyra-venn`
- existing `lessons_completed`
- existing `night_study_sessions`
- five exact active Night-study choice IDs listed above

Lumber:
- `lumber.school.management-ready`
- `lumber-cross.school-management-return`
- `lumber.foreman:route-professional`
- `management-school-ready`
- `forewoman-problem-resolved`
- `lumber.forest`
- `lumber.forest.success`
- `lumber.forest.truth-known`
- `lumber-cross.activity-forest-return`

No new gameplay identity is promoted by this candidate.

## Checks actually performed before PR

### Current-main / ownership revalidation

PASS:
- current main re-read at `ef16d9fa0c85e3792e3dc223baadd247df95ec7f`;
- branch merge base remains `95322727dc481b2ac54a9f764d31eb2067343149`;
- all 26 current-main commits since that merge base touch coordination/task files only;
- no material production overlap requiring rebase.

### Connector static fixture validation

PASS:
- 7 new JSON fixtures parse successfully;
- 54 prepared localization keys scanned;
- all 54 have non-empty RU and EN;
- no prepared-key collisions across fixtures;
- no mismatching collision with current root localization;
- all five C5-07 Night choice IDs exist in current definitions;
- C5-08 Lumber consumer event exists and consumes the exact recorded public fact;
- Literacy & Numbers and Arcana course IDs remain present in current School runtime source;
- result: 0 static validation errors.

### Diff/ownership surface

Before the C5-12 handoff file:
- candidate adds 20 files;
- no shared `src/` runtime/UI file is modified;
- no `content/definitions.json` change;
- no root `content/localization.json` change;
- no root production pack change;
- no presentation/media asset change;
- no Save/RNG/NightFlow/career-state change.

### Full project execution

Not run locally in this connector-only worker environment. The PR must use repository GitHub Actions for exact-head `npm run check` evidence before QA acceptance.

## Explicit blockers / open decisions

### Management/accounting School result

Still Product/Lead-owned:
- School provider category;
- milestone/result type;
- threshold/value if any;
- authoritative School publication rule/timing;
- final confirmation that `lumber.school.management-ready` remains the canonical transport identity.

Current production already has the Lumber consumer; School has no approved producer.

### Arcana / Forest School result

Still Product/Lead-owned:
- whether a durable Arcana School result remains in scope;
- provider/milestone category;
- threshold/value if any;
- public result ID;
- Night-study contribution;
- exact direct Forest consumer/listener/option.

The existing post-Activity `lumber.forest.truth-known` path is not substituted for a School result.

### Runtime gaps for Integration

Current schema/runtime has:
- typed persisted School `counters/facts/milestones/certificates/choices`;
- `incrementSchoolCounter` effect.

Current authored condition/effect vocabulary does not have:
- `schoolCounter` / `schoolFact` / `schoolMilestone` conditions;
- `addSchoolFact` / `addSchoolMilestone` / `addSchoolCertificate` / `setSchoolChoice` effects.

Paid School reactions also expose generic `actionCompleted: school`, not exact course ID, for reactive content routing.

Chat 5 does not change these primitives.

## Selective integration guidance

Safe immediate content review:
- C5-04/C5-05 RU/EN preparation;
- C5-06 teacher depth;
- C5-07 Night-study depth;
- C5-02/C5-03/C5-08/C5-09/C5-11 handoff and gap evidence;
- C5-10 parity regression;
- C5-09 natural-path no-false-green regression.

Do not selectively integrate as production authority:
- null milestone/provider fields;
- any fixture-only threshold;
- the C5-09 test-only public-fact injection;
- a new Arcana/Forest result identity;
- a direct School-counter read from Lumber.

## Candidate state

At C5-12 completion:
- branch is a candidate PR branch;
- exact head is frozen when recorded in the PR;
- further pushes are allowed only for a concrete CI/QA blocker or explicit Lead request;
- any head movement requires a new exact-head gate.
