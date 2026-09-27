# Forest Seasonal Topology Product-Open Matrix v2

Status: **PRODUCT_OPEN TOPOLOGY / PRESENTATION-READY SEASONAL AUTHORING**.

This matrix separates what can ship today as seasonal presentation from what requires a real authored Activity option/condition decision.

Russian remains the source authoring language; English remains the full second locale.

## Current shipped route boundary

Current production Forest route identities are:
- `forest.route.logging-road` / route state `logging-road`;
- `forest.route.old-boundary` / route state `old-boundary`.

Hunter trail remains an authored concept only. Its production option identity/gate/source are still Product-open.

Current runtime can express deterministic season checks through `calendarSeason`, but this matrix does not add any new Activity option or numeric cost.

## Core rule

**Presentation can vary by season without changing topology.**

A seasonal line, background, GIF candidate, alt/caption, or scene-body variant may ship as presentation-only when:
- the same route remains available;
- the same gameplay option ID is used;
- the same progress/endurance/outcome applies;
- no route edge opens/closes;
- no item/fact/reward changes.

A seasonal topology change requires explicit authored gameplay data. Prose alone must never pretend a route is mechanically closed, cheaper, safer, unlocked, or rewarded differently.

---

## Spring

Authoring direction:
water, mud, washed traces, new growth.

### Logging road

Presentation-only now:
- `forest/season/spring/logging-road/wet-ruts`;
- `forest/season/spring/logging-road/soft-shoulder`;
- wet-rut / soft-ground media candidates;
- RU+EN text describing changed footing.

Current route identity remains:
`forest.route.logging-road`.

Product-open topology decisions:
- whether a shortcut actually closes;
- whether mud changes `enduranceCost`;
- whether a detour becomes a distinct Activity option;
- exact option ID if a detour exists;
- exact numeric cost/progress change.

A real closure/detour would require an explicit option/condition using authoritative spring state, not prose.

### Old boundary

Presentation-only now:
- `forest/season/spring/old-boundary/water-stones`;
- `forest/season/spring/old-boundary/new-growth`;
- wetter stones, exposed moss gaps, early shoots.

Current route identity remains:
`forest.route.old-boundary`.

Product-open:
- whether spring exposes a distinct traversable edge;
- whether any anomaly becomes mechanically available;
- any challenge placement/cost.

Nothing here changes `old_boundary_token` acquisition or use semantics.

### Hunter trail

Presentation authoring exists:
- washed tracks;
- sharpened fresh-vs-old track contrast.

Gameplay use:
**BLOCKED until Hunter production route/gate is decided**.

Spring must not become a substitute Hunter unlock condition.

### Challenge families

Presentation-only:
- navigation: washed markers, stronger water sound;
- physical: mud, washed bank, slippery crossing;
- anomaly: sprouts, fresh sap.

Mechanical changes require explicit accepted challenge IDs plus conditions/costs.

---

## Summer

Authoring direction:
dry routes, longer sightlines, resin/dust, possible heat/fire atmosphere.

### Logging road

Presentation-only now:
- `forest/season/summer/logging-road/dry-ruts`;
- `forest/season/summer/logging-road/resin-dust`;
- dry road / dust / resin media.

Product-open topology:
- whether a longer route becomes available;
- whether heat changes endurance;
- whether any alternate edge exists.

No distance/energy number is selected.

### Old boundary

Presentation-only now:
- `forest/season/summer/old-boundary/exposed-stones`;
- clearer marker line;
- dry-ground media.

The existing old-boundary access gate remains unchanged.

Product-open:
- any new side passage;
- any seasonal challenge attachment.

### Hunter trail

Presentation concept:
- `forest/season/summer/hunter-trail/distant-view`.

Production use remains blocked by unresolved Hunter route identity/gate.

### Challenge families

Presentation-only:
- navigation: ridge sightline, distant landmarks;
- physical: dry deadfall, exposed slope;
- anomaly: resin pattern, heat shimmer as atmosphere.

Product-open:
- fire-risk event/challenge identity;
- probability;
- damage/resource cost;
- any resulting fact/reward.

Do not imply fire mechanics through presentation alone.

---

## Autumn

Authoring direction:
migration, heavier industrial use, fallen leaves exposing or obscuring traces.

### Logging road

Presentation-only now:
- `forest/season/autumn/logging-road/heavy-use`;
- `forest/season/autumn/logging-road/stacked-season`;
- fresh overlapping wheel marks;
- larger temporary timber stacks.

Product-open topology:
- whether heavy use causes a detour;
- whether a route edge is blocked;
- exact cost/option identity if so.

### Old boundary

Presentation-only now:
- `forest/season/autumn/old-boundary/leaf-line`;
- leaf accumulation revealing the stone line.

Product-open:
- whether visibility changes any real challenge condition.

### Hunter trail

Authored autumn presentation is especially rich:
- `forest/season/autumn/hunter-trail/migration-crossing`;
- `forest/season/autumn/hunter-trail/browse-marks`;
- `forest/season/autumn/hunter-trail/waiting-point`.

