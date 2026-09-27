# Full-Game Package CI Evidence Template v1

Date: 2026-09-27  
Purpose: standard evidence block for every future Lead integration PR.

## Rule

Do not write PASS unless the corresponding command/check was actually observed on the stated SHA.

This template records evidence; it does not create evidence.

---

# Integration identity

```text
PR:
Package:
Base branch:
Base SHA:
Head branch:
Head SHA:
Merge-ref / integration SHA:
Reviewer:
Date:
```

If the reviewed head changes, start a new evidence block.

---

# Changed paths

Record every changed path or a reviewed exact list.

```text
Changed files:
- ...
```

Then classify:

- production runtime;
- schema;
- UI;
- production content;
- QA test;
- fixture;
- docs;
- assets.

## Ownership result

```text
Expected owner:
Observed owner/branch:
Shared-file ownership conflict: YES / NO
```

Do not mark ownership green merely because Git merges cleanly.

---

# Authoritative source

```text
Product/design authority:
Locked decisions applied:
Open Product decisions intentionally not selected:
```

Examples of open decisions that must be named when relevant:

- threshold;
- item acquisition source;
- consume policy;
- NPC identity;
- route identity;
- exact reward;
- balance value.

---

# Typecheck

Command:

```bash
npm run typecheck
```

Evidence:

```text
Status: PASS / FAIL / NOT_RUN / NOT_REQUIRED
Observed SHA:
Log/run reference:
Failure summary:
```

Do not infer from build success unless the project command explicitly includes typecheck and the log proves it.

---

# Content validation

Command:

```bash
npm run validate
```

Evidence:

```text
Status:
Observed SHA:
Catalog counts:
Validation warnings:
Failure summary:
```

When package adds content, record relevant counts such as:

- packs;
- events;
- actions;
- endings;
- item definitions;
- Activity definitions

where the validator reports them.

---

# Build

Command:

```bash
npm run build
```

Evidence:

```text
Status:
Observed SHA:
Built targets/artifacts:
Failure summary:
```

If release depends on generated `dist/content.json`, record that build completed before dist smoke.

---

# Targeted tests

List tests specifically added/affected by the package.

Template:

| Test / command | Result | What contract it proves |
|---|---|---|
| `tests/foo.test.ts` | PASS/FAIL/NOT_RUN | |
| `tests/bar.test.ts` | PASS/FAIL/NOT_RUN | |

Do not substitute a full-suite green count for understanding what new targeted tests actually cover.

---

# Full test suite

Command:

```bash
npm test
```

or project-standard:

```bash
npm run check
```

Record exact totals:

```text
tests:
pass:
fail:
skip:
duration if available:
observed SHA:
workflow/run:
```

Current inherited technical floor after PR27:

**221/221**

Future integration should not reduce effective regression coverage without an explicit stronger replacement.

---

# Full check

If `npm run check` aggregates:

- typecheck;
- validate;
- build;
- tests;

record the exact aggregate result.

```text
npm run check:
PASS / FAIL / NOT_RUN
```

If one sub-step is skipped, do not label aggregate full check PASS.

---

# Shipped-dist evidence

If production content/assets changed:

Run/record the appropriate shipped-dist smoke.

Evidence should check:

- production definitions serialized;
- correct packs included;
- no fixture-only pack leaked;
- semantic presentation references valid;
- required asset paths exist;
- exact locked ending/reward contracts remain.

```text
Dist smoke:
Status:
Observed dist build SHA:
```

---

# Save/reload evidence

For stateful package, name exact checkpoints exercised.

Examples:

- after paid action;
- pending event;
- Night after lodging;
- active Activity;
- ending committed;
- completed RunResult;
- New Run.

Template:

| Checkpoint | Reload result | Duplicate transaction? |
|---|---|---|
| | PASS/FAIL/NOT_RUN | yes/no |

A package with no stateful behavior may mark N/A with reason.

---

# Cross-system boundary evidence

If package provides or consumes public state, record exact boundary.

```text
Provider:
Public boundary ID/type:
Consumer:
Trigger:
Reload test:
```

Examples:

- worldFact;
- career fact;
- item capability;
- ActivityResult;
- relationship stage;
- Meta unlock.

Do not accept direct reads of another domain's private implementation state as undocumented integration.

---

# Locked invariant checks

List all locked rules potentially touched.

Template:

| Locked invariant | Result | Evidence |
|---|---|---|
| Lumber Hard Work only 50 shifts | PASS | |
| `hardWork:lumber` exact | PASS | |
| Palace 10/10 ordinary Hard Work | PASS | |
| hidden careers excluded from Palace | PASS | |
| School lesson 1 Energy | PASS | |
| GIF mechanics-independent | PASS | |

Only include relevant rows, but do not omit a touched lock.

---

# Product decisions intentionally left OPEN

Explicitly list decisions the PR did not select.

```text
OPEN:
- ...
```

This protects against later false closure.

A test or fixture may contain a temporary value only if it is clearly non-canonical.

---

# Presentation evidence

For package with new scene/content:

```text
Semantic presentation IDs:
Fallback:
Missing media nonfatal test:
Animation Off equivalence:
Pending save/reload identity:
```

Follow:

`GIF_FIRST_FULL_GAME_QA_GUARDRAILS_v1.md`.

---

# Negative-path evidence

Every meaningful production package should name at least one invalid/unavailable case.

```text
Negative case:
Expected rejection:
Atomic state unchanged evidence:
```

Examples:

- insufficient money;
- missing capability;
- wrong stage;
- blocked Night;
- duplicate option;
- stale save;
- repeated completion.

---

# Full-scope preservation check

For whole-project/handoff-changing PRs:

```text
Product scope sentinel reviewed: YES / NO / N/A
Omitted surfaces:
Authority update if scope intentionally changed:
```

Use:

`PRODUCT_SCOPE_OMISSION_SENTINEL_MATRIX_v1.md`.

---

# Post-merge smoke

Required when runtime/content changes could integrate differently on main.

Record:

```text
Post-merge smoke required: YES / NO
Smoke:
Main SHA:
Result:
```

Docs-only or isolated QA-only PR may state N/A.

Do not claim post-merge evidence before merge.

---

# Deployment / external provider status

Keep external deployment status separate from game acceptance.

```text
Deployment:
Provider:
Status:
Does this indicate game-test failure? YES / NO
```

Example:

a provider quota failure is an ops limitation, not a test failure.

---

# Final integration disposition

Choose one:

## GREEN_FOR_MERGE

All required evidence is present and green for the exact reviewed head/integration SHA.

## GREEN_FOR_MERGE_PENDING_STANDARD_FULL_CHECK

Static/targeted review is green, but standard CI/full check is not yet observed.

Use only when policy permits merge gate to supply the final check.

## BLOCKED_TEST_FAILURE

A required test/check is red.

## BLOCKED_OWNERSHIP

Changed paths violate ownership.

## BLOCKED_LOCKED_RULE_DRIFT

Package contradicts authority.

## BLOCKED_HUMAN_DECISION

Package selects or depends on an unresolved Product decision.

## BLOCKED_FALSE_CLOSURE

Fixture/seeded evidence is represented as full Product reachability.

---

# Compact evidence block

Copy into a PR handoff:

```text
Package:
Base:
Head:
Changed paths:
Ownership: PASS/FAIL
typecheck:
validate:
build:
targeted:
full tests:
full check:
save/reload:
presentation:
locked invariants:
OPEN decisions preserved:
post-merge smoke:
Disposition:
```

No claim may be filled with an unobserved PASS.
