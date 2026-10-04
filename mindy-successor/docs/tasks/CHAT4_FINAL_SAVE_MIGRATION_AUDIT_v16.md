# Chat 4 — Final Save / Migration Closure Audit v16

Status: **READY_FOR_LEADER_REVIEW**  
Owner: Chat 4  
Branch: `chat4/final-save-migration-audit-v16`  
Audit base: `main@209e2f6dae5ae3c34c0803410d640b67022cc899`

This is a **research / acceptance-contract audit only**.

No runtime implementation is changed by v16.  
No full CI is requested or run.

The matrix deliberately covers both:
- state already present on the D40 `main` base; and
- frozen / queued 1.0 producers that still need final assembly.

---

# 1. Executive verdict

## Overall

**RISK — one concrete pre-1.0 save-contract blocker remains; all other audited systems have a clear conservative migration contract.**

The blocking gap is:

> **Large Activity multi-day Camp has no persisted runtime state in any of the four current production Activity waves.**

D36 requires:
- explicitly multi-day Activity may camp;
- at most two camp nights;
- camp replaces city Night;
- each camp advances the global calendar exactly once;
- deterministic save/resume at internal checkpoints;
- Secret Debt forced Night retains precedence.

Static audit of all four production Activity waves found no persisted `camp` state in their `schema.ts`, `engine.ts`, or Activity runtime:
- Forest Frontier production hardening v12;
- Trade Corridor production v13;
- Anomalous Reach production v14;
- Restricted Sites production v15.

Therefore the final 1.0 save schema cannot yet represent a player who has crossed a camp boundary or is paused at a multi-day camp checkpoint.

This must be closed before public 1.0.

No evidence from this audit requires reopening D46, Strong Meta, Night, Secret Debt, Palace, D40/D41 route semantics, or D47 mapping.

---

# 2. Migration doctrine for 1.0

The final assembly should obey five rules.

1. **Prefer neutral defaults over inferred progress.**  
   A field absent because an older save predates a subsystem means “not started / unused / unseen” unless there is an exact historical carrier.

2. **Never infer player choice from readiness.**  
   A route-ready fact, high stat, generic `outcome-ready` stage, Palace readiness, or ending eligibility is not evidence that the player selected or completed a route.

3. **Preserve committed state exactly once.**  
   Money payments, Energy spends, calendar advances, ending transactions, duty counts, Night payments, Activity entry costs and Meta package application may never replay after reload.

4. **Current-run snapshots beat future catalog/profile changes.**  
   Strong Meta loadout and D47 Hard Work package selection are run-local commitments. Updating profile ownership or catalog definitions must not rewrite an in-progress life.

5. **Reject ambiguous incompatible active state instead of fabricating it.**  
   If an old active envelope cannot be mapped losslessly to the current definition/version, fail migration with a specific compatibility error rather than silently choosing a route, mini-game result, ending or Palace milestone.

---

# 3. Schema evolution baseline

Current D40 `main` target schema is **schemaVersion 6**.

Current migration chain in `parseSave`:

| Input | Current migration |
| --- | --- |
| schema 1 | adds action-count compatibility, becomes schema 2 |
| schema 2 | legacy Lust = 1, recalculates remaining daily Energy, settles creation as complete, installs RNG / arrival compatibility, becomes schema 3 |
| schema 3 | conservative typed migration through `migrateV3`, becomes schema 4 |
| schema 4 | adds result-transaction/journal compatibility, cap=100, settles legacy Hard Work package state, becomes schema 5 |
| schema 5 | installs empty Strong Meta ownership/runtime and a compatibility snapshot for completed creation, becomes schema 6 |
| schema 6 | validate + conservative repair only |

Important current behavior:

- schema-3 migration maps only unambiguous legacy story flags to typed world facts;
- domain-specific legacy flags stay quarantined in `legacyCompat`;
- schema 4 -> 5 sets
  `activeHardWorkPackages=[]` and `hardWorkPackagesApplied=true`;
- schema 5 -> 6 never invents Strong Meta ownership;
- an already-complete schema-5 creation receives an empty `legacy-v5` run snapshot;
- an incomplete schema-5 creation receives `strongMetaSnapshot=null`.

## 3.1 Final-assembly version rule

Several queued systems add new typed state to branches built from different historical schema versions.

Before 1.0 assembly, Chat 2 / Lead must choose one final save-schema epoch and test every old-shape fixture against it.

