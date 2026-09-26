# Product Activation — Schema-4 Compatibility Matrix v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Branch: `chat4/activation-regression-next`  
Current-main baseline: `9e0be0a33402166d72f125b74c29fd345e74c6fd`  
Lead activation branch reviewed: `lead/product-activation-school-lumber-v2` @ `6d963d025d68b5f8796b9b0a419573db9c479d1c`

## Compatibility rule

Production activation is a content/runtime activation inside **schema version 4**, not permission to invalidate already-valid schema-4 saves.

For every case below:

- old schema-4 data that was valid before activation must remain loadable unless an explicit, documented incompatible-content rule exists;
- adding a new subsystem field must use a neutral default rather than requiring old saves to have authored future state;
- migration/defaulting must happen before strict semantic validation that depends on the newly activated catalog;
- exactly-once state must never be recreated by replaying gameplay transactions during load.

## Matrix

| Existing schema-4 save shape | Current main behavior | Required activation behavior | Exact default / migration requirement | Main risk |
|---|---|---|---|---|
| No School-owned progression state | Current schema has no `run.progression.school`; valid saves naturally omit it | **MUST LOAD** | Missing School progression defaults to exactly `{tracks:{}}`. Do not synthesize lessons, milestones, certificates, facts or choices. Preserve existing careers/quests/relationships/worldFacts byte-semantically. | Making `school` required without a default would reject every pre-activation schema-4 save. |
| Pending scene without `presentationId` | Field is optional; current Resolver-generated pending scenes normally omit it; UI derives presentation from event+variant | **MUST LOAD** | Missing field remains allowed. On render, derive deterministically from already persisted `eventId + variantId`; do not reroll variant or Resolver state. A loader may leave it undefined; it must not require a new value to exist in old JSON. | Activation starts persisting semantic IDs for new scenes and accidentally makes the field mandatory. |
| Pending scene with canonical slash `presentationId` | **FAILS** current `parseSave`: field uses generic ID regex without `/` | **MUST LOAD after activation fix** | Persisted field must accept the canonical semantic presentation grammar, e.g. `job/lumber/event/.../default`, and return the exact same string after `JSON.stringify -> parseSave`. No filename migration. | Schema grammar disagrees with presentation taxonomy. |
| Existing legacy `historyState.actionCounts` keys | Current `parseSave` rejects any counter whose key is not an action in the current catalog | **MUST LOAD** when activation changes action inventory | Do not drop historical counts silently. Any retired action ID must either remain recognized as a compatibility action/counter key, or be transformed by an explicit one-to-one compatibility mapping before the “unknown counter” check. The migration must be idempotent and must not increment target counters by replay. | Replacing legacy `lumber` with `lumber.shift` or removing legacy School actions can make old saves fail immediately. |
| Active Activity envelope | Current `parseSave` validates definition exists, version and adapter match, state is active, day constraints hold, and result has not already committed | **MUST LOAD** if the referenced Activity definition is still supported | Preserve `activityId`, `definitionVersion`, adapter, `startedDay`, committed entry-cost marker, internal progress/endurance/RNG/checkpoint exactly. Activation must not charge entry Energy again, reroll internal RNG, advance calendar, or emit result effects during load. If an Activity definition is intentionally superseded, provide an explicit envelope migration rather than silently relabeling it. | UI/content activation changes an Activity definition ID/version and strands in-progress saves or duplicates entry/result effects. |
| `ending_committed` save | Current parser requires committed ending to exist in current catalog and requires no RunResult yet | **MUST LOAD** | Keep the referenced ending ID resolvable, or migrate every ending reference consistently before catalog validation. Preserve `status='ending_committed'`, committed ID, pending scene if any, and Meta unchanged. Do not complete the ending on load. | Removing/renaming legacy endings makes save fail as “unknown ending” or activation accidentally completes/rewards it. |
| Completed `ended` save with RunResult | Current parser requires committed/result ending consistency, completed Meta entry and transaction proof; older schema-4 without RunResult gets a compatibility result | **MUST LOAD exactly once** | Preserve existing `resultId`, `transactionId`, `appliedMetaRewardIds`, `meta.completedEndings`, `meta.hardWorkProgress` and `meta.appliedResultTransactions`. Do not regenerate a new transaction or reapply reward merely because the ending definition changed. If an ending ID is migrated, all references must be transformed consistently without changing the existing transaction identity. | Activation removes a legacy ending or re-registers eligibility/reward and duplicates Meta effects. |

