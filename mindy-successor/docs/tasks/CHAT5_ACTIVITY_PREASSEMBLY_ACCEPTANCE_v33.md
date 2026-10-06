# Chat 5 — Activity Preassembly Acceptance v33

Status: **READY_FOR_CHAT2_ASSEMBLY**  
Owner: Chat 5  
Branch: `chat5/activity-exact-head-qa-bundle-v31`

No production runtime was changed by this bundle.  
No full CI was run.

## Purpose

Freeze one exact accepted source stack for final Activity assembly after independent exact-head review of the historical v15/v16/v17 sources.

This packet does not authorize wholesale cherry-picking of historical runtime files.

Chat 2 must selectively compose the accepted semantics onto the actual post-Palace current main.

---

# 1. Exact accepted input stack

## A. Four-region D36 production baseline

Frozen source:

`chat3/restricted-sites-production-v15@ab378d68765f7c9bbff43abf3b4b41e24df82e01`

Implementation head:

`13f67618bbe63e2e089381aaf605adef173f94e9`

Independent QA:

`CHAT5_ACTIVITY_REGIONS_V15_EXACT_HEAD_QA_v31.md`

Accepted semantics:

- Forest Frontier;
- Trade Corridor;
- Anomalous Reach;
- Restricted Sites;
- Activity entry cost = 2 Energy;
- production Field Time = 6;
- typed route/item/career/relationship/School/capability gates;
- Restricted Sites Suspicion extension;
- no universal Activity XP;
- no Palace/Secret Debt bypass.

Historical exact head is not standalone-green because of inherited baseline manifest/test defects.

Those defects are covered by input B.

---

## B. Executable-green Activity/Camp baseline repair

Frozen behavioral Camp producer:

`chat4/activity-camp-persistence-producer-v17@0cae33dd3518dbda7d6d84e4ea6661b02fe49886`

Accepted executable repair head:

`efde0a38bf71a8946194402a9fc47abb168f2aff`

Repair branch final head:

`chat4/activity-camp-baseline-repair-v19@8b5874faa23130208c83818af3f37431c1377caa`

Executable evidence:

- run `37206785081`;
- job `111449513323`;
- exact SHA guard PASS;
- typecheck PASS;
- validate PASS;
- build PASS;
- cumulative focused **107/107 PASS**;
- Camp suite **7/7 PASS**.

Required baseline repairs include:

- synthetic Activity option `effects: []`;
- Forest capability-manifest reads:
  - `activity.forest-frontier.result.research-grade`;
  - `forest.frontier.school-reflection-recorded`;
- stale cumulative test fixtures/assertions only.

v19 does not change the accepted Activity runtime semantics.

This repair is mandatory before treating the historical v15-v17 source family as executable.

---

## C. D38 ending mechanics

Frozen mechanics source:

`chat3/activity-ending-family-producer-v16-r1@3cf69d7cb3df1a58d68908159d0acc14736435c4`

Implementation head:

`884bc0fb2155af4f7508f69db7aea8fc6dbfcd37`

Independent QA:

`CHAT5_ACTIVITY_D38_V16_V17_EXACT_HEAD_QA_v32.md`

Stable endings:

- `ending.activity.pathfinder`;
- `ending.activity.preservation`;
- `ending.activity.network`.

Accepted lifecycle:

- eligibility is non-terminal;
- explicit D16 commit required;
- central completion required.

Common D38 baseline:

- >=3 of 4 regional anchors;
- >=2 distinct specialized mini-game families;
- >=1 meaningful extracted Activity result;
- >=1 resolved Activity contact/network thread.

Ending-specific marked-region counts require:

`same-region anchor + same-region classification marker`.

No Palace substitution.

---

## D. D38 final content / presentation

Frozen source:

`chat3/activity-ending-content-presentation-v17@df9ef5c3d04cfd8eb582c24838d971854e984218`

Implementation head:

`5306fbf4c72caed42291e62f2eecba3e6e348d2c`

Accepted:

- RU/EN title;
- RU/EN description;
- RU/EN epilogue;
- Specialist functional copy;
- three ending presentation slots;
- localized ended-screen epilogue consumer.

Safe presentation reuse:

- Pathfinder -> `assets/presentation/forest-route-default-v1.svg`;
- Preservation -> `assets/stage-town.svg`;
- Network -> `assets/stage-town.svg`.

Dedicated final Activity ending art is not a release mechanics prerequisite.

