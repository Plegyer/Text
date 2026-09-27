# Starter Trio Presentation Registry Delta v1

Current-main authority:
- current main: `22772b1439c247d67fdd20c4e3fd55cc2eba4e20`;
- PR34 merge: `712ab6c7368ab21906f3fcb0184b35d4f3e1411c`.

This delta enumerates only starter-trio semantic slots that exist in production/current-main evidence.

## Slot count

Total: **15**
- Lumber: 5;
- Satyr Maid: 5;
- Undead Farm: 5.

Each career has:
- spring shift;
- summer shift;
- autumn shift;
- winter shift;
- stable result/default.

## Lumber

Seasonal shift slots:
- `job/lumber/shift/spring/default`
- `job/lumber/shift/summer/default`
- `job/lumber/shift/autumn/default`
- `job/lumber/shift/winter/default`

Each seasonal slot currently points through its matching `job.lumber.shift.<season>.default` media ID to `assets/stage-lumber.svg`.

Each seasonal shift falls back to:
`location/town/default`.

Result:
`job/lumber/result/default`

The result slot aggregates seasonal Lumber media candidates and, because the shared result slot is first registered from the spring scene, its current semantic fallback chain is:

`job/lumber/result/default -> job/lumber/shift/spring/default -> location/town/default`.

Readiness:
- seasonal shifts: **READY_FOR_GIF**;
- result/default: **OPTIONAL_POLISH**.

## Satyr Maid

PR34 adds seasonal slots:
- `job/satyr-maid/shift/spring/default`
- `job/satyr-maid/shift/summer/default`
- `job/satyr-maid/shift/autumn/default`
- `job/satyr-maid/shift/winter/default`

Current media IDs:
- `stage.tavern.spring`
- `stage.tavern.summer`
- `stage.tavern.autumn`
- `stage.tavern.winter`

All currently resolve to:
`assets/stage-tavern.svg`.

Result:
`job/satyr-maid/result/default`

Current result fallback chain:

`job/satyr-maid/result/default -> job/satyr-maid/shift/spring/default -> location/town/default`.

Readiness:
- seasonal shifts: **READY_FOR_GIF**;
- result/default: **OPTIONAL_POLISH**.

## Undead Farm

PR34 adds seasonal slots:
- `job/undead-farm/shift/spring/default`
- `job/undead-farm/shift/summer/default`
- `job/undead-farm/shift/autumn/default`
- `job/undead-farm/shift/winter/default`

Current media IDs:
- `stage.hunt.spring`
- `stage.hunt.summer`
- `stage.hunt.autumn`
- `stage.hunt.winter`

All currently resolve to:
`assets/stage-forest.svg`.

Result:
`job/undead-farm/result/default`

Current result fallback chain:

`job/undead-farm/result/default -> job/undead-farm/shift/spring/default -> location/town/default`.

Readiness:
- seasonal shifts: **READY_FOR_GIF**;
- result/default: **OPTIONAL_POLISH**.

## Identity separation

Current media reuse does not merge semantic identity:
- Satyr Maid remains `job/satyr-maid/*` despite using tavern media;
- Undead Farm remains `job/undead-farm/*` despite using hunt/Forest media;
- Lumber remains `job/lumber/*`.

## CONTENT_FIRST exclusions

This registry delta intentionally excludes:
- unshipped Satyr Maid milestones/NPC/Night/endings;
- unshipped Undead Farm anomalies/NPC/School/Activity/endings;
- any guessed Hard Work IDs for those two careers.

Those remain **CONTENT_FIRST** outside this 15-slot production delta.

Machine-readable source:
`prior-work/astra/prototype-m3.2/content/starter-trio-presentation-registry-delta.fixture.json`.
