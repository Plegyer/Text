# PR34 Starter Trio Production Review v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
PR: #34 — `Lead: add target Satyr Maid and Undead Farm starter shifts (current main)`  
Head: `5f1bd3e644a00ed6c65f67511564e2414de09e5a`  
Base: `e36cc1aaa44991d3340276b4f82efa5c9d9cf15a`  
Merge commit: `712ab6c7368ab21906f3fcb0184b35d4f3e1411c`

## Final disposition

**GREEN / MERGED**

Exact-head CI:

- workflow: `mindy-successor check`
- run ID: `36308181336`
- conclusion: success
- tests: **227**
- pass: **227**
- fail: **0**

Post-merge push CI also completed successfully:

- merge SHA: `712ab6c7368ab21906f3fcb0184b35d4f3e1411c`
- push run ID: `36308257142`
- conclusion: success

---

# Changed production scope

PR34 changes exactly:

- `content/definitions.json`
- `tests/starter-trio-target-careers.test.ts`

Production additions are bounded to:

- `satyr-maid.shift`
- typed career `satyr-maid`
- `undead-farm.shift`
- typed career `undead-farm`
- seasonal scenes/stat packages for those two shifts
- first-shift transitions
- tests for cost, typed progression, semantic presentation and Hard Work non-invention.

No runtime/schema/UI file is changed.

---

# 1 Energy remains correct

Both new target actions have:

```json
"cost": {
  "money": 0,
  "energy": 1
}
```

This matches the current ordinary Work action model and the authoritative Satyr Maid / Undead Farm drafts.

The regression test asserts exact 1-Energy cost for both.

**PASS**

---

# Typed completed-shifts progression

Both actions increment:

`completed_shifts`

on their own typed career.

Satyr Maid:

```text
career = satyr-maid
initial stage = new-maid
first transition = first-shift
target stage = known-face
fact = first-shift-complete
```

Undead Farm:

```text
career = undead-farm
initial stage = new-hand
first transition = first-shift
target stage = reliable-helper
fact = first-shift-complete
```

The test executes real actions, reloads the Save, and verifies counter/stage persistence.

**PASS**

---

# No guessed Hard Work for Satyr/Farm

PR34 adds no:

- `ending.satyr-maid.hard-work`
- `ending.undead-farm.hard-work`
- Satyr/Farm Hard Work threshold
- Satyr/Farm Meta reward ID.

The regression test explicitly asserts those endings are absent.

This is correct because their exact Hard Work thresholds/rewards have not been accepted as Product locks.

**PASS**

---

# Lumber Hard Work remains exact

Current Lumber ending remains:

```text
careerCounter(lumber, completed_shifts) >= 50
```

with exact Meta reward:

`hardWork:lumber`

PR34 test asserts both exact structures.

No School, Forest, Satyr Maid, Farm, item or relationship condition was added to Lumber Hard Work.

**PASS**

---

# Wage/stat values are tunable baselines, not Product locks

Satyr Maid currently includes an initial wage baseline:

- base 15
- Charm weight 0.35
- Sexuality weight 0.25

Undead Farm:

- base 15
- Endurance weight 0.30
- Magic weight 0.30
- Reason weight 0.20

Seasonal stat effects are also authored as initial production content.

The PR body and action descriptions explicitly state final wage/stat tuning remains balance-owned.

The tests intentionally do **not** assert exact wage/stat numbers. They assert:

- 1 Energy;
- typed progression;
- semantic presentation;
- season surfaces.

Therefore the package does not falsely convert current tuning into Product locks.

**PASS**

---

# Semantic presentation namespaces

PR34 uses semantic identities:

Satyr Maid:

- `job/satyr-maid/shift/spring/default`
- `job/satyr-maid/shift/summer/default`
- `job/satyr-maid/shift/autumn/default`
- `job/satyr-maid/shift/winter/default`
- `job/satyr-maid/result/default`

Undead Farm:

- `job/undead-farm/shift/spring/default`
- `job/undead-farm/shift/summer/default`
- `job/undead-farm/shift/autumn/default`
- `job/undead-farm/shift/winter/default`
- `job/undead-farm/result/default`

The regression test checks these slots exist.

**PASS**

---

# Existing media reuse does not merge gameplay identity

Satyr Maid reuses current Tavern seasonal media:

- `stage.tavern.spring`
- `stage.tavern.summer`
- `stage.tavern.autumn`
- `stage.tavern.winter`

Undead Farm reuses current Hunt seasonal media:

- `stage.hunt.spring`
- `stage.hunt.summer`
- `stage.hunt.autumn`
- `stage.hunt.winter`

This is acceptable fallback/media reuse because gameplay identity remains distinct through semantic `presentationId`.

The media IDs do not become career IDs.

Replacing these fallback assets later does not require gameplay migration.

**PASS**

---

# Seasonal behavior

Both target actions have four deterministic season-specific scenes.

The test moves the production calendar across representative season days and checks:

- expected media surface;
- stable career-specific result presentation identity.

This proves seasonal presentation selection without locking balance numbers.

**PASS**

---

# Save/reload

For each career:

```text
started()
-> real target shift
-> typed counter = 1
-> first career stage transition
-> semantic result presentation
-> JSON save/reload
-> same counter/stage/presentation identity
```

**PASS**

---

# Forest continuation unchanged

PR34 does not modify Activity/runtime/cross-system event definitions.

The exact current Forest continuation remains:

```text
activityResult(
  lumber.forest,
  success,
  lumber.forest.success
)
```

No starter-career content is added to that trigger.

**PASS**

---

# Runtime/presentation assumptions

The test uses current:

- `dispatch`
- `parseSave`
- `presentationSlots`
- `started()`
- typed career progression.

Exact-head CI confirms those assumptions compile and execute against the current runtime.

**PASS**

---

# Content depth still open

PR34 is correctly a starter production layer, not a claim that Satyr Maid or Undead Farm are full careers.

Still open for later packages:

Satyr Maid:
- deeper state machine;
- relationships;
- Night depth;
- School/item hooks;
- endings;
- bespoke media.

Undead Farm:
- deeper state machine;
- relationships;
- production/research/anomaly content;
- item/sample hooks;
- Activity bridge;
- endings;
- bespoke media.

---

# Final review

| Check | Result |
|---|---|
| bounded starter production scope | **PASS** |
| 1 Energy | **PASS** |
| typed completed-shifts | **PASS** |
| explicit first-shift transition | **PASS** |
| save/reload | **PASS** |
| seasonal semantic presentation | **PASS** |
| media reuse preserves semantic identity | **PASS** |
| no guessed Satyr/Farm Hard Work | **PASS** |
| Lumber Hard Work unchanged | **PASS** |
| Forest ActivityResult unchanged | **PASS** |
| exact-head CI | **227/227 PASS** |
| post-merge push CI | **SUCCESS** |

PR34 is merged and green.

No Chat 4 production runtime/UI/content modification was made by this review.
