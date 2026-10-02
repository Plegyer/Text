# CURRENT CHAT4 TASK POINTER

Status: **ARTIST/GEISHA QA v18 ACTIVE — C4-168 + C4-169 COMPLETE / C4-170 + C4-171 HELD ON CI INFRA**
Owner: Chat 4 / QA + Product Acceptance Gate
Queue: C4-168..173
Authoritative queue: `TASK_CHAT4_QA_QUEUE_v18.md`

Shipped baseline:
- Merchant C4-167 PASS
- exact product-gate main `70d3df6304c3ce0cfba9336b603e6547cfdd14fc`
- workflow #964 / id `36982274335`: SUCCESS
- validator 60 / 222 / 39 / 22
- tests 904 / 904

## Completed

### C4-168 — Artist/Geisha runtime #234
- verdict: **PASS-WITH-NOTES**
- exact frozen head `955f4accf7e25c42e0384ddb9f76e5612f41dd00`
- exact base `70d3df6304c3ce0cfba9336b603e6547cfdd14fc`
- exact-head CI #978 / id `36985517198`: SUCCESS
- validator 67 packs / 252 events / 39 actions / 22 endings
- tests 915 / 915
- QA ledger verdict comment `5949110488`

Accepted runtime invariants include:
- 1-Energy Artist Work;
- exact Creativity35 + Manners25 + Grooming30 OR Year3 unlock;
- shipped wage/scenes/seasonal stat packages preserved;
- natural seasonal-window scheduling, 50 real shifts, reload, Hard Work -> New Life;
- professional mentor refusal-safe continuation;
- Night uses existing voluntary slot/after-choice semantics;
- five School consumer mappings remain producer-null;
- Satyr/Tavern/Merchant/Guard inputs are read-only;
- Court Invitation is Artist-local evidence, never Palace access;
- only public Artist ending remains `ending.artist-geisha.hard-work`.

### C4-169 — Artist/Geisha School #232
- verdict: **PASS-WITH-NOTES**
- exact frozen head `13bb952aa3afb99760edbb23a3c00dfa7f72fa86`
- exact base runtime `955f4accf7e25c42e0384ddb9f76e5612f41dd00`
- exact-head CI #995 / id `36986582184`: SUCCESS
- validator 67 / 252 / 39 / 22
- tests 924 / 924
- focused delta: 10 School/Text files, one add-only commit
- QA ledger verdict comment `5949122037`

Accepted School boundaries:
- exactly five existing prepared tracks/teachers/media/Night-study identities;
- all producer thresholds and selected public facts remain null;
- Arts/Etiquette/Literacy are real frozen School-conditioned consumer seams;
- Rhetoric and Body Confidence live events are not School-conditioned in frozen runtime and must not be promoted into School-triggered reactions;
- immediate resolver/Night-study parity remains negative without producer authority;
- no new curriculum/teacher/direct transition/Palace privilege/global policy.

## Held siblings

### C4-170 — authored #229
Not QA-eligible yet.
- held head `75664819e824187ea23531e39f6cf5cd952b1047`
- PR remains draft
- required workflow #1010 / id `36987374078`: FAILURE before runner steps
- producer explicitly requires one real exact-head full SUCCESS before freeze.

### C4-171 — presentation #237
Not QA-eligible yet.
- held head `ef9cc2df1edaf428ed44c34ba9832ff3a88032b4`
- required workflow #1007 / id `36987217980`: FAILURE before runner execution with empty steps
- producer body: FINAL HEAD HELD / CI INFRA BLOCKED / NOT FROZEN.

Empty-run CI failures are infrastructure evidence, not code verdicts. QA does not mutate producer heads or rerun/repair producer workflows.

Gate C4-170 or C4-171 independently the instant the exact held head receives an executable full SUCCESS and the producer explicitly freezes it.

After C4-168..171 accepted:
- C4-172 collision/ownership ledger
- Lead collision-safe integration
- C4-173 exact-current-main product gate
