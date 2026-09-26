# School Integration Handoff v1

Status: Chat 5 integration handoff.
Purpose: deduplicate School artifacts into integration authority, QA evidence, superseded preparation, and open authoring work.

## 1. Handoff rule

This handoff does **not** request broad shared runtime/schema changes merely because older Chat 5 documents described pre-activation gaps.

In particular:
- typed School progress semantics are already green at the Chat 5 contract/evidence level;
- if Lead production activation already implements the shared typed School state and the existing acceptance tests are green, do not reopen that work;
- request a shared runtime/schema change only when a concrete failing contract identifies a specific missing behavior.

## 2. MUST_INTEGRATE

These artifacts carry canonical School mechanics/identity or the current final handoff requirements.

### Runtime/data authority
- `prior-work/astra/prototype-m3.2/src/core/school.ts`
  - eight gameplay course IDs;
  - tuition;
  - 1-Energy paid lesson cost;
  - stat packages;
  - semantic lesson presentation IDs;
  - 24 generated Night-study choices;
  - paid lesson atomicity and Resolver fact construction.

### Canonical contracts
- `docs/school-prep/SCHOOL_TRACK_DATA_MAP_v1.md`
  - stable course/track mapping and locked stat coverage.
- `docs/school-prep/SCHOOL_PROGRESSION_STRUCTURE_v1.md`
  - School-owned progression ownership and counter semantics.
- `docs/school-prep/SCHOOL_PRESENTATION_SLOT_CATALOG_v1.md`
  - semantic presentation namespaces.
- `docs/school-prep/SCHOOL_PRODUCT_ACCEPTANCE_ROW_MAP_v1.md`
  - exact PA mapping.
- `docs/school-prep/SCHOOL_RELEASE_READINESS_v1.md`
  - consolidated readiness/activation boundary.
- `docs/school-prep/SCHOOL_INTEGRATION_HANDOFF_v1.md`
  - this deduplicated handoff.

Integration meaning:
- preserve the semantics above;
- production storage/UI wiring may use Lead-owned implementation shapes;
- fixture file layouts are not themselves required as production content.

## 3. QA_EVIDENCE_ONLY

These files prove the accepted contract and should remain tests/fixtures rather than become production-authoring authority.

### Catalog / presentation evidence
- `content/school-production-ui.fixture.json`
- `content/school-production-catalog-parity.fixture.json`
- `content/school-night-choice-catalog.fixture.json`
- `content/school-night-presentation.fixture.json`
- `content/school-picker-interaction.fixture.json`
- `content/school-ui-disabled-state.fixture.json`
- `tests/school-production-ui-fixture.test.ts`
- `tests/school-production-catalog-parity.test.ts`
- `tests/school-night-choice-catalog.test.ts`
- `tests/school-night-presentation.test.ts`
- `tests/school-picker-interaction.test.ts`
- `tests/school-ui-disabled-state.test.ts`

### Transaction / Resolver evidence
- `content/school-resolver-trigger-matrix.fixture.json`
- `content/school-low-money-safety.fixture.json`
- `tests/school-target.test.ts`
- `tests/school-transaction-adversarial.test.ts` if present on the integration ancestry;
- `tests/school-full-reload-matrix.test.ts`
- `tests/school-resolver-trigger-matrix.test.ts`
- `tests/school-low-money-safety.test.ts`

### Progress / compatibility evidence
- `content/school-typed-state-compat.fixture.json`
- `content/school-typed-progress-exactly-once.fixture.json`
- `content/school-schema4-compat.fixture.json`
- `tests/school-typed-state-compat.test.ts`
- `tests/school-typed-progress-exactly-once.test.ts`
- `tests/school-schema4-compat.test.ts`
- `tests/school-save-compat-adversarial.test.ts`

### NightFlow / chronology evidence
- `content/school-nightflow-reachability.fixture.json`
- `content/school-full-reload-chronology.fixture.json`
- `tests/school-nightflow-reachability.test.ts`
- `tests/school-full-reload-chronology.test.ts`

