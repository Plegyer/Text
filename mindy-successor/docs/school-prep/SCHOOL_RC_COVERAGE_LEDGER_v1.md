# School RC Coverage Ledger v1

Status: release-candidate coverage ledger for Chat 5 School.

Classification:
- **SHIPPED** — accepted mechanics/identity/boundary contract is ready;
- **QA_ONLY** — regression/compatibility evidence, not product authoring;
- **OPEN_AUTHORING** — final content decision intentionally unresolved;
- **CONTENT_DEPTH_ONLY** — presentation depth, not a mechanics blocker.

## Paid course coverage

| Course | Track | Semantic presentation | Class |
|---|---|---|---|
| `school.course.literacy_and_numbers` | `school.track.literacy_and_numbers` | `school/literacy-and-numbers/lesson/default` | SHIPPED |
| `school.course.arcana` | `school.track.arcana` | `school/arcana/lesson/default` | SHIPPED |
| `school.course.rhetoric_and_social` | `school.track.rhetoric_and_social` | `school/rhetoric-and-social/lesson/default` | SHIPPED |
| `school.course.etiquette_and_presentation` | `school.track.etiquette_and_presentation` | `school/etiquette-and-presentation/lesson/default` | SHIPPED |
| `school.course.field_craft` | `school.track.field_craft` | `school/field-craft/lesson/default` | SHIPPED |
| `school.course.physical_training` | `school.track.physical_training` | `school/physical-training/lesson/default` | SHIPPED |
| `school.course.arts_and_performance` | `school.track.arts_and_performance` | `school/arts-and-performance/lesson/default` | SHIPPED |
| `school.course.body_confidence` | `school.track.body_confidence` | `school/body-confidence/lesson/default` | SHIPPED |

All eight paid courses retain their locked tuition, 1 current-day Energy cost, full stat package, and no ordinary Lust mutation.

## Night-study coverage

| Choice | Course | Stat | Class |
|---|---|---|---|
| `school.night_study.literacy_and_numbers.reason` | `school.course.literacy_and_numbers` | reason | SHIPPED |
| `school.night_study.literacy_and_numbers.wits` | `school.course.literacy_and_numbers` | wits | SHIPPED |
| `school.night_study.arcana.magic` | `school.course.arcana` | magic | SHIPPED |
| `school.night_study.arcana.reason` | `school.course.arcana` | reason | SHIPPED |
| `school.night_study.arcana.creativity` | `school.course.arcana` | creativity | SHIPPED |
| `school.night_study.rhetoric_and_social.charm` | `school.course.rhetoric_and_social` | charm | SHIPPED |
| `school.night_study.rhetoric_and_social.sociability` | `school.course.rhetoric_and_social` | sociability | SHIPPED |
| `school.night_study.rhetoric_and_social.wits` | `school.course.rhetoric_and_social` | wits | SHIPPED |
| `school.night_study.etiquette_and_presentation.manners` | `school.course.etiquette_and_presentation` | manners | SHIPPED |
| `school.night_study.etiquette_and_presentation.grooming` | `school.course.etiquette_and_presentation` | grooming | SHIPPED |
| `school.night_study.etiquette_and_presentation.charm` | `school.course.etiquette_and_presentation` | charm | SHIPPED |
| `school.night_study.field_craft.dexterity` | `school.course.field_craft` | dexterity | SHIPPED |
| `school.night_study.field_craft.wits` | `school.course.field_craft` | wits | SHIPPED |
| `school.night_study.field_craft.creativity` | `school.course.field_craft` | creativity | SHIPPED |
| `school.night_study.physical_training.strength` | `school.course.physical_training` | strength | SHIPPED |
| `school.night_study.physical_training.endurance` | `school.course.physical_training` | endurance | SHIPPED |
| `school.night_study.physical_training.dexterity` | `school.course.physical_training` | dexterity | SHIPPED |
| `school.night_study.arts_and_performance.creativity` | `school.course.arts_and_performance` | creativity | SHIPPED |
| `school.night_study.arts_and_performance.charm` | `school.course.arts_and_performance` | charm | SHIPPED |
| `school.night_study.arts_and_performance.sociability` | `school.course.arts_and_performance` | sociability | SHIPPED |
| `school.night_study.arts_and_performance.dexterity` | `school.course.arts_and_performance` | dexterity | SHIPPED |
| `school.night_study.body_confidence.sexuality` | `school.course.body_confidence` | sexuality | SHIPPED |
| `school.night_study.body_confidence.grooming` | `school.course.body_confidence` | grooming | SHIPPED |
| `school.night_study.body_confidence.endurance` | `school.course.body_confidence` | endurance | SHIPPED |

All 24 choices preserve:
- normal/cheap availability contract;
- street restriction contract;
- tuition 0;
- current-day Energy 0;
- +2 supported stat;
- next-day Energy -1;
- one Night slot;
- typed `night_study_sessions +1` ownership.

## Typed School progress

| Field | Owner | Class | Locked semantics |
|---|---|---|---|
| `lessons_completed` | School track | SHIPPED | paid lesson +1 exactly once; Night study +0 |
| `night_study_sessions` | School track | SHIPPED | Night study +1 exactly once; paid lesson +0 |

No other track counter may mutate from the transaction.

## Semantic presentation IDs

Paid presentation IDs are SHIPPED semantic identity:
- `school/<course-kebab>/lesson/default`.

Night presentation families are SHIPPED semantic identity:
- `school/night-study/<course-kebab>/default`.

Teacher identity, teacher-led lesson copy, and approved future static/GIF depth are **CONTENT_DEPTH_ONLY**.

## Save/reload boundaries

The following are **QA_ONLY** evidence surfaces:
- after paid lesson;
- after lodging, before Night choice;
- after Night choice, before day advance;
- after day advance;
- old schema-4-style save with missing School state.

These prove exactly-once/default compatibility. They are not authoring content.

## Lumber-facing public boundary

**SHIPPED**
- immediate cross-system reaction from authoritative School `statChanged`;
- durable `worldFacts` / `worldFactAdded` transport.

**OPEN_AUTHORING**
- final management/accounting School public fact ID and private eligibility/threshold;
- final Arcana/Forest School public fact ID and private eligibility/threshold.

No management/Arcana threshold is chosen by this ledger.

## Release-candidate closure rule

Mechanics-ready rows remain SHIPPED unless an integrated failing contract proves otherwise.
QA-only fixtures must not be promoted to full Product Acceptance evidence when they bypass authored reachability.
OPEN authoring and content-depth rows remain separate from mechanics readiness.
