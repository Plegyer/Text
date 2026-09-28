# Current project-owned static coverage v5

Status: COMPLETE / CURRENT_MAIN_82_MAPPINGS

Current main:
`01b31b9ab0d0267d95edf5b5b80638acd63f5c04`.

Root presentation blob:
`d403fe7b367ba4a578ac156a60d03dd301c42281`.

## Current active mappings

Project-owned root semantic static mappings:
`82`.

Unique active physical project-owned sources:
`81`.

The one shared physical source is:
`assets/presentation/school-day-study.svg`,
used by two current School semantic slots.

## Category breakdown

- ordinary career result statics: 10;
- ordinary career seasonal statics: 40;
- current/reachable School statics: 11;
- ordinary-poverty statics: 10;
- Forest result/return statics: 6;
- Foreman statics: 2;
- Forest route statics: 3.

Total:
`82`.

## PR59 checkpoint

Immediately after PR59:
- baseline/current target: 80;
- logging-road route-specific extension: +1;
- total semantic mappings: 81;
- unique active physical sources: 80;
- old-boundary still used neutral physical fallback.

## Current route coverage after PR60

### Neutral default
`activity/forest/route/default`
-> `assets/presentation/forest-route-default-v1.svg`.

Role:
- pre-route neutral presentation;
- final route fallback.

### Logging road
`activity/forest/route/logging-road`
-> `assets/presentation/forest-route-logging-road.svg`.

Shipped by PR59.

### Old boundary
`activity/forest/route/old-boundary`
-> `assets/presentation/forest-route-old-boundary-v3.svg`.

Shipped by PR60.

Thus current route-specific static coverage:
`2 / 2`
current route identities, plus retained neutral route/default.

## Neutral fallback vs route-specific media

Do not count route/default as a third gameplay route.

It is a neutral presentation fallback.

Gameplay routes remain exactly:
- logging-road;
- old-boundary.

Both specific route slots retain safe fallback semantics to route/default at the presentation layer.

## Static vs animation

Real production project-owned GIFs:
`0`.

Production GIF pools:
`0`.

Therefore:
`82 semantic / 81 unique physical`
describes static coverage only.

## Accessibility

Current root localization after later PR61:
714 bilingual keys, missing RU 0, missing EN 0.

Both route-specific statics have complete bilingual accessibility keys.

PR61 changes text/consumers only and does not alter static mapping counts.

## Regression floor

Current run #122 keeps:
- both reviewed Forest route statics;
- route/state locale Save invariance;
- exact Forest results/reactions;
- Old Boundary gate;
- Hard Work lock;
- project-owned static production validation.

## Verdict

Current project-owned static coverage:
- established baseline target: 80/80;
- route-specific extension: 2/2;
- total active semantic mappings: 82;
- unique active physical sources: 81;
- neutral route/default fallback retained;
- real production GIFs: 0.
