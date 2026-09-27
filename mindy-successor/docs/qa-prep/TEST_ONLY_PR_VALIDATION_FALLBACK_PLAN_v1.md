# Test-Only PR Validation Fallback Plan v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Use case: test-only PRs such as PR #29 when GitHub Actions evidence is unavailable.

## Core rule

Code review alone is not executable validation.

A test-only PR may be statically green yet still fail to:
- compile;
- import current APIs;
- run under the real test runner;
- coexist with the full suite.

No PASS count may be claimed without actual execution.

---

# Route A — exact-head local/full check

Preferred fallback when GitHub Actions is unavailable.

## Required

Checkout exact PR head SHA.

Run project-standard full check, for example:

```bash
npm ci
npm run check
```

Record:
- exact SHA;
- command;
- typecheck result;
- validate result;
- build result;
- test total/pass/fail/skip.

## Acceptance

If all required steps pass:
`EXACT_HEAD_FULL_CHECK_GREEN`

This is sufficient executable evidence for a tests-only PR, subject to ownership/contract review.

---

# Route B — exact-head targeted test plus full existing suite

Use when project tooling separates targeted and full suite.

## Required

1. run the new/changed test directly;
2. run the full existing suite on the same exact head;
3. run typecheck/build/validation if the normal project gate requires them.

Example shape:

```text
targeted new test: PASS
full tests: PASS
typecheck: PASS
validate/build: PASS where standard
```

Record exact counts.

## Acceptance

`TARGETED_AND_FULL_SUITE_GREEN`

Do not run only the new test and call the PR fully validated.

---

# Route C — independent environment run

A separate machine/container/CI service may validate the exact head.

Required:
- source SHA verifiable;
- commands recorded;
- environment sufficiently equivalent;
- logs/result retained in Git/PR evidence.

Examples:
- Lead local environment;
- repository-connected build runner;
- independent cloud runner.

## Acceptance

`INDEPENDENT_EXACT_HEAD_GREEN`

The run must be reproducible enough that another integrator can identify what executed.

---

# Route D — merge-ref/integration-branch validation

If policy allows staging the PR onto an integration branch without final merge:

1. create merge-ref/integration commit against current main;
2. run full check there;
3. record both PR head and integration SHA.

This is stronger than head-only validation when main has advanced.

## Acceptance

`INTEGRATION_SHA_GREEN`

Preferred when the PR base is stale.

---

# Why code review alone is insufficient

Static review can confirm:
- test intent;
- correct current IDs;
- likely API compatibility;
- no obvious false Product lock.

It cannot prove:
- TypeScript compiles;
- test discovery works;
- helper behavior matches runtime;
- suite ordering/interactions are safe;
- assertions actually pass.

Therefore:
`STATIC_REVIEW_GREEN`
is not equal to:
`EXECUTED_GREEN`.

---

# Evidence that must be recorded

For whichever fallback route is used:

```text
PR:
PR head SHA:
Current main/base SHA:
Validation route:
Environment:
Commands:
Targeted result:
Typecheck:
Validate:
Build:
Full tests:
Test count:
Pass:
Fail:
Skip:
Integration SHA if applicable:
Log/commit/PR reference:
Reviewer:
Date:
```

Do not omit the SHA.

---

# PR29 concrete application

Current known PR29 facts at authoring:

- PR #29;
- test-only;
- head `bdd26e6dbfcd8feaf207b89a304efc8cc42bb225`;
- static contract review green;
- workflow runs observed through GitHub connector: none.

Therefore current status remains:

`TEST_ONLY_REVIEW_GREEN_PENDING_EXECUTION`

Acceptable fallback routes:
- Route A;
- Route B;
- Route C;
- Route D.

No route is claimed executed by this document.

---

# Stale-base handling

If current main advances beyond the PR base:

Prefer Route D or rebase then exact-head validation.

A green run against the original base does not prove integration with newer main.

For tests-only PRs, merge conflicts may be absent while assumptions are stale.

Apply:
`WORKER_BRANCH_STALE_BASE_RISK_CHECKLIST_v1.md`

when divergence is meaningful.

---

# Validation after head change

If any commit is added after validation:
- previous evidence becomes stale;
- rerun required.

Exception:
none for executable-green status.

Docs-only metadata change in the same PR still changes SHA; record whether policy permits using prior execution plus content-only delta review. If uncertain, rerun.

---

# Minimum evidence by test-only risk

## Pure additive unit test

Need:
- targeted test;
- full suite;
- typecheck if TS.

## Integration/E2E test

Need:
- targeted test;
- full suite;
- build/validate if normal check includes them.

## Save/migration test

Need:
- targeted test;
- full suite;
- parser/schema compatibility context.

## Build/dist test

Need:
- build first;
- targeted dist test;
- full check.

---

# Production PRs remain stricter

This fallback plan does not relax evidence for:
- production content/data;
- runtime/schema;
- UI/presentation runtime;
- build/packaging.

Those classes require their normal integration evidence.

A code-review-green production PR with no executable validation should remain open.

Use:
`INTEGRATION_EVIDENCE_BY_CHANGE_CLASS_v1.md`.

---

# Git evidence expectation

After successful fallback validation, record it in durable repository evidence:
- PR comment;
- integration commit message;
- handoff/status doc;
- workflow/log reference where available.

Do not leave the only proof in transient chat.

---

# Final rule

For test-only PRs:

```text
static review
+
exact-head execution
+
full-suite coexistence
=
retained regression evidence
```

Static review alone is never the last step.

No production runtime/UI/content file was modified by Chat 4.
