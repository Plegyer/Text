# TASK CHAT 3 — Lumber Production Proof Continuation v1

Status: ACTIVE / CONTINUOUS.
Base: completed `chat3/lumber-pa-scenario-next`.
Previous checkpoint is frozen for Lead review.

Locked:
- Hard Work eligibility = ONLY `completed_shifts >= 50`;
- no milestone / relationship / season / Forest / School prerequisite;
- A5 continuation boundary = `activityResult`;
- A6 rewardId = exactly `hardWork:lumber`.

Do not edit Lead-owned shared runtime/schema/build/UI while `lead/product-activation-school-lumber-v2` is active.

## Queue item 1 — legacy/new Lumber coexistence audit

Create NEW files only:
- `docs/lumber-prep/LUMBER_LEGACY_TARGET_COEXISTENCE_AUDIT_v1.md`
- `prior-work/astra/prototype-m3.2/tests/lumber-legacy-target-coexistence.test.ts`

Audit current main contracts for coexistence of legacy action `lumber` and target action `lumber.shift`.

Prove/document:
- they are distinct action IDs and must not overwrite each other;
- old schema-4 saves with actionCounts for `lumber` remain parseable while target activation introduces `lumber.shift`;
- target career counter `completed_shifts` is not silently inferred from legacy actionCounts;
- target semantic presentation for `lumber.shift` remains `job/lumber/shift/<season>/default`;
- Hard Work reads only target `completed_shifts`, never legacy visit/action count.

Do not implement migration between old/new Lumber progress unless an accepted contract already exists.

## Queue item 2 — shipped Lumber pack parity contract

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/lumber-shipped-pack-parity.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/lumber-shipped-pack-parity.test.ts`

Build an exact parity manifest for the three approved Lumber production event families:
- career / Foreman progression;
- School/Forest cross-system return;
- Foreman Night continuation.

For each family record:
- pack id;
- event IDs;
- read/write capability domains;
- required media IDs;
- semantic presentation IDs;
- required target definitions.

Verify:
- synthetic `school.lumber-management` is not a production requirement;
- no event adds a second Hard Work prerequisite;
- Forest success continuation is driven by exact `activityResult`;
- exact `hardWork:lumber` survives unchanged.

No shared production file edits. After item 1 commit immediately continue to item 2.


## Queue item 3 — Lumber shipped activation expectation matrix

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/lumber-shipped-activation-expectations.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/lumber-shipped-activation-expectations.test.ts`

Record the exact production expectations for:
- legacy `lumber` coexistence;
- target `lumber.shift`;
- career machine;
- Foreman relationship;
- Forest Activity;
- Lumber endings;
- the three approved Lumber event pack families.

Synthetic `school.lumber-management` must be explicitly excluded.

## Queue item 4 — Lumber schema-4 legacy save compatibility fixture

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/lumber-schema4-legacy-save.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/lumber-schema4-legacy-save.test.ts`

Prove at the fixture/contract level:
- a pre-target save may contain legacy actionCount `lumber`;
- target `lumber.shift` progress is separate;
- no implicit conversion to `completed_shifts`;
- old unrelated progression remains unchanged;
- Hard Work cannot become eligible from legacy actionCount alone.

Do not implement migration.

## Queue item 5 — Lumber cross-system reload chronology

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/lumber-cross-system-reload-chronology.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/lumber-cross-system-reload-chronology.test.ts`

Cover save/reload boundaries across:
- shift result;
- reactive career milestone;
- Foreman route;
- Night meeting;
- Forest entry/checkpoint/result;
- Hard Work commit/completion;
- separate complex ending.

No duplicated Energy, lodging payment, progress or meta reward.

## Queue item 6 — Lumber unresolved dependency ledger

Create NEW files only:
- `docs/lumber-prep/LUMBER_UNRESOLVED_DEPENDENCY_LEDGER_v1.md`
- optional `prior-work/astra/prototype-m3.2/tests/lumber-unresolved-dependency-ledger.test.ts`

Track only genuine OPEN production dependencies:
- Old Boundary Token capability acquisition/use source;
- School management/accounting public fact ID/threshold;
- Arcana/forest School public fact ID/threshold;
- any deeper Forest authoring not already locked.

