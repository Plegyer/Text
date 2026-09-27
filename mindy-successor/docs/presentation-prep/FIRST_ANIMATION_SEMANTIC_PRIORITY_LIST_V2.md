# First Animation Semantic Priority List v2

Baseline: current production semantic namespace after PR48.

Purpose: choose the first lightweight project-owned animation targets without changing gameplay.

## Ranked first-wave identities

| Priority | Semantic presentation ID | Domain | Production value | Motion suitability | Static source |
| ---: | --- | --- | --- | --- | --- |
| 1 | `job/lumber/shift/spring/default` | ordinary career | Highly repeatable core work surface; already shipped seasonal project-owned static art | Excellent: saw/tool motion, leaves, small worker motion | `assets/presentation/career-lumber-shift-spring.svg` |
| 2 | `school/arcana/lesson/default` | School | Reachable course lesson with strong visual identity and clear non-gameplay animation opportunity | Excellent: rune glow, page/particle drift | `assets/presentation/school-course-arcana.svg` |
| 3 | `location/town/event/poverty-pressure-production-cold-rain/default` | ordinary poverty | Distinct shipped event identity; animation materially improves atmosphere | Excellent: rain streaks, puddle ripple, cloth/hair micro-motion | `assets/presentation/poverty-pressure-cold-rain.svg` |
| 4 | `activity/forest/return/success` | Forest | Clear fixed outcome after gameplay resolution | Good: leaf drift, breathing, subtle pack/branch motion | `assets/presentation/forest-return-success-v2.svg` |
| 5 | `relationship/lumber-foreman/lumber-night-foreman-professional/default` | Foreman | Recurrent relationship/Night presentation with strong ambient-loop value | Good: fire flicker, smoke/ember drift, subtle idle motion | `assets/presentation/foreman-night-voluntary-v2.svg` |
| 6 | `job/merchant/shift/summer/default` | ordinary career | Repeatable career surface and useful second career animation pattern | Good: awning/goods movement, sun shimmer, small hand motion | `assets/presentation/career-merchant-shift-summer.svg` |

## Why priority 1 starts with Lumber spring

The semantic identity is:
- current and shipped;
- frequently repeatable;
- visually readable at low frame count;
- outcome-neutral;
- already backed by a dedicated static fallback;
- compatible with several small loop concepts without implying reward, success, Energy, timing or hidden mechanics.

It is therefore the safest first semantic identity for eventual 3–5 project-owned GIF candidates.

## Why priority 2 is School Arcana

Arcana provides a visually distinct second sequence family:
- mostly stationary composition;
- motion can live in light/runes/page elements;
- no need to animate a complex character action;
- frame differences can be clear while remaining semantically stable.

It also exercises a non-career presentation surface early.

## Deferred from first two frame sequences

Cold rain, Forest success, Foreman Night and Merchant summer remain strong next candidates, but they do not need frame-source production before the first two sequences validate the authoring convention.

## Animation invariants

For every priority identity:
- gameplay event/outcome is already selected before animation;
- animation never selects reward/effect/eligibility;
- animation loop duration never controls gameplay duration;
- locale does not alter frame sequence or future GIF candidate selection;
- reduced-motion/animations-off uses the existing static fallback;
- no Save state stores frame position or animation time.
