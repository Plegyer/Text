# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — GUARD QA v16 / C4-156..159 ELIGIBLE NOW**
Owner: Chat 4 / QA + Product Acceptance Gate

Git is authority. Do not reconstruct prior Chat 4 history from transcript memory.

## Shipped product truth

Hunter is shipped.
Exact Hunter product main:
- `80855b78faef15205b0fcfb1660acd98eb78aefa`
- exact push CI #828 / id `36876266116`: **SUCCESS**
- validator: **46 packs / 167 events / 39 actions / 22 endings**
- tests: **817 / 817 pass, 0 fail**
- C4-155: **PASS**, recorded in QA ledger PR #170 comment `5935056247`.

Pre-publication coordination main:
- `18118bacee8d98ac5b7ade76facb95fcb3ef5d5b`
- coordination-only pointer change above the shipped product SHA; no product path drift.

Next incomplete ordinary career: **Guard**.

## Active queue

Use:
- `TASK_CHAT4_QA_QUEUE_v16.md`
- C4-156..161

All four Guard producer siblings are already frozen and green. Gate them independently now; do not wait for one sibling to finish before starting another.

### C4-156 — Guard runtime #208
- exact head `89030816f07be16ab5071ebb9af859fc3c756115`
- CI #820 / id `36874685869`: **SUCCESS**
- frozen/non-draft
- exact frozen runtime authority for Guard sibling work.

### C4-157 — Guard School #206
- exact head `788625b8cc83d795f3e4897ab120fd0b2a5f9109`
- base `89030816f07be16ab5071ebb9af859fc3c756115`
- CI #837 / id `36884031693`: **SUCCESS**
- validator 46/168/39/22
- tests 783/783
- frozen/non-draft.

### C4-158 — Guard authored #213
- exact head `c7e6a346a0bc934bf9db464af29470e1299d6ffc`
- base `89030816f07be16ab5071ebb9af859fc3c756115`
- CI #836 / id `36877265932`: **SUCCESS**
- validator 46/168/39/22
- tests 777/777
- frozen/non-draft.

### C4-159 — Guard presentation #217
- exact head `717aa69fa3c607905a616c048f9bd4dd439b0bfd`
- base `89030816f07be16ab5071ebb9af859fc3c756115`
- CI #841 / id `36885302779`: **SUCCESS**
- validator 46/168/39/22
- tests 788/788
- frozen/non-draft.

After all four accepted sibling verdicts:
- C4-160 = Guard collision/ownership ledger against then-current shipped product main.
- Lead performs integration only after C4-160.
- C4-161 = exact-current-main post-Guard product gate.
- Guard is not shipped before C4-161 PASS / PASS-WITH-NOTES.

Boundaries:
- QA does not implement producer fixes.
- Never mutate frozen candidates.
- Every verdict records exact SHA + exact workflow run + validator/test evidence.
- If any exact head has moved, is red, or no longer matches the queue, stop that gate and record BLOCKED rather than silently substituting a candidate.
