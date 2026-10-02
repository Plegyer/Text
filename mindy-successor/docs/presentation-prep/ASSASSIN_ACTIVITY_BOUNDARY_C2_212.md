# C2-212 — Assassin Activity / infiltration presentation boundary

Status: COMPLETE PREP ONLY
Owner: Chat 2 / Presentation & Media
Production Activity consumer: PENDING_RUNTIME_ID

## Ordinary Work remains city-side

Current shipped ordinary Assassin work:
- `assassin.shift`
- four seasonal ordinary Work scenes;
- 1 Energy;
- city-side covert work such as observation, delivery, route prep and cleanup.

C2-212 does not reinterpret ordinary Work as an Activity run.

## Draft Activity concepts

The design draft mentions possible use of an Activity adapter for:
- infiltration site;
- remote route;
- target tracking;
- extraction.

These are conceptual only.

Presentation may prepare visual language for:
- route departure;
- field location;
- return/result;
- remote observation;
- extraction/withdrawal.

But no presentation ID is published until a future runtime exposes an exact Activity identity.

## Semantic separation

Ordinary Work:
- `job/assassin/shift/<season>/default`
- city-side;
- routine work.

Future Activity/infiltration:
- must use a dedicated exact runtime-derived presentation identity;
- must not reuse ordinary seasonal shift IDs as if they were route/return states.

## Route boundary

Presentation must not invent:
- Activity option;
- route ID;
- route cost;
- success/failure outcome;
- target tracking state;
- extraction state;
- remote destination;
- return reward.

## Combat boundary

Field/infiltration art must not imply:
- combat encounter;
- weapon attack;
- lethal/nonlethal mechanic;
- target elimination;
- injury state.

Environment, route, observation and withdrawal are the safe default visual language until runtime authority says otherwise.

## Save / determinism boundary

No Activity presentation prep creates persisted state.

If future runtime publishes an Assassin Activity:
- presentation identity must derive deterministically from its exact runtime route/result;
- presentation resolution must not write Save state.

## Future binding status

All future Assassin Activity rows:
- `PENDING_RUNTIME_ID`

## Firewall

C2-212 creates no Activity mechanics, route state, target state, combat state, time cost, reward, Save/RNG, NightFlow, School, Palace access, ending eligibility/reward or Meta.
