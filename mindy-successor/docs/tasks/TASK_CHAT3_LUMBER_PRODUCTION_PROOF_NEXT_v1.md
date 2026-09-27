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


## Queue item 80 — poverty production package acceptance plan

Create NEW file only:
- `docs/poverty-prep/POVERTY_PRODUCTION_PACKAGE_ACCEPTANCE_PLAN_v1.md`

Define acceptance for the first real poverty implementation package after Product decisions:
- production definitions/packs changed explicitly;
- zero-money anti-softlock retained;
- ordinary street content reachable naturally;
- lender path remains optional/one-off;
- save/reload exactly once;
- ordinary career progress preserved during bound state;
- Palace prerequisite exclusion;
- presentation fallback;
- targeted + full regression requirements.

Do not claim the package exists yet.

Continue items 72–80 sequentially without waiting for Lead review.


## Queue item 81 — poverty bounded implementation handoff v2

Create NEW file only:
- `docs/poverty-prep/POVERTY_BOUNDED_IMPLEMENTATION_HANDOFF_v2.md`

Summarize what Lead can implement now versus after Product decisions.

At minimum separate:
- already-shipped normal/cheap/street lodging;
- ordinary street-event production content;
- Secret Debt lender event;
- delayed activation persistence;
- bound-career availability gating;
- forced Night;
- three outcomes;
- Meta rewards;
- presentation follow-up.

For each row classify:
- READY_NOW;
- CONTENT_AUTHORING_REQUIRED;
- PRODUCT_DECISION_REQUIRED;
- BOUNDED_RUNTIME_EXTENSION_REQUIRED;
- OPTIONAL_POLISH.

Preserve Palace exclusion and all Lumber locked invariants.

Continue items 73–81 sequentially without waiting for Lead review.


## Queue item 82 — ordinary poverty first production slice plan

Create NEW file only:
- `docs/poverty-prep/ORDINARY_POVERTY_FIRST_PRODUCTION_SLICE_PLAN_v1.md`

Define the smallest real content slice that upgrades already-shipped lodging infrastructure into visible ordinary poverty gameplay without requiring Secret Debt decisions.

Include:
- street event content family;
- one or more recovery/help hooks using already-authorized system shapes;
- seasonal/context variation strategy;
- presentation fallback;
- save/reload acceptance;
- zero-money anti-softlock preservation.

Do not choose final money values, probabilities, canonical NPC identities, or new runtime architecture.

Continue items 74–82 sequentially without waiting for Lead review.


## Queue item 83 — Secret Debt minimal runtime extension checklist

Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_MINIMAL_RUNTIME_EXTENSION_CHECKLIST_v1.md`

From the current runtime-seam plan, isolate only technical extensions that are unavoidable even with Product values left parameterized.

For each proposed extension record:
- exact current limitation;
- smallest runtime/schema/content seam change;
- migration impact;
- save/reload invariant;
- test required;
- whether implementation can wait until Product decisions;
- whether current primitives already suffice.

Do not implement and do not invent Product values.

Continue items 75–83 sequentially without waiting for Lead review.


## Queue item 84 — Secret Debt state ownership recommendation memo

Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_STATE_OWNERSHIP_RECOMMENDATION_v1.md`

Compare the technically compatible state-ownership options identified by the runtime-seam work:
- existing career machine + typed facts/choices/counters;
- dedicated Secret Debt domain state;
- hybrid public-result projection.

Evaluate only technical consequences:
- persistence/migration;
- delayed activation;
- job availability gating;
- forced Night;
- outcomes;
- external consumers;
- test complexity.

State the smallest technically sufficient option and why, while leaving Product values/policies OPEN. Do not alter runtime.

Continue items 76–84 sequentially without waiting for Lead review.


## Queue item 85 — Secret Debt implementation precondition ledger

Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_IMPLEMENTATION_PRECONDITION_LEDGER_v1.md`

List the exact preconditions before Lead can start production Secret Debt implementation.

Separate:
- technical preconditions already satisfied;
- Product decisions truly blocking;
- balance values that may be parameterized/tuned later;
- content identities/prose that can be authored independently;
- tests that can be written before implementation;
- tests requiring final decisions.

Goal: prevent over-blocking implementation on nonessential decisions.

Continue items 77–85 sequentially without waiting for Lead review.


## Queue item 86 — ordinary poverty production content seed plan

Create NEW file only:
- `docs/poverty-prep/ORDINARY_POVERTY_CONTENT_SEED_PLAN_v1.md`

Prepare a bounded first authored content batch that can ship before Secret Debt decisions:
- nameless/noncanonical street micro-event families;
- recovery/help event shapes;
- seasonal context variants;
- no unique NPC identity required;
- balance effects expressed as tunable parameters;
- semantic presentation hooks;
- save/reload/anti-softlock acceptance.

Separate what can be authored immediately from anything requiring Product choice.

Continue items 78–86 sequentially without waiting for Lead review.


## Queue item 87 — ordinary street production pack v1

Create NEW production files only:
- `prior-work/astra/prototype-m3.2/content/packs/poverty-street-production.json`
- `prior-work/astra/prototype-m3.2/tests/poverty-street-production.test.ts`

Implement the first naturally reachable ordinary-poverty street content pack using existing NightFlow/event primitives only.

Required:
- activates only in production street housing context after lodging;
- at least three authored event families represented across helpful / neutral / bad pressure;
- no Secret Debt/lender state or content;
- no named canonical rescuer NPC required;
- use only existing item/resource/stat/next-day primitives;
- any numeric effects are explicitly treated by test/docs as INITIAL_TUNING, not Product locks;
- every event retains a safe/free resolution path where engine validation requires it;
- existing `stage.outside` or text-only fallback is acceptable;
- natural-path test must reach events through EndDay -> street lodging, not injected pending state.

Do not edit shared engine/schema/definitions.

## Queue item 88 — street-event save/reload regression

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/poverty-street-reload.test.ts`

Using the item-87 production pack, verify:
- selected event/variant survives reload without reroll;
- effect commits once;
- NightFlow resumes correctly;
- next-day modifier applies once;
- calendar advances once;
- event history/cooldown persists.

Do not duplicate exact tunable numbers except by reading them from the loaded pack/state.

## Queue item 89 — street seasonal-context regression

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/poverty-street-seasonal.test.ts`

Verify at least one production street event family has deterministic seasonal/context variation using existing calendar conditions.

Cover representative spring/summer/autumn/winter or the actual authored seasonal subset, and reload stability.

Do not require four bespoke event families if the pack intentionally reuses variants.

## Queue item 90 — street anti-softlock production regression

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/poverty-street-content-anti-softlock.test.ts`

Verify the new ordinary-poverty content cannot remove the baseline recovery invariant:
- start with zero money;
- naturally enter street Night;
- resolve the worst available ordinary street outcome;
- next day remains reachable;
- at least one starter job action remains executable;
- Secret Debt is not required.

Preserve current poverty contract already merged via PR33.

## Queue item 91 — cheap-lodging visible content pack

Create NEW production files only:
- `prior-work/astra/prototype-m3.2/content/packs/poverty-cheap-production.json`
- `prior-work/astra/prototype-m3.2/tests/poverty-cheap-production.test.ts`

Add one small authored cheap-lodging Night/context family so cheap lodging differs from normal beyond price, without changing existing lodging prices or base penalties.

Requirements:
- `housingTier=cheap`;
- existing NightFlow only;
- no unique NPC identity required;
- no Secret Debt;
- save/reload stable;
- fallback presentation valid.

## Queue item 92 — ordinary poverty initial-tuning ledger

Create NEW file only:
- `docs/poverty-prep/ORDINARY_POVERTY_INITIAL_TUNING_LEDGER_v1.md`

Record every numeric/content choice introduced by items 87/91 as:
- INITIAL_TUNING;
- rationale;
- affected event;
- anti-softlock bound;
- safe adjustment direction;
- not a Product lock.

Do not alter already locked structural rules.

