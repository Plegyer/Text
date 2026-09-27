# Forest Bilingual Source Inventory v1

Status: ACTIVE bilingual-authoring inventory for Chat 3 item 123.

Scope: current player-facing Forest content already authored on `chat3/lumber-production-proof-next` that must move to the Product-required RU + EN presentation model.

This document does **not** change gameplay, route gates, challenge checks, rewards, RNG, timing, save-state, item semantics, or Lumber Hard Work.

## Bilingual contract

- Russian is the source authoring language.
- English is a full second locale.
- Gameplay/content IDs are locale-neutral.
- A gameplay event exists once and serves both locales.
- Route/challenge/result mechanics are identical in RU and EN.
- GIF/media candidate IDs are locale-neutral and shared by both locales.
- Every player-facing GIF alt/caption requires both RU and EN.
- Locale selection must never change conditions, effects, RNG, timing, outcome, checkpoint, or save identity.
- Existing EN-only content below is a localization migration source, not authority to create an English-only duplicate event.

Locked Lumber firewalls remain:
- Hard Work eligibility = ONLY `completed_shifts >= 50`;
- exact reward = `hardWork:lumber`;
- Forest -> Lumber success continuation = exact
  `activityResult(lumber.forest, success, lumber.forest.success)`.

## Status vocabulary

- **REACHABLE_NOW** — an authoritative current gameplay identity already exists and the content can be localized without answering a Product question.
- **STAGED** — authored presentation copy exists and may be localized now, but a concrete production challenge/option binding is still missing.
- **PRODUCT_BLOCKED** — prose may be translated, but final production identity/gate/source still requires a Product decision and must not be inferred from localization.

## Source inventory summary

| Source family | Current source | Current authored player-facing material | Bilingual status | Production class |
| --- | --- | ---: | --- | --- |
| logging-road route | `FOREST_ROUTE_AUTHORED_SCENE_BANK_v1.md` | 4 route scenes + 1 reaction line | EN-only | REACHABLE_NOW |
| Hunter-trail route | same | 4 route scenes + 1 reaction line | EN-only | PRODUCT_BLOCKED |
| old-boundary route | same | 4 route scenes + 1 reaction line | EN-only | REACHABLE_NOW for route presentation; Product-blocked natural token loop |
| generic deep navigation | same | 4 scenes + 1 reaction line | EN-only | STAGED reusable content |
| navigation challenges | `FOREST_CHALLENGE_FAMILY_CONTENT_BANK_v1.md` | 5 scenes + 5 approach labels | EN-only | STAGED |
| physical challenges | same | 5 scenes + 5 approach labels | EN-only | STAGED |
| anomaly/ritual challenges | same | 5 scenes + 5 approach labels | EN-only | STAGED |
| seasonal route/challenge context | `FOREST_SEASONAL_CONTEXT_BANK_v1.md` | spring/summer/autumn/winter route and challenge variants | EN-only | STAGED; Hunter-specific rows PRODUCT_BLOCKED |
| result reactions | `content/packs/forest-result-content-v1.json` | 3 titles, 3 result texts, 3 choice labels, 3 choice texts, 3 media alts | EN-only | REACHABLE_NOW |
| result multi-GIF plan | `FOREST_MULTI_GIF_PRESENTATION_IDENTITY_MAP_v1.md` | 3–5 candidate concepts per route/challenge/result family | concept-only; no RU/EN alt/caption bank yet | REACHABLE_NOW for authoritative IDs; STAGED/BLOCKED as below |
| Forest Activity success continuation | existing `lumber-cross.activity-forest-return` boundary | gameplay identity is authoritative; any visible title/text/media description must be RU+EN when localized | localization audit required | REACHABLE_NOW identity; exact trigger is immutable |

The density audit records at least 34 substantive Forest scene/reaction entries before approach labels and seasonal subvariants are counted separately.

## Route scene inventory

### Logging road — REACHABLE_NOW

Authoritative gameplay identity:
- option `forest.route.logging-road`;
- route state `logging-road`.

Existing authored hooks requiring RU+EN:
- `forest/route/logging-road/wheel-ruts`;
- `forest/route/logging-road/timber-stack`;
- `forest/route/logging-road/work-marks`;
- `forest/route/logging-road/narrowing`.

Also requiring RU+EN:
- route reaction line;
- any future media alt/caption attached to the shared `forest/route/logging-road` candidate pool.

Localization may proceed without changing the route option or route state.

### Hunter trail — PRODUCT_BLOCKED

Authoritative concept/authoring key:
`hunter-trail`.

Current authored hooks:
- `forest/route/hunter-trail/tracks`;
- `forest/route/hunter-trail/bark-marks`;
- `forest/route/hunter-trail/migration-crossing`;
- `forest/route/hunter-trail/observation-point`.

