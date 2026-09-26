# Product Acceptance Wiring Review v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Reviewed: PR #16 Lumber @ `36cda375be7052da168983522f28e0b47e12b950`, PR #17 School @ `b7aca2280ba39d44a909fceb3365a25eca1f5254`  
Presentation baseline: Phase B main `99204598c168d6d758aee43014e65c2d993feba1`

## Current PR health

### PR #16 — Lumber

The latest Chat3 Lumber workflow reaches typecheck, validation and build, then fails the test suite. Eleven Lumber tests fail from one catalog-schema blocker:

`ending.lumber.hard-work.metaRewards[0].rewardId = "hardWork:lumber"`

Current schema IDs must match `^[a-z][a-z0-9_.-]{1,79}$`; the colon is illegal. The first schema-validity test fails, so all tests that construct the same Lumber fixture fail downstream.

This is a concrete merge blocker on PR #16. Chat 4 does not patch production fixture data.

### PR #17 — School

The latest Chat5 School workflow has 131 passing tests and one failure. The failing Night-study test calls `endDay` on a fixture whose character creation is complete but whose `story.arrived` flag was never set. Engine NightFlow correctly rejects with “Сначала завершите вступление.”

This looks like a test-fixture precondition defect rather than evidence that the School Night-study mechanics are wrong. The PR is nevertheless not green at the reviewed head.

## Exact Product Acceptance fixture IDs already available

The existing Chat 4 PA harness expects thirteen fixture keys.

| Harness key | Available ID / hook | Status |
|---|---|---|
| `lumberWorkAction` | `lumber.shift` | AVAILABLE in PR #16 fixture |
| `schoolAction` | PR #16 synthetic: `school.lumber-management`; PR #17 production model: course IDs through School runtime, not generic `action(id)` | CONFLICT / adapter needed |
| `lumberMilestoneEvent` | `lumber.career-first-shift` | AVAILABLE |
| `foremanRelationshipEvent` | `lumber.foreman-notice` | AVAILABLE |
| `normalLodging` | none in PR #16/17 target fixture | MISSING |
| `foremanNightChoice` | none | MISSING |
| `forestActivity` | `lumber.forest` | AVAILABLE |
| `forestAdvanceAction` | A5 adapter command ID `advance` | AVAILABLE as synthetic counter adapter |
| `forestEscapeAction` | A5 adapter command ID `escape` | AVAILABLE |
| `itemCapabilityAction` | none; PR #16 has only a test-only capability adapter via world fact | MISSING |
| `lumberContinuationEvent` | `lumber-cross.activity-forest-return` | AVAILABLE |
| `hardWorkEnding` | `ending.lumber.hard-work` | AVAILABLE after PR #16 schema blocker is corrected |
| `complexLumberEnding` | `ending.lumber.forewoman` | AVAILABLE; `ending.lumber.forest` is also available |

Additional PR #16 IDs:

- career: `lumber`;
- relationship: `lumber.foreman`;
- School-result event: `lumber-cross.school-management-return`;
- Activity results: `lumber.forest.success`, `lumber.forest.escape`, `lumber.forest.failure`;
- item-capability fixture item: `old_boundary_token`;
- capability adapter: `enter_old_boundary`;
- adapter fact: `lumber.capability.enter-old-boundary`.

## PR #17 School IDs

PR #17 provides eight production-course IDs:

- `school.course.literacy_and_numbers`;
- `school.course.arcana`;
- `school.course.rhetoric_and_social`;
- `school.course.etiquette_and_presentation`;
- `school.course.field_craft`;
- `school.course.physical_training`;
- `school.course.arts_and_performance`;
- `school.course.body_confidence`.

Each ordinary lesson costs exactly 1 current-day Energy. Tuition is respectively 300, 500, 300, 400, 400, 400, 500, 400. Course records also carry stable presentation IDs such as `school/arcana/lesson/default`.

Night-study choices are generated as:

`school.night_study.<course-slug>.<stat>`

They are not yet wired into active definitions/UI on PR #17; the wiring document instructs the integrator to append them during catalog bootstrap.

## Cross-PR conflicts / integration gaps

### 1. PR #16 is not schema-valid at current head

The invalid `hardWork:lumber` reward ID prevents the dedicated Lumber catalog from loading. All PA steps depending on the Lumber target fixture inherit this global blocker until the producing branch is green.

### 2. PR #16 synthetic School action must not become the production School path

`school.lumber-management` exists to prove School-result→Lumber reaction in the isolated Lumber fixture. PR #17 defines the accepted School runtime separately with eight courses and a proposed `schoolLesson(courseId)` engine command.

Using both as production School would create two School transaction models. The integrated PA fixture should use PR #17’s School runtime and emit the typed/public fact needed by Lumber, not keep the synthetic PR #16 action as a second authoritative product School.

