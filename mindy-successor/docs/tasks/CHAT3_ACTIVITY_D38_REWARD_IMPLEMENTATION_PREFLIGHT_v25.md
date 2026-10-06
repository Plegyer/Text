# Chat 3 — Activity D38 Reward Implementation Preflight v25

Status: **RESEARCH COMPLETE — READY FOR ACTIVITY ASSEMBLY**  
Owner: Chat 3  
Branch: `chat3/activity-d38-reward-implementation-preflight-v25`

## Goal

Prepare the exact current-Strong-Meta implementation packet for the three accepted D38 Activity Specialists:

- `specialist.activity.surveyors-atlas`
- `specialist.activity.field-archive`
- `specialist.activity.contact-network`

This packet is implementation guidance only.

No production runtime is changed here.  
No new Product behavior is introduced.  
No full CI is run.

---

# 1. Current canonical Strong Meta baseline

Current `main` observed during this preflight:

`main@e57aa8c000165dcc05916e000638841c0f5c5b2c`

The exact future Activity assembly base will be later than this SHA. Chat 2 must re-read actual post-Palace current main before implementation.

Canonical Strong Meta currently lives in:

`src/core/strongMeta.ts`

Current constants:

- registry version: `strong-meta-v3`
- contract version: `1`
- Keystone capacity: `1`
- Specialist capacity: `2`

Current registry size:

- total rewards: `20`
- Specialists: `17`
- Keystones: `3`

Current Strong Meta ownership:

`meta.strongMeta.ownership.ownedRewardIds`

Current preference:

`meta.strongMeta.preferredSelection`

Current-life resolved selection:

`run.strongMetaSnapshot`

Current run-level Strong Meta state:

`run.strongMetaRuntime`

Selection is snapshotted when character creation completes.

That snapshot is then immutable for the current life.

This existing behavior is exactly what D38 needs for the rule:

> reward earned in this life must not activate in that same life.

---

# 2. Product authority — exact D38 mechanics

## Surveyor's Atlas

ID:

`specialist.activity.surveyors-atlas`

Class:

`specialist`

Slot cost:

1 normal Specialist slot.

Effect:

- once per D36 region per run;
- the first authored route-survey/discovery action in that region that normally costs exactly 1 Field Time may cost 0;
- maximum direct saving 4 Field Time/run;
- only the normal survey information is revealed.

Forbidden:

- no Field Time baseline increase;
- no Activity entry-Energy reduction;
- no region unlock;
- no capability bypass;
- no seasonal bypass;
- no ending bypass;
- no automatic encounter;
- no automatic anchor.

## Field Archive Protocol

ID:

`specialist.activity.field-archive`

Class:

`specialist`

Effect:

- once per region per run;
- only a legally obtained carried result explicitly tagged `activity-secure-eligible`;
- at a stable Activity checkpoint, mark one carried result Secured;
- Secured result survives later escape/failure from that Activity entry;
- maximum one per region;
- maximum four per run.

Forbidden:

- no result creation;
- no duplication;
- no challenge waiver;
- no capability waiver;
- no consumable refund;
- no cross-life inventory;
- no system-critical bypass without explicit content opt-in.

## Expedition Contact Network

ID:

`specialist.activity.contact-network`

Class:

`specialist`

Effect:

- region must already be normally unlocked;
- exactly one authored `activity-network-introduction` lateral route option per region/run;
- max four introductions/run;
- one per region.

Forbidden bypasses:

- region unlock;
- career stage;
- ordinary Hard Work;
- relationship stage;
- item capability;
- Palace;
- Secret Debt;
- ending eligibility.

---

# 3. Exact registry additions

Modify:

`src/core/strongMeta.ts`

## IDs

Add exactly:

```text
activitySurveyorsAtlas:
  specialist.activity.surveyors-atlas

activityFieldArchive:
  specialist.activity.field-archive

activityContactNetwork:
  specialist.activity.contact-network
```

They must be included in:

- `STRONG_META_IDS`;
- `ApprovedStrongRewardId`;
- `approvedStrongRewardIdSchema`;
- `strongMetaRegistry`.

## Authority

Extend `StrongRewardDefinition.authority` with:

`D38`

Do not reuse D40/D41 authority labels.

## Registry version

Recommended exact registry bump:

`strong-meta-v3 -> strong-meta-v4`

Reason:

- three new resolvable reward IDs;
- three new effect definitions.

