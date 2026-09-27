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


## Queue item 31 — PR24 one-Save Lumber state audit

Create NEW files only:
- `docs/lumber-prep/LUMBER_PR24_ONE_SAVE_STATE_AUDIT_v1.md`
- `prior-work/astra/prototype-m3.2/tests/lumber-pr24-one-save-state-audit.test.ts`

Review the current Lead one-Save E2E path from the Lumber perspective:
Lumber shift -> milestone -> Foreman -> School -> Night -> Forest logging-road -> Lumber return -> 49/50 Hard Work -> ending -> New Run.

Verify:
- one daytime Energy for each actual Lumber shift;
- no extra Energy for reactive Lumber/Foreman continuations;
- professional Foreman route remains non-romance;
- Forest return uses exact `activityResult`;
- Hard Work remains ONLY `completed_shifts >= 50`;
- exact rewardId remains `hardWork:lumber`;
- the 49-shift setup is labeled threshold accelerator, not product authoring.

Do not patch shared runtime.

## Queue item 32 — Old Boundary Token acquisition decision-ready packet

Create:
- `docs/lumber-prep/OLD_BOUNDARY_TOKEN_DECISION_READY_PACKET_v1.md`
- `prior-work/astra/prototype-m3.2/content/old-boundary-token-decision-ready.fixture.json`

Turn the current decision matrix into a product-decision packet.

For each unresolved decision:
- acquisition source;
- timing/requirements;
- retained vs consumed;
- repeatability;
- inventory visibility;
- capability removal behavior;

list:
- acceptable answer types;
- downstream code/content seams;
- PA rows affected;
- migration/save implications.

Do NOT select a preferred answer.

## Queue item 33 — hunter-trail unresolved identity boundary test

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/forest-hunter-trail-boundary.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/forest-hunter-trail-boundary.test.ts`

Prove what is locked vs OPEN for hunter trail:
- route identity is locked;
- clue/capability identity remains OPEN unless authoritative docs already fix it;
- runtime can host another capability-gated route without changing old-boundary semantics;
- no fake item ID may be promoted to production.

This is a boundary/negative test, not production authoring.

## Queue item 34 — Forest challenge-family executable skeleton contract

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/forest-challenge-skeleton.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/forest-challenge-skeleton.test.ts`

Define an implementation-ready non-lore skeleton for:
- navigation;
- physical obstacle;
- interpretation/ritual anomaly.

For each family include:
- stable challenge-family id;
- allowed condition/effect categories;
- save/checkpoint requirement;
- success/escape/failure result shape;
- capability hook allowance;
- season-availability hook allowance.

Do not invent final text, loot, NPCs or thresholds.

## Queue item 35 — Lumber RC no-false-green sentinel

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/lumber-rc-no-false-green.test.ts`

Fail if any RC artifact:
- counts seeded `old_boundary_token` inventory as PA09 full pass;
- counts seeded completed_shifts=49 as ordinary play evidence;
- adds any School/Forest/item/relationship/season condition to Hard Work;
- changes exact `hardWork:lumber`;
- replaces exact Forest `activityResult` continuation with a generic worldFact-only trigger.

## Queue item 36 — Lumber final decision/evidence handoff v4

Create:
- `docs/lumber-prep/LUMBER_FINAL_DECISION_EVIDENCE_HANDOFF_v4.md`
- `prior-work/astra/prototype-m3.2/content/lumber-final-decision-evidence-handoff.fixture.json`

Consolidate all post-PR22 Lumber work into:
- SHIPPED_GREEN;
- MUST_INTEGRATE_QA;
- HUMAN_DECISION_REQUIRED;
- CONTENT_AUTHORING_REQUIRED;
- PRESENTATION_FUTURE;
- SUPERSEDED.

Name exact files and identify the smallest Lead integration subset.

Continue items 31–36 sequentially without waiting for Lead review.


## Queue item 37 — post-PR24 merged Lumber reconciliation

Create NEW files only:
- `docs/lumber-prep/LUMBER_POST_PR24_RECONCILIATION_v1.md`
- `prior-work/astra/prototype-m3.2/tests/lumber-post-pr24-reconciliation.test.ts`

Reconcile Lumber assumptions against merged main after PR24.

Must confirm:
- one-Save path includes real `base.school -> listen`;
- Forest logging-road remains natural shipped path;
- 49 setup is threshold accelerator only;
- 50th shift is real;
- Hard Work condition/reward remain exact;
- no School/token authoring is falsely closed.

## Queue item 38 — Old Boundary Token product-decision impact matrix

Create:
- `docs/lumber-prep/OLD_BOUNDARY_TOKEN_PRODUCT_DECISION_IMPACT_v1.md`
- `prior-work/astra/prototype-m3.2/content/old-boundary-token-product-decision-impact.fixture.json`

For each unresolved token decision, map:
- runtime code impact;
- content authoring impact;
- save/migration impact;
- UI/inventory impact;
- PA rows affected;
- test changes required.

Do not select a preferred answer.

## Queue item 39 — Forest route completeness negative suite

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/forest-route-completeness-negative.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/forest-route-completeness-negative.test.ts`

