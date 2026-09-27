# Post-Merge Poverty Regression Floor Plan v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Current main at authoring: `5394dfba8d57413dbf2132cfebb522228c7d9f47`  
PR29 status at authoring: **OPEN / NOT MERGED**  
PR29 head: `bdd26e6dbfcd8feaf207b89a304efc8cc42bb225`

## Purpose

Define the minimal ordinary-poverty regression floor to retain **if PR29 is later validated and merged**.

This plan does not claim PR29 is currently merged or that executable CI has passed.

---

# Required retained floor after merge

## 1. Lodging ladder structure

Retain a production-catalog test that proves:

- normal lodging exists;
- cheap lodging exists;
- street lodging exists;
- normal and cheap cost money;
- cheap costs less than normal;
- street costs zero.

Do not freeze exact paid-lodging values unless Product/balance authority explicitly locks them.

---

## 2. Street penalty exists

Retain a structural assertion that street sleep has a real downside.

Acceptable forms:

- negative next-day Energy delta;
- negative accepted next-day stat effect;
- another explicitly authored penalty.

Do not freeze an exact penalty while that value remains balance-open.

---

## 3. Zero-money street continuation

Retain one natural production path:

```text
valid run
-> money = 0 boundary setup
-> endDay
-> choose lodging.street
-> reload
-> finish Night
-> next day continues
```

The purpose is anti-softlock.

This proves zero money does not hard-stop the run.

It does not prove full poverty content.

---

## 4. Starting-job recovery

After street sleep, retain a proof that at least one starting ordinary Work action remains reachable.

Current representative:

`lumber.shift`

Required:

- action available/executable;
- required Energy remains non-negative;
- typed career progress increments normally.

Do not require Lumber specifically forever if a more generic starter-job sentinel replaces it; name the replacement explicitly.

---

## 5. School Night-study exclusion on street

Retain a production-catalog test that:

- selects street lodging;
- attempts a real `school.night_study.*` choice;
- verifies it is unavailable/rejected.

This protects the intended housing requirement without hard-coding fixture-only Night choices.

---

## 6. Save/reload around street lodging

Retain reload at the committed lodging boundary.

Required:

```text
choose lodging.street
-> save/reload
-> money remains unchanged
-> lodging remains street
-> payment/selection does not replay
-> Night continues normally
```

For street lodging, the key exactly-once property is that no later reload invents a payment or duplicate penalty.

---

# What this floor must not claim

Even after PR29 merges, this retained floor does **not** prove:

- authored street event pool;
- lender encounter;
- Secret Debt reachability;
- delayed debt activation;
- hidden Slave career;
- forced debt Night;
- poverty endings;
- full recovery-economy depth.

Those require separate production packages.

---

# Open balance protection

The retained floor should prefer relational/structural assertions over exact values where values remain open.

Good:

```text
cheap < normal
street == 0
street has a negative consequence
next day still allows recovery
```

Avoid unless locked:

```text
normal == 100
cheap == 50
street Energy == -1
```

---

# Integration evidence required before adding PR29 to the floor

PR29 may enter the retained regression floor only after Git/CI proves:

1. PR merged into main;
2. exact merge/integration SHA identified;
3. required project check executed;
4. test passes on that exact integrated state;
5. no production runtime/content/UI drift introduced.

At authoring time these conditions are **not yet proven**.

---

# Minimum named poverty floor after merge

Recommended retained test set:

1. PR29 production poverty contract test;
2. existing NightFlow lodging/reload suite;
3. any future natural ordinary-poverty content smoke;
4. future Secret Debt suite kept separate from ordinary-poverty floor.

Do not let a later Secret Debt implementation replace the ordinary-poverty anti-softlock tests.

---

# Supersession rule

A future stronger test may replace PR29's specific test only if it preserves all five required behaviors:

- lodging ladder;
- free-but-costly street;
- zero-money continuation;
- School Night-study street exclusion;
- starting-job recovery;
- street lodging reload.

Record the replacement explicitly rather than silently deleting coverage.

---

# Final current status

PR29 is currently:

**OPEN / NOT MERGED**

Therefore this document is a **post-merge floor plan**, not current merged evidence.

No production runtime/UI/content file was modified by Chat 4.
