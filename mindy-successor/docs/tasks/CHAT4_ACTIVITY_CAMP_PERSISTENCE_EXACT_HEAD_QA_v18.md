# CHAT4 — Activity Camp Persistence Exact-Head QA v18

Status: **EXACT_HEAD_QA_RED — NOT_READY_FOR_CHAT2_ASSEMBLY**  
Owner: Chat 4  
QA branch: `chat4/qa-activity-camp-persistence-v18`  
Frozen producer under test: `chat4/activity-camp-persistence-producer-v17@0cae33dd3518dbda7d6d84e4ea6661b02fe49886`

## Exact-head execution

The QA workflow explicitly checked out the frozen producer SHA, not the QA branch head:

`0cae33dd3518dbda7d6d84e4ea6661b02fe49886`

Primary workflow:
- workflow: `Chat 4 Activity Camp exact-head QA v18`
- workflow ID: `374597703`
- diagnostic exact-head run ID: `37204543742`
- job ID: `111442895757`

The checkout and exact-SHA guard both passed on the self-hosted Windows runner. No full CI was run.

The required-check outcomes on the frozen producer were:

- exact SHA checkout: **PASS**
- `npm ci`: **PASS**
- typecheck: **FAIL**
- validate: **FAIL**
- build: **PASS**
- focused Activity/Camp/Night/save-reload suite: **FAIL**, TAP `40 total / 34 pass / 6 fail`

Therefore the frozen producer is not green under the v18 exact-head gate and must not be reported as `READY_FOR_CHAT2_ASSEMBLY`.

## Typecheck failure attribution

Exact error:

```text
tests/item-capability-activity-closure.test.ts(124,23): TS2345
Property 'effects' is missing
```

The failing test file is byte-identical between the v15 Activity runtime base and the frozen v17 producer:

- v15 base: `ab378d68765f7c9bbff43abf3b4b41e24df82e01`
- blob SHA on v15: `ee8b51b60687351e90d6690e18f4c91b32800813`
- blob SHA on frozen v17: `ee8b51b60687351e90d6690e18f4c91b32800813`

The error is therefore an inherited v15 test typing defect, not introduced by Activity Camp v17.

## Validate failure attribution

Exact error:

```text
Недопустимая typed capability:
read worldFact activity.forest-frontier.result.research-grade
```

The relevant Forest production pack is also byte-identical between v15 and frozen v17:

- `content/packs/forest-frontier-production.json`
- blob SHA on v15: `b504118112f7eb7cb444b763f70ff8b818e90760`
- blob SHA on frozen v17: `b504118112f7eb7cb444b763f70ff8b818e90760`

The validation script is unchanged as well:

- `scripts/validate.ts`
- blob SHA on v15 and frozen v17: `4c6cf5076821f06fd8d14cc0d9fff4de32882ff0`

The v17 `content.ts` diff is limited to the explicit Camp policy validation seam; it did not modify typed worldFact capability enforcement. This validate failure is an inherited v15 catalog/capability defect.

The same inherited catalog validation error prevents five selected adjacency files from loading in the focused multi-file run:

- `anomalous-reach-production-v14.test.ts`
- `migration.test.ts`
- `qa-activity-option-reload.test.ts`
- `restricted-sites-production-v15.test.ts`
- `trade-corridor-production-v13.test.ts`

## Frozen Camp suite result

Within `activity-camp-persistence-v17.test.ts`, six of seven Camp-specific tests pass on the frozen producer:

1. typed neutral Camp state, old-save neutral migration, and unchanged 2-Energy entry;
2. persisted Camp choice / reload before calendar advance;
3. exactly-once calendar advance and exactly-once Field Time refresh across reload;
4. Camp replaces city Night, no lodging charge, no global Energy refresh, max two nights;
5. same-day Activity rejection plus partial/incompatible persisted Camp-state rejection;
6. explicit multi-day finite-Field-Time catalog gate.

The only frozen Camp-test failure is the synthetic forced-Night test. The Camp/Debt transition itself reaches the expected completed Night state, then its final post-Night reload fails with:

```text
Неизвестное последнее занятие.
```

Cause: the synthetic Camp test catalog declares `actions: []` and no `stage.room` / `stage.outside` media, while the pre-existing NightFlow correctly writes:

```text
lastAction.id = "rest"
lastAction.media = ["stage.room" | "stage.outside"]
```

The production catalog has the required Night identity/media surface. This is a QA-fixture defect, not a Camp runtime behavioral defect.

The remaining selected tests that did execute past catalog construction, including NightFlow calendar/lodging exactly-once coverage and generic Activity exactly-once coverage, passed. The six focused failures are fully accounted for by the five inherited catalog-load failures plus the one Camp synthetic-fixture failure.

## Separate QA-fixture repair

The frozen producer was not modified.

A separate repair branch was created from the exact frozen SHA:

`chat4/activity-camp-persistence-qa-fixture-repair-v18`

Fixture-only repair commit:

`03eab6f049011e81efcda0641a790eaed6ecd803`

The repair only gives the synthetic Camp test catalog the existing NightFlow `rest` action identity and room/outside media expected by `parseSave`. No production runtime, Activity semantics, Secret Debt rule, content, ending, Palace, XP, Energy, Field Time or NightFlow behavior was changed.

Repair proof workflow:
- workflow ID: `374604699`
- run ID: `37204927773`
- job ID: `111444028097`
- explicitly tested repair SHA: `03eab6f049011e81efcda0641a790eaed6ecd803`
- `activity-camp-persistence-v17.test.ts`: **7 / 7 PASS**

This confirms the frozen suite's sole Camp-specific failure is the synthetic test fixture, not the v17 Camp state machine.

## v18 verdict

Executable exact-head QA was successfully performed against the frozen producer SHA. The Camp runtime behavior covered by its focused suite is supported by executable evidence after correcting the isolated synthetic fixture, and the NightFlow / exactly-once adjacency that executed is green.

However, the frozen SHA itself does **not** satisfy the pointer's required all-green gate because:
- its inherited v15 typecheck baseline is red;
- its inherited v15 validate/catalog baseline is red;
- its frozen Camp test contains the synthetic Night catalog omission described above.

Accordingly, this QA does **not** issue `READY_FOR_CHAT2_ASSEMBLY`.

**EXACT_HEAD_QA_RED — NOT_READY_FOR_CHAT2_ASSEMBLY**
