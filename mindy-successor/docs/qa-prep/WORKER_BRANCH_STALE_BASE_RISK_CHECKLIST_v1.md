# Worker Branch Stale-Base Risk Checklist v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Purpose: Lead checklist before integrating long-lived worker branches.

## Why this exists

Workers intentionally stay on long-running branches while Lead integrates main asynchronously.

That model creates real stale-base risk even when Git reports a clean merge.

A branch can be textually mergeable and still encode obsolete semantics.

---

# 1. Record branch ancestry

Before review capture:

```text
worker branch:
worker HEAD:
current main:
merge base:
ahead:
behind:
task file:
last worker commit:
```

Do not review a worker branch without knowing how far it diverged.

---

# 2. Identify base-era semantics

Record which major milestones landed on main after the worker merge base.

Examples:

- presentation runtime;
- School first-class command;
- production activation;
- item capability closure;
- Activity options;
- one-Save E2E;
- schema4 hardening;
- poverty contracts.

Every post-base milestone is a candidate source of stale assumptions.

---

# 3. Changed-path ownership

Compare worker changed paths to current ownership.

Check:

- worker still owns those paths;
- Lead/main did not replace the same file;
- another worker did not assume ownership;
- branch does not contain old shared-runtime edits now superseded by main.

Classification:

- CLEAN
- OWNERSHIP_MOVED
- SHARED_PATH_CONFLICT
- HISTORICAL_BRANCH_ONLY

---

# 4. Re-read current task file

A worker branch may contain old work plus newly appended queue items.

Verify the actual current task file on that branch.

Do not assume the worker should still execute an earlier branch purpose from chat history.

---

# 5. Compare assumptions against current main

Search worker docs/tests for assumptions that main may have superseded.

High-risk examples from this project:

## Presentation

Stale:

- slash semantic `presentationId` should reject;
- missing target media remains blocking.

Current:

- slash semantic IDs are accepted;
- fallback may be valid release behavior.

## Forest / Activity

Stale:

- Forest entry itself requires Old Boundary Token;
- new Activity can immediately `advance` before route selection;
- capability derives from worldFact.

Current:

- general Forest entry;
- route selection first for option-aware model;
- inventory-derived capability.

## School

Stale:

- generic `school` action is the production path;
- no typed School state;
- Night study conflated with paid lesson.

Current:

- first-class `schoolLesson`;
- typed tracks/counters;
- separate Night study.

## Endings

Stale:

- Hard Work reward ID not `hardWork:lumber`;
- commitment and completion conflated.

Current:

- exact reward;
- explicit transaction stages.

---

# 6. Stale negative tests

Negative tests are especially risky on old branches.

A test may correctly have failed old main and become wrong after a deliberate contract fix.

Before integrating any negative test ask:

1. Is the behavior still invalid on current authority?
2. Did a later PR intentionally change it?
3. Does the test reject a now-valid compatibility path?

Examples:

- rejecting semantic slash IDs;
- rejecting old schema4 option omissions that now migrate;
- expecting old-boundary worldFact behavior;
- expecting missing media to be fatal.

If stale:

**DO NOT CHERRY-PICK UNCHANGED**

---

# 7. Stale positive tests

Positive tests can also encode obsolete shortcuts.

Examples:

- direct synthetic School action;
- worldFact capability adapter;
- immediate Activity advance;
- legacy actionCounts as typed progression.

A passing old test is not evidence it still tests the right product.

---

# 8. Duplicate docs/evidence

Long-lived branches often accumulate docs that main later replaced.

Classify each worker doc:

- CURRENT_UNIQUE
- HISTORICAL_EVIDENCE
- DUPLICATE_WEAKER
- SUPERSEDED
- CONTRADICTS_CURRENT_AUTHORITY

Do not integrate multiple “final” handoffs if one newer main authority already exists.

---

# 9. Duplicate tests

Compare worker tests to current main.

Keep a worker test only if it adds:

- distinct boundary;
- stronger assertion;
- broader matrix;
- independent regression signal.

Do not cherry-pick tests that duplicate current coverage line-for-line with stale fixtures.

---

# 10. Locked invariant review

Even if the branch predates a lock, current lock applies at integration time.

