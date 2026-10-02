# GIF Asset Coverage v1

## Executive coverage

The manifest contains **191 GIF requirements**. **109** can already name an exact current production presentation consumer; **82** are conceptual requirements waiting for a future runtime/presentation ID. Every row starts at `status=NEEDED`.

The counts describe assets, not presentation slots. Reuse is intentional, so consumer coverage is larger than the GIF count.

### Content rating

| Value | GIFs |
|---|---:|
| safe | 160 |
| suggestive | 25 |
| explicit | 6 |

### Priority

| Value | GIFs |
|---|---:|
| P1 | 97 |
| P2 | 48 |
| P0 | 40 |
| P3 | 6 |

### Release need

| Value | GIFs |
|---|---:|
| v1-required | 135 |
| v1-desirable | 47 |
| post-v1 | 9 |


### Coverage by required scene family

| Coverage family | GIFs | Exact production ID | PENDING_RUNTIME_ID | Representative filenames |
|---|---:|---:|---:|---|
| ordinary work | 30 | 30 | 0 | `career-lumber-motion-woodcutting-a.gif`<br>`career-lumber-motion-sawing-a.gif`<br>`career-lumber-motion-stacking-a.gif`<br>`career-satyr-maid-motion-service-a.gif` |
| advanced career work | 44 | 9 | 35 | `career-lumber-motion-safe-stacking-milestone-a.gif`<br>`career-lumber-motion-forest-evidence-return-a.gif`<br>`career-lumber-motion-school-management-a.gif`<br>`career-satyr-maid-motion-arrival-rush-a.gif` |
| combat/danger | 10 | 4 | 6 | `combat-goblin-sparring-a.gif`<br>`hunter-danger-predator-distance-a.gif`<br>`forest-danger-washed-ravine-a.gif`<br>`forest-danger-deadfall-clearing-a.gif` |
| forest/activity | 12 | 11 | 1 | `forest-activity-route-entry-a.gif`<br>`forest-activity-logging-road-a.gif`<br>`forest-activity-hunter-trail-a.gif`<br>`forest-activity-old-boundary-a.gif` |
| ambient/location | 11 | 9 | 2 | `town-ambient-market-day-a.gif`<br>`town-ambient-rain-a.gif`<br>`tavern-ambient-common-room-a.gif`<br>`lumber-ambient-yard-a.gif` |
| school | 10 | 10 | 0 | `school-motion-literacy-and-numbers-a.gif`<br>`school-motion-arcana-a.gif`<br>`school-motion-rhetoric-and-social-a.gif`<br>`school-motion-etiquette-and-presentation-a.gif` |
| poverty | 11 | 11 | 0 | `poverty-motion-cold-rain-a.gif`<br>`poverty-motion-noisy-loading-a.gif`<br>`poverty-motion-muddy-splash-a.gif`<br>`poverty-motion-summer-shade-a.gif` |
| relationships/social | 15 | 12 | 3 | `relationship-lumber-foreman-professional-a.gif`<br>`relationship-lumber-foreman-evening-a.gif`<br>`relationship-satyr-maid-guest-intro-a.gif`<br>`relationship-satyr-maid-guest-night-talk-a.gif` |
| endings | 27 | 12 | 15 | `ending-guild-life-celebration-a.gif`<br>`ending-scholar-life-graduation-a.gif`<br>`ending-lumber-stay-foreman-a.gif`<br>`ending-tavern-stay-innkeeper-a.gif` |
| adult/intimacy | 8 | 0 | 8 | `career-prostitute-intimacy-client-arrival-a.gif`<br>`career-prostitute-intimacy-aftercare-reset-a.gif`<br>`artist-geisha-adult-provocative-performance-a.gif`<br>`relationship-lumber-romance-private-talk-a.gif` |
| explicit career-specific adult content | 6 | 0 | 6 | `career-prostitute-intimacy-professional-a.gif`<br>`career-prostitute-intimacy-professional-b.gif`<br>`career-prostitute-intimacy-professional-c.gif`<br>`career-prostitute-intimacy-regular-client-a.gif` |
| transitions/results | 7 | 1 | 6 | `transition-career-milestone-a.gif`<br>`transition-day-to-night-a.gif`<br>`transition-school-lesson-complete-a.gif`<br>`transition-poverty-recovery-plan-a.gif` |

