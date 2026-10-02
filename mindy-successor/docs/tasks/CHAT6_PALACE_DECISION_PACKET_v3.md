# Chat 6 — Palace Decision / Dependency Packet v3

Status: **READY FOR LEADER DECISION PACKET**
Owner: Chat 6 / Palace Producer
Packet branch: `chat6/palace-decision-packet-v3`
Exact packet base required by pointer: `04d1c0afff2dbb776fde4842d1fea6041fef4061`
Authority re-check: current main `fe59b931c8f432c8aa6b66c4fc1a699195616065`
Preserved Palace production foundation: `chat6/palace-complete-reset-v1` @ `8919a3686c1952d700c4c1377130918e0e181fa3`
Previous Palace packet: `chat6/palace-decision-packet-v2` @ `719316fa3189a0254b151a27dbf8b0b4c7fdc2d3`

This packet supersedes v2 wherever D23/D24 changed the Palace gate or True Ending reward interpretation.
It is a design / dependency contract only. It does not mutate shared Save, Meta, New Start+, ending, NightFlow or Secret Debt runtime.

---

## 1. Newly locked authority applied by v3

### D23 — per-run Palace activation

Palace access in one New Start+ life requires both:

1. all ten ordinary Hard Work achievements permanently earned; and
2. all ten corresponding ordinary Hard Work **career bonus packages actively selected for that life**.

Permanent 10/10 alone is insufficient.

If and only if both halves are true:
- the run is Palace-eligible;
- a Palace invitation is delivered automatically on Day 1;
- the invitation is the deterministic authored reveal/entry step;
- after the invitation, Palace access is open;
- no RNG, stat threshold, item, Artist invitation, Secret Debt state or other route can substitute.

Secret Debt is never one of the ten.

### D24 — True Ending legacy reward

The optional True Ending legacy reward is **cap-only**:

- when selected for a later New Start+ life, each of the 12 progression stat caps is 200 instead of 100;
- current/start values are not doubled;
- ordinary Hard Work +5 values are not doubled;
- the 10 manual creation points are not doubled;
- Lust is not part of this cap reward.

D18 remains:
- Palace unlocked/entered through the Palace rules;
- all 12 progression stats strictly above 90 on the original 0..100 D18 scale;
- Lust excluded;
- Prince defeated;
- Return Home.

---

# 2. Baseline audit: current runtime is not yet D23/D24-ready

At exact packet base `04d1c0af...`:

- `meta.hardWorkProgress` is the permanent ordinary Hard Work ledger;
- `palaceAvailable(meta)` checks permanent 10/10 only;
- `metaUnlock:palace` therefore currently means permanent 10/10 only;
- old Hard Work starting bonuses are still applied automatically from the permanent ledger;
- those old bonuses are the superseded +3/+3 / Merchant-money model;
- `activeLegacyPerks` exists in Meta but is not a safe immutable per-run Hard Work package snapshot;
- progression stats are schema-capped to 100;
- `setMetric` clamps progression stats to 100;
- the UI renders stat progress with max 100;
- schema version remains 4.

Therefore D23/D24 must not be implemented by merely changing `palaceAvailable(meta)` or by reading the current stat values.

Chat 4 currently owns the D21-D24 Hard Work Next-Life Meta packet/mapping work.
Palace must consume Chat 4's generic package-selection contract rather than duplicate the profession -> stat mapping.

---

# 3. Generic D23 gate contract

## 3.1 Three separate concepts must remain separate

The implementation must distinguish:

### A. Permanent earned ledger

Source:
- `meta.hardWorkProgress`.

Meaning:
- which ordinary professions have permanently completed Hard Work.

This is account/profile history.
It is not the current-life loadout.

### B. Current-run active Hard Work career packages

Source:
- New Start+ selection made before the run begins;
- copied into an immutable **run-local snapshot** when the life is created.

Meaning:
- which earned profession packages are active in this specific life.

The Palace gate consumes **career-package activation**, not individual +5 effect lines.

This distinction is important because D22 allows:
- the first five careers to have one +5 stat bonus;
- the later five to have up to two separate +5 stat bonuses.

Palace must not count “number of +5 effects”.
It asks only whether the corresponding **profession package** is active.

