# Chat 4 — Secret Debt + D51 Save / Reload Matrix v27

Status: **READY_FOR_CHAT2_PREFLIGHT**  
Owner: Chat 4  
Branch: `chat4/secret-debt-d51-final-assembly-packet-v26`

This matrix is the required save/reload contract for the final Secret Debt v12 + D51 assembly.

Authorities:

- Secret Debt v12: `10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`
- D51 v20: `79a868bf30af2c162b2ea1323759dffad5e8dadf`
- ending localization v27: `b6cc4ca6990936f4d801004806b25e4d920f9abf`
- canonical current schema: **6**
- canonical current Strong Meta / RunResult transaction ledger
- current D42 NightFlow remains authoritative.

No production runtime change is made by this document.  
No full CI.

---

# 1. Global reload invariants

Every row below must preserve these invariants.

1. Reload is deterministic: same serialized state -> same route/runtime state.
2. No RNG reroll for an already-materialized pending scene.
3. No money effect replays.
4. No queued next-day modifier replays.
5. No calendar replay.
6. No hidden-work shift replay.
7. No route-exit action replay.
8. No ending reward replay.
9. Current Strong Meta run snapshot is never rewritten by profile changes during reload.
10. D42 voluntary Night remains unavailable whenever Secret Debt forced Night owns the Night.
11. Missing Secret Debt state on a legitimate old schema6 save means neutral `unseen`, never inferred history.
12. D51 is provenance-driven; it is never reconstructed from housing or bound status alone.

---

# 2. Canonical neutral state

The only valid default for a save that predates Secret Debt runtime is:

```text
run.secretDebt = {
  status: 'unseen',
  acceptedDay: null,
  trapDay: null,
  boundDay: null,
  resolvedDay: null,
  debt: 0,
  hiddenShifts: 0,
  grantApplied: false,
  lastLenderAttemptDay: null
}
```

Reload may populate this default during parsing, but must not fabricate:

- acceptance;
- refusal;
- debt;
- hidden shifts;
- lender attempt history;
- trap timing;
- bound history.

---

# 3. Concrete matrix