Fail/flag current production as not full PA16 if any of these are absent:
- logging road;
- hunter trail;
- old boundary;
- navigation;
- physical obstacle;
- interpretation/ritual anomaly;
- at least one seasonal topology difference.

This is a truthful gap sentinel, not a request to invent content.

## Queue item 40 — Forest future-authoring compatibility contract

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/forest-future-authoring-compat.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/forest-future-authoring-compat.test.ts`

Prove future route/challenge authoring can be added without breaking:
- legacy optionModelVersion 0 saves;
- logging-road route;
- old-boundary capability route;
- Activity result contract;
- exact Lumber continuation;
- Hard Work independence.

No shared runtime edits.

## Queue item 41 — Lumber final RC acceptance matrix

Create:
- `docs/lumber-prep/LUMBER_FINAL_RC_ACCEPTANCE_MATRIX_v1.md`
- optional NEW test.

Classify every Lumber-relevant PA row as:
- SHIPPED_GREEN;
- RUNTIME_GREEN_AUTHORING_OPEN;
- CONTENT_DEPTH_OPEN;
- HUMAN_DECISION_REQUIRED.

Use merged main after PR24 as source of truth.

## Queue item 42 — Lumber final evidence pack v5

Create:
- `docs/lumber-prep/LUMBER_FINAL_EVIDENCE_PACK_v5.md`
- `prior-work/astra/prototype-m3.2/content/lumber-final-evidence-pack.fixture.json`

Produce the smallest non-redundant Lead handoff after PR24:
- exact tests worth integrating;
- exact docs worth indexing;
- human decisions required;
- content-depth backlog;
- superseded artifacts.

Continue items 37–42 sequentially without waiting for Lead review.


## Queue item 43 — PR25 Lumber final-gate reconciliation

Create NEW files only:
- `docs/lumber-prep/LUMBER_PR25_FINAL_GATE_RECONCILIATION_v1.md`
- `prior-work/astra/prototype-m3.2/tests/lumber-pr25-final-gate-reconciliation.test.ts`

Reconcile Lumber evidence against merged PR25.

Confirm:
- PR25 changes QA only;
- Hard Work remains exactly one `completed_shifts >= 50` condition;
- exact rewardId remains `hardWork:lumber`;
- item capability remains inventory-derived;
- one-Save path still uses logging-road naturally;
- Old Boundary acquisition/retain-consume remain OPEN.

## Queue item 44 — Old Boundary Token decision test-vector pack

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/old-boundary-token-decision-vectors.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/old-boundary-token-decision-vectors.test.ts`

For each unresolved decision dimension:
- acquisition source type;
- retained vs consumed;
- repeatable vs one-shot acquisition;
- visible inventory vs hidden capability;

define option-neutral expected invariants and downstream tests.

Do not select any option or invent a vendor/event.

## Queue item 45 — hunter-trail decision matrix v2

Create:
- `docs/lumber-prep/HUNTER_TRAIL_DECISION_MATRIX_v2.md`
- `prior-work/astra/prototype-m3.2/content/hunter-trail-decision-matrix-v2.fixture.json`

