# Chat 4 — D46 + D47 + Legacy Exact-Head QA v49

Status: **EXACT-HEAD REFRESH COMPLETE — SELECTIVE ASSEMBLY PREP READY**  
Owner: Chat 4  
Branch: `chat4/d46-d47-legacy-exact-head-qa-v47`

## Scope

This packet completes Chat 4 v47-v49.

It independently re-verifies the frozen D46 economy/start-balance producer, the D46 reachability audit descendant, the D47 Hard Work package producer, and both lumber-stay retirement authority points.

No production runtime was mutated.  
No frozen producer was mutated.  
No main merge was performed.  
No full CI was run.

## 1. Frozen authorities

D46 economy/start-balance producer:

`a0c5f855b63d3bb85556f5b2780aaaabb58fbced`

D46 reachability audit:

`bb79be1f39c55e6297287cd071e1e8268005148a`

D47 Hard Work mapping producer:

`252dc26c514e24f4ab0f0cc0da7694254282e4c4`

Lumber-stay retirement implementation head:

`cbeae73e8559d43fcce24213d6f5606b682b3e7d`

Lumber-stay retirement verified target:

`39912e7435c3707d98f96fe550d697c20ac0bedb`

## 2. Lineage facts

### D46 tested runtime -> D46 handoff

The D46 producer handoff SHA is a documentation-only descendant of its previously tested runtime candidate:

`ebc57577d1830d1d0fe115e02d01db079af57fe2 -> a0c5f855b63d3bb85556f5b2780aaaabb58fbced`

The only changed file is:

`docs/tasks/CHAT4_ECONOMY_START_BALANCE_PRODUCER_v14.md`

Therefore the production tree at the D46 handoff is the exact previously-tested D46 runtime tree.

### D46 producer -> D46 reachability audit

`a0c5f855b63d3bb85556f5b2780aaaabb58fbced -> bb79be1f39c55e6297287cd071e1e8268005148a`

is ahead by 3 and changes only task/pointer documentation.

Therefore the D46 producer and D46 reachability-audit authority have identical production/runtime bytes.

### D46 -> D47

`252dc26c514e24f4ab0f0cc0da7694254282e4c4`

is a direct descendant of D46 producer `a0c5f855...`, ahead by 6.

The D47 delta is narrow:

- `content/hard-work-package-catalog-v1.fixture.json`
- `src/core/hardWorkMeta.ts`
- D47/package tests
- one stale D46 migration expectation update
- task/pointer docs

D47 does **not** replace D46 definitions or D46 engine:

- D46 `definitions.json` blob = `b230691119310a8baac27409233299bc69ceeb0e`
- D47 `definitions.json` blob = same
- D46 `engine.ts` blob = `ba354bc5b5f6fe0e9965e46bf1a56b0e1d44ec32`
- D47 `engine.ts` blob = same

This makes D47 the preferred combined D46+D47 executable authority.

### Lumber implementation -> verified target

`cbeae73e8559d43fcce24213d6f5606b682b3e7d -> 39912e7435c3707d98f96fe550d697c20ac0bedb`

is ahead by exactly one commit.

That single commit changes only:

`tests/presentation-ending-parity-v9.test.ts`

No production byte changes between the implementation head and verified target.

Therefore:

- `cbeae...` = retirement implementation;
- `39912...` = same production + corrected presentation parity test.

## 3. v47 exact-head workflow evidence

QA-only workflow:

`Chat4 D46 D47 legacy exact-head QA v47-v49`

Workflow run:

**37503207271**

QA workflow branch head:

`b1d7a1cf95e682afb960858d09606b6fc2fe3c19`

The matrix used exact SHA checkout guards for all five frozen authorities.

The overall workflow conclusion is **failure** only because intentionally-tested historical heads contain known stale tests. The superseding executable authorities are green.

### D46 producer job

Job:

**112405190488**

Exact guard:

```text
expected=a0c5f855b63d3bb85556f5b2780aaaabb58fbced
actual=a0c5f855b63d3bb85556f5b2780aaaabb58fbced
```

Results:

- npm ci: **PASS**
- typecheck: **PASS**
- validate: **PASS**
- build: **PASS**
- focused: **56 / 57 PASS**

Validation:

`Content OK: 82 packs, 329 events, 39 actions, 22 endings.`

Only focused failure:

`hard-work-meta-migration-v5.test.ts`

subtest:

`v4 migration preserves current-life values and defers selectable packages to the next life`

Failure:

`expected 1, actual 5`

The test preserves existing-life Lust = 7 correctly, then restarts into a genuinely new life and incorrectly expects the retired pre-D46 fresh default 1.

