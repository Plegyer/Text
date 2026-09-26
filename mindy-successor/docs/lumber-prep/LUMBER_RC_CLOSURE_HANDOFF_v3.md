# Lumber RC Closure Handoff v3

Status: post-PR22 release-candidate closure handoff.

Baselines:
- Product Activation PR #20: `9b427d75dc22021cd3373aa7dd3521782e54152d`;
- Product Acceptance evidence PR #21: `e6c32903516d1ba40b9a3ffbf955d5f04783ac25`;
- capability/Forest infrastructure PR #22: `011572ef1335deda5ac33120c3a7ea7f9849dbbf`.

Machine-readable handoff:
`prior-work/astra/prototype-m3.2/content/lumber-rc-closure-handoff.fixture.json`

## SHIPPED_GREEN

PR22 changes the closure picture materially.

The following are shipped and should not be reopened as runtime blockers:

- target Work `lumber.shift`, career milestone and professional Foreman path;
- `lodging.normal` and `lumber.foreman.night`;
- Forest Activity entry for 2 daytime Energy with no Old Boundary Token entry prerequisite;
- unconditional normal route `forest.route.logging-road`;
- typed item definitions for reinforced axe, rope kit, field preservation kit and Old Boundary Token;
- inventory-derived item capability queries;
- `forest.route.old-boundary` gated by actual `enter_old_boundary`;
- legacy active Activity save compatibility through option model version 0 and `advance|escape`;
- Forest success/escape/failure and exact A5 `activityResult` continuation;
- Lumber ending identities.

### Hard Work

**SHIPPED_GREEN / INDEPENDENT.**

Ending:
`ending.lumber.hard-work`

Only eligibility condition:
`completed_shifts >= 50`

Exact reward:
`hardWork:lumber`

No item, Forest, School, relationship, season or milestone prerequisite is allowed.

## READY_TO_INTEGRATE_QA

Current post-PR22 QA/handoff artifacts:

- `docs/lumber-prep/LUMBER_PR22_CLOSURE_PARITY_AUDIT_v1.md`
- `prior-work/astra/prototype-m3.2/tests/lumber-pr22-closure-parity.test.ts`
- `docs/lumber-prep/LUMBER_RC_CLOSURE_HANDOFF_v3.md`
- `prior-work/astra/prototype-m3.2/content/lumber-rc-closure-handoff.fixture.json`

Smallest useful Lead QA subset is the PR22 parity audit + test. The v3 handoff files are navigational metadata.

## AUTHORING_DECISION_REQUIRED

### Old Boundary Token

Current source of truth:
- `docs/lumber-prep/OLD_BOUNDARY_TOKEN_DECISION_MATRIX_v1.md`

Still needs explicit Product decisions:
- acquisition source;
- acquisition timing/requirements;
- retained vs consumed/turned in;
- repeatability;
- exact inventory/locked-route presentation.

Runtime capability derivation is already shipped. Do not reopen it.

### School → Lumber management result

Current authoring packet:
- `docs/lumber-prep/SCHOOL_LUMBER_PUBLIC_FACT_AUTHORING_PACKET_v1.md`
- `content/school-lumber-public-fact-authoring.fixture.json`

Still needs:
- School provider/course/track;
- exact progression threshold/milestone/project/exam/certificate.

The listener fact remains:
`lumber.school.management-ready`

Synthetic `school.lumber-management` remains non-production.

## FOREST_CONTENT_DEPTH

Current implementation-ready authoring set:

- `FOREST_PRODUCTION_AUTHORING_MATRIX_v1.md`;
- `forest-production-authoring-matrix.fixture.json`;
- `FOREST_HUNTER_TRAIL_AUTHORING_PACKET_v1.md`;
- `forest-hunter-trail-authoring.fixture.json`;
- `FOREST_CHALLENGE_FAMILY_AUTHORING_PACKET_v1.md`;
- `forest-challenge-family-authoring.fixture.json`;
- `FOREST_SEASON_TOPOLOGY_AUTHORING_PACKET_v1.md`;
- `forest-season-topology-authoring.fixture.json`.

Remaining depth:
- author Hunter trail gate and navigation integration;
- author at least one navigation challenge;
- author at least one physical obstacle;
- author at least one interpretation/ritual anomaly challenge;
- bind season to route/challenge topology/options;
- preserve stable result IDs and deterministic save/reload.

Do not invent final lore, NPC, loot, thresholds, Hunter clue ID, Arcana fact ID, or item use policy without Product decisions.

## SUPERSEDED

PR22 supersedes documents/tests whose main conclusion was that generic capability-aware item/Activity option runtime was missing.

Key superseded artifacts:
- `LUMBER_PA_CLOSURE_DEPENDENCY_AUDIT_v1.md` + test;
- `LUMBER_PA_CLOSURE_ROW_MAP_v1.md`;
- pre-PR22 `lumber-forest-capability-options` fixture/test runtime-boundary assertions;
- pre-PR22 `lumber-item-use-exactly-once` runtime-boundary assertions;
- `OLD_BOUNDARY_TOKEN_AUTHORING_PACKET_v1.md` and its old runtime-seam fixture;
- `FOREST_DEPTH_GAP_TO_SPEC_v1.md` + test;
- `LUMBER_RELEASE_CANDIDATE_HANDOFF_v2.md` + fixture;
- test-only `lumber-item-capabilities.fixture.json` worldFact adapter as production authority.

These may remain as history, but should not drive post-PR22 implementation decisions.

## Remaining closure blockers

Only three blocker families remain:

1. **Old Boundary Token Product decisions** — acquisition/use policy.
2. **School management public-result authoring** — provider and threshold.
3. **Forest content depth** — Hunter trail, three challenge families, season topology/options.

Generic item capability and Activity option infrastructure is no longer a blocker after PR22.

## Lead integration subset

Smallest useful Lead QA integration:
1. `LUMBER_PR22_CLOSURE_PARITY_AUDIT_v1.md`;
2. `lumber-pr22-closure-parity.test.ts`.

Then route:
- token decision matrix to Product;
- School public-fact packet to School/Product authoring;
- Forest depth packets to Forest content authoring.

Do not modify Hard Work.
