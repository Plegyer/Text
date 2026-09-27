# Forest Route Authored Scene Bank v1

Status: CONTENT_DRAFT scene bank for authoritative Lumber Forest route families.

This file adds prose/presentation-ready content only. It does not change Activity topology, route gates, result identities, thresholds, item acquisition/use rules, or Hard Work.

## Shared Forest boundary

Authoritative Activity:
`lumber.forest`

Authoritative terminal results remain exactly:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Forest entry/resume remains governed by current Activity mechanics.

Hard Work remains completely separate:
`completed_shifts >= 50` only.

## Route A — logging road

Current production option:
`forest.route.logging-road`

Stable route state:
`logging-road`

Status:
**AUTHORITATIVE / SHIPPED ROUTE IDENTITY**

### Scene A1 — fresh wheel ruts

The logging road is wider than the paths around it, but recent wheel ruts have turned the center into two dark channels of mud.

Cut branches lie where crews dragged them aside.

The road is easy to follow because people have already forced the forest to make room for it.

Presentation hook:
`forest/route/logging-road/wheel-ruts`

### Scene A2 — stacked timber

A clearing opens around stacks of cut timber.

The trunks are arranged with practical care rather than ceremony:
- straight pieces together;
- damaged sections off to one side;
- bark and chips trampled into the ground.

Nothing here needs to be mysterious to feel important.

Presentation hook:
`forest/route/logging-road/timber-stack`

### Scene A3 — abandoned work marks

Old chalk marks and axe cuts remain on several trees near the road.

Some point toward completed work.

Others mark trees nobody returned for.

Draft line:

> The road records decisions long after the people who made them have gone home.

Presentation hook:
`forest/route/logging-road/work-marks`

### Scene A4 — road narrows

The engineered road gradually gives up.

Wheel tracks become foot tracks.

Stacked timber disappears.

The heroine can still tell where workers used to pass, but only because the forest has not fully erased the evidence yet.

Presentation hook:
`forest/route/logging-road/narrowing`

## Route B — Hunter trail

Authoritative route concept:
**Hunter trail**

Authoring key:
`hunter-trail`

Production option ID:
**OPEN**

Gate:
**OPEN**, except authoritative shape permits a Hunter-owned public clue and/or navigation capability.

Do not invent:
- public fact ID;
- capability ID;
- Hunter NPC;
- threshold;
- source/provider.

### Scene B1 — tracks beside tracks

A narrow trail crosses animal prints, old boot marks, and places where somebody intentionally stepped on stone instead of soft earth.

The route is readable, but not obvious.

Draft line:

> Someone who knew the forest wanted this path to remain useful without becoming easy to find.

Presentation hook:
`forest/route/hunter-trail/tracks`

### Scene B2 — rubbed bark

At shoulder height, bark has been rubbed smooth on one side of several trees.

Some marks are animal.

Some are deliberate.

The difference matters only if the heroine has an authoritative clue/capability that lets the route be available.

Presentation hook:
`forest/route/hunter-trail/bark-marks`

### Scene B3 — migration crossing

The trail approaches a place where many animal paths converge.

The forest floor is disturbed in several directions.

This scene is especially compatible with the already-directed autumn migration context, but it does not itself create seasonal mechanics.

Presentation hook:
`forest/route/hunter-trail/migration-crossing`

### Scene B4 — quiet observation point

A small rise gives a clear view through the trunks without exposing the observer.

There are no built seats or obvious structures.

Only a place where somebody has spent enough time to flatten the ground.

Presentation hook:
`forest/route/hunter-trail/observation-point`

## Route C — old boundary

Current production option:
`forest.route.old-boundary`

Stable route state:
`old-boundary`

Authoritative route gate:
`itemCapability(enter_old_boundary) present=true`

Locked item/capability identities:
- item `old_boundary_token`;
- capability `enter_old_boundary`.

Still OPEN:
- natural acquisition source;
- price, if any;
- retain/consume/turn-in semantics;
- exact deeper use behavior.

No scene below decides those OPEN mechanics.

### Scene C1 — stones in a line

The first boundary stones are almost invisible under moss.

