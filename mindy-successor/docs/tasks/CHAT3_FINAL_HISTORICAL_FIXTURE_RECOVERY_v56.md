# Chat 3 — Final Historical Fixture Recovery v56

Status: **BUNDLE COMPLETE — READY FOR FINAL HISTORICAL FIXTURE GATE**  
Owner: Chat 3  
Branch: `chat3/final-historical-fixture-recovery-v54`

Previous authority:

`CHAT3_FINAL_SAVE_MIGRATION_GATE_PREP_v53.md`

This bundle resolves historical fixture debt F1-F5 without changing production runtime/content.

No full CI was run.

---

# 1. Bundle commits

v54 source recovery:

`9a4d1dd564b4748078b197319869d5cacd47abc1`

v55 reconstructed fixture preparation:

`5233a0b31a6254183395b1ec038297377df99565`

v56 handoff:

this document.

---

# 2. F1-F5 disposition

| Gap | Final classification | Genuine standalone save blob found? | Prepared fixture |
|---|---|---:|---|
| F1 schema1 save | AUTHORITATIVE RECONSTRUCTION | no | `tests/fixtures/final-historical/f1-schema1-reconstructed.json` |
| F2 pre-Field-Time Activity | AUTHORITATIVE RECONSTRUCTION | no | `tests/fixtures/final-historical/f2-pre-field-time-activity-envelope-reconstructed.json` |
| F3 Palace access/no ledger | AUTHORITATIVE RECONSTRUCTION | no | `tests/final-historical-reconstruction-v55.ts::reconstructPalaceAccessWithoutLedger` |
| F4 lumber-stay + RunResult | AUTHORITATIVE RECONSTRUCTION FROM ACCEPTED PRODUCER TEST | no | `tests/final-historical-reconstruction-v55.ts::reconstructLumberStayWithRunResult` |
| F5 lumber-stay pre-RunResult | AUTHORITATIVE RECONSTRUCTION FROM ACCEPTED PRODUCER TEST | no | `tests/final-historical-reconstruction-v55.ts::reconstructLumberStayPreRunResult` |

No item is labeled genuine.

No F1-F5 item remains unrecoverable without authority.

---

# 3. Exact provenance

## F1 — schema1

Historical imported M3.2 snapshot:

`536f2e5a7084153375cbc4cb54c08c27e95545e7`

Files:

- `src/core/engine.ts`
- `tests/migration.test.ts`

The historical parser defines v1→v2 as exactly:

```text
schemaVersion = 2
run.actionCounts = { work: run.metrics.work }
```

The same commit has the genuine schema2 M2 test raw.

Reconstruction is therefore:

- exact genuine schema2 raw;
- `schemaVersion:1`;
- no `run.actionCounts`;
- no other difference.

Migration-discipline contract:

`0ae14e5949a1a1790d6f5a7b41f29e7db6c830e1`

`SAVE_AND_MIGRATION_CONTRACT_v1.md`.

## F2 — pre-Field-Time Activity

Persisted envelope authority:

`1602583bf9b80515280df165c269bec4353bc19a`

Files:

- `src/core/schema.ts`
- `src/core/engine.ts`
- `tests/activity.test.ts`

First shipped production Activity authority:

`9b427d75dc22021cd3373aa7dd3521782e54152d`

Definition:

`lumber.forest`

At that commit:

- persisted Activity envelope exists;
- `fieldTimeRemaining` does not exist;
- `miniGames` does not exist.

Fixture is the exact day-0 entry envelope.

The only calculated field is historical RNG state:

`1107666780`

derived by the exact historical LCG from fresh state `2654435761`.

No later route/option/Field-Time state is included.

## F3 — Palace access without typed Rich6 state

Accepted D23 access authority:

`959fb3f4e61b4237ae3afb52f5d4dfe5733b4531`

File:

`tests/palace-d23-consumer-integration-v8.test.ts`

That exact schema has no typed:

`run.progression.palace`

but accepted invitation completion writes:

`palace.access-granted`

as run-local world fact.

Neutral typed-Palace migration authority:

`chat6/palace-prince-narrative-producer-v18@67f948d185883d8e706dad522e5010bff8e2bd48`

File:

`tests/palace-rich6-runtime-v15.test.ts`

Exact compatibility recipe:

- keep `palace.access-granted`;
- omit `run.progression.palace`;
- omit `palace.progression-complete`;
- do not invent duties/stage.

## F4 — old lumber-stay with modern RunResult

Accepted producer:

`chat5/lumber-stay-retirement-producer-v17@52bfd82b374ed045b06c9c78f5f3065cd7226bdb`

File:

`tests/lumber-stay-retirement-v17.test.ts`

Exact source test:

`existing historical RunResult and transaction proof are preserved exactly`

Recipe preserves exact IDs:

- `lumber-stay`
- `vitality`
- `rr.legacy.lumber-stay`
- `tx.legacy.lumber-stay`
- `legacy.reward.vitality`

and `completedAtDay:17`.

## F5 — old lumber-stay before RunResult

Same accepted producer.

Exact source test:

`ended pre-RunResult lumber-stay gets deterministic compatibility proof without reward replay`

Raw evidence deliberately has:

- completed ending `lumber-stay`;
- ended run;
- committed `lumber-stay`;
- `run.endings.result=null`;
- no transaction proof;
- no pre-invented migration result ID.

The migration owns deterministic proof creation.

---

# 4. Fixture files created

## Literal reconstructed raw fixtures

`mindy-successor/prior-work/astra/prototype-m3.2/tests/fixtures/final-historical/f1-schema1-reconstructed.json`

