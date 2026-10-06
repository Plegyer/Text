# Chat 3 — D46 + D47 + Legacy Migration Matrix v30

Status: **RESEARCH COMPLETE — BUNDLE TASK A COMPLETE**  
Owner: Chat 3  
Branch: `chat3/release-career-closure-bundle-v30`

## Purpose

This is the exact save / migration / reload matrix for the future assembled tranche:

- D46 economy/start-balance;
- D47 ordinary Hard Work package mapping;
- retirement of live `lumber-stay`;
- conservative historical `vitality` compatibility.

This matrix is downstream of the accepted final assembly packet:

`CHAT3_D46_D47_LEGACY_FINAL_ASSEMBLY_PACKET_v29.md`

and its frozen authorities:

- D46: `chat4/economy-start-balance-producer-v14@a0c5f855b63d3bb85556f5b2780aaaabb58fbced`
- D47: `chat5/hard-work-bonus-mapping-producer-v13@252dc26c514e24f4ab0f0cc0da7694254282e4c4`
- lumber retirement: `chat5/lumber-stay-retirement-producer-v17@52bfd82b374ed045b06c9c78f5f3065cd7226bdb`
- accepted combined preflight: `chat5/d46-d47-legacy-assembly-preflight-v18@bed3a78507715f885b60d5b3f7a9824fc44c8de9`

Current production observed during this audit:

`main@358eb404e449364b9c63a3e261e88cf9312baf7c`

Current save schema is **6**.

The future tranche must compose into the then-current schema-6 migration chain. It must not introduce a schema downgrade or replay old creation/reward behavior.

---

# 1. Locked values after future assembly

## Fresh-life baseline

A genuinely new life created after D46 is assembled starts with:

- money = **600**;
- base daily Energy = **3**;
- Lust = **5**;
- all 12 progression stats = **1** before allocation/packages;
- `activeHardWorkPackages = []`;
- `hardWorkPackagesApplied = false`;
- Strong Meta run snapshot unresolved until creation completion.

D46 changes only the **fresh** Lust baseline from 1 to 5.

It does not rewrite stored Lust in existing saves.

## Exact D47 package mapping

| Career | Package effect |
| --- | --- |
| lumber | Strength +5 |
| satyr-maid | Charm +5 |
| undead-farm | Magic +5 |
| tavern | Wits +5 |
| hunter | Dexterity +5 |
| guard | Endurance +5, Manners +5 |
| merchant | Reason +5, Sociability +5 |
| artist-geisha | Creativity +5, Grooming +5 |
| assassin | Dexterity +5, Wits +5 |
| prostitute | Sexuality +5, Charm +5, separate Lust +5 |

Rules:

- earning a career package does not apply it;
- selection is allowed only before creation completes;
- any earned subset may be selected;
- package is the selectable unit;
- effects apply once at creation completion;
- reload must not apply them again;
- future D47 mapping must not retroactively rewrite stats already committed in an existing life.

## Historical lumber compatibility identities

Stable identities:

```text
retired ending input: lumber-stay
retired old unlock input: vitality
normalized legacy perk: legacy.lumber-stay.vitality
```

Normalized perk effect:

- exactly **+1 daily Energy**;
- no Strong Meta slot;
- no Hard Work package identity;
- no Palace D23 credit;
- no new-play acquisition.

---

# 2. Current schema-6 creation invariants to preserve

Current schema contains:

```text
run.character.creation.activeHardWorkPackages
run.character.creation.hardWorkPackagesApplied
run.character.creation.complete
meta.hardWorkProgress
meta.activeLegacyPerks
run.strongMetaSnapshot
run.strongMetaRuntime
```

Validation invariants already owned by current main:

1. active package IDs must validate against permanently earned `meta.hardWorkProgress`;
2. completed creation must have `hardWorkPackagesApplied = true`;
3. unfinished creation cannot carry a non-empty active package list while already marked applied;
4. completed creation must have a Strong Meta snapshot;
5. unfinished creation must not have a resolved Strong Meta snapshot.

Future D46/D47/legacy composition must retain those invariants.

---

# 3. Migration/reload matrix

## Matrix A — fresh profiles and fresh creation

| Case | Input state | Required result after assembly/load | Reload behavior |
| --- | --- | --- | --- |
| A1 fresh profile | new profile, no Hard Work, no legacy | money 600, Energy 3, Lust 5, stats 1, no active packages | identical values; no package effects appear |
| A2 fresh profile with earned package ledger | new run, `meta.hardWorkProgress=['merchant']` | creation still starts with no selected package; money 600; Reason/Sociability still 1 before allocation | reload does not auto-select Merchant |
| A3 fresh profile with historical legacy perk | profile already owns normalized `legacy.lumber-stay.vitality` | base max Energy 4 from 3 + exactly one legacy +1; Lust 5 | reload remains +1 only |
| A4 fresh profile with duplicate historical source evidence normalized during load | completed `lumber-stay` + old `vitality` + normalized perk | one normalized perk only; no live `vitality`; Energy contribution +1 total | second reload is idempotent |