Once the heroine notices one, the next becomes easier to find.

They form a line that ignores the newer logging road entirely.

Presentation hook:
`forest/route/old-boundary/stones`

### Scene C2 — old cut marks

Several trunks bear shallow marks too weathered to belong to the current crews.

The cuts are deliberate and repeated.

They look less like logging marks than an old instruction about where not to cross.

Presentation hook:
`forest/route/old-boundary/old-marks`

### Scene C3 — boundary clearing

The trees pull back from a small strip of stony ground.

Nothing physically blocks the way.

The sense of a boundary comes from repetition:
- stone;
- mark;
- gap;
- another stone.

The current capability gate determines whether this route is available. Prose does not consume or transform the token.

Presentation hook:
`forest/route/old-boundary/clearing`

### Scene C4 — beyond the markers

Past the clearest boundary markers, the forest becomes less obviously worked.

Old traces remain, but modern paths no longer explain them.

Presentation hook:
`forest/route/old-boundary/beyond-markers`

## Generic deep-forest navigation

Status:
**CONTENT FAMILY, not a new route identity**

Use after any authoritative route reaches a deeper navigation context.

Do not create a fourth terminal result or hidden route ID.

### Scene D1 — canopy closes

The canopy thickens enough that distant landmarks disappear.

Navigation depends on:
- remembered direction;
- route evidence;
- accepted challenge options.

No check formula is selected here.

Presentation hook:
`forest/deep-navigation/closed-canopy`

### Scene D2 — repeated landmarks

A split trunk appears twice.

Or seems to.

The heroine must decide whether:
- the route curved;
- she crossed her own path;
- two trees merely look similar.

Mechanics remain OPEN and belong to the navigation challenge family.

Presentation hook:
`forest/deep-navigation/repeated-landmark`

### Scene D3 — water sound

Running water can be heard before it can be seen.

It may help establish direction or create an obstacle depending on authored topology.

This text alone does not open/close an option.

Presentation hook:
`forest/deep-navigation/water-sound`

### Scene D4 — old human trace

A rusted nail, cut stump, charcoal fragment, or compacted patch of earth proves somebody was here before.

The discovery is narrative unless an explicit authored public fact/result is added later.

Presentation hook:
`forest/deep-navigation/human-trace`

## Route reaction tones

These reusable lines may follow route selection without changing mechanics.

### Logging road

> At least this route was built to be followed.

### Hunter trail

> The path exists, but it expects the traveler to know what counts as a sign.

### Old boundary

> The markers are old enough that following them feels less like taking a road and more like reading one.

### Deep forest

> Direction is still possible. Certainty is not.

## Save/reload authoring contract

When converted into route-specific production presentation:
- selected route identity must already be persisted by Activity;
- reload must show the same route scene family;
- presentation selection must not change route state;
- text/media variation must not reroll a resolved challenge;
- no route scene grants or consumes an item unless explicit mechanics say so.

## Seasonal use

These scenes may receive spring/summer/autumn/winter presentation variants.

Season must not rename stable route identity.

Any season-dependent topology change must come from explicit Activity option conditions, not prose.

## Multi-GIF opportunities

Each stable route can support 3–5 candidates under one semantic gameplay identity.

Suggested pools:
- logging road: wheel ruts / timber stacks / old work marks / narrowing road;
- Hunter trail: tracks / bark marks / migration crossing / observation point;
- old boundary: stones / old marks / clearing / deeper markers;
- deep navigation: canopy / landmarks / water / old traces.

Media candidate selection must never change mechanics.

## OPEN / prohibited invention

Do not choose here:
- Hunter production option ID;
- Hunter clue fact;
- Hunter capability;
- Hunter provider/NPC;
- Old Boundary Token acquisition source;
- Old Boundary Token price;
- Old Boundary Token consume policy;
- navigation success formula;
- route rewards/loot;
- lore discovery fact IDs;
- additional terminal outcomes.

## Locked Lumber firewalls

Hard Work eligibility:
ONLY `completed_shifts >= 50`.

Hard Work reward:
exact `hardWork:lumber`.

Success continuation:
exact `activityResult(lumber.forest, success, lumber.forest.success)`.
