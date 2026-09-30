# Chat 3 Forest + Poverty v7 Candidate Handoff

Status: C3-72 candidate handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Candidate base: `main@32e255f2371e8782c8ad832d7e0811f9afd086da`.

## Scope

This candidate contains C3-61 through C3-71 only.

Delivered:
- current Forest / ordinary-poverty reachability inventory;
- Logging Road consumption handoff v2;
- Old Boundary consumption handoff v2;
- success aftermath consumption handoff v2;
- escape/failure consumption handoff v2;
- poverty housing consumption handoff v2;
- poverty small-job consumption handoff v2;
- poverty contact/recovery consumption handoff v2;
- Secret Debt separation audit v3;
- variant density/duplication audit;
- RU/EN parity + stable-ID + ownership regression v3.

## Current-main revalidation

The candidate is rebuilt from current main after merged PR #114 and after later presentation/UI/localization drift.

That drift was re-audited:
- all 46 queue-v6 source keys remain absent from root localization;
- current `activityNarrative(activityId,routeId)` still consumes only the live Forest entry-body family;
- current `povertyDepth.ts` still selects 42 live production depth keys and none of the queue-v6 source keys;
- queue-v7 handoff mappings therefore remain non-colliding.

## Reachability

PLAYER_FACING:
- Forest entry body;
- Forest route label/help/presentation surfaces;
- terminal Forest success/escape/failure event copy;
- success-only Lumber continuation;
- production poverty event copy;
- the current 42-key poverty-depth rotation.

CONSUMER_READY:
- ordinary-poverty housing depth v2;
- ordinary-poverty small-job depth v2;
- ordinary-poverty contact/recovery depth v2.

These use the existing `povertyDepth.ts` event/variant selector seam and require no new gameplay capability.

PREPARATION_ONLY:
- Logging Road depth v2;
- Old Boundary depth v2;
- success aftermath v2;
- escape/failure aftermath v2.

Their exact IDs are mapped for Integration, but production has no approved selector that chooses those variant keys. Chat 3 does not implement the shared consumer.

## Forest identity contract

All handoffs use only:
- Activity `lumber.forest`;
- `forest.route.logging-road` -> `logging-road`;
- `forest.route.old-boundary` -> `old-boundary`;
- Old Boundary capability `enter_old_boundary`;
- `lumber.forest.success|escape|failure`;
- `forest-result-content-v1.success|escape|failure`;
- success continuation `lumber-cross.activity-forest-return`.

No encounter/challenge/result/capability/world-fact/career-fact/ending identity is added.

Escape/failure retain no Lumber continuation.

## Ordinary poverty contract

All handoffs use exact existing production event/variant identities.

Small-job mappings also carry exact current choice-effect snapshots.

Integration must preserve:
- event/variant selection;
- choice effects;
- core fallback;
- existing occurrence rotation;
- NightFlow/economy/housing state.

No new job/progression, persistent contact/relationship, recovery milestone or housing state is added.

## Secret Debt boundary

Current ordinary-poverty production remains independent from Secret Debt.

The generic `debt` / `repay` / `rent-room` surface remains separate from the planned hidden Secret Debt route.

No exact Secret Debt trigger chance, amount, delay, penalty, reward, threshold, School availability or Activity availability is selected.

## Density / parity

Referenced queue-v6 source strings: 46 RU/EN pairs.

Audit result:
- duplicate localization keys: 0;
- exact duplicate RU texts: 0;
- exact duplicate EN texts: 0;
- no trim required before freeze.

C3-71 verifies:
- stable current IDs;
- source-to-handoff key correspondence;
- RU/EN completeness;
- current effect snapshots;
- no root-localization collision;
- exact Old Boundary capability;
- Secret Debt separation;
- ownership boundaries.

## Production impact

This candidate adds docs, content-side handoff fixtures and one focused test only.

It modifies no existing:
- shared `src/` runtime/UI;
- production definitions/localization/presentation;
- production packs;
- media assets;
- Save/RNG;
- career/relationship state machines;
- NightFlow/economy;
- School;
- ending framework.

## Integration dependency

Forest consumption still needs an approved shared presentation/content selector owned by Chat 1 Developer / Integration. This candidate supplies exact mappings only.

Poverty handoffs are consumer-ready for selective Integration through the existing poverty-depth selector.

Exact frozen head and repository CI are recorded in the PR after creation.
