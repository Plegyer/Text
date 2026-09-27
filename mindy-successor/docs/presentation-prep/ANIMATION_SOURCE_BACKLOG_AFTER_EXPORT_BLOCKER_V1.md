# Animation Source Backlog After Export Blocker v1

Exact current-main baseline: `d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`.

GIF export remains blocked only by the missing approved reproducible SVG-frame -> animated-GIF toolchain. Frame-source authoring can continue safely.

## Priority backlog

All identities below are current shipped production presentation identities.

| Priority | Semantic presentation ID | Source-static reference | Frame-source goal |
| ---: | --- | --- | --- |
| 1 | `job/lumber/shift/spring/default` | `assets/presentation/career-lumber-shift-spring.svg` | sequence B: distinct work-tool/wood-chip loop |
| 2 | `job/lumber/shift/spring/default` | same | sequence C: distinct foliage/log-handling loop |
| 3 | `job/guard/shift/summer/default` | `assets/presentation/career-guard-shift-summer.svg` | guard idle + pennant/sun/weapon micro-motion |
| 4 | `job/tavern/shift/autumn/default` | `assets/presentation/career-tavern-shift-autumn.svg` | service-counter + vessel/cloth micro-motion |
| 5 | `school/literacy-and-numbers/lesson/default` | `assets/presentation/school-course-literacy-and-numbers.svg` | page/marker/counting-token study loop |
| 6 | `location/town/event/poverty-street-production-helpful-summer/default` | `assets/presentation/poverty-street-helpful-summer.svg` | warm street/help exchange micro-motion |
| 7 | `activity/forest/return/success` | `assets/presentation/forest-return-success-v2.svg` | leaf drift + safe-return idle loop |
| 8 | `relationship/lumber-foreman/lumber-night-foreman-professional/default` | `assets/presentation/foreman-night-voluntary-v2.svg` | fire/ember + calm conversation idle loop |
| 9 | `job/merchant/shift/summer/default` | `assets/presentation/career-merchant-shift-summer.svg` | awning/goods/sun-glint loop |
| 10 | `location/town/event/poverty-pressure-production-cold-rain/default` | `assets/presentation/poverty-pressure-cold-rain.svg` | rain/puddle/cloth loop |
| 11 | `activity/forest/return/escape` | `assets/presentation/forest-return-escape-v2.svg` | controlled-retreat ambient loop |
| 12 | `school/arcana/lesson/default` | `assets/presentation/school-course-arcana.svg` | second distinct rune/page loop |

## Immediate queue

Items 245–252 implement priorities 1–8.

After items 245–246, Lumber spring will have:
- existing sequence A;
- sequence B;
- sequence C.

That gives one current semantic identity **three compatible project-owned source sequences** ready for future encoding once an exporter is approved.

## Invariants

All backlog work:
- uses repository-owned SVG source only;
- keeps exact current presentation identity;
- does not imply reward/effect/eligibility;
- does not select gameplay outcome;
- does not persist frame/timing state;
- remains locale-neutral;
- preserves current static fallback for reduced-motion/animations-off;
- makes no production GIF claim while export remains blocked.

Product-open route-specific Forest assets and staged teacher-specific School identities are excluded.
