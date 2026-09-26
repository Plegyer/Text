# Product Activation Regression Risk Ledger v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Branch: `chat4/activation-regression-next`

## Review snapshot

Cross-checked at review time:

- current `main`: `9e0be0a33402166d72f125b74c29fd345e74c6fd`;
- Lead activation branch `lead/product-activation-school-lumber-v2`: `aad37da8bc010d18dffee8c0f0efe50138c21ef9`;
- Chat 2 activation-prep branch `chat2/presentation-activation-next`: `6694791741208f1a5870a9d96c9c06d3362fa558`;
- Chat 3 activation-prep branch `chat3/lumber-integration-prep-next`: `0d225ecfeefc47665df348f69943d148b36388e8`;
- Chat 5 save/activation-prep branch `chat5/school-save-compat-next`: `cd6d466f27f0937ae6feab9594dac732510cc0f8`.

Visible Lead diff versus main currently changes only:

- `src/core/schema.ts`;
- `src/core/engine.ts`;
- `src/core/school.ts`.

At this snapshot Lead has **not yet changed production definitions, build/validate discovery, UI, or assets**.

This ledger names regression risks, existing evidence, and the focused evidence still missing. It does not authorize production edits or invent open content thresholds.

---

# A. Merging target Lumber definitions with legacy Lumber

## A1 — UI can keep executing legacy `lumber` instead of target `lumber.shift`

### Failure mode

Current production UI hard-codes:

`professions=['tavern','lumber','hunt','guard']`

Target progression is attached to:

`lumber.shift`

not legacy:

`lumber`.

If both actions exist after activation and UI still dispatches `lumber`, the player sees a Lumber-looking job but does not enter the target typed career path, does not increment `completed_shifts`, and cannot reach the target first-shift/Foreman/Hard Work flow.

If both are simultaneously exposed, there is a second failure mode: two different Lumber jobs with different persistence/progression semantics.

### Exact files/APIs

- `content/definitions.json`
- `src/ui/app.ts -> professions / actionList`
- `dispatch({type:'action',id:'lumber.shift'})`
- `dispatch({type:'action',id:'lumber'})`

### Existing tests/evidence

Current/merged:
- `tests/lumber-target-production.test.ts`
- `tests/product-presentation-semantic-ids.test.ts`
- `tests/ui.test.ts`

Chat 3 prep:
- `tests/lumber-production-activation-contract.test.ts`
  - explicitly names `lumber.shift` as the production candidate.

### Missing focused test

**Production UI Lumber identity test**:

- load the actual activated production catalog;
- open Work;
- assert target control dispatches exactly `lumber.shift`;
- assert legacy `lumber` is either hidden/non-product or explicitly compatibility-only;
- execute one shift and assert `completed_shifts=1` plus pending `lumber.career-first-shift`.

---

## A2 — removing legacy `lumber` can invalidate old schema-4 saves

### Failure mode

Current `parseSave` validates:

- `lastAction.id` must exist in current catalog actions;
- every `historyState.actionCounts` key must exist in current catalog actions.

An old shipped schema-4 save can legitimately contain:

- `lastAction.id='lumber'`;
- `actionCounts.lumber > 0`.

If activation replaces/removes legacy `lumber`, that old save fails even though it was valid before activation.

### Exact files/APIs

- `src/core/engine.ts -> parseSave()`
- `run.flow.lastAction.id`
- `run.historyState.actionCounts`

### Existing tests/evidence

Current:
- `tests/storage.test.ts`
- `tests/migration.test.ts`

Chat 4:
- `PRODUCT_ACTIVATION_SCHEMA4_COMPAT_MATRIX_v1.md`

### Missing focused test

**Pre-activation schema-4 save under activated catalog**:

- produce/save a real legacy Lumber run on current main;
- load the exact JSON using activation catalog;
- assert no count loss, no replay and no load failure.

If the ID is retired, the test must exercise the explicit compatibility alias/migration rather than deleting the counter.

---

## A3 — copying the full target fixture can accidentally ship synthetic School action

### Failure mode

`content/lumber-target-definitions.fixture.json` contains:

`school.lumber-management`

This is an isolated cross-system proof action. It is not the accepted production School transaction.

Blindly merging the entire fixture into production definitions would create a second School model and allow the Lumber fact:

`lumber.school.management-ready`

to be manufactured through a synthetic action.

### Existing tests/evidence

