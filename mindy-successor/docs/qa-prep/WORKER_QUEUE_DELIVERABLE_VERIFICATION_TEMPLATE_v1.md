# Worker Queue Deliverable Verification Template v1

Date: 2026-09-27  
Purpose: reusable Git-verification checklist for Lead/integrator when a worker reports completion.

## Core rule

A worker message saying “done” is not evidence.

Verification must use the actual repository state.

Do not approve from chat prose alone.

---

# Verification header

Record:

```text
Worker:
Task file:
Expected branch:
Observed branch HEAD:
Expected item(s):
Verification time:
Reviewer:
```

---

# 1. Correct branch

Check:

- expected worker branch exists;
- worker did not switch to another chat/owner branch;
- HEAD advanced after the task assignment;
- commits belong to the expected branch history.

Result:

- PASS
- FAIL_WRONG_BRANCH
- FAIL_NO_NEW_COMMIT

---

# 2. Expected files present

For each queue item, list every required path exactly.

Template:

| Queue item | Expected file | Present? | Observed SHA/path |
|---|---|---:|---|
| item N | `path/file.md` | yes/no | |
| item N | `path/test.ts` | yes/no | |

Fail if:

- required file missing;
- similarly named substitute used without task authority;
- file created on another branch only.

Optional files must be labeled optional, not required.

---

# 3. Item-to-commit sequencing

When task requires sequential commits:

Verify:

- item N committed before item N+1;
- no waiting gap is itself an issue only if queue required immediate continuation;
- one later bulk commit did not hide multiple required checkpoints unless task allowed it.

Record commit SHAs:

```text
item N -> <sha>
item N+1 -> <sha>
```

---

# 4. Forbidden/shared-file edit check

Compare branch against its base/current integration point.

Review changed paths.

Fail if worker changed:

- production runtime;
- shared schema;
- UI;
- production content;
- Lead-owned file

when the task explicitly forbids it.

For QA-only tasks, acceptable changes should normally stay under:

- `docs/qa-prep/`;
- worker-owned QA test/fixture paths explicitly allowed by task.

Result:

- PASS_OWNERSHIP
- BLOCKED_SHARED_FILE_EDIT

---

# 5. Task requirements reflected in content

Do not verify only filename existence.

For each bullet in the task:

- find matching section/assertion;
- confirm exact IDs/contracts are correct;
- confirm no required subtopic omitted.

Template:

| Task requirement | Evidence in deliverable | Result |
|---|---|---|
| exact Hard Work rule | section / test assertion | PASS/FAIL |
| save/reload | section / test | PASS/FAIL |
| authoring remains open | section | PASS/FAIL |

If content is empty, generic or unrelated, mark:

**FAIL_DELIVERABLE_CONTENT**

---

# 6. Locked decisions preserved

Check package/deliverable against current locked authority.

Examples:

- Lumber Hard Work remains only `completed_shifts >= 50`;
- reward remains `hardWork:lumber`;
- Palace requires 10/10 ordinary Hard Work;
- hidden careers do not count;
- School baseline remains locked;
- presentation remains semantic-ID/GIF-independent.

Any drift must be:

- explicitly authorized;
- or rejected.

Do not accept “test expectation changed” as authority to change a lock.

---

# 7. Fixture-only assumptions not promoted

Search deliverable for:

- synthetic action IDs;
- direct worldFact injection;
- seeded inventory;
- direct threshold counter mutation;
- fixture-only item/capability;
- prebuilt ending state.

For each usage classify:

- TEST_FIXTURE_ONLY
- LEGITIMATE_ACCELERATOR
- PRODUCT_AUTHORITY
- INVALID_FALSE_CLOSURE

Fail if fixture evidence is described as:

- natural player reachability;
- accepted Product source;
- final threshold;
- shipped content.

---

# 8. Human/Product decisions stay open

Check whether worker silently chose an unresolved value.

Examples:

- School threshold;
- Old Boundary Token source;
- retain/consume policy;
- hunter-trail ID;
- Secret Debt amount;
- lender chance;
- exact presentation art priority.

