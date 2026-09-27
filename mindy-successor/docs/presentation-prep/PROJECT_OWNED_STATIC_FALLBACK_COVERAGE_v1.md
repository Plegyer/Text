# Project-Owned Static Fallback Coverage v1

Baseline semantic authority: current `main` `ab53da4059e348734703c2de490e43e94c02b057`.

Classification:
- **UNIQUE_PROJECT_OWNED** — a new original project SVG from items 185–190 is mapped to the surface/family;
- **GENERIC_EXISTING** — production has a real existing static fallback, but it remains generic/reused legacy stage art;
- **MISSING** — no real static fallback is available;
- **PRODUCT_OPEN** — intentionally staged/non-production identity outside the current production routing boundary.

## Ordinary careers

| Surface | Semantic identity | Classification | Static asset |
| --- | --- | --- | --- |
| `lumber` result | `job/lumber/result/default` | UNIQUE_PROJECT_OWNED | `assets/presentation/career-lumber-result.svg` |
| `lumber` seasonal shifts | `job/lumber/shift/{spring,summer,autumn,winter}/default` | GENERIC_EXISTING | `assets/stage-lumber.svg` |
| `satyr-maid` result | `job/satyr-maid/result/default` | UNIQUE_PROJECT_OWNED | `assets/presentation/career-satyr-maid-result.svg` |
| `satyr-maid` seasonal shifts | `job/satyr-maid/shift/{spring,summer,autumn,winter}/default` | GENERIC_EXISTING | `assets/stage-tavern.svg` |
| `undead-farm` result | `job/undead-farm/result/default` | UNIQUE_PROJECT_OWNED | `assets/presentation/career-undead-farm-result.svg` |
| `undead-farm` seasonal shifts | `job/undead-farm/shift/{spring,summer,autumn,winter}/default` | GENERIC_EXISTING | `assets/stage-forest.svg` |
| `tavern` result | `job/tavern/result/default` | UNIQUE_PROJECT_OWNED | `assets/presentation/career-tavern-result.svg` |
| `tavern` seasonal shifts | `job/tavern/shift/{spring,summer,autumn,winter}/default` | GENERIC_EXISTING | `assets/stage-tavern.svg` |
| `hunter` result | `job/hunter/result/default` | UNIQUE_PROJECT_OWNED | `assets/presentation/career-hunter-result.svg` |
| `hunter` seasonal shifts | `job/hunter/shift/{spring,summer,autumn,winter}/default` | GENERIC_EXISTING | `assets/stage-forest.svg` |
| `guard` result | `job/guard/result/default` | UNIQUE_PROJECT_OWNED | `assets/presentation/career-guard-result.svg` |
| `guard` seasonal shifts | `job/guard/shift/{spring,summer,autumn,winter}/default` | GENERIC_EXISTING | `assets/stage-town.svg` |
| `merchant` result | `job/merchant/result/default` | UNIQUE_PROJECT_OWNED | `assets/presentation/career-merchant-result.svg` |
| `merchant` seasonal shifts | `job/merchant/shift/{spring,summer,autumn,winter}/default` | GENERIC_EXISTING | `assets/stage-town.svg` |
| `artist-geisha` result | `job/artist-geisha/result/default` | UNIQUE_PROJECT_OWNED | `assets/presentation/career-artist-geisha-result.svg` |
| `artist-geisha` seasonal shifts | `job/artist-geisha/shift/{spring,summer,autumn,winter}/default` | GENERIC_EXISTING | `assets/stage-tavern.svg` |
| `assassin` result | `job/assassin/result/default` | UNIQUE_PROJECT_OWNED | `assets/presentation/career-assassin-result.svg` |
| `assassin` seasonal shifts | `job/assassin/shift/{spring,summer,autumn,winter}/default` | GENERIC_EXISTING | `assets/stage-town.svg` |
| `prostitute` result | `job/prostitute/result/default` | UNIQUE_PROJECT_OWNED | `assets/presentation/career-prostitute-result.svg` |
| `prostitute` seasonal shifts | `job/prostitute/shift/{spring,summer,autumn,winter}/default` | GENERIC_EXISTING | `assets/stage-room.svg` |

Career summary:
- 10 result identities: **10 UNIQUE_PROJECT_OWNED**;
- 40 seasonal shift identities: **40 GENERIC_EXISTING**;
- missing static fallback: **0**.

The new career result assets do not silently replace the seasonal shift art. Final GIF production may later add variation to shifts while result/default retains its own static fallback.

## Reachable School

| Surface | Semantic identity | Classification | Static asset |
| --- | --- | --- | --- |
| Literacy & Numbers lesson | `school/literacy-and-numbers/lesson/default` | UNIQUE_PROJECT_OWNED | `assets/presentation/school-day-study.svg` |
| Arcana lesson | `school/arcana/lesson/default` | UNIQUE_PROJECT_OWNED | same School day asset |
| Rhetoric & Social lesson | `school/rhetoric-and-social/lesson/default` | UNIQUE_PROJECT_OWNED | same School day asset |
| Etiquette & Presentation lesson | `school/etiquette-and-presentation/lesson/default` | UNIQUE_PROJECT_OWNED | same School day asset |
| Field Craft lesson | `school/field-craft/lesson/default` | UNIQUE_PROJECT_OWNED | same School day asset |
| Physical Training lesson | `school/physical-training/lesson/default` | UNIQUE_PROJECT_OWNED | same School day asset |
| Arts & Performance lesson | `school/arts-and-performance/lesson/default` | UNIQUE_PROJECT_OWNED | same School day asset |
| Body Confidence lesson | `school/body-confidence/lesson/default` | UNIQUE_PROJECT_OWNED | same School day asset |
| generic post-School | `location/town/event/school-lesson-content-v1-after-school/default` | UNIQUE_PROJECT_OWNED | same School day asset |
| generic post-paid-lesson | `location/town/event/school-life-content-v1-after-paid-lesson/default` | UNIQUE_PROJECT_OWNED | same School day asset |
| generic post-Night-study | `location/town/event/school-life-content-v1-after-night-study/default` | UNIQUE_PROJECT_OWNED | `assets/presentation/school-night-study.svg` |

