# Product Acceptance Row-Runner Readiness v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Branch: `chat4/product-activation-qa-next`  
Baseline: current main after PR #19, plus item-1 shipped-catalog audit

## Classification rule

This artifact uses exactly three readiness classes:

- **SHIPPED_CATALOG** — the PA row can be executed against the same catalog shape currently produced by `scripts/build.mjs` / validated by `scripts/validate.ts`, without substituting target fixture content.
- **ISOLATED_FIXTURE** — the required API and exact target IDs exist in merged PR #19 fixtures/tests, but those definitions/packs are not in the shipped catalog.
- **BLOCKED** — even the merged isolated fixtures do not provide the complete behavior required by that PA row without fabricating missing wiring/content.

A fixture existing is not equivalent to a PA row passing.

The existing `tests/product-acceptance-harness.test.ts` still validates the 27-row table, command adapter shape and checkpoint declarations; it does **not** execute PA00–PA26 as one integrated row runner.

## Activation boundary used here

“Production activation lands” means at minimum:

1. the target definitions used by Product Acceptance are part of the production catalog construction path;
2. required target nested packs are discovered by both build and validation;
3. the row can use those target IDs from the shipped catalog rather than constructing an isolated catalog.

This does not imply missing School public facts, item action-space behavior, Forest depth, or test-local Night definitions magically become production content.

## Locked Hard Work rule

The exact merged Hard Work rule remains:

- ending ID: `ending.lumber.hard-work`
- condition: `careerCounter(lumber, completed_shifts) >= 50`
- reward ID: `hardWork:lumber`

The row runner must not weaken, add prerequisites to, or reinterpret that gate.

## PA00–PA26 readiness

