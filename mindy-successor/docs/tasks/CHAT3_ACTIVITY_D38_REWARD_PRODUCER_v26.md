# Chat 3 — Activity D38 Reward Producer v26

Status: **IMPLEMENTATION COMPLETE — READY FOR CHAT2 ASSEMBLY**  
Owner: Chat 3  
Branch: `chat3/activity-d38-reward-producer-v26`

Accepted authority:

`chat3/activity-d38-reward-implementation-preflight-v25@1024d8a657f0514f894042936e615364940f5e26`

Assigned branch head before implementation:

`aaa392610fe6c719b56919ae20fd6d4ee98a2302`

## Implemented rewards

- `specialist.activity.surveyors-atlas`
- `specialist.activity.field-archive`
- `specialist.activity.contact-network`

All three are canonical Strong Meta **Specialists**.

Global Specialist capacity remains exactly:

`STRONG_META_SPECIALIST_CAPACITY = 2`

No Activity-only slot was added.

---

# 1. Production files changed

Modified:

- `src/core/strongMeta.ts`

Added:

- `src/core/activityD38.ts`
- `content/activity-d38-reward-v26.fixture.json`

QA:

- added `tests/activity-d38-strong-meta-v26.test.ts`
- updated `tests/strong-meta-registry-v7.test.ts`

Intentionally unchanged in this producer:

- `src/core/engine.ts`
- `src/core/schema.ts`
- `src/core/content.ts`
- `content/definitions.json`
- Secret Debt runtime/content
- Palace runtime/content
- NightFlow
- D51

Reason: the v26 producer branch is based on current Strong Meta before the cumulative v24 Activity runtime is assembled. The D38 mechanics are implemented as a canonical Strong Meta layer + pure Activity helpers so Chat 2 can wire them into the assembled v15/Camp engine without importing obsolete Activity runtime.

---

# 2. Strong Meta implementation

Registry version:

`strong-meta-v3 -> strong-meta-v4`

Contract version remains:

`1`

Registry cardinality is now:

- total rewards: **23**
- Specialists: **20**
- Keystones: **3**

Capacity remains:

- Keystone: 1
- Specialist: 2

Added exact IDs:

```text
specialist.activity.surveyors-atlas
specialist.activity.field-archive
specialist.activity.contact-network
```

Added authority:

`D38`

Each reward:

- class `specialist`
- lifecycle `active`
- definitionVersion `1`

---

# 3. Exact resolved effects

## Surveyor's Atlas

```text
kind = activity-surveyors-atlas
maxRegionsPerRun = 4
normalSurveyFieldTimeCost = 1
specialistSurveyFieldTimeCost = 0
```

## Field Archive

```text
kind = activity-field-archive
maxSecuredPerRegion = 1
maxSecuredPerRun = 4
eligibilityTag = activity-secure-eligible
```

## Contact Network

```text
kind = activity-contact-network
maxIntroductionsPerRegion = 1
maxIntroductionsPerRun = 4
introductionTag = activity-network-introduction
```

No new balance values were introduced.

---

# 4. Run-local persisted state

Added to:

`run.strongMetaRuntime.activityD38`

State:

```text
surveyorsAtlasUsedRegionIds: []
fieldArchiveSecured: []
contactNetworkUsedRegionIds: []
```

Stable allowed region IDs:

- `lumber.forest`
- `trade.corridor`
- `anomalous.reach`
- `restricted.sites`

Bounds:

- Atlas region uses <=4
- Archive secured records <=4
- Contact Network region uses <=4
- Archive max one record per region
- duplicate Archive result IDs rejected
- duplicate region uses rejected

Old schema6 Strong Meta runtime without `activityD38` defaults to an empty D38 state.

No ownership/use is inferred.

---

# 5. Snapshot firewall

`validateStrongMetaRuntimeAgainstSnapshot` now rejects D38 runtime state unless the matching Specialist is present in the immutable run snapshot.

Examples:

- Atlas usage without selected Atlas -> reject
- Archive secured record without selected Archive -> reject
- Contact Network usage without selected Contact Network -> reject

This keeps permanent ownership, active selection and per-run charges separate.

---

# 6. Ending lifecycle

The existing current engine already has the correct transaction path:

`completeEnding -> applyMetaRewardMutable -> grantStrongMetaReward`

No new ending transaction system was added.

Machine-readable canonical binding source:

`content/activity-d38-reward-v26.fixture.json`

Exact mapping:

- `ending.activity.pathfinder`
  -> `specialist.activity.surveyors-atlas`

- `ending.activity.preservation`
  -> `specialist.activity.field-archive`

- `ending.activity.network`
  -> `specialist.activity.contact-network`

All three bindings use:

`kind: strongMeta`

