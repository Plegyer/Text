# Next production integration gate v20

Status: COMPLETE / CURRENT_GATE_RECORDED

Audit point:
after PR59 logging-road static, PR60 old-boundary v3 static, PR61 ending/action localization and PR62 profession/unlock/Forest route display-label cleanup.

Current main:
`1b0ea9dc3c10a8acb24df2ca2edd0e5f609dd515`.

Current main CI:
- run #126;
- id `36412267106`;
- SUCCESS;
- validator 17 packs / 46 events / 35 actions / 9 endings;
- 375 / 375 tests;
- 0 failures.

This gate summarizes Chat4 items 247–257.

No whole worker/chat branch is approved for merge.

## 247 — PR59 post-merge audit

`GREEN_POST_MERGE_MAIN`.

PR59 accepted head:
`01109fd08cece24308d3d9a64127b08e6fc5d702`.

Merge:
`54131488c65302f81b3001abaaa345d21f0281e2`.

Exact/post-merge:
- run #114: 360/360;
- run #115: 360/360;
- validator 17/46/35/9.

PR59 correctly shipped logging-road project-owned static while old-boundary remained neutral fallback at that historical checkpoint.

Later PR60 superseded only the physical old-boundary fallback state by safely activating v3.

## 248 — selected-route localized label consumer

`SATISFIED_BY_PR62`.

PR62 now maps persisted Forest route state to the existing bilingual route-option labels at render time.

RU/EN display:
- logging-road -> Лесовозная дорога / Logging road;
- old-boundary -> Старая межевая тропа / Old boundary path.

Persisted routeId remains unchanged.

PR62 renderer regression proves same Save/RNG/media across RU↔EN.

The route checkpoint also reuses the option label when it is a current `forest.route.*` checkpoint.

## 249 — old-boundary v3 production acceptance

`GREEN_POST_MERGE_MAIN`.

Chat2 items 317–319 were accepted as safe presentation-only source.

Asset:
`assets/presentation/forest-route-old-boundary-v3.svg`.

Safe semantics:
- narrow path;
- weathered/low stones;
- old marks;
- vegetation.

Excluded:
- gate/barrier;
- token/key;
- Hunter;
- challenge/reward/result;
- magic activation.

PR60:
- exact head `36f933d8c01a249992d84295bc69c3d554bb1f89`;
- run #119: 363/363;
- merge `2ad9fb8b0572f8903bbf57d144c8c5938023a440`;
- run #120: 363/363.

## 250 — ending localization

`SHIPPED_GREEN_VIA_PR61`.

Exact current endings:
`9`.

Reviewed localization:
- 9 titles;
- 9 descriptions;
- 18 RU+EN strings;
- no condition/reward/meta/Save/RNG fields.

Hard Work remains:
- only `completed_shifts >= 50`;
- meta reward `hardWork:lumber`.

PR61 now localizes Legacy ending cards from stable ending IDs.

## 251 — ordinary action result localization

`SHIPPED_GREEN_VIA_PR61`.

Reviewed:
- 16 exact current action IDs;
- exact scene `default` for each;
- 32 RU+EN title/body strings;
- no gameplay/Save/RNG fields.

Current result consumer keeps:
1. School specialized result;
2. event-choice outcomeRef;
3. ordinary action stable-ID localization;
4. raw fallback.

Multi-scene seasonal career results remain outside this consumer.

## 252 — ending/action shared consumer acceptance

`SATISFIED_BY_PR61`.

PR61 renderer tests prove:
- ending cards localize RU↔EN without changing eligibility or Save;
- ordinary action result localizes RU↔EN without changing Save.

No eligibility/effect/reward/RNG/Save identity is derived from localized prose.

Ordinary action Journal identity remains separate work.

## 253 — remaining bilingual visible debt

Current product remains:
`PARTIAL_BILINGUAL`.

PR62 closes:
- selected route raw-ID display;
- Stats profession raw labels;
- Legacy unlock raw labels;
- route checkpoint machine option ID where it maps to a Forest route option.

Highest-value remaining normal-player debt:
1. 40 seasonal profession result bodies + stable scene-aware result consumer;
2. 16 ordinary action-card description keys;
3. Work effect tags still use raw RU label dictionary;
4. Lumber ending requirement display exposes some stable machine IDs;
5. ordinary action Journal rows lack stable refs;
6. ending completion/epilogue history remains source prose;
7. generic Night fallback may expose raw phase ID;
8. runtime errors can expose source-language messages;
9. six current events still have zero root event-localization coverage.

Debug/internal and Product-open surfaces are excluded.

## 254 — old-boundary fallback transition

