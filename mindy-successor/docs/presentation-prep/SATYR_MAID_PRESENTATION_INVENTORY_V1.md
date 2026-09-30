# Satyr Maid Presentation Inventory v1

Status: C2-13 COMPLETE
Owner: Chat 2 / Presentation & Media
Baseline main: `32f48d15708a543ee26b90b78761da63b3363da2`

## Current semantic presentation identities

The current Satyr Maid production action is `satyr-maid.shift`. Presentation semantics are derived by the existing presentation registry; this inventory does not create gameplay IDs.

| Surface | Presentation ID | Current source | Accessibility |
| --- | --- | --- | --- |
| Spring shift | `job/satyr-maid/shift/spring/default` | `assets/presentation/career-satyr-maid-shift-spring.svg` | RU/EN alt + caption present |
| Summer shift | `job/satyr-maid/shift/summer/default` | `assets/presentation/career-satyr-maid-shift-summer.svg` | RU/EN alt + caption present |
| Autumn shift | `job/satyr-maid/shift/autumn/default` | `assets/presentation/career-satyr-maid-shift-autumn.svg` | RU/EN alt + caption present |
| Winter shift | `job/satyr-maid/shift/winter/default` | `assets/presentation/career-satyr-maid-shift-winter.svg` | RU/EN alt + caption present |
| Shift result | `job/satyr-maid/result/default` | `assets/presentation/career-satyr-maid-result.svg` | RU/EN alt + caption present |

## Career identity boundary

Current career identity:
- career: `satyr-maid`;
- initial stage: `new-maid`;
- current later stage: `known-face`;
- current transition: `first-shift`;
- current transition fact: `first-shift-complete`.

The career transition itself is not a separately emitted presentation slot on current main. Chat 2 therefore does not invent a milestone event or presentation ID for it.

## Event / relationship / ending coverage

Current catalog inspection finds:
- no Satyr Maid event with `sourceDomain: satyr-maid`;
- no Satyr Maid relationship definition;
- no Satyr Maid ending definition.

These are absent gameplay/content identities, not missing presentation overrides. They remain outside Presentation/Media ownership until Integration/content adds exact production identities.

## Missing-slot result

Missing active Satyr Maid action/result presentation slots: **0**.

Existing seasonal shift and result identities already have project-owned static sources and localized accessibility metadata. Later event/relationship/ending presentation work is dependency-blocked on exact gameplay/content identities and must not be invented by Chat 2.
