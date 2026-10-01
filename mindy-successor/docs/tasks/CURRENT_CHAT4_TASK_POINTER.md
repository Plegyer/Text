# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — C4-144 POST-UNDEAD MAIN GATE**
Owner: Chat 4 / QA + Product Acceptance Gate

Current handoff checkpoint:
- `../LEADER1_HANDOFF_CHECKPOINT_2026-10-01.md`

Completed:
- C4-143 PASS on old accepted wave / main `afed43c...`, CI #679 SUCCESS;
- C4-147 Tavern runtime PR #187: PASS-WITH-NOTES;
- C4-138..142 accepted Undead runtime / Poverty / Undead School / Undead presentation and recorded collision order.

Lead has now integrated Undead runtime:
- main product commit `152413eb31086905967cdcff6a4d9a8e839e6088`
- integration source PR #190
- post-merge main workflow #695 / id `36837233858` was in progress at handoff.

## Do now

### C4-144
As soon as current-main CI for the Undead runtime merge is green:
- verify exact current main;
- verify natural Undead career acceptance, School dependency seams not yet counted as shipped, Forest return, 50-shift Hard Work, complex endings, no-Meta complex reward authoring and Save/reload;
- record exact SHA/run.

### Then
- after Lead integrates #180 -> C4-145;
- after Lead integrates #181 then #182 -> C4-146;
- C4-148 gate Tavern siblings:
  - #185 Tavern authored content, frozen green;
  - #191 Tavern School, frozen green;
  - final clean Chat 2 Tavern presentation candidate once C2-156 freezes it.

Do not implement producer fixes.
A blocker on one candidate does not stop other eligible gates.
