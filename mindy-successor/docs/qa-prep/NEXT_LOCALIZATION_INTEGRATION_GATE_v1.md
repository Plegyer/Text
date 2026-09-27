# Next Localization Integration Gate v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Baseline: current main 974d6e077ffc511e304a64aef32f2aab81167f41
Localization runtime: PR41 merged / 291/291 PASS exact head and post merge

## Purpose

Identify the safest next localization integrations for:
- presentation;
- School;
- ordinary poverty;
- Forest.

This gate separates:
- authoring/data ready to selectively integrate;
- runtime-ready but content-incomplete surfaces;
- items that still depend on multi-GIF or Product decisions.

## Integration rule

All worker branches are long-lived.

Do not merge worker branches wholesale.

Use:
1. fresh Lead branch from current main;
2. exact reviewed file copy/re-author;
3. adapt to shipped localization.json/runtime contract;
4. validate deterministic keys;
5. run targeted tests;
6. run full exact-head CI;
7. verify post-merge main.

## 1. Presentation — safest immediate authoring integration

Chat2 already has machine-readable localization/presentation artifacts including:
- bilingual-presentation-migration-batch-v1.json
- ten-career-localization-v1.json
- localization-fallback-v1.fixture.json
- bilingual-multi-gif-authoring-v1.json

Contract tests already present:
- presentation-bilingual-completeness-contract.test.ts
- presentation-localization-multigif-contract.test.ts
- presentation-locale-switch-contract-v2.test.ts

## Safe now

Selective integration candidate:
- localization key conventions;
- RU+EN presentation strings/alt data that map to existing PR41 localization keys or can be added without schema change;
- fallback fixture/tests as QA evidence;
- ten-career additional localized presentation text.

Classification:
SAFE_TO_INTEGRATE_AFTER_SCHEMA_ADAPTATION.

## Not yet safe as runtime behavior

Multi-GIF pool authoring manifests are not evidence that explicit 3–5 pool runtime exists.

Do not integrate them as live selection behavior until the shared multi-GIF runtime passes its separate gate.

Classification:
STAGED_FOR_FUTURE_MULTI_GIF.

## 2. School

Chat5 now contains machine-readable localization artifacts:
- school-bilingual-migration-v1.fixture.json
- school-ui-ru-en-v1.fixture.json
- school-generic-localization-v2.fixture.json
- school-night-localization-v2.fixture.json
- school-teacher-course-localization-v2.fixture.json

Tests:
- school-bilingual-content-contract.test.ts
- school-localization-migration-v1.test.ts

Docs/handoffs:
- SCHOOL_LOCALIZATION_KEY_INVENTORY_v1.md
- SCHOOL_LOCALIZATION_PRODUCTION_READINESS_v1.md
- SCHOOL_LOCALIZATION_UI_ACCEPTANCE_v1.md
- SCHOOL_BILINGUAL_PRODUCTION_HANDOFF_v13.md

## Safe now

Highest-confidence School localization candidates:
- eight-course UI labels/descriptions/templates;
- already reachable generic post-lesson RU+EN text;
- exact Night-study RU+EN text for existing exact Night choice IDs;
- teacher/course staged localization bundle as STAGED data only.

These can use the shipped PR41 localization seam without changing School mechanics.

Classification:
SAFE_TO_INTEGRATE for UI/generic/Night localization.

## Still staged

Exact-course teacher/lesson content remains routing-limited.

Localization does not solve missing exact paid-course public routing.

Keep:
school-teacher-course-localization-v2.fixture.json

classified:
STAGED_RU_EN / ROUTING_BLOCKED.

Do not create locale-specific School events.

## Product-blocked School semantics

Localization must not decide:
- management/accounting public result;
- Arcana/Forest public result.

Those remain independent Product decisions.

## 3. Ordinary poverty

Current main:
- ordinary poverty mechanics/content already shipped;
- localization coverage remains largely unmigrated.

Chat2 provides:
- POVERTY_BILINGUAL_PRESENTATION_INVENTORY_v1.md;
- representative entries in bilingual-presentation-migration-batch-v1.json;
- multi-GIF poverty authoring data.

## Safe now

Next safe poverty localization integration:
- deterministic keys for current PR37 event titles/variants/choices;
- RU source + EN translation;
- localized alt text for existing shared media;
- no change to event IDs/conditions/effects/cooldowns;
- no Secret Debt content.

Classification:
SAFE_TO_AUTHOR_AND_INTEGRATE through PR41 localization seam.

## Current limitation

The observed Chat2 branch does not yet expose one clearly dedicated full ordinary-poverty production localization bundle covering every PR37 player-facing key.

Therefore:
- representative migration data is ready;
- full production poverty localization coverage still requires consolidation/coverage audit.