### Product Acceptance / cross-system evidence
- `content/school-pa-executable-scenario.fixture.json`
- `content/school-pa-shipped-row-evidence.fixture.json`
- `content/school-lumber-negative-boundary.fixture.json`
- `tests/school-pa-executable-scenario.test.ts`
- `tests/school-pa-shipped-row-evidence.test.ts`
- `tests/school-lumber-negative-boundary.test.ts`
- `tests/school-lumber-public-boundary-readiness.test.ts`
- `tests/school-presentation-depth-gap.test.ts`

### Isolated adapter fixtures
- `content/school-target-definitions.fixture.json`
- `content/packs/school-target/school-production.pack.json`
- `tests/school-engine-adapter.test.ts`

These may be retained for regression coverage, but they are not canonical authoring content.

## 4. SUPERSEDED

These artifacts were useful preparation but should not be treated as the final integration authority where newer contracts exist.

- `docs/school-prep/SCHOOL_INTEGRATION_NOTES_v1.md`
  - superseded by release readiness + final handoff.
- `docs/school-prep/SCHOOL_RUNTIME_INTEGRATION_WIRING_v1.md`
  - pre-activation wiring proposal; do not use it to request duplicate shared changes after Lead activation.
- `docs/school-prep/SCHOOL_PROGRESSION_OWNERSHIP_AUDIT_v1.md`
  - historical gap audit; later typed-state/exactly-once contracts are stronger.
- `content/school-activation-expectations.fixture.json`
- `tests/school-activation-expectations.test.ts`
  - superseded by PA executable scenario + shipped-row evidence + chronology.
- `content/school-production-reachability.fixture.json`
- `tests/school-production-reachability.test.ts`
  - superseded as handoff authority by PA executable scenario and release-readiness evidence.
- `content/school-night-study.fixture.json`
- `tests/school-night-study-adapter.test.ts`
  - superseded by the complete 24-choice catalog and NightFlow reachability matrix.

“Superseded” means “not integration authority”; deletion is not required if the files still provide historical regression value.

## 5. OPEN_AUTHORING_PACKET

These files define the remaining content decisions without inventing them.

- `docs/school-prep/SCHOOL_PUBLIC_FACT_AUTHORING_PACKET_v1.md`
- `content/school-public-fact-authoring.fixture.json`
  - management/accounting and Arcana/forest authoring slots;
  - final IDs and thresholds remain OPEN;
  - exactly-once publication/reload/Resolver contract is fixed.

- `docs/school-prep/SCHOOL_PRESENTATION_DEPTH_GAP_v1.md`
  - teacher identity and authored lesson presentation depth remain open.

- `docs/school-prep/SCHOOL_PA_BLOCKER_BURNDOWN_v1.md`
  - smallest remaining PA blocker set.

- `docs/school-prep/SCHOOL_LUMBER_PUBLIC_BOUNDARY_READINESS_v1.md`
  - public/private ownership boundary and Hard Work independence.

## 6. What Lead should integrate from Chat 5

Preserve:
- eight course IDs and exact mechanics;
- semantic presentation IDs;
- 24 Night choices and mechanics;
- separate `lessons_completed` / `night_study_sessions`;
- exactly-once semantics;
- full-package Resolver boundary;
- UI disabled-state rules;
- Night housing availability policy;
- School-private versus public cross-system ownership;
- deterministic save/reload behavior.

Do not copy fixture-only event IDs, fake careers, synthetic lodgings, or synthetic media as production content.

## 7. What Chat 5 is not requesting

Unless a concrete acceptance test fails after Lead activation, Chat 5 is **not** requesting:
- a second typed School schema implementation;
- another generic save migration;
- another School command path parallel to an already-shipped one;
- another UI architecture;
- Lumber direct access to School counters;
- a new Hard Work prerequisite.

## 8. Remaining authored product content

Before full PA content closure, author:
1. at least one final School milestone/public fact consumed by Lumber;
2. its approved private eligibility/threshold and presentation content;
3. canonical teacher/presenter content for the playable School slice.

Final management/accounting and Arcana/forest thresholds remain OPEN until authored.
