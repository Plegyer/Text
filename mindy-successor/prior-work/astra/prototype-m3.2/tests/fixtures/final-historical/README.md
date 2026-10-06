# Final historical fixtures v55

These files resolve fixture-debt inputs F1-F5 for the final save/migration closure.

**None of these files is labeled as a genuine user save unless a standalone historical save blob was found.**

No standalone user-save blob was recovered for F1-F5.

The literal/recipe fixtures below are authoritative reconstructions from historical runtime/tests.

---

## F1 — schema1

File:

`f1-schema1-reconstructed.json`

Classification:

**RECONSTRUCTED**

Authority:

- `536f2e5a7084153375cbc4cb54c08c27e95545e7`
- historical `src/core/engine.ts`
- historical `tests/migration.test.ts`

The historical test contains a **genuine schema2** raw object.

The historical parser says schema1→2 does exactly:

```text
schemaVersion = 2
run.actionCounts = { work: run.metrics.work }
```

Therefore the reconstructed schema1 raw is the genuine schema2 raw with exactly two differences:

1. `schemaVersion` is `1`;
2. `run.actionCounts` is absent.

Every other field/value is copied unchanged from the genuine schema2 fixture.

No `creation`, RNG, lastAction or Lust field is added; those belong to the later schema2→3 migration.

---

## F2 — pre-Field-Time Activity envelope

File:

`f2-pre-field-time-activity-envelope-reconstructed.json`

Classification:

**RECONSTRUCTED**

Authorities:

- persisted Activity runtime:
  `1602583bf9b80515280df165c269bec4353bc19a`
- first shipped production Lumber Activity:
  `9b427d75dc22021cd3373aa7dd3521782e54152d`

The shipped `lumber.forest` definition is:

- version 1;
- adapter `counter.v1`;
- Energy entry cost 2;
- initial Endurance 5;
- progress target 2;
- fail Endurance 0.

At that shipped commit the Activity envelope has no:

- `fieldTimeRemaining`;
- `miniGames`.

The fixture represents the exact entry checkpoint on day 0.

Inferred field:

`rngState=1107666780`

Reason:

historical fresh run state is `2654435761`, and Activity entry performs exactly one historical LCG step:

`(1664525 * state + 1013904223) >>> 0`.

No later Activity route/options/Field-Time fields are inserted.

---

## F3 — Palace access without Rich6 ledger

Fixture recipe:

`../final-historical-reconstruction-v55.ts::reconstructPalaceAccessWithoutLedger`

Classification:

**RECONSTRUCTED**

Authorities:

- D23 accepted access:
  `959fb3f4e61b4237ae3afb52f5d4dfe5733b4531`
- neutral Rich6 migration:
  `tests/palace-rich6-runtime-v15.test.ts` on
  `chat6/palace-prince-narrative-producer-v18`

Required base:

a serialized accepted Palace life containing:

`palace.access-granted`

At the D23 commit the schema has no typed `run.progression.palace`.

The later v15 migration test reconstructs this exact historical boundary by:

- deleting `run.progression.palace`;
- removing `palace.progression-complete`;
- preserving `palace.access-granted`.

The recipe refuses a base with obsolete `meta.unlocks=['palace']`, because accepted D23 access was run-local.

No duty/stage/progress value is inferred.

---

## F4 — lumber-stay completed with RunResult

Fixture recipe:

`../final-historical-reconstruction-v55.ts::reconstructLumberStayWithRunResult`

Classification:

**RECONSTRUCTED FROM ACCEPTED PRODUCER TEST**

Authority:

`chat5/lumber-stay-retirement-producer-v17@52bfd82b374ed045b06c9c78f5f3065cd7226bdb`

Exact source test:

`existing historical RunResult and transaction proof are preserved exactly`

All injected fields are copied verbatim from the accepted producer test.

No ID/value is inferred.

---

## F5 — lumber-stay completed before RunResult

Fixture recipe:

`../final-historical-reconstruction-v55.ts::reconstructLumberStayPreRunResult`

Classification:

**RECONSTRUCTED FROM ACCEPTED PRODUCER TEST**

Same v17 authority.

Exact source test:

`ended pre-RunResult lumber-stay gets deterministic compatibility proof without reward replay`

All injected fields are copied verbatim.

No transaction ID is pre-invented; migration is expected to create its deterministic compatibility proof.

---

## Final-gate usage

The final migration test must feed these raw fixtures/recipes into the migration boundary **before** any target-schema normalization.

Do not:

- call current `freshSave` and label it historical;
- add late fields to F1/F2;
- add duty progress to F3;
- add a modern ending for F4/F5;
- convert `vitality` directly into Hard Work or Strong Meta ownership.