### C. Derived Palace eligibility for this run

Conceptual pure contract:

```text
earnedTen =
  every ordinaryCareer is present in permanent hardWorkProgress

selectedTen =
  every ordinaryCareer has its career Hard Work package active
  in this run's immutable New Start+ snapshot

palaceRunEligible = earnedTen && selectedTen
```

The ordinary career set is exactly:

```text
lumber
satyr-maid
undead-farm
tavern
hunter
guard
merchant
artist-geisha
assassin
prostitute
```

Secret Debt is outside this set.

## 3.2 Validation invariants

At run creation:

- active Hard Work package set uses unique career identities;
- every active package must correspond to an earned ordinary Hard Work entry;
- unearned package activation is invalid/rejected;
- duplicate package entries do not count twice;
- Secret Debt or any future hidden route cannot be accepted as an ordinary package;
- package mapping details (+5 target stats, including any Lust package) are irrelevant to Palace eligibility.

Required gate truth table:

| Permanent ordinary Hard Work | Active ordinary career packages | Palace run eligible |
|---|---:|---:|
| 9/10 | 9/10 or less | no |
| 10/10 | 0/10 | no |
| 10/10 | 9/10 | no |
| 10/10 | 10/10 | **yes** |
| 10/10 + Secret Debt | 9/10 ordinary + Secret Debt | no |
| 10/10 + Secret Debt | 10/10 ordinary + Secret Debt | **yes**, because Secret Debt is irrelevant |

## 3.3 Why Palace must read a run-local snapshot

The current `activeLegacyPerks` field lives in Meta and is merged as protected Meta on reload/import.

Reading a live Meta selection during an active life would allow an external/current-Meta merge to change Palace eligibility after the run began.

D23 is explicitly a **for this life** selection rule.

Safest contract:

1. New Start+ UI gathers the chosen Hard Work career packages.
2. New run creation validates selections against permanent earned ledger.
3. The normalized selected career-package set is copied into Run state.
4. Palace eligibility is derived once from permanent ledger + that run snapshot.
5. Reload uses the saved run snapshot.
6. Later Meta merge cannot retroactively add/remove Palace eligibility from an already-started life.

Exact shared field names belong to the implementation owner.
Palace only requires an immutable interface equivalent to:

```text
runSelectedHardWorkPackages(): Set<OrdinaryHardWorkCareer>
palaceRunEligible(): boolean
```

## 3.4 Existing `metaUnlock:palace` compatibility

The existing permanent derived Palace unlock should not silently become the whole D23 gate.

Recommended compatibility semantics:

- permanent `metaUnlock:palace` / permanent 10/10 remains “Palace earned in Meta”;
- a separate run-local derived Palace-entry eligibility state represents “all ten packages are active in this life”.

This preserves existing Meta history while preventing permanent 10/10 from bypassing D23.

No current Palace work action should ultimately gate on permanent `metaUnlock:palace` alone.

---

# 4. Secret Debt composition

## 4.1 Current D19 domain-lock implementation

The current Chat 5 Secret Debt implementation branch explicitly blocks only the ten ordinary career domains:

- ordinary career actions;
- ordinary career source domains/events;
- ordinary career endings.

The lock is implemented from the same `ordinaryHardWorkCareers` roster.

Palace is not an ordinary career and is not in that set.

## 4.2 Ordering with D23

There is no race:

1. New Start+ setup selects Hard Work packages.
2. New life is created.
3. Palace run eligibility snapshot is derived.
4. Character creation completes on calendar Day 1.
5. If eligible, deterministic Palace invitation is latched/delivered.
6. A Secret Debt lender encounter can only occur later through its own eligible street-night path.
7. If Secret Debt later becomes bound, it locks the ten ordinary career domains.

Secret Debt therefore:
- cannot help satisfy permanent 10/10;
- cannot help satisfy active 10/10;
- does not revoke a valid Palace Day-1 invitation;
- does not deactivate the run's selected Hard Work package snapshot;
- does not currently block Palace domain/actions/endings.

This follows current D19 literally: the Secret Debt lock targets **all ten ordinary professions**, not hidden Palace.

If Product later wants Secret Debt to suspend Palace too, that would be a new explicit rule. It is not a blocker for D23 as currently locked.

