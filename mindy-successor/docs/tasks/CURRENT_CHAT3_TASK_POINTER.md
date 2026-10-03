# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — FLOOR-AWARE NEGATIVE TARGET MAP v5**
Owner: Chat 3

Accepted prior packet:
`chat3/progression-policy-comparison-v4@135efa45c291642fabc52bd49cbafc7111418cd3`

Leader/Product lock:
- D26 recorded on `main@0c8926049a4b4ee4fda0574cea588d39f39dd14e`.
- For the 10 ordinary professions: max **1 shift of the same profession per calendar day**.
- This is not a global work-action cap; different ordinary professions may still be worked on the same day if Energy/access allow.
- Hard Work remains exactly 50 completed shifts.
- No broad positive work-stat nerf is authorized by D26.

Branch:
`chat3/progression-floor-aware-negative-map-v5`

Branch was created by Leader from `main@0c8926049a4b4ee4fda0574cea588d39f39dd14e`.
Branch existence is only dispatch state; first real worker commit is required before this lane counts as moving.

## Assignment

Produce an exact Product decision packet for the remaining ordinary seasonal-negative target question. No production edits.

Preserve the already-shipped structural rule:
- two negative seasons out of four per ordinary profession;
- one `-1` progression-stat effect in each selected negative season;
- no Lust negatives;
- no same-season positive/negative cancellation on the same stat;
- do not change wages, costs, Hard Work=50, D26 cadence, unlocks, or positive seasonal effects.

Deliver:
- exact proposed 20-cell profession/season -> negative-stat map;
- current shipped map vs proposal;
- rationale per profession based on actual work-grown/wage-relevant stats and floor clipping;
- harness results under D26 max1/day for base + focused starts;
- no School + targeted paid School every 10 days;
- realized negative pressure by profession and aggregate;
- strongest-stat day-to-100 / cap reach by Day 160;
- money by Hard Work=50;
- any proposal cell that creates a dominant build or over-punishes a starter profession;
- minimal regression contract for later producer implementation.

Do not use original-game numbers as targets.
Do not implement runtime/content.
No full CI.
Freeze exact SHA and report `READY_FOR_LEADER_PRODUCT_DECISION`.
