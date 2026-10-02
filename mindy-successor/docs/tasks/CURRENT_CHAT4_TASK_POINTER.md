# CURRENT CHAT4 TASK POINTER

Status: **MERCHANT QA v17 ACTIVE — C4-162 COMPLETE / C4-163..165 WAITING FROZEN SIBLINGS**
Owner: Chat 4 / QA + Product Acceptance Gate
Queue: C4-162..167

Guard is shipped:
- C4-161 PASS
- exact product gate SHA `4120c9ba4ae3594e14cd97a8ef425af2ee42d3dd`
- workflow #862 / id `36974083053`: SUCCESS

Merchant activation baseline:
- `d7dad76d47d71144a5788f762cedd72d9fc95ae5`
- workflow #865 / id `36975175686`: SUCCESS
- later main drift through `a4676dd13d31b451df1137729e1cf0c6996f136a` is coordination-only.

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

## Waiting for producer freeze

Gate the first eligible sibling immediately; do not wait for the others.

### C4-163 — Merchant School
Current PR #224 is still **draft / not QA-eligible**.
- observed head `966b687dcbf88e34320cfe9ac1e7ce5641b86457`
- prep CI #886 is green
- final C5-192 runtime-based rebuild/freeze is still pending
- do not gate until one exact frozen/non-draft green candidate is published.

### C4-164 — Merchant authored
Current PR #225 is still **draft / not QA-eligible**.
- observed head `e2a651325473ce8cf98425bf5f2c74a0fff7ada4`
- final C3-204 freeze is still pending
- do not gate mutable/prep heads.

### C4-165 — Merchant presentation
PR #227 is runtime-based and exact-head CI #905 is green, but it is still **draft / not QA-eligible**.
- observed head `77becbeb8ce139ce4326df018af779fd741d70af`
- do not gate until Chat 2 explicitly freezes/marks the exact head ready.

After C4-163..165 accepted:
- C4-166 = Merchant collision/ownership ledger
- Lead performs collision-safe integration
- C4-167 = exact-current-main post-Merchant product gate

QA never mutates producer heads and never implements producer fixes.
