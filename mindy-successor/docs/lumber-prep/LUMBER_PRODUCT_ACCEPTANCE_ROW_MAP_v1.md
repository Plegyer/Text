# Lumber Product Acceptance Row Map v1

Status: Chat 3 post-activation mapping contract for PA00–PA26.
Production baseline: PR #20 merge `9b427d75dc22021cd3373aa7dd3521782e54152d`.
Normative sequence: `docs/qa-prep/PRODUCT_ACCEPTANCE_EXECUTION_PLAN_v1.md`.

Production activation now ships target Lumber Work, career/Foreman/Forest/endings, all three approved Lumber event packs, typed School progression, `schoolLesson`, target NightFlow lodging/choices, and Forest Activity UI controls.

Synthetic `school.lumber-management` is not shipped and must never be used as a production provider.

## Status vocabulary

- **READY** — exact production ID/API is shipped and the row's Lumber boundary is executable.
- **PARTIAL** — shipped executable boundary exists, but full PA depth depends on remaining authoring.
- **OPEN** — a product-owned value/source is still unresolved and must not be invented.

## PA00–PA26 map

| Row | Operation / command API | Exact Lumber / production IDs and facts | Reload checkpoint | Status / dependency |
| --- | --- | --- | --- | --- |
| PA00 | Load shipped catalog; `parseSave(JSON.stringify(state), catalog)` | legacy action `lumber` coexists with target `lumber.shift`; career `lumber`; relationship `lumber.foreman`; Activity `lumber.forest` | `PA00-fresh` | READY — PR #20 activation shipped |
| PA01 | `dispatch({type:'finishCreation'})` | no Lumber reaction required | optional sanity reload | READY |
| PA02 | Work UI selects target `lumber.shift`; no separate zero-cost career-entry command exists | `lumber.shift` lazily establishes target Lumber career state as part of the first real shift | pending first-shift scene if produced | READY mapping — career context is entered through target Work action |
| PA03 | `dispatch({type:'action',id:'lumber.shift'})` | `completed_shifts +1`; `careerCounterChanged(lumber,completed_shifts)`; presentation `job/lumber/shift/<season>/default` | `PA03-after-shift` | READY; 1 daytime Energy exactly once |
| PA04 | repeat `dispatch({type:'action',id:'lumber.shift'})` | shipped spring/summer/autumn/winter target scenes | `repeatable-variant` | READY |
| PA05 | Resolver after qualifying shift | event `lumber.career-first-shift`; trigger `careerCounterChanged(lumber,completed_shifts)`; presentation `job/lumber/event/lumber-career-first-shift/default` | `pending-milestone` | READY; 0 extra daytime Energy |
| PA06 | `dispatch({type:'choice',id:'continue'})`, then `dispatch({type:'choice',id:'professional'})` | transition `accept-hand`; event `lumber.foreman-notice`; relationship `lumber.foreman`; stage `route-professional` | `foreman-open` | READY; no romance prerequisite |
| PA07 | `dispatch({type:'schoolLesson',id:<SchoolCourseId>})` | all eight paid course IDs and typed `lessons_completed` are shipped; exact course/fact that should satisfy Lumber management/accounting is not locked | `school-result` | PARTIAL/OPEN cross-system — School transaction is READY, Lumber management public fact/provider/threshold remains OPEN |
| PA08 | Resolver boundary after future School public result | shipped pack contains `lumber-cross.school-management-return`; fixture trigger `worldFactAdded(lumber.school.management-ready)` is not a final School-owned production fact | `pending-school-continuation` | OPEN — final School public fact ID/provider/threshold must be authored |
| PA09 | production acquisition/use source is OPEN | locked item `old_boundary_token`; capability `enter_old_boundary`; test bridge `lumber.capability.enter-old-boundary` remains test-only | `item-capability` | OPEN — acquisition/use/retain-or-consume semantics |
| PA10 | `dispatch({type:'endDay'})` | shipped NightFlow enters stable pre-lodging phase | optional before lodging | READY |
| PA11 | `dispatch({type:'chooseLodging',id:'lodging.normal'})` | shipped normal lodging `lodging.normal`; cost 100 | `PA11-paid-lodging` | READY; payment commits exactly once |
| PA12 | `dispatch({type:'chooseNightChoice',id:'lumber.foreman.night'})`, then event choice `continue` | shipped Night choice `lumber.foreman.night`; event `lumber-night.foreman-professional`; `nightChoiceCompleted(lumber.foreman.night)`; presentation `relationship/lumber-foreman/lumber-night-foreman-professional/default` | `pending-night-relationship` | READY |
| PA13 | resolve Night scene; NightFlow finishes | relationship fact `night-followup-complete`; calendar advances once | `PA13-next-day` | READY |
| PA14 | `dispatch({type:'enterActivity',id:'lumber.forest'})` | shipped Activity/UI `lumber.forest`; entry cost 2; entry still requires `enter_old_boundary` capability | `PA14-inside-activity` | PARTIAL — UI/Activity shipped, natural production capability source remains OPEN |
| PA15 | `parseSave(JSON.stringify(state), catalog)` | same `ActivityEnvelope` ID/version/checkpoint/internal state/RNG | `inside-activity-resume` | READY |
| PA16 | `dispatch({type:'activityAction',id:'advance'})` | current `counter.v1` checkpoint `counter.step.*`; no repeated daily Energy | `activity-internal` | PARTIAL — full PA 3-route/3-challenge/season authoring remains OPEN |
| PA17 | production item-capability use/action is OPEN | `old_boundary_token -> enter_old_boundary`; current production gate changes Activity entry availability, but no accepted explicit in-Activity use action is authored | `before-item-use` | OPEN — item acquisition/use authoring |
| PA18 | advance until success via `dispatch({type:'activityAction',id:'advance'})` | result `lumber.forest.success`; exact A5 `activityResult(lumber.forest,success,lumber.forest.success)`; event `lumber-cross.activity-forest-return` | `pending-post-activity` | READY after entry |
| PA19 | `dispatch({type:'activityAction',id:'escape'})` | result `lumber.forest.escape`; distinct escape `activityResult`; no success-only facts | `activity-escape` | READY |
| PA20 | `dispatch({type:'choice',id:'continue'})` on `lumber-cross.activity-forest-return` | career facts `forest-truth-known` + `forest-problem-resolved`; no extra shift | `post-activity-continuation` | READY |
| PA21 | reach combined eligible state; resolver/register boundary | shipped endings `ending.lumber.hard-work` + `ending.lumber.forest` can coexist when their independent conditions are met | `PA21-eligible-not-committed` | READY deterministic fixture path |
| PA22 | `dispatch({type:'action',id:'lumber.shift'})` while eligible and uncommitted | normal target Work remains available | `eligible-after-normal-action` | READY |
| PA23 | central contract: `dispatch({type:'commitEnding',id:'ending.lumber.hard-work'})` | `endingCommitted(ending.lumber.hard-work)`; semantic `ending/lumber/hard-work`; shipped UI currently may use compatibility `accept` shortcut | `PA23-committed-before-completion` | READY engine contract |
| PA24 | `dispatch({type:'completeEnding'})` | one stable RunResult for `ending.lumber.hard-work` | `completed` | READY |
| PA25 | save/reload | exact A6 reward `hardWork:lumber`; `meta.hardWorkProgress` contains `lumber` once | `PA25-reward-before-new-run` | READY; no duplication |
| PA26 | `dispatch({type:'newLife'})`; save/reload | Lumber Hard Work persists visible +3 starting Strength and +3 starting Endurance | `new-run` | READY |

## Locked invariants

### Hard Work

Only:

`careerCounter(lumber, completed_shifts) >= 50`

No milestone, relationship, season, Forest, School, item, legacy visit or legacy action-count prerequisite is allowed.

Exact reward:

`hardWork:lumber`

### A5

Exact Forest success continuation boundary:

`activityResult(lumber.forest, success, lumber.forest.success)`

Continuation event:

`lumber-cross.activity-forest-return`

### Production exclusions

`school.lumber-management` is synthetic and is not shipped.

## Remaining genuine OPEN PA dependencies

1. production acquisition/use path for `old_boundary_token -> enter_old_boundary`;
2. final School management/accounting public fact ID, provider and threshold;
3. final Arcana/Forest School public fact ID/provider/threshold if activated;
4. deeper Forest route/challenge/season authoring needed for the full PA depth requirement.

Normal lodging `lodging.normal`, `lumber.foreman.night`, target Work UI, School command/progression, and Forest UI controls are already shipped by PR #20.

None of the remaining OPEN dependencies changes Hard Work.
