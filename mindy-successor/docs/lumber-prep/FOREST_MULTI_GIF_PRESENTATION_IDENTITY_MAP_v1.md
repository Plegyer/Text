# Forest Multi-GIF Presentation Identity Map v1

Status: presentation-planning map for Forest route, challenge and result content.

Rule:
one gameplay/content identity may own a pool of 3–5 media/GIF candidates. Media selection never changes mechanics, conditions, choices, Activity state, save semantics, timing or result identity.

Static/text fallback remains valid.

## Identity status vocabulary

- **AUTHORITATIVE_ID** — current production/runtime identity exists.
- **AUTHORITATIVE_CONCEPT** — route/family identity is required, but final production ID is still OPEN.
- **FAMILY_PRESENTATION_KEY** — media-planning key only; not a canonical runtime challenge ID.

## Logging road

Status:
**AUTHORITATIVE_ID**

Production option:
`forest.route.logging-road`

Stable route state:
`logging-road`

Presentation family:
`forest/route/logging-road`

Candidate pool:
1. wheel ruts / muddy road;
2. stacked timber clearing;
3. old work/chalk/axe marks;
4. road narrowing into deeper forest;
5. seasonal long-view or snow-covered logging road.

Fallback:
existing Forest/static presentation, including `assets/stage-forest.svg` where used.

Mechanics:
unchanged regardless of selected candidate.

## Hunter trail

Status:
**AUTHORITATIVE_CONCEPT**

Authoring key:
`hunter-trail`

Production option ID:
**OPEN**

Do not create a runtime option ID from this media map.

Presentation-planning family:
`forest/route/hunter-trail`

Candidate pool:
1. overlapping animal/human tracks;
2. bark/rubbed marker close-up;
3. migration crossing;
4. quiet observation rise;
5. seasonal snow/rain trail signs.

Use only after gameplay/content ownership selects the actual Hunter route production identity.

No media candidate implies:
- clue fact;
- capability;
- threshold;
- provider;
- reward.

## Old boundary

Status:
**AUTHORITATIVE_ID**

Production option:
`forest.route.old-boundary`

Stable route state:
`old-boundary`

Authoritative gate:
`itemCapability(enter_old_boundary) present=true`

Presentation family:
`forest/route/old-boundary`

Candidate pool:
1. moss-covered boundary stones;
2. old cut/marker symbols;
3. narrow boundary clearing;
4. markers continuing deeper into forest;
5. seasonal exposed/frozen stone line.

Media must not imply whether `old_boundary_token` is:
- retained;
- consumed;
- turned in;
- purchased;
- obtained from a specific NPC.

Those mechanics remain OPEN.

## Generic deep-forest navigation

Status:
content family, not a fourth route.

Presentation family:
`forest/deep-navigation`

Candidate pool:
1. closed canopy;
2. repeated/similar landmarks;
3. unseen running water;
4. old human trace;
5. ridge or lowland orientation view.

Use under an already-authoritative selected route.

## Navigation challenge family

Status:
**FAMILY_PRESENTATION_KEY**

Final production challenge IDs:
**OPEN**

Media-planning key:
`forest/challenge/navigation`

Candidate pool:
1. split trail;
2. lost horizon/canopy;
3. crossed tracks;
4. washed markers;
5. ridge choice.

Do not bind these assets to a guessed threshold/formula.

When a concrete navigation challenge ID is authored, its semantic presentation identity should own the candidate pool.

## Physical obstacle family

Status:
**FAMILY_PRESENTATION_KEY**

Final production challenge IDs:
**OPEN**

Media-planning key:
`forest/challenge/physical`

Candidate pool:
1. fallen trunk;
2. washed bank/ravine;
3. tangled deadfall;
4. slick stream stones;
5. steep root slope.

Candidate selection does not:
- spend endurance;
- consume rope/tool;
- decide success/failure.

Those remain explicit gameplay mechanics.

## Interpretation / ritual anomaly family

