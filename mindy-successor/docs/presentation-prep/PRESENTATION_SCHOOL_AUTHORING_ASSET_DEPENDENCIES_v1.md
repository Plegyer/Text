# Presentation School Authoring / Asset Dependencies v1

This matrix maps unresolved School authoring decisions to presentation work without inventing teachers, thresholds, providers, certificates, projects, or exams.

Machine-readable source:

`prior-work/astra/prototype-m3.2/content/presentation-school-authoring-asset-dependencies.fixture.json`

## Already presentation-ready

### Eight paid lessons

All eight paid lesson semantic IDs already ship.

Examples:

- `school/arcana/lesson/default`;
- `school/field-craft/lesson/default`;
- `school/body-confidence/lesson/default`.

Current static fallback:

`assets/stage-school.svg`.

Teacher-specific or classroom-specific art is optional until Product/content chooses final identities and depth.

### Real blocking School scene

The merged one-Save path ships:

`location/town/event/base-school/lesson`

with:

`assets/workshop.svg`.

This presentation identity is already valid and does not depend on unresolved public-result authoring.

## Teacher identities

Teacher/presenter identity is a human/content decision.

Presentation already has stable paid-lesson semantic routing, so teacher authoring may later enrich text/media without changing tuition, Energy, typed progress, or School transaction mechanics.

Do not invent:

- teacher names;
- one-teacher-per-course vs shared-teacher structure;
- teacher relationship state.

## Management/accounting public result

Two content decisions must happen before final result-specific presentation work:

1. choose the School-owned provider/result type;
2. choose the authored eligibility/milestone.

Until then:

- do not create a fake result `presentationId`;
- do not create result-specific final media;
- keep School/town fallback available.

The runtime presentation system itself does not block this authoring.

## Arcana / Forest public result

The Arcana paid lesson identity is already shipped.

A distinct Arcana/Forest public-result scene remains content-first:

- provider identity must be authored;
- threshold/milestone must be authored;
- only then should a unique result semantic ID/media binding be finalized.

Do not infer a Forest clue/capability identity from presentation needs.

## Certificates / projects / exams

These remain an optional content-scope decision.

If Product selects one as the minimum public-result path, presentation work follows the authored definition.

Do not pre-create:

- certificate names;
- project names;
- exam names;
- completion thresholds;
- provider/result IDs.

## Dependency conclusion

Current School presentation mechanics are green.

Remaining asset work splits into:

- **optional polish** for already-shipped paid lessons and the blocking scene;
- **content first, then asset** for unresolved public-result/certificate/project/exam material.
