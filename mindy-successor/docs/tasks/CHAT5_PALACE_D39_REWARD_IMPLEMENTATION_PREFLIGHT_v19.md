# Chat 5 — Palace D39 Reward Implementation Preflight v19

Status: **READY_FOR_PALACE_ASSEMBLY**  
Owner: Chat 5  
Scope: research / implementation packet only. No production runtime mutation on this branch. No full CI.

## 1. Authorities and observed baselines

Active task authority:

- `CURRENT_CHAT5_TASK_POINTER.md`
- D39 in `mindy-successor/docs/USER_DECISIONS_LOCKED_v1.md`
- accepted Product packet:
  `chat6/palace-nontrue-ending-rewards-v13@7673e9f47404468175567d952825cf0b0e981ed3`
- Palace cumulative assembly preflight:
  `chat3/palace-assembly-preflight-v23@b92f18e13e40f734859110f972f1bfe5541ba3fe`
- Palace mechanics/content:
  `chat6/palace-prince-narrative-producer-v18@67f948d185883d8e706dad522e5010bff8e2bd48`
- Palace final prose/media:
  `chat6/palace-final-prose-media-v19@6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`

This preflight branch was leader-created at:

`chat5/palace-d39-reward-implementation-preflight-v19@edcfc5bb28863f963a75bc01be25e909afef4edf`

Current production snapshot re-queried during this work:

`main@e1104bf49f58699d2a2375709b3129ba37c80927`

The v19 branch and current main have diverged only in task/Leader documentation. The production files inspected for this packet are unchanged between them.

No production file is changed by this Chat 5 packet.

---

## 2. D39 Product lock

D39 locks exactly three non-True Palace future-life rewards.

### Service Life -> Steady Practice

Ending:

`ending.palace.service-life`

Reward:

`palace.service-life.steady-practice`

Class:

`specialist`

Locked effect while selected in a future life:

- watch the order in which ordinary careers first reach 8 completed shifts;
- first 2 distinct ordinary careers to reach 8 become continuity careers;
- for each continuity career, the next 3 qualifying D31 seasonal `modifyStat -1` effects from that same career become 0;
- maximum 3 prevented points per bound career;
- maximum 6 prevented points per run;
- losses before binding are not restored.

It does not change:

- D26 same-career cadence;
- Hard Work 50;
- wages;
- costs;
- unlocks;
- positive seasonal effects;
- Secret Debt;
- Activity;
- Palace;
- relationships;
- item effects;
- Energy;
- money.

It consumes exactly one of the normal two Specialist slots.

### Court Power -> Formal Introduction

Ending:

`ending.palace.court-power`

Reward:

`palace.court-power.formal-introduction`

Class:

`specialist`

Locked effect while selected:

- 3 successful uses per run;
- only an explicitly authored ordinary-career professional-relationship opportunity may expose a use;
- target career must already be legally unlocked;
- at least 1 shift in that career must already be completed in the current life;
- target relationship must not already be past its normal first professional stage;
- one relationship ID may consume the reward at most once per run;
- a successful use advances exactly into that relationship's normal first professional stage;
- consume a use only if that transition succeeds.

It may not:

- unlock a career;
- count as shift / Hard Work;
- skip School, stage, item, capability or route facts;
- write downstream trust/conflict/romance facts;
- satisfy an ending by itself;
- affect Activity relationships;
- affect Secret Debt relationship state;
- affect Palace relationships/access/duties.

It consumes exactly one normal Specialist slot.

### Inner Truth -> Source Method

Ending:

`ending.palace.inner-truth`

Knowledge ID:

`palace.inner-truth.source-method`

Layer:

automatic knowledge/content.

Once earned:

- later lives inherit it automatically;
- no Keystone slot;
- no Specialist slot;
- no preference toggle;
- authored scenes that are already otherwise legally reachable may expose source/provenance/contradiction cross-check content.

It may reveal only authored information context:

- provenance;
- direct vs reported observation;
- contradiction already latent in the scene;
- uncertainty/risk context;
- comparison between already-obtained facts.

It directly changes none of:

- money;
- Energy;
- progression stats;
- Lust;
- inventory;
- career/relationship/School counters or stages;
- Activity Field Time/Endurance/success;
- Palace duties;
- ending eligibility;
- loadout capacity.