### 3. Existing Chat 4 harness assumes School is a generic `action(id)`

The PA harness key `schoolAction` and its current command adapter use `{type:'action', id:...}`. PR #17’s integration packet instead requires a new `schoolLesson(courseId)` command.

After the Lead wires that command, the PA harness should gain a School-specific adapter. Until then PA07 cannot use the production School route.

### 4. Product School progression/public fact is not implemented in PR #17

The Product Acceptance spec requires track + teacher/presentation + progress + milestone/public fact affecting Lumber. PR #17 implements exact course transaction data, presentation IDs and Night-study definitions, but it does not persist School-owned `lessons_completed`/milestone facts or emit a Lumber-specific public fact.

PR #16 supplies `lumber.school.management-ready`, but only through its synthetic School action. The integrated product path therefore still needs one explicit School progression/public-fact hook.

### 5. School presentation naming differs across PRs

The presentation taxonomy says kebab-case and PR #15’s target-shaped test uses `school/field-craft/lesson/default`. PR #17 uses underscore slugs such as `school/field_craft/lesson/default`.

The presentation schema accepts underscores technically, but Product Acceptance should settle one canonical semantic ID rather than ship aliases accidentally.

### 6. School module presentation IDs are outside PR #15’s current slot inventory

PR #15 discovers slots from catalog actions/events/endings. PR #17’s course records are a separate module. Integration must register those course presentation IDs with the presentation registry/editor, or School media will not be selectable by those IDs.

### 7. Lumber/Foreman events lack presentation source ownership

PR #15 uses `event.sourceDomain` to choose job or relationship namespaces. PR #16’s target events omit it, so they derive generic town-event presentation IDs. This blocks clean PA milestone/relationship presentation assertions until mapped.

### 8. Lumber result slot vs seasonal shift media needs explicit wiring

Target `lumber.shift` maps the result to `job/lumber/result/default`, while PR #16 supplies seasonal shift media. Integration must intentionally choose a generic result asset/fallback or a season-aware result policy; it should not rely on accidental candidate order.

### 9. Item capability is test-adapter only

PR #16 documents `old_boundary_token` as `TEST_ADAPTER_UNTIL_SHARED_ITEM_CAPABILITY_SCHEMA`. It publishes a world fact that permits Activity entry, but it is not a real inventory/capability action and does not satisfy PA09/PA17’s requirement that an item changes the available action space.

### 10. Product Night/Foreman night is missing

PR #16 definitions explicitly contain empty `lodgings` and `nightChoices`. PR #17 can generate School Night-study choices, but no normal Product Acceptance lodging ID or optional Foreman night meeting exists in these slices.

### 11. Forest product depth is not present

The Lumber Forest fixture correctly exercises A5 entry cost, separate internal endurance, save/resume, success/escape/failure and result→Resolver. It remains the synthetic `counter.v1` adapter and does not provide:

- 3 route contexts;
- 3 challenge families;
- seasonal difference;
- real item-dependent action.

Therefore it proves architecture wiring, not PA16/PA17 product depth.

### 12. PR #16 content is fixture-scoped, not the active shipped catalog

The target definitions are a dedicated fixture JSON, and its packs live under `content/packs/lumber-target/`. The normal active catalog loader/build currently consumes the existing top-level content set. A green fixture merge alone does not make Lumber the player-facing production path.

## PA00–PA26 readiness map

Every row marked “READY after green merge” that depends on PR #16 is still globally blocked by the current invalid reward ID. “Ready” below means the required mechanics/fixture IDs already exist once the producing PR passes its own gate.

