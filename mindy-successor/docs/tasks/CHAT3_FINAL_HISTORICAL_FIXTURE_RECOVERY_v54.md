# Chat 3 — Final Historical Fixture Recovery v54

Status: **SOURCE RECOVERY COMPLETE**  
Owner: Chat 3  
Branch: `chat3/final-historical-fixture-recovery-v54`

Scope:

Recover authoritative historical source material for fixture debt F1-F5 from:

- Git history;
- frozen branches;
- historical tests;
- accepted producer artifacts.

No production runtime/content is changed.

No full CI is run.

---

# Classification rule

Each fixture is classified as exactly one of:

- **EXACT HISTORICAL FIXTURE FOUND** — a standalone historical raw fixture/save exists in repository history.
- **AUTHORITATIVE RECONSTRUCTION** — no standalone historical blob exists, but historical runtime/test contracts determine the raw state unambiguously.
- **UNRECOVERABLE WITHOUT NEW AUTHORITY** — repository history does not determine the state safely enough.

Important:

No reconstructed fixture is labeled “genuine”.

---

# F1 — schema1 save

Disposition:

**AUTHORITATIVE RECONSTRUCTION**

No standalone schema1 save blob was found.

Historical source:

`536f2e5a7084153375cbc4cb54c08c27e95545e7`

File:

`mindy-successor/prior-work/astra/prototype-m3.2/src/core/engine.ts`

Historical parser contract:

```ts
if(raw.schemaVersion===1){
  raw.schemaVersion=2;
  raw.run.actionCounts={work:raw.run.metrics.work};
}
```

The same imported M3.2 snapshot contains a genuine schema2 test fixture:

`mindy-successor/prior-work/astra/prototype-m3.2/tests/migration.test.ts`

Test name:

`genuine M2 save migrates without shrinking stats or losing pending scene/meta`

The genuine schema2 fixture contains:

- `schemaVersion: 2`;
- `contentVersion: '0.1.0'`;
- M3.2 `meta.unlocked/completed/lives` shape;
- old `run.metrics`;
- `run.actionCounts:{work:1}`;
- pending `base.arrival/welcome`;
- old history/journal/ending fields.

The historical v1→v2 migration mutates only:

1. `schemaVersion:1 -> 2`;
2. creates `run.actionCounts={work:raw.run.metrics.work}`.

Therefore an authoritative schema1 reconstruction is unambiguous:

- start from the exact genuine schema2 raw fixture;
- set `schemaVersion:1`;
- remove `run.actionCounts`;
- change nothing else.

No other field inference is permitted.

Additional contract authority:

`0ae14e5949a1a1790d6f5a7b41f29e7db6c830e1`

`SAVE_AND_MIGRATION_CONTRACT_v1.md`

which requires deterministic sequential migrations and forbids invented progress.

---

# F2 — pre-Field-Time Activity envelope

Disposition:

**AUTHORITATIVE RECONSTRUCTION**

No serialized user save or standalone JSON envelope was found.

Historical persisted Activity runtime was introduced by:

`1602583bf9b80515280df165c269bec4353bc19a`

Commit:

`A5: implement persisted ActivityEnvelope`

Files:

- `src/core/schema.ts`
- `src/core/engine.ts`
- `tests/activity.test.ts`

Historical envelope schema at A5 contains exactly:

- `activityId`
- `definitionVersion`
- `adapter`
- `status`
- `startedDay`
- `entryEnergyCommitted`
- `internalState.progress`
- `internalState.endurance`
- `internalState.steps`
- `internalState.lastRoll`
- `rngState`
- `checkpoint`
- `accumulatedRewards`
- `emittedFacts`

It does **not** contain:

- `fieldTimeRemaining`;
- `miniGames`;
- route/option state added later.

A5 runtime constructs the envelope deterministically.

For stronger production provenance, use the first shipped production Activity slice:

`9b427d75dc22021cd3373aa7dd3521782e54152d`

Production definition:

`lumber.forest`

Exact historical values:

- version: `1`
- adapter: `counter.v1`
- entry Energy: `2`
- initial Endurance: `5`
- advance cost: `1`
- success progress: `2`
- failure Endurance: `0`

At this shipped commit:

- `activityEnvelopeSchema` exists;
- `fieldTimeRemaining` is absent;
- `miniGames` is absent.

The v55 fixture uses the exact entry envelope for this production Activity:

- day 0;
- active;
- entry committed;
- progress 0;
- endurance 5;
- steps 0;
- lastRoll null;
- checkpoint `entry`;
- empty accumulated rewards/facts.

Historical fresh run RNG starts at `2654435761`.

Activity entry advances it once with the historical LCG:

`state = (1664525 * state + 1013904223) >>> 0`

yielding:

`1107666780`

Therefore the envelope RNG value is also unambiguous.