It is acceptable during pre-1.0 development to add purely neutral Zod defaults to the current internal schema, but the public 1.0 boundary must not depend on “whatever branch version happened to win”.

**Required release property:** one deterministic migration path from every supported pre-1.0 save fixture to one final schema.

After public 1.0, any incompatible shape change must use an explicit later schema version rather than mutating the meaning of schema 6 in place.

---

# 4. Final migration acceptance matrix

## 4.1 Core schema / result transaction ledger

**Old-save input shape**

- schema 1–5 saves;
- schema-4 ended run may have `endings.committed` but no `RunResult`;
- journal may exist without `journalRefs`;
- old profile may lack `appliedResultTransactions`.

**Required migrated/default state**

- one canonical current schema;
- journal refs length exactly equals journal length;
- ended + committed legacy run receives one deterministic RunResult and one transaction proof;
- active/expired runs do not receive a committed result;
- duplicate transaction IDs are rejected.

**Idempotence**

`parse -> serialize -> parse` must produce the same:
- run status;
- committed ending;
- RunResult identity;
- applied reward IDs;
- transaction ledger.

**Forbidden inference**

Do not infer:
- an ending from mere eligibility;
- first-completion status from an old profile when proof is unavailable;
- additional Meta rewards beyond the exact historical ending contract.

**Save/reload checkpoint**

- immediately after `commitEnding`;
- immediately after `completeEnding`;
- old ended save missing RunResult.

**Exact regression required**

`final-save-migration-v16.test.ts`:
> “schema4 ended+committed migration creates exactly one deterministic RunResult and transaction proof; a second parse changes nothing.”

---

## 4.2 Strong Meta schema6 / current-run snapshot

**Old-save input shape**

Schema 5 save with no:
- `meta.strongMeta`;
- `run.strongMetaSnapshot`;
- `run.strongMetaRuntime`.

Two cases:
1. creation incomplete;
2. creation already complete.

**Required migrated/default state**

Incomplete creation:
- `meta.strongMeta = emptyStrongMetaState()`;
- `run.strongMetaSnapshot = null`;
- `run.strongMetaRuntime = emptyStrongMetaRuntime()`.

Completed creation:
- same empty ownership/runtime;
- run snapshot exists;
- `registryVersion='legacy-v5'`;
- `resolvedRewards=[]`.

**Idempotence**

Repeated parse must preserve:
- exact run snapshot;
- Work Rhythm counters/days;
- Reserve Match paid amount;
- Network Retainer processed days/total.

Changing current profile preference or catalog after run start must not rewrite `run.strongMetaSnapshot`.

**Forbidden inference**

Never infer Strong Meta ownership or active rewards from:
- old `meta.unlocks`;
- `ruleModifiers`;
- `activeLegacyPerks`;
- cap=200-looking stats;
- Secret Debt ending-like unlock names;
- Palace access;
- completed ordinary Hard Work.

**Save/reload checkpoint**

- after creation resolves one Keystone + Specialists;
- after Reserve Match partially pays;
- after Work Rhythm is armed but before next day;
- on the Work Rhythm bonus day;
- after a Network Retainer day.

**Exact regression required**

Existing coverage is strong, but final gate must include one cross-version test:

> “schema5 completed run receives empty legacy-v5 snapshot; merge with a newer currentMeta owning/selecting different rewards does not mutate the migrated run snapshot.”

---

## 4.3 D40 selected-route facts

D40 current endings require:
- career stage `outcome-ready`;
- one exact `ending-route-*-selected` fact.

Current loader repair is intentionally narrow: it adds a selected fact only when the legacy career stage itself names one unambiguous route.

Examples:
- Guard `officer` -> `ending-route-officer-selected`;
- Merchant `merchant-house` -> exact Merchant House selected fact;
- Assassin `handler-takeover` -> exact handler selected fact.

**Old-save input shape**

A late-career state may contain:
- a route-specific legacy stage;
- generic `outcome-ready`;
- one or more old route-ready facts;
- no selected-route fact.

**Required migrated/default state**

If the current stage is a one-to-one historical route carrier:
- add exactly its matching selected-route fact once.

If stage is generic `outcome-ready`:
- preserve it;
- preserve existing selected facts if already present;
- add **no new selected fact**.

**Idempotence**

Repair called repeatedly:
- never duplicates facts;
- never changes one selected route into another;
- never removes legitimate overlapping selected facts.

**Forbidden inference**

