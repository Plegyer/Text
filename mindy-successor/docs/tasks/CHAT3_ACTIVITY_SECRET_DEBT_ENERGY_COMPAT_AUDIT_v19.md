# Chat 3 — Activity / Secret Debt Energy Compatibility Audit v19

Status: **RESEARCH COMPLETE — RUNTIME BLOCKER FOUND**  
Owner: Chat 3  
Branch: `chat3/activity-secret-debt-energy-compat-audit-v19`  
Parent audit: `chat3/activity-ending-reachability-audit-v18@7ae7a9b273f1806ac04b566c318896783bab6595`

Research-only task. No runtime/content changes were made.

Primary implementation evidence:
- Secret Debt producer: `chat4/secret-debt-full-route-producer-v12@10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`
- QA repair branch: `chat4/qa-secret-debt-v12-repair-20261003-v1@23c83f83746de28363232b9d18472a4cc92aa58c`
- the repair branch changes only its focused workflow relative to the producer; runtime/test semantics are unchanged.

Current locked authority used:
- D19 — Secret Debt baseline;
- D35 — housing value / Street remains a real lodging tier;
- D36 — Large Activity entry = exactly 2 daily Energy and bound players may enter Activity;
- D44 — Secret Debt hidden-work economy and thresholds.

> Final v19 SHA is reported after this documentation commit.

## Verdict

**RUNTIME_BLOCKER_FOUND**

The frozen Secret Debt producer explicitly stacks:

- Street lodging next-day Energy **-1**;
- Secret Debt forced-Night next-day Energy **-1**.

With the baseline daily Energy of 3, the next morning is therefore:

`3 - 1 - 1 = 1 Energy`

The Activity runtime requires the full locked **2 Energy** before entry.

Therefore a bound player who chooses Street can be prevented from entering an otherwise normally available 2-Energy Activity **solely by the combination of the two locked Night consequences**.

That contradicts the combined D19/D36 product guarantee that Large Activity remains available while bound / a bound character may enter Activity.

This is not hypothetical. Producer v12 already contains the regression expectation:

- paid lodging -> next day 2 Energy;
- Street -> next day 1 Energy.

No runtime change is made by v19.

## Exact repository truth

### Secret Debt forced Night

Producer event:

`secret-debt.forced-night`

is a `before_lodging` forced Night intercept with:

- `suppressVoluntaryMenu: true`;
- `consumesNight: true`;
- `suppressLodgingPayment: false`.

Its explicit player choice queues:

`addNextDayModifier energyDelta: -1`

with tag:

`secret-debt.bound-night`

This means forced Secret Debt Night happens first, but lodging still resolves afterward.

### Street lodging

`lodging.street` has:

- money cost 0;
- next-day Energy delta **-1**;
- Grooming -1.

Choosing lodging calls the common next-day queue and adds its Energy delta.

The queue is additive:

`q.energyDelta += energyDelta`

so ordering cannot change the arithmetic.

### Start-day Energy finalization

Night finalization computes:

`Math.max(1, energyMax(s) + queued.energyDelta)`

Baseline `energyMax` is 3.

Therefore:

| Bound lodging | queued Energy delta | next-day Energy |
|---|---:|---:|
| normal | -1 | 2 |
| cheap | -1 | 2 |
| street | -2 | 1 |

The runtime floor is 1, not 2.

### Activity entry

Activity entry checks:

`energyCurrent < entryEnergyCost`

and rejects when true.

All four D36 production regions retain:

`entryEnergyCost = 2`

Therefore the Street + bound-Night morning at 1 Energy cannot enter any normally available D36 region.

## The failure is caused solely by the combination

Neither component blocks Large Activity by itself.

### Secret Debt forced Night alone

Baseline 3 -> 2.

A 2-Energy Activity remains enterable.

### Street alone

Baseline 3 -> 2.

A 2-Energy Activity remains enterable.

### Both together

Baseline 3 -> 1.

The same Activity fails only because the two consequences stack.

This satisfies the exact v19 risk condition.

## Minimum next-day Energy while bound

Under the producer Night finalizer, usable next-day Energy is clamped to a minimum of **1**.

For the currently relevant locked combination:

- normal/cheap + bound Night -> 2;
- Street + bound Night -> 1.

A Meta daily-Energy increase can mask the problem:

- base 4 -> Street + bound Night -> 2.

But D19/D36 Activity availability cannot depend on owning a Meta Energy modifier.

The baseline no-Meta bound player is the required compatibility case.

## D44 interaction

D44 hidden work costs exactly 1 Energy.

Therefore on a Street + bound-Night morning:

- hidden Secret Debt work remains possible;
- a paid School lesson, also 1 Energy, can remain possible if tuition is affordable;
- a 2-Energy Large Activity does not.

This makes the inconsistency narrow and easy to reproduce: the Secret Debt route itself is still playable, while the specifically promised Large Activity access is the subsystem that fails.

## Why sequencing does not solve it

The current sequence is:

1. forced Secret Debt Night intercept;
2. forced Night choice queues -1;
3. lodging resolution;
4. Street queues another -1;
5. Night finalization sums the queue;
6. next day begins at 1 Energy.

Reversing the order would still produce:

`-1 + -1 = -2`

Therefore this is **not** a sequencing bug.

A pure ordering change cannot satisfy D19/D35/D36 simultaneously.

## Why suppression is not authorized

Possible suppression approaches include:

- suppress Street -1 while bound;
- suppress Secret Debt -1 when Street is chosen.

Both would weaken a locked consequence.

v19 authority explicitly forbids weakening either Street or Secret Debt consequences without Product authority.

Therefore suppression is not an authorized Chat 3 fix.

## Why changing Activity cost is not authorized

Changing Activity entry from 2 to 1 would make the blocked morning enterable, but D36 explicitly locks entry to exactly 2 daily Energy.

v19 explicitly forbids changing that value.

Therefore Activity cost reduction is not an authorized fix.

## Why no-change is invalid

Keeping producer v12 exactly as-is leaves a deterministic reachable state in which:

- Secret Debt is bound;
- the Activity region itself is normally available;
- no Activity-specific gate fails;
- only Energy fails;
- the Energy failure exists solely because Street -1 and forced-Night -1 stacked.

That violates the intended bound-Activity guarantee.

Therefore:

**PASS_NO_CHANGE is rejected.**

## Compatibility mechanism classification

Of the requested mechanism classes:

- **sequencing** — insufficient;
- **suppression** — would weaken a locked penalty;
- **no change** — leaves the blocker;
- **clamping / explicit compatibility floor** — the only straightforward mechanism class that can preserve 2-Energy Activity entry without changing Activity cost.

However, any clamp changes the combined effect of two locked penalties.

Therefore Chat 3 cannot implement it without explicit Product authority.

### Narrow Product-decision seam

The least invasive candidate rule is a narrow compatibility floor evaluated at Night finalization:

> If Secret Debt is bound and the same Night contains both the Secret Debt forced-Night penalty and Street lodging penalty, next-day usable Energy may not fall below 2.

Important constraints if Product accepts this direction:

- do not globally raise the normal Energy floor from 1 to 2;
- do not change `entryEnergyCost = 2`;
- do not remove Street Grooming loss;
- do not suppress forced-Night ownership or voluntary-Night suppression;
- do not grant more than 2 Energy from the compatibility floor;
- do not apply the floor to unrelated non-bound penalties.

Implementation should preferably use modifier provenance/tags already present during Night finalization rather than infer from housing alone.

This recommendation is a Product seam, not an implemented rule.

## Trap-activation boundary

Secret Debt activation occurs during start-day finalization after calendar advance.

Therefore the Night immediately before the trap activates was not a bound forced Night at its `before_lodging` intercept.

Consequences:

- a Street night that advances into the trap day queues only Street -1;
- the newly activated bound morning can begin at 2 Energy;
- the first deterministic Street + forced-Night 1-Energy morning occurs after a Night that began with Secret Debt already bound.

This should be preserved in tests so a future fix does not retroactively apply forced Night to the pre-activation Night.

## Save/reload audit

Producer runtime already persists both NightFlow and next-day modifier queue in Save state.

The important boundaries are deterministic.

### Boundary A — pending forced Night before choice

State:
- Secret Debt status = bound;
- NightFlow phase = `NightEventResolution`;
- pending event = `secret-debt.forced-night`;
- Secret Debt next-day modifier not yet applied.

Required reload assertion:
- reload preserves the same pending forced event;
- resolving it queues Secret Debt -1 exactly once.

### Boundary B — after forced-Night choice, before lodging

State:
- pending scene resolved;
- NightFlow phase = `LodgingResolution`;
- `nextDayModifiers.energyDelta = -1`;
- tag `secret-debt.bound-night` appears exactly once.

Required reload assertion:
- reload preserves -1 and the tag;
- choosing Street after reload adds exactly one more -1;
- resulting next day is 1, not 0 and not 2.

### Boundary C — after Street lodging

There is no stable player-controlled post-lodging/pre-finalization save point in the current path.

`chooseLodging` immediately runs the post-lodging boundary and, because the forced Night already owns/consumes the Night, proceeds to finalization when no blocking post-lodging scene intervenes.