## Queue item 93 — ordinary poverty presentation draft

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/ordinary-poverty-v1.json`

Prepare optional static/text presentation mappings for the actual item-87/91 event identities using existing shipped media only. No invented GIF paths.

## Queue item 94 — ordinary poverty production acceptance evidence

Create NEW file only:
- `docs/poverty-prep/ORDINARY_POVERTY_PRODUCTION_ACCEPTANCE_v1.md`

Record actual validation performed on items 87–93:
- content validation;
- targeted tests;
- full check if executed in the worker environment;
- natural reachability;
- reload;
- anti-softlock;
- presentation fallback.

Never claim commands/results that were not actually run.

## Queue item 95 — ordinary poverty integration handoff v3

Create NEW file only:
- `docs/poverty-prep/ORDINARY_POVERTY_INTEGRATION_HANDOFF_v3.md`

Produce the minimal selective-integration list for Lead:
- exact production pack files;
- exact tests;
- exact presentation draft;
- tuning values explicitly non-locked;
- Secret Debt explicitly excluded;
- known remaining gaps.

Continue items 87–95 sequentially without waiting for Lead review.


## Queue item 96 — ordinary street event pack v2

Create NEW production files only:
- `prior-work/astra/prototype-m3.2/content/packs/poverty-street-production-v2.json`
- `prior-work/astra/prototype-m3.2/tests/poverty-street-production-v2.test.ts`

Expand ordinary street content beyond v1 with additional naturally reachable event families and text variants.

Requirements:
- helpful / neutral / bad pressure all represented;
- seasonal/context diversity;
- no Secret Debt;
- no canonical named rescuer required;
- initial tuning remains non-locked;
- natural-path tests from NightFlow street lodging.

Do not modify shared engine/schema.

## Queue item 97 — cheap lodging content v2

Create NEW production files only:
- `prior-work/astra/prototype-m3.2/content/packs/poverty-cheap-production-v2.json`
- `prior-work/astra/prototype-m3.2/tests/poverty-cheap-production-v2.test.ts`

Expand cheap-lodging authored content with multiple variants so cheap lodging is visibly distinct from both normal lodging and street sleep.

Preserve existing lodging price/base penalty values.

## Queue item 98 — poverty recovery-help content pack

Create NEW production files only:
- `prior-work/astra/prototype-m3.2/content/packs/poverty-recovery-production.json`
- `prior-work/astra/prototype-m3.2/tests/poverty-recovery-production.test.ts`

Add naturally reachable small recovery/help events using existing primitives:
- resource help;
- low-stakes opportunity;
- item/resource assistance where current items allow it;
- no unique mandatory NPC;
- no hard prerequisite for recovery.

Keep all effects tunable and anti-softlock-safe.

## Queue item 99 — poverty bad-luck pressure pack

Create NEW production files only:
- `prior-work/astra/prototype-m3.2/content/packs/poverty-pressure-production.json`
- `prior-work/astra/prototype-m3.2/tests/poverty-pressure-production.test.ts`

Add non-terminal negative ordinary-poverty event families that create pressure without softlocking the run.

Must verify worst natural outcome still allows next-day continuation and at least one starter job.

## Queue item 100 — poverty long-run distribution test

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/poverty-long-run-distribution.test.ts`

Using deterministic seeds/fixtures supported by current engine, exercise repeated street/cheap lodging over a representative multi-day span.

Verify:
- no permanent NightFlow lock;
- no duplicate one-shot commitment;
- event cooldown/history works;
- no ordinary event accidentally behaves like Secret Debt;
- run remains recoverable.

Do not assert final probability balance.

## Queue item 101 — poverty presentation identity inventory

Create NEW file only:
- `docs/poverty-prep/POVERTY_PRESENTATION_IDENTITY_INVENTORY_v1.md`

Enumerate actual semantic/event identities introduced by items 87–99 and classify:
- repeatable;
- seasonal/context variant;
- visual-pool candidate;
- static/text fallback;
- reusable media opportunity.

This supports Chat2 multi-GIF work.

## Queue item 102 — ordinary poverty pack inclusion manifest

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/poverty-production-inclusion-v1.fixture.json`

Create the exact proposed explicit inclusion order for reviewed ordinary-poverty production packs.

Do not include Secret Debt packs or modify current catalog inclusion.

## Queue item 103 — ordinary poverty integration regression bundle

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/poverty-production-integration-bundle.test.ts`

Load all proposed ordinary-poverty production packs together and verify:
- namespace uniqueness;
- capability/ownership validity;
- NightFlow coexistence;
- anti-softlock;
- reload;
- no Secret Debt namespace/content.

## Queue item 104 — ordinary poverty production handoff v4

Create NEW file only:
- `docs/poverty-prep/ORDINARY_POVERTY_PRODUCTION_HANDOFF_v4.md`

Provide Lead with the smallest current-main selective integration bundle from items 87–103:
- exact pack files;
- exact tests;
- inclusion manifest;
- non-locked tuning;
- presentation identities;
- CI expectations;
- remaining content gaps.

Continue items 96–104 sequentially without waiting for Lead review.


## Queue item 105 — Secret Debt lender offer text bank v1

Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_LENDER_OFFER_TEXT_BANK_v1.md`

Author a bounded bank of lender-offer scene variants consistent with the already-directed structure:
- one-time street encounter;
- tempting loan;
- accept/refuse agency;
- no immediate disclosure of exact future trap beyond what Product direction permits.

Keep lender identity generic or explicitly CONTENT_DRAFT. Do not choose encounter probability, principal or later debt amount.

## Queue item 106 — Secret Debt delayed-activation text bank

Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_DELAYED_ACTIVATION_TEXT_BANK_v1.md`

Author scene variants for the period between accepted loan and debt activation:
- temporary relief;
- ambiguous reminders/signs;
- activation notice;
- no guessed delay length or exact debt amount.

## Queue item 107 — hidden-career work content bank v1

Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_HIDDEN_CAREER_WORK_BANK_v1.md`

Author repeatable hidden-career work scene families:
- ordinary/repeatable day work;
- escalating pressure;
- compliance/resistance flavor;
- relationship/world reactions where identity-neutral.

Do not set final wages, stat gains, thresholds or outcome requirements.

## Queue item 108 — forced-Night authored scene bank v1

Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_FORCED_NIGHT_SCENE_BANK_v1.md`

Author forced-Night scene families that can later plug into the already-directed bound-state Night behavior.

Preserve:
- forced Night is separate from day work;
- exact Energy/next-day penalty remains OPEN;
- no event text silently changes mechanics.

## Queue item 109 — paid_freedom outcome content draft

Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_PAID_FREEDOM_CONTENT_v1.md`

Author the narrative/content shell for `paid_freedom`:
- approach;
- resolution;
- immediate aftermath;
- world/relationship reaction hooks;
- ending/presentation identity placeholder.

Do not choose exact eligibility threshold or Meta reward.

## Queue item 110 — bound_life outcome content draft

Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_BOUND_LIFE_CONTENT_v1.md`

Author the narrative/content shell for `bound_life` with the same guardrails:
- no exact threshold;
- no guessed Meta reward;
- preserve outcome identity.

## Queue item 111 — takeover outcome content draft

Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_TAKEOVER_CONTENT_v1.md`

Author the narrative/content shell for `takeover`:
- progression context;
- resolution;
- aftermath;
- relationship/world hooks;
- presentation identity placeholder.

Do not choose exact requirements/reward.

## Queue item 112 — Secret Debt production-oriented content fixture

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/secret-debt-authored-content-v1.fixture.json`

Encode items 105–111 as machine-readable authored-content data with all unresolved mechanics expressed as null/OPEN markers, not guessed constants.

Do not include this fixture in production catalog.

## Queue item 113 — Secret Debt authored-content handoff v1

Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_AUTHORED_CONTENT_HANDOFF_v1.md`

Summarize:
- authored content now ready;
- exact Product decisions still blocking mechanics;
- which content can be converted to production immediately after those answers;
- multi-GIF opportunities;
- exact files for Lead;
- no runtime/schema changes in this wave.

Continue items 105–113 sequentially without waiting for Lead review.


## Queue item 114 — Forest route authored scene bank v1

Create NEW file only:
- `docs/lumber-prep/FOREST_ROUTE_AUTHORED_SCENE_BANK_v1.md`

Author concrete non-mechanical scene content for already-directed Forest route families:
- logging road;
- hunter trail only where identity is already authoritative;
- old boundary area without deciding unresolved token semantics;
- generic deep-forest navigation.

Keep route mechanics/thresholds unchanged or OPEN.

## Queue item 115 — Forest challenge family content bank v1

Create NEW file only:
- `docs/lumber-prep/FOREST_CHALLENGE_FAMILY_CONTENT_BANK_v1.md`

Author reusable content for:
- navigation challenges;
- physical obstacles;
- interpretation/ritual anomalies.

For each provide several text variants and presentation hooks without inventing success formulas or rewards.

## Queue item 116 — Forest seasonal context bank v1

Create NEW file only:
- `docs/lumber-prep/FOREST_SEASONAL_CONTEXT_BANK_v1.md`

Author spring/summer/autumn/winter context variants for existing Forest route/challenge families.

Do not alter route topology mechanics unless already authoritative.

## Queue item 117 — Forest result reaction production pack

Create NEW production-oriented file only:
- `prior-work/astra/prototype-m3.2/content/packs/forest-result-content-v1.json`

Using current pack/event primitives, add safe authored reactions to exact Forest `activityResult` success/escape/failure boundaries.

Requirements:
- exact `activityResult` trigger;
- content/presentation effects only unless an already-authoritative public effect exists;
- never alter Lumber Hard Work;
- strict pack namespace;
- fallback media from existing assets.

## Queue item 118 — Forest result content regression

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/forest-result-content-v1.test.ts`