It may not make an inaccessible scene reachable, bypass capabilities, reveal the final mystery automatically, bypass the Prince confrontation, or activate cap-200.

---

## 3. Existing current Strong Meta seams that must be reused

Current production already has the correct architecture. D39 must extend it, not create a parallel Palace reward subsystem.

### Permanent Meta state

`src/core/strongMeta.ts` already defines:

- `ownership.ownedRewardIds`
- `knowledge.inheritedKnowledgeIds`
- `preferredSelection.keystoneId`
- `preferredSelection.specialistIds`

Current capacity remains:

- Keystone: 0..1
- Specialists: 0..2

### Run snapshot

At `finishCreation`, current engine calls:

`resolveStrongMetaSnapshot(meta.strongMeta)`

The snapshot already contains:

- selected Keystone;
- selected Specialists;
- `automaticKnowledgeIds`;
- fully resolved reward definitions/effects;
- Specialist capacity at run start.

This is the correct future-life activation boundary for all D39 rewards.

### Current-run immutability

A reward earned later in the same run changes permanent Meta only.

It does not mutate the already-resolved current-run Strong Meta snapshot.

Therefore the current architecture already enforces the D39 rule:

> reward earned in the Palace life does not activate inside that same life.

### Ending transaction boundary

Current `completeEnding`:

1. derives deterministic result/transaction identity;
2. checks transaction proof;
3. determines `firstCompletion`;
4. applies `ending.metaRewards` only on first completion;
5. adds completed ending;
6. adds transaction proof;
7. stores `appliedMetaRewardIds` in RunResult;
8. becomes idempotent once RunResult exists.

D39 must use this exact path.

Do not add Palace-specific completion code.

### Protected profile merge

Current `parseSave(..., currentMeta)` already:

- unions Strong Meta ownership;
- unions inherited knowledge;
- dedupes both;
- preserves the current profile's preferred selection;
- unions ending transaction proof.

D39 should rely on this seam.

---

## 4. Current implementation gap

The frozen Palace v19 definitions already contain the four correct Palace ending IDs and reward identity strings, but every Palace ending currently has:

`metaRewards: []`

Therefore, if assembled unchanged, all four Palace endings grant no permanent Meta reward.

This is wrong for:

- D39 Service Life;
- D39 Court Power;
- D39 Inner Truth;
- D24 Return Home.

Current Strong Meta already knows:

`palace.true.cap-200`

but it does not yet know:

- `palace.service-life.steady-practice`
- `palace.court-power.formal-introduction`

Current permanent knowledge storage exists, but the ending `metaRewardSchema` has no knowledge-grant kind.

Current `strongMetaRuntime` also has no run counters/state for Steady Practice or Formal Introduction.

---

## 5. Exact Strong Meta registry additions

Modify:

`src/core/strongMeta.ts`

### 5.1 New strong reward IDs

Add to the one canonical `STRONG_META_IDS` object:

```text
palaceSteadyPractice:
  palace.service-life.steady-practice

palaceFormalIntroduction:
  palace.court-power.formal-introduction
```

Both must enter:

- `ApprovedStrongRewardId`;
- `approvedStrongRewardIdSchema`;
- `strongMetaRegistry`.

Do not create a second Palace registry.

### 5.2 Exact resolved effect — Steady Practice

Add one resolved Specialist effect shape equivalent to:

```text
kind: steady-practice
bindAtCompletedShifts: 8
maxBoundCareers: 2
protectionsPerCareer: 3
```

All four values are D39-locked.

### 5.3 Exact resolved effect — Formal Introduction

Add one resolved Specialist effect shape equivalent to:

```text
kind: formal-introduction
maxUsesPerRun: 3
maxUsesPerRelationship: 1
```

Both values are D39-locked.

### 5.4 Registry rows

Required registry semantics:

```text
palace.service-life.steady-practice
class: specialist
lifecycle: active
definitionVersion: 1
authority: D39
effect: steady-practice / 8 / 2 / 3

palace.court-power.formal-introduction
class: specialist
lifecycle: active
definitionVersion: 1
authority: D39
effect: formal-introduction / 3 / 1
```

Extend `StrongRewardDefinition.authority` to include `D39`.

### 5.5 Registry version

The canonical registry membership/effects change.

