# Media-Ready Semantic Manifest Draft v1

Purpose: define a concise manifest format that can be populated directly from approved authored content for GIF/static production.

Do not invent IDs for non-authoritative content.

## Manifest fields

Each row contains:

- **subsystem**
- **gameplay/content ID**
- **semantic presentationId**
- **media readiness status**
- **reuse group**
- **dedicated vs reusable asset**
- **static fallback**
- **text fallback**
- **source authority**
- **blocking Product/content dependency**

## Readiness values

Use only:

- `READY_NOW`
- `REUSE_EXISTING`
- `OPTIONAL_POLISH`
- `CONTENT_AUTHORING_FIRST`
- `PRODUCT_DECISION_REQUIRED`
- `OPEN_UNASSIGNED_IDENTITY`

## Asset mode values

- `DEDICATED`
- `REUSABLE`
- `REUSE_EXISTING`
- `UNASSIGNED`

## Representative authoritative rows

| subsystem | gameplay/content ID | presentationId | readiness | reuse group | asset mode | static fallback | text fallback | source authority | blocking dependency |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Lumber | shipped Lumber seasonal shift: spring | `job/lumber/shift/spring/default` | READY_NOW | lumber-work-loop | REUSABLE | Lumber shipped static | available | shipped production presentation + Lumber authority | none |
| Lumber | shipped Lumber seasonal shift: summer | `job/lumber/shift/summer/default` | READY_NOW | lumber-work-loop | REUSABLE | Lumber shipped static | available | shipped production presentation + Lumber authority | none |
| Lumber | shipped Lumber seasonal shift: autumn | `job/lumber/shift/autumn/default` | READY_NOW | lumber-work-loop | REUSABLE | Lumber shipped static | available | shipped production presentation + Lumber authority | none |
| Lumber | shipped Lumber seasonal shift: winter | `job/lumber/shift/winter/default` | READY_NOW | lumber-work-loop | REUSABLE | Lumber shipped static | available | shipped production presentation + Lumber authority | none |
| Lumber | shipped Lumber result | `job/lumber/result/default` | REUSE_EXISTING | lumber-result | REUSE_EXISTING | Lumber shipped static | available | shipped production presentation | none |
| Lumber | first-shift career event | `job/lumber/event/lumber-career-first-shift/default` | OPTIONAL_POLISH | lumber-milestone | DEDICATED | Lumber shipped static | available | shipped production event identity | none |
| Lumber relationship | Foreman professional scene | `relationship/lumber-foreman/lumber-foreman-notice/default` | OPTIONAL_POLISH | foreman-professional | DEDICATED | Lumber shipped static | available | shipped production relationship identity | none |
| Lumber Night relationship | Foreman professional Night scene | `relationship/lumber-foreman/lumber-night-foreman-professional/default` | OPTIONAL_POLISH | foreman-night | DEDICATED | Lumber shipped static | available | shipped production Night relationship identity | none |
| School | Literacy and Numbers paid lesson | `school/literacy-and-numbers/lesson/default` | REUSE_EXISTING | school-classroom | REUSABLE | `assets/stage-school.svg` | available | shipped School course identity | none |
| School | Arcana paid lesson | `school/arcana/lesson/default` | REUSE_EXISTING | school-classroom | REUSABLE | `assets/stage-school.svg` | available | shipped School course identity | none |
| School | Rhetoric and Social paid lesson | `school/rhetoric-and-social/lesson/default` | REUSE_EXISTING | school-classroom | REUSABLE | `assets/stage-school.svg` | available | shipped School course identity | none |
| School | Etiquette and Presentation paid lesson | `school/etiquette-and-presentation/lesson/default` | REUSE_EXISTING | school-classroom | REUSABLE | `assets/stage-school.svg` | available | shipped School course identity | none |
| School | Field Craft paid lesson | `school/field-craft/lesson/default` | REUSE_EXISTING | school-classroom | REUSABLE | `assets/stage-school.svg` | available | shipped School course identity | none |
| School | Physical Training paid lesson | `school/physical-training/lesson/default` | REUSE_EXISTING | school-training | REUSABLE | `assets/stage-school.svg` | available | shipped School course identity | none |
| School | Arts and Performance paid lesson | `school/arts-and-performance/lesson/default` | REUSE_EXISTING | school-performance | REUSABLE | `assets/stage-school.svg` | available | shipped School course identity | none |
| School | Body Confidence paid lesson | `school/body-confidence/lesson/default` | REUSE_EXISTING | school-training | REUSABLE | `assets/stage-school.svg` | available | shipped School course identity | none |
| School blocking event | `base.school / lesson` | `location/town/event/base-school/lesson` | REUSE_EXISTING | school-workshop | REUSE_EXISTING | `assets/workshop.svg` | available | shipped base.school content | none |
| Forest Activity | generic Forest route | `activity/forest/route/default` | REUSE_EXISTING | forest-route | REUSE_EXISTING | `assets/stage-forest.svg` | available | shipped Activity presentation | none |
| Forest Activity | success result | `activity/forest/return/success` | REUSE_EXISTING | forest-result | REUSE_EXISTING | `assets/stage-forest.svg` | available | shipped Activity presentation | none |
| Forest Activity | escape result | `activity/forest/return/escape` | REUSE_EXISTING | forest-result | REUSE_EXISTING | `assets/stage-forest.svg` | available | shipped Activity presentation | none |
| Forest Activity | failure result | `activity/forest/return/failure` | REUSE_EXISTING | forest-result | REUSE_EXISTING | `assets/stage-forest.svg` | available | shipped Activity presentation | none |
| Ending | Lumber Hard Work | `ending/lumber/hard-work` | OPTIONAL_POLISH | ending-epilogue | REUSABLE | town/static fallback | available | shipped Lumber ending identity | none |
| Ending | Lumber Forewoman | `ending/lumber/forewoman` | OPTIONAL_POLISH | ending-epilogue | REUSABLE | town/static fallback | available | shipped Lumber ending identity | none |
| Ending | Lumber Forest | `ending/lumber/forest` | OPTIONAL_POLISH | ending-epilogue | REUSABLE | town/static fallback | available | shipped Lumber ending identity | none |