Do not bump `STRONG_META_CONTRACT_VERSION` merely for registry growth.

Old resolved snapshots intentionally keep their historical registryVersion and resolved effects.

## Registry cardinality after D38

Expected:

- total rewards: **23**
- Specialists: **20**
- Keystones: **3**

Capacity remains:

- Keystone: **1**
- Specialist: **2**

No Activity-only capacity exists.

---

# 4. Exact resolved effect schemas

Add three specialist effect variants to `resolvedStrongRewardSchema`.

Recommended typed forms:

```text
activity-surveyors-atlas
  maxRegionsPerRun = 4
  normalSurveyFieldTimeCost = 1
  specialistSurveyFieldTimeCost = 0

activity-field-archive
  maxSecuredPerRegion = 1
  maxSecuredPerRun = 4
  eligibilityTag = activity-secure-eligible

activity-contact-network
  maxIntroductionsPerRegion = 1
  maxIntroductionsPerRun = 4
  introductionTag = activity-network-introduction
```

These fields encode already-locked D38 numbers only.

They do not add new balance values.

All three definitions:

- class = `specialist`;
- lifecycle = `active`;
- definitionVersion = `1`;
- authority = `D38`.

---

# 5. Run-local D38 state

The three reward usage limits are per run and must survive:

- ordinary save/reload;
- Activity exit/re-entry;
- Camp boundary;
- Night;
- city return.

They must not live in permanent profile ownership.

Recommended canonical location:

`run.strongMetaRuntime.activityD38`

This keeps:

- permanent ownership in `meta.strongMeta`;
- selected/resolved mechanics in `run.strongMetaSnapshot`;
- per-life usage in `run.strongMetaRuntime`.

Do not store D38 usage in:

- `meta.ruleModifiers`;
- `meta.unlocks`;
- `progression.worldFacts`;
- arbitrary legacy flags;
- global inventory.

## Exact structural state

Use the four stable D36 Activity IDs as region keys:

- `lumber.forest`
- `trade.corridor`
- `anomalous.reach`
- `restricted.sites`

Recommended state:

```text
activityD38 = {
  surveyorsAtlasUsedRegionIds: ActivityRegionId[],
  fieldArchiveSecured: {
    regionId: ActivityRegionId,
    resultId: string
  }[],
  contactNetworkUsedRegionIds: ActivityRegionId[]
}
```

Defaults:

```text
surveyorsAtlasUsedRegionIds = []
fieldArchiveSecured = []
contactNetworkUsedRegionIds = []
```

Maximums:

- Atlas regions: 4;
- Archive records: 4;
- Contact Network regions: 4.

Structural invariants:

- each region appears at most once in Atlas use state;
- each region appears at most once in Archive state;
- each region appears at most once in Contact Network state;
- duplicate result IDs in Archive state are rejected;
- only known four Activity region IDs are legal.

## Snapshot firewall

If the corresponding reward effect is absent from `run.strongMetaSnapshot.resolvedRewards`:

- its usage state must remain empty.

Extend:

`validateStrongMetaRuntimeAgainstSnapshot`

to reject ghost D38 usage state without the selected resolved reward.

This prevents:

- save editing;
- stale state leaking across reselection;
- reward use without active selection.

---

# 6. Runtime defaults / old save behavior

Add `activityD38` to:

`emptyStrongMetaRuntime()`

with exact empty state.

For pre-D38 schema6 saves:

- missing D38 runtime state must parse/migrate to the empty default;
- no ownership is inferred;
- no use is inferred;
- no region is marked used.

Do not bump the global save schema solely for an additive defaulted Strong Meta runtime field.

If implementation constraints require explicit parse migration rather than schema defaults, perform it inside the existing schema6 migration/repair path before final parse.

Do not replace the current migration chain.

---

# 7. Ending lifecycle binding

Frozen D38 v16 currently uses historical generic `unlock` reward seams.

Final production must replace those three D38 ending bindings with canonical current Strong Meta reward records.

Modify the assembled D38 definitions to use:

## Pathfinder

```text
{
  kind: strongMeta,
  rewardId: specialist.activity.surveyors-atlas,
  reward: specialist.activity.surveyors-atlas
}
```

## Preservation

```text
{
  kind: strongMeta,
  rewardId: specialist.activity.field-archive,
  reward: specialist.activity.field-archive
}
```

## Network