Network epilogue is superseded by input H.

---

## E. Canonical D38 reward runtime

Frozen producer:

`chat3/activity-d38-reward-producer-v26@7770b6bf7f930e8af17331e8b22613523bb2e768`

Independent exact-head QA:

`chat5/qa-activity-d38-reward-v22@78addc366adb59ff383c249b3f1252a8a95a13ea`

Successful QA:

- run `37456870066`;
- job `112246513706`;
- typecheck PASS;
- validate PASS;
- build PASS;
- D38/Strong Meta/save-load bundle 58/58 PASS;
- Secret Debt/Palace/ordinary-career firewall bundle 21/21 PASS;
- total **79/79 PASS**.

Canonical reward IDs:

- `specialist.activity.surveyors-atlas`;
- `specialist.activity.field-archive`;
- `specialist.activity.contact-network`.

All three are normal Specialists.

Global Specialist capacity remains:

**2**

No Activity-only slot.

Final ownership must use canonical Strong Meta, not the historical v16 generic unlock seam as a duplicate permanent path.

---

## F. Exact D38 authored mapping

Research authority:

`chat3/activity-d38-authored-tag-mapping-v27@3ab2800a7d586b5e37600c3ff11d1129ff823df0`

### Atlas

Exactly **4** authored survey/discovery options.

Each:

- already legal on its authored route;
- normal Field Time cost exactly 1;
- may cost 0 once/region/run when Atlas is selected.

Do not tag route selectors, shortcuts, contacts or mini-game completion.

### Field Archive

Exactly **3** secure-eligible carried-result IDs.

Forest intentionally has none.

Accepted results:

- Trade sample;
- Anomalous sample;
- Restricted evidence.

Do not tag:

- research-grade facts;
- Preservation markers;
- success facts;
- generic inventory.

### Contact Network

Exactly **3** authored contact options:

- `trade.challenge.market-supplier-contact`;
- `anomaly.challenge.rift-keeper-contact`;
- `restricted.challenge.handler-handoff`.

Forest intentionally has none.

Normal on-route use remains available without the Specialist and consumes no Specialist charge.

Only lateral reuse may consume the region's Contact Network use.

---

## G. Final Activity assembly packet

Primary selective-assembly authority:

`chat3/activity-final-assembly-packet-v28@742661162991108d22138eec495657b0dcdece0f`

Use v28 for:

- composition order;
- shared-file ownership;
- Camp ordering;
- save/reload expectations;
- D38 runtime wiring;
- exact focused assembly gate.

Do not reconstruct v24-v27 independently where v28 already resolves their composition.

---

## H. Corrected Activity Network epilogue

Correction producer:

`2f8f291a7e03bcf1677d6f51feaec28fe98e29ba`

Final bundle:

`chat6/activity-network-copy-fix-v36@750999ce1ab17b6e0f1ed1083349fcb8350548ed`

Only authoritative changed localization key:

`ending.ending.activity.network.epilogue`

Final RU:

`Контакты связывают разрозненные направления в единое рабочее пространство.`

Final EN:

`The contacts tie disconnected routes into one practical working network.`

The old v17 unconditional four-direction claim is superseded.

No mechanics/reward/gate/presentation change.

Chat 2 must include:

`tests/activity-network-copy-fix-v36.test.ts`

in the focused Activity/content gate.

---

# 2. Exact-head review result

The new independent exact-head runs found no new D38 semantic defect.

They did find the known inherited pre-v19 baseline blockers.

Strict run:

`37464942972`

All three exact sources:

- v15;
- v16;
- v17;

passed:

- checkout;
- exact SHA guard;
- `npm ci`;

then hit the same inherited typecheck fixture defect.

Diagnostic run:

`37465988551`

proved:

- v15/v16/v17 exact heads all build successfully;
- validate is blocked by the same inherited Forest capability-manifest omission;
- focused file failures stop at catalog construction on that same omission.

This is exactly the baseline class fixed by accepted v19.

Therefore the correct assembly interpretation is:

**old producer semantics + accepted v19 repair**

not:

**modify/rewrite old producer semantics until its historical branch becomes standalone green**.

---

# 3. Post-Palace Strong Meta merge contract

Activity is queued after Palace.

Therefore the actual assembly base is expected to already contain D39 additions.

Do not copy the standalone v26 `strongMeta.ts` wholesale.

Accepted collision audit:

`CHAT5_D38_D39_STRONG_META_COLLISION_AUDIT_v27.md`

