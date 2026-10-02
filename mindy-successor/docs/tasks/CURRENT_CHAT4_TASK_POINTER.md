# CURRENT CHAT4 TASK POINTER

Status: **ARTIST/GEISHA QA v18 ACTIVE — C4-168 + C4-169 EXECUTABLE NOW**
Owner: Chat 4 / QA + Product Acceptance Gate
Queue: C4-168..173
Authoritative queue: `TASK_CHAT4_QA_QUEUE_v18.md`

Shipped baseline:
- Merchant C4-167 PASS
- exact product-gate main `70d3df6304c3ce0cfba9336b603e6547cfdd14fc`
- workflow #964 SUCCESS
- validator 60 / 222 / 39 / 22
- tests 904 / 904

## C4-168 — runtime — EXECUTE NOW
Frozen producer:
- PR #234
- exact head `955f4accf7e25c42e0384ddb9f76e5612f41dd00`
- PR body: **CANDIDATE_FROZEN / READY FOR CHAT 4 QA**
- exact-head workflow #978 / id `36985517198`: **SUCCESS**
- validator 67 packs / 252 events / 39 actions / 22 endings
- tests 915 / 915 pass
- preflight already complete: PR #170 comments `5948466967`, `5948477563`.

Re-query exact head/run immediately before verdict, then record PASS / PASS-WITH-NOTES / BLOCKED. Do not mutate #234.

## C4-169 — School — EXECUTE INDEPENDENTLY NOW
Frozen producer:
- PR #232
- exact head `13bb952aa3afb99760edbb23a3c00dfa7f72fa86`
- exact base runtime #234 `955f4accf7e25c42e0384ddb9f76e5612f41dd00`
- PR body: **CANDIDATE_FROZEN / READY FOR CHAT 4 QA**
- exact-head workflow #995 / id `36986582184`: **SUCCESS**
- validator 67 packs / 252 events / 39 actions / 22 endings
- tests 924 / 924 pass
- focused delta: 10 School/Text files, add-only.

Gate exact five prepared School mappings; preserve null producerThreshold/public facts, negative immediate/Night-study parity, no new curriculum/teacher, no Palace privilege/direct transition, and deterministic paid-lesson/Night-study persistence. Do not mutate #232.

## Waiting siblings
C4-170 authored:
- current held #229 head `75664819e824187ea23531e39f6cf5cd952b1047`
- latest required run #1010 failed before runner steps (`steps=[]`), so it is not QA-eligible yet.

C4-171 presentation:
- PR #237 head `ef9cc2df1edaf428ed44c34ba9832ff3a88032b4`
- latest required run #1007 failed before runner steps (`steps=[]`), so it is not QA-eligible yet.

After C4-168..171 accepted:
- C4-172 collision/ownership ledger;
- Lead integrates accepted focused deltas;
- C4-173 exact-current-main product gate.

QA never mutates producer heads or implements producer fixes. Empty-run CI infrastructure failures are not code verdicts.
