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
   - Chat 3 exact-head QA v21 active.

5. **Palace cumulative**
   - mechanics/content through `chat6/palace-prince-narrative-producer-v18@67f948d185883d8e706dad522e5010bff8e2bd48`;
   - final prose/media `chat6/palace-final-prose-media-v19@6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`.

6. **Activity cumulative + persistence + endings**
   - regions through v15 `ab378d68765f7c9bbff43abf3b4b41e24df82e01`;
   - Camp persistence `chat4/activity-camp-persistence-producer-v17@0cae33dd3518dbda7d6d84e4ea6661b02fe49886` with exact-head QA v18 active;
   - D38 mechanics `3cf69d7cb3df1a58d68908159d0acc14736435c4`;
   - D38 content `df9ef5c3d04cfd8eb582c24838d971854e984218`;
   - reachability audit v18 PASS.

7. **D46 + D47 + legacy ending retirement**
   - D46 `a0c5f855b63d3bb85556f5b2780aaaabb58fbced`, focused 59/59 PASS;
   - D47 `252dc26c514e24f4ab0f0cc0da7694254282e4c4`, exact-head QA 103/103 PASS;
   - lumber-stay retirement Product packet `4f4df720c9677b4b9becc0cb8538da26a276f944`;
   - Chat 5 retirement producer v17 active.

8. **Global presentation / localization / final closure**
   - v23 presentation producer `f25069c369c449ce0efbfe57acf877f950b1dfea`;
   - exact-head QA run `37203184279`: SUCCESS, focused 36/36 PASS;
   - Chat 6 final localization/accessibility closure audit v25 active;
   - final 23-case save/migration suite + reachability/UI/localization/regression closure.

Broad burn-down remaining: **6**.

Rules:
- Chat 2 is the sole current-main assembly/full-CI lane.
- Producers never merge main.
- Exact SHA + focused evidence before assembly.
- Full CI before Leader merge.
- Exact-main CI after every production merge.