---

# 5. Deterministic Day-1 Palace invitation

## 5.1 Timing

Current calendar representation:
- `elapsedDays = 0` is Year 1 / Day 1.

Current engine already emits:
- `creationCompleted` when the player finishes the 10-point character setup.

This is the safest Day-1 hook.

Do **not** wait for the first `dayStarted` after calendar advance, because that risks turning the authored reveal into Day 2 semantics.

## 5.2 Delivery design

The invitation should be a Palace-owned blocking authored event with:

- reaction trigger: `creationCompleted`;
- condition: run-local Palace eligibility snapshot is true;
- no chance / RNG;
- no stat condition;
- no item condition;
- no Artist/other-career condition;
- one authored acknowledgment/entry choice;
- max one delivery per life;
- a latched or equivalently persistent mandatory delivery policy.

Why latched:

The resolver selects one blocking scene at a time.
A live one-shot `creationCompleted` event could be lost if another higher-priority blocking event wins that boundary.

A latched mandatory invitation:
- becomes queued on the Day-1 creation boundary;
- survives collision with another blocking scene;
- remains eligible for the next resolver pass;
- is deterministic and reload-safe.

Recommended priority class:
- `critical_progression` unless Integration finds a more specific already-approved mandatory class collision.

This is an implementation recommendation, not a new Product mechanic.

## 5.3 Entry result

After resolving the invitation:

- write one Palace-local run access state;
- Palace work becomes available from that state;
- do not require a second invitation, item, random roll or stat gate.

Exact runtime ID remains implementation/content naming work and is not invented in this packet.

The entry state may be represented as either:
- a Palace-local world/access fact; or
- initialization of the Palace career machine.

Preferred smallest implementation:
- initialize the Palace career machine and record that the invitation was accepted/seen in Palace-local state.

The invitation is the reveal; it is not a reusable inventory gate.

## 5.4 Presentation behavior

Before D23 is satisfied:
- no visible 7/10, 9/10 or other Palace progress card;
- no locked Palace job card that reveals the hidden requirement.

When D23 is satisfied:
- invitation appears on Day 1;
- RU/EN authored copy may reuse only the authority-safe Palace copy from the preserved foundation after revalidation;
- the player gets a clear Palace entry path immediately after the invitation.

---

# 6. D18 eligibility after cap-200 exists

## 6.1 Locked interpretation

D23/D24 resolve the v2 ambiguity.

The current 0..100 progression-stat scale is the D18 percentage scale for **earning** the True Ending.

Because current stat values are integers:

```text
strictly > 90  ==  raw stat >= 91
```

for each of the 12 progression stats.

Therefore the safest production implementation is twelve existing data conditions:

```text
stat >= 91
```

No new `gt` compare operator is needed.

## 6.2 Do not renormalize against the active cap

After the optional True Ending legacy cap is earned, a future life may have cap 200.

D18 must **not** become:

```text
stat / 200 > 0.90
```

and must not require 181.

Reason:
- D24 says the current 0..100 scale is the D18 percentage scale;
- cap 200 is a later optional legacy reward;
- the reward changes future growth ceiling, not the historical meaning of D18.

Therefore even in a later cap-200 life:

- 90 fails D18;
- 91 passes the stat threshold;
- 180 passes;
- 200 passes.

The eligibility threshold remains absolute raw `>= 91`, independent of the run's effective stat cap.

## 6.3 Same-run paradox is avoided naturally

The cap-200 entitlement is earned only after True Ending completion.
Ending completion ends that life.

Therefore the first True Ending cannot use its own cap-200 reward to satisfy its prerequisites.

Later cap-200 lives may re-enter Palace, but D18 still uses the same raw `>= 91` baseline threshold.

---

# 7. Cap-200 Save/runtime plan — no multiplication

This is shared-runtime work and must wait for Leader ownership assignment.

## 7.1 Persistent entitlement vs per-run activation

Two concepts are required:

1. **Permanent entitlement** — True Ending has been completed and cap-200 option is now available forever.
2. **Current-run activation** — the player selected that optional legacy modifier for this New Start+ life.

The current run should snapshot whether the cap-200 option is active.

