# Starter Trio Production Scope Audit v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Baseline: current main after merged PR34  
PR34 head: `5f1bd3e644a00ed6c65f67511564e2414de09e5a`  
PR34 merge: `712ab6c7368ab21906f3fcb0184b35d4f3e1411c`  
Observed PR-head CI: **227/227 PASS**

## Purpose

Compare the actual shipped starter-career production scope after PR34.

Starter trio:

1. Lumber
2. Satyr Maid
3. Undead Farm

This audit distinguishes:
- shipped target production behavior;
- still-missing content depth;
- Hard Work state.

---

# 1. Actual shipped target actions

Current production includes:

## Lumber
`lumber.shift`

## Satyr Maid
`satyr-maid.shift`

## Undead Farm
`undead-farm.shift`

All three are current target-style Work actions.

Legacy prototype actions elsewhere in the catalog are not counted as target starter-career completion.

---

# 2. Energy cost

All three target shifts cost:

`1 current-day Energy`

This remains the shared ordinary Work action baseline.

Current regression coverage explicitly checks Satyr Maid and Undead Farm.

Lumber is already covered by the existing Lumber production suite.

Classification:

**SHIPPED / TESTED**

---

# 3. Typed career state

## Lumber

Typed career:

`lumber`

Current shipped early stages:
- `newcomer`
- `accepted-hand`

Current first transition:
- `accept-hand`

Lumber has deeper cross-system production than the other two starters.

## Satyr Maid

Typed career:

`satyr-maid`

Current shipped stages:
- `new-maid`
- `known-face`

Current transition:
- `first-shift`

Current fact:
- `first-shift-complete`

## Undead Farm

Typed career:

`undead-farm`

Current shipped stages:
- `new-hand`
- `reliable-helper`

Current transition:
- `first-shift`

Current fact:
- `first-shift-complete`

Classification:

**ALL THREE HAVE TARGET TYPED CAREER STATE**

Depth is not equivalent across the three.

---

# 4. Typed completed-shifts progress

All starter careers use typed:

`completed_shifts`

under their own career owner.

This is the correct progression owner.

Do not regress future starter work to:
- generic `actionCounts`;
- legacy flags;
- another career's counter.

Classification:

**SHIPPED / TESTED**

---

# 5. Seasonal presentation

## Lumber

Current Lumber shift has four seasonal scenes and seasonal stat packages.

## Satyr Maid

Current seasonal semantic slots:

- `job/satyr-maid/shift/spring/default`
- `job/satyr-maid/shift/summer/default`
- `job/satyr-maid/shift/autumn/default`
- `job/satyr-maid/shift/winter/default`

Result:
- `job/satyr-maid/result/default`

Current media reuse:
- `stage.tavern.spring`
- `stage.tavern.summer`
- `stage.tavern.autumn`
- `stage.tavern.winter`

## Undead Farm

Current seasonal semantic slots:

- `job/undead-farm/shift/spring/default`
- `job/undead-farm/shift/summer/default`
- `job/undead-farm/shift/autumn/default`
- `job/undead-farm/shift/winter/default`

Result:
- `job/undead-farm/result/default`

Current media reuse:
- `stage.hunt.spring`
- `stage.hunt.summer`
- `stage.hunt.autumn`
- `stage.hunt.winter`

Media reuse is presentation fallback only.

Gameplay identity stays distinct through semantic presentation IDs.

Classification:

**SHIPPED / TESTED**

---

# 6. Save/reload

PR34 regression proves for Satyr/Farm:

```text
started
-> real target shift
-> counter/stage/fact/presentation
-> parseSave reload
-> same typed progress and semantic identity
```

Lumber already has broader save/reload coverage across:
- shift;
- milestones;
- Foreman;
- Night;
- Forest;
- ending/Meta.

Classification:

**ALL THREE HAVE MINIMUM TARGET SAVE/RELOAD**

Lumber remains much deeper.

---

# 7. Wage/stat tuning

Satyr Maid and Undead Farm now have initial production wage/stat baselines.

These are shipped implementation values.

They are **not locked Product constants** merely because they are in production.

The PR/test intentionally avoids exact-value assertions for those tunable values.

Classification:

**SHIPPED BASELINE / BALANCE TUNABLE**

---

# 8. Hard Work state

## Lumber

Hard Work is fully authored and locked:

`ending.lumber.hard-work`

Exact eligibility:

```text
careerCounter(lumber, completed_shifts) >= 50
```

Exact reward:

`hardWork:lumber`

No extra prerequisite.

Classification:

**SHIPPED / LOCKED / TESTED**

## Satyr Maid

Current production contains no:

`ending.satyr-maid.hard-work`

No exact Satyr Maid Hard Work threshold is approved.

No exact Satyr Maid Hard Work Meta reward is approved.

Classification:

**NOT AUTHORED — DO NOT INVENT**

## Undead Farm

Current production contains no:

`ending.undead-farm.hard-work`

No exact Undead Farm Hard Work threshold is approved.

No exact Undead Farm Hard Work Meta reward is approved.

Classification:

**NOT AUTHORED — DO NOT INVENT**

---

# 9. Lumber content depth

Current Lumber production already includes substantially more than a starter skeleton:

- target Work;
- seasonal variants;
- career milestone;
- Foreman relationship;
- Foreman Night;
- School consumer seam;
- item capability/Forest route interaction;
- Forest Activity;
- Forest return continuation;
- three Lumber ending definitions;
- exact Hard Work;
- one-Save E2E;
- semantic presentation.

Still open:
- fuller career state-machine depth;
- School management provider authoring;
- Old Boundary Token natural acquisition/policy;
- full Forest content depth;
- richer final presentation.

Classification:

**INTEGRATED DEEP VERTICAL / CONTENT DEPTH OPEN**

---

# 10. Satyr Maid content depth still missing

Current PR34 scope is only the first target production layer.

Still not shipped:

- deeper career stages;
- recurring customer/staff relationship network;
- Night/after-hours career content;
- School hooks;
- item/service capabilities;
- meaningful cross-system public results;
- complex endings;
- Hard Work ending;
- bespoke final media;
- broader UI/product acceptance smoke beyond the target shift.

Classification:

**TARGET SKELETON SHIPPED / CAREER DEPTH OPEN**

---

# 11. Undead Farm content depth still missing

Still not shipped:

- deeper career stages;
- farm production/research/anomaly content;
- major relationships;
- School-driven farm progression;
- item/sample/tool catalog;
- Activity/expedition feedback loop;
- complex endings;
- Hard Work ending;
- bespoke final media;
- broader natural-path integration tests.

Classification:

**TARGET SKELETON SHIPPED / CAREER DEPTH OPEN**

---

# 12. Starter-trio asymmetry is intentional

After PR34 the starter careers are not equally complete.

## Lumber
Reference vertical proving the broader architecture.

## Satyr Maid
Production skeleton proving:
- target Work;
- typed career;
- seasons;
- save/reload;
- presentation.

## Undead Farm
Production skeleton proving the same baseline.

Do not report:
“all three starter careers are fully implemented.”

Correct statement:
“all three now have target production Work/career foundations; only Lumber currently has the deeper cross-system vertical.”

---

# 13. Regression floor

Retain:

- `starter-trio-target-careers.test.ts`
- Lumber production/PA tests;
- one-Save RC tests;
- exact Hard Work sentinels.

Current observed PR34 head:

**227/227 PASS**

Future count may grow.

Do not preserve 227 as a fixed Product requirement.

Preserve the behavior contracts.

---

# Final matrix

| Surface | Lumber | Satyr Maid | Undead Farm |
|---|---|---|---|
| target shift | **YES** | **YES** | **YES** |
| 1 Energy | **YES** | **YES** | **YES** |
| typed completed_shifts | **YES** | **YES** | **YES** |
| typed early stage | **YES** | **YES** | **YES** |
| seasonal semantic presentation | **YES** | **YES** | **YES** |
| save/reload | **YES** | **YES** | **YES** |
| relationship production | **YES** | **NO** | **NO** |
| Night career content | **YES** | **NO** | **NO** |
| School career hook | **PARTIAL** | **NO** | **NO** |
| item/Activity career hook | **YES/PARTIAL** | **NO** | **NO** |
| complex endings | **YES/PARTIAL** | **NO** | **NO** |
| Hard Work authored | **YES** | **NO** | **NO** |
| full career depth | **NO** | **NO** | **NO** |

No Satyr Maid or Undead Farm Hard Work threshold was invented by this audit.

No production runtime/UI/content file was modified by Chat 4.
