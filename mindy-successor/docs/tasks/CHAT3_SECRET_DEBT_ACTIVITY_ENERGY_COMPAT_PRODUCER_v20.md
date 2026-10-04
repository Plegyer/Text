# Chat 3 — D51 Secret Debt / Activity Energy Compatibility Producer v20

Status: **IMPLEMENTATION COMPLETE — READY FOR CHAT2 ASSEMBLY**  
Owner: Chat 3  
Branch: `chat3/secret-debt-activity-energy-compat-producer-v20`

Accepted Product authority:
`mindy-successor/docs/tasks/LEADER1_D51_BOUND_STREET_ACTIVITY_ENERGY_LOCK_2026-10-04.md`

Source audit:
`chat3/activity-secret-debt-energy-compat-audit-v19@d030bc72be62212130aad709cff748947eb36507`

Frozen Secret Debt base:
`chat4/secret-debt-full-route-producer-v12@10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`

Implementation commits before this handoff:
- `a48982140881fc0a7a72bee4f931435446d3bdbb` — D51 runtime seam + focused QA
- `d6647dc0fd99056b6a4c04f30917901c63923330` — exact D19 10-day trap boundary in T7/T8

> Final frozen branch SHA is the handoff commit created after this document.

## Result

D51 is implemented narrowly on the Night -> next-day Energy seam.

When the immediately preceding Night contains both explicit provenance markers:

- Street Energy -1;
- `secret-debt.bound-night` Energy -1;

the engine:

1. processes the two locked -1 penalties as a pair;
2. applies the D51 compatibility floor of 2 to that pair only;
3. applies all unrelated queued Energy delta separately afterward;
4. retains the pre-existing global minimum of 1.

No global Energy floor of 2 was introduced.

## Explicit provenance

Existing Secret Debt provenance remains:

`secret-debt.bound-night`

A new explicit Street-energy provenance tag is written only when the selected lodging is exactly `lodging.street` and its authored Energy delta is exactly -1:

`lodging.street.energy-penalty`

The D51 compatibility path requires both tags.

It does not infer compatibility from current housing state.

## Runtime formula

Normal path, when the D51 pair is absent:

`max(1, energyMax + queuedEnergyDelta)`

D51 path, when both provenance tags are present:

- locked pair delta = -2;
- `unrelatedDelta = queuedEnergyDelta - (-2)`;
- `afterLockedPair = max(2, energyMax - 2)`;
- final Energy = `max(1, afterLockedPair + unrelatedDelta)`.

Acceptance examples:

- base 3 + Street -1 + bound-night -1 -> 2;
- base 4 + Street -1 + bound-night -1 -> 2;
- base 3 + Street -1 only -> 2;
- base 3 + bound-night -1 only -> 2;
- base 3 + Street -1 + bound-night -1 + unrelated -1 -> 1;
- base 5 + Street -1 + bound-night -1 -> 3.

This preserves the exact D51 rule that unrelated penalties remain independent after compatibility handling.

## Files changed

### Runtime

`mindy-successor/prior-work/astra/prototype-m3.2/src/core/engine.ts`

Changes:

- added explicit D51 provenance constants;
- added `nextDayEnergyAfterD51Compatibility`;
- start-day finalization now delegates Energy computation to that helper;
- Street lodging writes the explicit Energy provenance tag before post-lodging resolution.

No Save schema change was needed because next-day modifier tags already persist in Save state.

### Existing Secret Debt regression

`mindy-successor/prior-work/astra/prototype-m3.2/tests/secret-debt-full-route-v12.test.ts`

The previous producer expectation:

- bound + normal -> 2;
- bound + Street -> 1;

was updated to D51 authority:

- bound + normal -> 2;
- bound + Street -> 2.

All other Secret Debt v12 expectations remain unchanged.

### New focused v20 QA

`mindy-successor/prior-work/astra/prototype-m3.2/tests/secret-debt-activity-energy-compat-v20.test.ts`

Contains the full requested T1-T11 matrix.

## T1-T11 coverage

### T1 — normal lodging control

Bound + normal:

- next day = 2 Energy;
- normal 2-Energy Activity entry succeeds;
- Activity spends exactly 2.

### T2 — cheap lodging control

Bound + cheap:

- next day = 2 Energy;
- Activity succeeds.

### T3 — bound + Street fix

Bound + Street:

- both locked penalties are processed;
- next day = 2 Energy;
- Street Grooming -1 remains;
- Activity succeeds and spends exactly 2.

### T4 — reload before forced-Night choice

Reload while `secret-debt.forced-night` is pending.

Checks:

- same pending forced event survives;
- bound-night modifier is applied exactly once;
- Street completion resolves to 2;
- forced-night history count remains one.

### T5 — reload after forced-Night choice

Reload in LodgingResolution after bound-night -1 was queued.

Checks:

- queued delta remains -1;
- bound-night provenance survives;
- choosing Street adds its modifier once;
- next day resolves to 2;
- next-day queue is cleared.

### T6 — reload on D51 morning

After bound + Street:

- reload preserves Energy 2;
- queue remains cleared;
- Activity still costs 2;
- hidden work remains 1 Energy.

### T7 — exact trap activation boundary

Uses valid D19 state:

- acceptedDay = 0;
- trapDay = 10;
- preceding day = 9.

The day-9 Street Night is not retroactively forced.

On Day 10:

- Secret Debt activates;
- Street alone leaves 2 Energy;
- trap-activation event appears;
- no forced-night history exists for the preceding Night.

### T8 — second Street morning after activation

After trap activation is resolved:

- next bound Night is forced;
- voluntary Night suppression remains;
- Street + forced-night pair resolves to 2.

### T9 — Meta +1 diagnostic

Base Energy 4 + D51 pair -> 2.

D51 does not create a free Energy grant above the locked pair result.

Activity still spends exactly 2.

### T10 — route exit

After explicit full repayment before Night:

- Secret Debt is no longer bound;
- no forced Night occurs;
- Street alone leaves 2;
- Activity succeeds.

### T11 — unrelated third penalty

Bound + Street + forced Night + unrelated -1:

- D51 pair is floored to 2;
- unrelated -1 applies afterward;
- final Energy = 1;
- Activity is correctly unavailable;
- 1-Energy hidden work remains executable.

This is the regression that proves there is no global Energy floor of 2.

## Preserved locks

Frozen-base blob comparison confirms no changes to:

- `src/core/secretDebt.ts`;
- `src/core/schema.ts`;
- `content/definitions.json`;
- `content/packs/secret-debt.json`.

Therefore v20 does not change:

- D44 hidden-work wage formula;
- D44 thresholds;
- hidden-work 1-Energy cost;
- Secret Debt principal/grant/timing;
- forced Night frequency;
- voluntary Night suppression;
- lodging prices;
- Street Grooming consequence;
- Activity entry cost;
- Activity region content;
- Palace;
- Strong Meta;
- save schema.

## Save/reload semantics

Both provenance tags live inside the existing persisted:

`run.dayState.nextDayModifiers.tags`

The existing next-day queue is cleared only after StartDay finalization.

Therefore the D51 compatibility decision is stable across reload while the Night is in progress.

No additional persistent state, migration, or schema version was added.

## Static verification

Final pre-handoff structural audit:

**26 / 26 PASS**

Covered:

- explicit Street provenance tag;
- bound-night provenance tag;
- exact compatibility floor = 2;
- exact locked pair delta = -2;
- unrelated delta applied after compatibility;
- existing minimum Energy floor remains 1;
- Street provenance is gated to Street + authored -1;
- all T1-T11 test cases are present;
- exact 10-day trap boundary is modeled;
- third independent penalty resolves to 1;
- old v12 Street expectation is updated;
- frozen Secret Debt runtime/schema/content blobs remain identical to producer v12.

A direct formula audit also passed all accepted D51 numerical examples.

## Validation limits

Per task instruction, **full CI was not run**.

No automatic workflow run was triggered for the implementation commit.

The focused executable test suite has been authored for Chat 2 / assembly execution:

- `tests/secret-debt-activity-energy-compat-v20.test.ts`;
- existing `tests/secret-debt-full-route-v12.test.ts` regression updated.

Chat 2 should run the focused Secret Debt / Night / Activity gate during assembly, then normal assembly QA as appropriate.

## Assembly note

The v20 branch is based directly on the frozen Secret Debt v12 producer plus the Chat 3 task-pointer assignment.

The production delta is intentionally limited to:

- one narrow `engine.ts` compatibility seam;
- one old regression expectation update;
- one focused v20 regression file;
- this handoff.

No merge to `main` was performed.

## Disposition

**READY_FOR_CHAT2_ASSEMBLY**
