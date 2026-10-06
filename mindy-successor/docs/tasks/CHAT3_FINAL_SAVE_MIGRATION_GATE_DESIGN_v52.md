# Chat 3 — Final Save / Migration Gate Design v52

Status: **EXECUTABLE CONTRACT COMPLETE — FINAL GREEN DEFERRED UNTIL FULL ASSEMBLY**  
Owner: Chat 3  
Branch: `chat3/final-save-migration-gate-prep-v51`

Target future suite:

`tests/final-save-migration-closure-v21.test.ts`

Reusable test-only helper authored on this branch:

`tests/final-save-migration-closure-v21.helpers.ts`

No production runtime/content was changed.

---

# 1. Implementation rules

The final suite must run only after all release tranches are assembled into one schema/catalog.

It must not:

- skip unavailable systems;
- silently downgrade a FUTURE case;
- auto-repair fixtures in a way production does not;
- create “historical” fixtures by stripping arbitrary fields from the final schema;
- treat localization/presentation differences as save mechanics;
- change product behavior to make a fixture pass.

Each top-level closure case is one Node test with nested table loops/checkpoints where useful.

Use stable IDs and typed save fields, never localized labels.

---

# 2. Fixture construction doctrine

Use one of four fixture sources.

## A. Genuine historical raw

For schema1/2/3 and preserved historical envelopes.

Rule:

the raw object must reflect a real historical shape.

## B. Producer-authority raw

For Camp, Secret Debt, Palace, D46/D47 and lumber retirement.

Rule:

copy/centralize the exact fixture construction from the accepted producer test after that producer has been assembled.

Do not translate it into a guessed equivalent.

## C. Current runtime checkpoint

For NightFlow, ordinary Activity, RunResult, Strong Meta snapshot and package-selection boundaries.

Rule:

reach the checkpoint through normal dispatch where practical, serialize, reload, continue.

## D. Deliberately invalid raw

For rejection assertions.

Rule:

start from a valid compatible envelope, mutate exactly one compatibility invariant, and assert a specific failure class/message.

Do not combine multiple invalid mutations in one rejection case.

---

# 3. Shared helpers

Use:

`final-save-migration-closure-v21.helpers.ts`

for:

- `jsonClone`
- `cloneAndMutate`
- `assertJsonEqual`
- `assertParseTwiceIdempotent`
- `assertExactlyOnce`
- `assertAbsent`
- `protectedRunSnapshot`
- `transactionSnapshot`
- `assertStableTransaction`
- `assertStableRunSnapshot`

The helper is intentionally schema-agnostic and imports no production code.

---

# 4. Exact top-level test names

The future file must use these exact names.

1. `case 01: schema ladder reaches one final schema and parse twice is idempotent`
2. `case 02: legacy ended run receives exactly one RunResult transaction`
3. `case 03: Strong Meta migration and protected profile merge never rewrite the current run`
4. `case 04: D40 selected-route repair is conservative and idempotent`
5. `case 05: D41 completed legacy Tavern migration canonicalizes once and Specialist ownership dedupes`
6. `case 06: retired lumber-stay vitality migration preserves history without creating a modern ending`
7. `case 07: NightFlow atomic reload matrix is exactly once at every phase`
8. `case 08: pre-Secret-Debt saves default unseen and typed Secret Debt states roundtrip exactly`
9. `case 09: Secret Debt lender acceptance and ten-day trap cannot replay or backdate forced Night`
10. `case 10: Secret Debt forced Night and D51 provenance queue are reload-safe`
11. `case 11: D51 compatibility is provenance-gated and never a global Energy floor`
12. `case 12: Secret Debt hidden-work repay Takeover and ending ledger never replay`
13. `case 13: old Palace access without Rich6 ledger gets neutral progression while access is preserved`
14. `case 14: ambiguous Palace progression-complete without duty proof is never fabricated into fifteen duties`
15. `case 15: Prince confrontation resumes exact authored phase and Return Home remains explicit`
16. `case 16: Activity entry route checkpoint and RNG reload do not recharge or reinterpret the envelope`
17. `case 17: legacy Activity Field Time and mini-game state migrate conservatively`
18. `case 18: old active Activity gets only the exact neutral Camp default and partial Camp state rejects`
19. `case 19: Camp atomic boundary reload matrix preserves two-night cap and exactly-once calendar and Field Time`
20. `case 20: Camp cannot suppress Secret Debt forced Night or lose the next-day Debt consequence`
21. `case 21: D38 Activity ending eligibility stays non-terminal and canonical Specialist reward ownership applies once`
22. `case 22: D46 existing Lust and D47 package snapshot preserve old lives and apply new packages once`
23. `case 23: D23 package identity and content-presentation-only tranches are save-neutral`

---

# 5. Case contracts