Bump:

`STRONG_META_REGISTRY_VERSION`

from the current `strong-meta-v3` to the next registry version.

Do not bump Specialist capacity.

Do not rewrite existing run snapshots to the new registry version. Old snapshots are intentionally self-contained.

After adding the two rows, expected strong registry composition is:

- total strong rewards: 22;
- Keystones: 3;
- Specialists: 19;
- Specialist capacity: still 2.

---

## 6. Exact automatic-knowledge registry addition

Current code already has:

- `strongMetaKnowledgeSchema`;
- `knowledge.inheritedKnowledgeIds`;
- `automaticKnowledgeIds` in the run snapshot;
- deduplication and profile merge.

Use that layer.

In `src/core/strongMeta.ts`, define the approved D39 automatic knowledge identity:

`palace.inner-truth.source-method`

Recommended canonical ownership surface:

```text
STRONG_META_KNOWLEDGE_IDS.palaceSourceMethod
strongMetaKnowledgeRegistry[palace.inner-truth.source-method]
  lifecycle: active
  authority: D39
```

Source Method must **not** appear in:

- `strongMetaRegistry`;
- Keystone selection;
- Specialist selection;
- ordinary Hard Work packages.

Add one canonical helper for exactly-once permanent grant through existing canonicalization, e.g. semantic behavior:

```text
grantStrongMetaKnowledge(state, palace.inner-truth.source-method)
```

The helper must dedupe.

Add one run-snapshot query helper for authored content / engine conditions:

```text
hasAutomaticKnowledge(snapshot, palace.inner-truth.source-method)
```

It must read the run snapshot, not live permanent Meta, so newly earned Source Method cannot activate in the same life.

---

## 7. Strong Meta runtime state

D39 mechanical Specialists need run-local counters.

Keep that state in the existing Strong Meta runtime layer.

Do not add Palace career state for these rewards.

### 7.1 Steady Practice runtime

Minimal canonical state:

```text
steadyPracticeBoundCareerIds: []
steadyPracticeProtectionsUsedByCareer: {}
```

Semantics:

- `steadyPracticeBoundCareerIds` is ordered by actual first reach of shift 8;
- max 2;
- unique;
- only ordinary careers;
- a career is appended at most once;
- used-protection count exists only for a bound career;
- each count is 0..3.

Remaining protection is derived from the resolved run snapshot:

`protectionsPerCareer - used`

Do not persist a second redundant remaining-count authority.

### 7.2 Formal Introduction runtime

Minimal canonical state:

```text
formalIntroductionUsedRelationshipIds: []
```

Semantics:

- unique relationship IDs;
- max 3;
- remaining uses are derived from the resolved snapshot;
- one relationship ID may appear only once.

Do not persist a second independent remaining-use counter.

### 7.3 Source Method runtime

No run counter.

The presence of its ID in:

`run.strongMetaSnapshot.automaticKnowledgeIds`

is sufficient.

---

## 8. Schema-6 compatibility requirement

This is critical.

Current production already has schema-6 saves whose `strongMetaRuntime` does not contain D39 fields.

Adding required D39 runtime properties without migration/defaults would make existing valid schema-6 saves fail parsing.

Therefore the new D39 runtime fields must be backward-compatible.

Preferred implementation:

- add schema defaults for the new empty arrays/maps;
- `emptyStrongMetaRuntime()` emits those same empty values;
- parse of an existing schema-6 save fills those empty defaults deterministically.

Do **not** increment schemaVersion merely for empty D39 run counters unless the real assembly has another independent schema-version authority.

Do not infer reward activation from missing runtime fields.

---

## 9. Steady Practice exact engine seam

Modify:

`src/core/engine.ts`

Reuse the existing ordinary-career shift identity seam.

Do not apply Steady Practice to arbitrary stat loss.

### 9.1 Binding point

For an ordinary `<career>.shift` action:

1. validate and begin the existing action transaction;
2. apply the action's base effects, including increment of `completed_shifts`;
3. before applying that action's current-season effects, inspect the resulting completed-shift count;
4. if active Steady Practice exists and that career has just reached 8:
   - if already bound, do nothing;
   - if fewer than 2 careers are bound, append it;
   - otherwise do not bind it;
5. then process the current D31 seasonal effects.

