# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — STRONG META FULL-CI FIXTURE REPAIR**
Owner: Chat 2 / sole full-CI integration lane

Assembly PR:
#277

Assembly head that passed focused QA:
`acfbfabe59e0a8e8504bc18f401d5f4967886553`

Focused QA:
#1154 **SUCCESS**

Full CI:
#1155 **FAILURE**

## Diagnosis

Strong Meta core is not the failing area.

#1155 failures are stale schema5 / hand-built completed-save fixtures after the accepted schema6 Strong Meta invariant.

The runtime invariant remains:
**every completed-creation schema6 run must have a resolved Strong Meta snapshot.**

Do not weaken or remove that invariant.

### Failure class 1 — stale schema version expectation

`tests/gopher.test.ts`

Test:
`schema5 roundtrip preserves progress, pending state and metadata`

Current expectation is still schemaVersion 5.
After Strong Meta migration the correct serialized/current schema is **6**.

Repair expectation only.

### Failure class 2 — manually constructed completed saves without snapshot

The following current-main tests call parse/save reload on fixtures that mark creation complete but do not include the mandatory schema6 Strong Meta snapshot:

- `tests/school-activation-boundary.test.ts`
- `tests/school-blocking-scene-compat.test.ts`
- `tests/school-body-confidence-lust-d20.test.ts`
- `tests/school-engine-adapter.test.ts`
- `tests/school-life-content-reload.test.ts`
- `tests/school-production-v11-locale-save.test.ts`
- `tests/school-target.test.ts`

Repair the shared/local test fixtures so a completed creation carries the canonical empty resolved Strong Meta snapshot.

Preferred method:
- reuse the exported Strong Meta empty snapshot helper or a canonical test helper;
- do not duplicate ad-hoc snapshot shapes across files if a shared helper can safely serve them.

Do not:
- make parseSave silently invent a snapshot for arbitrary schema6 completed saves;
- downgrade schema back to 5;
- weaken malformed-save rejection;
- auto-select rewards;
- infer ownership.

## Gate after repair

Create a new repair commit on:
`chat2/assembly-strong-meta-current-main-20261003-v1`.

Run focused first:
- typecheck;
- validate;
- build;
- frozen Strong Meta suite;
- Palace D23;
- all seven repaired School/save files;
- gopher schema roundtrip;
- Night/Energy/Poverty;
- D31 preservation.

Only after focused green rerun full CI once.

Freeze exact head and report:
`READY_FOR_LEADER_MERGE`.

Do not merge main.