Separate locked route identity from unresolved:
- clue/capability identity;
- acquisition source;
- narrative provider;
- route reward/lore.

For each unresolved point list affected runtime/content/test seams.

## Queue item 46 — Forest content-authoring completeness validator

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/forest-content-completeness.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/forest-content-completeness.test.ts`

Build a truthful validator for the final Forest authoring target:
- three routes;
- three challenge families;
- at least one season-dependent topology difference;
- save/reload checkpoints;
- distinct success/escape/failure;
- capability hooks.

Current production may fail completeness honestly; do not fabricate pass.

## Queue item 47 — Lumber human-decision closeout ledger

Create:
- `docs/lumber-prep/LUMBER_HUMAN_DECISION_CLOSEOUT_v1.md`

List only decisions that still need a human/product answer after PR25.

For each include:
- current locked context;
- permissible answer shape;
- files/systems affected;
- PA rows affected;
- whether runtime is already ready.

Do not recommend a preferred answer.

## Queue item 48 — Lumber final closeout pack v6

Create:
- `docs/lumber-prep/LUMBER_FINAL_CLOSEOUT_PACK_v6.md`
- `prior-work/astra/prototype-m3.2/content/lumber-final-closeout-pack.fixture.json`

Consolidate post-PR25 Lumber work into:
- SHIPPED_GREEN;
- MUST_INTEGRATE_QA;
- HUMAN_DECISION_REQUIRED;
- CONTENT_AUTHORING_REQUIRED;
- PRESENTATION_ASSET_ONLY;
- SUPERSEDED.

Keep Hard Work under SHIPPED_GREEN.

Continue items 43–48 sequentially without waiting for Lead review.


## Queue item 49 — PR26 Lumber closeout authority audit

Create NEW files only:
- `docs/lumber-prep/LUMBER_PR26_CLOSEOUT_AUTHORITY_AUDIT_v1.md`
- `prior-work/astra/prototype-m3.2/tests/lumber-pr26-closeout-authority.test.ts`

Review merged PR #26 decision/status docs from the Lumber perspective.

Confirm:
- Hard Work is still fully closed;
- token decisions are still neutral/open;
- PA16 content-depth gap remains explicit;
- no QA fixture is promoted to Product truth;
- current authoritative Lumber matrix is `LUMBER_FINAL_RC_ACCEPTANCE_MATRIX_v1.md`.

## Queue item 50 — token decision invariants matrix

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/old-boundary-token-invariants.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/old-boundary-token-invariants.test.ts`

Define invariants that must hold regardless of future Product choice:
- canonical item/capability IDs stay stable;
- acquisition must commit exactly once;
- capability derives from authoritative state;
- reload cannot duplicate grant/removal;
- no token decision changes Hard Work;
- old-boundary route gating remains deterministic.

Do not choose source or consume policy.

## Queue item 51 — Forest authoring-ready completeness matrix v2

Create:
- `docs/lumber-prep/FOREST_AUTHORING_READY_COMPLETENESS_v2.md`
- `prior-work/astra/prototype-m3.2/content/forest-authoring-ready-completeness-v2.fixture.json`

Separate:
- runtime-ready route/challenge primitives;
- authored-current routes;
- missing third route;
- missing three challenge families;
- missing seasonal topology;
- presentation dependencies.

No final lore/prose invention.

## Queue item 52 — Lumber human-decision test plan

Create:
- `docs/lumber-prep/LUMBER_HUMAN_DECISION_TEST_PLAN_v1.md`

For each future human decision:
- token source;
- token retain/consume;
- hunter-trail unlock;

list the exact tests that must be added/updated after the decision is made.

Do not pre-author the decision.

## Queue item 53 — Lumber post-decision migration impact audit

Create:
- `docs/lumber-prep/LUMBER_POST_DECISION_MIGRATION_IMPACT_v1.md`

For each unresolved decision, classify whether adopting a choice would require:
- no save migration;
- content-only change;
- new durable state;
- schema/runtime change.

Be conservative: do not claim schema change unless the chosen policy truly needs new persistent state.

## Queue item 54 — Lumber final Product handoff v7