Do not derive an active run's cap live from mutable/protected Meta after the run has started.

## 7.2 Run-local effective cap

Recommended semantic runtime helper:

```text
effectiveProgressionStatCap(run) = 200 if cap-200 option snapshot active
                                   100 otherwise
```

Lust remains separately capped by its own rules and is not affected.

## 7.3 Save schema

Current schema hard-codes every progression stat to `0..100`.

To save values above 100 safely, implementation requires a Save migration.

Recommended plan:

- bump Save schema version;
- widen serialized progression stat range to `0..200`;
- add an immutable run-local cap/loadout snapshot sufficient to distinguish cap 100 vs 200;
- migrate every old schema-4 run to cap 100;
- preserve Meta entitlement separately;
- after parse, enforce:
  - each progression stat <= that run's effective cap;
  - cap-100 runs may not load 101..200 even though the broad serializer can represent them.

A broad schema max 200 plus a post-parse run-cap invariant is simpler than duplicating twelve dynamic Zod schemas.

## 7.4 Central write/clamp behavior

Current `setMetric` hard-clamps progression stats to 100.

Implementation owner must route all progression-stat changes through the run's effective cap.

That includes at minimum:
- manual creation allocation;
- action effects;
- School effects;
- Night effects;
- Activity effects;
- next-day stat effects;
- migration/compat aliases that target progression stats.

No value is multiplied when cap 200 activates.

Examples:

```text
cap 100, stat 99, +5  -> 100
cap 200, stat 99, +5  -> 104

cap 200 start:
base 1 remains 1
Hard Work +5 remains +5
manual point remains +1
```

## 7.5 New Start+ ordering

D24 removes the old multiplication-order question.

Safe setup order:

1. read permanent entitlements;
2. player selects any earned Hard Work career packages;
3. player optionally selects cap-200 entitlement if earned;
4. create immutable run setup snapshot;
5. initialize stats at 1;
6. apply selected Hard Work package values at their exact locked magnitudes;
7. keep the normal 10 manual allocation points;
8. all writes clamp to effective cap (100 or 200).

No multiplication step exists.

## 7.6 Protected Meta merge

If a save from an active cap-100 run is loaded while current account Meta now contains the cap-200 entitlement:

- entitlement may merge into Meta;
- the already-started run remains cap 100;
- cap 200 becomes selectable only for a later New Start+ life.

Likewise, changing account loadout selection must not alter the active run snapshot.

This prevents save/import from mutating run rules after start.

---

# 8. Cap-200 UI plan

Current stat UI assumes max 100.

When the implementation owner adds D24 support:

### New Start+ setup

Show cap-200 as an optional selectable legacy modifier only when permanently earned.

It must be visibly distinct from Hard Work career packages:
- Hard Work packages add fixed starting bonuses;
- cap-200 changes only the maximum allowed future value.

### In-run stat display

For each of the 12 progression stats:
- progress bar max = effective run cap;
- numeric display should expose current/max, e.g. `104 / 200`;
- do not visually imply the stat was doubled.

Lust keeps its separate display/cap.

### True Ending requirement UI

If Palace exposes True Ending readiness, show the requirement as the fixed baseline threshold:
- each of 12 stats must be at least 91.

Do not render it as “90% of current cap”.
In a cap-200 life, `91 / 200` is still sufficient for the D18 stat gate.

A dedicated “D18 requirement: 91+” indicator is safer than deriving readiness from the progress-bar percentage.

---

# 9. Locked Palace content plans that no longer need Product questions

## 9.1 Non-True outcomes

Service Life, Court Power and Inner Truth may remain completion-only now.

Plan:
- explicit no-permanent-Meta-reward behavior;
- no `hardWork:palace`;
- no shared reward schema extension.

## 9.2 Relationships

Generic role-based Palace NPC identities are authorized.

Production plan may use separate Palace-local relationship machines for:
- professional patron;
- rival;
- servant/official contact;
- optional romance.

Romance:
- voluntary;
- non-required;
- never a Palace/True Ending prerequisite unless separately authorized later.

Exact names/lore can remain generic until writing polish and do not block architecture.

## 9.3 Legacy items

Already shipped item capabilities may unlock optional Palace branches.