Chat 3:
- `tests/lumber-production-activation-contract.test.ts`
  - explicitly asserts activation candidates and excludes synthetic School activation.

Current:
- `tests/lumber-target-cross-system.test.ts`
  - proves the synthetic boundary only as isolated fixture behavior.

### Missing focused test

**Production definitions exclusion test**:

- production catalog contains `lumber.shift`;
- production catalog does **not** contain `school.lumber-management`;
- School→Lumber fact must originate only from the approved production School/public-fact integration.

---

## A4 — activation can drift Hard Work or couple it to School/Forest/Foreman

### Failure mode

During definition merge it is easy to accidentally add new target prerequisites to the Hard Work ending or reuse a complex ending condition set.

Locked rule:

`completed_shifts >= 50`

and nothing else.

Locked reward:

`hardWork:lumber`.

### Existing tests/evidence

Current:
- `tests/lumber-target-production.test.ts`
- `tests/lumber-night-acceptance.test.ts`
- `tests/ending-meta.test.ts`

Chat 3:
- `tests/lumber-ending-independence.test.ts`
  - false at 49, true at exactly 50;
  - Forewoman and Forest remain independent;
  - reward exactly once.
- `tests/lumber-forest-acceptance-depth.test.ts`
  - Forest requirements do not alter Hard Work.
- `tests/lumber-production-activation-contract.test.ts`

### Missing focused test

**Activated production catalog exact ending assertion**:

- locate `ending.lumber.hard-work` in production definitions;
- assert exactly one condition;
- deep-equal exact 50-shift condition;
- deep-equal exact `hardWork:lumber` reward;
- prove School/relationship/Forest state is irrelevant at 50.

---

# B. Recursive / explicit production pack inclusion

## B1 — build and validate can activate different pack sets

### Failure mode

Changing only one of:

- `scripts/build.mjs`;
- `scripts/validate.ts`;

can make validation green on one catalog and ship another.

Recursive traversal can also produce nondeterministic path ordering if discovery is not normalized and sorted.

### Existing tests/evidence

Current:
- `src/core/content.ts -> loadCatalog()` rejects duplicate pack IDs.

Chat 4:
- `PRODUCT_ACTIVATION_SHIPPED_CATALOG_AUDIT_v1.md`
- `PRODUCT_ACTIVATION_MERGE_GATE_CHECKLIST_v1.md`

Chat 3:
- `tests/lumber-production-activation-contract.test.ts`
  - identifies intended Lumber activation candidates.

### Missing focused test

**Exact production pack-set parity test**:

- invoke or share the same discovery helper used by build and validate;
- compare normalized relative paths and pack IDs;
- assert each intended target pack exactly once;
- build `dist/content.json`;
- assert its pack-ID set equals validation pack-ID set.

---

## B2 — nested target packs can be loaded before their required definitions exist

### Failure mode

The nested packs reference typed domains that current production definitions do not provide:

- career `lumber`;
- relationship `lumber.foreman`;
- Activity `lumber.forest`;
- NightChoice `lumber.foreman.night`.

If pack discovery is enabled before the matching definitions are activated, `loadCatalog` should fail. A rushed workaround that weakens reference validation would create dangling runtime content.

### Existing tests/evidence

Current:
- `tests/content.test.ts`
- `tests/lumber-target-production.test.ts`
- `tests/lumber-target-cross-system.test.ts`
- `tests/lumber-night-acceptance.test.ts`

### Missing focused test

**Production activation catalog construction test** using exactly:

`content/definitions.json + production-discovered pack set`

with no test-time mutation.

It must prove all target cross-references validate and no test helper injected the missing domains/Night choices.

---

## B3 — target pack inclusion can immediately break media validation

### Failure mode

Lumber target packs declare `assets/lumber/*.gif`, while current main has no `assets/lumber/` directory.

Once nested packs are discovered, current `scripts/validate.ts` checks `existsSync(media.src)` and can fail the build before runtime fallback is relevant.

### Existing tests/evidence

Chat 2:
- `tests/presentation-shipped-media-gap.test.ts`
  - explicitly separates declared target media from currently shipped media;
  - currently expects missing declared target media to exist as a visible gap.
- `tests/presentation-product-coverage.test.ts`
- `tests/presentation-override-pack-preflight.test.ts`

Current:
- `tests/presentation-stage.test.ts`
- `tests/presentation-ui.test.ts`

### Missing focused test

**Activated production media validation test**:

- use the exact production-discovered pack set;
- run the same media validation as `scripts/validate.ts`;
- prove each required source either exists or is represented through an explicitly accepted production fallback strategy.

Important: once the asset gap is resolved, Chat 2's current gap-audit assertion that at least one declared target asset is missing must be updated; retaining that expectation would be a stale-test failure, not a product regression.

---

## B4 — recursive inclusion can double-load or accidentally include non-production pack JSON

### Failure mode

A broad “walk every JSON under content” implementation risks including fixtures/drafts or duplicate representations. The allowed discovery root is `content/packs`, but even inside that root an explicit allow-set may be safer than accidental expansion.

### Existing tests/evidence

- `loadCatalog` duplicate pack-ID rejection.
- Chat 4 merge-gate checklist defines exact intended pack IDs.

### Missing focused test

**Discovery allow-set snapshot** that compares exact paths, not merely “contains Lumber”.

No pack should be included merely because it ends in `.json`.

---

# C. School command / UI activation

## C1 — new School command and legacy `school` action share the same compatibility identity

### Failure mode

Visible Lead code adds:

`Command {type:'schoolLesson';id:SchoolCourseId}`

and `executeSchoolLesson` still emits:

`actionCompleted('school')`

and increments:

`actionCounts['school']`.

Current production definitions already contain a legacy generic action:

`id='school'`.

If both paths remain player-visible, they can share reaction/action-count identity while having completely different costs/stat packages/progression ownership.

A legacy School click could trigger observers intended for the new course transaction if conditions happen to match.

### Existing tests/evidence

Current:
- `tests/school-engine-adapter.test.ts`
- `tests/school-night-study-adapter.test.ts`

Chat 5:
- `SCHOOL_PROGRESSION_OWNERSHIP_AUDIT_v1.md`
  - explicitly says generic actionCounts and legacy `metrics.lessons` are not School progression authority.
- `tests/school-production-ui-fixture.test.ts`

### Missing focused test

**Production School UI exclusivity/integration test**:

- all eight target course controls dispatch `schoolLesson`;
- legacy generic `school` is not a competing visible course transaction;
- one paid course increments exactly one generic compatibility action count if that behavior is retained, and exactly one typed `lessons_completed` counter;
- no double Resolver boundary.

---

## C2 — removing legacy `school` can make new Lead School saves unloadable

### Failure mode

Visible Lead `executeSchoolLesson` sets:

- `lastAction.id = 'school'`;
- `actionCounts['school'] += 1`.

Current `parseSave` requires both lastAction IDs and actionCount keys to exist in `catalog.definitions.actions`.

Therefore, if activation removes the legacy `school` action from production definitions while keeping this compatibility identity, **a newly executed target School lesson can produce a save that later fails parseSave**.

This is separate from old-save compatibility; it can affect brand-new activation saves.

### Existing tests/evidence

Chat 5:
- `tests/school-full-reload-matrix.test.ts` covers paid School reload on the pre-Lead helper shape.
- `tests/school-typed-state-compat.test.ts` covers missing School progression default concept.

Current:
- `tests/storage.test.ts`

### Missing focused test

**Lead School command -> production save -> parseSave test** against the actual activated production catalog.

It must assert:

- `schoolLesson` succeeds;
- save serialization succeeds;
- `parseSave` succeeds immediately;
- lastAction, actionCounts, School counter and presentation ID survive.

If production intends to remove legacy action `school`, a compatibility ID strategy is required before merge.

---

## C3 — School-owned counters can be double-counted

### Failure mode

Visible Lead adds:

- paid lesson -> `incrementSchoolCounter(track, lessons_completed, +1)`;
- Night study -> `incrementSchoolCounter(track, night_study_sessions, +1)`.

Any UI/adapter wrapper that also increments those values will double progress.

Reload must not replay either transaction.

### Existing tests/evidence

Chat 5:
- `tests/school-typed-state-compat.test.ts`
- `tests/school-full-reload-matrix.test.ts`
- `SCHOOL_PROGRESSION_OWNERSHIP_AUDIT_v1.md`

Current:
- `tests/school-engine-adapter.test.ts`

### Missing focused test

**Lead-command exactly-once School progression test**:

- dispatch real `schoolLesson`;
- save/reload twice;
- assert `lessons_completed=1`;
- Night study separately yields `night_study_sessions=1` and does not touch lessons counter.

---

## C4 — production UI may show eight courses but still dispatch the wrong API

### Failure mode

A UI can look correct while mapping course buttons to generic `action` commands.