For each dependency state what is already executable and what must not be invented.

Hard Work is NOT an open dependency and must remain ONLY `completed_shifts >= 50`.

Continue sequentially through items 3–6 without waiting for Lead review.


## Queue item 7 — Lumber production UI contract fixture

Create NEW files:
- `prior-work/astra/prototype-m3.2/content/lumber-production-ui-contract.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/lumber-production-ui-contract.test.ts`

Define exact UI-facing expectations for target `lumber.shift`, Forest Activity entry/actions, Foreman Night visibility and ending availability. No shared UI edits.

## Queue item 8 — Lumber ending identity matrix

Create NEW files:
- `prior-work/astra/prototype-m3.2/content/lumber-ending-identity.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/lumber-ending-identity.test.ts`

Cross-check Hard Work / Forewoman / Forest ending IDs, conditions, semantic presentation IDs and Meta rewards. Hard Work must remain the only ending here granting exact `hardWork:lumber`.

## Queue item 9 — Foreman professional Night exhaustive matrix

Create NEW files:
- `prior-work/astra/prototype-m3.2/content/lumber-foreman-night-matrix.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/lumber-foreman-night-matrix.test.ts`

Prove visibility only on the professional route, zero daytime Energy, one Night slot, lodging payment exactly once, reload stability, and no romance prerequisite.

## Queue item 10 — Lumber static-media production parity

Create NEW files:
- `prior-work/astra/prototype-m3.2/content/lumber-production-media-parity.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/lumber-production-media-parity.test.ts`

Compare approved target pack media IDs with shipped static fallback assets and semantic slots. Missing future GIFs are non-fatal; no missing path may be labeled shipped.

## Queue item 11 — Lumber final PA row mapping

Create:
- `docs/lumber-prep/LUMBER_PRODUCT_ACCEPTANCE_ROW_MAP_v1.md`
- optional NEW test `prior-work/astra/prototype-m3.2/tests/lumber-pa-row-map.test.ts`

Map every relevant PA00–PA26 row to exact Lumber IDs, commands, reaction facts, reload checkpoints and remaining OPEN dependencies.

## Queue item 12 — Lumber release-readiness checklist

Create:
- `docs/lumber-prep/LUMBER_RELEASE_READINESS_v1.md`

Summarize executable/shipped/blocked status for Work, milestone, Foreman, Night, Forest, Hard Work and complex endings. Explicitly separate OPEN item-capability / School-public-fact authoring from already-ready Hard Work.

Continue items 7–12 sequentially without waiting for Lead review.


