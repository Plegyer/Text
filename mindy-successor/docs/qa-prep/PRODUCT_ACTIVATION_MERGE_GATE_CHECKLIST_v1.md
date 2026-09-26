# Product Activation Merge-Gate Checklist v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Branch: `chat4/activation-gate-next`  
Current-main baseline reviewed: `9e0be0a33402166d72f125b74c29fd345e74c6fd`

## Purpose

This is the executable pre-merge gate for a future production-activation change.

A production-activation PR must not be merged merely because the isolated PR #19 fixtures are green. It must prove that the target content is loaded by the same paths used by:

- `npm run validate`;
- `npm run build`;
- shipped `dist/content.json`;
- production UI;
- save/reload.

No new balance threshold, School milestone threshold, Forest challenge rule, or item behavior is introduced by this checklist.

## Gate status language

- **PASS REQUIRED** — merge blocker; the activation PR must supply direct evidence.
- **CURRENTLY BLOCKED** — audited main does not satisfy the gate yet.
- **NOT AN ACTIVATION SUBSTITUTE** — existing fixture evidence is useful but does not satisfy the production gate by itself.

## Gate 1 — production definitions contain target Lumber data, but not the synthetic School shortcut

**PASS REQUIRED**

Production catalog definitions must contain the target Lumber data needed by activation:

- action `lumber.shift`;
- career `lumber`;
- relationship `lumber.foreman`;
- Activity `lumber.forest`;
- endings:
  - `ending.lumber.hard-work`;
  - `ending.lumber.forewoman`;
  - `ending.lumber.forest`.

The synthetic fixture action:

`school.lumber-management`

must **not** be promoted as the production School path. It exists only to publish `lumber.school.management-ready` in isolated cross-system tests.

### Exact files/APIs

Production input:
- `content/definitions.json`

Fixture source to compare:
- `content/lumber-target-definitions.fixture.json`

Catalog validator:
- `src/core/content.ts -> loadCatalog()`

Accepted School API:
- `src/core/school.ts -> executeSchoolLesson()`

### Proof required

A focused production-catalog test must load exactly the production definitions and assert:

- target Lumber IDs exist;
- `school.lumber-management` does not exist in production `definitions.actions`;
- target definitions pass `loadCatalog`.

Existing fixture-only evidence:
- `tests/lumber-target-production.test.ts`
- `tests/lumber-target-cross-system.test.ts`

is **NOT AN ACTIVATION SUBSTITUTE** because those tests explicitly load the fixture definition JSON.

### Current main

**CURRENTLY BLOCKED.**

Production `content/definitions.json` still contains legacy `lumber`/legacy School actions and no target career/relationship/Activity/target endings.

---

## Gate 2 — shipped pack discovery includes the intended target packs exactly once

**PASS REQUIRED**

The production pack set must include, exactly once:

- top-level shipped packs intended to remain active;
- `content/packs/lumber-target/lumber-production.pack.json`;
- `content/packs/lumber-target/lumber-cross-system.pack.json`;
- `content/packs/lumber-target/lumber-night-acceptance.pack.json`;
- `content/packs/school-target/school-production.pack.json`.

The discovery mechanism must not accidentally:

- skip nested packs;
- load the same pack twice;
- include fixture/draft JSON that is not an intended production pack.

### Exact files/APIs

- `scripts/build.mjs`
- `scripts/validate.ts`
- `src/core/content.ts -> loadCatalog()`

`loadCatalog` already rejects duplicate pack IDs, but that only helps after discovery has selected the files.

### Proof required

Add/retain a test that enumerates the production pack discovery result and compares the normalized relative-path set exactly.

At minimum it must assert one occurrence each of pack IDs:

- `lumber`;
- `lumber-cross`;
- `lumber-night`;
- `school-production`.

### Current main

**CURRENTLY BLOCKED.**

Both scripts use a top-level-only:

`readdir('content/packs').filter(...'.json')`

pattern and skip both nested target directories.

---

## Gate 3 — validation and build consume the exact same pack set

**PASS REQUIRED**

`npm run validate` and `npm run build` must resolve the production pack set through the same rule or the same shared helper.

The following failure is unacceptable:

`validate passes catalog A -> build ships catalog B`

### Exact files/APIs

- `scripts/validate.ts`
- `scripts/build.mjs`
- output: `dist/content.json`