Classification:
PARTIAL_READY.

## Multi-GIF poverty content

3–5 GIF pool mappings may be kept as presentation authoring only.

Do not require the not-yet-shipped pool runtime to localize current text.

Localization should land independently where possible.

## 4. Forest

Chat3 currently has:
- forest-result-content-v1.json
- forest-result-content-bilingual-v1.json
- forest-bilingual-content-contract.test.ts
- Forest RU+EN route/challenge authoring docs
- bilingual source inventory
- multi-GIF identity map

## Safe now

The exact Forest result identities are already authoritative:
- lumber.forest.success
- lumber.forest.escape
- lumber.forest.failure

A bilingual result reaction pack can be selectively adapted to current main, preserving:
- exact activityResult triggers;
- one locale-neutral event identity;
- effect-free content reaction;
- RU+EN text through the PR41 localization seam;
- current stage-forest fallback;
- no Hard Work changes.

Classification:
SAFE_TO_INTEGRATE_AFTER_CURRENT_MAIN_ADAPTATION_AND_CI.

## Required adaptation

Older worker Forest tests used stale entry assumptions.

Fresh-main integration must:
- use naturally open Forest entry;
- use logging-road for representative success;
- keep old-boundary capability at option level;
- remove obsolete injected entry fact from natural-path proof.

## Product-blocked Forest identities

Do not force localization integration to resolve:
- Old Boundary Token natural source/policy;
- hunter-trail unlock source.

Those routes stay PRODUCT_BLOCKED where applicable.

Safe success/escape/failure result localization does not depend on those decisions.

## 5. Secret Debt

Not a safe production localization integration yet.

Chat3 contains:
- Secret Debt RU+EN authored fixture/content.

But mechanics remain Product-blocked and no production pack/state is shipped.

Allowed:
- keep bilingual authored content staged;
- validate localization keys/content equivalence.

Not allowed:
- root production inclusion as if mechanics exist.

Classification:
STAGED_RU_EN / PRODUCT_BLOCKED.

## 6. Multi-GIF interaction

PR41 localization runtime is already usable independently from future multi-GIF runtime.

Recommended sequencing:
1. migrate deterministic text/alt keys first;
2. keep media-pool authoring staged;
3. later land multi-GIF runtime;
4. verify locale switch keeps candidate stable.

Do not block ordinary localization on GIF-pool runtime.

## 7. Suggested selective integration order by technical dependency

### First wave

Presentation:
- ten-career localization additions;
- UI shell expansion;
- localization fallback/completeness tests.

School:
- eight-course UI text;
- generic reachable event localization;
- exact Night-study localization.

Why:
these map directly to existing shipped identities and PR41 runtime.

### Second wave

Ordinary poverty:
- full current PR37 event/choice/alt localization bundle.

Forest:
- bilingual exact result reaction pack adapted to fresh main.

Why:
existing production identities are stable, but content bundle validation is broader.

### Staged until separate seam/decision

- exact-course School teacher/lesson routing;
- multi-GIF runtime behavior;
- Secret Debt production;
- Product-blocked Forest route identities.

## 8. Required CI for each integration

Every selective localization PR:
- localization schema parse;
- deterministic key uniqueness;
- no duplicated gameplay IDs/events;
- RU/EN completeness report;
- fallback-only keys explicitly reported;
- locale-switch Save invariance for touched surface;
- existing subsystem mechanics tests;
- full npm run check;
- exact-head GitHub Actions;
- post-merge main CI.

## 9. Current status matrix

| Stream | Status |
|---|---|
| PR41 localization core | SHIPPED / GREEN |
| first UI/Work slice | SHIPPED_RU_EN |
| Chat2 presentation localization fixtures/tests | SAFE_TO_INTEGRATE selectively |
| School UI/generic/Night localization | SAFE_TO_INTEGRATE selectively |
| School exact-course teacher content | STAGED_RU_EN / ROUTING_BLOCKED |
| ordinary poverty localization | PARTIAL_READY / consolidation needed |
| Forest exact result localization | SAFE_AFTER_CURRENT_MAIN_ADAPTATION + CI |
| Forest token/hunter route localization | PRODUCT_BLOCKED where identity unresolved |
| Secret Debt RU+EN content | STAGED_RU_EN / PRODUCT_BLOCKED mechanics |
| multi-GIF localized alt/caption authoring | STAGED until pool runtime |

## Final gate

The shipped PR41 runtime is sufficient to begin incremental localization integration now.

Do not wait for:
- full multi-GIF runtime;
- Secret Debt mechanics;
- all Product decisions

before integrating safe locale text for already-authoritative identities.

But do not convert staged or Product-blocked identities into fake production merely because translations exist.

No production runtime/UI/content file was modified by Chat 4.
