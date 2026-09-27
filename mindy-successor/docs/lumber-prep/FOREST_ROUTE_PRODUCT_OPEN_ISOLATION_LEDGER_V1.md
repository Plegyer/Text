# Forest Route Product-Open Isolation Ledger v1

Status: current-main separation of safe Forest route presentation/localization from mechanics and lore that remain Product-open.

Current-main baseline:
`c0763f9f9fa9887593fe8567165bbedce2b6cd3a`.

## Can ship now as presentation/localization

### Existing route labels

Already shipped:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

Already localized RU+EN:
- `activityOption.forest.route.logging-road.label`;
- `activityOption.forest.route.old-boundary.label`.

No gameplay change required.

### Logging-road route prose

Safe presentation source:
`content/forest-logging-road-localization-v2.fixture.json`.

Safe to integrate after shared route-presentation binding exists:
- wheel-ruts scene;
- timber-stack scene;
- work-marks scene;
- narrowing scene;
- route reaction.

Safe semantic presentation ID:
`activity/forest/route/logging-road`.

No conditions, effects, rewards or thresholds are included.

### Old-boundary route prose

Safe presentation source:
`content/forest-old-boundary-localization-v2.fixture.json`.

Safe to integrate after shared route-presentation binding exists:
- boundary stones scene;
- old marks scene;
- clearing scene;
- beyond-markers scene;
- route reaction.

Safe semantic presentation ID:
`activity/forest/route/old-boundary`.

The current gameplay route and current capability gate remain authority.

### Static route fallback

Safe existing asset:
`assets/stage-forest.svg`.

It may be reused as a neutral static fallback without claiming new bespoke route art.

### Forest result presentation

Already shipped:
- success;
- escape;
- failure.

Exact Activity result identities remain:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Exact reaction boundary remains:
`activityResult(lumber.forest, <outcome>, <exact result id>)`.

### Presentation replacement source

Safe staging fixture:
`content/forest-route-presentation-replacement-v1.fixture.json`.

It maps only:
- `logging-road` -> `activity/forest/route/logging-road`;
- `old-boundary` -> `activity/forest/route/old-boundary`.

That mapping is presentation-only and must occur after authoritative route selection.

---

# Shared integration still required

## Route-specific presentation consumer

Current UI requests:
`activity/forest/route/default`
for the active Forest Activity regardless of selected route state.

Lead/Chat 1 still owns the shared consumer change that would:
1. read the already-selected route state;
2. map it to a semantic presentation ID;
3. resolve localized route text/media;
4. leave Activity state, RNG, Save and outcome unchanged.

No new gameplay route is needed.

## Route-scene text selection

Product does **not** need to choose mechanics for safe route prose to exist, but Lead still needs a presentation policy:
- fixed scene;
- ordered presentation variation;
- deterministic presentation-only candidate selection;
- reload-stable candidate selection.

This policy must not use gameplay RNG.

---

# Product-open: Hunter route

Current production does **not** contain a Hunter Forest route.

Still open:
- production Activity option ID;
- route-state identity;
- access condition family;
- clue/public-fact identity;
- item capability identity if any;
- provider/source;
- Hunter-career relationship if any;
- threshold;
- reward;
- challenge binding;
- seasonal mechanical behavior.

Authoring-only source:
`FOREST_HUNTER_TRAIL_PRODUCT_OPEN_STAGING_v3.md`.

Do not infer a production ID such as `forest.route.hunter-trail` from prose.

---

# Product-open: Old Boundary token acquisition/use

Current production fact only:
`old_boundary_token` currently provides capability `enter_old_boundary`.

Current route condition only:
`itemCapability(enter_old_boundary) present=true`.

Still open:
- where the token is naturally acquired;
- whether it is purchased;
- any price;
- whether multiple providers exist;
- whether entry consumes it;
- whether it is retained;
- whether it is turned in;
- whether deeper Forest content consumes/changes it;
- whether it has lore consequences.