Validate item 117:
- exact activityResult triggers;
- success/escape/failure identities remain distinct;
- save/reload stability;
- no duplicate effect;
- no Hard Work dependency/reward change;
- presentation fallback resolves.

## Queue item 119 — Forest authored-content integration handoff v3

Create NEW file only:
- `docs/lumber-prep/FOREST_AUTHORED_CONTENT_INTEGRATION_HANDOFF_v3.md`

Summarize items 114–118 plus Secret Debt items 111–113 once complete:
- Forest content ready for production;
- exact pack/test files;
- unresolved Old Boundary Token/hunter-trail Product choices;
- Secret Debt authored content ready but mechanics decisions still OPEN;
- multi-GIF opportunities;
- selective integration order.

Continue items 111–119 sequentially without waiting for Lead review.


## Queue item 120 — Forest multi-GIF presentation identity map

Create NEW file only:
- `docs/lumber-prep/FOREST_MULTI_GIF_PRESENTATION_IDENTITY_MAP_v1.md`

Map current/authoritative Forest route, challenge and result identities to 3–5 GIF candidate pools:
- logging road;
- hunter trail only where identity is already authoritative;
- old boundary only where identity is already authoritative;
- navigation challenge;
- physical obstacle;
- interpretation/ritual anomaly;
- success / escape / failure result.

Do not invent unresolved route/token mechanics.

## Queue item 121 — Forest production content density audit

Create NEW file only:
- `docs/lumber-prep/FOREST_PRODUCTION_CONTENT_DENSITY_AUDIT_v1.md`

Audit authored Forest content depth after items 114–118:
- route text variants;
- challenge variants;
- seasonal coverage;
- result reactions;
- presentation fallback;
- multi-GIF opportunities;
- remaining Product-blocked identities.

Classify each family READY / CONTENT_THIN / PRODUCT_BLOCKED.

## Queue item 122 — Secret Debt / Forest next-integration boundary v1

Create NEW file only:
- `docs/lumber-prep/SECRET_DEBT_FOREST_NEXT_INTEGRATION_BOUNDARY_v1.md`

Summarize which of the two streams can safely enter production next:
- Secret Debt authored content vs mechanics still Product-blocked;
- Forest authored/result content vs route/token decisions;
- exact runtime seams;
- tests ready;
- files Lead may selectively integrate now.

Do not recommend Product answers; separate implementation readiness from human decisions.

Continue items 114–122 sequentially without waiting for Lead review.


## Cross-cutting Product rule — RU + EN from now on

Effective immediately by direct Product decision:
- the game ships in **Russian and English**;
- Russian is the source authoring language; English is a full second locale;
- one gameplay/content identity, one semantic ID, one set of mechanics and one save-state serve both languages;
- language affects presentation/text only;
- no locale-specific conditions, rewards, timing, RNG, eligibility or save identity;
- Forest/Secret Debt authoring: every new player-facing authored scene, choice label or result text must be supplied in RU + EN with identical mechanics/identity across locales.
- if an already-assigned item has player-facing text and is not yet committed, author both locales now;
- if an item was already committed before this rule, do not rewrite it blindly; record it for localization migration/review.

Do not create a second copy of the gameplay event for English.


## Queue item 123 — Forest RU+EN authored source inventory

Create NEW file only:
- `docs/lumber-prep/FOREST_BILINGUAL_SOURCE_INVENTORY_v1.md`

Inventory all current player-facing Forest authored content requiring RU+EN:
- route scenes;
- challenge families;
- seasonal context;
- result reactions;
- Activity continuation text;
- multi-GIF alt/captions.

Classify REACHABLE_NOW / STAGED / PRODUCT_BLOCKED. Preserve exact `activityResult` continuation semantics.

## Queue item 124 — Forest route/challenge RU+EN bank v1

Create NEW file only:
- `docs/lumber-prep/FOREST_ROUTE_CHALLENGE_RU_EN_v1.md`

Convert currently safe Forest route/challenge authored scenes into paired RU+EN content.

Do not resolve Old Boundary Token or hunter-trail Product decisions that remain OPEN.

## Queue item 125 — Forest result reaction bilingual production draft

Create NEW production-oriented file only:
- `prior-work/astra/prototype-m3.2/content/packs/forest-result-content-bilingual-v1.json`

Prepare RU+EN result-reaction content for exact existing Forest `activityResult` success/escape/failure identities.

No shared runtime/schema edits. If bilingual payload cannot fit strict production schema yet, keep locale-neutral gameplay/event data plus explicit RU/EN authoring sidecar structure and document the limitation.

## Queue item 126 — Forest bilingual contract test

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/forest-bilingual-content-contract.test.ts`

Validate:
- RU + EN coverage for authored Forest player text;
- locale-neutral route/result IDs;
- no duplicated gameplay events by locale;
- exact `activityResult` trigger identity unchanged;
- no Lumber Hard Work condition/reward drift.

## Queue item 127 — Secret Debt RU+EN lender/work/Night bank v1

Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_CORE_CONTENT_RU_EN_v1.md`

Convert currently authored lender offer, delayed activation, hidden work and forced-Night content into paired RU+EN text.

Keep all unresolved probability/debt/delay/penalty mechanics OPEN.

## Queue item 128 — Secret Debt outcomes RU+EN bank v1

Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_OUTCOMES_RU_EN_v1.md`

Provide paired RU+EN authored content for:
- paid_freedom;
- bound_life;
- takeover.

Keep exact eligibility thresholds and Meta rewards OPEN.

## Queue item 129 — Secret Debt bilingual authoring fixture

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/secret-debt-authored-content-ru-en-v1.fixture.json`

Encode the bilingual authored content with:
- locale-neutral semantic/content IDs;
- RU text;
- EN text;
- OPEN/null markers for unresolved mechanics;
- shared presentation identities.

Do not include in production catalog.

## Queue item 130 — Forest/Secret Debt bilingual multi-GIF map

Create NEW file only:
- `docs/lumber-prep/FOREST_SECRET_DEBT_BILINGUAL_MULTI_GIF_MAP_v1.md`

Map shared 3–5 GIF pools with RU/EN alt/captions for:
- Forest routes/challenges/results;
- Secret Debt lender/work/Night/outcomes.

GIF/media candidate identity must remain locale-neutral.

## Queue item 131 — Forest/Secret Debt bilingual handoff v1

Create NEW file only:
- `docs/lumber-prep/FOREST_SECRET_DEBT_BILINGUAL_HANDOFF_v1.md`

Summarize:
- bilingual authored files ready;
- production-safe Forest content;
- Secret Debt content ready but mechanics Product-blocked;
- multi-GIF mappings;
- exact Lead localization seam required;
- selective integration order.

Continue items 123–131 sequentially without waiting for Lead review.


## Queue item 132 — Forest bilingual production pack v2

Create NEW production-oriented file only:
- `prior-work/astra/prototype-m3.2/content/packs/forest-result-content-bilingual-v2.json`

Prepare strict pack-compatible Forest result reactions with locale-neutral event IDs plus localization-ready RU+EN payload/evidence compatible with the new Lead localization seam.

Do not change exact activityResult mechanics.

## Queue item 133 — Forest bilingual production regression v2

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/forest-result-bilingual-v2.test.ts`

Validate:
- strict pack namespace;
- exact success/escape/failure activityResult triggers;
- locale-neutral IDs;
- RU+EN content coverage evidence;
- no Lumber Hard Work drift;
- no duplicate gameplay events by locale.

## Queue item 134 — Forest localization migration bundle v1

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/forest-localization-migration-v1.fixture.json`

Map current Forest player-facing identities to deterministic localization keys with RU+EN text and coverage status.

## Queue item 135 — Forest bilingual production handoff v4

Create NEW file only:
- `docs/lumber-prep/FOREST_BILINGUAL_PRODUCTION_HANDOFF_v4.md`

Summarize production-safe Forest bilingual content, exact files/tests, Product-blocked route identities, and selective integration order.

Continue items 127–135 sequentially without waiting for Lead review.


## Queue item 136 — ordinary poverty localization source inventory v2

Create NEW file only:
- `docs/poverty-prep/ORDINARY_POVERTY_LOCALIZATION_SOURCE_INVENTORY_v2.md`

Inventory current production ordinary-poverty player-facing text from PR37 and map deterministic locale-neutral localization keys.

Cover:
- street;
- cheap lodging;
- recovery/help;
- pressure/bad-luck.

