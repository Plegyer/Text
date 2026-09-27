# Forest / Poverty Next Integration Handoff v4

Status: selective-integration handoff for Chat 3 queue items 185–195.

Worker branch:
`chat3/lumber-production-proof-next`.

Current-main baseline used by this wave:
`c0763f9f9fa9887593fe8567165bbedce2b6cd3a`
(PR #45 ordinary-poverty RU/EN localization merged).

Integration rule:
**do not merge this long-lived worker branch wholesale**. Lead should selectively copy reviewed files onto fresh branches from current `main`.

This wave contains text deltas, tests, inventories, localization sources and presentation staging. It does not intentionally edit shared runtime/schema/UI.

---

# SAFE_TEXT_PATCH

## Poverty copyedit delta

File:
`prior-work/astra/prototype-m3.2/content/poverty-copyedit-main-delta-v1.fixture.json`.

Purpose:
convert items 173–174 into one exact-key RU+EN delta against the real PR45 merged localization bundle.

Properties:
- current merged ordinary-poverty namespace remains 84 keys;
- delta contains only the 36 keys whose wording changes;
- every delta key already exists on current main;
- RU+EN both present;
- no key rename;
- no key addition;
- no gameplay field;
- no Secret Debt content.

Selective integration:
merge only `strings` values into the matching existing keys in current-main `content/localization.json`.

Do not copy any old pre-PR45 full poverty localization fixture as a replacement for the merged bundle.

## Poverty copyedit regression

File:
`prior-work/astra/prototype-m3.2/tests/poverty-copyedit-main-delta-v1.test.ts`.

Safe to copy with item 185.

Validates:
- every copyedit key exists;
- every replacement is genuinely changed text;
- RU+EN completeness;
- existing namespace only;
- six ordinary-poverty production pack identities unchanged;
- no gameplay fields;
- Secret Debt excluded.

Recommended Lead sequence:
1. fresh branch from current `main`;
2. copy item 185 + item 186;
3. apply item-185 `strings` to current localization;
4. run item 186 plus existing poverty localization/natural-path tests;
5. run full check and exact-head CI.

---

# SHARED_UI_REQUIRED

## Poverty Night/lodging localization map

File:
`docs/poverty-prep/POVERTY_SHARED_NIGHT_LODGING_LOCALIZATION_MAP_V2.md`.

This is an exact post-PR45 re-audit of shared player-facing lodging/Night surfaces outside the poverty event payloads.

Current remaining hardcoded/shared gaps include:
- LodgingResolution eyebrow/prompt;
- generic lodging labels;
- next-day Energy formatting;
- VoluntaryNightChoice shell;
- generic Night fallback title;
- Night panel;
- result-to-lodging button;
- town lodging-summary prefix;
- housing labels;
- `night.sleep` label.

Already-localized keys are explicitly marked for reuse rather than duplication.

## Poverty shared UI localization fixture

File:
`prior-work/astra/prototype-m3.2/content/poverty-shared-ui-localization-v2.fixture.json`.

Contains 20 safe RU+EN presentation keys.

Current-main collision check at authoring time:
no collisions with existing PR45 localization keys.

Important:
the strings are safe, but adding them to the localization bundle alone does not make them visible.

Lead/Chat 1 must wire the current shared UI consumer seams:
- `tr(...)` around hardcoded Night/lodging text;
- lodging-label resolver by locale-neutral lodging ID;
- housing-label resolver by runtime housing value;
- formatted next-day Energy label;
- existing `localizedNightChoiceLabel` seam for `night.sleep`.

Do not change:
- NightFlow;
- lodging IDs;
- housing values;
- costs;
- Energy mechanics;
- save state.

---

# SAFE_PRESENTATION_SOURCE

## Forest current-main inventory

File:
`docs/lumber-prep/FOREST_ROUTE_CURRENT_MAIN_PRESENTATION_INVENTORY_V2.md`.

Records current authority:
- `forest.route.logging-road`;
- `forest.route.old-boundary`;
- current route-state values;
- current route labels;
- current Activity envelope;
- current default Activity presentation request;
- shipped result identities;
- exact presentation-only gaps.

Safe documentation copy.

## Logging-road localization source

File:
`prior-work/astra/prototype-m3.2/content/forest-logging-road-localization-v2.fixture.json`.

Current-main exact route:
`forest.route.logging-road`.

Contains:
- current shipped route label as current-main reference;
- 5 additive RU+EN presentation strings:
  - wheel ruts;
  - timber stack;
  - work marks;
  - narrowing;
  - reaction.

No conditions/effects/rewards.

## Old-boundary localization source

File:
`prior-work/astra/prototype-m3.2/content/forest-old-boundary-localization-v2.fixture.json`.

Current-main exact route:
`forest.route.old-boundary`.

Contains:
- current shipped route label as current-main reference;
- 5 additive RU+EN presentation strings;
- explicit non-assumptions preserving unresolved token semantics.

Current authoritative gate is referenced only as:
`itemCapability(enter_old_boundary) present=true`.

The file does not select token acquisition, price, consumption, retention, turn-in, Hunter relationship, or deeper lore outcome.

---

# STAGING_ONLY

## Forest route presentation replacement

File:
`prior-work/astra/prototype-m3.2/content/forest-route-presentation-replacement-v1.fixture.json`.

Maps only current shipped route states:

- `logging-road`
  -> `activity/forest/route/logging-road`;

- `old-boundary`
  -> `activity/forest/route/old-boundary`.

Includes:
- current label keys;
- authored route text keys;
- safe prose candidate lists;
- existing `assets/stage-forest.svg` as neutral static fallback.

Why staging:
current shared Activity UI still requests:
`activity/forest/route/default`
regardless of selected route state.

Therefore item 192 must not be described as a currently consumed runtime route slot until Lead adds the shared route-state -> presentation-ID seam.

## Forest route presentation contract regression

File:
`prior-work/astra/prototype-m3.2/tests/forest-route-presentation-contract-v1.test.ts`.

Safe to copy on an integration branch together with items 190–192.

Checks:
- exact two current route IDs only;
- RU+EN completeness;
- locale-neutral semantic presentation IDs;
- no gameplay fields;
- no Hunter production ID;
- no selected Old Boundary token semantics;
- exact Lumber Hard Work;
- exact Forest result identities.

## Forest route natural-path identity smoke

File:
`prior-work/astra/prototype-m3.2/tests/forest-route-natural-path-identity-v1.test.ts`.

Uses current production Activity flow for both shipped route choices.

Proves:
- Activity identity remains `lumber.forest`;
- selected route-state identity remains exact;
- route option identity survives reload;
- presentation/localization lookup is read-only relative to Save/RNG;
- both routes preserve the existing Forest success result;
- exact success `activityResult` continuation remains unchanged.

This smoke tests identity safety around the staging mapping. It does not claim current UI consumes item 192 yet.

---

# PRODUCT_OPEN

## Forest route isolation ledger

File:
`docs/lumber-prep/FOREST_ROUTE_PRODUCT_OPEN_ISOLATION_LEDGER_V1.md`.

Use this as the boundary document before deeper Forest production work.

Still Product-open:

### Hunter route
- production route ID;
- route state;
- clue/capability;
- provider;
- threshold;
- reward;
- challenge/season binding.

### Old Boundary token semantics
- acquisition source;
- price;
- provider;
- retain/consume/turn-in;
- deeper-use semantics.

### Challenge mechanics
- gameplay challenge IDs;
- route binding;
- thresholds;
- `progressDelta`;
- `enduranceCost`;
- rewards;
- persistent effects.

### School Arcana
- public result/fact ID;
- provider;
- threshold;
- whether required or optional;
- lore interpretation.

### Seasonal topology
- route closures;
- shortcuts;
- winter frozen passage;
- seasonal costs/rewards;
- mechanical challenge availability.

### Deeper lore outcomes
- objective meaning of anomalies/marks;
- creator/source;
- persistent facts;
- lore rewards/endings.

None of those decisions may be inferred from items 189–194.

---

# Exact selective-copy sets

## Lead patch A — poverty text polish

Copy:
- `prior-work/astra/prototype-m3.2/content/poverty-copyedit-main-delta-v1.fixture.json`;
- `prior-work/astra/prototype-m3.2/tests/poverty-copyedit-main-delta-v1.test.ts`.

Then apply only the 36 exact-key RU+EN replacement values to current-main localization.

Do not overwrite the full localization bundle.

## Lead patch B — poverty shared UI localization

Reference/copy:
- `docs/poverty-prep/POVERTY_SHARED_NIGHT_LODGING_LOCALIZATION_MAP_V2.md`;
- `prior-work/astra/prototype-m3.2/content/poverty-shared-ui-localization-v2.fixture.json`.

Lead-owned code change is required in shared UI.

Do not change NightFlow/lodging/housing mechanics.

## Lead patch C — Forest route presentation source

Copy:
- `docs/lumber-prep/FOREST_ROUTE_CURRENT_MAIN_PRESENTATION_INVENTORY_V2.md`;
- `prior-work/astra/prototype-m3.2/content/forest-logging-road-localization-v2.fixture.json`;
- `prior-work/astra/prototype-m3.2/content/forest-old-boundary-localization-v2.fixture.json`;
- `prior-work/astra/prototype-m3.2/content/forest-route-presentation-replacement-v1.fixture.json`;
- `prior-work/astra/prototype-m3.2/tests/forest-route-presentation-contract-v1.test.ts`;
- `prior-work/astra/prototype-m3.2/tests/forest-route-natural-path-identity-v1.test.ts`;
- `docs/lumber-prep/FOREST_ROUTE_PRODUCT_OPEN_ISOLATION_LEDGER_V1.md`.

Before activating item 192 in UI:
Lead must provide the shared route-state -> semantic presentation-ID consumer seam.

---

# Locked invariants

## Forest

Lumber Hard Work:
- ONLY `completed_shifts >= 50`;
- reward `hardWork:lumber`.

Forest results:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Routes:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

No Hunter route is created by this wave.

## Poverty

PR45 gameplay/event identities remain unchanged.

Item 185 edits text only.

Shared Night/lodging keys edit presentation only.

Ordinary poverty remains separate from Secret Debt.

## Branch policy

The worker branch is long-lived and divergent.

Never integrate this wave by merging the entire branch.

Use fresh current-main branches and selective file copy/application only.

# Handoff conclusion

Items 185–195 split cleanly into:
- **SAFE_TEXT_PATCH** — ordinary-poverty exact-key copyedit;
- **SHARED_UI_REQUIRED** — remaining Night/lodging UI localization;
- **SAFE_PRESENTATION_SOURCE** — current two Forest route prose/localization sources;
- **STAGING_ONLY** — route-state presentation replacement until shared UI consumes it;
- **PRODUCT_OPEN** — Hunter, token semantics, challenge mechanics, School Arcana authority, seasonal topology and deeper lore outcomes.

No additional gameplay mechanism is needed or authorized by this handoff.