## Case 01 — schema ladder

Fixture rows:

- genuine schema1;
- genuine schema2;
- schema3 via existing `rawV3`;
- schema4 via existing schema4 helpers;
- schema5 incomplete creation;
- schema5 completed creation;
- pre-late-tranche schema6.

For each supported fixture:

1. `parseSave(raw)`;
2. assert one final public schema version;
3. capture pending identity, RNG, journal and transaction state;
4. serialize;
5. parse again;
6. deep-equal semantic save;
7. assert late fields default deterministically.

Rejection row:

unsupported/ambiguous historical date or version must reject rather than wrap/reinterpret.

If final public schema is incremented above 6, fixtures must traverse that real migration step. Do not hard-code 6 in the final test until Chat 2 freezes release schema.

## Case 02 — legacy RunResult

Start from old ended+committed save with no modern result/proof.

Checkpoint A:

before first load.

Checkpoint B:

after first load.

Assert:

- deterministic `resultId`;
- deterministic `transactionId`;
- result ending stable;
- transaction appears exactly once;
- no reward replay.

Checkpoint C:

second load.

Use `assertStableTransaction(B,C)`.

## Case 03 — Strong Meta separation

Rows:

- schema5 incomplete creation;
- schema5 completed creation;
- imported older Meta plus richer current profile Meta.

Assert permanent layer:

- ownership unions only permanent accepted ownership;
- inherited knowledge unions;
- current profile preference wins.

Assert run-local layer:

- incomplete creation remains no snapshot;
- completed schema5 gets compatibility snapshot;
- import does not rebuild `run.strongMetaSnapshot`;
- import does not rewrite `run.strongMetaRuntime`.

Capture `protectedRunSnapshot` before protected profile merge and compare after.

## Case 04 — D40 conservative repair

Table:

- each unambiguous route-specific legacy stage;
- generic outcome-ready with readiness facts only;
- already-selected route fact;
- overlapping selected facts.

Assert:

- exact one-to-one stage may add exactly its one matching selected fact;
- generic readiness adds none;
- existing selected facts are never erased;
- parse twice does not add a second/different selected fact.

## Case 05 — D41 Tavern

Rows:

- completed `tavern-stay`;
- completed `tavern-guild`;
- completed `tavern-court`;
- eligible-only retired ID;
- committed-but-unfinished retired ID;
- completed legacy result with old unlock evidence;
- protected profile merge.

Assert canonical mappings:

- stay -> `ending.tavern.innkeeper`;
- guild -> `ending.tavern.sanctuary`;
- court -> `ending.tavern.information-broker`.

Incomplete state:

- eligible retired ID removed;
- committed unfinished resets to active/no completion.

Ownership:

canonical Specialist IDs granted at most once through Strong Meta migration signal.

Parse twice + profile merge must dedupe.

## Case 06 — lumber-stay retirement

Rows from v17 producer:

- eligible-only;
- committed unfinished;
- historical completed with RunResult;
- historical completed pre-RunResult;
- vitality-only evidence;
- both completion + vitality;
- no evidence;
- protected profile merge.

Assert:

- no live `lumber-stay`;
- no replacement modern ordinary ending fabricated;
- existing result/tx preserved;
- pre-RunResult completion gets deterministic compatibility proof;
- no reward replay;
- `legacy.lumber-stay.vitality` count <=1;
- legacy +1 daily Energy behavior remains exactly once;
- no Keystone/Specialist/Hard Work conversion.

## Case 07 — NightFlow matrix

Reach and serialize at:

1. before lodging;
2. after lodging payment;
3. pending forced event;
4. after voluntary choice;
5. queued next-day modifier;
6. after calendar commit/start-day completion.

For each:

- reload;
- continue once;
- compare to uninterrupted control.

Assert:

- lodging charge once;
- RNG/pending variant unchanged;
- next-day effect once;
- calendar +1 once;
- handled event IDs persist;
- selected choice persists;
- no second forced resolution.

## Case 08 — Secret Debt typed roundtrip

Rows:

- schema6 historical save with Secret Debt carrier absent;
- unseen;
- refused;
- accepted;
- bound;
- paid-freedom;
- takeover.

Absent carrier:

must migrate to exact neutral `unseen`.

Typed carrier:

parse/serialize/parse exact.

Negative assertions:

do not infer status from:

- generic debt;
- Street housing;
- money;
- Lust;
- text/history labels.

## Case 09 — lender / trap

Checkpoints:

- before lender roll;
- pending lender encounter;
- immediately after accept;
- day 9 before Night;
- exact day 10 activation boundary;
- immediately after activation.

At every checkpoint compare reloaded and uninterrupted control.

Assert:

- deterministic lender attempt not rerolled;
- +2000 once;
- `trapDay = acceptedDay + 10`;
- bound activation once;
- debt exactly 20000;
- preceding Night does not receive retroactive bound penalty.

## Case 10 — forced Night + D51 queue

Rows:

- bound + normal lodging context;
- bound + cheap;
- bound + Street;
- reload before forced choice;
- reload after forced choice/queued tags;
- reload before start-day processing.

Assert:

- forced before-lodging Secret Debt Night has absolute priority;
- D42/voluntary Night does not run;
- provenance tags persist exactly;
- tags clear once after processing;
- calendar advances once.

## Case 11 — D51 provenance

Table:

- base Energy3 + both tags;
- base Energy4 + both tags;
- Street only;
- bound only;
- both + unrelated third -1;
- housing Street with no provenance tag.

Assert locked pair semantics from D51 producer.

Critical assertion:

unrelated third modifier may reduce below 2.

No global `Math.max(2,...)` behavior.

## Case 12 — Secret Debt transaction ledger

Checkpoints:

- hidden shift 49 -> 50;
- hidden shift 74 -> 75;
- immediately after full 20000 repay;
- immediately after Takeover;
- each Secret Debt ending committed;
- each Secret Debt ending completed;
- second reload/profile merge.

Assert:

- one hidden shift/wage increment;
- one full repayment;
- one Takeover transition;
- completion reward only on completion transaction;
- transaction ID stable;
- canonical Strong Meta reward owned once;
- no duplicate generic unlock ownership.

## Case 13 — Palace access neutral ledger

Raw historical row:

- `palace.access-granted` present;
- no `run.progression.palace`;
- optionally obsolete generic meta unlock `palace`.

After load:

- access fact preserved;
- generic unlock removed;
- exact neutral Palace ledger exists;
- duty count/stage not inferred;
- no Prince defeat/outcome readiness invented.

Second load identical.

## Case 14 — ambiguous Palace complete

Raw:

- `palace.progression-complete`;
- no exact committed-duty proof.

The final release runtime must choose one approved contract:

A. one documented historical mapping; or  
B. explicit compatibility rejection.

The test must encode only the final approved contract.

Forbidden assertion:

“load succeeds with 15 synthesized duties”.

If the assembled runtime neither maps explicitly nor rejects, stop release.

## Case 15 — Prince phases / Return Home

Rows:

- 12x91 ready, undefeated;
- pending phase1;
- pending phase2;
- pending phase3;
- pending phase4;
- back-out/failure;
- immediately post-success;
- Return Home eligible but uncommitted;
- committed;
- completed.

Assert:

- readiness != defeat;
- pending event/choice snapshot resumes exactly;
- back-out no success fact;
- `palace.prince-defeated` once;
- Return Home never auto-commits;
- completion transaction exactly once.

## Case 16 — ordinary Activity envelope

Checkpoints:

- immediately after 2-Energy entry;
- after route selection;
- after one option;
- before success/result;
- before escape.

Reload and compare uninterrupted control.

Assert:

- no Energy refund/recharge;
- route preserved;
- resolved option IDs preserved;
- checkpoint preserved;
- internal/global RNG preserved;
- result effects not replayed.

Invalid rows:

- wrong `definitionVersion`;
- wrong `adapter`.

Both must reject.

## Case 17 — Activity historical migration

Historical raw:

real pre-Field-Time envelope with missing:

- `fieldTimeRemaining`;
- `miniGames`.

Assert only historically approved fallback/defaults.

Modern row:

non-zero mini-game suspicion/status/choiceIds.

Assert exact roundtrip.

No result/progression transition may be replayed by migration.

## Case 18 — Camp default / reject

Rows:

A. true old active envelope with both Camp fields absent;  
B. only `campStateVersion` absent;  
C. only `campState` absent;  
D. invalid phase/commit combination.

A:

gets exact neutral Camp state.

B/C/D:

reject with explicit compatibility failure.

Do not infer Camp from day, checkpoint or Field Time.

## Case 19 — Camp atomic boundary

Serialize at:

- before Camp choice;
- phase `chosen`;
- phase `calendar_advanced`;
- phase `field_day_ready`;
- after first Camp;
- after second Camp;
- attempted third.

Compare uninterrupted/reloaded control.

Assert:

- no city lodging;
- no ordinary city Night;
- calendar +1 once per Camp;
- Field Time refresh once;
- daily Energy not globally refreshed;
- `nightsUsed` persists;
- third rejects.

## Case 20 — Camp vs Secret Debt

Fixture:

bound Activity at Camp boundary.

Rows:

- non-Street;
- Street;
- reload before interception;
- reload after forced Night selection;
- reload before D51 start-day processing.

Assert:

- Secret Debt forced Night preempts Camp before Camp calendar commit;
- Activity continuation terminates under accepted D36 behavior;
- Camp does not also advance calendar/refresh Field Time;
- bound next-day tag survives;
- D51 owns next-day pair once.

## Case 21 — D38 endings

For each:

- Pathfinder;
- Preservation;
- Network.

Checkpoints:

- eligibility reached;
- explicit ending commit;
- completion;
- second load;
- protected profile merge.

Assert:

- eligibility non-terminal;
- ending ID stable;
- commit does not grant reward;
- completion grants canonical Strong Meta Specialist once;
- no duplicate generic unlock;
- transaction stable;
- profile merge dedupes.

## Case 22 — D46 + D47

Rows:

- legacy stored Lust1;
- typed stored Lust17;
- fresh post-D46 life;
- migrated already-complete pre-D47 life;
- pre-finish selected arbitrary package subset;
- post-finish same subset;
- Prostitute package.

Assert:

- old Lust unchanged;
- fresh Lust exactly5;
- no retroactive D47 on old completed life;
- selected identities survive reload;
- package applies once at finish creation;
- Prostitute package is one identity despite Sexuality+5 / Charm+5 / Lust+5;
- reload after finish does not add another +5.

## Case 23 — D23 + save-neutral content

Start:

future New Start+ with all ten active ordinary packages and a representative pending/RNG/current-run snapshot.

Serialize once.

Load against final catalog containing:

- D38 v17 content/presentation;
- Palace v19;
- localization closure;
- global presentation;
- later accepted media overlays.

Assert mechanics unchanged:

- Save fields;
- RNG;
- pending mechanical identity;
- rewards;
- transaction state;
- D23 package identity count = 10;
- Strong Meta slots separate from packages.

Only approved content-reference validation/presentation lookup may differ.

---

# 6. Exactly-once assertion pattern

For any atomic boundary:

1. build `before`;
2. serialize `before`;
3. execute once -> `after`;
4. serialize/reload `after`;
5. repeat the same dispatch/load path where legal;
6. assert no second payment/reward/calendar increment;
7. assert stable transaction/proof identity.

Never “compensate” after double application.

The test must fail at the first duplicated side effect.

---

# 7. Migration rejection pattern

For incompatible states, assert both:

1. load rejects with the intended compatibility class/message;
2. original raw fixture remains unchanged by test code.

Required explicit reject families:

- unsupported schema/version;
- Activity definition mismatch;
- Activity adapter mismatch;
- partial Camp state;
- impossible Camp phase/commit state;
- ambiguous Palace complete-without-ledger unless an approved mapping exists;
- invalid Strong Meta snapshot/runtime pairing;
- invalid pending/reference identity on final catalog.

Do not turn rejects into neutral defaults unless an authority explicitly allows it.

---

# 8. RunResult / transaction assertions

For every completed ending migration/reload:

compare:

- `run.endings.result.resultId`
- `endingId`
- `transactionId`
- `completedAtDay`
- `firstCompletion`
- `appliedMetaRewardIds`
- `meta.appliedResultTransactions`
- `meta.completedEndings`

Rules:

- transaction IDs stable;
- a transaction appears exactly once;
- reward list cannot grow on reload;
- old compatibility proof cannot replay modern reward;
- canonicalized ending ID changes only under approved migration rule.

---

# 9. Strong Meta separation assertions

Always test three layers independently.

## Permanent profile

`meta.strongMeta`

May union approved permanent ownership/knowledge under protected merge.

## Current-run snapshot

`run.strongMetaSnapshot`

Immutable once creation completes.

Must never be rebuilt from a newer imported profile on load.

## Current-run runtime counters

`run.strongMetaRuntime`

Must remain tied to the resolved snapshot.

No counters may appear for an unresolved reward.

## Hard Work packages

`run.character.creation.activeHardWorkPackages`

remain separate from Strong Meta selection/capacity.

## Lumber historical perk

`legacy.lumber-stay.vitality`

is also separate and slot-free.

---

# 10. Why the final suite is not authored yet

Creating `tests/final-save-migration-closure-v21.test.ts` now would force one of two bad outcomes:

- compile-time references to not-yet-assembled fields/modules; or
- synthetic mocks that do not prove the final schema/catalog composition.

The correct sequencing is:

1. preserve this exact contract;
2. assemble release tranches;
3. freeze the final schema/catalog;
4. materialize the 23-case suite using the authoritative fixtures;
5. run focused gate;
6. only then run release full CI.

No claim of final green is made by v52.

---

# v52 disposition

Reusable test-only helper: **AUTHORED**.

Exact 23-test implementation contract: **COMPLETE**.

Final executable suite: **INTENTIONALLY DEFERRED TO FULLY ASSEMBLED RELEASE TARGET**.

**v52 COMPLETE — CONTINUE TO v53**
