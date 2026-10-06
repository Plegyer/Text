# Chat 5 — D38 / D39 Strong Meta Collision Audit v27

Status: **AUDIT COMPLETE — COMBINED MODEL IS SAFE WITH EXPLICIT REGISTRY COMPOSITION**  
Owner: Chat 5  
Branch: `chat5/cross-system-independent-review-bundle-v25`

Scope: independent research/audit only. No production runtime changes. No full CI.

## Frozen sources compared

Activity D38 producer:

`chat3/activity-d38-reward-producer-v26@7770b6bf7f930e8af17331e8b22613523bb2e768`

Palace D39 producer:

`chat5/palace-d39-reward-producer-v20@b5ab23a88ee0e18c6250251de15818ff799ff3f6`

Frozen executable D39 implementation:

`b28b19628c0374c405cd32afedb0f16c105e2403`

Independent exact-head QA already green:

- D38 v22: 79/79 focused PASS;
- D39 v24: 59/59 focused PASS.

Leader integration order is Palace before Activity.

Therefore the expected future composition is:

`current Strong Meta -> D39 -> D38`

not two independent replacements of the same v3 file.

---

# 1. Core collision

Both frozen producers were independently authored from the same pre-combination registry:

`strong-meta-v3`

Each producer then locally sets:

`STRONG_META_REGISTRY_VERSION = 'strong-meta-v4'`

but they represent different registries.

D38 v26 expects:

- 23 total rewards;
- 20 Specialists;
- 3 Keystones.

D39 v20 expects:

- 22 total rewards;
- 19 Specialists;
- 3 Keystones.

Those two `v4` values are not the same registry state.

Therefore neither producer's complete `strongMeta.ts` may replace the other after both tranches exist.

This is a source/version collision, not a Product-mechanics conflict.

---

# 2. Exact ID union

Independent extraction of `STRONG_META_IDS` from both frozen source files gives:

- D38 registry IDs: 23;
- D39 registry IDs: 22;
- exact intersection: 20;
- D38-only IDs: 3;
- D39-only IDs: 2;
- combined union: **25 unique reward IDs**.

The 20 shared IDs are the pre-D38/pre-D39 canonical registry, including:

- `palace.true.cap-200`;
- three Secret Debt rewards;
- D40/D41 career Specialists.

## D38-only

- `specialist.activity.surveyors-atlas`
- `specialist.activity.field-archive`
- `specialist.activity.contact-network`

## D39-only

- `palace.service-life.steady-practice`
- `palace.court-power.formal-introduction`

No D38/D39 reward ID collision exists.

---

# 3. Required combined cardinality

Base before D38/D39:

- total rewards: 20;
- Specialists: 17;
- Keystones: 3.

D39 adds two Specialists.

D38 adds three Specialists.

Combined registry must therefore be:

- **25 total rewards**
- **22 Specialists**
- **3 Keystones**

Global capacities remain:

- Keystone capacity = **1**
- Specialist capacity = **2**

The fact that permanent ownership may contain many Specialist IDs does not change selection capacity.

At most two Specialists may appear in one resolved run snapshot.

---

# 4. Registry version composition

Because Palace is queued before Activity:

1. D39 assembly may legitimately move the pre-Palace registry from v3 to v4.
2. Activity then changes that already-v4 registry again.

If no other Strong Meta registry change intervenes, the natural combined version is:

`strong-meta-v5`

Chat 2 must not leave the combined registry labeled with either producer's standalone v4 while changing its contents to the 25-ID union.

If the actual current base has already advanced beyond v4 for another accepted reason:

- do not hard-code v5;
- increment/reconcile from the actual current registry version;
- preserve the combined 25-ID semantics described here.

## Active-run compatibility

A registry-version advance does not require rewriting an already-resolved current run snapshot.

The snapshot schema stores:

`registryVersion: string`

rather than a literal equal to the current constant.

The snapshot also freezes:

- selected IDs;
- resolved reward definitions/effects;
- Specialist capacity at start;
- automatic knowledge IDs.

Therefore a valid older v4 active snapshot can remain v4 while new lives resolve against the later combined registry.

Do not rewrite old snapshot `registryVersion` merely to match current source.

---

# 5. Combined Specialist schema/effect union

The merged Specialist resolved-effect union must contain all existing effects plus both new families.

## D38 effects

- `activity-surveyors-atlas`
- `activity-field-archive`
- `activity-contact-network`