This ordering means the shift that first reaches 8 establishes continuity before its seasonal package is processed.

That follows the locked boundary:

- pre-bind losses are not restored;
- after binding, the next qualifying D31 `-1` effects are protected.

### 9.2 What qualifies for protection

Only a current ordinary shift's own D31 seasonal effect qualifies when all are true:

- source action is one of the 10 ordinary career shift identities;
- source career is bound by Steady Practice;
- effect is a progression-stat `modifyStat`;
- exact delta is `-1`;
- effect came from that ordinary action's seasonal package;
- fewer than 3 qualifying effects have already been prevented for that bound career.

When protected:

- apply 0 instead of -1;
- increment that career's used-protection count exactly once.

### 9.3 What must not be routed through this seam

Never protect:

- a non-seasonal action effect;
- a School effect;
- Activity effect;
- Secret Debt effect;
- Palace duty/support effect;
- relationship effect;
- item effect;
- next-day modifier;
- Lust change;
- Energy;
- money;
- positive seasonal effects.

Do not scan generic `modifyStat -1` effects globally.

The provenance is the current ordinary action's D31 seasonal array.

---

## 10. Steady Practice save validation

Extend the current Strong Meta runtime-vs-snapshot validation.

If Steady Practice is **not** resolved in the current run:

- bound career list must be empty;
- used-protection map must be empty.

If it is resolved:

- bound list is unique;
- length <= resolved `maxBoundCareers`;
- every bound ID is one of the 10 `ordinaryHardWorkCareers`;
- used-map keys are a subset of bound careers;
- every used count is an integer 0..`protectionsPerCareer`;
- no third career is stored.

A malformed save must be rejected, not silently converted into extra protection.

---

## 11. Formal Introduction authored opt-in seam

D39 deliberately does **not** name specific ordinary relationship scenes.

Chat 2 must not invent which existing NPC scenes receive the reward.

Implement the typed seam now; authored content can opt in explicitly.

### 11.1 New condition kind

In `src/core/schema.ts`, add a dedicated authored condition equivalent to:

```text
kind: strongMetaFormalIntroductionAvailable
career: <ordinary career>
relationship: <relationship id>
transition: <normal first-professional transition id>
```

Its engine predicate is true only when:

- Formal Introduction is resolved in the current run snapshot;
- fewer than 3 relationships have used it;
- that relationship ID has not already used it;
- career is one of the 10 ordinary careers;
- that career is legally available in this run;
- current-life `completed_shifts >= 1` for that career;
- the named relationship transition is currently legal.

The authored transition itself identifies the normal first professional transition.

Do not infer a generic "first stage" from string ordering.

### 11.2 New effect kind

Add a dedicated effect equivalent to:

```text
kind: useStrongMetaFormalIntroduction
career: <ordinary career>
relationship: <relationship id>
transition: <normal first-professional transition id>
```

Engine behavior must be atomic:

1. revalidate every Formal Introduction requirement;
2. execute that exact ordinary professional relationship transition;
3. only after transition succeeds, record the relationship ID as used.

If the transition fails:

- no use is consumed;
- no relationship ID is recorded.

### 11.3 Explicit authored tag meaning

A choice containing the dedicated D39 availability condition + D39 use effect is the explicit opt-in tag required by Product.

Do not make all ordinary relationship events automatically eligible.

Do not apply it based only on a relationship-ID prefix.

### 11.4 Domain firewall

No Palace, Activity, Secret Debt or romantic-only authored event may use this D39 effect.

Static/runtime tests must reject or flag such usage.

No Palace v18/v19 file currently provides Product authority for a specific Formal Introduction target.

Therefore this v19 packet does **not** nominate or modify any relationship content pack.

That authored-content selection remains a separate content task.

---

## 12. Source Method authored opt-in seam

Add one condition kind in `src/core/schema.ts` equivalent to:

```text
kind: strongMetaKnowledge
knowledge: palace.inner-truth.source-method
present: true
```

`engine.meets()` must evaluate it against:

`run.strongMetaSnapshot.automaticKnowledgeIds`

not against permanent Meta directly.

This preserves future-life-only activation.

An authored Source Method cross-check choice should:

- retain all normal scene reachability conditions;
- add the knowledge condition;
- use normal choice text/variant text to reveal provenance/context;
- have no direct progression/resource effect.