### Proof required

An executable test/check must compare:

1. paths/pack IDs selected by validation;
2. paths/pack IDs written into `dist/content.json`.

The sets must be identical, including cardinality.

`npm run validate` and `npm run build` must both pass independently before the final full check.

### Current main

Both scripts happen to use the same top-level-only rule today, so they agree with each other but agree on the **wrong incomplete production set**. Gate 2 and Gate 3 must both pass.

---

## Gate 4 — required media paths are safe under production validation and runtime fallback

**PASS REQUIRED**

Activating target packs must not make validation fail solely because fixture media paths point to absent files.

Current Lumber target packs reference:

- `assets/lumber/shift-spring.gif`
- `assets/lumber/shift-summer.gif`
- `assets/lumber/shift-autumn.gif`
- `assets/lumber/shift-winter.gif`
- `assets/lumber/accepted-hand.gif`
- `assets/lumber/foreman-professional.gif`
- `assets/lumber/forest-return.gif`
- `assets/lumber/foreman-night-professional.gif`

Current main has no `assets/lumber/` directory.

The runtime presentation contract permits safe fallback/text-only behavior, but `scripts/validate.ts` currently performs:

```ts
for(const m of presented.media)
  if(!m.src.startsWith('data:')&&!existsSync(m.src))
    throw new Error(`Missing media: ${m.src}`);
```

So simply discovering the nested packs would currently make production validation fail unless the activation change also makes those media references valid under the agreed presentation policy.

### Exact files/APIs

- media refs:
  - `content/packs/lumber-target/lumber-production.pack.json`
  - `content/packs/lumber-target/lumber-cross-system.pack.json`
  - `content/packs/lumber-target/lumber-night-acceptance.pack.json`
- validator: `scripts/validate.ts`
- presentation application: `src/core/presentation.ts -> applyPresentation()`
- shipped overrides: `content/presentation.json`
- assets copied by: `scripts/build.mjs -> cp('assets','dist/assets',{recursive:true})`

### Proof required

- `npm run validate` passes with the activated target pack set;
- `npm run build` passes;
- an activated target semantic slot with unavailable optional art still resolves to an allowed fallback/text-only path without changing mechanics.

Useful existing presentation tests:
- `tests/presentation-stage.test.ts`
- `tests/presentation-ui.test.ts`
- `tests/presentation-registry-fixture.test.ts`

But the activation PR needs proof against its **production** pack/media set, not fixture registry data only.

### Current main

**CURRENTLY BLOCKED** if nested target Lumber packs are activated unchanged.

---

## Gate 5 — production UI exposes target Lumber, not only legacy Lumber

**PASS REQUIRED**

The player-facing Work surface must expose target action:

`lumber.shift`

and its execution must go through the production catalog.

The legacy action `lumber` must not be counted as proof of target Product Acceptance activation.

### Exact files/APIs

- `src/ui/app.ts`
- `catalog.definitions.actions`
- dispatch API:
  `dispatch(save,{type:'action',id:'lumber.shift'},catalog)`

Current UI Work list is driven by:

`const professions=['tavern','lumber','hunt','guard']`

### Proof required

A production UI test in/alongside:

`tests/ui.test.ts`

must prove:

- the Work panel exposes `data-action="lumber.shift"`;
- executing it spends exactly 1 Energy;
- the first-shift resolver path can produce `lumber.career-first-shift`;
- semantic Lumber presentation uses the target slot family.

Useful mechanics evidence:
- `tests/lumber-target-production.test.ts`

### Current main

**CURRENTLY BLOCKED.**

UI still exposes legacy `lumber`.

---

## Gate 6 — production UI exposes all eight accepted School courses through the real School adapter

**PASS REQUIRED**

The production School surface must expose all eight IDs from:

`SCHOOL_COURSE_IDS`

and use:

`executeSchoolLesson(...)`

or an explicitly accepted engine command that delegates to the same authoritative transaction.

The UI must not substitute:

- legacy `school`;
- legacy `*-class` actions;
- synthetic `school.lumber-management`.

### Exact files/APIs

- course authority:
  `src/core/school.ts -> SCHOOL_COURSES / SCHOOL_COURSE_IDS`
- transaction:
  `src/core/school.ts -> executeSchoolLesson()`
- production UI:
  `src/ui/app.ts`

