# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — D46 ECONOMY / START-BALANCE PRODUCER v14**
Owner: Chat 4

Accepted Product authority:
`D46` in `mindy-successor/docs/USER_DECISIONS_LOCKED_v1.md`

Source Product packet:
`chat4/product-economy-balance-closure-v13@285b0de5189350131cb34b210357112da04bca3b`

Frozen prior Secret Debt producer:
`chat4/secret-debt-full-route-producer-v12@10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`

Do not mutate either frozen producer.

New branch:
`chat4/economy-start-balance-producer-v14`

Task:
implement D46 exactly and only:
- fresh new-life Lust = 5;
- preserve stored Lust on existing saves;
- Lumber wage base 35;
- other nine ordinary wage bases 37;
- ordinary shift wage cap 120;
- no lodging escalation;
- School tuition/gains unchanged;
- starting money and base Energy unchanged.

Preserve:
- D26 one same-career shift/day;
- D31 wage stat weights/seasonal semantics;
- D32 bounded money rewards;
- D35 lodging/private-space rules;
- D43 Palace wage;
- D44 Secret Debt wage and career lock;
- D24 cap-200 cannot exceed ordinary wage 120.

No full CI.

Focused QA minimum:
- typecheck / validate / build;
- fresh run Lust 5;
- migration preserves existing Lust;
- wage anchors 36 / 38 / 38 for starter careers at all-1;
- three starter shifts gross 112;
- cap-200 ordinary wage <=120;
- lodging 100/50/0 across all years;
- School exact tuition/gain regression;
- Secret Debt / Palace / Strong Meta firewalls.

Deliver:
`mindy-successor/docs/tasks/CHAT4_ECONOMY_START_BALANCE_PRODUCER_v14.md`

Freeze exact SHA and report:
`READY_FOR_CHAT2_ASSEMBLY`.
