# Forest Seasonal Context Bank v1

Status: CONTENT_DRAFT seasonal context bank for authoritative Lumber Forest route/challenge families.

This file authors seasonal scene/context variants only. It does not add or modify Activity topology, exact route option IDs, resource costs, thresholds, rewards, or result identities.

## Stable identities

Authoritative/current route contexts:
- logging road — production option `forest.route.logging-road`, route state `logging-road`;
- old boundary — production option `forest.route.old-boundary`, route state `old-boundary`;
- Hunter trail — authoritative route concept / authoring key `hunter-trail`, production option ID still OPEN.

Challenge families:
- navigation;
- physical obstacle;
- interpretation / ritual anomaly.

Terminal results remain:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

## Spring

Authoritative seasonal direction:
- water/mud affects access;
- some short paths close;
- magical sprouts/traces may appear.

### Logging road — spring

Variant S-L1 — wheel-rut water

Meltwater fills the deepest wagon ruts.

The road is still recognizable, but the center is no longer automatically the easiest place to walk.

Presentation hook:
`forest/season/spring/logging-road/wet-ruts`

Variant S-L2 — soft shoulder

The road shoulder looks firm until a boot sinks past the surface crust.

Text may accompany an authored detour/physical option later.

No endurance value is selected.

Presentation hook:
`forest/season/spring/logging-road/soft-shoulder`

### Hunter trail — spring

Only use once Hunter trail production identity/gate is accepted.

Variant S-H1 — washed tracks

Rain has softened old tracks and sharpened newer ones.

The route becomes more dependent on interpretation than on obvious path shape.

Presentation hook:
`forest/season/spring/hunter-trail/washed-tracks`

No Hunter clue fact is invented.

### Old boundary — spring

Variant S-O1 — water between stones

Water collects between old boundary stones and exposes small gaps in the moss.

The route remains the same old-boundary identity.

Presentation hook:
`forest/season/spring/old-boundary/water-stones`

Variant S-O2 — new growth

Pale shoots appear close to one marked stone before similar plants appear elsewhere.

This may support future anomaly content.

It does not create a lore fact by prose.

Presentation hook:
`forest/season/spring/old-boundary/new-growth`

### Spring challenge variants

Navigation:
- washed markers;
- stream sound obscuring other direction cues.

Physical:
- mud;
- washed bank;
- slippery crossing.

Anomaly:
- new sprouts around old marks;
- unusual fresh sap.

Topology rule:
if spring closes a shortcut, the closure must be an explicit authored option condition. This text bank does not choose the option ID.

## Summer

Authoritative seasonal direction:
- distant routes are more available;
- optional fire-risk/event family may appear.

### Logging road — summer

Variant U-L1 — dry long road

The wheel ruts are dry enough to become useful guide lines again.

Heat makes distance feel longer even when footing is easier.

Presentation hook:
`forest/season/summer/logging-road/dry-ruts`

Variant U-L2 — resin and dust

Warm air carries resin, dust, and the smell of cut timber.

Presentation hook:
`forest/season/summer/logging-road/resin-dust`

### Hunter trail — summer

Variant U-H1 — distant view

Sparse undergrowth on a higher section opens a longer view between trunks.

This is compatible with navigation content but does not create a capability.

Presentation hook:
`forest/season/summer/hunter-trail/distant-view`

### Old boundary — summer

Variant U-O1 — exposed stones

Dry ground makes the old marker line easier to see.

The capability gate is unchanged.

Presentation hook:
`forest/season/summer/old-boundary/exposed-stones`

### Summer challenge variants

Navigation:
- long ridge route;
- clearer distant landmark.

Physical:
- dry deadfall;
- steep exposed slope.

Anomaly:
- resin/sap pattern;
- heat-shimmer around old stone or clearing, if authored as atmosphere only.

Optional fire-risk content:
may exist later as an explicit challenge/event family.

This bank does not invent probability, damage, or resource cost.

## Autumn

Authoritative seasonal direction:
- animal migration;
- Hunter trail richer;
- industrial pressure high.

### Logging road — autumn

Variant A-L1 — heavy use

Fresh wheel marks overlap older tracks.

The road feels more industrial than wild.

Presentation hook:
`forest/season/autumn/logging-road/heavy-use`

Variant A-L2 — stacked season

Timber piles are larger and more temporary, as if crews expect everything to move soon.

Presentation hook:
`forest/season/autumn/logging-road/stacked-season`

### Hunter trail — autumn

This is the one explicitly authoritative route-specific seasonal binding.

Variant A-H1 — migration crossing

Many animal tracks overlap at once.

The trail becomes richer in signs and harder to read casually.

Presentation hook:
`forest/season/autumn/hunter-trail/migration-crossing`

