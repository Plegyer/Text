# Post-PR59 Forest Route Media Rebase Audit v1

Exact current-main baseline:
`54131488c65302f81b3001abaaa345d21f0281e2`.

Current main commit:
`Merge pull request #59 ... Lead: activate safe Forest logging-road presentation`.

## Current shipped route-static state

### Shared default — SHIPPED

Presentation ID:
`activity/forest/route/default`.

Asset:
`assets/presentation/forest-route-default-v1.svg`.

Role:
neutral fallback when a route-specific static is unavailable.

### Logging road — SHIPPED

Presentation ID:
`activity/forest/route/logging-road`.

Current main asset:
`assets/presentation/forest-route-logging-road.svg`.

Current main localization:
- `presentation.activity.forest.route.logging-road.alt`;
- `presentation.activity.forest.route.logging-road.caption`.

Status:
**SHIPPED_CURRENT**.

### Old boundary — ROOT SLOT NOT YET SHIPPED

Current main has no root slot for:

`activity/forest/route/old-boundary`.

Until activation, route presentation must continue to retain the neutral shared fallback:

`activity/forest/route/default`.

Current main already contains RU+EN localization keys:
- `presentation.activity.forest.route.old-boundary.alt`;
- `presentation.activity.forest.route.old-boundary.caption`.

Therefore the remaining old-boundary work is a presentation-only static activation, not a new localization concept or gameplay route.

## Current safe old-boundary replacement sources

Primary current activation target for this post-PR59 queue:

`assets/presentation/forest-route-old-boundary-v3.svg`.

Why:
- narrow old path;
- weathered stones;
- old markings;
- no constructed entrance/barrier;
- no Hunter/token/challenge/reward/result cue;
- already paired with route-specific slot/accessibility preparation.

Additional corrected source retained on worker branch:

`assets/presentation/forest-route-old-boundary-safe-v1.svg`.

It is also semantically safe, but item 317 explicitly prepares v3 as the current-main activation candidate.

Unsafe older source:

`assets/presentation/forest-route-old-boundary.svg`

must remain source history only.

## Route animation source state

Current route animation source manifest:

`content/presentation-drafts/forest-route-animation-source-manifest-v1.json`.

It records:
- logging-road: 3 source sequences / 12 SVG frames;
- old-boundary: 3 source sequences / 12 SVG frames;
- total: 6 sequences / 24 frames;
- no actual GIF paths.

Additional corrected old-boundary safe sequences also exist on the worker branch, but the current route animation manifest remains the 24-frame source set audited by items 321–322.

## GIF state

Production route GIF files:
**0**.

Production route GIF pools:
**0**.

Exporter dependency integration:
**still Lead-owned / not applied by Chat 2**.

## Rebase consequence

Post-PR59 delta is now small:

1. do not re-add logging-road root media;
2. preserve shared default;
3. activate only old-boundary static when reviewed;
4. reuse current main's old-boundary RU+EN accessibility keys where identical;
5. keep route animation work source-only until exporter approval and real GIF QA.

## Result

- logging-road static: **SHIPPED_CURRENT**;
- shared default: **SHIPPED_CURRENT**;
- old-boundary root static: **READY_REPLACEMENT / NOT ACTIVE**;
- route animation sources: **SOURCE_READY**;
- production route GIFs: **NONE**;
- gameplay/runtime/schema/UI delta required from Chat 2: **NONE**.
