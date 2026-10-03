# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — STRONG META QUANTITATIVE COMPARISON HARNESS v4**
Owner: Chat 4

Completed dominance audit:
`chat4/strong-meta-dominance-audit-v3@a583549a88f9abf881fe130aec6d07044177eb9e`

Create:
`chat4/strong-meta-comparison-harness-v4`
from fresh main `836a716a017397d2e5768aada8a06299ee75e6fe`.

## Assignment

Build a RESEARCH-ONLY comparison tool, not a loadout implementation.

Represent candidate strong modifiers as parameters:
- +1 daily Energy;
- No Rent / lodging discount;
- starting-money bonus;
- passive money/day;
- first Large Activity discount 2->1;
- School discount;
- cap 200 (headroom only);
- optional extra-calendar-days candidate, if it still exists in docs;
- narrow access/safety modifiers as non-numeric annotations.

Evaluate over 160 days using ranges from **live executable economy** plus the documented candidate economy where values are still open.

Report:
- added/saved Energy;
- work-shift equivalents of money saved/earned;
- day when passive income overtakes starting cash;
- common pair synergies (+Energy+NoRent, +Energy+passive, NoRent+passive, +Energy+Activity discount);
- Secret Debt collision risk;
- Palace/D23 collision risk;
- dominance flags.

Compare the three v3 structures (category budget / impact points / exclusivity families) without selecting one.

Important:
- ordinary D22 Hard Work packages remain outside this system;
- do not create Titles;
- do not assume original Plus Mode;
- do not choose slot count/budget;
- no production runtime changes.

Focused tests for arithmetic/tool only. No full CI.
Freeze SHA and report `READY_FOR_LEADER_META_TOOL`.
