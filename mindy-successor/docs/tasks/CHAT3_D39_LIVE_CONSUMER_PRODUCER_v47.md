# Chat 3 — D39 Live Consumer Producer v47

Status: **READY_FOR_CHAT2_PALACE_ASSEMBLY**  
Owner: Chat 3  
Branch: `chat3/d39-consumer-producer-v45`

## Authority

Leader approval:

`mindy-successor/docs/tasks/LEADER1_D39_LIVE_CONSUMER_DECISION_2026-10-06.md`

Accepted D39 runtime authority:

`chat5/palace-d39-reward-producer-v20@b5ab23a88ee0e18c6250251de15818ff799ff3f6`

Producer branch seed:

`c8515ffffbe81b4b4ab85c011e6b65ce09bb7431`

Frozen production implementation head before this handoff:

`090f36174cbc4ae9db46ae0bdbc9b1e4a2ce1386`

No full CI was run. Chat 2 remains the sole current-main assembly/full-CI lane.

---

# 1. Commit boundaries

D39 runtime dependency composition:

`a3e6234af618b10cabd5c8c74ceb365d53232c4d`

v45 Source Method live consumer:

`caf83801ca71ae28b3d12709aec45358276dcb79`

v46 Formal Introduction Assassin consumer:

`853bb989c8bb652f4204fcb3858b025eec355d0d`

Focused Assassin test-fixture repair:

`e5131d7211e90285fa611aa152dc1bac15e4e025`

D49 Source Method copy ceiling assertion:

`090f36174cbc4ae9db46ae0bdbc9b1e4a2ce1386`

---

# 2. Why the branch contains the D39 runtime dependency

The Leader-created v45 branch was based on the production line before D39 v20 had been assembled.

The approved v45/v46 content uses typed D39 seams:

- `strongMetaKnowledge`;
- `strongMetaFormalIntroductionAvailable`;
- `useStrongMetaFormalIntroduction`.

Without the accepted v20 schema/runtime/validation layer, the live consumers cannot typecheck or validate.

The producer therefore composes the accepted D39 v20 runtime dependency onto the task branch so the consumer bundle is executable.

Important Chat 2 rule:

**do not wholesale replace future Strong Meta files from this producer.**

Chat 2 must semantic-union D39 with whatever Strong Meta work is already present on the real Palace/current-main assembly base, including D38 or later registry changes.

Preserve:

- Specialist capacity = 2;
- no extra Palace slot;
- D39 Specialist ownership/selection lifecycle;
- automatic Source Method knowledge lifecycle;
- other accepted Strong Meta reward IDs/effects.

The only manual UI composition needed here was adding the two D39 condition explanation cases to the newer post-D42 `src/ui/app.ts`.

---

# 3. v45 — Source Method live consumer

Knowledge:

`palace.inner-truth.source-method`

Existing live event:

`school-life-content-v1.night-study.arcana-reason`

Existing legal reaction trigger remains unchanged:

`nightChoiceCompleted school.night_study.arcana.reason`

New variant:

`source-method-crosscheck`

Condition:

```json
{
  "kind": "strongMetaKnowledge",
  "knowledge": "palace.inner-truth.source-method",
  "present": true
}
```

Existing choice remains:

`continue`

Existing choice effects remain:

`[]`

The event remains legal for exactly the same Night Study reason as before. Source Method changes presentation only.

## Pack capability

`school-life-content-v1.json` now declares only the required typed Meta read:

```json
{
  "reads": {
    "meta": [
      "strongMetaKnowledge"
    ]
  },
  "writes": {}
}
```

## Localization

RU/EN localization was added for:

`event.school-life-content-v1.night-study.arcana-reason.variant.source-method-crosscheck.text`

and D39 condition labels.

## D49 firewall

The Source Method text is limited to:

- provenance;
- observation vs report;
- independent corroboration;
- unresolved mismatch;
- explicit uncertainty.

Focused QA explicitly rejects player-facing Source Method copy that mentions the D49-reserved macro answer vocabulary:

- Palace;
- Threshold;
- crossing;
- origin;
- return;
- Prince;
- archive;
- corresponding Russian markers.

No macro explanation is authored.

## Snapshot lifecycle

Focused tests prove:

- permanent Source Method knowledge earned in the current life does not alter that life's immutable run snapshot;
- the current-life scene remains the default variant;
- a later run snapshot containing Source Method resolves the authored variant;
- the materialized variant survives save/reload;
- resolving it changes no money, Energy, stats, progression or ending state.

---

# 4. v46 — Formal Introduction live consumer

Approved first relationship:

`assassin.handler`

New neutral stage:

`formal-introduced`

New transition:

`formal-introduction`

Exact transition:

```json
{
  "id": "formal-introduction",
  "from": [
    "introduced"
  ],
  "to": "formal-introduced",
  "conditions": [],
  "effects": [
    {
      "kind": "addRelationshipFact",
      "relationship": "assassin.handler",
      "fact": "introduced-at-work"
    }
  ]
}
```

No counter, trust fact, career fact, route fact, conflict fact, ending fact, resource or stat is added.

## Normal trust remains separate

Existing `build-trust` now accepts either:

- `introduced`;
- `formal-introduced`.

Its target, condition and effects are unchanged.

It still grants `professional-trust-earned` only when the normal trust transition executes.

The existing `assassin.relationship.trust` event similarly accepts either introductory stage while retaining the existing `introduced-at-work == true` requirement.

## Existing intro gate is preserved

Existing event:

`assassin.relationship.intro`

keeps its event-level conditions exactly:

- career stage `operative` OR `trusted-blade`;
- `introduced-at-work == false`.

Baseline choice:

`professional`

remains unchanged and free.

New opt-in choice:

`formal-introduction`

Condition:

```json
{
  "kind": "strongMetaFormalIntroductionAvailable",
  "career": "assassin",
  "relationship": "assassin.handler",
  "transition": "formal-introduction"
}
```

Effect:

```json
{
  "kind": "useStrongMetaFormalIntroduction",
  "career": "assassin",
  "relationship": "assassin.handler",
  "transition": "formal-introduction"
}
```

The accepted D39 runtime still independently requires:

- Formal Introduction selected in the current immutable run snapshot;
- legal ordinary career access;
- at least one completed current-life Assassin shift;
- legal authored relationship transition;
- fewer than three total uses;
- no previous use for the same relationship.

## Pack capability

`assassin.relationship` adds only:

`capabilities.reads.meta = ["strongMetaFormalIntroduction"]`

Existing Assassin career/relationship capabilities remain the mechanical ownership boundary.

## Save/reload and exactly-once

Focused tests prove:

- baseline intro consumes no Formal Introduction use;
- zero-shift state cannot use Formal Introduction;
- successful D39 choice reaches exactly `formal-introduced`;
- only `introduced-at-work` is created at that boundary;
- no trust/career/route/conflict/ending shortcut is created;
- exactly one relationship ID is recorded;
- repeated use on the same relationship fails without mutating state;
- stage and usage ledger survive reload;
- normal later `build-trust` remains reachable;
- old-style normal `introduced` state fabricates neither `formal-introduced` nor a consumed use.

---

# 5. Production files changed from the task seed

Runtime dependency / validation:

- `src/core/strongMeta.ts`
- `src/core/schema.ts`
- `src/core/engine.ts`
- `src/core/content.ts`
- `src/ui/app.ts`

Live authored consumer content:

- `content/definitions.json`
- `content/packs/school-life-content-v1.json`
- `content/packs/assassin-relationship.json`
- `content/localization.json`

Focused tests:

- `tests/palace-d39-reward-producer-v20.test.ts`
- `tests/strong-meta-registry-v7.test.ts`
- `tests/school-life-content-reload.test.ts`
- `tests/d39-formal-introduction-assassin-v46.test.ts`

No Palace route/content pack was added by Chat 3.

---

# 6. Focused executable QA

Final rerun branch:

`chat2/qa-d39-live-consumer-v47-rerun-20261006`

QA-only head:

`cf8ed2f4ead88dfa713a203d0402ddfb6d1c2b3b`

This QA head is exactly producer production head:

`090f36174cbc4ae9db46ae0bdbc9b1e4a2ce1386`

plus one QA workflow file only.

GitHub Actions run:

**37500776519**

Result:

**SUCCESS**

Runner:

- self-hosted Windows X64;
- Node 22.18.0.

Checks:

- `npm run typecheck` — **PASS**
- `npm run validate` — **PASS**
  - `Content OK: 92 packs, 369 events, 39 actions, 43 endings.`
- `npm run build` — **PASS**
  - renderer, content catalog and desktop save validator built
- focused D39 / Assassin / School / Strong Meta / migration bundle:
  - **84 tests**
  - **84 pass**
  - **0 fail**
  - **0 skipped**
  - **0 cancelled**

Focused test command included:

- `tests/palace-d39-reward-producer-v20.test.ts`
- `tests/d39-formal-introduction-assassin-v46.test.ts`
- `tests/school-life-content-reload.test.ts`
- `tests/school-night-study-adapter.test.ts`
- `tests/school-production-v11-content-quality.test.ts`
- `tests/school-production-v11-locale-save.test.ts`
- `tests/assassin-runtime-invariants.test.ts`
- `tests/assassin-natural-acceptance.test.ts`
- `tests/assassin-boundaries.test.ts`
- `tests/assassin-production-presentation.test.ts`
- `tests/strong-meta-registry-v7.test.ts`
- `tests/strong-meta-engine-integration-v7.test.ts`
- `tests/ending-meta.test.ts`
- `tests/migration.test.ts`

The runner emitted a post-job npm cache-save warning because `gzip` was unavailable. The workflow and all required build/test steps still concluded **SUCCESS**; no product/test failure was involved.

No full CI was run.

---

# 7. Chat 2 Palace assembly instructions

1. Assemble the accepted D39 v20 runtime/schema/validation seams by semantic union, not wholesale file replacement.
2. Preserve all later/current Strong Meta registry additions already present on the actual Palace assembly base.
3. Apply v45 School consumer:
   - pack Meta read;
   - Source Method variant;
   - RU/EN localization;
   - focused assertions.
4. Apply v46 Assassin consumer:
   - neutral stage;
   - neutral transition;
   - `build-trust` compatibility;
   - intro choice;
   - trust event stage compatibility;
   - typed Meta read;
   - RU/EN localization;
   - focused test.
5. Preserve baseline Assassin `professional` intro unchanged.
6. Preserve the existing Assassin career gate and normal trust/conflict/route chain.
7. Preserve Source Method as slot-free automatic knowledge, never a selectable Specialist.
8. Preserve Formal Introduction as a normal Specialist under capacity 2.
9. Apply Palace ending reward bindings only from the accepted Palace/D39 assembly authority; Chat 3 did not invent or duplicate Palace ending content here.
10. Run Chat 2's Palace focused gate and one full CI on the assembled current-main branch.

---

# 8. Stop conditions for assembly

Stop and reconcile instead of forcing this producer if the actual target:

- already contains D39 IDs with a different registry version;
- already contains D38 or later Strong Meta registry work that would be erased;
- changes Specialist capacity from 2;
- makes Source Method selectable;
- activates a newly earned D39 reward in the same life;
- makes Source Method create scene reachability;
- gives Source Method mechanical effects;
- exposes D49 L2+ macro lore;
- lets Formal Introduction bypass the Assassin career gate or one-shift check;
- writes trust/conflict/route/career/ending state at Formal Introduction;
- consumes a use on failed transition;
- prevents the normal later Assassin trust path;
- fabricates D39 usage in old saves.

---

# 9. Final disposition

v45 Source Method live consumer: **COMPLETE**.

v46 Assassin Formal Introduction live consumer: **COMPLETE**.

v47 typecheck / validate / build / focused QA: **GREEN**.

Full CI: **NOT RUN — Chat 2 lane**.

**BUNDLE_COMPLETE — READY_FOR_CHAT2_PALACE_ASSEMBLY**
