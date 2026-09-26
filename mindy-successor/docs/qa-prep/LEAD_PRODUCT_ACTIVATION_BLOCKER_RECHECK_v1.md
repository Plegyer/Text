# Lead Product Activation Blocker Recheck v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Worker branch: `chat4/activation-ci-gate-next`  
Current main: `ee9f8365aba5bfef3c90551082da7ba06f62873f`  
Lead branch reviewed: `lead/product-activation-school-lumber-v2` @ `e54635bf0026be1d188723b927d5c4813306c71f`

## Executive recheck

The Lead branch has advanced substantially since the previous Chat 4 review.

Newly visible since the prior reviewed head:

- production UI activation for target Lumber;
- production UI activation for all eight School courses;
- production UI NightFlow lodging / voluntary Night choices;
- production UI Forest Activity entry / resume / advance / escape;
- persisted `lastAction.presentationId` is now consumed by the result renderer;
- production definitions now include School Night-study choices, target Lumber definitions, Activity, Night definitions and target endings;
- target Lumber packs are promoted explicitly as top-level production packs with shipped static media paths.

Two prior issues remain merge-blocking in the visible source/test snapshot:

1. **School command ordering remains inconsistent with the accepted engine wiring**:
   `executeSchoolLesson(...)->resolveReactions` happens before outer `register(...)`.
2. **Existing School Night-study test remains stale**:
   source now emits a typed `night_study_sessions` counter effect, while the test still asserts the old one-effect array.

There are **no workflow runs** attached to the current Lead HEAD, so no current full-suite green evidence exists.

---

## Recheck matrix

| Prior issue | Status now | Exact seam | Recheck |
|---|---|---|---|
| canonical slash `pendingScene.presentationId` rejected by save schema | **RESOLVED** in source | `src/core/schema.ts -> semanticPresentationId` | Pending and lastAction presentation fields now use the slash-compatible semantic validator while ordinary gameplay IDs remain unchanged. |
| Resolver did not persist pending semantic presentation ID | **RESOLVED** in source | `src/core/engine.ts -> selectCandidate/openOffer` | New pending scenes store `presentationIdForEvent(...)`. |
| result UI recomputed presentation ID and ignored persisted `lastAction.presentationId` | **RESOLVED** | `src/ui/app.ts -> central() lastAction branch` | UI now uses `last.presentationId ?? presentationIdForActionResult(...)`. |
| old schema-4 saves lack School progression state | **RESOLVED** in schema | `src/core/schema.ts -> progressionStateSchema.school.default({tracks:{}})` | Missing School state receives a neutral empty-track default. Direct real-old-save regression is still required as merge evidence. |
| School-owned `lessons_completed` missing | **RESOLVED** in source | `src/core/school.ts -> schoolLessonEffects()` | Paid lesson adds one typed School counter increment. |
| School-owned `night_study_sessions` missing | **RESOLVED** in source | `src/core/school.ts -> schoolNightStudyChoice()` | Night study adds its separate typed counter increment. |
| paid lesson / Night-study counters conceptually conflated | **RESOLVED** in source model | `src/core/school.ts` | Separate counter names and separate transaction paths are present. |
| School command not in engine | **RESOLVED** | `src/core/engine.ts -> Command / dispatch schoolLesson` | `schoolLesson` is a real engine command. |
| School UI still used legacy generic actions | **RESOLVED** | `src/ui/app.ts -> schoolList / data-school-course` | UI enumerates `SCHOOL_COURSES` and dispatches `schoolLesson`. |
| School command Resolver/registration ordering | **STILL_BLOCKING** | `src/core/engine.ts -> dispatch(schoolLesson)`; `src/core/school.ts -> executeSchoolLesson()` | Resolver executes inside `executeSchoolLesson`; outer `register(result.state,cat)` runs afterward. This differs from the accepted wiring where register precedes the canonical Resolver boundary. |
| full School stat package atomicity | **RESOLVED** in source transaction | `src/core/school.ts -> schoolLessonEffects / executeSchoolLesson` | One precheck precedes a single effect batch containing tuition, 1 Energy, all stat effects and typed progress. |
| Night-study source changed but old test still asserts one effect | **STILL_BLOCKING** | `src/core/school.ts` vs `tests/school-night-study-adapter.test.ts` | Source emits stat + counter; existing test still deep-equals only the stat effect. |
| NightFlow not player-reachable | **RESOLVED** in UI source | `src/ui/app.ts -> data-end-day / data-lodging / data-night-choice` | UI exposes begin NightFlow, production lodging and eligible Night choices. |
| target Lumber definitions not shipped | **RESOLVED** in Lead content | `content/definitions.json` | Target action, career, relationship, Activity and endings are now present. |
| target Lumber UI still dispatched legacy `lumber` | **RESOLVED** | `src/ui/app.ts -> professions` | Work list now contains `lumber.shift`, while legacy `lumber` remains in definitions for compatibility. |
| target Forest Activity not player-reachable | **RESOLVED** in UI source | `src/ui/app.ts -> activityEntryList / central activity branch / handlers` | Explore exposes `lumber.forest`; active envelope renders advance/escape controls. |
| pack activation depended on recursive fixture discovery | **RESOLVED / CHANGED STRATEGY** | top-level `content/packs/lumber-*-production.json` | Lead promotes only explicit production copies instead of recursively loading fixture subdirectories. |
| target Lumber media referenced absent `assets/lumber/*.gif` | **RESOLVED / CHANGED STRATEGY** | promoted production packs | Production copies use existing static shipped assets such as `assets/stage-lumber.svg` and `assets/stage-forest.svg`. |
| synthetic `school.lumber-management` could leak into production | **RESOLVED** in visible definitions | `content/definitions.json` | Synthetic action is absent from production actions. |
| Hard Work could gain extra prerequisites | **RESOLVED / invariant preserved** | `content/definitions.json -> ending.lumber.hard-work` | Exactly one `completed_shifts >= 50` condition remains. |
| Hard Work reward ID could drift | **RESOLVED / invariant preserved** | same ending | Exact `hardWork:lumber` remains. |
| no current CI evidence | **STILL_BLOCKING as evidence gate** | Lead HEAD `e54635bf...` | GitHub reports no workflow runs for this HEAD. |