Variant A-H2 — fresh browse marks

Branches are stripped or bent at several heights.

Movement through the area is recent.

Presentation hook:
`forest/season/autumn/hunter-trail/browse-marks`

Variant A-H3 — waiting point

A familiar observation rise shows signs of recent use.

No Hunter NPC is introduced.

Presentation hook:
`forest/season/autumn/hunter-trail/waiting-point`

### Old boundary — autumn

Variant A-O1 — leaves reveal the line

Fallen leaves gather differently along the old stone line, making the boundary visible from farther away.

Presentation hook:
`forest/season/autumn/old-boundary/leaf-line`

### Autumn challenge variants

Navigation:
- crossed migration tracks;
- trail-sign density.

Physical:
- leaf-covered footholds;
- busier logging road detours.

Anomaly:
- old symbols exposed by falling leaves;
- preserved plant/sample opportunity if later authored with accepted capability.

No loot/lore is chosen.

## Winter

Authoritative seasonal direction:
- some paths become dangerous or more expensive in endurance;
- frozen passage may open an alternative path.

### Logging road — winter

Variant W-L1 — frozen ruts

Wheel ruts have hardened into uneven ridges.

The road is still obvious.

The footing is not automatically safe.

Presentation hook:
`forest/season/winter/logging-road/frozen-ruts`

Variant W-L2 — snow over work marks

Snow hides smaller industrial traces while leaving large stacks and cut trunks obvious.

Presentation hook:
`forest/season/winter/logging-road/snow-marks`

### Hunter trail — winter

Variant W-H1 — tracks become clearer

Fresh tracks are easier to see and harder to mistake for old ones.

Whether the route itself is available remains governed by the accepted Hunter gate.

Presentation hook:
`forest/season/winter/hunter-trail/snow-tracks`

### Old boundary — winter

Variant W-O1 — dark stones in snow

The old stones stand out against snow where moss and grass once hid them.

The token/capability use semantics remain unchanged and OPEN where unresolved.

Presentation hook:
`forest/season/winter/old-boundary/dark-stones`

Variant W-O2 — frozen side passage

A frozen wet area may make an alternative passage plausible.

If production authors it:
- it must be an explicit option/edge;
- it must have deterministic winter conditions;
- it must preserve the old-boundary route identity.

Exact option ID/cost remains OPEN.

Presentation hook:
`forest/season/winter/old-boundary/frozen-passage`

### Winter challenge variants

Navigation:
- snow-covered landmarks;
- tracks clearer but route edges obscured.

Physical:
- frozen stones;
- snowed root slope;
- optional frozen passage.

Anomaly:
- frost patterns on old symbols;
- preserved/frozen sample context.

No mechanical bonus/penalty is implied by text alone.

## Seasonal challenge pool summary

### Navigation

Spring:
- washed markers;
- water-sound confusion.

Summer:
- long ridge sightline;
- distant route visibility.

Autumn:
- migration-track complexity.

Winter:
- snow track clarity versus hidden path edges.

### Physical obstacle

Spring:
- mud;
- washed bank.

Summer:
- dry deadfall;
- exposed slope.

Autumn:
- leaf-covered footing;
- industrial detour.

Winter:
- ice/frozen stones;
- frozen alternative.

### Interpretation / anomaly

Spring:
- sprouts;
- fresh sap.

Summer:
- resin/heat atmosphere.

Autumn:
- exposed marks;
- preserved sample context.

Winter:
- frost pattern;
- frozen sample context.

## Deterministic topology boundary

Seasonal text may be added freely.

Seasonal mechanics require explicit authored data.

Production topology differences must:
- use authoritative calendar season;
- preserve route identity;
- recompute deterministically after reload;
- never depend on unpersisted random flags.

This bank does not choose:
- exact shortcut IDs;
- exact winter alternative ID;
- exact challenge placement;
- exact Activity endurance/resource delta.

## Multi-GIF opportunities

Each route/challenge may own seasonal media candidates while keeping the same semantic gameplay identity.

Suggested media dimensions:
- wet/dry/snow road;
- spring/autumn Hunter track patterns;
- old-boundary stones by season;
- challenge obstacle weather treatment;
- anomaly lighting/vegetation treatment.

Media selection must not alter option availability or outcome.

## OPEN Product/content identities

Still OPEN:
- Hunter production option ID;
- Hunter clue/capability IDs/source;
- exact seasonal topology option IDs;
- exact seasonal resource costs;
- exact anomaly lore/rewards;
- Old Boundary Token acquisition/use semantics.

## Locked firewalls

Seasonal authoring does not change:
- Hard Work eligibility `completed_shifts >= 50`;
- exact reward `hardWork:lumber`;
- Activity success continuation through exact `activityResult`.