Exact accepted course IDs:

- `school.course.literacy_and_numbers`
- `school.course.arcana`
- `school.course.rhetoric_and_social`
- `school.course.etiquette_and_presentation`
- `school.course.field_craft`
- `school.course.physical_training`
- `school.course.arts_and_performance`
- `school.course.body_confidence`

### Proof required

- `tests/school-engine-adapter.test.ts` remains green;
- production UI test proves all eight course controls are visible/addressable;
- one UI/adapter integration test proves a paid course charges its exact tuition and exactly 1 Energy once;
- presentation ID remains canonical, e.g. `school/arcana/lesson/default`.

### Current main

**CURRENTLY BLOCKED.**

The School panel still lists legacy action IDs and never calls `executeSchoolLesson`.

---

## Gate 7 — Forest Activity is reachable through production UI/API

**PASS REQUIRED**

Player flow must have a real route to:

`dispatch(...,{type:'enterActivity',id:'lumber.forest'})`

and once active, player controls must call:

- `activityAction:'advance'`;
- `activityAction:'escape'`

as applicable to the currently implemented Activity adapter.

The merge gate does not invent the still-blocked PA16/PA17 product-depth behavior.

### Exact files/APIs

- definition: production `content/definitions.json -> activities`
- engine:
  - `dispatch(...,{type:'enterActivity',id:'lumber.forest'})`
  - `dispatch(...,{type:'activityAction',id:'advance'|'escape'})`
- UI:
  `src/ui/app.ts`

### Proof required

A production UI/integration test must prove:

1. a legitimate production state exposes Forest Activity entry;
2. entering costs exactly 2 daily Energy once;
3. save/reload inside Activity works;
4. success or escape can return control safely.

Existing isolated mechanics evidence:
- `tests/lumber-target-cross-system.test.ts`
- A5 Activity tests

does not prove the UI reachability gate.

### Current main

**CURRENTLY BLOCKED.**

Production UI has no `enterActivity` control; legacy `forest-search` is an ordinary action and is not `lumber.forest`.

---

## Gate 8 — production Night path reaches lodging and Foreman Night without test-local definitions

**PASS REQUIRED**

Production definitions must supply a real lodging/Night path; test code must not inject it at runtime.

The current merged acceptance test constructs these IDs in code:

- lodging `lumber.normal-room`;
- Night choice `lumber.foreman.night`.

The nested Night event pack contains:

- event `lumber-night.foreman-professional`

but its reaction trigger references `lumber.foreman.night`, so production catalog loading also requires that NightChoice to exist.

### Exact files/APIs

- target Night event:
  `content/packs/lumber-target/lumber-night-acceptance.pack.json`
- current test-local definitions:
  `tests/lumber-night-acceptance.test.ts -> nightDefinitions()`
- production definitions:
  `content/definitions.json`
- engine:
  - `endDay`
  - `chooseLodging`
  - `chooseNightChoice`
- UI:
  `src/ui/app.ts`

### Proof required

A production-catalog Night test must load no test-mutated definitions and prove:

- `endDay`;
- real production lodging choice;
- payment exactly once across reload;
- `lumber.foreman.night`;
- pending `lumber-night.foreman-professional`;
- no daytime Energy charge for the Night relationship beat;
- next-day completion once.

Existing:
- `tests/lumber-night-acceptance.test.ts`

is useful behavior evidence, but its `nightDefinitions()` injection is **NOT AN ACTIVATION SUBSTITUTE**.

### Current main

**CURRENTLY BLOCKED.**

Production `definitions.lodgings` and `definitions.nightChoices` are empty.

---

## Gate 9 — Hard Work remains exactly 50 completed Lumber shifts

**PASS REQUIRED — immutable acceptance rule**

Exact condition:

```json
{
  "kind": "careerCounter",
  "career": "lumber",
  "counter": "completed_shifts",
  "op": "gte",
  "value": 50
}
```

No School, relationship, item, money, season, or other requirement may be added to Hard Work eligibility during activation.

### Exact files/APIs

- production ending definition after activation:
  `content/definitions.json -> ending.lumber.hard-work`
- current fixture source:
  `content/lumber-target-definitions.fixture.json`
- acceptance manifest:
  `content/lumber-product-acceptance.fixture-manifest.json`
- ending eligibility:
  engine registration / condition evaluation

### Proof required

