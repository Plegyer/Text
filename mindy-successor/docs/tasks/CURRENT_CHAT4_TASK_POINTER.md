# CURRENT CHAT4 TASK POINTER

Status: **GUARD QA v16 — C4-156..160 COMPLETE / C4-161 ACTIVE**
Owner: Chat 4 / QA + Product Acceptance Gate

Exact post-Guard shipped-product candidate:
- current main `ab88827aea1e9a0ec20b544666c5352ce4f86345`
- exact push workflow #860 / id `36972802914`: SUCCESS
- Lead integration order merged:
  - #218 Guard runtime
  - #219 Guard authored
  - #220 Guard School
  - #221 Guard presentation

Guard sibling verdicts remain frozen and complete:
- C4-156 runtime #208 @ `89030816f07be16ab5071ebb9af859fc3c756115`: PASS-WITH-NOTES.
- C4-157 School #206 @ `788625b8cc83d795f3e4897ab120fd0b2a5f9109`: PASS-WITH-NOTES.
- C4-158 authored #213 @ `c7e6a346a0bc934bf9db464af29470e1299d6ffc`: PASS-WITH-NOTES.
- C4-159 presentation #217 @ `717aa69fa3c607905a616c048f9bd4dd439b0bfd`: PASS-WITH-NOTES.
- C4-160 collision/ownership ledger: PASS, PR #170 comment `5935478228`.

Execute **C4-161 now** per `TASK_CHAT4_QA_QUEUE_v16.md`:
- re-query exact current `main` before verdict;
- verify exact-main CI;
- run post-Guard natural product acceptance across runtime + authored + School + presentation;
- verify save/reload, ordinary-work invariants, Hard Work / Meta authority, locale/media invariance, and preservation of previously shipped Hunter/Tavern/etc consumers;
- account for integrated authored `guard.city.poverty-response` variants `street-survival` and `cheap-room`, with presentation coverage expanded accordingly;
- record PASS / PASS-WITH-NOTES / BLOCKED with exact evidence in PR #170.

Do not mutate frozen Guard producer heads.

Merchant producer wave is prepared in draft PR #222 but remains **INACTIVE** until C4-161 records PASS / PASS-WITH-NOTES and Lead activates the producer pointers.