Classify RU_READY / EN_READY / FALLBACK_DEBT.

## Queue item 137 — ordinary poverty RU+EN migration bundle v1

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/poverty-localization-migration-v1.fixture.json`

Provide RU+EN localized text for current ordinary-poverty production identities using the Lead localization bundle shape.

No Secret Debt content.

## Queue item 138 — ordinary poverty localization contract test v1

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/poverty-localization-migration-v1.test.ts`

Validate:
- RU+EN coverage;
- locale-neutral event IDs;
- no duplicated localized gameplay events;
- no conditions/effects/rewards differ by locale;
- fallback debt explicit.

## Queue item 139 — ordinary poverty bilingual multi-GIF adoption map v1

Create NEW file only:
- `docs/poverty-prep/ORDINARY_POVERTY_BILINGUAL_MULTI_GIF_ADOPTION_v1.md`

Map current PR37 semantic presentation identities to:
- 3–5 shared media candidates;
- RU/EN alt localization keys;
- static fallback;
- real-vs-placeholder asset status.

Continue items 131–139 sequentially without waiting for Lead review.


## Queue item 140 — ordinary poverty localization main delta v1

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/poverty-localization-main-delta-v1.fixture.json`

Produce the exact `content/localization.json` delta for current shipped ordinary-poverty production from PR37.

Requirements:
- deterministic locale-neutral keys;
- RU + EN for every included player-facing street/cheap/recovery/pressure identity;
- media alt keys where current media IDs exist;
- no Secret Debt content;
- no gameplay fields.

## Queue item 141 — ordinary poverty localization delta contract test

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/poverty-localization-main-delta-v1.test.ts`

Validate item 140:
- every mapped production identity exists in current poverty packs;
- RU and EN are both present;
- keys are unique and locale-neutral;
- no conditions/effects/rewards are duplicated by locale;
- Secret Debt IDs are absent;
- fallback debt is explicit rather than silently counted as translated.

## Queue item 142 — ordinary poverty localized UI copy bank v1

Create NEW file only:
- `docs/poverty-prep/ORDINARY_POVERTY_UI_COPY_RU_EN_v1.md`

Provide polished RU+EN copy for current ordinary-poverty player-facing surfaces:
- street lodging context;
- cheap lodging context;
- helpful/recovery reactions;
- neutral reactions;
- pressure/bad-luck reactions;
- return/continue choice wording.

Do not change money/Energy/housing mechanics.

## Queue item 143 — poverty event localization key map v1

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/poverty-event-localization-key-map-v1.fixture.json`

Map exact current production poverty event IDs / variant IDs / choice IDs / media IDs to localization keys used by the Lead runtime:
- `event.<eventId>.title`
- `event.<eventId>.variant.<variantId>.text`
- `event.<eventId>.choice.<choiceId>.label`
- `event.<eventId>.choice.<choiceId>.text`
- `media.<mediaId>.alt`

No new gameplay IDs.

## Queue item 144 — ordinary poverty multi-GIF staging patch v1

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/ordinary-poverty-multigif-staging-v1.json`

Prepare PR42-compatible 3–5 candidate pools for representative shipped poverty semantic IDs.

Requirements:
- locale-neutral candidate keys;
- shared static fallback;
- RU/EN alt localization-key references;
- real asset vs placeholder explicitly marked;
- placeholders remain staging-only and must not be presented as shipped art;
- media choice never changes poverty outcome.

## Queue item 145 — poverty localization natural-path regression plan v1

Create NEW file only:
- `docs/poverty-prep/POVERTY_LOCALIZATION_NATURAL_PATH_REGRESSION_v1.md`

Define exact executable natural-path smoke for:
day action -> EndDay -> street/cheap lodging -> poverty event -> RU text -> switch EN -> same pending gameplay event -> resolve -> same effects -> reload.

Specify state assertions before and after locale switch.

## Queue item 146 — Forest result natural-path bilingual regression v3

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/forest-result-bilingual-natural-path-v3.test.ts`

Using current engine primitives and the Forest result production pack, validate:
- naturally emitted exact `activityResult` success/escape/failure can trigger the matching reaction;
- pending event identity is locale-neutral;
- localization bundle has RU+EN for triggered scene;
- resolving the localized scene applies no extra gameplay effect;
- save/reload remains stable;
- Lumber Hard Work still depends only on completed_shifts >= 50.

Do not edit shared runtime.

## Queue item 147 — ordinary poverty localization integration handoff v5

Create NEW file only:
- `docs/poverty-prep/ORDINARY_POVERTY_LOCALIZATION_INTEGRATION_HANDOFF_v5.md`

Consolidate items 136–145:
- exact localization delta;
- exact event-key map;
- tests;
- natural-path smoke;
- multi-GIF staging patch;
- selective files Lead can copy to a fresh current-main branch;
- any remaining untranslated shipped poverty surfaces.

## Queue item 148 — Forest + poverty current-main integration ledger v1

Create NEW file only:
- `docs/lumber-prep/FOREST_POVERTY_CURRENT_MAIN_INTEGRATION_LEDGER_v1.md`

Record, based on current main / PR43 status:
- Forest result bilingual production: SHIPPED / PR_OPEN / BLOCKED;
- Forest remaining authored routes/challenges: production-ready vs staged;
- ordinary poverty gameplay production: shipped;
- ordinary poverty RU+EN delta: ready vs missing;
- multi-GIF: runtime shipped, real assets vs placeholders;
- Secret Debt: authored-only / Product-blocked mechanics.

Give Lead an exact next selective-integration order.

Continue items 140–148 sequentially without waiting for Lead review.


## Queue depth Product rule — 12

Current coordination target:
- keep **12 independent useful tasks** queued/outstanding whenever practical;
- do not invent filler work merely to reach 12;
- Chat 3 owns Forest + ordinary poverty + Secret Debt authored content/evidence only;
- shared runtime/schema/UI remains Lead-owned;
- Secret Debt gameplay/reward decisions remain Product-blocked unless explicitly locked;
- worker branch remains selective-copy only.

## Queue item 149 — ordinary poverty localization executable natural-path test v2

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/poverty-localization-natural-path-v2.test.ts`

Turn item 145 into executable coverage against current shipped poverty packs:
- naturally reach one street event and one cheap-lodging event;
- resolve RU and EN text from the localization delta;
- locale switch must not change pending event/variant, RNG, NightFlow or gameplay Save;
- resolve the same choice and prove effects are applied exactly once;
- Secret Debt IDs must not appear.

Do not edit shared runtime/UI.

## Queue item 150 — poverty localization merge-collision guard v1

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/poverty-localization-merge-collision-v1.test.ts`

Validate the item-140 delta against current-main `content/localization.json`:
- additive keys only or exact-identical duplicates;
- no conflicting RU/EN replacement;
- no locale suffix in gameplay identity;
- every event/media ID referenced by the delta exists in current production packs;
- no Secret Debt contamination.

## Queue item 151 — ordinary poverty full shipped localization coverage ledger v3

Create NEW file only:
- `docs/poverty-prep/ORDINARY_POVERTY_LOCALIZATION_COVERAGE_LEDGER_v3.md`

Enumerate every player-facing title/body/choice/media-alt surface in the six current ordinary-poverty production packs and classify:
- COVERED_RU_EN;
- RU_FALLBACK_ONLY;
- MISSING;
- NON_PLAYER_FACING.

Use actual Git identities only.

## Queue item 152 — poverty localization post-merge UI smoke fixture v1

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/poverty-ui-locale-smoke-v1.fixture.json`

Provide deterministic expected RU/EN text for representative:
- street helpful;
- street pressure;
- cheap lodging;
- recovery/help;
- neutral poverty event.

Include gameplay IDs only as references, never duplicated mechanics.

## Queue item 153 — ordinary poverty locale invariance contract test v1

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/poverty-locale-invariance-v1.test.ts`

For representative effect-free and effectful poverty events prove:
- locale has no condition/effect/reward/RNG difference;
- pending IDs unchanged;
- save/reload after localized choice does not duplicate money/Energy/housing effects;
- locale remains outside gameplay Save.

## Queue item 154 — Forest current-main bilingual coverage test v4

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/forest-current-main-bilingual-coverage-v4.test.ts`

Against current main semantics validate:
- activity label;
- current shipped route labels only;
- success/escape/failure result events;
- choice labels/text;
- media alt;
- RU+EN completeness;
- exact `activityResult` result IDs unchanged;
- Hard Work remains only completed_shifts >= 50.

No Hunter/Old Boundary unresolved semantics may be invented.