---

# 1. Semantic presentation persistence

## Status: RESOLVED in source

Lead now has a dedicated semantic grammar:

```text
^[a-z0-9][a-z0-9/._-]*$
```

for:

- pending scene presentation identity;
- action-result presentation identity.

Ordinary gameplay IDs continue to use the slash-free gameplay ID schema, so the fix does not globally relax identifiers.

New pending scenes persist:

```ts
presentationId:presentationIdForEvent(...)
```

and action results persist:

```ts
presentationId:presentationIdForActionResult(...)
```

The UI result path now consumes:

```ts
last.presentationId ?? presentationIdForActionResult(...)
```

instead of always recomputing.

### Evidence still needed

A direct positive regression remains necessary:

```text
canonical slash pending ID
-> serialize
-> parseSave
-> exact same event/variant/choices/presentationId
```

The old Chat 2 negative assertion must not remain authoritative after this fix.

---

# 2. Schema-4 compatibility

## Missing School state: RESOLVED in schema

`progression.school` defaults to:

```json
{"tracks":{}}
```

which is the correct neutral default.

## Legacy action identifiers: CHANGED but currently safer for Lumber/School

The Lead production definitions still retain legacy actions including:

- `lumber`;
- `school`;
- legacy class actions.

This means current `parseSave` checks for old `lastAction.id` and `actionCounts` are not immediately broken by activation.

That compatibility is currently achieved by retaining legacy definitions, not by introducing a migration alias layer.

### Evidence still needed

Load representative real pre-activation schema-4 saves under the exact Lead production catalog, including:

- legacy `lastAction.id='lumber'`;
- `actionCounts.lumber`;
- legacy School action count.

No replay or counter conversion should occur.

---

# 3. Typed School progress and atomicity

## Status: RESOLVED in source

Paid lesson effects contain one atomic batch:

1. money (-tuition);
2. current-day Energy (-1);
3. every accepted course stat delta;
4. `lessons_completed +1`.

Night study contains:

1. selected supported stat (+2);
2. `night_study_sessions +1);
3. next-day Energy delta (-1);
4. no tuition/current-day Energy effect.

The counters are correctly distinct.

---

# 4. School command ordering

## Status: STILL_BLOCKING

The accepted School wiring packet called for:

```text
apply full batch
-> register ending eligibility
-> run canonical Resolver boundary
```

Visible Lead currently performs:

```text
dispatch schoolLesson
-> executeSchoolLesson
   -> applyEffects
   -> build facts
   -> resolveReactions