No fresh-life case may receive Merchant start money.

No fresh-life case may receive a Hard Work package without explicit selection.

---

# 4. Existing saves — stored Lust must win

## Matrix B — D46 fresh-default boundary

| Case | Input | Required output |
| --- | --- | --- |
| B1 schema6 active save, Lust 17 | stored Lust = 17 | stays **17** |
| B2 schema5 save, Lust 17 | migrates through current 5 -> 6 chain | stays **17** |
| B3 older pre-schema5 save with a valid migrated Lust value | current migration produces stored target-schema Lust | D46 must not overwrite it with 5 |
| B4 existing completed life with Lust changed by gameplay | any valid 0..100 stored value | unchanged by D46 |
| B5 future restart/new life | new life is actually created after assembly | receives fresh baseline Lust **5** |

Acceptance invariant:

**5 is a constructor default, not a migration rewrite.**

A migration implementation that sets every loaded character to Lust 5 is invalid.

---

# 5. Earned vs selected vs applied Hard Work packages

There are three separate states and they must never collapse into one another.

## Permanent earned state

`meta.hardWorkProgress`

Meaning:

- the career’s ordinary Hard Work ending was completed in an earlier or current life;
- the package may be selected in a future creation;
- earning alone has no stat/Lust/money effect.

## Current-run selected state

`run.character.creation.activeHardWorkPackages`

Meaning:

- explicit package identities selected for this creation;
- selection is only legal when the corresponding permanent career is earned;
- before creation finishes, selection is editable;
- after creation finishes, selection becomes the applied current-run package snapshot.

## Applied guard

`run.character.creation.hardWorkPackagesApplied`

Meaning:

- package effects for this creation have already been committed;
- a save/reload must never apply those effects again.

---

# 6. Earned/selected/application matrix

| Case | Earned ledger | Active selection before finish | Applied flag | Required behavior |
| --- | --- | --- | --- | --- |
| C1 none earned | [] | [] | false | no package available |
| C2 Merchant earned only | [merchant] | [] | false | no stats/money effect |
| C3 Merchant earned + selected | [merchant] | [merchant] | false | still no effect until finishCreation |
| C4 Merchant finishCreation | [merchant] | [merchant] | false -> true | Reason +5, Sociability +5; money remains 600 |
| C5 Prostitute earned + selected | [prostitute] | [prostitute] | false | pre-finish Lust remains fresh/stored value |
| C6 Prostitute finishCreation from fresh D46 baseline | [prostitute] | [prostitute] | false -> true | Sexuality +5, Charm +5, Lust 5 -> 10 |
| C7 arbitrary earned subset | e.g. [guard,prostitute] | [prostitute,guard] | false | both packages apply atomically once at finish |
| C8 earned but not selected package | includes career | selected list omits career | false -> true at finish | omitted package produces no effect |
| C9 unearned package injected into selection | ledger missing career | selection contains career | any | validation rejects it |
| C10 post-completion selection edit | earned | applied current-run list | true | command rejected; current-run package snapshot is closed |

---

# 7. Current-run package snapshot and future ledger growth

Critical rule:

**permanent Hard Work ownership may grow during a life, but package activation is creation-scoped.**

Example:

1. life begins with only Lumber package earned;
2. player selects Lumber;
3. creation finishes;
4. Lumber +5 Strength is applied once;
5. later in the same life the player completes `ending.guard.hard-work`;
6. `meta.hardWorkProgress` now also contains Guard;
7. current run does **not** gain Guard +5 Endurance/+5 Manners;
8. current run’s `activeHardWorkPackages` remains the creation snapshot;
9. Guard becomes selectable on a future new life.

The same rule applies to all ten careers.

There is no mid-run package activation.

---

# 8. Strong Meta snapshot ordering

Current creation order is:

```text
resolve Strong Meta selection
-> store run.strongMetaSnapshot
-> apply cap/effects owned by that snapshot
-> apply selected Hard Work packages using effective progression-stat cap
-> freeze active package IDs + hardWorkPackagesApplied
-> mark creation complete
-> evaluate Palace D23 run qualification
```

Therefore:

- D24 cap-200 may clip a +5 package at 200 instead of 100;
- package effects do not consume Strong Meta slots;
- package selection does not mutate the Strong Meta snapshot;
- a Strong Meta reward earned later in the same run does not rewrite the current run snapshot;
- a Hard Work package earned later in the same run does not rewrite the current package snapshot.

---

# 9. Exactly-once package application / reload matrix

