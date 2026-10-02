# CURRENT CHAT5 TASK POINTER

Status: **ACTIVE — SECRET DEBT / SLAVE HIDDEN CAREER**
Owner: Chat 5 / Full-Career Producer C
Branch to use: `chat5/secret-debt-complete-reset-v1`

## Assignment

Build the **Secret Debt / Slave hidden career route** as far as current authority permits, as one coherent hidden-career production slice.

Authority:
- `mindy-successor/docs/POVERTY_HIDDEN_CAREER_DRAFT_v0.md`
- `mindy-successor/docs/USER_DECISIONS_LOCKED_v1.md` D10/D15
- current ordinary-poverty and NightFlow implementation on main

Locked structural requirements include:
- rare/hidden one-time help encounter with accept/refuse;
- accepted help creates delayed hidden debt/trap;
- after activation, hidden career becomes available and ordinary professions are blocked without erasing their progress;
- forced night work has priority over voluntary night choices and produces a next-day Energy penalty;
- separate career progression;
- three distinct outcome families: Paid Freedom, Bound Life, Takeover;
- Secret Debt is outside the 10 ordinary professions and does not count toward Palace 10/10.

## Authority firewall — mandatory

Do **not** choose values that are explicitly OPEN:
- trigger probability;
- offer amount;
- activation delay;
- debt amount/growth;
- exact Energy penalty;
- exact stat gains;
- exact School/Activity availability while bound;
- exact stages, rewards and ending conditions;
- whether any hidden ending counts as Hard Work (current D15 says Secret Debt does not count for Palace).

Historical examples such as 2000 / 20000 / 10 days are not current locks.

Implement all value-independent state-machine, persistence, availability, NightFlow and ending-lifecycle work that can be proven safely. For any production path that truly requires an open value, record a precise Leader blocker rather than inventing a number.

## Delivery

Do not claim COMPLETE while required Product-open decisions still block natural acceptance.
No early draft PR. When a real candidate is possible: focused PR -> exact-head CI -> Chat 2 technical QA/integration -> Leader 1 final acceptance.
