# Lead Product Activation Diff Review v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Worker branch: `chat4/lead-activation-review-next`  
Current main baseline: `9e0be0a33402166d72f125b74c29fd345e74c6fd`  
Lead branch reviewed: `lead/product-activation-school-lumber-v2` @ `a598fdbda77bf54723487fb0ce432f353c393675`

## Review result

The visible Lead branch has moved beyond schema-only preparation. It now changes:

- `src/core/schema.ts`
- `src/core/engine.ts`
- `src/core/school.ts`
- production `content/definitions.json`
- top-level production packs:
  - `content/packs/lumber-production.json`
  - `content/packs/lumber-cross-production.json`
  - `content/packs/lumber-night-production.json`

No production UI file is changed on the reviewed head.

Status language used below:

- **BLOCKER** — visible diff contains a merge/release problem or a direct test-contract failure that must be resolved before activation can be treated as ready.
- **NON-BLOCKER** — reviewed source behavior matches the accepted contract at this snapshot; focused regression evidence may still be desirable.
- **NOT-YET-IMPLEMENTED** — required activation surface is absent from the current Lead diff.

There are currently no workflow runs attached to the reviewed Lead head, so no fresh full-suite green claim is available.

---

## 1. Semantic `pendingScene.presentationId` persistence

**Status: NON-BLOCKER in source; direct positive regression test still required.**

### Visible Lead change

`src/core/schema.ts` adds a dedicated semantic presentation validator:

```ts
const semanticPresentationId =
  z.string().min(1).max(240)
   .regex(/^[a-z0-9][a-z0-9/._-]*$/);
```

and uses it for:

- `pendingScene.presentationId`
- `lastAction.presentationId`

This fixes the previously audited slash-taxonomy incompatibility without weakening the ordinary gameplay `id` validator.

`src/core/engine.ts` now persists semantic IDs when a Resolver scene is selected:

```ts
presentationId:presentationIdForEvent(cat,c.event.id,c.variantId)
```

and for opened optional offers.

Generic action results now persist:

```ts
presentationId:presentationIdForActionResult(...)
```

### Remaining QA seam

The reviewed Lead diff contains no new focused test proving:

`slash ID -> JSON.stringify -> parseSave -> exact same slash ID`.

Existing Chat 2 negative save-boundary test still describes the pre-fix state and must be inverted/updated before merge.

### Exact files/tests

Source:
- `src/core/schema.ts -> semanticPresentationId / pendingSceneSchema / lastActionSchema`
- `src/core/engine.ts -> Resolver pending construction / openOffer / action lastAction`

Regression seam:
- `tests/presentation-save-boundary.test.ts` from Chat 2 prep
- `tests/storage.test.ts`
- `tests/presentation-stage.test.ts`

---

## 2. Schema-4 backward compatibility when School progression is absent

**Status: NON-BLOCKER in schema shape.**

Lead adds:

```ts
school:schoolProgressionStateSchema.default({tracks:{}})
```

to `progressionStateSchema`.

That is the correct compatibility direction for existing schema-4 saves that do not contain School-owned state.

The default is neutral:

- no lessons;
- no Night-study sessions;
- no facts;
- no milestones;
- no certificates;
- no choices.

### Remaining QA seam

A real serialized current-main schema-4 save should still be parsed under the Lead branch to prove the default works through `parseSave`, not only through direct schema-object construction.

### Exact files/tests

- `src/core/schema.ts -> progressionStateSchema`
- `src/core/engine.ts -> parseSave()`
- Chat 5 prep: `tests/school-typed-state-compat.test.ts`
- current: `tests/storage.test.ts`

---

## 3. Typed School progress counters

**Status: NON-BLOCKER in source ownership.**

Lead adds:

`incrementSchoolCounter(track,counter,amount)`

as a typed effect.

`applyEffectMutable` creates a School track state lazily with:

- `trackId`
- `counters`
- `facts`
- `milestones`
- `certificates`
- `choices`

Paid lessons now append:

`incrementSchoolCounter(track,'lessons_completed',1)`

Night study appends:

`incrementSchoolCounter(track,'night_study_sessions',1)`.

This matches the accepted School progression ownership split.

### Exact files/tests

- `src/core/schema.ts -> schoolTrackState / schoolProgressionStateSchema / incrementSchoolCounter`
- `src/core/engine.ts -> applyEffectMutable case 'incrementSchoolCounter'`
- `src/core/school.ts -> schoolLessonEffects / schoolNightStudyChoice`
- Chat 5 contract: `SCHOOL_PROGRESSION_STRUCTURE_v1.md`

---

## 4. School command execution ordering / Resolver visibility

**Status: BLOCKER.**

The accepted Chat 5 runtime wiring explicitly required the canonical engine boundary:

1. precheck;
2. apply full School batch;
3. increment School progression;
4. `register(s,cat)`;
5. `runResolverBoundary(...)`.

Reason: the Resolver should observe the fully updated authoritative state, including newly eligible endings, from one engine transaction boundary.

Visible Lead dispatch instead does:

```ts
if(command.type==='schoolLesson'){
  const result=executeSchoolLesson(
    s,command.id,cat,{applyEffects,resolveReactions}
  );
  register(result.state,cat);
  return result.state;
}
```

But `executeSchoolLesson` itself calls:

`resolveReactions(...)`

**before** the outer `register(result.state,cat)`.

That means:

- stat/resource/Energy changes are visible to the Resolver;
- School counter state is already applied;
- but ending eligibility registered from the final School state is computed only after that Resolver pass;
- any `endingEligible` reaction created solely by the School transaction is therefore not part of the same canonical reaction boundary.

This is a real ordering mismatch with the prepared School wiring.

### Exact files/functions

- `src/core/engine.ts -> dispatch(command.type==='schoolLesson')`
- `src/core/engine.ts -> register()`
- `src/core/engine.ts -> runResolverBoundary()`
- `src/core/school.ts -> executeSchoolLesson()`
- contract: `docs/school-prep/SCHOOL_RUNTIME_INTEGRATION_WIRING_v1.md`

### Required focused test

A School lesson that makes an ending newly eligible must prove that the same School command boundary produces the expected `endingEligible` Resolver visibility, with no second command required.

---

## 5. Full School stat package atomicity

**Status: NON-BLOCKER in source behavior.**

`executeSchoolLesson` still performs one availability precheck before mutation, then sends the whole effect array to `applyEffects`.

The effect list contains:

- tuition deduction;
- exactly 1 current-day Energy deduction;
- every course stat effect;
- one `lessons_completed` counter increment.

Only after the batch is applied are reaction facts constructed and Resolver invoked.

Therefore the complete stat package is visible together, not as a sequence of partial Resolver boundaries.

### Existing evidence seam

- `tests/school-engine-adapter.test.ts`
  - insufficient money/Energy rejects without mutation;
  - full stat package;
  - complete Arcana package visible to Resolver.

No Lead-specific new test was added, but the underlying transaction pattern remains compatible with those assertions.

---

## 6. Night-study counter separation

**Status: BLOCKER because source and existing test contract are currently inconsistent.**

### Source behavior

Visible Lead `schoolNightStudyChoice` now emits:

1. `modifyStat(selected,+2)`
2. `incrementSchoolCounter(track,'night_study_sessions',+1)`

Paid lessons separately increment:

`lessons_completed`.

The conceptual separation is correct.

Production `definitions.json` also contains generated-style Night choices with the same two-effect shape.

### Current Lead test conflict

The Lead branch still contains the existing:

`tests/school-night-study-adapter.test.ts`

which asserts:

```ts
nightChoice.effects === [
  {kind:'modifyStat', ...}
]
```

