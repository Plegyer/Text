# CURRENT CHAT4 TASK POINTER

Status: **ARTIST/GEISHA QA v18 ACTIVE — C4-168 PREFLIGHT COMPLETE / EXACT HEAD GREEN / WAITING FREEZE**
Owner: Chat 4 / QA + Product Acceptance Gate
Queue: C4-168..173
Authoritative queue: `TASK_CHAT4_QA_QUEUE_v18.md`

Shipped baseline:
- Merchant C4-167 PASS
- exact product-gate main `70d3df6304c3ce0cfba9336b603e6547cfdd14fc`
- workflow #964 / id `36982274335`: SUCCESS
- validator 60 / 222 / 39 / 22
- tests 904 / 904

## C4-168 runtime

PREFLIGHT is complete:
- QA ledger preflight comment `5948466967`
- exact-green status comment `5948477563`

Current observed producer:
- PR #234
- exact observed head `955f4accf7e25c42e0384ddb9f76e5612f41dd00`
- exact-head workflow #978 / id `36985517198`: **SUCCESS**
- validator **67 packs / 252 events / 39 actions / 22 endings**
- tests **915 / 915 pass**
- PR body still explicitly says **CANDIDATE_BUILDING / NOT FROZEN**
- therefore **NO C4-168 VERDICT YET**

Preflight ownership:
- 15 changed files vs shipped Merchant product baseline
- shared production: `content/definitions.json`, `src/core/schema.ts`
- shared regression test: `tests/content.test.ts`
- remaining product files are Artist-local contract / School authority / packs / focused tests
- shipped baseline -> current main drift before this coordination update was docs/queue/GIF-only; no product-byte drift

Verified runtime invariants on the exact green head:
- `artist-geisha.shift` remains 1 Energy
- exact Creativity35 + Manners25 + Grooming30 OR Year3 unlock preserved
- wage preserved
- four shipped scene IDs/media and seasonal stat effects preserved
- Artist-local seasonal counters are additive
- `ending.artist-geisha.hard-work` remains exact 50-shift / `artist-geisha.hardwork.compat` / `hardWork:artist-geisha`
- exactly three narrow Artist item IDs/capabilities are added
- five School consumer mappings keep producer thresholds/public facts null
- Court Invitation remains Artist-local evidence only, not Palace access

Exact-green acceptance evidence already present:
- natural scheduled seasonal windows + advanced readiness + Hard Work
- mentor refusal-safe continuation
- Night choice consumes existing voluntary Night slot without NightFlow rewrite
- School five-track null producer authority
- read-only cross-system inputs
- no other career / Palace / economy / global reputation ownership
- shipped action / seasonal / Hard Work identity preservation

Execute C4-168 immediately only when this exact head, or a later exact-green head, is explicitly **CANDIDATE_FROZEN / READY FOR CHAT 4 QA**. Re-query head and exact run before verdict.

Future:
- C4-169 School after C5-204 frozen runtime-based candidate
- C4-170 authored after C3-216 frozen runtime-based candidate
- C4-171 presentation after C2-204 frozen runtime-based candidate
- C4-172 collision ledger
- C4-173 exact-current-main product gate

QA never mutates producer heads and never implements producer fixes.