This is **not** authority to create the Hunter gameplay route.

Open:
- whether autumn migration has any mechanical significance;
- exact Hunter route/gate;
- any migration-specific reward/threshold.

### Challenge families

Presentation-only:
- navigation: crossed migration tracks, denser trail signs;
- physical: leaf-covered footholds, busy logging-road detour atmosphere;
- anomaly: exposed symbols, sample-preservation context.

Sample item/lore/reward remain OPEN.

---

## Winter

Authoring direction:
snow, frozen footing, clearer fresh tracks, possible frozen alternative passage.

### Logging road

Presentation-only now:
- `forest/season/winter/logging-road/frozen-ruts`;
- `forest/season/winter/logging-road/snow-marks`;
- frozen-rut / snow-covered work-mark media.

Product-open topology:
- whether winter increases `enduranceCost`;
- whether any segment becomes unavailable;
- exact numeric change;
- exact option ID if alternate routing exists.

### Old boundary

Presentation-only now:
- `forest/season/winter/old-boundary/dark-stones`;
- snow emphasizing old stones.

Potential topology concept:
`forest/season/winter/old-boundary/frozen-passage`.

The frozen passage is **not production gameplay today**.

To become gameplay it requires:
1. an explicit Activity option/edge ID;
2. deterministic `calendarSeason = winter` condition;
3. explicit relationship to the existing `forest.route.old-boundary` identity;
4. exact `progressDelta` / `enduranceCost` if any;
5. explicit statement that it does not redefine Old Boundary Token acquisition/consume semantics.

### Hunter trail

Presentation concept:
`forest/season/winter/hunter-trail/snow-tracks`.

Snow may make fresh tracks visually clearer. Route availability still depends on the future accepted Hunter gate.

### Challenge families

Presentation-only:
- navigation: snow-covered landmarks, visible fresh tracks;
- physical: frozen stones, icy root slope;
- anomaly: frost patterns, frozen-sample atmosphere.

Mechanical opening/closing/cost changes remain OPEN.

---

## Four-season route matrix

| Route family | Spring | Summer | Autumn | Winter | Can ship presentation-only now? | Mechanical topology decision required? |
| --- | --- | --- | --- | --- | --- | --- |
| logging road | wet ruts / soft shoulder | dry ruts / resin dust | heavy use / stacked season | frozen ruts / snow marks | YES | only if availability/cost/progress changes |
| old boundary | water-stones / new growth | exposed stones | leaf line | dark stones / frozen-passage concept | YES, excluding mechanical frozen passage | YES for any new edge/cost |
| Hunter trail | washed tracks | distant view | migration/browse/waiting point | snow tracks | CONTENT ONLY | YES: route identity/gate first |

## Challenge-season matrix

| Challenge family | Spring | Summer | Autumn | Winter | Presentation-only safe? |
| --- | --- | --- | --- | --- | --- |
| navigation | washed markers / water sound | ridge sightline / distant landmark | migration-track complexity | track clarity vs hidden edges | YES |
| physical | mud / washed bank | deadfall / exposed slope | leaf footing / detour atmosphere | frozen stones / icy slope | YES |
| anomaly | sprouts / fresh sap | resin / heat atmosphere | exposed marks / sample context | frost pattern / frozen sample context | YES |

“Presentation-only safe” means the existing gameplay state is unchanged.

## Deterministic topology decisions still Product-open

The following require explicit Product/content authoring before they can affect gameplay:
- exact seasonal Activity option IDs;
- which route edges open or close;
- shortcut identity;
- winter frozen-passage identity;
- whether summer creates a longer/farther route;
- whether autumn migration changes navigation difficulty;
- exact `calendarSeason` placement in gameplay conditions;
- exact `progressDelta`;
- exact `enduranceCost`;
- any resource/stat consequence;
- any reward/fact/item;
- challenge placement under routes;
- whether a seasonal change persists beyond the Activity.

## What can ship today

Without any gameplay change:
- RU+EN seasonal route prose;
- RU+EN challenge prose;
- locale-neutral semantic presentation IDs;
- shared static/GIF candidate pools;
- RU+EN alt/caption;
- visual wet/dry/leaves/snow treatment.

This layer must resolve from authoritative calendar state but must not change option availability.

## What requires a real Activity option-condition decision

A real gameplay change is required when Product says any of the following:
- “this path exists only in winter”;
- “this shortcut closes in spring”;
- “this route costs more endurance in winter”;
- “summer unlocks a farther path”;
- “autumn migration enables a different challenge”;
- “season changes the reward”.

At that point the production author must add explicit deterministic Activity data using current runtime primitives and tests. Prose is insufficient.

## Locked firewalls

Seasonal work does not change:
- Lumber Hard Work: ONLY `completed_shifts >= 50`;
- reward `hardWork:lumber`;
- exact Forest result identities;
- exact success continuation through `activityResult`;
- Old Boundary Token acquisition/use semantics;
- Hunter route identity/gate/source.

No fake mechanical season difference is authorized by this matrix.