Verify:

- Hard Work exact condition/reward;
- Palace 10/10 ordinary Hard Work;
- hidden careers excluded;
- School baseline;
- Night rules;
- item capability ownership;
- presentation timing independence.

A worker branch is not grandfathered into old rules.

---

# 11. Fixture promotion check

Older worker branches often contain temporary fixture IDs.

Before integration search for:

- `fixture`;
- `synthetic`;
- direct world facts;
- seeded item;
- temporary capability;
- arbitrary threshold.

If main now has a real production equivalent, rebase test to production or keep as isolated generic fixture.

Do not copy fixture content into production automatically.

---

# 12. Content pack drift

If worker prepared content before later design decisions:

check:

- IDs;
- thresholds;
- outcomes;
- item policy;
- provider identities;
- presentation slots.

If any changed, prefer re-authoring on current main over force-fitting old pack.

---

# 13. Schema drift

For worker tests/fixtures touching Save:

compare against current schema.

High-risk additions since old base may include:

- typed School state;
- semantic presentationId;
- Activity option model;
- RunResult transaction proof;
- new compatibility defaults.

A fixture that parses only because old schema ignored fields may be invalid now.

---

# 14. Command/API drift

Check imports and commands against current engine.

Examples:

- `schoolLesson`;
- `enterActivity`;
- `activityAction`;
- `endDay`;
- `chooseLodging`;
- `chooseNightChoice`;
- ending commit/completion.

Do not integrate adapters for commands removed or replaced by current APIs.

---

# 15. Current production ID check

Every worker test using a production ID should verify it still exists on main.

Examples:

- event IDs;
- route IDs;
- ending IDs;
- presentation IDs;
- course IDs.

Branch-local content IDs do not count as current production.

---

# 16. Main-behavior replay

For important worker assertions, run or reason them against current main before integration.

Ask:

- would test compile?
- would fixture validate?
- would command sequence be legal?
- does expected pending scene still appear?
- does reload still preserve the same fields?

Do not wait until after cherry-pick to discover obvious semantic drift.

---

# 17. Selective-copy vs full-branch decision

## Use full-branch merge only if

- branch is near current;
- all commits still valid;
- no stale shared-file changes;
- no superseded docs/tests;
- ownership clean.

## Use selective cherry-pick/file copy if

- branch is substantially behind;
- only a few tests/docs remain useful;
- main already replaced some worker assumptions;
- branch includes historical task files.

## Use evidence-only/no merge if

- artifact is useful provenance;
- equivalent stronger current implementation/test exists;
- branch semantics are obsolete.

---

# 18. Rebase is not semantic proof

A clean rebase only proves Git can apply text.

After rebase still verify:

- authority;
- behavior;
- tests;
- Product decisions.

Never equate “no conflict” with “safe”.

---

# 19. Integration test requirements

After selective integration:

If docs only:

- verify references/authority;
- no runtime CI claim needed.

If tests/fixtures:

- typecheck;
- validate/build as applicable;
- targeted tests;
- full check.

If production content/runtime:

- full package gate;
- dist smoke;
- save/reload;
- full check;
- post-merge smoke.

---

# 20. Stale-base review table

Use:

| Artifact | Main-equivalent exists? | Assumptions current? | Ownership clean? | Action |
|---|---:|---:|---:|---|
| | | | | MERGE / COPY / EVIDENCE / DROP |

---

# 21. Final branch disposition

Choose:

## FULL_BRANCH_SAFE

Rare; all branch work remains current.

## SELECTIVE_INTEGRATION_REQUIRED

Preferred for long-lived worker branches with mixed current/stale artifacts.

## EVIDENCE_ONLY

No code/test should be integrated, but history remains useful.

## REWORK_ON_CURRENT_MAIN

Core assumptions obsolete enough that copying old files is riskier than re-authoring.

## BLOCKED_AUTHORITY_CONFLICT

Worker content depends on unresolved or contradictory Product decision.

---

# Current project bias

Because worker branches intentionally remain long-lived and main has advanced through many integration milestones:

**default toward selective integration rather than bulk merge**.

This is a risk-control rule, not a criticism of worker output.

No production runtime/UI/content file was modified by Chat 4.