| ID | Save point | Pre-reload persisted facts | After reload / next action | Required exactly-once proof |
| --- | --- | --- | --- | --- |
| M01 | pre-Secret-Debt schema6 save | no `run.secretDebt`; valid Strong Meta/D40/D41/D42 data | parse inserts neutral `unseen` state | all unrelated run/meta state byte/semantic-equivalent; no inferred route |
| M02 | unseen eligible Street Night before lender materializes | Street lodging resolved; status `unseen`; lender attempt for day not yet committed | resolver may perform the one fixed-20% attempt | reload cannot create multiple attempts for same eligible day |
| M03 | lender pending scene | pending event/variant/allowed choices serialized; RNG already resolved; `lastLenderAttemptDay` set | same lender scene survives reload | no reroll; no second attempt |
| M04 | after explicit lender acceptance | status `accepted`; `acceptedDay=d`; `trapDay=d+10`; `grantApplied=true`; money includes +2000 | reload preserves exact accepted state | +2000 remains exactly once |
| M05 | day before trap | accepted state; current day < trapDay | reload remains accepted | no early activation; no forced bound Night |
| M06 | immediately after calendar reaches trap day, before/while trap scene is pending | status has transitioned to `bound`; `boundDay=trapDay`; debt=20000; trap scene pending/eligible | reload resumes same trap activation boundary | debt activation once; no retroactive prior-Night bound tag |
| M07 | settled bound daytime state | status `bound`; debt 20000; no transient pending scene | reload preserves state exactly | no re-activation or second 20000 mutation |
| M08 | bound Night before forced choice resolves | `flow.night` active; pending event `secret-debt.forced-night`; no bound modifier yet | same forced event remains pending | no D42 voluntary choice exposed; no duplicate pending event |
| M09 | after forced-Night choice, before lodging completion | nextDay energyDelta includes exactly -1; tag contains `secret-debt.bound-night` once | reload continues NightFlow from same phase | bound -1 not applied twice |
| M10 | after normal/cheap lodging on bound Night, before StartDay | bound tag once; no Street tag; queued delta reflects only authored bound + any unrelated modifiers | reload preserves queue | ordinary bound path, no D51 pair inference |
| M11 | after Street lodging on bound Night, before StartDay | bound tag once; Street tag once; locked pair contributes -2; Street Grooming -1 already authored once | reload preserves both provenance tags and stat consequence | no duplicate bound/Street modifier; no lost Grooming consequence |
| M12 | D51 morning, effective base 3 | persisted pair provenance consumed at StartDay | final Energy=2; queue cleared | second reload leaves Energy 2 and empty queue |
| M13 | D51 morning, effective base 4 | current Strong Meta/effective base=4 plus pair | final Energy=2 | D51 is not a +1 grant; pair semantics unchanged |
| M14 | D51 pair plus unrelated -1 | pair tags + total queued Energy delta includes third independent -1 | pair floors to 2, then unrelated -1 -> final Energy=1 | reload preserves 1; proves no global floor 2 |
| M15 | Street-only morning after route exit or before bound | Street tag only; no bound tag | ordinary Energy math, typically base3 ->2 | D51 pair path must not activate from Street housing alone |
| M16 | after one hidden work action | hiddenShifts incremented once; wage added once; Energy spent once; stat/seasonal effects applied once | reload preserves exact counters/money/stats | repeating reload does not re-run shift |
| M17 | 49 hidden shifts | status bound; hiddenShifts=49 | reload -> Bound Life ineligible | no inferred 50th shift |
| M18 | exactly 50 hidden shifts | status bound; hiddenShifts=50 | reload -> Bound Life eligible, run still active | eligibility only; no auto-commit/complete/reward |
| M19 | Takeover threshold one-below fixtures | each fixture fails one threshold independently | reload remains ineligible for explicit takeover action | no threshold drift from migration/reload |
| M20 | exact Takeover thresholds before action | bound; 75 shifts; Endurance75; Sexuality75; Wits35; Lust30; paid lessons10 | reload leaves action available but route still bound | no automatic takeover |
| M21 | immediately after explicit Takeover action | status `takeover`; resolvedDay set; debt route exited; ending eligible | reload preserves takeover state | action effect once; no ending auto-commit |
| M22 | immediately after explicit full repayment | money reduced by exactly 20000 once; status `paid-freedom`; route exited; ending eligible | reload preserves exact money/status | no second payment; no forced Night after exit |
| M23 | ending committed but not completed | `status='ending_committed'`; committed Secret Debt ending ID; no RunResult yet; no new Strong Meta ownership yet | reload resumes committed ending | commit does not grant reward |
| M24 | ending completed | RunResult has stable transactionId; meta contains completed ending, applied transaction proof, canonical Strong Meta reward | reload stays ended | reward/transaction/complete count cannot replay |
| M25 | repeated parse/reload of completed ending | same M24 payload | parse twice produces same ownership/transaction state | idempotent completion evidence |
| M26 | future-life Strong Meta selection after Secret Debt reward | permanent ownership contains earned Keystone; current/new-life selection snapshot resolved according to normal creation rules | reload preserves selected current-run snapshot/runtime | historical reward ownership must not rewrite an already-frozen prior run |
| M27 | bound player with Network Retainer selected in current run, trap activates this morning | pre-start state was accepted; post-calendar trap makes live bound=true | Strong Meta start-day receives live bound=true | no Network Retainer payment on first bound morning |
| M28 | D42 private/voluntary Night would otherwise be available while bound | bound state + eligible relationship/career facts | forced Secret Debt Night remains owner | no D42 success fact/counter, no private branch execution |

---

# 4. Detailed acceptance by route stage

## Unseen

Allowed:

- lender eligibility on Street;
- at most one attempt per eligible day;
- fixed chance remains 20%.

Reload rules:

- a pending lender scene preserves the resolved event/variant;
- do not reroll after reload;
- `lastLenderAttemptDay` prevents second same-day attempt.

No other state may imply that the lender has already been accepted/refused.

## Refused

Persist:

- `status='refused'`;
- lender route remains closed for current life.

Reload must never reset refusal to unseen.

## Accepted

Persist:

- exact `acceptedDay`;
- exact `trapDay=acceptedDay+10`;
- `grantApplied=true`;
- money already includes +2000.