`mindy-successor/prior-work/astra/prototype-m3.2/tests/fixtures/final-historical/f2-pre-field-time-activity-envelope-reconstructed.json`

## Provenance manifest

`mindy-successor/prior-work/astra/prototype-m3.2/tests/fixtures/final-historical/README.md`

The manifest states:

- reconstruction classification;
- exact source commits/files;
- every inferred field;
- why each inference is safe;
- final-gate usage restrictions.

## F3-F5 reconstruction module

`mindy-successor/prior-work/astra/prototype-m3.2/tests/final-historical-reconstruction-v55.ts`

Functions:

- `reconstructPalaceAccessWithoutLedger`
- `reconstructLumberStayWithRunResult`
- `reconstructLumberStayPreRunResult`

The module:

- imports no production runtime/schema;
- operates on raw JSON-shaped data;
- clones before mutation;
- does not normalize through current `parseSave`;
- rejects an invalid F3 baseline instead of inventing access.

## Test-only self-check

`mindy-successor/prior-work/astra/prototype-m3.2/tests/final-historical-fixtures-v55.test.ts`

This test verifies fixture preparation itself:

- F1 remains schema1 and lacks v2/v3-added fields;
- F2 lacks Field Time, mini-games and later route-option state;
- F3 preserves access while removing typed ledger/progression-complete;
- F4 exact historical RunResult values match accepted producer;
- F5 leaves result/transaction proof absent for migration to create.

This is fixture-integrity coverage, not a claim that the final release migration is already assembled.

---

# 5. Final save/migration cases unlocked

## F1 unlocks case 01

`case 01: schema ladder reaches one final schema and parse twice is idempotent`

The final suite can now start from an authoritative raw schema1 boundary instead of an arbitrary final-schema mutation.

## F2 unlocks case 17

`case 17: legacy Activity Field Time and mini-game state migrate conservatively`

The final suite now has a pre-Field-Time persisted envelope with:

- production Activity ID;
- historical version/adapter;
- historical internal state;
- no later fields.

It can be embedded into the appropriate historical full-save base before migration.

## F3 unlocks case 13

`case 13: old Palace access without Rich6 ledger gets neutral progression while access is preserved`

The final test must provide a valid D23 accepted-access baseline and apply the raw reconstruction recipe before `parseSave`.

## F4/F5 unlock case 06

`case 06: retired lumber-stay vitality migration preserves history without creating a modern ending`

The final suite can cover both:

- existing historical RunResult/transaction preservation;
- pre-RunResult deterministic compatibility proof.

---

# 6. Genuine vs reconstructed rule for release evidence

Release reporting must say:

**authoritative reconstructed historical fixture**

for F1-F5.

Do not write:

- genuine schema1 user save;
- genuine historical Palace save;
- genuine lumber-stay save;

because no standalone user-save blob was recovered.

The recovered authority is still strong enough for regression gating because each reconstruction is constrained by historical executable code/tests.

---

# 7. Remaining unresolved gaps

Within F1-F5:

**none require new Product/runtime authority.**

There are two operational requirements for the final test assembly:

## F2 full-save host

The prepared F2 artifact is the exact historical Activity envelope, not an entire serialized save.

The final closure test must embed it into the historically compatible save base for the chosen release migration boundary.

It must not add later Activity fields before migration.

## F3 valid accepted-access host

The F3 recipe expects a valid serialized D23 accepted-access baseline.

The final test must create/preserve that baseline through the accepted D23 authority before stripping typed Palace state.

It must not start from an arbitrary final fresh save and simply add the access fact.

These are assembly requirements, not unresolved semantic gaps.

---

# 8. Stop conditions for final historical fixture gate

Stop the final gate if:

- F1 gains any field other than those historically present at schema1;
- F1 includes `run.actionCounts` before migration;
- F1 includes creation/RNG/lastAction/Lust fields that belong to schema2→3;
- F2 gains `fieldTimeRemaining`, `miniGames`, route ID or resolved option IDs before migration;
- F2 Activity ID/version/adapter no longer match the selected historical catalog without an explicit content migration;
- F3 is built by adding `palace.access-granted` to an arbitrary final save instead of an accepted D23 baseline;
- F3 invents duty count, stage or `palace.progression-complete`;
- F4 changes existing result ID or transaction ID;
- F4 replays the old reward transaction;
- F5 pre-populates a transaction/result that migration is supposed to construct;
- either lumber fixture becomes a modern live ending;
- `vitality` is converted into Hard Work or a Strong Meta slot;
- any reconstructed fixture is reported as genuine;
- production migration code is changed merely to fit these fixtures.

---

# 9. Final integration instructions

When the final release schema/catalog is assembled:

1. import/read the v55 test fixtures as raw input;
2. do not normalize them before `parseSave`;
3. materialize F2/F3 only into their documented compatible host state;
4. run the exact cases from `CHAT3_FINAL_SAVE_MIGRATION_GATE_DESIGN_v52.md`;
5. assert parse-twice idempotence;
6. assert stable transaction/run snapshots;
7. classify failures as runtime behavior vs fixture drift before modifying either side.

The reconstructed fixtures are regression inputs.

They are not authorization to widen migration semantics.

---

# 10. Final disposition

v54 source recovery: **COMPLETE**

v55 test-only fixture preparation: **COMPLETE**

F1-F5 unrecoverable gaps: **0**

Production runtime/content mutation: **NONE**

Full CI: **NOT RUN**

**BUNDLE_COMPLETE — READY_FOR_FINAL_HISTORICAL_FIXTURE_GATE**
