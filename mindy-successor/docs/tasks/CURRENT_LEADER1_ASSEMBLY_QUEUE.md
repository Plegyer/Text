# CURRENT LEADER1 ASSEMBLY QUEUE

Status: **ACTIVE**

Completed production gate:
1. **D40 Tranche B**
   - frozen assembly head `9f16458df1dd2232afe205e3f05920618f6007aa`;
   - full CI #1176: **SUCCESS**;
   - Leader merge `209e2f6dae5ae3c34c0803410d640b67022cc899`;
   - exact-main #1177: **SUCCESS**.

Current Chat 2 lane:
2. **D41 Tranche A**
   - frozen producer `chat5/advanced-endings-tranche-a-producer-v11@56e1fcc19201f8586634262bb8746cb99d33f8e9`;
   - producer focused run `37143638847`: **SUCCESS**;
   - current-main assembly branch `chat2/assembly-d41-tranche-a-current-main-20261004-v1`;
   - full CI #1180: 22 failures;
   - authoritative Chat 5 triage `06fd08196d9eabdc1b4f6e3a360794cd64d1e80c`: **18 stale test/fixture + 4 retired legacy identity/presentation + 0 D41 runtime regressions**;
   - Chat 2 repair is test/fixture/manifest alignment only unless new evidence appears.

Then preserve integration order:
3. **D42 Night** — accepted frozen Night candidate.
4. **Secret Debt v12**
   - `chat4/secret-debt-full-route-producer-v12@10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`.
5. **Palace cumulative v15/v16/v18**, then selective v19 content:
   - v18 `67f948d185883d8e706dad522e5010bff8e2bd48`;
   - v19 `6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`.
6. **Activity cumulative through Restricted Sites v15**
   - `chat3/restricted-sites-production-v15@ab378d68765f7c9bbff43abf3b4b41e24df82e01`.
7. **Activity Camp persistence P0**
   - active producer `chat4/activity-camp-persistence-producer-v17`;
   - required by final save/migration audit before 1.0 save compatibility.
8. **D38 Activity ending family + content**
   - mechanics `chat3/activity-ending-family-producer-v16-r1@3cf69d7cb3df1a58d68908159d0acc14736435c4`;
   - content/presentation `chat3/activity-ending-content-presentation-v17@df9ef5c3d04cfd8eb582c24838d971854e984218`;
   - reachability audit `chat3/activity-ending-reachability-audit-v18@7ae7a9b273f1806ac04b566c318896783bab6595`: **PASS**;
   - mid-prep reference ~5 entries, <=10 healthy, Day-120 reference credible;
   - one open compatibility risk: Street -1 Energy + Secret Debt next-day -1 may threaten 2-Energy Activity availability; Chat 3 v19 is auditing.
9. **D46 economy/start-balance runtime**
   - `chat4/economy-start-balance-producer-v14@a0c5f855b63d3bb85556f5b2780aaaabb58fbced`;
   - focused run `37147051068`: typecheck/validate/build PASS, 59/59 focused PASS;
   - economy reachability audit: **PASS, no retune blocker**.
10. **D47 Hard Work package mapping runtime**
   - producer `chat5/hard-work-bonus-mapping-producer-v13@252dc26c514e24f4ab0f0cc0da7694254282e4c4`;
   - exact-head focused run `37200203160`: **SUCCESS**;
   - typecheck/validate/build PASS;
   - focused **103/103 PASS**.
11. **Global presentation mapping pass**
   - producer candidate `chat6/global-presentation-mapping-producer-v23@f25069c369c449ce0efbfe57acf877f950b1dfea`;
   - exactly 93 additive mappings;
   - static integrity PASS;
   - exact-head executable QA active on Chat 6 v24 before freeze.
12. Final 23-case save/migration suite + reachability/UI/localization/regression closure.

Product/content locks outside assembly ordering:
- D48 Palace minimum media target accepted;
- D49 macro-mystery lore authority accepted;
- D50 global non-Palace media direction accepted.

Rules:
- Chat 2 is the sole current-main assembly/full-CI lane.
- Producers do not merge main.
- Exact SHA + focused evidence precede Leader merge.
- Full CI precedes Leader merge.
- Exact-main CI must be green after each production merge.
