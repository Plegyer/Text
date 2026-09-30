# Late-Career Presentation Inventory v1

Status: C2-25 COMPLETE
Owner: Chat 2 / Presentation & Media
Baseline main: `05fa2d1084a48cab20d42f23885e19ee627d3d09`

This inventory uses only current gameplay identities. It does not create career stages, events, relationships, endings, conditions, rewards, Save fields, or presentation IDs that are not already derivable from the current catalog.

## Summary

The seven non-starter ordinary career actions currently present on main are:

- `tavern.shift`
- `hunter.shift`
- `guard.shift`
- `merchant.shift`
- `artist-geisha.shift`
- `assassin.shift`
- `prostitute.shift`

Each action currently has the same presentation shape: four seasonal shift semantic IDs and one result semantic ID. All 35 shift/result identities already have project-owned static SVG bindings in `content/presentation.json`, and all 35 have RU/EN alt and caption localization pairs.

## Tavern

| Surface | Semantic presentation ID | Current static binding |
| --- | --- | --- |
| Spring shift | `job/tavern/shift/spring/default` | `assets/presentation/career-tavern-shift-spring.svg` |
| Summer shift | `job/tavern/shift/summer/default` | `assets/presentation/career-tavern-shift-summer.svg` |
| Autumn shift | `job/tavern/shift/autumn/default` | `assets/presentation/career-tavern-shift-autumn.svg` |
| Winter shift | `job/tavern/shift/winter/default` | `assets/presentation/career-tavern-shift-winter.svg` |
| Result | `job/tavern/result/default` | `assets/presentation/career-tavern-result.svg` |

Current gameplay also contains three Tavern endings:
- `tavern-stay` -> semantic presentation identity `ending/tavern-stay`;
- `tavern-guild` -> semantic presentation identity `ending/tavern-guild`;
- `tavern-court` -> semantic presentation identity `ending/tavern-court`.

The presentation registry can derive these ending identities, but `content/presentation.json` currently has no static overrides for them. They are real missing presentation overrides, but C2-26 is explicitly limited to Tavern shift/result coverage, so no ending art is invented in this queue.

There are no current events with `sourceDomain: tavern` and no current Tavern relationship definition.

## Hunter

| Surface | Semantic presentation ID | Current static binding |
| --- | --- | --- |
| Spring shift | `job/hunter/shift/spring/default` | `assets/presentation/career-hunter-shift-spring.svg` |
| Summer shift | `job/hunter/shift/summer/default` | `assets/presentation/career-hunter-shift-summer.svg` |
| Autumn shift | `job/hunter/shift/autumn/default` | `assets/presentation/career-hunter-shift-autumn.svg` |
| Winter shift | `job/hunter/shift/winter/default` | `assets/presentation/career-hunter-shift-winter.svg` |
| Result | `job/hunter/result/default` | `assets/presentation/career-hunter-result.svg` |

No current Hunter-domain event, relationship, or ending gameplay identity exists. Missing Hunter shift/result overrides: **0**.

## Guard

| Surface | Semantic presentation ID | Current static binding |
| --- | --- | --- |
| Spring shift | `job/guard/shift/spring/default` | `assets/presentation/career-guard-shift-spring.svg` |
| Summer shift | `job/guard/shift/summer/default` | `assets/presentation/career-guard-shift-summer.svg` |
| Autumn shift | `job/guard/shift/autumn/default` | `assets/presentation/career-guard-shift-autumn.svg` |
| Winter shift | `job/guard/shift/winter/default` | `assets/presentation/career-guard-shift-winter.svg` |
| Result | `job/guard/result/default` | `assets/presentation/career-guard-result.svg` |

No current Guard-domain event, relationship, or ending gameplay identity exists. Missing Guard shift/result overrides: **0**.

## Merchant

| Surface | Semantic presentation ID | Current static binding |
| --- | --- | --- |
| Spring shift | `job/merchant/shift/spring/default` | `assets/presentation/career-merchant-shift-spring.svg` |
| Summer shift | `job/merchant/shift/summer/default` | `assets/presentation/career-merchant-shift-summer.svg` |
| Autumn shift | `job/merchant/shift/autumn/default` | `assets/presentation/career-merchant-shift-autumn.svg` |
| Winter shift | `job/merchant/shift/winter/default` | `assets/presentation/career-merchant-shift-winter.svg` |
| Result | `job/merchant/result/default` | `assets/presentation/career-merchant-result.svg` |

No current Merchant-domain event, relationship, or ending gameplay identity exists. Missing Merchant shift/result overrides: **0**.

## Artist-Geisha

| Surface | Semantic presentation ID | Current static binding |
| --- | --- | --- |
| Spring shift | `job/artist-geisha/shift/spring/default` | `assets/presentation/career-artist-geisha-shift-spring.svg` |
| Summer shift | `job/artist-geisha/shift/summer/default` | `assets/presentation/career-artist-geisha-shift-summer.svg` |
| Autumn shift | `job/artist-geisha/shift/autumn/default` | `assets/presentation/career-artist-geisha-shift-autumn.svg` |
| Winter shift | `job/artist-geisha/shift/winter/default` | `assets/presentation/career-artist-geisha-shift-winter.svg` |
| Result | `job/artist-geisha/result/default` | `assets/presentation/career-artist-geisha-result.svg` |

No current Artist-Geisha-domain event, relationship, or ending gameplay identity exists. Missing Artist-Geisha shift/result overrides: **0**.

## Assassin

| Surface | Semantic presentation ID | Current static binding |
| --- | --- | --- |
| Spring shift | `job/assassin/shift/spring/default` | `assets/presentation/career-assassin-shift-spring.svg` |
| Summer shift | `job/assassin/shift/summer/default` | `assets/presentation/career-assassin-shift-summer.svg` |
| Autumn shift | `job/assassin/shift/autumn/default` | `assets/presentation/career-assassin-shift-autumn.svg` |
| Winter shift | `job/assassin/shift/winter/default` | `assets/presentation/career-assassin-shift-winter.svg` |
| Result | `job/assassin/result/default` | `assets/presentation/career-assassin-result.svg` |

Current static art remains target-free and preparation-focused. No current Assassin-domain event, relationship, or ending gameplay identity exists. Missing Assassin shift/result overrides: **0**.

## Prostitute / Professional

| Surface | Semantic presentation ID | Current static binding |
| --- | --- | --- |
| Spring shift | `job/prostitute/shift/spring/default` | `assets/presentation/career-prostitute-shift-spring.svg` |
| Summer shift | `job/prostitute/shift/summer/default` | `assets/presentation/career-prostitute-shift-summer.svg` |
| Autumn shift | `job/prostitute/shift/autumn/default` | `assets/presentation/career-prostitute-shift-autumn.svg` |
| Winter shift | `job/prostitute/shift/winter/default` | `assets/presentation/career-prostitute-shift-winter.svg` |
| Result | `job/prostitute/result/default` | `assets/presentation/career-prostitute-result.svg` |

Current static art and accessibility text are non-explicit and limited to room/work-space preparation and completed-work presentation. No current Prostitute-domain event, relationship, or ending gameplay identity exists. Missing Prostitute shift/result overrides: **0**.

## Inventory result

Existing late-career shift/result semantic IDs: **35**.

Existing late-career shift/result static bindings: **35**.

Missing late-career shift/result static bindings: **0**.

Additional current gameplay-derived semantic presentation identities without static overrides: **3 Tavern ending identities**. They are outside the explicitly assigned shift/result coverage tasks C2-26 through C2-32 and remain a documented future presentation dependency rather than invented scope.
