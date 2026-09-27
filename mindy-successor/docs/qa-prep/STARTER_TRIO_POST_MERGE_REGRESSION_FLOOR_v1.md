# Starter Trio Post-Merge Regression Floor v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
PR34 status: **MERGED / CI GREEN**  
PR34 head: `5f1bd3e644a00ed6c65f67511564e2414de09e5a`  
Merge commit: `712ab6c7368ab21906f3fcb0184b35d4f3e1411c`  
Exact-head CI: **227/227 PASS**

## Purpose

Define the retained regression floor for the three starter careers now that target Satyr Maid and Undead Farm shifts have merged alongside Lumber.

This floor protects the current starter production layer without inventing future Hard Work contracts for Satyr Maid or Undead Farm.

---

# Shared starter-career floor

For:

- Lumber
- Satyr Maid
- Undead Farm

retain executable evidence for the following.

## 1. Action availability after arrival

After normal creation/arrival completion:

- target shift action exists in production catalog;
- action can execute through the normal engine command surface;
- no test-only career activation fact is required.

Current target IDs:

- `lumber.shift`
- `satyr-maid.shift`
- `undead-farm.shift`

A future UI smoke should also keep all shipped starter actions reachable through normal product UI.

---

# 2. Exactly 1 current-day Energy

Each starter target shift must cost:

`1 Energy`

per real Work command.

Retain assertions:

```text
Energy before = E
dispatch real shift
Energy after = E - 1
```

Do not replace with a hard-coded starting Energy expectation if global balance changes.

The invariant is the per-shift delta.

---

# 3. Typed completed-shifts progression

Every target shift must increment only its own typed career counter:

`completed_shifts += 1`

Required owners:

- Lumber -> `progression.careers.lumber`
- Satyr Maid -> `progression.careers.satyr-maid`
- Undead Farm -> `progression.careers.undead-farm`

Do not regress to:

- generic actionCounts;
- legacy flags;
- cross-career counter writes.

---

# 4. Early career-state transition where shipped

## Lumber

Current early production progression:

```text
newcomer
-> accepted-hand
```

with the existing Lumber milestone/Foreman reactive chain.

## Satyr Maid

Current first target shift:

```text
new-maid
-> known-face
```

and:

`first-shift-complete`

career fact.

## Undead Farm

Current first target shift:

```text
new-hand
-> reliable-helper
```

and:

`first-shift-complete`

career fact.

Retain save/reload evidence for these typed stages.

---

# 5. Seasonal semantic presentation

Each starter career must keep season-aware Work presentation separate from gameplay identity.

## Lumber

Retain current Lumber season slots.

## Satyr Maid

Retain semantic slots:

- `job/satyr-maid/shift/spring/default`
- `job/satyr-maid/shift/summer/default`
- `job/satyr-maid/shift/autumn/default`
- `job/satyr-maid/shift/winter/default`
- `job/satyr-maid/result/default`

## Undead Farm

Retain:

- `job/undead-farm/shift/spring/default`
- `job/undead-farm/shift/summer/default`
- `job/undead-farm/shift/autumn/default`
- `job/undead-farm/shift/winter/default`
- `job/undead-farm/result/default`

Media reuse is allowed.

Semantic ID collision is not.

---

# 6. Save/reload

For each starter career keep one minimal path:

```text
arrived
-> real target shift
-> typed counter/stage updated
-> semantic presentation identity recorded
-> save/reload
-> same counter/stage/presentation identity
```

Reload must not:

- spend a second Energy;
- increment a second shift;
- repeat the first-stage transition;
- change season/result semantic identity.

---

# 7. Lumber reactive regression floor

Lumber remains the deeper starter reference slice.

Retain:

- first-shift milestone;
- Foreman notice;
- professional route;
- Foreman Night;
- Forest bridge;
- endings;
- one-Save reload.

New starter career work must not weaken these existing paths.

---

# 8. No guessed Satyr/Farm Hard Work

Current production intentionally has no:

- `ending.satyr-maid.hard-work`
- `ending.undead-farm.hard-work`

and no accepted exact Hard Work thresholds/rewards for those careers.

Regression floor must assert absence only while those Product contracts remain unauthored.

When Product later locks them:

- replace absence assertion with exact accepted contracts;
- record supersession explicitly;
- do not copy Lumber's value 50 automatically.

---

# 9. Lumber Hard Work remains exact

Retain permanent exact sentinel:

```text
ending.lumber.hard-work
condition:
  careerCounter(lumber, completed_shifts) >= 50

Meta reward:
  hardWork:lumber
```

No Satyr/Farm progression may become a Lumber prerequisite.

---

# 10. Wage/stat baseline remains tunable

Current Satyr/Farm wage weights and seasonal stat packages are production baselines.

They are not locked Product constants merely because they shipped.

Regression tests should protect:

- schema validity;
- intended stat family;
- seasonal differentiation;
- transaction behavior.

Avoid exact-value assertions unless Product/balance later locks those values.

---

# 11. Presentation fallback

Current reused media is valid:

- Satyr Maid may reuse Tavern seasonal media;
- Undead Farm may reuse Hunt seasonal media.

Retain:

- distinct semantic IDs;
- fallback validity;
- missing-media nonfatal behavior;
- Animation Off mechanics equivalence.

Do not require bespoke GIFs for the starter production floor.

---

# 12. Full-suite floor

Observed PR34 exact-head:

**227 tests / 227 pass / 0 fail**

This is the current observed starter-trio integration floor at PR34 head.

Future suite counts may increase.

The invariant set above matters more than preserving the number 227 forever.

---

# Minimum named retained test

Current primary starter target test:

`tests/starter-trio-target-careers.test.ts`

It should continue proving:

- both new target shifts exist;
- 1 Energy;
- typed progression;
- first-stage transition;
- save/reload;
- seasonal semantic presentation;
- no guessed Satyr/Farm Hard Work;
- Lumber Hard Work exact.

Lumber-specific deeper tests remain required separately.

---

# Post-merge status

PR34 is already merged and both:

- exact PR-head CI;
- merge push CI

are successful.

Therefore this is now a current retained-floor definition, not a hypothetical pre-merge draft.

No production runtime/UI/content file was modified by Chat 4.