```text
{
  kind: strongMeta,
  rewardId: specialist.activity.contact-network,
  reward: specialist.activity.contact-network
}
```

The normal current engine already supports this path:

`endingRewards -> applyMetaRewardMutable -> grantStrongMetaReward`

No new ending transaction system is needed.

---

# 8. Exact reward grant lifecycle

Current `completeEndingMutable` already gives the correct D38 lifecycle.

Required unchanged order:

1. ending becomes eligible;
2. player explicitly commits;
3. any final ending scene resolves;
4. player/system calls normal `completeEnding`;
5. transaction ID is computed;
6. if first completion and transaction not already applied:
   - apply canonical Strong Meta reward;
7. record completed ending;
8. record transaction proof;
9. write `RunResult.appliedMetaRewardIds`;
10. set run ended.

D38 must not grant ownership at:

- regional anchor;
- ending eligibility;
- ending commit;
- final scene opening;
- reward preview.

Permanent ownership only at normal completion transaction.

---

# 9. No activation in earning life

This requires **no special D38 hack**.

At character creation:

`resolveStrongMetaSnapshot(meta.strongMeta)`

freezes:

- selected Keystone;
- selected Specialists;
- resolved reward definitions.

If a D38 ending is completed later in the same life:

- `meta.strongMeta.ownership` gains the D38 reward;
- `run.strongMetaSnapshot` remains unchanged;
- `run.strongMetaRuntime.activityD38` does not gain active ability automatically.

Therefore the newly earned reward cannot operate until a later New Start+ life where the player explicitly selects it.

Do not mutate the current run snapshot after ending completion.

---

# 10. Specialist capacity behavior

Do not modify:

`STRONG_META_SPECIALIST_CAPACITY = 2`

After all three D38 rewards are owned:

valid examples:

```text
Atlas + Field Archive
Atlas + Contact Network
Field Archive + Contact Network
one D38 reward + cap-200
one D38 reward + D40/D41 Specialist
```

Invalid:

```text
Atlas + Field Archive + Contact Network
```

The existing preferred-selection validation must reject three Specialists.

No silent pruning.

No D38 bonus slot.

No Activity-specific loadout.

---

# 11. Profile merge behavior

Current protected profile import already merges:

`strongMeta.ownership.ownedRewardIds`

by set union.

It preserves the current profile's preferred selection.

Keep that behavior.

Therefore if imported save owns Atlas and current profile owns Field Archive:

- merged ownership contains both;
- current profile's existing preferred selection remains authoritative;
- neither is auto-selected because ownership changed.

This is correct D38 behavior.

Do not merge run-local `activityD38` usage across profiles.

Run-local usage belongs only to the loaded run.

---

# 12. Migration / historical generic unlock rule

D38 endings/rewards have not shipped on production main as recognized completed current Strong Meta outcomes.

Therefore do **not** infer D38 Strong Meta ownership from:

- arbitrary `meta.unlocks`;
- arbitrary ruleModifiers;
- arbitrary world facts;
- Activity anchors;
- D38 eligibility;
- D38 commit state.

In particular, do not migrate a raw string:

`specialist.activity.*`

from generic unlock storage into canonical ownership merely because frozen v16 used an historical unlock seam.

The final Activity assembly must ship:
- D38 ending IDs;
- canonical reward binding;
- registry support;

together.

If a future released version ever has D38 completed endings but missing ownership, any backfill must be a separate explicit migration based on completed ending IDs, not generic unlock strings.

---

# 13. Surveyor's Atlas runtime seam

Atlas needs explicit authored eligibility.

Do not infer from:

- label text;
- option ID substring;
- category alone;
- route selection alone.

The Activity content contract should expose explicit typed metadata on the authored option.

Recommended implementation metadata:

`activity-survey-discovery`

The exact metadata name is implementation-owned; its semantics are exactly D38:
- this authored action is a route survey/discovery action;
- its normal Field Time cost is exactly 1.

Atlas algorithm:

1. Activity region already legally entered;
2. active snapshot includes Atlas;
3. option is explicitly survey/discovery eligible;
4. authored normal Field Time cost == 1;
5. region not in `surveyorsAtlasUsedRegionIds`;
6. effective Field Time cost = 0;
7. execute all normal option logic/effects;
8. only after successful option commit, add region to used list.

If action fails validation before commit:
- do not consume Atlas region use.

