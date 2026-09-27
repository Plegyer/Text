# School Localization Coverage Ledger v2

Status: current School player-facing localization coverage after Queue items 118–143.

Classification:
- **SHIPPED_RU_EN** — present in current production UI/runtime with RU+EN lookup.
- **SAFE_DELTA_READY** — RU+EN content/keying is authored and safe for current routing, but production localization/UI integration is still required.
- **STAGED_ROUTING_BLOCKED** — RU+EN content exists, but the underlying player-facing route is not naturally production-reachable yet.
- **PRODUCT_BLOCKED** — underlying gameplay/content decision is unresolved; final player-facing copy must not be invented.

## Coverage ledger

| Player-facing family | Status | Current authority / evidence | Remaining blocker |
|---|---|---|---|
| Town dock School label | SHIPPED_RU_EN | current `localization.json`: `ui.panel.school` | none for label |
| Town School subtitle | SHIPPED_RU_EN | current `localization.json`: `ui.town.school.subtitle` | none for subtitle |
| School panel internal title | SAFE_DELTA_READY | item 137 `ui.school.title`; item 139 copy bank | UI must call localization key instead of hardcoded RU |
| School panel help text | SAFE_DELTA_READY | item 137 `ui.school.help`; item 139 | UI wiring |
| Paid lesson button | SAFE_DELTA_READY | item 137 `ui.school.lessonButton`; item 139 | UI wiring |
| Paid tuition/Energy line | SAFE_DELTA_READY | item 137 `ui.school.tuitionEnergy` | UI formatting/wiring; shared numbers unchanged |
| Eight paid course labels | SAFE_DELTA_READY | item 137 + `school-ui-ru-en-v1.fixture.json` | School list must resolve keys |
| Eight paid course descriptions | SAFE_DELTA_READY | item 137 + `school-ui-ru-en-v1.fixture.json` | School list must resolve keys |
| Supported-stat display terminology | SAFE_DELTA_READY | `school-ui-ru-en-v1.fixture.json` | shared stats UI localization/wiring |
| Generic post-paid-lesson title/text | SAFE_DELTA_READY | `school-generic-localization-v2.fixture.json`; main delta keys | localization runtime + explicit content inclusion |
| Generic post-lesson Continue copy | SAFE_DELTA_READY | main delta + generic bundle | localization runtime |
| Generic classroom alt/caption | SAFE_DELTA_READY | main delta; item 141 draft | localization/media wiring |
| Generic paid-course multi-GIF pool mapping | SAFE_DELTA_READY | `school-generic-multigif-adoption-v1.json` | proposed GIF assets must exist or static-only config used |
| Exact Night-study button/context | SAFE_DELTA_READY | item 137 + item 139 | UI Night-flow wiring |
| Exact Night-study titles | SAFE_DELTA_READY | main delta; Night localization v2 | localization runtime |
| Exact Night-study variant text | SAFE_DELTA_READY | main delta; Night localization v2 | localization runtime |
| Exact Night-study Continue copy | SAFE_DELTA_READY | main delta; Night localization v2 | localization runtime |
| Exact Night-study alt/caption | SAFE_DELTA_READY | main delta; bilingual media mapping | localization/media wiring |
| Exact Night-study multi-GIF pool mapping | SAFE_DELTA_READY | `school-night-multigif-adoption-v1.json` | proposed GIF assets must exist before runtime patch |
| Teacher names / roles / bios | STAGED_ROUTING_BLOCKED | `SCHOOL_TEACHER_IDENTITIES_RU_EN_v1.md`; teacher-course localization v2 | exact paid-course route + production teacher acceptance |
| Teacher paid-lesson presentation | STAGED_ROUTING_BLOCKED | staged teacher pack + bilingual mapping | exact paid-course route |
| Exact-course repeatable paid-lesson text | STAGED_ROUTING_BLOCKED | 56 RU+EN variants; teacher-course localization v2 | exact paid-course route |
| Exact-course teacher/course media alt/caption | STAGED_ROUTING_BLOCKED | bilingual multi-GIF mapping | exact paid-course route + final assets |
| Track-specific peer/classroom scenes | STAGED_ROUTING_BLOCKED | peer/classroom authoring banks | exact route or another explicit route |
| Teacher repeated-contact scenes | STAGED_ROUTING_BLOCKED | relationship scene banks | relationship IDs/routes + localization production conversion |
| Teacher social/Night invitations | STAGED_ROUTING_BLOCKED | relationship scene banks | explicit relationship/Night ownership |
| Teacher career/world reaction copy | STAGED_ROUTING_BLOCKED | relationship seeds/scenes | approved public boundary + downstream owner |
| Management/accounting milestone UI | PRODUCT_BLOCKED | decision packet | provider/form/value OPEN |
| Management/accounting result scene | PRODUCT_BLOCKED | decision packet | canonical public-result identity/rule OPEN |
| Management/accounting result art/alt | PRODUCT_BLOCKED | presentation planning | result semantics OPEN |
| Arcana/Forest School result UI | PRODUCT_BLOCKED | decision packet | route scope/provider/value OPEN |
| Arcana/Forest direct consumer copy | PRODUCT_BLOCKED | decision packet | exact consumer OPEN |
| Arcana/Forest result art/alt | PRODUCT_BLOCKED | presentation planning | result semantics OPEN |
| Certificate scenes/labels | PRODUCT_BLOCKED | human-decision packet | participation/IDs/rules OPEN |
| Project scenes/labels | PRODUCT_BLOCKED | human-decision packet | participation/IDs/rules OPEN |
| Exam scenes/labels | PRODUCT_BLOCKED | human-decision packet | participation/IDs/rules OPEN |
| Teacher relationship route/stage labels | PRODUCT_BLOCKED | relationship authoring | canonical routes/stages OPEN |
| Education-specific ending copy | PRODUCT_BLOCKED | current School decision state | ending rules OPEN |
| Education Meta reward copy | PRODUCT_BLOCKED | current School decision state | Meta rules OPEN |