Reload must not:

- grant money again;
- recompute trap day from current day;
- activate before trap day.

## Bound

Persist:

- `status='bound'`;
- exact `boundDay`;
- debt=20000;
- hiddenShifts;
- forced-Night pending state where applicable.

Reload must not infer bound from:

- debt metric;
- housing;
- Prostitute state;
- relationship state;
- Lust.

## Paid Freedom

Persist explicit repayment result.

Reload must not:

- charge another 20000;
- return to bound;
- auto-complete ending.

## Takeover

Persist explicit takeover result.

Reload must not:

- rerun threshold action;
- return to bound;
- auto-complete ending.

---

# 5. Lender and RNG atomicity

The lender encounter has two separate exactly-once boundaries.

## Attempt boundary

The system records the current day as attempted.

Once an event instance is pending, reload must resume the same pending instance.

No reroll.

## Acceptance boundary

Only the explicit accept choice applies +2000 and sets:

- accepted status;
- accepted day;
- trap day;
- grantApplied.

A save after that choice must already contain the grant proof in typed state.

No loader should “repair” +2000 by comparing money balances.

---

# 6. Trap boundary

Accepted example:

- acceptedDay=0
- trapDay=10
- day 9 Night completes
- calendar advances to day 10
- activation occurs
- status becomes bound
- debt becomes 20000
- boundDay=10
- trap `dayStarted` scene may then resolve.

The day-9 Night:

- was not bound;
- must not acquire `secret-debt.bound-night`;
- must not be reinterpreted after reload.

This boundary is mandatory because any backdating corrupts D51 and Night ownership.

---

# 7. Forced Night reload phases

Required NightFlow reload checkpoints:

1. before `secret-debt.forced-night` choice;
2. after forced choice effect queued;
3. before lodging selection/resolution;
4. after Street lodging consequence;
5. before StartDay;
6. after StartDay queue clear.

At all checkpoints:

- one Night owns one calendar advance;
- forced event remains one event history occurrence for that Night;
- bound Energy tag appears at most once;
- Street Energy tag appears at most once;
- D42 voluntary menu remains suppressed until forced Night completes.

---

# 8. D51 provenance reload contract

D51 decision inputs are serialized facts, not reconstruction heuristics.

Required persisted inputs:

- `run.dayState.nextDayModifiers.energyDelta`
- `run.dayState.nextDayModifiers.tags`
- queued stat effects, including Street Grooming -1 where authored.

Tags:

- `secret-debt.bound-night`
- `lodging.street.energy-penalty`

## Both tags

Use D51 pair path.

## One tag only

Use ordinary next-day Energy path.

## Zero tags

Use ordinary path.

Never activate D51 because:

- `housingState.current==='street'`;
- `secretDebt.status==='bound'`;
- both happen to be true now.

The pair must refer to the immediately preceding Night’s authored consequences.

---

# 9. Hidden-shift reload contract

Each explicit hidden-work dispatch atomically owns:

- 1 Energy spend;
- wage computed from pre-shift stats;
- money grant;
- Endurance +1;
- Sexuality +1;
- seasonal negative if any;
- hiddenShifts +1.

A save after dispatch contains the completed shift.

Reload must never re-run these effects.

Required boundary fixtures:

- before shift;
- after shift;
- 49 shifts;
- exact 50;
- 74;
- exact 75.

---

# 10. Repayment reload contract

Repayment action requirements:

- status bound;
- money >= 20000.

The dispatch atomically owns:

- exactly -20000 money;
- route exit to paid-freedom;
- resolved day;
- removal of bound behavior.

After reload:

- ordinary-career rules may resume according to current game state;
- next Night is not a bound forced Night;
- Paid Freedom ending is merely eligible;
- no ending reward yet.

A stale Bound Life eligibility entry may exist transiently in serialized/derived state only if current engine revalidation removes/rejects it before commit. It must never be successfully committed after repayment.

---

# 11. Bound Life reload contract

At 49:

- ineligible.

At exact 50 while still bound:

- eligible.

Reload at exact 50 must not:

- increment to 51;
- commit ending;
- complete ending;
- grant Work Rhythm.