The prose itself may be translated RU+EN now. Final production binding remains blocked because these are still OPEN:
- production option ID;
- Hunter public clue fact ID;
- navigation capability identity if a new one is selected;
- provider/source;
- threshold/reward.

Localization must not invent any of those values or turn `hunter-trail` into a guessed runtime option ID.

### Old boundary — REACHABLE_NOW route presentation / PRODUCT_BLOCKED natural acquisition loop

Authoritative gameplay identity:
- option `forest.route.old-boundary`;
- route state `old-boundary`;
- gate `itemCapability(enter_old_boundary) present=true`.

Locked item/capability:
- `old_boundary_token`;
- `enter_old_boundary`.

Existing authored hooks requiring RU+EN:
- `forest/route/old-boundary/stones`;
- `forest/route/old-boundary/old-marks`;
- `forest/route/old-boundary/clearing`;
- `forest/route/old-boundary/beyond-markers`.

Route prose can be localized now. Localization must not decide acquisition source, price, retained/consumed/turn-in policy, repeatability, or deeper token use.

### Generic deep navigation — STAGED

This is a reusable presentation/content family, **not** a fourth route.

Existing hooks:
- `forest/deep-navigation/closed-canopy`;
- `forest/deep-navigation/repeated-landmark`;
- `forest/deep-navigation/water-sound`;
- `forest/deep-navigation/human-trace`.

All four scenes and the deep-forest reaction line require RU+EN. They may only be attached under an already-authoritative route identity.

## Challenge family inventory

All three challenge families have substantial authored prose but no final concrete production challenge IDs yet. Translate the content; do not manufacture mechanics.

### Navigation — STAGED

Existing hooks:
- `forest/challenge/navigation/split-trail`;
- `forest/challenge/navigation/lost-horizon`;
- `forest/challenge/navigation/crossed-tracks`;
- `forest/challenge/navigation/washed-markers`;
- `forest/challenge/navigation/ridge-choice`.

Approach labels requiring paired RU+EN:
- Read the ground;
- Climb for a better view;
- Follow the water;
- Trust the marked route;
- Use what you know about the trail.

Final challenge IDs, thresholds/formulas and explicit Activity-state effects remain OPEN.

### Physical obstacle — STAGED

Existing hooks:
- `forest/challenge/physical/fallen-trunk`;
- `forest/challenge/physical/washed-bank`;
- `forest/challenge/physical/deadfall`;
- `forest/challenge/physical/slick-stones`;
- `forest/challenge/physical/root-slope`.

Approach labels requiring paired RU+EN:
- Climb carefully;
- Clear a way;
- Use the rope;
- Take the longer detour;
- Test each foothold.

Existing capability names such as `cross_rough_route` and `cut_heavy_wood` remain locale-neutral. Localization does not choose item consume/retain policy.

### Interpretation / ritual anomaly — STAGED

Existing hooks:
- `forest/challenge/anomaly/knot-marks`;
- `forest/challenge/anomaly/stone-ring`;
- `forest/challenge/anomaly/altered-sap`;
- `forest/challenge/anomaly/source-less-sound`;
- `forest/challenge/anomaly/old-symbols`.

Approach labels requiring paired RU+EN:
- Study the pattern;
- Compare the marks;
- Preserve a sample;
- Use Arcana knowledge;
- Leave it undisturbed.

Exact School Arcana public fact ID/threshold, sample result, lore truth and reward remain OPEN.

## Seasonal context inventory

Source:
`docs/lumber-prep/FOREST_SEASONAL_CONTEXT_BANK_v1.md`.

Season remains gameplay-authoritative and locale-neutral. Seasonal localization must not rename route/challenge identity.

### Spring — STAGED

RU+EN required for:
- logging road: wet ruts, soft shoulder;
- old boundary: water between stones, new growth;
- Hunter trail washed tracks — PRODUCT_BLOCKED binding;
- navigation washed markers / water-sound confusion;
- physical mud / washed bank / slippery crossing;
- anomaly sprouts / unusual fresh sap.

### Summer — STAGED

RU+EN required for:
- logging road: dry long road, resin and dust;
- old boundary: exposed stones;
- Hunter trail distant view — PRODUCT_BLOCKED binding;
- navigation long ridge / distant landmark;
- physical dry deadfall / exposed slope;
- anomaly resin/heat atmosphere.

Optional fire-risk mechanics remain unauthored and must not be added by translation.

### Autumn — STAGED

RU+EN required for:
- logging road: heavy use, stacked season;
- old boundary: leaves reveal the line;
- Hunter trail: migration crossing, browse marks, waiting point — PRODUCT_BLOCKED production identity, though autumn migration concept is authoritative;
- navigation migration-track complexity;
- physical leaf-covered footing / logging detour;
- anomaly exposed marks / preserve-sample context.

### Winter — STAGED

