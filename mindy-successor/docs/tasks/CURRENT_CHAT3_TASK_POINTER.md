# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — SEASONAL NEGATIVE TARGET MAP IMPLEMENTATION v6**
Owner: Chat 3

Accepted research packet:
`chat3/progression-floor-aware-negative-map-v5@255c0c9b59870f91c8b7032863db6dd6966ec4bc`

Leader/Product authority:
- D26 = max one shift of the same ordinary profession per calendar day;
- D31 locks the exact 20-cell floor-aware negative-stat target map;
- negative seasons remain unchanged;
- each negative remains exactly `-1`;
- no Lust negatives;
- all positive seasonal effects, wages, costs, unlocks and Hard Work=50 remain unchanged.

Authority commit:
`main@67a61382c0171beaac007e8123fc007c6a01d1d3`

Branch:
`chat3/seasonal-negative-target-map-implementation-v6`

The branch was created from the authority commit above.
Branch existence is dispatch only; count work only after a real worker commit.

## Assignment

Produce the smallest implementation candidate for D31.

Production scope:
- replace only the negative `stat` target in the 20 already-existing ordinary seasonal negative cells;
- preserve negative seasons and magnitude;
- do not change positive effects;
- do not change wages/costs/unlocks/Hard Work;
- do not add new schema/runtime mechanisms.

Exact D31 map:
- Lumber: Spring Dexterity; Winter Strength;
- Satyr Maid: Summer Sociability; Autumn Endurance;
- Undead Farm: Spring Reason; Autumn Strength;
- Tavern: Spring Reason; Summer Wits;
- Hunter: Spring Endurance; Winter Dexterity;
- Guard: Summer Manners; Winter Reason;
- Merchant: Summer Wits; Winter Manners;
- Artist/Geisha: Summer Manners; Autumn Dexterity;
- Assassin: Spring Reason; Winter Manners;
- Prostitute: Summer Sexuality; Winter Endurance.

Focused acceptance:
1. exact 20 targets match D31;
2. exactly two negative seasons per profession;
3. exactly 20 total `-1` negatives;
4. no Lust negative;
5. no same-season positive/negative stat cancellation;
6. all positive seasonal effects unchanged;
7. wages/costs/unlocks unchanged;
8. D26 same-career daily cap unchanged;
9. Hard Work remains 50;
10. progression harness reproduces the accepted D31 envelope:
   - Hard Work Day 50 all 10;
   - ~205/250 Base no-School realized negatives by 50;
   - ~214/250 Focused no-School;
   - ~207/250 Base School-10d;
   - ~215/250 Focused School-10d;
   - starter strongest-stat cap timing preserved.

Do not compensate wage reductions.
Do not add deferred/fallback negative mechanics.
Run focused/static tests only.
No full CI.
Freeze exact SHA and report `READY_FOR_CHAT2_ASSEMBLY`.
