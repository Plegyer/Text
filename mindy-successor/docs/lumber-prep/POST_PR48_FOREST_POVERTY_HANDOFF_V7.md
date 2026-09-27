# Post-PR48 Forest / Poverty Handoff v7

Status: selective-integration handoff for Chat 3 queue items 221–231.

Worker branch:
`chat3/lumber-production-proof-next`.

Current-main baseline:
`4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`
(PR #48 merged after PR #47 / #46 / #45).

Integration rule:
**do not merge this long-lived worker branch wholesale**.

Lead should copy/apply only the listed files onto fresh branches from exact current `main`.

No shared runtime/schema/UI source file is modified by this wave.

---

# SAFE_TEXT_PATCH

## Post-PR48 ordinary-poverty copyedit

### Audit

`docs/poverty-prep/POST_PR48_POVERTY_TEXT_REBASE_AUDIT_V2.md`.

Result:
- CLEAN_APPLY: 33
- SUPERSEDED: 0
- CONFLICT: 0

Static-media keys remain excluded.

### Final delta

`prior-work/astra/prototype-m3.2/content/poverty-copyedit-post-pr48-v4.fixture.json`.

Contains:
- exactly 33 existing ordinary-poverty localization keys;
- RU+EN replacement values;
- no additions;
- no renames;
- no media keys;
- no Secret Debt keys;
- no gameplay fields.

### Natural-path smoke matrix

`prior-work/astra/prototype-m3.2/content/poverty-copyedit-natural-path-v2.fixture.json`.

Maps every changed key to the exact current:
- production pack;
- event;
- variant;
- choice where applicable;
- current conditions/effects;
- expected RU+EN text.

### Selective-copy set

Copy:
- `docs/poverty-prep/POST_PR48_POVERTY_TEXT_REBASE_AUDIT_V2.md`;
- `prior-work/astra/prototype-m3.2/content/poverty-copyedit-post-pr48-v4.fixture.json`;
- `prior-work/astra/prototype-m3.2/content/poverty-copyedit-natural-path-v2.fixture.json`;
- prior regression support:
  `prior-work/astra/prototype-m3.2/tests/poverty-copyedit-final-delta-v2.test.ts`.

Apply only the 33 `strings` values into current root localization.

No full localization-file replacement.

### Blockers

None beyond normal review/test/CI.

This patch does not depend on Forest presentation wiring.

---

# SHARED_UI_REQUIRED

## Finalized Night/lodging source

`prior-work/astra/prototype-m3.2/content/poverty-shared-ui-localization-v3.fixture.json`.

Current post-PR48 status:
- 20 ADDITIVE;
- 0 CONFLICT.

## Exact post-PR48 consumer readiness

`docs/poverty-prep/SHARED_NIGHT_LODGING_POST_PR48_CONSUMER_READINESS_V4.md`.

Current hardcoded consumers still exist in:
`src/ui/app.ts`.

Consumer mapping:
`docs/poverty-prep/SHARED_NIGHT_LODGING_UI_CONSUMER_MAP_V3.md`.

Collision history:
`docs/poverty-prep/SHARED_NIGHT_LODGING_POST_PR47_KEY_COLLISION_AUDIT_V1.md`.

### Selective-copy set

Copy:
- `prior-work/astra/prototype-m3.2/content/poverty-shared-ui-localization-v3.fixture.json`;
- `docs/poverty-prep/SHARED_NIGHT_LODGING_UI_CONSUMER_MAP_V3.md`;
- `docs/poverty-prep/SHARED_NIGHT_LODGING_POST_PR48_CONSUMER_READINESS_V4.md`;
- optional copy-review sources:
  - `docs/poverty-prep/SHARED_NIGHT_LODGING_RU_COPY_REVIEW_V1.md`;
  - `docs/poverty-prep/SHARED_NIGHT_LODGING_EN_PARITY_REVIEW_V1.md`.

### Lead-owned implementation required

Wire current UI consumers for:
- LodgingResolution shell;
- lodging labels;
- next-day Energy formatter;
- VoluntaryNightChoice shell;
- generic Night fallback title;
- Night panel;
- result-to-lodging bridge;
- town lodging summary;
- housing labels.

`nightChoice.night.sleep.label`
already has a generic lookup path.

### Blockers

No Product blocker.

Requires shared UI ownership from Lead/Chat 1.

Do not alter:
- NightFlow IDs/order;
- lodging IDs;
- housing runtime values;
- cost;
- Energy mechanics;
- commands;
- Save.

---

# ROUTE_PRESENTATION_READY

## Normalized route media localization

`prior-work/astra/prototype-m3.2/content/forest-route-media-localization-normalized-v1.fixture.json`.

Normalized keys:
- `presentation.activity.forest.route.logging-road.alt`;
- `presentation.activity.forest.route.logging-road.caption`;
- `presentation.activity.forest.route.old-boundary.alt`;
- `presentation.activity.forest.route.old-boundary.caption`.

All keys:
- lowercase;
- slash-free;
- dots/underscores/hyphens only;
- RU+EN complete.

Guard:
`prior-work/astra/prototype-m3.2/tests/forest-route-media-localization-normalized-v1.test.ts`.

## Final route presentation source

`prior-work/astra/prototype-m3.2/content/forest-route-presentation-final-v4.fixture.json`.

Consolidates:
- current exact route IDs;
- current route states;
- semantic presentation IDs;
- polished route scene text;
- current route label references;
- optional help copy;
- normalized alt/caption localization.

Exact semantic mapping proposed:

`logging-road`
-> `activity/forest/route/logging-road`.

`old-boundary`
-> `activity/forest/route/old-boundary`.

## Locale invariance

`prior-work/astra/prototype-m3.2/content/forest-route-locale-invariance-v1.fixture.json`.

Requires:
- same route ID in RU/EN;
- same route state;
- same presentationId;
- same Save fields;
- same global RNG;
- same Activity RNG;
- same result IDs.

Only text/alt presentation differs.

## Natural-path expectation

`prior-work/astra/prototype-m3.2/content/forest-route-presentation-natural-path-v1.fixture.json`.

Records exact route -> presentation -> result expectation.

## Result continuation

`docs/lumber-prep/FOREST_ROUTE_RESULT_CONTINUATION_INVARIANT_MATRIX_V2.md`.

Exact unchanged continuations:

success:
`activityResult(lumber.forest, success, lumber.forest.success)`.

escape:
`activityResult(lumber.forest, escape, lumber.forest.escape)`.

failure:
`activityResult(lumber.forest, failure, lumber.forest.failure)`.

## Additional route authoring source

`docs/lumber-prep/FOREST_ROUTE_SCENE_VARIATION_BANK_V4.md`.

Effect-free:
- 5 logging-road RU+EN variants;
- 5 old-boundary RU+EN variants.

Choice label review:
`docs/lumber-prep/FOREST_ROUTE_CHOICE_LABEL_POLISH_V1.md`.

Final label recommendation:
**KEEP_CURRENT** for both existing route labels.

## Selective-copy set

Copy:
- `prior-work/astra/prototype-m3.2/content/forest-route-media-localization-normalized-v1.fixture.json`;
- `prior-work/astra/prototype-m3.2/tests/forest-route-media-localization-normalized-v1.test.ts`;
- `prior-work/astra/prototype-m3.2/content/forest-route-presentation-final-v4.fixture.json`;
- `prior-work/astra/prototype-m3.2/content/forest-route-locale-invariance-v1.fixture.json`;
- `prior-work/astra/prototype-m3.2/content/forest-route-presentation-natural-path-v1.fixture.json`;
- `docs/lumber-prep/FOREST_ROUTE_RESULT_CONTINUATION_INVARIANT_MATRIX_V2.md`;
- `docs/lumber-prep/FOREST_ROUTE_SCENE_VARIATION_BANK_V4.md`;
- `docs/lumber-prep/FOREST_ROUTE_CHOICE_LABEL_POLISH_V1.md`;
- acceptance support:
  `docs/lumber-prep/FOREST_POVERTY_SELECTIVE_INTEGRATION_ACCEPTANCE_V1.md`.

### Blocker

Shared route-state -> presentationId consumer seam is still required before route-specific text/media becomes active.

Current shared UI still requests:
`activity/forest/route/default`
while Forest Activity is active.

Lead/Chat 1 owns that seam.

---

# ROUTE_ASSET_SOURCE_ONLY

## Chat 2 static-source compatibility audit

`docs/lumber-prep/FOREST_ROUTE_STATIC_SOURCE_COMPATIBILITY_AUDIT_V1.md`.

Reviewed source branch:
`chat2/presentation-replacement-next`.

Disposition:

### Generic default SVG
`assets/presentation/forest-route-default-v1.svg`.

Classification:
**VISUALLY_SAFE_IF_SEAM_SHIPS**.

May serve as neutral route fallback if separately activated by Lead/Chat 2.

### Logging-road SVG
`assets/presentation/forest-route-logging-road.svg`.

Classification:
**VISUALLY_SAFE_IF_SEAM_SHIPS**.

Compatible with current logging-road semantics.

### Old-boundary SVG
`assets/presentation/forest-route-old-boundary.svg`.

Classification:
**TOO_SPECIFIC** + **NEEDS_GENERIC_FALLBACK**.

Reason:
prominent constructed crossbar/post-like feature is more specific than current authorized old stones/marks semantics and could read as a gate/checkpoint/boundary structure.

Do not activate this asset from Chat 3.

Use neutral fallback until revised or explicitly approved.

## Asset integration blocker

Asset activation belongs to Lead/Chat 2.

Chat 3 provides only semantic compatibility review and localization source.

No route asset is activated by this wave.

---

# OWNERSHIP / COLLISION SAFETY

Current ownership audit:
`docs/lumber-prep/POVERTY_FOREST_LOCALIZATION_OWNERSHIP_COLLISION_AUDIT_V1.md`.

Current conclusions still apply post-PR48:
- ordinary-poverty 33-key overlaps are intentional same-domain text updates;
- shared Night/lodging proposed exact-root collisions: 0;
- Forest route final proposed exact-root collisions: 0;
- School collisions: 0;
- Foreman collisions: 0;
- PR47/48 `presentation.static.*` collisions: 0.

Normalized route media keys avoid the old slash-bearing localization-key form and remain separate from:
`presentation.static.*`.

---

# PRODUCT_OPEN

Items 221–231 do not close any of the following.

## Hunter route
OPEN:
- gameplay route ID;
- route state;
- clue/fact/capability;
- source/provider;
- threshold;
- reward;
- challenge/season relation.

No Hunter production route may be inferred from route presentation source.

## Old Boundary Token
Current authority only:
`itemCapability(enter_old_boundary) present=true`.

OPEN:
- acquisition;
- price;
- provider;
- consume/retain/turn-in;
- deeper use/lore.

## Forest challenge mechanics
OPEN:
- production IDs;
- route bindings;
- thresholds;
- progress/endurance deltas;
- rewards;
- persistence.

## School Arcana
OPEN:
- public fact/result;
- provider;
- threshold;
- whether required/optional;
- exact interpretation.

## Seasonal mechanical topology
OPEN:
- route closures;
- shortcuts;
- frozen passage;
- seasonal costs/rewards.

## Deeper Forest lore
OPEN:
- meaning/creator of old boundary marks;
- anomaly truth;
- Hunter provenance;
- deeper result/reward.

---

# Locked invariants

## Lumber Hard Work

Eligibility:
ONLY `completed_shifts >= 50`.

Reward:
exactly `hardWork:lumber`.

No:
- Forest route prerequisite;
- item prerequisite;
- School prerequisite;
- relationship prerequisite;
- challenge prerequisite.

## Forest Activity

Activity:
`lumber.forest`.

Exact routes:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

Exact results:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

## Poverty

Ordinary poverty remains separate from Secret Debt.

Text patch changes presentation only.

## Branch policy

Never merge the full Chat 3 worker branch.

Use fresh current-main branches and selective copy/application.

---

# Exact remaining blockers

1. Lead/Chat 1 shared Night/lodging UI consumption.
2. Lead/Chat 1 Forest route-state -> presentationId seam.
3. Lead/Chat 2 route asset activation/review.
4. Old-boundary route SVG needs revision or explicit approval before route-specific activation.
5. Product decisions remain required for Hunter/token/challenge/Arcana/season/lore mechanics.
6. Exact-head tests and CI must be run on the eventual integration branch.

# Handoff conclusion

Post-PR48 Chat 3 work is split cleanly into:
- **SAFE_TEXT_PATCH** — 33-key ordinary-poverty text delta;
- **SHARED_UI_REQUIRED** — 20-key Night/lodging presentation localization plus exact consumer map;
- **ROUTE_PRESENTATION_READY** — normalized Forest route localization and presentation expectations;
- **ROUTE_ASSET_SOURCE_ONLY** — reviewed static candidates, with old-boundary asset held back;
- **PRODUCT_OPEN** — all unresolved Hunter/token/challenge/Arcana/season/lore mechanics.

The data/content sources are ready for selective integration; the remaining active-work blockers are shared UI/presentation ownership and explicit Product decisions.