Classification:

**STALE TEST/FIXTURE**

D46 Product/runtime behavior is correct: a restarted/new life must use fresh Lust = 5.

### D46 reachability-audit job

Job:

**112405189846**

Exact guard:

```text
expected=bb79be1f39c55e6297287cd071e1e8268005148a
actual=bb79be1f39c55e6297287cd071e1e8268005148a
```

Results:

- npm ci: **PASS**
- typecheck: **PASS**
- validate: **PASS**
- build: **PASS**
- focused: **56 / 57 PASS**

The same single stale migration expectation fails.

Because the audit head is production-identical to D46 producer, this is expected and confirms no audit-lineage drift.

Classification:

**STALE TEST/FIXTURE — NO PRODUCT DEFECT**

### D47 producer job

Job:

**112405190362**

Exact guard:

```text
expected=252dc26c514e24f4ab0f0cc0da7694254282e4c4
actual=252dc26c514e24f4ab0f0cc0da7694254282e4c4
```

Results:

- npm ci: **PASS**
- typecheck: **PASS**
- validate: **PASS**
- build: **PASS**
- focused: **75 / 75 PASS**

Validation:

`Content OK: 82 packs, 329 events, 39 actions, 22 endings.`

D47 also updates the stale D46 migration assertion so a restarted new life expects Lust 5.

Classification:

**EXECUTABLE GREEN**

### Lumber implementation job

Job:

**112405190390**

Exact guard:

```text
expected=cbeae73e8559d43fcce24213d6f5606b682b3e7d
actual=cbeae73e8559d43fcce24213d6f5606b682b3e7d
```

Results:

- npm ci: **PASS**
- typecheck: **PASS**
- validate: **PASS**
- build: **PASS**
- focused: **77 / 79 PASS**

Validation:

`Content OK: 84 packs, 357 events, 39 actions, 42 endings.`

Only failures:

1. `all existing ending semantic IDs have exact static RU/EN presentation parity`
2. `current ending definitions all map to live semantic slots while the audited legacy subset keeps exact static bindings`

Both fail with the same stale fixture count:

`8 !== 9`

Classification:

**STALE PRESENTATION TEST/FIXTURE**

The next frozen target changes only this test file.

### Lumber verified-target job

Job:

**112405190201**

Exact guard:

```text
expected=39912e7435c3707d98f96fe550d697c20ac0bedb
actual=39912e7435c3707d98f96fe550d697c20ac0bedb
```

Results:

- npm ci: **PASS**
- typecheck: **PASS**
- validate: **PASS**
- build: **PASS**
- focused: **79 / 79 PASS**

Validation:

`Content OK: 84 packs, 357 events, 39 actions, 42 endings.`

Classification:

**EXECUTABLE GREEN**

No product failure and no infrastructure failure remains on the verified retirement target.

## 4. D46 invariant refresh

Frozen D46 exact production values:

### Fresh start

`freshSave()`:

- money = **600**
- base Energy = **3**
- Lust = **5**

D46 changes only the fresh/new-life default.

The executable D46 test proves schema-5 stored Lust survives migration unchanged.

The stale migration test failure occurs only because its **next restarted life** still expected old default 1.

### Ordinary wage bases

Exact ten ordinary `*.shift` bases:

- Lumber = **35**
- Satyr Maid = **37**
- Undead Farm = **37**
- Tavern = **37**
- Hunter = **37**
- Guard = **37**
- Merchant = **37**
- Artist/Geisha = **37**
- Assassin = **37**
- Prostitute = **37**

The pre-existing per-career wage weights remain distinct and intact.

### Ordinary wage cap

Frozen engine defines:

`ORDINARY_SHIFT_WAGE_CAP = 120`

and routes only the ten ordinary `<career>.shift` identities through:

`ordinaryShiftWage(action, save)`

The committed ordinary wage is calculated before the shift's later stat effects.

No Palace/Secret Debt/non-ordinary wage is part of this helper.

Disposition:

**D46 invariants confirmed.**

## 5. D47 invariant refresh

Frozen package fixture is exactly:

- Lumber -> Strength +5
- Satyr Maid -> Charm +5
- Undead Farm -> Magic +5
- Tavern -> Wits +5
- Hunter -> Dexterity +5
- Guard -> Endurance +5, Manners +5
- Merchant -> Reason +5, Sociability +5
- Artist/Geisha -> Creativity +5, Grooming +5
- Assassin -> Dexterity +5, Wits +5
- Prostitute -> Sexuality +5, Charm +5, Lust +5

Exactly ten profession-package identities exist.