No new Source Method state mutation effect is needed.

Normal event history may record that the player saw/chose the authored branch; that is not a progression reward.

No current Palace v18/v19 source identifies exact external scenes to receive Source Method choices.

Do not invent those scenes in Chat 2 assembly.

---

## 13. Ending transaction bindings

Modify the four Palace ending rows in:

`content/definitions.json`

Use exact `metaRewards`.

### Service Life

```json
{
  "kind": "strongMeta",
  "rewardId": "palace.service-life.steady-practice",
  "reward": "palace.service-life.steady-practice"
}
```

### Court Power

```json
{
  "kind": "strongMeta",
  "rewardId": "palace.court-power.formal-introduction",
  "reward": "palace.court-power.formal-introduction"
}
```

### Inner Truth

Add a new `metaRewardSchema` variant:

```json
{
  "kind": "knowledge",
  "rewardId": "palace.inner-truth.source-method",
  "knowledge": "palace.inner-truth.source-method"
}
```

`applyMetaRewardMutable` must route it through the canonical Strong Meta knowledge grant helper.

### Return Home

Bind the already-approved current Strong Meta reward:

```json
{
  "kind": "strongMeta",
  "rewardId": "palace.true.cap-200",
  "reward": "palace.true.cap-200"
}
```

Do not use generic `unlock` for any of these four.

Do not leave `metaRewards: []`.

---

## 14. Exactly-once lifecycle

No new transaction framework is required.

Required lifecycle for all three D39 endings:

```text
route preparation
-> Outcome Ready
-> route finalize
-> ending eligible
-> explicit commit
-> committed ending scene
-> completeEnding
-> permanent grant
```

At each earlier stage:

- no ownership;
- no knowledge grant;
- no selection mutation.

On first `completeEnding`:

- Service Life adds one strong ownership ID;
- Court Power adds one strong ownership ID;
- Inner Truth adds one inherited knowledge ID;
- RunResult records that exact reward ID in `appliedMetaRewardIds`.

Repeated completion / replay:

- no duplicate ownership;
- no duplicate knowledge;
- no duplicate transaction;
- no auto-selection.

---

## 15. Future-run activation

### Steady Practice / Formal Introduction

After first completion they are owned but inactive.

They become active only when, in a later New Start+:

- player explicitly selects them as Specialists;
- normal Specialist validation succeeds;
- creation finishes;
- the selected definitions are frozen into the new run snapshot.

They do not auto-select themselves.

### Source Method

After first completion it is permanently present in inherited knowledge.

In a later run, creation completion automatically copies it into:

`run.strongMetaSnapshot.automaticKnowledgeIds`

No toggle.

No slot.

No same-life injection after earning Inner Truth.

---

## 16. Specialist slot composition

D28 remains unchanged:

- Keystone 0..1;
- Specialist 0..2.

Valid examples:

```text
Specialists:
- Steady Practice
- Formal Introduction
```

```text
Keystone:
- Work Rhythm
Specialists:
- Steady Practice
- palace.true.cap-200
Knowledge:
- Source Method
```

Invalid:

```text
Specialists:
- Steady Practice
- Formal Introduction
- palace.true.cap-200
```

No hidden Palace slot.

No free slot because the reward came from Palace.

Ordinary Hard Work packages remain outside these limits.

---

## 17. Ownership and migration semantics

At the observed production baseline:

- none of the three non-True Palace endings is shipped on main;
- none of the three D39 reward IDs is shipped;
- no production profile can legitimately already own them through a completed production ending.

Therefore v19 implementation must **not** infer D39 ownership from old unrelated state.

Do not infer from:

- `palace.access-granted`;
- D23 10/10;
- Palace stage;
- route prep facts;
- outcome-ready facts;
- relationship state;
- arbitrary `ruleModifiers`;
- arbitrary `activeLegacyPerks`;
- title/localization text.

No D39 completed-ending backfill migration is needed for the current production lineage because the stable Palace endings have not previously shipped rewardless.

If the real Chat 2 assembly base unexpectedly already contains a released/accepted completed Palace ending ID without its reward, stop and obtain explicit Leader migration authority before adding a backfill.

Do not silently invent that migration.

---

## 18. Save/load invariants

### Existing schema-6 run

