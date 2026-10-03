# C2-237 — Adult core fallback hierarchy

Status: COMPLETE PREP ONLY
Owner: Chat 2 / Presentation + Media
Future adult bindings: PENDING_RUNTIME_ID

## Existing resolver behavior

Current presentation resolver already supports:
- exact slot lookup;
- optional slot `fallbackId` chaining;
- ordered media candidates;
- animation-off static selection;
- missing-media progression in UI;
- safe unknown-ID fallback to `location/town/default`.

Current per-slot media preference is:
- override primary/pool when animation is enabled;
- slot static fallback;
- catalog media;
- chained fallback slot(s).

C2-237 does not change this runtime behavior.

## Required future adult hierarchy

For an exact future adult semantic consumer, use:

1. **exact semantic**
2. **compatible adult family fallback**
3. **safe static for the exact route/context**
4. existing generic safe fallback only if no route-specific safe static exists.

Example architecture:

`exact relationship-adult variant`
-> `relationship-adult family fallback`
-> `exact relationship safe static`
-> safe generic relationship/town static.

## Exact semantic

The first slot must encode the exact authorized meaning:
- profession/route;
- Night/relationship/ending context;
- voluntary vs dependency classification;
- partner/client identity where runtime publishes it.

Adult media may appear here only under exact future authority.

Status:
- `PENDING_RUNTIME_ID`

## Family fallback

Family fallback may reuse semantically equivalent adult media only when it does not erase material identity.

Allowed future family classes:
- work-adult;
- Night-adult;
- relationship-adult;
- route-adult;
- ending-adult.

A family fallback must never cross:
- voluntary -> coercive/dependency;
- dependency -> voluntary;
- relationship -> generic work when partner identity matters;
- ending -> generic work;
- route-specific -> unrelated route.

Status:
- `PENDING_RUNTIME_ID`

## Safe static

Every future adult semantic should have a non-adult safe/static fallback that still describes the actual event or route.

Safe static is not a failure state.

It is the required presentation when:
- animations are disabled;
- adult media is unavailable;
- optional motion fails to load;
- platform/content settings select safe presentation;
- the exact adult asset is absent.

## Safe default protection

Adult media must never be silently attached to an existing safe/default production slot merely because that slot is common.

Forbidden examples:
- putting adult media directly on `job/<career>/result/default`;
- replacing `job/<career>/shift/<season>/default` with adult media;
- adding adult media to a generic relationship stage that has no adult consumer;
- adding adult payoff to a base ending slot without a dedicated authorized adult layer.

Those remain:
- `NO_AUTHORITY_NOT_BINDABLE`

## Missing-media behavior

The UI already advances to the next candidate on media load failure.

Future adult slots should exploit this safely:
- optional adult motion first;
- compatible family motion next if allowed;
- exact safe static next;
- safe chained slot afterward.

No missing adult asset should produce:
- gameplay mutation;
- scene reroll;
- relationship/ending change;
- broken keyboard flow.

## Animation-off behavior

When animations are disabled:
- adult motion is skipped;
- exact safe static remains selected;
- semantic presentation ID remains the same;
- gameplay/result identity remains unchanged.

## Unknown-ID behavior

Unknown presentation IDs already fall back safely.

Future adult architecture must not depend on unknown-ID fallback as a normal routing mechanism.

Every production adult consumer must be explicitly registered.

## Accessibility

Fallback media must keep:
- RU/EN alt/caption;
- exact context naming;
- voluntary/dependency distinction;
- route/partner distinction where material.

Family fallback alt text must not falsely claim a specific partner/route it does not depict.

## Manifest rule

A Chat 6 asset filename can populate an exact/family media candidate only after:
- exact semantic authority exists;
- compatibility is validated;
- fallback chain is defined.

Filename alone never changes the fallback graph.

## Firewall

C2-237 changes no resolver code, runtime IDs, gameplay router, adult eligibility, NightFlow, relationship state, ending state, Save/RNG or asset sourcing.