Required combined registry after D38 + D39:

- total rewards: **25**;
- Specialists: **22**;
- Keystones: **3**;
- Specialist capacity: **2**.

D38 adds exactly three Specialist IDs.

D39 adds exactly two Palace Specialist IDs.

Source Method:

`palace.inner-truth.source-method`

remains automatic knowledge, not a Specialist/Keystone.

`palace.true.cap-200`

remains one normal Specialist.

Both standalone producers called different registry contents `strong-meta-v4`.

The final combined registry must use the next intentional registry identity from the actual current base rather than reusing one standalone producer's v4 cardinality.

Old active snapshots keep their saved registryVersion and resolved effects.

---

# 4. Required Field Archive durability guard

Accepted independent review:

`CHAT5_ACTIVITY_FINAL_PACKET_INDEPENDENT_REVIEW_v25.md`

v15 immediately publishes secure-eligible source result facts.

Anomalous and Restricted content can react to those facts and publish derived:

`activity.*.result.research-grade`

before final Activity outcome.

Therefore final Field Archive wiring must not allow this invalid durability sequence:

1. transient secure-eligible source acquired;
2. research-grade derivative published;
3. later escape/failure loses source;
4. derivative remains permanently.

Required semantics:

- unsecured lost source result cannot leave unsupported derived durability;
- Archive-secured source may survive and support legal downstream durable projection.

Preferred implementation:

defer durable projection/reaction until source is durable.

Acceptable alternative:

dependency-aware rollback.

Do not make research-grade itself Archive-eligible.

This is a mandatory Chat 2 assembly assertion.

---

# 5. Required executable authored-mapping guard

v27 is research-only.

Chat 2 must materialize executable catalog assertions for:

- exactly 4 Atlas tags;
- exactly 3 Archive result tags;
- exactly 3 Contact tags;
- Forest Archive = none;
- Forest Contact = none.

Also prove:

- tagged Contact options remain normally usable on authored route without Specialist;
- normal route use consumes no Contact charge;
- lateral use consumes charge only after successful option commit.

Do not hand off Activity as ready if these assertions are missing.

---

# 6. Camp / Secret Debt / D51 ordering

Camp source remains accepted v17 semantics with v19 executable baseline repair.

Hard rules:

- max two Camp nights per Activity entry;
- one calendar advance per completed Camp night;
- Field Time refresh exactly once;
- Camp does not refresh global daily Energy;
- no city lodging charge;
- no ordinary voluntary city Night.

Before Camp calendar commit:

query existing forced pre-lodging Night resolver.

If Secret Debt forced Night wins:

- Camp does not advance calendar first;
- Camp does not refresh FT;
- forced Night owns the boundary;
- D51 provenance remains NightFlow-owned.

Activity cannot suppress Secret Debt forced Night.

---

# 7. Palace firewall

Activity/D38 never grants:

- D23 qualification;
- Palace access;
- Palace duty progress;
- Prince readiness/defeat;
- Return Home eligibility.

Palace does not substitute for Activity gates.

Activity ending eligibility contains no Palace requirement.

D38 Specialists consume the same global two Specialist slots as Palace/other Strong Meta Specialists.

---

# 8. Save / reload acceptance

Preserve:

- 2-Energy Activity entry exactly once;
- finite Field Time;
- route/checkpoint/RNG;
- mini-game state;
- Suspicion;
- Camp local state;
- D38 runtime:
  - Atlas used regions;
  - Archive secured results;
  - Contact used regions;
- carried-result state;
- ending transaction.

Old schema6 saves missing D38 runtime default to exact empty state.

No ownership/use inferred.

Ghost D38 runtime without matching selected snapshot reward rejects.

Current Strong Meta snapshot is immutable.

Newly earned D38 reward cannot activate in earning life.

---

# 9. Required Chat 2 assembly order

On actual post-Palace main:

1. preserve current D42 + Secret Debt/D51 + Palace/D39 runtime;
2. compose v15 four-region Activity source;
3. compose accepted Camp semantics;
4. carry v19 executable baseline repairs;
5. add v16 D38 ending mechanics;
6. apply v17 final Activity content/presentation;
7. compose v26 canonical D38 Strong Meta additions into current registry;
8. apply exact v27 authored tags;
9. wire Atlas/Archive/Contact helpers;
10. implement Field Archive carried-result durability with derived-fact guard;
11. merge current UI/localization/presentation semantically;
12. apply v36 one-key Network epilogue override;
13. run focused gate;
14. only then use normal Chat 2 full-CI lane.

