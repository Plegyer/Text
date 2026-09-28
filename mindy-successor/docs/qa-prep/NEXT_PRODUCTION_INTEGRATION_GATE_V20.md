# Next production integration gate v20

Status: COMPLETE / CURRENT_GATE_RECORDED

Audit point:
after PR59 logging-road route-specific presentation merge, with PR60 old-boundary static activation in active exact-head CI.

Current main:
`54131488c65302f81b3001abaaa345d21f0281e2`.

Current main CI:
- run #115;
- id `36407870012`;
- event: push;
- conclusion: SUCCESS;
- validator: 17 packs, 46 events, 35 actions, 9 endings;
- tests: 360 / 360 pass / 0 fail.

This gate summarizes Chat 4 items 247–257.

No whole worker/chat branch is approved for merge.

## 1. PR59 post-merge state

Classification:
`GREEN_POST_MERGE_MAIN`.

PR59:
`Lead: activate safe Forest logging-road presentation`.

Accepted exact head:
`01109fd08cece24308d3d9a64127b08e6fc5d702`.

Merge SHA:
`54131488c65302f81b3001abaaa345d21f0281e2`.

Exact run #114:
- SUCCESS;
- 360/360;
- validator 17/46/35/9.

Post-merge run #115:
- SUCCESS;
- 360/360;
- validator 17/46/35/9.

Shipped:
- logging-road route-specific static;
- route help RU+EN;
- logging-road alt/caption RU+EN;
- old-boundary alt/caption RU+EN;
- route-specific locale/Save/RNG invariance tests.

Old-boundary remains physically on the neutral route/default fallback on current main.

## 2. Route localized-label consumer

Classification:
`ACCEPTANCE_CONTRACT_READY`.

Current visible Activity status still renders:
`ui.activity.routeLabel + raw routeId`.

Raw persisted values:
- `logging-road`;
- `old-boundary`.

Approved bilingual labels already exist through exact current route-option IDs.

Required display flow:
`persisted routeId -> current option.setRoute match -> activityOption.<optionId>.label`.

Persisted routeId must remain unchanged.

Locale-only switch:
- same routeId;
- same Activity state;
- same presentationId/media;
- same Save/RNG;
- localized route label only.

This is a small high-value player-facing UI fix.

## 3. Old Boundary v3 source acceptance

Classification:
`GREEN_SELECTIVE_SOURCE`.

Reviewed Chat2 items 317–319:
- activation candidate;
- exact RU+EN accessibility fixture;
- activation regression source.

Safe physical source:
`forest-route-old-boundary-v3.svg`.

Blob:
`97c38b2f08073b2e833289d2ca31fc29841ec4a3`.

Approved semantics:
- narrow old path;
- low/weathered stones;
- old marks/moss.

Excluded:
- gate/arch/barrier;
- token/key;
- Hunter;
- challenge/reward;
- result/success/failure;
- magic activation.

Current PR59 root already ships the exact same old-boundary alt/caption values.

Future activation should reuse those keys and keep route/default fallback.

## 4. Live PR60 old-boundary activation

PR #60:
`Lead: activate safe old-boundary Forest static`.

Base:
current PR59 main.

Initial head:
`e1f9ca92ae35720a5dcce2f0e1c9099ad7aec916`.

Initial run #116:
- FAILURE;
- validator still 17/46/35/9;
- 363 tests;
- 359 pass;
- 4 fail.

The three newly added old-boundary tests themselves PASS.

The failures were stale existing production assertions still expecting:
- old-boundary to resolve through neutral default;
- no old-boundary root slot.

That is a test-baseline update issue caused by the intended activation transition, not evidence of gameplay drift.

Lead advanced PR60 to:
`36f933d8c01a249992d84295bc69c3d554bb1f89`.

Run #119 is in progress at the time this gate is written.

Current main remains PR59 and must remain the authoritative floor until:
- PR60 exact-head CI is fully green;
- PR60 merges;
- post-merge main push succeeds.