---

# F3 — Palace access without Rich6 ledger

Disposition:

**AUTHORITATIVE RECONSTRUCTION**

No standalone serialized old Palace save was found.

The accepted D23 consumer integration is frozen at:

`959fb3f4e61b4237ae3afb52f5d4dfe5733b4531`

File:

`tests/palace-d23-consumer-integration-v8.test.ts`

Accepted behavior proves that after invitation acceptance:

- `palace.access-granted` exists exactly once in `run.progression.worldFacts`;
- `meta.unlocks` does not contain `palace`;
- pending invitation is cleared;
- access survives parse/reload.

At that exact D23 commit:

`src/core/schema.ts`

does **not** contain a typed:

`run.progression.palace`

ledger.

Therefore a D23-era accepted-access save is historically an access fact with no Rich6 Palace ledger.

Independent later migration authority:

`chat6/palace-prince-narrative-producer-v18`

File:

`tests/palace-rich6-runtime-v15.test.ts`

Test:

`schema-5 save without typed Palace state defaults safely without retroactive progress`

constructs the compatibility raw state by:

1. starting from a valid qualified Palace life;
2. deleting `raw.run.progression.palace`;
3. removing `palace.progression-complete`;
4. preserving Palace access;
5. parsing;
6. asserting neutral `entered-service`, zero duty count and empty committed duty IDs.

This supplies exact reconstruction authority.

v55 therefore stores a reconstruction recipe, not a fake “genuine old save”.

---

# F4 — completed old lumber-stay with existing RunResult/transaction

Disposition:

**AUTHORITATIVE RECONSTRUCTION FROM ACCEPTED PRODUCER TEST**

No original user-save JSON was found.

Accepted retirement producer:

`chat5/lumber-stay-retirement-producer-v17@52bfd82b374ed045b06c9c78f5f3065cd7226bdb`

File:

`tests/lumber-stay-retirement-v17.test.ts`

Test:

`existing historical RunResult and transaction proof are preserved exactly`

The producer reconstructs the exact historical evidence:

```text
meta.completedEndings = ['lumber-stay']
meta.unlocks = ['vitality']
meta.appliedResultTransactions = ['tx.legacy.lumber-stay']

run.status = 'ended'
run.endings.committed = 'lumber-stay'
run.endings.result = {
  resultId: 'rr.legacy.lumber-stay',
  endingId: 'lumber-stay',
  transactionId: 'tx.legacy.lumber-stay',
  completedAtDay: 17,
  firstCompletion: true,
  appliedMetaRewardIds: ['legacy.reward.vitality']
}
```

This exact recipe is accepted executable authority.

It is reconstructed test state, not a genuine user-save blob.

---

# F5 — completed old lumber-stay without modern RunResult

Disposition:

**AUTHORITATIVE RECONSTRUCTION FROM ACCEPTED PRODUCER TEST**

No original user-save JSON was found.

Same v17 producer.

Test:

`ended pre-RunResult lumber-stay gets deterministic compatibility proof without reward replay`

Exact producer reconstruction:

```text
meta.completedEndings = ['lumber-stay']
meta.unlocks = []
meta.appliedResultTransactions = []

run.status = 'ended'
run.endings.committed = 'lumber-stay'
run.endings.result = null
```

Migration then must create deterministic compatibility proof with:

- ending ID still `lumber-stay`;
- `firstCompletion=false`;
- no applied Meta reward IDs;
- stable transaction ID added exactly once;
- one `legacy.lumber-stay.vitality` ownership path;
- parse-twice idempotence.

Again this is accepted reconstruction authority, not a genuine old save blob.

---

# Recovery summary

| Gap | Classification | Standalone genuine blob found? | Authoritative source |
|---|---|---:|---|
| F1 schema1 | AUTHORITATIVE RECONSTRUCTION | no | original M3.2 v1→v2 migration + genuine schema2 fixture |
| F2 pre-Field-Time Activity | AUTHORITATIVE RECONSTRUCTION | no | A5 persisted Activity runtime + first shipped `lumber.forest` definition |
| F3 Palace access/no ledger | AUTHORITATIVE RECONSTRUCTION | no | accepted D23 access state + v15 neutral-ledger migration test |
| F4 lumber-stay with RunResult | AUTHORITATIVE RECONSTRUCTION | no | accepted v17 retirement producer test |
| F5 lumber-stay pre-RunResult | AUTHORITATIVE RECONSTRUCTION | no | accepted v17 retirement producer test |

No F1-F5 item is classified unrecoverable.

No item is falsely labeled genuine.

---

# v54 disposition

Historical source recovery: **COMPLETE**

All F1-F5 have sufficient authoritative reconstruction contracts for test-only fixture preparation.

**v54 COMPLETE — CONTINUE TO v55**
