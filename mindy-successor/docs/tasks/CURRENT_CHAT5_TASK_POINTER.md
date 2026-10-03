# CURRENT CHAT5 TASK POINTER

Status: **ACTIVE — ORDINARY COMPLEX ENDINGS TRANCHE A v10**
Owner: Chat 5

Completed inventory snapshot:
`chat5/complete-ending-atlas-v9@7ff509343b7e41bd1790fc339023b46a6fcfa70d`

Leader disposition for v9:
- accepted as a **research inventory snapshot**;
- not accepted as final current Atlas because it predates D36/D37/D38 and Palace D23 current-main integration;
- do not edit frozen v9.

Known v9 refresh items for the future Atlas:
- Activity is now 3 separate endings, not one undefined family;
- canonical family count therefore changes;
- Palace D23 invitation consumer is now integrated on main;
- D37 is now authority;
- references claiming D35 left Hard Work +5 mapping OPEN are attribution errors; the mapping is still OPEN, but D35 is housing.

## New assignment

Close exact Product gates/rewards for the **early/mid advanced ordinary-career endings**.

New branch:
`chat5/ordinary-complex-endings-tranche-a-v10`

Create:
1. `mindy-successor/docs/tasks/CHAT5_ORDINARY_COMPLEX_ENDINGS_TRANCHE_A_v10.md`
2. `mindy-successor/research/ordinary_complex_endings_tranche_a_v1.csv`

No production runtime/UI/content changes.
No full CI.

## Endings in scope — exactly 14

### Lumber
- Forewoman
- Forest Compact

### Satyr Maid
- House Power
- Favourite / Partner / Personal Network
- Boundary Mastery

### Undead Farm
- Research Farmer
- Farm Successor
- External Anomaly

### Tavern
- Innkeeper
- Information Broker
- Sanctuary

### Hunter
- Master Hunter
- Warden
- Legend

Do not change the ordinary Hard Work ending for any career.

## For every ending define

1. stable ending ID — preserve executable ID when modern-compatible, propose a new one where missing/stale;
2. exact minimum career stage/shift requirement;
3. exact route facts/counters;
4. exact School requirement if any;
5. exact Night/relationship requirement if any;
6. exact Activity/item requirement if any;
7. exact stat threshold if justified;
8. optional vs mandatory inputs;
9. explicit D16 commit boundary;
10. current-life resolution;
11. permanent/New Start+ reward;
12. reward class under D27/D28;
13. exact reward mechanics/caps/duration;
14. migration/legacy cleanup;
15. implementation status;
16. remaining lore/presentation OPEN items.

## Existing authority to preserve

Lumber:
- D33 School management publisher;
- D34 stages newcomer / accepted-hand / trusted-worker / veteran;
- shift milestones 1 / 8 / 20;
- Forewoman and Forest cannot become eligible before trusted-worker;
- Hard Work remains 50 and separate.

Satyr Maid / Undead Farm / Tavern:
- distinguish current executable gates from final Product authority;
- do not silently preserve stale broad Meta rewards merely because runtime currently has them.

Hunter:
- Activity may contribute to advanced routes but no advanced Hunter ending may make Activity mandatory unless the route identity genuinely requires it;
- D36/D38 standalone Activity endings remain separate.

## Reward constraints

Prefer identity-specific future-run changes over generic raw power.

Do not use:
- unconditional +1 daily Energy;
- No Rent;
- generic large starting cash;
- extra calendar time;
- broad stat carry-over;
- free Specialist slots;
- Palace entry shortcuts;
- Secret Debt bypasses.

If an existing runtime reward like +600 starting money or a stale +5/global unlock no longer fits D27/D28, classify it as legacy/stale and propose a modern replacement.

Automatic knowledge/content unlocks should not consume Specialist slots.

## Final deliverable

End with a Russian table:

`Ending | Как получить | Что происходит | Что даёт навсегда | Reward class | Exact numbers | Legacy cleanup | OPEN`

Freeze exact SHA and report:
`READY_FOR_LEADER_PRODUCT_DECISION`.