Missing D39 runtime fields default to empty.

If no D39 Specialist is active, they remain empty.

### Active Steady Practice

Save/reload preserves:

- bound career order;
- exact used-protection counts;
- no rebinding;
- no duplicate charge use.

### Active Formal Introduction

Save/reload preserves:

- exact used relationship IDs;
- no duplicate relationship use;
- no restored charge after successful use.

### Source Method

Current run snapshot preserves whether it was inherited at run start.

Loading a profile that now permanently owns Source Method must not inject it into a run whose snapshot did not start with it.

### Registry evolution

Resolved effect numbers live in the run snapshot.

Later registry changes must not rewrite:

- shift threshold;
- bound-career cap;
- protection count;
- Formal Introduction use count

for an already-running life.

---

## 19. Protected profile merge behavior

The existing merge semantics are already correct and must be retained.

On import:

- permanent D39 strong ownership is unioned/deduped;
- Source Method inherited knowledge is unioned/deduped;
- current profile preferred selection wins;
- imported rewards do not auto-select themselves;
- imported knowledge does not modify the loaded run snapshot;
- transaction proof is unioned/deduped.

Required D39 merge case:

```text
save A owns Steady Practice + Source Method
current profile owns Formal Introduction
current preferred Specialists = [Formal Introduction]

after protected merge:
ownership = Steady Practice + Formal Introduction
knowledge = Source Method
preferred Specialists = [Formal Introduction]
```

No automatic addition of Steady Practice to preference.

---

## 20. Exact production files Chat 2 must modify for D39

This is the minimal functional D39 implementation set.

### 1. `src/core/strongMeta.ts`

Required:

- two new approved Specialist IDs;
- two resolved effect schemas;
- two D39 registry rows;
- D39 authority classification;
- automatic Source Method knowledge registry/ID;
- knowledge grant/query helper;
- D39 runtime fields/defaults;
- runtime-vs-snapshot validation;
- helper functions for Steady Practice and Formal Introduction state transitions;
- registry version bump.

### 2. `src/core/schema.ts`

Required:

- `metaRewardSchema` knowledge-grant variant;
- Strong Meta knowledge condition for authored Source Method branches;
- Formal Introduction availability condition;
- Formal Introduction atomic-use effect;
- related typed unions/capability-read declaration.

Do not change Specialist capacity.

### 3. `src/core/engine.ts`

Required:

- `applyMetaRewardMutable` knowledge handler;
- `meets()` support for the new D39 conditions;
- `applyEffectsMutable` support for atomic Formal Introduction use;
- Steady Practice bind/protect integration only in ordinary seasonal shift transaction;
- post-parse D39 runtime invariant validation as needed.

Do not create Palace-specific ending completion code.

### 4. `content/definitions.json`

Required:

- bind exact Service Life metaReward;
- bind exact Court Power metaReward;
- bind exact Inner Truth knowledge metaReward;
- bind Return Home to existing `palace.true.cap-200`.

No other D39 production content file is required by Product authority at this point.

In particular, do not arbitrarily tag existing relationship/event packs for Formal Introduction or Source Method. D39 specifies the opt-in contract but not the exact scenes.

---

## 21. Test files Chat 2 should add/update

Add a focused D39 implementation suite:

`tests/palace-d39-reward-implementation-v19.test.ts`

Update the current Strong Meta registry expectations:

`tests/strong-meta-registry-v7.test.ts`

Keep and run:

- `tests/strong-meta-engine-integration-v7.test.ts`
- `tests/ending-meta.test.ts`
- Palace v15/v18/v19 tests from the cumulative assembly
- D31 seasonal regression tests
- Hard Work / Palace isolation tests
- Secret Debt separation tests
- save-state drift sentinel

Do not weaken existing tests merely to make the D39 additions fit.

---

## 22. Required Steady Practice tests

Minimum executable acceptance:

1. unowned reward cannot be selected;
2. owned reward consumes one Specialist slot;
3. first ordinary career reaches 8 -> binds;
4. second distinct career reaches 8 -> binds;
5. third distinct career reaches 8 -> does not bind;
6. same career cannot bind twice;
7. seasonal `-1` before shift 8 is not restored;
8. qualifying shift that reaches 8 may bind before its seasonal package is processed;
9. first 3 qualifying D31 `-1` effects for bound career become 0;
10. fourth qualifying D31 `-1` applies normally;
11. each of two bound careers has an independent max 3;
12. total possible protection is max 6;
13. positive seasonal effects unchanged;
14. non-D31 `modifyStat -1` unchanged;
15. School loss unchanged;
16. Activity loss unchanged;
17. Secret Debt penalty unchanged;
18. Palace effect unchanged;
19. Lust unchanged;
20. Energy/money unchanged;
21. D26 unchanged;
22. Hard Work remains 50;
23. save/reload preserves bind order and used charges;
24. malformed runtime with third bound career is rejected;
25. runtime protection state without resolved Steady Practice is rejected.

---

## 23. Required Formal Introduction tests

Use a synthetic authored ordinary professional relationship opportunity unless Product separately names production scenes.

Minimum executable acceptance:

1. unowned reward cannot be selected;
2. owned reward consumes one Specialist slot;
3. inactive/unselected reward exposes no authored option;
4. locked career -> unavailable;
5. legally unlocked career with zero completed shifts -> unavailable;
6. >=1 completed shift + legal authored transition -> available;
7. successful use advances exactly one normal first professional transition;
8. successful use records relationship ID once;
9. same relationship cannot use it twice;
10. three distinct successful relationships consume all uses;
11. fourth is unavailable;
12. invalid transition consumes no use;
13. failed revalidation consumes no use;
14. downstream trust/conflict facts not written;
15. romance stage not targeted;
16. Palace relationship not targeted;
17. Activity contact not targeted;
18. Secret Debt relationship not targeted;
19. no career unlock;
20. no shift / Hard Work increment;
21. no ending-ready fact;
22. save/reload does not restore or duplicate a use;
23. runtime used-ID state without resolved Formal Introduction is rejected.

---

## 24. Required Source Method tests

Minimum executable acceptance:

1. Inner Truth eligibility alone grants nothing;
2. route finalize grants nothing;
3. commit grants nothing permanent;
4. `completeEnding` grants Source Method once;
5. same life snapshot does not gain Source Method after completion;
6. next life automatically snapshots Source Method;
7. no Keystone slot;
8. no Specialist slot;
9. no preference entry;
10. baseline scene without knowledge sees no Source Method choice;
11. otherwise-legal authored scene with Source Method may expose information-only cross-check choice;
12. otherwise-illegal scene remains illegal;
13. cross-check changes no money;
14. no Energy;
15. no stat;
16. no Lust;
17. no inventory;
18. no career counter/stage;
19. no relationship counter/stage;
20. no School counter;
21. no Activity Field Time/Endurance/success;
22. no Palace duty/progression;
23. no ending eligibility;
24. no Prince/cap-200 bypass;
25. save/reload preserves automatic knowledge snapshot;
26. profile merge dedupes Source Method.

---

## 25. Required common ending-lifecycle tests

For all three D39 non-True endings:

- finalize does not grant reward;
- eligibility does not grant reward;
- explicit commit does not grant reward;
- completion grants exactly once;
- RunResult contains exact reward ID;
- transaction proof exists exactly once;
- repeated completion is byte/idempotent;
- same ending completed in later life does not duplicate permanent ownership;
- new reward never auto-selects;
- reward never activates in the life that earned it.

Also verify Return Home:

- binds `palace.true.cap-200` through `kind: strongMeta`;
- does not use generic unlock;
- does not auto-select cap-200.

---

## 26. Focused Chat 2 QA bundle after implementation

Run on the actual Palace assembly branch after selective composition.

Build/schema gate:

```text
npm run typecheck
npm run validate
npm run build
```

Focused D39 / Strong Meta / ending lifecycle:

```text
node --experimental-strip-types --test tests/palace-d39-reward-implementation-v19.test.ts tests/strong-meta-registry-v7.test.ts tests/strong-meta-engine-integration-v7.test.ts tests/ending-meta.test.ts
```

Palace cumulative adjacency:

```text
node --experimental-strip-types --test tests/palace-d23-consumer-integration-v8.test.ts tests/palace-rich6-runtime-v15.test.ts tests/palace-player-facing-ui-v16.test.ts tests/palace-prince-narrative-producer-v18.test.ts tests/palace-final-prose-media-v19.test.ts tests/hard-work-palace-meta-smoke.test.ts
```