If option already has normal cost 0:
- Atlas does nothing;
- no use consumed.

If normal cost >1:
- Atlas does nothing.

Save/reload:
- used-region state persists;
- no duplicate free survey after reload;
- Camp Field Time refresh does not clear it.

---

# 14. Field Archive — required carried-result seam

This is the only D38 reward that requires a narrow Activity persistence extension beyond current v15 behavior.

Current v15 extraction facts are added immediately to `worldFacts`.

Without a carried-result model, those facts already survive escape/failure and Field Archive would provide no mechanical value.

D36/D38 require a real:

`secure or risk finds`

distinction.

Therefore Activity assembly must model explicitly tagged secure-eligible results as carried results for the current Activity entry.

## Current source safety observation

The existing extraction result facts:

- `activity.trade-corridor.result.sample-secured`;
- `activity.anomalous-reach.result.sample-secured`;
- `activity.restricted-sites.result.evidence-secured`

are only produced by Activity options in v15 definitions.

They are not used as conditions by later options inside those same Activity definitions.

This allows durability to be resolved at Activity exit without changing legal in-entry route choices.

## Required envelope state

Extend active Activity persistence with a small carried-result collection.

Recommended structure:

```text
carriedResults: {
  resultId: string,
  tags: string[]
}[]
```

Old active saves default:

`[]`

No result inferred from old history/checkpoint.

## Authored eligibility

Only explicitly authored results with tag:

`activity-secure-eligible`

may appear in the Archive secure action.

Do not infer eligibility from:
- result ID naming;
- Preservation marker;
- category;
- item presence;
- research-grade status.

## Durability rule

During the Activity entry, carried result facts may remain visible to current in-entry logic.

At finalization:

### success

- all legally carried results retain normal durable result projection.

### escape/failure

- un-Secured secure-eligible carried results are removed/discarded according to the normal risk rule;
- records found in `fieldArchiveSecured` survive.

This implements exactly the D38 difference:
Secured survives later escape/failure.

Do not preserve generic inventory.

## Explicit secure action

At a stable Activity checkpoint, if:

- Field Archive selected;
- carried eligible result exists;
- region has not already used Archive this run;
- result is not already secured;

expose one normal Activity action to secure that result.

Successful commit:

- append `{regionId,resultId}` to `fieldArchiveSecured`;
- consume no extra result;
- create no duplicate result.

The secure action itself must not waive the acquisition challenge.

---

# 15. Field Archive authoring caution

D38 does not authorize Chat 2 to declare every Activity result secure-eligible.

Only authored content that explicitly opts in gets the tag.

Current obvious extracted-result candidates from v15 are:

- Trade sample;
- Anomalous sample;
- Restricted evidence.

Do not invent a Forest secure-eligible result solely to force four-region symmetry.

The rule is:
maximum one per region where authored eligible content exists, max four/run.

The Product contract does not require every region to expose a secure-eligible result.

---

# 16. Contact Network runtime seam

The reward requires authored lateral options tagged:

`activity-network-introduction`

Do not infer these from existing Network ending markers.

Algorithm:

1. region must already satisfy its normal unlock/entry requirements;
2. active snapshot contains Contact Network;
3. region not in `contactNetworkUsedRegionIds`;
4. authored option explicitly tagged `activity-network-introduction`;
5. all non-region normal conditions of that option still pass;
6. option is exposed;
7. after successful option commit, region is recorded used.

The reward may alter:
- route;
- contact;
- information;
- risk.

It may not synthesize:
- region unlock;
- career stage;
- Hard Work;
- relationship stage;
- item capability;
- Palace state;
- Secret Debt exit;
- ending readiness.

If no authored introduction exists for a region:
- reward does nothing there;
- do not synthesize a generic introduction.

---

# 17. Activity metadata schema

The exact final Activity source will be the post-v24 assembly branch, not current research-time main.

Recommended additive authoring metadata on Activity options/results should be narrow.

A minimal typed approach:

```text
Activity option tags:
- activity-survey-discovery
- activity-network-introduction

Carried result tags:
- activity-secure-eligible
```

Do not overload world facts as eligibility tags.

Do not use display labels as machine logic.

Content validation must reject:
- unknown Activity-specialist tags;
- survey tag on an option whose authored normal Field Time cost is not exactly 1;
- network-introduction tag on an option that bypasses region entry ownership;
- secure-eligible duplicate result IDs.

---

