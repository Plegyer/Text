# Non-Career Static Coverage Gap Audit v1

Semantic baseline: current `main` `c0763f9f9fa9887593fe8567165bbedce2b6cd3a`.

Scope:
- reachable School;
- ordinary poverty;
- current Forest;
- shipped Foreman relationship/Night.

Classification:
- `UNIQUE_PROJECT_OWNED`: current semantic slot already has a project-authored static asset prepared on the worker branch;
- `GENERIC_EXISTING`: current semantic slot is still backed only by generic/reused shipped stage art;
- `MISSING`: no real static fallback exists;
- `PRODUCT_OPEN`: gameplay/staged identity exists but no distinct current production presentation semantic slot is available for exact mapping.

## Reachable School

| Surface | Current semantic presentation ID | Classification before 209–210 | Current prepared asset |
| --- | --- | --- | --- |
| Literacy & Numbers lesson | `school/literacy-and-numbers/lesson/default` | UNIQUE_PROJECT_OWNED | `assets/presentation/school-day-study.svg` |
| Arcana lesson | `school/arcana/lesson/default` | UNIQUE_PROJECT_OWNED | same generic School-day asset |
| Rhetoric & Social lesson | `school/rhetoric-and-social/lesson/default` | UNIQUE_PROJECT_OWNED | same generic School-day asset |
| Etiquette & Presentation lesson | `school/etiquette-and-presentation/lesson/default` | UNIQUE_PROJECT_OWNED | same generic School-day asset |
| Field Craft lesson | `school/field-craft/lesson/default` | UNIQUE_PROJECT_OWNED | same generic School-day asset |
| Physical Training lesson | `school/physical-training/lesson/default` | UNIQUE_PROJECT_OWNED | same generic School-day asset |
| Arts & Performance lesson | `school/arts-and-performance/lesson/default` | UNIQUE_PROJECT_OWNED | same generic School-day asset |
| Body Confidence lesson | `school/body-confidence/lesson/default` | UNIQUE_PROJECT_OWNED | same generic School-day asset |
| after School | `location/town/event/school-lesson-content-v1-after-school/default` | UNIQUE_PROJECT_OWNED | `assets/presentation/school-day-study.svg` |
| after paid lesson | `location/town/event/school-life-content-v1-after-paid-lesson/default` | UNIQUE_PROJECT_OWNED | `assets/presentation/school-day-study.svg` |
| after Night study | `location/town/event/school-life-content-v1-after-night-study/default` | UNIQUE_PROJECT_OWNED | `assets/presentation/school-night-study.svg` |

Gap for item 209:
the eight course lesson IDs currently share one School-day asset. They have project-owned coverage, but not course-distinct art.

Gap for item 210:
the generic post-Night slot already has a project-owned asset; refinement can replace it with a more specific generic Night-study fallback without creating teacher/course identities.

Teacher-specific staged media identities remain `PRODUCT_OPEN`; they are not current production presentation slots.

## Ordinary poverty

Current ordinary-poverty semantic IDs: **10**.

All 10 already have project-owned family-level coverage from item 188, but several different event identities share the same family asset.

| Event group | Current semantic IDs | Classification before 211–213 | Refinement gap |
| --- | --- | --- | --- |
| street | 3 shipped street event IDs | UNIQUE_PROJECT_OWNED | three events share `poverty-street.svg` |
| cheap lodging | 1 shipped event ID | UNIQUE_PROJECT_OWNED | already one-to-one but may be refined |
| recovery/help | 3 shipped event IDs | UNIQUE_PROJECT_OWNED | three events share `poverty-recovery-help.svg` |
| pressure | 3 shipped event IDs | UNIQUE_PROJECT_OWNED | three events share `poverty-pressure.svg` |

Secret Debt is excluded.

Items 211–213 may make all ten ordinary-poverty event fallbacks one-to-one without changing event mechanics.

## Forest

Current production presentation slots:
- `activity/forest/route/default`;
- `activity/forest/return/success`;
- `activity/forest/return/escape`;
- `activity/forest/return/failure`;
- three PR43 reaction event semantic IDs under the Lumber source domain.

Current worker coverage:
- route/default: `GENERIC_EXISTING` -> `assets/stage-forest.svg`;
- six result/reaction mappings: `UNIQUE_PROJECT_OWNED` via three outcome assets from item 189.

### Important route identity boundary

Current gameplay Activity options include:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

However current `presentationSlots(...)` exposes only one route presentation semantic ID:

`activity/forest/route/default`.

There is **no current separate production presentation ID** for:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

Therefore route-specific art may be authored in item 214, but exact route-specific activation is `PRODUCT_OPEN` until Lead/runtime ownership exposes an existing/current route-specific presentation seam. Chat 2 must not invent those presentation IDs.

## Foreman relationship / Night

| Surface | Current semantic presentation ID | Classification before 216 |
| --- | --- | --- |
| professional notice/milestone | `relationship/lumber-foreman/lumber-foreman-notice/default` | UNIQUE_PROJECT_OWNED |
| professional Night follow-up | `relationship/lumber-foreman/lumber-night-foreman-professional/default` | UNIQUE_PROJECT_OWNED |

Item 216 may refine these assets, but no new relationship route/stage is needed.

## Starting summary for items 209–216

Production semantic slots in the defined non-career scope have **0 MISSING static fallbacks**.

The remaining work is quality/refinement:
- 8 course-distinct School lesson assets;
- 1 refined generic post-Night School asset;
- 10 event-distinct ordinary-poverty assets;
- 2 route-option assets staged as `PRODUCT_OPEN` because current runtime has only route/default;
- Forest return/reaction one-to-one refinement;
- Foreman milestone/Night refinement.

No shared runtime/schema/UI modification is owned by Chat 2.
