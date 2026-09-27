# Poverty / Secret Debt QA Contract Map v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Status: future QA contract map  
Scope authority:
- `ECONOMY_AND_POVERTY_DRAFT_v0.md`
- `HOUSING_AND_NIGHT_BALANCE_v1.md`
- `POVERTY_HIDDEN_CAREER_DRAFT_v0.md`
- `PALACE_HIDDEN_CAREER_DRAFT_v0.md`
- `USER_DECISIONS_LOCKED_v1.md`

## Purpose

Define future executable QA coverage for ordinary poverty and the Secret Debt / Slave hidden career without locking still-open balance values.

All open numbers must remain parameters resolved from accepted production content.

---

# 1. Zero-money anti-softlock

## Contract

A valid active run with:

`money = 0`

must still have at least one reachable legal path to continue playing and eventually earn resources.

Required invariants:

- at least one basic starting job remains usable without money/item prerequisites;
- street sleep remains available;
- street sleep advances to the next day;
- no required lodging payment can hard-stop the run;
- Secret Debt is not required for recovery.

## Future tests

### Case A — zero money before daytime choice

Prepare a valid run with zero money.

Assert:

- at least one ordinary earning action is available;
- action does not require buying an item first;
- successful work changes resources through the normal transaction path.

### Case B — zero money at Night

Assert:

- paid lodging may be unavailable;
- street/no-lodging option remains available;
- Night can finish;
- next day starts.

### Negative case

Reject any production package that makes:

```text
0 money
-> no work
-> no sleep
-> no day advance
```

possible.

## Open values

Do not hard-code:

- exact wages;
- exact paid-lodging price;
- exact street Energy penalty

unless locked in accepted production content.

---

# 2. Street sleep continuation

## Contract

Street sleep is intentionally bad but playable.

Expected categories:

- zero money cost;
- explicit next-day penalty;
- restricted Night options;
- street/poverty event pool;
- Secret Debt lender chance when eligible.

Current balance candidate:

- next-day Energy base minus one;
- Grooming penalty.

Those values remain subject to the accepted balance contract.

## Future tests

Assert one street night:

- charges no money;
- advances exactly one day;
- applies the accepted next-day penalty exactly once;
- applies accepted street-state effects exactly once;
- persists through reload before and after StartDay;
- does not permanently corrupt normal housing availability.

Reload must not duplicate street penalties.

---

# 3. One-time lender encounter

## Contract

The Secret Debt lender encounter:

- can occur only from eligible street sleep;
- is exceptional, not mandatory poverty content;
- is one-time per run;
- supports accept/refuse;
- once decided, must not reroll/reappear as an undecided encounter.

Authoritative state model includes an encounter status such as:

`none / refused / accepted`.

## Future tests

### Eligibility

Assert the lender cannot appear from:

- normal room;
- cheap lodging;
- ordinary daytime actions.

Assert it can only be considered during eligible street sleep.

### One-time decision

Branch A:

- encounter appears;
- choose refuse;
- save/reload;
- future eligible street sleeps do not re-offer the same undecided lender encounter.

Branch B:

- encounter appears;
- choose accept;
- save/reload;
- future eligible street sleeps do not create a second loan grant.

### RNG determinism

If encounter appearance is probabilistic:

- same save + RNG state -> same result;
- reload of an already pending encounter does not reroll it.

---

# 4. Accept / refuse persistence

## Refuse path

After refusal:

- `encounter = refused`;
- no debt activation is scheduled;
- no hidden Slave career becomes active;
- ordinary poverty remains playable;
- later street sleeps cannot silently reset refusal.

## Accept path

After acceptance:

- `encounter = accepted`;
- immediate accepted benefit applies exactly once;
- `loanAcceptedDay` persists;
- `activationDay` persists;
- debt seed/state persists;
- no immediate professional lock unless the accepted design explicitly says activation is immediate.

Current design direction is delayed activation.

## Exactly-once assertions

Reload/retry may not:

- duplicate loan benefit;
- shift activationDay;
- duplicate debt;
- reopen accept/refuse choice.

---

# 5. Delayed activation

## Contract

Current design draft expresses:

```text
loanAcceptedDay = currentDay
activationDay = currentDay + DELAY
```

with current design candidate:

`DELAY ~= 10 days`.

The exact number remains open unless locked later.

The key QA invariant is deterministic delay, not the provisional numeric value.

## Future tests

Parameterize:

`DEBT_ACTIVATION_DELAY`

from production content.

Assert:

- days before activation behave as ordinary life;
- ordinary careers remain usable before activation;
- save/reload on every boundary does not alter activation date;
- activation occurs exactly once when the accepted boundary is reached;
- no off-by-one activation;
- RNG does not change the already scheduled activation.

### Boundary table

Test at:

- acceptance day;
- activationDay - 1;
- activationDay;
- activationDay + 1 reload sanity.

---

# 6. Ordinary-job blocking after activation

## Contract

After Secret Debt activation:

```text
JobAvailability(other ordinary job) = false
JobAvailability(slave) = true
```

Existing ordinary career progress is preserved but cannot advance while the lock is active.

## Future tests

Assert after activation:

- all ordinary-career work commands reject or are absent according to UI policy;
- hidden Slave career becomes available;
- pre-existing career counters/stages remain unchanged;
- Resolver does not advance blocked ordinary careers from unrelated events;
- save/reload does not temporarily restore ordinary work access.

## Recovery test

After a valid freeing outcome:

- professional lock clears exactly once;
- ordinary career availability returns;
- previous career progress resumes from preserved state.

