# CURRENT CHAT5 TASK POINTER

Status: **ACTIVE — D47 HARD WORK BONUS MAPPING PRODUCER v13**
Owner: Chat 5

Accepted Product authority:
**D47** in `mindy-successor/docs/USER_DECISIONS_LOCKED_v1.md`

Source packet:
`chat5/hard-work-bonus-mapping-decision-v12@b2a44983f1aae88888623f096b093a6e21354293`

D46 runtime base:
`chat4/economy-start-balance-producer-v14@a0c5f855b63d3bb85556f5b2780aaaabb58fbced`

New branch:
`chat5/hard-work-bonus-mapping-producer-v13`

Base:
`a0c5f855b63d3bb85556f5b2780aaaabb58fbced`

Reason for D46 base:
new-life Lust is already 5 there, so D47 Prostitute Lust +5 can be tested against the final 1.0 start semantics without later rebasing ambiguity.

Implement D47 exactly:
- Lumber Strength +5;
- Satyr Maid Charm +5;
- Undead Farm Magic +5;
- Tavern Wits +5;
- Hunter Dexterity +5;
- Guard Endurance +5 + Manners +5;
- Merchant Reason +5 + Sociability +5;
- Artist/Geisha Creativity +5 + Grooming +5;
- Assassin Dexterity +5 + Wits +5;
- Prostitute Sexuality +5 + Charm +5 + separate Lust +5.

Preserve:
- profession package is the selectable unit;
- arbitrary earned subset;
- first five exactly one progression bonus;
- later five exactly two progression bonuses;
- Lust separate from 12 progression stats;
- package application atomic and once per new run;
- save/reload never reapplies bonuses;
- D23 counts ten active package identities;
- D24 cap-200 does not multiply bonuses;
- old +3/+3 and Merchant +600 remain absent;
- no Strong Meta slot consumption.

No full CI.

Focused QA minimum:
- exact mapping;
- subset selection;
- all-ten totals 75 progression points + Lust 5;
- D46 base Lust 5 -> active Prostitute package yields Lust 10 before later play;
- cap clipping;
- reload/idempotence;
- D23 10/10 package identity;
- no advanced-ending/Secret Debt/Palace/Strong Meta drift.

Deliver:
`mindy-successor/docs/tasks/CHAT5_HARD_WORK_BONUS_MAPPING_PRODUCER_v13.md`

Freeze exact SHA and report:
`READY_FOR_CHAT2_ASSEMBLY`.