The first five have exactly one progression-stat +5 component.

The later five have exactly two progression-stat +5 components.

Lust remains a separate `lustBonus`, outside the 12 progression stats.

Aggregate progression-stat package points:

**75**

D47 package selection remains:

`arbitrary-earned-subset`

and:

`wholePackageOnly = true`

Application remains atomic at creation completion.

`packagesApplied` prevents reload/re-entry replay.

Cap behavior:

- stat 98 / cap100 / +5 -> 100;
- stat 198 / cap200 / +5 -> 200;
- +5 is never multiplied.

D47 uses the existing Hard Work package system and does not use Strong Meta Keystone/Specialist capacity.

## 6. Hard Work lifecycle

Frozen D47 definitions retain exactly ten ordinary Hard Work endings.

Each exact Hard Work ending is gated by:

`completed_shifts >= 50`

and writes one typed permanent Hard Work reward identity:

`hardWork:<career>`

The threshold remains exactly:

**50 completed ordinary shifts**

No package activates in the earning life merely because the ending was earned.

## 7. Lumber retirement invariant refresh

Verified target `39912...` contains exactly:

**40 canonical ordinary endings**

The set is:

- 10 Hard Work endings
- 14 D41 advanced ordinary endings
- 16 D40 advanced ordinary endings

Current live Lumber endings are exactly:

- `ending.lumber.hard-work`
- `ending.lumber.forewoman`
- `ending.lumber.forest`

Live `lumber-stay` is absent.

No `lumber-stay` presentation slot remains.

### Historical compatibility

Frozen compatibility IDs:

- retired ending evidence: `lumber-stay`
- retired unlock evidence: `vitality`
- normalized legacy perk: `legacy.lumber-stay.vitality`

Migration normalizes any historical evidence into a deduplicated `activeLegacyPerks` set and strips live `vitality` from generic unlock ownership.

### Energy exactly once

Frozen `energyMax()` computes:

```text
3
+ rule modifier
+ (legacy.lumber-stay.vitality present ? 1 : 0)
+ Strong Meta current energy bonus
```

Therefore duplicate historical evidence cannot stack multiple legacy Energy points.

The legacy +1 coexists additively with legitimate Strong Meta Energy without entering Strong Meta ownership.

No modern Hard Work package or Palace D23 identity is fabricated from historical lumber evidence.

## 8. Cross-candidate collision map

### D46 and D47 are compatible lineage

D47 is a direct descendant of D46.

Preferred semantic source for the combined D46+D47 tranche:

`252dc26c514e24f4ab0f0cc0da7694254282e4c4`

because it contains:

- exact D46 engine/definitions bytes;
- exact D47 package mapping;
- the corrected D46 fresh-life migration expectation;
- 75/75 focused executable green.

### Lumber is a divergent lineage

D47 and lumber verified target are **diverged**.

Do not merge by snapshot order.

The strongest collision proof is the shared-file content itself.

D47:

- `definitions.json@b230691119310a8baac27409233299bc69ceeb0e`
- `engine.ts@ba354bc5b5f6fe0e9965e46bf1a56b0e1d44ec32`
- `hardWorkMeta.ts@bf983eb5338f9d8eeb48458eb70c71bbe2a6d9e8`

Lumber verified target:

- `definitions.json@306c77bcbb72e70023b1055ef389d11108924b0c`
- `engine.ts@f26575787b49e48c7fff6487d090b9d278d121c6`
- `hardWorkMeta.ts@5c9440874c0fdb61589d15de768416be04aaf606`

Lumber target carries the **pre-D47** `hardWorkMeta.ts` blob.

Therefore copying the lumber tree after D47 would silently erase D47 validation semantics.

### Lumber snapshot also predates D46

Static exact-head audit of the lumber verified target shows:

- fresh Lust = **1**
- Lumber wage base = **13**
- other ordinary wage bases = **15**
- no D46 `ordinaryShiftWage` cap-120 seam

Therefore copying lumber `definitions.json` or `engine.ts` after D46 would silently revert D46.

This is a hard whole-file stop.

## 9. Current-main collision map

Current main observed during v48:

`main@b99336f320369d97fad68f512c1baf074b144d10`

Current shared-file blobs:

- `definitions.json@311b2fec271a274e61c34fad9645d5bff13f4993`
- `engine.ts@e8b979355e6ebacad7ae62dce36d625687613152`
- `hardWorkMeta.ts@5c9440874c0fdb61589d15de768416be04aaf606`
- `localization.json@9281d3880d01c54f352effa5e372ad5393cc3eaa`
- `presentation.json@e800d2b16f2bc868273e39d45718dcd0c7fe74a5`
- `src/ui/app.ts@149e0d0eda4180298ae3364f46dd4f7b04a4d4bd`