## Matrix D — reload points

| Reload point | Expected state after reload | Forbidden replay |
| --- | --- | --- |
| D1 before any selection | selected [] / applied false | no auto-selection |
| D2 after selecting package, before finishCreation | selected IDs preserved / applied false | no stat/Lust effects yet |
| D3 immediately after finishCreation | selected applied IDs preserved / applied true | package effects must not apply again |
| D4 later same day | same character snapshot | no duplicate +5 |
| D5 after end day / Night | same package snapshot | no duplicate +5 |
| D6 after completing another Hard Work ending | permanent ledger may grow | current-run selected/applied snapshot unchanged |
| D7 after profile merge | permanent earned ledger follows merge rules | current completed run must not replay packages |
| D8 restart into a new life | new creation selection starts empty | old current-run selection must not silently carry over |

Exactly-once proof for a selected Prostitute package from fresh D46 baseline:

```text
before finish: Lust 5
after finish: Lust 10
after save/load: Lust 10
after second save/load: Lust 10
never 15
```

Exactly-once proof for Guard:

```text
before finish: Endurance 1, Manners 1
after finish: Endurance 6, Manners 6
after reload: Endurance 6, Manners 6
never 11 / 11
```

---

# 10. Historical lumber-stay / vitality migration matrix

## Matrix E — ownership evidence

| Historical evidence | Normalized `completedEndings` | Live `unlocks` after normalization | `activeLegacyPerks` | Energy legacy contribution |
| --- | --- | --- | --- | ---: |
| none | unchanged | no vitality | unchanged | 0 |
| completed `lumber-stay` only | retains historical ID | no vitality | add one legacy perk | +1 |
| old `vitality` only | unchanged | vitality removed | add one legacy perk | +1 |
| normalized perk only | unchanged | no vitality | keep one perk | +1 |
| completed + vitality | historical ID retained | vitality removed | one perk | +1 |
| completed + vitality + existing perk | historical ID retained | vitality removed | one deduped perk | +1 |
| duplicated vitality rows | unchanged | all live vitality ownership removed/deduped | one perk | +1 |
| merged profiles each carrying equivalent evidence | historical ledger unioned normally | no live vitality | one deduped perk | +1 |

The migration is idempotent.

Second load must produce the same normalized state as the first load.

---

# 11. Historical lumber ending-state matrix

## Matrix F — ending lifecycle compatibility

| Old state | Required retirement behavior |
| --- | --- |
| historical completed `lumber-stay` with RunResult | preserve result ID, transaction ID, completion day, ending ID and audit reward IDs; normalize legacy perk; do not replay reward |
| historical completed `lumber-stay` without modern RunResult | synthesize deterministic compatibility proof; `firstCompletion=false`; `appliedMetaRewardIds=[]`; no reward replay |
| historical `lumber-stay` eligible only | remove obsolete eligibility; grant nothing |
| historical `lumber-stay` committed but unfinished | clear obsolete committed/result state; resume active if needed; grant nothing unless separate completed/unlock evidence exists |
| old `vitality` ownership with unrelated current ending | normalize only the legacy perk; do not alter unrelated ending |
| current valid non-lumber ending result | untouched |

Historical transaction proof must be exactly-once.

A compatibility proof must not create a new first-completion reward transaction.

---

# 12. Hard Work firewall for historical lumber evidence

No historical `lumber-stay` / `vitality` evidence may create any of:

- `meta.hardWorkProgress=['lumber']`;
- selected Lumber package;
- Strength +5;
- `ending.lumber.hard-work`;
- 50 completed Lumber shifts;
- Palace D23 Lumber credit.

Historical 24-visit semantics are not converted into modern 50-shift Hard Work.

The only retained gameplay effect is the legacy +1 Energy perk.

---

# 13. Current migration-chain compatibility

Current main migrates legacy saves toward schema 6 and already contains important settlement behavior.

## Older completed creations

During current migration, old completed creation states are settled so they do not replay modern package application:

```text
activeHardWorkPackages = []
hardWorkPackagesApplied = true
```

That behavior must remain.

A legacy completed character must not suddenly receive D47 package effects merely because permanent Hard Work history exists.

## Schema 5 -> 6

Current migration creates:

- canonical Strong Meta state;
- legacy empty/resolved Strong Meta snapshot for already-complete old creations;
- Strong Meta runtime state;
- schema version 6.

D46/D47/legacy retirement must compose onto this chain rather than bypass it.

## Legacy retirement timing

Lumber legacy normalization must occur early enough that:

- retired `vitality` no longer survives as a live unlock;
- retired ending references are handled by compatibility logic;
- save validation sees the normalized schema-6 shape;
- repeated load is stable.

No schema bump is required solely for D46, D47, or the lumber legacy normalization if the current schema-6 shape can carry the accepted fields.

