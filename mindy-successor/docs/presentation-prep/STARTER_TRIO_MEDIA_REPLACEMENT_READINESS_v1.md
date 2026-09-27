# Starter Trio Media Replacement Readiness v1

Current production reference:
- current main: `22772b1439c247d67fdd20c4e3fd55cc2eba4e20`;
- PR #34 merge: `712ab6c7368ab21906f3fcb0184b35d4f3e1411c`;
- PR34 exact-head CI: **227/227 PASS**.

Scope:
- Lumber;
- Satyr Maid;
- Undead Farm.

No character appearance, art direction, or unshipped gameplay identity is invented.

## Lumber

### Shipped semantic IDs

Seasonal shifts:
- `job/lumber/shift/spring/default`
- `job/lumber/shift/summer/default`
- `job/lumber/shift/autumn/default`
- `job/lumber/shift/winter/default`

Stable result:
- `job/lumber/result/default`

Existing career/relationship surfaces also include shipped milestone/Foreman/Night/ending identities from the existing Lumber production slice.

### Current base media / fallback

Seasonal Lumber shift media IDs:
- `job.lumber.shift.spring.default`
- `job.lumber.shift.summer.default`
- `job.lumber.shift.autumn.default`
- `job.lumber.shift.winter.default`

All currently resolve to:
`assets/stage-lumber.svg`

Result/default inherits the selected seasonal scene media through the presentation resolver and remains semantically stable as `job/lumber/result/default`.

### Missing content identities

No missing identity blocks seasonal shift/result GIF production.

Additional future Lumber career events/routes still depend on authored content where they do not already exist.

### GIFs producible now

Can proceed without Product mechanics decisions:
- spring shift GIF;
- summer shift GIF;
- autumn shift GIF;
- winter shift GIF;
- optional generic/result-oriented Lumber loop if Product wants a dedicated result visual;
- already-authoritative first-shift/Foreman GIF targets.

### Must wait

Only new milestone/NPC/route-specific GIFs whose gameplay/content identities are not yet authored.

### Batch replacement path

1. keep semantic IDs unchanged;
2. import GIF primary per semantic slot;
3. keep `assets/stage-lumber.svg` static fallback;
4. verify animations-off;
5. save/reload smoke;
6. rollback to shipped static mappings;
7. confirm zero gameplay mutation.

---

## Satyr Maid

PR34 added real production action:
`satyr-maid.shift`

and typed career:
`satyr-maid`.

### Shipped semantic IDs

Seasonal shifts:
- `job/satyr-maid/shift/spring/default`
- `job/satyr-maid/shift/summer/default`
- `job/satyr-maid/shift/autumn/default`
- `job/satyr-maid/shift/winter/default`

Stable result:
- `job/satyr-maid/result/default`

### Current base media / fallback

PR34 seasonal scene media:
- spring -> `stage.tavern.spring`
- summer -> `stage.tavern.summer`
- autumn -> `stage.tavern.autumn`
- winter -> `stage.tavern.winter`

All four current media IDs resolve to:
`assets/stage-tavern.svg`.

Result/default remains the stable semantic result identity while the selected seasonal scene provides current media.

### Missing content identities

Still missing for final dedicated media:
- authored milestone/event IDs beyond the first typed transition;
- authored recurring NPC/relationship identities;
- authored voluntary Night event IDs;
- authored ending IDs.

PR34 intentionally does not create guessed Hard Work endings.

### GIFs producible now

Can proceed now:
- four seasonal Satyr Maid shift GIFs or one reusable service loop with seasonal variants;
- optional reusable result presentation using the shipped result ID.

These require no new mechanics.

### Must wait

Wait for authored content before dedicated:
- named NPC/relationship GIFs;
- milestone/event GIFs not yet in production;
- voluntary Night-specific GIFs;
- ending GIFs.

### Batch replacement path

Use exact seasonal/result semantic IDs.

Keep `assets/stage-tavern.svg` as current static fallback.

Replacement may reuse one service loop across multiple semantic IDs, but those IDs remain distinct.

---

## Undead Farm

PR34 added real production action:
`undead-farm.shift`

and typed career:
`undead-farm`.

### Shipped semantic IDs

Seasonal shifts:
- `job/undead-farm/shift/spring/default`
- `job/undead-farm/shift/summer/default`
- `job/undead-farm/shift/autumn/default`
- `job/undead-farm/shift/winter/default`

Stable result:
- `job/undead-farm/result/default`

### Current base media / fallback

PR34 seasonal scene media:
- spring -> `stage.hunt.spring`
- summer -> `stage.hunt.summer`
- autumn -> `stage.hunt.autumn`
- winter -> `stage.hunt.winter`

All four current media IDs resolve to:
`assets/stage-forest.svg`.

This media reuse does not make Undead Farm an Activity/Hunter gameplay identity.

### Missing content identities

Still missing for dedicated media:
- authored anomaly/milestone event IDs;
- authored major NPC/relationship identities;
- authored School-linked continuation IDs;
- authored Activity-return continuation IDs;
- authored ending IDs.

PR34 intentionally does not create guessed Hard Work endings.

### GIFs producible now

Can proceed now:
- four seasonal Undead Farm shift GIFs or one reusable farm-production loop with seasonal variants;
- optional reusable result presentation using the shipped result ID.

### Must wait

Wait for authored content before dedicated:
- anomaly reveal GIFs;
- NPC/relationship GIFs;
- School research continuation GIFs;
- Activity continuation GIFs;
- ending GIFs.

### Batch replacement path

Use exact seasonal/result semantic IDs.

Keep `assets/stage-forest.svg` as current static fallback.

A future farm GIF may replace current presentation without changing:
- `undead-farm.shift`;
- typed career progress;
- save identity;
- seasonal mechanics.

---

## Readiness summary

| Career | Seasonal IDs | result/default | Current static fallback | GIF production now | Waits on authored identities |
| --- | --- | --- | --- | --- | --- |
| Lumber | shipped | shipped | `assets/stage-lumber.svg` | yes | only new unshipped content |
| Satyr Maid | PR34 shipped | PR34 shipped | `assets/stage-tavern.svg` | yes | milestones/NPC/Night/endings |
| Undead Farm | PR34 shipped | PR34 shipped | `assets/stage-forest.svg` | yes | anomaly/NPC/School/Activity/endings |

## Replacement invariant

For all three careers:
- semantic IDs stay unchanged;
- GIF remains presentation-only;
- static fallback remains usable;
- animations-off keeps gameplay identical;
- save/reload never depends on frame/time/playback;
- rollback restores prior mappings.
