# CI Exact-Head Evidence Smoke v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance

## Purpose

Record only CI evidence actually observed for PR31, PR32 and PR33.

No future PR status is claimed here.

---

# PR31 — CI workflow introduction

PR:
`#31 Lead: add exact-head mindy-successor CI full check`

Head SHA:

`ef800058518dd3fbcf3e06249bf89bdb21c2e9f5`

Workflow run:

`36307384356`

Workflow:

`mindy-successor check`

Observed result:

- status: completed
- conclusion: success
- tests: **221**
- pass: **221**
- fail: **0**

Observed validation:

`Content OK: 7 packs, 26 events, 26 actions, 9 endings.`

Observed build:

`Built renderer, content catalog and desktop save validator.`

Interpretation:

**EXACT_HEAD_GREEN**

This is the first observed run of the new repository CI gate.

---

# PR32 — first failing starter-trio attempt

PR:
`#32 Lead: add target Satyr Maid and Undead Farm starter shifts`

Failing intermediate head:

`9d99592b10fb91d4aefc46abd36465749d4e8f80`

Workflow run:

`36307477953`

Observed result:

- status: completed
- conclusion: failure
- tests: **225**
- pass: **224**
- fail: **1**

Observed failing test:

`Satyr Maid and Undead Farm first target shifts persist typed career progress and semantic result identity`

Observed validation before test failure:

`Content OK: 7 packs, 26 events, 28 actions, 9 endings.`

Observed build:

`Built renderer, content catalog and desktop save validator.`

Interpretation:

**EXACT_HEAD_RED**

This run proves the workflow detects target-state integration errors after content validation/build succeed.

---

# PR32 — corrected exact-head rerun

Corrected final PR32 head:

`5ed5728cd5db75b8c27624c510125d0d0584b736`

Relevant correction commits included:

- atomic first-shift transition fix;
- explicit typed-transition regression fix.

Workflow run:

`36307562265`

Observed result:

- status: completed
- conclusion: success
- tests: **225**
- pass: **225**
- fail: **0**

Observed validation:

`Content OK: 7 packs, 26 events, 28 actions, 9 endings.`

Observed build:

`Built renderer, content catalog and desktop save validator.`

Interpretation:

**EXACT_HEAD_GREEN**

PR32 was later closed without merge because main advanced through PR33 and PR34 replaced it on the newer base.

Its green CI remains useful defect/fix evidence, not current merged starter-trio authority.

---

# PR33 — CI-enabled poverty replacement

PR:
`#33 Lead: validate poverty anti-softlock contract under CI`

Head SHA:

`17bbc911a39cd6d726d82c49461cfe18c5b11d02`

Workflow run:

`36307690216`

Observed result:

- status: completed
- conclusion: success
- tests: **223**
- pass: **223**
- fail: **0**

Observed validation:

`Content OK: 7 packs, 26 events, 26 actions, 9 endings.`

Observed build:

`Built renderer, content catalog and desktop save validator.`

Interpretation:

**EXACT_HEAD_GREEN**

PR33 later merged.

Post-merge push evidence is recorded separately in:

`PR33_POST_MERGE_POVERTY_VERIFICATION_v1.md`

---

# Evidence chronology

```text
PR31
ef800058...
run 36307384356
221/221 PASS

PR32 first red
9d99592b...
run 36307477953
224/225 PASS
1 FAIL

PR32 corrected
5ed5728c...
run 36307562265
225/225 PASS

PR33
17bbc911...
run 36307690216
223/223 PASS
```

---

# Rules for using this evidence

## Exact SHA only

A run proves only the head SHA it executed.

Do not apply:
- PR32 225/225
to:
- PR34;
- later main;
- another rebased starter branch.

Every replacement PR requires fresh exact-head CI.

## Failed run remains evidence

Do not erase PR32's first failure from history.

It proves:
- content validated;
- build succeeded;
- state/persistence regression was caught;
- later correction changed the result.

The corrected run supersedes it only for merge readiness, not for defect provenance.

## Test count is not a score

221, 225 and 223 reflect different branch contents.

Do not compare them as quality scores.

Use:
- pass/fail on exact expected suite;
- invariant coverage;
- changed scope.

## No future inference

This document does not claim:
- PR34 status;
- future main status;
- future poverty/content wave status.

Those require their own observed runs.

---

# CI evidence classification vocabulary

Use:

- `EXACT_HEAD_GREEN`
- `EXACT_HEAD_RED`
- `POST_MERGE_GREEN`
- `NO_EXECUTABLE_EVIDENCE`
- `STALE_GREEN_FOR_NEW_BASE`

Do not use:
- “probably green”
- “same code so green”
- copied counts from another SHA.

---

# Final evidence table

| PR/head | Run ID | Tests | Pass | Fail | Result |
|---|---:|---:|---:|---:|---|
| PR31 `ef800058...` | 36307384356 | 221 | 221 | 0 | **GREEN** |
| PR32 `9d99592b...` | 36307477953 | 225 | 224 | 1 | **RED** |
| PR32 `5ed5728c...` | 36307562265 | 225 | 225 | 0 | **GREEN** |
| PR33 `17bbc911...` | 36307690216 | 223 | 223 | 0 | **GREEN** |

No production runtime/UI/content file was modified by Chat 4.
