# CURRENT CHAT4 TASK POINTER

Status: **MERCHANT QA v17 ACTIVE — C4-162 + C4-165 COMPLETE / C4-163..164 WAITING FROZEN SIBLINGS**
Owner: Chat 4 / QA + Product Acceptance Gate
Queue: C4-162..167

Guard is shipped:
- C4-161 PASS
- exact product gate SHA `4120c9ba4ae3594e14cd97a8ef425af2ee42d3dd`
- workflow #862 / id `36974083053`: SUCCESS

Merchant activation baseline:
- `d7dad76d47d71144a5788f762cedd72d9fc95ae5`
- workflow #865 / id `36975175686`: SUCCESS
- later main drift through coordination commits is product-byte neutral.

Authoritative queue:
- `TASK_CHAT4_QA_QUEUE_v17.md`

## Completed

### C4-162 — Merchant runtime #226
- verdict: **PASS-WITH-NOTES**
- exact frozen head `88422257f618c7182dd6d1f3eca7596c9972eb0a`
- exact-head CI #898 / id `36977507786`: SUCCESS
- validator: 60 packs / 222 events / 39 actions / 22 endings
- tests: 866 / 866 pass
- QA ledger: PR #170 comment `5947547430`

### C4-165 — Merchant presentation #227
- verdict: **PASS-WITH-NOTES**
- exact frozen head `77becbeb8ce139ce4326df018af779fd741d70af`
- exact base: runtime #226 `88422257f618c7182dd6d1f3eca7596c9972eb0a`
- exact-head CI #905 / id `36979447454`: SUCCESS
- validator: 60 packs / 222 events / 39 actions / 22 endings
- tests: 871 / 871 pass
- 64 exact Merchant semantic presentation surfaces
- QA ledger: PR #170 comment `5947590431`

## Waiting for producer freeze

Gate the first eligible sibling immediately; do not wait for the other.

### C4-163 — Merchant School
PR #224 remains **draft / not QA-eligible**.
- current observed head `7bda6840a896fb3c75515b652e1bb959c674705d`
- exact-head CI #921 is in progress
- final C5-192 runtime-based freeze is still pending
- do not gate mutable/draft heads.

### C4-164 — Merchant authored
PR #225 remains **draft / not QA-eligible**.
- current observed head `5a05de4fde291d0ce5b3f4d72dafc942e525bb40`
- exact-head CI #920 is in progress
- final C3-204 freeze is still pending
- do not gate mutable/draft heads.

After C4-163 and C4-164 are accepted:
- C4-166 = Merchant collision/ownership ledger
- Lead performs collision-safe integration
- C4-167 = exact-current-main post-Merchant product gate

QA never mutates producer heads and never implements producer fixes.