Route localization must not answer these questions.

The current engine behavior may retain the item during route selection, but that observed implementation behavior is not Product authority for future token semantics.

---

# Product-open: challenge thresholds/rewards

Authored challenge families:
- navigation;
- physical obstacle;
- interpretation / ritual anomaly.

Machine-readable staging:
- `forest-navigation-challenge-staging-v1.fixture.json`;
- `forest-physical-challenge-staging-v1.fixture.json`;
- `forest-anomaly-challenge-staging-v1.fixture.json`.

Still open for each family:
- production challenge ID;
- route binding;
- exact condition;
- exact threshold;
- exact `progressDelta`;
- exact `enduranceCost`;
- exact reward;
- item/fact consequence;
- persistence;
- challenge frequency/placement.

Current runtime primitives being technically capable of a rule does not make that rule selected.

---

# Product-open: School Arcana provider

Anomaly authoring may conceptually use School Arcana knowledge.

Still open:
- exact public world-fact ID;
- exact provider lesson/result;
- exact School threshold if any;
- whether School Arcana is mandatory or one alternative;
- whether Magic/Reason can substitute;
- what the knowledge reveals;
- any reward unlocked by interpretation.

Do not invent a School fact ID or provider from authoring prose.

---

# Product-open: seasonal mechanical topology

Presentation-safe today:
- spring wet/mud treatment;
- summer dry/heat treatment;
- autumn leaves/migration imagery;
- winter snow/frozen imagery.

Still open mechanically:
- seasonal route closures;
- seasonal shortcuts;
- winter frozen passage;
- spring detour;
- season-specific `progressDelta`;
- season-specific `enduranceCost`;
- season-specific rewards;
- challenge availability changes.

Authoring source:
`FOREST_SEASONAL_TOPOLOGY_PRODUCT_OPEN_MATRIX_v2.md`.

Seasonal prose/media must not fake a topology change that gameplay has not authored.

---

# Product-open: deeper lore outcomes

Safe presentation can show:
- old human marks;
- unusual stone placement;
- altered sap;
- repeated symbols;
- unexplained sound;
- traces of previous Forest use.

Still open:
- what any anomaly objectively means;
- who created old marks;
- whether old-boundary signs are legal, ritual, magical, territorial, or practical;
- exact Hunter source/history;
- exact School Arcana interpretation;
- deeper route reward;
- persistent world fact;
- lore ending;
- external dependency.

Presentation should preserve ambiguity where Product has not selected truth.

---

# Locked non-open invariants

These are not Product-open and must remain exact.

## Lumber Hard Work

Eligibility:
ONLY `completed_shifts >= 50`.

Reward:
`hardWork:lumber`.

No route/challenge/item/School/relationship prerequisite.

## Forest result identities

Exact:
- success -> `lumber.forest.success`;
- escape -> `lumber.forest.escape`;
- failure -> `lumber.forest.failure`.

## Current route identities

Exact:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

No third route may be created by presentation work.

---

# Isolation rule

A Forest content artifact is safe for current integration only when all of the following are true:

1. it references an already-shipped gameplay identity;
2. it changes presentation/localization only;
3. RU+EN share the same locale-neutral key/identity;
4. it contains no selected threshold/reward/mechanical condition beyond current authority;
5. media selection cannot alter gameplay;
6. it does not infer Hunter semantics;
7. it does not infer Old Boundary token semantics;
8. it does not establish School Arcana lore authority;
9. it does not fake seasonal topology;
10. it does not define deeper lore truth.

If any condition fails, the artifact remains Product-open/staging.

## Ledger conclusion

Current Forest route work can safely advance on:
- logging-road bilingual prose;
- old-boundary bilingual prose;
- semantic presentation IDs for those two shipped route states;
- static fallback reuse;
- shared presentation binding.

Hunter, token semantics, challenge mechanics, School Arcana provider, seasonal topology and deeper lore outcomes remain isolated and Product-open.
