# Product Activation Save Edge Matrix v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Worker branch: `chat4/activation-ci-gate-next`  
Lead branch inspected: `lead/product-activation-school-lumber-v2` @ `e54635bf0026be1d188723b927d5c4813306c71f`

## Scope

This matrix defines the exact parse/reload invariants activation must preserve across schema-4 edge states.

All cases use the authoritative boundary:

```ts
parseSave(JSON.stringify(save), catalog)
```

unless a test is explicitly validating an older schema migration.

A reload must validate and restore committed state. It must not replay gameplay commands.

---

## Matrix

| Edge state | Expected parse/reload result | Exactly-once invariant |
|---|---|---|
| old schema-4 save without School state | **LOADS**; `progression.school={tracks:{}}` | no inferred lessons/night counters/facts |
| pending scene with semantic presentationId | **LOADS**; exact slash ID preserved | no Resolver reroll, no variant/choice mutation |
| active Activity | **LOADS** if definition/version/adapter still match | no second entry Energy, RNG step, result or continuation |
| active NightFlow before lodging | **LOADS** at same phase | no lodging selection/payment or day advance |
| active NightFlow after lodging | **LOADS** with selected lodging/payment proof | no second lodging charge |
| committed paid School lesson state | **LOADS** | tuition, 1 Energy, stat package, `lessons_completed` remain once |
| ending committed | **LOADS** as committed, result still null | no reward/completion on load |
| completed Hard Work transaction | **LOADS** with same RunResult/transaction | no duplicate `hardWork:lumber`, Meta or completed-run count |

---

# 1. Old schema-4 save without School state

## Input shape

A valid pre-activation schema-4 save with:

- `run.progression.careers`
- `run.progression.quests`
- `run.progression.relationships`
- `run.progression.worldFacts`

but no:

`run.progression.school`

## Expected result

`parseSave` succeeds.

After parse:

```json
{
  "school": {
    "tracks": {}
  }
}
```

must exist.

All pre-existing progression domains remain unchanged.

## Must not happen

Loader must not infer:

- `lessons_completed` from legacy `metrics.lessons`;
- School tracks from legacy class actionCounts;
- certificates;
- milestones;
- public School facts.

The default is compatibility state only.

---

# 2. Pending semantic presentationId

## Input shape

A valid pending target scene with a slash semantic ID, for example:

`job/lumber/event/lumber-career-first-shift/default`

Persisted alongside:

- eventId;
- variantId;
- reactionEpochId;
- allowedChoiceIds.

## Expected result

`parseSave` succeeds and returns the exact same presentationId.

The entire pending-scene mechanical snapshot must deep-equal before/after reload.

## Invariants

Reload must not:

- call Resolver;
- select a different variant;
- rebuild allowed choices;
- advance event history;
- consume RNG;
- replace semantic ID with a media filename/dotted media ID.

## Backward compatibility companion

An old pending scene with the field absent must also load.

Its event/variant identity is authoritative; UI may derive presentation deterministically without reroll.

---

# 3. Active Activity envelope

## Input shape

`run.flow.activity` contains an active `lumber.forest` envelope with:

- matching `activityId`;
- matching `definitionVersion`;
- adapter `counter.v1`;
- `entryEnergyCommitted:true`;
- started day;
- internal progress/endurance/steps;
- internal RNG state;
- checkpoint;
- accumulated rewards;
- emitted facts.

## Expected result

`parseSave` succeeds if the production definition remains compatible.

All envelope fields must survive exactly.

## Exactly-once assertions

Before entering, record daily Energy.

After entry:

`Energy = before - 2`

After one or more reloads:

`Energy` remains unchanged.

Reload must not:

- call `enterActivity`;
- decrement Energy again;
- step internal RNG;
- increment progress;
- finalize success/escape/failure;
- emit an `activityResult`;
- trigger Lumber continuation.

## Negative compatibility assertion

If production Activity version/adapter intentionally changes incompatibly, parser must reject clearly rather than silently reinterpreting old internal state.

---

# 4. Active NightFlow before lodging

## Input shape

A save after:

```text
endDay
```

with NightFlow waiting at or transitioning into:

`LodgingResolution`

and:

- `selectedLodgingId=null`;
- `lodgingPaymentCommitted=false`;
- `calendarAdvanceCommitted=false`.

## Expected result

Reload returns to the same NightFlow boundary.

No lodging must be auto-selected.

## Must remain unchanged

- money;
- housing payment state;
- selected Night choice;
- current-day Energy snapshot;
- day/calendar;
- next-day modifiers except those already queued before save.

Reload must not run the Night state machine forward merely because a production lodging exists.

---

# 5. Active NightFlow after lodging

## Input shape

A save after:

```text
chooseLodging
```

where:

- `selectedLodgingId` is set;
- `lodgingPaymentCommitted=true`;
- lodging price has already been deducted;
- queued next-day lodging modifiers, if any, are already stored.

## Expected result

Reload succeeds with the same selected lodging and payment proof.

## Exactly-once assertions