They may never:
- satisfy permanent 10/10;
- satisfy current-run active 10/10;
- cause the Day-1 invitation;
- become mandatory Palace entry gates.

Artist invitation/formal capabilities, Guard access capabilities, Merchant document capabilities and similar shipped surfaces are optional legacy-expression seams only.

## 9.4 Night

Palace may have a voluntary, non-forced work-context Night choice.

Recommended implementation shape:
- ordinary `nightChoices` framework;
- Palace career/access condition;
- Palace-local write only;
- no forced Night interception;
- no Secret Debt Night override changes.

Secret Debt forced Night, when bound, keeps its own higher-authority behavior.
Palace must not bypass the bound Secret Debt forced-night suppression.

---

# 10. Remaining Product questions — reduced to two

D23/D24 resolve the previous gate, percentage, x2-order/cap, invitation, non-True reward, relationship, item and Night questions.

Only these remain material blockers to a full Palace production slice.

## Q1 — Prince confrontation state owner

The mechanics/lore may remain open, but runtime needs to know where the final victory signal lives.

### Option A — Palace-local career fact

Use when confrontation is one terminal Palace sequence and only Palace/Return Home consumes the result.

Smallest runtime surface.

### Option B — dedicated Palace confrontation quest

Use when confrontation must be resumable/multi-stage with its own state.

More structure, cleaner if the confrontation has several phases.

### Minimum Product question

**Should the final Prince confrontation be a multi-stage resumable route?**

- no -> Palace-local career fact is sufficient;
- yes -> dedicated confrontation quest.

No Prince name, lore, combat model or exact choices need to be decided by this question.

## Q2 — Palace career progression topology

### Option A — compact evidence-driven topology

Three semantic positions:
1. entry;
2. established;
3. outcome-ready.

Transitions depend on the already-authorized evidence families:
- Palace work;
- build check;
- external fact;
- Palace decision;
- legacy-sensitive opportunity.

No numeric shift thresholds.

**Technically simplest proposal.**

### Option B — expanded draft-shaped topology

Roughly six semantic positions:
- invited/outsider;
- probation;
- trusted;
- chosen sphere;
- inner court;
- outcome-ready.

Still evidence-driven unless Product separately locks numeric thresholds.

### Minimum Product question

**Use compact 3-position Palace progression or expanded 6-position progression?**

Exact internal IDs can then be authored consistently by the assigned implementation owner.
A precise heroine court title/role is not required to resolve this topology; generic “Palace service/work” presentation remains valid.

---

# 11. Cross-owner implementation boundary

## Chat 4 / Hard Work Meta packet owns

- profession -> +5 mapping proposal;
- Lust bonus placement/magnitude proposal under D22;
- New Start+ arbitrary-subset selection representation;
- removal/migration of superseded automatic +3/+3 / Merchant +600 behavior;
- generic active career-package setup contract.

## Palace consumer requires from that implementation

Only:

```text
permanentHardWorkCareers
runActiveHardWorkCareerPackages
```

Palace must not inspect which stats a package modifies.

## Shared implementation owner later owns

Leader must assign ownership for:
- Save version/migration;
- run-local loadout snapshot;
- cap 100/200 infrastructure;
- dynamic stat clamps;
- New Start+ setup UI;
- generic D23 gate helper if placed in shared engine.

## Chat 6 / Palace owns after shared seam exists

- deterministic Day-1 invitation content/consumer;
- Palace access state;
- Palace career machine/content;
- Palace-specific relationships;
- optional legacy item reads;
- voluntary Palace Night content;
- three non-True endings;
- True Ending conditions/final Palace authored flow, subject to Q1/Q2.

## Chat 5 / Secret Debt

No Secret Debt framework change is required for D23.

Its existing ordinary-domain lock remains separate.

---

# 12. Required test matrix for eventual implementation

## D23 gate

1. permanent 9/10 + active 9/10 -> no Palace.
2. permanent 10/10 + active 0/10 -> no Palace.
3. permanent 10/10 + active 9/10 -> no Palace.
4. permanent 10/10 + active 10/10 -> Palace eligible.
5. duplicate active package does not substitute for missing career.
6. Secret Debt completion/package-like data never substitutes.
7. unearned active package is rejected during setup normalization.
8. save/reload preserves current-run active package snapshot.
9. protected Meta merge cannot change active-run Palace eligibility.