Required assertion:
- final next-day state has 1 Energy;
- next-day modifier queue is cleared;
- Secret Debt forced-Night history increments once.

### Boundary D — reload on the 1-Energy morning

Required reload assertion:
- Energy remains exactly 1;
- the cleared next-day queue is not recreated;
- Activity remains rejected for insufficient Energy;
- hidden work remains available at 1 Energy.

## Exact regression tests required before assembly

### T1 — normal lodging control

Bound state, base Energy max 3.

Flow:
- end day;
- resolve forced Night;
- choose normal lodging.

Expect:
- next-day Energy = 2;
- enter `lumber.forest` succeeds when its ordinary entry conditions are satisfied;
- Activity entry spends exactly 2 and leaves 0.

### T2 — cheap lodging control

Same as T1 with cheap lodging.

Expect:
- next-day Energy = 2;
- 2-Energy Activity entry succeeds.

### T3 — Street blocker reproduction

Bound state, base Energy max 3.

Flow:
- end day;
- resolve forced Night;
- choose Street.

Expect under unmodified producer:
- next-day Energy = 1;
- `lumber.forest` is otherwise entry-eligible;
- Activity entry fails only on insufficient Energy.

This is the blocker reproduction test.

### T4 — save before forced-Night choice

Save/reload while `secret-debt.forced-night` is pending.

Then:
- resolve once;
- choose Street.

Expect:
- Secret Debt modifier applied once;
- final Energy = 1;
- forced-Night event history count increments once.

### T5 — save after forced-Night choice, before lodging

Save/reload with:

- NightFlow = LodgingResolution;
- queued Energy delta = -1;
- one `secret-debt.bound-night` tag.

Then choose Street.

Expect:
- final Energy = 1;
- no duplicate debt modifier;
- no duplicate Street modifier.

### T6 — save on blocked next morning

After T3 finalization, reload.

Expect:
- Energy = 1;
- next-day queue = empty;
- Activity still fails;
- hidden 1-Energy work remains executable.

### T7 — first trap-activation morning

Accepted-but-not-yet-bound state reaches exact trap day through Street lodging.

Expect:
- trap activates at start of new day;
- only Street -1 affected that morning;
- Energy = 2;
- no retroactive forced-Night -1.

### T8 — second bound Street morning

From T7, remain bound through the next full Night and choose Street again.

Expect under unmodified producer:
- forced Night occurs;
- final Energy = 1;
- blocker is now reproducible.

### T9 — Meta +1 diagnostic

Bound + Street with `energy.daily = +1`.

Expect:
- Energy max 4;
- combined -2 -> 2;
- Activity entry succeeds.

This is diagnostic only. It must not be treated as the fix.

### T10 — route exit removes the debt penalty

Resolve Secret Debt during the day by an authorized exit path, then choose Street that Night.

Expect:
- no forced Secret Debt Night;
- only Street -1;
- next-day Energy = 2;
- normally available Activity succeeds.

### T11 — compatibility rule regression after Product decision

Once Product chooses the fix, replace the expected 1-Energy result for the specific bound+Street compatibility case with the authorized result.

Also assert all control cases remain unchanged:
- unbound Street still carries its normal consequence;
- bound normal/cheap still carries Secret Debt -1;
- Activity entry remains exactly 2;
- Street Grooming loss remains;
- forced Night still suppresses voluntary Night;
- save/reload cannot duplicate or bypass the compatibility rule.

## Current-main / branch status

The v19 worker branch itself is based on the completed v18 Activity audit and does not contain the Secret Debt producer runtime.

Current repository authority has D19/D35/D36/D44 locked, while the exact conflicting executable behavior is present on the frozen Secret Debt producer v12 candidate.

The QA repair branch adds only a workflow on top of producer v12 and does not change this behavior.

Therefore this finding should be treated as an **assembly blocker before Secret Debt v12 is accepted into the same runtime as D36 Activity**.

## No authorized code change in v19

v19 does not:

- modify NightFlow;
- modify lodging;
- modify Secret Debt;
- modify Activity;
- change Energy values;
- change save schema;
- change tests on another producer branch;
- run full CI.

The task is completed as an incompatibility audit only.

## Leader / Product action

Before Secret Debt v12 and D36 Activity are considered jointly closed, Product must explicitly choose the combined-penalty compatibility rule.

Recommended decision class:

**narrow bound+Street next-day Energy floor of 2, provenance-gated to the simultaneous Secret Debt forced-Night and Street penalties.**

If Product rejects that clamp, another explicit rule must identify which locked consequence yields in the combined case.

A pure sequencing change is not sufficient.

## Final disposition

**RUNTIME_BLOCKER_FOUND**
