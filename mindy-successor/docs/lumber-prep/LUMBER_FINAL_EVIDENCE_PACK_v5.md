# Lumber Final Evidence Pack v5

Status: smallest non-redundant Chat 3 handoff after merged PR #25.

Production baseline:
`9aa0eaf964735e82b9b964bbdcaf5362c292868a`

Main production code/content is already shipped. This pack is QA + decision/content-authoring handoff only; it is not a second activation request.

Machine-readable pack:
`prior-work/astra/prototype-m3.2/content/lumber-final-evidence-pack.fixture.json`

## Tests worth integrating

PR #25 already integrates the merged one-Save/Hard Work/item-capability/legacy-save technical gate. Integrate only these six non-redundant worker QA bundles and their required fixture/doc dependencies:

1. post-PR24 reconciliation:
   - `docs/lumber-prep/LUMBER_POST_PR24_RECONCILIATION_v1.md`
   - `tests/lumber-post-pr24-reconciliation.test.ts`
2. Hunter-trail locked/open boundary:
   - `content/forest-hunter-trail-boundary.fixture.json`
   - `tests/forest-hunter-trail-boundary.test.ts`
2. three-family implementation skeleton:
   - `content/forest-challenge-skeleton.fixture.json`
   - `tests/forest-challenge-skeleton.test.ts`
3. RC false-green sentinel:
   - `tests/lumber-rc-no-false-green.test.ts`
4. PA16 truthful gap sentinel:
   - `content/forest-route-completeness-negative.fixture.json`
   - `tests/forest-route-completeness-negative.test.ts`
5. future Forest authoring compatibility:
   - `content/forest-future-authoring-compat.fixture.json`
   - `tests/forest-future-authoring-compat.test.ts`
6. final RC acceptance classification:
   - `docs/lumber-prep/LUMBER_FINAL_RC_ACCEPTANCE_MATRIX_v1.md`
   - `tests/lumber-final-rc-acceptance-matrix.test.ts`

These bundles are non-redundant after PR #25: boundary/skeleton tests protect still-open authoring; sentinels prevent false-green closure; compatibility protects shipped routes/results; final matrix provides the PA00–PA26 closure view. The post-PR24 reconciliation test is now redundant with the stronger merged PR25 gate.

## Docs worth indexing

Current index set after PR #25:
- `LUMBER_POST_PR24_RECONCILIATION_v1.md` — merged one-Save truth;
- `LUMBER_FINAL_RC_ACCEPTANCE_MATRIX_v1.md` — final PA00–PA26 classification;
- `OLD_BOUNDARY_TOKEN_DECISION_READY_PACKET_v1.md` — acceptable Product answer types;
- `OLD_BOUNDARY_TOKEN_PRODUCT_DECISION_IMPACT_v1.md` — downstream impact per token decision;
- `SCHOOL_LUMBER_PUBLIC_FACT_AUTHORING_PACKET_v1.md` — management public-boundary ownership;
- `FOREST_HUNTER_TRAIL_AUTHORING_PACKET_v1.md` — Hunter trail authoring seam;
- `FOREST_CHALLENGE_FAMILY_AUTHORING_PACKET_v1.md` — three challenge-family contract;
- `FOREST_SEASON_TOPOLOGY_AUTHORING_PACKET_v1.md` — season topology contract.

Do not index older closure maps/handoffs as current source of truth.

## Human decisions required

### Old Boundary Token

Still requires explicit Product answers for:
- acquisition source;
- acquisition timing/requirements;
- retained vs consumed/turn-in;
- repeatability;
- inventory/locked-route presentation;
- whether normal gameplay removes the token;
- any permanent-access behavior after removal;
- any explicit interaction with other Forest capabilities.

Current decision sources:
- `OLD_BOUNDARY_TOKEN_DECISION_READY_PACKET_v1.md`;
- `OLD_BOUNDARY_TOKEN_PRODUCT_DECISION_IMPACT_v1.md`.

No preferred answer is selected.

### School -> Lumber management result

Still requires:
- provider/course/track;
- exact `lessons_completed` threshold or accepted milestone/project/exam/certificate;
- publication rule for `lumber.school.management-ready`.

Synthetic `school.lumber-management` is not production.

## Content-depth backlog

PA16 remains open until Product/content authors:
1. Hunter trail gate + navigation integration;
2. at least one navigation challenge;
3. at least one physical obstacle challenge;
4. at least one interpretation / ritual anomaly challenge;
5. at least one deterministic season-driven topology/option difference.

Current authoring sources:
- `FOREST_HUNTER_TRAIL_AUTHORING_PACKET_v1.md`;
- `FOREST_CHALLENGE_FAMILY_AUTHORING_PACKET_v1.md`;
- `FOREST_SEASON_TOPOLOGY_AUTHORING_PACKET_v1.md`.

The older `FOREST_PRODUCTION_AUTHORING_MATRIX_v1.md` is superseded as the current handoff source by these narrower packets plus executable skeleton/gap/compat tests.

## Superseded artifacts

Do not use these as current Lead source of truth:
- PR22 closure parity audit/test — post-PR24 reconciliation supersedes the final-state view;
- PR24 one-Save state audit/test — written before merge;\n- post-PR24 reconciliation doc/test — now superseded as integration evidence by merged PR25 `qa-minimal-rc-acceptance-gate-v2.test.ts`;
- v4 decision/evidence handoff — replaced by v5;
- old token decision matrix — replaced by decision-ready packet + impact matrix;
- v2/v3 release/RC handoffs;
- pre-PR22 closure dependency audit/row map;
- old token authoring packet/runtime-seam fixture;
- old Forest depth gap-to-spec evidence;
- broad Forest production matrix as final handoff source.

Historical files may remain in Git; they simply should not drive current integration decisions.

## Already shipped — do not re-integrate

Use merged main as production source of truth for:
- `definitions.json`;
- core schema/engine;
- UI Activity option surface;
- three Lumber target packs;
- merged `release-candidate-shipped-e2e.test.ts`;\n- merged PR25 `qa-minimal-rc-acceptance-gate-v2.test.ts` and School blocking-scene compatibility QA.

PR24 already proves the one-Save shipped path with real `base.school -> listen`, natural logging-road, a labeled 49 threshold accelerator, a real 50th Lumber shift, ending completion and New Run.

## Locked invariants

Hard Work:
- ending `ending.lumber.hard-work`;
- ONLY `completed_shifts >= 50`;
- exact reward `hardWork:lumber`.

A5 Forest continuation:
`activityResult(lumber.forest, success, lumber.forest.success)`

False-green bans:
- seeded `old_boundary_token` is not a full PA09 pass;
- `completed_shifts=49` is not ordinary-play evidence;
- Forest/School/item/relationship/season/milestone conditions never enter Hard Work.

## Final Lead action split

1. integrate the seven QA bundles above;
2. index the eight current docs;
3. route Old Boundary Token and School questions to human/Product decision;
4. route Hunter/challenge/season work to Forest content authoring;
5. ignore superseded artifacts for current implementation;
6. leave shipped production and Hard Work untouched.