The ending reward is delayed until standard ending completion transaction.

---

# 12. Takeover reload contract

Before action, all thresholds must be present simultaneously.

One-below cases must fail independently:

- shifts 74;
- Endurance 74;
- Sexuality 74;
- Wits 34;
- Lust 29;
- paid lessons 9.

Exact threshold state after reload remains **action-ready**, not automatically takeover-complete.

Only the explicit action moves to takeover route outcome.

Reload after action must preserve status `takeover` and no longer expose bound forced Night.

---

# 13. Ending commit / completion reload contract

This boundary must use the current canonical ending system.

## Commit

Commit:

- stores committed ending;
- moves run to `ending_committed`;
- does not grant Strong Meta;
- does not add result transaction proof.

Reload preserves commit.

## Complete

Completion:

- computes stable RunResult identity;
- checks `meta.appliedResultTransactions`;
- applies first-completion rewards once;
- records completed ending;
- records transaction proof;
- creates RunResult;
- moves run to ended.

Secret Debt reward records must be canonical `kind:'strongMeta'`.

Reload of the result:

- must not grant again;
- must not increment runsCompleted again;
- must not change `appliedMetaRewardIds`;
- must not duplicate owned reward ID.

Repeat for all three endings.

---

# 14. Strong Meta and bound-state reload interaction

A current run has a frozen Strong Meta snapshot/runtime.

Reload must preserve:

- snapshot registryVersion;
- Keystone selection;
- Specialist selections;
- runtime counters.

Secret Debt route changes during the run do not rewrite the snapshot.

## Network Retainer trap-day case

Critical matrix:

1. run snapshot contains Network Retainer;
2. route is accepted before StartDay;
3. calendar advance reaches trap day;
4. activation makes route bound;
5. Strong Meta start-day is called with live bound=true;
6. payment is suppressed;
7. reload cannot later “catch up” that skipped bound payment for the same day.

## Work Rhythm / D51

If effective base is 4 because of Work Rhythm:

- D51 pair still gives 2;
- reload preserves both runtime counter and resolved Energy;
- D51 does not mutate Strong Meta counters.

---

# 15. D42 preservation matrix

For each D42 voluntary Night family that is otherwise eligible:

- set bound Secret Debt;
- enter Night;
- save before forced resolution;
- reload;
- verify pending is `secret-debt.forced-night`;
- resolve Night;
- verify D42 fact/counter was not published;
- verify one calendar advance;
- verify bound Energy provenance remains.

At minimum include:

- one public/workplace D42 surface;
- one normal-housing private surface;
- `prostitute.night.personal-continuation`;
- `prostitute.night.client-private`.

This proves both ordinary Prostitute and private-space rules remain isolated from Secret Debt.

---

# 16. Idempotence assertions

For every serialized fixture used in this matrix:

1. `parseSave(json)` succeeds;
2. serializing and parsing again does not change route meaning;
3. no duplicate tag IDs appear;
4. no duplicate Meta transaction IDs appear;
5. no duplicate Strong Meta owned reward IDs appear;
6. no pending scene rerolls;
7. no calendar day changes merely because of parsing.

For completed Night/action/ending boundaries, execute the next legal command once after reload and prove the effect occurs once.

---

# 17. Mandatory failures / rejection cases

Parser/runtime must reject rather than silently repair contradictory typed state such as:

- bound with impossible/missing required route fields if current validator defines that combination invalid;
- duplicate transaction proof;
- RunResult ending mismatch;
- Strong Meta runtime counters without corresponding resolved reward;
- malformed pending scene/variant;
- duplicate or structurally impossible NightFlow state.

Do not “repair” contradiction by guessing route history.

Neutral defaulting is only for genuinely missing pre-feature state.

---

# 18. Final v27 disposition

The final Secret Debt/D51 save contract is conservative:

- missing old state -> neutral unseen;
- explicit typed state -> preserve exactly;
- pending atomic work -> resume exactly;
- completed atomic work -> never replay;
- D51 -> use persisted provenance;
- ending reward -> transaction once.

This matrix is the required implementation/review companion to v26 and the executable roster in v28.

**READY_FOR_CHAT2_PREFLIGHT**
