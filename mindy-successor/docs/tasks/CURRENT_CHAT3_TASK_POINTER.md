# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — PROGRESSION REMEDIATION DECISION PACKET v2**
Owner: Chat 3

Completed audit:
`chat3/progression-160day-balance-audit-v1@465c9a2a21bad6188597ca19cbe8ca339ab5ef9d`

Key proven risks:
- Hard Work=50 can be compressed to 17 calendar days at 3 shifts/day;
- approved negatives often floor out at stat 0 and stop acting as a real sink;
- focused work can cap a primary stat before run end;
- targeted School + work can cap around early Year 3;
- no ordinary profession has a guaranteed direct 31-49 shift milestone;
- Lumber has the sparsest authored career density.

Create:
`chat3/progression-remediation-decision-v2`
from fresh main.

## Assignment

Prepare a Product-ready remediation packet, no runtime changes.

Give concrete alternatives for:
1. same-career shift frequency per day:
   - unlimited current behavior;
   - max 2/day;
   - max 1/day;
   and quantify Hard Work calendar timing/economy impact for each.
2. floor-aware seasonal negatives:
   - keep current mapping;
   - retarget negatives toward stats the same career also replenishes;
   - other low-complexity alternative if justified.
3. career pacing:
   - exact proposed authored milestone positions for sparse careers, especially Lumber;
   - a common early/mid/late pacing skeleton that does NOT alter Hard Work=50 eligibility itself.
4. cap timing:
   - quantify whether any stat-growth reduction is still needed after a daily-shift policy change.

For every option: benefits, costs, affected systems/files, migration risk, and a smallest safe implementation path.

Do not change production mechanics/content.
Do not copy original-game numbers.
No full CI.
Freeze SHA and report `READY_FOR_LEADER_PRODUCT_DECISION`.