## SHIPPED_RU_EN detail

Current main already has shared localization for the outer School navigation surface:
- `ui.panel.school`;
- `ui.town.school.subtitle`.

This ledger does not claim the internal School panel/course rows are already localized. Current main still contains hardcoded Russian School panel/list text.

## SAFE_DELTA_READY detail

### Current-main localization delta

File:
- `content/school-localization-main-delta-v1.fixture.json`.

Safe families included:
- 8 course labels/descriptions;
- School panel/help/buttons/templates;
- generic reachable post-lesson content;
- exact Night-study content.

Excluded:
- staged teacher identities;
- staged exact-course repeatable lesson text.

### Generic current routing

Safe because:
- `actionCompleted:school` already exists;
- generic copy does not assert exact course/teacher identity.

### Exact Night routing

Safe because:
- each existing `school.night_study.*` choice ID already identifies exact course/stat;
- localization changes presentation only.

## STAGED_ROUTING_BLOCKED detail

Primary blocker:
- paid course-specific reactions currently know only generic `actionCompleted:school`.

Promotion requires:
- exact paid-course routing seam;
- localization runtime;
- strict production inclusion;
- promotion checklist green.

Reference:
- `STAGED_EXACT_COURSE_LOCALIZATION_PROMOTION_CHECKLIST_v1.md`.

## PRODUCT_BLOCKED detail

Do not create final localization keys/copy as production authority for:
- management/accounting result;
- Arcana/Forest result;
- certificate/project/exam completion;
- relationship route/stage outcomes;
- education endings/Meta

until Product freezes the underlying semantic decision.

## Mechanics coverage invariant

All classes share the same mechanics in RU and EN:
- paid tuition;
- paid Energy;
- paid stat package;
- no ordinary Lust mutation;
- paid progress;
- Night-study mechanics;
- public/private system boundaries;
- Hard Work independence;
- Palace unlock rules.

Localization readiness status never changes those mechanics.

## Test/evidence status

Authored tests include:
- bilingual content contract;
- localization migration v1;
- localization main delta v1;
- generic/Night routing and reload tests from prior queue waves.

This ledger does not claim those tests were executed in Chat 5.

## Promotion rule

A family may move:
- SAFE_DELTA_READY -> SHIPPED_RU_EN only after shared localization/UI integration, explicit production inclusion, and green acceptance;
- STAGED_ROUTING_BLOCKED -> SAFE_DELTA_READY only after its routing dependency is actually shipped and tested;
- PRODUCT_BLOCKED -> another state only after the underlying Product decision is recorded.
