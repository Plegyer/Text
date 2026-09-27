# Remaining Seven Multi-GIF Slot Plan v1

Current authority:
- PR #35 is superseded by PR #36;
- PR #36 head: `d8b60b5fb13e0571c1f04830521d96c8386ffd04`;
- PR #36 is open and mergeable;
- exact-head `mindy-successor check`: **SUCCESS**.

This plan is valid against that exact PR36 head and must be revalidated if the head changes before merge.

Candidate counts are presentation-production planning only, never gameplay rules.

## Common pool pattern

For each seasonal shift surface:
- target: **4 GIF candidates**;
- 2 reusable career-level work loops;
- 2 season/context-specific candidates;
- current static/base media remains fallback;
- one semantic `presentationId` owns the pool.

No Hard Work, ending, NPC, relationship or milestone identity is invented here.

## Tavern

PR36 action:
`tavern.shift`

Seasonal semantic surfaces:
- `job/tavern/shift/spring/default`
- `job/tavern/shift/summer/default`
- `job/tavern/shift/autumn/default`
- `job/tavern/shift/winter/default`

Current media family:
`stage.tavern.<season>` -> `assets/stage-tavern.svg`.

Pool plan per season:
- 2 reusable tavern service loops;
- 2 season-specific service/crowd-context variants;
- target count 4.

## Hunter

PR36 action:
`hunter.shift`

Seasonal semantic surfaces:
- `job/hunter/shift/spring/default`
- `job/hunter/shift/summer/default`
- `job/hunter/shift/autumn/default`
- `job/hunter/shift/winter/default`

Current media family:
`stage.hunt.<season>` -> `assets/stage-forest.svg`.

Pool plan per season:
- 2 reusable ordinary local hunting/work loops;
- 2 season-specific route/work-context variants;
- target count 4.

This ordinary 1-Energy Hunter shift remains distinct from the 2-Energy expedition/Activity layer.

## Guard

PR36 action:
`guard.shift`

Seasonal semantic surfaces:
- `job/guard/shift/spring/default`
- `job/guard/shift/summer/default`
- `job/guard/shift/autumn/default`
- `job/guard/shift/winter/default`

Current media family:
`stage.guard.<season>` -> `assets/stage-town.svg`.

Pool plan per season:
- 2 reusable patrol/duty loops;
- 2 season-specific city-duty variants;
- target count 4.

## Merchant

PR36 action:
`merchant.shift`

Seasonal semantic surfaces:
- `job/merchant/shift/spring/default`
- `job/merchant/shift/summer/default`
- `job/merchant/shift/autumn/default`
- `job/merchant/shift/winter/default`

Current base media:
`stage.town` -> `assets/stage-town.svg`.

Pool plan per season:
- 2 reusable market/appraisal/logistics loops;
- 2 season-specific market/demand variants;
- target count 4.

## Artist / Geisha

PR36 production domain/action:
`artist-geisha.shift`

Seasonal semantic surfaces:
- `job/artist-geisha/shift/spring/default`
- `job/artist-geisha/shift/summer/default`
- `job/artist-geisha/shift/autumn/default`
- `job/artist-geisha/shift/winter/default`

Current media family:
`stage.tavern.<season>` -> `assets/stage-tavern.svg`.

Pool plan per season:
- 2 reusable rehearsal/performance/guest-facing loops;
- 2 season-specific performance/guest-context variants;
- target count 4.

Media reuse with Tavern does not merge semantic identity.

## Assassin

PR36 action:
`assassin.shift`

Seasonal semantic surfaces:
- `job/assassin/shift/spring/default`
- `job/assassin/shift/summer/default`
- `job/assassin/shift/autumn/default`
- `job/assassin/shift/winter/default`

Current base media:
`stage.town` -> `assets/stage-town.svg`.

Pool plan per season:
- 2 reusable surveillance/delivery/preparation loops;
- 2 season/context-specific covert-work variants;
- target count 4.

No target-specific NPC/contract identity is inferred.

## Prostitute

PR36 action:
`prostitute.shift`

Seasonal semantic surfaces:
- `job/prostitute/shift/spring/default`
- `job/prostitute/shift/summer/default`
- `job/prostitute/shift/autumn/default`
- `job/prostitute/shift/winter/default`

Current base media:
`stage.room` -> `assets/stage-room.svg`.

Pool plan per season:
- 2 reusable professional-work context loops;
- 2 season/context-specific variants;
- target count 4.

The PR36 content explicitly describes ordinary voluntary professional work with player agency and boundaries. This plan does not invent clients, relationships or scenes beyond that authority.

## Stable result slots

PR36 presentation tests assert a stable result/default slot for each career:
- `job/tavern/result/default`
- `job/hunter/result/default`
- `job/guard/result/default`
- `job/merchant/result/default`
- `job/artist-geisha/result/default`
- `job/assassin/result/default`
- `job/prostitute/result/default`

If multi-GIF result pools are later desired, a target of 3 reusable completed-work candidates is sufficient; dedicated result media remains optional polish.

## Production gate

Media production against these slots may begin only after:
1. PR36 remains on the same approved head or lands with equivalent identities;
2. semantic slots are rechecked on the landed commit;
3. fallback media still resolves;
4. no later content package renames a career/action domain.

If PR36 is replaced again, treat this plan as stale until revalidated.

## Identity invariant

Across all seven careers:
- one seasonal gameplay scene -> one semantic presentationId;
- 3–5 GIFs may sit under that one ID;
- GIF selection never changes shift effects, wage, Energy, progress, eligibility or save identity;
- missing/disabled GIFs fall back to current static media.