For a paid lodging:

```text
money after reload = money after first payment
```

Repeated parse/reload cannot deduct price again.

Queued next-day modifiers must not be appended a second time.

Calendar must not advance until the normal Night lifecycle reaches that committed boundary.

---

# 6. Paid School lesson committed

This edge is not a separate save-schema transaction record; the commit proof is the already-mutated run state after the single School command.

## Input shape after one successful paid lesson

Expected persisted changes include:

- money reduced by exact course tuition;
- current-day Energy reduced by 1;
- every course stat effect applied;
- selected track `lessons_completed +1`;
- `night_study_sessions` unchanged;
- School compatibility action count updated if retained;
- `lastAction` describing the School result;
- `lastAction.presentationId` equal to the selected course semantic ID;
- any selected Resolver pending scene already resolved from the post-lesson state.

## Expected reload

One and two consecutive `parseSave` calls preserve every value.

## Exactly-once assertions

Reload must not:

- charge tuition;
- deduct Energy;
- apply stat effects;
- increment `lessons_completed`;
- increment action count;
- rerun School Resolver;
- replace presentation ID.

### Representative example

For:

`school.course.arcana`

expect persisted presentation identity:

`school/arcana/lesson/default`.

---

# 7. Ending committed

## Input shape

```text
run.status = ending_committed
run.endings.committed = <known ending>
run.endings.result = null
```

For Product Activation the critical target case is:

`ending.lumber.hard-work`.

## Expected result

Reload succeeds.

After reload:

- status remains `ending_committed`;
- committed ending ID unchanged;
- result remains null;
- Meta unchanged.

## Must not happen

`parseSave` must not call completion logic.

Therefore before explicit `completeEnding`:

- no `hardWork:lumber` reward;
- no new completed ending;
- no applied result transaction;
- no increment of completed-run count.

A pending final scene, if present, must survive independently under the pending-scene invariants above.

---

# 8. Completed Hard Work reward transaction

## Input shape

A valid ended save after explicit completion of:

`ending.lumber.hard-work`

with a RunResult containing:

- resultId;
- endingId;
- transactionId;
- completedAtDay;
- firstCompletion;
- appliedMetaRewardIds.

Meta contains:

- completed ending;
- `hardWorkProgress` containing `lumber`;
- `appliedResultTransactions` containing the exact transactionId.

## Expected result

Repeated parse/reload succeeds and preserves the exact RunResult identity.

## Exactly-once contract

The first completion may add:

`hardWork:lumber`

once.

After completion:

- `appliedMetaRewardIds` remains the committed proof from that result;
- `meta.hardWorkProgress` contains `lumber` once;
- transactionId occurs once in `appliedResultTransactions`;
- `runsCompleted` is not incremented by reload.

No reward application function may run merely because `parseSave` encounters the result.

---

# 9. Completed older schema-4 ending without RunResult

Current parser contains a compatibility path for older schema-4 saves whose status is ended, committed ending exists, but RunResult is absent.

## Expected compatibility behavior

Parser may synthesize deterministic result/transaction identity.

That compatibility operation must be idempotent:

```text
first parse
-> deterministic compatibility RunResult / transaction proof
second parse
-> identical result / no second transaction
```

It must not retroactively apply new activation rewards that were never part of the old completion.

In particular, activating a new Hard Work ending must not cause an unrelated legacy ended save to receive `hardWork:lumber`.

---

# 10. Legacy action-count compatibility during these edge loads

Current Lead production definitions retain legacy action IDs such as:

- `lumber`;
- `school`.

This currently keeps existing:

- `lastAction.id`;
- `actionCounts`

parseable without migration.

The save-edge suite should preserve representative legacy keys while testing the states above.

If those definitions are removed in a later activation revision, this matrix becomes a blocking migration requirement.

---

# 11. Required test structure

A future executable `qa-product-save-edge-matrix.test.ts` should be table-driven.

Each row should contain:

- name;
- state constructor;
- expected invariant snapshot;
- number of reloads;
- negative “must not change” assertions.

At minimum, use two consecutive reloads for every exactly-once boundary.

Recommended helper:

```ts
function reload(save,cat){
  return parseSave(JSON.stringify(save),cat);
}
```

and compare explicit domain fields rather than relying only on whole-object equality where legacy facades/non-enumerable compatibility views may differ.

---

# 12. Required evidence summary

Before activation merge, executable evidence must show:

| Case | Required status |
|---|---|
| old schema-4 without School | PASS |
| old pending scene without presentation ID | PASS |
| slash semantic pending ID | PASS |
| active Activity reload | PASS |
| Night before lodging reload | PASS |
| Night after lodging payment reload | PASS |
| paid School lesson reload | PASS |
| ending committed reload | PASS |
| completed Hard Work reload twice | PASS |
| older ended schema-4 compatibility result idempotency | PASS |

At the time of this matrix, these are required evidence targets. Chat 4 has not run them against the current Lead HEAD because no executable checkout/workflow is exposed for that branch.

No production file was modified by Chat 4.
