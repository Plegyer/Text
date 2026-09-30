# Ordinary Work Presentation Fallback Audit v1

Status: C2-33 COMPLETE
Owner: Chat 2 / Presentation & Media
Baseline main: `05fa2d1084a48cab20d42f23885e19ee627d3d09`

## Scope

This audit covers Work/result presentation behavior for the ten current ordinary careers only:

`lumber`, `satyr-maid`, `undead-farm`, `tavern`, `hunter`, `guard`, `merchant`, `artist-geisha`, `assassin`, `prostitute`.

It does not classify career-specific event presentation as stale merely because those event slots are outside the ordinary Work/result surface.

## Current registry chain

For each current target-shaped ordinary career action `<career>.shift`, the presentation registry derives:

- seasonal Work slot: `job/<career>/shift/<season>/default`;
- result slot: `job/<career>/result/default`.

The result slot is shared across seasonal scenes, but current fallback registration has two compatibility shapes because some careers still have a legacy base action before the target `<career>.shift` action.

For Lumber, Tavern, and Guard, the legacy base action registers `job/<career>/result/default` first from its `default` scene. The fallback chain is:

1. `job/<career>/result/default`
2. `job/<career>/shift/default`
3. `location/town/default`

For Satyr Maid, Undead Farm, Hunter, Merchant, Artist-Geisha, Assassin, and Prostitute, the target-shaped action is the first source of the shared result slot. Its first seasonal scene is spring, so the fallback chain is:

1. `job/<career>/result/default`
2. `job/<career>/shift/spring/default`
3. `location/town/default`

Every seasonal shift slot itself falls back to `location/town/default`. These are safety chains, not a statement that default or spring presentation should replace another season. On current main every audited result and seasonal Work slot has its own static override, so normal resolution stops at that exact semantic ID.

## Coverage matrix

| Career | Seasonal Work slots | Result slot | Exact static override | Missing Work/result slot |
| --- | ---: | ---: | ---: | ---: |
| Lumber | 4 | 1 | 5 / 5 | 0 |
| Satyr Maid | 4 | 1 | 5 / 5 | 0 |
| Undead Farm | 4 | 1 | 5 / 5 | 0 |
| Tavern | 4 | 1 | 5 / 5 | 0 |
| Hunter | 4 | 1 | 5 / 5 | 0 |
| Guard | 4 | 1 | 5 / 5 | 0 |
| Merchant | 4 | 1 | 5 / 5 | 0 |
| Artist-Geisha | 4 | 1 | 5 / 5 | 0 |
| Assassin | 4 | 1 | 5 / 5 | 0 |
| Prostitute / Professional | 4 | 1 | 5 / 5 | 0 |

Total audited ordinary Work/result semantic slots: **50**.

Exact current static overrides: **50**.

Missing ordinary Work/result static overrides: **0**.

## Stale-slot audit

No stale ordinary Work/result semantic override was found:

- all current `job/<career>/shift/{spring|summer|autumn|winter}/default` overrides correspond to an existing current `<career>.shift` scene;
- all current `job/<career>/result/default` overrides correspond to an existing current target-shaped career action;
- there is no orphan `job/hunt/...` ordinary-career override competing with the current `hunter` career;
- current Lumber event presentation IDs are valid event surfaces and are not part of this stale Work/result test.

## Root fallback

`location/town/default` has no explicit static override in `content/presentation.json`, but the registry supplies catalog media `stage.town` for that semantic slot. This remains the final generic fallback seam. The intermediate `job/lumber|tavern|guard/shift/default` compatibility slots are likewise registry/catalog-backed legacy surfaces rather than late-career static override requirements.

Because all 50 audited ordinary Work/result slots have exact project-owned static overrides, none currently depends on the generic town fallback in the normal presentation path.

## Result

Ordinary Work/result fallback coverage is complete for all ten current ordinary careers. No gameplay ID, presentation ID, career stage, event, relationship, ending, reward, Save field, or RNG behavior needs to be invented to close the audited Work/result surface.