Retain/directly run assertions in:

- `tests/lumber-target-production.test.ts`
- `tests/lumber-night-acceptance.test.ts`

and add production-catalog assertion that the shipped ending condition is exactly the single 50-shift condition.

### Current main

Target rule is correct in fixture evidence; target ending itself is not yet shipped.

---

## Gate 10 — Meta reward ID remains exactly `hardWork:lumber`

**PASS REQUIRED — immutable transaction proof**

For:

`ending.lumber.hard-work`

the Hard Work meta reward must remain:

```json
{
  "kind": "hardWork",
  "rewardId": "hardWork:lumber",
  "career": "lumber"
}
```

### Exact files/APIs

- `content/definitions.json` after activation
- fixture source:
  `content/lumber-target-definitions.fixture.json`
- schema special reward-ID acceptance:
  `src/core/schema.ts -> rewardId`
- completion transaction:
  `src/core/engine.ts -> completeEnding` path

### Proof required

- production-catalog exact-value assertion;
- `tests/ending-meta.test.ts` remains green;
- `tests/lumber-night-acceptance.test.ts` exact reward assertion remains green.

### Current main

Fixture contract is correct. Production target ending is not yet activated.

---

## Gate 11 — canonical semantic presentation IDs survive pending-scene save/reload

**PASS REQUIRED**

This is a newly confirmed merge blocker from:

`docs/qa-prep/PRESENTATION_SAVE_SCHEMA_COMPAT_AUDIT_v1.md`

A canonical slash semantic ID must survive:

```text
pending scene
-> save
-> parseSave
-> same pending.presentationId
```

Examples:

- `job/lumber/event/lumber-career-first-shift/default`
- `relationship/lumber-foreman/lumber-night-foreman-professional/default`
- `job/lumber/event/lumber-cross-activity-forest-return/default`

### Exact files/APIs

- persisted field:
  `src/core/schema.ts -> pendingSceneSchema.presentationId`
- presentation identifier validation:
  `src/core/presentation.ts -> presentationIdSchema`
- authoritative reload:
  `src/core/engine.ts -> parseSave()`
- UI consumer:
  `src/ui/app.ts -> p.presentationId ?? presentationIdForEvent(...)`

### Proof required

Add a focused positive regression test, preferably alongside save/presentation tests, that:

1. reaches a real pending target event;
2. stores its canonical slash `presentationId`;
3. serializes;
4. reloads with `parseSave`;
5. asserts exact ID equality;
6. resolves the same event/variant without reroll.

Relevant existing test files to extend or complement:

- `tests/storage.test.ts`
- `tests/presentation-stage.test.ts`
- `tests/presentation-ui.test.ts`

### Current main

**CURRENTLY BLOCKED / FAILED.**

`pendingScene.presentationId` uses generic:

`^[a-z][a-z0-9_.-]{1,79}$`

while canonical semantic IDs require slash and are accepted by presentation-specific:

`^[a-z0-9][a-z0-9/._-]*$`.

Current UI derivation masks the problem when the optional persisted field is absent; that does not satisfy this gate.

---

## Gate 12 — semantic presentation taxonomy remains canonical after activation

**PASS REQUIRED**

Activation must not replace semantic IDs with filenames or ad-hoc aliases.

Required representative IDs include:

- `job/lumber/shift/spring/default`
- `job/lumber/result/default`
- `job/lumber/event/lumber-career-first-shift/default`
- `relationship/lumber-foreman/lumber-foreman-notice/default`
- `school/field-craft/lesson/default`
- `ending/lumber/hard-work`

### Exact files/APIs

- `src/core/presentation.ts`
- `src/core/school.ts -> SCHOOL_COURSES.presentationId`
- activated event `sourceDomain` fields
- presentation data/overrides used by production

### Proof required

Keep green:

- `tests/product-presentation-semantic-ids.test.ts`
- `tests/presentation-stage.test.ts`

and add production-catalog semantic-ID assertions for newly activated player-visible paths.

---

## Gate 13 — build artifact actually contains activated target data

**PASS REQUIRED**

After:

`npm run build`

inspect:

`dist/content.json`

It must contain the exact intended production target definitions/packs.

### Exact artifact checks

At minimum:

- action `lumber.shift`;
- career `lumber`;
- relationship `lumber.foreman`;
- Activity `lumber.forest`;
- ending `ending.lumber.hard-work`;
- pack IDs:
  - `lumber`;
  - `lumber-cross`;
  - `lumber-night`;
  - `school-production`.

It must not contain synthetic production action:

`school.lumber-management`.

### Exact files/APIs

- `scripts/build.mjs`
- `dist/content.json`

### Proof required

A build-artifact test parses `dist/content.json` after build and asserts the exact activation set.

A source-file unit test alone is not sufficient.

---

## Gate 14 — `npm run check` is green on the activation merge candidate

**PASS REQUIRED**

Authoritative command:

`npm run check`

which runs:

1. `npm run typecheck`
2. `npm run validate`
3. `npm run build`
4. `npm test`

### Exact file

`package.json -> scripts.check`

### Proof required

A successful merge-ref/activation-branch run from the exact candidate SHA.

Do not reuse PR #19's historic 186/186 result as activation proof because PR #19 did not activate the shipped catalog.

---

## Gate 15 — executable PA row subset proves the activated paths, not only fixtures

**PASS REQUIRED**

The activation candidate must provide an executable subset using the **production catalog path**, not `lumber-target-definitions.fixture.json` constructed directly by the test.

Minimum activation-oriented evidence should cover the rows that catalog activation is intended to unlock:

- PA03 — target `lumber.shift`;
- PA05 — reactive `lumber.career-first-shift`;
- PA06 — `lumber.foreman-notice` / professional route;
- PA15 — save/reload inside production `lumber.forest` once legitimate entry is available;
- PA18/PA20 — Forest success → Lumber continuation;
- PA21 — Hard Work + one complex Lumber ending eligible without commitment;
- PA23–PA25 — commit/completion/reward exactly once;
- PA26 — New Run preserves Meta result.

Night rows PA11–PA13 must be included once Gate 8 production definitions exist.

School PA07/PA08 must not be declared passed unless their separate blocked progression/public-fact wiring is actually delivered.

PA16/PA17 must not be fabricated; activation alone does not supply Forest 3×3 depth or item-driven Activity actions.

### Exact files/tests

Existing mapping/readiness evidence:
- `tests/product-acceptance-harness.test.ts`
- `tests/qa-product-acceptance-row-runner-readiness.test.ts`
- `docs/qa-prep/PRODUCT_ACCEPTANCE_ROW_RUNNER_READINESS_v1.md`

Existing fixture mechanics:
- `tests/lumber-target-production.test.ts`
- `tests/lumber-target-cross-system.test.ts`
- `tests/lumber-night-acceptance.test.ts`
- `tests/school-engine-adapter.test.ts`

The activation PR needs at least one test whose catalog input is the production/shipped catalog construction path. Fixture-only tests do not close this gate.

---

# Lead pre-merge execution order

Run the gates in this order because later evidence depends on earlier activation seams.

1. **Production data shape**
   - Gate 1
   - Gate 9
   - Gate 10
2. **Catalog discovery parity**
   - Gate 2
   - Gate 3
3. **Media safety**
   - Gate 4
4. **Presentation persistence/taxonomy**
   - Gate 11
   - Gate 12
5. **Player reachability**
   - Gate 5
   - Gate 6
   - Gate 7
   - Gate 8
6. **Build artifact**
   - Gate 13
7. **Executable PA subset**
   - Gate 15
8. **Full candidate gate**
   - Gate 14

If an earlier gate fails, later green fixture tests do not override it.

# Current baseline disposition

On audited current main, production activation is **NOT MERGE-READY**.

Confirmed blockers include:

- target definitions are not production definitions;
- nested target packs are not discovered;
- target Lumber GIF paths are absent under current assets;
- UI still exposes legacy Lumber/School and no target Activity path;
- Night lodging/NightChoice are test-local rather than production definitions;
- canonical slash `pendingScene.presentationId` fails authoritative save parsing.

At the same time, the following contracts are already well evidenced and must remain unchanged during activation:

- Hard Work = exactly 50 completed Lumber shifts;
- reward ID = exactly `hardWork:lumber`;
- sourceDomain-based target semantic presentation taxonomy;
- School has exactly eight accepted course packages;
- A5/A6 Activity and ending transaction semantics;
- Night payment/reload exactly-once behavior in isolated acceptance fixtures.

No production runtime, UI, or content file is changed by this checklist.