---

# 7. Forced Night obligation

## Contract

Active Secret Debt must impose a mandatory Night obligation that:

- intercepts normal NightFlow;
- blocks ordinary voluntary Night choices while required;
- may advance Secret Debt counters/events;
- queues an accepted next-day Energy penalty;
- does not spend daytime Energy directly unless explicitly authored.

Exact penalty value is OPEN.

## Future tests

Parameterize:

`DEBT_NIGHT_ENERGY_PENALTY`.

Assert:

- after activation, normal voluntary Night choice is not available before forced debt obligation resolves;
- forced Night event persists across reload;
- resolving it happens once;
- next-day modifier is queued once;
- StartDay applies it once;
- reload cannot apply it twice;
- calendar advances exactly once.

Negative test:

normal Foreman/School/relationship Night must not bypass forced debt priority.

---

# 8. Three outcome families

The design locks three required outcome families.

## A. Paid Freedom

Core meaning:

- debt is paid;
- professional lock clears;
- ordinary jobs return;
- ending becomes eligible through the normal ending system;
- Meta reward applies only after explicit ending completion.

Future QA:

- payment transaction exactly once;
- insufficient money rejects atomically;
- successful payment clears debt/lock;
- reload does not charge twice;
- ending eligibility does not auto-complete the run.

## B. Bound Life / Hard Work analogue

Core meaning:

- progress through the hidden Slave career itself;
- separate outcome family from paying the debt.

Future QA:

- typed hidden-career progression;
- outcome can be reached without using Paid Freedom transaction;
- ending eligibility remains distinct from commitment/completion;
- exact Meta reward deferred to accepted product authoring.

Important OPEN question:

whether this hidden ending contributes to some hidden-career progress catalog.

It **must not** count toward Palace 10/10 ordinary Hard Work unlock.

## C. Takeover

Core meaning:

- separate high-complexity route;
- requires its own career/progression/item/relationship or evidence chain as authored;
- culminates in removing/replacing the owner/master role rather than merely paying debt.

Future QA:

- distinct requirements from Paid Freedom and Bound Life;
- route facts survive reload;
- final state removes forced debt lock appropriately;
- exact ending transaction once;
- no accidental reuse of ordinary Prostitute career state.

---

# 9. Palace prerequisite exclusion

## Locked rule

From `USER_DECISIONS_LOCKED_v1.md`:

Palace unlock requires Hard Work on **all 10 ordinary professions**.

Secret Debt / hidden careers do **not** count.

## Future test

Prepare Meta progress with:

- 9/10 ordinary Hard Work;
- any Secret Debt ending(s), including Bound Life.

Assert:

- Palace remains locked.

Then add the missing 10th ordinary Hard Work.

Assert:

- Palace unlocks according to the normal Meta rule.

Negative cases:

- 8 ordinary + 2 hidden endings does not unlock;
- 9 ordinary + Bound Life does not unlock;
- Secret Debt Takeover does not substitute for an ordinary Hard Work.

This contract is not balance-open.

It is locked.

---

# 10. Ordinary poverty must remain independent

## Contract

Secret Debt is exceptional.

Ordinary poverty must remain playable if:

- lender never appears;
- lender appears and player refuses;
- player never enters Secret Debt.

Future QA should include an entire poor-run smoke with:

- zero/low money;
- cheap/street housing;
- ordinary work;
- at least one helpful/neutral/bad street event;
- recovery to paid lodging

without entering Secret Debt.

This prevents the hidden career from becoming the only poverty content.

---

# 11. State ownership / save contract

Future Secret Debt state should have one authoritative typed owner.

Expected state families include:

- encounter decision;
- accepted day;
- activation day;
- current debt;
- hidden career progression;
- Night-work count;
- active lock;
- outcome eligibility.

QA must reject or migrate any duplicated authority such as:

- same debt in generic money flags and SecretDebtState;
- separate unsynchronized job-lock flag;
- separate Night obligation flag with conflicting phase.

---

# 12. Atomicity / failure behavior

A failed Secret Debt command must leave caller state unchanged.

Target cases:

- pay debt with insufficient money;
- trigger lender twice;
- accept after refusal;
- refuse after acceptance;
- run ordinary job while active lock;
- skip forced Night;
- complete ending twice.

No partial:

- money removal;
- debt removal;
- lock clearing;
- Meta grant

may occur before the full transaction succeeds.

---

# 13. Parameterized OPEN values

Do not lock in QA until Product/balance authority supplies them:

- lender immediate benefit;
- debt amount;
- activation delay if revised from current candidate;
- street Energy penalty;
- forced Night Energy penalty;
- Slave shift stat gains;
- exact hidden career stages;
- ending thresholds;
- ending Meta rewards;
- School/Activity availability while debt lock active.

QA fixtures may use explicit test parameters, but those parameters must be labeled non-canonical.

---

# 14. Minimum future executable suite

At minimum add:

1. zero-money anti-softlock;
2. street sleep day advance;
3. lender eligibility only on street;
4. lender one-time refusal;
5. lender one-time acceptance;
6. activation boundary before/at/after delay;
7. ordinary-job blocking after activation;
8. forced Night priority + next-day penalty exactly once;
9. paid freedom exactly-once transaction;
10. Bound Life distinct path;
11. Takeover distinct path;
12. release restores ordinary careers;
13. Palace exclusion with hidden endings;
14. full save/reload matrix for pending lender, pre-activation, active lock, forced Night and each ending boundary.

No production runtime/UI/content file was modified by Chat 4.
