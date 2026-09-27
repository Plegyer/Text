# PR25 Final Gate Live Review v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
PR: #25 — `Lead: integrate final release-candidate acceptance gates`  
PR final head: `c06a3527227db3536784ac1c615e8641c38d3fc4`  
Merge commit: `961208ea995ca034e8dfe896337a38828db52415`  
Current main reviewed: `6bbf6d5995d7741ce50954ff1c7ae96af7583d98`

## Executive result

**GREEN with one minor coverage note**

PR25 is merged.

Its final commit explicitly records removal of the temporary workflow after a green merge-ref:

- typecheck: PASS;
- validate: PASS;
- build: PASS;
- tests: **218/218 PASS**.

PR25 changed only QA artifacts:

- `content/school-blocking-scene-compat.fixture.json`
- `tests/qa-minimal-rc-acceptance-gate-v2.test.ts`
- `tests/school-blocking-scene-compat.test.ts`

No production runtime, production content or UI file was changed.

---

# 1. Minimal RC gate uses the real School blocking scene

**GREEN on current merged product**

The integrated minimal RC gate executes the real production path:

```text
lumber.shift
-> Lumber milestone
-> Foreman professional route
-> school.course.arcana
```

After the School lesson, if a pending scene exists, the test asserts:

```text
eventId = base.school
allowed choice includes listen
```

and resolves it with:

`choice:listen`.

It also snapshots:

- money;
- current-day Energy;
- Arcana `lessons_completed`

before resolution and verifies all three remain unchanged afterward.

This matches the merged PR24 one-Save behavior.

## Coverage note

The PR25 minimal gate wraps the production School pending assertion in:

```ts
if(s.run.flow.pendingScene){ ... }
```

Therefore that single test would not fail if a future product change unexpectedly stopped opening `base.school`.

This is not currently a release blocker because merged PR24's:

`release-candidate-shipped-e2e.test.ts`

asserts the real pending event unconditionally:

```text
pendingScene.eventId === base.school
-> reload
-> choice:listen
```

Recommended coverage ownership:

- PR24 one-Save E2E remains the authoritative “real `base.school` must appear” sentinel;
- PR25 minimal gate remains the broader exactly-once RC chain.

---

# 2. School blocking-scene compatibility does not double-charge

**GREEN**

PR25 adds a dedicated compatibility fixture/test that proves the generic transaction boundary:

```text
paid School lesson
-> blocking School scene
-> reload
-> scene resolution
```

does not repeat:

- tuition;
- daytime Energy;
- typed paid-lesson progression.

The test records committed money/Energy and verifies scene resolution leaves them unchanged.

It separately locks:

```text
lessons_completed = 1
night_study_sessions = 0
```

through lesson -> reload -> scene resolution.

This fixture is generic compatibility evidence, not a replacement for the real `base.school` product test.

---

# 3. NightFlow correctly waits for the School scene

**GREEN**

The compatibility test explicitly proves:

`endDay`

rejects while a blocking School scene is pending.

After normal scene resolution, `endDay` becomes legal.

This preserves the engine invariant discovered by the first PR24 red run:

a pending scene cannot be silently bypassed to start NightFlow.

No runtime guard was weakened.

---

# 4. Schema-4 pre-option Activity compatibility

**GREEN**

The integrated minimal RC gate creates an active current Forest envelope, removes the post-PR22 fields:

- `optionModelVersion`;
- `routeId`;
- `resolvedOptionIds`;

then reloads it as schema 4.

Expected and asserted:

- `optionModelVersion=0`;
- available actions exactly:
  - `advance`;
  - `escape`;
- legacy `advance` increments Activity progress.

Therefore the accepted backward-compatibility contract remains green after PR25.

---

# 5. Item capability remains inventory-derived

**GREEN**

The integrated gate explicitly creates two states.

## No item

It manually adds the legacy-looking worldFact:

`lumber.capability.enter-old-boundary`

and asserts:

`hasItemCapability(...,'enter_old_boundary') === false`.

## Real inventory provider

It sets:

`inventory.old_boundary_token=1`

and asserts:

`hasItemCapability(...,'enter_old_boundary') === true`.

This protects the PR22/PR23 architecture:

- capability source of truth = declared item definitions + owned inventory;
- worldFact alone is not equivalent.

The inventory seed is runtime QA evidence only and does not claim natural PA09 acquisition.

---

# 6. Natural Forest route still used in the RC path

**GREEN**

The integrated one-Save RC gate does not seed Old Boundary Token.

It enters:

`lumber.forest`

and asserts:

- entry Energy cost;
- logging-road visible;
- old-boundary route absent;
- ordinary `advance` absent before route selection.

Then it executes:

`forest.route.logging-road`

through the real Activity command.

After reload:

- `advance` available;
- `escape` available.

Two real advances produce the shipped Forest success and Lumber continuation.

No Forest success fact is directly injected.

---

# 7. Exact Hard Work contract/reward

**GREEN**

PR25 does not modify production definitions.

The integrated test deep-equals the exact current Hard Work contract:

```json
[
  {
    "kind":"careerCounter",
    "career":"lumber",
    "counter":"completed_shifts",
    "op":"gte",
    "value":50
  }
]
```

and exact reward:

```json
[
  {
    "kind":"hardWork",
    "rewardId":"hardWork:lumber",
    "career":"lumber"
  }
]
```

The one-Save gate also proves:

- 49 completed shifts -> not eligible;
- one real `lumber.shift`;
- 50 -> eligible;
- commit -> no Meta reward;
- complete -> one `hardWork:lumber`;
- reload twice -> one transaction proof;
- New Run -> Strength/Endurance Meta effect;
- New Run reload -> effect persists.

No School, Forest, item, relationship or season prerequisite is added.

---

# 8. Accelerator honesty

**GREEN**

The only direct Product Acceptance repetition accelerator in the integrated one-Save path is:

`completed_shifts=49`.

The test does not inject:

- School public fact;
- Old Boundary Token into the main E2E route;
- capability worldFact as a capability;
- Forest success fact;
- ending eligibility;
- ending reward;
- Meta progress.

The isolated item-capability assertion seeds the item only to test the generic capability API, not to claim natural acquisition.

---

# 9. Production ownership boundary

**GREEN**

PR25 changed only three QA files.

No changes to:

- `src/core/*`;
- `src/ui/*`;
- production `content/definitions.json`;
- production packs/media.

Therefore the task's QA-only ownership boundary is preserved.

---

# Final classification

| Area | Classification |
|---|---|
| PR25 merge/full check | **GREEN — 218/218** |
| real School `base.school -> listen` on current product | **GREEN** |
| minimal gate requires `base.school` unconditionally | **COVERAGE_GAP** |
| School scene resolution double-charge | **GREEN** |
| schema-4 pre-option Activity | **GREEN** |
| inventory-derived capability | **GREEN** |
| natural logging-road Forest | **GREEN** |
| exact Hard Work 50/reward | **GREEN** |
| QA-only file ownership | **GREEN** |

The minor conditional assertion gap is already covered by the stronger merged PR24 one-Save E2E and does not block PR25's merged technical gate.

No production runtime/UI/content file was modified by Chat 4.