That would bypass the accepted tuition/package/typed-counter transaction.

### Existing tests/evidence

Chat 5:
- `tests/school-production-ui-fixture.test.ts`
  - validates the eight-course manifest/data surface only.

Current:
- `tests/ui.test.ts`

### Missing focused test

**jsdom production School command test** asserting button dataset/handler results in:

`{type:'schoolLesson', id:<exact course id>}`

for all eight course IDs.

---

# D. Night-study catalog activation

## D1 — completed Chat 5 Night-study expectations are stale relative to visible Lead behavior

### Failure mode

Chat 5 prep tests currently assert each generated Night-study choice has exactly:

```ts
effects:[{kind:'modifyStat',stat,delta:2}]
```

Visible Lead code now generates:

1. `modifyStat(+2)`;
2. `incrementSchoolCounter(track, 'night_study_sessions', +1)`.

Therefore these prep tests will fail if copied/merged unchanged:

- `school-night-choice-catalog.test.ts`
- `school-full-reload-matrix.test.ts`
- parts of `school-production-ui-fixture.test.ts`.

This is an expected contract evolution only if typed Night-study ownership is intentional. The tests must be updated consistently, not suppressed.

### Existing tests/evidence

Chat 5:
- `SCHOOL_PROGRESSION_OWNERSHIP_AUDIT_v1.md` explicitly wanted a typed `night_study_sessions` counter.
- `tests/school-typed-state-compat.test.ts` keeps paid/night counters separate.

### Missing focused test

**Updated generated Night-study contract test** against visible Lead API:

- +2 selected supported stat;
- +1 exactly one track `night_study_sessions`;
- zero tuition;
- zero current-day Energy;
- next-day Energy -1;
- no Lust;
- repeated reload cannot duplicate either stat or counter.

---

## D2 — activating all generated Night choices can expose an unintended availability surface

### Failure mode

Current/Lead `schoolNightStudyChoice()` returns:

`conditions: []`.

If all generated choices are copied directly into production `definitions.nightChoices`, all 24 course/stat choices are structurally eligible whenever NightFlow reaches voluntary choice.

There is currently no locked enrollment/certificate threshold in Chat 5 prep artifacts, so activation must not invent one — but it also must explicitly decide/test the intended visibility policy rather than accidentally exposing every generated entry.

### Existing tests/evidence

Chat 5:
- `tests/school-night-choice-catalog.test.ts`
  - proves 24 unique course/stat mappings;
  - deliberately does not establish enrollment thresholds.
- `tests/school-production-ui-fixture.test.ts`

### Missing focused test

**Production Night menu visibility test** documenting the approved no-threshold/current policy.

If all 24 are intentionally available, assert exactly that. If a later product rule gates them, that rule needs separate authored approval and test.

---

## D3 — production Night choice list can contain duplicate generated IDs

### Failure mode

Activation may append generated School choices on every catalog bootstrap or combine static and generated copies.

`loadCatalog` rejects duplicate NightChoice IDs, but repeated runtime augmentation outside catalog construction can still create UI duplication if not centralized.

### Existing tests/evidence

Chat 5:
- `tests/school-night-choice-catalog.test.ts` asserts 24 unique IDs.

Current:
- NightFlow tests in `tests/night-flow.test.ts`.

### Missing focused test

**Production catalog/bootstrap idempotency test**:

calling the production catalog builder twice must not append a second copy; final NightChoice IDs remain unique and stable.

---

# E. Semantic presentationId persistence

## E1 — Chat 2 negative save-boundary test must be inverted after Lead fix

### Failure mode

Chat 2's completed focused test:

`presentation-save-boundary.test.ts`

currently asserts canonical slash IDs are **rejected**.

Visible Lead fixes the schema by adding a slash-compatible `semanticPresentationId`.

If the old test is merged unchanged it will go red for the correct new behavior.

### Existing tests/evidence

Chat 2:
- `PRESENTATION_SAVE_BOUNDARY_AUDIT_v1.md`
- `tests/presentation-save-boundary.test.ts`

Chat 4:
- `PRESENTATION_SAVE_SCHEMA_COMPAT_AUDIT_v1.md`
- `PRODUCT_ACTIVATION_SCHEMA4_COMPAT_MATRIX_v1.md`

Current:
- `tests/product-presentation-semantic-ids.test.ts`
- `tests/presentation-stage.test.ts`

### Missing focused test

Replace/invert the negative assertion with:

`canonical slash ID -> stringify -> parseSave -> exact same ID`.

Also keep an old pending save **without** presentationId as a backward-compat case.

---

## E2 — Lead persists `lastAction.presentationId`, but current UI ignores it

### Failure mode

Visible Lead writes a semantic presentation ID into `lastAction`.

Current UI result rendering still calls:

`presentationIdForActionResult(catalog,last.id,last.media)`

rather than using:

`last.presentationId ?? ...`.

For target School this is especially risky:

- Lead School lesson persists course-specific ID such as `school/arcana/lesson/default`;
- `lastAction.id` remains compatibility ID `school`;
- recomputing from generic action `school` can derive a generic School presentation instead of the persisted course slot.

This defeats the purpose of freezing semantic identity at the resolved boundary.

### Existing tests/evidence

Current:
- `tests/presentation-ui.test.ts`
- `tests/product-presentation-semantic-ids.test.ts`

Lead source:
- `engine.ts` now stores pending and lastAction presentation IDs.

### Missing focused test

**Saved action-result presentation identity UI test**:

- execute target School/Lumber result;
- save/reload;
- render;
- assert DOM `data-presentation-id` equals persisted `lastAction.presentationId`, not a recomputed generic ID.

---

## E3 — persistence fix must not alter mechanical event/variant identity

### Failure mode

Adding presentation identity during Resolver selection must not rerun variant selection, alter allowed choice snapshot, or affect Resolver priority/history.

### Existing tests/evidence

Chat 2:
- `presentation-save-boundary.test.ts` already proves presentation identity is conceptually independent of event/variant identity.

Current:
- resolver tests;
- save/reload tests;
- presentation tests.

### Missing focused test

**Lead pending-scene full snapshot roundtrip** comparing:

- eventId;
- variantId;
- allowedChoiceIds;
- reactionEpochId;
- presentationId.

Only presentationId is newly populated; all mechanical fields must remain unchanged.

---

# F. Activity UI exposure

## F1 — UI can expose entry without respecting real Activity availability

### Failure mode

Engine correctly enforces `entryConditions` and Energy.

A new UI button can regress by being shown/enabled:

- without required capability;
- during pending scene;
- during NightFlow;
- with insufficient Energy;
- while another Activity is active.

The current Lumber capability is still a test adapter around:

`lumber.capability.enter-old-boundary`.

Exposing a production button must not bypass the missing real item capability by directly granting that fact.

### Existing tests/evidence

Current:
- `tests/activity.test.ts`
- `tests/lumber-target-cross-system.test.ts`

Chat 3:
- `LUMBER_ITEM_CAPABILITY_INTEGRATION_AUDIT_v1.md`
- `tests/lumber-item-capability-integration-audit.test.ts`
- `tests/lumber-forest-acceptance-depth.test.ts`

### Missing focused test

**Activity entry UI eligibility test**:

- no capability -> button hidden/disabled or command rejects;
- legitimate capability -> enter;
- exactly 2 Energy charged once;
- no direct world-fact grant inside UI activation code.

---

## F2 — active Activity reload can render the wrong screen

### Failure mode

Current UI has no dedicated `flow.activity` central rendering branch.

If activation adds entry but not an Activity screen, the run can be mechanically inside Activity while UI renders town/previous action and offers no `advance` or `escape` controls.

After reload, this becomes a soft-lock even though the envelope parsed successfully.

### Existing tests/evidence

Current:
- A5 engine Activity save/reload tests.
- `tests/activity.test.ts`

Chat 3:
- `tests/lumber-forest-acceptance-depth.test.ts`
  - entry cost;
  - intermediate checkpoint;
  - deterministic next success;
  - success/escape/failure;
  - post-success reload.

### Missing focused test

**jsdom active-Activity reload test**:

1. enter `lumber.forest`;
2. save inside Activity;
3. reload;
4. render;
5. assert Activity stage and `advance`/`escape` controls;
6. assert normal Work/School commands cannot be executed until exit.

---

## F3 — UI rerender/double click can duplicate Activity entry transaction

### Failure mode

Entry Energy is a committed A5 boundary. UI activation must not re-dispatch `enterActivity` when rerendering/resuming.

### Existing tests/evidence

- `tests/activity.test.ts`
- Chat 3 `lumber-forest-acceptance-depth.test.ts`.

### Missing focused test

**UI one-click/one-entry test** proving one command dispatch and one 2-Energy charge even across immediate save/reload.

