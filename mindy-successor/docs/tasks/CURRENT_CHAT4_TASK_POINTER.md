# CURRENT CHAT4 TASK POINTER

Status: **ARTIST/GEISHA QA v18 ACTIVE — C4-168 PREFLIGHT NOW**
Owner: Chat 4 / QA + Product Acceptance Gate
Queue: C4-168..173
Authoritative queue: `TASK_CHAT4_QA_QUEUE_v18.md`

Shipped baseline:
- Merchant C4-167 PASS
- exact product-gate main `70d3df6304c3ce0cfba9336b603e6547cfdd14fc`
- workflow #964 SUCCESS
- validator 60 / 222 / 39 / 22
- tests 904 / 904

Current Artist runtime producer:
- PR #234
- latest known head at queue publication: `4674e134f910379ee5a3d36cdec60ee98a7e8e7d`
- latest known exact run #973: FAILURE
- therefore **no C4-168 verdict yet**.

Execute **C4-168 PREFLIGHT now** per QA v18:
- inspect exact current #234 changed-file/ownership surface and current failure diagnostics;
- build the acceptance matrix;
- do not mutate #234 and do not issue a verdict while it is mutable/failing.

The instant #234 is explicitly frozen + exact-head full CI SUCCESS, execute C4-168 immediately.

Future:
- C4-169 School after C5-204 freeze;
- C4-170 authored after C3-216 freeze;
- C4-171 presentation after C2-204 freeze;
- C4-172 collision ledger;
- C4-173 exact-current-main product gate.
