# Chat 4 — D46 + D47 + Legacy Post-Assembly QA v37

Status: **FOCUSED EXECUTABLE GATE DEFINED — CHAT 2 OWNED AFTER ASSEMBLY**  
Owner: Chat 4  
Branch: `chat4/career-preassembly-acceptance-bundle-v35`

## Purpose

This document defines the focused executable gate Chat 2 must run after selectively assembling D46, D47, and lumber-stay retirement onto the actual current integration base.

Chat 4 makes no runtime change in v37 and does not run full CI.

The gate must be executed on the **assembled branch head**, not on any historical producer SHA.

## 0. Evidence header required from Chat 2

Record before running tests:

- exact assembly branch;
- exact assembly HEAD SHA;
- exact production/main base SHA used;
- whether Secret Debt+D51 is already present;
- whether full Palace is already present;
- whether later Activity/Camp/D38 is already present;
- Node/npm versions;
- exact focused command(s);
- run/job IDs if executed through Actions.

If HEAD changes after any repair, rerun the gate on the new exact HEAD.

---

## 1. Static/build gate

Run on the assembled branch:

```text
npm ci
npm run typecheck
npm run validate
npm run build
```

All four must pass before the tranche can proceed to full CI.

Validation must use the current assembled catalog. Do not weaken validation merely to tolerate retired `lumber-stay`.

---

## 2. Required focused test roster

Port/adapt the accepted producer tests onto the assembled branch and run the current authoritative equivalents.

### D46 / D47 / legacy core

```text
tests/economy-start-balance-v14.test.ts
tests/hard-work-bonus-mapping-v13.test.ts
tests/ordinary-hard-work-meta-production.test.ts
tests/ordinary-hard-work-lifecycle-parity.test.ts
tests/lumber-hard-work-invariant.test.ts
tests/lumber-stay-retirement-v17.test.ts
tests/hard-work-meta-migration-v5.test.ts
tests/migration.test.ts
tests/ending-meta.test.ts
tests/advanced-endings-tranche-a-v11.test.ts
tests/d40-advanced-endings-tranche-b-v11.test.ts
```

### Strong Meta / cap adjacency

```text
tests/strong-meta-registry-v7.test.ts
tests/strong-meta-d30-runtime-v7.test.ts
tests/strong-meta-engine-integration-v7.test.ts
tests/hard-work-stat-cap-d24.test.ts
```

### Palace D23 adjacency

```text
tests/hard-work-palace-meta-smoke.test.ts
tests/palace-d23-consumer-integration-v8.test.ts
```

If fuller Palace has already landed, add the current Palace focused suites from that assembled branch.

### D42 Night / presentation

```text
tests/night-flow.test.ts
tests/night-content-gap-v10.test.ts
tests/presentation-source-integrity-v9.test.ts
tests/presentation-ending-parity-v9.test.ts
```

Retain the current authoritative Night localization/presentation tests present on the actual branch.

### Activity

At minimum on the current architecture:

```text
tests/activity.test.ts
tests/qa-activity-option-reload.test.ts
tests/item-capability-activity-closure.test.ts
```

If later Camp/D38/Activity Network work has landed, add its exact current focused suites.

### Secret Debt / D51

If Secret Debt+D51 is present on the actual assembly base, run its current authoritative focused suites, including when present:

```text
tests/secret-debt-full-route-v12.test.ts
tests/secret-debt-activity-energy-compat-v20.test.ts
tests/chat3-secret-debt-separation-v2.test.ts
```

If filenames differ on the future base, use the authoritative replacements covering the same contracts. Do not skip the contracts because a historical filename changed.

---

## 3. Fresh-life D46 gate

Create a genuinely new life after assembly.

Required before package application:

- money = **600**;
- base/current start Energy = **3** absent unrelated owned bonuses;
- Lust = **5**;
- all 12 progression stats start from the normal base before allocation/package effects.

Required negative checks:

- no Merchant package or any other package adds starting money;
- fresh Lust is not 1;
- no legacy lumber perk appears without historical evidence.

PASS condition:

**fresh constructor = money 600 / Energy 3 / Lust 5.**

---

## 4. Existing-Lust preservation gate

Load/migrate representative existing saves.

Required cases:

1. schema6 active save with Lust 17 -> remains **17**;
2. schema5 save with Lust 17 -> migrates to schema6 and remains **17**;
3. valid older save whose migration yields a stored Lust value -> D46 does not overwrite it;
4. existing gameplay-modified Lust 0..100 -> unchanged solely because D46 assembled;
5. only a newly created later life receives fresh default 5.

Hard rule:

**5 is a constructor default, not a migration rewrite.**

Stop if any existing valid stored Lust is reset to 5.

---

## 5. D46 wage gate

### Exact content bases

Assert the ten ordinary `<career>.shift` bases:

- Lumber = **35**;
- Satyr Maid = **37**;
- Undead Farm = **37**;
- Tavern = **37**;
- Hunter = **37**;
- Guard = **37**;
- Merchant = **37**;
- Artist/Geisha = **37**;
- Assassin = **37**;
- Prostitute = **37**.

All pre-existing wage weights must remain semantically unchanged.

### Runtime anchors

With all relevant wage stats at 1:

- Lumber ordinary wage = **36**;
- every other ordinary career anchor remains the accepted D46 value derived from base 37 and its authored weights, with producer starter anchors preserved.

At high stats / cap-200 runs:

- ordinary wage result never exceeds **120**.

The wage must be computed from pre-shift inputs before seasonal shift effects.

### Isolation

Assert the 120 cap applies only to the ten ordinary `*.shift` identities.

Stop if:

- Palace wage is capped by 120;
- Secret Debt hidden work is capped by 120;
- any other non-ordinary wage is routed through the ordinary helper.

---

## 6. Exact D47 package gate

Assert exactly ten profession-package identities with this exact map:

| Career | Required package |
| --- | --- |
| Lumber | Strength +5 |
| Satyr Maid | Charm +5 |
| Undead Farm | Magic +5 |
| Tavern | Wits +5 |
| Hunter | Dexterity +5 |
| Guard | Endurance +5, Manners +5 |
| Merchant | Reason +5, Sociability +5 |
| Artist/Geisha | Creativity +5, Grooming +5 |
| Assassin | Dexterity +5, Wits +5 |
| Prostitute | Sexuality +5, Charm +5, Lust +5 |

Required aggregate assertions:

- package identities = **10** exactly;
- first five packages = exactly one progression-stat +5 component each;
- later five = exactly two progression-stat +5 components each;
- total progression-stat package points = **75**;
- all 12 progression stats appear across the map;
- only Prostitute has separate Lust bonus;
- Prostitute Lust bonus = **+5**;
- arbitrary earned subsets are selectable;
- selectable unit is the whole profession package;
- no one-package capacity;
- no Keystone/Specialist slot usage.

Fresh D46 + selected Prostitute proof:

`Lust 5 -> finishCreation -> Lust 10`

Merchant proof:

- selected Merchant applies Reason +5 and Sociability +5;
- money remains 600.

---

## 7. Package timing / reload gate

For representative one-stat, two-stat, and Prostitute packages:

1. permanent earned state alone -> no current stat/Lust effect;
2. select during creation -> still no effect before `finishCreation`;
3. `finishCreation` -> apply package atomically once;
4. save/load -> no second application;
5. second save/load -> still no replay;
6. earn another Hard Work ending later in same life -> current active package snapshot does not change;
7. next new life -> newly earned package becomes selectable;
8. old already-complete creation -> D47 map is not retroactively applied.

Strong Meta ordering must remain:

```text
resolve Strong Meta snapshot
-> resolve effective stat cap
-> apply selected Hard Work packages
-> freeze package state
-> creation complete
-> evaluate Palace D23
```

At stat 98 / cap100 / +5 -> 100.

At stat 198 / cap200 / +5 -> 200.

Never scale +5 because the cap is 200.

---

## 8. Ten-career Hard Work lifecycle gate

For each of the ten ordinary careers, execute the same lifecycle skeleton:

- 49 completed ordinary shifts -> Hard Work ending not completed;
- valid 50th ordinary shift -> `completed_shifts == 50`;
- exact `ending.<career>.hard-work` becomes eligible;
- run remains non-terminal until explicit ending commit;
- explicit commit required;
- explicit `completeEnding` required;
- one RunResult transaction;
- one deduped `hardWork:<career>` permanent identity;
- package does not activate in that earning life;
- package is selectable only in later creation.

No advanced D40/D41 ending may be fabricated by the Hard Work threshold.

---

## 9. Lumber retirement / historical +1 Energy gate

### Live surface

Assert:

- live `lumber-stay` ending absent;
- no new-play `vitality` acquisition;
- no live `ending/lumber-stay` presentation/source binding;
- modern Lumber endings remain:
  - `ending.lumber.hard-work`
  - `ending.lumber.forewoman`
  - `ending.lumber.forest`.

### Historical evidence matrix

Test independently and in combinations:

- completed historical `lumber-stay`;
- old `vitality`;
- existing `legacy.lumber-stay.vitality`;
- duplicate/composite evidence;
- profile merge containing equivalent evidence.

Required normalized output:

- exactly one `legacy.lumber-stay.vitality`;
- live `vitality` ownership removed from the modern generic unlock list;
- historical completed identity retained as compatibility evidence where applicable;
- no modern ending fabricated;
- no `hardWork:lumber`;
- no Strong Meta ownership;
- no Palace D23 credit.

### Energy exactly once

With no other Energy bonus:

- base Energy 3 -> effective/start Energy **4**.

After repeated parse/reload/profile merge:

- still **4**, never 5/6 from duplicate historical evidence.

With legitimate Strong Meta Energy:

- legacy +1 and Strong Meta contribution both coexist;
- neither source overwrites the other.

Camp/Activity must never replay the legacy +1 as a separate reward.

---

## 10. Canonical 40 ordinary-ending gate

Identity-check the canonical ordinary set:

```text
10 Hard Work endings
+ 14 D41 advanced endings
+ 16 D40 advanced endings
= 40 canonical ordinary endings
```

Required:

- all 40 identities present;
- no canonical identity duplicated;
- live `lumber-stay` absent;
- historical `lumber-stay` is compatibility-only;
- `ending.lumber.forewoman` present;
- `ending.lumber.forest` present.

Do not use total live ending count as the only proof.

On the present preassembly main, retirement would make total 43 -> 42, but a later assembled base may legitimately contain additional non-ordinary endings. The invariant is the **40 canonical ordinary identities**, not a hard-coded global 42.

---

## 11. Strong Meta isolation gate

Assert:

- Hard Work package activation does not mutate `meta.strongMeta.ownership.ownedRewardIds`;
- legacy lumber perk does not enter Strong Meta registry/ownership;
- Keystone capacity remains **1**;
- Specialist capacity remains **2**;
- preferred Strong Meta selections survive migration/profile merge;
- D47 packages use the already-resolved cap but do not mutate the Strong Meta snapshot;
- Earned Reserve Match consumes the actual assembled D46 ordinary wage;
- Earned Reserve Match remains suppressed when the Secret Debt bound flag applies.

Expected numeric interaction is allowed:

higher D46 wage -> higher eligible match input, subject to existing Strong Meta caps.

---

## 12. Secret Debt isolation gate

Run when Secret Debt/D51 is present on the assembled branch.

Required:

- while bound, all ten ordinary career shifts are unavailable;
- existing ordinary career progress is preserved;
- hidden work never increments ordinary `completed_shifts`;
- hidden work never grants `hardWork:<career>`;
- hidden work remains outside D46 ordinary cap 120;
- accepted hidden-work absolute wage cap remains **140**;
- Earned Reserve Match does not match bound hidden work;
- Secret Debt ending identities never count as ordinary packages or Palace D23 careers;
- exiting Secret Debt resumes preserved ordinary progress without replay.

Night/Energy:

- Secret Debt forced Night preempts voluntary ordinary Night when authoritative conditions require it;
- bound forced-Night next-day Energy penalty remains owned by Secret Debt/D51;
- D51 Street + bound-Night compatibility remains provenance-gated;
- legacy lumber +1 is unrelated Energy and never becomes a D51 provenance tag;
- no global Energy floor is introduced.

Fresh D46/D47 Lust may legitimately affect later numeric thresholds, but Secret Debt thresholds must not be rewritten to compensate.

---

## 13. Palace isolation gate

At minimum run D23 adjacency.

Required D23 identity cases:

- 10 permanent earned / 10 active packages -> qualified;
- 10 permanent / 9 active -> not qualified;
- 9 permanent / 10 selected attempt -> not qualified/invalid under ownership rules.

Never count as additional Palace identities:

- D47 stat components;
- Prostitute Lust +5;
- `legacy.lumber-stay.vitality`;
- Strong Meta rewards;
- Secret Debt endings;
- Activity/D38 endings.

D24:

- only changes effective stat cap;
- D47 values remain +5;
- Lust is not a 13th Palace progression stat.

If full Palace is present, assert its wage/duty/support paths are not routed through D46 ordinary shift cap and do not earn ordinary Hard Work progress.

---

## 14. Activity isolation gate

Current baseline already has 2-Energy Activity entries. Required after assembly:

- Activity entry Energy cost remains **2** for current authoritative activities;
- entry cost is committed once;
- reload does not repay entry Energy;
- Activity state remains isolated in its envelope;
- ordinary D47 packages do not directly create Activity result/ending proof;
- Activity does not grant ordinary `hardWork:<career>`;
- legacy lumber +1 may increase available daily Energy only;
- legacy +1 does not become Activity Field Time.

If Camp is present:

- Camp refreshes Field Time only;
- Camp does not refresh daily Energy;
- Camp does not reapply legacy +1;
- Camp does not rerun Hard Work package application.

If D38 is present:

- D38 Specialist rewards remain Strong Meta rewards;
- D38 identities do not become ordinary package identities.

---

## 15. D42 Night preservation gate

D42 is already in the current architecture.

Required after assembly:

- NightFlow save state still parses;
- current Night content remains present;
- ordinary wage edits do not rename/delete Night event identities;
- retirement does not remove unrelated Night localization/presentation;
- Hard Work package application does not auto-resolve Night content;
- Activity/Night mutual exclusion remains valid.

Any D42 regression is a tranche stop.

---

## 16. Save / migration / transaction gate

Required regression cases:

- schema1/2/3/4/5 migration chain still reaches schema6;
- existing schema6 save round-trips;
- D40 selected-route repair remains;
- D41 compatibility remains;
- Strong Meta migration/snapshot/runtime remains;
- D42 NightFlow state remains valid;
- current Activity envelope save validation remains;
- retired lumber historical evidence normalizes before live ending reference validation;
- historical ended pre-RunResult case gets deterministic compatibility proof without reward replay;
- existing historical RunResult transaction identity remains stable;
- repeated load is idempotent;
- profile merge dedupes normalized legacy perk;
- package application proof does not replay;
- duplicate Meta transaction proof remains invalid.

---

## 17. Minimum explicit assertions Chat 2 must report

The final focused QA report must explicitly state PASS/FAIL for all of these, even if covered inside larger suites:

1. fresh Lust = 5;
2. existing Lust preserved;
3. starting money = 600;
4. base Energy = 3;
5. Lumber wage base = 35;
6. other nine ordinary wage bases = 37;
7. ordinary final wage cap = 120;
8. exact ten D47 package identities/map;
9. Prostitute package makes fresh Lust 5 -> 10;
10. packages apply exactly once;
11. no Strong Meta slot use by packages;
12. live lumber-stay absent;
13. historical lumber Energy = +1 exactly once;
14. historical lumber does not grant modern Hard Work/Palace credit;
15. exactly 40 canonical ordinary endings;
16. D42 Night preserved;
17. Secret Debt isolation PASS when present;
18. Palace D23/D24 isolation PASS;
19. Activity isolation PASS;
20. schema6/save/reload/profile-merge idempotence PASS.

---

## 18. Stop conditions

Do not proceed to the normal full-CI lane if any focused assertion is red, skipped without an authoritative replacement, or only inferred statically when executable coverage is available.

Hard stops include:

- Lust migration rewrite;
- money/Energy baseline drift;
- wrong 35/37 bases;
- ordinary wage >120;
- non-ordinary wage captured by D46;
- wrong D47 package map;
- package replay/same-life activation;
- Strong Meta slot/capacity drift;
- live lumber-stay/vitality acquisition;
- historical Energy stacking;
- historical -> modern Lumber identity conversion;
- canonical ordinary ending count != 40;
- D42 Night regression;
- Secret Debt hidden-work/cap/career-lock regression;
- Palace D23 identity regression or Palace wage captured by ordinary cap;
- Activity entry/reload/Field-Time regression;
- schema6 downgrade/fork;
- lost RunResult transaction proof or duplicate reward application.

## Disposition

This v37 gate is intentionally focused and executable. It is the required proof immediately after selective assembly and before Chat 2's normal full-CI lane.

Chat 4 does not run full CI in this bundle.

**v37 COMPLETE**

**BUNDLE_COMPLETE — READY_FOR_CHAT2_ASSEMBLY**
