# CURRENT LEADER1 ASSEMBLY QUEUE

Status: **ACTIVE**

Current Chat 2 lane:
1. **D40 Tranche B**
   - assembly head checked: `537bceb9934f2bbdd90b220657a732143949f191`;
   - focused D40 gate #1167: **SUCCESS**;
   - full CI #1172: **FAILURE — exactly 1 remaining test**;
   - blocker: Merchant School readiness must publish after three sessions before first Merchant shift across the normal reaction/day boundary;
   - repair and rerun full CI; no merge before green.

Frozen next candidates:
2. **D41 Tranche A**
   - `chat5/advanced-endings-tranche-a-producer-v11@56e1fcc19201f8586634262bb8746cb99d33f8e9`
   - focused QA run `37143638847`: **SUCCESS**
   - assemble only after D40 merge + exact-main green.

Then preserve the established order:
3. **D42 Night** — frozen accepted candidate already queued by prior checkpoint.
4. **Secret Debt v12** — `chat4/secret-debt-full-route-producer-v12@10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`.
5. **Palace cumulative v15/v16/v18**, then selective v19 content layer:
   - v18 `67f948d185883d8e706dad522e5010bff8e2bd48`;
   - v19 `6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`.
6. **Activity cumulative through Restricted Sites v15**
   - `chat3/restricted-sites-production-v15@ab378d68765f7c9bbff43abf3b4b41e24df82e01`.
7. **D38 Activity ending family binding** — consume the new Chat 3 v16 producer when frozen.
8. **D46 economy/start-balance runtime**
   - frozen `chat4/economy-start-balance-producer-v14@a0c5f855b63d3bb85556f5b2780aaaabb58fbced`;
   - focused run `37147051068`: typecheck/validate/build PASS, 59/59 focused PASS.
9. **D47 Hard Work package mapping runtime** — consume Chat 5 v13 when frozen.
10. Final reachability/save/migration/UI/localization/regression closure.

Rules:
- Chat 2 is the sole current-main assembly/full-CI lane.
- Producers do not merge main.
- Exact SHA + focused tests precede assembly.
- Full CI precedes Leader merge.
- Exact-main CI must be green after each production merge.