| PA | Classification now | Exact command/API | Exact ID(s) | Save/reload checkpoint | What production activation changes |
|---|---|---|---|---|---|
| PA00 | **SHIPPED_CATALOG** | `freshSave()` + `parseSave(...)` | current shipped catalog | `fresh` | Already executable. This row alone does not prove the target Day-1 career roster. |
| PA01 | **SHIPPED_CATALOG** | `dispatch(...,{type:'finishCreation'})` | none | none required by current harness | Already executable. |
| PA02 | **ISOLATED_FIXTURE** | `dispatch(...,{type:'action',id:'lumber.shift'})` plus Resolver/choices | `lumber.shift` | none required by current harness | Becomes shipped-catalog executable when target Lumber definition is activated. Current target flow has no separate “select career” command, so PA02 is effectively entered through the first target shift boundary. |
| PA03 | **ISOLATED_FIXTURE** | `dispatch action` | `lumber.shift` | `after-shift` | Becomes shipped when target Lumber action is activated. |
| PA04 | **ISOLATED_FIXTURE** | repeated `dispatch action` with calendar season | `lumber.shift`; spring/summer/autumn/winter scenes | `repeatable-variant` | Becomes shipped when target Lumber action/scenes are activated. |
| PA05 | **ISOLATED_FIXTURE** | first `lumber.shift` then implicit Resolver | `lumber.career-first-shift` | `pending-milestone` | Becomes shipped when nested Lumber production pack and typed career definition are activated. |
| PA06 | **ISOLATED_FIXTURE** | `choice:continue`, then `choice:professional` | `lumber.foreman-notice`; relationship `lumber.foreman`; stage `route-professional` | `foreman-open` | Becomes shipped when typed relationship + Lumber production event pack are activated. |
| PA07 | **BLOCKED** | accepted merged API is `executeSchoolLesson(save,courseId,catalog,{applyEffects,resolveReactions})` | example course `school.course.arcana` | `school-result` | Production activation alone is insufficient. Paid lesson transaction exists, but the accepted School adapter does not persist the Product Acceptance School progress/milestone/public fact needed by this row. The harness also still models School as generic `action(id)`. |
| PA08 | **BLOCKED** | implicit Resolver after authoritative School result | listener `lumber-cross.school-management-return`; required fact `lumber.school.management-ready` | `pending-school-continuation` | Lumber listener can become shipped, but no authoritative PR #19 School course emits the required fact. Synthetic `school.lumber-management` must not be substituted as production School. |
| PA09 | **BLOCKED** | no authoritative acquisition/use API | fixture item `old_boundary_token`; adapter capability `enter_old_boundary`; fact `lumber.capability.enter-old-boundary` | `item-capability` | Activation does not create a real inventory item acquisition or item-driven action-space change. |
| PA10 | **SHIPPED_CATALOG** | `dispatch(...,{type:'endDay'})` | none | none required by current harness | Already executable at engine level with current shipped catalog. |
| PA11 | **ISOLATED_FIXTURE** | `dispatch(...,{type:'chooseLodging',id:'lumber.normal-room'})` | `lumber.normal-room` | `paid-lodging` | Does **not** become shipped merely by activating target JSON: this lodging is currently constructed only inside merged Night acceptance test code, not target production definitions. Requires a production lodging definition. |
| PA12 | **ISOLATED_FIXTURE** | `dispatch(...,{type:'chooseNightChoice',id:'lumber.foreman.night'})` then scene choice | choice `lumber.foreman.night`; event `lumber-night.foreman-professional` | `pending-night-relationship` | Event pack can be activated, but the night-choice definition itself is currently test-local. Requires production Night choice wiring. |
| PA13 | **ISOLATED_FIXTURE** | resolve pending Foreman Night event with `choice:continue` | `lumber-night.foreman-professional` | `next-day` | Same dependency as PA11/PA12; not lifted by pack activation alone. |
| PA14 | **ISOLATED_FIXTURE** | grant existing test-adapter fact, then `dispatch(...,{type:'enterActivity',id:'lumber.forest'})` | `lumber.forest`; fact `lumber.capability.enter-old-boundary` | `inside-activity-entry` | Activity definition can become shipped. Full ordered PA flow still cannot reach it legitimately until PA09 has real product item/capability wiring. |
| PA15 | **ISOLATED_FIXTURE** | `parseSave(JSON.stringify(state),cat)` inside Activity | `lumber.forest` | `inside-activity-resume` | Becomes shipped once `lumber.forest` is in production definitions, assuming a valid entry state exists. |
| PA16 | **BLOCKED** | current Activity API supports `activityAction:'advance'|'escape'` | `lumber.forest` / `counter.v1` | `activity-internal` | Activation is insufficient. Current fixture has synthetic progress/endurance, not required 3 route contexts, 3 challenge families and season difference. |
| PA17 | **BLOCKED** | no item-dependent Activity command exists | no valid item action ID; only `advance` / `escape` | `before-item-use` | Activation is insufficient. Requires actual item capability to change available Activity action. |
| PA18 | **ISOLATED_FIXTURE** | two `activityAction:advance` calls then implicit Resolver | result `lumber.forest.success`; event `lumber-cross.activity-forest-return` | `pending-post-activity` | Becomes shipped when Activity definition and Lumber cross-system pack are activated; ordered flow still depends on PA09/14 entry wiring. |
| PA19 | **ISOLATED_FIXTURE** | `dispatch(...,{type:'activityAction',id:'escape'})` | result `lumber.forest.escape` | `activity-escape` | Becomes shipped when target Activity definition is activated. |
| PA20 | **ISOLATED_FIXTURE** | resolve return event with `choice:continue` | `lumber-cross.activity-forest-return` | `post-activity-continuation` | Becomes shipped when cross-system pack + typed Lumber career are activated. |
| PA21 | **ISOLATED_FIXTURE** | validated pre-threshold state + one real target shift; ending eligibility registration | `ending.lumber.hard-work` + complex `ending.lumber.forest` | `eligible-not-committed` | Target endings become shipped when target definitions are activated. Hard Work remains exactly 50 completed Lumber shifts. Full ordered path still inherits blocked upstream product rows. |
| PA22 | **ISOLATED_FIXTURE** | `dispatch action:lumber.shift` while endings remain eligible | `lumber.shift` | `eligible-after-normal-action` | Becomes shipped with target Lumber action/endings activation. |
| PA23 | **ISOLATED_FIXTURE** | `dispatch(...,{type:'commitEnding',id:'ending.lumber.hard-work'})` | `ending.lumber.hard-work` | `committed-before-completion` | Becomes shipped when target ending definition is activated. |
| PA24 | **ISOLATED_FIXTURE** | `dispatch(...,{type:'completeEnding'})` | committed `ending.lumber.hard-work` | `completed` | Becomes shipped once target ending can be committed from shipped catalog. |
| PA25 | **ISOLATED_FIXTURE** | repeated `parseSave` after completion | reward proof `hardWork:lumber` | `reward-before-new-run` | Becomes shipped with target Hard Work ending/meta reward activation. |
| PA26 | **ISOLATED_FIXTURE** | `dispatch(...,{type:'newLife'})` + reload | Meta hard-work progress for `lumber` | `new-run` | Becomes shipped once the target Hard Work completion is reachable from shipped catalog. |

