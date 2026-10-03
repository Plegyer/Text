# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — ORDINARY COMPLEX ENDINGS TRANCHE B v10**
Owner: Chat 3

Accepted prior Product packet:
`chat3/activity-ending-family-v9@37079bea92a0fa442035de310d8d21fb0b435d53`

Leader authority:
D38 now locks:
- three separate Activity ending IDs;
- Pathfinder / Preservation / Network eligibility;
- Surveyor's Atlas / Field Archive Protocol / Expedition Contact Network;
- all three rewards are selectable Specialists;
- D28 0..2 Specialist capacity remains binding.

Authority commit:
`main@20553cff531dcbc328df8b786829b7409e5d521f`

## New assignment

Close exact Product gates/rewards for the **later-half advanced ordinary-career endings**.

New branch:
`chat3/ordinary-complex-endings-tranche-b-v10`

Create:
1. `mindy-successor/docs/tasks/CHAT3_ORDINARY_COMPLEX_ENDINGS_TRANCHE_B_v10.md`
2. `mindy-successor/research/ordinary_complex_endings_tranche_b_v1.csv`

No production runtime/UI/content changes.
No full CI.

## Endings in scope — exactly 16

### Guard
- Officer
- Reform
- Network / Corruption
- Major Case

### Merchant
- Merchant House
- Speculator / Smuggler
- Patron of Routes

### Artist / Geisha
- Master Artist
- Patron Network
- Court Invitation

### Assassin
- Ghost
- Handler Takeover
- Refusal / Turncoat

### Prostitute
- Independent House
- Elite Clientele
- Network / Protection

Do not change the ordinary Hard Work ending for any career.

## For every ending define

1. proposed stable ending ID if none exists;
2. exact minimum career progression/stage requirement;
3. exact route facts/counters;
4. exact School requirement if any;
5. exact Night/relationship requirement if any;
6. exact Activity/item requirement if any;
7. exact stat threshold if justified;
8. what is optional vs mandatory;
9. explicit D16 commit boundary;
10. current-life resolution;
11. permanent/New Start+ reward;
12. reward class under D27/D28;
13. exact reward mechanics/caps/duration;
14. save/migration implications;
15. implementation status;
16. remaining lore/presentation OPEN items.

## Reward constraints

Prefer identity-specific future-run changes over generic power.

Do not use:
- unconditional +1 daily Energy;
- No Rent;
- broad passive money unless it clearly belongs in Keystone class and is proven necessary;
- generic extra calendar time;
- broad stat carry-over;
- free Specialist slots;
- Palace entry shortcuts;
- Secret Debt bypasses.

Ordinary Hard Work packages remain a separate unrestricted layer and do not consume Specialist capacity.

If a complex ending only merits automatic knowledge/content rather than a selectable strong modifier, say so.

## Cross-system authority

Preserve:
- D16 eligibility != automatic ending;
- D23 Palace sole 10/10 permanent + 10/10 active entry;
- D26 same-career max one shift/day;
- D27/D28 strong Meta architecture;
- D35 housing/private-space semantics;
- D37 Night completeness bar;
- D36/D38 Activity boundaries;
- ordinary Prostitute never inherits Secret Debt forced-route semantics.

Court Invitation may create Palace-related knowledge/context only; it may **not** grant Palace access or substitute for D23.

Network/Corruption, Merchant network, Assassin network and Prostitute network endings must remain mechanically distinct from one another and from D30 Network Retainer.

## Final deliverable

End with a Russian user-facing table:

`Ending | Как получить | Что происходит | Что даёт навсегда | Reward class | Exact numbers | OPEN`

Freeze exact SHA and report:
`READY_FOR_LEADER_PRODUCT_DECISION`.