# 18. Minimal production files Chat 2 must modify

This list assumes v24 cumulative Activity assembly is the working branch.

## Required

### `src/core/strongMeta.ts`

Add:
- three D38 IDs;
- D38 authority;
- three effect schemas;
- registry entries;
- registry version bump;
- run-local D38 runtime state;
- default state;
- snapshot/runtime validation;
- registry drift validation updates.

### `src/core/schema.ts`

Add:
- Activity specialist authoring metadata;
- carried-result Activity envelope state;
- any exact typed Activity-specialist tag enums.

Do not change global Specialist capacity.

Do not replace schema6.

### `src/core/engine.ts`

Compose:
- Atlas effective Field Time cost;
- Atlas exactly-once per-region use;
- carried-result registration;
- Archive secure action;
- escape/failure retention filtering;
- Contact Network authored option exposure/use;
- D38 runtime validation/commit ordering where engine-owned.

Do not change:
- Activity entry Energy 2;
- Field Time baseline 6;
- Camp cap;
- Secret Debt Night priority;
- D51;
- Palace.

### `src/core/content.ts`

Validate:
- explicit D38 option/result tags;
- Field Time ==1 for Atlas opt-in;
- secure-eligible metadata;
- Contact Network metadata.

### `content/definitions.json`

Change:
- three D38 `metaRewards` from generic unlock seam to canonical `strongMeta`;
- add authored D38 Specialist option/result metadata where explicitly owned by Activity content.

Preserve D38 ending conditions exactly.

## Required tests

Add a new focused implementation test, recommended:

`tests/activity-d38-strong-meta-v25.test.ts`

Update:

`tests/strong-meta-registry-v7.test.ts`

Update or extend:

`tests/strong-meta-engine-integration-v7.test.ts`

Retain:

- `tests/ending-meta.test.ts`
- `tests/activity-ending-family-v16.test.ts`
- Activity region tests;
- Camp tests;
- save/migration tests.

## Not intrinsically required

`src/ui/app.ts`

Current Activity UI renders `availableActivityActions` generically.

If the engine returns Archive/Network authored actions through that list, no D38-specific UI component is required.

Only modify app/localization if assembled generic UI cannot provide understandable action label/help.

Do not create a separate Activity Specialist loadout UI.

---

# 19. Strong Meta registry validation updates

Current registry test/validator hard-codes:

- total 20;
- Specialists 17;
- Keystones 3.

After D38:

- total 23;
- Specialists 20;
- Keystones 3.

Update drift assertions explicitly.

Also assert:

- all three D38 IDs are class `specialist`;
- authority `D38`;
- lifecycle active;
- definitionVersion 1;
- exact effect constants;
- Specialist capacity still 2.

---

# 20. Exact focused tests — lifecycle

For each D38 ending:

1. eligibility alone grants no ownership;
2. explicit commit grants no permanent ownership;
3. pending final scene grants no ownership;
4. `completeEnding` grants exact reward once;
5. `RunResult.appliedMetaRewardIds` contains exact stable ID;
6. repeated `completeEnding` is idempotent;
7. repeated ending completion in later life does not duplicate ownership;
8. reward does not enter current run snapshot;
9. future New Start+ may select owned reward;
10. unowned reward cannot be selected.

Cross-ending:

11. all three may be permanently owned across lives;
12. only two may be active simultaneously;
13. third selected Specialist is rejected;
14. no silent selection pruning;
15. no Activity-only slot.

---

# 21. Exact focused tests — Atlas

1. selected Atlas + eligible 1-FT survey -> costs 0;
2. region is recorded used exactly once;
3. second eligible survey same region costs normal 1;
4. eligible survey in second region can cost 0;
5. max four region uses/run;
6. non-tagged 1-FT option costs 1;
7. tagged 0-FT option rejected by content validation or does not consume;
8. tagged >1-FT option rejected by content validation;
9. no region unlock;
10. no capability bypass;
11. no season bypass;
12. no automatic route/anchor completion;
13. entry Energy remains 2;
14. Field Time refresh remains 6;
15. save/reload preserves used region;
16. Camp refresh does not reset region use.

---

# 22. Exact focused tests — Field Archive

