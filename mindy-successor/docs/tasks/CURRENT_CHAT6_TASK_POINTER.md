# CURRENT CHAT6 TASK POINTER

Status: **ACTIVE — PALACE RICH-SIX RUNTIME PRODUCER v15**
Owner: Chat 6

Accepted authority:
- D23 Palace entry;
- D29 rich-six topology / milestones 2-5-8-12-15;
- v11 stage/duty contract:
  `chat6/palace-rich6-stage-contract-v11@0d95f1e3f3267901efdb701f727e4cc54fec4ef0`;
- v12 authored-content blueprint:
  `chat6/palace-authored-content-blueprint-v12@ade2dfa807a0bf8eb063eaa8b2cbf3c8965365ab`;
- D39 non-True Palace rewards:
  `chat6/palace-nontrue-ending-rewards-v13@7673e9f47404468175567d952825cf0b0e981ed3`;
- D43 cadence/economy:
  `chat6/palace-daily-cadence-economy-v14@7235004c5f8098ccb153646442af90f85af70a69`.

D43 authority commit:
`main@a15f911e1aaefed1b8262acf672fc89cdcd2f26d`.

New branch:
`chat6/palace-rich6-runtime-producer-v15`

## Assignment

Produce the current-main Palace rich-six runtime/content implementation candidate.

No full CI. Chat 2 remains the only full-CI lane.

## Implement

### Run-local Palace progression
Implement typed run-local state needed for:
- access already granted by D23 consumer;
- stage progression through:
  1. Entered Service
  2. Working Rhythm
  3. Trusted Service
  4. Palace Network
  5. Crossroads
  6. Outcome Ready
- structural duty count 0..15;
- exact milestones 2 / 5 / 8 / 12 / 15;
- exactly-once `palace.progression-complete`;
- daily structural-duty lock;
- committed duty ordinal/ID;
- daily support-action lock;
- non-exclusive route-prep facts.

Do not add `hardWork:palace`.

### Structural duty transaction — D43 exact
At most one progression-counting structural duty per calendar day.

Exact transaction:
- cost 1 Energy;
- does not end daytime;
- max one/day regardless of extra Energy;
- wage:
  `35 + min(20, floor((Reason + Wits + Manners + Sociability) / 20))`;
- wage bounded 35..55;
- no routine stat gain;
- no automatic Lust;
- no routine negative stat effect;
- no 16th paid progression duty.

Commit must be atomic/reload-safe and must not duplicate:
- Energy spend;
- money;
- duty count;
- milestone;
- daily lock.

### Fifteen authored duties
Use the accepted v12 exact 15-duty map across:
- Service Rotation;
- Logistics Support;
- Records Review;
- Coordination;
- Formal Interface;
- Evidence Review.

Use functional production copy/localization only.
Do not invent final Palace lore/mystery truth.

### Optional Palace support/prep
Implement accepted support envelope:
- max 1 support action/day;
- cost 1 Energy;
- pays 0;
- no duty count;
- no routine stats;
- may occur same day as duty if Energy remains.

Implement the accepted route-prep beats:
- Service Life prep available from Trusted Service / duty-5 threshold;
- Court Power prep available from Palace Network / duty-8 threshold;
- Inner Truth prep available from Crossroads / duty-12 threshold;
- prep remains non-exclusive.

### Endings
Implement non-True Palace ending eligibility for:
- `ending.palace.service-life`;
- `ending.palace.court-power`;
- `ending.palace.inner-truth`.

Eligibility:
- requires Outcome Ready + exact route final-ready fact;
- non-terminal under D16;
- multiple Palace non-True endings may coexist eligible;
- only explicit commit selects one.

Preserve True Ending separately:
- Palace route;
- `palace.progression-complete`;
- all 12 progression stats >=91;
- Lust excluded;
- Prince confrontation;
- explicit Return Home.

Do not invent final Prince/mystery lore.

### D39 reward seams
Strong-Meta runtime dependency remains:
`chat4/strong-meta-runtime-producer-v7@6c3865aec1283055ab0713ca4b2873d379f3ddc6`.

Do NOT invent a second strong-Meta registry.

If current main lacks the final Specialist infrastructure:
- preserve exact reward IDs:
  - `palace.service-life.steady-practice`;
  - `palace.court-power.formal-introduction`;
- provide explicit grant/binding seam for Chat 2;
- do not silently replace their mechanics.

Inner Truth:
- `palace.inner-truth.source-method` is automatic knowledge/content;
- wire only through an existing compatible automatic-knowledge mechanism or leave a precise integration seam if needed.

### Secret Debt
If Palace access was already legitimately granted under D23:
- Secret Debt binding does not revoke Palace daytime access;
- does not reset Palace progression;
- ordinary ten careers remain locked;
- forced Night still wins;
- next-day Energy -1 is applied before Palace action spending;
- Palace wage/cadence unchanged;
- paid duty progression still ends permanently at duty 15.

Do not make Palace a debt-repayment farm.

### Lodging / Night
- normal/cheap/street do not gate daytime Palace duty;
- Palace optional Night never outranks forced Secret Debt Night;
- no Palace Night duty count/wage/Energy refund.

## Preserve current-main D23 consumer

Critical:
- do not restore legacy permanent `meta.unlocks['palace']`;
- do not restore `ensurePalaceUnlock(s.meta)`;
- Palace invitation/access remains run-local;
- old completed saves receive no retroactive invitation;
- D23 remains permanent ordinary 10/10 + current active 10/10 only.

## Focused QA

Run focused only:
1. typecheck;
2. validate;
3. build;
4. D23 invitation regression;
5. Palace 9+9 / 10+0 / 10+9 / 10+10 matrix;
6. duty 1..15 progression;
7. milestone 2/5/8/12/15 exactly once;
8. one structural duty/day;
9. extra Energy cannot buy a second duty;
10. exact wage 35..55 including cap-200;
11. max total paid structural wage 825;
12. no routine stat/Lust changes;
13. support max1/day / cost1 / pay0 / no duty count;
14. route-prep non-exclusive;
15. three non-True endings coexist eligible at Outcome Ready;
16. explicit commit required;
17. True Ending 12×91 and Lust excluded;
18. bound Secret Debt Palace access preserved;
19. bound Energy -1 ordering;
20. forced Night precedence;
21. save/reload no duplicate duty/wage/milestone;
22. migration/current-save compatibility.

No full CI.
Do not merge main.

Freeze exact SHA and report:
`READY_FOR_CHAT2_ASSEMBLY`.
