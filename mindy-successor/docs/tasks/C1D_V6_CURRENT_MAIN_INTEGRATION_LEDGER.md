# Chat 1 Developer — queue v6 current-main integration ledger

Owner: Chat 1 Developer / Integration Developer
Queue: C1D-49..C1D-60
Refreshed production baseline: `5f2685f1fde6b4718483febd6f49108eaa4ac873`
Working branch: `chat1/c1d-v6-current-main-refresh`

Current main at final pre-gate recheck: `f3a684448b0681c355452b7d24d836e3926cb594`.
Drift from the refreshed production baseline is 4 commits and changes only:
- `ACTIVE_TEAM_OWNERSHIP_MATRIX.md`;
- `CURRENT_CHAT4_TASK_POINTER.md`;
- new `TASK_CHAT4_QA_QUEUE_v8.md`.

No runtime/content/localization/test path in this candidate overlaps that drift.

## C1D-49 — post-v5 consolidation inventory

Merged current-main inputs, not duplicate-copied:
- PR #106 / C1D v5 content-consumer integration;
- PR #109 / Chat 2 cross-domain presentation candidate;
- PR #108 / Chat 3 Forest + poverty depth v5;
- PR #105 / Chat 5 whole-School transfer atlas.

Still product-open:
- natural School -> Lumber management publisher contract;
- intermediate Lumber progression topology/conditions;
- late-career production unlock thresholds;
- Secret Debt values;
- Satyr Maid / Undead Farm intermediate progression.

The authoritative blocker source is `CURRENT_PRODUCT_DECISION_BLOCKERS.md`.

## C1D-50 — career-unavailable reason contract audit

Current engine:
- starter careers are exactly Lumber, Satyr Maid and Undead Farm;
- `actionAvailable()` evaluates authored conditions;
- a non-starter ordinary `.shift` with empty conditions remains unavailable.

Current Work UI:
- button disabled state correctly uses `actionAvailable()`;
- requirement prose is generated only from failed authored action conditions.

All seven current late ordinary-career shifts still have `conditions=[]`, so the UI can disable them but has no concrete authored condition to explain. A generic “no authored unlock condition yet” explanation would be possible without choosing thresholds, but queue v6 does not authorize inventing a production unlock value.

Disposition: audit complete; preserve starter lock and do not invent thresholds.

## C1D-51 — generic late-career unlock seam

Current main already contains the focused regression in `tests/starter-trio-availability.test.ts`:
- empty conditions do not unlock a late career;
- a test-only authored world-fact condition is evaluated by the existing evaluator;
- before the fact dispatch rejects;
- after the fact dispatch succeeds.

Disposition: CURRENT-MAIN NO-OP. No duplicate test added.

## C1D-52 — Satyr Maid Save/reload

Added `tests/starter-career-save-reload.test.ts`.

Proves current Satyr Maid shift state survives two existing `parseSave` round-trips:
- stage `known-face`;
- `completed_shifts=1`;
- `shifts=1`;
- fact `first-shift-complete`;
- existing `lastAction` including semantic presentation identity and selected source-scene text.

No new progression or Save state.

## C1D-53 — Undead Farm Save/reload

Same focused regression proves:
- stage `reliable-helper`;
- `completed_shifts=1`;
- `shifts=1`;
- only current fact `first-shift-complete`;
- existing `lastAction` survives two reloads;
- no research/specimen/successor/external career fact is introduced.

No new Farm research/progression state or Save field.

## C1D-54 — starter-career localized result persistence

Added `tests/starter-career-localized-result-persistence.test.ts`.

For Lumber, Satyr Maid and Undead Farm the regression:
- reaches a direct multi-scene action result;
- round-trips Save twice;
- recovers the exact authored scene from persisted source text;
- proves the generic `action.<actionId>.scene.<sceneId>.text` consumer remains stable;
- verifies locale switching does not mutate Save.

Satyr Maid / Undead Farm consume the merged RU/EN scene strings from PR #106.
Lumber currently has no root action-scene localization key for those production fixture scenes, so the same consumer correctly preserves the source-text fallback in both locales rather than inventing new Lumber prose.

## C1D-55 — School exact-course reactive-routing audit

Exact paid course identity is safely available to presentation/text consumers through existing state:
- each School course has a unique semantic `presentationId`;
- `executeSchoolLesson()` persists that ID in existing `lastAction.presentationId`;
- UI already recovers the exact `SchoolCourse` from that ID;
- exact School track identity also exists in typed School progress.