## Queue item 13 — Lumber PA shipped-row evidence matrix

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/lumber-pa-shipped-row-evidence.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/lumber-pa-shipped-row-evidence.test.ts`

Map PA02–PA06, PA12, PA14–PA26 to exact target Lumber IDs and classify each as:
- shipped-executable;
- accelerator-valid for long threshold only;
- blocked by genuine OPEN authoring.

Do not mark PA09/PA17 passed merely by injecting a capability fact.

## Queue item 14 — Old Boundary Token capability authoring packet

Create:
- `docs/lumber-prep/OLD_BOUNDARY_TOKEN_AUTHORING_PACKET_v1.md`
- `prior-work/astra/prototype-m3.2/content/old-boundary-token-authoring.fixture.json`

Without implementing production content, specify the smallest acceptable product authoring seam for:
- obtaining the item/capability;
- inventory visibility;
- changing available Forest Activity action/route;
- save/reload;
- no percentage-only effect.

Keep exact acquisition source OPEN if not already locked.

## Queue item 15 — Forest depth gap-to-spec matrix

Create:
- `docs/lumber-prep/FOREST_DEPTH_GAP_TO_SPEC_v1.md`
- `prior-work/astra/prototype-m3.2/tests/lumber-forest-depth-gap.test.ts`

Compare current `counter.v1` Forest Activity contract against Product Acceptance requirements:
- 3 route contexts;
- 3 challenge families;
- item capability;
- season difference;
- save/resume;
- success/escape distinction.

Test only what is already true; explicitly fail/classify missing depth rather than fabricating it.

## Queue item 16 — School→Lumber public-fact authoring packet

Create:
- `docs/lumber-prep/SCHOOL_LUMBER_PUBLIC_FACT_AUTHORING_PACKET_v1.md`
- `prior-work/astra/prototype-m3.2/content/school-lumber-public-fact-authoring.fixture.json`

Specify the smallest accepted public boundary needed by the existing Lumber listener:
`lumber.school.management-ready`.

Do not invent the School threshold/course/milestone that emits it. Separate:
- existing Lumber listener behavior;
- missing School authoring;
- save/reload/public ownership contract.

## Queue item 17 — Lumber PA blocker burn-down ledger

Create:
- `docs/lumber-prep/LUMBER_PA_BLOCKER_BURNDOWN_v1.md`

Start from the current unresolved dependency ledger and reduce it to only blockers that remain after production activation. Name the exact PA rows each blocker affects and the smallest product decision/implementation that would close it.

## Queue item 18 — Lumber integration handoff manifest

Create:
- `docs/lumber-prep/LUMBER_INTEGRATION_HANDOFF_v1.md`
- `prior-work/astra/prototype-m3.2/content/lumber-integration-handoff.fixture.json`

Deduplicate all Chat 3 branch artifacts into:
- MUST_INTEGRATE;
- QA_EVIDENCE_ONLY;
- SUPERSEDED;
- OPEN_AUTHORING_PACKET.

Hard Work must be listed as already locked/shipped, never an OPEN blocker.

Continue items 13–18 sequentially without waiting for Lead review.


## Queue item 19 — Lumber PA closure dependency audit

Create NEW files only:
- `docs/lumber-prep/LUMBER_PA_CLOSURE_DEPENDENCY_AUDIT_v1.md`
- `prior-work/astra/prototype-m3.2/tests/lumber-pa-closure-dependency.test.ts`

Using the merged PR21 gate result and authoritative item/Forest docs, classify each remaining Lumber-facing blocker as:
- already shipped;
- runtime infrastructure missing;
- authoring missing;
- presentation/content-depth only.

At minimum cover PA09, PA14–PA20, PA21–PA26.
Do not invent acquisition sources, consume semantics, School thresholds or Forest lore.

## Queue item 20 — capability-aware Forest option contract

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/lumber-forest-capability-options.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/lumber-forest-capability-options.test.ts`

Define the exact authoring contract for Forest Activity options enabled by item capabilities:
- `enter_old_boundary`;
- `cross_rough_route`;
- `preserve_specimen`;
- `cut_heavy_wood`.

For each option record:
- required capability;
- route/challenge family;
- whether the item is retained or consumed = OPEN unless authoritative docs lock it;
- expected save/reload identity;
- expected effect on available action-space.

Do not patch shared runtime/schema/UI.

## Queue item 21 — Forest 3-route / 3-challenge production authoring matrix

Create NEW files only:
- `docs/lumber-prep/FOREST_PRODUCTION_AUTHORING_MATRIX_v1.md`
- `prior-work/astra/prototype-m3.2/content/forest-production-authoring-matrix.fixture.json`

Map authoritative Forest requirements into a concrete but non-lore-specific production matrix:
Routes:
- logging road;
- hunter trail;
- old boundary path.

Challenge families:
- navigation;
- physical obstacle;
- interpretation/ritual anomaly.

Also map seasonal topology differences.

Do not invent final NPC identity, loot, lore, camp, acquisition source or thresholds.