If task is decision-neutral, deliverable must not prefer or lock one option.

Classification:

- OPEN_PRESERVED
- DECISION_SELECTED_WITH_AUTHORITY
- INVALID_QA_SELECTED_DECISION

---

# 9. Test syntax / compatibility

If worker created executable tests:

Verify against current:

- imports;
- engine command names;
- helper APIs;
- schema fields;
- catalog paths;
- content IDs.

Reject tests that encode stale semantics such as:

- pre-PR22 immediate Forest advance on new option-aware save;
- worldFact as production item capability;
- slash presentationId rejection;
- synthetic School production action.

---

# 10. Validation evidence

If task requires test/CI evidence, record only evidence actually observed.

Template:

```text
typecheck:
validate:
build:
targeted tests:
full tests:
workflow/run id:
head SHA:
```

Allowed values:

- PASS with actual evidence;
- FAIL with exact failure;
- NOT_RUN;
- NOT_REQUIRED.

Never infer PASS from code review alone.

---

# 11. Exact-head rule

If branch moved after a green run:

older green evidence is not final evidence for the new head.

Verify:

- workflow SHA == reviewed SHA;
- or document that only static/doc review was required.

Classification:

- EXACT_HEAD_GREEN
- STALE_GREEN_EVIDENCE
- NO_CI_REQUIRED

---

# 12. Integration subset identified

For worker branches with multiple artifacts, require a handoff classification.

At minimum:

- MUST_INTEGRATE
- KEEP_AS_EVIDENCE
- SUPERSEDED
- DO_NOT_INTEGRATE
- WAIT_FOR_AUTHORING

Avoid bulk merge when branch contains stale historical tests or docs.

---

# 13. Redundant duplicate check

Compare new artifacts to current main.

If equivalent stronger test/doc already exists:

- keep only the stronger/current one;
- mark duplicate evidence;
- do not inflate suite with semantically identical files.

A duplicate may still be kept if it tests a distinct boundary.

Document why.

---

# 14. Product-scope preservation

For whole-project handoffs/roadmaps, check:

- 10 ordinary careers;
- Palace;
- poverty;
- Secret Debt;
- School;
- relationships;
- Night;
- items;
- Activity;
- endings/Meta;
- GIF-first presentation.

Use:

`PRODUCT_SCOPE_OMISSION_SENTINEL_MATRIX_v1.md`.

A subsystem deliverable does not need every surface.

---

# 15. Presentation guardrails

If worker touches presentation QA/content:

Check:

- semantic presentationId;
- fallback;
- missing media nonfatal;
- animation off presentation-only;
- no frame/time save state;
- no mechanics tied to GIF completion.

Use:

`GIF_FIRST_FULL_GAME_QA_GUARDRAILS_v1.md`.

---

# 16. Save/reload contract

If deliverable covers a transaction/stateful package:

Verify it names:

- stable checkpoint;
- committed effects;
- reload expectation;
- duplicate-prevention expectation;
- malformed/stale behavior where relevant.

A stateful feature with no reload contract is incomplete.

---

# 17. Final verification disposition

Use one:

## VERIFIED_COMPLETE

All required files/content/ownership/evidence are correct.

## VERIFIED_COMPLETE_WITH_NONBLOCKING_NOTES

Required deliverables correct; optional hardening remains.

## PARTIAL_MISSING_DELIVERABLES

Some required files/content absent.

## BLOCKED_OWNERSHIP_VIOLATION

Forbidden/shared files changed.

## BLOCKED_LOCKED_RULE_DRIFT

Deliverable contradicts locked authority.

## BLOCKED_FALSE_CLOSURE

Fixture/seeded state or QA guess is represented as Product truth.

## BLOCKED_TEST_FAILURE

Required executable evidence is red.

---

# Lead follow-up block

After verification, record:

```text
Integrate now:
Keep as evidence:
Supersede:
Corrections required:
Next worker queue already present:
```

The worker should not be left idle merely because Lead review is ongoing.

This template is a coordination QA tool, not a runtime acceptance gate.