## Rows lifted specifically by catalog activation

If activation only moves the already-prepared target Lumber definitions/packs into the production catalog, these rows can move from **ISOLATED_FIXTURE** toward **SHIPPED_CATALOG** without inventing new mechanics:

- PA02–PA06
- PA15
- PA18–PA20
- PA21–PA26

PA14 gains a shipped Activity definition but still lacks the legitimate product capability path from PA09.

PA11–PA13 do not automatically lift because `lumber.normal-room` and the `lumber.foreman.night` NightChoice definition are currently constructed in test code rather than stored in the target production definition fixture.

## Rows not solved by activation alone

These remain **BLOCKED** until their own missing product behavior exists:

- **PA07** — School progress/public fact and harness School adapter boundary;
- **PA08** — authoritative School→Lumber fact emission;
- **PA09** — meaningful item acquisition/capability;
- **PA16** — Forest product depth (3 route contexts, 3 challenge families, season difference);
- **PA17** — item changes available Activity action.

These should not be made green by adding test-only facts or direct state mutation and then calling that Product Acceptance.

## Shipped-only rows today

The current production catalog can genuinely support these harness rows without target fixture substitution:

- **PA00** fresh state/save-reload baseline;
- **PA01** finish character creation;
- **PA10** begin NightFlow at engine API level.

This is deliberately narrow. Legacy `lumber`, legacy School actions and legacy endings are not counted as substitutes for target IDs required by later PA rows.

## Presentation IDs relevant to activation

Exact merged target semantic IDs remain:

- shift: `job/lumber/shift/<season>/default`
- result: `job/lumber/result/default`
- milestone: `job/lumber/event/lumber-career-first-shift/default`
- Foreman opening: `relationship/lumber-foreman/lumber-foreman-notice/default`
- Foreman Night: `relationship/lumber-foreman/lumber-night-foreman-professional/default`
- Forest return: `job/lumber/event/lumber-cross-activity-forest-return/default`
- School example: `school/arcana/lesson/default`
- Hard Work ending: `ending/lumber/hard-work`

The semantic presentation resolver already ships. Row readiness still follows catalog/content activation; a valid presentation ID in a fixture does not make the underlying gameplay row shipped.

## Readiness-test contract

The optional QA test `tests/qa-product-acceptance-row-runner-readiness.test.ts` validates this artifact's structural claims only:

- exactly 27 readiness rows;
- exact classification sets;
- exact save/reload checkpoint set from the existing PA harness;
- target Lumber IDs absent from production `definitions.json`;
- nested target packs excluded by current top-level-only build/validate scans;
- exact Hard Work 50-shift gate and `hardWork:lumber` reward;
- test-local Night IDs are not mistaken for production definitions;
- blocked rows remain explicitly blocked.

It does not fabricate or execute missing product transitions.
