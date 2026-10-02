# CURRENT CHAT4 TASK POINTER

Status: **MERCHANT QA v17 ACTIVE — C4-164 READY NOW / C4-163 WAITING SCHOOL FREEZE**
Owner: Chat 4 / QA + Product Acceptance Gate
Queue: C4-162..167

Completed:
- C4-162 runtime #226 @ `88422257f618c7182dd6d1f3eca7596c9972eb0a`: **PASS-WITH-NOTES**, CI #898 SUCCESS, 866/866.
- C4-165 presentation #227 @ `77becbeb8ce139ce4326df018af779fd741d70af`: **PASS-WITH-NOTES**, CI #905 SUCCESS, 871/871.

Execute **C4-164 now**:
- Merchant authored PR #225
- exact frozen head `5a05de4fde291d0ce5b3f4d72dafc942e525bb40`
- exact dependency base: runtime #226 `88422257f618c7182dd6d1f3eca7596c9972eb0a`
- exact-head CI #920 / id `36979960415`: **SUCCESS**
- PR is non-draft and explicitly CANDIDATE_FROZEN / READY FOR CHAT 4 QA
- final binding audit: 73 source identities, 72 LIVE_BOUND, 1 intentional UNBOUND_NO_FROZEN_MERCHANT_CONSUMER (`school.formal-terms`)
- frozen catalog coverage: 29 Merchant events + 4 Merchant shift scenes
- no producer-mechanics ownership drift is claimed.

Gate C4-164 independently and record exact evidence/verdict in PR #170. Do not mutate #225.

C4-163 School:
- PR #224 head `7bda6840a896fb3c75515b652e1bb959c674705d`
- exact-head CI #921 / id `36980004711`: SUCCESS
- PR remains **draft / not yet declared frozen**
- do not gate until Chat 5 publishes the final C5-192 frozen candidate.

After C4-164:
- if #224 is still mutable, continue **C4-166 PREFLIGHT ONLY** using accepted #226/#227 plus accepted authored evidence once available;
- the instant #224 becomes frozen/non-draft/green, execute C4-163;
- finalize C4-166 only after C4-163 and C4-164 both have accepted verdicts;
- Lead owns collision-safe integration;
- C4-167 remains exact-current-main post-Merchant gate.

Authoritative queue:
- `TASK_CHAT4_QA_QUEUE_v17.md`

QA never mutates producer heads and never implements producer fixes.