Create:
- `docs/lumber-prep/LUMBER_FINAL_PRODUCT_HANDOFF_v7.md`
- `prior-work/astra/prototype-m3.2/content/lumber-final-product-handoff.fixture.json`

Produce the smallest Product-facing handoff:
- LOCKED_AND_SHIPPED;
- HUMAN_DECISION_REQUIRED;
- CONTENT_AUTHORING_REQUIRED;
- OPTIONAL_PRESENTATION_POLISH;
- SUPERSEDED.

No implementation recommendation beyond dependency mapping.

Continue items 49–54 sequentially without waiting for Lead review.


## Queue item 55 — ordinary poverty implementation-readiness map

Create NEW files only:
- `docs/poverty-prep/ORDINARY_POVERTY_IMPLEMENTATION_READINESS_v1.md`
- `prior-work/astra/prototype-m3.2/content/ordinary-poverty-readiness.fixture.json`

Translate `ECONOMY_AND_POVERTY_DRAFT_v0.md` into an implementation-ready, non-numeric map for:
- normal room;
- cheap lodging;
- street sleep;
- anti-softlock recovery;
- ordinary street event pool;
- relationship/resource recovery hooks.

Separate LOCKED/DIRECTED structure from OPEN balance numbers and fiction.

## Queue item 56 — Secret Debt state-machine authoring packet

Create NEW files only:
- `docs/poverty-prep/SECRET_DEBT_STATE_MACHINE_AUTHORING_PACKET_v1.md`
- `prior-work/astra/prototype-m3.2/content/secret-debt-state-machine-authoring.fixture.json`

Map the existing Product-directed Secret Debt/Slave career into explicit states/transitions:
- unseen -> offered -> refused/accepted;
- delayed activation;
- bound career;
- forced Night obligation;
- resolved;
- paid_freedom / bound_life / takeover.

Preserve one-off encounter semantics and ordinary-job blocking. Do not lock OPEN balance values.