The reaction resolver still receives generic `actionCompleted: school` plus changed stats/resources and therefore cannot identify the exact paid course from reaction facts alone.
No teacher ID is serialized in Save.

Conclusion:
- exact-course UI/text routing is safe;
- exact-course event-reaction routing would require a new contract and is not implemented here.

## C1D-56 — minimal School reactive consumer

Added `src/ui/schoolReactive.ts` with the exact eight current PR #105 course -> teacher -> body-key bindings from `school-teacher-transfer-coverage-v2.fixture.json`.

Updated School result UI:
- exact course is recovered from existing `lastAction.presentationId`;
- the approved teacher-transfer body for that course is localized;
- fallback remains the existing generic School lesson-result text;
- course title remains the existing exact course label.

Promoted exactly eight approved RU/EN body strings from the merged Chat 5 fixture.
No title strings were promoted because the result title still uses the course label.

Added `tests/school-reactive-consumer.test.ts` covering:
- all eight exact course identities;
- exact fixture mapping parity;
- RU/EN rendering;
- locale-switch Save isolation.

No School mechanics, thresholds, public producer fact, reaction-fact schema or Save field changed.

## C1D-57 — Forest depth selective consumer

Merged PR #108 provides one unambiguous text variant for each existing route ID + season pair.

Added `src/ui/forestDepth.ts`:
- `logging-road` + spring/summer/autumn/winter;
- `old-boundary` + spring/summer/autumn/winter.

Updated the existing Forest Activity narrative consumer to select only by:
- current existing `routeId`;
- current calendar season.

Promoted exactly eight approved RU/EN route-season strings.
Fallback remains the existing route-entry localization.

Explicitly not consumed:
- Forest success aftermath variants;
- Forest escape/failure variants.

Those result surfaces contain multiple prepared texts per existing outcome without an approved deterministic selector. No new result selector, Activity state, reward/effect, world fact or encounter was invented.

Added `tests/forest-depth-consumer-v6.test.ts` for fixture parity, selector-less result exclusion and RU/EN browser rendering without Save mutation.

## C1D-58 — ordinary-poverty depth selective consumer

Merged PR #108 material was split by safe existing consumer.

Consumed:
- 8 `ordinary-poverty.housing-seasonal-depth.v1` strings;
- 6 `ordinary-poverty.recovery-depth.v1` strings.

All 14 map to exact existing poverty event + variant pairs and are appended to the existing deterministic occurrence selector. The selector still uses existing event-history count and preserves existing candidate order before the new append-only strings.

Not consumed:
- 6 `ordinary-poverty.small-job-depth.v1` strings.

Those texts are choice-specific and describe accepting a job/reward, while the current poverty selector renders pending variant prose before a choice. Grafting them into that selector would misrepresent an unresolved player choice.

Secret Debt remains separate and no event/choice/effect/debt state is added.

Updated `tests/poverty-depth-consumer.test.ts` to prove:
- all 14 selected keys are attached to current event/variant identities;
- all are RU/EN complete;
- choice-specific small-job keys remain fixture-local;
- deterministic rotation remains stable.

## C1D-59 — cross-domain integration regression

Added `tests/c1d-v6-cross-domain-integration.test.ts`.

One current-main flow proves together:
- exactly the three starter career shifts are available while seven empty-condition late careers stay locked;
- a real Rhetoric & Social School lesson preserves exact course presentation identity and does not publish `lumber.school.management-ready`;
- the current School teacher-transfer consumer resolves Cassian through existing course identity;
- Forest Logging Road consumes approved spring route depth;
- successful Forest Activity returns through existing `lumber-cross.activity-forest-return` and writes only existing Forest/Lumber facts;
- ordinary-poverty production packs remain independent from Secret Debt and write no generic debt metric;
- selected poverty depth uses an existing event/variant identity;
- final progression and last-action state survive two Save reloads.

## C1D-60 — candidate boundary

Candidate contains only still-needed queue-v6 integration/runtime/UI/regression work:
- C1D-52/53 Save/reload tests;
- C1D-54 localized-result persistence regression;
- C1D-56 exact-course School text consumer + eight approved body strings;
- C1D-57 existing-route seasonal Forest text consumer + eight approved strings;
- C1D-58 append-only ordinary-poverty selector + fourteen approved strings;
- C1D-59 cross-domain regression;
- this ledger.

Explicit unresolved Product decisions remain exactly those in `CURRENT_PRODUCT_DECISION_BLOCKERS.md`.
This candidate does not claim to solve the natural School -> Lumber publisher or intermediate Lumber progression contract.