Never choose a route from:
- generic `outcome-ready`;
- `*-route-ready` facts;
- ending eligibility list;
- highest stat;
- route-specific items;
- completed School/Activity prerequisites.

D16 permits overlapping selected facts; migration must preserve them rather than “pick one”.

**Save/reload checkpoint**

- legacy route-specific stage before the transition to outcome-ready;
- generic outcome-ready with zero selected facts;
- generic outcome-ready with two selected facts.

**Exact regression required**

One table-driven test over all five D40 careers:

> “route-specific historical stage repairs exactly one selected fact; ambiguous outcome-ready with only readiness facts repairs none; overlapping selected facts survive two parses unchanged.”

---

## 4.4 D41 legacy endings and route state

Frozen D41 canonical legacy Tavern mapping:

- `tavern-stay` -> `ending.tavern.innkeeper`;
- `tavern-guild` -> `ending.tavern.sanctuary`;
- `tavern-court` -> `ending.tavern.information-broker`.

Retired broad unlocks:
- `host`;
- `mediator`;
- `court`;
- `satyr-maid.house-credit`.

**Old-save input shape**

May contain:
- completed legacy Tavern ending;
- uncompleted `endings.eligible` with legacy Tavern ID;
- `ending_committed` with retired ID but no completed historical result;
- old retired unlocks.

**Required migrated/default state**

Completed historical result:
- canonicalize committed/result/completed ID;
- grant only current automatic knowledge reward where applicable;
- retire old broad unlocks.

Uncompleted eligibility:
- remove retired legacy ending ID.

Uncompleted committed legacy ending:
- clear commit/result;
- reopen to `active`.

Specialist migration:
- exact pending Specialist IDs are emitted through the single Strong Meta ownership seam;
- ownership API dedupes exactly once.

**Idempotence**

Running D41 profile migration twice produces identical:
- completed endings;
- unlocks;
- pending Specialist ownership set.

**Forbidden inference**

Never:
- turn uncompleted eligibility into a completed modern ending;
- turn an old incomplete commit into completion;
- infer a D41 route from a generic career stage;
- restore retired +600 House Credit behavior;
- substitute a generic unlock for exact Specialist ownership.

**Save/reload checkpoint**

- old ended `tavern-court`;
- old active `eligible=['tavern-court']`;
- old `ending_committed='tavern-court'` without result;
- profile containing `satyr-maid.house-credit`.

**Exact regression required**

Frozen D41 already proves canonical completed migration. Final assembly additionally needs:

> “D41 migration composed with schema6 Strong Meta grants each exact pending Specialist ownership once and remains idempotent after a second load.”

---

## 4.5 NightFlow

Canonical state is explicit `run.flow.night`.

**Old-save input shape**

Pre-NightFlow legacy saves have no active Night envelope.  
Current saves may be paused at:
- lodging resolution;
- after lodging payment;
- a pending forced Night event;
- voluntary choice;
- after a next-day modifier has been queued;
- calendar-advance boundary.

**Required migrated/default state**

Old save with no Night envelope:
- `flow.night = null`.

Current envelope:
- preserve phase;
- selected lodging;
- payment commit bit;
- selected choice;
- suppression/consume bits;
- current intercept;
- handled event IDs;
- calendar-advance commit bit.

**Idempotence**

Reload must never:
- charge lodging twice;
- reroll an already pending probabilistic Night event;
- apply a queued next-day modifier twice;
- advance calendar twice.

**Forbidden inference**

Do not create or complete NightFlow from:
- current housing tier;
- `housingState.paidForCurrentNight` alone;
- a next-day modifier tag;
- event history;
- day boundary.

If explicit Night state is absent, migration defaults to no active Night.

**Save/reload checkpoint**

Mandatory:
1. after lodging payment, before voluntary choice;
2. pending before-lodging forced event;
3. pending after-lodging forced event;
4. after a forced choice queues next-day Energy -1 but before calendar advance;
5. after calendar advance commit.

**Exact regression required**

One end-to-end “reload at every Night phase” test proving:
- money delta exactly once;
- calendar +1 exactly once;
- RNG unchanged after pending roll;
- next-day effect exactly once.

Existing `night-flow.test.ts` covers most individual seams; final 1.0 gate should compose them into one table-driven phase test.

---

## 4.6 Secret Debt

Frozen v12 typed state:

```ts
{
  status:
    'unseen'|'refused'|'accepted'|'bound'|'paid-freedom'|'takeover',
  acceptedDay: number|null,
  trapDay: number|null,
  boundDay: number|null,
  resolvedDay: number|null,
  debt: number,
  hiddenShifts: number,
  grantApplied: boolean,
  lastLenderAttemptDay: number|null
}
```

**Old-save input shape**

Save predating Secret Debt has no `run.secretDebt`.

**Required migrated/default state**

Exactly:

```ts
{
  status:'unseen',
  acceptedDay:null,
  trapDay:null,
  boundDay:null,
  resolvedDay:null,
  debt:0,
  hiddenShifts:0,
  grantApplied:false,
  lastLenderAttemptDay:null
}
```

Existing typed Secret Debt state must be preserved and validated.

**Idempotence**

Reload must not duplicate:
- +2000 lender grant;
- lender RNG attempt;
- trap activation;
- hidden shift count/wage;
- forced-Night penalty;
- repayment;
- ending reward transaction.

**Forbidden inference**

Missing Secret Debt state must **not** be inferred from:
- legacy `metrics.debt`;
- having slept on the street;
- money amount resembling +2000;
- Lust/Sexuality;
- career locks;
- Secret Debt-like world facts or journal text.

No typed state -> `unseen`.

**Save/reload checkpoint**

- after lender roll but before next eligible night;
- immediately after accept/+2000;
- accepted, before Day +10;
- bound immediately after activation;
- pending forced Night after -1 modifier queued;
- 49/50 and 74/75 hidden-shift boundaries;
- immediately after 20000 repayment;
- immediately after Takeover;
- committed and completed each Secret Debt ending.

**Exact regression required**

Frozen v12 has most individual tests. Final assembly needs a schema6 composition test:

> “pre-Secret-Debt schema6 save defaults to exact unseen state; schema6 typed accepted/bound/resolved states roundtrip without replaying grant, trap, forced-Night, repayment or ending transaction.”

---

## 4.7 Palace access + Rich6 duty progression

Frozen Rich6 stores Palace progression in **`run.progression.palace`**, not in `progression.careers['palace']`.

Exact neutral default:

```ts
{
  stage:'entered-service',
  shifts:0,
  counters:{'palace-duty-count':0},
  choices:{},
  facts:[],
  lastStructuralDutyDay:-1,
  lastSupportActionDay:-1,
  committedDutyIds:[],
  completedSupportIds:[],
  routePrepFacts:[]
}
```

Durable world facts include:
- `palace.d23-qualified`;
- `palace.access-granted`;
- `palace.progression-complete`;
- projected route-prep / route-ready facts.

**Old-save input shape**

A save predating Rich6 may:
- have no `progression.palace`;
- legitimately already contain `palace.access-granted`;
- contain old Palace-adjacent facts from prototypes;
- contain obsolete meta unlock `palace`.

**Required migrated/default state**

If `progression.palace` is absent:
- create the exact neutral Rich6 default.

Preserve an already legitimate typed `palace.access-granted` world fact.

Continue removing obsolete generic meta unlock `palace`.

**Idempotence**

Reload after a structural duty must preserve exactly:
- duty count;
- committed duty IDs;
- stage;
- Energy spend;
- wage payment;
- lastStructuralDutyDay.

Reload after support action must not duplicate:
- support ID;
- routePrepFacts;
- projected prep world fact;
- daily support lock.

**Forbidden inference**

Never synthesize access from:
- permanent 10/10 Hard Work alone;
- all-ten active packages alone without the authored D23 invitation/access transition;
- old meta unlock `palace`;
- high stats;
- Palace route-prep facts.

Never infer duty count solely from stage when no exact historical carrier exists.

Never infer `outcome-ready` solely from `palace.progression-complete` if the rest of the Rich6 duty ledger is absent.

**Critical ambiguous legacy case**

If an old save has `palace.progression-complete` but no Rich6 duty ledger, blindly defaulting to entered-service creates an inconsistent projection.

Final integration must do one of:
1. define an exact historical one-to-one migration fixture for that old carrier; or
2. reject that ambiguous old shape with a specific migration error.

It must **not** silently invent 15 committed duties.

**Save/reload checkpoint**

- access granted before duty 1;
- immediately after duties 2/5/8/12/15;
- after one support action;
- after route-prep completion;
- after duty 15 before explicit ending commit.

**Exact regression required**

> “old save with access but no Palace progression gets neutral entered-service ledger; old save with unexplained progression-complete but no duty proof is rejected or migrated by an explicitly documented historical fixture—never converted to 15 duties by inference.”