## D39 effects

- `steady-practice`
- `formal-introduction`

None of these effect discriminators collide.

The merged `approvedStrongRewardIdSchema` must include all five new reward IDs.

Do not use one producer's enum list verbatim after the other tranche has landed.

---

# 6. Source Method remains automatic knowledge

D39 also introduces:

`palace.inner-truth.source-method`

through the separate:

`STRONG_META_KNOWLEDGE_IDS`

and:

`strongMetaKnowledgeRegistry`

This ID is not present in `STRONG_META_IDS`.

It must remain absent from:

- reward registry;
- Keystone IDs;
- Specialist IDs;
- preferred Keystone;
- preferred Specialists;
- resolved reward list.

It belongs in:

- permanent `strongMeta.knowledge.inheritedKnowledgeIds`;
- future run `strongMetaSnapshot.automaticKnowledgeIds`.

D38 introduces no competing knowledge registry.

Therefore the correct merge is simply to preserve D39's knowledge registry while adding D38 rewards.

## No slot loophole

Source Method is slot-free because it is knowledge, not because it is a special free Specialist.

No other D38/D39 reward becomes slot-free.

---

# 7. Cap-200 remains a normal Specialist

`palace.true.cap-200`

is one of the 20 shared pre-existing IDs.

Both producer files already classify it:

- class: `specialist`;
- authority: D24;
- effect: progression-stat cap 200.

It must exist exactly once in the combined registry.

It consumes one of the same two global Specialist slots.

Examples:

Valid:

- cap-200 + Atlas;
- cap-200 + Steady Practice;
- Field Archive + Formal Introduction.

Invalid:

- cap-200 + Atlas + Steady Practice;
- Atlas + Archive + Contact Network;
- both D39 Specialists + any third Specialist.

No Palace or Activity bonus slot is authorized.

---

# 8. Combined runtime schema

The two producer runtime additions are orthogonal and must coexist in the same persisted:

`run.strongMetaRuntime`

## D38 runtime

`activityD38`

containing:

- `surveyorsAtlasUsedRegionIds`
- `fieldArchiveSecured`
- `contactNetworkUsedRegionIds`

with empty defaults.

## D39 runtime

Top-level D39 state:

- `steadyPracticeBoundCareerIds`
- `steadyPracticeProtectionsUsedByCareer`
- `formalIntroductionUsedRelationshipIds`

with empty defaults.

The merged `emptyStrongMetaRuntime()` must initialize both families.

Old schema6 saves missing either family must parse to empty state.

No ownership or activation may be inferred from missing runtime fields.

---

# 9. Combined runtime-vs-snapshot validation

The merged:

`validateStrongMetaRuntimeAgainstSnapshot`

must execute both producer validation sections.

## D38 ghost-state checks

Reject:

- Atlas use without Atlas resolved in the immutable snapshot;
- Archive secured state without Field Archive resolved;
- Contact Network uses without Contact Network resolved;
- duplicate/unknown/over-cap D38 region/result state.

## D39 ghost-state checks

Reject:

- Steady Practice state without Steady Practice resolved;
- duplicate/over-cap bound careers;
- protection counters for unbound careers;
- over-cap protection use;
- Formal Introduction state without Formal Introduction resolved;
- duplicate/over-cap relationship use.

Do not choose one validator block over the other.

A run selecting one D38 Specialist and one D39 Specialist must be able to persist both runtime families simultaneously.

---

# 10. Current-run snapshot immutability

Both producer contracts agree on the same lifecycle:

permanent ownership is not the active loadout.

The current run snapshot is resolved at creation finish and is immutable for that life.

Therefore:

- earning Atlas during Pathfinder completion does not activate Atlas in that life;
- earning Steady Practice during Service Life completion does not activate it in that life;
- earning Source Method during Inner Truth completion does not inject it into that run's `automaticKnowledgeIds`.

A later New Start+ resolves from current permanent Meta.

## Cross-family example

A life begins with:

- Field Archive;
- Formal Introduction.

Its snapshot stays exactly that selection even if the same life completes an ending that earns:

- Atlas;
- Steady Practice;
- Source Method.

Permanent Meta may grow.

Active snapshot must not.

---

# 11. Preference and profile-merge safety

Existing protected profile-merge semantics are compatible with both families.

Required behavior:

- owned reward IDs union/dedupe;
- inherited knowledge IDs union/dedupe;
- current profile preferred selection wins;
- imported preference does not overwrite current preference;
- newly imported D38/D39 ownership is not auto-selected;
- run-local runtime state is not merged as permanent Meta.

