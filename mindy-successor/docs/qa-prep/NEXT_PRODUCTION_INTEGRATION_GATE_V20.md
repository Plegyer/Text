# Next production integration gate v20

Status: COMPLETE / CURRENT_GATE_RECORDED

Audit point:
after PR59 logging-road route media and PR60 safe Old Boundary v3 static activation.

Current main:
`2ad9fb8b0572f8903bbf57d144c8c5938023a440`.

Current main CI:
- run #120;
- id `36410358345`;
- event: push;
- conclusion: SUCCESS;
- validator: 17 packs, 46 events, 35 actions, 9 endings;
- tests: 363 / 363 pass / 0 fail.

This gate summarizes Chat 4 items 247–257.

No whole worker/chat branch is approved for merge.

## PR59

`GREEN_POST_MERGE_MAIN`.

PR59 merge:
`54131488c65302f81b3001abaaa345d21f0281e2`.

Shipped:
- logging-road route-specific project-owned static;
- route help RU+EN;
- both route alt/caption RU+EN;
- route locale/Save/RNG invariance.

PR59 exact/post-merge:
- run #114: 360/360;
- run #115: 360/360;
- validator 17/46/35/9.

Its old-boundary neutral-fallback state was the correct historical PR59 state.

## PR60

`GREEN_POST_MERGE_MAIN`.

Reviewed v3 asset:
`forest-route-old-boundary-v3.svg`.

PR60 accepted exact head:
`36f933d8c01a249992d84295bc69c3d554bb1f89`.

Merge:
`2ad9fb8b0572f8903bbf57d144c8c5938023a440`.

Exact run #119:
- SUCCESS;
- 363/363;
- validator 17/46/35/9.

Post-merge run #120:
- SUCCESS;
- 363/363;
- same validator counts.

Initial run #116 failed four stale tests that still asserted the deliberate pre-activation fallback state. The new v3 safety tests already passed. The fixed head updated stale expectations without weakening route/gameplay invariants.

Current Forest route physical presentation:
- route/default -> neutral default SVG;
- logging-road -> reviewed specific SVG;
- old-boundary -> reviewed v3 specific SVG.

Neutral fallback metadata remains retained.

## Selected route label debt

`ACCEPTANCE_CONTRACT_READY`.

Current Activity status still exposes persisted raw:
- `logging-road`;
- `old-boundary`
after localized `Route/Маршрут`.

Existing approved bilingual route-option labels should be reused.

Required:
`routeId -> exact current option.setRoute match -> activityOption.<optionId>.label`.

Persisted routeId, presentationId, Save and RNG stay unchanged.

This is now the clearest small Forest presentation debt.

## Old Boundary v3 acceptance

`SHIPPED_GREEN`.

Reviewed source is limited to:
- narrow old path;
- low/weathered stones;
- old marks/moss.

No:
- gate/barrier;
- token/key;
- Hunter;
- challenge/reward/result;
- magic activation.

PR60 reuses existing PR59 RU+EN alt/caption keys.

Exact and post-merge CI are green.

## Ending localization

`GREEN_TEXT_SOURCE / CONSUMER_REQUIRED`.

Exact current endings:
9.

Prepared:
- 9 titles;
- 9 descriptions;
- 18 RU+EN keys;
- current-root conflicts: 0.

No condition/reward/meta/Save/RNG fields.

Locked Hard Work:
- only `completed_shifts >= 50`;
- meta reward `hardWork:lumber`.

Current Legacy panel still renders raw catalog ending title/description.

## Ordinary action result localization

`GREEN_TEXT_SOURCE / CONSUMER_REQUIRED`.

Reviewed ordinary slice:
- 16 exact current action IDs;
- exact scene `default` for each;
- 32 RU+EN result strings;
- current-root conflicts: 0.

No mechanics/Save/RNG fields.

Current generic result screen still uses raw ordinary:
- `lastAction.title`;
- `lastAction.text`.

Current one-scene set permits safe actionId + default lookup.

Future multi-scene actions require explicit locale-neutral scene identity.

## Ending/action shared consumer

`ACCEPTANCE_CONTRACT_READY`.

Ending cards:
- stable ending ID -> localized title/description.

Ordinary results:
1. preserve School special path;
2. preserve event outcomeRef path;
3. use reviewed action + scene identity;
4. raw fallback otherwise.

Locale switching must not change:
- ending availability;
- condition objects;
- rewards/meta;
- action effects/deltas/economics;
- pending event identity;
- RNG;
- Save.