---

## 4.8 Prince confrontation

Frozen producer uses:
- quest carrier `palace.prince-confrontation`;
- action `palace.confront-prince`;
- durable success fact `palace.prince-defeated`.

Readiness is not success.

**Old-save input shape**

Predates Prince confrontation:
- no confrontation quest state;
- no defeated fact.

May already have:
- Palace access;
- `palace.progression-complete`;
- all 12 stats >=91.

**Required migrated/default state**

Absent quest:
- no confrontation in progress.

Absent `palace.prince-defeated`:
- Prince is not defeated.

Existing exact quest/fact state:
- preserve and validate.

**Idempotence**

Reload must preserve:
- current authored quest stage;
- pending confrontation scene/choice snapshot;
- success fact if written.

Success fact may be written once only.

**Forbidden inference**

Never infer Prince defeat from:
- all 12 stats >=91;
- Outcome Ready;
- progression-complete;
- entering confrontation;
- a failed/backed-out attempt;
- ending eligibility.

**Save/reload checkpoint**

- immediately after explicit confrontation begin;
- at every pending authored proof/reconstruction choice;
- after back-out/failure;
- immediately after success fact is written;
- before explicit Return Home ending commit.

**Exact regression required**

> “ready Palace save with 12×91 and no defeat fact migrates as ready-but-undefeated; reload mid-confrontation resumes exact pending choice; success writes defeated once and still does not auto-commit Return Home.”

---

## 4.9 Activity base envelope: route/checkpoint/RNG

Canonical active envelope persists:
- activity ID;
- definition version;
- adapter;
- active status;
- started day;
- entry-Energy-committed proof;
- route ID;
- resolved option IDs;
- RNG state;
- checkpoint;
- progress/endurance/steps;
- accumulated rewards/emitted facts.

**Old-save input shape**

Pre-Activity save:
- `flow.activity=null`.

Legacy synthetic Activity envelope may have:
- route/progress/steps;
- no newer Field Time/mini-game fields.

**Required migrated/default state**

No active envelope -> `null`.

Active envelope:
- exact route/checkpoint/RNG preserved;
- entry Energy remains committed;
- no replay of entry cost.

Definition version and adapter must match.

**Idempotence**

Repeated parse does not:
- charge entry Energy again;
- reroll RNG;
- re-resolve an option;
- change route;
- emit a result twice.

**Forbidden inference**

Never infer route from:
- checkpoint name;
- resolved option list;
- career/world facts;
- region identity.

If `routeId` was genuinely absent in an old option model, default to `null`.

Definition-version mismatch is a compatibility error, not permission to reinterpret the envelope.

**Save/reload checkpoint**

- immediately after entry;
- after route choice;
- after one non-route option;
- immediately before success/failure boundary;
- immediately before escape.

**Exact regression required**

> “active Activity reload preserves route, checkpoint, RNG, option history and committed entry cost byte-for-byte; incompatible definitionVersion/adapter is rejected.”

---

## 4.10 Activity Field Time + mini-games + suspicion

Current production schema supports:

```ts
fieldTimeRemaining?: number|null
miniGames?: Record<string,{
  stage:string,
  status:'active'|'success'|'failure'|'abort',
  choiceIds:string[],
  suspicion:number
}>
```

Current production parser backfills:
- missing `miniGames` -> `{}`;
- missing `fieldTimeRemaining` ->
  - `null` if definition has no Field Time segments;
  - otherwise `max(0, configuredSegments - oldSteps)`.

**Old-save input shape**

Active pre-mini-game envelope with:
- progress/endurance/steps;
- route/resolved options;
- no `miniGames`;
- no `fieldTimeRemaining`.

**Required migrated/default state**

- `miniGames={}`;
- Field Time only through the explicitly supported legacy formula above.

Persisted mini-game state must preserve:
- stage;
- status;
- choice IDs;
- suspicion.

**Idempotence**

A second parse leaves Field Time and every mini-game exactly unchanged.

**Forbidden inference**

Never reconstruct mini-game stage/suspicion from:
- resolved option IDs;
- route;
- progress;
- checkpoint;
- career facts.

Never reset suspicion to 0 when a mini-game record is already present.

**Migration caveat**

The `configuredSegments - oldSteps` fallback is valid only if the exact old envelope being migrated used one effective Field Time segment per old step.