## Day-1 invitation

10. active 10/10 + permanent 10/10 queues invitation on `creationCompleted` at elapsed Day 0 / calendar Day 1.
11. no RNG is consumed by invitation eligibility/delivery.
12. another blocking creation scene cannot permanently suppress the latched invitation.
13. invitation is delivered at most once in the life.
14. reload while invitation is queued/pending preserves exact delivery.
15. resolving invitation opens Palace with no second gate.
16. legacy items do not cause invitation when D23 is false.

## Secret Debt composition

17. Palace-eligible run receives invitation before any street-night Secret Debt activation path.
18. becoming Secret-Debt-bound later does not alter the D23 run snapshot.
19. Secret Debt ordinary domain lock still blocks exactly the ten ordinary professions.
20. Palace is not accidentally added to the ordinary lock set.
21. Secret Debt forced Night still suppresses voluntary Palace Night while bound.

## D18 / cap 200

22. cap 100: any D18 stat at 90 -> false.
23. cap 100: all 12 at 91 -> stat gate true.
24. cap 200: any D18 stat at 90 -> false.
25. cap 200: all 12 at 91 -> stat gate true.
26. cap 200 does not change D18 threshold to 181.
27. selecting cap 200 does not multiply any current stat.
28. selecting cap 200 does not multiply selected Hard Work +5 bonuses.
29. selecting cap 200 does not multiply the 10 allocation points.
30. cap-100 writes clamp at 100.
31. cap-200 writes may reach 200 but not exceed it.
32. Lust cap/eligibility remains separate and unchanged.

## Save/UI

33. old schema save migrates to run cap 100.
34. a saved cap-200 run may serialize/reload stats in 101..200.
35. cap-100 run with stat >100 is rejected.
36. stat progress UI uses the run's effective cap.
37. True Ending readiness UI uses fixed 91+ semantics, not percent-of-active-cap.

---

# 13. Current integration dependency

Natural final Palace acceptance still depends on all ten ordinary Hard Work paths being accepted on integrated main.

Fresh worker state at authority re-check:

- Artist/Geisha is shipped;
- voluntary Prostitute is shipped;
- Assassin producer is under Chat 3 repair after Chat 2 assembly CI found one real natural-lifecycle failure:
  - 981 total;
  - 980 pass;
  - 1 fail;
  - Assassin contract remains at `intel` instead of naturally closing.

Therefore:
- generic D23 contract can be designed now;
- final natural 10/10 -> all-ten-active -> Day-1 invitation acceptance must wait for repaired Assassin integration.

Do not claim Palace COMPLETE before that end-to-end acceptance.

---

# 14. Safe work before Q1/Q2 and shared-owner assignment

Safe now:
- keep v1 Palace foundation frozen;
- retain authority-safe RU/EN Palace copy;
- update Palace acceptance plans to D23 all-ten-active;
- prepare deterministic invitation authored copy against the generic event contract;
- prepare D18 tests as fixed `>=91` on all 12 stats;
- prepare cap-200 test expectations without runtime mutation;
- keep relationship/item/Night content generic and Palace-local.

Not safe yet:
- mutate Save schema;
- replace Hard Work bonus implementation owned by Chat 4/shared integration;
- add exact cap-200 reward IDs;
- add exact New Start+ UI IDs;
- invent Prince victory ID/mechanics;
- choose Palace progression topology/production IDs without Q2;
- modify Secret Debt to block Palace.

---

# 15. Handoff state

This v3 packet intentionally makes **no shared runtime change**.

It resolves the Palace plan around:
- permanent 10/10 + current-run active 10/10;
- immutable per-run package snapshot;
- deterministic Day-1 latched invitation;
- Secret Debt orthogonality;
- fixed D18 raw threshold `>=91` even in cap-200 lives;
- cap-only 200 semantics with no value multiplication;
- Save migration and dynamic UI requirements;
- already-authorized generic relationships / optional legacy items / voluntary Night;
- only two remaining Product questions.

No PR.
No full CI.

After commit, freeze the exact packet SHA and report:

`READY_FOR_LEADER_DECISION`