Ordinary action Journal rows remain separate because they currently have null journal refs.

## Current normal-player bilingual debt

Product remains:
`PARTIAL_BILINGUAL`.

Highest-value remaining visible debt:

1. selected Forest route shows raw routeId;
2. Legacy ending cards are raw/mixed-language catalog source;
3. 16 ordinary action cards lack root label/description localization;
4. ordinary action result screen remains raw fallback;
5. profession result screen may show English source in RU;
6. ordinary action Journal rows remain raw/no stable ref;
7. ending epilogue/end-state Journal prose remains raw;
8. Stats profession summary reads raw catalog labels;
9. Work effect tags use raw RU label dictionary;
10. Legacy inheritance names use raw label dictionary;
11. some ending/condition text exposes stable machine IDs;
12. generic Night fallback can expose raw phase text;
13. runtime command errors can expose source-language messages;
14. 6 current events still have zero root event-localization coverage;
15. generic root media-alt localization remains incomplete.

Debug/internal and Product-open surfaces are excluded from this prioritization.

## Animation exporter

`READY_FOR_LEAD_APPROVAL / INSTALL_AND_CI_PROOF_REQUIRED`.

Proposed exact dev-only dependencies:
- `sharp@0.35.4`;
- `gifenc@1.0.3`.

Latest Chat2 packets cover:
- Apache-2.0/MIT notice requirements;
- sharp native/libvips install risk;
- Node 22.18 / Ubuntu CI portability;
- deterministic export assumptions;
- rollback.

Worker package/lock remain unchanged from current main baseline.

Lead may approve a dedicated tooling integration attempt.

Still required on actual integration head:
- exact package/lock diff;
- npm ci;
- sharp/gifenc imports;
- local project-owned export smoke;
- actual GIF validator;
- repeat-export determinism;
- full CI.

Production GIFs:
0.

Production GIF pools:
0.

No production animation claim is approved.

## Current project-owned static coverage

Current main:
- active semantic project-owned static mappings: 82;
- unique active physical project-owned sources: 81;
- physical presentation files: 91;
- active physical files: 81;
- retained inactive/source-history: 10.

Established baseline target:
80/80.

Route-specific extension:
2/2 current Forest route identities now have reviewed specific statics.

Neutral route/default remains retained as fallback.

Static coverage is not GIF coverage.

## Current-main CI floor

Authoritative floor:
- main `2ad9fb8...`;
- run #120;
- 363/363;
- validator 17/46/35/9;
- root localization 664 bilingual keys;
- project-owned static mappings 82;
- unique active physical sources 81.

Future localization/presentation PRs must not silently regress these counts.

## Recommended next integration order

### 1. Localized selected-route status
Small render-only change using existing route-option labels.

### 2. Ending + ordinary result localization
Selective root source + shared UI result/card consumers.

Keep ordinary Journal refs out of this PR.

### 3. Action-card/Stats direct-label cleanup
Reuse existing generic/action localization sources before adding new namespaces.

### 4. Ordinary action Journal identity
Separate Save/runtime design if dynamic historical rerendering is required.

### 5. Animation exporter
Dedicated dev-tooling PR only.

Do not combine dependency approval with production GIF activation.

## Product-open isolation

Still isolated:
- Hunter Forest token/clue mechanics;
- Old Boundary token acquisition/consume/retain/turn-in lifecycle;
- route challenge/reward topology;
- unresolved School providers;
- Secret Debt;
- authored Palace content;
- deeper not-current ending/relationship decisions.

Old-boundary static activation does not authorize any of those mechanics.

## Final gate verdict

- current main CI: `GREEN`;
- PR59 logging-road media: `SHIPPED_GREEN`;
- PR60 old-boundary v3 media: `SHIPPED_GREEN`;
- Forest route-specific static coverage: `2/2 CURRENT ROUTES`;
- route status label consumer: `READY`;
- ending localization source: `GREEN`;
- ordinary action result source: `GREEN`;
- ending/action shared consumer contract: `READY`;
- full-product bilingual state: `PARTIAL_BILINGUAL`;
- animation exporter: `READY_FOR_LEAD_APPROVAL / CI_PROOF_REQUIRED`;
- production GIFs/pools: `NONE`;
- static coverage: `82 semantic / 81 unique physical`;
- Product-open content: `ISOLATED`.

No whole worker/chat branch is approved for merge.
