# Next production integration gate v14

Status: COMPLETE / CURRENT_GATE_RECORDED

Audit point:
after PR47 project-owned static-media production merge.

Current main:
`7f27caca4e3e711799e9c1f235c4a27adbf31026`.

Current main CI:
- run #74 / id `36344297121`;
- SUCCESS;
- 17 packs, 46 events, 35 actions, 9 endings;
- 311/311 tests.

This gate summarizes Chat 4 items 175–185.

## 1. Project-owned static Lead readiness

PR47:
`GREEN_POST_MERGE_MAIN`.

Selective integration is verified:
- exact original 21 Chat 2 item-184–195 SVGs copied;
- 39 exact current semantic slot mappings;
- 42 exact reviewed RU+EN accessibility strings;
- no later worker-wave assets accidentally copied;
- no gameplay drift.

## 2. altKey schema

`GREEN_SHIPPED`.

Optional altKey:
- backward-compatible;
- locale-neutral;
- absent from Save;
- absent from gameplay RNG seed;
- preserves legacy overrides;
- preserves deterministic GIF candidate choice.

## 3. Static slot mapping/build/accessibility

Current production:
- 21 physical project-owned static SVGs;
- 39 root mappings;
- 21 unique mapped sources;
- build byte-preservation regression green;
- RU↔EN asset identity regression green;
- 267 root localization keys.

PR47 exact-head run #73:
311/311 green.

Post-merge run #74:
311/311 green.

## 4. Chat 2 seasonal career source readiness

Items 196–207:
`GREEN_SELECTIVE_SOURCE / NOT_YET_ACTIVATED`.

Prepared:
- 40 actual seasonal SVGs;
- 40 unique current IDs;
- 40 unique blob SHAs;
- 80 RU+EN alt/caption strings;
- build/accessibility regression.

Together with current 10 result assets, worker-source career static coverage is:
`50 / 50`.

Important:
the 40 seasonal assets are still worker source, not current-main production.

## 5. Chat 2 non-career static wave

Items 208–219:
`GREEN_CURRENT_SOURCES_WITH_2_PRODUCT_OPEN_ROUTE_ASSETS`.

Prepared:
- 29 new/refined physical assets;
- 27 current production mappings;
- 2 truthful Product-open Forest route-option assets;
- 58 RU+EN accessibility strings.

Safe current-source domains:
- course-distinct reachable School;
- ordinary poverty one-to-one event art;
- Forest return/reaction refinement;
- current Foreman refinement.

Product-open:
- route-specific logging-road art;
- route-specific old-boundary art
until Lead ships a route-state -> presentationId seam.

## 6. Chat 3 post-PR45 text readiness

### Poverty
Final copyedit:
`SAFE_TEXT_PATCH`
with 33 existing-key RU+EN replacements.

### Shared Night/lodging
20-key fixture:
`SHARED_UI_REQUIRED`.

### Forest route
Prose/tests:
`SAFE_PRESENTATION_SOURCE`.

Production binding:
`SHARED_PRESENTATION_WIRING_REQUIRED`.

Current UI still owns:
`activity/forest/route/default`.

### Compatibility blocker found

Chat 3 route media localization uses keys containing `/`, e.g.:
`presentation.activity/forest/route/logging-road.alt`.

PR47 altKey schema does not allow slash characters.

Therefore route media keys require locale-key normalization before they can be consumed through the shipped altKey field.

This is a presentation-key issue only; gameplay and presentation IDs remain unchanged.

## 7. Chat 5 non-Lumber seasonal text readiness

Items 49–60:
`GREEN_TEXT_SOURCE / SHARED_CONSUMER_REQUIRED`.

Verified fixture:
- 36 entries;
- 9 non-Lumber careers;
- 4 seasons each;
- 36 unique current presentation IDs;
- complete RU+EN;
- no Lumber;
- no gameplay fields;
- no Hunter Forest/Old Boundary bleed.

Lead must add a presentation-text consumer while preserving current action/scene/media/gameplay identity.

## 8. Product-open isolation

Still unpromoted:
- School exact-course teacher gameplay;
- School management/accounting public-result provider;
- School Arcana/Forest public-result provider;
- Hunter Forest route/clue/token semantics;
- Old Boundary acquisition/consume/retain/turn-in;
- Forest challenge/reward topology;
- relationship housing/deeper stages/endings;
- Secret Debt;
- Palace authored content.

Presentation assets do not authorize gameplay.

## 9. Current production priority from QA state

### Shipped
- PR43 Forest result bilingual;
- PR44 School bilingual;
- PR45 poverty bilingual;
- PR46 Foreman bilingual/generic Night labels;
- PR47 first project-owned static-media activation.

### Clean next selective media source
Chat 2 40 seasonal career SVGs:
`READY_FOR_FRESH_MAIN_SELECTIVE_PR`.

### Separate non-career media source
Chat 2 current-ID non-career assets:
`READY_SELECTIVELY`,
except the two route-specific assets remain staged.

### Clean next text source
Chat 3 poverty 33-key copyedit:
`READY_FOR_SELECTIVE_TEXT_PR`.

### Consumer-dependent text
- shared Night/lodging 20 keys;
- Chat 5 36 seasonal career scene strings.

Both require Lead UI/presentation consumer changes.

### Forest route
Do not activate route-specific presentation IDs until:
- route-state -> presentationId seam is reviewed;
- Save/RNG/result invariance tests pass;
- route altKey strings are normalized to the shipped schema.

## Final gate verdict

- current main CI: `GREEN`;
- PR47 static media: `SHIPPED_GREEN`;
- Chat 2 seasonal static: `GREEN_SELECTIVE_SOURCE`;
- Chat 2 non-career static: `GREEN_CURRENT_SOURCES / ROUTE_ASSETS_STAGED`;
- poverty copyedit: `SAFE_TEXT_PATCH`;
- shared Night/lodging: `SHARED_UI_REQUIRED`;
- non-Lumber seasonal text: `GREEN_TEXT_SOURCE / SHARED_CONSUMER_REQUIRED`;
- Forest route: `SHARED_WIRING_REQUIRED + ALTKEY_NORMALIZATION_REQUIRED`;
- Product-open content: `ISOLATED`.

No whole worker/chat branch is approved for merge.