## 5. Old-boundary fallback transition acceptance

Classification:
`EXECUTABLE_ACCEPTANCE_CONTRACT`.

Before activation:
- requested semantic ID = old-boundary;
- persisted routeId = old-boundary;
- physical selected slot = route/default.

After activation:
- requested semantic ID stays old-boundary;
- persisted routeId stays old-boundary;
- physical selected slot becomes old-boundary v3;
- route/default remains fallback.

Must preserve:
- Save;
- global RNG;
- Activity RNG;
- checkpoint/progress/endurance;
- route option identity;
- results;
- activityResult reactions;
- Hard Work.

Only selected physical presentation changes.

## 6. Ending localization source

Classification:
`GREEN_TEXT_SOURCE`.

Exact current endings:
`9`.

Source:
- 9 titles;
- 9 descriptions;
- 18 bilingual strings;
- missing RU 0;
- missing EN 0;
- current-root collisions 0.

Exact current IDs only.

No:
- condition;
- reward;
- metaReward;
- epilogue;
- gameplay/Save/RNG field
is included.

Locked Hard Work remains:
`completed_shifts >= 50`
with meta reward:
`hardWork:lumber`.

Current Legacy cards still render raw catalog title/description.

Lead shared consumer wiring is required.

## 7. Ordinary action result localization source

Classification:
`GREEN_TEXT_SOURCE / SHARED_CONSUMER_REQUIRED`.

Reviewed exact current ordinary slice:
`16` action IDs.

Exact scene:
`default`
for all 16.

Source:
- 16 result title keys;
- 16 result body keys;
- total 32 bilingual strings;
- missing RU 0;
- missing EN 0;
- current-root collisions 0.

No mechanics/RNG/Save fields.

Current generic result screen still renders raw:
- `lastAction.title`;
- `lastAction.text`
for ordinary actions.

Today the one-scene mapping is unambiguous.

Future multi-scene actions require exact locale-neutral selected scene identity instead of prose inference.

## 8. Ending/action shared consumer

Classification:
`ACCEPTANCE_CONTRACT_READY`.

### Ending cards

Render:
- localized title by stable ending ID;
- localized description by stable ending ID.

Preserve:
- condition objects;
- availableEndings;
- eligibility;
- reward/meta reward;
- acceptedEnding;
- Save/RNG.

### Ordinary action results

Consumer precedence:
1. School special path;
2. event-choice outcomeRef path;
3. reviewed ordinary action ID + current scene ID;
4. raw fallback.

Preserve:
- action ID;
- effects/deltas;
- economics;
- pending event;
- presentation ID;
- RNG;
- Save.

Ordinary action Journal localization is not solved by result-screen wiring because current action completion rows still have null journal refs.

## 9. Post-PR59 normal-player bilingual debt

Current product remains:
`PARTIAL_BILINGUAL`.

Important current normal-player debt:

### Route
- selected route status shows raw routeId.

### Endings
- Legacy cards render raw catalog title/description;
- current catalog mixes RU and EN source;
- ending requirement values still expose stable machine IDs where semantic-name layer is absent;
- ending epilogue/end-state latest Journal prose remains raw.

### Ordinary actions
- 16 ordinary action cards lack root label/description keys;
- result screen remains raw fallback;
- action completion Journal rows have no stable action ref;
- brew extra Journal rows are raw.

### Profession/result presentation
- Stats profession summary reads raw catalog labels;
- generic profession result screen can display English source in RU;
- seasonal scene-text consumer remains separate debt.

### Generic direct-label reuse
- Work effect tags still use raw RU label dictionary;
- Legacy inheritance labels use raw dictionary;
- runtime gameplay errors can surface raw source-language error messages.

### Event/media coverage
- 6 current events still have zero root event-localization coverage;
- generic root media-alt coverage remains incomplete.

Excluded:
debug/internal and Product-open content.

