# Forest route Old Boundary fallback transition QA v1

Status: COMPLETE / TRANSITION_IMPLEMENTED / GREEN_POST_MERGE_MAIN

Historical pre-PR60 state:
- requested semantic ID `activity/forest/route/old-boundary`;
- persisted routeId `old-boundary`;
- physical resolution through neutral `activity/forest/route/default`.

Current main:
`01b31b9ab0d0267d95edf5b5b80638acd63f5c04`.

Current physical resolution:
`assets/presentation/forest-route-old-boundary-v3.svg`.

Neutral route/default fallback remains retained.

The transition is presentation-only. Before vs after activation, unchanged:
- Activity ID;
- routeId;
- option ID;
- Old Boundary capability gate;
- checkpoint;
- progress/endurance;
- steps;
- accumulated rewards;
- Activity RNG;
- run RNG;
- exact Forest result IDs;
- exact activityResult reactions;
- serialized gameplay Save.

Old Boundary gate remains exactly:
`itemCapability(enter_old_boundary) present=true`.

Accessibility reuses:
- `presentation.activity.forest.route.old-boundary.alt`;
- `presentation.activity.forest.route.old-boundary.caption`.

RU↔EN selects the same physical asset and same semantic presentationId. Only presentation text changes.

If the route-specific override is unavailable, resolution may safely degrade to route/default without changing gameplay state.

Lumber Hard Work remains:
- only `completed_shifts >= 50`;
- meta reward `hardWork:lumber`.

Production proof:
- PR60 exact head `36f933d8c01a249992d84295bc69c3d554bb1f89`;
- run #119: 363/363 PASS;
- merge `2ad9fb8b0572f8903bbf57d144c8c5938023a440`;
- run #120: 363/363 PASS;
- validator 17/46/35/9.

Latest PR61 main retains the same route slot/asset and all route invariance regressions.

Verdict:
`TRANSITION_IMPLEMENTED / GREEN_POST_MERGE_MAIN`.