## Queue item 155 — Forest route presentation content staging v2

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/forest-route-content-staging-v2.json`

Use only existing shipped route identities:
- logging road;
- old boundary.

Provide semantic presentation text/media-slot staging from the already-authored route scene bank.
Requirements:
- no new route IDs;
- no new conditions/effects/rewards;
- no item-consume/acquisition assumption;
- RU/EN text-key references;
- placeholders explicitly STAGING_ONLY;
- media choice presentation-only.

## Queue item 156 — Forest route staging contract test v2

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/forest-route-content-staging-v2.test.ts`

Validate item 155:
- only current shipped route identities;
- no Hunter production ID;
- no gameplay fields;
- semantic presentation IDs stable;
- placeholder media never marked production;
- locale-neutral identities.

## Queue item 157 — Hunter trail Product-open staging packet v3

Create NEW file only:
- `docs/lumber-prep/FOREST_HUNTER_TRAIL_PRODUCT_OPEN_STAGING_v3.md`

Consolidate existing Hunter-trail authored material into a strict Product-open packet:
- route concept;
- scene bank;
- possible condition families;
- possible presentation identities;
- exact unresolved decisions still required.

Do NOT select canonical production option ID, clue fact, capability ID, provider, threshold or reward.

## Queue item 158 — Forest challenge-family staging matrix v2

Create NEW file only:
- `docs/lumber-prep/FOREST_CHALLENGE_FAMILY_STAGING_MATRIX_v2.md`

For navigation, physical obstacle, interpretation/ritual anomaly:
- map existing runtime-capable condition/effect primitives;
- attach already-authored RU+EN prose candidates;
- list safe presentation IDs;
- mark all still-open threshold/reward/lore choices.

No new runtime/schema.

## Queue item 159 — Forest seasonal topology Product-open matrix v2

Create NEW file only:
- `docs/lumber-prep/FOREST_SEASONAL_TOPOLOGY_PRODUCT_OPEN_MATRIX_v2.md`

Prepare four-season authored options without locking mechanics:
- which current route scene families can vary in spring/summer/autumn/winter;
- which deterministic topology decisions are still Product-open;
- what can ship as presentation-only today;
- what requires a real Activity option-condition decision.

Do not fake a mechanical season difference with prose.

## Queue item 160 — Forest + poverty next selective-integration handoff v2

Create NEW file only:
- `docs/lumber-prep/FOREST_POVERTY_NEXT_SELECTIVE_INTEGRATION_HANDOFF_v2.md`

Consolidate items 149–159:
- exact files safe for Lead to copy now;
- tests useful for current main;
- Forest presentation staging;
- Product-open Hunter/challenge/season items;
- Secret Debt isolation;
- recommended next useful 12-task wave only if real independent work remains.

Continue items 149–160 sequentially without waiting for Lead review.


## Queue item 161 — ordinary poverty all-six-pack bilingual natural-path matrix v1
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/ordinary-poverty-all-pack-bilingual-paths-v1.test.ts`

Cover every current ordinary-poverty production pack with at least one naturally reachable representative path. Validate RU+EN key presence, locale-neutral pending identity, exact-once effects, reload stability and Secret Debt exclusion.

## Queue item 162 — ordinary poverty shared Night/UI copy inventory v1
Create NEW file only:
- `docs/poverty-prep/ORDINARY_POVERTY_SHARED_NIGHT_UI_COPY_INVENTORY_v1.md`

Inventory remaining player-facing lodging/Night text surrounding poverty events that is outside event payloads. Classify SHIPPED_RU_EN / RU_FALLBACK_ONLY / MISSING / SHARED_UI_OWNER. Do not edit shared UI.

## Queue item 163 — ordinary poverty shared-surface localization delta v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/poverty-shared-surface-localization-v1.fixture.json`

Provide RU+EN presentation-only keys for current poverty-adjacent lodging/Night surfaces that can safely be localized without changing mechanics. Exclude keys already owned by Lead/shared UI if collision risk exists; document omissions explicitly.

## Queue item 164 — Forest logging-road route-scene localization delta v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/forest-logging-road-localization-v1.fixture.json`

Convert the existing logging-road scene bank into locale-neutral RU+EN localization entries only. No route/mechanics changes.

## Queue item 165 — Forest old-boundary route-scene localization delta v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/forest-old-boundary-localization-v1.fixture.json`

Convert only existing shipped old-boundary route identity scene prose into RU+EN localization entries. Do not invent token acquisition/use semantics.

## Queue item 166 — Forest route-scene localization collision guard v1
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/forest-route-localization-collision-v1.test.ts`

Validate items 164–165 are locale-neutral, additive or exact-identical against current localization, reference only existing shipped route identities, and contain no Hunter production identity or gameplay fields.

## Queue item 167 — Forest navigation challenge staging fixture v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/forest-navigation-challenge-staging-v1.fixture.json`

Machine-readable CONTENT_DRAFT only. Map current runtime-capable primitives and authored RU+EN prose candidates for the navigation family. Keep IDs/thresholds/rewards/route binding explicitly PRODUCT_OPEN.

## Queue item 168 — Forest physical challenge staging fixture v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/forest-physical-challenge-staging-v1.fixture.json`

Same boundary for physical obstacle family. Existing capabilities may be referenced as possibilities, never selected as new Product rules.

## Queue item 169 — Forest anomaly challenge staging fixture v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/forest-anomaly-challenge-staging-v1.fixture.json`

Same boundary for interpretation/ritual-anomaly family. School Arcana public-result provider/threshold remains Product-open and must not be invented.

## Queue item 170 — Secret Debt bilingual localization-key inventory v1
Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_BILINGUAL_LOCALIZATION_KEY_INVENTORY_v1.md`

Inventory already-authored Secret Debt player-facing RU+EN surfaces and propose stable presentation localization keys. Authoring-only: no activation probability, debt amount, delay, penalties, outcome thresholds or Meta rewards.

## Queue item 171 — Secret Debt authored-content isolation regression v1
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/secret-debt-authored-content-isolation-v1.test.ts`

Validate current authored/staging Secret Debt material cannot be mistaken for root-loaded production gameplay: no current main pack activation, no Palace 10/10 counting, no ordinary-poverty ID collision, no guessed mechanics/rewards.

## Queue item 172 — Forest poverty selective integration handoff v3
Create NEW file only:
- `docs/lumber-prep/FOREST_POVERTY_SELECTIVE_INTEGRATION_HANDOFF_v3.md`

Consolidate items 161–171 into exact SAFE_TO_COPY / STAGING_ONLY / PRODUCT_OPEN / BLOCKED categories and identify the next useful work only after Lead poverty localization integration or Forest route-presentation binding.

Continue items 161–172 sequentially without waiting for Lead review.


## Queue item 173 — ordinary poverty RU source copyedit v1
Create NEW file only:
- `docs/poverty-prep/ORDINARY_POVERTY_RU_COPYEDIT_V1.md`

Review the full 84-key ordinary-poverty RU payload for grammar, tone, consistency, repetition and player-facing clarity. Propose text-only replacements by exact key. Do not change IDs or mechanics.

## Queue item 174 — ordinary poverty EN localization copyedit v1
Create NEW file only:
- `docs/poverty-prep/ORDINARY_POVERTY_EN_COPYEDIT_V1.md`

Review the full EN payload against RU source for natural English, semantic fidelity and consistent terminology. Propose exact-key text-only corrections. No gameplay changes.

## Queue item 175 — poverty recurring-scene variation bank v1
Create NEW file only:
- `docs/poverty-prep/ORDINARY_POVERTY_RECURRING_VARIATION_BANK_v1.md`

Author RU+EN presentation-only variation banks for already-shipped repeatable ordinary-poverty event families. Variants must not imply new effects/rewards/conditions.

## Queue item 176 — cheap lodging atmosphere bank v1
Create NEW file only:
- `docs/poverty-prep/CHEAP_LODGING_ATMOSPHERE_BANK_V1.md`

Author reusable RU+EN effect-free scene prose for current cheap-lodging context: crowding, quiet, weather carryover, shared room, morning transition. No new Night mechanics.

## Queue item 177 — street lodging atmosphere bank v1
Create NEW file only:
- `docs/poverty-prep/STREET_LODGING_ATMOSPHERE_BANK_V1.md`

Author RU+EN effect-free scene prose for current street-lodging context. Preserve ordinary poverty / Secret Debt separation.

## Queue item 178 — poverty media-alt depth bank v1
Create NEW file only:
- `docs/poverty-prep/ORDINARY_POVERTY_MEDIA_ALT_DEPTH_BANK_V1.md`

Provide concise RU+EN alt/caption alternatives for current poverty presentation identities and future real media. No media files or runtime changes.

## Queue item 179 — Secret Debt lender dialogue bank v2
Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_LENDER_DIALOGUE_BANK_V2.md`

Expand already-authored RU+EN lender dialogue options and refusals while keeping every unresolved probability/principal/debt/delay value symbolic or omitted. Authoring-only.

## Queue item 180 — Secret Debt delayed-activation scene bank v2
Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_DELAYED_ACTIVATION_SCENE_BANK_V2.md`

