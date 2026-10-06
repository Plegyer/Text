# CURRENT LEADER1 ASSEMBLY QUEUE

Status: **ACTIVE**

Completed production gates:

1. **D40 Tranche B**
   - assembly `9f16458df1dd2232afe205e3f05920618f6007aa`;
   - full CI #1176: **SUCCESS**;
   - Leader merge `209e2f6dae5ae3c34c0803410d640b67022cc899`;
   - exact-main #1177: **SUCCESS**.

2. **D41 Tranche A**
   - assembly `325f439cc4977745d80ce1a38962763f7be43804`;
   - full CI #1199 / run `37204412669`: **SUCCESS**;
   - Leader merge `f36de067ae2e82518360dbe045f71c700e200805`;
   - exact-main #1200 / run `37204724787`: **SUCCESS**.

Current Chat 2 lane:

3. **D42 Night**
   - producer `chat4/night-content-gap-producer-v10@9305d1da055203c51137041a78a345cbc64339c0`;
   - current-main assembly branch `chat2/assembly-d42-night-current-main-20261004-v1`;
   - production base `main@f36de067ae2e82518360dbe045f71c700e200805`.

Then:

4. **Secret Debt v12 + D51 compatibility**
   - Secret Debt producer `chat4/secret-debt-full-route-producer-v12@10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`;
   - D51 producer `chat3/secret-debt-activity-energy-compat-producer-v20@79a868bf30af2c162b2ea1323759dffad5e8dadf`;
   - exact-head QA v21: run `37205501396` **SUCCESS**, typecheck/validate/build PASS, focused **58/58 PASS**;
   - Chat 3 v22 Secret Debt+D51 preflight complete and accepted; current Chat 3 task is Activity cumulative preflight v24.

5. **Palace cumulative**
   - mechanics/content through `chat6/palace-prince-narrative-producer-v18@67f948d185883d8e706dad522e5010bff8e2bd48`;
   - final prose/media `chat6/palace-final-prose-media-v19@6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`.

6. **Activity cumulative + persistence + endings**
   - regions through v15 `ab378d68765f7c9bbff43abf3b4b41e24df82e01`;
   - Camp persistence `chat4/activity-camp-persistence-producer-v17@0cae33dd3518dbda7d6d84e4ea6661b02fe49886`;
   - Camp executable-green repair: `chat4/activity-camp-baseline-repair-v19@efde0a38bf71a8946194402a9fc47abb168f2aff`;
   - typecheck/validate/build PASS; focused 107/107 PASS;
   - READY_FOR_CHAT2_ASSEMBLY.
   - D38 mechanics `3cf69d7cb3df1a58d68908159d0acc14736435c4`;
   - D38 content `df9ef5c3d04cfd8eb582c24838d971854e984218`;
   - reachability audit v18 PASS.

7. **D46 + D47 + legacy ending retirement**
   - D46 `a0c5f855b63d3bb85556f5b2780aaaabb58fbced`, focused 59/59 PASS;
   - D47 `252dc26c514e24f4ab0f0cc0da7694254282e4c4`, exact-head QA 103/103 PASS;
   - lumber-stay retirement Product packet `4f4df720c9677b4b9becc0cb8538da26a276f944`;
   - lumber-stay retirement producer v17 focused-green and READY_FOR_CHAT2_ASSEMBLY;
   - D46+D47+legacy assembly preflight v18 complete;
   - current Chat 5 task: Palace D39 reward preflight v19.

8. **Global presentation / localization / final closure**
   - v23 presentation producer `f25069c369c449ce0efbfe57acf877f950b1dfea`;
   - exact-head QA run `37203184279`: SUCCESS, focused 36/36 PASS;
   - Chat 6 ending localization producer v26 complete and READY_FOR_CHAT2_CONTENT_ASSEMBLY;
   - current Chat 6 task: Secret Debt ending localization v27;
   - final 23-case save/migration suite + reachability/UI/localization/regression closure.

Broad burn-down remaining: **6**.

Rules:
- Chat 2 is the sole current-main assembly/full-CI lane.
- Producers never merge main.
- Exact SHA + focused evidence before assembly.
- Full CI before Leader merge.
- Exact-main CI after every production merge.


## AUTHORITATIVE QUEUE UPDATE — AFTER D42

D42 is merged and exact-main green.

Broad burn-down: **5**

Assembly order:
1. Secret Debt v12 + D51 — ACTIVE in Chat 2
2. Palace
3. Activity + Camp + D38
4. D46 + D47 + legacy ending retirement
5. final closure

Chats 3-6 now work from auto-continue bundles instead of one-task refill.
