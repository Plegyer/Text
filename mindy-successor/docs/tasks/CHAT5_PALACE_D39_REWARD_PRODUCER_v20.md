# Chat 5 — Palace D39 Reward Producer v20

Status: **READY_FOR_CHAT2_ASSEMBLY**  
Owner: Chat 5  
Branch: `chat5/palace-d39-reward-producer-v20`

## Frozen implementation

Executable verified head:

`b28b19628c0374c405cd32afedb0f16c105e2403`

Leader task branch base:

`09a97e0deef5bbccdbcdfbc4fc955f59b369345c`

Authority:

- D39 in `mindy-successor/docs/USER_DECISIONS_LOCKED_v1.md`
- accepted Product packet:
  `chat6/palace-nontrue-ending-rewards-v13@7673e9f47404468175567d952825cf0b0e981ed3`
- Chat 5 implementation preflight:
  `CHAT5_PALACE_D39_REWARD_IMPLEMENTATION_PREFLIGHT_v19.md`

No full CI was run. Chat 2 remains the full-CI/current-main assembly owner.

## Production implementation delta

v20 changes only these production files:

1. `src/core/strongMeta.ts`
2. `src/core/schema.ts`
3. `src/core/engine.ts`
4. `src/core/content.ts`
5. `src/ui/app.ts`

Focused tests:

6. `tests/palace-d39-reward-producer-v20.test.ts`
7. `tests/strong-meta-registry-v7.test.ts`

No Palace route/content pack was imported into this producer.

The current producer baseline contains no `ending.palace.*` definitions. Therefore v20 implements the canonical D39 runtime/schema/transaction seams, while Chat 2 must bind the exact Palace `metaRewards` when it selectively assembles the already-frozen Palace v19 definitions.

## Implemented Strong Meta registry

`STRONG_META_REGISTRY_VERSION` is now:

`strong-meta-v4`

Added approved Specialist IDs:

- `palace.service-life.steady-practice`
- `palace.court-power.formal-introduction`

Both:

- class `specialist`;
- lifecycle `active`;
- authority `D39`;
- normal D28 Specialist capacity only.

Registry composition after v20:

- total strong rewards: **22**
- Keystones: **3**
- Specialists: **19**
- Specialist capacity: **2**

There is no extra/free Palace Specialist slot.

## Steady Practice

Reward:

`palace.service-life.steady-practice`

Resolved effect snapshot:

- bind at exactly **8 completed ordinary-career shifts**;
- first **2 distinct ordinary careers** bind;
- each bound career receives exactly **3** protections;
- only that career's own D31 ordinary seasonal `modifyStat -1` effects qualify;
- protected delta becomes `0`;
- maximum protection remains **6 points/run**.

Runtime state:

- ordered `steadyPracticeBoundCareerIds`;
- `steadyPracticeProtectionsUsedByCareer`.

The engine binds after the shift's base `completed_shifts` increment and before that shift's seasonal package. Therefore the shift that first reaches 8 may use the first protection.

The protection seam is deliberately not generic. Non-seasonal `modifyStat -1` remains a real loss and does not consume a protection.

No effect on:

- D26 cadence;
- Hard Work 50;
- wages;
- costs;
- positive seasonal effects;
- Secret Debt;
- Activity;
- Palace;
- relationships;
- items;
- Energy;
- money;
- Lust.

## Formal Introduction

Reward:

`palace.court-power.formal-introduction`

Resolved effect snapshot:

- **3 uses/run**;
- **1 use/relationship ID**.

Added typed authored condition:

`strongMetaFormalIntroductionAvailable`

Added atomic typed effect:

`useStrongMetaFormalIntroduction`

The availability seam requires:

- reward resolved in current run snapshot;
- ordinary career identity;
- career legally available through current action availability;
- at least **1 current-life completed shift** in that career;
- named relationship transition currently legal;
- relationship not previously used;
- fewer than 3 uses consumed.

The atomic effect:

1. revalidates availability;
2. performs the exact authored relationship transition;
3. only after successful transition records the relationship ID as consumed.

Failed/invalid transitions consume nothing.

The implementation explicitly rejects relationship IDs in these domains:

- `palace.*`
- `activity.*`
- `secret-debt.*`

No existing production relationship pack was tagged by this producer because D39 does not provide Product authority for which concrete ordinary NPC scenes should opt in.

Chat 2/content work may only opt in a scene explicitly; the runtime does not auto-enable every relationship.

## Source Method

Knowledge:

`palace.inner-truth.source-method`

This ID is registered in the automatic Strong Meta knowledge layer, not the strong reward registry.

Implemented:

- approved automatic knowledge ID/registry;
- exactly-once permanent knowledge grant helper;
- run-snapshot knowledge query;
- typed condition:
  `strongMetaKnowledge`.

Source Method never appears in:

- Keystone registry;
- Specialist registry;
- preferred Keystone;
- preferred Specialists;
- Hard Work packages.

The condition reads:

`run.strongMetaSnapshot.automaticKnowledgeIds`

not live permanent Meta.

Therefore completing Inner Truth during a life cannot activate Source Method in that same life. It becomes automatic only after a later New Start+ resolves a fresh run snapshot.

No direct resource/progression mutation effect was added for Source Method.

## Existing ending transaction lifecycle reused

No Palace-specific transaction path was created.

Current `completeEnding` remains the only permanent grant boundary.

v20 extends `MetaReward` with:

`kind: knowledge`

and routes it through canonical Strong Meta knowledge ownership.

The existing transaction behavior remains:

- eligibility grants nothing;
- finalize grants nothing;
- commit grants nothing permanent;
- first `completeEnding` applies the reward;
- RunResult records exact `appliedMetaRewardIds`;
- transaction proof is recorded;
- replay/reload does not duplicate ownership;
- newly earned reward does not mutate the current run snapshot.

## Exact Palace bindings Chat 2 must apply

Frozen Palace v19 currently carries `metaRewards: []`. During Palace selective assembly replace only those empty arrays with the canonical bindings below.

### Service Life

`ending.palace.service-life`

```json
[
  {
    "kind": "strongMeta",
    "rewardId": "palace.service-life.steady-practice",
    "reward": "palace.service-life.steady-practice"
  }
]
```

### Court Power

`ending.palace.court-power`

```json
[
  {
    "kind": "strongMeta",
    "rewardId": "palace.court-power.formal-introduction",
    "reward": "palace.court-power.formal-introduction"
  }
]
```

### Inner Truth

`ending.palace.inner-truth`

```json
[
  {
    "kind": "knowledge",
    "rewardId": "palace.inner-truth.source-method",
    "knowledge": "palace.inner-truth.source-method"
  }
]
```

### Return Home

D24 binding, required while the same Palace definitions file is assembled:

`ending.palace.return-home`

```json
[
  {
    "kind": "strongMeta",
    "rewardId": "palace.true.cap-200",
    "reward": "palace.true.cap-200"
  }
]
```

Do not use generic `unlock` for these rewards.

## Save/load compatibility

New D39 runtime fields use deterministic empty schema defaults.

Existing schema-6 saves that predate v20 therefore parse with:

- no bound Steady Practice careers;
- no used Steady Practice protection counters;
- no Formal Introduction relationship uses.

No schema-version bump was introduced solely for empty D39 run counters.

Runtime validation rejects:

- Steady Practice state without resolved Steady Practice;
- duplicate/over-cap bound careers;
- protection counts for unbound careers;
- over-cap protection counts;
- Formal Introduction state without resolved Formal Introduction;
- duplicate/over-cap relationship uses.

Resolved reward numbers remain in the immutable run snapshot, so later registry changes do not rewrite an in-progress life.

## Protected profile merge

Existing protected merge behavior is preserved.

It:

- unions/dedupes permanent strong ownership;
- unions/dedupes inherited knowledge;
- preserves the current profile's preferred selection;
- unions transaction proof.

D39 import does not auto-select a newly imported Specialist.

Source Method import does not inject itself into an already-resolved current run snapshot.

## Content validation

`src/core/content.ts` was extended because the new typed D39 condition/effect must participate in the normal catalog validator.

It now validates:

- Formal Introduction career is ordinary;
- referenced career machine exists;
- referenced relationship machine exists;
- referenced relationship transition exists;
- the atomic Formal Introduction effect is treated as a relationship transition and may not be nested inside another machine transition;
- typed capability reads/writes are declared when authored packs use the new seams.

This is validation plumbing only, not new Product behavior.

## UI integration

Adding new `Condition` variants made the UI condition explainer exhaustive switch incomplete.

`src/ui/app.ts` adds fallback display cases for:

- Strong Meta knowledge;
- Formal Introduction availability.

No new Palace UI/loadout slot or selection surface was added.

## Focused executable QA

Temporary QA branch:

`chat5/palace-d39-v20-focused-qa-20261006`

Final successful workflow:

- run: **37448961732**
- job: **112220545186**
- runner: self-hosted Windows X64
- Node: 22.18.0
- checkout pinned to:
  `b28b19628c0374c405cd32afedb0f16c105e2403`

Executable gate:

```text
npm run typecheck
npm run validate
npm run build
node --experimental-strip-types --test tests/palace-d39-reward-producer-v20.test.ts tests/strong-meta-registry-v7.test.ts tests/strong-meta-engine-integration-v7.test.ts tests/ending-meta.test.ts
node --experimental-strip-types --test tests/palace-d23-consumer-integration-v8.test.ts tests/hard-work-palace-meta-smoke.test.ts tests/chat3-secret-debt-separation-v2.test.ts
```

Results:

- typecheck: **PASS**
- validate: **PASS**
  - `Content OK: 84 packs, 357 events, 39 actions, 43 endings.`
- build: **PASS**
  - `Built renderer, content catalog and desktop save validator.`
- D39 lifecycle + Strong Meta bundle:
  - **41 tests**
  - **41 pass**
  - **0 fail**
- Palace/cross-system isolation bundle:
  - **18 tests**
  - **18 pass**
  - **0 fail**

Focused total:

**59 / 59 PASS**

No full CI was run.

## QA repair history

Initial focused run:

- run `37448356682`

It stopped at typecheck and exposed two narrow integration issues:

1. the new `Condition` union required exhaustive fallback cases in `ui/app.ts`;
2. the new focused test used the obsolete command discriminator `act` instead of current `action`.

Both were repaired without changing D39 Product semantics.

A second run passed. The final run above repeated the whole focused gate after strengthening coverage for:

- Court Power actual `completeEnding -> nextLife -> select` lifecycle;
- Source Method current-vs-future snapshot condition;
- non-D31 stat loss remaining unprotected.

## Focused acceptance proven

The executable suite proves:

- D39 Specialists use normal 2-slot capacity;
- Source Method is slot-free automatic knowledge only;
- Service Life ownership is exactly-once and no same-life activation occurs;
- Court Power ownership is exactly-once and activates only after future explicit selection;
- Inner Truth knowledge is exactly-once and auto-inherits only on a later run snapshot;
- Steady Practice binds first two careers at shift 8;
- third career does not bind;
- exactly three qualifying D31 losses per bound career are protected;
- non-D31 loss is not protected;
- Formal Introduction requires legal ordinary career + one shift;
- use is atomic with the authored relationship transition;
- same relationship cannot consume twice;
- only three relationships may consume per run;
- Palace/Activity/Secret Debt relationship domains are excluded;
- schema-6 saves receive empty D39 defaults;
- protected profile merge dedupes D39 ownership/knowledge while preserving current preference;
- D23 Palace qualification remains isolated;
- Hard Work / Palace meta smoke remains green;
- Secret Debt separation remains green.

## Assembly notes

Chat 2 should selectively transplant the v20 runtime/schema/validation/UI seams onto the real Palace assembly base.

Do not wholesale replace post-D42/post-Secret-Debt files.

When Palace v19 definitions are added, apply the exact four `metaRewards` bindings listed above.

Do not invent:

- a third Specialist slot;
- auto-selection;
- same-life reward activation;
- generic relationship auto-tagging;
- Source Method mechanical progression effects;
- Palace access bypass;
- Secret Debt bypass;
- Activity bypass;
- Hard Work bypass.

**READY_FOR_CHAT2_ASSEMBLY**