`TRANSITION_IMPLEMENTED / GREEN_POST_MERGE_MAIN`.

Before PR60:
- requested old-boundary semantic ID;
- physical route/default.

After PR60:
- same requested semantic ID;
- same persisted routeId;
- physical old-boundary v3 specific static;
- neutral route/default fallback retained.

No Save/RNG/result/Hard Work change.

## 255 — animation exporter preapproval

`READY_FOR_LEAD_APPROVAL / INSTALL_AND_CI_PROOF_REQUIRED`.

Proposed exact dev-only dependencies:
- `sharp@0.35.4`;
- `gifenc@1.0.3`.

Current package/lock remain unchanged:
- package blob `91de0847c3ae3b8de394334968307ccf6252820a`;
- lock blob `77b325bc6b2115499c475adf92d3bae218bf37a1`.

Lead tooling integration must still prove:
- generated lockfile review;
- notices/licenses;
- Node 22.18 / Ubuntu `npm ci`;
- sharp/gifenc import;
- local SVG raster/export smoke;
- no export-time network access;
- GIF validator;
- repeated same-environment byte identity;
- full CI.

Actual production GIFs:
`0`.

Production 3–5 GIF pools:
`0`.

## 256 — project-owned static coverage

Current:
- established baseline target: 80/80;
- route-specific extension: 2/2;
- active semantic static mappings: 82;
- unique active physical sources: 81;
- neutral route/default retained;
- logging-road specific shipped;
- old-boundary v3 specific shipped.

Static coverage is not animation coverage.

## 257 — current-main CI floor

Authoritative:
- main `1b0ea9dc3c10a8acb24df2ca2edd0e5f609dd515`;
- run #126 / id `36412267106`;
- 375/375;
- validator 17/46/35/9;
- root localization 744 keys, all RU+EN complete;
- static 82 semantic / 81 unique physical.

PR62 exact head:
`0b8c7e4b010426188a196decbc9a40cf58b64fc2`.

Run #125:
375/375 PASS.

## Locked invariants

Continue to protect:
- Lumber Hard Work only `completed_shifts >= 50`;
- meta reward `hardWork:lumber`;
- exact Forest success/escape/failure result IDs;
- exact activityResult reactions;
- Old Boundary `enter_old_boundary` gate;
- persisted route IDs independent of localized display;
- ending eligibility/reward/meta identity;
- ordinary action effects/economics;
- School specialized result precedence;
- Journal event-choice stable refs;
- Night costs/effects;
- locale-independent gameplay RNG/Save/media identity.

## Recommended next production slices

### Seasonal profession result localization
Highest-value current normal-player bilingual gap.

Requires:
- exact stable scene identity for the 40 seasonal career result scenes;
- RU+EN result bodies;
- render-only consumer;
- Save/RNG/effect invariance.

### Ordinary action-card descriptions
The 16 immediate results are localized, but their action-list descriptions still need bilingual `action.<id>.description` source.

### Generic-label reuse cleanup
Work effect tags should use existing generic/stat localization rather than raw RU dictionary.

### Historical result identity
Ordinary action Journal localization needs a separate stable-ref design; do not fuzzy-match stored prose.

### Exporter tooling
May proceed as a dedicated dev-tooling PR after explicit Lead approval.

Do not combine dependency integration with a production GIF activation claim.

## Product-open isolation

Still isolated:
- Hunter Forest token/clue mechanics;
- Old Boundary token acquisition/consume/retain/turn-in lifecycle;
- route challenge/reward topology;
- unresolved School providers;
- Secret Debt;
- authored Palace content;
- deeper not-current relationship/ending decisions.

Route media and localization do not authorize those mechanics.

## Final gate verdict

- current main CI: `GREEN`;
- PR59 logging-road media: `SHIPPED_GREEN`;
- PR60 old-boundary v3 media: `SHIPPED_GREEN`;
- PR61 endings/action results: `SHIPPED_GREEN`;
- PR62 route/profession/unlock display labels: `SHIPPED_GREEN`;
- Forest route-specific static coverage: `2/2 CURRENT ROUTES`;
- route label debt: `CLOSED`;
- ending localization: `CLOSED_FOR_CURRENT_CARDS`;
- ordinary default-scene action results: `CLOSED_FOR_16 REVIEWED ACTIONS`;
- animation exporter: `READY_FOR_LEAD_APPROVAL / CI PROOF REQUIRED`;
- production GIFs/pools: `NONE`;
- project-owned static coverage: `82 semantic / 81 unique physical`;
- full-product bilingual state: `PARTIAL_BILINGUAL`;
- Product-open content: `ISOLATED`.

No whole worker/chat branch is approved for merge.