## Coverage by careers / systems

| Career / system | GIFs |
|---|---:|
| prostitute | 18 |
| hunter | 17 |
| lumber | 13 |
| tavern | 13 |
| assassin | 12 |
| merchant | 12 |
| poverty | 12 |
| school | 12 |
| undead-farm | 12 |
| artist-geisha | 11 |
| guard | 11 |
| satyr-maid | 11 |
| forest | 10 |
| palace | 10 |
| secret-debt | 9 |
| town | 3 |
| base | 1 |
| career-system | 1 |
| ending-system | 1 |
| global | 1 |
| nightflow | 1 |

## Reuse policy applied

| Reuse group | Decision |
|---|---|
| Ordinary career work | Three action loops per career cover recurring work across seasonal default shifts and can cover ordinary Hard Work endings when the work identity remains correct. |
| Satyr Maid / Undead Farm current pools | Keep the six existing final filenames and replace placeholder bytes rather than inventing new names. |
| School Night study | One quiet Night-study loop can cover shared authored Night-study beats when no unique visual action is required. |
| Poverty | Weather/location loops can cover nearby variants when environment and action match; never imply Secret Debt in ordinary poverty media. |
| Relationships | A professional conversation loop can cover adjacent trust/request stages only while setting and consent context stay equivalent. |
| Hard Work endings | No unique GIF is required for every ordinary Hard Work ending; ordinary work pools are explicit reusable consumers. Complex endings keep dedicated one-shots. |

## Adult and intimacy coverage

The ordinary Prostitute career is defined as voluntary professional adult sex work, while its current exact runtime presentation remains non-explicit. The manifest supplies non-explicit/suggestive work assets for current shift/result IDs and multiple separate explicit consensual requirements for future adult-only scene IDs. Explicit variants are not collapsed into one generic requirement.

Secret Debt includes mandatory night sex-work pressure in the design draft, but that context is coercive. It is covered with adult-only, non-explicit/suggestive transition media; the sexual act is deliberately not an asset requirement.

Satyr Maid, Undead Farm, Tavern, Hunter, Guard, and Merchant relationship content in live production packs remains professional/voluntary and is not escalated to explicit intimacy without Git authority.

## Exact binding and pending inventory

**Exact-bindable assets: 109.** Each principal ID was checked against current `presentation.json.slots`.

**Waiting for future IDs: 82.** Pending requirements are concentrated in deeper Artist/Geisha, Assassin, Prostitute branches; Palace; Secret Debt; dedicated transitions; future alternate endings; and explicit adult-only Prostitute scenes.

### Pending assets by system

| System | Pending GIFs |
|---|---:|
| prostitute | 14 |
| palace | 10 |
| secret-debt | 9 |
| assassin | 8 |
| merchant | 8 |
| artist-geisha | 7 |
| hunter | 4 |
| guard | 3 |
| tavern | 3 |
| town | 3 |
| undead-farm | 3 |
| forest | 2 |
| satyr-maid | 2 |
| base | 1 |
| career-system | 1 |
| ending-system | 1 |
| lumber | 1 |
| nightflow | 1 |
| poverty | 1 |

## Current production observations

- `presentation.json` currently exposes 342 semantic slots.
- Current animated bindings are concentrated in Satyr Maid and Undead Farm pools; the six existing GIF basenames remain replacement requirements.
- The UI stage is 16:9 and uses contain-fit, so the manifest standardizes `expected_orientation=landscape-16:9`.
- Artist/Geisha, Assassin, and Prostitute already have basic seasonal shift/result surfaces, but deeper draft milestones and alternate outcome families do not yet have production presentation IDs.
- Palace and Secret Debt are current design-authority concepts without production presentation IDs and therefore remain `PENDING_RUNTIME_ID`.
- No manifest row invents a gameplay ID. A missing semantic surface is recorded only as a concept.
