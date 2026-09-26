# Lumber Integration Handoff v1

Status: final Chat 3 artifact handoff after Product Activation PR #20.

Production baseline:

`9b427d75dc22021cd3373aa7dd3521782e54152d`

The machine-readable category list is:

`prior-work/astra/prototype-m3.2/content/lumber-integration-handoff.fixture.json`

## Handoff rule

Every Chat 3 Lumber continuation artifact is placed in exactly one category:

1. **MUST_INTEGRATE**
2. **QA_EVIDENCE_ONLY**
3. **SUPERSEDED**
4. **OPEN_AUTHORING_PACKET**

Legacy `ds-lumber` baseline files are explicitly excluded because they predate this continuation artifact set.

## MUST_INTEGRATE

These are the current, non-duplicative post-activation proof/regression artifacts that should be carried forward.

### Current status/docs

- `docs/lumber-prep/LUMBER_PA_BLOCKER_BURNDOWN_v1.md`
- `docs/lumber-prep/LUMBER_PRODUCT_ACCEPTANCE_ROW_MAP_v1.md`
- `docs/lumber-prep/LUMBER_RELEASE_READINESS_v1.md`
- `docs/lumber-prep/LUMBER_INTEGRATION_HANDOFF_v1.md`

### Current regression/proof fixtures

- schema-4 legacy-save compatibility fixture/test;
- cross-system reload chronology fixture/test;
- ending identity fixture/test;
- Foreman Night exhaustive matrix fixture/test;
- shipped PA row evidence fixture/test;
- production media parity fixture/test;
- production UI contract fixture/test;
- shipped pack parity fixture/test;
- PA row-map test;
- this handoff fixture.

These are intentionally the smallest current set. Older pre-activation expectation/scenario artifacts are not duplicated here.

## QA_EVIDENCE_ONLY

These files remain useful to explain how the accepted contracts were reached, but should not be treated as new production activation input.

Includes:

- early Lumber repeatable-shift/progression/Foreman/cross-system/presentation prep docs;
- legacy/target coexistence audit;
- target definitions fixture and the three target packs already present on main;
- test-only item capability adapter;
- ending-independence fixture/test;
- Forest acceptance-depth/gap tests;
- Night acceptance evidence;
- production merge-safety evidence;
- original target production/cross-system tests.

Several of these are already on `main`. Do not re-integrate them blindly.

## SUPERSEDED

Do not use these as current source of truth:

- `LUMBER_ITEM_CAPABILITY_INTEGRATION_AUDIT_v1.md` — replaced by the concrete Old Boundary Token authoring packet + blocker burn-down;
- `LUMBER_UNRESOLVED_DEPENDENCY_LEDGER_v1.md` and its test — replaced by post-activation blocker burn-down;
- old PA fixture manifest — replaced by final PA00–PA26 row map;
- full PA scenario fixture/test — replaced by final row map + shipped-row evidence;
- pre-merge production activation fixture/test — actual activation shipped in PR #20;
- pre-merge shipped-activation expectation fixture/test — replaced by shipped-row evidence against the merged state.

Superseded files may be retained as history but must not drive a new production merge.

## OPEN_AUTHORING_PACKET

These are **not code-ready production definitions**. They describe the smallest missing product decisions.

### Old Boundary Token

- `docs/lumber-prep/OLD_BOUNDARY_TOKEN_AUTHORING_PACKET_v1.md`
- `content/old-boundary-token-authoring.fixture.json`

Still requires a real acquisition/use source and retain/consume decision.

### Forest depth

- `docs/lumber-prep/FOREST_DEPTH_GAP_TO_SPEC_v1.md`

Still requires three route contexts, three challenge families, season difference and the visible item action/route seam.

The associated gap test remains QA evidence because it proves the current absence rather than defining new content.

### School → Lumber public fact

- `docs/lumber-prep/SCHOOL_LUMBER_PUBLIC_FACT_AUTHORING_PACKET_v1.md`
- `content/school-lumber-public-fact-authoring.fixture.json`

The listener fact `lumber.school.management-ready` is fixed; School course/track/threshold/milestone authoring remains OPEN.

## Already shipped production contracts

PR #20 already ships the production activation. Do not treat the old target fixtures as a second activation request.

Shipped identities include:

- `lumber.shift`;
- career `lumber`;
- relationship `lumber.foreman`;
- Night choice `lumber.foreman.night`;
- normal lodging `lodging.normal`;
- Activity `lumber.forest`;
- Lumber endings;
- three approved Lumber event packs.

## Hard Work — never OPEN

Hard Work status:

**LOCKED / SHIPPED**

Ending:

`ending.lumber.hard-work`

Only condition:

`completed_shifts >= 50`

Exact reward:

`hardWork:lumber`

Hard Work must never move into `OPEN_AUTHORING_PACKET`, and no item/School/Forest/Foreman/season/milestone dependency may be added.

## Integration order

1. merge/carry forward **MUST_INTEGRATE** proof artifacts;
2. retain **QA_EVIDENCE_ONLY** only where useful for regression/history;
3. do not drive production from **SUPERSEDED** artifacts;
4. route **OPEN_AUTHORING_PACKET** to the correct Product/content owner before implementation;
5. keep Hard Work untouched.