RU+EN required for:
- logging road: frozen ruts, snow over work marks;
- old boundary: dark stones in snow, frozen side passage;
- Hunter trail snow tracks — PRODUCT_BLOCKED binding;
- navigation snow-covered landmarks/tracks;
- physical frozen stones/root slope/frozen passage;
- anomaly frost patterns / frozen sample context.

The frozen side passage remains prose until an explicit deterministic winter option ID/cost is authored.

## Result reactions — REACHABLE_NOW

Source:
`prior-work/astra/prototype-m3.2/content/packs/forest-result-content-v1.json`.

The current pack is EN-only and has exactly one event per Activity result.

### Success

Locale-neutral event identity:
`forest-result-content-v1.success`.

Immutable trigger:
`activityResult(lumber.forest, success, lumber.forest.success)`.

Needs RU+EN:
- title;
- variant text;
- choice `return` label;
- choice `return` text;
- media alt.

### Escape

Locale-neutral event identity:
`forest-result-content-v1.escape`.

Immutable trigger:
`activityResult(lumber.forest, escape, lumber.forest.escape)`.

Needs RU+EN:
- title;
- variant text;
- choice `return` label;
- choice `return` text;
- media alt.

### Failure

Locale-neutral event identity:
`forest-result-content-v1.failure`.

Immutable trigger:
`activityResult(lumber.forest, failure, lumber.forest.failure)`.

Needs RU+EN:
- title;
- variant text;
- choice `return` label;
- choice `return` text;
- media alt.

All three choices remain presentation-only: `effects: []`.

## Activity continuation text boundary

The exact Forest success boundary used by Lumber remains:

`activityResult(lumber.forest, success, lumber.forest.success)`

and the continuation event identity remains:

`lumber-cross.activity-forest-return`.

Localization rules:
- translate visible continuation title/body/choice/alt/caption when that production source is localized;
- do not duplicate the event for EN;
- do not replace `activityResult` with a locale-specific fact;
- do not change success into escape/failure;
- do not add School, relationship, item, milestone or season prerequisites to Lumber Hard Work.

The new bilingual Forest result-reaction draft must preserve this exact result identity so the existing continuation remains mechanically identical.

## Multi-GIF alt/caption inventory

Source planning map:
`docs/lumber-prep/FOREST_MULTI_GIF_PRESENTATION_IDENTITY_MAP_v1.md`.

Every actual media candidate added later needs:
- one locale-neutral media candidate ID;
- RU alt;
- EN alt;
- RU caption where a caption exists;
- EN caption where a caption exists.

Current candidate pools and status:

| Presentation family | Candidate count target | Status |
| --- | ---: | --- |
| `forest/route/logging-road` | 3–5 | REACHABLE_NOW |
| `forest/route/hunter-trail` | 3–5 | PRODUCT_BLOCKED final binding |
| `forest/route/old-boundary` | 3–5 | REACHABLE_NOW route presentation |
| `forest/deep-navigation` | 3–5 | STAGED |
| `forest/challenge/navigation` | 3–5 | STAGED family key |
| `forest/challenge/physical` | 3–5 | STAGED family key |
| `forest/challenge/anomaly` | 3–5 | STAGED family key |
| `forest/result/success` | 3–5 | REACHABLE_NOW |
| `forest/result/escape` | 3–5 | REACHABLE_NOW |
| `forest/result/failure` | 3–5 | REACHABLE_NOW |

The existing result fallback asset is shared:
`assets/stage-forest.svg`.

Its current EN-only media alts in item 117 must be replaced/sidecarred by paired RU+EN alt text in the bilingual draft. Media selection never changes mechanics or result.

## Migration priority

1. **Item 124:** create paired RU+EN route/challenge bank from safe authored prose; keep Hunter and unresolved token mechanics fenced.
2. **Item 125:** create one bilingual result-reaction production draft preserving the exact three result events and exact `activityResult` triggers.
3. **Item 126:** prove bilingual coverage, locale-neutral IDs and no Hard Work drift.
4. **Item 130:** add shared 3–5 candidate media map with paired RU/EN alt/captions.

## Prohibited localization drift

Do not:
- create `.ru` / `.en` gameplay event IDs;
- create separate English Activity outcomes;
- change conditions/effects by locale;
- add locale to save identity;
- reroll presentation candidates on localization change in a way that affects mechanics;
- infer Hunter IDs/source;
- infer Old Boundary Token acquisition or consumption;
- infer challenge thresholds/rewards;
- change `completed_shifts >= 50`;
- change `hardWork:lumber`.

## Item 123 conclusion

Current Forest content has enough authored depth to begin bilingual conversion immediately.

Production-safe first target:
the exact success/escape/failure result-reaction family.

Route/challenge/season prose is also ready for bilingual authoring, while production activation remains governed by the existing READY/STAGED/PRODUCT_BLOCKED boundaries above.