## Representative OPEN rows

For non-authoritative content, keep the row explicit but unassigned.

| subsystem | gameplay/content ID | presentationId | readiness | reuse group | asset mode | static fallback | text fallback | source authority | blocking dependency |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Satyr Maid | OPEN production repeatable work ID | `OPEN` | CONTENT_AUTHORING_FIRST | service-loop candidate | UNASSIGNED | placeholder/static safe | draft meaning only | Satyr Maid design draft | production work/action/result IDs |
| Undead Farm | OPEN production repeatable work ID | `OPEN` | CONTENT_AUTHORING_FIRST | farm-production candidate | UNASSIGNED | placeholder/static safe | draft meaning only | Undead Farm design draft | production work/action/result IDs |
| Hunter | OPEN | `OPEN` | CONTENT_AUTHORING_FIRST | outdoor-route candidate | UNASSIGNED | placeholder/static safe | OPEN | Hunter design draft | production content IDs |
| Ordinary poverty | OPEN housing/street IDs | `OPEN` | CONTENT_AUTHORING_FIRST | lodging/street candidates | UNASSIGNED | town fallback | structural meaning only | poverty/economy drafts | housing/event authoring |
| Secret Debt | OPEN offer/activation/work/Night/outcome IDs | `OPEN` | PRODUCT_DECISION_REQUIRED | street/hidden-work candidates | UNASSIGNED | town/static safe | structural meaning only | Secret Debt draft | Product decisions + production content IDs |
| Forest hunter trail | OPEN gameplay route identity | `OPEN` | CONTENT_AUTHORING_FIRST | forest-route candidate | UNASSIGNED | `activity/forest/route/default` | OPEN | Forest authoring packet | route content |
| Forest challenge families | OPEN | `OPEN` | CONTENT_AUTHORING_FIRST | forest-challenge candidate | UNASSIGNED | generic Forest fallback | OPEN | Forest authoring packet | challenge content |
| Palace | OPEN Palace role/assignment IDs | `OPEN` | PRODUCT_DECISION_REQUIRED | court-service candidate | UNASSIGNED | placeholder/static safe | OPEN | Palace design draft | authoritative Palace content identity |
| School public result | OPEN provider/result ID | `OPEN` | PRODUCT_DECISION_REQUIRED | School result candidate | UNASSIGNED | School/town fallback | OPEN | School authoring packet | provider/milestone decision |

## Manifest row template

```text
subsystem:
sourceContentId:
presentationId:
mediaReadiness:
reuseGroup:
assetMode:
staticFallback:
textFallback:
sourceAuthority:
blockingDependency:
```

## Manifest rules

1. `presentationId=OPEN` is required when identity is not authoritative.
2. A reusable media group never substitutes for a semantic ID.
3. Static/text fallback may be ready before final media.
4. A row can be media-ready without a GIF.
5. Product/content dependency must be explicit.
6. No gameplay state values belong in this manifest.
7. Filename changes do not rename semantic IDs.
8. New authoritative rows must pass stale-content and collision checks before media production.

## Production handoff

Rows with:
- authoritative source content;
- canonical presentationId;
- fallback ready;
- no identity-changing dependency

may enter semantic media briefing and batch production.

OPEN rows remain placeholder-safe until content authority is ready.