## 1. School-owned progression default

### Current main

`src/core/schema.ts -> progressionStateSchema` contains:

- `careers`
- `quests`
- `relationships`
- `worldFacts`

No School field exists, so all currently valid schema-4 saves omit it.

### Lead branch at review time

The Lead branch adds:

```ts
export const schoolProgressionStateSchema=
  z.object({tracks:z.record(z.string(),schoolTrackState)}).strict();

export const progressionStateSchema=z.object({
  careers: ...,
  quests: ...,
  relationships: ...,
  school:schoolProgressionStateSchema.default({tracks:{}}),
  worldFacts: ...
}).strict();
```

This is the correct backward-compatible shape for **missing School state**: old schema-4 saves parse to an empty School track map rather than failing.

The default must stay semantically empty. Loading a pre-activation save must not infer completed lessons from legacy `lessons` metrics or legacy actionCounts unless a separately approved migration explicitly defines that mapping.

## 2. Pending scene without presentationId

### Current main

`pendingSceneSchema.presentationId` is optional.

Current Resolver selection stores:

- `eventId`
- `variantId`
- `reactionEpochId`
- `allowedChoiceIds`

and usually omits presentationId.

UI uses:

```ts
p.presentationId ?? presentationIdForEvent(catalog,e.id,v.id)
```

Therefore an old pending scene can be restored without changing its resolved variant.

### Required activation behavior

New saves may persist semantic IDs, but old saves without the field must remain legal.

Compatibility proof must cover:

```text
old pending JSON without presentationId
-> parseSave under activated catalog
-> same eventId / variantId / allowedChoiceIds
-> same deterministic presentationId when rendered
```

No Resolver rerun is needed or allowed merely to fill presentation identity.

## 3. Pending scene with canonical slash presentationId

Current-main defect is already documented in:

`docs/qa-prep/PRESENTATION_SAVE_SCHEMA_COMPAT_AUDIT_v1.md`

Current pending field uses:

`^[a-z][a-z0-9_.-]{1,79}$`

while canonical presentation IDs use slash form such as:

`relationship/lumber-foreman/lumber-foreman-notice/default`.

### Lead branch at review time

Lead introduces:

```ts
const semanticPresentationId =
  z.string().min(1).max(240)
   .regex(/^[a-z0-9][a-z0-9/._-]*$/);
```

and uses it for:

- `pendingScene.presentationId`
- `lastAction.presentationId`

Lead Resolver also begins writing:

```ts
presentationId:presentationIdForEvent(...)
```

into newly created pending scenes.

This addresses the grammar mismatch in source, but merge evidence still needs a direct save/reload regression test.

Required positive sequence:

1. create a real pending target scene;
2. assert canonical slash presentationId;
3. serialize;
4. `parseSave`;
5. assert exact presentationId unchanged;
6. resolve the same saved choice/variant without reroll.

## 4. Legacy actionCounts

This is the most important uncovered schema-4 compatibility seam in the visible Lead branch.

Current and reviewed Lead `parseSave` both do:

```ts
const actions=new Set(cat.definitions.actions.map(a=>a.id));
for(const id of Object.keys(s.run.actionCounts))
  if(!actions.has(id))
    throw new Error(`Неизвестный счётчик ${id}`);
```

A pre-activation shipped save can legitimately contain counts for legacy production actions, including legacy profession/School action IDs.

If production activation removes one of those action definitions, the save becomes unloadable even though its JSON is valid schema-4.

### Required behavior

Before the unknown-counter validation, activation must choose one explicit compatibility strategy:

1. **retain the legacy action ID as recognized compatibility catalog data**, or
2. **apply an explicit action-count alias/migration**.

If a mapping is used it must:

- be one-to-one and documented;
- run once/idempotently;
- preserve the numeric count;
- not dispatch the action;
- not create wages, costs, Energy usage, reaction facts, career counters, School counters or presentation state.

Do not guess that every legacy `lumber` count is equivalent to a target `lumber.shift` career counter unless the Lead package explicitly defines that migration. Historical actionCounts and target progression counters are different persisted concepts.

## 5. Active Activity save

Relevant persisted schema:

`src/core/schema.ts -> activityEnvelopeSchema`

Relevant reload checks:

`src/core/engine.ts -> parseSave()`

A valid active Activity save carries committed entry state and internal deterministic state:

- activity ID;
- definition version;
- adapter;
- `entryEnergyCommitted:true`;
- started day;
- internal progress/endurance/steps/lastRoll;
- internal RNG;
- checkpoint;
- accumulated rewards / emitted facts.

### Required behavior

Activation/UI exposure must be additive around that envelope.

Reload must not:

- charge entry Energy again;
- call `enterActivity`;
- advance the Activity;
- reroll RNG;
- finalize success/failure;
- emit result facts;
- run a Lumber continuation merely because content is now activated.

Existing A5 tests are the behavioral baseline. Activation needs an additional regression using the production Activity definition once it is shipped.

## 6. Ending committed save

Relevant fields:

- `run.status='ending_committed'`
- `run.endings.committed`
- `run.endings.result=null`

Current parser verifies the committed ending is present in the current catalog.

### Required behavior

Production activation must not remove compatibility for an ending referenced by an existing schema-4 save.

If legacy ending definitions are removed from the active catalog, the activation PR must either:

- keep compatibility definitions/aliases loadable, or
- explicitly transform the persisted ending reference before the catalog-known check.

Loading an ending-committed save must **not** call `completeEnding`.

## 7. Completed ending save

Current schema-4 result identity is already protected by A6:

- `resultId`
- `endingId`
- `transactionId`
- `completedAtDay`
- `firstCompletion`
- `appliedMetaRewardIds`

and Meta includes:

- completed endings;
- Hard Work progress;
- applied result transactions.

### Required behavior

Activation can change what future endings are available, but cannot replay a completed transaction.

For a loaded completed save:

- existing transaction ID remains the transaction ID;
- reward proof remains exactly once;
- completed ending remains recorded;
- no new target Hard Work reward may be applied because a new target definition now exists;
- `newLife` must see the same accumulated Meta as before activation plus only genuinely previously committed Meta.

## Required regression matrix before activation merge

| Regression test | Required assertion |
|---|---|
| old schema-4 save without `progression.school` | loads; defaults to `school.tracks={}`; all old progression unchanged |
| old pending scene without presentationId | loads; same event/variant/choices; deterministic semantic presentation derived |
| new pending scene with slash presentationId | exact ID survives parseSave |
| old save with every still-supported legacy actionCounts key | loads after production catalog activation |
| save with a deliberately retired legacy actionCount | either explicit migration succeeds or merge is blocked; never silently drops count |
| active Activity reload | no second Energy charge / RNG reroll / result emission |
| ending_committed reload | remains committed, not completed; Meta unchanged |
| ended RunResult reload | same transaction/reward proofs; no duplicate Meta effect |

## Current disposition of visible Lead branch

At `6d963d025d68b5f8796b9b0a419573db9c479d1c`:

- **School missing-state default: SOURCE-READY**
- **slash semantic pending/lastAction schema: SOURCE-READY**
- **new pending-scene semantic ID persistence: SOURCE-READY**
- **legacy actionCounts compatibility across catalog action removal: NOT ADDRESSED in visible diff**
- **Activity save compatibility: no direct activation regression evidence yet**
- **ending committed/completed compatibility across ending catalog replacement: no direct activation regression evidence yet**

No production schema/runtime change is made by Chat 4.