## Queue item 57 — Secret Debt cross-system dependency matrix

Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_CROSS_SYSTEM_DEPENDENCIES_v1.md`

Map required integration with:
- housing/street;
- job availability;
- School;
- Activity;
- NightFlow;
- relationships;
- items/economy;
- endings;
- Meta;
- Palace prerequisite exclusion.

Mark every point as already-defined / requires Product decision / content authoring / runtime seam.

## Queue item 58 — Secret Debt outcome acceptance skeleton

Create NEW files only:
- `docs/poverty-prep/SECRET_DEBT_OUTCOME_ACCEPTANCE_SKELETON_v1.md`
- `prior-work/astra/prototype-m3.2/content/secret-debt-outcome-acceptance.fixture.json`

Define acceptance shapes for:
- paid_freedom;
- bound_life;
- takeover.

For each record:
- eligibility data categories;
- ending transaction expectations;
- Meta reward remains OPEN unless already authoritative;
- save/reload exactly-once expectation;
- what must happen to blocked ordinary jobs after resolution.

Do not invent exact rewards or thresholds.

## Queue item 59 — Forest-to-poverty coexistence audit

Create NEW file only:
- `docs/poverty-prep/FOREST_POVERTY_COEXISTENCE_AUDIT_v1.md`

Check that intended poverty/Secret Debt rules can coexist with current Activity/Lumber contracts:
- 2-Energy Activity entry;
- street/cheap lodging recovery;
- active Activity save/resume;
- forced Secret Debt Night behavior;
- exact Lumber `activityResult`;
- Hard Work independence.

Identify sequencing questions without changing locked Lumber behavior.

## Queue item 60 — poverty/Secret Debt production handoff v1

Create NEW file only:
- `docs/poverty-prep/POVERTY_SECRET_DEBT_PRODUCTION_HANDOFF_v1.md`

Consolidate items 55–59 into:
- PRODUCT_STRUCTURE_FIXED;
- BALANCE_OPEN;
- HUMAN_DECISION_REQUIRED;
- CONTENT_AUTHORING_REQUIRED;
- RUNTIME_SEAMS;
- ACCEPTANCE_READY.

Include exact source authorities and explicitly state that Secret Debt is additional to the 10 ordinary jobs and is excluded from the Palace 10/10 prerequisite.

Continue items 55–60 sequentially without waiting for Lead review.


## Queue item 61 — ordinary street-event authoring template

Create NEW file only:
- `docs/poverty-prep/ORDINARY_STREET_EVENT_AUTHORING_TEMPLATE_v1.md`

Define a reusable content unit for ordinary poverty/street events:
- eligibility context;
- season hook;
- helpful/neutral/bad outcome family;
- money/resource/condition effects;
- relationship/item hooks;
- semantic presentationId;
- GIF/static/text fallback;
- anti-softlock guard.

Do not author canonical events or final numbers.

## Queue item 62 — Secret Debt career content-depth matrix

Create NEW files only:
- `docs/poverty-prep/SECRET_DEBT_CAREER_CONTENT_DEPTH_MATRIX_v1.md`
- `prior-work/astra/prototype-m3.2/content/secret-debt-career-content-depth.fixture.json`

Map the content needed for the hidden Slave career to reach the same structural depth expected of a full career:
- repeatable shifts;
- stage transitions;
- forced Night variants;
- relationship/story events;
- external hooks;
- seasonal/context variants;
- paid_freedom / bound_life / takeover;
- presentation surfaces.

Separate fixed structure from OPEN thresholds, rewards, prose and balance.

## Queue item 63 — poverty implementation package boundary v1

Create NEW file only:
- `docs/poverty-prep/POVERTY_IMPLEMENTATION_PACKAGE_BOUNDARY_v1.md`

Define the smallest future implementation package boundaries for:
1. ordinary housing/street poverty;
2. lender encounter + delayed debt;
3. hidden career availability blocking;
4. forced Night behavior;
5. three outcome families;
6. later content-depth expansion.

For each package list dependencies, allowed ownership domains, acceptance evidence and what remains Product-owned.

Continue items 55–63 sequentially without waiting for Lead review.


## Queue item 64 — poverty balance-parameter ledger

Create NEW file only:
- `docs/poverty-prep/POVERTY_BALANCE_PARAMETER_LEDGER_v1.md`

Inventory every numeric value in ordinary poverty and Secret Debt that is still balance-owned rather than structurally locked:
- lodging costs;
- street penalties;
- lender chance;
- principal;
- delayed debt amount;
- activation delay where applicable;
- forced-Night Energy penalty;
- career gains/rewards/thresholds.

For each value identify source authority, current placeholder/range if any, systems affected, simulations required, and whether changing it needs content-only, balance-data, or runtime work.

Do not choose final numbers.

Continue items 56–64 sequentially without waiting for Lead review.


## Queue item 65 — Secret Debt ordinary-job blocking contract map

Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_JOB_BLOCKING_CONTRACT_MAP_v1.md`

Map the Product-directed rule that, once the hidden debt career becomes bound:
- the 10 ordinary careers are unavailable;
- their existing progression is preserved;
- Secret Debt/Slave becomes the available profession;
- Palace prerequisite accounting remains based only on ordinary Hard Work Meta;
- resolving the debt route restores ordinary-career availability according to the accepted outcome.

Separate already-fixed behavior from unresolved School/Activity availability decisions. Do not invent runtime implementation or thresholds.

Continue items 57–65 sequentially without waiting for Lead review.


## Queue item 66 — poverty Night sequencing contract map

Create NEW file only:
- `docs/poverty-prep/POVERTY_NIGHT_SEQUENCING_CONTRACT_MAP_v1.md`

Map the intended sequencing between:
- before-lodging forced checks;
- lodging selection/payment;
- street/cheap/normal housing state;
- after-lodging poverty events;
- voluntary Night menu;
- future Secret Debt forced Night obligations;
- next-day modifiers;
- calendar advance.

Use current NightFlow phases and identify which Secret Debt sequencing points remain Product-owned. Do not change runtime or choose open penalties/chances.

Continue items 58–66 sequentially without waiting for Lead review.


