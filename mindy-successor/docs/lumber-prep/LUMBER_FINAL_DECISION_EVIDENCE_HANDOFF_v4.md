# Lumber Final Decision / Evidence Handoff v4

Status: final post-PR22 Chat 3 decision/evidence handoff.

Production baselines:
- Product Activation PR #20: `9b427d75dc22021cd3373aa7dd3521782e54152d`;
- Product Acceptance evidence PR #21: `e6c32903516d1ba40b9a3ffbf955d5f04783ac25`;
- capability/Forest infrastructure PR #22: `011572ef1335deda5ac33120c3a7ea7f9849dbbf`;
- RC QA floor PR #23: `e12665ce9063689400d8f39f893378f6f01911f3`;\n- one-Save RC smoke PR #24: `9aa0eaf964735e82b9b964bbdcaf5362c292868a`.

PR #24 one-Save smoke is **MERGED / SHIPPED_GREEN**.

Machine-readable manifest:
`prior-work/astra/prototype-m3.2/content/lumber-final-decision-evidence-handoff.fixture.json`

## SHIPPED_GREEN

Exact shipped production source files:

- `prior-work/astra/prototype-m3.2/content/definitions.json`
- `prior-work/astra/prototype-m3.2/src/core/schema.ts`
- `prior-work/astra/prototype-m3.2/src/core/engine.ts`
- `prior-work/astra/prototype-m3.2/src/ui/app.ts`
- `prior-work/astra/prototype-m3.2/content/packs/lumber-target/lumber-production.pack.json`
- `prior-work/astra/prototype-m3.2/content/packs/lumber-target/lumber-cross-system.pack.json`
- `prior-work/astra/prototype-m3.2/content/packs/lumber-target/lumber-night-acceptance.pack.json`
- `prior-work/astra/prototype-m3.2/tests/item-capability-activity-closure.test.ts`\n- `docs/qa-prep/RELEASE_CANDIDATE_SHIPPED_E2E_v1.md`\n- `prior-work/astra/prototype-m3.2/tests/release-candidate-shipped-e2e.test.ts`

These already provide:\n- merged one-Save Lumber -> Foreman -> School -> Night -> Forest -> ending -> New Run evidence;
- `lumber.shift`;
- career/Foreman/Night flow;
- Forest entry without token;
- logging-road normal route;
- typed inventory-backed item capabilities;
- old-boundary route gated by actual `enter_old_boundary`;
- generic Activity authored options;
- legacy active Activity compatibility;
- Forest success/escape/failure;
- exact A5 continuation;
- ending identities and A6 reward plumbing.

Do not re-integrate worker fixtures as a second production activation.

### Hard Work

**SHIPPED_GREEN / independent.**

Ending:
`ending.lumber.hard-work`

Only condition:
`completed_shifts >= 50`

Exact reward:
`hardWork:lumber`

No School, Forest, item, relationship, Night, milestone or season prerequisite is allowed.

## MUST_INTEGRATE_QA

Current QA/boundary artifacts:

- `docs/lumber-prep/LUMBER_PR22_CLOSURE_PARITY_AUDIT_v1.md`
- `tests/lumber-pr22-closure-parity.test.ts`
- `docs/lumber-prep/LUMBER_PR24_ONE_SAVE_STATE_AUDIT_v1.md`
- `tests/lumber-pr24-one-save-state-audit.test.ts`
- `content/forest-hunter-trail-boundary.fixture.json`
- `tests/forest-hunter-trail-boundary.test.ts`
- `content/forest-challenge-skeleton.fixture.json`
- `tests/forest-challenge-skeleton.test.ts`
- `tests/lumber-rc-no-false-green.test.ts`
- this v4 handoff doc/fixture.

### Smallest Lead integration subset

The smallest useful QA subset excludes the navigational v4 handoff itself and contains nine files:

1. PR22 parity audit doc + test;
2. PR24 one-Save audit doc + test;
3. Hunter-trail boundary fixture + test;
4. challenge skeleton fixture + test;
5. no-false-green sentinel.

This subset can be integrated without selecting Product answers.

## HUMAN_DECISION_REQUIRED

### Old Boundary Token

Current decision-ready source:

- `docs/lumber-prep/OLD_BOUNDARY_TOKEN_DECISION_READY_PACKET_v1.md`
- `content/old-boundary-token-decision-ready.fixture.json`

