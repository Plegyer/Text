# School Multi-GIF Content Density Map v1

Status: presentation-planning inventory for Chat2. This file does not select final art style or change gameplay.

## Current authored text density

Repeatable lesson content now exists in two banks/packs:
- v1: 3 lesson variants per track;
- v2: 4 additional lesson variants per track.

Total repeatable authored lesson variants:
- **7 per track**;
- **56 across eight tracks**.

Night-study v2 presentation pack:
- 24 exact Night-choice identities;
- 4 presentation variants per choice;
- **96 Night-study presentation variants** total.

Milestone-neutral School-life library additionally contains:
- arrival/classroom variants;
- teacher feedback variants;
- peer/context variants;
- post-lesson variants;
- Night-study flavor variants.

## 3–5 reusable GIF pool strategy

A small reusable pool can cover most current text density without making animation a mechanics dependency.

Recommended pool categories for production planning:
1. classroom explanation / teacher gesture;
2. practical demonstration / movement;
3. Arcana observation / controlled magical study;
4. arts/performance rehearsal;
5. quiet Night-study / reading / preparation.

Final art style and exact asset count remain OPEN.

## Track map

| Track | Teacher | Repeatable text variants | Night-choice identities | Night v2 variants | Suggested GIF reuse | Dedicated loop candidate | Current static fallback | Missing authored identity |
|---|---|---:|---:|---:|---|---|---|---|
| Literacy & Numbers | Mara Fen | 7 | 2 | 8 | classroom explanation + quiet Night study | ledger/page-marking loop | `assets/stage-school.svg` | final portrait/art identity only |
| Arcana | Ilyra Venn | 7 | 3 | 12 | Arcana observation + quiet Night study | sigil/instrument observation loop | `assets/stage-school.svg` | final portrait/art identity only |
| Rhetoric & Social | Cassian Reed | 7 | 3 | 12 | classroom gesture + quiet Night study | debate/hand-gesture loop | `assets/stage-school.svg` | final portrait/art identity only |
| Etiquette & Presentation | Eliane Marrow | 7 | 3 | 12 | classroom gesture + practical demonstration | posture/cuff/preparation loop | `assets/stage-school.svg` | final portrait/art identity only |
| Field Craft | Rowan Pike | 7 | 3 | 12 | practical demonstration + quiet Night study | map/knot/route-check loop | `assets/stage-school.svg` | final portrait/art identity only |
| Physical Training | Tovan Kest | 7 | 3 | 12 | practical demonstration | stance/form/breathing loop | `assets/stage-school.svg` | final portrait/art identity only |
| Arts & Performance | Nessa Lark | 7 | 4 | 16 | arts/performance rehearsal + classroom gesture | rehearsal/rhythm/movement loop | `assets/stage-school.svg` | final portrait/art identity only |
| Body Confidence | Sera Vey | 7 | 3 | 12 | practical demonstration + quiet Night study | posture/preparation movement loop | `assets/stage-school.svg` | final portrait/art identity only |

## Teacher / classroom surfaces

Current teacher presentation IDs:
- `school/teacher/literacy-and-numbers/classroom`;
- `school/teacher/arcana/classroom`;
- `school/teacher/rhetoric-and-social/classroom`;
- `school/teacher/etiquette-and-presentation/classroom`;
- `school/teacher/field-craft/classroom`;
- `school/teacher/physical-training/classroom`;
- `school/teacher/arts-and-performance/classroom`;
- `school/teacher/body-confidence/classroom`.

All currently fall back to:
- `assets/stage-school.svg`.

## Track lesson surfaces

v1 authored lesson surfaces:
- `school/<track-kebab>/lesson/authored`.

v2 authored lesson surfaces:
- `school/<track-kebab>/lesson/v2`.

Current fallback:
- `assets/stage-school.svg`.

The existing locked paid gameplay identity remains:
- `school/<track-kebab>/lesson/default`.

Chat2 should preserve the semantic distinction between:
- gameplay/default paid lesson identity;
- authored lesson-content media;
- teacher/classroom media;
- Night-study media.

## Night-study surfaces

v2 Night media identities:
- `school/night-v2/<track-kebab>/study`.

There are 8 track-level Night media surfaces reused across 24 exact Night-choice events.

This is intentional:
- exact gameplay choice identity remains per course/stat pair;
- presentation media may be reused by track;
- text remains stat-aware;
- housing-aware variants remain presentation-only.

## Dedicated vs reusable loops

### Strong dedicated-loop candidates
- Arcana: unique visual language supports a dedicated sigil/observation loop.
- Arts & Performance: performance motion benefits from a dedicated rehearsal loop.
- Physical Training: form/movement loop can strongly communicate the track.
- Field Craft: map/knot/tool interaction gives a clear distinct practical loop.

### Strong reusable-loop candidates
- Literacy + Rhetoric + Etiquette: classroom explanation/gesture family.
- Field Craft + Physical Training + Body Confidence: practical movement/demonstration family, with framing differences.
- all tracks: quiet Night-study loop with track-specific static/text overlays where presentation system permits.

These are production-efficiency suggestions, not final art selections.

## Current fallback coverage

Every current authored teacher/lesson/Night media reference resolves to an existing static fallback:
- `assets/stage-school.svg`.

No current authored School pack requires a GIF to function.

## Missing authored identity

Content identity now exists for:
- all eight teachers;
- all eight track lesson families;
- all 24 Night-study course/stat choices;
- generic peer/classroom and School-life content.

Still missing or OPEN:
- final visual art style;
- final teacher portraits;
- final distinct classroom/location art;
- final GIF assignments;
- milestone/certificate/project/exam presentation identities;
- management/accounting result presentation;
- Arcana/Forest result presentation if retained.

## Chat2 handoff guardrails

Multi-GIF work must not:
- rename gameplay course IDs;
- rename locked paid presentation IDs without coordinated migration;
- use animation completion as a transaction boundary;
- add tuition/Energy/stat/Lust effects;
- imply an unapproved milestone/public result;
- turn teacher media into a paid-lesson prerequisite.

Static/text fallback must remain valid after every GIF addition.
