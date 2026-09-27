# Poverty Production False-Green Sentinel Plan v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance

## Purpose

Prevent ordinary lodging primitives, QA fixtures or guessed balance values from being misreported as completed poverty/Secret Debt product content.

This plan adds no production code.

---

# Sentinel 1 — lodging primitives are not full poverty content

Current production already has:

- normal lodging;
- cheap lodging;
- street lodging;
- street penalty;
- NightFlow.

That proves the housing/Night foundation.

It does **not** prove:

- street event pool;
- recovery economy;
- lender encounter;
- Secret Debt;
- hidden Slave career;
- poverty endings.

## QA reporting rule

Any readiness/handoff that says:

`poverty implemented`

must show real authored poverty content beyond the lodging ladder.

Otherwise classify:

**RUNTIME/FOUNDATION READY — CONTENT OPEN**

---

# Sentinel 2 — zero-money anti-softlock is necessary but not sufficient

A test proving:

```text
money=0
-> street sleep
-> next day
-> starting Lumber shift
```

is valid anti-softlock evidence.

It does not prove:

- a meaningful poverty life;
- multiple street outcomes;
- Secret Debt;
- recovery route breadth.

## False-green check

Reject wording that upgrades anti-softlock to:

`full poverty pass`.

---

# Sentinel 3 — fixture-only lender state is not reachable Secret Debt

Future tests may construct:

- lender pending state;
- accepted debt state;
- active hidden career state

to test parser/runtime behavior.

Such fixture setup proves only that the state model/commands work.

Natural Secret Debt reachability requires:

```text
street sleep
-> real lender trigger
-> player accept
-> persisted delay
-> actual activation
```

## QA rule

If a test directly seeds:

- lender accepted;
- debt amount;
- activation day;
- hidden Slave active

classify it:

**FIXTURE / RUNTIME EVIDENCE**

not:

**NATURAL PRODUCT PASS**

---

# Sentinel 4 — guessed lender chance must never become Product truth

The design requires a rare/exceptional lender encounter.

If exact probability is still open:

- tests may parameterize a synthetic chance;
- deterministic fixtures may force the trigger;
- docs may describe the encounter as rare.

They must not write a numeric chance into production acceptance unless Product authority locks it.

## Detection

Search new poverty packages/tests for constants such as:

- 5%;
- 10%;
- 1/20;
- 1/10

and verify every exact probability has authority.

No authority:

**BLOCKED_QA_SELECTED_BALANCE**

---

# Sentinel 5 — guessed debt values must never become Product truth

Design examples currently use approximate values.

QA must not convert:

- lender immediate benefit;
- future debt;
- payment threshold

into canonical constants merely because a fixture needs numbers.

## Test discipline

Use named parameters:

```text
LENDER_BENEFIT
DEBT_AMOUNT
DEBT_ACTIVATION_DELAY
```

resolved from production definitions.

For isolated fixtures, label values explicitly:

`TEST_ONLY_NON_CANONICAL`.

---

# Sentinel 6 — activation delay must be authored, not inferred

The draft currently describes delayed activation and an approximate/current candidate delay.

Future QA should verify:

- exact production delay from content;
- boundary before activation;
- activation once;
- save/reload stability.

It must not choose a delay if Product/balance has not locked it.

---

# Sentinel 7 — blocked ordinary jobs must preserve saved progression

When Secret Debt activates:

- ordinary jobs become unavailable;
- their existing typed progress remains stored.

False implementation risk:

```text
activate debt
-> reset ordinary career
```

or:

```text
remove career state to make it unavailable
```

## Future sentinel

Before activation:

- earn progress in at least two ordinary careers;
- snapshot stage/counters/facts.

After activation:

- verify ordinary work is blocked;
- verify snapshots unchanged.

After release:

- verify work becomes available again;
- verify old progression resumes.

Save/reload at each boundary.

---

# Sentinel 8 — blocked career must not progress reactively

Availability lock must apply not only to UI buttons.

While Secret Debt lock is active:

- Resolver must not silently advance a blocked ordinary career due to external facts/events unless the design explicitly allows a non-work reaction.

Future tests should define the exact rule.

At minimum, a blocked job must not gain ordinary Work progression merely because unrelated state changes.

---

# Sentinel 9 — Secret Debt must not count toward Palace 10/10

Locked rule:

Palace requires Hard Work on all 10 ordinary careers.

Hidden careers do not count.

## Future sentinel

Prepare Meta with:

- 9 unique ordinary Hard Work completions;
- one or more Secret Debt endings.

Assert:

- Palace locked.

Add the missing 10th ordinary Hard Work.

Assert:

- Palace unlocks.

Repeat with:

- Bound Life;
- Paid Freedom;
- Takeover

as hidden endings.

None substitutes for an ordinary Hard Work.

---

# Sentinel 10 — voluntary Prostitute career must remain distinct

False-closure risk:

reuse Secret Debt work/content and call voluntary Prostitute career implemented.

QA must assert semantic separation:

## Prostitute

- voluntary entry;
- ordinary career availability;
- player-controlled work;
- own career progression;
- can leave under normal career rules.

## Secret Debt / Slave

- hidden;
- debt-triggered;
- ordinary careers blocked during active lock;
- forced Night obligation;
- distinct outcomes.

Shared presentation/assets may be reused.

Gameplay identity/state must remain separate.

---

# Sentinel 11 — forced Night is not just media

A GIF/text scene showing debt Night work does not prove the mechanic.

Real implementation requires:

- forced Night priority;
- voluntary choices blocked as designed;
- exact next-day modifier;
- persistent hidden-career progression;
- save/reload;
- one calendar advance.

## False-green rule

Media presence without NightFlow state/effects = **PRESENTATION_ONLY**, not product completion.

---

# Sentinel 12 — lender media is not lender gameplay

A presentation slot such as:

`night/street/lender/...`

does not prove:

- eligibility;
- one-time encounter;
- accept/refuse persistence;
- benefit grant;
- delayed activation.

QA should always pair presentation evidence with state/command evidence.

---

# Sentinel 13 — ordinary poverty remains independent of Secret Debt

Future poverty suite must contain a path where:

- player reaches zero/low money;
- uses street/cheap housing;
- lender never appears or is refused;
- run continues;
- player recovers.

If every poverty test enters Secret Debt, the suite creates a false impression that Secret Debt is ordinary poverty.

---

# Sentinel 14 — street content pool must be real authored content

At least one future production test should execute real street events from the production catalog.

Do not claim a street event pool exists because:

- generic Resolver can host events;
- a fixture event exists;
- one lender event exists.

Ordinary poverty needs its own non-Secret-Debt content.

---

# Sentinel 15 — exact street penalty remains authority-driven

Current production test may protect structural facts such as:

- street is free;
- street has a downside;
- enough recovery remains for anti-softlock.

If the exact Energy/Grooming penalty is still balance-open, avoid assertions that freeze it unless Product/balance locks it.

When locked, move it into exact contract tests.

---

# Sentinel 16 — outcome families are distinct

Secret Debt requires three outcome families:

- Paid Freedom;
- Bound Life;
- Takeover.

Future false-green risks:

- one ending with three labels;
- same eligibility state reused for all;
- takeover reached by simply paying debt;
- Bound Life auto-earned from any active-debt day.

QA must prove mechanically distinct prerequisites.

---

# Sentinel 17 — ending eligibility is not release from lock unless authored

Future implementation must define the exact moment the job lock clears.

Possible moments depend on accepted content:

- payment transaction;
- route resolution;
- ending completion;
- another explicit state transition.

QA must not assume eligibility alone clears debt restrictions.

---

# Sentinel 18 — fixture values never migrate into docs as locks

When reviewing new docs, search for exact values introduced first in tests.

For each value ask:

1. Is this in a locked/Product authority document?
2. Is it only in a test fixture?
3. Is it a current production candidate but still open?

If #2 or open #3:

do not copy it into:

- acceptance criteria;
- release gate;
- Product decision ledger

as accepted truth.

---

# Minimum future false-green audit table

Every poverty/Secret Debt production PR should include:

| Risk | Evidence |
|---|---|
| lodging != full poverty | explicit status wording |
| lender naturally reachable | real production trigger test |
| chance authority | source identified or remains parameterized |
| debt amount authority | source identified or remains parameterized |
| ordinary career progress preserved | pre/active/post-lock test |
| Palace exclusion | Meta test |
| media != mechanics | state/effect assertions |
| ordinary poverty independent | non-debt poverty path |
| three outcomes distinct | separate eligibility/transaction tests |

---

# Reporting classes

Use:

- **FOUNDATION_GREEN**
- **CONTENT_OPEN**
- **HUMAN_DECISION_BLOCKED**
- **FIXTURE_RUNTIME_EVIDENCE**
- **NATURAL_REACHABILITY_PROVEN**
- **INTEGRATED_AND_TESTED**

Do not collapse them into one “poverty done” label.

No production runtime/UI/content file was modified by Chat 4.