Still requires human/Product answers for:
- acquisition source;
- timing/requirements;
- retained vs consumed/turn-in;
- repeatability;
- presentation details;
- authored removal behavior.

Runtime ownership/capability semantics are already shipped.

### School management result

Current decision boundary:

- `docs/lumber-prep/SCHOOL_LUMBER_PUBLIC_FACT_AUTHORING_PACKET_v1.md`
- `content/school-lumber-public-fact-authoring.fixture.json`

Still requires:
- School provider/course/track;
- threshold/milestone/project/exam/certificate.

Existing Lumber listener remains:
`lumber.school.management-ready`

No synthetic `school.lumber-management` provider may be promoted.

## CONTENT_AUTHORING_REQUIRED

Implementation-ready Forest authoring set:

- `docs/lumber-prep/FOREST_PRODUCTION_AUTHORING_MATRIX_v1.md`
- `content/forest-production-authoring-matrix.fixture.json`
- `docs/lumber-prep/FOREST_HUNTER_TRAIL_AUTHORING_PACKET_v1.md`
- `content/forest-hunter-trail-authoring.fixture.json`
- `docs/lumber-prep/FOREST_CHALLENGE_FAMILY_AUTHORING_PACKET_v1.md`
- `content/forest-challenge-family-authoring.fixture.json`
- `docs/lumber-prep/FOREST_SEASON_TOPOLOGY_AUTHORING_PACKET_v1.md`
- `content/forest-season-topology-authoring.fixture.json`

Remaining authoring:
- Hunter-trail gate/public boundary;
- navigation challenge content;
- physical obstacle content;
- interpretation/ritual anomaly content;
- season-driven topology/options.

Final clue ID, Arcana fact ID, prose, NPCs, loot and thresholds remain OPEN until accepted.

## PRESENTATION_FUTURE

Presentation/media work that is not a mechanical release blocker:

- `docs/lumber-prep/LUMBER_PRESENTATION_SLOT_CATALOG_v1.md`
- `content/lumber-production-media-parity.fixture.json`
- `tests/lumber-production-media-parity.test.ts`

Semantic presentation contracts and static fallbacks are usable.

Future Lumber GIFs may be added later; missing future GIF paths must not be labeled shipped.

## SUPERSEDED

Do not use these as current implementation source:

- `OLD_BOUNDARY_TOKEN_DECISION_MATRIX_v1.md` — replaced by decision-ready packet;
- `LUMBER_RC_CLOSURE_HANDOFF_v3.md` + fixture — replaced by v4;
- `OLD_BOUNDARY_TOKEN_AUTHORING_PACKET_v1.md` + fixture — runtime-seam assumptions predate PR22;
- `LUMBER_PA_CLOSURE_DEPENDENCY_AUDIT_v1.md` + test — PR22 closed its runtime gaps;
- `LUMBER_PA_CLOSURE_ROW_MAP_v1.md` — pre-PR22 closure classification;
- `lumber-forest-capability-options.fixture.json` + test — pre-PR22 runtime-boundary assumption;
- `lumber-item-use-exactly-once.fixture.json` + test — retained only as historical design evidence until a consume policy is selected;
- `FOREST_DEPTH_GAP_TO_SPEC_v1.md` + test — replaced by concrete authoring packets;
- `LUMBER_RELEASE_CANDIDATE_HANDOFF_v2.md` + fixture — replaced by v3/v4.

## No-false-green rules

Current RC evidence must never claim:
- seeded `old_boundary_token` inventory is a full PA09 pass;
- seeded `completed_shifts = 49` is ordinary-play evidence;
- Hard Work has any prerequisite beyond `completed_shifts >= 50`;
- rewardId differs from `hardWork:lumber`;
- Forest success continuation is a generic worldFact-only trigger.

The 49-state used by the current Lead one-Save path is a **long-threshold accelerator only**.

## A5

Exact Forest continuation remains:

`activityResult(lumber.forest, success, lumber.forest.success)`

via:

`lumber-cross.activity-forest-return`

## Final state

Shipped/runtime closure is green.

What remains requires either:
1. explicit human/Product decisions; or
2. Forest content authoring.

Neither category may be used to reopen or modify Hard Work.