That assumption must be proven with a real old fixture, not merely a hand-edited modern save.

**Save/reload checkpoint**

- immediately before a mini-game starts;
- after first mini-game choice;
- at non-zero suspicion;
- at success/failure/abort mini-game state while Activity itself remains active;
- low remaining Field Time.

**Exact regression required**

> “real pre-Field-Time production fixture migrates to the expected remaining segments; miniGames defaults empty; a modern non-zero-suspicion mini-game roundtrips exactly and never replays a transition.”

---

## 4.11 Activity Camp — **PRE-1.0 BLOCKER**

D36 requires multi-day Activity Camp:
- maximum 2 field camp nights;
- camp replaces city Night;
- no city lodging charge for that camp night;
- each camp advances global calendar once;
- next field day refreshes Field Time;
- returning does not grant a second full city workday;
- Secret Debt forced Night has absolute precedence and prevents a bound Activity from continuing through a camp boundary.

**Audit result**

Across all four production Activity waves, no persisted `camp` state exists in:
- schema;
- engine;
- Activity runtime.

Therefore there is currently no final-save representation for:
- whether the player is at a camp boundary;
- how many camp nights have been used;
- whether the camp-night calendar advance is already committed;
- whether Field Time refresh for the next field day has already occurred;
- whether a pending camp contact scene is before or after that commit.

**Old-save input shape**

All existing saves predate typed camp persistence.

**Required migrated/default state**

When camp state is added, an old save with no explicit historical camp carrier must default to:
- not currently camped;
- 0 camp nights used;
- no camp calendar advance pending/committed;
- no camp refresh pending.

Exact field names are producer-owned.

**Idempotence**

At a real camp checkpoint, reload must never:
- advance calendar twice;
- refresh Field Time twice;
- charge city lodging;
- increment camp-night count twice;
- rerun a camp contact choice;
- bypass Secret Debt forced Night.

**Forbidden inference**

Never infer camp from:
- `startedDay < currentDay`;
- checkpoint text;
- route ID;
- Field Time = 0;
- current housing;
- absence of city lodging payment;
- Activity progress.

**Save/reload checkpoint**

At minimum:
1. just before choosing Camp;
2. after Camp is chosen, before calendar advance;
3. after calendar advance but before next field-day refresh;
4. after refresh;
5. after first camp night;
6. attempt at second camp night;
7. attempted third camp night must reject;
8. Secret-Debt-bound camp boundary must hand control to forced Night / terminate continuation per D36.

**Exact regression required before public 1.0**

A dedicated camp persistence suite proving all checkpoints above, including save/reload after every atomic boundary.

**Release verdict**

**BLOCKER until implemented and tested.**

This is the only migration/save-contract blocker identified by v16.

---

## 4.12 D46 fresh Lust vs existing-save Lust

D46 frozen producer changes **new-life creation only**:
- fresh new life starts at Lust **5**.

Historical saves preserve their stored value.

**Old-save input shape**

Examples:
- old schema 2/3 save whose historical Lust is 1;
- schema 5/6 save with typed `character.lust=17`;
- new D46 life with Lust 5 before any Lust progression.

**Required migrated/default state**

- old stored 1 remains **1**;
- stored 17 remains **17**;
- no migration rewrites either to 5;
- only a newly created post-D46 life begins at 5.

**Idempotence**

Parse/reload leaves the stored Lust unchanged.

**Forbidden inference**

Never:
- “upgrade” existing save Lust to 5;
- derive Lust from Sexuality;
- derive Lust from Body Confidence lesson count;
- derive Lust from Secret Debt history.

**Save/reload checkpoint**

- legacy untouched life at Lust 1;
- existing developed life at arbitrary Lust;
- fresh D46 creation before/after finishCreation.

**Exact regression required**

One three-fixture test:

> “legacy Lust1 stays 1; typed Lust17 stays 17; only freshSave on assembled D46 runtime starts at 5.”

---

## 4.13 D47 active Hard Work package snapshot / no double application

D47 exact package mapping is locked, but the run-local package architecture already exists:

`character.creation.activeHardWorkPackages`  
`character.creation.hardWorkPackagesApplied`.

`applyHardWorkPackagesAtCreation` already treats `packagesApplied=true` as settled and does not reapply stats/Lust.

**Old-save input shape**

Pre-package schema 4 or older lacks both fields.

Current schema-4 -> 5 migration settles it as:

```ts
activeHardWorkPackages=[]
hardWorkPackagesApplied=true
```