Never wholesale replace current engine/schema/strongMeta/app/shared JSON with an historical producer snapshot.

---

# 10. Minimum focused gate

First:

```text
npm ci
npm run typecheck
npm run validate
npm run build
```

Then retain the v28 Activity focused bundle, including:

- `activity-d38-strong-meta-v26.test.ts`;
- `activity-ending-family-v16.test.ts`;
- `activity-ending-content-presentation-v17.test.ts`;
- `activity.test.ts`;
- region v12/v13/v14/v15 suites;
- `activity-camp-persistence-v17.test.ts`;
- Activity reload/exactly-once suites;
- current Strong Meta registry/integration;
- ending-meta;
- NightFlow;
- Secret Debt/D51;
- Palace D23/runtime sentinels;
- presentation parity/integrity/accessibility.

Add/extend executable assertions for:

- exact v27 4/3/3 mapping;
- Field Archive source/derived durability;
- combined D38+D39 Strong Meta cardinality/runtime;
- v36 Network copy fix.

No focused failure may be waived merely because an isolated producer had an earlier static audit.

---

# 11. Remaining merge-only risks

These are not reasons to reopen Product decisions.

They are integration work Chat 2 must prove.

## R1 — historical cumulative source blockers

v15-v17 historical heads are not standalone-green.

Must include v19 repairs.

## R2 — shared Strong Meta lineage

D38 and D39 independently forked the same pre-combined registry.

Must semantic-union them.

## R3 — Field Archive durability

Need carried-result/durable-result distinction and derived-fact handling.

## R4 — authored tags

v27 provides mapping only; production tags and executable mapping assertions still need assembly.

## R5 — current shared files

High-pressure files include:

- `engine.ts`;
- `schema.ts`;
- `strongMeta.ts`;
- `content.ts`;
- `app.ts`;
- `definitions.json`;
- `localization.json`;
- `presentation.json`.

Manual semantic composition required.

## R6 — v36 chronology

v36 must apply after v17.

Last-write-wins without value checking is forbidden.

## R7 — localized ended screen

Preserve v17 localized epilogue consumer when merging later UI snapshots.

---

# 12. Stop conditions

Stop and reconcile if any of the following occurs.

- actual assembly base is not the real post-Palace current main;
- v19 baseline repairs are omitted;
- typecheck/validate/build is not fully green after composition;
- any production Activity entry differs from 2 Energy;
- any v15 production region loses FT6;
- a region/capability/season/item/School/career/relationship gate is weakened;
- universal Activity XP appears;
- Camp becomes legal for v15 same-day regions without authority;
- Camp suppresses forced Secret Debt Night;
- D51 is reimplemented inside Activity;
- D38 ending auto-commits;
- D38 reward remains only generic unlock or duplicates canonical Strong Meta ownership;
- Specialist capacity changes from 2;
- combined D38+D39 registry loses either family;
- Source Method becomes selectable;
- Activity grants/substitutes Palace qualification/access/progress;
- exact v27 tags cannot be mapped to the frozen stable IDs;
- Forest Archive/Contact symmetry is invented;
- Field Archive preserves arbitrary inventory;
- unsecured lost result leaves unsupported research-grade durability;
- Contact Network bypasses any gate besides route alignment;
- normal Contact use consumes a Specialist charge;
- Atlas use is consumed before successful option commit;
- v17 predecessor Network epilogue overwrites v36;
- localized ended-screen seam disappears;
- any required focused test fails.

On focused failure:

**do not run full CI and do not report Activity ready.**

---

# 13. Final disposition

The Activity tranche has a complete accepted source stack.

Independent QA found no new Product/mechanics defect.

The only historical exact-head failures are already-accounted-for inherited baseline defects fixed by accepted v19.

The remaining risks are selective-assembly risks and are explicitly bounded above.

Accepted final stack:

```text
v15 four-region D36 source
+ Camp v17 semantics
+ executable-green v19 baseline repair
+ v16 D38 ending mechanics
+ v17 final Activity content/presentation
+ v26 canonical D38 reward runtime
+ v27 exact authored tag mapping
+ v28 final assembly packet
+ accepted D38/D39 semantic union
+ v36 corrected Network epilogue
```

**BUNDLE_COMPLETE — READY_FOR_CHAT2_ASSEMBLY**
