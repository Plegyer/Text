# Production Content Natural-Path Evidence Rule v1

Date: 2026-09-27  
Purpose: define what counts as natural-path Product evidence versus accelerator/fixture evidence.

## Core distinction

A production acceptance claim must separate:

- **natural player reachability**;
- **runtime boundary evidence**;
- **threshold acceleration**;
- **fixture-only setup**.

No direct state injection may be silently counted as a complete authored Product path.

---

# 1. Natural-path acceptance

A behavior is naturally reachable when:

1. the player starts from a valid production state;
2. uses production UI/commands/content;
3. follows authored unlock/acquisition conditions;
4. reaches the target without direct Save mutation or fixture-only provider;
5. save/reload remains valid at relevant boundaries.

Examples:

- Lumber shift from normal Work;
- paid School lesson;
- street lodging from Night;
- Forest logging-road route after normal Activity entry.

Classification:
`NATURAL_REACHABILITY_PROVEN`

---

# 2. Accelerator evidence

An accelerator compresses repetition while keeping the boundary under test real.

Valid example:

```text
completed_shifts=49
-> real lumber.shift
-> 50 threshold transition
```

The accelerator is acceptable because:
- the product path to shifts exists;
- the boundary transition itself is executed normally;
- no ending eligibility/reward is injected.

Classification:
`ACCELERATOR_BOUNDARY_EVIDENCE`

---

# 3. Invalid false-natural claim

Invalid:

```text
inject ending eligibility
-> commit ending
```

and claim natural ending reachability.

Invalid:

```text
inject public fact
-> continuation appears
```

and claim provider path complete.

Injected output state bypasses the actual Product requirement.

---

# 4. Item acquisition rule

If a package claims an item/capability is naturally part of gameplay:

Required:
- authored acquisition source;
- production command/event/reward;
- owned inventory state reached normally;
- capability derived from that inventory;
- downstream action-space change.

Seeded:

`inventory.old_boundary_token=1`

proves capability runtime only.

Until a real source exists:
`FIXTURE_OR_ACCELERATOR_ONLY`

not:
`NATURAL_REACHABILITY_PROVEN`.

---

# 5. Career unlock rule

For future careers, a direct career-state seed cannot prove unlock.

Natural-path evidence must execute:
- prerequisite progression;
- unlock condition;
- discovery/availability;
- first real Work command.

Long prerequisites may use a boundary accelerator only if:
- prerequisite path itself exists;
- final unlock transition executes through real rules.

---

# 6. School rule

Natural School evidence requires:
- actual course/lesson command;
- real tuition/Energy;
- typed progress;
- real Resolver/public result where claimed.

Injecting:
- School milestone fact;
- lesson counter;
- management-ready fact

cannot prove authored School provider reachability.

---

# 7. Poverty rule

Natural ordinary-poverty path may begin with a boundary state such as zero money if testing anti-softlock, provided:
- money=0 is clearly labeled setup;
- street lodging/night/recovery commands are real.

Natural Secret Debt requires more:
```text
street sleep
-> real lender trigger
-> accept/refuse
-> delay
-> activation
```

Direct debt-active fixture is runtime evidence only.

---

# 8. Activity rule

Natural Activity evidence requires:
- real entry;
- real route/action availability;
- real route selection;
- real challenge/progress;
- real result.

Directly setting:
- routeId;
- progress;
- result;
- emitted fact

cannot prove full Product path.

A progress threshold may be accelerated only if the final boundary action remains real and the content path is otherwise authored.

---

# 9. Relationship rule

Natural relationship evidence requires:
- real initiating event/fact;
- real stage transition;
- real choice;
- subsequent route availability.

Direct stage seed proves downstream mechanics only.

Do not label it natural relationship acquisition.

---

# 10. Night rule

Natural Night evidence requires:
- real endDay;
- real lodging/intercept;
- real Night choice/forced event;
- real next-day transition.

Directly constructing a NightFlow envelope is valid parser/runtime QA but not full Product reachability.

---

# 11. Ending rule

Natural ending evidence requires:
- real eligibility computation from authored state;
- no injected eligible ID;
- explicit commit;
- explicit completion;
- exact reward transaction.

Long counters may be accelerated only for boundary testing.

Complex-ending facts must come from real authored providers if claiming natural full-path acceptance.

---

# 12. Meta/Palace rule

Natural Palace unlock evidence requires:
- actual recorded ordinary Hard Work Meta progress;
- all 10 required ordinary careers according to the accepted rule;
- no hidden ending substitution.

A direct Meta list seed may prove unlock predicate mechanics only.

At least one full representative chain should use real ending completion into Meta before unlock.

---

# 13. Fixture-only evidence

Fixtures are valid for:
- validator tests;
- parser tests;
- generic condition/effect tests;
- corrupt-save tests;
- isolated adapter behavior.

Label:
`FIXTURE_RUNTIME_EVIDENCE`

Fixtures do not prove:
- production authoring;
- natural unlock;
- player reachability;
- accepted Product identity.

---

# 14. Long-threshold accelerator rules

Allowed if all are true:
- threshold itself is authoritative;
- repeated path already production-shipped;
- setup changes only the repetition count/resource needed for compression;
- final boundary action executes normally;
- pre-boundary and post-boundary assertions both checked.

Do not inject:
- downstream result;
- ending eligibility;
- reward;
- unrelated cross-system facts.

---

# 15. Representative no-injection path per shipped subsystem

Each shipped subsystem needs at least one representative path without fixture-only state injection.

Examples:

## Career
real Work -> real milestone.

## School
real lesson -> real pending scene/public result.

## Poverty
real Night street continuation.

## Activity
real entry -> route -> result.

## Relationship
real trigger -> route/stage.

## Ending
real eligibility -> commit -> completion.

This representative path need not exhaust all content.

---

# 16. Reporting vocabulary

Use exactly one primary reachability label:

- `NATURAL_REACHABILITY_PROVEN`
- `ACCELERATOR_BOUNDARY_EVIDENCE`
- `FIXTURE_RUNTIME_EVIDENCE`
- `NOT_NATURALLY_REACHABLE_YET`

Then optionally add:
- `CONTENT_DEPTH_OPEN`
- `HUMAN_DECISION_BLOCKED`
- `INTEGRATED_AND_TESTED`

Avoid vague:
- “basically works”
- “covered”
- “done”

without reachability class.

---

# 17. Evidence block

For every acceptance claim record:

```text
Target behavior:
Start state:
Direct mutations:
Why mutations are/are not accelerators:
Production commands executed:
Natural acquisition/unlock:
Reload checkpoints:
Final classification:
Open authoring:
```

If direct mutations are non-empty, justify each.

---

# 18. Cross-system provider rule

If behavior depends on another system's output, natural acceptance must include the provider path.

Example:

School -> Lumber management result.

It is not enough to inject:
`lumber.school.management-ready`.

Need:
`real School progression -> accepted School provider -> public boundary -> Lumber reaction`.

---

# 19. Content-pack integration rule

A content pack may be:
`AUTHORED_NOT_INTEGRATED`

even if branch tests prove natural reachability on that branch.

Shipped natural acceptance requires integration to main/release candidate plus exact-head tests.

---

# 20. Final principle

Runtime capability answers:
“Can the engine support this?”

Natural-path evidence answers:
“Can the player actually reach this through the authored game?”

Never use the first as a substitute for the second.

No production runtime/UI/content file was modified by Chat 4.
