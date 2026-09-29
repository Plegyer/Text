# Undead Farm Presentation Inventory v1

Status: C2-14 COMPLETE
Owner: Chat 2 / Presentation & Media
Baseline main: `b56628a81098146e7a2fc2c70b193e2587b9f025`

## Current semantic presentation identities

The current Undead Farm production action is `undead-farm.shift`. Presentation semantics are derived by the existing presentation registry; this inventory does not create gameplay IDs.

| Surface | Presentation ID | Current source | Accessibility |
| --- | --- | --- | --- |
| Spring shift | `job/undead-farm/shift/spring/default` | `assets/presentation/career-undead-farm-shift-spring.svg` | RU/EN alt + caption present |
| Summer shift | `job/undead-farm/shift/summer/default` | `assets/presentation/career-undead-farm-shift-summer.svg` | RU/EN alt + caption present |
| Autumn shift | `job/undead-farm/shift/autumn/default` | `assets/presentation/career-undead-farm-shift-autumn.svg` | RU/EN alt + caption present |
| Winter shift | `job/undead-farm/shift/winter/default` | `assets/presentation/career-undead-farm-shift-winter.svg` | RU/EN alt + caption present |
| Shift result | `job/undead-farm/result/default` | `assets/presentation/career-undead-farm-result.svg` | RU/EN alt + caption present |

## Career identity boundary

Current career identity:
- career: `undead-farm`;
- initial stage: `new-hand`;
- current later stage: `reliable-helper`;
- current transition: `first-shift`;
- current transition fact: `first-shift-complete`.

The career transition itself is not a separately emitted presentation slot on current main. Chat 2 therefore does not invent a milestone event or presentation ID for it.

## Event / relationship / ending coverage

Current catalog inspection finds:
- no Undead Farm event with `sourceDomain: undead-farm`;
- no Undead Farm relationship definition;
- no Undead Farm ending definition.

These are absent gameplay/content identities, not missing presentation overrides. They remain outside Presentation/Media ownership until exact production identities exist.

## Missing-slot result

Missing active Undead Farm action/result presentation slots: **0**.

Existing seasonal shift and result identities already have project-owned static sources and localized accessibility metadata. Later event/relationship/ending presentation work is dependency-blocked on exact gameplay/content identities and must not be invented by Chat 2.
