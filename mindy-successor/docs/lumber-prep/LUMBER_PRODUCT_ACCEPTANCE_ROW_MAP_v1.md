# Lumber Product Acceptance Row Map v1

Status: Chat 3 mapping contract for PA00–PA26.
Branch: `chat3/lumber-production-proof-next`.
Normative sequence: `docs/qa-prep/PRODUCT_ACCEPTANCE_EXECUTION_PLAN_v1.md`.

This map names current Lumber IDs and engine commands without claiming unresolved production dependencies are shipped. Synthetic `school.lumber-management` is never a production provider.

## Status vocabulary

- **READY** — exact Lumber ID/API exists and is executable in the target fixture.
- **PARTIAL** — executable fixture boundary exists, but full Product Acceptance depth/integration is not yet shipped.
- **OPEN** — production owner/value is not locked and must not be invented.

## PA00–PA26 map

| Row | Operation / command API | Exact Lumber IDs / reaction facts | Reload checkpoint | Status / remaining dependency |
| --- | --- | --- | --- | --- |
| PA00 | Load catalog; `parseSave(JSON.stringify(state), catalog)` | Target expectation includes legacy action `lumber` plus target `lumber.shift`; target career `lumber`, relationship `lumber.foreman`, Activity `lumber.forest` | `PA00-fresh` | PARTIAL — target activation remains an integration concern; coexistence contract is proven |
| PA01 | `dispatch({type:'finishCreation'})` | No Lumber reaction required | optional sanity reload | READY engine API |
| PA02 | No separate target “enter career” command exists; first `dispatch({type:'action',id:'lumber.shift'})` lazily establishes Lumber career state | action `lumber.shift`; career `lumber`; reaction includes `actionCompleted:lumber.shift` and counter change | pending first-shift scene if produced | PARTIAL — PA02 is co-observed with the first paid shift rather than a distinct free context-selection command |
| PA03 | `dispatch({type:'action',id:'lumber.shift'})` | counter `lumber.completed_shifts` +1; `careerCounterChanged(lumber,completed_shifts)`; semantic shift `job/lumber/shift/<season>/default` | `PA03-after-shift` | READY; costs 1 daytime Energy exactly once |
| PA04 | repeat `dispatch({type:'action',id:'lumber.shift'})` | same action; current-season target scene; spring/summer/autumn/winter semantic shift IDs | `repeatable-variant` | READY repeatable/seasonal fixture contract |
| PA05 | Resolver after the qualifying shift | event `lumber.career-first-shift`; trigger `careerCounterChanged(lumber,completed_shifts)`; presentation `job/lumber/event/lumber-career-first-shift/default` | `pending-milestone` | READY; reactive scene costs 0 extra daytime Energy |
| PA06 | `dispatch({type:'choice',id:'continue'})` then `dispatch({type:'choice',id:'professional'})` | transition `lumber.accept-hand`; event `lumber.foreman-notice`; relationship `lumber.foreman`; resulting stage `route-professional`; reaction `careerTransition(lumber)` | `foreman-open` | READY professional/non-romance route |
| PA07 | **OPEN production School command/provider** | final School-owned management/accounting public fact ID is OPEN; **do not use** synthetic action `school.lumber-management` as production | `school-result` | OPEN — School public fact ID and threshold/provider must be supplied by School ownership |
| PA08 | Resolver boundary after production School result | approved fixture hook event `lumber-cross.school-management-return`; current fixture trigger `worldFactAdded(lumber.school.management-ready)` is not a final production School fact | `pending-school-continuation` | OPEN/PARTIAL — event shape exists, production School fact/provider remains OPEN |
| PA09 | **OPEN acquisition command/source** | locked item `old_boundary_token`; capability `enter_old_boundary`; test adapter fact `lumber.capability.enter-old-boundary` | `item-capability` | OPEN — real production acquisition/use source and consume/retain rule are not locked |
| PA10 | `dispatch({type:'endDay'})` | NightFlow enters stable phase; reaction boundary includes `nightPhase(before_lodging)` | optional before lodging | READY engine API |
| PA11 | `dispatch({type:'chooseLodging',id:<production normal lodging id>})` | normal lodging ID is not Lumber-owned/locked here | `PA11-paid-lodging` | OPEN integration ID — isolated tests use `lumber.normal-room` only as a test definition; payment must commit exactly once |
| PA12 | `dispatch({type:'chooseNightChoice',id:'lumber.foreman.night'})`, then event choice `continue` | stable Night hook `lumber.foreman.night`; event `lumber-night.foreman-professional`; reaction `nightChoiceCompleted(lumber.foreman.night)`; presentation `relationship/lumber-foreman/lumber-night-foreman-professional/default` | `pending-night-relationship` | PARTIAL — event pack is approved; production Night-choice definition/lodging integration remains outside this fixture |
| PA13 | resolve pending Night event with `dispatch({type:'choice',id:'continue'})`; NightFlow finishes | relationship fact `night-followup-complete`; calendar advances once; start-day facts are engine-owned | `PA13-next-day` | READY in isolated Night fixture; no duplicate lodging payment |
| PA14 | `dispatch({type:'enterActivity',id:'lumber.forest'})` | Activity `lumber.forest`; entry capability `enter_old_boundary` currently bridged by test fact; entry cost exactly 2 daytime Energy | `PA14-inside-activity` | PARTIAL — Activity executable; production capability source is OPEN |
| PA15 | `parseSave(JSON.stringify(state), catalog)` | same `ActivityEnvelope` ID/version/checkpoint/internal resource/RNG | `inside-activity-resume` | READY save/resume contract |
| PA16 | `dispatch({type:'activityAction',id:'advance'})` | current adapter `counter.v1`; checkpoint `counter.step.*`; no daily Energy per internal step | `activity-internal` | PARTIAL — full “3 route contexts / 3 challenge families / season difference” deeper authoring remains OPEN |
| PA17 | **OPEN production item-capability use/action** | capability `enter_old_boundary`; current fixture uses it as entry gate rather than an authored in-Activity item-use action | `before-item-use` | OPEN — real item use/action-space integration is not yet locked |
| PA18 | advance until success with `dispatch({type:'activityAction',id:'advance'})` | result `lumber.forest.success`; exact A5 fact `activityResult(lumber.forest,success,lumber.forest.success)`; event `lumber-cross.activity-forest-return` | `pending-post-activity` | READY after Activity entry |
| PA19 | `dispatch({type:'activityAction',id:'escape'})` | result `lumber.forest.escape`; `activityResult` escape boundary; no success-only facts | `activity-escape` | READY escape distinction |
| PA20 | `dispatch({type:'choice',id:'continue'})` on `lumber-cross.activity-forest-return` | career facts `forest-truth-known` + `forest-problem-resolved`; reaction choice resolution; no extra shift | `post-activity-continuation` | READY |
| PA21 | no special command; reach combined eligible state through normal/accelerated accepted state, then resolver/register boundary | Hard Work `ending.lumber.hard-work` + complex `ending.lumber.forest` can coexist when `completed_shifts>=50` and Forest facts are present | `PA21-eligible-not-committed` | READY deterministic fixture setup; eligibility does not commit or grant Meta |
| PA22 | `dispatch({type:'action',id:'lumber.shift'})` while eligible and uncommitted | normal action remains available; Hard Work remains eligible | `eligible-after-normal-action` | READY |
| PA23 | `dispatch({type:'commitEnding',id:'ending.lumber.hard-work'})` for the Meta-proof branch | reaction `endingCommitted(ending.lumber.hard-work)`; presentation `ending/lumber/hard-work` | `PA23-committed-before-completion` | READY; no reward on commit |
| PA24 | `dispatch({type:'completeEnding'})` | one stable RunResult for `ending.lumber.hard-work` | `completed` | READY; repeated completion is idempotent |
| PA25 | save/reload only | A6 reward ID exactly `hardWork:lumber`; `meta.hardWorkProgress` contains `lumber` once | `PA25-reward-before-new-run` | READY; no duplication on reload |
| PA26 | `dispatch({type:'newLife'})`; save/reload | protected Meta retained; Lumber Hard Work visible rule effect is +3 starting Strength and +3 Endurance | `new-run` | READY current A6 effect; new run reset remains separate from OPEN School/item work |

## Locked invariants across all rows

### Hard Work

The only eligibility condition is:

`careerCounter(lumber, completed_shifts) >= 50`

No milestone, Foreman relationship, season, Forest, School, item, legacy visit or legacy action-count prerequisite is allowed.

Reward ID is exactly:

`hardWork:lumber`

### A5

Forest success continuation is driven by exactly:

`activityResult(lumber.forest, success, lumber.forest.success)`

The continuation event is:

`lumber-cross.activity-forest-return`

### Production exclusions

`school.lumber-management` is a synthetic test action and must not be used as the PA production School provider.

## Remaining OPEN dependencies relevant to PA

1. production acquisition/use source for `old_boundary_token -> enter_old_boundary`;
2. final School management/accounting public fact ID and threshold/provider;
3. final Arcana/Forest School public fact ID and threshold, if that route is activated;
4. deeper Forest route/challenge/season authoring required by the full Product Acceptance depth row;
5. production normal-lodging ID and Night-choice data wiring where owned outside Lumber.

These OPEN items do not change Hard Work.