## Queue item 22 — item-use exactly-once save contract

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/lumber-item-use-exactly-once.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/lumber-item-use-exactly-once.test.ts`

Define/test the contract that any future Forest item option:
- commits use/consume at one explicit boundary;
- reload cannot double-consume;
- retained items remain present deterministically;
- consumed items cannot reappear from reload;
- capability/action availability is recomputed from actual inventory state.

Keep consume/retain policy per item OPEN where not authoritative.

## Queue item 23 — Lumber closure candidate row map

Create:
- `docs/lumber-prep/LUMBER_PA_CLOSURE_ROW_MAP_v1.md`

Re-map PA rows after PR21 and after the new generic capability-aware runtime direction:
- rows closable by runtime infrastructure;
- rows still needing authoring;
- rows already shipped;
- rows only needing richer content depth.

Hard Work must remain fully closed and independent.

## Queue item 24 — Lumber release-candidate handoff v2

Create:
- `docs/lumber-prep/LUMBER_RELEASE_CANDIDATE_HANDOFF_v2.md`
- `prior-work/astra/prototype-m3.2/content/lumber-release-candidate-handoff.fixture.json`

Consolidate all Chat 3 work after PR21 into:
- READY_TO_INTEGRATE_NOW;
- QA_EVIDENCE_ONLY;
- OPEN_AUTHORING_PACKET;
- FOREST_DEPTH_CONTENT;
- SUPERSEDED.

Name exact files in each class and identify the smallest Lead integration subset.

Continue items 19–24 sequentially without waiting for Lead review.


## Queue item 25 — PR22 Lumber closure parity audit

Create NEW files only:
- `docs/lumber-prep/LUMBER_PR22_CLOSURE_PARITY_AUDIT_v1.md`
- `prior-work/astra/prototype-m3.2/tests/lumber-pr22-closure-parity.test.ts`

Review merged PR #22 against accepted Lumber contracts:
- Forest entry available without Old Boundary Token;
- logging-road is normal route;
- old-boundary route requires actual inventory-derived `enter_old_boundary`;
- legacy active Activity saves preserve advance/escape;
- no acquisition source or consume policy invented;
- Hard Work unchanged.

Identify remaining Lumber blockers after PR22.

## Queue item 26 — Forest hunter-trail authoring packet

Create:
- `docs/lumber-prep/FOREST_HUNTER_TRAIL_AUTHORING_PACKET_v1.md`
- `prior-work/astra/prototype-m3.2/content/forest-hunter-trail-authoring.fixture.json`

Specify the smallest product-authoring seam for the locked hunter-trail route.

Do not invent:
- final clue item identity if still OPEN;
- Hunter scene source;
- exact lore reward;
- thresholds.

Define required route/challenge integration, save/reload, and capability/public-fact boundary only.

## Queue item 27 — Forest challenge-family authoring packet

Create:
- `docs/lumber-prep/FOREST_CHALLENGE_FAMILY_AUTHORING_PACKET_v1.md`
- `prior-work/astra/prototype-m3.2/content/forest-challenge-family-authoring.fixture.json`

Specify implementation-ready contracts for:
- navigation;
- physical obstacle;
- interpretation/ritual anomaly.

For each define:
- allowed stat/capability dependency categories;
- result semantics;
- save/checkpoint requirement;
- success/escape/failure distinction;
- what remains authoring OPEN.

No final prose/lore invention.

## Queue item 28 — Forest season topology authoring packet

Create:
- `docs/lumber-prep/FOREST_SEASON_TOPOLOGY_AUTHORING_PACKET_v1.md`
- `prior-work/astra/prototype-m3.2/content/forest-season-topology-authoring.fixture.json`

Translate authoritative seasonal requirements into a non-lore-specific topology contract:
- at least one route/challenge availability difference by season;
- stable route identity;
- deterministic reload;
- no random hidden rule change.

Do not invent exact seasonal narrative events.

## Queue item 29 — Old Boundary Token decision matrix

Create:
- `docs/lumber-prep/OLD_BOUNDARY_TOKEN_DECISION_MATRIX_v1.md`

List the explicit product decisions still required:
- acquisition source;
- acquisition timing/requirements;
- retained vs consumed;
- repeatability;
- visibility in inventory;
- whether losing/removing token immediately removes route capability.

For each decision list downstream PA rows and runtime/content seams affected.

Do not select a preferred answer.

## Queue item 30 — Lumber RC closure handoff v3

Create:
- `docs/lumber-prep/LUMBER_RC_CLOSURE_HANDOFF_v3.md`
- `prior-work/astra/prototype-m3.2/content/lumber-rc-closure-handoff.fixture.json`

Consolidate post-PR22 Lumber state into:
- SHIPPED_GREEN;
- READY_TO_INTEGRATE_QA;
- AUTHORING_DECISION_REQUIRED;
- FOREST_CONTENT_DEPTH;
- SUPERSEDED.

Hard Work must remain SHIPPED_GREEN and independent.

Continue items 25–30 sequentially without waiting for Lead review.