This intentionally prevents retroactive bonuses in an in-progress legacy life.

**Required migrated/default state**

Old completed/in-progress life:
- empty active package identity set;
- packagesApplied = true;
- no D47 stat or Lust bonus is injected.

New Start+ life:
- explicit selected profession package identities are stored;
- all package components apply atomically once;
- selection remains the profession package, not each bonus component.

For Prostitute:
- Sexuality +5;
- Charm +5;
- Lust +5;
are one selected Prostitute package application.

**Idempotence**

After `finishCreation`:
- reload does not apply any component again;
- changing future Meta Hard Work ownership does not change this run's active subset;
- D23 continues reading package identities 10/10, not bonus-component count.

**Forbidden inference**

Never infer active package selection from:
- `meta.hardWorkProgress`;
- all-ten earned Hard Work;
- D23 Palace qualification/access;
- Strong Meta snapshot;
- current D47 mapping;
- current stats matching a +5 pattern.

Earned != selected.

**Save/reload checkpoint**

- creation screen after selecting subset but before finish;
- immediately after finishCreation;
- after Prostitute package application;
- all-ten active D23-qualified New Start+;
- legacy migrated completed creation.

**Exact regression required**

Producer v13 must prove:
1. each exact D47 mapping;
2. arbitrary earned subset;
3. active subset persists across reload;
4. bonuses apply once;
5. Prostitute Lust +5 applies once as part of one package;
6. legacy old run gets no retroactive package;
7. D23 counts active package identities, not 16 individual bonus components;
8. cap-200 clamps normal stat components without multiplying them.

---

# 5. Existing coverage vs missing closure

| System | Existing evidence | Additional final-assembly migration coverage |
| --- | --- | --- |
| Core schema/result ledger | current parse validation | one full v1/v2/v3/v4/v5 -> final-schema fixture ladder |
| Strong Meta | schema5 + snapshot/reload tests already strong | compose with final assembled Meta owners/catalog |
| D40 route selection | current D40 tests | explicit ambiguous outcome-ready migration table across all five careers |
| D41 | frozen migration/idempotence tests | compose exact Specialists into schema6 Strong Meta ownership |
| NightFlow | payment/RNG/calendar reload tests | table-driven reload at every Night phase |
| Secret Debt | frozen v12 reload/default/ending tests | compose typed debt state with final schema6+ |
| Palace Rich6 | producer invariants | old access/no-ledger and ambiguous progression-complete fixtures |
| Prince | producer authored tests | mid-confrontation reload + ready-but-undefeated migration |
| Activity route/RNG | existing envelope validation | real historical envelope fixtures, not synthetic only |
| Activity mini-game | current mini-game state | real pre-Field-Time fixture + non-zero suspicion reload |
| **Activity Camp** | **none — state absent** | **implementation + full camp save/reload suite REQUIRED** |
| D46 Lust | frozen v14 test | legacy Lust1 + arbitrary typed value + fresh5 composed in final schema |
| D47 packages | current generic package idempotence seam | exact locked mapping + final schema migration + no retroactive/double apply |

---

# 6. Proposed single pre-1.0 regression suite

Recommended integration file:

`tests/final-save-migration-v16.test.ts`

It should contain these exact top-level cases:

1. **schema ladder is deterministic and parse-twice idempotent**;
2. **ended legacy run gets one result transaction only**;
3. **schema5 Strong Meta defaults never infer ownership**;
4. **current-run Strong Meta snapshot ignores later profile preference/catalog drift**;
5. **D40 route-specific legacy stages repair exact facts once**;
6. **D40 generic outcome-ready never invents route selection**;
7. **D41 completed legacy Tavern result canonicalizes; incomplete eligibility/commit does not become completion**;
8. **D41 Specialist ownership migration dedupes through the single Strong Meta registry**;
9. **Night reload matrix charges/applies/advances exactly once at every phase**;
10. **pre-Secret-Debt save defaults unseen; typed route states roundtrip exactly**;
11. **Secret Debt grant/trap/forced-Night/repay/ending transaction never replays**;
12. **old Palace-access save gets neutral Rich6 ledger without losing access**;
13. **ambiguous Palace progression-complete without duty proof is not fabricated into 15 duties**;
14. **Prince ready-but-undefeated remains undefeated after migration**;
15. **mid-Prince confrontation resumes exact pending authored choice**;
16. **Activity entry/route/checkpoint/RNG roundtrip without recharging Energy**;
17. **real pre-Field-Time Activity fixture backfills exact Field Time and empty miniGames**;
18. **non-zero Activity suspicion/mini-game stage survives reload exactly**;
19. **Camp atomic save/reload matrix passes every pre/post-calendar boundary**;
20. **legacy Lust1 and typed Lust17 are preserved while new D46 life starts at 5**;
21. **legacy pre-D47 run receives no package; new selected D47 subset applies once only**;
22. **Prostitute D47 Lust+5 never double-applies and remains one package identity**;
23. **D23 all-ten package identity semantics survive save/reload**.

