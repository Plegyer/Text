# Forest Route Pure Presentation Function Contract v4

Status: minimal pure-function contract for Lead-owned Forest route presentation selection.

Current main:
`3fc5495310e281cf5cbe52da3642000f1cb1fb05`.

The function maps existing authoritative route state to a semantic presentation ID. It does not alter gameplay.

## Function domain

Input:
`routeState: string | null | undefined`.

Authoritative source:
`run.flow.activity.internalState.routeId`
for current Activity `lumber.forest`.

## Required mapping

| Input route state | Output presentation ID |
| --- | --- |
| `null` | `activity/forest/route/default` |
| `undefined` | `activity/forest/route/default` |
| `logging-road` | `activity/forest/route/logging-road` |
| `old-boundary` | `activity/forest/route/old-boundary` |

No locale argument is needed.

No RNG argument is needed.

No Save mutation is permitted.

## Reference behavior

Conceptual behavior:

`presentationIdForForestRoute(routeState)`

returns:
- default for no selected route;
- logging-road semantic ID for exact `logging-road`;
- old-boundary semantic ID for exact `old-boundary`.

For an unknown non-null route state, the implementation must either:
- reject explicitly; or
- return the neutral default as a documented fallback.

It must never invent a new semantic/gameplay route.

## Purity requirements

The mapping must:
- be deterministic;
- read only the provided/current route state;
- write no Save field;
- allocate no gameplay fact;
- consume no global RNG;
- consume no Activity RNG;
- dispatch no command;
- change no route availability;
- change no Activity progress/endurance;
- change no result identity.

## Default-before-selection rule

Before a route option is selected, use:
`activity/forest/route/default`.

The default slot is already shipped on current main with:
`assets/presentation/forest-route-default-v1.svg`.

## Specific-after-selection rule

After authoritative gameplay writes:
`routeId='logging-road'`,
the presentation layer may resolve:
`activity/forest/route/logging-road`.

After authoritative gameplay writes:
`routeId='old-boundary'`,
the presentation layer may resolve:
`activity/forest/route/old-boundary`.

The presentation layer itself must not write those route states.

## Locale invariance

RU and EN use the same input state and same output semantic ID.

Locale affects:
- title/body/help;
- alt/caption.

Locale does not affect:
- function result;
- route ID;
- route state;
- Save;
- RNG;
- Activity result.

## Result invariance

Exact continuations remain:
- success -> `lumber.forest.success`;
- escape -> `lumber.forest.escape`;
- failure -> `lumber.forest.failure`.

The pure function has no authority over result continuation.

## Old Boundary firewall

Input `old-boundary` does not mean:
- consume a token;
- acquire a token;
- show a gate;
- unlock a reward;
- select Hunter knowledge.

It only selects the semantic presentation identity for an already-selected current route.

## Acceptance condition

Given identical route state, the function must return identical presentation ID across:
- locale switches;
- save/reload;
- media availability changes;
- animation settings.

That is the complete contract.