1. unselected Archive exposes no secure action;
2. selected Archive + legally acquired tagged result exposes secure action;
3. non-tagged result cannot be secured;
4. successful secure writes one region/result record;
5. second result in same region cannot be secured;
6. max four secured records/run;
7. same result cannot duplicate;
8. successful Activity retains normal carried result without requiring Archive;
9. escape/failure discards un-Secured risk result;
10. secured result survives escape;
11. secured result survives failure;
12. Archive creates no result by itself;
13. acquisition capability still required;
14. acquisition challenge still required;
15. spent consumable not refunded;
16. generic inventory not preserved;
17. save before secure -> no phantom record;
18. reload after secure -> exactly one record;
19. reload at escape/failure boundary -> no duplicate retention;
20. Camp boundary preserves secured state;
21. Camp does not auto-secure;
22. system-critical content without explicit tag remains unsecurable.

---

# 23. Exact focused tests — Contact Network

1. unselected reward exposes no introduction;
2. selected reward + locked region still cannot enter/unlock region;
3. normally unlocked region may expose authored tagged introduction;
4. normal authored non-region conditions still apply;
5. first successful introduction records region used;
6. second introduction same region unavailable;
7. up to four distinct region uses/run;
8. no career-stage bypass;
9. no Hard Work bypass;
10. no relationship-stage bypass;
11. no item-capability bypass;
12. no Palace bypass;
13. no Secret Debt repayment/exit bypass;
14. no ending eligibility bypass;
15. save/reload preserves used region;
16. Camp does not reset use;
17. missing authored introduction -> no synthetic generic option.

---

# 24. Exact save / reload tests

## Old schema6

A pre-D38 schema6 save must acquire:

```text
activityD38:
  atlas used = []
  archive secured = []
  contact used = []
```

without changing:
- ownership;
- preferences;
- snapshot;
- other Strong Meta runtime;
- Activity;
- Secret Debt;
- Palace;
- NightFlow.

## Active current life

Reload preserves:

- resolved D38 reward effect snapshot;
- Atlas region use;
- Archive secured result records;
- Contact Network region use.

## Invalid state

Reject:

- Atlas use when Atlas is not selected;
- Archive record when Archive is not selected;
- Contact use when Contact Network is not selected;
- duplicate region use;
- >4 records;
- unknown region IDs;
- duplicate archive result IDs.

---

# 25. Profile merge tests

Protected Meta import:

- ownership sets union;
- D38 ownership preserved;
- current profile preference preserved;
- newly merged D38 reward not auto-selected;
- run-local D38 usage not profile-merged.

Example:

current profile:
- owns Field Archive;
- selects Field Archive.

imported profile:
- owns Atlas.

result:
- owns Atlas + Field Archive;
- preference remains current Field Archive selection;
- no Atlas auto-selection.

---

# 26. Camp firewall

Camp state and D38 usage are independent.

Atlas:
- Camp refresh resets Field Time to the normal authored field-day budget;
- it does not refund/restore an already-used Atlas regional use.

Archive:
- secured record survives Camp boundary;
- Camp itself does not secure results;
- no duplicate result from calendar advance/reload.

Contact Network:
- used region survives Camp;
- Camp does not restore introduction use.

Secret Debt forced Night remains higher priority than Camp.

No D38 reward may alter that handoff.

---

# 27. Secret Debt firewall

All D38 rewards must leave unchanged:

- lender chance;
- +2000 grant;
- trap timing;
- debt principal;
- ordinary-career lock while bound;
- forced Night;
- next-day Energy -1;
- repayment;
- Takeover;
- D51 Street compatibility.

Atlas cannot reduce Activity entry Energy.

Archive cannot preserve debt items/state.

Contact Network cannot:
- create debt exit;
- replace forced Night;
- open a locked ordinary career while bound.

---

# 28. Palace firewall

D38 rewards do not:

- grant D23 qualification;
- grant Palace invitation;
- grant `palace.access-granted`;
- count as active 10/10;
- count as Palace duty;
- lower Prince 12x91;
- write `palace.prince-defeated`;
- auto-commit Return Home.

Contact Network must not expose a Palace introduction.

Archive must not secure Palace-critical evidence unless Palace content explicitly opts in; D38 currently provides no such opt-in.

Atlas has no Palace route effect.

---

# 29. Ordinary-career firewall

D38 rewards:

- do not count as Hard Work;
- do not change career unlocks;
- do not grant shifts;
- do not modify ordinary wages;
- do not consume or create D39 reward charges;
- do not modify ordinary seasonal stat effects.

Contact Network is Activity-domain only.