A public 1.0 release candidate should not be considered save-compatible until all 23 cases pass against the final assembled schema/catalog.

---

# 7. Forbidden-inference master list

The final loader must never manufacture any of the following from circumstantial evidence:

- selected D40/D41 ending route from generic readiness;
- ending completion from eligibility;
- Strong Meta ownership from generic unlocks/perks/rule modifiers;
- active Strong Meta selection from current profile preference after run start;
- Secret Debt acceptance/bound state from legacy debt/street/Lust/money;
- NightFlow from housing/payment/modifier evidence;
- Palace access from 10/10 earned Hard Work without the D23 current-run activation/invitation path;
- Palace duty count from stage/facts without exact historical proof;
- Prince defeat from readiness/high stats/progression-complete;
- Activity route from checkpoint/options/facts;
- mini-game state or suspicion from route/progress/resolved options;
- Camp state from calendar/checkpoint/Field Time;
- existing-save Lust 5 merely because D46 fresh starts at 5;
- active Hard Work package selection from earned package ownership.

This list should be treated as a loader firewall for 1.0.

---

# 8. Release gates

## Gate A — schema composition

All frozen/queued producers must be assembled into one schema epoch without dropping:
- schema6 Strong Meta state;
- Secret Debt typed state;
- Rich6 Palace progression;
- expanded Activity mini-game state;
- D47 package selection/application proof.

## Gate B — deterministic migration

Every supported old fixture must satisfy:
- parse once succeeds or fails with an explicit documented incompatibility;
- serialize;
- parse twice;
- deep semantic state is unchanged.

## Gate C — atomic reload

Every money/Energy/calendar/result boundary must be tested immediately before and after commit.

## Gate D — Camp closure

**Blocking.**

Do not claim final 1.0 save compatibility until Camp:
- has explicit persisted state;
- has a neutral old-save default;
- has two-night limit persistence;
- has exactly-once calendar advance/Field Time refresh;
- has Secret Debt precedence tests.

## Gate E — no retroactive power

Migration must not grant:
- new D47 bonuses to an already running legacy life;
- Strong Meta rewards not explicitly owned/selected;
- Palace progress/access not historically proved;
- new ending routes not explicitly selected.

---

# 9. Final priority list

### P0 — release blocker
1. Add and verify persisted multi-day Activity Camp state + migration/default contract.

### P1 — final assembly regression closure
2. Compose Secret Debt typed state into final schema6+.
3. Compose Rich6 Palace state into final schema6+ with ambiguous old-fact handling.
4. Compose D41 legacy migration into the schema6 Strong Meta registry.
5. Compose D47 exact package mapping with current package application proof.
6. Run the 23-case final migration suite.

### P2 — hardening
7. Replace synthetic-only Activity migration fixtures with at least one real historical envelope from each changed Activity schema epoch.
8. Keep explicit loader errors for incompatible Activity definition versions and inconsistent Palace ledgers.

---

# 10. Final audit conclusion

The save architecture is close to 1.0-ready.

Already sound:
- conservative schema migration;
- transaction-proof ending completion;
- Strong Meta current-run snapshot;
- D40 selected-route repair;
- Night exactly-once state;
- Secret Debt typed state design;
- Rich6 Palace explicit ledger design;
- Activity route/mini-game persistence;
- D46 existing-save Lust preservation;
- D47 package idempotence seam.

The one concrete missing save state is **Activity Camp**.

Because Camp is part of locked D36 full-1.0 Activity semantics and crosses both Night and calendar boundaries, omitting its persisted state would make deterministic save/resume incomplete.

Therefore:

**READY_FOR_LEADER_REVIEW**

with one explicit pre-1.0 blocker:

**CLOSE ACTIVITY CAMP PERSISTENCE / MIGRATION BEFORE PUBLIC 1.0.**