They do not use generic `unlock`.

Focused QA proves:

- eligibility grants nothing permanent;
- commit grants nothing permanent;
- `completeEnding` grants ownership exactly once;
- repeat `completeEnding` is idempotent;
- reward is absent from `meta.unlocks`;
- current run snapshot is unchanged;
- reward may be explicitly selected only in a later life.

---

# 7. Pure Activity runtime layer

Added:

`src/core/activityD38.ts`

Stable authored tags:

- `activity-survey-discovery`
- `activity-secure-eligible`
- `activity-network-introduction`

The module does not import or mutate the current Activity engine.

It receives only explicit Activity-domain inputs and the resolved Strong Meta snapshot/runtime.

This is deliberate assembly isolation.

## Atlas helpers

- `activityD38SurveyFieldTimeCost`
- `commitActivityD38SurveyUse`

Behavior:

- only explicit survey/discovery tag;
- authored normal Field Time cost must be exactly 1;
- first legal use in that region may return effective cost 0;
- commit records that region only after successful caller commit;
- second use in same region costs normal amount;
- max four regions;
- does not change Activity entry Energy;
- does not change baseline Field Time.

## Archive helpers

- `activityD38CanSecureResult`
- `commitActivityD38SecureResult`
- `activityD38CarriedResultSurvives`

Behavior:

- only explicit `activity-secure-eligible` carried result;
- one secured result per region;
- max four/run;
- no duplicate result;
- success keeps normal carried result;
- escape/failure drops an unsecured secure-eligible result;
- secured result survives;
- non-tagged result semantics remain unchanged;
- no result is created by the reward.

## Contact Network helpers

- `activityD38CanUseContactIntroduction`
- `commitActivityD38ContactIntroduction`

Behavior:

- matching explicit authored tag required;
- caller must prove region is already normally unlocked;
- caller must prove all normal authored conditions passed;
- one use per region;
- max four/run;
- no synthetic introduction if authored content is absent.

---

# 8. Why Field Archive has an explicit carried-result seam

Frozen v15 Activity writes extracted result facts immediately into world facts.

Without a carried-result durability seam, those facts already survive failure, which would make Field Archive mechanically empty.

v25 explicitly identified this as a required implementation seam.

The v26 helper layer therefore models the authorized distinction:

- secure-eligible carried result
- unsecured -> lost on escape/failure
- secured -> survives escape/failure

It does not preserve generic inventory and does not create results.

Chat 2 must wire this only to explicitly tagged Activity results during cumulative assembly.

---

# 9. Save / reload behavior

The D38 state lives inside the normal persisted:

`run.strongMetaRuntime`

Focused QA covers:

- old schema6 runtime missing D38 field -> empty default;
- selected Atlas use survives real `parseSave`;
- consumed region cannot be replayed after reload;
- invalid ghost runtime rejected;
- duplicates rejected;
- new life resets run-local D38 usage;
- permanent ownership survives;
- preferred future selection survives.

Profile merge remains current behavior:

- ownership union by set;
- current profile preference wins;
- newly imported D38 ownership is not auto-selected;
- run-local D38 usage is not part of profile Meta.

---

# 10. Camp compatibility

No Camp runtime is present on the v26 producer base, so no Camp file is changed.

The implementation is intentionally Camp-independent:

- usage state is stored in `run.strongMetaRuntime`;
- none of the D38 helpers contain a Camp reset path;
- ordinary serialization/reload preserves charges.

When Chat 2 wires v26 into v24 Camp:

- Camp Field Time refresh must not clear Atlas use;
- Camp must not auto-secure Archive results;
- Camp must not clear Archive secured records;
- Camp must not clear Contact Network region use.

The existing Camp focused suite remains mandatory in assembly.

---

# 11. Firewalls preserved

No v26 change was made to:

- Secret Debt
- D51
- Palace
- NightFlow
- ordinary career runtime
- School
- lodging
- Activity entry Energy
- Activity Field Time baseline
- global calendar

The helper API itself requires explicit normal eligibility inputs instead of manufacturing them.

Contact Network cannot unlock a region because it requires:

`regionNormallyUnlocked = true`

and:

`normalConditionsMet = true`

before use.

Atlas changes only the one authored survey cost.

Archive operates only on a caller-supplied already obtained carried result.

---

# 12. Focused executable QA authored

New suite:

`tests/activity-d38-strong-meta-v26.test.ts`

Current count:

**15 focused tests**

Coverage includes:

- canonical ending binding fixture;
- Specialist capacity exactly 2;
- all three ending reward lifecycles;
- exactly-once permanent ownership;
- no generic unlock ownership;
- no same-life activation;
- future-life explicit selection;
- old schema6 default;
- profile ownership merge;
- Atlas one-per-region / max-four behavior;
- real save/reload Atlas persistence;
- new-life run-state reset;
- Field Archive eligibility / retention / bounds;
- Contact Network normal-access/condition firewall;
- D38 ghost-state validation;
- Secret Debt / Palace / career / relationship / item / ending / Energy / region firewall inputs remain untouched.

Updated existing registry suite verifies:

- total 23;
- Specialists 20;
- Keystones 3;
- capacity 2;
- all three D38 entries;
- D38 authority;
- exact effect constants;
- metaReward schema accepts D38 canonical IDs.

---

# 13. Validation performed

No full CI was run, per task.

No GitHub workflow run auto-triggered on the v26 implementation commits.

Static focused audit passed all checked invariants:

- registry version v4: PASS
- capacity 2: PASS
- three stable IDs: PASS
- total registry count 23 guard: PASS
- Specialist count 20 guard: PASS
- D38 authority: PASS
- exact Atlas constants: PASS
- exact Archive constants: PASS
- exact Contact constants: PASS
- empty runtime defaults: PASS
- authored tags present: PASS
- all seven helper functions present: PASS
- three canonical strongMeta fixture bindings: PASS
- protected shared Activity/Secret Debt/Palace files untouched: PASS

This branch authors executable tests but does not claim an executed Node test run because no workflow was available for the branch.

---

# 14. Exact Chat 2 assembly wiring

v26 is a producer layer, not the final cumulative Activity branch.

After v24 Activity runtime/content exists, Chat 2 must:

1. carry `strongMeta.ts` D38 registry/runtime changes;
2. carry `activityD38.ts`;
3. apply the canonical fixture bindings to the three assembled D38 ending definitions;
4. add explicit Activity authoring metadata for:
   - survey/discovery;
   - secure-eligible carried result;
   - network introduction;
5. wire Atlas around effective Field Time cost:
   - preview cost before mutation;
   - consume region use only after successful option commit;
6. wire carried-result registration and failure/escape filtering;
7. expose Archive secure action only at stable checkpoint;
8. wire Contact Network authored lateral options;
9. never infer tags from labels/IDs/categories;
10. preserve Camp state independently;
11. run v26 focused tests plus v24 regional/Camp/D38 suites.

Chat 2 must not cherry-pick a historical Activity engine over current production.

---

# 15. Recommended focused assembly gate

At minimum:

```text
npm ci
npm run typecheck
npm run validate
npm run build
```

Then:

```text
node --experimental-strip-types --test
tests/activity-d38-strong-meta-v26.test.ts
tests/strong-meta-registry-v7.test.ts
tests/strong-meta-engine-integration-v7.test.ts
tests/ending-meta.test.ts
tests/activity-ending-family-v16.test.ts
tests/activity-ending-content-presentation-v17.test.ts
tests/activity.test.ts
tests/forest-frontier-production-hardening-v12.test.ts
tests/trade-corridor-production-v13.test.ts
tests/anomalous-reach-production-v14.test.ts
tests/restricted-sites-production-v15.test.ts
tests/activity-camp-persistence-v17.test.ts
tests/qa-activity-option-reload.test.ts
tests/qa-exactly-once-reload.test.ts
tests/migration.test.ts
tests/night-flow.test.ts
tests/secret-debt-full-route-v12.test.ts
tests/secret-debt-activity-energy-compat-v20.test.ts
tests/chat3-secret-debt-separation-v2.test.ts
tests/palace-d23-consumer-integration-v8.test.ts
tests/qa-one-save-state-drift-sentinel-v2.test.ts
```

Use current-main renamed replacements if necessary, but do not drop any domain.

---

# 16. Implementation commits before handoff

- `e2c149a5124a6b2ab7d9021a51e106e2b5f14f1a`
  — add D38 Activity Specialists to canonical Strong Meta

- `0274051826cabfdccd930298a7074ff3cb617be8`
  — add pure D38 Activity specialist runtime helpers

- `a9f8dcb882f8a480e594b35b557d5f032f097aec`
  — update Strong Meta registry QA

- `99b7be46755a752e8975047fa186c80e8e289bcd`
  — add focused D38 Activity specialist QA

- `6d69d8c1765199b48279791d277879acb0c4fe82`
  — add canonical D38 ending reward binding fixture

- `63ff069ef1d72336b48fdb03ddf74a5024a47967`
  — cover canonical D38 binding fixture

- `d7333164d6b421a8296fba56a54154503bede1d8`
  — assert D38 ownership stays out of generic unlocks

- `fe1c139ac2c6c131dba7951b0e4ea0830b973570`
  — cover D38 reload persistence and new-life reset

## Disposition

**READY_FOR_CHAT2_ASSEMBLY**
