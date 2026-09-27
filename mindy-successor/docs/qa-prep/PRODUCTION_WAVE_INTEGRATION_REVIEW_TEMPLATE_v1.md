# Production Wave Integration Review Template v1

Date: 2026-09-27  
Purpose: reusable Lead review for integrating completed multi-worker production-prep waves.

## Scope

Use when several workers have completed a coordinated wave such as:

- career production prep;
- School + presentation + QA prep;
- poverty + Night + content prep;
- Activity + item + presentation prep.

This template is for integration review, not a substitute for individual worker verification.

---

# Wave identity

Record:

```text
Wave name:
Current main SHA:
Lead integration branch:
Workers included:
Worker branches:
Task files:
Review date:
```

---

# 1. Verify each worker deliverable first

For every worker, apply:

`WORKER_QUEUE_DELIVERABLE_VERIFICATION_TEMPLATE_v1.md`

Record:

| Worker | Branch | Expected items | Files verified | Ownership clean | Status |
|---|---|---|---|---|---|
| Chat 2 | | | | | |
| Chat 3 | | | | | |
| Chat 4 | | | | | |
| Chat 5 | | | | | |

Do not integrate a wave based on completion messages alone.

---

# 2. Cross-worker changed-path ownership

Build a union of all changed paths.

Check:

- no file edited by two workers without reassignment;
- shared runtime/schema/UI ownership is explicit;
- one worker did not overwrite another worker's fixture/doc;
- Lead-owned files were not modified out of scope.

Classify conflicts:

- NONE
- DOC_ONLY_OVERLAP
- TEST_OVERLAP
- SHARED_RUNTIME_CONFLICT
- CONTENT_OWNERSHIP_CONFLICT

A clean Git merge does not prove ownership correctness.

---

# 3. Cross-worker contradiction check

Compare worker outputs for contradictory assumptions.

Common contradiction families:

- different canonical IDs for same Product concept;
- different threshold assumptions;
- different item capability identities;
- different route semantics;
- different School provider identity;
- different presentation semantic IDs;
- one worker treats a decision OPEN while another treats it LOCKED.

For each contradiction:

```text
Topic:
Worker A claim:
Worker B claim:
Authority:
Resolution:
```

Do not resolve ambiguity by choosing whichever branch is newer.

---

# 4. Locked-invariant check

Review all wave artifacts against locked rules.

At minimum when relevant:

- 10 ordinary careers preserved;
- Palace = 10/10 ordinary Hard Work;
- hidden careers excluded;
- Lumber Hard Work exact;
- School baseline;
- Night costs/timing;
- item capability ownership;
- presentation timing independence;
- ending/Meta exactly-once.

Record any apparent drift before integration.

---

# 5. Full-scope preservation

If the wave updates:

- roadmap;
- handoff;
- project state;
- authority/index;
- release scope

run:

`PRODUCT_SCOPE_OMISSION_SENTINEL_MATRIX_v1.md`.

Confirm the wave does not narrow the project to the currently implemented slice.

---

# 6. Authority subset selection

Workers often produce many useful docs.

Lead should not promote all of them to equal authority.

Classify each artifact:

- CURRENT_AUTHORITY
- IMPLEMENTATION_INPUT
- QA_GATE
- EVIDENCE_ONLY
- HISTORICAL
- SUPERSEDED
- DO_NOT_INTEGRATE

Choose the smallest current authority subset.

Avoid multiple parallel “final” documents with conflicting status.

---

# 7. Superseded-doc identification

For every newly integrated status/handoff document, identify older docs it supersedes.

Do not delete history automatically.

Record:

```text
New authority:
Supersedes:
Keep old file as:
Reason:
```

Stale docs should not continue to appear as equal-current pointers in the main index.

---

# 8. Fixture/production boundary check

Search across all worker artifacts for fixture-only IDs.

For each:

- test-only?
- proposed production?
- already accepted Product identity?
- accidental promotion?

No fixture-only content may become production merely because multiple workers referenced it.

---

# 9. Human-decision consistency

Aggregate all unresolved Product decisions from the wave.

Examples:

- thresholds;
- item sources;
- consumption;
- route names;
- NPC identities;
- reward values;
- content scope.

Check that no worker independently selected one.

Produce one neutral combined ledger if necessary.

---

# 10. Runtime-change necessity review

Before accepting any shared-core/runtime changes, ask:

1. Is there an accepted Product requirement the current runtime cannot express?
2. Is the missing primitive demonstrated by authored content?
3. Can current conditions/effects/state already model it?
4. Is the proposed change generic rather than career-specific hardcoding?
5. Does it preserve old saves?

If no demonstrated missing primitive exists:

**DO NOT REOPEN GREEN RUNTIME**

Many worker waves should integrate docs/tests/content only.

---

# 11. Content-package readiness

For each production-target content pack, apply:

`FULL_GAME_CONTENT_PACK_ACCEPTANCE_CHECKLIST_v1.md`.

Record:

| Package | Decision ready | Authoring complete | Main integration ready | Tests ready |
|---|---|---|---|---|
| | | | | |

Do not bulk-promote design drafts.

---

# 12. Presentation compatibility

For every new package:

- semantic IDs consistent;
- no collisions;
- fallback valid;
- media optional where allowed;
- no mechanics tied to GIF.

Use:

`GIF_FIRST_FULL_GAME_QA_GUARDRAILS_v1.md`.

Cross-worker presentation IDs must be reviewed together before merge.

---

# 13. Save/reload integration matrix

Union all new persisted boundaries.

Examples:

- new career milestone;
- new School milestone;
- debt activation;
- Activity route;
- relationship Night event;
- ending.

Ensure tests do not cover only isolated subsystems.

Add at least one cross-package save/reload path where the wave introduces interacting systems.

---

# 14. Duplicate QA/evidence review

Workers may independently create similar tests.

Compare:

- behavior covered;
- fixture type;
- current semantics;
- failure signal.

Keep:

- stronger current test;
- truly orthogonal tests.

Avoid integrating redundant stale tests only to increase count.

---

# 15. Stale-base review

Before copying from long-lived branches, apply:

`WORKER_BRANCH_STALE_BASE_RISK_CHECKLIST_v1.md`

when available/current.

At minimum inspect:

- merge base;
- behind/ahead;
- assumptions invalidated by newer main;
- superseded negative tests.

Do not bulk merge a branch built against obsolete runtime semantics.

---

# 16. Integration method selection

For each branch choose:

- FULL_BRANCH_MERGE
- SELECTIVE_CHERRY_PICK
- FILE_COPY_REBASE
- DOCS_ONLY_INTEGRATION
- EVIDENCE_ONLY_NO_MERGE

Use full branch merge only when all commits remain current and ownership-clean.

Prefer selective integration for long-lived prep branches.

---

# 17. CI requirements for docs-only wave

If all integrated files are docs only:

- runtime full CI may be N/A;
- documentation consistency checks still apply;
- Git path/authority verification required.

Do not fabricate test evidence for docs-only changes.

---

# 18. CI requirements for tests/fixtures

If wave integrates QA tests/fixtures:

Require exact integration SHA:

- typecheck;
- validate;
- build;
- full tests where project check includes all;
- targeted new tests.

Use:

`FULL_GAME_PACKAGE_CI_EVIDENCE_TEMPLATE_v1.md`.

---

# 19. CI requirements for production content/runtime

If any production content/runtime/UI changes:

Require:

- exact-head full check;
- content validation;
- targeted package tests;
- save/reload;
- shipped-dist contract;
- post-merge smoke;
- locked-invariant regression subset.

No older-head green result is sufficient.

---

# 20. Regression floor preservation

Current known floor after PR27:

**221/221**

A wave may raise the floor.

It may not silently remove coverage.

If a test is replaced:

- name replacement;
- map old invariant to new test;
- preserve historical evidence.

---

# 21. Wave integration output

Lead should publish a compact wave result:

```text
Integrated:
Deferred:
Evidence-only:
Superseded:
Human decisions still open:
Runtime changes accepted:
Runtime changes rejected:
Targeted CI:
Full CI:
New main SHA:
Next production packages:
```

---

# 22. Final wave disposition

Choose one:

## WAVE_READY_TO_INTEGRATE

All selected artifacts are current, authority-consistent and ownership-clean.

## WAVE_READY_SELECTIVE_ONLY

Some artifacts are current, others stale/redundant.

## WAVE_BLOCKED_CONTRADICTION

Workers disagree on Product/contract identity.

## WAVE_BLOCKED_OWNERSHIP

Shared file ownership violated.

## WAVE_BLOCKED_HUMAN_DECISION

Production authoring depends on unresolved Product choice.

## WAVE_BLOCKED_CI

Required exact-head test/validation evidence is red.

This template does not itself change runtime acceptance.