At this observed main:

- ordinary wage bases are still **13/15**;
- fresh Lust is still **1**;
- `hardWorkMeta.ts` is still the pre-D47 blob.

So this tranche is not already represented by current main.

However current main shared files also contain later unrelated accepted work.

Therefore Chat 2 must re-read the actual assembly base at assembly time and must not replace any of these files wholesale with a historical producer snapshot.

## 10. Required selective assembly order

### Step 1 — freeze actual integration base

Re-read actual main / Chat2 integration head.

Record exact SHA and shared-file blobs.

Do not assume `b99336f...` remains current.

### Step 2 — compose D46 semantics

Onto the actual current shared owners, port only:

- fresh/new-life Lust default 5;
- ordinary wage bases 35/37;
- ordinary `*.shift` wage cap 120;
- pre-shift wage input semantics;
- existing D46-focused tests.

Preserve every newer engine/schema/Secret Debt/Palace/Activity/Night/Strong Meta owner.

### Step 3 — compose D47 semantics

Use D47 authority `252dc26...`.

Port:

- exact package fixture/map;
- D47 `hardWorkMeta.ts` validation semantics;
- exact package application behavior;
- D47 focused tests;
- corrected new-life Lust expectation in the migration test.

Do not copy the rest of the historical D47 branch over newer current content.

### Step 4 — compose lumber retirement semantically

Use verified target `39912e...` as the acceptance source and `cbeae...` as the implementation-delta source.

Port only retirement-owned changes:

- remove live lumber-stay ending;
- add `src/core/lumberStayLegacy.ts`;
- integrate historical-evidence normalization into the current engine;
- add exactly one legacy Energy point through the current `energyMax` composition;
- remove live lumber-stay localization/presentation/UI bindings;
- preserve historical compatibility identity;
- carry `lumber-stay-retirement-v17.test.ts`;
- carry the verified-target presentation parity adjustment.

When editing current `engine.ts`, preserve D46:

- fresh Lust 5;
- ordinary wage cap 120;
- pre-shift wage calculation.

When editing current `hardWorkMeta.ts`, preserve D47 exactly.

## 11. Shared files that must never be copied wholesale

### From D46/D47 historical branches

Do not wholesale replace current:

- `content/definitions.json`
- `src/core/engine.ts`
- `content/localization.json`
- `content/presentation.json`
- `src/ui/app.ts`

D46/D47 own only narrow semantics inside these historical snapshots.

### From lumber retirement branch

Especially do not wholesale copy:

- `content/definitions.json`
- `src/core/engine.ts`
- `src/core/hardWorkMeta.ts`
- `content/localization.json`
- `content/presentation.json`
- `src/ui/app.ts`

Those lumber snapshots explicitly contain pre-D46/pre-D47 values.

Whole-file copying them would cause known Product regressions.

## 12. Coupling firewalls

### Strong Meta

Preserve:

- Keystone capacity = 1;
- Specialist capacity = 2;
- Hard Work profession packages outside Strong Meta slots;
- legacy lumber perk outside Strong Meta ownership;
- cap-200 changes only the effective progression-stat cap.

D47 consumes the already-resolved cap; it does not mutate the Strong Meta snapshot.

### Palace

Preserve D23 identity semantics:

- all ten permanent ordinary Hard Work identities;
- all ten active ordinary packages.

Never count as an extra Palace career/package:

- individual D47 stat components;
- Prostitute Lust +5;
- legacy lumber vitality;
- Strong Meta rewards;
- Secret Debt;
- Activity.

D46 ordinary cap must not capture Palace wages.

### Secret Debt

D46 ordinary wage helper must not capture hidden-work wages.

Legacy lumber Energy is an independent source and must not become a Secret Debt/D51 provenance tag.

Historical lumber evidence must never create a Secret Debt identity or route.

## 13. Required post-assembly focused gate

After selective composition, Chat 2 must run:

```text
npm ci
npm run typecheck
npm run validate
npm run build
```

Then at minimum:

### D46 / D47 / Hard Work

- `tests/economy-start-balance-v14.test.ts`
- `tests/hard-work-bonus-mapping-v13.test.ts`
- `tests/ordinary-hard-work-meta-production.test.ts`
- `tests/ordinary-hard-work-lifecycle-parity.test.ts`
- `tests/lumber-hard-work-invariant.test.ts`
- `tests/hard-work-stat-cap-d24.test.ts`

### Migration / ending transaction