Status:
**FAMILY_PRESENTATION_KEY**

Final production challenge IDs:
**OPEN**

Media-planning key:
`forest/challenge/anomaly`

Candidate pool:
1. tied branch/knot marks;
2. ring of stones;
3. altered sap/sample;
4. source-less repeated sound / atmosphere;
5. moss-covered old symbols.

Media does not imply:
- School Arcana fact;
- Magic threshold;
- sample reward;
- lore truth.

## Seasonal media layers

Season may select presentation candidates after gameplay topology is already authoritative.

### Spring

Candidate treatments:
- wet/muddy route;
- runoff;
- new growth;
- washed markers;
- rain-darkened stones.

### Summer

Candidate treatments:
- dry road;
- bright long view;
- dust/resin;
- open distant route;
- dry deadfall.

### Autumn

Candidate treatments:
- migration tracks;
- fallen leaves;
- heavy logging activity;
- exposed old marks;
- observation point.

### Winter

Candidate treatments:
- snow tracks;
- frozen ruts;
- ice crossing;
- dark boundary stones;
- frozen passage.

Seasonal media never creates topology by itself.

## Success result

Activity result:
`lumber.forest.success`

Reaction content event:
`forest-result-content-v1.success`

Status:
**AUTHORITATIVE_ID**

Presentation family:
`forest/result/success`

Candidate pool:
1. route opening into certainty;
2. recognizable discovered site/result;
3. return path with successful evidence;
4. quiet Forest clearing after resolution;
5. city-edge return carrying the result.

Fallback:
`assets/stage-forest.svg`

Exact Lumber continuation remains:
`activityResult(lumber.forest, success, lumber.forest.success)`.

## Escape result

Activity result:
`lumber.forest.escape`

Reaction content event:
`forest-result-content-v1.escape`

Status:
**AUTHORITATIVE_ID**

Presentation family:
`forest/result/escape`

Candidate pool:
1. retreat along known route;
2. clearing before turning back;
3. difficult crossing abandoned safely;
4. Forest edge regained;
5. daylight/landmark return without success evidence.

Fallback:
`assets/stage-forest.svg`

Escape media must not visually/textually imply success-only discovery.

## Failure result

Activity result:
`lumber.forest.failure`

Reaction content event:
`forest-result-content-v1.failure`

Status:
**AUTHORITATIVE_ID**

Presentation family:
`forest/result/failure`

Candidate pool:
1. blocked/dead-end route;
2. exhausted return;
3. lost opportunity/closed path;
4. bad terrain forcing expedition end;
5. Forest edge after failed attempt.

Fallback:
`assets/stage-forest.svg`

Failure media must remain distinct from voluntary escape.

## Reusable visual pools

Cross-identity asset reuse is allowed when semantics remain clear.

Useful shared pools:
- Forest road / route overview;
- track/marker close-up;
- water/mud/ice obstacle;
- tree/deadfall obstacle;
- old-marker/anomaly detail;
- seasonal canopy;
- Forest edge return.

A reused underlying GIF file may map to multiple semantic IDs only if presentation meaning remains appropriate.

## Presentation fallback

Current item-117 result pack already uses shipped:
`assets/stage-forest.svg`.

Route/challenge authored docs currently have text-ready fallback.

No bespoke GIF is required to make mechanics valid.

## Product-blocked presentation identities

Do not finalize production IDs/media bindings for:
- Hunter route option until its production ID/gate is selected;
- concrete navigation challenge instances;
- concrete physical challenge instances;
- concrete anomaly challenge instances;
- any Old Boundary Token acquisition scene;
- any Hunter provider/clue scene.

Media planning may proceed with family pools, but final semantic binding waits for gameplay/content identity.

## Locked mechanics firewall

Multi-GIF presentation does not alter:
- Activity entry/resume;
- route state;
- item capability ownership/use;
- challenge checks;
- result identity;
- Hard Work;
- Meta rewards;
- exact `activityResult` continuation.