That assertion is now false because the second typed School counter effect exists.

With no workflow run on the reviewed head, this has not been demonstrated by CI, but source and assertion are directly contradictory.

### Exact files/tests

- `src/core/school.ts -> schoolNightStudyChoice()`
- `content/definitions.json -> school.night_study.*`
- `tests/school-night-study-adapter.test.ts`

### Required fix/test update

The test must assert both independent concepts:

- selected supported stat +2;
- `night_study_sessions +1`;
- `lessons_completed` unchanged;
- zero tuition;
- zero current-day Energy;
- next-day Energy -1;
- reload does not duplicate stat or counter.

---

## 7. Target Lumber production definitions activation

**Status: NON-BLOCKER for data activation.**

Production `content/definitions.json` now contains:

- target action `lumber.shift`;
- career `lumber`;
- relationship `lumber.foreman`;
- Activity `lumber.forest`;
- target endings:
  - `ending.lumber.hard-work`
  - `ending.lumber.forewoman`
  - `ending.lumber.forest`;
- production lodging definitions;
- `lumber.foreman.night`;
- 24 School Night-study choices.

The legacy `lumber` action remains present, which preserves old action-count compatibility at this stage.

The synthetic isolated-test action:

`school.lumber-management`

does **not** appear in the production action list.

That is the correct activation boundary.

### Exact file

- `content/definitions.json`

### Required regression seam

Production-catalog tests should assert target data exists while `school.lumber-management` remains excluded.

---

## 8. Pack inclusion strategy

**Status: NON-BLOCKER; strategy is explicit top-level promotion.**

Lead does not make build/validate recursively ingest arbitrary fixture subdirectories.

Instead it adds exactly three production copies at the already-shipped top-level pack root:

- `content/packs/lumber-production.json`
- `content/packs/lumber-cross-production.json`
- `content/packs/lumber-night-production.json`

Because current `build.mjs` and `validate.ts` both scan top-level `content/packs/*.json`, these files are automatically included by both paths.

This avoids accidentally shipping every nested fixture directory.

### Media handling

The promoted production packs no longer reference absent `assets/lumber/*.gif`.

They use existing shipped static assets:

- `assets/stage-lumber.svg`
- `assets/stage-forest.svg`

so the previously identified `existsSync` validation blocker is avoided for these promoted packs.

### Remaining QA seam

Add an exact pack-set assertion so future top-level additions cannot silently expand production content.

### Exact files

- `scripts/build.mjs`
- `scripts/validate.ts`
- three new production pack JSON files

---

## 9. UI reachability — School

**Status: NOT-YET-IMPLEMENTED.**

`src/ui/app.ts` is unchanged in the visible Lead diff.

School panel still renders legacy generic action IDs:

- `combat-class`
- `etiquette-class`
- `magic-class`
- `salon-lesson`
- `school`

No control dispatches:

`{type:'schoolLesson', id:<SchoolCourseId>}`.

Therefore the new School command is not player-reachable.

### Exact seam

- `src/ui/app.ts -> panelContent(panel==='school')`
- `src/ui/app.ts -> [data-action] handler`

Required UI test:
- all eight accepted course IDs;
- dispatch `schoolLesson`;
- no production routing through synthetic/legacy generic School transaction.

---

## 10. UI reachability — Lumber

**Status: NOT-YET-IMPLEMENTED.**

Production definitions now contain `lumber.shift`, but UI Work still uses:

`professions=['tavern','lumber','hunt','guard']`

and therefore still dispatches legacy:

`action:lumber`.

Target Lumber career progression is not player-reachable from the visible UI.

### Exact seam

- `src/ui/app.ts -> professions`
- Work `actionList(professions)`

Required UI test:
- Work exposes `lumber.shift`;
- first shift increments target career counter and opens target milestone.

---

## 11. UI reachability — Activity

**Status: NOT-YET-IMPLEMENTED.**