- `tests/hard-work-meta-migration-v5.test.ts`
- `tests/migration.test.ts`
- `tests/ending-meta.test.ts`

### Lumber retirement

- `tests/lumber-stay-retirement-v17.test.ts`
- `tests/presentation-ending-parity-v9.test.ts`
- `tests/advanced-endings-tranche-a-v11.test.ts`
- `tests/d40-advanced-endings-tranche-b-v11.test.ts`

### Strong Meta / Palace adjacency

- `tests/strong-meta-registry-v7.test.ts`
- `tests/strong-meta-engine-integration-v7.test.ts`
- `tests/hard-work-palace-meta-smoke.test.ts`
- `tests/palace-d23-consumer-integration-v8.test.ts`

If the assembly base contains newer Secret Debt/D51, Palace, Activity/Camp/D38, Night, or presentation suites, add their current authoritative focused regressions. Do not replace them with historical filenames merely because the producer branches predate them.

## 14. Mandatory explicit post-assembly assertions

Report PASS/FAIL for:

1. fresh Lust = **5**;
2. existing stored Lust remains unchanged on migration;
3. starting money = **600**;
4. base Energy = **3** before legitimate inherited bonuses;
5. Lumber wage base = **35**;
6. other nine ordinary wage bases = **37**;
7. ordinary final wage <= **120**;
8. non-ordinary wages bypass the ordinary cap;
9. Hard Work threshold = **50 shifts**;
10. exact ten D47 package identities/map;
11. Prostitute package changes fresh Lust **5 -> 10** only when selected/applied;
12. packages apply exactly once;
13. packages consume no Strong Meta slots;
14. live lumber-stay absent;
15. exactly **40 canonical ordinary endings**;
16. legacy lumber evidence normalizes to one `legacy.lumber-stay.vitality`;
17. legacy Energy = **+1 exactly once**;
18. historical lumber does not grant modern Hard Work or Palace credit;
19. Strong Meta capacities remain 1/2;
20. save/reload/profile merge remains idempotent.

## 15. Migration/save stop conditions

Stop assembly if any of these occur:

- existing valid Lust is rewritten to 5;
- a new life starts at Lust 1;
- D46 35/37 wage bases are lost;
- ordinary wage exceeds 120;
- Palace or Secret Debt wage is captured by D46;
- any Hard Work package differs from D47 map;
- D47 package applies before creation completion;
- package replays after reload;
- later-earned package appears in the current frozen creation snapshot;
- package consumes Keystone/Specialist capacity;
- retired lumber-stay becomes reachable;
- live `vitality` acquisition reappears;
- duplicate historical evidence yields Energy +2 or more;
- legacy evidence fabricates `hardWork:lumber`;
- legacy evidence contributes Palace D23 package/career credit;
- canonical ordinary ending identity count differs from 40;
- profile merge duplicates legacy perk;
- D42/Night, Activity, Secret Debt/D51, Palace, or Strong Meta newer state is lost;
- schema version is downgraded or forked;
- ending/RunResult reward transaction replays after load.

## 16. Failure classification summary

### Product defects

**None found in this v47-v49 scope.**

### Stale test/fixture

D46 producer / D46 audit:

- one stale fresh-life expectation: restart Lust 1 instead of D46 Lust 5.

Lumber implementation head:

- two stale presentation parity counts: 8 vs 9.

Both are already repaired in later frozen authorities:

- D47 fixes the D46 migration test expectation;
- lumber verified target fixes presentation parity.

### Lineage/collision risk

**Real and assembly-critical.**

The lumber snapshot predates D46/D47 semantics and must be cherry-picked semantically rather than overlaid wholesale.

### Infrastructure

**No blocking infrastructure defect.**

All exact SHA guards, installs, typechecks, validations and builds executed on the final matrix run.

## 17. Final disposition

Preferred executable authority for combined D46+D47:

`252dc26c514e24f4ab0f0cc0da7694254282e4c4`

Evidence:

**75 / 75 focused PASS**

Preferred executable authority for lumber retirement:

`39912e7435c3707d98f96fe550d697c20ac0bedb`

Evidence:

**79 / 79 focused PASS**

The two green authorities are not safe to compose by whole-file replacement because their lineages diverge and the lumber branch contains pre-D46/pre-D47 shared owners.

They are safe for Chat2 preparation only through the selective order defined above.

**v47 COMPLETE — exact-head executable refresh captured**  
**v48 COMPLETE — lineage/collision audit captured**  
**v49 COMPLETE — selective assembly handoff published**

**BUNDLE_COMPLETE — READY_FOR_CHAT2_D46_D47_LEGACY_ASSEMBLY_PREP**
