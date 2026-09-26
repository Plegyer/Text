# School RC Presentation Content Gap v1

Status: release-candidate presentation/content-depth gap only.
Scope: distinguish mechanics readiness from authoring/presentation depth.

## Mechanics-ready course surface

The eight paid School courses are mechanics-ready:
- stable gameplay course IDs;
- stable School track IDs;
- locked tuition;
- exactly 1 current-day Energy per paid lesson;
- locked stat packages;
- no ordinary School Lust mutation;
- atomic paid-lesson availability checks;
- complete paid-lesson Resolver fact package;
- typed `lessons_completed` ownership contract;
- save/reload exactly-once expectations.

The 24 Night-study choices are mechanics-ready:
- one supported stat per choice;
- +2 selected stat;
- zero tuition;
- zero current-day Energy;
- next-day Energy -1;
- one Night slot;
- typed `night_study_sessions` ownership contract;
- normal/cheap availability and street restriction contract.

None of the remaining presentation work below changes these mechanics.

## Semantic presentation-ready surface

Semantic presentation identity is ready and stable.

Paid lesson family:
- `school/<course-kebab>/lesson/default`.

Night-study family:
- `school/night-study/<course-kebab>/default`.

These semantic IDs are integration contracts. Future authored copy/media should resolve through them instead of inventing new gameplay course IDs.

## Missing teacher identities

Still missing:
- canonical teacher/presenter IDs;
- canonical names;
- course-to-teacher assignment where the authored product wants one;
- approved teacher voice/personality;
- approved portrait/static/GIF presentation;
- teacher-specific lesson/result copy.

Teacher authoring is **CONTENT_DEPTH**, not a mechanics blocker.

Ordinary paid School must not gain a teacher prerequisite merely because a teacher identity is authored.

## Missing milestone/certificate/project authoring

Still OPEN:
- final milestone thresholds;
- final certificate thresholds;
- final certificate names/effects;
- exact project definitions;
- exact exam definitions;
- final management/accounting public fact;
- final Arcana/Forest public fact;
- authored scenes that publish those facts.

These are **OPEN_AUTHORING** decisions.

No legacy `metrics.lessons` threshold and no fixture-only threshold becomes canonical production authoring.

## Future static/GIF asset depth

Future presentation may add:
- course entry illustrations;
- teacher portraits;
- lesson/result stills;
- lightweight GIF loops;
- milestone/certificate cards;
- Night-study presentation art.

Asset depth is **PRESENTATION_FUTURE** unless a Product Acceptance row explicitly requires a concrete shipped visual.

Adding static/GIF assets must not:
- rename gameplay course IDs;
- change track ownership;
- change tuition/Energy/stat mechanics;
- add Lust mutation;
- alter Night-study costs;
- create new School prerequisites;
- create private School-to-Lumber coupling.

## Release-candidate classification

| Surface | Class | Release meaning |
|---|---|---|
| eight paid course mechanics | MECHANICS_READY | integrate/test as shipped mechanics |
| 24 Night-study mechanics | MECHANICS_READY | integrate/test as shipped mechanics |
| semantic paid presentation IDs | PRESENTATION_READY | stable routing identity |
| semantic Night presentation IDs | PRESENTATION_READY | stable routing identity |
| canonical teachers | CONTENT_DEPTH | authored product depth still missing |
| teacher-led lesson copy/media | CONTENT_DEPTH | authored product depth still missing |
| milestones/certificates/projects/exams | OPEN_AUTHORING | final thresholds/content intentionally unresolved |
| management/accounting public result | OPEN_AUTHORING | final fact ID/eligibility unresolved |
| Arcana/Forest public result | OPEN_AUTHORING | final fact ID/eligibility unresolved |
| extra static/GIF richness | PRESENTATION_FUTURE | polish/depth, not mechanics |

## Gate discipline

Do not convert presentation polish into a mechanics blocker.

A mechanics regression is something like:
- wrong tuition;
- wrong Energy cost;
- wrong stat package;
- wrong counter ownership;
- replay after reload;
- invalid Night timing;
- direct private-state coupling.

A content-depth gap is something like:
- missing teacher name;
- missing teacher portrait;
- missing lesson prose;
- missing GIF/static art.

An open authoring decision is something like:
- final milestone threshold;
- final certificate definition;
- final public fact ID.

Keep those categories separate in release review.
