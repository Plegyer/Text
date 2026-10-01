# CURRENT CHAT4 TASK POINTER

Status: **WAITING FOR LEAD #181 + #182 INTEGRATION — NEXT C4-146**
Owner: Chat 4 / QA + Product Acceptance Gate

Completed:
- C4-143 PASS on old accepted wave / main `afed43c...`, CI #679 SUCCESS;
- C4-144 PASS on exact main `d532e9a9570e4cefc28122d54ca36c20489df35c`, CI #706 SUCCESS, 675/675;
- C4-145 PASS on exact main `8511fa4d1608b70547a734176cd2f065c28629dc`, CI #713 SUCCESS, 684/684;
- C4-147 Tavern runtime PR #187: PASS-WITH-NOTES;
- C4-138..142 candidate gates + collision order completed.

## Next

### C4-146
After Lead integrates #181 then #182:
- verify exact current main and exact main CI;
- verify Undead runtime + School + presentation combined behavior;
- preserve #181 values for all 8 School-overlap localization keys;
- verify natural career/School/Night/Forest/ending/save-reload paths remain green;
- verify Satyr/Forest presentation/UI consumers remain intact;
- record exact SHA/run and verdict.

### Then
- C4-148 gate Tavern siblings:
  - #185 Tavern authored content, frozen green;
  - #191 Tavern School, frozen green;
  - final clean Chat 2 Tavern presentation candidate once C2-156 freezes it.

Do not implement producer fixes.
A blocker on one candidate does not stop other eligible gates.
