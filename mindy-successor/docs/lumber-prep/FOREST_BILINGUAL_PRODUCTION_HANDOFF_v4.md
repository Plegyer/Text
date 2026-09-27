# Forest Bilingual Production Handoff v4

Status: Chat 3 item 135 handoff for Forest localization production work after Lead localization PR #41.

Worker branch:
`chat3/lumber-production-proof-next`.

Integration rule:
**select exact files onto fresh current-main integration branches; do not merge this long-lived branch wholesale.**

## Current Lead localization seam observed

Current `main` includes merged PR #41 at:
`974d6e077ffc511e304a64aef32f2aab81167f41`.

Relevant shared contract:
- bundle: `content/localization.json`;
- shape: `{ version: 1, defaultLocale: "ru", strings: { key: { ru, en? } } }`;
- runtime resolver falls back to Russian;
- locale preference is presentation-only and outside gameplay Save;
- Product contract still requires full English coverage for new content;
- gameplay IDs, mechanics, RNG and Save identity remain locale-neutral.

Chat 3 does not edit this shared seam.

## Production-oriented files

### Strict Forest result pack

`prior-work/astra/prototype-m3.2/content/packs/forest-result-content-bilingual-v2.json`

Properties:
- parses against current strict `packSchema` shape;
- contains no localization sidecar or authoring-only properties;
- uses Russian source/fallback strings;
- preserves existing locale-neutral event identities:
  - `forest-result-content-v1.success`;
  - `forest-result-content-v1.escape`;
  - `forest-result-content-v1.failure`;
- preserves exact result media identities;
- uses existing `assets/stage-forest.svg` fallback;
- all reaction choices have empty mechanical effects.

Exact triggers remain:

`activityResult(lumber.forest, success, lumber.forest.success)`

`activityResult(lumber.forest, escape, lumber.forest.escape)`

`activityResult(lumber.forest, failure, lumber.forest.failure)`

### Production regression

`prior-work/astra/prototype-m3.2/tests/forest-result-bilingual-v2.test.ts`

Authored checks:
- strict `packSchema` parse;
- expected Forest pack/event/media namespace;
- exact three `activityResult` triggers;
- no locale-specific event/media IDs;
- one gameplay event per outcome;
- RU source/fallback matches bilingual source evidence;
- complete EN evidence exists for every new player-facing result field;
- deterministic localization-key projection;
- Lumber Hard Work remains unchanged.

The worker branch handoff does not claim this test was executed against current-main CI.

### Localization migration bundle

`prior-work/astra/prototype-m3.2/content/forest-localization-migration-v1.fixture.json`

Maps current Forest production identities to deterministic localization keys and supplies a ready-to-merge Lead-bundle projection under:

`leadBundlePatch = { version: 1, defaultLocale: "ru", strings: ... }`.

Covered current-main identities:
- Activity `lumber.forest` label;
- option `forest.route.logging-road` label;
- option `forest.route.old-boundary` label;
- result event title/body/choice label/choice body for success/escape/failure;
- result media alt for success/escape/failure.

Coverage:
- RU ready;
- EN ready;
- no fallback debt in this bounded current-production Forest set.

## Deterministic localization keys

Conventions used:

- `activity.<activityId>.label`;
- `activityOption.<optionId>.label`;
- `event.<eventId>.title`;
- `event.<eventId>.variant.<variantId>.text`;
- `event.<eventId>.choice.<choiceId>.label`;
- `event.<eventId>.choice.<choiceId>.text`;
- `media.<mediaId>.alt`.

These keys are presentation identities only. They do not become gameplay IDs or Save keys.

## Current-main Forest production scope

Observed production Activity identity:
`lumber.forest`.

Current production route options:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

Current result identities:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

The bilingual result pack layers reaction presentation on those exact result boundaries. It does not create new outcomes.

## Product-blocked Forest identities remain fenced

### Hunter trail

Content authoring exists in RU+EN, but production binding remains blocked.

Do not infer:
- production option ID;
- clue/public-fact ID;
- navigation capability ID if a new one is needed;
- provider/source;
- threshold/reward.

### Old Boundary Token

Route option/gate already exists.

Still OPEN:
- acquisition source;
- provider;
- price if any;
- retained/consumed/turn-in semantics;
- exact deeper-use policy.

Localization cannot answer these mechanics.

### Challenge families

RU+EN content exists for navigation, physical obstacle and anomaly families.

Still not production identities until explicit:
- challenge IDs;
- route bindings;
- checks/conditions;
- Activity effects/checkpoints;
- rewards if any.

### Seasonal topology

Seasonal presentation content exists.

Production topology still requires explicit option/edge/cost data.

## Multi-GIF boundary

Authoring map:
`docs/lumber-prep/FOREST_SECRET_DEBT_BILINGUAL_MULTI_GIF_MAP_v1.md`.

Forest families have 3–5 shared candidate plans with:
- locale-neutral media candidate IDs;
- RU alt/caption;
- EN alt/caption;
- mechanically inert candidate selection.

Actual presentation/runtime pool support remains Lead/Chat 2 owned.

## Selective integration order

### 1. Localization data

On a fresh branch from current `main`:
- copy/review `forest-localization-migration-v1.fixture.json`;
- merge only its `leadBundlePatch.strings` entries into the shared `content/localization.json`;
- reject key collisions unless the existing value is intentionally identical.

No gameplay file needs to change merely to add the localization entries.

### 2. Strict result pack

Copy:
`content/packs/forest-result-content-bilingual-v2.json`.

If an older `forest-result-content-v1` result-reaction pack is already present on the integration branch, do not load both because they contain the same event IDs. Replace/select one source deliberately.

### 3. Regression

Copy:
`tests/forest-result-bilingual-v2.test.ts`.

Then run:
- content validation;
- targeted Forest bilingual result regression;
- existing Activity/Forest regressions;
- full `npm run check`;
- exact-head CI.

### 4. UI/runtime field consumption

The Lead localization runtime already resolves arbitrary string keys.

Forest scene rendering still needs its presentation call sites to request the deterministic keys when that slice is migrated.

That shared UI/runtime wiring is outside Chat 3 ownership.

Required behavior:
- switching locale changes visible title/body/choice/alt only;
- pending event ID and selected variant stay unchanged;
- no gameplay RNG consumption;
- no duplicated event history.

### 5. Deeper Forest presentation

After the bounded result slice:
- logging-road route presentation can migrate;
- old-boundary route presentation can migrate without deciding token acquisition;
- challenge content waits for concrete production challenge identities;
- Hunter production waits for Product decisions.

## Lumber Hard Work firewall

Still exact:

Eligibility:
ONLY `completed_shifts >= 50`.

Reward:
`hardWork:lumber`.

No School, Forest, relationship, milestone, item or season prerequisite is added by localization.

## Integration conclusion

The bounded Forest result family now has:
- a strict pack-compatible RU source/fallback pack;
- complete RU+EN authoring evidence;
- deterministic Lead-bundle localization keys;
- a targeted contract regression;
- a selective integration path compatible with current `main`.

The remaining Forest blockers are gameplay/content identity decisions, not localization blockers.
