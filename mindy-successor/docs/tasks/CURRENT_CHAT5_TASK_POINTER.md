# CURRENT CHAT5 TASK POINTER

Status: **ACTIVE — LUMBER-STAY RETIREMENT PRODUCER v17**
Owner: Chat 5

Accepted Product decision source:
`chat5/lumber-stay-retirement-decision-v16@4f4df720c9677b4b9becc0cb8538da26a276f944`

Production base:
`main@f36de067ae2e82518360dbe045f71c700e200805` (D41 merged production SHA)

New branch:
`chat5/lumber-stay-retirement-producer-v17`

Implement the v16 retirement policy exactly.

Required live 1.0 result:
- remove `lumber-stay` from new-play live ending registration;
- remove new acquisition of `vitality`;
- canonical ordinary-career surface remains exactly 40 endings;
- no alias to Hard Work / Forewoman / Forest.

Historical compatibility:
- completed historical `lumber-stay` stays historical evidence;
- normalize historical `vitality` ownership to one legacy perk:
  `legacy.lumber-stay.vitality`;
- historical owners preserve exactly +1 daily Energy;
- no new acquisition, no slots, no stacking duplicates;
- eligible-only old state is removed without reward;
- committed-but-unfinished old state is cleared and run resumes active;
- existing historical RunResult/transaction identity is preserved;
- old ended pre-RunResult save gets deterministic compatibility proof only, never reward replay.

Presentation/localization:
- retire live `ending/lumber-stay` semantic/source inventory;
- historical display is non-interactive and uses legacy localization namespace;
- no 41st live ending card;
- canonical Lumber endings remain unchanged.

Migration:
- deterministic;
- idempotent;
- no fabricated canonical completion;
- no conversion of legacy visits into Hard Work shifts.

No full CI.

Focused QA minimum:
- all acceptance cases from v16 decision;
- second parse/load idempotence;
- profile merge dedupe;
- canonical 40 count;
- Palace / Strong Meta / Hard Work / Secret Debt isolation;
- live presentation/source inventory contains no `ending/lumber-stay`.

Deliver:
`mindy-successor/docs/tasks/CHAT5_LUMBER_STAY_RETIREMENT_PRODUCER_v17.md`

Freeze exact SHA and report:
`READY_FOR_CHAT2_ASSEMBLY`.
