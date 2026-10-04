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
   - current-main assembly branch `chat2/assembly-d41-tranche-a-current-main-20261004-v1`.

Then preserve integration order:
3. **D42 Night** — accepted frozen Night candidate.
4. **Secret Debt v12**
   - `chat4/secret-debt-full-route-producer-v12@10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`.
5. **Palace cumulative v15/v16/v18**, then selective v19 content:
   - v18 `67f948d185883d8e706dad522e5010bff8e2bd48`;
   - v19 `6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`.
6. **Activity cumulative through Restricted Sites v15**
   - `chat3/restricted-sites-production-v15@ab378d68765f7c9bbff43abf3b4b41e24df82e01`.
7. **D38 Activity ending family**
   - frozen candidate `chat3/activity-ending-family-producer-v16-r1@3cf69d7cb3df1a58d68908159d0acc14736435c4`;
   - producer static audit 96/96 PASS;
   - executable focused QA remains Chat 2 assembly responsibility.
8. **D46 economy/start-balance runtime**
   - `chat4/economy-start-balance-producer-v14@a0c5f855b63d3bb85556f5b2780aaaabb58fbced`;
   - focused run `37147051068`: typecheck/validate/build PASS, 59/59 focused PASS;
   - follow-up 160-day economy audit: **PASS, no retune blocker**.
9. **D47 Hard Work package mapping runtime**
   - producer candidate `chat5/hard-work-bonus-mapping-producer-v13@252dc26c514e24f4ab0f0cc0da7694254282e4c4`;
   - **pending focused executable QA** before freeze.
10. Final reachability/save/migration/UI/localization/regression closure.

Product/content locks outside assembly ordering:
- D48 Palace minimum media target accepted;
- D49 macro-mystery lore authority accepted via `LEADER1_D49_MACRO_LORE_LOCK_2026-10-04.md`.

Rules:
- Chat 2 is the sole current-main assembly/full-CI lane.
- Producers do not merge main.
- Exact SHA + focused evidence precede Leader merge.
- Full CI precedes Leader merge.
- Exact-main CI must be green after each production merge.