## Capacity after merge

It is legal for permanent ownership to contain:

- all three D38 rewards;
- both D39 rewards;
- cap-200;
- many D40/D41 rewards.

Preferred selection still contains at most two Specialists.

Importing ownership must not silently truncate ownership to two.

Only active preference/snapshot is capacity-limited.

---

# 12. Exactly-once ending rewards

D38 Activity ending rewards use:

`kind:'strongMeta'`

D39 Service/Court rewards use:

`kind:'strongMeta'`

D39 Inner Truth uses:

`kind:'knowledge'`

Return Home uses the pre-existing cap-200 Strong Meta reward.

All must share the normal ending transaction boundary:

`commitEnding -> completeEnding -> apply MetaReward exactly once`

The merged engine must preserve D39's `knowledge` MetaReward branch.

D38 does not need a separate transaction path.

## RunResult proof

For each first completion:

`appliedMetaRewardIds`

records the exact stable reward/knowledge ID.

Repeat completion/reload must not duplicate:

- ownership;
- inherited knowledge;
- transaction proof.

## No generic unlock fallback

None of the combined D38/D39 rewards should use generic unlock ownership.

---

# 13. D38 / D39 domain collision firewall

The mechanics coexist cleanly because their operational domains are distinct.

## Atlas vs Steady Practice

Atlas:

- Activity-domain option Field Time;
- only explicitly tagged survey/discovery options.

Steady Practice:

- ordinary-career shift count;
- D31 seasonal progression-stat -1 protection.

Atlas must not consume or alter Steady Practice state.

Steady Practice must not operate on Activity Field Time/options.

## Field Archive vs D39

Field Archive:

- explicitly tagged Activity carried results;
- Activity escape/failure durability.

It must not secure Palace evidence merely because Source Method exists.

Source Method is informational knowledge only.

## Contact Network vs Formal Introduction

Contact Network:

- reuses explicitly tagged Activity contact options;
- only for an already-entered Activity region;
- preserves original non-route gates;
- consumes per-region Activity usage.

Formal Introduction:

- ordinary-career professional relationship transition;
- requires legal ordinary career + completed shift;
- consumes one of three relationship uses;
- rejects Palace/Activity/Secret Debt relationship domains.

These are not interchangeable relationship bypass systems.

No authored tag/condition should route an Activity contact through Formal Introduction.

No ordinary-career relationship should route through Contact Network.

---

# 14. Combined registry validator

The standalone hard-coded producer cardinality checks are mutually obsolete after combination.

D38 standalone guard:

- total 23;
- Specialists 20.

D39 standalone guard:

- total 22;
- Specialists 19.

Combined guard must instead assert:

- total reward IDs = **25**;
- Specialists = **22**;
- Keystones = **3**;
- Specialist capacity = **2**;
- D38 authority rows = exactly 3;
- D39 authority rows = exactly 2;
- D24 cap-200 exists once and is Specialist;
- no duplicate registry IDs.

The combined registry test must also assert Source Method is absent from reward registry.

---

# 15. Required combined executable tests

When Palace D39 and Activity D38 are both assembled, add a focused collision bundle.

At minimum prove:

## Registry

1. union total = 25;
2. Specialists = 22;
3. Keystones = 3;
4. capacity = 2;
5. no duplicate IDs;
6. exactly three D38 rows;
7. exactly two D39 rows;
8. cap-200 remains one normal Specialist;
9. Source Method absent from reward registry;
10. Source Method present in automatic knowledge registry.

## Selection

11. Atlas + Steady Practice can be selected together;
12. Field Archive + Formal Introduction can be selected together;
13. adding any third Specialist is rejected;
14. cap-200 consumes one of the two slots;
15. Source Method cannot be selected as Specialist/Keystone.

## Snapshot

16. mixed D38+D39 selection resolves two effects into one snapshot;
17. old v4 active snapshot loads after combined registry update;
18. old snapshot keeps its original registryVersion/effects;
19. earning a new D38/D39 reward does not mutate current snapshot;
20. Source Method earned mid-life does not appear in current automaticKnowledgeIds.

## Runtime

21. mixed Atlas + Formal Introduction runtime survives save/reload;
22. mixed Archive + Steady Practice runtime survives save/reload;
23. D38 ghost state rejected;
24. D39 ghost state rejected;
25. new life clears both run-local runtime families.