Reachable School production summary:
- **11 UNIQUE_PROJECT_OWNED** semantic mappings;
- **0 MISSING**.

The word “unique” here means project-owned semantic/family-specific art instead of the legacy generic stage asset; the daytime School asset is intentionally reused across compatible School lesson surfaces.

### School Product-open boundary

The following staged teacher media identities remain **PRODUCT_OPEN** and are not promoted by this batch:
- `school/teacher/literacy-and-numbers/classroom`;
- `school/teacher/arcana/classroom`;
- `school/teacher/rhetoric-and-social/classroom`;
- `school/teacher/etiquette-and-presentation/classroom`;
- `school/teacher/field-craft/classroom`;
- `school/teacher/physical-training/classroom`;
- `school/teacher/arts-and-performance/classroom`;
- `school/teacher/body-confidence/classroom`.

## Ordinary poverty

Secret Debt remains excluded.

| Family | Semantic identities | Classification | Static asset |
| --- | --- | --- | --- |
| street | `location/town/event/poverty-street-production-helpful-summer/default`<br>`location/town/event/poverty-street-production-neutral-autumn/default`<br>`location/town/event/poverty-street-production-pressure-winter/default` | UNIQUE_PROJECT_OWNED | `assets/presentation/poverty-street.svg` |
| cheap lodging | `location/town/event/poverty-cheap-production-shared-quiet-autumn/default` | UNIQUE_PROJECT_OWNED | `assets/presentation/poverty-cheap-lodging.svg` |
| recovery/help | `location/town/event/poverty-recovery-production-small-coin-help/default`<br>`location/town/event/poverty-recovery-production-short-cleanup/default`<br>`location/town/event/poverty-recovery-production-herb-bundle/default` | UNIQUE_PROJECT_OWNED | `assets/presentation/poverty-recovery-help.svg` |
| pressure | `location/town/event/poverty-pressure-production-cold-rain/default`<br>`location/town/event/poverty-pressure-production-noisy-loading/default`<br>`location/town/event/poverty-pressure-production-muddy-splash/default` | UNIQUE_PROJECT_OWNED | `assets/presentation/poverty-pressure.svg` |

Poverty summary:
- 10 production semantic IDs: **10 UNIQUE_PROJECT_OWNED**;
- **0 MISSING** in the ordinary-poverty scope.

The four SVGs are family-specific rather than one asset per event; reuse is intentional only within the listed compatible ordinary-poverty family.

## Forest

| Surface | Semantic identity | Classification | Static asset |
| --- | --- | --- | --- |
| Activity route | `activity/forest/route/default` | GENERIC_EXISTING | `assets/stage-forest.svg` |
| Activity return success | `activity/forest/return/success` | UNIQUE_PROJECT_OWNED | `assets/presentation/forest-result-success.svg` |
| PR43 success reaction | `job/lumber/event/forest-result-content-v1-success/default` | UNIQUE_PROJECT_OWNED | same success asset |
| Activity return escape | `activity/forest/return/escape` | UNIQUE_PROJECT_OWNED | `assets/presentation/forest-result-escape.svg` |
| PR43 escape reaction | `job/lumber/event/forest-result-content-v1-escape/default` | UNIQUE_PROJECT_OWNED | same escape asset |
| Activity return failure | `activity/forest/return/failure` | UNIQUE_PROJECT_OWNED | `assets/presentation/forest-result-failure.svg` |
| PR43 failure reaction | `job/lumber/event/forest-result-content-v1-failure/default` | UNIQUE_PROJECT_OWNED | same failure asset |

Forest summary:
- result/reaction mappings: **6 UNIQUE_PROJECT_OWNED**;
- route: **1 GENERIC_EXISTING**;
- no Hunter/Old Boundary semantic was invented.

## Foreman relationship / Night

| Surface | Semantic identity | Classification | Static asset |
| --- | --- | --- | --- |
| professional notice/milestone | `relationship/lumber-foreman/lumber-foreman-notice/default` | UNIQUE_PROJECT_OWNED | `assets/presentation/foreman-professional.svg` |
| professional Night follow-up | `relationship/lumber-foreman/lumber-night-foreman-professional/default` | UNIQUE_PROJECT_OWNED | `assets/presentation/foreman-night-professional.svg` |

Foreman summary:
- **2 UNIQUE_PROJECT_OWNED**;
- **0 MISSING**;
- no new relationship stage or route.

## Aggregate acceptance

Current new manifest:
- physical original SVG assets: **21**;
- mapped current production semantic IDs: **39**.

Across the broader surfaces explicitly audited here:
- UNIQUE_PROJECT_OWNED mappings: **39**;
- GENERIC_EXISTING production mappings called out here: **41** (40 career seasonal shifts + Forest route);
- MISSING: **0** for the targeted static-fallback scope;
- PRODUCT_OPEN: **8** staged School teacher media identities.

## Final static state before GIF production

The project now has a stronger project-owned static layer for:
- every ordinary career result/default;
- all reachable School lesson/generic post-study surfaces;
- all 10 ordinary-poverty event surfaces via four coherent family assets;
- all current Forest success/escape/failure return/reaction surfaces;
- current shipped Foreman professional + Night follow-up.

Final GIF production can happen later without leaving these surfaces dependent only on generic legacy art.
