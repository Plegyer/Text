# Old Boundary Consumption Handoff v2

Status: C3-63 content-only integration handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `871a9a94e76e1df0449fdef513e9173bd9fce009`.

Source: `forest.old-boundary-depth.v2`.
Handoff: `forest.old-boundary-consumption-handoff.v2`.

All six source variants map only to:
- Activity `lumber.forest`;
- option `forest.route.old-boundary`;
- route `old-boundary`;
- presentation `activity/forest/route/old-boundary`.

The exact existing unlock remains:
`itemCapability: enter_old_boundary, present: true`.

No new unlock value or alternate condition is proposed. As with Logging Road, current UI has route identity and calendar season but no seasonal route-depth selector. Any shared consumer extension belongs to Integration.

Safe fallback remains the current Old Boundary entry/help copy.