-> register(result.state)
```

Because `register` is after Resolver:

- the Resolver sees the full stat and School counter state;
- but a newly eligible ending is registered only afterward;
- an `endingEligible` reaction caused by that lesson cannot be part of that same canonical reaction boundary.

This is not a partial-state atomicity problem. It is an ordering/integration problem.

### Exact seams

- `src/core/engine.ts -> dispatch(), schoolLesson branch`
- `src/core/engine.ts -> register()`
- `src/core/engine.ts -> runResolverBoundary()`
- `src/core/school.ts -> executeSchoolLesson()`
- `docs/school-prep/SCHOOL_RUNTIME_INTEGRATION_WIRING_v1.md`

### Required regression

One paid lesson must make an ending newly eligible and prove the expected same-boundary Resolver observation.

---

# 5. School UI

## Status: RESOLVED in visible source

The School panel no longer routes production learning through legacy generic `action` buttons.

It renders all `SCHOOL_COURSES` and dispatches:

```ts
{type:'schoolLesson',id:course.id}
```

Availability checks cover:

- active run;
- character creation;
- arrival;
- no pending scene;
- no NightFlow;
- no Activity;
- tuition;
- current-day Energy.

### Evidence still needed

jsdom/UI tests should confirm:

- exactly eight course controls;
- correct command identity;
- successful lesson result presentation uses the persisted course presentation ID.

---

# 6. NightFlow

## Status: UI ACTIVATION RESOLVED; test mismatch STILL_BLOCKING

Lead production definitions contain:

- `lodging.normal`;
- `lodging.cheap`;
- `lodging.street`;
- `night.sleep`;
- `lumber.foreman.night`;
- 24 School Night-study choices.

UI now:

- starts `endDay`;
- renders lodging choices;
- renders eligible voluntary Night choices;
- dispatches `chooseLodging`;
- dispatches `chooseNightChoice`.

This closes the prior player-reachability gap.

### Remaining blocker

`tests/school-night-study-adapter.test.ts` still asserts the old effect shape:

```ts
[
  {kind:'modifyStat', ...}
]
```

while Lead source now returns:

```ts
[
  {kind:'modifyStat', ...},
  {kind:'incrementSchoolCounter',counter:'night_study_sessions', ...}
]
```

The current branch has no CI run to surface the failure, but the contradiction is direct.

---

# 7. Lumber activation

## Status: RESOLVED in content and UI source

Production definitions now contain:

- `lumber.shift`;
- career `lumber`;
- relationship `lumber.foreman`;
- Activity `lumber.forest`;
- three target Lumber endings.

Work UI uses:

```ts
['tavern','lumber.shift','hunt','guard']
```

so the player-facing Lumber action is now the target action.

Legacy `lumber` remains in definitions for old-save compatibility but is no longer the Work-panel target.

---

# 8. Explicit pack inclusion

## Status: RESOLVED / strategy changed

Instead of making pack discovery recursive, Lead added exact top-level production packs:

- `lumber-production.json`;
- `lumber-cross-production.json`;
- `lumber-night-production.json`.

Current build and validation already include top-level `content/packs/*.json`, so both consume the same promoted set without ingesting every fixture directory.

This is safer than recursive fixture activation.

### Remaining evidence gate

A shipped/dist test should assert these exact production pack IDs occur once and fixture-only nested pack variants are absent.

---

# 9. Activity UI

## Status: RESOLVED in visible source

Explore now includes target `lumber.forest` through `data-enter-activity`.

The entry control is disabled when:

- Activity is absent;
- run is busy/locked;
- run is not active;
- pending scene exists;
- NightFlow exists;
- Activity already exists;
- entry conditions fail;
- Energy is insufficient.

When an Activity envelope is active, central UI renders:

- semantic Activity stage;
- internal progress/endurance/checkpoint;
- `advance`;
- `escape`.

Handlers dispatch the exact A5 commands.

### Remaining evidence gate

A reload/UI test should prove a saved active Activity resumes to this screen and does not re-charge entry Energy.

---

# 10. Hard Work

## Status: RESOLVED / exact invariant preserved

Production ending has exactly:

```json
[
  {
    "kind":"careerCounter",
    "career":"lumber",
    "counter":"completed_shifts",
    "op":"gte",
    "value":50
  }
]
```

There are no School, Foreman, Forest, item, stat or season prerequisites.

The only meta reward is:

```json
{
  "kind":"hardWork",
  "rewardId":"hardWork:lumber",
  "career":"lumber"
}
```

Both locked values are unchanged.

---

# 11. CI/evidence state

## Status: STILL_BLOCKING as release evidence

For Lead HEAD:

`e54635bf0026be1d188723b927d5c4813306c71f`

GitHub reports no workflow runs.

Therefore this review does **not** claim:

- typecheck green;
- validation green;
- build green;
- full tests green;
- dist artifact verified.

Those are the subject of the next Queue item.

---

# Current blocker list

## STILL_BLOCKING

1. School command registration/Resolver ordering.
2. Existing School Night-study test contradicts the new typed counter effect.
3. No current CI/full-check evidence for the reviewed Lead HEAD.

## RESOLVED or materially addressed

- slash semantic presentation persistence;
- UI use of persisted action-result presentation IDs;
- missing School state default;
- typed School paid/Night counters;
- School UI reachability;
- Lumber target content/UI reachability;
- NightFlow UI reachability;
- Forest Activity UI reachability;
- explicit production pack strategy;
- missing target GIF validation problem through shipped static fallback promotion;
- synthetic School shortcut exclusion;
- Hard Work exactly 50 shifts;
- exact `hardWork:lumber`.

No production file was modified by Chat 4.