It must not reuse Court Power Formal Introduction eligibility.

Those systems may coexist, but their authored tags/domains remain distinct.

---

# 30. Ending / one-life firewall

All three D38 ending IDs remain separate normal endings.

A life may commit at most one normal ending.

Completing Pathfinder must not:
- commit Preservation;
- commit Network;
- grant their rewards.

Across later lives all three ownership IDs may accumulate.

No D38 Specialist changes D38 ending eligibility itself.

---

# 31. Current UI / presentation note

D38 v17 already owns:
- final reward names/descriptions;
- final RU/EN ending copy;
- ending presentation slots.

v25 requires no new reward lore.

The current New Start+ runtime selection commands already support arbitrary approved Specialist IDs through canonical Strong Meta validation.

Do not add Activity-specific selection rules.

If final UI later enumerates registry rewards, D38 entries should appear through the same canonical Specialist surface as cap-200 and D40/D41 Specialists.

---

# 32. Recommended implementation order for Chat 2

After v24 Activity cumulative mechanics/content are present on the actual assembly branch:

1. re-read final current `strongMeta.ts`;
2. add D38 IDs/effect schemas/registry entries;
3. bump registry version only;
4. add defaulted `activityD38` run state;
5. extend runtime-vs-snapshot validation;
6. add Activity authoring metadata schemas;
7. add carried-result envelope state;
8. add content validation;
9. tag only explicitly authored Atlas/Archive/Contact opt-in content;
10. implement Atlas Field Time interception;
11. implement carried-result failure/escape retention;
12. implement Archive secure action;
13. implement Contact Network lateral option use;
14. replace D38 generic unlock metaRewards with canonical strongMeta bindings;
15. update registry drift tests;
16. add D38 runtime tests;
17. run typecheck;
18. run validate;
19. run build;
20. run focused Activity + Strong Meta + ending + Camp + Secret Debt + Palace suites;
21. only then proceed to full-CI assembly gate.

---

# 33. Exact focused Chat 2 gate

At minimum run:

```text
npm ci
npm run typecheck
npm run validate
npm run build
```

Then:

```text
node --experimental-strip-types --test
tests/activity-d38-strong-meta-v25.test.ts
tests/activity-ending-family-v16.test.ts
tests/activity-ending-content-presentation-v17.test.ts
tests/strong-meta-registry-v7.test.ts
tests/strong-meta-engine-integration-v7.test.ts
tests/ending-meta.test.ts
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

Use current-main replacements if an earlier assembly tranche has renamed a test, but do not drop the domain.

---

# 34. Files that should not need modification for D38 reward runtime

Unless final assembly reveals a concrete integration conflict, D38 reward implementation should not require direct changes to:

- Secret Debt content/runtime;
- Palace runtime;
- NightFlow content;
- D51 compatibility logic;
- lodging definitions;
- ordinary career actions;
- School runtime;
- presentation registry beyond already-owned v17 ending presentation;
- global calendar rules.

If implementation starts modifying those systems to make a D38 reward work, stop and re-check the Product firewall.

---

# 35. Preflight verdict

The three D38 rewards map cleanly onto current Strong Meta ownership/snapshot semantics.

The correct ownership path is already present:

`completeEnding -> strongMeta ownership -> future-life explicit Specialist selection -> immutable current-run snapshot`

No new permanent reward system is required.

The exact implementation work is:

1. add three D38 entries to canonical Strong Meta;
2. preserve Specialist capacity 2;
3. add bounded run-local per-region usage state;
4. add explicit authored Activity metadata;
5. add the minimal carried-result persistence seam required to make Field Archive meaningful;
6. replace historical generic unlock bindings with canonical `strongMeta` ending rewards;
7. preserve current profile merge and exactly-once ending transaction semantics.

Key risks to reject:

- generic unlock-only final reward;
- automatic activation in earning life;
- third Activity Specialist slot;
- inference from labels/IDs instead of authored tags;
- Atlas changing baseline Field Time or entry Energy;
- Archive preserving arbitrary inventory;
- Archive being mechanically inert because all extracted facts already survive failure;
- Contact Network creating generic region/career/relationship bypasses;
- D38 state stored permanently in profile;
- Camp resetting per-region uses;
- save import auto-selecting newly merged ownership;
- Palace or Secret Debt coupling.

## Disposition

**READY_FOR_ACTIVITY_ASSEMBLY**
