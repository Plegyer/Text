# School Final RC Acceptance Matrix v1

Status: final School release-candidate acceptance classification.
Current behavior source of truth:
- merged PR24 one-Save shipped E2E behavior;
- merged PR25 final acceptance gate behavior;
- current Chat 5 School regression contracts.

This matrix separates shipped mechanics from QA evidence and unresolved human/content work.

## SHIPPED_GREEN

| Area | Current acceptance evidence |
|---|---|
| Eight paid course identities/packages | locked course IDs, tuition, 1 current-day Energy, exact full stat packages |
| First-class `schoolLesson` transaction | merged one-Save path executes real Arcana command atomically |
| Typed paid progress | Arcana `lessons_completed` becomes 1 exactly once in merged path |
| No paid/Night counter cross-write | paid lesson leaves `night_study_sessions` unchanged |
| Semantic paid presentation | `school/arcana/lesson/default` is shipped in the one-Save path |
| Real blocking School scene | `base.school` may open after paid lesson and must resolve before NightFlow |
| Scene resolution idempotency | no tuition/Energy recharge and no typed-progress duplication |
| Save/reload pending scene | pending School scene survives reload before resolution |
| School transaction isolation | same Save continues through Lumber, Night, Forest, ending, Meta, New Run |
| No fabricated management fact | merged one-Save path keeps `lumber.school.management-ready` absent |
| Public/private ownership rule | Lumber consumes public boundary, not private School counters |
| Hard Work independence | Lumber Hard Work remains based on 50 completed Lumber shifts only |

## QA_GREEN

| Area | QA evidence |
|---|---|
| All eight course/track mappings | course/track ownership suite |
| Full paid-course reload coverage | full reload matrix / chronology |
| 24 Night-study choices | catalog + production parity suites |
| Night housing policy | normal/cheap allowed, street restricted |
| Night mechanics | tuition/current-day Energy 0, +2 supported stat, next-day Energy -1 |
| Typed Night progress | `night_study_sessions +1`, `lessons_completed +0` |
| Paid/Night/Activity exclusion | day/Night interaction matrix |
| Old-save School defaults | schema4/default-state compatibility suites |
| Exactly-once future public publication | public-boundary exactly-once contract |
| Long-Save unrelated state preservation | state-preservation and state-drift sentinels |
| False-green prevention | v1/v2 no-false-green audits/sentinels |
| RC content-depth truthfulness | content-depth negative suite |

QA_GREEN means the regression/evidence contract is green. It does not turn fixture-only IDs or direct state setup into production authoring.

## HUMAN_DECISION_REQUIRED

The following are not runtime failures. Product/authoring must decide them:

1. management/accounting School public-result provider;
2. management/accounting private threshold/milestone type;
3. final management/accounting School-side public-result authoring;
4. Arcana/Forest School public-result provider;
5. Arcana/Forest private threshold/milestone type;
6. exact direct Arcana-to-Forest listener/option if a durable School public fact is selected;
7. whether certificates/projects/exams participate in the minimum authored School result path.

Existing Lumber listener evidence:
- management listener: `lumber-cross.school-management-return`;
- current Forest result continuation: `lumber-cross.activity-forest-return`.

These listener identities do not select a School provider or threshold.

## CONTENT_DEPTH_OPEN

Still incomplete as authored content:
- canonical teacher/presenter identities;
- teacher/course assignments;
- teacher voice/personality;
- production lesson prose;
- authored milestone/certificate/project/exam scenes;
- authored public-result presentation;
- richer course/Night result copy where Product wants it.

These gaps do not change locked paid/Night mechanics.

## PRESENTATION_ASSET_OPEN

No Chat 5 artifact declares a final approved School asset set for:
- teacher portraits;
- course stills;
- lesson/result stills;
- Night-study stills;
- GIF loops;
- milestone/certificate cards.

Semantic presentation routing is ready; final static/GIF/media depth remains open.

## Final gate discipline

A School issue should be reopened as a mechanics blocker only when merged/integrated evidence demonstrates a concrete failure in:
- tuition/Energy/stat atomicity;
- typed School progress;
- save/reload exactly-once behavior;
- blocking-scene sequencing;
- day/Night/Activity exclusion;
- semantic presentation identity;
- public/private ownership;
- unrelated subsystem preservation.

Missing teachers, authored thresholds, certificates/projects, prose, and media remain human/content work rather than hidden mechanics regressions.
