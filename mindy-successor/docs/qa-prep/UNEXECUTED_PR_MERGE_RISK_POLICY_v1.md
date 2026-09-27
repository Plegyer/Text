# Unexecuted PR Merge-Risk Policy v1

Date: 2026-09-27  
Purpose: define Lead handling when code review is green but no executable CI/full-check result is observable.

## Global rule

**Never fabricate PASS evidence.**

Static review can establish:
- ownership correctness;
- contract consistency;
- syntax plausibility;
- absence of obvious locked-rule drift.

Static review cannot establish:
- tests pass;
- build passes;
- runtime integration works;
- exact full-suite count.

---

# Docs-only PR

## Sufficient evidence to merge

May merge without runtime CI when:
- changed paths are documentation only;
- authority/ownership verified;
- references exist;
- no code/content/runtime claim depends on unexecuted behavior.

Required disposition:
`DOCS_REVIEW_GREEN`

Do not claim a new test count.

---

# Fixtures-only PR

## Sufficient evidence

Usually requires at least:
- schema/content shape review;
- fixture excluded from shipped build;
- targeted parser/validator test if fixture is intended to execute.

If no executable validation is available:
`GREEN_PENDING_EXECUTION`

Do not merge if the fixture could leak into production build or depends on unresolved Product choices.

---

# Tests-only PR

## Review-green is not executable-green

Static review may conclude:
`GREEN_FOR_MERGE_PENDING_STANDARD_FULL_CHECK`

Required before or at integration:
- test compiles;
- targeted test runs;
- standard project full check or merge gate runs.

If connected environment cannot observe execution, Lead must obtain execution through the normal integration environment before treating the new test as retained regression evidence.

---

# Production content/data PR

Must remain open without executable validation unless repository policy explicitly supplies an integration gate that will execute before merge.

Required evidence:
- content validation;
- build;
- targeted content tests;
- full check;
- save/reload where stateful;
- presentation/dist checks where relevant.

Static green alone is insufficient.

Disposition without execution:
`BLOCKED_PENDING_EXECUTABLE_EVIDENCE`

---

# Runtime/schema PR

Must remain open without execution.

Required:
- typecheck;
- targeted tests;
- schema/save compatibility;
- full check;
- migration/reload evidence where persisted state changes.

Static review cannot justify merge.

---

# UI/presentation runtime PR

Requires execution when behavior changes.

Minimum:
- typecheck/build;
- targeted UI/presentation tests;
- missing-media/fallback checks if relevant;
- full check.

Pure CSS/text-only cosmetic change may be handled more lightly, but no mechanics claim may be made without tests.

---

# Build/packaging PR

Must execute build/package path.

Required:
- build success;
- artifact generation;
- shipped-content/media check;
- platform smoke where package-specific.

No static substitute exists.

---

# PR29 concrete example

PR29 changes one test file only:

`tests/poverty-production-contract.test.ts`

Static Chat 4 review found:
- test-only ownership;
- current IDs/API consistent;
- no exact open lodging price frozen;
- no exact street penalty frozen;
- Hard Work/Forest untouched.

But no executable GitHub Actions result was observable on the reviewed head.

Correct classification:

`GREEN_FOR_MERGE_PENDING_STANDARD_FULL_CHECK`

Not:
- `CI_GREEN`
- `TESTS_PASS`
- a fabricated test count.

If Lead later runs the exact-head integration/full check successfully, then record the observed result separately.

---

# Exact-head rule

Executable evidence is valid only for the SHA tested.

If the PR head changes after a green run:
- old run becomes stale evidence;
- rerun required for executable-green status.

---

# Merge wording rules

Allowed:
- “static review green”
- “contract review green”
- “pending standard full check”
- “no executable result observed”

Forbidden without execution:
- “tests pass”
- “build green”
- “full check green”
- exact pass count.

---

# Final decision matrix

| Change class | Static review enough to merge? | Executable evidence required |
|---|---:|---:|
| docs-only | often yes | no runtime CI required |
| fixtures-only | sometimes | validator/targeted if executable fixture |
| tests-only | only if merge gate will execute before final acceptance | yes for retained regression status |
| production data | no | yes |
| runtime/schema | no | yes |
| UI/presentation runtime | no | yes |
| build/packaging | no | yes |

No production runtime/UI/content file was modified by Chat 4.