Production `definitions.activities` now contains:

`lumber.forest`.

Engine already supports:

- `enterActivity`;
- `activityAction:advance`;
- `activityAction:escape`.

But UI has no target Activity entry or active-Activity renderer/control path.

The Explore panel still exposes legacy ordinary action:

`forest-search`.

### Exact seam

- `src/ui/app.ts -> panelContent('explore')`
- `src/ui/app.ts -> central()`
- missing `enterActivity/activityAction` handlers

Required UI regression:
- exact command ID `lumber.forest`;
- save/reload inside Activity;
- active Activity controls after reload.

---

## 12. UI reachability — Night

**Status: NOT-YET-IMPLEMENTED.**

Production definitions now contain:

- `lodging.normal`
- `lodging.cheap`
- `lodging.street`
- `lumber.foreman.night`
- School Night-study choices

and engine supports the target NightFlow commands.

However UI Sleep panel is still the legacy compatibility interface using:

`data-sleep -> {type:'sleep', payment:...}`.

It does not expose production:

- `chooseLodging`;
- `chooseNightChoice`;
- Foreman Night;
- School Night-study choices.

### Exact seam

- `src/ui/app.ts -> panelContent('sleep')`
- `[data-sleep]` handler

---

## 13. Hard Work condition

**Status: NON-BLOCKER — exact locked rule preserved.**

Production `content/definitions.json` now contains:

`ending.lumber.hard-work`

with exactly one condition:

```json
{
  "kind":"careerCounter",
  "career":"lumber",
  "counter":"completed_shifts",
  "op":"gte",
  "value":50
}
```

No School, Foreman, Forest, season, stat or item prerequisite is present.

This matches the locked acceptance rule.

### Exact evidence

- `content/definitions.json`
- existing isolated:
  - `tests/lumber-target-production.test.ts`
  - Chat 3 `lumber-ending-independence.test.ts`

A production-catalog exact deep-equality assertion should still be added.

---

## 14. Exact Hard Work reward ID

**Status: NON-BLOCKER — exact value preserved.**

Production ending contains:

```json
{
  "kind":"hardWork",
  "rewardId":"hardWork:lumber",
  "career":"lumber"
}
```

No reward-ID drift is visible.

### Exact evidence

- `content/definitions.json`
- `src/core/schema.ts -> rewardId`
- `tests/ending-meta.test.ts`

---

# Blocker summary

## BLOCKER

1. **School Resolver ordering mismatch**
   - `dispatch(schoolLesson)` calls `executeSchoolLesson -> resolveReactions` before `register`.
   - Deviates from prepared School integration boundary.
   - Newly eligible ending reaction cannot participate in the same canonical School Resolver boundary.

2. **Night-study existing test is stale against Lead source**
   - source adds `night_study_sessions`;
   - `school-night-study-adapter.test.ts` still asserts a one-effect array.

## NOT-YET-IMPLEMENTED

- production School UI activation;
- target Lumber UI activation;
- Activity UI entry/resume/action controls;
- target Night lodging/choice UI.

## NON-BLOCKER / source-aligned

- semantic slash presentation ID schema and pending persistence;
- missing School progression default;
- typed `lessons_completed` and `night_study_sessions`;
- full stat package batch atomicity;
- target Lumber definitions;
- explicit top-level Lumber production pack strategy;
- safe static fallback media paths;
- Hard Work exactly 50 shifts;
- exact `hardWork:lumber`.

## Merge evidence still missing

The reviewed Lead head has no workflow runs. Before merge, direct regression coverage is still needed for:

- slash pending presentation save/reload;
- real old schema-4 save with missing School state;
- School lesson ending-eligibility Resolver ordering;
- updated Night-study typed counter semantics;
- production catalog target/synthetic exclusion;
- exact promoted pack set;
- player-facing School/Lumber/Activity/Night reachability once UI lands.

No production file was changed by Chat 4.