Cross-system firewall:

```text
node --experimental-strip-types --test tests/strong-meta-d30-runtime-v7.test.ts tests/chat3-secret-debt-separation-v2.test.ts tests/secret-debt-full-route-v12.test.ts tests/qa-one-save-state-drift-sentinel-v2.test.ts
```

Add the current-main authoritative D31 seasonal regression test if its filename has changed by the time Palace is assembled.

Full CI remains Chat 2 assembly-owned.

This Chat 5 preflight must not run full CI.

---

## 27. Forbidden interactions

### D23 Palace entry

None of the D39 rewards may:

- grant Palace access;
- substitute for permanent ordinary 10/10;
- substitute for active package 10/10;
- create permanent `meta.unlocks['palace']`.

### D24 cap-200

Steady Practice / Formal Introduction / Source Method may not:

- activate cap-200;
- consume a free hidden Palace slot;
- multiply stats;
- alter cap-200 effect.

Cap-200 remains its own normal Specialist.

### D26 / Hard Work

Steady Practice may not:

- permit extra same-career shifts;
- reduce Hard Work below 50.

Formal Introduction may not:

- count as a shift;
- grant Hard Work progress.

### D30/D32 Secret Debt

No D39 reward may:

- alter lender chance;
- alter +2000;
- alter activation delay;
- alter 20000 debt;
- alter repayment;
- cancel forced Night;
- cancel next-day Energy -1;
- unlock ordinary careers while bound;
- operate on Secret Debt relationship state.

### Activity

No D39 reward may:

- reduce entry Energy;
- add Field Time;
- change Activity Endurance;
- secure/preserve an Activity result;
- open a region;
- count toward Activity ending eligibility.

Source Method may only add information wording in an already-legally-reached Activity scene if separately authored.

### Palace

Steady Practice does not protect Palace effects.

Formal Introduction cannot target Palace relationships.

Source Method cannot bypass Palace progression, Prince confrontation, or Return Home requirements.

### Strong Meta

- no second registry;
- no third Specialist slot;
- no auto-selection on grant;
- no current-run snapshot mutation on grant;
- no conversion of Source Method into Specialist/Keystone.

---

## 28. Implementation stop conditions

Stop Palace assembly and resolve before production freeze if any of these occurs:

- Palace endings still have `metaRewards: []`;
- Service/Court are implemented as generic unlocks;
- Source Method is put in Specialist/Keystone registry;
- Source Method appears in preferred selection;
- a D39 reward activates in the same life that earns it;
- existing schema-6 saves fail because new runtime fields are missing;
- Steady Practice protects arbitrary `modifyStat -1` outside D31 ordinary seasonal provenance;
- Steady Practice binds more than two careers;
- Steady Practice prevents more than three losses for one career;
- Formal Introduction auto-tags every relationship;
- Formal Introduction can operate before legal career unlock or before one completed shift;
- Formal Introduction consumes a use on failed transition;
- same relationship can consume twice;
- Formal Introduction reaches Palace / Activity / Secret Debt / romance targets;
- Source Method makes an inaccessible scene reachable;
- profile merge overwrites current preferred selection with imported preference;
- replay duplicates ownership/knowledge/transaction proof;
- D23, D26, D28, D30/D32 or D24 boundaries move.

---

## 29. Final implementation disposition

D39 does not require a new Meta architecture.

The existing current Strong Meta and ending transaction model already supplies:

- permanent ownership;
- automatic knowledge storage;
- 0..2 Specialist selection;
- immutable run snapshot;
- exactly-once ending transaction proof;
- profile merge dedupe.

The missing implementation is narrowly:

1. register two D39 Specialists;
2. register/grant one automatic knowledge ID;
3. add D39 run counters and exact Specialist mechanics;
4. add typed authored opt-in seams for Formal Introduction / Source Method;
5. bind all four Palace ending `metaRewards` to the canonical current lifecycle.

Minimal production file set:

- `src/core/strongMeta.ts`
- `src/core/schema.ts`
- `src/core/engine.ts`
- `content/definitions.json`

No existing ordinary relationship/content scene should be newly tagged by Chat 2 without separate authored authority.

**READY_FOR_PALACE_ASSEMBLY**