Author RU+EN delayed-activation scenes without choosing delay length, debt amount, penalties or activation mechanics.

## Queue item 181 — Secret Debt hidden-work scene bank v2
Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_HIDDEN_WORK_SCENE_BANK_V2.md`

Expand RU+EN hidden-work presentation for the already established Secret Debt concept. Do not choose pay, Energy, progression or forced-Night tuning.

## Queue item 182 — Secret Debt forced-Night presentation bank v2
Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_FORCED_NIGHT_PRESENTATION_BANK_V2.md`

Author RU+EN forced-Night presentation variants only. Explicitly leave interception policy, penalties and frequency Product-open.

## Queue item 183 — Secret Debt outcome presentation bank v2
Create NEW file only:
- `docs/poverty-prep/SECRET_DEBT_OUTCOME_PRESENTATION_BANK_V2.md`

Expand RU+EN presentation for the existing outcome families:
- `paid_freedom`
- `bound_life`
- `takeover`

Do not choose thresholds, dependencies, rewards or Palace interaction beyond the locked exclusion from Palace 10/10.

## Queue item 184 — poverty/Secret Debt authoring handoff v4
Create NEW file only:
- `docs/poverty-prep/POVERTY_SECRET_DEBT_AUTHORING_HANDOFF_V4.md`

Consolidate items 173–183 into:
- SAFE_TEXT_POLISH;
- PRESENTATION_ONLY;
- AUTHORING_ONLY_SECRET_DEBT;
- PRODUCT_BLOCKED;
- exact text keys/content banks useful after Lead poverty integration.

Continue items 173–184 sequentially without waiting for Lead review.


## Queue item 185 — merged-main poverty copyedit delta v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/poverty-copyedit-main-delta-v1.fixture.json`

Convert items 173–174 into one exact-key RU+EN text-only delta against current merged-main ordinary-poverty localization. Keep the same 84-key namespace; include only keys whose wording changes. No IDs/mechanics.

## Queue item 186 — poverty copyedit delta regression v1
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/poverty-copyedit-main-delta-v1.test.ts`

Validate item 185 against current main:
- every key already exists;
- RU+EN both present;
- values differ only in text;
- no key rename/addition;
- no gameplay fields;
- six ordinary-poverty pack identities unchanged;
- Secret Debt excluded.

## Queue item 187 — poverty shared Night/lodging localization map v2
Create NEW file only:
- `docs/poverty-prep/POVERTY_SHARED_NIGHT_LODGING_LOCALIZATION_MAP_V2.md`

Re-audit current main after PR45 for poverty-adjacent player-facing lodging/Night UI text outside event payloads. Provide exact current source location, proposed stable localization key, RU source, EN text and Lead-owned UI consumer seam.

## Queue item 188 — poverty shared UI localization fixture v2
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/poverty-shared-ui-localization-v2.fixture.json`

Provide only safe presentation/text keys from item 187. No NightFlow, lodging cost, Energy or housing mechanics.

## Queue item 189 — Forest route current-main presentation inventory v2
Create NEW file only:
- `docs/lumber-prep/FOREST_ROUTE_CURRENT_MAIN_PRESENTATION_INVENTORY_V2.md`

Audit exact current main route identities:
- `forest.route.logging-road`;
- `forest.route.old-boundary`;
- current Activity envelope/result presentation identities;
- current route labels/text/media fallback;
- exact gaps that are presentation/localization-only.

No Hunter semantics or token interpretation.

## Queue item 190 — logging-road merged-main localization delta v2
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/forest-logging-road-localization-v2.fixture.json`

Refresh item 164 against exact current main and produce additive/current-key RU+EN presentation text only for the shipped logging-road identity.

## Queue item 191 — old-boundary merged-main localization delta v2
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/forest-old-boundary-localization-v2.fixture.json`

Refresh item 165 against exact current main. Keep existing route identity only; do not define token acquisition, consumption, Hunter or deeper lore mechanics.

## Queue item 192 — Forest route presentation replacement fixture v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/forest-route-presentation-replacement-v1.fixture.json`

Map current shipped logging-road / old-boundary identities to semantic presentationId, RU+EN localization keys, static fallback and safe authored prose candidates. Presentation-only; no conditions/effects/rewards.

## Queue item 193 — Forest route presentation contract regression v1
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/forest-route-presentation-contract-v1.test.ts`

Validate items 190–192:
- exact current route IDs only;
- no gameplay fields;
- RU+EN completeness;
- semantic presentation IDs locale-neutral;
- no Hunter production ID;
- no Old Boundary token semantics;
- Lumber Hard Work and exact Forest result IDs untouched.

## Queue item 194 — Forest route natural-path identity smoke v1
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/forest-route-natural-path-identity-v1.test.ts`

Use current production Activity flow to prove route selection preserves exact route/activity/result identities and that presentation/localization lookup does not alter RNG, Save, route outcome or exact `activityResult` continuation.

Do not add a new route or challenge.

## Queue item 195 — Forest route Product-open isolation ledger v1
Create NEW file only:
- `docs/lumber-prep/FOREST_ROUTE_PRODUCT_OPEN_ISOLATION_LEDGER_V1.md`

Explicitly separate what can ship now as presentation/localization from still-open:
- Hunter route;
- Old Boundary token acquisition/use;
- challenge thresholds/rewards;
- School Arcana provider;
- seasonal mechanical topology;
- deeper lore outcomes.

## Queue item 196 — Forest/poverty next integration handoff v4
Create NEW file only:
- `docs/lumber-prep/FOREST_POVERTY_NEXT_INTEGRATION_HANDOFF_V4.md`

Consolidate items 185–195 into SAFE_TEXT_PATCH / SHARED_UI_REQUIRED / SAFE_PRESENTATION_SOURCE / STAGING_ONLY / PRODUCT_OPEN and provide exact selective-copy files for Lead.

Continue items 185–196 sequentially without waiting for Lead review.


## Queue item 197 — poverty copyedit production-readiness ledger v2
Create NEW file only:
- `docs/poverty-prep/POVERTY_COPYEDIT_PRODUCTION_READINESS_LEDGER_V2.md`

Review item 185 against exact current main after PR45/46 and classify each of the 36 text-only replacements as SAFE_NOW / NEEDS_CONTEXT_REVIEW / KEEP_CURRENT. No key or mechanics changes.

## Queue item 198 — poverty copyedit final delta v2
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/poverty-copyedit-final-delta-v2.fixture.json`

Produce the final exact-key RU+EN replacement subset from item 197. Existing keys only; no additions, deletions, ID changes or gameplay fields.

## Queue item 199 — poverty copyedit final regression v2
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/poverty-copyedit-final-delta-v2.test.ts`

Validate item 198 against current main localization and all six ordinary-poverty production packs. Secret Debt excluded.

## Queue item 200 — shared Night/lodging RU source copy review v1
Create NEW file only:
- `docs/poverty-prep/SHARED_NIGHT_LODGING_RU_COPY_REVIEW_V1.md`

Review the 20 proposed shared Night/lodging RU strings for natural player-facing wording and consistency with current NightFlow terminology. Text only.

## Queue item 201 — shared Night/lodging EN parity review v1
Create NEW file only:
- `docs/poverty-prep/SHARED_NIGHT_LODGING_EN_PARITY_REVIEW_V1.md`

Review the same 20 EN strings against RU source and current terminology. Text only.

## Queue item 202 — shared Night/lodging finalized localization fixture v3
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/poverty-shared-ui-localization-v3.fixture.json`

Produce the finalized 20-key RU+EN presentation-only fixture from items 200–201. No NightFlow/lodging/housing mechanics.

## Queue item 203 — Forest logging-road scene bank polish v3
Create NEW file only:
- `docs/lumber-prep/FOREST_LOGGING_ROAD_SCENE_BANK_POLISH_V3.md`

Polish current logging-road RU+EN presentation prose for concise UI-ready use. Existing route identity only.

## Queue item 204 — Forest old-boundary scene bank polish v3
Create NEW file only:
- `docs/lumber-prep/FOREST_OLD_BOUNDARY_SCENE_BANK_POLISH_V3.md`

Polish current old-boundary RU+EN presentation prose. Do not define token acquisition/use or Hunter semantics.

## Queue item 205 — Forest route semantic media brief v1
Create NEW file only:
- `docs/lumber-prep/FOREST_ROUTE_SEMANTIC_MEDIA_BRIEF_V1.md`

For logging-road and old-boundary, define presentation-only visual briefs, static fallback expectations and future GIF opportunities using existing semantic IDs only.

## Queue item 206 — Forest route alt/caption localization fixture v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/forest-route-media-localization-v1.fixture.json`