## Queue item 67 — Secret Debt outcome-to-Meta decision boundary

Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_META_DECISION_BOUNDARY_v1.md`

For `paid_freedom`, `bound_life`, and `takeover`, separate:
- ending identity/outcome structure already required;
- Meta reward family ideas already documented;
- exact reward still requiring Product decision;
- Palace prerequisite exclusion;
- save/RunResult transaction expectations already supplied by generic ending infrastructure.

Do not select exact Meta rewards or make Secret Debt count toward ordinary Hard Work.

Continue items 59–67 sequentially without waiting for Lead review.


## Queue item 68 — ordinary poverty content-batch plan

Create NEW file only:
- `docs/poverty-prep/ORDINARY_POVERTY_CONTENT_BATCH_PLAN_v1.md`

Break ordinary poverty authoring into independent production batches:
- normal-room content;
- cheap-lodging content;
- street repeatable events;
- seasonal street variants;
- recovery/help hooks;
- relationship/resource hooks;
- presentation/GIF follow-up.

For each batch list prerequisites, owned output files, validation needs and which balance values may remain parameterized.

Do not author canonical prose or final numbers.

Continue items 60–68 sequentially without waiting for Lead review.


## Queue item 69 — Secret Debt authoring intake template

Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_AUTHORING_INTAKE_TEMPLATE_v1.md`

Create a fill-in template for Product/content decisions required before implementation of:
- lender offer content;
- activation/debt balance parameters;
- hidden-career work content;
- forced Night content;
- each of the three outcomes;
- Meta rewards;
- presentation/GIF mapping.

Mark structural fields already fixed and leave unresolved values explicitly OPEN.

Continue items 61–69 sequentially without waiting for Lead review.


## Queue item 70 — poverty recovery-source authoring matrix

Create NEW file only:
- `docs/poverty-prep/POVERTY_RECOVERY_SOURCE_AUTHORING_MATRIX_v1.md`

Map authored recovery sources for a poor run:
- starting-job work;
- cheap lodging;
- ordinary street event;
- relationship help;
- item/resource assistance;
- small paid event;
- optional sale/barter if later accepted.

For each identify structural authority, content needed, runtime seam, balance dependency, and anti-softlock role. Do not make any one source mandatory and do not invent final values.

Continue items 62–70 sequentially without waiting for Lead review.


## Queue item 71 — Secret Debt presentation-content dependency map

Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_PRESENTATION_CONTENT_DEPENDENCIES_v1.md`

Map which Secret Debt/Slave presentation surfaces can be prepared from fixed structure versus which require authored content first:
- lender offer;
- delayed activation;
- repeatable hidden work;
- forced Night;
- relationship/story events;
- three outcome families;
- Meta result presentation.

Do not choose art, prose, exact rewards, or balance numbers.

Continue items 63–71 sequentially without waiting for Lead review.


## Queue item 72 — poverty production test-case inventory

Create NEW file only:
- `docs/poverty-prep/POVERTY_PRODUCTION_TEST_CASE_INVENTORY_v1.md`

Inventory future executable test cases for:
- normal/cheap/street lodging;
- zero-money recovery;
- ordinary street events;
- save/reload around poverty Night;
- lender offer/refusal/acceptance;
- delayed debt activation;
- job blocking;
- forced Night;
- three Secret Debt outcomes;
- Palace prerequisite exclusion.

Mark which cases are executable now, decision-blocked, content-blocked, or future runtime work. Do not fabricate test inputs for OPEN decisions.

Continue items 64–72 sequentially without waiting for Lead review.


## Queue item 73 — poverty balance simulation scenario template

Create NEW file only:
- `docs/poverty-prep/POVERTY_BALANCE_SIMULATION_SCENARIO_TEMPLATE_v1.md`

Define reusable simulation scenarios for future numeric balancing:
- zero-money recovery;
- poor but stable;
- work + cheap lodging;
- work + School pressure;
- repeated street sleep;
- Secret Debt accepted;
- Secret Debt refused.

Specify inputs/outputs/metrics to measure, but do not select final prices, probabilities, debt, penalties or rewards.

Continue items 65–73 sequentially without waiting for Lead review.


## Queue item 74 — Secret Debt runtime-seam implementation plan

Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_RUNTIME_SEAM_IMPLEMENTATION_PLAN_v1.md`

