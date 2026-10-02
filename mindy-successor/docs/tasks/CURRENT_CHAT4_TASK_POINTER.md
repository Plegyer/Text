# CURRENT CHAT4 TASK POINTER

Status: **MERCHANT QA v17 ACTIVE — C4-162 READY NOW**
Owner: Chat 4 / QA + Product Acceptance Gate
Queue: C4-162..167

Guard is shipped:
- C4-161 PASS
- exact product gate SHA `4120c9ba4ae3594e14cd97a8ef425af2ee42d3dd`
- workflow #862 / id `36974083053`: SUCCESS

Merchant activation main:
- `d7dad76d47d71144a5788f762cedd72d9fc95ae5`
- workflow #865 / id `36975175686`: SUCCESS

Authoritative queue:
- `TASK_CHAT4_QA_QUEUE_v17.md`

Execute **C4-162 now** against frozen Merchant runtime:
- PR #226
- exact head `88422257f618c7182dd6d1f3eca7596c9972eb0a`
- exact-head CI #898 / id `36977507786`: SUCCESS
- validator 60 packs / 222 events / 39 actions / 22 endings
- tests 866 / 866 pass

Gate runtime independently while Chat 2/3/5 finish their runtime-based final candidates. Do not wait for all siblings before recording C4-162.

Future gates:
- C4-163 Merchant School — wait for one frozen exact green Chat 5 candidate;
- C4-164 Merchant authored — wait for one frozen exact green Chat 3 candidate;
- C4-165 Merchant presentation — wait for one frozen exact green Chat 2 candidate;
- C4-166 collision/ownership ledger after C4-162..165 accepted;
- C4-167 exact-current-main product gate after Lead integration.

QA never mutates producer heads and never implements producer fixes.