Provide RU+EN alt/caption strings for the two existing route semantic presentation IDs. No route/mechanics changes.

## Queue item 207 — Forest route presentation acceptance checklist v2
Create NEW file only:
- `docs/lumber-prep/FOREST_ROUTE_PRESENTATION_ACCEPTANCE_CHECKLIST_V2.md`

Define exact Lead acceptance after route-state -> presentationId wiring: identity invariance, RNG/Save unchanged, exact activityResult continuation, Hard Work unchanged, locale presentation-only.

## Queue item 208 — Forest/poverty integration handoff v5
Create NEW file only:
- `docs/lumber-prep/FOREST_POVERTY_INTEGRATION_HANDOFF_V5.md`

Consolidate items 197–207 into SAFE_TEXT_PATCH / SHARED_UI_REQUIRED / SAFE_PRESENTATION_SOURCE / PRODUCT_OPEN and exact selective-copy files.

Continue items 197–208 sequentially without waiting for Lead review.


## Queue item 209 — post-PR47 poverty copyedit rebase audit v1
Create NEW file only:
- `docs/poverty-prep/POST_PR47_POVERTY_COPYEDIT_REBASE_AUDIT_V1.md`

Recheck the 33 SAFE_NOW poverty text replacements from item 198 against exact current main after PR47.
Classify CLEAN_APPLY / CONFLICT / SUPERSEDED.

## Queue item 210 — post-PR47 poverty final text delta v3
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/poverty-copyedit-post-pr47-v3.fixture.json`

Produce only CLEAN_APPLY exact-key RU+EN text replacements from item 209.
Existing keys only; no alt/media keys unless the same text key is explicitly reviewed.

## Queue item 211 — poverty copyedit natural-path expectation fixture v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/poverty-copyedit-natural-path-expectations-v1.fixture.json`

For each changed event key in item 210, map the exact current event/variant/choice path that exposes it naturally.
No new gameplay.

## Queue item 212 — shared Night/lodging post-PR47 key collision audit v1
Create NEW file only:
- `docs/poverty-prep/SHARED_NIGHT_LODGING_POST_PR47_KEY_COLLISION_AUDIT_V1.md`

Re-audit the finalized 20 shared UI keys against exact root localization after PR47/46/45.
Classify ADDITIVE / IDENTICAL / CONFLICT / REUSE_EXISTING.

## Queue item 213 — shared Night/lodging UI consumer map v3
Create NEW file only:
- `docs/poverty-prep/SHARED_NIGHT_LODGING_UI_CONSUMER_MAP_V3.md`

Map each finalized key to exact current `src/ui/app.ts` hardcoded consumer seam and fallback text.
No UI edits.

## Queue item 214 — Forest route post-PR47 presentation baseline v1
Create NEW file only:
- `docs/lumber-prep/FOREST_ROUTE_POST_PR47_PRESENTATION_BASELINE_V1.md`

Audit exact current main after PR47:
- shared `activity/forest/route/default`;
- result/reaction static coverage;
- route gameplay IDs;
- route-specific presentation gap.
No Product decisions.

## Queue item 215 — Forest route localized text final fixture v3
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/forest-route-localization-final-v3.fixture.json`

Consolidate logging-road/old-boundary polished RU+EN route text plus alt/caption keys using only current route gameplay identities and proposed locale-neutral semantic IDs.

## Queue item 216 — Forest route scene variation bank v4
Create NEW file only:
- `docs/lumber-prep/FOREST_ROUTE_SCENE_VARIATION_BANK_V4.md`

Provide additional effect-free RU+EN presentation variants for logging-road and old-boundary:
- 4–6 variants each;
- no route outcome changes;
- no token/Hunter/challenge/season mechanics.

## Queue item 217 — Forest route choice-label polish v1
Create NEW file only:
- `docs/lumber-prep/FOREST_ROUTE_CHOICE_LABEL_POLISH_V1.md`

Review current player-facing route option labels/help copy and propose concise RU+EN presentation wording by exact current route ID.
No availability/condition changes.

## Queue item 218 — Forest route presentation natural-path expectation fixture v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/forest-route-presentation-natural-path-v1.fixture.json`

Describe exact expected route ID, proposed presentationId, localized route text/media alt, and exact unchanged result continuation for logging-road/old-boundary natural paths.

## Queue item 219 — poverty/Forest localization ownership collision audit v1
Create NEW file only:
- `docs/lumber-prep/POVERTY_FOREST_LOCALIZATION_OWNERSHIP_COLLISION_AUDIT_V1.md`

Check Chat3 proposed keys against shipped School/Foreman/static-media/localization namespaces after PR47.
No duplicate ownership with Chat2/Chat5.

## Queue item 220 — post-PR47 Forest/poverty handoff v6
Create NEW file only:
- `docs/lumber-prep/POST_PR47_FOREST_POVERTY_HANDOFF_V6.md`

Consolidate items 209–219 into SAFE_TEXT_PATCH / SHARED_UI_REQUIRED / ROUTE_PRESENTATION_SOURCE / PRODUCT_OPEN with exact selective-copy files for Lead.

Continue items 209–220 sequentially without waiting for Lead review.


## Queue item 221 — post-PR48 poverty text rebase audit v2
Create NEW file only:
- `docs/poverty-prep/POST_PR48_POVERTY_TEXT_REBASE_AUDIT_V2.md`

Recheck the current 33-key poverty text patch against exact main after PR48.
Classify CLEAN_APPLY / SUPERSEDED / CONFLICT.
Text keys only; static-media keys excluded.

## Queue item 222 — post-PR48 poverty text delta v4
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/poverty-copyedit-post-pr48-v4.fixture.json`

Produce only CLEAN_APPLY exact-key RU+EN replacements from item 221.
No additions, renames, media keys, Secret Debt or gameplay fields.

## Queue item 223 — poverty text natural-path smoke matrix v2
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/poverty-copyedit-natural-path-v2.fixture.json`

Map each item-222 changed key to the exact current production event/variant/choice path and expected RU/EN text.
No runtime helper changes.

## Queue item 224 — Forest route altKey normalization fixture v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/forest-route-media-localization-normalized-v1.fixture.json`

Normalize the final route media alt/caption keys to the shipped PR47 schema:
- lowercase;
- dots/underscores/hyphens only;
- no slash characters.

Preserve the same RU+EN meaning and route semantic IDs.

## Queue item 225 — Forest route normalized localization collision guard v1
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/forest-route-media-localization-normalized-v1.test.ts`

Validate item 224:
- schema-compatible keys;
- no collision with current root localization;
- complete RU+EN;
- no gameplay fields;
- no Product-open Hunter/token semantics.

## Queue item 226 — Forest route presentation text final fixture v4
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/forest-route-presentation-final-v4.fixture.json`

Consolidate current logging-road / old-boundary RU+EN route presentation text, choice/help wording, normalized alt/caption keys and exact proposed semantic presentation IDs.
Presentation-only.

## Queue item 227 — Forest route static-source compatibility audit v1
Create NEW file only:
- `docs/lumber-prep/FOREST_ROUTE_STATIC_SOURCE_COMPATIBILITY_AUDIT_V1.md`

Review Chat2 route-specific SVG candidates against exact current route semantics.
Classify:
- VISUALLY_SAFE_IF_SEAM_SHIPS;
- TOO_SPECIFIC;
- PRODUCT_SEMANTICS_LEAK;
- NEEDS_GENERIC_FALLBACK.

Do not activate assets.

## Queue item 228 — Forest route locale invariance expected-state fixture v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/forest-route-locale-invariance-v1.fixture.json`

For both current routes record:
- route ID;
- expected presentationId;
- expected RU text/alt;
- expected EN text/alt;
- exact unchanged Save/RNG/result identity fields.

## Queue item 229 — Forest route result-continuation invariant matrix v2
Create NEW file only:
- `docs/lumber-prep/FOREST_ROUTE_RESULT_CONTINUATION_INVARIANT_MATRIX_V2.md`

Document exact route -> Activity -> result continuation invariants for success / escape / failure and exact `activityResult` identities.
No new challenge/reward semantics.

## Queue item 230 — shared Night/lodging post-PR48 consumer readiness v4
Create NEW file only:
- `docs/poverty-prep/SHARED_NIGHT_LODGING_POST_PR48_CONSUMER_READINESS_V4.md`

Refresh exact current UI consumer seams after PR48 and confirm the 20 finalized keys remain additive/collision-free.
No UI edits.

## Queue item 231 — Forest/poverty selective integration acceptance packet v1
Create NEW file only:
- `docs/lumber-prep/FOREST_POVERTY_SELECTIVE_INTEGRATION_ACCEPTANCE_V1.md`

