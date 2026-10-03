# CURRENT LEADER1 ASSEMBLY QUEUE

Status: **ACTIVE**

Current Chat 2 lane:
1. **D40 Tranche B** — current-main assembly in repair/full-CI cycle.

Frozen next candidate:
2. **D41 Tranche A**
   - `chat5/advanced-endings-tranche-a-producer-v11@56e1fcc19201f8586634262bb8746cb99d33f8e9`
   - focused QA run `37143638847`: **SUCCESS**
   - assemble only after D40 is merged and exact-main is green.

Then preserve the established order:
3. D42 Night;
4. Secret Debt v12;
5. Palace cumulative v15/v16/v18;
6. Activity cumulative through Restricted Sites v15;
7. D38 final Activity ending binding if still required;
8. D46 economy/start-balance runtime producer when ready for integration;
9. final reachability/save/migration/UI/localization/regression closure.

Rules:
- Chat 2 is the sole current-main assembly/full-CI lane.
- Producers do not merge main.
- Exact SHA + focused tests precede assembly.
- Full CI precedes Leader merge.
- Exact-main CI must be green after each production merge.
