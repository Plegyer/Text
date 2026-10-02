# CURRENT CHAT4 TASK POINTER

Status: **ARTIST/GEISHA QA v18 ACTIVE — C4-168 PREFLIGHT COMPLETE / WAITING FROZEN GREEN RUNTIME**
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

PREFLIGHT is complete and recorded in PR #170 comment `5948466967`.

Current observed producer:
- PR #234
- current observed head `955f4accf7e25c42e0384ddb9f76e5612f41dd00`
- open / non-draft
- body still explicitly says **CANDIDATE_BUILDING / NOT FROZEN**
- exact-head workflow #978 / id `36985517198` is in progress
- therefore **NO C4-168 VERDICT YET**

Preflight ownership:
- 15 changed files vs shipped Merchant product baseline
- shared production: `content/definitions.json`, `src/core/schema.ts`
- shared regression test: `tests/content.test.ts`
- remaining product files are Artist-local contract / School authority / packs / focused tests
- shipped baseline -> current main drift is coordination/GIF documentation only; no product-byte drift

Locked runtime invariants already verified from the current candidate:
- `artist-geisha.shift` remains 1 Energy
- exact Creativity35 + Manners25 + Grooming30 OR Year3 unlock preserved
- wage preserved
- four shipped scene IDs/media and seasonal stat effects preserved
- Artist-local seasonal counters are additive
- `ending.artist-geisha.hard-work` remains exact 50-shift / `artist-geisha.hardwork.compat` / `hardWork:artist-geisha`
- exactly three narrow Artist item IDs/capabilities are added
- five School consumer mappings keep producer thresholds/public facts null
- Court Invitation remains Artist-local evidence only, not Palace access

Acceptance matrix prepared:
- natural Year3 unlock, scheduled seasonal windows, 50 real shifts, reload, Hard Work -> New Life
- mentor refusal-safe continuation
- Night competition without NightFlow rewrite
- five-track School null producer authority
- read-only Satyr/Tavern/Merchant/Guard inputs
- distinct Veteran / Master / Patron / Court readiness
- no Palace, Assassin, Prostitute, global reputation/economy/patron/contest/new-ending authority

Previous red #973 failures were addressed in the current head by test-only changes; this is diagnostic only until #978 finishes.

Execute C4-168 immediately only when the exact head is explicitly **CANDIDATE_FROZEN / READY FOR CHAT 4 QA** and exact-head full CI is SUCCESS.

Future:
- C4-169 School after C5-204 frozen runtime-based candidate
- C4-170 authored after C3-216 frozen runtime-based candidate
- C4-171 presentation after C2-204 frozen runtime-based candidate
- C4-172 collision ledger
- C4-173 exact-current-main product gate

QA never mutates producer heads and never implements producer fixes.