Prepare exact Lead acceptance for:
- 33-key poverty text patch;
- 20-key shared Night/lodging UI text;
- route presentationId seam;
- normalized route altKey localization.

Separate what may ship independently from what requires the route seam.

## Queue item 232 — post-PR48 Forest/poverty handoff v7
Create NEW file only:
- `docs/lumber-prep/POST_PR48_FOREST_POVERTY_HANDOFF_V7.md`

Consolidate items 221–231 into:
- SAFE_TEXT_PATCH;
- SHARED_UI_REQUIRED;
- ROUTE_PRESENTATION_READY;
- ROUTE_ASSET_SOURCE_ONLY;
- PRODUCT_OPEN.

Include exact selective-copy files and exact remaining blockers.

Continue items 221–232 sequentially without waiting for Lead review.


## Queue item 233 — post-PR49 poverty text rebase audit v3
Create NEW file only:
- `docs/poverty-prep/POST_PR49_POVERTY_TEXT_REBASE_AUDIT_V3.md`

Recheck the 33-key poverty text patch against exact current main after PR49.
Classify CLEAN_APPLY / SUPERSEDED / CONFLICT.

## Queue item 234 — post-PR49 poverty text delta v5
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/poverty-copyedit-post-pr49-v5.fixture.json`

Produce only CLEAN_APPLY exact-key RU+EN text replacements.
No new keys/media/gameplay fields.

## Queue item 235 — post-PR49 poverty natural-path expectation v3
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/poverty-copyedit-natural-path-v3.fixture.json`

Map each changed key to exact current production path and expected RU/EN text.

## Queue item 236 — shared Night/lodging post-PR49 key audit v5
Create NEW file only:
- `docs/poverty-prep/SHARED_NIGHT_LODGING_POST_PR49_KEY_AUDIT_V5.md`

Recheck the finalized 20 shared UI keys against exact current root localization after PR49.
Classify ADDITIVE / IDENTICAL / CONFLICT / REUSE_EXISTING.

## Queue item 237 — shared Night/lodging final fixture v4
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/poverty-shared-ui-localization-v4.fixture.json`

Contain only the final safe 20-key RU+EN presentation patch after item 236.

## Queue item 238 — shared Night/lodging exact consumer fixture v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/shared-night-lodging-consumer-map-v1.fixture.json`

Map each item-237 key to exact current UI fallback string / consumer seam.
No UI edits.

## Queue item 239 — Forest route post-PR49 baseline v2
Create NEW file only:
- `docs/lumber-prep/FOREST_ROUTE_POST_PR49_BASELINE_V2.md`

Audit exact main after PR49:
- current route gameplay IDs;
- shared `activity/forest/route/default`;
- current route-default static state;
- route-specific presentation seam gap;
- result/reaction identities.

## Queue item 240 — Forest route final presentation fixture v5
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/forest-route-presentation-final-v5.fixture.json`

Rebase current route text/choice/help/normalized alt/caption expectations onto exact post-PR49 main.
Presentation-only.

## Queue item 241 — Forest route current-main collision regression v2
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/forest-route-current-main-collision-v2.test.ts`

Validate item 240 against exact current main:
- existing route IDs only;
- no localization collisions;
- altKey schema valid;
- no gameplay fields;
- no Hunter/token/challenge semantics.

## Queue item 242 — Forest route seam executable acceptance fixture v2
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/forest-route-seam-acceptance-v2.fixture.json`

For logging-road and old-boundary record exact expected:
- route state;
- derived presentationId;
- unchanged Save/RNG;
- unchanged result identity;
- exact activityResult continuation;
- Hard Work invariant.

## Queue item 243 — poverty/Forest shared ownership delta audit v2
Create NEW file only:
- `docs/lumber-prep/POVERTY_FOREST_SHARED_OWNERSHIP_DELTA_AUDIT_V2.md`

Compare Chat3 proposed keys/IDs against exact shipped School/Foreman/static/legacy-root namespaces after PR49.
Flag only real collisions.

## Queue item 244 — post-PR49 Forest/poverty handoff v8
Create NEW file only:
- `docs/lumber-prep/POST_PR49_FOREST_POVERTY_HANDOFF_V8.md`

Consolidate items 233–243 into SAFE_TEXT_PATCH / SHARED_UI_REQUIRED / ROUTE_PRESENTATION_READY / PRODUCT_OPEN with exact selective-copy files.

Continue items 233–244 sequentially without waiting for Lead review.


## Queue item 245 — post-PR50 Forest/poverty baseline v9
Create NEW file only:
- `docs/lumber-prep/POST_PR50_FOREST_POVERTY_BASELINE_V9.md`

Re-audit exact current main after PR50:
- ordinary-poverty localization state;
- shared Night/lodging hardcoded UI debt;
- `activity/forest/route/default` static now shipped;
- route-specific presentation seam still absent;
- Product-open boundaries unchanged.

## Queue item 246 — shared Night/lodging RU EN copy final review v6
Create NEW file only:
- `docs/poverty-prep/SHARED_NIGHT_LODGING_COPY_FINAL_REVIEW_V6.md`

Re-review the finalized 20-key shared UI patch for concise player-facing RU-source and full EN.
No NightFlow/lodging/housing mechanic changes.

## Queue item 247 — shared Night/lodging root patch candidate v5
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/poverty-shared-ui-localization-v5.fixture.json`

Produce the exact final 20 additive RU+EN keys against current post-PR50 main.
No reused existing keys duplicated in the payload.

## Queue item 248 — shared Night/lodging exact consumer map v2
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/shared-night-lodging-consumer-map-v2.fixture.json`

Refresh exact `src/ui/app.ts` consumer seams/fallback text against post-PR50 main.

## Queue item 249 — shared Night/lodging UI invariance expectation v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/shared-night-lodging-ui-invariance-v1.fixture.json`

For representative Night/Lodging paths record:
- stable phase/lodging/nightChoice IDs;
- expected RU text;
- expected EN text;
- exact unchanged costs/Energy/housing/Save fields.

## Queue item 250 — logging-road route presentation copy final review v6
Create NEW file only:
- `docs/lumber-prep/LOGGING_ROAD_ROUTE_PRESENTATION_COPY_FINAL_REVIEW_V6.md`

Finalize concise RU+EN route-specific presentation copy for the exact current logging-road route only.
No route availability/progress/result changes.

## Queue item 251 — old-boundary route presentation copy final review v6
Create NEW file only:
- `docs/lumber-prep/OLD_BOUNDARY_ROUTE_PRESENTATION_COPY_FINAL_REVIEW_V6.md`

Finalize concise RU+EN presentation copy using only currently established stones/marks semantics.
Do not imply token origin/use, Hunter knowledge, constructed gate, hidden reward or deeper lore.

## Queue item 252 — old-boundary visual brief correction v2
Create NEW file only:
- `docs/lumber-prep/OLD_BOUNDARY_VISUAL_BRIEF_CORRECTION_V2.md`

Describe a safe replacement visual brief for future project-owned static/GIF source:
- neutral old stones/marks/path boundary;
- no constructed arch/gate;
- no token;
- no Hunter;
- no reward/challenge implication.

## Queue item 253 — route-specific localization final candidate v6
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/forest-route-presentation-final-v6.fixture.json`

Consolidate items 250–252 into exact additive RU+EN text/help/alt/caption keys for:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

No gameplay fields.

## Queue item 254 — route presentationId seam contract v3
Create NEW file only:
- `docs/lumber-prep/FOREST_ROUTE_PRESENTATION_ID_SEAM_CONTRACT_V3.md`

Specify the minimal Lead-owned seam:
- derive presentationId from authoritative route state only;
- shared default before route selection;
- route-specific ID after route selection;
- no Save write;
- no RNG use;
- no route/result mutation.

No code changes.

## Queue item 255 — route-specific natural-path acceptance matrix v3
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/forest-route-natural-path-acceptance-v3.fixture.json`

For logging-road and old-boundary record:
- natural path;
- exact route state;
- expected default->specific presentation transition;
- RU/EN presentation;
- exact unchanged result continuation and Hard Work invariants.

## Queue item 256 — post-PR50 Forest/poverty handoff v9
Create NEW file only:
- `docs/lumber-prep/POST_PR50_FOREST_POVERTY_HANDOFF_V9.md`

Consolidate items 245–255 into:
- SHARED_NIGHT_UI_READY;
- ROUTE_PRESENTATION_COPY_READY;
- ROUTE_SEAM_REQUIRED;
- VISUAL_SOURCE_REVISION_REQUIRED;
- PRODUCT_OPEN.

Include exact selective-copy files.

Continue items 245–256 sequentially without waiting for Lead review.