---

# 14. Profile merge matrix

| Profile A | Profile B | Required merged permanent result |
| --- | --- | --- |
| Lumber Hard Work earned | Guard Hard Work earned | both career IDs in permanent Hard Work ledger |
| same Hard Work career earned in both | same career | one deduped identity |
| normalized lumber legacy perk | old vitality evidence | one normalized legacy perk |
| historical lumber completion | normalized legacy perk | historical completion retained + one legacy perk |
| Strong Meta ownership in one profile | Hard Work packages in other | each remains in its own permanent subsystem |
| current-run active package selection | another profile’s permanent ledger | never treat run-local selection as permanent ownership |

Run-local package selection is not a mergeable permanent reward.

---

# 15. Canonical ending-count migration invariant

After retirement:

- canonical ordinary-career endings = **40**;
- live `lumber-stay` = **absent**;
- historical `lumber-stay` remains an accepted retired identity for compatibility only;
- generic `guild-life` and `scholar-life` remain outside the ordinary 40;
- on the observed base, total live ending definitions = **42** after removing exactly one obsolete `lumber-stay` from the pre-retirement total of 43.

The canonical ordinary 40 are:

- 10 ordinary Hard Work endings;
- 30 accepted advanced ordinary endings from D40/D41.

Migration must never add historical `lumber-stay` back to the live catalog to make an old save validate.

Compatibility is handled by retired-identity logic, not by restoring the ending definition.

---

# 16. Required save/reload acceptance cases for Chat 2

The future assembly should prove at least these cases:

1. fresh schema6 profile -> money 600 / Energy 3 / Lust 5;
2. fresh historical legacy owner -> Energy 4 from one legacy +1;
3. schema5 Lust 17 -> schema6 Lust 17;
4. existing schema6 Lust 17 -> remains 17;
5. Merchant earned/unselected -> no stats/money effect;
6. Merchant selected/pre-finish -> no effect yet;
7. Merchant finish -> Reason +5, Sociability +5, money unchanged;
8. Merchant post-finish reload -> no reapply;
9. Prostitute fresh selected -> Lust 5 -> 10 exactly once;
10. arbitrary multi-package selection applies atomically;
11. earning new Hard Work after creation does not mutate current-run active package snapshot;
12. restart opens a new empty package selection surface;
13. completed historical lumber result preserves identity/transaction;
14. pre-RunResult completed lumber save gets deterministic compatibility proof without reward replay;
15. eligible-only lumber state is removed without reward;
16. committed-unfinished lumber state is cancelled safely;
17. old vitality only -> one normalized legacy perk;
18. duplicate completion + vitality + legacy perk -> still one perk/+1 Energy;
19. profile merge dedupes legacy evidence;
20. historical lumber evidence never creates Hard Work progress;
21. live `lumber-stay` definition remains absent;
22. canonical ordinary ending count remains 40;
23. total ending count on the observed catalog is 42;
24. second load of every normalized legacy case is byte/semantic stable for the audited fields.

---

# 17. Stop conditions

Stop assembly/migration work and reconcile if any of these appears:

- fresh Lust is not 5;
- existing stored Lust is rewritten to 5;
- money changes from 600 because of D47;
- a package applies when merely earned;
- an unselected package applies;
- package effects apply more than once;
- reload changes applied character stats/Lust;
- newly earned current-life Hard Work mutates the already-frozen package snapshot;
- an old completed creation with `hardWorkPackagesApplied=true` receives D47 effects retroactively;
- historical lumber evidence creates modern Hard Work progress;
- `vitality` remains a live unlock;
- duplicate historical evidence yields +2 Energy;
- legacy perk consumes Strong Meta/package slots;
- historical completion loses its transaction/result identity;
- pre-RunResult compatibility replays a reward;
- live `lumber-stay` is restored to make migration pass;
- ordinary canonical ending count becomes 41;
- current schema-6 Strong Meta/migration state is downgraded or replaced.

---

# 18. Final migration contract

The future assembled behavior is:

```text
new life:
  Lust 5
  money 600
  Energy 3
  package selection empty

existing life:
  preserve stored Lust
  preserve already-committed package/stat snapshot
  never retroactively apply D47

earned Hard Work:
  permanent eligibility for future selection
  no automatic effect

selected package:
  run-local creation choice
  apply once at finishCreation
  freeze current-run package identity snapshot

reload:
  preserve snapshot
  never reapply

historical lumber/vitality:
  normalize to one legacy.lumber-stay.vitality
  +1 Energy exactly once
  no Hard Work / Strong Meta / Palace credit

catalog:
  live ordinary endings = 40
  live lumber-stay absent
  observed total endings after retirement = 42
```

**BUNDLE TASK A COMPLETE — CONTINUE TO v31**