---

## F4 — legacy `forest-search` can be confused with target `lumber.forest`

### Failure mode

Current production already has ordinary legacy action:

`forest-search`.

Target Activity uses:

`lumber.forest`.

If UI labels both similarly or maps a target button to the legacy action, Product Acceptance sees the wrong state machine despite a Forest-looking screen.

### Existing tests/evidence

Current:
- presentation resolver maps legacy forest-search into an Activity-shaped presentation family, which can visually mask the difference.

Chat 3:
- target Activity tests use exact `lumber.forest`.

### Missing focused test

**Exact command identity UI assertion**:

target Forest entry dispatches:

`{type:'enterActivity', id:'lumber.forest'}`

not:

`{type:'action', id:'forest-search'}`.

---

# G. Cross-cutting schema-4 regression risks

## G1 — Lead School default is good, but old saves need explicit regression proof

Visible Lead:

`progression.school.default({tracks:{}})`

matches Chat 5's compatibility direction.

### Existing evidence

Chat 5:
- `tests/school-typed-state-compat.test.ts`
  - older schema-4-shaped save defaults missing School progression.

### Missing focused test

Run a **real current-main schema-4 serialized save** through Lead `parseSave`, not only a compatibility fixture object.

---

## G2 — action-count compatibility remains unresolved on visible Lead head

Visible Lead still rejects actionCounts not present in the active catalog.

This affects legacy Lumber/School removal and new School compatibility identity.

### Existing evidence

- Chat 4 schema-4 matrix.
- current storage/migration tests.

### Missing focused test

One table-driven activation compatibility test with representative legacy production actionCounts, including `lumber` and `school`.

---

## G3 — committed/completed legacy endings can break if activation replaces ending catalog

Current parser requires every referenced ending ID to exist in current catalog.

### Existing tests/evidence

Current:
- `tests/ending-meta.test.ts`

Chat 3:
- `lumber-ending-independence.test.ts`

### Missing focused test

Load pre-activation:

- `ending_committed` save;
- completed RunResult save;

against activated catalog and assert no transaction/reward replay and no unknown-ending failure.

---

# Existing prep tests that are expected to need revision, not blind merge

These completed artifacts encode the **pre-activation observation** and should not all remain unchanged after production activation:

1. **Chat 2 `presentation-save-boundary.test.ts`**
   - currently expects slash presentationId rejection;
   - must flip to positive roundtrip after Lead semantic schema fix.

2. **Chat 2 `presentation-shipped-media-gap.test.ts`**
   - currently expects at least one declared target media asset gap;
   - must be updated when production assets/fallback activation closes that gap.

3. **Chat 5 `school-night-choice-catalog.test.ts`**
   - currently expects one-effect Night choice;
   - visible Lead adds typed `night_study_sessions` counter effect.

4. **Chat 5 `school-full-reload-matrix.test.ts`**
   - its expected Night-study effect shape predates the Lead School counter addition;
   - paid School reload must also be checked against Lead's new `lastAction.id='school'` and actionCounts behavior.

These are not reasons to discard the tests. They are evidence that the contract boundary moved and the assertions must be intentionally migrated.

# Regression gate summary

Before merging production activation, the highest-value missing focused regression tests are:

- production UI `lumber.shift` vs legacy `lumber`;
- old schema-4 legacy `lumber`/`school` actionCounts + lastAction under activated catalog;
- exact production pack-set parity between validate/build/dist;
- production target media validation;
- production School `schoolLesson` UI dispatch and immediate save/reload;
- updated typed Night-study exactly-once test;
- positive slash presentationId pending roundtrip;
- UI consumption of persisted `lastAction.presentationId`;
- active Activity UI save/reload/resume;
- pre-activation committed/completed ending save under activated catalog.

## Visible Lead disposition at `aad37da8bc010d18dffee8c0f0efe50138c21ef9`

Source changes already move in the expected direction for:

- missing School state default;
- typed School track counters;
- explicit `schoolLesson` command;
- slash-compatible pending/lastAction presentation IDs;
- persistence of semantic IDs at Resolver/action boundaries.

Still not visible in the reviewed Lead diff:

- production definitions merge;
- legacy action/save compatibility strategy;
- production pack discovery;
- production asset/media handling;
- UI activation for Lumber/School/Activity/Night;
- positive presentation save/reload tests;
- updated Chat 5 Night-study assertions;
- production-catalog PA regression subset.

No production file is edited by this ledger.
