# Forest Route Static Source Current Audit v4

Exact current-main baseline audited:
`4223be1f90f15a43938e072bc2171b0de5d2d1aa`.

Scope:
- current shipped shared Forest route/default static source;
- existing Chat 2 logging-road source;
- existing Chat 2 old-boundary source;
- current gameplay route option identities;
- queued Chat3 route-specific presentation semantics.

## Current gameplay / presentation facts

Current `content/definitions.json` contains two Forest Activity route options:

- `forest.route.logging-road` -> route value `logging-road`;
- `forest.route.old-boundary` -> route value `old-boundary`.

Current root production presentation still ships only one shared route static slot:

`activity/forest/route/default`

with:

`assets/presentation/forest-route-default-v1.svg`.

Queued Chat3 route-specific presentation semantics are:

- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`;

with shared fallback:

`activity/forest/route/default`.

Chat 2 must not change route mechanics, entry conditions, Hunter/token/challenge logic, rewards or outcomes.

## Source audit

| Source | Current status | Classification | Reason |
| --- | --- | --- | --- |
| `assets/presentation/forest-route-default-v1.svg` | shipped on current main | **SAFE** | Neutral trail, no route choice, Hunter, token, gate, reward or outcome implication. Correct shared fallback. |
| `assets/presentation/forest-route-logging-road.svg` | worker-only | **REVISE** | Broad work road and log geometry are semantically compatible, but the source predates the normalized route-slot/localization contract and does not clearly distinguish wheel ruts + cut-branch work marks. Replace with v2. |
| `assets/presentation/forest-route-old-boundary.svg` | worker-only | **DO_NOT_SHIP** | Contains two upright structures with a horizontal crosspiece that can read as a constructed gate/barrier. That risks implying a challenge/locked entrance rather than an ordinary old boundary path. Replace with v3. |

## SAFE shared default

`forest-route-default-v1.svg` remains the canonical reduced-motion/static fallback for route-specific candidates.

Allowed meaning:
- neutral Forest travel;
- route not specified;
- result not specified.

It must remain free of:
- Hunter identity;
- token/item cue;
- challenge/gate;
- success/failure/reward cue.

## Logging-road revision requirements

The replacement logging-road visual may show:
- broad dirt logging road;
- paired wheel ruts;
- cut branches;
- ordinary timber/work marks;
- forest edge.

It must not show:
- success/failure;
- reward/coin;
- hidden item;
- route unlock;
- Hunter/challenge cue;
- forced danger outcome.

Decision for old `forest-route-logging-road.svg`:
**REVISE / retain as source history only**.

## Old-boundary revision requirements

The replacement old-boundary visual may show:
- narrow old path;
- old stones / boundary markers;
- weathered natural marks;
- a boundary line implied by stones/terrain.

It must explicitly avoid:
- constructed gate;
- arch;
- barred entrance;
- token/key;
- Hunter;
- challenge/reward imagery;
- success/failure/result cue.

Decision for old `forest-route-old-boundary.svg`:
**DO_NOT_SHIP / retain as source history only**.

## Route-specific activation boundary

The two route-specific semantic IDs are candidate presentation identities for Chat3 route semantics.

Until Lead/Chat3 runtime integration exposes those exact route-specific presentation slots in the production catalog:
- route-specific files remain presentation candidates;
- root production continues to resolve through `activity/forest/route/default`;
- no invented gameplay route or condition is added by Chat 2.

## Audit result

- shared default: **SAFE**;
- old logging-road source: **REVISE**;
- old old-boundary source: **DO_NOT_SHIP**;
- replacement work required: **YES — items 293–294**;
- gameplay/runtime/schema change required from Chat 2: **NO**.