## 10. Animation exporter preapproval

Classification:
`READY_FOR_LEAD_APPROVAL / INSTALL_AND_CI_PROOF_REQUIRED`.

Exact proposed dev-only dependencies:
- `sharp@0.35.4`;
- `gifenc@1.0.3`.

Latest Chat2 packets now cover:
- license/notice obligations;
- native sharp risk;
- Node 22.18 / Ubuntu CI expectations;
- deterministic export assumptions;
- rollback.

Worker package/lock remain identical to current main.

No dependency has been silently installed.

Lead may approve a dedicated tooling integration attempt.

Before acceptance:
- exact package/lock diff;
- npm ci on exact CI runner;
- sharp/gifenc import;
- local project-owned SVG export smoke;
- GIF validator;
- repeated same-environment byte determinism;
- full exact-head CI.

No production GIF claim.

Current real production GIFs:
0.

Current production GIF pools:
0.

## 11. Current project-owned static coverage

Current root:
- project-owned semantic static mappings: 81;
- unique active physical project-owned sources: 80.

Established pre-route-specific target:
`80/80`.

PR59 adds:
- 1 logging-road route-specific semantic mapping;
- 1 new unique active physical source.

Forest route static breakdown:
- route/default neutral: shipped;
- logging-road specific: shipped;
- old-boundary specific: not shipped on current main.

Current physical `assets/presentation/` files:
90.

Active physical files:
80.

Retained inactive source-history files:
10.

If PR60 later merges successfully, do not reuse these current counts; recompute them from merged main.

## 12. Current main CI floor

Authoritative main:
`54131488c65302f81b3001abaaa345d21f0281e2`.

Run #115:
- SUCCESS;
- 360/360;
- validator 17/46/35/9.

Root localization:
664 bilingual keys.

Active project-owned root statics:
81.

Until PR60 is fully green and merged, this remains the production floor.

## 13. Recommended next integration order

### A. Finish PR60 correctly

Priority:
fix stale pre-activation assertions, preserve the new old-boundary safety tests, require exact-head green, then post-merge main green.

Do not weaken gameplay/route invariants to make the test pass.

### B. Localized selected-route label

Small render-only UI PR:
- reuse existing route-option labels;
- keep routeId unchanged.

### C. Ending + ordinary action result localization

Fresh-main selective source integration:
- 18 ending strings;
- 32 ordinary result strings;
- shared consumers under the acceptance contract.

Keep ordinary action Journal raw fallback until a separately reviewed stable-ref design exists.

### D. Animation exporter

Separate dev-tooling PR only.

No route GIF activation in the tooling-approval PR.

## 14. Product-open isolation

Still isolated:
- Hunter Forest route/clue/token semantics;
- Old Boundary acquisition/consume/retain/turn-in lifecycle;
- route challenge/reward topology;
- School unresolved providers;
- Secret Debt;
- authored Palace content;
- deeper relationship/endings not in current definitions.

Old-boundary v3 static depicts only already-approved stones/marks/path semantics and does not authorize those mechanics.

## Final gate verdict

- current main CI: `GREEN`;
- PR59 logging-road route media: `SHIPPED_GREEN`;
- selected route-label consumer: `READY`;
- Old Boundary v3 source: `GREEN_SELECTIVE_SOURCE`;
- PR60 current status: `EXACT_HEAD_CI_IN_PROGRESS_AFTER_STALE-TEST_FIX`;
- ending localization source: `GREEN`;
- ordinary action result source: `GREEN`;
- ending/action shared consumer contract: `READY`;
- normal-player bilingual status: `PARTIAL_BILINGUAL`;
- animation exporter dependency proposal: `READY_FOR_LEAD_APPROVAL / CI_PROOF_REQUIRED`;
- production GIFs/pools: `NONE`;
- static coverage on current main: `81 semantic / 80 unique physical`;
- Product-open content: `ISOLATED`.

No whole worker/chat branch is approved for merge.
