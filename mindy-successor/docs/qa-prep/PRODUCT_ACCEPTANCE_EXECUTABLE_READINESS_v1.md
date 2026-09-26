# Product Acceptance Executable Readiness v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Audit branch: `chat4/phase-b-pa-audit`  
Runtime/content baseline reviewed: current `main` at `88a0f7526bc43493d2415a0e7859296408e7b564` (PR #19 merged)

## Scope and status language

This matrix maps every existing `PA00`–`PA26` harness row to the exact API and exact merged fixture IDs available after PR #19.

Status means:

- **READY** — the row can be exercised with an existing merged API and existing fixture/core state, without inventing a missing content definition or transition.
- **BLOCKED_BY_CONTENT** — the Product Acceptance requirement needs authored content/depth that is not present in the merged fixtures.
- **BLOCKED_BY_WIRING** — the underlying pieces exist, but no authoritative integration seam currently connects them in the way the Product Acceptance row requires.

Two separate questions are deliberately kept distinct:

1. **Fixture/API exists?** — can QA name a concrete merged ID/API for the row?
2. **PA harness runner wired?** — does `tests/product-acceptance-harness.test.ts` actually execute that row against the merged fixture?

At this baseline, the second answer is **NO for every PA row**. The harness currently validates the 27-row table, mandatory checkpoint declarations, command adapter shape, and a generic parser roundtrip. It does not instantiate an integrated Product Acceptance fixture or execute PA00–PA26.

PR #19's merge commit records a full merge-ref `npm run check` result of **186/186** before its temporary CI workflow was removed. This matrix does not reinterpret that architecture/integration check as a full Product Acceptance run.

## Exact merged fixture inventory used by this review

### Lumber / relationship / ending

- Work action: `lumber.shift`
- Career: `lumber`
- Milestone event: `lumber.career-first-shift`
- Relationship: `lumber.foreman`
- Foreman opening event: `lumber.foreman-notice`
- Professional relationship stage: `route-professional`
- Night choice fixture ID: `lumber.foreman.night`
- Night event: `lumber-night.foreman-professional`
- Test-local normal lodging ID from merged Night acceptance fixture: `lumber.normal-room`
- Forest Activity: `lumber.forest`
- Activity command IDs: `advance`, `escape`
- Activity results: `lumber.forest.success`, `lumber.forest.escape`, `lumber.forest.failure`
- Forest return event: `lumber-cross.activity-forest-return`
- Hard Work ending: `ending.lumber.hard-work`
- Forewoman ending: `ending.lumber.forewoman`
- Forest ending: `ending.lumber.forest`
- Hard Work reward proof ID: `hardWork:lumber`

### School

PR #19 supplies the executable School adapter API:

`executeSchoolLesson(save, courseId, catalog, {applyEffects, resolveReactions})`

The current engine `Command` union still has **no** `schoolLesson` command. Exact merged course IDs are:

- `school.course.literacy_and_numbers`
- `school.course.arcana`
- `school.course.rhetoric_and_social`
- `school.course.etiquette_and_presentation`
- `school.course.field_craft`
- `school.course.physical_training`
- `school.course.arts_and_performance`
- `school.course.body_confidence`

For concrete QA execution this matrix uses `school.course.arcana` when one paid lesson ID is needed. It costs 500 money and 1 Energy and has presentation ID `school/arcana/lesson/default`.

PR #19 also contains the Lumber-side event `lumber-cross.school-management-return`, triggered by world fact `lumber.school.management-ready`. The accepted eight-course School adapter does not currently publish that fact or a School-owned progress/milestone fact. The older `school.lumber-management` action in the Lumber fixture is therefore an isolated synthetic cross-system proof, not the authoritative Product Acceptance School transaction path.

### Item/capability adapter

The merged fixture `content/lumber-item-capabilities.fixture.json` exposes:

- source item ID: `old_boundary_token`
- capability ID: `enter_old_boundary`
- test adapter fact: `lumber.capability.enter-old-boundary`

Its own status is `TEST_ADAPTER_UNTIL_SHARED_ITEM_CAPABILITY_SCHEMA`. It can open the Forest entry in executable QA, but it is not a production inventory/action-space implementation.

## PA00–PA26 executable readiness matrix

| PA | Exact command / API | Exact merged fixture/content IDs | Fixture/API exists? | Status | Required save/reload checkpoint | Presentation ID where relevant | PA runner wired? | Readiness note |
|---|---|---|---|---|---|---|---|---|
| PA00 | `freshSave()` + `parseSave(JSON.stringify(save), catalog)` | Lumber fixtures exist; no target Satyr Maid / Undead Farm Day-1 fixture IDs in this slice | PARTIAL | **BLOCKED_BY_CONTENT** | `PA00-fresh` deep-equal roundtrip | `location/town/default` | NO | Fresh state and central stage exist, but Product Acceptance PA00 also requires all three visible starting career alternatives. |
| PA01 | `dispatch(save,{type:'finishCreation'},cat)` after real 10-point allocation or validated pre-finish fixture | no content ID required | YES | **READY** | optional sanity reload | `location/town/default` | NO | Core creation boundary is executable. |
| PA02 | No distinct “select Lumber context” command exists; closest current operation is `dispatch(...,{type:'action',id:'lumber.shift'})` | `lumber.shift` | PARTIAL | **BLOCKED_BY_WIRING** | save if the operation leaves a pending scene | shift/result IDs below | NO | First `lumber.shift` is both paid Work and the trigger for the first-shift milestone, so it collapses PA02/PA03/PA05 rather than providing a separate context-entry boundary. |
| PA03 | `dispatch(...,{type:'action',id:'lumber.shift'})` | `lumber.shift` | YES | **READY** | `PA03-after-shift` | season slot such as `job/lumber/shift/spring/default`; result `job/lumber/result/default` | NO | 1 Energy, one typed completed-shift increment, seasonal package and save/reload are directly executable. |
| PA04 | same `action:lumber.shift` on a chosen calendar season fixture | `lumber.shift`; spring/summer/autumn/winter scenes | YES | **READY** | reload with repeatable result open | `job/lumber/shift/<season>/default`; result `job/lumber/result/default` | NO | Four exact seasonal scenes are merged. |
| PA05 | `dispatch(...,{type:'action',id:'lumber.shift'})` then implicit Resolver | event `lumber.career-first-shift` | YES | **READY** as an isolated boundary | save pending milestone scene | `job/lumber/event/lumber-career-first-shift/default` | NO | Event is executable after the first shift. Full ordered PA sequence remains blocked upstream because that trigger is already consumed by the first paid shift. |
| PA06 | `dispatch(...,{type:'choice',id:'continue'})` then `dispatch(...,{type:'choice',id:'professional'})` | events `lumber.career-first-shift`, `lumber.foreman-notice`; relationship `lumber.foreman`; stage `route-professional` | YES | **READY** | reload after Foreman opening / pending relation scene | `relationship/lumber-foreman/lumber-foreman-notice/default` | NO | Professional non-romance route is directly executable at zero extra daytime Energy. |
| PA07 | `executeSchoolLesson(save,'school.course.arcana',cat,{applyEffects,resolveReactions})` | `school.course.arcana` | PARTIAL | **BLOCKED_BY_WIRING** | `PA07-school-result` | `school/arcana/lesson/default` | NO | Paid lesson transaction is executable, but Product Acceptance also requires School-owned progress/public fact; current adapter does not publish that state. Harness also has no School-specific command adapter. |
| PA08 | implicit Resolver after authoritative School transaction | target event `lumber-cross.school-management-return`; required fact `lumber.school.management-ready` | PARTIAL | **BLOCKED_BY_WIRING** | pending School→Lumber continuation reload | runtime-derived `job/lumber/event/lumber-cross-school-management-return/default` | NO | Lumber listener exists, but the eight-course School adapter does not emit the required world fact. Do not substitute the synthetic `school.lumber-management` action as production School. |
| PA09 | no authoritative acquisition/action-space API exists | `old_boundary_token`, capability `enter_old_boundary`, adapter fact `lumber.capability.enter-old-boundary` | PARTIAL | **BLOCKED_BY_CONTENT** | item/capability checkpoint | none locked | NO | The merged adapter can grant a test fact, but there is no real item acquisition and no inventory capability implementation. |
| PA10 | `dispatch(...,{type:'endDay'})` | no content ID required beyond a catalog with lodging/night definitions | YES | **READY** | optional save before lodging | registry has `night/lodging/default` but NightFlow does not currently emit this slot explicitly | NO | Persisted NightFlow boundary is executable. |
| PA11 | `dispatch(...,{type:'chooseLodging',id:'lumber.normal-room'})` + `parseSave` | test-local merged fixture ID `lumber.normal-room` (100 money) | YES, test-local | **READY** | mandatory paid-lodging reload | `night/lodging/default` exists in presentation registry fixture; no explicit lodging→slot runtime mapping | NO | Merged Night acceptance fixture proves payment is committed once across reload. |
| PA12 | `dispatch(...,{type:'chooseNightChoice',id:'lumber.foreman.night'})` then pending `choice:continue` | choice `lumber.foreman.night`; event `lumber-night.foreman-professional` | YES | **READY** | reload pending Foreman Night scene | `relationship/lumber-foreman/lumber-night-foreman-professional/default` | NO | Uses Night slot, not daytime Energy, and preserves professional route. |
| PA13 | `dispatch(...,{type:'choice',id:'continue'})` from pending Night event; NightFlow finalizes day internally | `lumber-night.foreman-professional` | YES | **READY** | `PA13-next-day` | return target can be `location/town/default` | NO | Calendar advance and night effects are exactly-once in merged Night acceptance fixture. |
| PA14 | grant merged capability adapter fact, then `dispatch(...,{type:'enterActivity',id:'lumber.forest'})` | `old_boundary_token` adapter → `lumber.capability.enter-old-boundary`; Activity `lumber.forest` | PARTIAL | **BLOCKED_BY_WIRING** | `PA14-inside-activity` | registry fixture: `activity/forest/route/default` | NO | 2-Energy Activity entry is executable, but PA row expects presentation/action-capability integration that is not connected to Activity runtime, and PA09 acquisition remains non-product. |
| PA15 | `parseSave(JSON.stringify(activeActivitySave),cat)` | `lumber.forest` | YES | **READY** | mandatory inside-Activity deep comparison | `activity/forest/route/default` is registry-only | NO | A5 envelope resume and one-time entry cost are executable. |
| PA16 | repeated `dispatch(...,{type:'activityAction',id:'advance'})` | `lumber.forest`, adapter `counter.v1` | PARTIAL | **BLOCKED_BY_CONTENT** | one internal checkpoint/resume | registry has `activity/forest/route/default` and `activity/forest/encounter/default` | NO | Current fixture has progress/endurance only; it does not contain the required 3 route contexts, 3 challenge families, or season difference. |
| PA17 | no existing item-dependent Activity action; engine supports only `activityAction:'advance'|'escape'` | adapter item `old_boundary_token` does not add an internal action | NO | **BLOCKED_BY_CONTENT** | reload immediately before attempted item use | no exact item-action presentation ID | NO | Product requirement is an action-space change, not merely an entry fact. |
| PA18 | after Activity entry, `activityAction:'advance'` twice; implicit Resolver selects return event | result `lumber.forest.success`; event `lumber-cross.activity-forest-return` | YES | **READY** from prepared capability state | save pending post-Activity Lumber event | `job/lumber/event/lumber-cross-activity-forest-return/default` | NO | Success closes Activity and triggers Lumber continuation at zero extra daily Energy. |
| PA19 | `dispatch(...,{type:'activityAction',id:'escape'})` | result `lumber.forest.escape`; fact `lumber.forest.escaped` | YES | **READY** | save/reload around escape result | no dedicated merged escape presentation slot is required by current harness row | NO | Escape is mechanically distinct from success and does not receive success-only continuation. |
| PA20 | `dispatch(...,{type:'choice',id:'continue'})` on return event | `lumber-cross.activity-forest-return` | YES | **READY** | save post-continuation | `job/lumber/event/lumber-cross-activity-forest-return/default` | NO | Adds `forest-truth-known` and `forest-problem-resolved` Lumber career facts once. |
| PA21 | validated pre-threshold state + one real `lumber.shift`; Forest path supplies a second complex ending | `ending.lumber.hard-work` + `ending.lumber.forest` | YES | **READY** | `PA21-eligible-not-committed` | no ending media should be required before commitment | NO | This avoids inventing the missing School→Forewoman hook. The merged Forest continuation can make the Forest complex ending eligible alongside Hard Work. |
| PA22 | `dispatch(...,{type:'action',id:'lumber.shift'})` while run remains active and Energy is available | `lumber.shift` | YES | **READY** | optional eligible-after-normal-action reload | shift/result IDs | NO | A6 eligibility is separate from commitment. |
| PA23 | `dispatch(...,{type:'commitEnding',id:'ending.lumber.hard-work'})` | `ending.lumber.hard-work` | YES | **READY** | `PA23-committed-before-completion` | `ending/lumber/hard-work` | NO | Commitment is explicit and does not apply the Hard Work reward yet. |
| PA24 | `dispatch(...,{type:'completeEnding'})` | committed `ending.lumber.hard-work` | YES | **READY** | save before and immediately after completion | `ending/lumber/hard-work` | NO | Creates one stable RunResult and applies the A6 completion transaction once. |
| PA25 | observe completion result + repeated `parseSave` | reward proof `hardWork:lumber` | YES | **READY** | `PA25-reward-before-new-run`; reload twice | ending slot remains `ending/lumber/hard-work` | NO | Meta reward idempotency is executable; reload must not duplicate hard-work progress or transaction proof. |
| PA26 | `dispatch(...,{type:'newLife'})` + `parseSave` | Meta Hard Work progress for career `lumber` | YES | **READY** | save/reload new run | `location/town/default`; no dedicated Meta slot required by current harness | NO | New Run preserves Meta and the Lumber Hard Work rule modifier is visibly testable through the A6 stat bonus behavior. |

## What can be wired into the runner without new product content

A runner can already execute a useful real subset with merged fixtures:

`PA03 -> PA06 -> paid School transaction only -> PA10 -> PA13 -> PA15 -> PA20 -> PA21 -> PA26`

That subset is not the full Product Acceptance flow. Specifically:

- PA02 needs a non-collapsing Lumber entry boundary or a deliberate harness mapping decision;
- PA07/PA08 need authoritative School progress/public-fact integration;
- PA09/PA17 need real item acquisition + action-space capability;
- PA14 presentation/capability integration is incomplete;
- PA16 lacks Forest product depth;
- PA00 lacks all required Day-1 career alternatives.

## Immediate harness adapter corrections

The current skeleton still models School as generic `action(id)`. After PR #19 the executable accepted School API is `executeSchoolLesson(...)`, not an engine `Command`. A future full runner must either:

1. gain an explicit School adapter calling `executeSchoolLesson`, or
2. wait for an authoritative engine `schoolLesson` command if Lead chooses to add one.

Do not point `schoolAction` at `school.lumber-management` merely to make the harness green; that would substitute an isolated Lumber test action for the accepted eight-course School transaction.

The existing harness also hard-codes Activity `advance` in `currentCommandAdapters`; `forestAdvanceAction` and `forestEscapeAction` remain fixture metadata rather than fully consumed adapter inputs.

## Queue item 4 target

The compact QA subset in `tests/qa-product-cross-slice-subset.test.ts` intentionally exercises only merged capabilities:

- real Lumber shift and free career/Foreman reactions;
- real `executeSchoolLesson` paid lesson transaction;
- merged test-local `lumber.normal-room` and `lumber.foreman.night` Night path with reload;
- merged `old_boundary_token` test adapter solely to satisfy Forest entry precondition;
- real A5 Forest success/result→Resolver boundary;
- validated 49-shift accelerator followed by one real 50th `lumber.shift`;
- real A6 Hard Work commit/completion/reload;
- semantic presentation override proving presentation remains mechanics-neutral.

It deliberately does **not** fabricate the blocked School→Lumber public fact, item action-space behavior, Forest route/challenge depth, or missing Day-1 career alternatives.
