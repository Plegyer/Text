# Integration Evidence by Change Class v1

Date: 2026-09-27  
Purpose: define minimum merge/integration evidence for each change class.

## Global rules

1. No PASS count without execution.
2. Exact-head evidence only.
3. Ownership/authority review is required for every class.
4. Full-check requirements increase with production risk.
5. Post-merge smoke is required when integration behavior may differ from branch behavior.

---

# Docs-only

Minimum review:
- changed paths are docs only;
- authority references valid;
- no contradictory locks;
- no stale branch-only pointer presented as current.

Targeted test:
- none unless docs generate code/data.

Full check:
- not required solely for docs.

Post-merge:
- verify files present and authority/index consistent if docs are promoted to authority.

Evidence class:
`DOCS_REVIEW_GREEN`

---

# Fixtures-only

Minimum review:
- fixture path/test ownership;
- fixture excluded from production shipping;
- IDs do not collide with production;
- no Product choice encoded as canon.

Targeted:
- parser/validator or intended consuming test.

Full check:
- preferred if fixture is imported by full suite.

Post-merge:
- verify no fixture leaked into production dist.

Evidence class:
`FIXTURE_VALIDATED`

---

# Tests-only

Minimum review:
- current APIs/IDs;
- no stale assumptions;
- test asserts intended authority;
- no test-only fixture promoted to Product truth.

Targeted:
- new test(s) must execute.

Full check:
- required before counting test as retained regression evidence.

Post-merge:
- optional if exact merge-ref/full integration check already executed.

Evidence class:
`TEST_ONLY_EXECUTED_GREEN`

Without execution:
`TEST_ONLY_REVIEW_GREEN_PENDING_EXECUTION`

---

# Production content/data

Minimum review:
- authority/product decisions;
- namespace uniqueness;
- read/write boundaries;
- cross-system public interfaces;
- presentation IDs/fallbacks;
- save/reload contract;
- no locked-rule drift.

Targeted:
- content validation;
- domain tests;
- natural-path acceptance where claiming reachability.

Full check:
- required.

Post-merge:
- shipped-dist/content smoke required.

Evidence class:
`CONTENT_INTEGRATION_GREEN`

---

# Runtime/schema

Minimum review:
- generic necessity demonstrated;
- one authoritative state owner;
- migration/save compatibility;
- atomicity;
- no career-specific hardcoding in shared core.

Targeted:
- new/changed API tests;
- old-save compatibility;
- negative/corruption tests.

Full check:
- mandatory.

Post-merge:
- required smoke for affected flows.

Evidence class:
`RUNTIME_INTEGRATION_GREEN`

---

# UI/presentation runtime

Minimum review:
- mechanics remain outside media timing;
- semantic presentation identity;
- fallback;
- animation-off equivalence;
- UI action dispatch matches engine contract.

Targeted:
- UI tests;
- presentation/fallback tests;
- save/reload identity when pending.

Full check:
- mandatory for runtime/UI behavior.

Post-merge:
- recommended/required for central-stage or action-flow changes.

Evidence class:
`UI_PRESENTATION_GREEN`

---

# Build/packaging

Minimum review:
- build configuration;
- included files/assets;
- no test fixture leakage;
- platform assumptions.

Targeted:
- build/package command;
- artifact inspection;
- install/launch smoke where applicable.

Full check:
- required unless package job already includes all checks.

Post-merge:
- required for release artifact.

Evidence class:
`PACKAGING_GREEN`

---

# Combined change classes

Use the strictest applicable class.

Examples:

- docs + tests => tests-only evidence requirements;
- content + UI => content + UI requirements;
- schema + content => runtime/schema requirements plus content validation;
- assets + presentation registry => UI/presentation/content validation.

Do not classify by the majority of changed files.

One risky production file is enough to raise the evidence requirement.

---

# Ownership evidence

Every class records:

```text
branch:
base:
head:
changed paths:
expected owner:
ownership conflicts:
```

Ownership PASS is independent from test PASS.

---

# Targeted evidence table

| Change class | Targeted execution | Full check | Post-merge |
|---|---|---|---|
| docs-only | no | no | authority presence if promoted |
| fixtures-only | validator/consumer | preferred | dist leak check |
| tests-only | yes | yes before retained-floor claim | optional |
| production content/data | yes | yes | yes |
| runtime/schema | yes | yes | yes |
| UI/presentation runtime | yes | yes | yes for flow changes |
| build/packaging | build/package | yes | artifact smoke |

---

# Locked-invariant evidence

When relevant, every integration should report exact checks for:
- Lumber Hard Work = 50 completed shifts only;
- `hardWork:lumber`;
- Palace = 10/10 ordinary Hard Work;
- hidden careers excluded from Palace;
- School paid lesson baseline;
- Night exactly-once;
- inventory-derived capabilities;
- GIF mechanics independence.

Do not rely on “unrelated change” when the changed files can affect a locked contract.

---

# Open Product decisions

Every integration evidence block must state unresolved decisions intentionally left open.

Examples:
- token source;
- consume policy;
- School threshold;
- hunter identity;
- poverty balance;
- art priorities.

A PR that does not choose an open decision should say so explicitly.

---

# Exact-head execution format

Record:

```text
Observed SHA:
typecheck:
validate:
build:
targeted:
tests total/pass/fail/skip:
workflow/run:
```

If not observed:
`NOT_RUN / NOT_OBSERVED`

Never infer values.

---

# Post-merge smoke rule

Required when:
- branch merged against newer main may alter behavior;
- runtime/schema changed;
- production content changed;
- packaging changed;
- UI flow changed.

Smoke should exercise the smallest real natural path crossing the modified boundary.

Docs-only does not require gameplay smoke.

---

# PR29 classification example

Change class:
`tests-only`

Static review:
green.

Executable evidence observed through connected environment:
none.

Correct current state:
`TEST_ONLY_REVIEW_GREEN_PENDING_EXECUTION`

Not:
`TEST_ONLY_EXECUTED_GREEN`

No production runtime/UI/content file was modified by Chat 4.
