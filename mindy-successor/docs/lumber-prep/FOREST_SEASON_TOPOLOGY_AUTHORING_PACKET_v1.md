# Forest Season Topology Authoring Packet v1

Status: non-lore-specific seasonal topology contract for Lumber Forest Product Acceptance.

## Purpose

Forest seasons must change topology/options, not only presentation art.

The route identity itself remains stable across seasons:
- logging road;
- hunter trail;
- old boundary path.

Season may change route availability, shortcut availability, challenge availability, Activity-owned endurance/resource cost, alternative path availability, or encounter/challenge pool eligibility.

Season must not silently rename a route or replace its stable identity.

## Shared topology rule

For every season, production authoring must bind at least one explicit route or challenge option difference.

The difference must be represented in authored data/conditions so that:
- the same save + same season yields the same available options;
- save/reload cannot reroll route topology;
- advancing to another season changes topology only through the normal calendar;
- no hidden random flag changes route availability.

Season conditions must be inspectable through the existing calendar-season contract or an equivalent accepted data-owned condition.

## Spring

Authoritative requirements:
- water/mud affects route access;
- some short paths are closed;
- magical sprouts/traces may appear.

Minimum topology authoring:
- bind at least one shortcut/route/challenge availability rule to spring;
- preserve stable route IDs;
- if magical trace content is authored, exact lore/result remains OPEN.

Exact affected runtime option IDs remain OPEN.

## Summer

Authoritative requirements:
- distant routes are available;
- fire risk/event pool may appear.

Minimum topology authoring:
- bind at least one route/challenge option that is more available in summer than in a contrasting season;
- optional fire-risk content may be attached, but exact event/prose/reward is OPEN.

Exact affected runtime option IDs remain OPEN.

## Autumn

Authoritative requirements:
- animal migration;
- Hunter trail is richer;
- industrial pressure is high.

Minimum topology authoring:
- Hunter trail must expose at least one autumn-specific route/challenge/content option difference;
- the route identity remains hunter-trail;
- exact wildlife event, loot and lore remain OPEN.

This is the only route-specific seasonal binding explicitly named by the authoritative design.

## Winter

Authoritative requirements:
- some paths are dangerous or more expensive in endurance;
- a frozen passage may open an alternative path.

Minimum topology authoring:
- bind at least one winter availability or Activity-resource-cost difference;
- if a frozen alternative is authored, it must be an explicit option/route edge rather than a hidden random rule.

Exact path/option IDs remain OPEN.

## Deterministic save/reload contract

A save inside Forest must persist enough state to reproduce the same topology after reload.

Required invariants:
- global calendar season is unchanged by reload;
- selected route identity survives reload;
- already-resolved option IDs survive reload;
- option eligibility recomputes deterministically from season + owned facts/capabilities + persisted Activity state;
- RNG cannot change route availability unless the authored option explicitly represents a resolved random encounter and persists that resolution.

No seasonal route/challenge should become available merely because the player reloads.

## Stable route identity

Seasonal variants do not create unrelated route identities.

Stable authoring keys:
- logging-road;
- hunter-trail;
- old-boundary-path.

A winter alternative or spring closure may change edges/options around those routes, but does not rename the underlying route context.

## Capability interaction

Season and capability conditions may compose.

Allowed contract shapes may combine season with cross_rough_route, enter_old_boundary, or an accepted public fact.

This packet does not decide a specific composed option.

Capability ownership remains inventory/public-state derived, not a hidden seasonal grant.

## What remains OPEN

Do not invent here:
- exact seasonal event IDs;
- prose;
- NPC;
- loot;
- exact endurance values;
- exact route option IDs;
- exact challenge IDs;
- random-event probabilities;
- School/Hunter thresholds;
- item acquisition source.

## Existing Activity result contract

Seasonal topology must not replace terminal result identities:
- lumber.forest.success;
- lumber.forest.escape;
- lumber.forest.failure.

A5 remains exact activityResult.

## Hard Work firewall

Season topology is not a Hard Work prerequisite.

Hard Work remains only completed_shifts >= 50 with exact reward hardWork:lumber.