## Profile merge

26. D38+D39 ownership unions;
27. Source Method knowledge unions;
28. current preference wins;
29. imported ownership does not auto-select;
30. no run-local usage copied into permanent Meta.

## Ending transaction

31. D38 strongMeta reward exactly once;
32. D39 strongMeta reward exactly once;
33. D39 knowledge reward exactly once;
34. RunResult IDs exact;
35. repeat completion idempotent.

---

# 16. Merge order for Chat 2

Given the accepted queue:

## After Palace assembly

Expected state:

- D39 runtime/schema/knowledge present;
- D39 reward registry entries present;
- registry likely v4;
- total 22;
- Specialists 19;
- Keystones 3.

## During Activity assembly

Do not copy v26 `strongMeta.ts` wholesale.

Selectively add:

- three D38 IDs;
- three D38 effect schemas;
- three D38 registry rows;
- D38 authority;
- `activityD38` runtime schema/defaults;
- D38 runtime-vs-snapshot validation.

Preserve:

- D39 IDs/effects;
- D39 knowledge registry;
- D39 runtime fields;
- D39 validation;
- cap-200;
- all existing D40/D41/Secret Debt entries;
- capacity 2.

Then update combined cardinality/version guards.

---

# 17. Schema/engine composition notes

## `src/core/strongMeta.ts`

Highest collision file.

Must be semantic union, not source replacement.

## `src/core/schema.ts`

D39 adds:

- Strong Meta knowledge condition;
- Formal Introduction condition/effect;
- `kind:'knowledge'` MetaReward.

Activity assembly must preserve all of those while adding any Activity authoring/carried-result schema.

## `src/core/content.ts`

Preserve D39 Formal Introduction validation and add D38 authored-tag validation.

Neither validator family replaces the other.

## `src/core/engine.ts`

Preserve D39:

- Source Method condition;
- Formal Introduction availability/effect;
- knowledge reward application;
- Steady Practice shift/season seam.

Add Activity D38 wiring around Activity runtime only.

D38 does not require replacing the D39 ending transaction path.

---

# 18. Registry version / migration stop conditions

Stop and reconcile if:

- both D38 and D39 are present but registry still claims a standalone producer version without an intentional combined version decision;
- current registry contents do not equal the five-addition union;
- combined count is not 25 / 22 / 3;
- capacity differs from 2;
- Source Method appears in Specialist/Keystone registry;
- cap-200 becomes slot-free;
- an old active snapshot is rewritten to current registry version;
- adding defaults fabricates runtime use;
- either producer's ghost-state validator disappears.

---

# 19. Slot-loophole stop conditions

Reject any implementation where:

- D38 gets an Activity-only Specialist slot;
- D39 gets a Palace-only Specialist slot;
- Source Method is represented as a "free Specialist";
- cap-200 does not count against capacity;
- three Specialists silently resolve because they belong to different domains;
- imported ownership silently becomes active selection.

There is one global Specialist capacity:

**2**

across all domains.

---

# 20. Ending-reward stop conditions

Reject if:

- any D38/D39 ending still uses generic unlock as final ownership;
- reward is granted at eligibility/finalize/commit instead of completion;
- current run snapshot changes after reward grant;
- repeat completion duplicates ownership/knowledge;
- RunResult lacks exact applied reward ID;
- Source Method is selectable;
- Return Home cap-200 becomes automatic knowledge.

---

# 21. Audit verdict

There is no Product-level collision between D38 and D39.

The mechanics are compatible.

The real collision is implementation-source lineage:

- both producers forked the same v3 registry;
- both independently called their fork v4;
- both hard-code standalone cardinality assertions;
- each producer's complete `strongMeta.ts` omits the other producer's additions.

The safe future state is a semantic union:

- 25 reward IDs;
- 22 Specialists;
- 3 Keystones;
- capacity 2;
- 3 D38 Specialist rows;
- 2 D39 Specialist rows;
- Source Method separate automatic knowledge;
- cap-200 normal Specialist;
- both runtime families persisted/defaulted/validated;
- immutable run snapshots;
- protected ownership/knowledge merge;
- exactly-once ending transaction.

On the planned Palace -> Activity order, and absent another intervening registry revision, use the next combined registry version rather than reusing standalone v4.

## Disposition

**READY_FOR_COMBINED_ASSEMBLY — SEMANTIC UNION REQUIRED**