Map the current production primitives that can host Secret Debt without broad architecture rewrite:
- NightFlow intercepts;
- housingTier=street;
- reaction/event delivery;
- career state machine;
- world/public facts;
- next-day modifiers;
- ending/RunResult/Meta infrastructure;
- action availability gating seam still required for ordinary-job blocking.

For every seam classify READY / NEEDS_BOUNDED_RUNTIME_EXTENSION / PRODUCT_DECISION_BLOCKED. Do not choose chance, debt, rewards, thresholds or School/Activity blocking policy.

Continue items 66–74 sequentially without waiting for Lead review.


## Queue item 75 — Secret Debt delayed-activation persistence options

Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_DELAYED_ACTIVATION_PERSISTENCE_OPTIONS_v1.md`

Compare bounded implementation shapes for persisting the accepted-loan -> delayed activation interval using current target architecture.

For each option map:
- durable state owner;
- save/reload behavior;
- calendar interaction;
- exactly-once activation;
- migration impact;
- whether schema/runtime extension is actually needed.

Do not choose the delay length or final debt values. Do not select an implementation option as Product truth; identify the minimal technically compatible options for Lead.

Continue items 67–75 sequentially without waiting for Lead review.


## Queue item 76 — Secret Debt forced-Night authoring boundary

Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_FORCED_NIGHT_AUTHORING_BOUNDARY_v1.md`

Separate the fixed forced-Night product requirement from unresolved authoring/balance:
- interception point candidates compatible with NightFlow;
- voluntary-menu suppression requirement once bound;
- next-day penalty remains balance-owned;
- relationship/story variants remain content-owned;
- day work and Night obligation remain separate actions/state;
- save/reload and exactly-once requirements.

Do not choose final intercept mechanics if multiple current-compatible options remain.

Continue items 68–76 sequentially without waiting for Lead review.


## Queue item 77 — Secret Debt career-availability gating implementation contract

Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_CAREER_AVAILABILITY_GATING_CONTRACT_v1.md`

Define the bounded runtime behavior needed to enforce the already-directed rule:
- when bound, the 10 ordinary careers are unavailable;
- Secret Debt/Slave work is available;
- ordinary career progress is preserved, not reset;
- after resolution, ordinary availability is restored subject to their normal gates;
- Palace Meta prerequisite continues to count only ordinary Hard Work.

Map whether this should be expressed through action conditions, a shared availability helper, public state, or another existing-compatible seam, without selecting unresolved School/Activity blocking policy.

Continue items 69–77 sequentially without waiting for Lead review.


## Queue item 78 — poverty / Secret Debt human-decision packet v1

Create NEW file only:
- `docs/poverty-prep/POVERTY_SECRET_DEBT_HUMAN_DECISION_PACKET_v1.md`

Consolidate only decisions that genuinely require human/Product input before production implementation can proceed.

At minimum include:
- exact ordinary lodging prices if still open;
- exact street/cheap penalties if still open;
- lender encounter probability;
- principal and delayed debt amount;
- delayed activation interval if still balance-owned;
- School/Activity availability while bound;
- forced-Night exact penalty;
- exact eligibility/content thresholds for paid_freedom / bound_life / takeover;
- exact Meta rewards.

For each decision give:
- already-fixed surrounding constraints;
- acceptable answer shape/range from authority;
- downstream files/systems affected;
- whether implementation can proceed partially without the decision.

Do not recommend or select answers.

Continue items 70–78 sequentially without waiting for Lead review.


## Queue item 79 — poverty post-decision implementation map

Create NEW file only:
- `docs/poverty-prep/POVERTY_POST_DECISION_IMPLEMENTATION_MAP_v1.md`

Assume the human decision packet is later answered. Map the immediate implementation sequence for:
1. ordinary poverty content activation;
2. lender event;
3. delayed debt persistence;
4. bound-career availability gating;
5. forced Night;
6. three outcomes;
7. presentation/GIF follow-up;
8. acceptance/regression.

For each step name expected production file domains, runtime seam, tests, and dependencies. Do not pre-fill unanswered decisions.

Continue items 71–79 sequentially without waiting for Lead review.