| PA step | Readiness | Wiring note |
|---|---|---|
| PA00 fresh target product baseline | BLOCKED | Current active product catalog still lacks the full visible Day-1 target alternatives Lumber + Satyr Maid + Undead Farm and does not load the PR #16 fixture as production content. |
| PA01 finish creation | READY now in core | Existing architecture/core behavior; not specific proof of new product integration. |
| PA02 enter Lumber context | READY after green merge | `lumber.shift` initializes the typed career and first-shift reaction chain. |
| PA03 ordinary Lumber shift | READY after green merge / presentation PARTIAL | 1-Energy shift + typed counter + seasonal package exist. Presentation runtime is in main, but result-slot wiring needs the explicit policy noted above. |
| PA04 seasonal repeatable variant | READY after green merge / presentation PARTIAL | Four seasonal shift scenes exist. Product result presentation still needs wiring clarity. |
| PA05 career milestone | READY after green merge / presentation PARTIAL | `lumber.career-first-shift` fires reactively; sourceDomain/presentation mapping is missing. |
| PA06 Foreman opening | READY after green merge / presentation PARTIAL | `lumber.foreman-notice` opens professional route at zero extra Energy; relationship presentation namespace needs mapping. |
| PA07 production School lesson | BLOCKED / PARTIAL | PR #17 course transactions exist, but engine command/UI integration plus School track/progress/public-fact hook are missing. PR #16 synthetic School action is not an acceptable replacement for production wiring. |
| PA08 School→Lumber continuation | PARTIAL | Lumber reaction event exists and synthetic action proves the reaction. Production PR #17 does not yet emit the required Lumber-facing typed/public fact. |
| PA09 obtain meaningful item | BLOCKED | Only test-only world-fact capability adapter exists; no production inventory/capability acquisition. |
| PA10 begin NightFlow | CORE READY, product fixture missing | Architecture NightFlow exists; the Product Acceptance fixture does not define target lodging/night content. |
| PA11 normal lodging | BLOCKED | No `normalLodging` fixture ID in PR #16/17. |
| PA12 optional Foreman night meeting | BLOCKED | No Foreman Night choice/event exists. |
| PA13 finish product night | BLOCKED as vertical slice | Core NightFlow is green, but the required product lodging/Foreman-night sequence is absent. |
| PA14 enter Forest Activity | READY after green merge | `lumber.forest`, 2-Energy entry and capability gate exist in fixture form. |
| PA15 save/reload inside Forest | READY after green merge | A5 envelope/reload semantics already exist and the Lumber Activity uses them. |
| PA16 Forest route/challenge sequence | BLOCKED for product acceptance | Counter adapter lacks required 3 routes, 3 challenge families and season difference. |
| PA17 item capability changes Activity action | BLOCKED | No item-dependent Activity action exists. |
| PA18 Forest success→Lumber continuation | READY after green merge / presentation PARTIAL | `lumber.forest.success` triggers `lumber-cross.activity-forest-return` at zero extra Energy; event presentation mapping still generic without sourceDomain. |
| PA19 Forest escape branch | PARTIAL | Distinct `lumber.forest.escape` exists and exits via A5, but full Forest product route semantics are absent. |
| PA20 resolve post-Activity continuation | READY after green merge | `continue` adds Lumber career facts and can make Forest ending eligible. |
| PA21 two endings eligible simultaneously | READY after green merge | Dedicated test attempts Hard Work + Forewoman + Forest simultaneous eligibility; cannot execute until PR #16 catalog blocker is fixed. |
| PA22 continue play while endings eligible | READY in A6/core + fixture | Eligibility is separate from commitment. |
| PA23 explicit ending commit | READY after green merge / presentation integration required for visual assertion | A6 command exists; target Lumber ending ID exists. |
| PA24 central completion / RunResult | READY after green merge / presentation integration required for visual assertion | A6 exactly-once completion exists; ending semantic slot resolves correctly in PR #15. |
| PA25 reward exactly once | READY after green merge | A6 proof exists; Lumber Hard Work reward test is intended but currently blocked by invalid reward ID. |
| PA26 New Run with visible Meta difference | READY after green merge | A6 Lumber Hard Work produces +3 Strength/+3 Endurance next-run effect once the ending can load/complete. |

## Steps specifically requiring Night integration

The vertical path cannot complete **PA10–PA13** until product Night content is wired. PA12 additionally requires the missing Foreman night beat. PR #17’s generated School Night-study choices are useful School functionality but do not fill the Foreman requirement.

## Steps specifically requiring presentation integration

PR #15 runtime is already integrated into main, but production semantic slot mapping/data is still required for presentation assertions in:

- PA03–PA06 Lumber shift/milestone/Foreman;
- PA07–PA08 School;
- PA12 Foreman night;
- PA14–PA20 Forest/return;
- PA23–PA24 ending.

PA00 also requires the integrated central-stage baseline, which PR #15 already supplies at runtime.

## Immediate integration order for the Lead

1. Make PR #16 schema-valid and green; do not merge a target fixture whose catalog cannot load.
2. Fix PR #17’s Night-study test fixture so the PR has a trustworthy green gate.
3. Choose PR #17 as the production School transaction source; connect it to a typed School progress/public fact that PR #16 Lumber can observe.
4. Align/register presentation IDs: School canonical slugs, Lumber/Foreman event source domains, and Lumber result-slot policy.
5. Add product normal lodging + Foreman night content.
6. Replace the test-only item capability adapter with the production item/action-space hook required by PA09/PA17.
7. Expand Forest beyond the synthetic counter adapter to the required product depth.
8. Activate the vertical slice in the shipped catalog, then run PA00–PA26 rather than treating isolated fixture tests as full Product Acceptance.

No production runtime, UI or content files were modified by Chat 4.
